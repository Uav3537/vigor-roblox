import { RobloxBatcher, captureHeaders, mapRoute, nullOn, type RobloxBatchRoute } from "@/core/batcher"
import type { RobloxCacheKey, RobloxCacheValue } from "@/core/cache"
import { resolveTtl, type RobloxConfig } from "@/core/config"
import { cached, createHttp, validate } from "@/core/http"
import { requireViewer } from "@/core/viewer"
import type { RobloxUsersApi } from "@/apis/users"
import { RobloxEmptyResponseSchema, type RobloxCursor } from "@/types/common"
import {
    RobloxCaptchaStatusSchema,
    RobloxCountResponseSchema,
    RobloxFollowingExistsResponseSchema,
    RobloxFollowPageSchema,
    RobloxFriendListResponseSchema,
    RobloxFriendPageRawSchema,
    RobloxFriendRequestPageSchema,
    RobloxFriendsMetadataSchema,
    RobloxFriendStatusesResponseSchema,
    RobloxOnlineFriendsResponseSchema,
    RobloxTrustedFriendRequestPageSchema,
    type RobloxCaptchaTokenRequest,
    type RobloxFollowingStatus,
    type RobloxFollowPageQuery,
    type RobloxFriendPage,
    type RobloxFriendRequestsQuery,
    type RobloxFriendSearchQuery,
    type RobloxFriendStatus,
    type RobloxOnlineFriend,
    type RobloxUserFriends,
} from "@/types/friends"
import type { RobloxAvatarThumbnailOptions, RobloxWithThumbnail } from "@/types/thumbnails"
import type { RobloxUser, RobloxUserId } from "@/types/users"
import z from "zod"

/** `.ttl({ friends: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
export type RobloxFriendsCacheable = "getFriends" | "getFriendCounts" | "getFollowerCounts" | "getFollowingCounts"

const ORIGIN = "https://friends.roblox.com"

/** /friends/find 한 페이지 최대 개수 (51부터 400 code 6) */
const FIND_PAGE_LIMIT = 50
/** 한 요청에 넣는 id 개수. statuses는 200까지, following-exists는 100까지 받았다 */
const MULTI_LIMIT = 100

const found = <T>(list: (T | null)[]) => list.filter((x): x is T => x !== null)

/** 한도는 2026-10 실측 (IP 단위) */
function countRoute(bucket: string, last: string[]): RobloxBatchRoute<RobloxUserId, number | null> {
    return {
        bucket, limit: 1, group: () => "",
        async send(http, [userId], onHeaders) {
            const res = await nullOn([400, 404], onHeaders, () => http()
                .path("v1", "users", userId, ...last)
                .middlewares(captureHeaders(onHeaders))
                .middlewares(validate(RobloxCountResponseSchema))
                .request())
            return [res?.count ?? null]
        },
    }
}

/** 친구 id 목록. 한 번에 전부 주는 /friends(20회/분)와, 50개씩 넘기는 /friends/find(100회/분)는 같은 목록이다. */
const friendIdRoutes: RobloxBatchRoute<RobloxUserId, RobloxUserId[] | null>[] = [
    {
        bucket: "friends GET /v1/users/{id}/friends", limit: 1, group: () => "",
        async send(http, [userId], onHeaders) {
            const res = await nullOn([400], onHeaders, () => http()
                .path("v1", "users", userId, "friends")
                .middlewares(captureHeaders(onHeaders))
                .middlewares(validate(RobloxFriendListResponseSchema))
                .request())
            return [res?.data.map(f => f.id) ?? null]
        },
    },
    {
        bucket: "friends GET /v1/users/{id}/friends/find", limit: 1, group: () => "",
        async send(http, [userId], onHeaders) {
            const ids: RobloxUserId[] = []
            let cursor: RobloxCursor | null = null
            do {
                const res = await nullOn([400], onHeaders, () => http()
                    .path("v1", "users", userId, "friends", "find")
                    .query(cursor ? { limit: FIND_PAGE_LIMIT, cursor } : { limit: FIND_PAGE_LIMIT })
                    .middlewares(captureHeaders(onHeaders))
                    .middlewares(validate(RobloxFriendPageRawSchema))
                    .request())
                if (!res) return [null]
                ids.push(...res.PageItems.map(f => f.id))
                cursor = res.NextCursor
            } while (cursor)
            return [ids]
        },
    },
]

/** friends.roblox.com */
export class RobloxFriendsApi {
    private readonly http
    private readonly friendIds
    private readonly friendCounts
    private readonly followerCounts
    private readonly followingCounts
    private readonly statuses
    private readonly areFriends
    private readonly followings
    /** viewer → 인증된 내 id */
    private readonly me = new Map<string, Promise<RobloxUserId>>()

    constructor(private readonly config: RobloxConfig, private readonly users: RobloxUsersApi) {
        this.http = createHttp(config, ORIGIN)
        this.friendIds = new RobloxBatcher(config, ORIGIN, friendIdRoutes)
        this.friendCounts = new RobloxBatcher(config, ORIGIN, [countRoute("friends GET /v1/users/{id}/friends/count", ["friends", "count"])])
        this.followerCounts = new RobloxBatcher(config, ORIGIN, [countRoute("friends GET /v1/users/{id}/followers/count", ["followers", "count"])])
        this.followingCounts = new RobloxBatcher(config, ORIGIN, [countRoute("friends GET /v1/users/{id}/followings/count", ["followings", "count"])])

        type Mine = { me: RobloxUserId, userId: RobloxUserId }
        const statusRoute: RobloxBatchRoute<Mine, RobloxFriendStatus | null> = {
            bucket: "friends GET /v1/users/{me}/friends/statuses", limit: MULTI_LIMIT, group: t => String(t.me),
            async send(http, targets, onHeaders) {
                const res = await http()
                    .path("v1", "users", targets[0].me, "friends", "statuses")
                    .query({ userIds: targets.map(t => t.userId) })
                    .middlewares(captureHeaders(onHeaders))
                    .middlewares(validate(RobloxFriendStatusesResponseSchema))
                    .request()
                const byId = new Map(res.data.map(s => [s.id, s]))
                return targets.map(t => byId.get(t.userId) ?? null)
            },
        }
        this.statuses = new RobloxBatcher(config, ORIGIN, [statusRoute])
        // 친구인지만 알면 될 때는 multiget-are-friends(100개씩)와 statuses가 같은 답을 준다. 한도는 따로다.
        this.areFriends = new RobloxBatcher<Mine, boolean>(config, ORIGIN, [
            {
                bucket: "friends POST /v1/user/{me}/multiget-are-friends", limit: MULTI_LIMIT, group: t => String(t.me),
                async send(http, targets, onHeaders) {
                    const res = await http()
                        .path("v1", "user", targets[0].me, "multiget-are-friends")
                        .body("overwrite", { targetUserIds: targets.map(t => t.userId) })
                        .middlewares(captureHeaders(onHeaders))
                        .middlewares(validate(z.object({ friendsId: z.array(z.number()) })))
                        .request()
                    const friends = new Set(res.friendsId)
                    return targets.map(t => friends.has(t.userId))
                },
            },
            mapRoute(statusRoute, s => s?.status === "Friends"),
        ])
        this.followings = new RobloxBatcher<Mine, RobloxFollowingStatus | null>(config, ORIGIN, [{
            bucket: "friends POST /v1/user/following-exists", limit: MULTI_LIMIT, group: t => String(t.me),
            async send(http, targets, onHeaders) {
                const res = await http()
                    .path("v1", "user", "following-exists")
                    .body("overwrite", { targetUserIds: targets.map(t => t.userId) })
                    .middlewares(captureHeaders(onHeaders))
                    .middlewares(validate(RobloxFollowingExistsResponseSchema))
                    .request()
                const byId = new Map(res.followings.map(f => [f.userId, f]))
                return targets.map(t => byId.get(t.userId) ?? null)
            },
        }])
    }

    private ttl(method: RobloxFriendsCacheable) {
        return resolveTtl(this.config, "friends", method)
    }

    /** 요청 계정의 id. 계정이 정해져 있지 않으면 에러 (requireViewer) */
    private async myId(): Promise<RobloxUserId> {
        const viewer = await requireViewer(this.config)
        let id = this.me.get(viewer)
        if (!id) {
            this.me.set(viewer, id = this.users.getAuthenticated().then(u => u.id))
            id.catch(() => this.me.delete(viewer))
        }
        return id
    }

    private each<R extends RobloxCacheValue<RobloxCacheKey>>(method: RobloxFriendsCacheable, ids: readonly RobloxUserId[], load: (id: RobloxUserId) => Promise<R | null>) {
        return Promise.all(ids.map(id => cached(this.config, ["friends", method, id] as RobloxCacheKey, this.ttl(method), () => load(id))))
    }

    // ── 공개 조회 ──────────────────────────────────────
    // 배열을 받는 메서드는 입력 순서로 돌려주고, 없는 유저는 뺀다.

    /**
     * 유저들의 친구 목록. friends API는 이름을 빈 문자열로 주므로 users API로 이름을 채운다.
     * /friends와 /friends/find(50개씩 넘김)를 한도에 맞춰 나눠 쓴다. `thumbnail`을 주면 친구들의 아바타 썸네일도 붙인다.
     */
    getFriends(userIds: readonly RobloxUserId[], opts: { thumbnail: true | RobloxAvatarThumbnailOptions }): Promise<RobloxUserFriends<RobloxWithThumbnail<RobloxUser>>[]>
    getFriends(userIds: readonly RobloxUserId[], opts?: { thumbnail?: undefined }): Promise<RobloxUserFriends[]>
    async getFriends(userIds: readonly RobloxUserId[], opts: { thumbnail?: true | RobloxAvatarThumbnailOptions } = {}): Promise<RobloxUserFriends[]> {
        const lists = await this.each("getFriends", userIds, id => this.friendIds.load(String(id), id))
        const all = [...new Set(lists.flatMap(l => l ?? []))]
        const users: RobloxUser[] = opts.thumbnail
            ? await this.users.getUsers(all, { thumbnail: opts.thumbnail })
            : await this.users.getUsers(all)
        const byId = new Map(users.map(u => [u.id, u]))
        return found(userIds.map((userId, i) => {
            const ids = lists[i]
            return ids ? { userId, friends: found(ids.map(id => byId.get(id) ?? null)) } : null
        }))
    }

    /** GET /v1/users/{userId}/friends/count */
    async getFriendCounts(userIds: readonly RobloxUserId[]): Promise<{ userId: RobloxUserId, count: number }[]> {
        const counts = await this.each("getFriendCounts", userIds, id => this.friendCounts.load(String(id), id))
        return found(userIds.map((userId, i) => counts[i] === null ? null : { userId, count: counts[i] }))
    }

    /** GET /v1/users/{userId}/followers/count */
    async getFollowerCounts(userIds: readonly RobloxUserId[]): Promise<{ userId: RobloxUserId, count: number }[]> {
        const counts = await this.each("getFollowerCounts", userIds, id => this.followerCounts.load(String(id), id))
        return found(userIds.map((userId, i) => counts[i] === null ? null : { userId, count: counts[i] }))
    }

    /** GET /v1/users/{userId}/followings/count */
    async getFollowingCounts(userIds: readonly RobloxUserId[]): Promise<{ userId: RobloxUserId, count: number }[]> {
        const counts = await this.each("getFollowingCounts", userIds, id => this.followingCounts.load(String(id), id))
        return found(userIds.map((userId, i) => counts[i] === null ? null : { userId, count: counts[i] }))
    }

    /** GET /v1/users/{userId}/followers — 인증 필요. 항목은 id뿐이다 */
    getFollowers(userId: RobloxUserId, query: RobloxFollowPageQuery = {}) {
        return this.http()
            .path("v1", "users", userId, "followers")
            .query(query)
            .middlewares(validate(RobloxFollowPageSchema))
            .request()
    }

    /** GET /v1/users/{userId}/followings — 인증 필요. 항목은 id뿐이다 */
    getFollowings(userId: RobloxUserId, query: RobloxFollowPageQuery = {}) {
        return this.http()
            .path("v1", "users", userId, "followings")
            .query(query)
            .middlewares(validate(RobloxFollowPageSchema))
            .request()
    }

    /** GET /v1/users/{userId}/friends/search — 친구를 이름으로 찾는다. 인증 필요 */
    async searchFriends(userId: RobloxUserId, query: RobloxFriendSearchQuery): Promise<RobloxFriendPage> {
        const res = await this.http()
            .path("v1", "users", userId, "friends", "search")
            .query(query)
            .middlewares(validate(RobloxFriendPageRawSchema))
            .request()
        return {
            previousPageCursor: res.PreviousCursor,
            nextPageCursor:     res.NextCursor,
            data:               res.PageItems.map(f => ({ id: f.id, hasVerifiedBadge: f.hasVerifiedBadge ?? null })),
        }
    }

    /** GET /v1/metadata — 친구 페이지 설정과 대상의 이름 */
    getMetadata(targetUserId: RobloxUserId) {
        return this.http()
            .path("v1", "metadata")
            .query({ targetUserId })
            .middlewares(validate(RobloxFriendsMetadataSchema))
            .request()
    }

    // ── 요청 계정 기준 (인증 필요, 계정 고정) ─────────

    /** GET /v1/users/{me}/friends/statuses — 나와의 관계 ("Friends", "RequestSent" 등) */
    async getFriendStatuses(userIds: readonly RobloxUserId[]): Promise<RobloxFriendStatus[]> {
        const me = await this.myId()
        return found(await Promise.all(userIds.map(userId => this.statuses.load(`${me}:${userId}`, { me, userId }))))
    }

    /** 나와 친구인지. multiget-are-friends와 statuses를 나눠 쓴다. */
    async getAreFriends(userIds: readonly RobloxUserId[]): Promise<{ userId: RobloxUserId, isFriend: boolean }[]> {
        const me = await this.myId()
        const list = await Promise.all(userIds.map(userId => this.areFriends.load(`${me}:${userId}`, { me, userId })))
        return userIds.map((userId, i) => ({ userId, isFriend: list[i] }))
    }

    /** POST /v1/user/following-exists — 내가 팔로우하는지 / 나를 팔로우하는지 */
    async getFollowingStatuses(userIds: readonly RobloxUserId[]): Promise<RobloxFollowingStatus[]> {
        const me = await this.myId()
        return found(await Promise.all(userIds.map(userId => this.followings.load(`${me}:${userId}`, { me, userId }))))
    }

    /** GET /v1/users/{me}/friends/online — 지금 접속 중인 내 친구와 위치 */
    async getOnlineFriends(): Promise<RobloxOnlineFriend[]> {
        const me = await this.myId()
        const res = await this.http()
            .path("v1", "users", me, "friends", "online")
            .middlewares(validate(RobloxOnlineFriendsResponseSchema))
            .request()
        return res.data
    }

    /** GET /v1/users/{me}/friends/inactive — 오래 접속하지 않은 내 친구 */
    async getInactiveFriends() {
        const me = await this.myId()
        const res = await this.http()
            .path("v1", "users", me, "friends", "inactive")
            .middlewares(validate(RobloxFriendListResponseSchema))
            .request()
        return res.data.map(f => f.id)
    }

    /** GET /v1/my/friends/requests — 받은 친구 요청 */
    getFriendRequests(query: RobloxFriendRequestsQuery = {}) {
        return this.http()
            .path("v1", "my", "friends", "requests")
            .query(query)
            .middlewares(validate(RobloxFriendRequestPageSchema))
            .request()
    }

    /** GET /v1/my/trusted-friends/requests — 받은 신뢰하는 친구 요청 */
    getTrustedFriendRequests(query: { limit?: number, cursor?: RobloxCursor, sortOrder?: 0 | 1 } = {}) {
        return this.http()
            .path("v1", "my", "trusted-friends", "requests")
            .query(query)
            .middlewares(validate(RobloxTrustedFriendRequestPageSchema))
            .request()
    }

    /** 받은 요청 수. `unseen`이면 아직 보지 않은 것만 (/my/new-friend-requests/count) */
    async getFriendRequestCount(opts: { unseen?: boolean, trusted?: boolean } = {}): Promise<number> {
        const path = opts.unseen
            ? ["v1", "my", "new-friend-requests", "count"]
            : ["v1", "user", opts.trusted ? "trusted-friend-requests" : "friend-requests", "count"]
        const res = await this.http()
            .path(...path)
            .middlewares(validate(RobloxCountResponseSchema))
            .request()
        return res.count
    }

    // ── 쓰기 ───────────────────────────────────────────
    // 문서에 없는 엔드포인트(request-friendship 등)는 실측으로 확인했다.

    /** POST /v1/users/{userId}/request-friendship — 계정에 따라 챌린지(캡차)를 요구하며 403이 난다 */
    async sendFriendRequest(userId: RobloxUserId): Promise<void> {
        await this.http()
            .path("v1", "users", userId, "request-friendship")
            .body("overwrite", {})
            .middlewares(validate(z.unknown()))
            .request()
    }

    /** POST /v1/users/{userId}/accept-friend-request */
    async acceptFriendRequest(userId: RobloxUserId): Promise<void> {
        await this.http()
            .path("v1", "users", userId, "accept-friend-request")
            .body("overwrite", {})
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** POST /v1/users/{userId}/decline-friend-request */
    async declineFriendRequest(userId: RobloxUserId): Promise<void> {
        await this.http()
            .path("v1", "users", userId, "decline-friend-request")
            .body("overwrite", {})
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** POST /v1/user/friend-requests/decline-all */
    async declineAllFriendRequests(): Promise<void> {
        await this.http()
            .path("v1", "user", "friend-requests", "decline-all")
            .body("overwrite", {})
            .middlewares(validate(z.unknown()))
            .request()
    }

    /** POST /v1/users/{userId}/unfriend */
    async unfriend(userId: RobloxUserId): Promise<void> {
        await this.http()
            .path("v1", "users", userId, "unfriend")
            .body("overwrite", {})
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** POST /v1/users/{userId}/follow — 캡차가 필요하면 `isCaptchaRequired`가 true로 온다 */
    follow(userId: RobloxUserId, captcha: RobloxCaptchaTokenRequest = {}) {
        return this.http()
            .path("v1", "users", userId, "follow")
            .body("overwrite", captcha)
            .middlewares(validate(RobloxCaptchaStatusSchema))
            .request()
    }

    /** POST /v1/users/{userId}/unfollow */
    async unfollow(userId: RobloxUserId): Promise<void> {
        await this.http()
            .path("v1", "users", userId, "unfollow")
            .body("overwrite", {})
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** POST /v1/my/friends/refresh-qr-session — QR 친구 추가 세션 갱신 */
    async refreshQrSession(): Promise<boolean> {
        const res = await this.http()
            .path("v1", "my", "friends", "refresh-qr-session")
            .body("overwrite", {})
            .middlewares(validate(z.object({ Success: z.boolean() })))
            .request()
        return res.Success
    }

    /** GET /v1/my/friends/{userId}/check-qr-session — QR로 친구가 됐는지 */
    checkQrSession(userId: RobloxUserId) {
        return this.http()
            .path("v1", "my", "friends", userId, "check-qr-session")
            .middlewares(validate(z.boolean()))
            .request()
    }
}
