import z from "zod";
import { RobloxArrayResponseSchema, RobloxCursorSchema, RobloxPageLimitSchema, RobloxPageResponseSchema, RobloxSortOrderSchema } from "./common";

export const RobloxBirthYearSchema = z.number().int().max(new Date().getFullYear()).brand("RobloxBirthYear")
export const RobloxBirthMonthSchema = z.number().int().min(1).max(12).brand("RobloxBirthMonth")
export const RobloxBirthDaySchema = z.number().int().min(1).max(31).brand("RobloxBirthDay")

export type RobloxBirthYear = z.infer<typeof RobloxBirthYearSchema>
export type RobloxBirthMonth = z.infer<typeof RobloxBirthMonthSchema>
export type RobloxBirthDay = z.infer<typeof RobloxBirthDaySchema>


export const RobloxUserIdSchema = z.number().int().min(1).brand("RobloxUserId")
export const RobloxUserNameSchema = z.string().brand("RobloxUserName")
export const RobloxUserDisplaynameSchema = z.string().brand("RobloxUserDisplayname")

export type RobloxUserId = z.infer<typeof RobloxUserIdSchema>
export type RobloxUserName = z.infer<typeof RobloxUserNameSchema>
export type RobloxUserDisplayname = z.infer<typeof RobloxUserDisplaynameSchema>


/** `['Unknown' = 1, 'Male' = 2, 'Female' = 3]` */
export const RobloxGender = { Unknown: 1, Male: 2, Female: 3 } as const
export const RobloxGenderSchema = z.literal([1, 2, 3])

export type RobloxGender = z.infer<typeof RobloxGenderSchema>

/** 스펙에 의미가 없다. 알려진 값: 0 = 13세 이상, 1 = 13세 미만 */
export const RobloxAgeBracket = { Over13: 0, Under13: 1 } as const
export const RobloxAgeBracketSchema = z.number().int()

export type RobloxAgeBracket = z.infer<typeof RobloxAgeBracketSchema>


// ── 응답 ────────────────────────────────────────────────

/** `AuthenticatedGetUserResponse` — GET /v1/users/authenticated */
export const RobloxAuthenticatedUserSchema = z.object({
    id:          RobloxUserIdSchema,
    name:        RobloxUserNameSchema,
    displayName: RobloxUserDisplaynameSchema,
})

/** `MultiGetUserResponse` — POST /v1/users 의 항목 */
export const RobloxUserSchema = RobloxAuthenticatedUserSchema.extend({
    hasVerifiedBadge: z.boolean(),
})

/** `GetUserResponse` — GET /v1/users/{userId} */
export const RobloxUserDetailSchema = RobloxUserSchema.extend({
    description:            z.string(),
    created:                z.string(),
    isBanned:               z.boolean(),
    /** 사용되지 않는 legacy 필드. 항상 null */
    externalAppDisplayName: z.string().nullable(),
})

/** `MultiGetUserByNameResponse` — POST /v1/usernames/users 의 항목 */
export const RobloxUserByNameSchema = RobloxUserSchema.extend({
    requestedUsername: z.string(),
})

/** `SearchGetUserResponse` — GET /v1/users/search 의 항목 */
export const RobloxUserSearchResultSchema = RobloxUserSchema.extend({
    previousUsernames: z.array(z.string()),
})

/** `UsernameHistoryResponse` — GET /v1/users/{userId}/username-history 의 항목 */
export const RobloxUsernameHistoryEntrySchema = z.object({
    name: RobloxUserNameSchema,
})

/** `BirthdateResponse` — GET /v1/birthdate */
export const RobloxBirthdateSchema = z.object({
    birthMonth: RobloxBirthMonthSchema,
    birthDay:   RobloxBirthDaySchema,
    birthYear:  RobloxBirthYearSchema,
})

/** `DescriptionResponse` — GET/POST /v1/description */
export const RobloxUserDescriptionSchema = z.object({
    description: z.string(),
})

/** `GenderResponse` — GET /v1/gender */
export const RobloxUserGenderSchema = z.object({
    gender: RobloxGenderSchema,
})

/** `UserAgeBracketResponse` — GET /v1/users/authenticated/age-bracket */
export const RobloxUserAgeBracketSchema = z.object({
    ageBracket: RobloxAgeBracketSchema,
})

/** `UserCountryCodeResponse` — GET /v1/users/authenticated/country-code */
export const RobloxUserCountryCodeSchema = z.object({
    countryCode: z.string(),
})

/** `UserRolesResponse` — GET /v1/users/authenticated/roles (예: "Soothsayer", "BetaTester") */
export const RobloxUserRolesSchema = z.object({
    roles: z.array(z.string()),
})

export const RobloxUsersResponseSchema = RobloxArrayResponseSchema(RobloxUserSchema)
export const RobloxUsersByNameResponseSchema = RobloxArrayResponseSchema(RobloxUserByNameSchema)
export const RobloxUserSearchResponseSchema = RobloxPageResponseSchema(RobloxUserSearchResultSchema)
export const RobloxUsernameHistoryResponseSchema = RobloxPageResponseSchema(RobloxUsernameHistoryEntrySchema)

export type RobloxAuthenticatedUser = z.infer<typeof RobloxAuthenticatedUserSchema>
export type RobloxUser = z.infer<typeof RobloxUserSchema>
export type RobloxUserDetail = z.infer<typeof RobloxUserDetailSchema>
export type RobloxUserByName = z.infer<typeof RobloxUserByNameSchema>
export type RobloxUserSearchResult = z.infer<typeof RobloxUserSearchResultSchema>
export type RobloxUsernameHistoryEntry = z.infer<typeof RobloxUsernameHistoryEntrySchema>
export type RobloxBirthdate = z.infer<typeof RobloxBirthdateSchema>
export type RobloxUserDescription = z.infer<typeof RobloxUserDescriptionSchema>
export type RobloxUserGender = z.infer<typeof RobloxUserGenderSchema>
export type RobloxUserAgeBracket = z.infer<typeof RobloxUserAgeBracketSchema>
export type RobloxUserCountryCode = z.infer<typeof RobloxUserCountryCodeSchema>
export type RobloxUserRoles = z.infer<typeof RobloxUserRolesSchema>
export type RobloxUsersResponse = z.infer<typeof RobloxUsersResponseSchema>
export type RobloxUsersByNameResponse = z.infer<typeof RobloxUsersByNameResponseSchema>
export type RobloxUserSearchResponse = z.infer<typeof RobloxUserSearchResponseSchema>
export type RobloxUsernameHistoryResponse = z.infer<typeof RobloxUsernameHistoryResponseSchema>


// ── 요청 (body / query) ─────────────────────────────────
// 요청 타입은 z.input이라 brand 없는 plain 값도 넣을 수 있다.

/** `BirthdateRequest` — POST /v1/birthdate */
export const RobloxSetBirthdateRequestSchema = RobloxBirthdateSchema.extend({
    password: z.string(),
})

/** `DescriptionRequest` — POST /v1/description */
export const RobloxSetDescriptionRequestSchema = z.object({
    description: z.string(),
})

/** `GenderRequest` — POST /v1/gender */
export const RobloxSetGenderRequestSchema = z.object({
    gender: RobloxGenderSchema,
})

/** `MultiGetByUserIdRequest` — POST /v1/users */
export const RobloxUsersRequestSchema = z.object({
    userIds:            z.array(RobloxUserIdSchema),
    excludeBannedUsers: z.boolean().optional(),
})

/** `MultiGetByUsernameRequest` — POST /v1/usernames/users (이전 이름도 검색한다) */
export const RobloxUsersByNameRequestSchema = z.object({
    usernames:          z.array(z.string()),
    excludeBannedUsers: z.boolean().optional(),
})

/** `SetDisplayNameRequest` — PATCH /v1/users/{userId}/display-names */
export const RobloxSetDisplayNameRequestSchema = z.object({
    newDisplayName: z.string(),
})

/** GET /v1/users/{userId}/username-history */
export const RobloxUsernameHistoryQuerySchema = z.object({
    limit:     RobloxPageLimitSchema.optional(),
    cursor:    RobloxCursorSchema.optional(),
    sortOrder: RobloxSortOrderSchema.optional(),
})

/** GET /v1/users/search */
export const RobloxUserSearchQuerySchema = z.object({
    keyword:   z.string(),
    sessionId: z.string().optional(),
    limit:     RobloxPageLimitSchema.optional(),
    cursor:    RobloxCursorSchema.optional(),
})

/** GET /v1/display-names/validate (신규 유저) */
export const RobloxValidateDisplayNameQuerySchema = z.object({
    displayName: z.string(),
    birthdate:   z.string(),
})

/** GET /v1/users/{userId}/display-names/validate (기존 유저) */
export const RobloxValidateUserDisplayNameQuerySchema = z.object({
    displayName: z.string(),
})

export type RobloxSetBirthdateRequest = z.input<typeof RobloxSetBirthdateRequestSchema>
export type RobloxSetDescriptionRequest = z.input<typeof RobloxSetDescriptionRequestSchema>
export type RobloxSetGenderRequest = z.input<typeof RobloxSetGenderRequestSchema>
export type RobloxUsersRequest = z.input<typeof RobloxUsersRequestSchema>
export type RobloxUsersByNameRequest = z.input<typeof RobloxUsersByNameRequestSchema>
export type RobloxSetDisplayNameRequest = z.input<typeof RobloxSetDisplayNameRequestSchema>
export type RobloxUsernameHistoryQuery = z.input<typeof RobloxUsernameHistoryQuerySchema>
export type RobloxUserSearchQuery = z.input<typeof RobloxUserSearchQuerySchema>
export type RobloxValidateDisplayNameQuery = z.input<typeof RobloxValidateDisplayNameQuerySchema>
export type RobloxValidateUserDisplayNameQuery = z.input<typeof RobloxValidateUserDisplayNameQuerySchema>
