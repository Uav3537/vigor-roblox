import z from "zod";
import { RobloxJobIdSchema, RobloxPlaceIdSchema, RobloxUniverseIdSchema } from "./common";
import { RobloxUserIdSchema } from "./users";

/** 스펙은 `[0, 1, 2, 3]`만 적는다. 새 값이 와도 깨지지 않게 숫자로 받는다. */
export const RobloxPresenceType = { Offline: 0, Online: 1, InGame: 2, InStudio: 3 } as const
export const RobloxPresenceTypeSchema = z.number().int()

export type RobloxPresenceType = z.infer<typeof RobloxPresenceTypeSchema>

/**
 * `UserPresence` — POST /v1/presence/users 의 항목.
 * 게임 정보는 대상의 공개 설정과 요청 계정의 관계에 따라 null일 수 있다.
 */
export const RobloxUserPresenceSchema = z.object({
    userId:           RobloxUserIdSchema,
    userPresenceType: RobloxPresenceTypeSchema,
    lastLocation:     z.string().nullable(),
    placeId:          RobloxPlaceIdSchema.nullable(),
    rootPlaceId:      RobloxPlaceIdSchema.nullable(),
    /** 접속한 서버 */
    gameId:           RobloxJobIdSchema.nullable(),
    universeId:       RobloxUniverseIdSchema.nullable(),
})

/** `UserPresencesResponse` */
export const RobloxUserPresencesResponseSchema = z.object({
    userPresences: z.array(RobloxUserPresenceSchema),
})

export type RobloxUserPresence = z.infer<typeof RobloxUserPresenceSchema>
export type RobloxUserPresencesResponse = z.infer<typeof RobloxUserPresencesResponseSchema>
