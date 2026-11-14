import type { RobloxBadgeId, RobloxConversationId, RobloxGroupId, RobloxPrivateServerId, RobloxJobId, RobloxPlaceId, RobloxUniverseId } from "@/types/common"
import type {
    RobloxUserId, RobloxUserDetail, RobloxUser, RobloxUserByName, RobloxUsernameHistoryQuery, RobloxUsernameHistoryResponse,
    RobloxUserSearchQuery, RobloxUserSearchResponse, RobloxProfileActions, RobloxAuthenticatedUser, RobloxAgeBracket, RobloxUserCountryCode,
    RobloxUserRoles, RobloxBirthdate, RobloxUserDescription, RobloxUserGender,
} from "@/types/users"
import type { RobloxThumbnail, RobloxThumbnailTarget, RobloxUniverseThumbnails, RobloxUniverseThumbnailsQuery } from "@/types/thumbnails"
import type { RobloxUserPresence } from "@/types/presence"
import type {
    RobloxFavoriteGamePage, RobloxGame, RobloxGameListQuery, RobloxGameMedia, RobloxGamePlayability, RobloxGameSocialLink, RobloxGameProduct,
    RobloxGameRecommendations, RobloxGameSummaryPage, RobloxGameVotes, RobloxIpAddress, RobloxPlaceDetails,
    RobloxRecommendationsQuery, RobloxServerAddress, RobloxCachedServerPage, RobloxServerPageQuery,
    RobloxUserGameVote, RobloxGameFollowStatus, RobloxPrivateServerPageQuery, RobloxPrivateServerPageRawSchema, RobloxMyPrivateServersQuery,
    RobloxMyPrivateServerPage, RobloxPrivateServerDetail, RobloxPrivateServerInvite,
} from "@/types/games"
import type {
    RobloxFollowPage, RobloxFollowPageQuery, RobloxFriendsMetadata, RobloxFriendSearchQuery, RobloxFriendPage, RobloxFriendStatus,
    RobloxFollowingStatus, RobloxBlockStatus, RobloxOnlineFriend, RobloxFriendRequestsQuery, RobloxFriendRequestPage,
    RobloxTrustedFriendRequestsQuery, RobloxTrustedFriendRequestPage,
} from "@/types/friends"
import type z from "zod"
import type { RobloxCanTrade } from "@/types/trades"
import type {
    RobloxChatConversation, RobloxChatConversationPage, RobloxChatMessagePage, RobloxChatMetadata, RobloxChatPageQuery, RobloxChatUnreadCounts,
} from "@/types/chat"
import type {
    RobloxBadge, RobloxBadgeMetadata, RobloxBadgePageQuery, RobloxUniverseBadgesQuery, RobloxBadgePageSchema, RobloxUserBadgePageSchema,
} from "@/types/badges"
import type {
    RobloxGroup, RobloxGroupDetail, RobloxGroupRole, RobloxGroupRoleDetail, RobloxGroupRoleId, RobloxUserGroupRole,
    RobloxPrimaryGroup, RobloxGroupPageQuery, RobloxGroupMemberPage, RobloxGroupUserPage, RobloxGroupSearchQuery, RobloxGroupSearchPage,
    RobloxGroupLookupResponseSchema, RobloxGroupNameHistoryPage, RobloxGroupRelationshipType, RobloxGroupRelationshipsQuery,
    RobloxGroupRelationships, RobloxGroupRolePermissions, RobloxGroupFeatureFreeze, RobloxGroupFeaturedEvent, RobloxGroupSocialLink,
    RobloxGroupEmoteSet, RobloxGroupConfigurationMetadata, RobloxGroupSearchMetadata, RobloxGroupsMetadata, RobloxGroupMembership,
    RobloxGroupDetailPartial, RobloxFriendsGroupsResponseSchema, RobloxGroupJoinRequestPage, RobloxGroupJoinRequest, RobloxGroupBanPage,
    RobloxGroupBan, RobloxGroupAuditLogQuery, RobloxGroupAuditLogPage, RobloxGroupSettings, RobloxGroupConfiguration, RobloxGroupFeatures,
    RobloxGroupKeywordPage, RobloxGroupPayout, RobloxGroupPayoutRestriction,
} from "@/types/groups"

/** 빌드할 때 package.json의 version으로 바뀐다 (tsup `define`) */
declare const __VIGOR_ROBLOX_VERSION__: string

/**
 * 요청 계정에 따라 결과가 달라지는 항목의 계정 구분. 쿠키는 원문 대신 해시가 들어간다.
 * 쿠키를 돌려 쓰는 중에는 관점을 정할 수 없어 이런 항목을 아예 캐시하지 않는다.
 */
export type RobloxViewerKey = "extension" | "anonymous" | `cookie:${string}`

type Entry<S extends string, M extends string, A extends object, V> = { info: { service: S, method: M } & A, value: V }

/**
 * 캐시 항목 하나: 저장소에 `info`로 넘어가는 분류 데이터와 거기 저장되는 값.
 * 배열을 받는 메서드는 항목 하나씩 저장한다. 없는 대상(null)이나 곧 바뀔 상태(Pending 등)는 저장하지 않는다.
 */
export type RobloxCacheEntry =
    // users
    | Entry<"users", "getUserDetails", { userId: RobloxUserId }, RobloxUserDetail>
    | Entry<"users", "getUsers", { userId: RobloxUserId, excludeBannedUsers: boolean }, RobloxUser>
    /** 이름은 소문자로 맞춘다 (대소문자를 가리지 않는 조회) */
    | Entry<"users", "getUsersByNames", { username: string, excludeBannedUsers: boolean }, RobloxUserByName>
    | Entry<"users", "getUsernameHistory", { userId: RobloxUserId, query: RobloxUsernameHistoryQuery }, RobloxUsernameHistoryResponse>
    | Entry<"users", "searchUsers", { query: RobloxUserSearchQuery }, RobloxUserSearchResponse>
    | Entry<"users", "getProfileActions", { viewer: RobloxViewerKey, userId: RobloxUserId }, RobloxProfileActions>
    | Entry<"users", "getAuthenticated", { viewer: RobloxViewerKey }, RobloxAuthenticatedUser>
    | Entry<"users", "getAgeBracket", { viewer: RobloxViewerKey }, RobloxAgeBracket>
    | Entry<"users", "getCountryCode", { viewer: RobloxViewerKey }, RobloxUserCountryCode["countryCode"]>
    | Entry<"users", "getRoles", { viewer: RobloxViewerKey }, RobloxUserRoles["roles"]>
    | Entry<"users", "getBirthdate", { viewer: RobloxViewerKey }, RobloxBirthdate>
    | Entry<"users", "getDescription", { viewer: RobloxViewerKey }, RobloxUserDescription["description"]>
    | Entry<"users", "getGender", { viewer: RobloxViewerKey }, RobloxUserGender["gender"]>
    // thumbnails — target은 기본값(size/format/isCircular)을 채운 뒤의 모양. token 대상은 일회용이라 캐시하지 않는다
    | Entry<"thumbnails", "get", { target: RobloxThumbnailTarget }, RobloxThumbnail>
    | Entry<"thumbnails", "getGameThumbnails", { universeId: RobloxUniverseId, query: RobloxUniverseThumbnailsQuery }, RobloxUniverseThumbnails>
    // presence
    | Entry<"presence", "get", { viewer: RobloxViewerKey, userId: RobloxUserId }, RobloxUserPresence>
    // games
    | Entry<"games", "getGames", { universeId: RobloxUniverseId }, RobloxGame>
    | Entry<"games", "getUniverseIds", { placeId: RobloxPlaceId }, RobloxUniverseId>
    | Entry<"games", "getPlaceDetails", { viewer: RobloxViewerKey, placeId: RobloxPlaceId }, RobloxPlaceDetails>
    | Entry<"games", "getProductInfo", { universeId: RobloxUniverseId }, RobloxGameProduct>
    | Entry<"games", "getPlayability", { viewer: RobloxViewerKey, universeId: RobloxUniverseId }, RobloxGamePlayability>
    | Entry<"games", "getVotes", { universeId: RobloxUniverseId }, RobloxGameVotes>
    | Entry<"games", "getFavoriteCounts", { universeId: RobloxUniverseId }, number>
    | Entry<"games", "getMedia", { universeId: RobloxUniverseId, all: boolean }, RobloxGameMedia[]>
    | Entry<"games", "getSocialLinks", { universeId: RobloxUniverseId }, RobloxGameSocialLink[]>
    /** jobId는 place 안에서만 겹치지 않으므로 placeId와 함께 쓴다 */
    | Entry<"games", "getServerAddresses", { placeId: RobloxPlaceId, jobId: RobloxJobId }, RobloxServerAddress>
    /** 값은 `.geolocation(fn)` 콜백이 돌려준 값 그대로다. 모양은 사용자가 정하므로 타입을 알 수 없고, 키에 라이브러리 버전이 붙지 않는다 */
    | Entry<"games", "getServerLocations", { ip: RobloxIpAddress }, unknown>
    /**
     * Public은 인증 여부만 구분한다 (플레이어 토큰은 받은 계정에 묶이지 않는다 — 2026-10 실측). Friend는 계정별이다.
     * query의 serverType은 기본값(Public)을 채운 뒤의 모양. 값에는 썸네일을 받는 데 쓰는 플레이어 토큰이 들어 있다
     */
    | Entry<"games", "getServerPage", { access: RobloxViewerKey | "authenticated", placeId: RobloxPlaceId, query: RobloxServerPageQuery }, RobloxCachedServerPage>
    | Entry<"games", "getRecommendations", { universeId: RobloxUniverseId, query: RobloxRecommendationsQuery }, RobloxGameRecommendations>
    | Entry<"games", "getUserGames", { userId: RobloxUserId, query: RobloxGameListQuery }, RobloxGameSummaryPage>
    | Entry<"games", "getUserFavoriteGames", { userId: RobloxUserId, query: RobloxGameListQuery }, RobloxFavoriteGamePage>
    | Entry<"games", "getGroupGames", { groupId: RobloxGroupId, query: RobloxGameListQuery }, RobloxGameSummaryPage>
    | Entry<"games", "getPrivateServersEnabled", { universeId: RobloxUniverseId }, boolean>
    | Entry<"games", "getFavorited", { viewer: RobloxViewerKey, universeId: RobloxUniverseId }, boolean>
    | Entry<"games", "getUserVotes", { viewer: RobloxViewerKey, universeId: RobloxUniverseId }, RobloxUserGameVote>
    | Entry<"games", "getFollowing", { viewer: RobloxViewerKey, universeId: RobloxUniverseId }, RobloxGameFollowStatus>
    /** 값은 플레이어 헤드샷을 붙이기 전의 응답이다 (플레이어 토큰이 들어 있다) */
    | Entry<"games", "getPrivateServers", { viewer: RobloxViewerKey, placeId: RobloxPlaceId, query: RobloxPrivateServerPageQuery }, z.output<typeof RobloxPrivateServerPageRawSchema>>
    | Entry<"games", "getMyPrivateServers", { viewer: RobloxViewerKey, query: RobloxMyPrivateServersQuery }, RobloxMyPrivateServerPage>
    | Entry<"games", "getPrivateServerDetails", { viewer: RobloxViewerKey, privateServerId: RobloxPrivateServerId }, RobloxPrivateServerDetail>
    | Entry<"games", "getPrivateServerInvites", { viewer: RobloxViewerKey, userId: RobloxUserId }, RobloxPrivateServerInvite>
    // friends
    | Entry<"friends", "getFriends", { userId: RobloxUserId }, RobloxUserId[]>
    | Entry<"friends", "getFriendCounts", { userId: RobloxUserId }, number>
    | Entry<"friends", "getFollowerCounts", { userId: RobloxUserId }, number>
    | Entry<"friends", "getFollowingCounts", { userId: RobloxUserId }, number>
    | Entry<"friends", "getFollowers", { userId: RobloxUserId, query: RobloxFollowPageQuery }, RobloxFollowPage>
    | Entry<"friends", "getFollowings", { userId: RobloxUserId, query: RobloxFollowPageQuery }, RobloxFollowPage>
    | Entry<"friends", "getMetadata", { targetUserId: RobloxUserId }, RobloxFriendsMetadata>
    | Entry<"friends", "searchFriends", { viewer: RobloxViewerKey, userId: RobloxUserId, query: RobloxFriendSearchQuery }, RobloxFriendPage>
    | Entry<"friends", "getFriendStatuses", { viewer: RobloxViewerKey, userId: RobloxUserId }, RobloxFriendStatus>
    | Entry<"friends", "getAreFriends", { viewer: RobloxViewerKey, userId: RobloxUserId }, boolean>
    | Entry<"friends", "getFollowingStatuses", { viewer: RobloxViewerKey, userId: RobloxUserId }, RobloxFollowingStatus>
    | Entry<"friends", "getBlockStatuses", { viewer: RobloxViewerKey, userId: RobloxUserId }, RobloxBlockStatus>
    | Entry<"friends", "getOnlineFriends", { viewer: RobloxViewerKey }, RobloxOnlineFriend[]>
    | Entry<"friends", "getInactiveFriends", { viewer: RobloxViewerKey }, RobloxUserId[]>
    | Entry<"friends", "getFriendRequests", { viewer: RobloxViewerKey, query: RobloxFriendRequestsQuery }, RobloxFriendRequestPage>
    | Entry<"friends", "getTrustedFriendRequests", { viewer: RobloxViewerKey, query: RobloxTrustedFriendRequestsQuery }, RobloxTrustedFriendRequestPage>
    | Entry<"friends", "getFriendRequestCount", { viewer: RobloxViewerKey, unseen: boolean, trusted: boolean }, number>
    // groups
    | Entry<"groups", "getGroups", { groupId: RobloxGroupId }, RobloxGroup>
    | Entry<"groups", "getGroupDetails", { groupId: RobloxGroupId }, RobloxGroupDetail>
    | Entry<"groups", "getRoles", { groupId: RobloxGroupId }, RobloxGroupRole[]>
    | Entry<"groups", "getRolesByIds", { roleId: RobloxGroupRoleId }, RobloxGroupRoleDetail>
    | Entry<"groups", "getUserGroups", { userId: RobloxUserId }, RobloxUserGroupRole[]>
    | Entry<"groups", "getPrimaryGroups", { userId: RobloxUserId }, RobloxPrimaryGroup>
    | Entry<"groups", "getMembers", { groupId: RobloxGroupId, query: RobloxGroupPageQuery }, RobloxGroupMemberPage>
    | Entry<"groups", "getRoleMembers", { groupId: RobloxGroupId, roleId: RobloxGroupRoleId, query: RobloxGroupPageQuery }, RobloxGroupUserPage>
    | Entry<"groups", "searchGroups", { query: RobloxGroupSearchQuery }, RobloxGroupSearchPage>
    | Entry<"groups", "lookupGroups", { groupName: string }, z.output<typeof RobloxGroupLookupResponseSchema>["data"]>
    | Entry<"groups", "getNameHistory", { groupId: RobloxGroupId, query: RobloxGroupPageQuery }, RobloxGroupNameHistoryPage>
    | Entry<"groups", "getRelationships", { groupId: RobloxGroupId, type: RobloxGroupRelationshipType, query: RobloxGroupRelationshipsQuery }, RobloxGroupRelationships>
    | Entry<"groups", "getGuestPermissions", { groupId: RobloxGroupId }, RobloxGroupRolePermissions>
    | Entry<"groups", "getFeatureFreezes", { groupId: RobloxGroupId }, RobloxGroupFeatureFreeze[]>
    | Entry<"groups", "getFeaturedEvents", { groupId: RobloxGroupId }, RobloxGroupFeaturedEvent>
    | Entry<"groups", "getSocialLinks", { groupId: RobloxGroupId }, RobloxGroupSocialLink[]>
    | Entry<"groups", "getEmotes", { groupId: RobloxGroupId }, RobloxGroupEmoteSet[]>
    | Entry<"groups", "getConfigurationMetadata", {}, RobloxGroupConfigurationMetadata>
    | Entry<"groups", "getSearchMetadata", {}, RobloxGroupSearchMetadata>
    | Entry<"groups", "getMetadata", { viewer: RobloxViewerKey }, RobloxGroupsMetadata>
    | Entry<"groups", "getMemberships", { viewer: RobloxViewerKey, groupId: RobloxGroupId }, RobloxGroupMembership>
    | Entry<"groups", "getPolicies", { viewer: RobloxViewerKey, groupId: RobloxGroupId }, boolean>
    | Entry<"groups", "getPendingGroups", { viewer: RobloxViewerKey }, RobloxGroupDetailPartial[]>
    | Entry<"groups", "getFriendsGroups", { viewer: RobloxViewerKey }, z.output<typeof RobloxFriendsGroupsResponseSchema>["data"]>
    | Entry<"groups", "getRolePermissions", { viewer: RobloxViewerKey, groupId: RobloxGroupId, roleId: RobloxGroupRoleId }, RobloxGroupRolePermissions>
    | Entry<"groups", "getUserPermissions", { viewer: RobloxViewerKey, groupId: RobloxGroupId, userId: RobloxUserId }, RobloxGroupRolePermissions & { userId: RobloxUserId }>
    | Entry<"groups", "getJoinRequests", { viewer: RobloxViewerKey, groupId: RobloxGroupId, query: RobloxGroupPageQuery }, RobloxGroupJoinRequestPage>
    | Entry<"groups", "getJoinRequestsByUsers", { viewer: RobloxViewerKey, groupId: RobloxGroupId, userId: RobloxUserId }, RobloxGroupJoinRequest>
    | Entry<"groups", "getBans", { viewer: RobloxViewerKey, groupId: RobloxGroupId, query: RobloxGroupPageQuery }, RobloxGroupBanPage>
    | Entry<"groups", "getBannedUsers", { viewer: RobloxViewerKey, groupId: RobloxGroupId, userId: RobloxUserId }, RobloxGroupBan>
    | Entry<"groups", "getAuditLog", { viewer: RobloxViewerKey, groupId: RobloxGroupId, query: RobloxGroupAuditLogQuery }, RobloxGroupAuditLogPage>
    | Entry<"groups", "getSettings", { viewer: RobloxViewerKey, groupId: RobloxGroupId }, RobloxGroupSettings>
    | Entry<"groups", "getConfigurations", { viewer: RobloxViewerKey, groupId: RobloxGroupId }, RobloxGroupConfiguration>
    | Entry<"groups", "getFeatures", { viewer: RobloxViewerKey, groupId: RobloxGroupId }, RobloxGroupFeatures>
    | Entry<"groups", "getFeaturesBlocked", { viewer: RobloxViewerKey, groupId: RobloxGroupId }, boolean>
    | Entry<"groups", "getKeywords", { viewer: RobloxViewerKey, groupId: RobloxGroupId, query: RobloxGroupPageQuery }, RobloxGroupKeywordPage>
    | Entry<"groups", "getRelationshipRequests", { viewer: RobloxViewerKey, groupId: RobloxGroupId, type: RobloxGroupRelationshipType, query: RobloxGroupRelationshipsQuery }, RobloxGroupRelationships>
    | Entry<"groups", "getPayouts", { viewer: RobloxViewerKey, groupId: RobloxGroupId }, RobloxGroupPayout[]>
    | Entry<"groups", "getPayoutRestrictions", { viewer: RobloxViewerKey, groupId: RobloxGroupId }, RobloxGroupPayoutRestriction>
    // chat — 전부 요청 계정 기준이다
    | Entry<"chat", "getConversations", { viewer: RobloxViewerKey, conversationId: RobloxConversationId }, RobloxChatConversation>
    | Entry<"chat", "listConversations", { viewer: RobloxViewerKey, query: RobloxChatPageQuery }, RobloxChatConversationPage>
    | Entry<"chat", "searchConversations", { viewer: RobloxViewerKey, query: string, page: RobloxChatPageQuery }, RobloxChatConversationPage>
    | Entry<"chat", "getMessages", { viewer: RobloxViewerKey, conversationId: RobloxConversationId, query: RobloxChatPageQuery }, RobloxChatMessagePage>
    | Entry<"chat", "searchMessages", { viewer: RobloxViewerKey, conversationId: RobloxConversationId, query: string, page: RobloxChatPageQuery }, RobloxChatMessagePage>
    | Entry<"chat", "getUnreadCounts", { viewer: RobloxViewerKey }, RobloxChatUnreadCounts>
    | Entry<"chat", "getMetadata", { viewer: RobloxViewerKey }, RobloxChatMetadata>
    // trades
    | Entry<"trades", "canTradeWith", { viewer: RobloxViewerKey, userId: RobloxUserId }, RobloxCanTrade>
    // badges — 받은 날짜는 받은 배지만 저장한다 (받지 않은 상태는 곧 바뀔 수 있다)
    | Entry<"badges", "getBadges", { badgeId: RobloxBadgeId }, RobloxBadge>
    | Entry<"badges", "getAwardedDates", { userId: RobloxUserId, badgeId: RobloxBadgeId }, string>
    | Entry<"badges", "getUniverseBadges", { universeId: RobloxUniverseId, query: RobloxUniverseBadgesQuery }, z.output<typeof RobloxBadgePageSchema>>
    | Entry<"badges", "getMetadata", {}, RobloxBadgeMetadata>
    | Entry<"badges", "getUserBadges", { viewer: RobloxViewerKey, userId: RobloxUserId, query: RobloxBadgePageQuery }, z.output<typeof RobloxUserBadgePageSchema>>
    | Entry<"badges", "getFreeQuotas", { viewer: RobloxViewerKey, universeId: RobloxUniverseId }, number>

/** 저장소에 넘어가는 분류 데이터. `info.service`, `info.method`로 좁히면 나머지 필드의 타입이 정해진다. */
export type RobloxCacheInfo = RobloxCacheEntry["info"]

/** `"서비스.메서드"` → 저장되는 값 */
export type RobloxCacheValues = { [E in RobloxCacheEntry as `${E["info"]["service"]}.${E["info"]["method"]}`]: E["value"] }

/** 분류 데이터에 해당하는 값의 타입 */
export type RobloxCacheValue<I extends RobloxCacheInfo> = I extends RobloxCacheInfo
    ? `${I["service"]}.${I["method"]}` extends infer P extends keyof RobloxCacheValues ? RobloxCacheValues[P] : never
    : never

/**
 * `.cache(store)`에 넣는 저장소. 없는 키는 `undefined`를 돌려준다.
 *
 * - `key`는 라이브러리가 만든 문자열이라 그대로 쓰면 된다: `"<버전>:<서비스>.<메서드>::<인자 해시>"`.
 *   같은 요청이면 항상 같은 문자열이고, 라이브러리 버전이 바뀌면 달라진다 (값 모양이 바뀌었을 수 있다).
 *   `games.getServerLocations`는 값이 사용자 콜백의 것이라 버전이 붙지 않는다.
 * - `info`는 분류용이다. 서비스/메서드마다 다른 곳에 두거나 인자를 보고 다룰 때 쓴다. 안 쓰면 무시한다.
 * - TTL이 0 이하인 메서드는 get/set이 불리지 않는다 (캐시하지 않음). 만료 없이 두려면 `Infinity`를 쓴다.
 *
 * ```ts
 * get(key, info) {
 *     if (info.service === "games" && info.method === "getServerLocations") return geoTable.get(info.ip)
 *     return redis.get(`myapp:${key}`)
 * }
 * ```
 */
export interface RobloxCacheStore {
    get<I extends RobloxCacheInfo>(key: string, info: I): RobloxCacheValue<I> | undefined | Promise<RobloxCacheValue<I> | undefined>
    set<I extends RobloxCacheInfo>(key: string, value: RobloxCacheValue<I>, ttl: number, info: I): void | Promise<void>
}

/** 객체의 필드를 이름순으로 정렬하고 `undefined`인 필드를 지운다. 같은 내용이면 `JSON.stringify` 결과가 같아진다. */
function canonical<T>(value: T): T {
    if (Array.isArray(value)) return value.map(canonical) as T
    if (!value || typeof value !== "object") return value
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(value).sort()) {
        const field = (value as Record<string, unknown>)[key]
        if (field !== undefined) out[key] = canonical(field)
    }
    return out as T
}

/** 분류 데이터를 정리한다. 저장소에는 정리된 것이 넘어간다. */
export function canonicalInfo<I extends RobloxCacheInfo>(info: I): I {
    return canonical(info)
}

/** 키를 버전별로 나누지 않는 메서드 (값의 모양을 라이브러리가 정하지 않는다) */
const UNVERSIONED = new Set(["games.getServerLocations"])

const encoder = new TextEncoder()

function base64url(bytes: Uint8Array): string {
    let binary = ""
    for (const b of bytes) binary += String.fromCharCode(b)
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

/**
 * 분류 데이터 → 저장소 키. `"<버전>:<서비스>.<메서드>::<인자 해시>"`이고 해시는 인자 JSON의 SHA-256 앞 16바이트(base64url 22자)다.
 * 인자가 길어도(커서 등) 키 길이는 일정하다.
 */
export async function robloxCacheKey(info: RobloxCacheInfo): Promise<string> {
    const { service, method, ...args } = canonicalInfo(info)
    const digest = await crypto.subtle.digest("SHA-256", encoder.encode(JSON.stringify(args)))
    const name = `${service}.${method}`
    const prefix = UNVERSIONED.has(name) ? "" : `${__VIGOR_ROBLOX_VERSION__}:`
    return `${prefix}${name}::${base64url(new Uint8Array(digest).slice(0, 16))}`
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

    get<I extends RobloxCacheInfo>(key: string): RobloxCacheValue<I> | undefined {
        const entry = this.entries.get(key)
        if (!entry) return undefined
        if (entry.expiresAt <= Date.now()) {
            this.entries.delete(key)
            return undefined
        }
        return entry.value as RobloxCacheValue<I>
    }

    /** TTL이 0 이하면 저장하지 않는다 */
    set<I extends RobloxCacheInfo>(key: string, value: RobloxCacheValue<I>, ttl: number): void {
        if (ttl <= 0) return
        const now = Date.now()
        this.sweep(now)
        this.entries.set(key, { value, expiresAt: now + ttl })
    }
}
