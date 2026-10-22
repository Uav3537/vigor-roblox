import z from "zod";
import {
    RobloxChatMessageIdSchema,
    RobloxConversationIdSchema,
    RobloxUniverseIdSchema,
    type RobloxChatMessageId,
    type RobloxConversationId,
} from "./common";
import { RobloxUserIdSchema, type RobloxUserId } from "./users";

// apis.roblox.com/platform-chat-api/v1 — roblox.com 웹 채팅이 쓰는 비공개 API. 공개 문서가 없다.
// 필드가 조용히 바뀔 수 있어 확실한 것만 필수로 두고 나머지는 nullish로 받는다.
// 응답은 snake_case다 (metadata만 camelCase).

/** 메시지 */
export const RobloxChatMessageSchema = z.object({
    id:              RobloxChatMessageIdSchema,
    content:         z.string(),
    /** 시스템 메시지는 보낸 유저가 없다 */
    sender_user_id:  RobloxUserIdSchema.nullable(),
    created_at:      z.string(),
    type:            z.string().nullish(),
    moderation_type: z.string().nullish(),
    replies_to:      RobloxChatMessageIdSchema.nullish(),
    is_deleted:      z.boolean().nullish(),
    is_previewable:  z.boolean().nullish(),
    is_badgeable:    z.boolean().nullish(),
    visibility:      z.string().nullish(),
    /** send-messages 응답에만 있다 ("success" 등) */
    status:          z.string().nullish(),
})

/** 대화 참가자 정보 (`include_user_data`) */
export const RobloxChatUserDataSchema = z.object({
    id:            RobloxUserIdSchema,
    name:          z.string().nullish(),
    display_name:  z.string().nullish(),
    combined_name: z.string().nullish(),
    is_verified:   z.boolean().nullish(),
})

/** 대화 */
export const RobloxChatConversationSchema = z.object({
    id:                   RobloxConversationIdSchema,
    /** "one_to_one" | "group" ... */
    type:                 z.string().nullish(),
    source:               z.string().nullish(),
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
    universe_id:          RobloxUniverseIdSchema.nullish(),
})

/** 만들기/바꾸기 응답의 항목. 실패한 항목은 `status: "failed"`이고 나머지가 null이다 */
export const RobloxChatConversationResultSchema = RobloxChatConversationSchema.partial().extend({
    id:                   RobloxConversationIdSchema.nullish(),
    participant_user_ids: z.array(RobloxUserIdSchema).nullish(),
    status:               z.string().nullish(),
})

/** 커서는 빈 문자열이 "다음 없음"이다 */
const ChatCursorSchema = z.string().nullish().transform(c => c ? c : null)

export const RobloxChatConversationPageRawSchema = z.object({
    conversations: z.array(RobloxChatConversationSchema),
    next_cursor:   ChatCursorSchema,
})

export const RobloxChatMessagePageRawSchema = z.object({
    messages:        z.array(RobloxChatMessageSchema),
    next_cursor:     ChatCursorSchema,
    previous_cursor: ChatCursorSchema,
})

export const RobloxChatConversationsResponseSchema = z.object({ conversations: z.array(RobloxChatConversationSchema) })
export const RobloxChatConversationResultsResponseSchema = z.object({ conversations: z.array(RobloxChatConversationResultSchema) })
export const RobloxChatSendResponseSchema = z.object({ messages: z.array(RobloxChatMessageSchema) })

/** GET get-conversation-metadata — 안 읽은 수 */
export const RobloxChatUnreadCountsSchema = z.object({
    global_unread_message_count: z.number(),
    global_unread_count:         z.number(),
})

/**
 * GET metadata — 계정의 채팅 설정과 서버 피처 플래그. 이것만 camelCase이고 필드가 수시로 바뀌어 모르는 키도 남긴다.
 * `isChatVisible`/`isChatUserMessagesEnabled`가 false면 이 계정은 메시지를 보낼 수 없다 (실측: 나이 인증 안 한 봇 계정).
 */
export const RobloxChatMetadataSchema = z.looseObject({
    isChatEnabled:                       z.boolean().nullish(),
    isChatEnabledByPrivacySetting:       z.string().nullish(),
    isGroupChatEnabledByPrivacySetting:  z.string().nullish(),
    isChatEnabledByGlobalRules:          z.string().nullish(),
    isChatVisible:                       z.boolean().nullish(),
    isChatUserMessagesEnabled:           z.boolean().nullish(),
    maxConversationTitleLength:          z.number().nullish(),
    typingInChatFromSenderThrottleMs:    z.number().nullish(),
    typingInChatForReceiverExpirationMs: z.number().nullish(),
    validMessageTypesWhiteList:          z.array(z.string()).nullish(),
})

export type RobloxChatMessage = z.infer<typeof RobloxChatMessageSchema>
export type RobloxChatUserData = z.infer<typeof RobloxChatUserDataSchema>
export type RobloxChatConversation = z.infer<typeof RobloxChatConversationSchema>
export type RobloxChatConversationResult = z.infer<typeof RobloxChatConversationResultSchema>
export type RobloxChatUnreadCounts = z.infer<typeof RobloxChatUnreadCountsSchema>
export type RobloxChatMetadata = z.infer<typeof RobloxChatMetadataSchema>

export type RobloxChatConversationPage = { conversations: RobloxChatConversation[], nextCursor: string | null }
export type RobloxChatMessagePage = { messages: RobloxChatMessage[], nextCursor: string | null, previousCursor: string | null }


// ── 요청 ───────────────────────────────────────────────

export type RobloxChatPageQuery = {
    pageSize?: number
    cursor?:   string
}

/** 새 대화. 참가자는 모두 친구여야 한다 (아니면 403 participants_not_friends) */
export type RobloxCreateConversationRequest =
    | { type: "one_to_one", userId: RobloxUserId }
    | { type: "group", userIds: RobloxUserId[], name?: string }

export type RobloxRenameConversationRequest = { id: RobloxConversationId, name: string }

/** 메시지 하나. 답장은 `repliesTo` */
export type RobloxSendMessageRequest = string | { content: string, repliesTo?: RobloxChatMessageId }
