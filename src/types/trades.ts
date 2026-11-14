import * as z from "zod";

/**
 * `CanTradeResponse` — GET /v1/users/{userId}/can-trade-with.
 * `status`는 이유 코드다 ("CanTrade", "CannotTradeWithSelf", "SenderCannotTrade",
 * "ReceiverCannotTrade", "SenderPrivacySettingsTooRestrictive" 등). 새 값이 와도 깨지지 않게 문자열로 받는다.
 */
export const RobloxCanTradeSchema = z.object({
    canTrade: z.boolean(),
    status:   z.string(),
})

export type RobloxCanTrade = z.infer<typeof RobloxCanTradeSchema>
