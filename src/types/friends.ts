import z from "zod";
import { RobloxCursorSchema, RobloxJobIdSchema, RobloxPlaceIdSchema, RobloxUniverseIdSchema, type RobloxCursor, type RobloxSortOrder } from "./common";
import { RobloxUserIdSchema, type RobloxUser, type RobloxUserId } from "./users";

// friends.roblox.com은 swagger(/docs/json/v1)가 아직 살아 있다. 다만 실제 응답이 스펙보다 훨씬 적다.
// - 친구 목록의 name/displayName은 빈 문자열로 온다 (id만 믿을 수 있다).
// - 목록에 `{ id: -1 }` 같은 자리표시 항목이 섞여 올 수 있다 (4.1에서 확인).
// - 친구 상태(status)는 숫자 enum이 아니라 문자열로 온다.

/** 자리표시 항목(id <= 0)을 검증 전에 걸러낸다 */
const realUsers = <T extends z.ZodType>(item: T) => z.preprocess(
    list => Array.isArray(list) ? list.filter(e => typeof e?.id === "number" && e.id > 0) : list,
    z.array(item),
)

const IdOnlySchema = z.object({ id: RobloxUserIdSchema })

/** GET /v1/users/{userId}/friends — 한 번에 전부 (20회/분) */
export const RobloxFriendListResponseSchema = z.object({ data: realUsers(IdOnlySchema) })

/** GET /v1/users/{userId}/friends/find, /search — `CursoredPagedResult` (100회/분, 50개씩) */
export const RobloxFriendPageRawSchema = z.object({
    PreviousCursor: RobloxCursorSchema.nullable(),
    PageItems:      realUsers(IdOnlySchema.extend({ hasVerifiedBadge: z.boolean().nullish() })),
    NextCursor:     RobloxCursorSchema.nullable(),
    HasMore:        z.boolean().nullable(),
})

/** 팔로워/팔로잉 목록 — 실제로는 id만 온다 */
export const RobloxFollowPageSchema = z.object({
    previousPageCursor: RobloxCursorSchema.nullable(),
    nextPageCursor:     RobloxCursorSchema.nullable(),
    data:               realUsers(IdOnlySchema),
})

export const RobloxCountResponseSchema = z.object({ count: z.number() })

/** `FriendStatusResponse` */
export const RobloxFriendStatusSchema = z.object({
    id:     RobloxUserIdSchema,
    /** "NotFriends" | "Friends" | "RequestSent" | "RequestReceived" */
    status: z.string(),
})

export const RobloxFriendStatusesResponseSchema = z.object({ data: z.array(RobloxFriendStatusSchema) })

/** `UserPresenceResponseModel` — 온라인 친구 목록의 presence. 필드 이름이 대문자로 시작하는 것도 있다 */
export const RobloxFriendPresenceSchema = z.object({
    UserPresenceType: z.string().nullish(),
    UserLocationType: z.string().nullish(),
    lastLocation:     z.string().nullish(),
    placeId:          RobloxPlaceIdSchema.nullish(),
    rootPlaceId:      RobloxPlaceIdSchema.nullish(),
    gameInstanceId:   RobloxJobIdSchema.nullish(),
    universeId:       RobloxUniverseIdSchema.nullish(),
    lastOnline:       z.string().nullish(),
})

/** `UserPresenceResponse` — GET /v1/users/{me}/friends/online 의 항목 */
export const RobloxOnlineFriendSchema = z.object({
    id:           RobloxUserIdSchema,
    name:         z.string().nullish(),
    displayName:  z.string().nullish(),
    sortScore:    z.number().nullish(),
    userPresence: RobloxFriendPresenceSchema.nullish(),
})

export const RobloxOnlineFriendsResponseSchema = z.object({ data: realUsers(RobloxOnlineFriendSchema) })

/** `FriendRequestResponse` — 받은 친구 요청 */
export const RobloxFriendRequestSchema = z.object({
    id:                     RobloxUserIdSchema,
    name:                   z.string(),
    displayName:            z.string(),
    hasVerifiedBadge:       z.boolean().nullish(),
    description:            z.string().nullish(),
    created:                z.string().nullish(),
    isBanned:               z.boolean().nullish(),
    isUnseen:               z.boolean().nullish(),
    mutualFriendsList:      z.array(z.string()).nullish(),
    friendRequest:          z.object({
        sentAt:           z.string(),
        senderId:         RobloxUserIdSchema,
        sourceUniverseId: RobloxUniverseIdSchema.nullish(),
        originSourceType: z.union([z.string(), z.number()]).nullish(),
        contactName:      z.string().nullish(),
        senderNickname:   z.string().nullish(),
    }).nullish(),
})

export const RobloxFriendRequestPageSchema = z.object({
    previousPageCursor: RobloxCursorSchema.nullable(),
    nextPageCursor:     RobloxCursorSchema.nullable(),
    data:               z.array(RobloxFriendRequestSchema),
})

/** `TrustedFriendRequestResponse` */
export const RobloxTrustedFriendRequestPageSchema = z.object({
    previousPageCursor: RobloxCursorSchema.nullable(),
    nextPageCursor:     RobloxCursorSchema.nullable(),
    data:               z.array(z.object({ sentAt: z.string(), senderId: RobloxUserIdSchema })),
})

/** `FollowingExistsResponse` */
export const RobloxFollowingStatusSchema = z.object({
    userId:      RobloxUserIdSchema,
    /** 내가 이 유저를 팔로우하는지 */
    isFollowing: z.boolean(),
    /** 이 유저가 나를 팔로우하는지 */
    isFollowed:  z.boolean(),
})

export const RobloxFollowingExistsResponseSchema = z.object({ followings: z.array(RobloxFollowingStatusSchema) })

/** `FriendsPageMetadataResponse` */
export const RobloxFriendsMetadataSchema = z.object({
    isFriendsFilterBarEnabled:          z.boolean().nullish(),
    isFriendsPageSortExperimentEnabled: z.boolean().nullish(),
    isFriendsUserDataStoreCacheEnabled: z.boolean().nullish(),
    frequentFriendSortRollout:          z.number().nullish(),
    userName:                           z.string().nullish(),
    displayName:                        z.string().nullish(),
})

/** `CaptchaStatusResponseModel` — POST follow */
export const RobloxCaptchaStatusSchema = z.object({
    success:           z.boolean(),
    isCaptchaRequired: z.boolean().nullish(),
    notificationMuted: z.boolean().nullish(),
})


/** `getFriends` 결과 — 친구 목록에 users 정보를 채운 것 */
export type RobloxUserFriends<U extends RobloxUser = RobloxUser> = { userId: RobloxUserId, friends: U[] }

export type RobloxFriendStatus = z.infer<typeof RobloxFriendStatusSchema>
export type RobloxOnlineFriend = z.infer<typeof RobloxOnlineFriendSchema>
export type RobloxFriendPresence = z.infer<typeof RobloxFriendPresenceSchema>
export type RobloxFriendRequest = z.infer<typeof RobloxFriendRequestSchema>
export type RobloxFriendRequestPage = z.infer<typeof RobloxFriendRequestPageSchema>
export type RobloxTrustedFriendRequestPage = z.infer<typeof RobloxTrustedFriendRequestPageSchema>
export type RobloxFollowPage = z.infer<typeof RobloxFollowPageSchema>
export type RobloxFollowingStatus = z.infer<typeof RobloxFollowingStatusSchema>
export type RobloxFriendsMetadata = z.infer<typeof RobloxFriendsMetadataSchema>
export type RobloxCaptchaStatus = z.infer<typeof RobloxCaptchaStatusSchema>
export type RobloxFriendPage = { previousPageCursor: RobloxCursor | null, nextPageCursor: RobloxCursor | null, data: { id: RobloxUserId, hasVerifiedBadge: boolean | null }[] }


// ── 요청 ───────────────────────────────────────────────

export type RobloxFollowPageQuery = {
    limit?:     10 | 18 | 25 | 50 | 100
    cursor?:    RobloxCursor
    sortOrder?: RobloxSortOrder
}

export type RobloxFriendSearchQuery = {
    query:   string
    limit?:  number
    cursor?: RobloxCursor
}

export type RobloxFriendRequestsQuery = {
    limit?:             number
    cursor?:            RobloxCursor
    /** 0/1/2 — 스펙에 의미가 적혀 있지 않다 */
    friendRequestSort?: 0 | 1 | 2
    uprankUnseen?:      boolean
}

/** POST follow에 캡차가 걸렸을 때 같이 보낸다 */
export type RobloxCaptchaTokenRequest = {
    captchaId?:       string
    captchaToken?:    string
    captchaProvider?: string
    challengeId?:     string
}
