import type { RobloxCacheStore } from "./cache"
import type { RobloxCookie, RobloxCookieRejectedHandler, RobloxCookieStore } from "./cookies"
import type { RobloxRateLimiter } from "./ratelimit"
import type { RobloxGeolocator } from "@/types/games"
import type { RobloxUsersCacheable } from "@/apis/users"
import type { RobloxThumbnailsCacheable } from "@/apis/thumbnails"
import type { RobloxPresenceCacheable } from "@/apis/presence"
import type { RobloxGamesCacheable } from "@/apis/games"
import type { RobloxFriendsCacheable } from "@/apis/friends"
import type { RobloxGroupsCacheable } from "@/apis/groups"
import type { RobloxBadgesCacheable } from "@/apis/badges"
import type { RobloxChatCacheable } from "@/apis/chat"
import type { RobloxTradesCacheable } from "@/apis/trades"

export type RobloxMode = "extension" | "node"

export type RobloxRetryOptions = {
    /** 요청당 최대 시도 횟수. 기본 5 */
    maxAttempts?: number
    /** 시도당 타임아웃(ms). 기본 20000 */
    timeout?: number
}

/** 서비스 → 메서드 → TTL(ms). 적지 않은 메서드는 기본값(`RobloxDefaultTtl`)을 쓴다. 0 이하면 캐시하지 않는다 (저장소의 get/set을 부르지 않는다). 만료 없이 두려면 `Infinity`. */
export type RobloxTtl = {
    users?: Partial<Record<RobloxUsersCacheable, number>>
    thumbnails?: Partial<Record<RobloxThumbnailsCacheable, number>>
    presence?: Partial<Record<RobloxPresenceCacheable, number>>
    games?: Partial<Record<RobloxGamesCacheable, number>>
    friends?: Partial<Record<RobloxFriendsCacheable, number>>
    groups?: Partial<Record<RobloxGroupsCacheable, number>>
    badges?: Partial<Record<RobloxBadgesCacheable, number>>
    chat?: Partial<Record<RobloxChatCacheable, number>>
    trades?: Partial<Record<RobloxTradesCacheable, number>>
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * 기본 TTL(ms). `.cache(store)`를 넣었을 때만 쓰인다. 값이 얼마나 자주 바뀌는지에 맞췄다
 * (4.1의 기본값이 있던 것은 그대로 따랐다).
 */
export const RobloxDefaultTtl = {
    users: {
        getUsers:           DAY,
        getUserDetails:     HOUR,       // 설명/정지 여부는 이름보다 자주 바뀐다
        getUsersByNames:    30 * MINUTE, // 이름은 남이 가져갈 수 있다
        getUsernameHistory: HOUR,
        searchUsers:        5 * SECOND,
        // 요청 계정 기준이다. 기본으로는 캐시하지 않는다
        getProfileActions:  0,
        getAuthenticated:   0,
        getAgeBracket:      0,
        getCountryCode:     0,
        getRoles:           0,
        getBirthdate:       0,
        getDescription:     0,
        getGender:          0,
    },
    thumbnails: {
        get:               DAY,        // 아바타는 바뀔 수 있다 (4.1은 48시간)
        getGameThumbnails: HOUR,
    },
    presence: {
        get: 30 * SECOND,
    },
    games: {
        getGames:           5 * MINUTE, // playing 수가 들어 있다
        getUniverseIds:     30 * DAY,   // place → universe는 바뀌지 않는다
        getPlaceDetails:    HOUR,
        getProductInfo:     HOUR,
        getPlayability:     5 * MINUTE,
        getVotes:           5 * MINUTE,
        getFavoriteCounts:  5 * MINUTE,
        getMedia:           HOUR,
        getSocialLinks:     HOUR,
        getServerAddresses: 30 * MINUTE, // 서버가 살아 있는 동안 같다
        getServerLocations: 31 * DAY,    // IP → 위치
        // 아래는 금방 바뀌거나 페이지째 받는 목록이라 아주 짧게 둔다. 짧은 시간 안에 같은 걸 다시 묻는 경우(여러 탭, 인스턴스, 새로고침)만 막는다
        getServerPage:            5 * SECOND, // 엔드포인트당 3회/분
        getRecommendations:       5 * SECOND,
        getUserGames:             5 * SECOND,
        getUserFavoriteGames:     5 * SECOND,
        getGroupGames:            5 * SECOND,
        getPrivateServersEnabled: 5 * SECOND,
        // 요청 계정 기준이다. 기본으로는 캐시하지 않는다
        getFavorited:            0,
        getUserVotes:            0,
        getFollowing:            0,
        getPrivateServers:       0,
        getMyPrivateServers:     0,
        getPrivateServerDetails: 0,
        getPrivateServerInvites: 0,
    },
    friends: {
        getFriends:         10 * MINUTE,
        getFriendCounts:    10 * MINUTE,
        getFollowerCounts:  10 * MINUTE,
        getFollowingCounts: 10 * MINUTE,
        getFollowers:       5 * SECOND,
        getFollowings:      5 * SECOND,
        getMetadata:        10 * MINUTE,
        // 요청 계정 기준이다. 기본으로는 캐시하지 않는다
        searchFriends:            0,
        getFriendStatuses:        0,
        getAreFriends:            0,
        getFollowingStatuses:     0,
        getBlockStatuses:         0,
        getOnlineFriends:         0,
        getInactiveFriends:       0,
        getFriendRequests:        0,
        getTrustedFriendRequests: 0,
        getFriendRequestCount:    0,
    },
    groups: {
        getGroups:       HOUR,
        getGroupDetails: 10 * MINUTE, // 멤버 수가 들어 있다
        getRoles:        HOUR,
        getRolesByIds:   HOUR,
        getUserGroups:   10 * MINUTE,
        getPrimaryGroups:         10 * MINUTE,
        getMembers:               5 * SECOND,
        getRoleMembers:           5 * SECOND,
        searchGroups:             5 * SECOND,
        lookupGroups:             5 * SECOND,
        getNameHistory:           HOUR,
        getRelationships:         5 * SECOND,
        getGuestPermissions:      HOUR,
        getFeatureFreezes:        10 * MINUTE,
        getFeaturedEvents:        10 * MINUTE,
        getSocialLinks:           HOUR,
        getEmotes:                HOUR,
        getConfigurationMetadata: HOUR,
        getSearchMetadata:        HOUR,
        // 요청 계정 기준이다. 기본으로는 캐시하지 않는다
        getMetadata:             0,
        getMemberships:          0,
        getPolicies:             0,
        getPendingGroups:        0,
        getFriendsGroups:        0,
        getRolePermissions:      0,
        getUserPermissions:      0,
        getJoinRequests:         0,
        getJoinRequestsByUsers:  0,
        getBans:                 0,
        getBannedUsers:          0,
        getAuditLog:             0,
        getSettings:             0,
        getConfigurations:       0,
        getFeatures:             0,
        getFeaturesBlocked:      0,
        getKeywords:             0,
        getRelationshipRequests: 0,
        getPayouts:              0,
        getPayoutRestrictions:   0,
    },
    badges: {
        getBadges:       10 * MINUTE, // 통계(획득 수)가 들어 있다
        getAwardedDates: DAY,         // 받은 날짜는 바뀌지 않는다 (유저가 지우면 사라진다)
        getUniverseBadges: 5 * SECOND,
        getMetadata:       HOUR,
        // 요청 계정 기준이다. 기본으로는 캐시하지 않는다
        getUserBadges:     0,
        getFreeQuotas:     0,
    },
    // 전부 요청 계정 기준이다. 기본으로는 캐시하지 않는다
    chat: {
        getConversations:    0,
        listConversations:   0,
        searchConversations: 0,
        getMessages:         0,
        searchMessages:      0,
        getUnreadCounts:     0,
        getMetadata:         0,
    },
    trades: {
        canTradeWith: 0, // 요청 계정 기준
    },
} as const satisfies { [S in keyof RobloxTtl]-?: Required<NonNullable<RobloxTtl[S]>> }

/** 메서드의 TTL. 지정한 값이 없으면 기본값 */
export function resolveTtl<S extends keyof RobloxTtl>(config: RobloxConfig, service: S, method: keyof NonNullable<RobloxTtl[S]> & keyof (typeof RobloxDefaultTtl)[S]): number {
    const own = (config.ttl[service] as Record<PropertyKey, number> | undefined)?.[method]
    return own ?? (RobloxDefaultTtl[service] as Record<PropertyKey, number>)[method]
}

/** `.ttl()`을 여러 번 불러도 서비스 안의 메서드끼리 합쳐지게 한다 */
export function mergeTtl(base: RobloxTtl, next: RobloxTtl): RobloxTtl {
    const out: Record<string, Record<string, number> | undefined> = { ...base }
    for (const [service, methods] of Object.entries(next)) out[service] = { ...out[service], ...methods }
    return out as RobloxTtl
}

export type RobloxConfig = {
    readonly mode: RobloxMode
    /** 돌려 쓸 쿠키 풀. null이면 쿠키 없이(익명으로) 보낸다 */
    readonly cookies: RobloxCookieStore | null
    /** 401을 받은 쿠키를 처리한다. null이면 기본 처리(`cookies.remove`) */
    readonly onCookieRejected: RobloxCookieRejectedHandler | null
    /**
     * 캐시 키 문자열 → 진행 중인 조회. 같은 프로세스에서 같은 대상을 동시에 물으면 저장소 조회와 요청을 한 번만 한다.
     * 체인 전체(`.as(cookie)` 포함)가 공유한다. 끝나면 지운다.
     */
    readonly inflight: Map<string, Promise<unknown>>
    /** 쿠키 → 진행 중인 거부 처리. 같은 쿠키로 동시에 401을 여러 번 받아도 한 번만 부른다. 체인 전체가 공유한다. */
    readonly rejecting: Map<RobloxCookie, Promise<void>>
    /** `.as(cookie)`로 고정한 쿠키. 있으면 `cookies` 로테이션 대신 이것만 쓴다. */
    readonly fixedCookie: RobloxCookie | null
    readonly retry: RobloxRetryOptions
    readonly cache: RobloxCacheStore | null
    readonly ttl: RobloxTtl
    /** 쿠키(확장 모드는 "extension") → X-CSRF-Token. 체인 전체가 공유한다. */
    readonly csrf: Map<string, string>
    /** 엔드포인트별 레이트리밋 상태. Roblox 한도는 IP 단위라 체인 전체가 공유한다. `.rateLimits(store)`로 밖과 동기화할 수 있다. */
    readonly rateLimits: RobloxRateLimiter
    /** IP → 위치 콜백. 있으면 서버 위치를 조회할 수 있다. */
    readonly geolocate: RobloxGeolocator | null
}
