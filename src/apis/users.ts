import z from "zod"
import { RobloxBatcher, RobloxBatchSkip, captureHeaders, mapRoute, nullOn, type RobloxBatchRoute } from "@/core/batcher"
import { resolveTtl, type RobloxConfig } from "@/core/config"
import type { RobloxThumbnailsApi } from "@/apis/thumbnails"
import type { RobloxAvatarThumbnailOptions, RobloxThumbnailTarget, RobloxWithThumbnail } from "@/types/thumbnails"
import { cached, createHttp, validate } from "@/core/http"
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
export type RobloxUsersCacheable = "getUserDetails" | "getUsers" | "getUsersByNames" | "getUsernameHistory"

const ORIGIN = "https://users.roblox.com"
/** 이전 버전부터 users 요청은 WinInet UA로 보낸다. */
const USER_AGENT = "Roblox/WinInet"

/** POST /v1/users, /v1/usernames/users 한 번에 보낼 수 있는 최대 개수 */
const MULTI_GET_LIMIT = 100

type ByIdTarget = { userId: RobloxUserId, excludeBannedUsers: boolean }
type ByNameTarget = { username: RobloxUserName, excludeBannedUsers: boolean }

/** GET /v1/users/{userId} — 30회/분 (2026-10 실측). 없는 유저는 404라 null로 바꾼다. */
const detailRoute: RobloxBatchRoute<RobloxUserId, RobloxUserDetail | null> = {
    bucket: "users GET /v1/users/{userId}",
    limit:  1,
    group:  () => "",
    async send(http, [userId], onHeaders) {
        return [await nullOn([404], onHeaders, () => http()
            .path("v1", "users", userId)
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
            .path("v1", "users")
            .body("overwrite", { userIds: targets.map(t => t.userId), excludeBannedUsers: targets[0].excludeBannedUsers })
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
            .path("user-profile-api", "v1", "user", "profiles", "get-profiles")
            .body("overwrite", { userIds: targets.map(t => t.userId), fields: ["names.username", "names.displayName", "isVerified", "isDeleted"] })
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

/** 기본 정보는 상세(GET, 30회/분)에도 있다. 다른 경로가 막혔을 때 쓴다. */
const byIdDetailRoute: RobloxBatchRoute<ByIdTarget, RobloxUser | null> = {
    bucket: detailRoute.bucket,
    limit:  1,
    group:  () => "",
    async send(http, [t], onHeaders) {
        return mapRoute(detailRoute, detail => {
            if (!detail || (t.excludeBannedUsers && detail.isBanned)) return null
            return { id: detail.id, name: detail.name, displayName: detail.displayName, hasVerifiedBadge: detail.hasVerifiedBadge }
        }).send(http, [t.userId], onHeaders)
    },
}

/** POST /v1/usernames/users — 500회/분. 이전 이름으로도 찾는다. */
const byNameRoute: RobloxBatchRoute<ByNameTarget, RobloxUserByName | null> = {
    bucket: "users POST /v1/usernames/users",
    limit:  MULTI_GET_LIMIT,
    group:  t => String(t.excludeBannedUsers),
    async send(http, targets, onHeaders) {
        const res = await http()
            .path("v1", "usernames", "users")
            .body("overwrite", { usernames: targets.map(t => t.username), excludeBannedUsers: targets[0].excludeBannedUsers })
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(RobloxUsersByNameResponseSchema))
            .request()
        const byName = new Map(res.data.map(u => [u.requestedUsername.toLowerCase(), u]))
        return targets.map(t => byName.get(t.username.toLowerCase()) ?? null)
    },
}

const found = <T>(list: (T | null)[]) => list.filter((x): x is T => x !== null)

/** users.roblox.com */
export class RobloxUsersApi {
    private readonly http
    private readonly details
    private readonly byId
    private readonly byName

    constructor(private readonly config: RobloxConfig, private readonly thumbnails: RobloxThumbnailsApi) {
        this.http = createHttp(config, ORIGIN, { userAgent: USER_AGENT })
        this.details = new RobloxBatcher(config, ORIGIN, [detailRoute], { userAgent: USER_AGENT })
        this.byId = new RobloxBatcher(config, ORIGIN, [profilesRoute, byIdRoute, byIdDetailRoute], { userAgent: USER_AGENT })
        this.byName = new RobloxBatcher(config, ORIGIN, [byNameRoute], { userAgent: USER_AGENT })
    }

    private ttl(method: RobloxUsersCacheable) {
        return resolveTtl(this.config, "users", method)
    }

    // ── 공개 조회 ──────────────────────────────────────
    // 배열을 받는 메서드는 결과를 입력 순서로 돌려주고, 없는 유저는 뺀다.
    // 같은 틱에 들어온 호출은 모아서 보내므로 따로따로 불러도 된다.

    /** 유저들에 아바타 썸네일을 붙인다. id를 아는 경우 users 조회와 동시에 보낸다. */
    private async attach<U extends { id: RobloxUserId }>(users: Promise<U[]>, ids: readonly RobloxUserId[] | null, option: true | RobloxAvatarThumbnailOptions): Promise<RobloxWithThumbnail<U>[]> {
        const target = option === true ? { type: "AvatarHeadShot" as const } : option
        const thumbnails = (list: readonly RobloxUserId[]) => this.thumbnails.get(list.map(targetId => ({ ...target, targetId }) as RobloxThumbnailTarget))
        const [list, early] = await Promise.all([users, ids ? thumbnails(ids) : null])
        const byId = new Map((early ? ids!.map((id, i) => [id, early[i]] as const) : []))
        if (!early) (await thumbnails(list.map(u => u.id))).forEach((t, i) => byId.set(list[i].id, t))
        return list.map(u => ({ ...u, thumbnail: byId.get(u.id)! }))
    }

    /**
     * GET /v1/users/{userId} — 설명, 가입일, 정지 여부까지. 유저 한 명당 요청 하나라 한도(30회/분)가 빡빡하다.
     * 기본 정보만 필요하면 `getUsers`를 쓴다. `thumbnail`을 주면 아바타 썸네일을 같이 받는다.
     */
    getUserDetails(userIds: readonly RobloxUserId[], opts: { thumbnail: true | RobloxAvatarThumbnailOptions }): Promise<RobloxWithThumbnail<RobloxUserDetail>[]>
    getUserDetails(userIds: readonly RobloxUserId[], opts?: { thumbnail?: undefined }): Promise<RobloxUserDetail[]>
    getUserDetails(userIds: readonly RobloxUserId[], opts: { thumbnail?: true | RobloxAvatarThumbnailOptions } = {}): Promise<RobloxUserDetail[]> {
        const users = Promise.all(userIds.map(id =>
            cached(this.config, ["users", "getUserDetails", id], this.ttl("getUserDetails"), () => this.details.load(String(id), id))
        )).then(found)
        return opts.thumbnail ? this.attach(users, userIds, opts.thumbnail) : users
    }

    /** POST /v1/users — id, 이름, 표시 이름, 인증 배지. 경로 여러 개를 섞어 묶어 보낸다. `thumbnail`을 주면 아바타 썸네일을 같이 받는다. */
    getUsers(userIds: readonly RobloxUserId[], opts: { excludeBannedUsers?: boolean, thumbnail: true | RobloxAvatarThumbnailOptions }): Promise<RobloxWithThumbnail<RobloxUser>[]>
    getUsers(userIds: readonly RobloxUserId[], opts?: { excludeBannedUsers?: boolean, thumbnail?: undefined }): Promise<RobloxUser[]>
    getUsers(userIds: readonly RobloxUserId[], opts: { excludeBannedUsers?: boolean, thumbnail?: true | RobloxAvatarThumbnailOptions } = {}): Promise<RobloxUser[]> {
        const excludeBannedUsers = opts.excludeBannedUsers ?? false
        const users = Promise.all(userIds.map(userId => {
            const key = `${userId}:${excludeBannedUsers}`
            return cached(this.config, ["users", "getUsers", userId, excludeBannedUsers], this.ttl("getUsers"), () => this.byId.load(key, { userId, excludeBannedUsers }))
        })).then(found)
        return opts.thumbnail ? this.attach(users, userIds, opts.thumbnail) : users
    }

    /**
     * POST /v1/usernames/users — 이름(이전 이름 포함, 대소문자 무시)으로 찾는다. 100개씩 묶어서 보낸다.
     * `thumbnail`을 주면 찾은 유저의 아바타 썸네일을 이어서 받는다.
     */
    getUsersByNames(usernames: readonly RobloxUserName[], opts: { excludeBannedUsers?: boolean, thumbnail: true | RobloxAvatarThumbnailOptions }): Promise<RobloxWithThumbnail<RobloxUserByName>[]>
    getUsersByNames(usernames: readonly RobloxUserName[], opts?: { excludeBannedUsers?: boolean, thumbnail?: undefined }): Promise<RobloxUserByName[]>
    getUsersByNames(usernames: readonly RobloxUserName[], opts: { excludeBannedUsers?: boolean, thumbnail?: true | RobloxAvatarThumbnailOptions } = {}): Promise<RobloxUserByName[]> {
        const excludeBannedUsers = opts.excludeBannedUsers ?? false
        const users = Promise.all(usernames.map(username => {
            const lower = username.toLowerCase()
            const key = `${lower}:${excludeBannedUsers}`
            return cached(this.config, ["users", "getUsersByNames", lower, excludeBannedUsers], this.ttl("getUsersByNames"), () => this.byName.load(key, { username, excludeBannedUsers }))
        })).then(found)
        return opts.thumbnail ? this.attach(users, null, opts.thumbnail) : users
    }

    /** GET /v1/users/search */
    searchUsers(query: RobloxUserSearchQuery) {
        return this.http()
            .path("v1", "users", "search")
            .query(query)
            .middlewares(validate(RobloxUserSearchResponseSchema))
            .request()
    }

    /** GET /v1/users/{userId}/username-history */
    getUsernameHistory(userId: RobloxUserId, query: RobloxUsernameHistoryQuery = {}) {
        return cached(this.config, ["users", "getUsernameHistory", userId, query], this.ttl("getUsernameHistory"), () =>
            this.http()
                .path("v1", "users", userId, "username-history")
                .query(query)
                .middlewares(validate(RobloxUsernameHistoryResponseSchema))
                .request()
        )
    }

    /** GET /v1/display-names/validate — 신규 유저용. 사용할 수 없으면 FETCH_FAILED(400/429)로 실패한다. */
    async validateDisplayName(query: RobloxValidateDisplayNameQuery): Promise<void> {
        await this.http()
            .path("v1", "display-names", "validate")
            .query(query)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    // ── 인증된 계정 ────────────────────────────────────

    /** GET /v1/users/authenticated */
    getAuthenticated() {
        return this.http()
            .path("v1", "users", "authenticated")
            .middlewares(validate(RobloxAuthenticatedUserSchema))
            .request()
    }

    /** GET /v1/users/authenticated/age-bracket */
    async getAgeBracket() {
        const res = await this.http()
            .path("v1", "users", "authenticated", "age-bracket")
            .middlewares(validate(RobloxUserAgeBracketSchema))
            .request()
        return res.ageBracket
    }

    /** GET /v1/users/authenticated/country-code */
    async getCountryCode() {
        const res = await this.http()
            .path("v1", "users", "authenticated", "country-code")
            .middlewares(validate(RobloxUserCountryCodeSchema))
            .request()
        return res.countryCode
    }

    /** GET /v1/users/authenticated/roles */
    async getRoles() {
        const res = await this.http()
            .path("v1", "users", "authenticated", "roles")
            .middlewares(validate(RobloxUserRolesSchema))
            .request()
        return res.roles
    }

    /** GET /v1/birthdate */
    getBirthdate() {
        return this.http()
            .path("v1", "birthdate")
            .middlewares(validate(RobloxBirthdateSchema))
            .request()
    }

    /** POST /v1/birthdate — 비밀번호가 필요하다. */
    async setBirthdate(request: RobloxSetBirthdateRequest): Promise<void> {
        await this.http()
            .path("v1", "birthdate")
            .body("overwrite", request)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/description */
    async getDescription() {
        const res = await this.http()
            .path("v1", "description")
            .middlewares(validate(RobloxUserDescriptionSchema))
            .request()
        return res.description
    }

    /** POST /v1/description — 필터링된 뒤의 설명을 돌려준다. */
    async setDescription(description: string) {
        const res = await this.http()
            .path("v1", "description")
            .body("overwrite", { description })
            .middlewares(validate(RobloxUserDescriptionSchema))
            .request()
        return res.description
    }

    /** GET /v1/gender */
    async getGender() {
        const res = await this.http()
            .path("v1", "gender")
            .middlewares(validate(RobloxUserGenderSchema))
            .request()
        return res.gender
    }

    /** POST /v1/gender */
    async setGender(gender: RobloxGender): Promise<void> {
        await this.http()
            .path("v1", "gender")
            .body("overwrite", { gender })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/users/{userId}/display-names/validate — 기존 유저용 */
    async validateUserDisplayName(userId: RobloxUserId, displayName: string): Promise<void> {
        await this.http()
            .path("v1", "users", userId, "display-names", "validate")
            .query({ displayName })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** PATCH /v1/users/{userId}/display-names — 인증된 본인만 바꿀 수 있다. */
    async setDisplayName(userId: RobloxUserId, newDisplayName: string): Promise<void> {
        await this.http()
            .method("PATCH")
            .path("v1", "users", userId, "display-names")
            .body("overwrite", { newDisplayName })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }
}
