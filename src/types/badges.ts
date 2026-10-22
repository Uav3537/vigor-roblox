import z from "zod";
import {
    RobloxAssetIdSchema,
    RobloxBadgeIdSchema,
    RobloxPageResponseSchema,
    RobloxPlaceIdSchema,
    RobloxUniverseIdSchema,
    type RobloxBadgeId,
    type RobloxCursor,
    type RobloxPageLimit,
    type RobloxSortOrder,
} from "./common";
import { RobloxCreatorSchema } from "./creator";

// badges.roblox.com은 swagger(/docs/json/v1)가 살아 있다. 실측(2026-10)과 다른 곳:
// - 유저의 배지 목록과 획득 날짜는 이제 인증이 필요하다 (익명이면 401 / 403 "Request Context Failure").
// - awarded-dates는 badgeIds 100개까지 받는다. 101개를 보내면 403 "Challenge is required"이고, 그 쿠키는 한동안 같은 403을 받는다.
// - awarded-date(하나)는 받지 못한 배지면 204와 빈 body를 준다.
// - awarder.type은 스펙의 숫자 enum이 아니라 "Place" 문자열로 온다.


// ── 결과 ───────────────────────────────────────────────

/** `BadgeAwardStatisticsResponse` */
export const RobloxBadgeStatisticsSchema = z.object({
    pastDayAwardedCount: z.number(),
    awardedCount:        z.number(),
    /** 0~1. 지난 하루 동안 게임에 들어온 사람 중 받은 비율 */
    winRatePercentage:   z.number(),
})

const BadgeBaseSchema = z.object({
    id:                 RobloxBadgeIdSchema,
    name:               z.string(),
    description:        z.string().nullable(),
    displayName:        z.string(),
    displayDescription: z.string().nullable(),
    enabled:            z.boolean(),
    iconImageId:        RobloxAssetIdSchema.nullable().catch(null),
    displayIconImageId: RobloxAssetIdSchema.nullable().catch(null),
    created:            z.string(),
    updated:            z.string(),
    statistics:         RobloxBadgeStatisticsSchema,
})

/** `BadgeResponse` — 배지 상세와 배지를 주는 게임 */
export const RobloxBadgeSchema = BadgeBaseSchema.extend({
    awardingUniverse: z.object({
        id:          RobloxUniverseIdSchema,
        name:        z.string(),
        rootPlaceId: RobloxPlaceIdSchema,
    }),
})

/** `GetBadgesByUserResponse` — 유저가 받은 배지. 게임 대신 만든 사람과 배지를 준 place가 온다 */
export const RobloxUserBadgeSchema = BadgeBaseSchema.extend({
    creator: RobloxCreatorSchema({ name: z.string().nullish() }),
    /** 응답은 `{ id, type: "Place" }`. type은 언제나 Place라 뺀다 */
    awarder: z.object({ id: RobloxPlaceIdSchema, name: z.string().nullish() }),
})

/** `BadgeResponseV2` — 배지를 만든 결과 */
export const RobloxCreatedBadgeSchema = BadgeBaseSchema.extend({
    awarder: z.object({ id: RobloxPlaceIdSchema, name: z.string().nullish() }),
})

/** `BadgeAwardResponse` */
export const RobloxBadgeAwardSchema = z.object({
    badgeId:     RobloxBadgeIdSchema,
    awardedDate: z.string(),
})

/** `BadgeMetadataResponse` */
export const RobloxBadgeMetadataSchema = z.object({
    /** 무료 한도를 넘었을 때 배지 하나를 만드는 비용(Robux) */
    badgeCreationPrice:        z.number(),
    maxBadgeNameLength:        z.number(),
    maxBadgeDescriptionLength: z.number(),
    defaultBadgeIconImageId:   RobloxAssetIdSchema.nullable().catch(null),
})

export const RobloxBadgePageSchema = RobloxPageResponseSchema(RobloxBadgeSchema)
export const RobloxUserBadgePageSchema = RobloxPageResponseSchema(RobloxUserBadgeSchema)
export const RobloxBadgeAwardsResponseSchema = z.object({ data: z.array(RobloxBadgeAwardSchema) })

export type RobloxBadgeStatistics = z.infer<typeof RobloxBadgeStatisticsSchema>
export type RobloxBadge = z.infer<typeof RobloxBadgeSchema>
export type RobloxUserBadge = z.infer<typeof RobloxUserBadgeSchema>
export type RobloxCreatedBadge = z.infer<typeof RobloxCreatedBadgeSchema>
export type RobloxBadgeAward = z.infer<typeof RobloxBadgeAwardSchema>
export type RobloxBadgeMetadata = z.infer<typeof RobloxBadgeMetadataSchema>

/** 배지 하나를 받았는지. 받지 않았으면 `awardedDate`가 null이다 */
export type RobloxBadgeAwardStatus = { badgeId: RobloxBadgeId, awardedDate: string | null }


// ── 요청 ───────────────────────────────────────────────

export type RobloxBadgePageQuery = {
    limit?:     RobloxPageLimit
    cursor?:    RobloxCursor
    sortOrder?: RobloxSortOrder
}

export type RobloxUniverseBadgesQuery = RobloxBadgePageQuery & {
    /** 기본은 Rank (게임에서 정한 순서) */
    sortBy?: "Rank" | "DateCreated"
}

export type RobloxUpdateBadgeRequest = {
    name?:        string
    description?: string
    enabled?:     boolean
}

export type RobloxCreateBadgeRequest = {
    name:         string
    description?: string
    /** 무료 한도(`getFreeQuotas`)를 넘으면 낼 돈. "User"는 내 Robux, "Group"은 게임을 가진 그룹의 Robux */
    paymentSource?: "User" | "Group"
    /** 낼 것으로 예상한 비용. 실제 비용(`getMetadata().badgeCreationPrice`, 무료면 0)과 다르면 400 code 18 */
    expectedCost?:  number
    /** 기본 true */
    isActive?:      boolean
    /** 배지 아이콘. 없으면 기본 아이콘으로 만든다 */
    icon?:          Blob
}
