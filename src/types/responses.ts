import { z } from 'zod'
import {
    RobloxUserIdSchema,
    RobloxUserNameSchema,
    RobloxDisplayNameSchema,
    RobloxPlaceIdSchema,
    RobloxUniverseIdSchema,
    RobloxJobIdSchema,
    RobloxAssetIdSchema,
    RobloxConversationIdSchema,
    RobloxChatMessageIdSchema,
} from './branded'


// ── User ─────────────────────────────────────────────────

export const RobloxUserSimpleSchema = z.object({
    id:                 RobloxUserIdSchema,
    name:               RobloxUserNameSchema,
    displayName:        RobloxDisplayNameSchema,
    hasVerifiedBadge:   z.boolean(),
    requestedUsername:  z.string().optional(),
})

export const RobloxUserSchema = RobloxUserSimpleSchema.extend({
    description:            z.string(),
    externalAppDisplayName: z.string().nullable(),
    isBanned:                z.boolean(),
    created:                 z.string(),
})

/** `/v1/users/authenticated`는 id/name/displayName만 준다 (hasVerifiedBadge 없음). */
export const RobloxAuthenticatedUserBaseSchema = RobloxUserSimpleSchema.extend({
    hasVerifiedBadge: z.boolean().optional(),
})

export type RobloxUserSimple            = z.infer<typeof RobloxUserSimpleSchema>
export type RobloxUser                  = z.infer<typeof RobloxUserSchema>
export type RobloxAuthenticatedUserBase = z.infer<typeof RobloxAuthenticatedUserBaseSchema>


// ── Authenticated user (sub-resources) ──────────────────────

export const RobloxUserDescriptionSchema = z.object({
    description: z.string(),
})

export const RobloxUserBirthdateSchema = z.object({
    birthYear:  z.number(),
    birthMonth: z.number(),
    birthDay:   z.number(),
})

export const RobloxUserGenderSchema = z.object({
    gender: z.number(),
})

export const RobloxUserAgeBracketSchema = z.object({
    ageBracket: z.number(),
})

export const RobloxUserCountryCodeSchema = z.object({
    countryCode: z.string(),
})

export const RobloxUserRolesSchema = z.object({
    roles: z.array(z.string()),
})

export type RobloxUserDescription = z.infer<typeof RobloxUserDescriptionSchema>
export type RobloxUserBirthdate   = z.infer<typeof RobloxUserBirthdateSchema>
export type RobloxUserGender      = z.infer<typeof RobloxUserGenderSchema>
export type RobloxUserAgeBracket  = z.infer<typeof RobloxUserAgeBracketSchema>
export type RobloxUserCountryCode = z.infer<typeof RobloxUserCountryCodeSchema>
export type RobloxUserRoles       = z.infer<typeof RobloxUserRolesSchema>

export type RobloxAuthenticatedUser =
    RobloxAuthenticatedUserBase
    & Partial<RobloxUserDescription>
    & Partial<RobloxUserBirthdate>
    & Partial<RobloxUserGender>
    & Partial<RobloxUserAgeBracket>
    & Partial<RobloxUserCountryCode>
    & Partial<RobloxUserRoles>


// ── Thumbnail ────────────────────────────────────────────

export const RobloxThumbnailTargetBaseSchema = z.object({
    targetId: z.preprocess(
        (v) => (v === 0 ? undefined : v),
        z.union([RobloxAssetIdSchema, RobloxUserIdSchema]).optional()
    ),
    token:      z.string().optional(),
    type:       z.string().optional(),
    size:       z.string().optional(),
    format:     z.string().optional(),
    isCircular: z.boolean().optional(),
})

export const RobloxThumbnailTargetSchema = RobloxThumbnailTargetBaseSchema.refine(
    (v) => (v.targetId != null) !== (v.token != null),
    { message: 'Exactly one of targetId or token must be provided' }
)

export const RobloxThumbnailRawSchema = RobloxThumbnailTargetBaseSchema.extend({
    imageUrl: z.string().nullable(),
    state:    z.string(),
    version:  z.string().nullable(),
})

export const RobloxThumbnailSchema = RobloxThumbnailTargetBaseSchema.extend({
    url:     z.string().nullable(),
    state:   z.string(),
    version: z.string().nullable(),
})

export type RobloxThumbnailTargetBase = z.infer<typeof RobloxThumbnailTargetBaseSchema>
export type RobloxThumbnailTarget     = z.infer<typeof RobloxThumbnailTargetSchema>
export type RobloxThumbnailRaw        = z.infer<typeof RobloxThumbnailRawSchema>
export type RobloxThumbnail           = z.infer<typeof RobloxThumbnailSchema>


// ── Server ───────────────────────────────────────────────

export const RobloxServerEntrySchema = z.object({
    jobId:      RobloxJobIdSchema,
    maxPlayers: z.number(),
    playing:    z.number(),
    /** Roblox가 측정값이 없는 서버(막 생성된 서버 등)에는 fps/ping을 주지 않는다. */
    fps:        z.number().optional(),
    ping:       z.number().optional(),
    playerImgs: z.array(z.string()),
})

/**
 * 비공개 서버(VIP 서버) 항목. 서버가 실행 중이 아니면 jobId가 없으므로 null이다.
 * `accessCode`는 요청 계정이 서버 소유자일 때만 온다.
 */
export const RobloxPrivateServerEntrySchema = RobloxServerEntrySchema.extend({
    jobId:       RobloxJobIdSchema.nullable(),
    name:        z.string(),
    vipServerId: z.number(),
    accessCode:  z.string().nullable(),
    owner:       RobloxAuthenticatedUserBaseSchema.nullable(),
})

export const RobloxServerLocationSchema = z.object({
    ip:          z.string(),
    jobId:       RobloxJobIdSchema,
    countryCode: z.string(),
    countryName: z.string(),
    regionName:  z.string(),
    city:        z.string(),
    latitude:    z.number(),
    longitude:   z.number(),
    isp:         z.string(),
    timezone:    z.string(),
})

export const RobloxServerEntryWithLocationSchema = RobloxServerEntrySchema.extend({
    location: RobloxServerLocationSchema.nullable(),
})

export const RobloxPrivateServerEntryWithLocationSchema = RobloxPrivateServerEntrySchema.extend({
    location: RobloxServerLocationSchema.nullable(),
})

export function robloxServersResultSchema<E extends z.ZodTypeAny>(entrySchema: E) {
    return z.object({
        previousPageCursor: z.string().nullable(),
        nextPageCursor:     z.string().nullable(),
        data:               z.array(entrySchema),
    })
}

export type RobloxServerEntry             = z.infer<typeof RobloxServerEntrySchema>
export type RobloxServerEntryWithLocation = z.infer<typeof RobloxServerEntryWithLocationSchema>
export type RobloxServerLocation          = z.infer<typeof RobloxServerLocationSchema>
export type RobloxPrivateServerEntry             = z.infer<typeof RobloxPrivateServerEntrySchema>
export type RobloxPrivateServerEntryWithLocation = z.infer<typeof RobloxPrivateServerEntryWithLocationSchema>
export type RobloxServersResult<E = RobloxServerEntry> = {
    previousPageCursor: string | null
    nextPageCursor:     string | null
    data:               E[]
}


// ── Presence ─────────────────────────────────────────────

/**
 * 오프라인/비공개 유저는 place 관련 필드가 null로 오고, `lastOnline`은 더 이상
 * 응답에 포함되지 않는다. 필드가 아예 빠지는 경우도 있어 전부 nullish로 받는다.
 */
export const RobloxPresenceEntrySchema = z.object({
    userId:           RobloxUserIdSchema,
    userPresenceType: z.number(),
    lastLocation:     z.string().nullish(),
    placeId:          RobloxPlaceIdSchema.nullish(),
    rootPlaceId:      RobloxPlaceIdSchema.nullish(),
    gameId:           RobloxJobIdSchema.nullish(),
    universeId:       RobloxUniverseIdSchema.nullish(),
    lastOnline:       z.string().nullish(),
})

export type RobloxPresenceEntry = z.infer<typeof RobloxPresenceEntrySchema>


// ── Chat (platform-chat-api) ─────────────────────────────
//
// 공식 문서화되지 않은 apis.roblox.com/platform-chat-api/v1 엔드포인트의 응답.
// 필드가 조용히 추가/변경될 수 있어 확실한 것만 필수로 두고 나머지는 nullish로
// 받는다. zod object는 기본적으로 모르는 키를 조용히 버리므로(strict 아님)
// 새 필드가 생겨도 검증이 깨지지 않는다.

export const RobloxChatMessageSchema = z.object({
    id:              RobloxChatMessageIdSchema,
    content:         z.string(),
    // null on messages with no user sender (system/announcement rows that
    // appear in a conversation's preview messages).
    sender_user_id:  RobloxUserIdSchema.nullable(),
    created_at:      z.string(),
    type:            z.string().nullish(),
    moderation_type: z.string().nullish(),
    replies_to:      RobloxChatMessageIdSchema.nullish(),
    is_deleted:      z.boolean().nullish(),
    is_previewable:  z.boolean().nullish(),
    is_badgeable:    z.boolean().nullish(),
    visibility:      z.string().nullish(),
    /** send-messages 응답에만 있다 ("success" 등). */
    status:          z.string().nullish(),
})

export const RobloxChatUserDataSchema = z.object({
    id:            RobloxUserIdSchema,
    name:          z.string().nullish(),
    display_name:  z.string().nullish(),
    combined_name: z.string().nullish(),
    is_verified:   z.boolean().nullish(),
})

export const RobloxChatConversationSchema = z.object({
    id:                   RobloxConversationIdSchema,
    source:               z.string().nullish(),
    type:                 z.string().nullish(),
    name:                 z.string().nullish(),
    is_default_name:      z.boolean().nullish(),
    created_by:           RobloxUserIdSchema.nullish(),
    participant_user_ids: z.array(RobloxUserIdSchema),
    user_data:            z.record(z.string(), RobloxChatUserDataSchema).nullish(),
    messages:             z.array(RobloxChatMessageSchema).nullish(),
    unread_message_count: z.number().nullish(),
    updated_at:           z.string().nullish(),
    created_at:           z.string().nullish(),
    moderation_type:      z.string().nullish(),
    preview_message:      RobloxChatMessageSchema.nullish(),
    sort_index:           z.number().nullish(),
})

export const RobloxChatConversationsPageSchema = z.object({
    conversations: z.array(RobloxChatConversationSchema),
    next_cursor:   z.string().nullish(),
})

export const RobloxChatMessagesPageSchema = z.object({
    messages:        z.array(RobloxChatMessageSchema),
    next_cursor:     z.string().nullish(),
    previous_cursor: z.string().nullish(),
})

export const RobloxChatSendResultSchema = z.object({
    messages: z.array(RobloxChatMessageSchema),
})

/**
 * `metadata` 엔드포인트의 응답 — 계정의 채팅 기능 플래그/설정 모음.
 * 다른 chat 엔드포인트와 달리 이것만 camelCase다. 대부분 서버 측 피처 플래그라
 * 필드가 수시로 바뀔 수 있어, 유용한 것만 타입을 두고 나머지는 passthrough로
 * 그대로 보존한다(unknown 키를 버리지 않음).
 */
export const RobloxChatMetadataSchema = z.object({
    isChatEnabled:                      z.boolean().nullish(),
    isChatEnabledByPrivacySetting:      z.string().nullish(),
    isGroupChatEnabledByPrivacySetting: z.string().nullish(),
    isChatEnabledByGlobalRules:         z.string().nullish(),
    isChatVisible:                      z.boolean().nullish(),
    isChatUserMessagesEnabled:          z.boolean().nullish(),
    maxConversationTitleLength:         z.number().nullish(),
    typingInChatFromSenderThrottleMs:   z.number().nullish(),
    typingInChatForReceiverExpirationMs: z.number().nullish(),
    validMessageTypesWhiteList:         z.array(z.string()).nullish(),
    senderTypesForUnknownMessageTypeError: z.array(z.string()).nullish(),
}).passthrough()

export type RobloxChatMetadata = z.infer<typeof RobloxChatMetadataSchema>

export type RobloxChatMessage            = z.infer<typeof RobloxChatMessageSchema>
export type RobloxChatUserData           = z.infer<typeof RobloxChatUserDataSchema>
export type RobloxChatConversation       = z.infer<typeof RobloxChatConversationSchema>
export type RobloxChatConversationsPage  = z.infer<typeof RobloxChatConversationsPageSchema>
export type RobloxChatMessagesPage       = z.infer<typeof RobloxChatMessagesPageSchema>
export type RobloxChatSendResult         = z.infer<typeof RobloxChatSendResultSchema>


// ── Place ────────────────────────────────────────────────

export const RobloxPlaceInfoSchema = z.object({
    placeId:     RobloxPlaceIdSchema,
    universeId:  RobloxUniverseIdSchema.nullable(),
    name:        z.string(),
    description: z.string(),
    creator: z.object({
        id:   z.number(),
        name: z.string(),
        type: z.string(),
    }),
    price:      z.number().nullable(),
    playing:    z.number(),
    visits:     z.number(),
    maxPlayers: z.number(),
    created:    z.string(),
    updated:    z.string(),
    logos:      z.array(z.string()),
})

export type RobloxPlaceInfo = z.infer<typeof RobloxPlaceInfoSchema>


// ── Friend ───────────────────────────────────────────────

/** friends 목록은 name/displayName을 빈 문자열로 준다 → undefined로 정규화. */
const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v)

export const RobloxFriendEntrySchema = z.object({
    id:               RobloxUserIdSchema,
    name:             z.preprocess(emptyToUndefined, RobloxUserNameSchema.optional()),
    displayName:      z.preprocess(emptyToUndefined, RobloxDisplayNameSchema.optional()),
    hasVerifiedBadge: z.boolean().optional(),
    isOnline:         z.boolean().optional(),
    isDeleted:        z.boolean().optional(),
    friendFrom:       z.string().nullable().optional(),
})

export type RobloxFriendEntry = z.infer<typeof RobloxFriendEntrySchema>


// ── Raw API response shapes ──────────────────────────────────

export const RobloxServerRawSchema = z.object({
    id:           RobloxJobIdSchema,
    maxPlayers:   z.number(),
    playing:      z.number(),
    fps:          z.number().optional(),
    ping:         z.number().optional(),
    playerTokens: z.array(z.string()),
}).passthrough()

export type RobloxServerRaw = z.infer<typeof RobloxServerRawSchema>

export const RobloxServersPageRawSchema = robloxServersResultSchema(RobloxServerRawSchema)
export type RobloxServersPageRaw = z.infer<typeof RobloxServersPageRawSchema>

/** `/v1/games/{placeId}/private-servers` 항목. 실행 중이 아닌 서버는 id/playing/fps/ping이 없다. */
export const RobloxPrivateServerRawSchema = z.object({
    id:           RobloxJobIdSchema.nullish(),
    maxPlayers:   z.number(),
    playing:      z.number().nullish(),
    fps:          z.number().optional(),
    ping:         z.number().optional(),
    playerTokens: z.array(z.string()).nullish(),
    name:         z.string(),
    vipServerId:  z.number(),
    accessCode:   z.string().nullish(),
    owner:        RobloxAuthenticatedUserBaseSchema.passthrough().nullish(),
}).passthrough()

export type RobloxPrivateServerRaw = z.infer<typeof RobloxPrivateServerRawSchema>

export const RobloxPrivateServersPageRawSchema = robloxServersResultSchema(RobloxPrivateServerRawSchema)
export type RobloxPrivateServersPageRaw = z.infer<typeof RobloxPrivateServersPageRawSchema>


export const GamejoinResponseSchema = z.object({
    joinScript: z.object({
        MachineAddress:   z.string().optional(),
        UdmuxEndpoints:   z.array(z.object({ Address: z.string(), Port: z.number() })).optional(),
    }).optional(),
})

export type GamejoinResponse = z.infer<typeof GamejoinResponseSchema>


// ── Place info sub-responses ────────────────────────────────

export const RobloxUniverseFromPlaceRawSchema = z.object({
    universeId: z.number().nullish(),
}).passthrough()

export const RobloxUniverseFromPlaceSchema = z.object({
    placeId:    z.number(),
    universeId: z.number().nullable(),
})

export const RobloxGameDetailsRawSchema = z.object({}).passthrough()

export const RobloxGameMediaEntrySchema = z.object({
    imageId: z.number().optional(),
}).passthrough()

export type RobloxUniverseFromPlaceRaw = z.infer<typeof RobloxUniverseFromPlaceRawSchema>
export type RobloxUniverseFromPlace    = z.infer<typeof RobloxUniverseFromPlaceSchema>
export type RobloxGameDetailsRaw       = z.infer<typeof RobloxGameDetailsRawSchema>
export type RobloxGameMediaEntry       = z.infer<typeof RobloxGameMediaEntrySchema>


// ── IP geolocation (serversRegion) ──────────────────────────

export const RobloxIpGeoRawSchema = z.object({
    country_code2: z.string().optional(),
    country_name:  z.string().optional(),
    state_prov:    z.string().optional(),
    city:          z.string().optional(),
    latitude:      z.union([z.string(), z.number()]).optional(),
    longitude:     z.union([z.string(), z.number()]).optional(),
    isp:           z.string().optional(),
    time_zone:     z.object({ name: z.string().optional() }).passthrough().optional(),
}).passthrough()

export type RobloxIpGeoRaw = z.infer<typeof RobloxIpGeoRawSchema>


// ── Thumbnail batch (requestId-tagged) ──────────────────────

export const RobloxThumbnailRawWithRequestIdSchema = RobloxThumbnailRawSchema.extend({
    requestId: z.string(),
})

export type RobloxThumbnailRawWithRequestId = z.infer<typeof RobloxThumbnailRawWithRequestIdSchema>