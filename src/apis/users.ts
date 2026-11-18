import * as z from "zod"
import { RobloxBatcher, RobloxBatchSkip, captureHeaders, nullOn, type RobloxBatchRoute } from "@/core/batcher"
import { resolveTtl, type RobloxConfig } from "@/core/config"
import type { RobloxThumbnailsApi } from "@/apis/thumbnails"
import type { RobloxAvatarThumbnailOptions, RobloxThumbnailTarget, RobloxWithThumbnail } from "@/types/thumbnails"
import { cached, cachedByViewer, createHttp, validate } from "@/core/http"
import { finish, found, settle, type RobloxItemError } from "@/core/partial"
import { RobloxEmptyResponseSchema } from "@/types/common"
import {
    RobloxAuthenticatedUserSchema,
    RobloxBirthdateSchema,
    RobloxUserAgeBracketSchema,
    RobloxUserCountryCodeSchema,
    RobloxUserDescriptionSchema,
    RobloxUserDetailSchema,
    RobloxUserGenderSchema,
    RobloxUserRolesSchema,
    RobloxUserSearchResponseSchema,
    RobloxUsernameHistoryResponseSchema,
    RobloxUsersByNameResponseSchema,
    RobloxUsersResponseSchema,
    RobloxUserSchema,
    RobloxProfileActionsSchema,
    type RobloxGender,
    type RobloxUser,
    type RobloxUserByName,
    type RobloxUserDetail,
    type RobloxUserId,
    type RobloxUserName,
    type RobloxSetBirthdateRequest,
    type RobloxUserSearchQuery,
    type RobloxUsernameHistoryQuery,
    type RobloxValidateDisplayNameQuery,
} from "@/types/users"

/** `.ttl({ users: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
export type RobloxUsersCacheable =
    | "getUserDetails" | "getUsers" | "getUsersByNames" | "getUsernameHistory" | "searchUsers"
    // depend on the requesting account
    | "getProfileActions" | "getAuthenticated" | "getAgeBracket" | "getCountryCode" | "getRoles" | "getBirthdate" | "getDescription" | "getGender"

const ORIGIN = "https://users.roblox.com"
const APIS = "https://apis.roblox.com"
/** 이전 버전부터 users 요청은 WinInet UA로 보낸다. */
const USER_AGENT = "Roblox/WinInet"

/** POST /v1/users, /v1/usernames/users 한 번에 보낼 수 있는 최대 개수 */
const MULTI_GET_LIMIT = 100

type ByIdTarget = { userId: RobloxUserId, excludeBannedUsers: boolean }
type ByNameTarget = { username: RobloxUserName, excludeBannedUsers: boolean }

/**
 * GET /v1/users/{userId} — 30회/분 (2026-10 실측). 없는 유저는 404라 null로 바꾼다.
 * 상세 전용이다. 기본 정보도 들어 있지만 한 명씩이라 `getUsers`의 경로로 쓰지 않는다 (`getUserDetails`의 한도를 먹는다).
 */
const detailRoute: RobloxBatchRoute<RobloxUserId, RobloxUserDetail | null> = {
    bucket: "users GET /v1/users/{userId}",
    limit:  1,
    group:  () => "",
    async send(http, [userId], onHeaders) {
        return [await nullOn([404], onHeaders, () => http()
            .path("append", "v1", "users", userId)
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(RobloxUserDetailSchema))
            .request())]
    },
}

/**
 * POST /v1/users — 헤더는 1000회/초라고 하지만 id 개수로 세는 숨은 한도가 있다
 * (100개짜리 요청은 몇 초에 몇 번 정도). 서버는 없는 id를 빼고 준다.
 */
const byIdRoute: RobloxBatchRoute<ByIdTarget, RobloxUser | null> = {
    bucket: "users POST /v1/users",
    limit:  MULTI_GET_LIMIT,
    group:  t => String(t.excludeBannedUsers),
    async send(http, targets, onHeaders) {
        const res = await http()
            .path("append", "v1", "users")
            .body("replace", { userIds: targets.map(t => t.userId), excludeBannedUsers: targets[0].excludeBannedUsers })
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(RobloxUsersResponseSchema))
            .request()
        const byId = new Map(res.data.map(u => [u.id, u]))
        return targets.map(t => byId.get(t.userId) ?? null)
    },
}

const ProfilesSchema = z.object({
    profileDetails: z.array(z.object({
        userId:     z.number(),
        names:      z.object({ username: z.string().nullable(), displayName: z.string().nullable() }),
        isVerified: z.boolean(),
        isDeleted:  z.boolean().nullish(),
    })),
})

/**
 * POST apis /user-profile-api/v1/user/profiles/get-profiles — roblox.com 웹이 쓰는 비공개 엔드포인트.
 * 10000회/분, 200개씩이라 /v1/users보다 훨씬 넉넉하다 (201개부터는 에러 없이 빈 결과).
 * 정지 여부를 주지 않아 excludeBannedUsers일 때는 쓰지 않는다. 없는 유저는 이름이 null로 온다.
 * 정지/삭제된 계정은 이름을 "Account Deleted"로 가려서 주므로(/v1/users는 원래 이름을 준다) 다른 경로로 넘긴다.
 */
const profilesRoute: RobloxBatchRoute<ByIdTarget, RobloxUser | null> = {
    bucket: "apis POST /user-profile-api/v1/user/profiles/get-profiles",
    origin: "https://apis.roblox.com",
    limit:  200,
    group:  t => t.excludeBannedUsers ? null : "",
    async send(http, targets, onHeaders) {
        const res = await http()
            .path("append", "user-profile-api", "v1", "user", "profiles", "get-profiles")
            .body("replace", { userIds: targets.map(t => t.userId), fields: ["names.username", "names.displayName", "isVerified", "isDeleted"] })
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(ProfilesSchema))
            .request()
        const byId = new Map(res.profileDetails.map(p => [p.userId, p]))
        return targets.map(t => {
            const p = byId.get(t.userId)
            if (!p?.names.username) return null
            if (p.isDeleted) return RobloxBatchSkip
            return RobloxUserSchema.parse({ id: p.userId, name: p.names.username, displayName: p.names.displayName ?? p.names.username, hasVerifiedBadge: p.isVerified })
        })
    },
}

/** POST /v1/usernames/users — 500회/분. 이전 이름으로도 찾는다. */
const byNameRoute: RobloxBatchRoute<ByNameTarget, RobloxUserByName | null> = {
    bucket: "users POST /v1/usernames/users",
    limit:  MULTI_GET_LIMIT,
    group:  t => String(t.excludeBannedUsers),
    async send(http, targets, onHeaders) {
        const res = await http()
            .path("append", "v1", "usernames", "users")
            .body("replace", { usernames: targets.map(t => t.username), excludeBannedUsers: targets[0].excludeBannedUsers })
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(RobloxUsersByNameResponseSchema))
            .request()
        const byName = new Map(res.data.map(u => [u.requestedUsername.toLowerCase(), u]))
        return targets.map(t => byName.get(t.username.toLowerCase()) ?? null)
    },
}


/** users.roblox.com */
export class RobloxUsersApi {
    private readonly http
    private readonly apisHttp
    private readonly details
    private readonly byId
    private readonly byName

    constructor(private readonly config: RobloxConfig, private readonly thumbnails: RobloxThumbnailsApi) {
        this.http = createHttp(config, ORIGIN, { userAgent: USER_AGENT })
        this.apisHttp = createHttp(config, APIS, { browserTracker: true })
        this.details = new RobloxBatcher(config, ORIGIN, [detailRoute], { userAgent: USER_AGENT })
        this.byId = new RobloxBatcher(config, ORIGIN, [profilesRoute, byIdRoute], { userAgent: USER_AGENT })
        this.byName = new RobloxBatcher(config, ORIGIN, [byNameRoute], { userAgent: USER_AGENT })
    }

    private ttl(method: RobloxUsersCacheable) {
        return resolveTtl(this.config, "users", method)
    }

    // ── 공개 조회 ──────────────────────────────────────
    // 배열을 받는 메서드는 결과를 입력 순서로 돌려주고, 없는 유저는 뺀다.
    // 일부 항목이 실패하면 받은 결과를 담아 RobloxError(PARTIAL)를 던진다.
    // 같은 틱에 들어온 호출은 모아서 보내므로 따로따로 불러도 된다.

    /**
     * 유저들을 받아 실패가 있으면 RobloxError(PARTIAL)로 던진다. `thumbnail`이 있으면 아바타 썸네일을 붙인다 —
     * id를 아는 경우 users 조회와 동시에 보내고, 썸네일을 받지 못한 유저는 `thumbnail: null`이다.
     */
    private async attach<U extends { id: RobloxUserId }, I>(
        users: Promise<{ values: (U | null)[], errors: RobloxItemError<I>[] }>,
        ids: readonly RobloxUserId[] | null,
        option: true | RobloxAvatarThumbnailOptions | undefined,
    ): Promise<(U | RobloxWithThumbnail<U>)[]> {
        if (!option) {
            const { values, errors } = await users
            return finish(found(values), errors)
        }
        const target = option === true ? { type: "AvatarHeadShot" as const } : option
        const thumbnails = (list: readonly RobloxUserId[]) => this.thumbnails.getSettled(list.map(targetId => ({ ...target, targetId }) as RobloxThumbnailTarget)).then(s => s.values)
        const [{ values, errors }, early] = await Promise.all([users, ids ? thumbnails(ids) : null])
        const list = found(values)
        const byId = new Map((early ? ids!.map((id, i) => [id, early[i]] as const) : []))
        if (!early) (await thumbnails(list.map(u => u.id))).forEach((t, i) => byId.set(list[i].id, t))
        return finish(list.map(u => ({ ...u, thumbnail: byId.get(u.id) ?? null })), errors)
    }

    /**
     * GET /v1/users/{userId} — 설명, 가입일, 정지 여부까지. 유저 한 명당 요청 하나라 한도(30회/분)가 빡빡하다.
     * 기본 정보만 필요하면 `getUsers`를 쓴다. `thumbnail`을 주면 아바타 썸네일을 같이 받는다.
     */
    getUserDetails(userIds: readonly RobloxUserId[], opts: { thumbnail: true | RobloxAvatarThumbnailOptions }): Promise<RobloxWithThumbnail<RobloxUserDetail>[]>
    getUserDetails(userIds: readonly RobloxUserId[], opts?: { thumbnail?: undefined }): Promise<RobloxUserDetail[]>
    getUserDetails(userIds: readonly RobloxUserId[], opts: { thumbnail?: true | RobloxAvatarThumbnailOptions } = {}): Promise<RobloxUserDetail[]> {
        const users = settle(userIds, id =>
            cached(this.config, { service: "users", method: "getUserDetails", userId: id }, this.ttl("getUserDetails"), () => this.details.load(String(id), id)))
        return this.attach(users, userIds, opts.thumbnail)
    }

    /** POST /v1/users — id, 이름, 표시 이름, 인증 배지. 경로 여러 개를 섞어 묶어 보낸다. `thumbnail`을 주면 아바타 썸네일을 같이 받는다. */
    getUsers(userIds: readonly RobloxUserId[], opts: { excludeBannedUsers?: boolean, thumbnail: true | RobloxAvatarThumbnailOptions }): Promise<RobloxWithThumbnail<RobloxUser>[]>
    getUsers(userIds: readonly RobloxUserId[], opts?: { excludeBannedUsers?: boolean, thumbnail?: undefined }): Promise<RobloxUser[]>
    getUsers(userIds: readonly RobloxUserId[], opts: { excludeBannedUsers?: boolean, thumbnail?: true | RobloxAvatarThumbnailOptions } = {}): Promise<RobloxUser[]> {
        const excludeBannedUsers = opts.excludeBannedUsers ?? false
        const users = settle(userIds, userId => {
            const key = `${userId}:${excludeBannedUsers}`
            return cached(this.config, { service: "users", method: "getUsers", userId, excludeBannedUsers }, this.ttl("getUsers"), () => this.byId.load(key, { userId, excludeBannedUsers }))
        })
        return this.attach(users, userIds, opts.thumbnail)
    }

    /**
     * POST /v1/usernames/users — 이름(이전 이름 포함, 대소문자 무시)으로 찾는다. 100개씩 묶어서 보낸다.
     * `thumbnail`을 주면 찾은 유저의 아바타 썸네일을 이어서 받는다.
     */
    getUsersByNames(usernames: readonly RobloxUserName[], opts: { excludeBannedUsers?: boolean, thumbnail: true | RobloxAvatarThumbnailOptions }): Promise<RobloxWithThumbnail<RobloxUserByName>[]>
    getUsersByNames(usernames: readonly RobloxUserName[], opts?: { excludeBannedUsers?: boolean, thumbnail?: undefined }): Promise<RobloxUserByName[]>
    getUsersByNames(usernames: readonly RobloxUserName[], opts: { excludeBannedUsers?: boolean, thumbnail?: true | RobloxAvatarThumbnailOptions } = {}): Promise<RobloxUserByName[]> {
        const excludeBannedUsers = opts.excludeBannedUsers ?? false
        const users = settle(usernames, username => {
            const lower = username.toLowerCase()
            const key = `${lower}:${excludeBannedUsers}`
            return cached(this.config, { service: "users", method: "getUsersByNames", username: lower, excludeBannedUsers }, this.ttl("getUsersByNames"), () => this.byName.load(key, { username, excludeBannedUsers }))
        })
        return this.attach(users, null, opts.thumbnail)
    }

    /** GET /v1/users/search */
    searchUsers(query: RobloxUserSearchQuery) {
        return cached(this.config, { service: "users", method: "searchUsers", query }, this.ttl("searchUsers"), () => this.http()
            .path("append", "v1", "users", "search")
            .query("append", query)
            .middlewares(validate(RobloxUserSearchResponseSchema))
            .request())
    }

    /** GET /v1/users/{userId}/username-history */
    getUsernameHistory(userId: RobloxUserId, query: RobloxUsernameHistoryQuery = {}) {
        return cached(this.config, { service: "users", method: "getUsernameHistory", userId, query }, this.ttl("getUsernameHistory"), () =>
            this.http()
                .path("append", "v1", "users", userId, "username-history")
                .query("append", query)
                .middlewares(validate(RobloxUsernameHistoryResponseSchema))
                .request()
        )
    }

    /** GET /v1/display-names/validate — 신규 유저용. 사용할 수 없으면 FETCH_FAILED(400/429)로 실패한다. */
    async validateDisplayName(query: RobloxValidateDisplayNameQuery): Promise<void> {
        await this.http()
            .path("append", "v1", "display-names", "validate")
            .query("append", query)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    // ── 인증된 계정 ────────────────────────────────────

    /**
     * POST apis /profile-platform-api/v1/profiles/get — roblox.com 프로필 화면이 쓰는 비공개 엔드포인트.
     * 요청 계정이 이 유저의 프로필에서 볼 헤더 버튼과 "…" 메뉴 항목. 관계(친구, 팔로우, 차단, 신뢰하는 친구)와
     * 계정 조건(연령, 거래 자격)에 따라 서버가 고른다. 계정마다 다르고 바로 바뀌므로 기본 TTL은 0이다.
     */
    getProfileActions(userId: RobloxUserId) {
        return cachedByViewer(this.config, viewer => ({ service: "users", method: "getProfileActions", viewer, userId }), this.ttl("getProfileActions"), () => this.apisHttp()
            .path("append", "profile-platform-api", "v1", "profiles", "get")
            .body("replace", { profileType: "User", profileId: String(userId), components: [{ component: "Actions" }] })
            .middlewares(validate(RobloxProfileActionsSchema))
            .request())
    }

    /** GET /v1/users/authenticated */
    getAuthenticated() {
        return cachedByViewer(this.config, viewer => ({ service: "users", method: "getAuthenticated", viewer }), this.ttl("getAuthenticated"), () => this.http()
            .path("append", "v1", "users", "authenticated")
            .middlewares(validate(RobloxAuthenticatedUserSchema))
            .request())
    }

    /** GET /v1/users/authenticated/age-bracket */
    getAgeBracket() {
        return cachedByViewer(this.config, viewer => ({ service: "users", method: "getAgeBracket", viewer }), this.ttl("getAgeBracket"), async () => (await this.http()
            .path("append", "v1", "users", "authenticated", "age-bracket")
            .middlewares(validate(RobloxUserAgeBracketSchema))
            .request()).ageBracket)
    }

    /** GET /v1/users/authenticated/country-code */
    getCountryCode() {
        return cachedByViewer(this.config, viewer => ({ service: "users", method: "getCountryCode", viewer }), this.ttl("getCountryCode"), async () => (await this.http()
            .path("append", "v1", "users", "authenticated", "country-code")
            .middlewares(validate(RobloxUserCountryCodeSchema))
            .request()).countryCode)
    }

    /** GET /v1/users/authenticated/roles */
    getRoles() {
        return cachedByViewer(this.config, viewer => ({ service: "users", method: "getRoles", viewer }), this.ttl("getRoles"), async () => (await this.http()
            .path("append", "v1", "users", "authenticated", "roles")
            .middlewares(validate(RobloxUserRolesSchema))
            .request()).roles)
    }

    /** GET /v1/birthdate */
    getBirthdate() {
        return cachedByViewer(this.config, viewer => ({ service: "users", method: "getBirthdate", viewer }), this.ttl("getBirthdate"), () => this.http()
            .path("append", "v1", "birthdate")
            .middlewares(validate(RobloxBirthdateSchema))
            .request())
    }

    /** POST /v1/birthdate — 비밀번호가 필요하다. */
    async setBirthdate(request: RobloxSetBirthdateRequest): Promise<void> {
        await this.http()
            .path("append", "v1", "birthdate")
            .body("replace", request)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/description */
    getDescription() {
        return cachedByViewer(this.config, viewer => ({ service: "users", method: "getDescription", viewer }), this.ttl("getDescription"), async () => (await this.http()
            .path("append", "v1", "description")
            .middlewares(validate(RobloxUserDescriptionSchema))
            .request()).description)
    }

    /** POST /v1/description — 필터링된 뒤의 설명을 돌려준다. */
    async setDescription(description: string) {
        const res = await this.http()
            .path("append", "v1", "description")
            .body("replace", { description })
            .middlewares(validate(RobloxUserDescriptionSchema))
            .request()
        return res.description
    }

    /** GET /v1/gender */
    getGender() {
        return cachedByViewer(this.config, viewer => ({ service: "users", method: "getGender", viewer }), this.ttl("getGender"), async () => (await this.http()
            .path("append", "v1", "gender")
            .middlewares(validate(RobloxUserGenderSchema))
            .request()).gender)
    }

    /** POST /v1/gender */
    async setGender(gender: RobloxGender): Promise<void> {
        await this.http()
            .path("append", "v1", "gender")
            .body("replace", { gender })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/users/{userId}/display-names/validate — 기존 유저용 */
    async validateUserDisplayName(userId: RobloxUserId, displayName: string): Promise<void> {
        await this.http()
            .path("append", "v1", "users", userId, "display-names", "validate")
            .query("append", { displayName })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** PATCH /v1/users/{userId}/display-names — 인증된 본인만 바꿀 수 있다. */
    async setDisplayName(userId: RobloxUserId, newDisplayName: string): Promise<void> {
        await this.http()
            .method("PATCH")
            .path("append", "v1", "users", userId, "display-names")
            .body("replace", { newDisplayName })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }
}
