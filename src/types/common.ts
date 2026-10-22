import z from "zod";

export const RobloxCursorSchema = z.string().brand("RobloxCursor")

export type RobloxCursor = z.infer<typeof RobloxCursorSchema>


// ── ID ──────────────────────────────────────────────────
// 서비스 여러 곳에서 쓰는 ID. 유저 ID는 types/users에 있다.

const id = <B extends string>(brand: B) => z.number().int().min(1).brand(brand)

export const RobloxAssetIdSchema = id("RobloxAssetId")
export const RobloxPlaceIdSchema = id("RobloxPlaceId")
export const RobloxUniverseIdSchema = id("RobloxUniverseId")
export const RobloxGroupIdSchema = id("RobloxGroupId")
export const RobloxBadgeIdSchema = id("RobloxBadgeId")
export const RobloxGamePassIdSchema = id("RobloxGamePassId")
export const RobloxBundleIdSchema = id("RobloxBundleId")
export const RobloxOutfitIdSchema = id("RobloxOutfitId")
export const RobloxDeveloperProductIdSchema = id("RobloxDeveloperProductId")
/** 게임(universe)에 등록된 썸네일 하나의 ID */
export const RobloxGameThumbnailIdSchema = id("RobloxGameThumbnailId")

export type RobloxAssetId = z.infer<typeof RobloxAssetIdSchema>
export type RobloxPlaceId = z.infer<typeof RobloxPlaceIdSchema>
export type RobloxUniverseId = z.infer<typeof RobloxUniverseIdSchema>
export type RobloxGroupId = z.infer<typeof RobloxGroupIdSchema>
export type RobloxBadgeId = z.infer<typeof RobloxBadgeIdSchema>
export type RobloxGamePassId = z.infer<typeof RobloxGamePassIdSchema>
export type RobloxBundleId = z.infer<typeof RobloxBundleIdSchema>
export type RobloxOutfitId = z.infer<typeof RobloxOutfitIdSchema>
export type RobloxDeveloperProductId = z.infer<typeof RobloxDeveloperProductIdSchema>
export type RobloxGameThumbnailId = z.infer<typeof RobloxGameThumbnailIdSchema>

/** 비공개(VIP) 서버 ID (`vipServerId`) */
export const RobloxPrivateServerIdSchema = id("RobloxPrivateServerId")
/** 실행 중인 서버 하나(JobId, 응답의 `gameId`/`id`) */
export const RobloxJobIdSchema = z.uuid().brand("RobloxJobId")

export type RobloxPrivateServerId = z.infer<typeof RobloxPrivateServerIdSchema>
export type RobloxJobId = z.infer<typeof RobloxJobIdSchema>

/** 채팅 대화 ID. 지금은 UUID지만 형식을 강제하지 않는다 */
export const RobloxConversationIdSchema = z.string().min(1).brand("RobloxConversationId")
/** 채팅 메시지 ID */
export const RobloxChatMessageIdSchema = z.string().min(1).brand("RobloxChatMessageId")

export type RobloxConversationId = z.infer<typeof RobloxConversationIdSchema>
export type RobloxChatMessageId = z.infer<typeof RobloxChatMessageIdSchema>


export const RobloxPageLimitSchema = z.literal([10, 25, 50, 100])
export const RobloxSortOrderSchema = z.enum(["Asc", "Desc"])

export type RobloxPageLimit = z.infer<typeof RobloxPageLimitSchema>
export type RobloxSortOrder = z.infer<typeof RobloxSortOrderSchema>


/** `Roblox.Web.WebAPI.ApiEmptyResponseModel` — 성공 시 `{}` */
export const RobloxEmptyResponseSchema = z.object({})

export type RobloxEmptyResponse = z.infer<typeof RobloxEmptyResponseSchema>


/** `Roblox.Web.WebAPI.Models.ApiArrayResponse[T]` */
export const RobloxArrayResponseSchema = <T extends z.ZodType>(item: T) => z.object({
    data: z.array(item),
})

/** `Roblox.Web.WebAPI.Models.ApiPageResponse[T]` — 첫/마지막 페이지에서는 커서가 `null`이다. */
export const RobloxPageResponseSchema = <T extends z.ZodType>(item: T) => z.object({
    previousPageCursor: RobloxCursorSchema.nullable(),
    nextPageCursor:     RobloxCursorSchema.nullable(),
    data:               z.array(item),
})


/**
 * 실패 응답 body. `code`는 엔드포인트마다 의미가 다르다.
 * 스펙에 적힌 코드와 실제가 다를 수 있다 (인증 없음: 스펙은 0, 실제는 9002 + subcode).
 */
export const RobloxErrorResponseSchema = z.object({
    errors: z.array(z.object({
        code:              z.number(),
        subcode:           z.number().optional(),
        message:           z.string(),
        userFacingMessage: z.string().optional(),
        field:             z.string().optional(),
    })),
})

export type RobloxErrorResponse = z.infer<typeof RobloxErrorResponseSchema>
