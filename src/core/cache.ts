import type { RobloxBadgeId, RobloxGroupId, RobloxJobId, RobloxPlaceId, RobloxUniverseId } from "@/types/common"
import type { RobloxUserId, RobloxUserDetail, RobloxUser, RobloxUserByName, RobloxUsernameHistoryQuery, RobloxUsernameHistoryResponse } from "@/types/users"
import type { RobloxThumbnail, RobloxThumbnailTarget, RobloxUniverseThumbnails, RobloxUniverseThumbnailsQuery } from "@/types/thumbnails"
import type { RobloxUserPresence } from "@/types/presence"
import type {
    RobloxGame, RobloxGameMedia, RobloxGamePlayability, RobloxGameProduct, RobloxGameVotes,
    RobloxIpAddress, RobloxPlaceDetails, RobloxServerAddress,
} from "@/types/games"
import type { RobloxBadge } from "@/types/badges"
import type { RobloxGroup, RobloxGroupDetail, RobloxGroupRole, RobloxGroupRoleDetail, RobloxGroupRoleId, RobloxUserGroupRole } from "@/types/groups"

/**
 * 요청 계정에 따라 결과가 달라지는 항목의 계정 구분. 쿠키는 원문 대신 해시가 들어간다.
 * 쿠키를 돌려 쓰는 중에는 관점을 정할 수 없어 이런 항목을 아예 캐시하지 않는다.
 */
export type RobloxViewerKey = "extension" | "anonymous" | `cookie:${string}`

/**
 * 캐시 항목 하나: 키(`[서비스, 메서드, ...인자]`)와 거기 저장되는 값.
 * 배열을 받는 메서드는 항목 하나씩 저장한다. 없는 대상(null)이나 곧 바뀔 상태(Pending 등)는 저장하지 않는다.
 */
export type RobloxCacheEntry =
    // users
    | { key: ["users", "getUserDetails", userId: RobloxUserId], value: RobloxUserDetail }
    | { key: ["users", "getUsers", userId: RobloxUserId, excludeBannedUsers: boolean], value: RobloxUser }
    /** 이름은 소문자로 맞춘다 (대소문자를 가리지 않는 조회) */
    | { key: ["users", "getUsersByNames", username: string, excludeBannedUsers: boolean], value: RobloxUserByName }
    | { key: ["users", "getUsernameHistory", userId: RobloxUserId, query: RobloxUsernameHistoryQuery], value: RobloxUsernameHistoryResponse }
    // thumbnails — target은 기본값(size/format/isCircular)을 채운 뒤의 모양. token 대상은 일회용이라 캐시하지 않는다
    | { key: ["thumbnails", "get", target: RobloxThumbnailTarget], value: RobloxThumbnail }
    | { key: ["thumbnails", "getGameThumbnails", universeId: RobloxUniverseId, query: RobloxUniverseThumbnailsQuery], value: RobloxUniverseThumbnails }
    // presence
    | { key: ["presence", "get", viewer: RobloxViewerKey, userId: RobloxUserId], value: RobloxUserPresence }
    // games
    | { key: ["games", "getGames", universeId: RobloxUniverseId], value: RobloxGame }
    | { key: ["games", "getUniverseIds", placeId: RobloxPlaceId], value: RobloxUniverseId }
    | { key: ["games", "getPlaceDetails", viewer: RobloxViewerKey, placeId: RobloxPlaceId], value: RobloxPlaceDetails }
    | { key: ["games", "getProductInfo", universeId: RobloxUniverseId], value: RobloxGameProduct }
    | { key: ["games", "getPlayability", viewer: RobloxViewerKey, universeId: RobloxUniverseId], value: RobloxGamePlayability }
    | { key: ["games", "getVotes", universeId: RobloxUniverseId], value: RobloxGameVotes }
    | { key: ["games", "getFavoriteCounts", universeId: RobloxUniverseId], value: number }
    | { key: ["games", "getMedia", universeId: RobloxUniverseId, all: boolean], value: RobloxGameMedia[] }
    | { key: ["games", "getServerAddresses", jobId: RobloxJobId], value: RobloxServerAddress }
    /** 값은 `.geolocation(fn)` 콜백이 돌려준 값 그대로다. 모양은 사용자가 정하므로 타입을 알 수 없다 */
    | { key: ["games", "getServerLocations", ip: RobloxIpAddress], value: unknown }
    // friends
    | { key: ["friends", "getFriends", userId: RobloxUserId], value: RobloxUserId[] }
    | { key: ["friends", "getFriendCounts", userId: RobloxUserId], value: number }
    | { key: ["friends", "getFollowerCounts", userId: RobloxUserId], value: number }
    | { key: ["friends", "getFollowingCounts", userId: RobloxUserId], value: number }
    // groups
    | { key: ["groups", "getGroups", groupId: RobloxGroupId], value: RobloxGroup }
    | { key: ["groups", "getGroupDetails", groupId: RobloxGroupId], value: RobloxGroupDetail }
    | { key: ["groups", "getRoles", groupId: RobloxGroupId], value: RobloxGroupRole[] }
    | { key: ["groups", "getRolesByIds", roleId: RobloxGroupRoleId], value: RobloxGroupRoleDetail }
    | { key: ["groups", "getUserGroups", userId: RobloxUserId], value: RobloxUserGroupRole[] }
    // badges — 받은 날짜는 받은 배지만 저장한다 (받지 않은 상태는 곧 바뀔 수 있다)
    | { key: ["badges", "getBadges", badgeId: RobloxBadgeId], value: RobloxBadge }
    | { key: ["badges", "getAwardedDates", userId: RobloxUserId, badgeId: RobloxBadgeId], value: string }

/** 캐시 키. `key[0]`(서비스), `key[1]`(메서드)로 switch하면 나머지 원소의 타입이 좁혀진다. */
export type RobloxCacheKey = RobloxCacheEntry["key"]

/** `"서비스.메서드"` → 저장되는 값 */
export type RobloxCacheValues = { [E in RobloxCacheEntry as `${E["key"][0]}.${E["key"][1]}`]: E["value"] }

/** 키에 저장되는 값의 타입 */
export type RobloxCacheValue<K extends RobloxCacheKey> = K extends RobloxCacheKey
    ? `${K[0]}.${K[1]}` extends infer P extends keyof RobloxCacheValues ? RobloxCacheValues[P] : never
    : never

/**
 * `.cache(store)`에 넣는 저장소. 없는 키는 `undefined`를 돌려준다.
 * 키는 튜플이라 그대로는 Map 키로 쓸 수 없다 — 문자열이 필요하면 `robloxCacheKeyString(key)`를 쓴다.
 * TTL이 0인 메서드도 get/set이 그대로 불린다. 0을 "저장하지 않음"으로 볼지 "만료 없음" 등으로 볼지는 저장소가 정한다.
 *
 * ```ts
 * get(key) {
 *     switch (key[0]) {
 *         case "presence": return redis.get(`presence:${key[2]}:${key[3]}`)   // key[2]: RobloxViewerKey
 *         case "games":    return key[1] === "getServerLocations" ? geoTable.get(key[2]) : memory.get(robloxCacheKeyString(key))
 *         default:         return memory.get(robloxCacheKeyString(key))
 *     }
 * }
 * ```
 */
export interface RobloxCacheStore {
    get<K extends RobloxCacheKey>(key: K): RobloxCacheValue<K> | undefined | Promise<RobloxCacheValue<K> | undefined>
    set<K extends RobloxCacheKey>(key: K, value: RobloxCacheValue<K>, ttl: number): void | Promise<void>
}

/** 키를 안정적인 문자열로. 객체 인자는 키 순서를 정렬해 같은 값이면 같은 문자열이 나온다. */
export function robloxCacheKeyString(key: RobloxCacheKey): string {
    return JSON.stringify(key, (_, value) => value && typeof value === "object" && !Array.isArray(value)
        ? Object.fromEntries(Object.keys(value).sort().map(k => [k, value[k]]))
        : value)
}

/** 프로세스 메모리에 두는 기본 구현. 기본값으로 쓰이지 않으므로 직접 넣어야 한다. */
export class RobloxMemoryCache implements RobloxCacheStore {
    private entries = new Map<string, { value: unknown, expiresAt: number }>()
    private lastSweep = Date.now()

    /** @param sweepInterval 만료된 항목을 한꺼번에 지우는 간격(ms). 저장할 때 확인한다. 기본 1분 */
    constructor(private readonly sweepInterval = 60_000) {}

    private sweep(now: number) {
        if (now - this.lastSweep < this.sweepInterval) return
        this.lastSweep = now
        for (const [id, entry] of this.entries) if (entry.expiresAt <= now) this.entries.delete(id)
    }

    get<K extends RobloxCacheKey>(key: K): RobloxCacheValue<K> | undefined {
        const id = robloxCacheKeyString(key)
        const entry = this.entries.get(id)
        if (!entry) return undefined
        if (entry.expiresAt <= Date.now()) {
            this.entries.delete(id)
            return undefined
        }
        return entry.value as RobloxCacheValue<K>
    }

    /** TTL이 0 이하면 저장하지 않는다 */
    set<K extends RobloxCacheKey>(key: K, value: RobloxCacheValue<K>, ttl: number): void {
        if (ttl <= 0) return
        const now = Date.now()
        this.sweep(now)
        this.entries.set(robloxCacheKeyString(key), { value, expiresAt: now + ttl })
    }
}
