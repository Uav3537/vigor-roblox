import { z } from 'zod'

export const RobloxUserIdSchema = z
    .number()
    .int()
    .positive()
    .brand<'RobloxApi::Roblox_UserId'>()

/**
 * 이름 형식(길이, 허용 문자 등)은 Roblox가 정하는 것이므로 여기서 따라 하지 않는다.
 * 실제 데이터가 규칙을 벗어나는 경우가 있어서(예: `roblox_user_9093205801`) 응답 검증이
 * 통째로 실패하는 원인이 됐다. 비어있지 않은 문자열인지만 확인한다.
 */
export const RobloxUserNameSchema = z
    .string()
    .trim()
    .min(1)
    .brand<'RobloxApi::Roblox_UserName'>()

export const RobloxDisplayNameSchema = z
    .string()
    .min(1)
    .brand<'RobloxApi::Roblox_UserDisplayName'>()

export const RobloxCookieSchema = z
    .string()
    .min(50)
    .startsWith(
        '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_',
        { message: 'Not a valid .ROBLOSECURITY cookie' }
    )
    .brand<'RobloxApi::Roblox_Cookie'>()

export const RobloxPlaceIdSchema = z
    .number()
    .int()
    .positive()
    .brand<'RobloxApi::Roblox_PlaceId'>()

export const RobloxUniverseIdSchema = z
    .number()
    .int()
    .positive()
    .brand<'RobloxApi::Roblox_UniverseId'>()

export const RobloxJobIdSchema = z
    .string()
    .uuid('JobId must be a valid UUID')
    .brand<'RobloxApi::Roblox_JobId'>()

export const RobloxAssetIdSchema = z
    .number()
    .int()
    .positive()
    .brand<'RobloxApi::Roblox_AssetId'>()

/**
 * 채팅 대화 ID. 현재는 UUID 형태지만("05f740cb-…"), group/party 등에서 다른
 * 형식이 올 수 있어 JobId처럼 UUID를 강제하지 않고 비어있지 않은 문자열만 본다.
 */
export const RobloxConversationIdSchema = z
    .string()
    .min(1)
    .brand<'RobloxApi::Roblox_ConversationId'>()

/** 채팅 메시지 ID(현재 UUID). 위와 같은 이유로 형식을 강제하지 않는다. */
export const RobloxChatMessageIdSchema = z
    .string()
    .min(1)
    .brand<'RobloxApi::Roblox_ChatMessageId'>()

export type RobloxUserId      = z.infer<typeof RobloxUserIdSchema>
export type RobloxUserName    = z.infer<typeof RobloxUserNameSchema>
export type RobloxDisplayName = z.infer<typeof RobloxDisplayNameSchema>
export type RobloxCookie      = z.infer<typeof RobloxCookieSchema>
export type RobloxPlaceId     = z.infer<typeof RobloxPlaceIdSchema>
export type RobloxUniverseId  = z.infer<typeof RobloxUniverseIdSchema>
export type RobloxJobId          = z.infer<typeof RobloxJobIdSchema>
export type RobloxAssetId        = z.infer<typeof RobloxAssetIdSchema>
export type RobloxConversationId = z.infer<typeof RobloxConversationIdSchema>
export type RobloxChatMessageId  = z.infer<typeof RobloxChatMessageIdSchema>

export function isRobloxUserId(value: number): value is RobloxUserId { return RobloxUserIdSchema.safeParse(value).success }
export function isRobloxUserName(value: string): value is RobloxUserName { return RobloxUserNameSchema.safeParse(value).success }
export function isRobloxDisplayName(value: string): value is RobloxDisplayName { return RobloxDisplayNameSchema.safeParse(value).success }
export function isRobloxCookie(value: string): value is RobloxCookie { return RobloxCookieSchema.safeParse(value).success }
export function isRobloxPlaceId(value: number): value is RobloxPlaceId { return RobloxPlaceIdSchema.safeParse(value).success }
export function isRobloxUniverseId(value: number): value is RobloxUniverseId { return RobloxUniverseIdSchema.safeParse(value).success }
export function isRobloxJobId(value: string): value is RobloxJobId { return RobloxJobIdSchema.safeParse(value).success }
export function isRobloxAssetId(value: number): value is RobloxAssetId { return RobloxAssetIdSchema.safeParse(value).success }
export function isRobloxConversationId(value: string): value is RobloxConversationId { return RobloxConversationIdSchema.safeParse(value).success }
export function isRobloxChatMessageId(value: string): value is RobloxChatMessageId { return RobloxChatMessageIdSchema.safeParse(value).success }
