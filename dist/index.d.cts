import z from 'zod';
import * as vigor_fetch from 'vigor-fetch';

declare const RobloxCursorSchema: z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">;
type RobloxCursor = z.infer<typeof RobloxCursorSchema>;
declare const RobloxAssetIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">;
declare const RobloxPlaceIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
declare const RobloxUniverseIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
declare const RobloxGroupIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
declare const RobloxBadgeIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxBadgeId", "out">;
declare const RobloxGamePassIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxGamePassId", "out">;
declare const RobloxBundleIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxBundleId", "out">;
declare const RobloxOutfitIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxOutfitId", "out">;
declare const RobloxDeveloperProductIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxDeveloperProductId", "out">;
/** 게임(universe)에 등록된 썸네일 하나의 ID */
declare const RobloxGameThumbnailIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxGameThumbnailId", "out">;
type RobloxAssetId = z.infer<typeof RobloxAssetIdSchema>;
type RobloxPlaceId = z.infer<typeof RobloxPlaceIdSchema>;
type RobloxUniverseId = z.infer<typeof RobloxUniverseIdSchema>;
type RobloxGroupId = z.infer<typeof RobloxGroupIdSchema>;
type RobloxBadgeId = z.infer<typeof RobloxBadgeIdSchema>;
type RobloxGamePassId = z.infer<typeof RobloxGamePassIdSchema>;
type RobloxBundleId = z.infer<typeof RobloxBundleIdSchema>;
type RobloxOutfitId = z.infer<typeof RobloxOutfitIdSchema>;
type RobloxDeveloperProductId = z.infer<typeof RobloxDeveloperProductIdSchema>;
type RobloxGameThumbnailId = z.infer<typeof RobloxGameThumbnailIdSchema>;
/** 비공개(VIP) 서버 ID (`vipServerId`) */
declare const RobloxPrivateServerIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxPrivateServerId", "out">;
/** 실행 중인 서버 하나(JobId, 응답의 `gameId`/`id`) */
declare const RobloxJobIdSchema: z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">;
type RobloxPrivateServerId = z.infer<typeof RobloxPrivateServerIdSchema>;
type RobloxJobId = z.infer<typeof RobloxJobIdSchema>;
/** 채팅 대화 ID. 지금은 UUID지만 형식을 강제하지 않는다 */
declare const RobloxConversationIdSchema: z.core.$ZodBranded<z.ZodString, "RobloxConversationId", "out">;
/** 채팅 메시지 ID */
declare const RobloxChatMessageIdSchema: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
type RobloxConversationId = z.infer<typeof RobloxConversationIdSchema>;
type RobloxChatMessageId = z.infer<typeof RobloxChatMessageIdSchema>;
declare const RobloxPageLimitSchema: z.ZodLiteral<10 | 25 | 50 | 100>;
declare const RobloxSortOrderSchema: z.ZodEnum<{
    Asc: "Asc";
    Desc: "Desc";
}>;
type RobloxPageLimit = z.infer<typeof RobloxPageLimitSchema>;
type RobloxSortOrder = z.infer<typeof RobloxSortOrderSchema>;
/** `Roblox.Web.WebAPI.ApiEmptyResponseModel` — 성공 시 `{}` */
declare const RobloxEmptyResponseSchema: z.ZodObject<{}, z.core.$strip>;
type RobloxEmptyResponse = z.infer<typeof RobloxEmptyResponseSchema>;
/** `Roblox.Web.WebAPI.Models.ApiArrayResponse[T]` */
declare const RobloxArrayResponseSchema: <T extends z.ZodType>(item: T) => z.ZodObject<{
    data: z.ZodArray<T>;
}, z.core.$strip>;
/** `Roblox.Web.WebAPI.Models.ApiPageResponse[T]` — 첫/마지막 페이지에서는 커서가 `null`이다. */
declare const RobloxPageResponseSchema: <T extends z.ZodType>(item: T) => z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<T>;
}, z.core.$strip>;
/**
 * 실패 응답 body. `code`는 엔드포인트마다 의미가 다르다.
 * 스펙에 적힌 코드와 실제가 다를 수 있다 (인증 없음: 스펙은 0, 실제는 9002 + subcode).
 */
declare const RobloxErrorResponseSchema: z.ZodObject<{
    errors: z.ZodArray<z.ZodObject<{
        code: z.ZodNumber;
        subcode: z.ZodOptional<z.ZodNumber>;
        message: z.ZodString;
        userFacingMessage: z.ZodOptional<z.ZodString>;
        field: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type RobloxErrorResponse = z.infer<typeof RobloxErrorResponseSchema>;

declare const RobloxBirthYearSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxBirthYear", "out">;
declare const RobloxBirthMonthSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxBirthMonth", "out">;
declare const RobloxBirthDaySchema: z.core.$ZodBranded<z.ZodNumber, "RobloxBirthDay", "out">;
type RobloxBirthYear = z.infer<typeof RobloxBirthYearSchema>;
type RobloxBirthMonth = z.infer<typeof RobloxBirthMonthSchema>;
type RobloxBirthDay = z.infer<typeof RobloxBirthDaySchema>;
declare const RobloxUserIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
declare const RobloxUserNameSchema: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
declare const RobloxUserDisplaynameSchema: z.core.$ZodBranded<z.ZodString, "RobloxUserDisplayname", "out">;
type RobloxUserId = z.infer<typeof RobloxUserIdSchema>;
type RobloxUserName = z.infer<typeof RobloxUserNameSchema>;
type RobloxUserDisplayname = z.infer<typeof RobloxUserDisplaynameSchema>;
declare const RobloxGenderSchema: z.ZodLiteral<1 | 2 | 3>;
/** `['Unknown' = 1, 'Male' = 2, 'Female' = 3]` */
declare const RobloxGender: {
    readonly Unknown: 1;
    readonly Male: 2;
    readonly Female: 3;
};
type RobloxGender = z.infer<typeof RobloxGenderSchema>;
declare const RobloxAgeBracketSchema: z.ZodNumber;
/** 스펙에 의미가 없다. 알려진 값: 0 = 13세 이상, 1 = 13세 미만 */
declare const RobloxAgeBracket: {
    readonly Over13: 0;
    readonly Under13: 1;
};
type RobloxAgeBracket = z.infer<typeof RobloxAgeBracketSchema>;
/** `AuthenticatedGetUserResponse` — GET /v1/users/authenticated */
declare const RobloxAuthenticatedUserSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
    displayName: z.core.$ZodBranded<z.ZodString, "RobloxUserDisplayname", "out">;
}, z.core.$strip>;
/** `MultiGetUserResponse` — POST /v1/users 의 항목 */
declare const RobloxUserSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
    displayName: z.core.$ZodBranded<z.ZodString, "RobloxUserDisplayname", "out">;
    hasVerifiedBadge: z.ZodBoolean;
}, z.core.$strip>;
/** `GetUserResponse` — GET /v1/users/{userId} */
declare const RobloxUserDetailSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
    displayName: z.core.$ZodBranded<z.ZodString, "RobloxUserDisplayname", "out">;
    hasVerifiedBadge: z.ZodBoolean;
    description: z.ZodString;
    created: z.ZodString;
    isBanned: z.ZodBoolean;
    externalAppDisplayName: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
/** `MultiGetUserByNameResponse` — POST /v1/usernames/users 의 항목 */
declare const RobloxUserByNameSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
    displayName: z.core.$ZodBranded<z.ZodString, "RobloxUserDisplayname", "out">;
    hasVerifiedBadge: z.ZodBoolean;
    requestedUsername: z.ZodString;
}, z.core.$strip>;
/** `SearchGetUserResponse` — GET /v1/users/search 의 항목 */
declare const RobloxUserSearchResultSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
    displayName: z.core.$ZodBranded<z.ZodString, "RobloxUserDisplayname", "out">;
    hasVerifiedBadge: z.ZodBoolean;
    previousUsernames: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
/** `UsernameHistoryResponse` — GET /v1/users/{userId}/username-history 의 항목 */
declare const RobloxUsernameHistoryEntrySchema: z.ZodObject<{
    name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
}, z.core.$strip>;
/** `BirthdateResponse` — GET /v1/birthdate */
declare const RobloxBirthdateSchema: z.ZodObject<{
    birthMonth: z.core.$ZodBranded<z.ZodNumber, "RobloxBirthMonth", "out">;
    birthDay: z.core.$ZodBranded<z.ZodNumber, "RobloxBirthDay", "out">;
    birthYear: z.core.$ZodBranded<z.ZodNumber, "RobloxBirthYear", "out">;
}, z.core.$strip>;
/** `DescriptionResponse` — GET/POST /v1/description */
declare const RobloxUserDescriptionSchema: z.ZodObject<{
    description: z.ZodString;
}, z.core.$strip>;
/** `GenderResponse` — GET /v1/gender */
declare const RobloxUserGenderSchema: z.ZodObject<{
    gender: z.ZodLiteral<1 | 2 | 3>;
}, z.core.$strip>;
/** `UserAgeBracketResponse` — GET /v1/users/authenticated/age-bracket */
declare const RobloxUserAgeBracketSchema: z.ZodObject<{
    ageBracket: z.ZodNumber;
}, z.core.$strip>;
/** `UserCountryCodeResponse` — GET /v1/users/authenticated/country-code */
declare const RobloxUserCountryCodeSchema: z.ZodObject<{
    countryCode: z.ZodString;
}, z.core.$strip>;
/** `UserRolesResponse` — GET /v1/users/authenticated/roles (예: "Soothsayer", "BetaTester") */
declare const RobloxUserRolesSchema: z.ZodObject<{
    roles: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
declare const RobloxUsersResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
        displayName: z.core.$ZodBranded<z.ZodString, "RobloxUserDisplayname", "out">;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxUsersByNameResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
        displayName: z.core.$ZodBranded<z.ZodString, "RobloxUserDisplayname", "out">;
        hasVerifiedBadge: z.ZodBoolean;
        requestedUsername: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxUserSearchResponseSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
        displayName: z.core.$ZodBranded<z.ZodString, "RobloxUserDisplayname", "out">;
        hasVerifiedBadge: z.ZodBoolean;
        previousUsernames: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxUsernameHistoryResponseSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        name: z.core.$ZodBranded<z.ZodString, "RobloxUserName", "out">;
    }, z.core.$strip>>;
}, z.core.$strip>;
type RobloxAuthenticatedUser = z.infer<typeof RobloxAuthenticatedUserSchema>;
type RobloxUser = z.infer<typeof RobloxUserSchema>;
type RobloxUserDetail = z.infer<typeof RobloxUserDetailSchema>;
type RobloxUserByName = z.infer<typeof RobloxUserByNameSchema>;
type RobloxUserSearchResult = z.infer<typeof RobloxUserSearchResultSchema>;
type RobloxUsernameHistoryEntry = z.infer<typeof RobloxUsernameHistoryEntrySchema>;
type RobloxBirthdate = z.infer<typeof RobloxBirthdateSchema>;
type RobloxUserDescription = z.infer<typeof RobloxUserDescriptionSchema>;
type RobloxUserGender = z.infer<typeof RobloxUserGenderSchema>;
type RobloxUserAgeBracket = z.infer<typeof RobloxUserAgeBracketSchema>;
type RobloxUserCountryCode = z.infer<typeof RobloxUserCountryCodeSchema>;
type RobloxUserRoles = z.infer<typeof RobloxUserRolesSchema>;
type RobloxUsersResponse = z.infer<typeof RobloxUsersResponseSchema>;
type RobloxUsersByNameResponse = z.infer<typeof RobloxUsersByNameResponseSchema>;
type RobloxUserSearchResponse = z.infer<typeof RobloxUserSearchResponseSchema>;
type RobloxUsernameHistoryResponse = z.infer<typeof RobloxUsernameHistoryResponseSchema>;
/** `BirthdateRequest` — POST /v1/birthdate */
declare const RobloxSetBirthdateRequestSchema: z.ZodObject<{
    birthMonth: z.core.$ZodBranded<z.ZodNumber, "RobloxBirthMonth", "out">;
    birthDay: z.core.$ZodBranded<z.ZodNumber, "RobloxBirthDay", "out">;
    birthYear: z.core.$ZodBranded<z.ZodNumber, "RobloxBirthYear", "out">;
    password: z.ZodString;
}, z.core.$strip>;
/** `DescriptionRequest` — POST /v1/description */
declare const RobloxSetDescriptionRequestSchema: z.ZodObject<{
    description: z.ZodString;
}, z.core.$strip>;
/** `GenderRequest` — POST /v1/gender */
declare const RobloxSetGenderRequestSchema: z.ZodObject<{
    gender: z.ZodLiteral<1 | 2 | 3>;
}, z.core.$strip>;
/** `MultiGetByUserIdRequest` — POST /v1/users */
declare const RobloxUsersRequestSchema: z.ZodObject<{
    userIds: z.ZodArray<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
    excludeBannedUsers: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/** `MultiGetByUsernameRequest` — POST /v1/usernames/users (이전 이름도 검색한다) */
declare const RobloxUsersByNameRequestSchema: z.ZodObject<{
    usernames: z.ZodArray<z.ZodString>;
    excludeBannedUsers: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/** `SetDisplayNameRequest` — PATCH /v1/users/{userId}/display-names */
declare const RobloxSetDisplayNameRequestSchema: z.ZodObject<{
    newDisplayName: z.ZodString;
}, z.core.$strip>;
/** GET /v1/users/{userId}/username-history */
declare const RobloxUsernameHistoryQuerySchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodLiteral<10 | 25 | 50 | 100>>;
    cursor: z.ZodOptional<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        Asc: "Asc";
        Desc: "Desc";
    }>>;
}, z.core.$strip>;
/** GET /v1/users/search */
declare const RobloxUserSearchQuerySchema: z.ZodObject<{
    keyword: z.ZodString;
    sessionId: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodLiteral<10 | 25 | 50 | 100>>;
    cursor: z.ZodOptional<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
}, z.core.$strip>;
/** GET /v1/display-names/validate (신규 유저) */
declare const RobloxValidateDisplayNameQuerySchema: z.ZodObject<{
    displayName: z.ZodString;
    birthdate: z.ZodString;
}, z.core.$strip>;
/** GET /v1/users/{userId}/display-names/validate (기존 유저) */
declare const RobloxValidateUserDisplayNameQuerySchema: z.ZodObject<{
    displayName: z.ZodString;
}, z.core.$strip>;
type RobloxSetBirthdateRequest = z.input<typeof RobloxSetBirthdateRequestSchema>;
type RobloxSetDescriptionRequest = z.input<typeof RobloxSetDescriptionRequestSchema>;
type RobloxSetGenderRequest = z.input<typeof RobloxSetGenderRequestSchema>;
type RobloxUsersRequest = z.input<typeof RobloxUsersRequestSchema>;
type RobloxUsersByNameRequest = z.input<typeof RobloxUsersByNameRequestSchema>;
type RobloxSetDisplayNameRequest = z.input<typeof RobloxSetDisplayNameRequestSchema>;
type RobloxUsernameHistoryQuery = z.input<typeof RobloxUsernameHistoryQuerySchema>;
type RobloxUserSearchQuery = z.input<typeof RobloxUserSearchQuerySchema>;
type RobloxValidateDisplayNameQuery = z.input<typeof RobloxValidateDisplayNameQuerySchema>;
type RobloxValidateUserDisplayNameQuery = z.input<typeof RobloxValidateUserDisplayNameQuerySchema>;

/** `ThumbnailResponse.state` */
declare const RobloxThumbnailStateSchema: z.ZodEnum<{
    Error: "Error";
    Completed: "Completed";
    InReview: "InReview";
    Pending: "Pending";
    Blocked: "Blocked";
    TemporarilyUnavailable: "TemporarilyUnavailable";
}>;
type RobloxThumbnailState = z.infer<typeof RobloxThumbnailStateSchema>;
/** GET /v1/assets 등의 `returnPolicy`. AutoGenerated 계열은 권한이 있는 계정만 쓸 수 있다 (없으면 403). */
declare const RobloxThumbnailReturnPolicySchema: z.ZodEnum<{
    PlaceHolder: "PlaceHolder";
    ForcePlaceHolder: "ForcePlaceHolder";
    AutoGenerated: "AutoGenerated";
    ForceAutoGenerated: "ForceAutoGenerated";
}>;
type RobloxThumbnailReturnPolicy = z.infer<typeof RobloxThumbnailReturnPolicySchema>;
declare const RobloxThumbnailSizes: {
    readonly Avatar: z.ZodEnum<{
        "30x30": "30x30";
        "48x48": "48x48";
        "60x60": "60x60";
        "75x75": "75x75";
        "100x100": "100x100";
        "110x110": "110x110";
        "140x140": "140x140";
        "150x150": "150x150";
        "150x200": "150x200";
        "180x180": "180x180";
        "250x250": "250x250";
        "352x352": "352x352";
        "420x420": "420x420";
        "720x720": "720x720";
    }>;
    readonly AvatarHeadShot: z.ZodEnum<{
        "48x48": "48x48";
        "60x60": "60x60";
        "75x75": "75x75";
        "100x100": "100x100";
        "110x110": "110x110";
        "150x150": "150x150";
        "180x180": "180x180";
        "352x352": "352x352";
        "420x420": "420x420";
        "720x720": "720x720";
        "50x50": "50x50";
    }>;
    readonly AvatarBust: z.ZodEnum<{
        "48x48": "48x48";
        "60x60": "60x60";
        "75x75": "75x75";
        "100x100": "100x100";
        "150x150": "150x150";
        "180x180": "180x180";
        "352x352": "352x352";
        "420x420": "420x420";
        "50x50": "50x50";
    }>;
    readonly Outfit: z.ZodEnum<{
        "150x150": "150x150";
        "420x420": "420x420";
    }>;
    readonly Asset: z.ZodEnum<{
        "30x30": "30x30";
        "75x75": "75x75";
        "110x110": "110x110";
        "140x140": "140x140";
        "150x150": "150x150";
        "250x250": "250x250";
        "420x420": "420x420";
        "50x50": "50x50";
        "42x42": "42x42";
        "60x62": "60x62";
        "160x100": "160x100";
        "160x600": "160x600";
        "256x144": "256x144";
        "300x250": "300x250";
        "304x166": "304x166";
        "384x216": "384x216";
        "396x216": "396x216";
        "480x270": "480x270";
        "512x512": "512x512";
        "576x324": "576x324";
        "700x700": "700x700";
        "728x90": "728x90";
        "768x432": "768x432";
        "1200x80": "1200x80";
        "330x110": "330x110";
        "660x220": "660x220";
        "1320x440": "1320x440";
        "720x228": "720x228";
        "1440x456": "1440x456";
        "930x480": "930x480";
    }>;
    readonly GameIcon: z.ZodEnum<{
        "150x150": "150x150";
        "420x420": "420x420";
        "50x50": "50x50";
        "512x512": "512x512";
        "128x128": "128x128";
        "256x256": "256x256";
    }>;
    readonly PlaceIcon: z.ZodEnum<{
        "150x150": "150x150";
        "420x420": "420x420";
        "50x50": "50x50";
        "512x512": "512x512";
        "128x128": "128x128";
        "256x256": "256x256";
    }>;
    readonly GameThumbnail: z.ZodEnum<{
        "256x144": "256x144";
        "384x216": "384x216";
        "480x270": "480x270";
        "576x324": "576x324";
        "768x432": "768x432";
    }>;
    readonly BadgeIcon: z.ZodEnum<{
        "150x150": "150x150";
    }>;
    readonly GamePass: z.ZodEnum<{
        "150x150": "150x150";
    }>;
    readonly BundleThumbnail: z.ZodEnum<{
        "150x150": "150x150";
        "420x420": "420x420";
    }>;
    readonly GroupIcon: z.ZodEnum<{
        "150x150": "150x150";
        "420x420": "420x420";
    }>;
    readonly DeveloperProduct: z.ZodEnum<{
        "150x150": "150x150";
        "420x420": "420x420";
    }>;
};
type RobloxThumbnailSize<T extends keyof typeof RobloxThumbnailSizes> = z.infer<typeof RobloxThumbnailSizes[T]>;
type PngJpegWebp = "Png" | "Jpeg" | "Webp";
type PngWebp = "Png" | "Webp";
type Id<I> = {
    targetId: I;
};
/** 게임 서버 목록의 `playerTokens` 등. targetId 대신 쓴다. */
type UserIdOrToken = Id<RobloxUserId> | {
    token: string;
};
type Image<T extends keyof typeof RobloxThumbnailSizes, F extends string> = {
    type: T;
    size?: RobloxThumbnailSize<T>;
    format?: F;
    isCircular?: boolean;
};
/** 일부 asset은 해당 place 안에서만 볼 수 있다 (`Roblox-Place-Id` 헤더). */
type PlaceContext = {
    placeId?: RobloxPlaceId;
};
type RobloxThumbnailTarget = Image<"Avatar", PngJpegWebp> & UserIdOrToken & {
    includeBackground?: boolean;
} | Image<"AvatarHeadShot", PngJpegWebp> & UserIdOrToken & {
    includeBackground?: boolean;
    includeProfileFrame?: boolean;
} | Image<"AvatarBust", PngWebp> & UserIdOrToken & {
    includeBackground?: boolean;
} | Image<"Outfit", PngWebp> & Id<RobloxOutfitId> & {
    includeBackground?: boolean;
} | Image<"Asset", PngJpegWebp> & Id<RobloxAssetId> & PlaceContext & {
    returnPolicy?: RobloxThumbnailReturnPolicy;
} | Image<"GameIcon", PngJpegWebp> & Id<RobloxUniverseId> & {
    returnPolicy?: RobloxThumbnailReturnPolicy;
} | Image<"PlaceIcon", PngJpegWebp> & Id<RobloxPlaceId> & {
    returnPolicy?: RobloxThumbnailReturnPolicy;
}
/** universeId를 주면 batch가 막혔을 때 다른 엔드포인트로도 보낼 수 있다. */
 | Image<"GameThumbnail", PngJpegWebp> & Id<RobloxGameThumbnailId> & {
    universeId?: RobloxUniverseId;
} | Image<"BadgeIcon", PngWebp> & Id<RobloxBadgeId> | Image<"GamePass", PngWebp> & Id<RobloxGamePassId> | Image<"BundleThumbnail", PngWebp> & Id<RobloxBundleId> | Image<"GroupIcon", PngWebp> & Id<RobloxGroupId> | Image<"DeveloperProduct", PngWebp> & Id<RobloxDeveloperProductId>
/** batch에만 있는 타입. 가능한 크기가 문서화돼 있지 않아 size를 직접 줘야 한다. */
 | {
    type: "Look" | "Screenshot";
    size: string;
    format?: PngJpegWebp;
    isCircular?: boolean;
} & (Id<number> | {
    token: string;
}) | {
    type: "CreatorContextAsset";
    size: string;
    format?: PngJpegWebp;
    isCircular?: boolean;
    accessContext?: string;
    headShape?: string;
} & Id<RobloxAssetId> & PlaceContext
/** 애니메이션 asset 썸네일. 크기/포맷은 서버가 정한다. */
 | {
    type: "AnimatedAsset";
} & Id<RobloxAssetId> & PlaceContext
/** 3D 썸네일 — imageUrl은 3D 메타데이터 JSON을 가리킨다. 인증이 필요하다. */
 | {
    type: "Avatar3d";
} & Id<RobloxUserId> | {
    type: "Outfit3d";
} & Id<RobloxOutfitId> | {
    type: "Asset3d";
    useGltf?: boolean;
} & Id<RobloxAssetId> & PlaceContext;
type RobloxThumbnailType = RobloxThumbnailTarget["type"];
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
/** 유저에 붙이는 아바타 썸네일 옵션. 대상(targetId)은 유저 id로 채워진다. 기본은 150x150 Png 헤드샷 */
type RobloxAvatarThumbnailOptions = DistributiveOmit<Extract<RobloxThumbnailTarget, {
    type: "AvatarHeadShot" | "Avatar" | "AvatarBust";
}>, "targetId" | "token">;
/** 그룹에 붙이는 아이콘 옵션. 기본은 150x150 Png */
type RobloxGroupIconOptions = Omit<Extract<RobloxThumbnailTarget, {
    type: "GroupIcon";
}>, "targetId" | "type">;
/** 배지에 붙이는 아이콘 옵션. 기본은 150x150 Png */
type RobloxBadgeIconOptions = Omit<Extract<RobloxThumbnailTarget, {
    type: "BadgeIcon";
}>, "targetId" | "type">;
/** 썸네일을 붙인 결과. 썸네일이 없으면 `state`가 "Error" 등이고 `imageUrl`이 null이다 */
type RobloxWithThumbnail<T> = T & {
    thumbnail: RobloxThumbnail;
};
/** `ThumbnailResponse` — 어느 엔드포인트로 받았든 같은 모양 */
declare const RobloxThumbnailSchema: z.ZodObject<{
    targetId: z.ZodNumber;
    state: z.ZodEnum<{
        Error: "Error";
        Completed: "Completed";
        InReview: "InReview";
        Pending: "Pending";
        Blocked: "Blocked";
        TemporarilyUnavailable: "TemporarilyUnavailable";
    }>;
    imageUrl: z.ZodNullable<z.ZodString>;
    version: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
/**
 * 썸네일 하나. `I`는 대상 id의 타입이다 — `thumbnails.get()`은 넣은 대상에 맞춰 채운다
 * (유저 아바타면 `RobloxUserId`, 게임 아이콘이면 `RobloxUniverseId` …). 토큰으로 요청했으면 `number`.
 */
type RobloxThumbnail<I extends number = number> = Omit<z.infer<typeof RobloxThumbnailSchema>, "targetId"> & {
    targetId: I;
};
/** 대상의 id 타입. 토큰으로 요청한 아바타는 `number` */
type RobloxThumbnailTargetIdOf<T extends RobloxThumbnailTarget> = T extends {
    targetId: infer I extends number;
} ? I : number;
/** `ThumbnailBatchResponse` — POST /v1/batch 의 항목 */
declare const RobloxThumbnailBatchItemSchema: z.ZodObject<{
    targetId: z.ZodNumber;
    state: z.ZodEnum<{
        Error: "Error";
        Completed: "Completed";
        InReview: "InReview";
        Pending: "Pending";
        Blocked: "Blocked";
        TemporarilyUnavailable: "TemporarilyUnavailable";
    }>;
    imageUrl: z.ZodNullable<z.ZodString>;
    version: z.ZodNullable<z.ZodString>;
    requestId: z.ZodNullable<z.ZodString>;
    errorCode: z.ZodNumber;
    errorMessage: z.ZodString;
}, z.core.$strip>;
/** `UniverseThumbnailsResponse` — GET /v1/games/multiget/thumbnails 의 항목 */
declare const RobloxUniverseThumbnailsSchema: z.ZodObject<{
    universeId: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
    error: z.ZodNullable<z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
    }, z.core.$strip>>;
    thumbnails: z.ZodArray<z.ZodObject<{
        targetId: z.ZodNumber;
        state: z.ZodEnum<{
            Error: "Error";
            Completed: "Completed";
            InReview: "InReview";
            Pending: "Pending";
            Blocked: "Blocked";
            TemporarilyUnavailable: "TemporarilyUnavailable";
        }>;
        imageUrl: z.ZodNullable<z.ZodString>;
        version: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type RobloxUniverseThumbnails = z.infer<typeof RobloxUniverseThumbnailsSchema>;
declare const RobloxThumbnailsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        targetId: z.ZodNumber;
        state: z.ZodEnum<{
            Error: "Error";
            Completed: "Completed";
            InReview: "InReview";
            Pending: "Pending";
            Blocked: "Blocked";
            TemporarilyUnavailable: "TemporarilyUnavailable";
        }>;
        imageUrl: z.ZodNullable<z.ZodString>;
        version: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxThumbnailBatchResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        targetId: z.ZodNumber;
        state: z.ZodEnum<{
            Error: "Error";
            Completed: "Completed";
            InReview: "InReview";
            Pending: "Pending";
            Blocked: "Blocked";
            TemporarilyUnavailable: "TemporarilyUnavailable";
        }>;
        imageUrl: z.ZodNullable<z.ZodString>;
        version: z.ZodNullable<z.ZodString>;
        requestId: z.ZodNullable<z.ZodString>;
        errorCode: z.ZodNumber;
        errorMessage: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxUniverseThumbnailsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        universeId: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
        error: z.ZodNullable<z.ZodObject<{
            code: z.ZodNumber;
            message: z.ZodString;
        }, z.core.$strip>>;
        thumbnails: z.ZodArray<z.ZodObject<{
            targetId: z.ZodNumber;
            state: z.ZodEnum<{
                Error: "Error";
                Completed: "Completed";
                InReview: "InReview";
                Pending: "Pending";
                Blocked: "Blocked";
                TemporarilyUnavailable: "TemporarilyUnavailable";
            }>;
            imageUrl: z.ZodNullable<z.ZodString>;
            version: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** GET /v1/games/multiget/thumbnails */
type RobloxUniverseThumbnailsQuery = {
    /** universe당 최대 개수 */
    countPerUniverse?: number;
    /** 썸네일이 없으면 기본 이미지를 넣는다 */
    defaults?: boolean;
    size?: RobloxThumbnailSize<"GameThumbnail">;
    format?: PngJpegWebp;
    isCircular?: boolean;
};

declare const RobloxPresenceTypeSchema: z.ZodNumber;
/** 스펙은 `[0, 1, 2, 3]`만 적는다. 새 값이 와도 깨지지 않게 숫자로 받는다. */
declare const RobloxPresenceType: {
    readonly Offline: 0;
    readonly Online: 1;
    readonly InGame: 2;
    readonly InStudio: 3;
};
type RobloxPresenceType = z.infer<typeof RobloxPresenceTypeSchema>;
/**
 * `UserPresence` — POST /v1/presence/users 의 항목.
 * 게임 정보는 대상의 공개 설정과 요청 계정의 관계에 따라 null일 수 있다.
 */
declare const RobloxUserPresenceSchema: z.ZodObject<{
    userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    userPresenceType: z.ZodNumber;
    lastLocation: z.ZodNullable<z.ZodString>;
    placeId: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>;
    rootPlaceId: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>;
    gameId: z.ZodNullable<z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">>;
    universeId: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>;
}, z.core.$strip>;
/** `UserPresencesResponse` */
declare const RobloxUserPresencesResponseSchema: z.ZodObject<{
    userPresences: z.ZodArray<z.ZodObject<{
        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        userPresenceType: z.ZodNumber;
        lastLocation: z.ZodNullable<z.ZodString>;
        placeId: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>;
        rootPlaceId: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>;
        gameId: z.ZodNullable<z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">>;
        universeId: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type RobloxUserPresence = z.infer<typeof RobloxUserPresenceSchema>;
type RobloxUserPresencesResponse = z.infer<typeof RobloxUserPresencesResponseSchema>;

/** `GameCreator` — `type`으로 좁히면 `id`가 `RobloxUserId` / `RobloxGroupId`가 된다 */
declare const RobloxGameCreatorSchema: z.ZodPipe<z.ZodObject<{
    id: z.ZodNumber;
    type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    name: z.ZodString;
    isRNVAccount: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    hasVerifiedBadge: z.ZodBoolean;
}, z.core.$strip>, z.ZodTransform<({
    type: "User";
    id: RobloxUserId;
} & Omit<{
    name: string;
    hasVerifiedBadge: boolean;
    isRNVAccount?: boolean | null | undefined;
}, "type" | "id">) | ({
    type: "Group";
    id: RobloxGroupId;
} & Omit<{
    name: string;
    hasVerifiedBadge: boolean;
    isRNVAccount?: boolean | null | undefined;
}, "type" | "id">) | ({
    type: "Unknown";
    id: number;
    rawType: string | number;
} & Omit<{
    name: string;
    hasVerifiedBadge: boolean;
    isRNVAccount?: boolean | null | undefined;
}, "type" | "id">), {
    id: number;
    type: string | number;
    name: string;
    hasVerifiedBadge: boolean;
    isRNVAccount?: boolean | null | undefined;
}>>;
/** `GameDetailResponse` — GET /v1/games 의 항목 */
declare const RobloxGameSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
    rootPlaceId: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    sourceName: z.ZodNullable<z.ZodString>;
    sourceDescription: z.ZodNullable<z.ZodString>;
    creator: z.ZodPipe<z.ZodObject<{
        id: z.ZodNumber;
        type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        name: z.ZodString;
        isRNVAccount: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>, z.ZodTransform<({
        type: "User";
        id: RobloxUserId;
    } & Omit<{
        name: string;
        hasVerifiedBadge: boolean;
        isRNVAccount?: boolean | null | undefined;
    }, "type" | "id">) | ({
        type: "Group";
        id: RobloxGroupId;
    } & Omit<{
        name: string;
        hasVerifiedBadge: boolean;
        isRNVAccount?: boolean | null | undefined;
    }, "type" | "id">) | ({
        type: "Unknown";
        id: number;
        rawType: string | number;
    } & Omit<{
        name: string;
        hasVerifiedBadge: boolean;
        isRNVAccount?: boolean | null | undefined;
    }, "type" | "id">), {
        id: number;
        type: string | number;
        name: string;
        hasVerifiedBadge: boolean;
        isRNVAccount?: boolean | null | undefined;
    }>>;
    price: z.ZodNullable<z.ZodNumber>;
    allowedGearGenres: z.ZodArray<z.ZodString>;
    allowedGearCategories: z.ZodArray<z.ZodString>;
    isGenreEnforced: z.ZodBoolean;
    copyingAllowed: z.ZodBoolean;
    playing: z.ZodNumber;
    visits: z.ZodNumber;
    maxPlayers: z.ZodNumber;
    created: z.ZodString;
    updated: z.ZodString;
    studioAccessToApisAllowed: z.ZodBoolean;
    createVipServersAllowed: z.ZodBoolean;
    universeAvatarType: z.ZodString;
    genre: z.ZodString;
    genre_l1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    genre_l2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    untranslated_genre_l1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isAllGenre: z.ZodBoolean;
    isFavoritedByUser: z.ZodBoolean;
    favoritedCount: z.ZodNumber;
    canonicalUrlPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isContentRestricted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    licenseDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    refundLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    localizedFiatPrice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/** `PurchaseData` */
declare const RobloxFiatPurchaseDataSchema: z.ZodObject<{
    localizedFiatPrice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    basePriceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/** `PlaceDetails` — GET /v1/games/multiget-place-details 의 항목 (인증 필요) */
declare const RobloxPlaceDetailsSchema: z.ZodObject<{
    placeId: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sourceName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sourceDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    url: z.ZodString;
    builder: z.ZodString;
    builderId: z.ZodNumber;
    hasVerifiedBadge: z.ZodBoolean;
    isPlayable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    reasonProhibited: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    universeId: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
    universeRootPlaceId: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
    price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    imageToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fiatPurchaseData: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        localizedFiatPrice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        basePriceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/** `GameProductResponse` — GET /v1/games/games-product-info 의 항목 */
declare const RobloxGameProductSchema: z.ZodObject<{
    universeId: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
    isForSale: z.ZodBoolean;
    productId: z.ZodNullable<z.ZodNumber>;
    price: z.ZodNullable<z.ZodNumber>;
    sellerId: z.ZodNullable<z.ZodNumber>;
    fiatPurchaseData: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        localizedFiatPrice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        basePriceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/** `PlayabilityStatusResponse` — 요청 계정 기준 */
declare const RobloxGamePlayabilitySchema: z.ZodObject<{
    universeId: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
    playabilityStatus: z.ZodString;
    isPlayable: z.ZodBoolean;
    unplayableDisplayText: z.ZodNullable<z.ZodString>;
    playableUxTreatment: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    upsellUxTreatment: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    privatePlaytestInfo: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    demoModeAvailable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
/** `GameVoteResponse` */
declare const RobloxGameVotesSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
    upVotes: z.ZodNumber;
    downVotes: z.ZodNumber;
}, z.core.$strip>;
/** 즐겨찾기 수. GET /v1/games(`favoritedCount`)나 /v1/games/{id}/favorites/count에서 온다. */
type RobloxGameFavoriteCount = {
    universeId: RobloxUniverseId;
    favoritesCount: number;
};
/** `UserGameVoteResponse` — 요청 계정의 투표 */
declare const RobloxUserGameVoteSchema: z.ZodObject<{
    canVote: z.ZodBoolean;
    userVote: z.ZodNullable<z.ZodBoolean>;
    reasonForNotVoteable: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
/** `GameMediaItemResponseV2` — GET /v2/games/{universeId}/media 의 항목 */
declare const RobloxGameMediaSchema: z.ZodObject<{
    assetTypeId: z.ZodNumber;
    assetType: z.ZodString;
    imageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
    videoHash: z.ZodNullable<z.ZodString>;
    videoTitle: z.ZodNullable<z.ZodString>;
    approved: z.ZodBoolean;
    altText: z.ZodNullable<z.ZodString>;
    videoId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/** `GameResponseModel` — 추천 목록의 항목. 평평하게 오는 `creatorId`/`creatorName`/`creatorType`/`creatorHasVerifiedBadge`는 `creator` 하나로 묶는다 */
declare const RobloxRecommendedGameSchema: z.ZodPipe<z.ZodObject<{
    creatorId: z.ZodNumber;
    creatorName: z.ZodString;
    creatorType: z.ZodString;
    creatorHasVerifiedBadge: z.ZodBoolean;
    totalUpVotes: z.ZodNumber;
    totalDownVotes: z.ZodNumber;
    universeId: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
    name: z.ZodString;
    placeId: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
    playerCount: z.ZodNumber;
    imageToken: z.ZodNullable<z.ZodString>;
    isSponsored: z.ZodBoolean;
    nativeAdData: z.ZodNullable<z.ZodString>;
    isShowSponsoredLabel: z.ZodBoolean;
    price: z.ZodNullable<z.ZodNumber>;
    analyticsIdentifier: z.ZodNullable<z.ZodString>;
    gameDescription: z.ZodNullable<z.ZodString>;
    genre: z.ZodNullable<z.ZodString>;
    minimumAge: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    ageRecommendationDisplayName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    canonicalUrlPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>, z.ZodTransform<{
    creator: {
        name: string;
        hasVerifiedBadge: boolean;
        type: "User";
        id: RobloxUserId;
    } | {
        name: string;
        hasVerifiedBadge: boolean;
        type: "Group";
        id: RobloxGroupId;
    } | {
        name: string;
        hasVerifiedBadge: boolean;
        type: "Unknown";
        id: number;
        rawType: string | number;
    };
    totalUpVotes: number;
    totalDownVotes: number;
    universeId: number & z.core.$brand<"RobloxUniverseId">;
    name: string;
    placeId: number & z.core.$brand<"RobloxPlaceId">;
    playerCount: number;
    imageToken: string | null;
    isSponsored: boolean;
    nativeAdData: string | null;
    isShowSponsoredLabel: boolean;
    price: number | null;
    analyticsIdentifier: string | null;
    gameDescription: string | null;
    genre: string | null;
    minimumAge?: number | null | undefined;
    ageRecommendationDisplayName?: string | null | undefined;
    canonicalUrlPath?: string | null | undefined;
}, {
    creatorId: number;
    creatorName: string;
    creatorType: string;
    creatorHasVerifiedBadge: boolean;
    totalUpVotes: number;
    totalDownVotes: number;
    universeId: number & z.core.$brand<"RobloxUniverseId">;
    name: string;
    placeId: number & z.core.$brand<"RobloxPlaceId">;
    playerCount: number;
    imageToken: string | null;
    isSponsored: boolean;
    nativeAdData: string | null;
    isShowSponsoredLabel: boolean;
    price: number | null;
    analyticsIdentifier: string | null;
    gameDescription: string | null;
    genre: string | null;
    minimumAge?: number | null | undefined;
    ageRecommendationDisplayName?: string | null | undefined;
    canonicalUrlPath?: string | null | undefined;
}>>;
/** `GameRecommendationsResponse` */
declare const RobloxGameRecommendationsSchema: z.ZodObject<{
    games: z.ZodArray<z.ZodPipe<z.ZodObject<{
        creatorId: z.ZodNumber;
        creatorName: z.ZodString;
        creatorType: z.ZodString;
        creatorHasVerifiedBadge: z.ZodBoolean;
        totalUpVotes: z.ZodNumber;
        totalDownVotes: z.ZodNumber;
        universeId: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
        name: z.ZodString;
        placeId: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
        playerCount: z.ZodNumber;
        imageToken: z.ZodNullable<z.ZodString>;
        isSponsored: z.ZodBoolean;
        nativeAdData: z.ZodNullable<z.ZodString>;
        isShowSponsoredLabel: z.ZodBoolean;
        price: z.ZodNullable<z.ZodNumber>;
        analyticsIdentifier: z.ZodNullable<z.ZodString>;
        gameDescription: z.ZodNullable<z.ZodString>;
        genre: z.ZodNullable<z.ZodString>;
        minimumAge: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        ageRecommendationDisplayName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        canonicalUrlPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodTransform<{
        creator: {
            name: string;
            hasVerifiedBadge: boolean;
            type: "User";
            id: RobloxUserId;
        } | {
            name: string;
            hasVerifiedBadge: boolean;
            type: "Group";
            id: RobloxGroupId;
        } | {
            name: string;
            hasVerifiedBadge: boolean;
            type: "Unknown";
            id: number;
            rawType: string | number;
        };
        totalUpVotes: number;
        totalDownVotes: number;
        universeId: number & z.core.$brand<"RobloxUniverseId">;
        name: string;
        placeId: number & z.core.$brand<"RobloxPlaceId">;
        playerCount: number;
        imageToken: string | null;
        isSponsored: boolean;
        nativeAdData: string | null;
        isShowSponsoredLabel: boolean;
        price: number | null;
        analyticsIdentifier: string | null;
        gameDescription: string | null;
        genre: string | null;
        minimumAge?: number | null | undefined;
        ageRecommendationDisplayName?: string | null | undefined;
        canonicalUrlPath?: string | null | undefined;
    }, {
        creatorId: number;
        creatorName: string;
        creatorType: string;
        creatorHasVerifiedBadge: boolean;
        totalUpVotes: number;
        totalDownVotes: number;
        universeId: number & z.core.$brand<"RobloxUniverseId">;
        name: string;
        placeId: number & z.core.$brand<"RobloxPlaceId">;
        playerCount: number;
        imageToken: string | null;
        isSponsored: boolean;
        nativeAdData: string | null;
        isShowSponsoredLabel: boolean;
        price: number | null;
        analyticsIdentifier: string | null;
        gameDescription: string | null;
        genre: string | null;
        minimumAge?: number | null | undefined;
        ageRecommendationDisplayName?: string | null | undefined;
        canonicalUrlPath?: string | null | undefined;
    }>>>;
    nextPaginationKey: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
/** `GameResponseV2` / `GroupExperienceResponse` — 유저/그룹의 게임 목록 항목 */
declare const RobloxGameSummarySchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    creator: z.ZodPipe<z.ZodObject<{
        id: z.ZodNumber;
        type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodTransform<({
        type: "User";
        id: RobloxUserId;
    } & Omit<{
        name?: string | null | undefined;
    }, "type" | "id">) | ({
        type: "Group";
        id: RobloxGroupId;
    } & Omit<{
        name?: string | null | undefined;
    }, "type" | "id">) | ({
        type: "Unknown";
        id: number;
        rawType: string | number;
    } & Omit<{
        name?: string | null | undefined;
    }, "type" | "id">), {
        id: number;
        type: string | number;
        name?: string | null | undefined;
    }>>;
    rootPlace: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    created: z.ZodString;
    updated: z.ZodString;
    placeVisits: z.ZodNumber;
}, z.core.$strip>;
/** `GameFavoriteResponseModel` — 즐겨찾기 목록 항목 */
declare const RobloxFavoriteGameSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    creator: z.ZodPipe<z.ZodObject<{
        id: z.ZodNumber;
        type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodTransform<({
        type: "User";
        id: RobloxUserId;
    } & Omit<{
        name?: string | null | undefined;
    }, "type" | "id">) | ({
        type: "Group";
        id: RobloxGroupId;
    } & Omit<{
        name?: string | null | undefined;
    }, "type" | "id">) | ({
        type: "Unknown";
        id: number;
        rawType: string | number;
    } & Omit<{
        name?: string | null | undefined;
    }, "type" | "id">), {
        id: number;
        type: string | number;
        name?: string | null | undefined;
    }>>;
    rootPlace: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    created: z.ZodString;
    updated: z.ZodString;
    placeVisits: z.ZodNumber;
    price: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
/** "Public" = 공개, "Friend" = 친구가 있는 서버 (인증 필요) */
declare const RobloxServerTypeSchema: z.ZodEnum<{
    Public: "Public";
    Friend: "Friend";
}>;
type RobloxServerType = z.infer<typeof RobloxServerTypeSchema>;
/**
 * `GameServerResponse` — 서버 목록 항목. 엔드포인트마다 필드가 조금씩 달라 공통 부분만 남겼다.
 * `playerTokens`는 인증된 요청에서만 채워진다 (아바타 헤드샷의 token 대상으로 쓴다).
 */
declare const RobloxServerSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">;
    maxPlayers: z.ZodNumber;
    playing: z.ZodNumber;
    playerTokens: z.ZodArray<z.ZodString>;
    fps: z.ZodNumber;
    ping: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
type RobloxServer = z.infer<typeof RobloxServerSchema>;
declare const RobloxServerRawSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">;
    maxPlayers: z.ZodNumber;
    playing: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    playerTokens: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    fps: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    ping: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
declare const RobloxServerPageRawSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">;
        maxPlayers: z.ZodNumber;
        playing: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        playerTokens: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
        fps: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        ping: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `PrivateServersApi.GameServerResponse` — 실행 중이 아니면 id/playing/fps/ping이 없다 */
declare const RobloxPrivateServerSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">>>;
    maxPlayers: z.ZodNumber;
    playing: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    playerTokens: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    fps: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    ping: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    name: z.ZodString;
    vipServerId: z.core.$ZodBranded<z.ZodNumber, "RobloxPrivateServerId", "out">;
    accessCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    owner: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        name: z.ZodString;
        displayName: z.ZodString;
        hasVerifiedBadge: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/** `GetPrivateServerListResponse` */
declare const RobloxPrivateServerPageSchema: z.ZodObject<{
    gameJoinRestricted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">>>;
        maxPlayers: z.ZodNumber;
        playing: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        playerTokens: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
        fps: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        ping: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        name: z.ZodString;
        vipServerId: z.core.$ZodBranded<z.ZodNumber, "RobloxPrivateServerId", "out">;
        accessCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        owner: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            name: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `MyPrivateServersResponse` — 항목 모양은 문서화돼 있지 않다 */
declare const RobloxMyPrivateServerPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
/** `PrivateServerSubscriptionResponse` */
declare const RobloxPrivateServerSubscriptionSchema: z.ZodObject<{
    active: z.ZodBoolean;
    expired: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    expirationDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    canRenew: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    hasInsufficientFunds: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    hasRecurringProfile: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    hasPriceChanged: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    purchaseScheduleId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    totalDiscountAmountInRobux: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
}, z.core.$strip>;
/** `PrivateServerPermissionsResponse` */
declare const RobloxPrivateServerPermissionsSchema: z.ZodObject<{
    clanAllowed: z.ZodBoolean;
    enemyClanId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">>>;
    friendsAllowed: z.ZodBoolean;
    users: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        name: z.ZodString;
        displayName: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `PrivateServerResponse` — GET/PATCH /v1/vip-servers/{id} */
declare const RobloxPrivateServerDetailSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxPrivateServerId", "out">;
    name: z.ZodString;
    game: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    joinCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    active: z.ZodBoolean;
    subscription: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        active: z.ZodBoolean;
        expired: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        expirationDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        canRenew: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        hasInsufficientFunds: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        hasRecurringProfile: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        hasPriceChanged: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        purchaseScheduleId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        totalDiscountAmountInRobux: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    }, z.core.$strip>>>;
    permissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        clanAllowed: z.ZodBoolean;
        enemyClanId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">>>;
        friendsAllowed: z.ZodBoolean;
        users: z.ZodArray<z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            name: z.ZodString;
            displayName: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
    link: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/** `CanInviteUserResponse` */
declare const RobloxPrivateServerInviteSchema: z.ZodObject<{
    canInvite: z.ZodBoolean;
    doesOwnerPrivacyRestrictJoins: z.ZodBoolean;
    inviteResponseType: z.ZodNumber;
}, z.core.$strip>;
/** 실측한 status 값. 2 = 접속 가능(joinScript 있음), 5 = 서버 없음, 12 = 거절, 22 = 대기열(꽉 참) */
declare const RobloxJoinStatus: {
    readonly Ready: 2;
    readonly NotFound: 5;
    readonly Rejected: 12;
    readonly Queued: 22;
};
declare const RobloxJoinResponseSchema: z.ZodObject<{
    jobId: z.ZodCatch<z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">>>>;
    status: z.ZodNumber;
    message: z.ZodNullable<z.ZodString>;
    queuePosition: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    joinScript: z.ZodNullable<z.ZodObject<{
        MachineAddress: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        DataCenterId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        UdmuxEndpoints: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            Address: z.ZodString;
            Port: z.ZodNumber;
        }, z.core.$strip>>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** 서버 공개 주소(UDMUX 프록시의 IPv4) */
declare const RobloxIpAddressSchema: z.core.$ZodBranded<z.ZodString, "RobloxIpAddress", "out">;
type RobloxIpAddress = z.infer<typeof RobloxIpAddressSchema>;
/** `getServerAddresses`에 넘기는 서버 하나. jobId는 place 안에서만 겹치지 않으므로 placeId와 함께 지정한다 */
type RobloxServerAddressTarget = {
    placeId: RobloxPlaceId;
    jobId: RobloxJobId;
};
/** 서버의 접속 주소. joinScript를 받지 못하면(꽉 참, 인증 없음 등) 주소 필드가 null이다. */
type RobloxServerAddress = {
    placeId: RobloxPlaceId;
    jobId: RobloxJobId;
    status: number;
    /** 공개 접속 주소 (UDMUX 프록시) */
    ip: RobloxIpAddress | null;
    port: number | null;
    /** 서버 내부 주소 */
    machineAddress: string | null;
    dataCenterId: number | null;
};
/**
 * IP → 위치 콜백. 결과는 `ips`와 같은 순서이고, 모르는 IP는 null(또는 undefined)이다.
 * 캐시에 없는 IP만 중복 없이 넘어온다. 한 번에 받을 수 없는 서비스라면 콜백 안에서 나눠 부른다.
 * 라이브러리는 돌려준 값을 해석하지 않고 서버에 그대로 붙인다 — 어떤 모양이든 되고,
 * 그 타입 `L`이 `getServers`/`findUsers`/`getServerLocations` 결과의 위치 타입이 된다.
 *
 * ```ts
 * // ip-api.com 묶음 조회 (100개씩)
 * const geolocate = async (ips: RobloxIpAddress[]) => {
 *     const res = await fetch("http://ip-api.com/batch?fields=status,countryCode,lat,lon", { method: "POST", body: JSON.stringify(ips) })
 *     const rows: { status: string, countryCode: string, lat: number, lon: number }[] = await res.json()
 *     return rows.map(r => r.status === "success" ? r : null)
 * }
 * ```
 */
type RobloxGeolocator<L = unknown> = (ips: RobloxIpAddress[]) => readonly (L | null | undefined)[] | Promise<readonly (L | null | undefined)[]>;
/** `getServerLocations` 결과의 항목. `location`은 콜백이 돌려준 값 그대로다 */
type RobloxServerLocation<L = unknown> = {
    ip: RobloxIpAddress;
    location: L;
};
/** `getPlaces` 결과 */
type RobloxPlace = {
    placeId: RobloxPlaceId;
    universeId: RobloxUniverseId;
    game: RobloxGame;
    votes: RobloxGameVotes | null;
    icon: RobloxThumbnail | null;
    thumbnails: RobloxThumbnail[];
};
/** `getServers` 결과의 항목. `L`은 `.geolocation(fn)` 콜백이 돌려주는 위치 타입 */
type RobloxServerInfo<L = unknown> = RobloxServer & {
    /** 플레이어 헤드샷. `players` 옵션이 false거나 토큰이 없으면 빈 배열 */
    players: RobloxThumbnail[];
    /** `address`/`location` 옵션을 켰을 때만 */
    address: RobloxServerAddress | null;
    location: L | null;
};
/** `findUsers` 결과의 항목. `L`은 `.geolocation(fn)` 콜백이 돌려주는 위치 타입 */
type RobloxUserServer<L = unknown> = {
    userId: RobloxUserId;
    /** 어떻게 찾았는지. 못 찾았으면 null */
    foundBy: "presence" | "headshot" | null;
    jobId: RobloxJobId | null;
    /** 서버 목록에서 본 서버. presence로 찾았으면 null */
    server: RobloxServer | null;
    /** `address`/`location` 옵션을 켰을 때만 */
    address: RobloxServerAddress | null;
    location: L | null;
};
type RobloxServerPageQuery = {
    serverType?: RobloxServerType;
    sortOrder?: RobloxSortOrder;
    excludeFullGames?: boolean;
    limit?: RobloxPageLimit;
    cursor?: RobloxCursor;
};
type RobloxGameListQuery = {
    /** 1 = 공개, 2 = 비공개, 4 = 전부 (스펙에 의미가 적혀 있지 않다) */
    accessFilter?: 1 | 2 | 4;
    limit?: RobloxPageLimit;
    cursor?: RobloxCursor;
    sortOrder?: RobloxSortOrder;
};
type RobloxRecommendationsQuery = {
    maxRows?: number;
    paginationKey?: string;
};
type RobloxPrivateServerPageQuery = {
    cursor?: RobloxCursor;
    excludeFriendServers?: boolean;
};
type RobloxMyPrivateServersQuery = {
    /** 0 = 내가 소유한 서버, 1 = 참가한 서버 (스펙에 의미가 적혀 있지 않다) */
    privateServersTab?: number;
    itemsPerPage?: number;
    cursor?: RobloxCursor;
};
type RobloxCreatePrivateServerRequest = {
    name: string;
    expectedPrice: number;
};
type RobloxUpdatePrivateServerRequest = {
    name?: string;
    newJoinCode?: boolean;
    active?: boolean;
};
type RobloxUpdatePrivateServerPermissionsRequest = {
    clanAllowed?: boolean;
    enemyClanId?: number;
    friendsAllowed?: boolean;
    usersToAdd?: RobloxUserId[];
    usersToRemove?: RobloxUserId[];
};
type RobloxUpdatePrivateServerSubscriptionRequest = {
    active: boolean;
    price?: number;
};
declare const RobloxGamesResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
        rootPlaceId: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        sourceName: z.ZodNullable<z.ZodString>;
        sourceDescription: z.ZodNullable<z.ZodString>;
        creator: z.ZodPipe<z.ZodObject<{
            id: z.ZodNumber;
            type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
            name: z.ZodString;
            isRNVAccount: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>, z.ZodTransform<({
            type: "User";
            id: RobloxUserId;
        } & Omit<{
            name: string;
            hasVerifiedBadge: boolean;
            isRNVAccount?: boolean | null | undefined;
        }, "type" | "id">) | ({
            type: "Group";
            id: RobloxGroupId;
        } & Omit<{
            name: string;
            hasVerifiedBadge: boolean;
            isRNVAccount?: boolean | null | undefined;
        }, "type" | "id">) | ({
            type: "Unknown";
            id: number;
            rawType: string | number;
        } & Omit<{
            name: string;
            hasVerifiedBadge: boolean;
            isRNVAccount?: boolean | null | undefined;
        }, "type" | "id">), {
            id: number;
            type: string | number;
            name: string;
            hasVerifiedBadge: boolean;
            isRNVAccount?: boolean | null | undefined;
        }>>;
        price: z.ZodNullable<z.ZodNumber>;
        allowedGearGenres: z.ZodArray<z.ZodString>;
        allowedGearCategories: z.ZodArray<z.ZodString>;
        isGenreEnforced: z.ZodBoolean;
        copyingAllowed: z.ZodBoolean;
        playing: z.ZodNumber;
        visits: z.ZodNumber;
        maxPlayers: z.ZodNumber;
        created: z.ZodString;
        updated: z.ZodString;
        studioAccessToApisAllowed: z.ZodBoolean;
        createVipServersAllowed: z.ZodBoolean;
        universeAvatarType: z.ZodString;
        genre: z.ZodString;
        genre_l1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        genre_l2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        untranslated_genre_l1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isAllGenre: z.ZodBoolean;
        isFavoritedByUser: z.ZodBoolean;
        favoritedCount: z.ZodNumber;
        canonicalUrlPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isContentRestricted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        licenseDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        refundLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        localizedFiatPrice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxGameProductsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        universeId: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
        isForSale: z.ZodBoolean;
        productId: z.ZodNullable<z.ZodNumber>;
        price: z.ZodNullable<z.ZodNumber>;
        sellerId: z.ZodNullable<z.ZodNumber>;
        fiatPurchaseData: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            localizedFiatPrice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            basePriceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxGameVotesResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
        upVotes: z.ZodNumber;
        downVotes: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxGameMediaResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        assetTypeId: z.ZodNumber;
        assetType: z.ZodString;
        imageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
        videoHash: z.ZodNullable<z.ZodString>;
        videoTitle: z.ZodNullable<z.ZodString>;
        approved: z.ZodBoolean;
        altText: z.ZodNullable<z.ZodString>;
        videoId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxGameSummaryPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        creator: z.ZodPipe<z.ZodObject<{
            id: z.ZodNumber;
            type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>, z.ZodTransform<({
            type: "User";
            id: RobloxUserId;
        } & Omit<{
            name?: string | null | undefined;
        }, "type" | "id">) | ({
            type: "Group";
            id: RobloxGroupId;
        } & Omit<{
            name?: string | null | undefined;
        }, "type" | "id">) | ({
            type: "Unknown";
            id: number;
            rawType: string | number;
        } & Omit<{
            name?: string | null | undefined;
        }, "type" | "id">), {
            id: number;
            type: string | number;
            name?: string | null | undefined;
        }>>;
        rootPlace: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>;
        created: z.ZodString;
        updated: z.ZodString;
        placeVisits: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxFavoriteGamePageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        creator: z.ZodPipe<z.ZodObject<{
            id: z.ZodNumber;
            type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>, z.ZodTransform<({
            type: "User";
            id: RobloxUserId;
        } & Omit<{
            name?: string | null | undefined;
        }, "type" | "id">) | ({
            type: "Group";
            id: RobloxGroupId;
        } & Omit<{
            name?: string | null | undefined;
        }, "type" | "id">) | ({
            type: "Unknown";
            id: number;
            rawType: string | number;
        } & Omit<{
            name?: string | null | undefined;
        }, "type" | "id">), {
            id: number;
            type: string | number;
            name?: string | null | undefined;
        }>>;
        rootPlace: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>;
        created: z.ZodString;
        updated: z.ZodString;
        placeVisits: z.ZodNumber;
        price: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type RobloxGameCreator = z.infer<typeof RobloxGameCreatorSchema>;
type RobloxGame = z.infer<typeof RobloxGameSchema>;
type RobloxPlaceDetails = z.infer<typeof RobloxPlaceDetailsSchema>;
type RobloxGameProduct = z.infer<typeof RobloxGameProductSchema>;
type RobloxGamePlayability = z.infer<typeof RobloxGamePlayabilitySchema>;
type RobloxGameVotes = z.infer<typeof RobloxGameVotesSchema>;
type RobloxUserGameVote = z.infer<typeof RobloxUserGameVoteSchema>;
type RobloxGameMedia = z.infer<typeof RobloxGameMediaSchema>;
type RobloxRecommendedGame = z.infer<typeof RobloxRecommendedGameSchema>;
type RobloxGameRecommendations = z.infer<typeof RobloxGameRecommendationsSchema>;
type RobloxGameSummary = z.infer<typeof RobloxGameSummarySchema>;
type RobloxFavoriteGame = z.infer<typeof RobloxFavoriteGameSchema>;
type RobloxGameSummaryPage = z.infer<typeof RobloxGameSummaryPageSchema>;
type RobloxFavoriteGamePage = z.infer<typeof RobloxFavoriteGamePageSchema>;
type RobloxPrivateServer = z.infer<typeof RobloxPrivateServerSchema>;
type RobloxPrivateServerPage = z.infer<typeof RobloxPrivateServerPageSchema>;
type RobloxMyPrivateServerPage = z.infer<typeof RobloxMyPrivateServerPageSchema>;
type RobloxPrivateServerDetail = z.infer<typeof RobloxPrivateServerDetailSchema>;
type RobloxPrivateServerSubscription = z.infer<typeof RobloxPrivateServerSubscriptionSchema>;
type RobloxPrivateServerPermissions = z.infer<typeof RobloxPrivateServerPermissionsSchema>;
type RobloxPrivateServerInvite = z.infer<typeof RobloxPrivateServerInviteSchema>;
type RobloxJoinResponse = z.infer<typeof RobloxJoinResponseSchema>;
type RobloxServerPage = {
    previousPageCursor: RobloxCursor | null;
    nextPageCursor: RobloxCursor | null;
    data: RobloxServer[];
};

/** `BadgeAwardStatisticsResponse` */
declare const RobloxBadgeStatisticsSchema: z.ZodObject<{
    pastDayAwardedCount: z.ZodNumber;
    awardedCount: z.ZodNumber;
    winRatePercentage: z.ZodNumber;
}, z.core.$strip>;
/** `BadgeResponse` — 배지 상세와 배지를 주는 게임 */
declare const RobloxBadgeSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxBadgeId", "out">;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    displayName: z.ZodString;
    displayDescription: z.ZodNullable<z.ZodString>;
    enabled: z.ZodBoolean;
    iconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
    displayIconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
    created: z.ZodString;
    updated: z.ZodString;
    statistics: z.ZodObject<{
        pastDayAwardedCount: z.ZodNumber;
        awardedCount: z.ZodNumber;
        winRatePercentage: z.ZodNumber;
    }, z.core.$strip>;
    awardingUniverse: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
        name: z.ZodString;
        rootPlaceId: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
    }, z.core.$strip>;
}, z.core.$strip>;
/** `GetBadgesByUserResponse` — 유저가 받은 배지. 게임 대신 만든 사람과 배지를 준 place가 온다 */
declare const RobloxUserBadgeSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxBadgeId", "out">;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    displayName: z.ZodString;
    displayDescription: z.ZodNullable<z.ZodString>;
    enabled: z.ZodBoolean;
    iconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
    displayIconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
    created: z.ZodString;
    updated: z.ZodString;
    statistics: z.ZodObject<{
        pastDayAwardedCount: z.ZodNumber;
        awardedCount: z.ZodNumber;
        winRatePercentage: z.ZodNumber;
    }, z.core.$strip>;
    creator: z.ZodPipe<z.ZodObject<{
        id: z.ZodNumber;
        type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodTransform<({
        type: "User";
        id: RobloxUserId;
    } & Omit<{
        name?: string | null | undefined;
    }, "type" | "id">) | ({
        type: "Group";
        id: RobloxGroupId;
    } & Omit<{
        name?: string | null | undefined;
    }, "type" | "id">) | ({
        type: "Unknown";
        id: number;
        rawType: string | number;
    } & Omit<{
        name?: string | null | undefined;
    }, "type" | "id">), {
        id: number;
        type: string | number;
        name?: string | null | undefined;
    }>>;
    awarder: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
/** `BadgeResponseV2` — 배지를 만든 결과 */
declare const RobloxCreatedBadgeSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxBadgeId", "out">;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    displayName: z.ZodString;
    displayDescription: z.ZodNullable<z.ZodString>;
    enabled: z.ZodBoolean;
    iconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
    displayIconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
    created: z.ZodString;
    updated: z.ZodString;
    statistics: z.ZodObject<{
        pastDayAwardedCount: z.ZodNumber;
        awardedCount: z.ZodNumber;
        winRatePercentage: z.ZodNumber;
    }, z.core.$strip>;
    awarder: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
/** `BadgeAwardResponse` */
declare const RobloxBadgeAwardSchema: z.ZodObject<{
    badgeId: z.core.$ZodBranded<z.ZodNumber, "RobloxBadgeId", "out">;
    awardedDate: z.ZodString;
}, z.core.$strip>;
/** `BadgeMetadataResponse` */
declare const RobloxBadgeMetadataSchema: z.ZodObject<{
    badgeCreationPrice: z.ZodNumber;
    maxBadgeNameLength: z.ZodNumber;
    maxBadgeDescriptionLength: z.ZodNumber;
    defaultBadgeIconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
}, z.core.$strip>;
declare const RobloxBadgePageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxBadgeId", "out">;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        displayName: z.ZodString;
        displayDescription: z.ZodNullable<z.ZodString>;
        enabled: z.ZodBoolean;
        iconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
        displayIconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
        created: z.ZodString;
        updated: z.ZodString;
        statistics: z.ZodObject<{
            pastDayAwardedCount: z.ZodNumber;
            awardedCount: z.ZodNumber;
            winRatePercentage: z.ZodNumber;
        }, z.core.$strip>;
        awardingUniverse: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">;
            name: z.ZodString;
            rootPlaceId: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxUserBadgePageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxBadgeId", "out">;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        displayName: z.ZodString;
        displayDescription: z.ZodNullable<z.ZodString>;
        enabled: z.ZodBoolean;
        iconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
        displayIconImageId: z.ZodCatch<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>;
        created: z.ZodString;
        updated: z.ZodString;
        statistics: z.ZodObject<{
            pastDayAwardedCount: z.ZodNumber;
            awardedCount: z.ZodNumber;
            winRatePercentage: z.ZodNumber;
        }, z.core.$strip>;
        creator: z.ZodPipe<z.ZodObject<{
            id: z.ZodNumber;
            type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>, z.ZodTransform<({
            type: "User";
            id: RobloxUserId;
        } & Omit<{
            name?: string | null | undefined;
        }, "type" | "id">) | ({
            type: "Group";
            id: RobloxGroupId;
        } & Omit<{
            name?: string | null | undefined;
        }, "type" | "id">) | ({
            type: "Unknown";
            id: number;
            rawType: string | number;
        } & Omit<{
            name?: string | null | undefined;
        }, "type" | "id">), {
            id: number;
            type: string | number;
            name?: string | null | undefined;
        }>>;
        awarder: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxBadgeAwardsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        badgeId: z.core.$ZodBranded<z.ZodNumber, "RobloxBadgeId", "out">;
        awardedDate: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
type RobloxBadgeStatistics = z.infer<typeof RobloxBadgeStatisticsSchema>;
type RobloxBadge = z.infer<typeof RobloxBadgeSchema>;
type RobloxUserBadge = z.infer<typeof RobloxUserBadgeSchema>;
type RobloxCreatedBadge = z.infer<typeof RobloxCreatedBadgeSchema>;
type RobloxBadgeAward = z.infer<typeof RobloxBadgeAwardSchema>;
type RobloxBadgeMetadata = z.infer<typeof RobloxBadgeMetadataSchema>;
/** 배지 하나를 받았는지. 받지 않았으면 `awardedDate`가 null이다 */
type RobloxBadgeAwardStatus = {
    badgeId: RobloxBadgeId;
    awardedDate: string | null;
};
type RobloxBadgePageQuery = {
    limit?: RobloxPageLimit;
    cursor?: RobloxCursor;
    sortOrder?: RobloxSortOrder;
};
type RobloxUniverseBadgesQuery = RobloxBadgePageQuery & {
    /** 기본은 Rank (게임에서 정한 순서) */
    sortBy?: "Rank" | "DateCreated";
};
type RobloxUpdateBadgeRequest = {
    name?: string;
    description?: string;
    enabled?: boolean;
};
type RobloxCreateBadgeRequest = {
    name: string;
    description?: string;
    /** 무료 한도(`getFreeQuotas`)를 넘으면 낼 돈. "User"는 내 Robux, "Group"은 게임을 가진 그룹의 Robux */
    paymentSource?: "User" | "Group";
    /** 낼 것으로 예상한 비용. 실제 비용(`getMetadata().badgeCreationPrice`, 무료면 0)과 다르면 400 code 18 */
    expectedCost?: number;
    /** 기본 true */
    isActive?: boolean;
    /** 배지 아이콘. 없으면 기본 아이콘으로 만든다 */
    icon?: Blob;
};

/** GET /v1/users/{userId}/friends — 한 번에 전부 (20회/분) */
declare const RobloxFriendListResponseSchema: z.ZodObject<{
    data: z.ZodPreprocess<z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/** GET /v1/users/{userId}/friends/find, /search — `CursoredPagedResult` (100회/분, 50개씩) */
declare const RobloxFriendPageRawSchema: z.ZodObject<{
    PreviousCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    PageItems: z.ZodPreprocess<z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        hasVerifiedBadge: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>;
    NextCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    HasMore: z.ZodNullable<z.ZodBoolean>;
}, z.core.$strip>;
/** 팔로워/팔로잉 목록 — 실제로는 id만 온다 */
declare const RobloxFollowPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodPreprocess<z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const RobloxCountResponseSchema: z.ZodObject<{
    count: z.ZodNumber;
}, z.core.$strip>;
/** `FriendStatusResponse` */
declare const RobloxFriendStatusSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    status: z.ZodString;
}, z.core.$strip>;
declare const RobloxFriendStatusesResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        status: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `UserPresenceResponseModel` — 온라인 친구 목록의 presence. 필드 이름이 대문자로 시작하는 것도 있다 */
declare const RobloxFriendPresenceSchema: z.ZodObject<{
    UserPresenceType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    UserLocationType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lastLocation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    placeId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>>;
    rootPlaceId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>>;
    gameInstanceId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">>>;
    universeId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>;
    lastOnline: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/** `UserPresenceResponse` — GET /v1/users/{me}/friends/online 의 항목 */
declare const RobloxOnlineFriendSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    displayName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sortScore: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    userPresence: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        UserPresenceType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        UserLocationType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        lastLocation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        placeId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>>;
        rootPlaceId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>>;
        gameInstanceId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">>>;
        universeId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>;
        lastOnline: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const RobloxOnlineFriendsResponseSchema: z.ZodObject<{
    data: z.ZodPreprocess<z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        displayName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sortScore: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        userPresence: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            UserPresenceType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            UserLocationType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            lastLocation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            placeId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>>;
            rootPlaceId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxPlaceId", "out">>>;
            gameInstanceId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodUUID, "RobloxJobId", "out">>>;
            universeId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>;
            lastOnline: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/** `FriendRequestResponse` — 받은 친구 요청 */
declare const RobloxFriendRequestSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    name: z.ZodString;
    displayName: z.ZodString;
    hasVerifiedBadge: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isBanned: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isUnseen: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    mutualFriendsList: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    friendRequest: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        sentAt: z.ZodString;
        senderId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        sourceUniverseId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>;
        originSourceType: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>;
        contactName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        senderNickname: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const RobloxFriendRequestPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        name: z.ZodString;
        displayName: z.ZodString;
        hasVerifiedBadge: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isBanned: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        isUnseen: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        mutualFriendsList: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
        friendRequest: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            sentAt: z.ZodString;
            senderId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            sourceUniverseId: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>;
            originSourceType: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>;
            contactName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            senderNickname: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `TrustedFriendRequestResponse` */
declare const RobloxTrustedFriendRequestPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        sentAt: z.ZodString;
        senderId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `FollowingExistsResponse` */
declare const RobloxFollowingStatusSchema: z.ZodObject<{
    userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    isFollowing: z.ZodBoolean;
    isFollowed: z.ZodBoolean;
}, z.core.$strip>;
declare const RobloxFollowingExistsResponseSchema: z.ZodObject<{
    followings: z.ZodArray<z.ZodObject<{
        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        isFollowing: z.ZodBoolean;
        isFollowed: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `FriendsPageMetadataResponse` */
declare const RobloxFriendsMetadataSchema: z.ZodObject<{
    isFriendsFilterBarEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isFriendsPageSortExperimentEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isFriendsUserDataStoreCacheEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    frequentFriendSortRollout: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    userName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    displayName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/** `CaptchaStatusResponseModel` — POST follow */
declare const RobloxCaptchaStatusSchema: z.ZodObject<{
    success: z.ZodBoolean;
    isCaptchaRequired: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    notificationMuted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
/** `getFriends` 결과 — 친구 목록에 users 정보를 채운 것 */
type RobloxUserFriends<U extends RobloxUser = RobloxUser> = {
    userId: RobloxUserId;
    friends: U[];
};
type RobloxFriendStatus = z.infer<typeof RobloxFriendStatusSchema>;
type RobloxOnlineFriend = z.infer<typeof RobloxOnlineFriendSchema>;
type RobloxFriendPresence = z.infer<typeof RobloxFriendPresenceSchema>;
type RobloxFriendRequest = z.infer<typeof RobloxFriendRequestSchema>;
type RobloxFriendRequestPage = z.infer<typeof RobloxFriendRequestPageSchema>;
type RobloxTrustedFriendRequestPage = z.infer<typeof RobloxTrustedFriendRequestPageSchema>;
type RobloxFollowPage = z.infer<typeof RobloxFollowPageSchema>;
type RobloxFollowingStatus = z.infer<typeof RobloxFollowingStatusSchema>;
type RobloxFriendsMetadata = z.infer<typeof RobloxFriendsMetadataSchema>;
type RobloxCaptchaStatus = z.infer<typeof RobloxCaptchaStatusSchema>;
type RobloxFriendPage = {
    previousPageCursor: RobloxCursor | null;
    nextPageCursor: RobloxCursor | null;
    data: {
        id: RobloxUserId;
        hasVerifiedBadge: boolean | null;
    }[];
};
type RobloxFollowPageQuery = {
    limit?: 10 | 18 | 25 | 50 | 100;
    cursor?: RobloxCursor;
    sortOrder?: RobloxSortOrder;
};
type RobloxFriendSearchQuery = {
    query: string;
    limit?: number;
    cursor?: RobloxCursor;
};
type RobloxFriendRequestsQuery = {
    limit?: number;
    cursor?: RobloxCursor;
    /** 0/1/2 — 스펙에 의미가 적혀 있지 않다 */
    friendRequestSort?: 0 | 1 | 2;
    uprankUnseen?: boolean;
};
/** POST follow에 캡차가 걸렸을 때 같이 보낸다 */
type RobloxCaptchaTokenRequest = {
    captchaId?: string;
    captchaToken?: string;
    captchaProvider?: string;
    challengeId?: string;
};

/** 그룹 역할(roleset) ID. 2^31을 넘는 값도 있다 */
declare const RobloxGroupRoleIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
/** 그룹 소셜 링크 ID */
declare const RobloxGroupSocialLinkIdSchema: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupSocialLinkId", "out">;
/** 그룹 차단 키워드 ID (UUID) */
declare const RobloxGroupKeywordIdSchema: z.core.$ZodBranded<z.ZodString, "RobloxGroupKeywordId", "out">;
/** 그룹 이벤트 ID (featured-content) */
declare const RobloxGroupEventIdSchema: z.core.$ZodBranded<z.ZodString, "RobloxGroupEventId", "out">;
type RobloxGroupRoleId = z.infer<typeof RobloxGroupRoleIdSchema>;
type RobloxGroupSocialLinkId = z.infer<typeof RobloxGroupSocialLinkIdSchema>;
type RobloxGroupKeywordId = z.infer<typeof RobloxGroupKeywordIdSchema>;
type RobloxGroupEventId = z.infer<typeof RobloxGroupEventIdSchema>;
type RobloxGroupRelationshipType = "Allies" | "Enemies";
/** `UserModel` */
declare const RobloxGroupUserSchema: z.ZodObject<{
    userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    username: z.ZodString;
    displayName: z.ZodString;
    hasVerifiedBadge: z.ZodBoolean;
}, z.core.$strip>;
/** `GroupRoleResponse` — 역할. 엔드포인트에 따라 빠지는 필드가 있다 */
declare const RobloxGroupRoleSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
    name: z.ZodString;
    rank: z.ZodNumber;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
/** `UserGroupRoleResponse` — 유저와 그 유저의 역할 */
declare const RobloxGroupMemberSchema: z.ZodObject<{
    user: z.ZodObject<{
        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        username: z.ZodString;
        displayName: z.ZodString;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>;
    role: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
        name: z.ZodString;
        rank: z.ZodNumber;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>;
}, z.core.$strip>;
/** `ShoutResponse` */
declare const RobloxGroupShoutSchema: z.ZodObject<{
    body: z.ZodString;
    poster: z.ZodNullable<z.ZodObject<{
        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        username: z.ZodString;
        displayName: z.ZodString;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>>;
    created: z.ZodString;
    updated: z.ZodString;
}, z.core.$strip>;
/** `CommunityTierInfoResponse` */
declare const RobloxCommunityTierSchema: z.ZodObject<{
    groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    currentTier: z.ZodNullable<z.ZodNumber>;
    previousTier: z.ZodNullable<z.ZodNumber>;
    tierUpdatedTime: z.ZodNullable<z.ZodString>;
    lastEvaluatedTime: z.ZodNullable<z.ZodString>;
    requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        key: z.ZodNumber;
        satisfied: z.ZodBoolean;
    }, z.core.$strip>>>>;
    capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        isEligibleForUnrestrictedMessages: z.ZodBoolean;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/** `GroupDetailResponse` — GET /v1/groups/{groupId} */
declare const RobloxGroupDetailSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    name: z.ZodString;
    description: z.ZodString;
    owner: z.ZodNullable<z.ZodObject<{
        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        username: z.ZodString;
        displayName: z.ZodString;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>>;
    shout: z.ZodNullable<z.ZodObject<{
        body: z.ZodString;
        poster: z.ZodNullable<z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>>;
        created: z.ZodString;
        updated: z.ZodString;
    }, z.core.$strip>>;
    isBuildersClubOnly: z.ZodBoolean;
    publicEntryAllowed: z.ZodBoolean;
    isLocked: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isDeactivated: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    hasVerifiedBadge: z.ZodBoolean;
    hasSocialModules: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    communityTier: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        currentTier: z.ZodNullable<z.ZodNumber>;
        previousTier: z.ZodNullable<z.ZodNumber>;
        tierUpdatedTime: z.ZodNullable<z.ZodString>;
        lastEvaluatedTime: z.ZodNullable<z.ZodString>;
        requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            key: z.ZodNumber;
            satisfied: z.ZodBoolean;
        }, z.core.$strip>>>>;
        capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            isEligibleForUnrestrictedMessages: z.ZodBoolean;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    memberCount: z.ZodNumber;
}, z.core.$strip>;
/** 다른 응답 안에 들어 있는 `GroupDetailResponse`. 대표 그룹 등에서는 memberCount가 빠진다 */
declare const RobloxGroupDetailPartialSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    name: z.ZodString;
    description: z.ZodString;
    owner: z.ZodNullable<z.ZodObject<{
        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        username: z.ZodString;
        displayName: z.ZodString;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>>;
    shout: z.ZodNullable<z.ZodObject<{
        body: z.ZodString;
        poster: z.ZodNullable<z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>>;
        created: z.ZodString;
        updated: z.ZodString;
    }, z.core.$strip>>;
    isBuildersClubOnly: z.ZodBoolean;
    publicEntryAllowed: z.ZodBoolean;
    isLocked: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isDeactivated: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    hasVerifiedBadge: z.ZodBoolean;
    hasSocialModules: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    communityTier: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        currentTier: z.ZodNullable<z.ZodNumber>;
        previousTier: z.ZodNullable<z.ZodNumber>;
        tierUpdatedTime: z.ZodNullable<z.ZodString>;
        lastEvaluatedTime: z.ZodNullable<z.ZodString>;
        requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            key: z.ZodNumber;
            satisfied: z.ZodBoolean;
        }, z.core.$strip>>>>;
        capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            isEligibleForUnrestrictedMessages: z.ZodBoolean;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
/** `GroupResponseV2` — GET /v2/groups 의 항목 */
declare const RobloxGroupSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    name: z.ZodString;
    description: z.ZodString;
    owner: z.ZodNullable<z.ZodPipe<z.ZodObject<{
        id: z.ZodNumber;
        type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    }, z.core.$strip>, z.ZodTransform<({
        type: "User";
        id: RobloxUserId;
    } & Omit<Record<string, never>, "type" | "id">) | ({
        type: "Group";
        id: RobloxGroupId;
    } & Omit<Record<string, never>, "type" | "id">) | ({
        type: "Unknown";
        id: number;
        rawType: string | number;
    } & Omit<Record<string, never>, "type" | "id">), {
        id: number;
        type: string | number;
    }>>>;
    created: z.ZodString;
    hasVerifiedBadge: z.ZodBoolean;
}, z.core.$strip>;
declare const RobloxGroupsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        name: z.ZodString;
        description: z.ZodString;
        owner: z.ZodNullable<z.ZodPipe<z.ZodObject<{
            id: z.ZodNumber;
            type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        }, z.core.$strip>, z.ZodTransform<({
            type: "User";
            id: RobloxUserId;
        } & Omit<Record<string, never>, "type" | "id">) | ({
            type: "Group";
            id: RobloxGroupId;
        } & Omit<Record<string, never>, "type" | "id">) | ({
            type: "Unknown";
            id: number;
            rawType: string | number;
        } & Omit<Record<string, never>, "type" | "id">), {
            id: number;
            type: string | number;
        }>>>;
        created: z.ZodString;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupBasicResponse` */
declare const RobloxGroupBasicSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    name: z.ZodString;
    memberCount: z.ZodNumber;
    hasVerifiedBadge: z.ZodBoolean;
}, z.core.$strip>;
/** `GroupAllRolesResponse` — GET /v1/groups/{groupId}/roles */
declare const RobloxGroupRolesResponseSchema: z.ZodObject<{
    groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    roles: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
        name: z.ZodString;
        rank: z.ZodNumber;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupRoleDetailResponse` — GET /v1/roles 의 항목 */
declare const RobloxGroupRoleDetailSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
    name: z.ZodString;
    rank: z.ZodNumber;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
}, z.core.$strip>;
declare const RobloxGroupRoleDetailsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
        name: z.ZodString;
        rank: z.ZodNumber;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** GET /v1/users/{userId}/groups/roles 의 항목 */
declare const RobloxUserGroupRoleV1Schema: z.ZodObject<{
    group: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        name: z.ZodString;
        description: z.ZodString;
        owner: z.ZodNullable<z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>>;
        shout: z.ZodNullable<z.ZodObject<{
            body: z.ZodString;
            poster: z.ZodNullable<z.ZodObject<{
                userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                username: z.ZodString;
                displayName: z.ZodString;
                hasVerifiedBadge: z.ZodBoolean;
            }, z.core.$strip>>;
            created: z.ZodString;
            updated: z.ZodString;
        }, z.core.$strip>>;
        isBuildersClubOnly: z.ZodBoolean;
        publicEntryAllowed: z.ZodBoolean;
        isLocked: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        isDeactivated: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        hasVerifiedBadge: z.ZodBoolean;
        hasSocialModules: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        communityTier: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
            currentTier: z.ZodNullable<z.ZodNumber>;
            previousTier: z.ZodNullable<z.ZodNumber>;
            tierUpdatedTime: z.ZodNullable<z.ZodString>;
            lastEvaluatedTime: z.ZodNullable<z.ZodString>;
            requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                key: z.ZodNumber;
                satisfied: z.ZodBoolean;
            }, z.core.$strip>>>>;
            capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                isEligibleForUnrestrictedMessages: z.ZodBoolean;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>;
        memberCount: z.ZodNumber;
    }, z.core.$strip>;
    role: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
        name: z.ZodString;
        rank: z.ZodNumber;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>;
}, z.core.$strip>;
/** GET /v2/users/{userId}/groups/roles 의 항목 (`GroupMembershipResponse`) */
declare const RobloxUserGroupRoleV2Schema: z.ZodObject<{
    group: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        name: z.ZodString;
        memberCount: z.ZodNumber;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>;
    role: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
        name: z.ZodString;
        rank: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const RobloxUserGroupRolesV1ResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        group: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
            name: z.ZodString;
            description: z.ZodString;
            owner: z.ZodNullable<z.ZodObject<{
                userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                username: z.ZodString;
                displayName: z.ZodString;
                hasVerifiedBadge: z.ZodBoolean;
            }, z.core.$strip>>;
            shout: z.ZodNullable<z.ZodObject<{
                body: z.ZodString;
                poster: z.ZodNullable<z.ZodObject<{
                    userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                    username: z.ZodString;
                    displayName: z.ZodString;
                    hasVerifiedBadge: z.ZodBoolean;
                }, z.core.$strip>>;
                created: z.ZodString;
                updated: z.ZodString;
            }, z.core.$strip>>;
            isBuildersClubOnly: z.ZodBoolean;
            publicEntryAllowed: z.ZodBoolean;
            isLocked: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            isDeactivated: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            hasVerifiedBadge: z.ZodBoolean;
            hasSocialModules: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            communityTier: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
                currentTier: z.ZodNullable<z.ZodNumber>;
                previousTier: z.ZodNullable<z.ZodNumber>;
                tierUpdatedTime: z.ZodNullable<z.ZodString>;
                lastEvaluatedTime: z.ZodNullable<z.ZodString>;
                requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                    key: z.ZodNumber;
                    satisfied: z.ZodBoolean;
                }, z.core.$strip>>>>;
                capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    isEligibleForUnrestrictedMessages: z.ZodBoolean;
                }, z.core.$strip>>>;
            }, z.core.$strip>>>;
            memberCount: z.ZodNumber;
        }, z.core.$strip>;
        role: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
            name: z.ZodString;
            rank: z.ZodNumber;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxUserGroupRolesV2ResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        group: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
            name: z.ZodString;
            memberCount: z.ZodNumber;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>;
        role: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
            name: z.ZodString;
            rank: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** GET /v1/users/{userId}/groups/primary/role — 대표 그룹이 없으면 null */
declare const RobloxPrimaryGroupResponseSchema: z.ZodNullable<z.ZodObject<{
    group: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        name: z.ZodString;
        description: z.ZodString;
        owner: z.ZodNullable<z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>>;
        shout: z.ZodNullable<z.ZodObject<{
            body: z.ZodString;
            poster: z.ZodNullable<z.ZodObject<{
                userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                username: z.ZodString;
                displayName: z.ZodString;
                hasVerifiedBadge: z.ZodBoolean;
            }, z.core.$strip>>;
            created: z.ZodString;
            updated: z.ZodString;
        }, z.core.$strip>>;
        isBuildersClubOnly: z.ZodBoolean;
        publicEntryAllowed: z.ZodBoolean;
        isLocked: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        isDeactivated: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        hasVerifiedBadge: z.ZodBoolean;
        hasSocialModules: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        communityTier: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
            currentTier: z.ZodNullable<z.ZodNumber>;
            previousTier: z.ZodNullable<z.ZodNumber>;
            tierUpdatedTime: z.ZodNullable<z.ZodString>;
            lastEvaluatedTime: z.ZodNullable<z.ZodString>;
            requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                key: z.ZodNumber;
                satisfied: z.ZodBoolean;
            }, z.core.$strip>>>>;
            capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                isEligibleForUnrestrictedMessages: z.ZodBoolean;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>;
    role: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
        name: z.ZodString;
        rank: z.ZodNumber;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>;
}, z.core.$strip>>;
/** `GroupMembershipDetailResponse` */
declare const RobloxGroupMembershipDetailSchema: z.ZodObject<{
    group: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        name: z.ZodString;
        description: z.ZodString;
        owner: z.ZodNullable<z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>>;
        shout: z.ZodNullable<z.ZodObject<{
            body: z.ZodString;
            poster: z.ZodNullable<z.ZodObject<{
                userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                username: z.ZodString;
                displayName: z.ZodString;
                hasVerifiedBadge: z.ZodBoolean;
            }, z.core.$strip>>;
            created: z.ZodString;
            updated: z.ZodString;
        }, z.core.$strip>>;
        isBuildersClubOnly: z.ZodBoolean;
        publicEntryAllowed: z.ZodBoolean;
        isLocked: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        isDeactivated: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        hasVerifiedBadge: z.ZodBoolean;
        hasSocialModules: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        communityTier: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
            currentTier: z.ZodNullable<z.ZodNumber>;
            previousTier: z.ZodNullable<z.ZodNumber>;
            tierUpdatedTime: z.ZodNullable<z.ZodString>;
            lastEvaluatedTime: z.ZodNullable<z.ZodString>;
            requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                key: z.ZodNumber;
                satisfied: z.ZodBoolean;
            }, z.core.$strip>>>>;
            capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                isEligibleForUnrestrictedMessages: z.ZodBoolean;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>;
    role: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
        name: z.ZodString;
        rank: z.ZodNumber;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>;
    isPrimaryGroup: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
/** GET /v1/users/{userId}/friends/groups/roles — 친구마다 속한 그룹 */
declare const RobloxFriendsGroupsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        user: z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>;
        groups: z.ZodArray<z.ZodObject<{
            group: z.ZodObject<{
                id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
                name: z.ZodString;
                description: z.ZodString;
                owner: z.ZodNullable<z.ZodObject<{
                    userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                    username: z.ZodString;
                    displayName: z.ZodString;
                    hasVerifiedBadge: z.ZodBoolean;
                }, z.core.$strip>>;
                shout: z.ZodNullable<z.ZodObject<{
                    body: z.ZodString;
                    poster: z.ZodNullable<z.ZodObject<{
                        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                        username: z.ZodString;
                        displayName: z.ZodString;
                        hasVerifiedBadge: z.ZodBoolean;
                    }, z.core.$strip>>;
                    created: z.ZodString;
                    updated: z.ZodString;
                }, z.core.$strip>>;
                isBuildersClubOnly: z.ZodBoolean;
                publicEntryAllowed: z.ZodBoolean;
                isLocked: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                isDeactivated: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                hasVerifiedBadge: z.ZodBoolean;
                hasSocialModules: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                communityTier: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
                    currentTier: z.ZodNullable<z.ZodNumber>;
                    previousTier: z.ZodNullable<z.ZodNumber>;
                    tierUpdatedTime: z.ZodNullable<z.ZodString>;
                    lastEvaluatedTime: z.ZodNullable<z.ZodString>;
                    requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                        key: z.ZodNumber;
                        satisfied: z.ZodBoolean;
                    }, z.core.$strip>>>>;
                    capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                        isEligibleForUnrestrictedMessages: z.ZodBoolean;
                    }, z.core.$strip>>>;
                }, z.core.$strip>>>;
                memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            }, z.core.$strip>;
            role: z.ZodObject<{
                id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
                name: z.ZodString;
                rank: z.ZodNumber;
                description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>;
            isPrimaryGroup: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxGroupMemberPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        user: z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>;
        role: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
            name: z.ZodString;
            rank: z.ZodNumber;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxGroupUserPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        username: z.ZodString;
        displayName: z.ZodString;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupSearchResponseItem` */
declare const RobloxGroupSearchItemSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    name: z.ZodString;
    description: z.ZodString;
    memberCount: z.ZodNumber;
    previousName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    publicEntryAllowed: z.ZodBoolean;
    created: z.ZodString;
    updated: z.ZodString;
    hasVerifiedBadge: z.ZodBoolean;
}, z.core.$strip>;
/** `GroupSearchPageResponse` — totalResults는 1000에서 멈춘다 */
declare const RobloxGroupSearchPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        name: z.ZodString;
        description: z.ZodString;
        memberCount: z.ZodNumber;
        previousName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        publicEntryAllowed: z.ZodBoolean;
        created: z.ZodString;
        updated: z.ZodString;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>>;
    keyword: z.ZodString;
    totalResults: z.ZodNumber;
}, z.core.$strip>;
declare const RobloxGroupLookupResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        name: z.ZodString;
        memberCount: z.ZodNumber;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxGroupNameHistoryPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        created: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupRelationshipsResponse` — StartRowIndex/MaxRows로 넘긴다 */
declare const RobloxGroupRelationshipsSchema: z.ZodObject<{
    groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    relationshipType: z.ZodString;
    totalGroupCount: z.ZodNumber;
    relatedGroups: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        name: z.ZodString;
        description: z.ZodString;
        owner: z.ZodNullable<z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>>;
        shout: z.ZodNullable<z.ZodObject<{
            body: z.ZodString;
            poster: z.ZodNullable<z.ZodObject<{
                userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                username: z.ZodString;
                displayName: z.ZodString;
                hasVerifiedBadge: z.ZodBoolean;
            }, z.core.$strip>>;
            created: z.ZodString;
            updated: z.ZodString;
        }, z.core.$strip>>;
        isBuildersClubOnly: z.ZodBoolean;
        publicEntryAllowed: z.ZodBoolean;
        isLocked: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        isDeactivated: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        hasVerifiedBadge: z.ZodBoolean;
        hasSocialModules: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        communityTier: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
            currentTier: z.ZodNullable<z.ZodNumber>;
            previousTier: z.ZodNullable<z.ZodNumber>;
            tierUpdatedTime: z.ZodNullable<z.ZodString>;
            lastEvaluatedTime: z.ZodNullable<z.ZodString>;
            requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                key: z.ZodNumber;
                satisfied: z.ZodBoolean;
            }, z.core.$strip>>>>;
            capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                isEligibleForUnrestrictedMessages: z.ZodBoolean;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>>;
    nextRowIndex: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
/** `GroupPermissionsModel` */
declare const RobloxGroupPermissionsSchema: z.ZodObject<{
    groupPostsPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        viewStatus: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        postToStatus: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>;
    groupForumsPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        viewForums: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        manageCategories: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        createPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        removePosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        lockPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        pinPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        createComments: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        removeComments: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        createBugReports: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>;
    groupContentModerationPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        manageKeywordBlockList: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        viewKeywordBlockList: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>;
    groupMembershipPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        changeRank: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        inviteMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        removeMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        banMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>;
    groupManagementPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        manageRelationships: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        manageClan: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        viewAuditLogs: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        bypassSlowmode: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        viewCommunityAnalytics: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>;
    groupEconomyPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        spendGroupFunds: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        advertiseGroup: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        createItems: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        manageItems: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        addGroupPlaces: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        manageGroupGames: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        viewGroupPayouts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        viewAnalytics: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>;
    groupOpenCloudPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        useCloudAuthentication: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        administerCloudAuthentication: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/** `GroupPermissionsResponse` — 역할 하나의 권한 */
declare const RobloxGroupRolePermissionsSchema: z.ZodObject<{
    groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    role: z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
        name: z.ZodString;
        rank: z.ZodNumber;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>;
    permissions: z.ZodObject<{
        groupPostsPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            viewStatus: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            postToStatus: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupForumsPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            viewForums: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            manageCategories: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            createPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            removePosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            lockPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            pinPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            createComments: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            removeComments: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            createBugReports: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupContentModerationPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            manageKeywordBlockList: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewKeywordBlockList: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupMembershipPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            changeRank: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            inviteMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            removeMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            banMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupManagementPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            manageRelationships: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            manageClan: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewAuditLogs: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            bypassSlowmode: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewCommunityAnalytics: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupEconomyPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            spendGroupFunds: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            advertiseGroup: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            createItems: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            manageItems: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            addGroupPlaces: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            manageGroupGames: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewGroupPayouts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewAnalytics: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupOpenCloudPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            useCloudAuthentication: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            administerCloudAuthentication: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const RobloxGroupRolePermissionsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        role: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
            name: z.ZodString;
            rank: z.ZodNumber;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>;
        permissions: z.ZodObject<{
            groupPostsPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                viewStatus: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                postToStatus: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>>>;
            groupForumsPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                viewForums: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                manageCategories: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                createPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                removePosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                lockPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                pinPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                createComments: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                removeComments: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                createBugReports: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>>>;
            groupContentModerationPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                manageKeywordBlockList: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                viewKeywordBlockList: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>>>;
            groupMembershipPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                changeRank: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                inviteMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                removeMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                banMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>>>;
            groupManagementPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                manageRelationships: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                manageClan: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                viewAuditLogs: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                bypassSlowmode: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                viewCommunityAnalytics: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>>>;
            groupEconomyPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                spendGroupFunds: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                advertiseGroup: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                createItems: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                manageItems: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                addGroupPlaces: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                manageGroupGames: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                viewGroupPayouts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                viewAnalytics: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>>>;
            groupOpenCloudPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                useCloudAuthentication: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                administerCloudAuthentication: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>>>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupNotificationPreferenceData` — type은 "AnnouncementCreatedNotification" 같은 문자열 */
declare const RobloxGroupNotificationPreferenceSchema: z.ZodObject<{
    type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    enabled: z.ZodBoolean;
    name: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
/** `GroupMembershipMetadataResponse` — 요청 계정 기준의 그룹 관계와 권한 */
declare const RobloxGroupMembershipSchema: z.ZodObject<{
    groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    isPrimary: z.ZodBoolean;
    isPendingJoin: z.ZodBoolean;
    userRole: z.ZodNullable<z.ZodObject<{
        user: z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>;
        role: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
            name: z.ZodString;
            rank: z.ZodNumber;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    permissions: z.ZodObject<{
        groupPostsPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            viewStatus: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            postToStatus: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupForumsPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            viewForums: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            manageCategories: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            createPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            removePosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            lockPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            pinPosts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            createComments: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            removeComments: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            createBugReports: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupContentModerationPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            manageKeywordBlockList: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewKeywordBlockList: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupMembershipPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            changeRank: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            inviteMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            removeMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            banMembers: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupManagementPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            manageRelationships: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            manageClan: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewAuditLogs: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            bypassSlowmode: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewCommunityAnalytics: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupEconomyPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            spendGroupFunds: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            advertiseGroup: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            createItems: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            manageItems: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            addGroupPlaces: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            manageGroupGames: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewGroupPayouts: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            viewAnalytics: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
        groupOpenCloudPermissions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            useCloudAuthentication: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            administerCloudAuthentication: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
    channelPermissions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        channelId: z.ZodString;
    }, z.core.$loose>>>>;
    areGroupGamesVisible: z.ZodBoolean;
    areGroupFundsVisible: z.ZodBoolean;
    areEnemiesAllowed: z.ZodBoolean;
    canConfigure: z.ZodBoolean;
    isNotificationsEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    notificationPreferences: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        enabled: z.ZodBoolean;
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>>>>;
    isBannedFromGroup: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    canViewMemberList: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isOwner: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
/** `GroupPoliciesResponse` */
declare const RobloxGroupPoliciesResponseSchema: z.ZodObject<{
    groups: z.ZodArray<z.ZodObject<{
        groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        canViewGroup: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GetSocialLinkResponse` */
declare const RobloxGroupSocialLinkSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupSocialLinkId", "out">;
    type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
    url: z.ZodString;
    title: z.ZodString;
}, z.core.$strip>;
declare const RobloxGroupSocialLinksResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupSocialLinkId", "out">;
        type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        url: z.ZodString;
        title: z.ZodString;
    }, z.core.$strip>>;
    socialLinksVerificationStatus: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>;
}, z.core.$strip>;
/** `GetGroupEmoteSetsResponse` */
declare const RobloxGroupEmoteSetsResponseSchema: z.ZodObject<{
    emoteSets: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        emotes: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GetCommunityFeatureFreezesResponse` */
declare const RobloxGroupFeatureFreezesResponseSchema: z.ZodObject<{
    features: z.ZodArray<z.ZodObject<{
        feature: z.ZodString;
        isDisabled: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupFeaturedContentResponse` — 없으면 null */
declare const RobloxGroupFeaturedEventSchema: z.ZodObject<{
    groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    contentType: z.ZodString;
    contentId: z.core.$ZodBranded<z.ZodString, "RobloxGroupEventId", "out">;
}, z.core.$strip>;
/** `GroupsDisplayOptionsResponse` — GET /v1/groups/metadata */
declare const RobloxGroupsMetadataSchema: z.ZodObject<{
    groupLimit: z.ZodNumber;
    currentGroupCount: z.ZodNumber;
    groupStatusMaxLength: z.ZodNumber;
    areProfileGroupsHidden: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isGroupDetailsPolicyEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    showPreviousGroupNames: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    areGroupBansEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    canEnableGroupNotifications: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
/** `GroupConfigurationDisplayOptionsResponse` — GET /v1/groups/configuration/metadata */
declare const RobloxGroupConfigurationMetadataSchema: z.ZodObject<{
    groupConfiguration: z.ZodObject<{
        nameMaxLength: z.ZodNumber;
        descriptionMaxLength: z.ZodNumber;
        iconMaxFileSizeMb: z.ZodNumber;
        coverPhotoMaxFileSizeMb: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        validCoverPhotoDimensions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        cost: z.ZodNumber;
    }, z.core.$loose>;
    recurringPayoutsConfiguration: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        maxPayoutPartners: z.ZodNumber;
    }, z.core.$strip>>>;
    roleConfiguration: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        nameMaxLength: z.ZodNumber;
        descriptionMaxLength: z.ZodNumber;
        limit: z.ZodNumber;
        cost: z.ZodNumber;
        minRank: z.ZodNumber;
        maxRank: z.ZodNumber;
    }, z.core.$strip>>>;
    groupNameChangeConfiguration: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        cost: z.ZodNumber;
        cooldownInDays: z.ZodNumber;
        ownershipCooldownInDays: z.ZodNumber;
    }, z.core.$strip>>>;
    isPremiumPayoutsEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isDefaultEmblemPolicyEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
/** `GroupSearchMetadataResponse` */
declare const RobloxGroupSearchMetadataSchema: z.ZodObject<{
    SuggestedGroupKeywords: z.ZodArray<z.ZodString>;
    ShowFriendsGroupsSort: z.ZodBoolean;
}, z.core.$strip>;
/** `GroupJoinRequestResponse` */
declare const RobloxGroupJoinRequestSchema: z.ZodObject<{
    requester: z.ZodObject<{
        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        username: z.ZodString;
        displayName: z.ZodString;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>;
    created: z.ZodString;
}, z.core.$strip>;
declare const RobloxGroupJoinRequestPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        requester: z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>;
        created: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupBanMemberResponse` */
declare const RobloxGroupBanSchema: z.ZodObject<{
    user: z.ZodObject<{
        userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        username: z.ZodString;
        displayName: z.ZodString;
        hasVerifiedBadge: z.ZodBoolean;
    }, z.core.$strip>;
    actingUser: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        user: z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>;
        role: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
            name: z.ZodString;
            rank: z.ZodNumber;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
    created: z.ZodString;
}, z.core.$strip>;
declare const RobloxGroupBanPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        user: z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>;
        actingUser: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            user: z.ZodObject<{
                userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                username: z.ZodString;
                displayName: z.ZodString;
                hasVerifiedBadge: z.ZodBoolean;
            }, z.core.$strip>;
            role: z.ZodObject<{
                id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
                name: z.ZodString;
                rank: z.ZodNumber;
                description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>;
        }, z.core.$strip>>>;
        created: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupAuditLogResponseItem` — description은 actionType마다 모양이 다르다 */
declare const RobloxGroupAuditLogItemSchema: z.ZodObject<{
    actor: z.ZodObject<{
        user: z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>;
        role: z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
            name: z.ZodString;
            rank: z.ZodNumber;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    actionType: z.ZodString;
    description: z.ZodUnknown;
    created: z.ZodString;
}, z.core.$strip>;
declare const RobloxGroupAuditLogPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        actor: z.ZodObject<{
            user: z.ZodObject<{
                userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
                username: z.ZodString;
                displayName: z.ZodString;
                hasVerifiedBadge: z.ZodBoolean;
            }, z.core.$strip>;
            role: z.ZodObject<{
                id: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupRoleId", "out">;
                name: z.ZodString;
                rank: z.ZodNumber;
                description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                memberCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                isBase: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
                color: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                isPrivate: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            }, z.core.$strip>;
        }, z.core.$strip>;
        actionType: z.ZodString;
        description: z.ZodUnknown;
        created: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupSettingsResponse` — enum 값은 문자열로 올 수 있다 */
declare const RobloxGroupSettingsSchema: z.ZodObject<{
    isApprovalRequired: z.ZodBoolean;
    isBuildersClubRequired: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    areEnemiesAllowed: z.ZodBoolean;
    areGroupFundsVisible: z.ZodBoolean;
    areGroupGamesVisible: z.ZodBoolean;
    isGroupNameChangeEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    verificationLevel: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>;
    accountTenureRequirement: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>;
    slowmode: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>;
    isMemberListVisibleToPublic: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isAutoAssignRoleDisabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    hasLegacyAutoAssignRole: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    communityTier: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        currentTier: z.ZodNullable<z.ZodNumber>;
        previousTier: z.ZodNullable<z.ZodNumber>;
        tierUpdatedTime: z.ZodNullable<z.ZodString>;
        lastEvaluatedTime: z.ZodNullable<z.ZodString>;
        requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            key: z.ZodNumber;
            satisfied: z.ZodBoolean;
        }, z.core.$strip>>>>;
        capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            isEligibleForUnrestrictedMessages: z.ZodBoolean;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/** `GroupConfigurationDetailsResponse` */
declare const RobloxGroupConfigurationSchema: z.ZodObject<{
    groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
    emblemId: z.ZodCatch<z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>>;
    coverPhotoId: z.ZodCatch<z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxAssetId", "out">>>>;
}, z.core.$strip>;
/** `GetGroupFeaturesResponse` */
declare const RobloxGroupFeaturesSchema: z.ZodObject<{
    isLocked: z.ZodBoolean;
    features: z.ZodArray<z.ZodObject<{
        feature: z.ZodString;
        isFeatureBlocked: z.ZodBoolean;
        expiration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupPayoutResponse` */
declare const RobloxGroupPayoutsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        user: z.ZodObject<{
            userId: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            username: z.ZodString;
            displayName: z.ZodString;
            hasVerifiedBadge: z.ZodBoolean;
        }, z.core.$strip>;
        percentage: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** `GroupPayoutRestrictionResponse` */
declare const RobloxGroupPayoutRestrictionSchema: z.ZodObject<{
    canUseRecurringPayout: z.ZodBoolean;
    canUseOneTimePayout: z.ZodBoolean;
}, z.core.$strip>;
/** `BlockedKeywordModel` */
declare const RobloxGroupKeywordSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodString, "RobloxGroupKeywordId", "out">;
    keyword: z.ZodString;
    createdBy: z.ZodNumber;
    isPrivate: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const RobloxGroupKeywordPageSchema: z.ZodObject<{
    previousPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    nextPageCursor: z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxCursor", "out">>;
    data: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxGroupKeywordId", "out">;
        keyword: z.ZodString;
        createdBy: z.ZodNumber;
        isPrivate: z.ZodBoolean;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
    totalActiveKeywordsCount: z.ZodNumber;
}, z.core.$strip>;
/** `CreateBlockedKeywordsResponse` */
declare const RobloxCreateGroupKeywordsResponseSchema: z.ZodObject<{
    createdKeywords: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxGroupKeywordId", "out">;
        keyword: z.ZodString;
        createdBy: z.ZodNumber;
        isPrivate: z.ZodBoolean;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
    hadModeratedKeywords: z.ZodBoolean;
    hadDuplicateKeywords: z.ZodBoolean;
}, z.core.$strip>;
/** `TierEvaluationResultResponse` */
declare const RobloxGroupTierEvaluationSchema: z.ZodObject<{
    tierInfo: z.ZodObject<{
        groupId: z.core.$ZodBranded<z.ZodNumber, "RobloxGroupId", "out">;
        currentTier: z.ZodNullable<z.ZodNumber>;
        previousTier: z.ZodNullable<z.ZodNumber>;
        tierUpdatedTime: z.ZodNullable<z.ZodString>;
        lastEvaluatedTime: z.ZodNullable<z.ZodString>;
        requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            key: z.ZodNumber;
            satisfied: z.ZodBoolean;
        }, z.core.$strip>>>>;
        capabilities: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            isEligibleForUnrestrictedMessages: z.ZodBoolean;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
    passedSignals: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    requirements: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        key: z.ZodNumber;
        satisfied: z.ZodBoolean;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type RobloxGroupUser = z.infer<typeof RobloxGroupUserSchema>;
type RobloxGroupRole = z.infer<typeof RobloxGroupRoleSchema>;
type RobloxGroupRoleDetail = z.infer<typeof RobloxGroupRoleDetailSchema>;
type RobloxGroupMember = z.infer<typeof RobloxGroupMemberSchema>;
type RobloxGroupShout = z.infer<typeof RobloxGroupShoutSchema>;
type RobloxCommunityTier = z.infer<typeof RobloxCommunityTierSchema>;
type RobloxGroupDetail = z.infer<typeof RobloxGroupDetailSchema>;
type RobloxGroupDetailPartial = z.infer<typeof RobloxGroupDetailPartialSchema>;
type RobloxGroup = z.infer<typeof RobloxGroupSchema>;
type RobloxGroupBasic = z.infer<typeof RobloxGroupBasicSchema>;
type RobloxGroupMembershipDetail = z.infer<typeof RobloxGroupMembershipDetailSchema>;
type RobloxGroupMemberPage = z.infer<typeof RobloxGroupMemberPageSchema>;
type RobloxGroupUserPage = z.infer<typeof RobloxGroupUserPageSchema>;
type RobloxGroupSearchItem = z.infer<typeof RobloxGroupSearchItemSchema>;
type RobloxGroupSearchPage = z.infer<typeof RobloxGroupSearchPageSchema>;
type RobloxGroupNameHistoryPage = z.infer<typeof RobloxGroupNameHistoryPageSchema>;
type RobloxGroupRelationships = z.infer<typeof RobloxGroupRelationshipsSchema>;
type RobloxGroupPermissions = z.infer<typeof RobloxGroupPermissionsSchema>;
type RobloxGroupRolePermissions = z.infer<typeof RobloxGroupRolePermissionsSchema>;
type RobloxGroupNotificationPreference = z.infer<typeof RobloxGroupNotificationPreferenceSchema>;
type RobloxGroupMembership = z.infer<typeof RobloxGroupMembershipSchema>;
type RobloxGroupSocialLink = z.infer<typeof RobloxGroupSocialLinkSchema>;
type RobloxGroupEmoteSet = z.infer<typeof RobloxGroupEmoteSetsResponseSchema>["emoteSets"][number];
type RobloxGroupFeatureFreeze = z.infer<typeof RobloxGroupFeatureFreezesResponseSchema>["features"][number];
type RobloxGroupFeaturedEvent = z.infer<typeof RobloxGroupFeaturedEventSchema>;
type RobloxGroupsMetadata = z.infer<typeof RobloxGroupsMetadataSchema>;
type RobloxGroupConfigurationMetadata = z.infer<typeof RobloxGroupConfigurationMetadataSchema>;
type RobloxGroupSearchMetadata = z.infer<typeof RobloxGroupSearchMetadataSchema>;
type RobloxGroupJoinRequest = z.infer<typeof RobloxGroupJoinRequestSchema>;
type RobloxGroupJoinRequestPage = z.infer<typeof RobloxGroupJoinRequestPageSchema>;
type RobloxGroupBan = z.infer<typeof RobloxGroupBanSchema>;
type RobloxGroupBanPage = z.infer<typeof RobloxGroupBanPageSchema>;
type RobloxGroupAuditLogItem = z.infer<typeof RobloxGroupAuditLogItemSchema>;
type RobloxGroupAuditLogPage = z.infer<typeof RobloxGroupAuditLogPageSchema>;
type RobloxGroupSettings = z.infer<typeof RobloxGroupSettingsSchema>;
type RobloxGroupConfiguration = z.infer<typeof RobloxGroupConfigurationSchema>;
type RobloxGroupFeatures = z.infer<typeof RobloxGroupFeaturesSchema>;
type RobloxGroupPayout = z.infer<typeof RobloxGroupPayoutsResponseSchema>["data"][number];
type RobloxGroupPayoutRestriction = z.infer<typeof RobloxGroupPayoutRestrictionSchema>;
type RobloxGroupKeyword = z.infer<typeof RobloxGroupKeywordSchema>;
type RobloxGroupKeywordPage = z.infer<typeof RobloxGroupKeywordPageSchema>;
type RobloxCreateGroupKeywordsResponse = z.infer<typeof RobloxCreateGroupKeywordsResponseSchema>;
type RobloxGroupTierEvaluation = z.infer<typeof RobloxGroupTierEvaluationSchema>;
/** `getUserGroups` 항목의 그룹 하나. v1과 v2 어느 쪽에서 받아도 같은 모양이다 */
type RobloxUserGroupRole = {
    group: RobloxGroupBasic;
    role: {
        id: RobloxGroupRoleId;
        name: string;
        rank: number;
    };
};
/** `getUserGroups` 결과 */
type RobloxUserGroups = {
    userId: RobloxUserId;
    groups: RobloxUserGroupRole[];
};
/** `getPrimaryGroups` 결과 */
type RobloxPrimaryGroup = {
    userId: RobloxUserId;
    group: RobloxGroupDetailPartial;
    role: RobloxGroupRole;
};
type RobloxGroupPageQuery = {
    limit?: RobloxPageLimit;
    cursor?: RobloxCursor;
    sortOrder?: RobloxSortOrder;
};
type RobloxGroupSearchQuery = {
    keyword: string;
    prioritizeExactMatch?: boolean;
    limit?: RobloxPageLimit;
    cursor?: RobloxCursor;
};
type RobloxGroupRelationshipsQuery = {
    /** 기본 0. 다음 페이지는 응답의 nextRowIndex */
    startRowIndex?: number;
    /** 기본 100 */
    maxRows?: number;
};
/** 감사 로그의 actionType (스펙의 enum) */
declare const RobloxGroupAuditActionTypes: readonly ["DeletePost", "RemoveMember", "AcceptJoinRequest", "DeclineJoinRequest", "PostStatus", "ChangeRank", "BuyAd", "SendAllyRequest", "CreateEnemy", "AcceptAllyRequest", "DeclineAllyRequest", "DeleteAlly", "DeleteEnemy", "AddGroupPlace", "RemoveGroupPlace", "CreateItems", "ConfigureItems", "SpendGroupFunds", "ChangeOwner", "Delete", "AdjustCurrencyAmounts", "Abandon", "Claim", "Rename", "ChangeDescription", "InviteToClan", "KickFromClan", "CancelClanInvite", "BuyClan", "CreateGroupAsset", "UpdateGroupAsset", "ConfigureGroupAsset", "RevertGroupAsset", "CreateGroupDeveloperProduct", "ConfigureGroupGame", "CreateGroupDeveloperSubscriptionProduct", "Lock", "Unlock", "CreateGamePass", "CreateBadge", "ConfigureBadge", "SavePlace", "PublishPlace", "UpdateRolesetRank", "UpdateRolesetData", "UpdateRoleSetPosition", "BanMember", "UnbanMember", "CreateForumCategory", "UpdateForumCategory", "ArchiveForumCategory", "DeleteForumCategory", "DeleteForumPost", "DeleteForumComment", "PinForumPost", "UnpinForumPost", "LockForumPost", "UnlockForumPost", "CreateRoleset", "DeleteRoleset", "CreateCommerceProduct", "SetCommerceProductActive", "ArchiveCommerceProduct", "AcceptCommerceProductBundlingFee", "SetCommerceProductInactive", "ConnectMerchant", "DisconnectMerchant", "JoinGroup", "LeaveGroup", "UpdateGroupIcon", "UpdateGroupCoverPhoto", "AssignRole", "UnassignRole", "PublishAnnouncement", "DeleteAnnouncement", "UpdateRoleSetPermissions", "UpdateGroupSecuritySettings", "GrantEnterpriseTier", "RevokeEnterpriseTier", "DeactivateGroup"];
type RobloxGroupAuditActionType = typeof RobloxGroupAuditActionTypes[number];
type RobloxGroupAuditLogQuery = RobloxGroupPageQuery & {
    actionType?: RobloxGroupAuditActionType;
    userId?: RobloxUserId;
};
/** POST /v1/groups/{groupId}/users — 캡차가 걸리면 같이 보낸다 */
type RobloxJoinGroupRequest = RobloxCaptchaTokenRequest & {
    sessionId?: string;
    redemptionToken?: string;
};
type RobloxUpdateGroupSettingsRequest = {
    isApprovalRequired?: boolean;
    areEnemiesAllowed?: boolean;
    areGroupFundsVisible?: boolean;
    areGroupGamesVisible?: boolean;
    /** 0~3 */
    verificationLevel?: number;
    /** 0~5 */
    accountTenureRequirement?: number;
    /** 0~3 */
    slowmode?: number;
    isMemberListVisibleToPublic?: boolean;
};
type RobloxCreateGroupRoleRequest = {
    name: string;
    description?: string;
    /** 1~254 */
    rank: number;
    /** 역할 생성 비용을 그룹 자금으로 낸다 */
    usingGroupFunds?: boolean;
    isPrivate?: boolean;
};
type RobloxUpdateGroupRoleRequest = {
    name?: string;
    description?: string;
    rank?: number;
    color?: number;
    isPrivate?: boolean;
};
/** 스펙은 0~8의 숫자지만 웹은 이름을 보낸다 */
type RobloxGroupSocialLinkType = "Facebook" | "Twitter" | "YouTube" | "Twitch" | "GooglePlus" | "Discord" | "RobloxGroup" | "Amazon" | "Guilded" | (string & {});
type RobloxGroupSocialLinkRequest = {
    type: RobloxGroupSocialLinkType;
    url: string;
    title: string;
};
type RobloxCreateGroupRequest = {
    name: string;
    description?: string;
    publicGroup?: boolean;
    buildersClubMembersOnly?: boolean;
    /** 그룹 아이콘 이미지 */
    icon: Blob;
};
/** 일회성 지급 — Robux를 정해진 만큼 */
type RobloxGroupPayoutRecipient = {
    userId: RobloxUserId;
    amount: number;
};
/** 정기 지급 — 수익의 퍼센트 */
type RobloxGroupRecurringPayoutRecipient = {
    userId: RobloxUserId;
    percentage: number;
};

/**
 * 요청 계정에 따라 결과가 달라지는 항목의 계정 구분. 쿠키는 원문 대신 해시가 들어간다.
 * 쿠키를 돌려 쓰는 중에는 관점을 정할 수 없어 이런 항목을 아예 캐시하지 않는다.
 */
type RobloxViewerKey = "extension" | "anonymous" | `cookie:${string}`;
/**
 * 캐시 항목 하나: 키(`[서비스, 메서드, ...인자]`)와 거기 저장되는 값.
 * 배열을 받는 메서드는 항목 하나씩 저장한다. 없는 대상(null)이나 곧 바뀔 상태(Pending 등)는 저장하지 않는다.
 */
type RobloxCacheEntry = {
    key: ["users", "getUserDetails", userId: RobloxUserId];
    value: RobloxUserDetail;
} | {
    key: ["users", "getUsers", userId: RobloxUserId, excludeBannedUsers: boolean];
    value: RobloxUser;
}
/** 이름은 소문자로 맞춘다 (대소문자를 가리지 않는 조회) */
 | {
    key: ["users", "getUsersByNames", username: string, excludeBannedUsers: boolean];
    value: RobloxUserByName;
} | {
    key: ["users", "getUsernameHistory", userId: RobloxUserId, query: RobloxUsernameHistoryQuery];
    value: RobloxUsernameHistoryResponse;
} | {
    key: ["thumbnails", "get", target: RobloxThumbnailTarget];
    value: RobloxThumbnail;
} | {
    key: ["thumbnails", "getGameThumbnails", universeId: RobloxUniverseId, query: RobloxUniverseThumbnailsQuery];
    value: RobloxUniverseThumbnails;
} | {
    key: ["presence", "get", viewer: RobloxViewerKey, userId: RobloxUserId];
    value: RobloxUserPresence;
} | {
    key: ["games", "getGames", universeId: RobloxUniverseId];
    value: RobloxGame;
} | {
    key: ["games", "getUniverseIds", placeId: RobloxPlaceId];
    value: RobloxUniverseId;
} | {
    key: ["games", "getPlaceDetails", viewer: RobloxViewerKey, placeId: RobloxPlaceId];
    value: RobloxPlaceDetails;
} | {
    key: ["games", "getProductInfo", universeId: RobloxUniverseId];
    value: RobloxGameProduct;
} | {
    key: ["games", "getPlayability", viewer: RobloxViewerKey, universeId: RobloxUniverseId];
    value: RobloxGamePlayability;
} | {
    key: ["games", "getVotes", universeId: RobloxUniverseId];
    value: RobloxGameVotes;
} | {
    key: ["games", "getFavoriteCounts", universeId: RobloxUniverseId];
    value: number;
} | {
    key: ["games", "getMedia", universeId: RobloxUniverseId, all: boolean];
    value: RobloxGameMedia[];
}
/** jobId는 place 안에서만 겹치지 않으므로 placeId와 함께 쓴다 */
 | {
    key: ["games", "getServerAddresses", placeId: RobloxPlaceId, jobId: RobloxJobId];
    value: RobloxServerAddress;
}
/** 값은 `.geolocation(fn)` 콜백이 돌려준 값 그대로다. 모양은 사용자가 정하므로 타입을 알 수 없다 */
 | {
    key: ["games", "getServerLocations", ip: RobloxIpAddress];
    value: unknown;
} | {
    key: ["friends", "getFriends", userId: RobloxUserId];
    value: RobloxUserId[];
} | {
    key: ["friends", "getFriendCounts", userId: RobloxUserId];
    value: number;
} | {
    key: ["friends", "getFollowerCounts", userId: RobloxUserId];
    value: number;
} | {
    key: ["friends", "getFollowingCounts", userId: RobloxUserId];
    value: number;
} | {
    key: ["groups", "getGroups", groupId: RobloxGroupId];
    value: RobloxGroup;
} | {
    key: ["groups", "getGroupDetails", groupId: RobloxGroupId];
    value: RobloxGroupDetail;
} | {
    key: ["groups", "getRoles", groupId: RobloxGroupId];
    value: RobloxGroupRole[];
} | {
    key: ["groups", "getRolesByIds", roleId: RobloxGroupRoleId];
    value: RobloxGroupRoleDetail;
} | {
    key: ["groups", "getUserGroups", userId: RobloxUserId];
    value: RobloxUserGroupRole[];
} | {
    key: ["badges", "getBadges", badgeId: RobloxBadgeId];
    value: RobloxBadge;
} | {
    key: ["badges", "getAwardedDates", userId: RobloxUserId, badgeId: RobloxBadgeId];
    value: string;
};
/** 캐시 키. `key[0]`(서비스), `key[1]`(메서드)로 switch하면 나머지 원소의 타입이 좁혀진다. */
type RobloxCacheKey = RobloxCacheEntry["key"];
/** `"서비스.메서드"` → 저장되는 값 */
type RobloxCacheValues = {
    [E in RobloxCacheEntry as `${E["key"][0]}.${E["key"][1]}`]: E["value"];
};
/** 키에 저장되는 값의 타입 */
type RobloxCacheValue<K extends RobloxCacheKey> = K extends RobloxCacheKey ? `${K[0]}.${K[1]}` extends infer P extends keyof RobloxCacheValues ? RobloxCacheValues[P] : never : never;
/**
 * `.cache(store)`에 넣는 저장소. 없는 키는 `undefined`를 돌려준다.
 * 키는 튜플이라 그대로는 Map 키로 쓸 수 없다 — 문자열이 필요하면 `robloxCacheKeyString(key)`를 쓴다.
 * TTL이 0인 메서드도 get/set이 그대로 불린다. 0을 "저장하지 않음"으로 볼지 "만료 없음" 등으로 볼지는 저장소가 정한다.
 *
 * ```ts
 * get(key) {
 *     switch (key[0]) {
 *         case "presence": return redis.get(`presence:${key[2]}:${key[3]}`)   // key[2]: RobloxViewerKey
 *         case "games":    return key[1] === "getServerLocations" ? geoTable.get(key[2]) : memory.get(robloxCacheKeyString(key))
 *         default:         return memory.get(robloxCacheKeyString(key))
 *     }
 * }
 * ```
 */
interface RobloxCacheStore {
    get<K extends RobloxCacheKey>(key: K): RobloxCacheValue<K> | undefined | Promise<RobloxCacheValue<K> | undefined>;
    set<K extends RobloxCacheKey>(key: K, value: RobloxCacheValue<K>, ttl: number): void | Promise<void>;
}
/** 키를 안정적인 문자열로. 객체 인자는 키 순서를 정렬해 같은 값이면 같은 문자열이 나온다. */
declare function robloxCacheKeyString(key: RobloxCacheKey): string;
/** 프로세스 메모리에 두는 기본 구현. 기본값으로 쓰이지 않으므로 직접 넣어야 한다. */
declare class RobloxMemoryCache implements RobloxCacheStore {
    private readonly sweepInterval;
    private entries;
    private lastSweep;
    /** @param sweepInterval 만료된 항목을 한꺼번에 지우는 간격(ms). 저장할 때 확인한다. 기본 1분 */
    constructor(sweepInterval?: number);
    private sweep;
    get<K extends RobloxCacheKey>(key: K): RobloxCacheValue<K> | undefined;
    /** TTL이 0 이하면 저장하지 않는다 */
    set<K extends RobloxCacheKey>(key: K, value: RobloxCacheValue<K>, ttl: number): void;
}

/** `.ROBLOSECURITY` 쿠키 값. 문자열이면 `RobloxCookieSchema.parse(value)`로 바꿔 넣는다 */
declare const RobloxCookieSchema: z.core.$ZodBranded<z.ZodString, "RobloxCookie", "out">;
type RobloxCookie = z.infer<typeof RobloxCookieSchema>;
/**
 * `.cookies(store)`에 넣는 쿠키 풀. 요청마다 `next()`로 하나를 받는다.
 * 서버리스(Vercel 등)처럼 프로세스가 자주 새로 뜨는 곳에서는 Redis 같은 외부 저장소로 구현해
 * 로테이션과 쿠키 목록을 인스턴스끼리 공유한다.
 *
 * ```ts
 * const store: RobloxCookieStore = {
 *     // 리스트를 원자적으로 돌리면 모든 인스턴스가 하나의 로테이션을 쓴다
 *     next: async () => (await redis.lmove("cookies", "cookies", "LEFT", "RIGHT")) as RobloxCookie | null,
 *     remove: async cookie => { await redis.lrem("cookies", 0, cookie) },
 * }
 * ```
 */
interface RobloxCookieStore {
    /** 이번 요청에 쓸 쿠키. null이면 쿠키 없이 보낸다 */
    next(): RobloxCookie | null | Promise<RobloxCookie | null>;
    /** Roblox가 거부한 쿠키를 뺀다. 기본 거부 처리이고, `.onCookieRejected()`로 덮어쓰면 불리지 않는다 */
    remove?(cookie: RobloxCookie): void | Promise<void>;
}
/**
 * 쿠키를 거부한 이유.
 * - `"unauthorized"`: 401. 만료됐거나 로그아웃된 쿠키다.
 * - `"moderated"`: 403 "User is moderated". 계정이 정지됐다. 기간 정지면 풀리고 나서 다시 쓸 수 있다.
 */
type RobloxCookieRejectReason = "unauthorized" | "moderated";
/** Roblox가 쿠키를 거부했을 때 불린다. 지정하면 기본 처리(`store.remove`)를 대신한다 */
type RobloxCookieRejectedHandler = (cookie: RobloxCookie, reason: RobloxCookieRejectReason) => void | Promise<void>;
/** 프로세스 메모리에 두는 라운드 로빈 풀. `.cookies(list)`에 배열을 넣으면 이걸로 감싼다. 변경은 바로 다음 요청부터 반영된다. */
declare class RobloxMemoryCookies implements RobloxCookieStore {
    private cookies;
    private index;
    constructor(cookies?: readonly RobloxCookie[]);
    list(): readonly RobloxCookie[];
    has(cookie: RobloxCookie): boolean;
    add(...cookies: RobloxCookie[]): void;
    remove(...cookies: RobloxCookie[]): void;
    replace(cookies: readonly RobloxCookie[]): void;
    /** 라운드 로빈으로 다음 쿠키를 고른다. 비어 있으면 `null`. */
    next(): RobloxCookie | null;
}

/** 저장소와 주고받는 버킷 상태. `resetAt`은 epoch ms라 탭이나 인스턴스가 달라도 같은 기준으로 비교한다. */
type RobloxRateLimitState = {
    /** 이 창(window)에 남은 요청 수 */
    remaining: number;
    /** 창이 리셋되는 시각(epoch ms) */
    resetAt: number;
    /** 최근 연속 429 횟수 */
    strikes: number;
};
/**
 * `.rateLimits(store)`에 넣는 저장소. 레이트리밋은 저장소 없이도 프로세스 안에서 돌아가고,
 * 저장소는 그 상태를 밖(chrome.storage, Redis 등)과 동기화하는 데만 쓴다 — 새로고침한 content script나
 * 다시 뜬 서비스 워커, 같은 IP를 쓰는 다른 탭이 이미 알고 있는 한도를 이어받는다.
 *
 * - `get`은 버킷을 처음 쓸 때와 창이 지나 상태를 모르게 됐을 때 부른다. 그동안 그 버킷의 요청은 기다린다.
 * - `set`은 응답으로 상태가 바뀔 때마다 기다리지 않고 부른다. 실패는 무시한다.
 * - `watch`가 있으면 다른 곳에서 바뀐 상태를 바로 받는다. 자기가 쓴 값이 되돌아와도 괜찮다.
 *
 * 원자적이지 않으므로 여러 곳이 동시에 탐색하면 한도를 조금 넘을 수 있다. 그때는 429가 다시 막는다.
 */
interface RobloxRateLimitStore {
    get(bucket: string): RobloxRateLimitState | undefined | Promise<RobloxRateLimitState | undefined>;
    set(bucket: string, state: RobloxRateLimitState): void | Promise<void>;
    watch?(listener: (bucket: string, state: RobloxRateLimitState) => void): void;
}
/**
 * 엔드포인트 하나의 레이트리밋 상태. 응답의 `x-ratelimit-remaining` / `x-ratelimit-reset`으로 갱신한다.
 * Roblox 한도는 IP 단위라 체인 전체가 config로 공유한다.
 *
 * 헤더를 믿을 수 없는 엔드포인트도 있다. POST users /v1/users는 `remaining: 995`라면서 429를 준다
 * (요청 수가 아니라 id 개수로 세는 숨은 한도로 보인다). 그래서 429가 이어지면 헤더와 별개로
 * 1, 2, 4 … 초씩 늘려 기다리고, 그동안은 하나씩만 보낸다.
 */
declare class RobloxRateBucket {
    private readonly key;
    private readonly store;
    /** null이면 모른다 */
    private remaining;
    private resetAt;
    private inflight;
    /** 최근 연속 429 횟수. 성공하면 줄어든다 */
    private strikes;
    /** 자리가 나기를 기다리는 쪽(batcher). 한 번 알리면 지운다 */
    private readonly waiters;
    /** 저장소에서 상태를 읽어야 하는지 (처음, 창이 지난 뒤) */
    private stale;
    private syncing;
    constructor(key?: string, store?: RobloxRateLimitStore | null);
    /**
     * 진행 중인 요청이 끝나 자리가 날 때 한 번 부른다. 버킷은 여러 batcher가 같이 쓰므로
     * (같은 엔드포인트를 쓰는 서비스, `.as(cookie)` 클라이언트) 요청을 보낸 쪽만 깨어나면 안 된다.
     */
    whenFree(callback: () => void): void;
    private notify;
    /** 지금 요청 하나를 보낼 수 있으면 자리를 잡고 true. 끝나면 `release` 또는 `exhaust`를 불러야 한다. */
    tryAcquire(now?: number): boolean;
    /** 요청이 끝났다. 응답 헤더가 있으면 상태를 갱신한다. */
    release(headers?: Headers | null): void;
    /** 429를 받았다. 리셋될 때까지 막는다. */
    exhaust(headers?: Headers | null): void;
    /**
     * 밖에서 온 상태를 합친다. 지금 상태를 모르면 그대로 받고, 알면 더 보수적인 쪽을 따른다
     * (남은 수는 작은 쪽, 리셋은 늦은 쪽). 이미 지난 창은 버린다.
     */
    merge(state: RobloxRateLimitState, now?: number): void;
    private load;
    private save;
    /** 다시 보낼 수 있을 때까지 남은 시간(ms). 지금 보낼 수 있으면 0 */
    waitTime(now?: number): number;
}
/** 키(보통 "origin path") → 버킷 */
declare class RobloxRateLimiter {
    private readonly store;
    private readonly buckets;
    constructor(store?: RobloxRateLimitStore | null);
    bucket(key: string): RobloxRateBucket;
}

/** `.ttl({ thumbnails: { ... } })`로 캐시할 수 있는 메서드. `get`은 대상 하나씩 캐시한다. */
type RobloxThumbnailsCacheable = "get" | "getGameThumbnails";
/** thumbnails.roblox.com */
declare class RobloxThumbnailsApi {
    private readonly config;
    private readonly batcher;
    private readonly gameThumbnails;
    constructor(config: RobloxConfig);
    private ttl;
    /**
     * 썸네일들. 결과는 입력과 같은 순서이고, 타입이 섞여도 된다. 하나만 필요하면 원소 하나짜리 배열을 넣는다.
     * 엔드포인트는 대상과 남은 한도를 보고 라이브러리가 고른다. 같은 틱에 들어온 호출은 모아서 보내고,
     * Pending이면 잠시 기다렸다 다시 묻는다. 없는 id는 `state: "Error"`로 돌아온다.
     */
    get<T extends RobloxThumbnailTarget>(targets: readonly T[]): Promise<RobloxThumbnail<RobloxThumbnailTargetIdOf<T>>[]>;
    private load;
    /**
     * GET /v1/games/multiget/thumbnails — universe마다 등록된 썸네일 목록. 결과는 입력 순서이고 없는 universe는 뺀다.
     * 같은 틱에 들어온 호출은 옵션이 같으면 100개씩 묶는다.
     */
    getGameThumbnails(universeIds: readonly RobloxUniverseId[], query?: RobloxUniverseThumbnailsQuery): Promise<RobloxUniverseThumbnails[]>;
}

/** `.ttl({ users: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
type RobloxUsersCacheable = "getUserDetails" | "getUsers" | "getUsersByNames" | "getUsernameHistory";
/** users.roblox.com */
declare class RobloxUsersApi {
    private readonly config;
    private readonly thumbnails;
    private readonly http;
    private readonly details;
    private readonly byId;
    private readonly byName;
    constructor(config: RobloxConfig, thumbnails: RobloxThumbnailsApi);
    private ttl;
    /** 유저들에 아바타 썸네일을 붙인다. id를 아는 경우 users 조회와 동시에 보낸다. */
    private attach;
    /**
     * GET /v1/users/{userId} — 설명, 가입일, 정지 여부까지. 유저 한 명당 요청 하나라 한도(30회/분)가 빡빡하다.
     * 기본 정보만 필요하면 `getUsers`를 쓴다. `thumbnail`을 주면 아바타 썸네일을 같이 받는다.
     */
    getUserDetails(userIds: readonly RobloxUserId[], opts: {
        thumbnail: true | RobloxAvatarThumbnailOptions;
    }): Promise<RobloxWithThumbnail<RobloxUserDetail>[]>;
    getUserDetails(userIds: readonly RobloxUserId[], opts?: {
        thumbnail?: undefined;
    }): Promise<RobloxUserDetail[]>;
    /** POST /v1/users — id, 이름, 표시 이름, 인증 배지. 경로 여러 개를 섞어 묶어 보낸다. `thumbnail`을 주면 아바타 썸네일을 같이 받는다. */
    getUsers(userIds: readonly RobloxUserId[], opts: {
        excludeBannedUsers?: boolean;
        thumbnail: true | RobloxAvatarThumbnailOptions;
    }): Promise<RobloxWithThumbnail<RobloxUser>[]>;
    getUsers(userIds: readonly RobloxUserId[], opts?: {
        excludeBannedUsers?: boolean;
        thumbnail?: undefined;
    }): Promise<RobloxUser[]>;
    /**
     * POST /v1/usernames/users — 이름(이전 이름 포함, 대소문자 무시)으로 찾는다. 100개씩 묶어서 보낸다.
     * `thumbnail`을 주면 찾은 유저의 아바타 썸네일을 이어서 받는다.
     */
    getUsersByNames(usernames: readonly RobloxUserName[], opts: {
        excludeBannedUsers?: boolean;
        thumbnail: true | RobloxAvatarThumbnailOptions;
    }): Promise<RobloxWithThumbnail<RobloxUserByName>[]>;
    getUsersByNames(usernames: readonly RobloxUserName[], opts?: {
        excludeBannedUsers?: boolean;
        thumbnail?: undefined;
    }): Promise<RobloxUserByName[]>;
    /** GET /v1/users/search */
    searchUsers(query: RobloxUserSearchQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxUserId">;
            name: string & z.core.$brand<"RobloxUserName">;
            displayName: string & z.core.$brand<"RobloxUserDisplayname">;
            hasVerifiedBadge: boolean;
            previousUsernames: string[];
        }[];
    }>;
    /** GET /v1/users/{userId}/username-history */
    getUsernameHistory(userId: RobloxUserId, query?: RobloxUsernameHistoryQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            name: string & z.core.$brand<"RobloxUserName">;
        }[];
    }>;
    /** GET /v1/display-names/validate — 신규 유저용. 사용할 수 없으면 FETCH_FAILED(400/429)로 실패한다. */
    validateDisplayName(query: RobloxValidateDisplayNameQuery): Promise<void>;
    /** GET /v1/users/authenticated */
    getAuthenticated(): Promise<{
        id: number & z.core.$brand<"RobloxUserId">;
        name: string & z.core.$brand<"RobloxUserName">;
        displayName: string & z.core.$brand<"RobloxUserDisplayname">;
    }>;
    /** GET /v1/users/authenticated/age-bracket */
    getAgeBracket(): Promise<number>;
    /** GET /v1/users/authenticated/country-code */
    getCountryCode(): Promise<string>;
    /** GET /v1/users/authenticated/roles */
    getRoles(): Promise<string[]>;
    /** GET /v1/birthdate */
    getBirthdate(): Promise<{
        birthMonth: number & z.core.$brand<"RobloxBirthMonth">;
        birthDay: number & z.core.$brand<"RobloxBirthDay">;
        birthYear: number & z.core.$brand<"RobloxBirthYear">;
    }>;
    /** POST /v1/birthdate — 비밀번호가 필요하다. */
    setBirthdate(request: RobloxSetBirthdateRequest): Promise<void>;
    /** GET /v1/description */
    getDescription(): Promise<string>;
    /** POST /v1/description — 필터링된 뒤의 설명을 돌려준다. */
    setDescription(description: string): Promise<string>;
    /** GET /v1/gender */
    getGender(): Promise<1 | 2 | 3>;
    /** POST /v1/gender */
    setGender(gender: RobloxGender): Promise<void>;
    /** GET /v1/users/{userId}/display-names/validate — 기존 유저용 */
    validateUserDisplayName(userId: RobloxUserId, displayName: string): Promise<void>;
    /** PATCH /v1/users/{userId}/display-names — 인증된 본인만 바꿀 수 있다. */
    setDisplayName(userId: RobloxUserId, newDisplayName: string): Promise<void>;
}

/** `.ttl({ presence: { ... } })`로 캐시할 수 있는 메서드. `get`은 유저 한 명씩 캐시한다. */
type RobloxPresenceCacheable = "get";
/** presence.roblox.com */
declare class RobloxPresenceApi {
    private readonly config;
    private readonly batcher;
    constructor(config: RobloxConfig);
    private ttl;
    /**
     * 유저들의 접속 상태. 결과는 입력과 같은 순서다. 한 명만 필요하면 원소 하나짜리 배열을 넣는다.
     * 같은 틱에 들어온 호출은 50명씩 모아서 보내고, 한도(60회/분)가 차면 풀릴 때까지 기다린다.
     * 게임 정보는 요청 계정에 따라 다르게 보일 수 있다 — 특정 계정 관점이 필요하면 `.as(cookie)`를 쓴다.
     */
    get(userIds: readonly RobloxUserId[]): Promise<RobloxUserPresence[]>;
    private load;
}

/** `.ttl({ games: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
type RobloxGamesCacheable = "getGames" | "getUniverseIds" | "getPlaceDetails" | "getProductInfo" | "getPlayability" | "getVotes" | "getFavoriteCounts" | "getMedia" | "getServerAddresses" | "getServerLocations";
/** `getServers` 옵션 */
type RobloxGetServersOptions = RobloxServerPageQuery & {
    /**
     * 이만큼 모일 때까지 페이지를 따라간다. 기본 100.
     * 커서는 페이지 경계만 가리킬 수 있어서 마지막 페이지를 자르지 않는다 — 결과가 이보다 많을 수 있다.
     */
    count?: number;
    /** 플레이어 헤드샷. false면 받지 않는다. 기본 150x150 Png (playerTokens가 있어야 하므로 인증 필요) */
    players?: false | {
        size?: RobloxThumbnailSize<"AvatarHeadShot">;
        format?: "Png" | "Jpeg" | "Webp";
        isCircular?: boolean;
    };
    /** gamejoin으로 서버 주소를 받는다. 인증 필요. 꽉 찬 서버는 주소가 없다 */
    address?: boolean;
    /** 서버 위치. address를 포함하고 `.geolocation(fn)`이 필요하다 */
    location?: boolean;
};
/** `findUsers` 옵션 */
type RobloxFindUsersOptions = Omit<RobloxServerPageQuery, "cursor"> & {
    /** 서버 목록을 이만큼까지 뒤진다 (페이지 단위라 조금 넘을 수 있다). 기본 1000 */
    maxServers?: number;
    /** presence를 보조로 쓴다 (서버가 보이면 바로 쓰고, 다른 place에 있으면 그만 찾는다). 기본 true */
    presence?: boolean;
    /** gamejoin으로 찾은 서버의 주소를 받는다. 인증 필요 */
    address?: boolean;
    /** 찾은 서버의 위치. address를 포함하고 `.geolocation(fn)`이 필요하다 */
    location?: boolean;
};
/** games.roblox.com + gamejoin.roblox.com */
declare class RobloxGamesApi<L = unknown> {
    private readonly config;
    private readonly thumbnails;
    private readonly presence;
    private readonly http;
    private readonly auth;
    private readonly games;
    private readonly favoriteCounts;
    private readonly votes;
    private readonly products;
    private readonly playability;
    private readonly placeDetails;
    private readonly universeIds;
    private readonly media;
    private readonly favorited;
    private readonly userVotes;
    private readonly privateServersEnabled;
    private readonly privateServerDetails;
    private readonly invites;
    private readonly serverPages;
    private readonly groupGames;
    private readonly myPrivateServers;
    private readonly addresses;
    constructor(config: RobloxConfig, thumbnails: RobloxThumbnailsApi, presence: RobloxPresenceApi);
    private ttl;
    /** 항목 하나씩 캐시하며 batcher로 보낸다. 계정별로 나누는 키는 viewer를 받는다 (쿠키 로테이션 중이면 캐시하지 않는다). */
    private each;
    /** GET /v1/games — 게임(universe) 상세 */
    getGames(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGame[]>;
    /** place가 속한 universe. 인증돼 있으면 place 상세를 쓰고, 아니면 apis.roblox.com으로 하나씩 묻는다. */
    getUniverseIds(placeIds: readonly RobloxPlaceId[]): Promise<{
        placeId: RobloxPlaceId;
        universeId: RobloxUniverseId;
    }[]>;
    /** GET /v1/games/multiget-place-details — 인증 필요. 플레이 가능 여부는 요청 계정 기준이다. */
    getPlaceDetails(placeIds: readonly RobloxPlaceId[]): Promise<RobloxPlaceDetails[]>;
    /** GET /v1/games/games-product-info — 유료 게임 구매 정보 */
    getProductInfo(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGameProduct[]>;
    /** GET /v1/games/multiget-playability-status — 요청 계정이 플레이할 수 있는지 */
    getPlayability(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGamePlayability[]>;
    /** 좋아요/싫어요 수 */
    getVotes(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGameVotes[]>;
    /** 즐겨찾기 수 */
    getFavoriteCounts(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGameFavoriteCount[]>;
    /** GET /v2/games/{universeId}/media — 게임 페이지의 이미지/영상. `all`이면 관련 미디어까지 */
    getMedia(universeIds: readonly RobloxUniverseId[], opts?: {
        all?: boolean;
    }): Promise<{
        universeId: RobloxUniverseId;
        media: RobloxGameMedia[];
    }[]>;
    /** GET /v1/games/recommendations/game/{universeId} — 비슷한 게임 */
    getRecommendations(universeId: RobloxUniverseId, query?: RobloxRecommendationsQuery): Promise<{
        games: {
            creator: {
                name: string;
                hasVerifiedBadge: boolean;
                type: "User";
                id: RobloxUserId;
            } | {
                name: string;
                hasVerifiedBadge: boolean;
                type: "Group";
                id: RobloxGroupId;
            } | {
                name: string;
                hasVerifiedBadge: boolean;
                type: "Unknown";
                id: number;
                rawType: string | number;
            };
            totalUpVotes: number;
            totalDownVotes: number;
            universeId: number & z.core.$brand<"RobloxUniverseId">;
            name: string;
            placeId: number & z.core.$brand<"RobloxPlaceId">;
            playerCount: number;
            imageToken: string | null;
            isSponsored: boolean;
            nativeAdData: string | null;
            isShowSponsoredLabel: boolean;
            price: number | null;
            analyticsIdentifier: string | null;
            gameDescription: string | null;
            genre: string | null;
            minimumAge?: number | null | undefined;
            ageRecommendationDisplayName?: string | null | undefined;
            canonicalUrlPath?: string | null | undefined;
        }[];
        nextPaginationKey: string | null;
    }>;
    /** GET /v2/users/{userId}/games — 유저가 만든 게임 (limit은 10/25/50) */
    getUserGames(userId: RobloxUserId, query?: RobloxGameListQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxUniverseId">;
            name: string;
            description: string | null;
            creator: ({
                type: "User";
                id: RobloxUserId;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">) | ({
                type: "Group";
                id: RobloxGroupId;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">) | ({
                type: "Unknown";
                id: number;
                rawType: string | number;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">);
            rootPlace: {
                id: number & z.core.$brand<"RobloxPlaceId">;
                name?: string | null | undefined;
            };
            created: string;
            updated: string;
            placeVisits: number;
        }[];
    }>;
    /** GET /v2/users/{userId}/favorite/games — 유저의 즐겨찾기 */
    getUserFavoriteGames(userId: RobloxUserId, query?: RobloxGameListQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxUniverseId">;
            name: string;
            description: string | null;
            creator: ({
                type: "User";
                id: RobloxUserId;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">) | ({
                type: "Group";
                id: RobloxGroupId;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">) | ({
                type: "Unknown";
                id: number;
                rawType: string | number;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">);
            rootPlace: {
                id: number & z.core.$brand<"RobloxPlaceId">;
                name?: string | null | undefined;
            };
            created: string;
            updated: string;
            placeVisits: number;
            price: number | null;
        }[];
    }>;
    /** 그룹이 만든 게임. /v2/groups/{groupId}/games와 gamesV2를 번갈아 쓴다. */
    getGroupGames(groupId: RobloxGroupId, query?: RobloxGameListQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxUniverseId">;
            name: string;
            description: string | null;
            creator: ({
                type: "User";
                id: RobloxUserId;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">) | ({
                type: "Group";
                id: RobloxGroupId;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">) | ({
                type: "Unknown";
                id: number;
                rawType: string | number;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">);
            rootPlace: {
                id: number & z.core.$brand<"RobloxPlaceId">;
                name?: string | null | undefined;
            };
            created: string;
            updated: string;
            placeVisits: number;
        }[];
    }>;
    /** GET /v1/games/{universeId}/favorites — 내가 즐겨찾기했는지 */
    getFavorited(universeIds: readonly RobloxUniverseId[]): Promise<{
        universeId: RobloxUniverseId;
        isFavorited: boolean;
    }[]>;
    /** POST /v1/games/{universeId}/favorites */
    setFavorited(universeId: RobloxUniverseId, isFavorited: boolean): Promise<void>;
    /** GET /v1/games/{universeId}/votes/user — 내 투표와 투표 가능 여부 */
    getUserVotes(universeIds: readonly RobloxUniverseId[]): Promise<(RobloxUserGameVote & {
        universeId: RobloxUniverseId;
    })[]>;
    /** PATCH /v1/games/{universeId}/user-votes — true = 좋아요, false = 싫어요, null = 취소. 게임을 플레이한 적이 있어야 한다. */
    setUserVote(universeId: RobloxUniverseId, vote: boolean | null): Promise<void>;
    /**
     * 서버 목록 한 페이지. 엔드포인트마다 3회/분이라 세 엔드포인트를 나눠 쓴다.
     * 받은 커서는 같은 옵션으로 다시 넘긴다 (어느 엔드포인트의 커서인지는 라이브러리가 기억한다).
     * `Friend`와 `playerTokens`는 인증이 필요하다.
     */
    getServerPage(placeId: RobloxPlaceId, query?: RobloxServerPageQuery): Promise<RobloxServerPage>;
    /**
     * 서버 접속 주소. gamejoin으로 해당 서버에 접속을 요청해 joinScript에서 뽑는다 (인증 필요, 5회/초).
     * 꽉 찬 서버는 대기열로 들어가 주소가 null이다. 주소를 받은 결과만 캐시한다.
     */
    getServerAddresses(targets: readonly RobloxServerAddressTarget[]): Promise<RobloxServerAddress[]>;
    /**
     * IP → 위치. `.geolocation(fn)`으로 넣은 콜백에 캐시에 없는 IP를 중복 없이 한 번에 넘긴다.
     * 결과는 입력 순서이고 `location`은 콜백이 돌려준 값 그대로다. 콜백이 null을 준 IP는 빼고, 캐시하지 않는다.
     * 같은 IP를 이미 조회하는 중이면(다른 호출이 동시에 물은 경우) 그 결과를 같이 기다리고 다시 묻지 않는다.
     */
    getServerLocations(ips: readonly RobloxIpAddress[]): Promise<RobloxServerLocation<L>[]>;
    /** 캐시를 보고, 없는 IP만 콜백에 넘긴 뒤 저장한다. 모르는 IP는 결과에 없다 */
    private locate;
    /** GET /v1/games/{placeId}/private-servers — 내가 들어갈 수 있는 비공개 서버 */
    getPrivateServers(placeId: RobloxPlaceId, query?: RobloxPrivateServerPageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            maxPlayers: number;
            name: string;
            vipServerId: number & z.core.$brand<"RobloxPrivateServerId">;
            id?: (string & z.core.$brand<"RobloxJobId">) | null | undefined;
            playing?: number | null | undefined;
            playerTokens?: string[] | null | undefined;
            fps?: number | null | undefined;
            ping?: number | null | undefined;
            accessCode?: string | null | undefined;
            owner?: {
                id: number & z.core.$brand<"RobloxUserId">;
                name: string;
                displayName: string;
                hasVerifiedBadge?: boolean | null | undefined;
            } | null | undefined;
        }[];
        gameJoinRestricted?: boolean | null | undefined;
    }>;
    /** 내 비공개 서버 목록. /v1/vip-servers/…와 /v1/private-servers/…를 번갈아 쓴다. */
    getMyPrivateServers(query?: RobloxMyPrivateServersQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: Record<string, unknown>[];
    }>;
    /** GET /v1/private-servers/enabled-in-universe/{universeId} */
    getPrivateServersEnabled(universeIds: readonly RobloxUniverseId[]): Promise<{
        universeId: RobloxUniverseId;
        privateServersEnabled: boolean;
    }[]>;
    /** GET /v1/vip-servers/{id} — 내가 관리하는 비공개 서버의 설정 */
    getPrivateServerDetails(ids: readonly RobloxPrivateServerId[]): Promise<RobloxPrivateServerDetail[]>;
    /** GET /v1/vip-server/can-invite/{userId} — 내 비공개 서버에 초대할 수 있는지 */
    getPrivateServerInvites(userIds: readonly RobloxUserId[]): Promise<(RobloxPrivateServerInvite & {
        userId: RobloxUserId;
    })[]>;
    /** POST /v1/games/vip-servers/{universeId} — 비공개 서버를 산다 */
    createPrivateServer(universeId: RobloxUniverseId, request: RobloxCreatePrivateServerRequest): Promise<Record<string, unknown>>;
    /** PATCH /v1/vip-servers/{id} — 이름, 참가 코드 재발급, 켜기/끄기 */
    updatePrivateServer(id: RobloxPrivateServerId, request: RobloxUpdatePrivateServerRequest): Promise<{
        id: number & z.core.$brand<"RobloxPrivateServerId">;
        name: string;
        active: boolean;
        game?: unknown;
        joinCode?: string | null | undefined;
        subscription?: {
            active: boolean;
            expired?: boolean | null | undefined;
            expirationDate?: string | null | undefined;
            price?: number | null | undefined;
            canRenew?: boolean | null | undefined;
            hasInsufficientFunds?: boolean | null | undefined;
            hasRecurringProfile?: boolean | null | undefined;
            hasPriceChanged?: boolean | null | undefined;
            purchaseScheduleId?: number | null | undefined;
            totalDiscountAmountInRobux?: number | null | undefined;
            metadata?: unknown;
        } | null | undefined;
        permissions?: {
            clanAllowed: boolean;
            friendsAllowed: boolean;
            users: {
                id: number & z.core.$brand<"RobloxUserId">;
                name: string;
                displayName: string;
            }[];
            enemyClanId?: (number & z.core.$brand<"RobloxGroupId">) | null | undefined;
        } | null | undefined;
        link?: string | null | undefined;
    }>;
    /** PATCH /v1/vip-servers/{id}/permissions */
    updatePrivateServerPermissions(id: RobloxPrivateServerId, request: RobloxUpdatePrivateServerPermissionsRequest): Promise<{
        clanAllowed: boolean;
        friendsAllowed: boolean;
        users: {
            id: number & z.core.$brand<"RobloxUserId">;
            name: string;
            displayName: string;
        }[];
        enemyClanId?: (number & z.core.$brand<"RobloxGroupId">) | null | undefined;
    }>;
    /** PATCH /v1/vip-servers/{id}/subscription — 구독 갱신 켜기/끄기 */
    updatePrivateServerSubscription(id: RobloxPrivateServerId, request: RobloxUpdatePrivateServerSubscriptionRequest): Promise<{
        active: boolean;
        expired?: boolean | null | undefined;
        expirationDate?: string | null | undefined;
        price?: number | null | undefined;
        canRenew?: boolean | null | undefined;
        hasInsufficientFunds?: boolean | null | undefined;
        hasRecurringProfile?: boolean | null | undefined;
        hasPriceChanged?: boolean | null | undefined;
        purchaseScheduleId?: number | null | undefined;
        totalDiscountAmountInRobux?: number | null | undefined;
        metadata?: unknown;
    }>;
    /**
     * place들의 게임 정보를 한 번에. place → universe → 상세/투표/아이콘/썸네일을 모아서 준다.
     * 없는 place(또는 universe)는 뺀다.
     */
    getPlaces(placeIds: readonly RobloxPlaceId[]): Promise<RobloxPlace[]>;
    /**
     * 서버 목록을 페이지를 따라가며 `count`개 이상 모으고(페이지 단위), 플레이어 헤드샷/주소/위치를 붙인다.
     * `nextPageCursor`는 마지막으로 받은 페이지의 다음이라, 넘기면 빠짐없이 이어서 받는다.
     * 서버 목록 한도가 빡빡해서(엔드포인트당 3회/분) 많이 모을수록 오래 걸린다.
     */
    getServers(placeId: RobloxPlaceId, opts?: RobloxGetServersOptions): Promise<{
        data: RobloxServerInfo<L>[];
        nextPageCursor: RobloxCursor | null;
    }>;
    /**
     * 유저들이 place의 어느 서버에 있는지. 결과는 입력 순서이고, 못 찾은 유저도 `jobId: null`로 들어간다.
     * 서버 목록을 따라가며 플레이어 헤드샷을 대상의 헤드샷과 맞추고, 모두 찾으면 바로 멈춘다.
     * presence는 보조로만 쓴다 — 한도가 빡빡하고(60회/분) 대상의 공개 설정에 따라 보이는 게 달라서, 서버 탐색과 나란히 묻고 기다리지 않는다.
     * presence가 이 place의 서버를 보여주면 그걸 쓰고, 다른 place의 게임에 있다고 확정되면 그 유저는 그만 찾는다.
     * 오프라인·온라인으로 나오거나 게임 정보가 가려진 유저는 계속 찾는다 (접속 상태를 숨겼을 수 있다).
     * 헤드샷 비교에는 플레이어 토큰이 필요해 인증해야 한다. 서버 목록은 서버마다 토큰을 5개까지만 줘서(2026-10 실측, 세 엔드포인트 모두)
     * 서버에 있어도 못 찾을 수 있다. 기본 아바타이거나 대상끼리 아바타가 같으면 헤드샷으로는 찾을 수 없다.
     * 서버 목록 한도(엔드포인트당 3회/분) 때문에 큰 게임일수록 오래 걸린다.
     */
    findUsers(placeId: RobloxPlaceId, userIds: readonly RobloxUserId[], opts?: RobloxFindUsersOptions): Promise<RobloxUserServer<L>[]>;
}

/** `.ttl({ friends: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
type RobloxFriendsCacheable = "getFriends" | "getFriendCounts" | "getFollowerCounts" | "getFollowingCounts";
/** friends.roblox.com */
declare class RobloxFriendsApi {
    private readonly config;
    private readonly users;
    private readonly http;
    private readonly friendIds;
    private readonly friendCounts;
    private readonly followerCounts;
    private readonly followingCounts;
    private readonly statuses;
    private readonly areFriends;
    private readonly followings;
    /** viewer → 인증된 내 id */
    private readonly me;
    constructor(config: RobloxConfig, users: RobloxUsersApi);
    private ttl;
    /** 요청 계정의 id. 계정이 정해져 있지 않으면 에러 (requireViewer) */
    private myId;
    private each;
    /**
     * 유저들의 친구 목록. friends API는 이름을 빈 문자열로 주므로 users API로 이름을 채운다.
     * /friends와 /friends/find(50개씩 넘김)를 한도에 맞춰 나눠 쓴다. `thumbnail`을 주면 친구들의 아바타 썸네일도 붙인다.
     */
    getFriends(userIds: readonly RobloxUserId[], opts: {
        thumbnail: true | RobloxAvatarThumbnailOptions;
    }): Promise<RobloxUserFriends<RobloxWithThumbnail<RobloxUser>>[]>;
    getFriends(userIds: readonly RobloxUserId[], opts?: {
        thumbnail?: undefined;
    }): Promise<RobloxUserFriends[]>;
    /** GET /v1/users/{userId}/friends/count */
    getFriendCounts(userIds: readonly RobloxUserId[]): Promise<{
        userId: RobloxUserId;
        count: number;
    }[]>;
    /** GET /v1/users/{userId}/followers/count */
    getFollowerCounts(userIds: readonly RobloxUserId[]): Promise<{
        userId: RobloxUserId;
        count: number;
    }[]>;
    /** GET /v1/users/{userId}/followings/count */
    getFollowingCounts(userIds: readonly RobloxUserId[]): Promise<{
        userId: RobloxUserId;
        count: number;
    }[]>;
    /** GET /v1/users/{userId}/followers — 인증 필요. 항목은 id뿐이다 */
    getFollowers(userId: RobloxUserId, query?: RobloxFollowPageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxUserId">;
        }[];
    }>;
    /** GET /v1/users/{userId}/followings — 인증 필요. 항목은 id뿐이다 */
    getFollowings(userId: RobloxUserId, query?: RobloxFollowPageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxUserId">;
        }[];
    }>;
    /** GET /v1/users/{userId}/friends/search — 친구를 이름으로 찾는다. 인증 필요 */
    searchFriends(userId: RobloxUserId, query: RobloxFriendSearchQuery): Promise<RobloxFriendPage>;
    /** GET /v1/metadata — 친구 페이지 설정과 대상의 이름 */
    getMetadata(targetUserId: RobloxUserId): Promise<{
        isFriendsFilterBarEnabled?: boolean | null | undefined;
        isFriendsPageSortExperimentEnabled?: boolean | null | undefined;
        isFriendsUserDataStoreCacheEnabled?: boolean | null | undefined;
        frequentFriendSortRollout?: number | null | undefined;
        userName?: string | null | undefined;
        displayName?: string | null | undefined;
    }>;
    /** GET /v1/users/{me}/friends/statuses — 나와의 관계 ("Friends", "RequestSent" 등) */
    getFriendStatuses(userIds: readonly RobloxUserId[]): Promise<RobloxFriendStatus[]>;
    /** 나와 친구인지. multiget-are-friends와 statuses를 나눠 쓴다. */
    getAreFriends(userIds: readonly RobloxUserId[]): Promise<{
        userId: RobloxUserId;
        isFriend: boolean;
    }[]>;
    /** POST /v1/user/following-exists — 내가 팔로우하는지 / 나를 팔로우하는지 */
    getFollowingStatuses(userIds: readonly RobloxUserId[]): Promise<RobloxFollowingStatus[]>;
    /** GET /v1/users/{me}/friends/online — 지금 접속 중인 내 친구와 위치 */
    getOnlineFriends(): Promise<RobloxOnlineFriend[]>;
    /** GET /v1/users/{me}/friends/inactive — 오래 접속하지 않은 내 친구 */
    getInactiveFriends(): Promise<(number & z.core.$brand<"RobloxUserId">)[]>;
    /** GET /v1/my/friends/requests — 받은 친구 요청 */
    getFriendRequests(query?: RobloxFriendRequestsQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxUserId">;
            name: string;
            displayName: string;
            hasVerifiedBadge?: boolean | null | undefined;
            description?: string | null | undefined;
            created?: string | null | undefined;
            isBanned?: boolean | null | undefined;
            isUnseen?: boolean | null | undefined;
            mutualFriendsList?: string[] | null | undefined;
            friendRequest?: {
                sentAt: string;
                senderId: number & z.core.$brand<"RobloxUserId">;
                sourceUniverseId?: (number & z.core.$brand<"RobloxUniverseId">) | null | undefined;
                originSourceType?: string | number | null | undefined;
                contactName?: string | null | undefined;
                senderNickname?: string | null | undefined;
            } | null | undefined;
        }[];
    }>;
    /** GET /v1/my/trusted-friends/requests — 받은 신뢰하는 친구 요청 */
    getTrustedFriendRequests(query?: {
        limit?: number;
        cursor?: RobloxCursor;
        sortOrder?: 0 | 1;
    }): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            sentAt: string;
            senderId: number & z.core.$brand<"RobloxUserId">;
        }[];
    }>;
    /** 받은 요청 수. `unseen`이면 아직 보지 않은 것만 (/my/new-friend-requests/count) */
    getFriendRequestCount(opts?: {
        unseen?: boolean;
        trusted?: boolean;
    }): Promise<number>;
    /** POST /v1/users/{userId}/request-friendship — 계정에 따라 챌린지(캡차)를 요구하며 403이 난다 */
    sendFriendRequest(userId: RobloxUserId): Promise<void>;
    /** POST /v1/users/{userId}/accept-friend-request */
    acceptFriendRequest(userId: RobloxUserId): Promise<void>;
    /** POST /v1/users/{userId}/decline-friend-request */
    declineFriendRequest(userId: RobloxUserId): Promise<void>;
    /** POST /v1/user/friend-requests/decline-all */
    declineAllFriendRequests(): Promise<void>;
    /** POST /v1/users/{userId}/unfriend */
    unfriend(userId: RobloxUserId): Promise<void>;
    /** POST /v1/users/{userId}/follow — 캡차가 필요하면 `isCaptchaRequired`가 true로 온다 */
    follow(userId: RobloxUserId, captcha?: RobloxCaptchaTokenRequest): Promise<{
        success: boolean;
        isCaptchaRequired?: boolean | null | undefined;
        notificationMuted?: boolean | null | undefined;
    }>;
    /** POST /v1/users/{userId}/unfollow */
    unfollow(userId: RobloxUserId): Promise<void>;
    /** POST /v1/my/friends/refresh-qr-session — QR 친구 추가 세션 갱신 */
    refreshQrSession(): Promise<boolean>;
    /** GET /v1/my/friends/{userId}/check-qr-session — QR로 친구가 됐는지 */
    checkQrSession(userId: RobloxUserId): Promise<vigor_fetch.VigorFetchResult<{
        policy: {
            path: ["v1", "my", "friends", `${number & z.core.$brand<"RobloxUserId">}`, "check-qr-session"];
            origin: string;
            body: symbol & {
                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
            };
            middlewares: {
                before: [{
                    _mode: "fluent";
                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        readonly policy: {
                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            readonly method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly path: [];
                            readonly query: [];
                            readonly hash: "";
                            readonly headers: {};
                            readonly body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly extra: {};
                            readonly settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly middlewares: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                readonly before: [];
                                readonly after: [];
                                readonly onResult: [];
                                readonly onError: [];
                            };
                            readonly retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                        };
                        readonly cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        readonly apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }, symbol & {
                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                    }>) => Promise<void>;
                }];
                after: [{
                    _mode: "intercept";
                    func: (ctx: vigor_fetch.VigorContextReset<vigor_fetch.VigorFetchContextSchema<{
                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        readonly policy: {
                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            readonly method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly path: [];
                            readonly query: [];
                            readonly hash: "";
                            readonly headers: {};
                            readonly body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly extra: {};
                            readonly settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly middlewares: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                readonly before: [];
                                readonly after: [];
                                readonly onResult: [];
                                readonly onError: [];
                            };
                            readonly retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                        };
                        readonly cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        readonly apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }, symbol & {
                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                    }>, {
                        result: unknown;
                        response: Response;
                    }>, api: Pick<vigor_fetch.VigorFetchPolicyMiddlewaresApi<{
                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        readonly policy: {
                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            readonly method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly path: [];
                            readonly query: [];
                            readonly hash: "";
                            readonly headers: {};
                            readonly body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly extra: {};
                            readonly settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly middlewares: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                readonly before: [];
                                readonly after: [];
                                readonly onResult: [];
                                readonly onError: [];
                            };
                            readonly retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                        };
                        readonly cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        readonly apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }>, "setResult" | "throwError">) => {
                        result: boolean;
                        error: unknown;
                        record: Record<string, any>;
                        options: (symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                        }) | vigor_fetch.VigorFetchOptions;
                        policy: {
                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            readonly method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly path: [];
                            readonly query: [];
                            readonly hash: "";
                            readonly headers: {};
                            readonly body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly extra: {};
                            readonly settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly middlewares: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                readonly before: [];
                                readonly after: [];
                                readonly onResult: [];
                                readonly onError: [];
                            };
                            readonly retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                        };
                        response: Response;
                        __brand: vigor_fetch.VigorBrand<"Fetch", "Context<Schema">;
                        flags: {
                            overridden: boolean;
                            restarted: boolean;
                        };
                        timeline: vigor_fetch.VigorFetchTimeline;
                        href: string;
                    };
                }];
                onResult: [];
                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                onError: [{
                    _mode: "intercept";
                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                        policy: {
                            path: [];
                            origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            middlewares: {
                                before: [{
                                    _mode: "fluent";
                                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                                        readonly policy: {
                                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                                            readonly method: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly origin: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly path: [];
                                            readonly query: [];
                                            readonly hash: "";
                                            readonly headers: {};
                                            readonly body: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly extra: {};
                                            readonly settings: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                                readonly debug: false;
                                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                                readonly maxRetryAfter: number;
                                                readonly redirect: false;
                                                readonly confinePath: true;
                                                readonly maxRestarts: 3;
                                                readonly default: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly middlewares: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                                readonly before: [];
                                                readonly after: [];
                                                readonly onResult: [];
                                                readonly onError: [];
                                            };
                                            readonly retry: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                    };
                                                    readonly abortSignals: [];
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxAttempts: 5;
                                                        readonly maxRestarts: 3;
                                                        readonly timeout: 20000;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly retryIf: [];
                                                        readonly onRetry: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly algorithms: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                                        readonly _tag: "constant";
                                                        readonly jitter: 1000;
                                                        readonly interval: 2000;
                                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly parse: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                                    };
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly raw: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxRestarts: 3;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly strategies: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                        };
                                        readonly cast: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly apiMap: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                    }, symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    }>) => Promise<void>;
                                }];
                                after: [];
                                onResult: [];
                                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                onError: [];
                            };
                            parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            query: [];
                            hash: "";
                            headers: {};
                            extra: {};
                        };
                        apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }, unknown>, api: Pick<vigor_fetch.VigorFetchPolicyMiddlewaresApi<{
                        policy: {
                            path: [];
                            origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            middlewares: {
                                before: [{
                                    _mode: "fluent";
                                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                                        readonly policy: {
                                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                                            readonly method: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly origin: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly path: [];
                                            readonly query: [];
                                            readonly hash: "";
                                            readonly headers: {};
                                            readonly body: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly extra: {};
                                            readonly settings: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                                readonly debug: false;
                                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                                readonly maxRetryAfter: number;
                                                readonly redirect: false;
                                                readonly confinePath: true;
                                                readonly maxRestarts: 3;
                                                readonly default: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly middlewares: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                                readonly before: [];
                                                readonly after: [];
                                                readonly onResult: [];
                                                readonly onError: [];
                                            };
                                            readonly retry: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                    };
                                                    readonly abortSignals: [];
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxAttempts: 5;
                                                        readonly maxRestarts: 3;
                                                        readonly timeout: 20000;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly retryIf: [];
                                                        readonly onRetry: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly algorithms: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                                        readonly _tag: "constant";
                                                        readonly jitter: 1000;
                                                        readonly interval: 2000;
                                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly parse: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                                    };
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly raw: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxRestarts: 3;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly strategies: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                        };
                                        readonly cast: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly apiMap: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                    }, symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    }>) => Promise<void>;
                                }];
                                after: [];
                                onResult: [];
                                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                onError: [];
                            };
                            parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            query: [];
                            hash: "";
                            headers: {};
                            extra: {};
                        };
                        apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }>, "setResult" | "throwError" | "proceedRestart" | "cancelRestart">) => Promise<vigor_fetch.VigorFetchContextSchema<{
                        policy: {
                            path: [];
                            origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            middlewares: {
                                before: [{
                                    _mode: "fluent";
                                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                                        readonly policy: {
                                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                                            readonly method: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly origin: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly path: [];
                                            readonly query: [];
                                            readonly hash: "";
                                            readonly headers: {};
                                            readonly body: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly extra: {};
                                            readonly settings: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                                readonly debug: false;
                                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                                readonly maxRetryAfter: number;
                                                readonly redirect: false;
                                                readonly confinePath: true;
                                                readonly maxRestarts: 3;
                                                readonly default: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly middlewares: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                                readonly before: [];
                                                readonly after: [];
                                                readonly onResult: [];
                                                readonly onError: [];
                                            };
                                            readonly retry: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                    };
                                                    readonly abortSignals: [];
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxAttempts: 5;
                                                        readonly maxRestarts: 3;
                                                        readonly timeout: 20000;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly retryIf: [];
                                                        readonly onRetry: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly algorithms: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                                        readonly _tag: "constant";
                                                        readonly jitter: 1000;
                                                        readonly interval: 2000;
                                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly parse: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                                    };
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly raw: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxRestarts: 3;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly strategies: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                        };
                                        readonly cast: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly apiMap: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                    }, symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    }>) => Promise<void>;
                                }];
                                after: [];
                                onResult: [];
                                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                onError: [];
                            };
                            parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            query: [];
                            hash: "";
                            headers: {};
                            extra: {};
                        };
                        apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }, unknown>>;
                }];
            };
            parse: {
                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                readonly policy: {
                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                    readonly target: symbol & {
                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                    };
                    readonly settings: {
                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                        readonly debug: false;
                        readonly raw: false;
                        readonly default: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        readonly maxRestarts: 3;
                    };
                    readonly middlewares: {
                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                        readonly before: [];
                        readonly after: [];
                        readonly onResult: [];
                        readonly onError: [];
                    };
                    readonly strategies: {
                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                    };
                };
                readonly cast: symbol & {
                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                };
            };
            settings: {
                default: symbol & {
                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                };
                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                redirect: false;
                debug: false;
                retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                unretryStatus: number[];
                maxRetryAfter: number;
                confinePath: true;
                maxRestarts: 3;
            };
            method: symbol & {
                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
            };
            retry: {
                policy: {
                    target: symbol & {
                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                    };
                    middlewares: {
                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                        readonly before: [];
                        readonly after: [];
                        readonly onResult: [];
                        readonly retryIf: [];
                        readonly onRetry: [];
                        readonly onError: [];
                    };
                    settings: {
                        default: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                        debug: false;
                        maxRestarts: 3;
                        maxAttempts: number;
                        timeout: number;
                    };
                    __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                    abortSignals: [];
                    algorithms: {
                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                        readonly _tag: "constant";
                        readonly jitter: 1000;
                        readonly interval: 2000;
                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                    };
                };
                __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                cast: symbol & {
                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                };
            };
            __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
            query: [];
            hash: "";
            headers: {};
            extra: {
                readonly credentials: "include";
            } | {
                readonly credentials?: undefined;
            };
        };
        apiMap: symbol & {
            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
        };
        __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
        cast: symbol & {
            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
        };
    }>>;
}

/** `.ttl({ groups: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
type RobloxGroupsCacheable = "getGroups" | "getGroupDetails" | "getRoles" | "getRolesByIds" | "getUserGroups";
/** groups.roblox.com */
declare class RobloxGroupsApi {
    private readonly config;
    private readonly thumbnails;
    private readonly users;
    private readonly http;
    /** 요청 계정 → 내 id. 같은 계정이면 한 번만 묻는다 */
    private readonly me;
    private readonly groups;
    private readonly details;
    private readonly roles;
    private readonly roleDetails;
    private readonly userGroups;
    private readonly primaryGroups;
    private readonly guestPermissions;
    private readonly rolePermissions;
    private readonly userPermissions;
    private readonly featureFreezes;
    private readonly featuredEvents;
    private readonly socialLinks;
    private readonly emotes;
    private readonly memberships;
    private readonly policies;
    private readonly settings;
    private readonly configurations;
    private readonly features;
    private readonly featuresBlocked;
    private readonly payouts;
    private readonly payoutRestrictions;
    private readonly joinRequests;
    private readonly bans;
    constructor(config: RobloxConfig, thumbnails: RobloxThumbnailsApi, users: RobloxUsersApi);
    private ttl;
    /** 요청 계정의 id. 계정이 정해져 있지 않으면 에러 (requireViewer) */
    private myId;
    /** 항목 하나씩 캐시하며 batcher로 보낸다 */
    private each;
    /** 대상마다 batcher로 보내고 없는 대상은 뺀다 */
    private many;
    /** 그룹들에 아이콘을 붙인다 */
    private attach;
    /**
     * GET /v2/groups — 이름, 설명, 주인 id, 만든 날짜. 100개씩 묶어서 보낸다 (1회/초).
     * 멤버 수와 주인 이름이 필요하면 `getGroupDetails`를 쓴다. `thumbnail`을 주면 그룹 아이콘을 같이 받는다.
     */
    getGroups(groupIds: readonly RobloxGroupId[], opts: {
        thumbnail: true | RobloxGroupIconOptions;
    }): Promise<RobloxWithThumbnail<RobloxGroup>[]>;
    getGroups(groupIds: readonly RobloxGroupId[], opts?: {
        thumbnail?: undefined;
    }): Promise<RobloxGroup[]>;
    /**
     * GET /v1/groups/{groupId} — 멤버 수, 주인 이름, 샤우트, 가입 방식까지. 그룹 하나당 요청 하나이고 한도가 7회/분뿐이다.
     * `thumbnail`을 주면 그룹 아이콘을 같이 받는다.
     */
    getGroupDetails(groupIds: readonly RobloxGroupId[], opts: {
        thumbnail: true | RobloxGroupIconOptions;
    }): Promise<RobloxWithThumbnail<RobloxGroupDetail>[]>;
    getGroupDetails(groupIds: readonly RobloxGroupId[], opts?: {
        thumbnail?: undefined;
    }): Promise<RobloxGroupDetail[]>;
    /** GET /v1/groups/{groupId}/roles — 그룹의 역할 목록 (멤버 수 포함, 낮은 rank부터) */
    getRoles(groupIds: readonly RobloxGroupId[]): Promise<{
        groupId: RobloxGroupId;
        roles: RobloxGroupRole[];
    }[]>;
    /** GET /v1/roles — 역할 id로 역할과 그 역할의 그룹. 100개씩 묶어서 보낸다 (60회/분) */
    getRolesByIds(roleIds: readonly RobloxGroupRoleId[]): Promise<RobloxGroupRoleDetail[]>;
    /** 유저들이 속한 그룹과 역할. /v1과 /v2의 users/{userId}/groups/roles를 나눠 쓴다 */
    getUserGroups(userIds: readonly RobloxUserId[]): Promise<RobloxUserGroups[]>;
    /** GET /v1/users/{userId}/groups/primary/role — 대표 그룹. 대표 그룹이 없는 유저는 뺀다 */
    getPrimaryGroups(userIds: readonly RobloxUserId[]): Promise<RobloxPrimaryGroup[]>;
    /** GET /v1/groups/{groupId}/users — 멤버와 역할 */
    getMembers(groupId: RobloxGroupId, query?: RobloxGroupPageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            user: {
                userId: number & z.core.$brand<"RobloxUserId">;
                username: string;
                displayName: string;
                hasVerifiedBadge: boolean;
            };
            role: {
                id: number & z.core.$brand<"RobloxGroupRoleId">;
                name: string;
                rank: number;
                description?: string | null | undefined;
                memberCount?: number | null | undefined;
                isBase?: boolean | null | undefined;
                color?: number | null | undefined;
                isPrivate?: boolean | null | undefined;
            };
        }[];
    }>;
    /** GET /v1/groups/{groupId}/roles/{roleSetId}/users — 역할 하나의 멤버 */
    getRoleMembers(groupId: RobloxGroupId, roleId: RobloxGroupRoleId, query?: RobloxGroupPageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            userId: number & z.core.$brand<"RobloxUserId">;
            username: string;
            displayName: string;
            hasVerifiedBadge: boolean;
        }[];
    }>;
    /** GET /v1/groups/search — 키워드 검색. totalResults는 1000에서 멈춘다 */
    searchGroups(query: RobloxGroupSearchQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxGroupId">;
            name: string;
            description: string;
            memberCount: number;
            publicEntryAllowed: boolean;
            created: string;
            updated: string;
            hasVerifiedBadge: boolean;
            previousName?: string | null | undefined;
        }[];
        keyword: string;
        totalResults: number;
    }>;
    /** GET /v1/groups/search/lookup — 이름으로 찾는다. 정확히 맞는 그룹이 있으면 맨 앞에 온다 */
    lookupGroups(groupName: string): Promise<{
        id: number & z.core.$brand<"RobloxGroupId">;
        name: string;
        memberCount: number;
        hasVerifiedBadge: boolean;
    }[]>;
    /** GET /v1/groups/{groupId}/name-history */
    getNameHistory(groupId: RobloxGroupId, query?: RobloxGroupPageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            name: string;
            created: string;
        }[];
    }>;
    /** GET /v1/groups/{groupId}/relationships/{allies|enemies} — 동맹/적 그룹 */
    getRelationships(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, query?: RobloxGroupRelationshipsQuery): Promise<{
        groupId: number & z.core.$brand<"RobloxGroupId">;
        relationshipType: string;
        totalGroupCount: number;
        relatedGroups: {
            id: number & z.core.$brand<"RobloxGroupId">;
            name: string;
            description: string;
            owner: {
                userId: number & z.core.$brand<"RobloxUserId">;
                username: string;
                displayName: string;
                hasVerifiedBadge: boolean;
            } | null;
            shout: {
                body: string;
                poster: {
                    userId: number & z.core.$brand<"RobloxUserId">;
                    username: string;
                    displayName: string;
                    hasVerifiedBadge: boolean;
                } | null;
                created: string;
                updated: string;
            } | null;
            isBuildersClubOnly: boolean;
            publicEntryAllowed: boolean;
            hasVerifiedBadge: boolean;
            isLocked?: boolean | null | undefined;
            isDeactivated?: boolean | null | undefined;
            hasSocialModules?: boolean | null | undefined;
            communityTier?: {
                groupId: number & z.core.$brand<"RobloxGroupId">;
                currentTier: number | null;
                previousTier: number | null;
                tierUpdatedTime: string | null;
                lastEvaluatedTime: string | null;
                requirements?: {
                    key: number;
                    satisfied: boolean;
                }[] | null | undefined;
                capabilities?: {
                    isEligibleForUnrestrictedMessages: boolean;
                } | null | undefined;
            } | null | undefined;
            memberCount?: number | null | undefined;
        }[];
        nextRowIndex: number | null;
    }>;
    /** GET /v1/groups/{groupId}/roles/guest/permissions — 멤버가 아닌 사람이 할 수 있는 것 (30회/분) */
    getGuestPermissions(groupIds: readonly RobloxGroupId[]): Promise<RobloxGroupRolePermissions[]>;
    /** GET /v1/groups/{groupId}/community-feature-freezes — 포럼 등 기능이 멈춰 있는지 */
    getFeatureFreezes(groupIds: readonly RobloxGroupId[]): Promise<{
        groupId: RobloxGroupId;
        features: RobloxGroupFeatureFreeze[];
    }[]>;
    /** GET /v1/featured-content/event — 그룹이 내건 이벤트. 없는 그룹은 뺀다 */
    getFeaturedEvents(groupIds: readonly RobloxGroupId[]): Promise<RobloxGroupFeaturedEvent[]>;
    /** GET /v1/groups/metadata — 그룹 수 한도 등. 인증하면 요청 계정의 가입 수가 들어간다 */
    getMetadata(): Promise<{
        groupLimit: number;
        currentGroupCount: number;
        groupStatusMaxLength: number;
        areProfileGroupsHidden?: boolean | null | undefined;
        isGroupDetailsPolicyEnabled?: boolean | null | undefined;
        showPreviousGroupNames?: boolean | null | undefined;
        areGroupBansEnabled?: boolean | null | undefined;
        canEnableGroupNotifications?: boolean | null | undefined;
    }>;
    /** GET /v1/groups/configuration/metadata — 이름 길이, 생성/개명 비용 등 */
    getConfigurationMetadata(): Promise<{
        groupConfiguration: {
            [x: string]: unknown;
            nameMaxLength: number;
            descriptionMaxLength: number;
            iconMaxFileSizeMb: number;
            cost: number;
            coverPhotoMaxFileSizeMb?: number | null | undefined;
            validCoverPhotoDimensions?: string | null | undefined;
        };
        recurringPayoutsConfiguration?: {
            maxPayoutPartners: number;
        } | null | undefined;
        roleConfiguration?: {
            nameMaxLength: number;
            descriptionMaxLength: number;
            limit: number;
            cost: number;
            minRank: number;
            maxRank: number;
        } | null | undefined;
        groupNameChangeConfiguration?: {
            cost: number;
            cooldownInDays: number;
            ownershipCooldownInDays: number;
        } | null | undefined;
        isPremiumPayoutsEnabled?: boolean | null | undefined;
        isDefaultEmblemPolicyEnabled?: boolean | null | undefined;
    }>;
    /** GET /v1/groups/search/metadata — 추천 검색어 */
    getSearchMetadata(): Promise<{
        SuggestedGroupKeywords: string[];
        ShowFriendsGroupsSort: boolean;
    }>;
    /** GET /v1/groups/{groupId}/membership — 내 역할, 권한, 가입 대기 여부, 알림 설정 */
    getMemberships(groupIds: readonly RobloxGroupId[]): Promise<RobloxGroupMembership[]>;
    /** POST /v1/groups/policies — 내 계정으로 그룹을 볼 수 있는지 (지역 정책) */
    getPolicies(groupIds: readonly RobloxGroupId[]): Promise<{
        groupId: RobloxGroupId;
        canViewGroup: boolean;
    }[]>;
    /** GET /v1/groups/{groupId}/social-links */
    getSocialLinks(groupIds: readonly RobloxGroupId[]): Promise<{
        groupId: RobloxGroupId;
        links: RobloxGroupSocialLink[];
    }[]>;
    /** GET /v1/groups/{groupId}/emotes — 포럼 이모트 */
    getEmotes(groupIds: readonly RobloxGroupId[]): Promise<{
        groupId: RobloxGroupId;
        emoteSets: RobloxGroupEmoteSet[];
    }[]>;
    /** GET /v1/user/groups/pending — 가입을 요청해 둔 그룹 */
    getPendingGroups(): Promise<RobloxGroupDetailPartial[]>;
    /** GET /v1/users/{me}/friends/groups/roles — 내 친구들이 속한 그룹. 다른 유저로는 403이다 */
    getFriendsGroups(): Promise<{
        user: {
            userId: number & z.core.$brand<"RobloxUserId">;
            username: string;
            displayName: string;
            hasVerifiedBadge: boolean;
        };
        groups: {
            group: {
                id: number & z.core.$brand<"RobloxGroupId">;
                name: string;
                description: string;
                owner: {
                    userId: number & z.core.$brand<"RobloxUserId">;
                    username: string;
                    displayName: string;
                    hasVerifiedBadge: boolean;
                } | null;
                shout: {
                    body: string;
                    poster: {
                        userId: number & z.core.$brand<"RobloxUserId">;
                        username: string;
                        displayName: string;
                        hasVerifiedBadge: boolean;
                    } | null;
                    created: string;
                    updated: string;
                } | null;
                isBuildersClubOnly: boolean;
                publicEntryAllowed: boolean;
                hasVerifiedBadge: boolean;
                isLocked?: boolean | null | undefined;
                isDeactivated?: boolean | null | undefined;
                hasSocialModules?: boolean | null | undefined;
                communityTier?: {
                    groupId: number & z.core.$brand<"RobloxGroupId">;
                    currentTier: number | null;
                    previousTier: number | null;
                    tierUpdatedTime: string | null;
                    lastEvaluatedTime: string | null;
                    requirements?: {
                        key: number;
                        satisfied: boolean;
                    }[] | null | undefined;
                    capabilities?: {
                        isEligibleForUnrestrictedMessages: boolean;
                    } | null | undefined;
                } | null | undefined;
                memberCount?: number | null | undefined;
            };
            role: {
                id: number & z.core.$brand<"RobloxGroupRoleId">;
                name: string;
                rank: number;
                description?: string | null | undefined;
                memberCount?: number | null | undefined;
                isBase?: boolean | null | undefined;
                color?: number | null | undefined;
                isPrivate?: boolean | null | undefined;
            };
            isPrimaryGroup?: boolean | null | undefined;
        }[];
    }[]>;
    /** POST /v1/groups/{groupId}/users — 가입한다. 승인제 그룹이면 가입 요청이 된다. 캡차를 요구할 수 있다 */
    joinGroup(groupId: RobloxGroupId, request?: RobloxJoinGroupRequest): Promise<void>;
    /** DELETE /v1/groups/{groupId}/users/{me} — 탈퇴한다. 가입 요청 중이면 그 요청을 취소한다 */
    leaveGroup(groupId: RobloxGroupId): Promise<void>;
    /** POST /v1/user/groups/primary */
    setPrimaryGroup(groupId: RobloxGroupId): Promise<void>;
    /** DELETE /v1/user/groups/primary */
    removePrimaryGroup(): Promise<void>;
    /** PATCH /v1/groups/{groupId}/notification-preference — 알림 종류 하나를 켜고 끈다 */
    setNotificationPreference(groupId: RobloxGroupId, request: {
        type: string | number;
        notificationsEnabled: boolean;
    }): Promise<void>;
    /**
     * POST /v1/groups/create — 그룹을 만든다. 비용(Robux)은 `getConfigurationMetadata()`의 `groupConfiguration.cost`.
     * 아이콘과 함께 multipart로 보낸다.
     */
    createGroup(request: RobloxCreateGroupRequest): Promise<{
        id: number & z.core.$brand<"RobloxGroupId">;
        name: string;
        description: string;
        owner: ({
            type: "User";
            id: RobloxUserId;
        } & Omit<Record<string, never>, "type" | "id">) | ({
            type: "Group";
            id: RobloxGroupId;
        } & Omit<Record<string, never>, "type" | "id">) | ({
            type: "Unknown";
            id: number;
            rawType: string | number;
        } & Omit<Record<string, never>, "type" | "id">) | null;
        created: string;
        hasVerifiedBadge: boolean;
        memberCount?: number | null | undefined;
    }>;
    /** 역할들의 권한. 주인이면 모든 역할을 한 번에(/roles/permissions), 아니면 역할 하나씩 받는다 */
    getRolePermissions(groupId: RobloxGroupId, roleIds: readonly RobloxGroupRoleId[]): Promise<RobloxGroupRolePermissions[]>;
    /** PATCH /v1/groups/{groupId}/roles/{roleSetId}/permissions — `{ "ViewWall": true }`처럼 권한 이름 → 값 */
    updateRolePermissions(groupId: RobloxGroupId, roleId: RobloxGroupRoleId, permissions: Record<string, boolean>): Promise<void>;
    /** GET /v1/groups/{groupId}/users/{userId}/permissions — 주인과 권한 관리자만 볼 수 있다 */
    getUserPermissions(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<(RobloxGroupRolePermissions & {
        userId: RobloxUserId;
    })[]>;
    /** POST /v1/groups/{groupId}/rolesets/create */
    createRole(groupId: RobloxGroupId, request: RobloxCreateGroupRoleRequest): Promise<{
        id: number & z.core.$brand<"RobloxGroupRoleId">;
        name: string;
        rank: number;
        description?: string | null | undefined;
        memberCount?: number | null | undefined;
        isBase?: boolean | null | undefined;
        color?: number | null | undefined;
        isPrivate?: boolean | null | undefined;
    }>;
    /** PATCH /v1/groups/{groupId}/rolesets/{rolesetId} */
    updateRole(groupId: RobloxGroupId, roleId: RobloxGroupRoleId, request: RobloxUpdateGroupRoleRequest): Promise<{
        id: number & z.core.$brand<"RobloxGroupRoleId">;
        name: string;
        rank: number;
        description?: string | null | undefined;
        memberCount?: number | null | undefined;
        isBase?: boolean | null | undefined;
        color?: number | null | undefined;
        isPrivate?: boolean | null | undefined;
    }>;
    /** DELETE /v1/groups/{groupId}/rolesets/{rolesetId} — 멤버가 있는 역할은 지울 수 없다 (409) */
    deleteRole(groupId: RobloxGroupId, roleId: RobloxGroupRoleId): Promise<void>;
    /** PATCH /v1/groups/{groupId}/users/{userId} — 멤버의 역할을 바꾼다 */
    setMemberRole(groupId: RobloxGroupId, userId: RobloxUserId, roleId: RobloxGroupRoleId): Promise<void>;
    /** DELETE /v1/groups/{groupId}/users/{userId} — 멤버를 내보낸다 */
    removeMember(groupId: RobloxGroupId, userId: RobloxUserId): Promise<void>;
    /** GET /v1/groups/{groupId}/join-requests — 가입 요청 목록 */
    getJoinRequests(groupId: RobloxGroupId, query?: RobloxGroupPageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            requester: {
                userId: number & z.core.$brand<"RobloxUserId">;
                username: string;
                displayName: string;
                hasVerifiedBadge: boolean;
            };
            created: string;
        }[];
    }>;
    /** GET /v1/groups/{groupId}/join-requests/users/{userId} — 이 유저들의 가입 요청. 요청이 없는 유저는 뺀다 */
    getJoinRequestsByUsers(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<RobloxGroupJoinRequest[]>;
    /** 가입 요청을 받아들인다. 한 명이면 /users/{userId}, 여러 명이면 묶음 엔드포인트로 보낸다 */
    acceptJoinRequests(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<void>;
    /** 가입 요청을 거절한다. 한 명이면 /users/{userId}, 여러 명이면 묶음 엔드포인트로 보낸다 */
    declineJoinRequests(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<void>;
    /** 하나면 single, 여럿이면 묶음 엔드포인트로 나눠 보낸다 */
    private batchWrite;
    /** GET /v1/groups/{groupId}/bans */
    getBans(groupId: RobloxGroupId, query?: RobloxGroupPageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            user: {
                userId: number & z.core.$brand<"RobloxUserId">;
                username: string;
                displayName: string;
                hasVerifiedBadge: boolean;
            };
            created: string;
            actingUser?: {
                user: {
                    userId: number & z.core.$brand<"RobloxUserId">;
                    username: string;
                    displayName: string;
                    hasVerifiedBadge: boolean;
                };
                role: {
                    id: number & z.core.$brand<"RobloxGroupRoleId">;
                    name: string;
                    rank: number;
                    description?: string | null | undefined;
                    memberCount?: number | null | undefined;
                    isBase?: boolean | null | undefined;
                    color?: number | null | undefined;
                    isPrivate?: boolean | null | undefined;
                };
            } | null | undefined;
        }[];
    }>;
    /** GET /v1/groups/{groupId}/bans/{userId} — 이 유저들의 차단 정보. 차단되지 않은 유저는 뺀다 */
    getBannedUsers(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<RobloxGroupBan[]>;
    /** POST /v1/groups/{groupId}/bans/{userId} */
    banUser(groupId: RobloxGroupId, userId: RobloxUserId): Promise<{
        user: {
            userId: number & z.core.$brand<"RobloxUserId">;
            username: string;
            displayName: string;
            hasVerifiedBadge: boolean;
        };
        created: string;
        actingUser?: {
            user: {
                userId: number & z.core.$brand<"RobloxUserId">;
                username: string;
                displayName: string;
                hasVerifiedBadge: boolean;
            };
            role: {
                id: number & z.core.$brand<"RobloxGroupRoleId">;
                name: string;
                rank: number;
                description?: string | null | undefined;
                memberCount?: number | null | undefined;
                isBase?: boolean | null | undefined;
                color?: number | null | undefined;
                isPrivate?: boolean | null | undefined;
            };
        } | null | undefined;
    }>;
    /** DELETE /v1/groups/{groupId}/bans/{userId} */
    unbanUser(groupId: RobloxGroupId, userId: RobloxUserId): Promise<void>;
    /** GET /v1/groups/{groupId}/audit-log */
    getAuditLog(groupId: RobloxGroupId, query?: RobloxGroupAuditLogQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            actor: {
                user: {
                    userId: number & z.core.$brand<"RobloxUserId">;
                    username: string;
                    displayName: string;
                    hasVerifiedBadge: boolean;
                };
                role: {
                    id: number & z.core.$brand<"RobloxGroupRoleId">;
                    name: string;
                    rank: number;
                    description?: string | null | undefined;
                    memberCount?: number | null | undefined;
                    isBase?: boolean | null | undefined;
                    color?: number | null | undefined;
                    isPrivate?: boolean | null | undefined;
                };
            };
            actionType: string;
            description: unknown;
            created: string;
        }[];
    }>;
    /** GET /v1/groups/{groupId}/settings */
    getSettings(groupIds: readonly RobloxGroupId[]): Promise<(RobloxGroupSettings & {
        groupId: RobloxGroupId;
    })[]>;
    /** PATCH /v1/groups/{groupId}/settings — 넣은 항목만 바꾼다 */
    updateSettings(groupId: RobloxGroupId, request: RobloxUpdateGroupSettingsRequest): Promise<void>;
    /** GET /v1/groups/{groupId}/configuration — 엠블럼/커버 사진 asset id */
    getConfigurations(groupIds: readonly RobloxGroupId[]): Promise<RobloxGroupConfiguration[]>;
    /** GET /v1/groups/{groupId}/features — 기능별 차단 상태와 잠금 여부 */
    getFeatures(groupIds: readonly RobloxGroupId[]): Promise<(RobloxGroupFeatures & {
        groupId: RobloxGroupId;
    })[]>;
    /** GET /v1/groups/{groupId}/features/status — 막힌 기능이 하나라도 있는지 */
    getFeaturesBlocked(groupIds: readonly RobloxGroupId[]): Promise<{
        groupId: RobloxGroupId;
        hasFeaturesBlocked: boolean;
    }[]>;
    /** PATCH /v1/groups/{groupId}/features — 지금은 걸려 있는 차단을 푸는 것만 된다. 바뀌었으면 true */
    updateFeatures(groupId: RobloxGroupId, features: Record<string, boolean>): Promise<boolean>;
    /** PATCH /v1/groups/{groupId}/name — 비용과 대기 기간은 `getConfigurationMetadata()`의 groupNameChangeConfiguration */
    setName(groupId: RobloxGroupId, name: string): Promise<string>;
    /** PATCH /v1/groups/{groupId}/description — 필터링된 뒤의 설명을 돌려준다 */
    setDescription(groupId: RobloxGroupId, description: string): Promise<string>;
    /** PATCH /v1/groups/{groupId}/status — 샤우트. 빈 문자열이면 지운다 */
    setShout(groupId: RobloxGroupId, message: string): Promise<vigor_fetch.VigorFetchResult<{
        policy: {
            path: ["v1", "groups", `${number & z.core.$brand<"RobloxGroupId">}`, "status"];
            origin: string;
            body: {
                readonly message: string;
            };
            middlewares: {
                before: [{
                    _mode: "fluent";
                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        readonly policy: {
                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            readonly method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly path: [];
                            readonly query: [];
                            readonly hash: "";
                            readonly headers: {};
                            readonly body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly extra: {};
                            readonly settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly middlewares: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                readonly before: [];
                                readonly after: [];
                                readonly onResult: [];
                                readonly onError: [];
                            };
                            readonly retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                        };
                        readonly cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        readonly apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }, symbol & {
                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                    }>) => Promise<void>;
                }];
                after: [{
                    _mode: "intercept";
                    func: (ctx: vigor_fetch.VigorContextReset<vigor_fetch.VigorFetchContextSchema<{
                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        readonly policy: {
                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            readonly method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly path: [];
                            readonly query: [];
                            readonly hash: "";
                            readonly headers: {};
                            readonly body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly extra: {};
                            readonly settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly middlewares: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                readonly before: [];
                                readonly after: [];
                                readonly onResult: [];
                                readonly onError: [];
                            };
                            readonly retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                        };
                        readonly cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        readonly apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }, symbol & {
                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                    }>, {
                        result: unknown;
                        response: Response;
                    }>, api: Pick<vigor_fetch.VigorFetchPolicyMiddlewaresApi<{
                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        readonly policy: {
                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            readonly method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly path: [];
                            readonly query: [];
                            readonly hash: "";
                            readonly headers: {};
                            readonly body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly extra: {};
                            readonly settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly middlewares: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                readonly before: [];
                                readonly after: [];
                                readonly onResult: [];
                                readonly onError: [];
                            };
                            readonly retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                        };
                        readonly cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        readonly apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }>, "setResult" | "throwError">) => {
                        result: {
                            body: string;
                            poster: {
                                userId: number & z.core.$brand<"RobloxUserId">;
                                username: string;
                                displayName: string;
                                hasVerifiedBadge: boolean;
                            } | null;
                            created: string;
                            updated: string;
                        } | null;
                        error: unknown;
                        record: Record<string, any>;
                        options: (symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                        }) | vigor_fetch.VigorFetchOptions;
                        policy: {
                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            readonly method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly path: [];
                            readonly query: [];
                            readonly hash: "";
                            readonly headers: {};
                            readonly body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            readonly extra: {};
                            readonly settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly middlewares: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                readonly before: [];
                                readonly after: [];
                                readonly onResult: [];
                                readonly onError: [];
                            };
                            readonly retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            readonly parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                        };
                        response: Response;
                        __brand: vigor_fetch.VigorBrand<"Fetch", "Context<Schema">;
                        flags: {
                            overridden: boolean;
                            restarted: boolean;
                        };
                        timeline: vigor_fetch.VigorFetchTimeline;
                        href: string;
                    };
                }];
                onResult: [];
                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                onError: [{
                    _mode: "intercept";
                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                        policy: {
                            path: [];
                            origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            middlewares: {
                                before: [{
                                    _mode: "fluent";
                                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                                        readonly policy: {
                                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                                            readonly method: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly origin: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly path: [];
                                            readonly query: [];
                                            readonly hash: "";
                                            readonly headers: {};
                                            readonly body: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly extra: {};
                                            readonly settings: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                                readonly debug: false;
                                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                                readonly maxRetryAfter: number;
                                                readonly redirect: false;
                                                readonly confinePath: true;
                                                readonly maxRestarts: 3;
                                                readonly default: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly middlewares: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                                readonly before: [];
                                                readonly after: [];
                                                readonly onResult: [];
                                                readonly onError: [];
                                            };
                                            readonly retry: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                    };
                                                    readonly abortSignals: [];
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxAttempts: 5;
                                                        readonly maxRestarts: 3;
                                                        readonly timeout: 20000;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly retryIf: [];
                                                        readonly onRetry: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly algorithms: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                                        readonly _tag: "constant";
                                                        readonly jitter: 1000;
                                                        readonly interval: 2000;
                                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly parse: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                                    };
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly raw: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxRestarts: 3;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly strategies: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                        };
                                        readonly cast: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly apiMap: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                    }, symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    }>) => Promise<void>;
                                }];
                                after: [];
                                onResult: [];
                                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                onError: [];
                            };
                            parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            query: [];
                            hash: "";
                            headers: {};
                            extra: {};
                        };
                        apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }, unknown>, api: Pick<vigor_fetch.VigorFetchPolicyMiddlewaresApi<{
                        policy: {
                            path: [];
                            origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            middlewares: {
                                before: [{
                                    _mode: "fluent";
                                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                                        readonly policy: {
                                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                                            readonly method: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly origin: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly path: [];
                                            readonly query: [];
                                            readonly hash: "";
                                            readonly headers: {};
                                            readonly body: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly extra: {};
                                            readonly settings: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                                readonly debug: false;
                                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                                readonly maxRetryAfter: number;
                                                readonly redirect: false;
                                                readonly confinePath: true;
                                                readonly maxRestarts: 3;
                                                readonly default: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly middlewares: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                                readonly before: [];
                                                readonly after: [];
                                                readonly onResult: [];
                                                readonly onError: [];
                                            };
                                            readonly retry: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                    };
                                                    readonly abortSignals: [];
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxAttempts: 5;
                                                        readonly maxRestarts: 3;
                                                        readonly timeout: 20000;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly retryIf: [];
                                                        readonly onRetry: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly algorithms: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                                        readonly _tag: "constant";
                                                        readonly jitter: 1000;
                                                        readonly interval: 2000;
                                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly parse: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                                    };
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly raw: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxRestarts: 3;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly strategies: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                        };
                                        readonly cast: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly apiMap: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                    }, symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    }>) => Promise<void>;
                                }];
                                after: [];
                                onResult: [];
                                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                onError: [];
                            };
                            parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            query: [];
                            hash: "";
                            headers: {};
                            extra: {};
                        };
                        apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }>, "setResult" | "throwError" | "proceedRestart" | "cancelRestart">) => Promise<vigor_fetch.VigorFetchContextSchema<{
                        policy: {
                            path: [];
                            origin: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            body: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            middlewares: {
                                before: [{
                                    _mode: "fluent";
                                    func: (ctx: vigor_fetch.VigorFetchContextSchema<{
                                        readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                                        readonly policy: {
                                            readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                                            readonly method: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly origin: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly path: [];
                                            readonly query: [];
                                            readonly hash: "";
                                            readonly headers: {};
                                            readonly body: symbol & {
                                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                            };
                                            readonly extra: {};
                                            readonly settings: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                                readonly debug: false;
                                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                                readonly maxRetryAfter: number;
                                                readonly redirect: false;
                                                readonly confinePath: true;
                                                readonly maxRestarts: 3;
                                                readonly default: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly middlewares: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                                readonly before: [];
                                                readonly after: [];
                                                readonly onResult: [];
                                                readonly onError: [];
                                            };
                                            readonly retry: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                    };
                                                    readonly abortSignals: [];
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxAttempts: 5;
                                                        readonly maxRestarts: 3;
                                                        readonly timeout: 20000;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly retryIf: [];
                                                        readonly onRetry: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly algorithms: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                                        readonly _tag: "constant";
                                                        readonly jitter: 1000;
                                                        readonly interval: 2000;
                                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                            readonly parse: {
                                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                                readonly policy: {
                                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                                    readonly target: symbol & {
                                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                                    };
                                                    readonly settings: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                                        readonly debug: false;
                                                        readonly raw: false;
                                                        readonly default: symbol & {
                                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                        };
                                                        readonly maxRestarts: 3;
                                                    };
                                                    readonly middlewares: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                                        readonly before: [];
                                                        readonly after: [];
                                                        readonly onResult: [];
                                                        readonly onError: [];
                                                    };
                                                    readonly strategies: {
                                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                                    };
                                                };
                                                readonly cast: symbol & {
                                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                                };
                                            };
                                        };
                                        readonly cast: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly apiMap: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                    }, symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    }>) => Promise<void>;
                                }];
                                after: [];
                                onResult: [];
                                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Middlewares<Schema">;
                                onError: [];
                            };
                            parse: {
                                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                                    };
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly raw: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxRestarts: 3;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly onError: [];
                                    };
                                    readonly strategies: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            settings: {
                                readonly __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                                readonly debug: false;
                                readonly retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                                readonly unretryStatus: [400, 401, 402, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 422, 424, 426, 428, 431, 451, 501, 505, 506, 508, 510, 511];
                                readonly maxRetryAfter: number;
                                readonly redirect: false;
                                readonly confinePath: true;
                                readonly maxRestarts: 3;
                                readonly default: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            method: symbol & {
                                __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                            };
                            retry: {
                                readonly __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                                readonly policy: {
                                    readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                                    readonly target: symbol & {
                                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                    };
                                    readonly abortSignals: [];
                                    readonly settings: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                                        readonly debug: false;
                                        readonly default: symbol & {
                                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                        };
                                        readonly maxAttempts: 5;
                                        readonly maxRestarts: 3;
                                        readonly timeout: 20000;
                                    };
                                    readonly middlewares: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                                        readonly before: [];
                                        readonly after: [];
                                        readonly onResult: [];
                                        readonly retryIf: [];
                                        readonly onRetry: [];
                                        readonly onError: [];
                                    };
                                    readonly algorithms: {
                                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                                        readonly _tag: "constant";
                                        readonly jitter: 1000;
                                        readonly interval: 2000;
                                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                                    };
                                };
                                readonly cast: symbol & {
                                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                                };
                            };
                            __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
                            query: [];
                            hash: "";
                            headers: {};
                            extra: {};
                        };
                        apiMap: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
                        cast: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                    }, unknown>>;
                }];
            };
            parse: {
                readonly __brand: vigor_fetch.VigorBrand<"Parse", "Schema">;
                readonly policy: {
                    readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Schema">;
                    readonly target: symbol & {
                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Default">;
                    };
                    readonly settings: {
                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Settings<Schema">;
                        readonly debug: false;
                        readonly raw: false;
                        readonly default: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        readonly maxRestarts: 3;
                    };
                    readonly middlewares: {
                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Middlewares<Schema">;
                        readonly before: [];
                        readonly after: [];
                        readonly onResult: [];
                        readonly onError: [];
                    };
                    readonly strategies: {
                        readonly __brand: vigor_fetch.VigorBrand<"Parse", "Policy<Strategies<Schema">;
                        readonly funcs: vigor_fetch.VigorParseStrategyFunc[];
                    };
                };
                readonly cast: symbol & {
                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                };
            };
            settings: {
                default: symbol & {
                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                };
                __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Settings<Schema">;
                redirect: false;
                debug: false;
                retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after"];
                unretryStatus: number[];
                maxRetryAfter: number;
                confinePath: true;
                maxRestarts: 3;
            };
            method: "PATCH";
            retry: {
                policy: {
                    target: symbol & {
                        __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                    };
                    middlewares: {
                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Middlewares<Schema">;
                        readonly before: [];
                        readonly after: [];
                        readonly onResult: [];
                        readonly retryIf: [];
                        readonly onRetry: [];
                        readonly onError: [];
                    };
                    settings: {
                        default: symbol & {
                            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                        };
                        __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Settings<Schema">;
                        debug: false;
                        maxRestarts: 3;
                        maxAttempts: number;
                        timeout: number;
                    };
                    __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Schema">;
                    abortSignals: [];
                    algorithms: {
                        readonly __brand: vigor_fetch.VigorBrand<"Retry", "Policy<Algorithms<Constant<Schema">;
                        readonly _tag: "constant";
                        readonly jitter: 1000;
                        readonly interval: 2000;
                        readonly _calculateDelay: (att: number, config: vigor_fetch.VigorRetryPolicyAlgorithmsConstantSchema<any>) => number;
                    };
                };
                __brand: vigor_fetch.VigorBrand<"Retry", "Schema">;
                cast: symbol & {
                    __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
                };
            };
            __brand: vigor_fetch.VigorBrand<"Fetch", "Policy<Schema">;
            query: [];
            hash: "";
            headers: {};
            extra: {
                readonly credentials: "include";
            } | {
                readonly credentials?: undefined;
            };
        };
        apiMap: symbol & {
            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
        };
        __brand: vigor_fetch.VigorBrand<"Fetch", "Schema">;
        cast: symbol & {
            __brand: vigor_fetch.VigorBrand<"Core", "Symbol_Empty">;
        };
    }>>;
    /** PATCH /v1/groups/icon — 아이콘을 multipart로 올린다 */
    setIcon(groupId: RobloxGroupId, icon: Blob): Promise<void>;
    /** POST /v1/groups/{groupId}/social-links */
    createSocialLink(groupId: RobloxGroupId, request: RobloxGroupSocialLinkRequest): Promise<{
        id: number & z.core.$brand<"RobloxGroupSocialLinkId">;
        type: string | number;
        url: string;
        title: string;
    }>;
    /** PATCH /v1/groups/{groupId}/social-links/{socialLinkId} */
    updateSocialLink(groupId: RobloxGroupId, socialLinkId: RobloxGroupSocialLinkId, request: RobloxGroupSocialLinkRequest): Promise<void>;
    /** DELETE /v1/groups/{groupId}/social-links/{socialLinkId} */
    deleteSocialLink(groupId: RobloxGroupId, socialLinkId: RobloxGroupSocialLinkId): Promise<void>;
    /** GET /v1/groups/{groupId}/blocked-keywords — 포럼 차단 키워드 */
    getKeywords(groupId: RobloxGroupId, query?: RobloxGroupPageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: string & z.core.$brand<"RobloxGroupKeywordId">;
            keyword: string;
            createdBy: number;
            isPrivate: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        totalActiveKeywordsCount: number;
    }>;
    /** POST /v1/groups/{groupId}/blocked-keywords — 스펙은 keywords를 문자열 하나로 받는다 */
    createKeywords(groupId: RobloxGroupId, request: {
        keywords: string;
        isPrivate?: boolean;
    }): Promise<{
        createdKeywords: {
            id: string & z.core.$brand<"RobloxGroupKeywordId">;
            keyword: string;
            createdBy: number;
            isPrivate: boolean;
            createdAt: string;
            updatedAt: string;
        }[];
        hadModeratedKeywords: boolean;
        hadDuplicateKeywords: boolean;
    }>;
    /** PATCH /v1/groups/{groupId}/blocked-keywords/{keywordId} */
    updateKeyword(groupId: RobloxGroupId, keywordId: RobloxGroupKeywordId, request: {
        keyword?: string;
        isPrivate?: boolean;
    }): Promise<{
        id: string & z.core.$brand<"RobloxGroupKeywordId">;
        keyword: string;
        createdBy: number;
        isPrivate: boolean;
        createdAt: string;
        updatedAt: string;
    }>;
    /** DELETE /v1/groups/{groupId}/blocked-keywords/{keywordId} */
    deleteKeyword(groupId: RobloxGroupId, keywordId: RobloxGroupKeywordId): Promise<void>;
    /** POST /v1/featured-content/event — 그룹에 이벤트를 내건다 */
    setFeaturedEvent(groupId: RobloxGroupId, eventId: RobloxGroupEventId): Promise<{
        groupId: number & z.core.$brand<"RobloxGroupId">;
        contentType: string;
        contentId: string & z.core.$brand<"RobloxGroupEventId">;
    }>;
    /** DELETE /v1/featured-content/event */
    removeFeaturedEvent(groupId: RobloxGroupId, eventId: RobloxGroupEventId): Promise<void>;
    /** GET /v1/groups/{groupId}/relationships/{type}/requests — 받은 동맹 요청 */
    getRelationshipRequests(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, query?: RobloxGroupRelationshipsQuery): Promise<{
        groupId: number & z.core.$brand<"RobloxGroupId">;
        relationshipType: string;
        totalGroupCount: number;
        relatedGroups: {
            id: number & z.core.$brand<"RobloxGroupId">;
            name: string;
            description: string;
            owner: {
                userId: number & z.core.$brand<"RobloxUserId">;
                username: string;
                displayName: string;
                hasVerifiedBadge: boolean;
            } | null;
            shout: {
                body: string;
                poster: {
                    userId: number & z.core.$brand<"RobloxUserId">;
                    username: string;
                    displayName: string;
                    hasVerifiedBadge: boolean;
                } | null;
                created: string;
                updated: string;
            } | null;
            isBuildersClubOnly: boolean;
            publicEntryAllowed: boolean;
            hasVerifiedBadge: boolean;
            isLocked?: boolean | null | undefined;
            isDeactivated?: boolean | null | undefined;
            hasSocialModules?: boolean | null | undefined;
            communityTier?: {
                groupId: number & z.core.$brand<"RobloxGroupId">;
                currentTier: number | null;
                previousTier: number | null;
                tierUpdatedTime: string | null;
                lastEvaluatedTime: string | null;
                requirements?: {
                    key: number;
                    satisfied: boolean;
                }[] | null | undefined;
                capabilities?: {
                    isEligibleForUnrestrictedMessages: boolean;
                } | null | undefined;
            } | null | undefined;
            memberCount?: number | null | undefined;
        }[];
        nextRowIndex: number | null;
    }>;
    /** 받은 동맹 요청을 받아들인다. 하나면 /requests/{relatedGroupId}, 여러 개면 묶음 엔드포인트로 보낸다 */
    acceptRelationshipRequests(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, relatedGroupIds: readonly RobloxGroupId[]): Promise<void>;
    /** 받은 동맹 요청을 거절한다 */
    declineRelationshipRequests(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, relatedGroupIds: readonly RobloxGroupId[]): Promise<void>;
    /** POST /v1/groups/{groupId}/relationships/{type}/{relatedGroupId} — 동맹 요청을 보내거나 적으로 정한다 */
    createRelationship(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, relatedGroupId: RobloxGroupId): Promise<void>;
    /** DELETE /v1/groups/{groupId}/relationships/{type}/{relatedGroupId} */
    deleteRelationship(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, relatedGroupId: RobloxGroupId): Promise<void>;
    /** GET /v1/groups/{groupId}/payouts — 정기 지급 대상과 비율 */
    getPayouts(groupIds: readonly RobloxGroupId[]): Promise<{
        groupId: RobloxGroupId;
        payouts: RobloxGroupPayout[];
    }[]>;
    /** GET /v1/groups/{groupId}/payout-restriction — 지급 기능을 쓸 수 있는지 */
    getPayoutRestrictions(groupIds: readonly RobloxGroupId[]): Promise<(RobloxGroupPayoutRestriction & {
        groupId: RobloxGroupId;
    })[]>;
    /**
     * POST /v1/groups/{groupId}/payouts — 그룹 자금에서 Robux를 지급한다. 다시 보내도 두 번 나가지 않게
     * `idempotencyKey`를 붙인다 (주지 않으면 만들어 넣는다 — 재시도도 같은 키로 나간다). 처리됐으면 status 0이 아닌 값이 올 수 있다.
     */
    payout(groupId: RobloxGroupId, recipients: readonly RobloxGroupPayoutRecipient[], opts?: {
        idempotencyKey?: string;
    }): Promise<number>;
    /** POST /v1/groups/{groupId}/payouts/recurring — 정기 지급 비율을 통째로 바꾼다 */
    setRecurringPayouts(groupId: RobloxGroupId, recipients: readonly RobloxGroupRecurringPayoutRecipient[]): Promise<void>;
    /** POST /v1/groups/{groupId}/change-owner — 주인을 넘긴다 (멤버여야 한다) */
    changeOwner(groupId: RobloxGroupId, userId: RobloxUserId): Promise<void>;
    /** POST /v1/groups/{groupId}/claim-ownership — 주인이 없는 그룹을 가져온다 */
    claimOwnership(groupId: RobloxGroupId): Promise<void>;
    /** POST /v1/groups/{groupId}/community-tier/evaluate — 커뮤니티 등급을 다시 계산한다 */
    evaluateCommunityTier(groupId: RobloxGroupId): Promise<{
        tierInfo: {
            groupId: number & z.core.$brand<"RobloxGroupId">;
            currentTier: number | null;
            previousTier: number | null;
            tierUpdatedTime: string | null;
            lastEvaluatedTime: string | null;
            requirements?: {
                key: number;
                satisfied: boolean;
            }[] | null | undefined;
            capabilities?: {
                isEligibleForUnrestrictedMessages: boolean;
            } | null | undefined;
        };
        passedSignals?: string[] | null | undefined;
        requirements?: {
            key: number;
            satisfied: boolean;
        }[] | null | undefined;
    }>;
    /** POST /v1/groups/{groupId}/deactivate — 주인만 할 수 있다 */
    deactivateGroup(groupId: RobloxGroupId): Promise<void>;
}

/** `.ttl({ badges: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
type RobloxBadgesCacheable = "getBadges" | "getAwardedDates";
/** badges.roblox.com */
declare class RobloxBadgesApi {
    private readonly config;
    private readonly thumbnails;
    private readonly http;
    private readonly badges;
    private readonly awards;
    private readonly freeQuotas;
    constructor(config: RobloxConfig, thumbnails: RobloxThumbnailsApi);
    private ttl;
    /**
     * GET /v1/badges/{badgeId} — 배지 상세, 통계, 배지를 주는 게임. 배지 하나당 요청 하나다 (600회/분).
     * `thumbnail`을 주면 배지 아이콘을 같이 받는다.
     */
    getBadges(badgeIds: readonly RobloxBadgeId[], opts: {
        thumbnail: true | RobloxBadgeIconOptions;
    }): Promise<RobloxWithThumbnail<RobloxBadge>[]>;
    getBadges(badgeIds: readonly RobloxBadgeId[], opts?: {
        thumbnail?: undefined;
    }): Promise<RobloxBadge[]>;
    /** GET /v1/universes/{universeId}/badges — 게임의 배지 (100회/분). 없는 게임이면 빈 목록이다 */
    getUniverseBadges(universeId: RobloxUniverseId, query?: RobloxUniverseBadgesQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxBadgeId">;
            name: string;
            description: string | null;
            displayName: string;
            displayDescription: string | null;
            enabled: boolean;
            iconImageId: (number & z.core.$brand<"RobloxAssetId">) | null;
            displayIconImageId: (number & z.core.$brand<"RobloxAssetId">) | null;
            created: string;
            updated: string;
            statistics: {
                pastDayAwardedCount: number;
                awardedCount: number;
                winRatePercentage: number;
            };
            awardingUniverse: {
                id: number & z.core.$brand<"RobloxUniverseId">;
                name: string;
                rootPlaceId: number & z.core.$brand<"RobloxPlaceId">;
            };
        }[];
    }>;
    /** GET /v1/users/{userId}/badges — 유저가 받은 배지 (1000회/분). 인증 필요. 없는 유저면 404 */
    getUserBadges(userId: RobloxUserId, query?: RobloxBadgePageQuery): Promise<{
        previousPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        nextPageCursor: (string & z.core.$brand<"RobloxCursor">) | null;
        data: {
            id: number & z.core.$brand<"RobloxBadgeId">;
            name: string;
            description: string | null;
            displayName: string;
            displayDescription: string | null;
            enabled: boolean;
            iconImageId: (number & z.core.$brand<"RobloxAssetId">) | null;
            displayIconImageId: (number & z.core.$brand<"RobloxAssetId">) | null;
            created: string;
            updated: string;
            statistics: {
                pastDayAwardedCount: number;
                awardedCount: number;
                winRatePercentage: number;
            };
            creator: ({
                type: "User";
                id: RobloxUserId;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">) | ({
                type: "Group";
                id: RobloxGroupId;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">) | ({
                type: "Unknown";
                id: number;
                rawType: string | number;
            } & Omit<{
                name?: string | null | undefined;
            }, "type" | "id">);
            awarder: {
                id: number & z.core.$brand<"RobloxPlaceId">;
                name?: string | null | undefined;
            };
        }[];
    }>;
    /**
     * 유저가 배지들을 받았는지와 받은 날짜. 인증 필요. 결과는 입력과 같은 순서이고, 받지 않은 배지는 `awardedDate`가 null이다
     * (없는 배지도 null이다 — 서버가 구분해 주지 않는다).
     * awarded-dates(100개씩, 10회/분)와 awarded-date(하나씩, 100회/분)를 나눠 쓴다. 받은 날짜만 캐시한다.
     */
    getAwardedDates(userId: RobloxUserId, badgeIds: readonly RobloxBadgeId[]): Promise<RobloxBadgeAwardStatus[]>;
    /** GET /v1/universes/{universeId}/free-badges-quota — 오늘(UTC) 남은 무료 배지 수. 없는 게임은 뺀다 */
    getFreeQuotas(universeIds: readonly RobloxUniverseId[]): Promise<{
        universeId: RobloxUniverseId;
        quota: number;
    }[]>;
    /** GET /v1/badges/metadata — 배지 비용과 이름/설명 길이 제한 */
    getMetadata(): Promise<{
        badgeCreationPrice: number;
        maxBadgeNameLength: number;
        maxBadgeDescriptionLength: number;
        defaultBadgeIconImageId: (number & z.core.$brand<"RobloxAssetId">) | null;
    }>;
    /**
     * POST /v1/universes/{universeId}/badges — 배지를 만든다. 게임의 시작 place에 붙는다.
     * 그날의 무료 한도(`getFreeQuotas`)를 넘으면 `paymentSource`에서 `getMetadata().badgeCreationPrice`만큼 낸다.
     */
    createBadge(universeId: RobloxUniverseId, request: RobloxCreateBadgeRequest): Promise<{
        id: number & z.core.$brand<"RobloxBadgeId">;
        name: string;
        description: string | null;
        displayName: string;
        displayDescription: string | null;
        enabled: boolean;
        iconImageId: (number & z.core.$brand<"RobloxAssetId">) | null;
        displayIconImageId: (number & z.core.$brand<"RobloxAssetId">) | null;
        created: string;
        updated: string;
        statistics: {
            pastDayAwardedCount: number;
            awardedCount: number;
            winRatePercentage: number;
        };
        awarder: {
            id: number & z.core.$brand<"RobloxPlaceId">;
            name?: string | null | undefined;
        };
    }>;
    /** PATCH /v1/badges/{badgeId} — 이름, 설명, 활성화 여부 */
    updateBadge(badgeId: RobloxBadgeId, request: RobloxUpdateBadgeRequest): Promise<void>;
    /** POST /v1/badges/{badgeId}/icon — 아이콘을 multipart로 올린다. 새 아이콘 이미지의 asset id를 돌려준다 */
    setIcon(badgeId: RobloxBadgeId, icon: Blob): Promise<RobloxAssetId>;
    /** DELETE /v1/user/badges/{badgeId} — 요청 계정에서 배지를 지운다 */
    removeBadge(badgeId: RobloxBadgeId): Promise<void>;
}

type RobloxMode = "extension" | "node";
type RobloxRetryOptions = {
    /** 요청당 최대 시도 횟수. 기본 5 */
    maxAttempts?: number;
    /** 시도당 타임아웃(ms). 기본 20000 */
    timeout?: number;
};
/** 서비스 → 메서드 → TTL(ms). 적지 않은 메서드는 기본값(`RobloxDefaultTtl`)을 쓴다. 0이어도 저장소의 get/set은 불린다 (0의 처리는 저장소가 정한다). */
type RobloxTtl = {
    users?: Partial<Record<RobloxUsersCacheable, number>>;
    thumbnails?: Partial<Record<RobloxThumbnailsCacheable, number>>;
    presence?: Partial<Record<RobloxPresenceCacheable, number>>;
    games?: Partial<Record<RobloxGamesCacheable, number>>;
    friends?: Partial<Record<RobloxFriendsCacheable, number>>;
    groups?: Partial<Record<RobloxGroupsCacheable, number>>;
    badges?: Partial<Record<RobloxBadgesCacheable, number>>;
};
/**
 * 기본 TTL(ms). `.cache(store)`를 넣었을 때만 쓰인다. 값이 얼마나 자주 바뀌는지에 맞췄다
 * (4.1의 기본값이 있던 것은 그대로 따랐다).
 */
declare const RobloxDefaultTtl: {
    readonly users: {
        readonly getUsers: number;
        readonly getUserDetails: number;
        readonly getUsersByNames: number;
        readonly getUsernameHistory: number;
    };
    readonly thumbnails: {
        readonly get: number;
        readonly getGameThumbnails: number;
    };
    readonly presence: {
        readonly get: number;
    };
    readonly games: {
        readonly getGames: number;
        readonly getUniverseIds: number;
        readonly getPlaceDetails: number;
        readonly getProductInfo: number;
        readonly getPlayability: number;
        readonly getVotes: number;
        readonly getFavoriteCounts: number;
        readonly getMedia: number;
        readonly getServerAddresses: number;
        readonly getServerLocations: number;
    };
    readonly friends: {
        readonly getFriends: number;
        readonly getFriendCounts: number;
        readonly getFollowerCounts: number;
        readonly getFollowingCounts: number;
    };
    readonly groups: {
        readonly getGroups: number;
        readonly getGroupDetails: number;
        readonly getRoles: number;
        readonly getRolesByIds: number;
        readonly getUserGroups: number;
    };
    readonly badges: {
        readonly getBadges: number;
        readonly getAwardedDates: number;
    };
};
type RobloxConfig = {
    readonly mode: RobloxMode;
    /** 돌려 쓸 쿠키 풀. null이면 쿠키 없이(익명으로) 보낸다 */
    readonly cookies: RobloxCookieStore | null;
    /** 401을 받은 쿠키를 처리한다. null이면 기본 처리(`cookies.remove`) */
    readonly onCookieRejected: RobloxCookieRejectedHandler | null;
    /**
     * 캐시 키 문자열 → 진행 중인 조회. 같은 프로세스에서 같은 대상을 동시에 물으면 저장소 조회와 요청을 한 번만 한다.
     * 체인 전체(`.as(cookie)` 포함)가 공유한다. 끝나면 지운다.
     */
    readonly inflight: Map<string, Promise<unknown>>;
    /** 쿠키 → 진행 중인 거부 처리. 같은 쿠키로 동시에 401을 여러 번 받아도 한 번만 부른다. 체인 전체가 공유한다. */
    readonly rejecting: Map<RobloxCookie, Promise<void>>;
    /** `.as(cookie)`로 고정한 쿠키. 있으면 `cookies` 로테이션 대신 이것만 쓴다. */
    readonly fixedCookie: RobloxCookie | null;
    readonly retry: RobloxRetryOptions;
    readonly cache: RobloxCacheStore | null;
    readonly ttl: RobloxTtl;
    /** 쿠키(확장 모드는 "extension") → X-CSRF-Token. 체인 전체가 공유한다. */
    readonly csrf: Map<string, string>;
    /** 엔드포인트별 레이트리밋 상태. Roblox 한도는 IP 단위라 체인 전체가 공유한다. `.rateLimits(store)`로 밖과 동기화할 수 있다. */
    readonly rateLimits: RobloxRateLimiter;
    /** IP → 위치 콜백. 있으면 서버 위치를 조회할 수 있다. */
    readonly geolocate: RobloxGeolocator | null;
};

/** 메시지 */
declare const RobloxChatMessageSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
    content: z.ZodString;
    sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
    created_at: z.ZodString;
    type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
    is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/** 대화 참가자 정보 (`include_user_data`) */
declare const RobloxChatUserDataSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    display_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    combined_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    is_verified: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
/** 대화 */
declare const RobloxChatConversationSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodString, "RobloxConversationId", "out">;
    type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    is_default_name: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    created_by: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>>;
    participant_user_ids: z.ZodArray<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
    user_data: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        display_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        combined_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_verified: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>>;
    messages: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
        content: z.ZodString;
        sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
        created_at: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
        is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>>;
    unread_message_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    updated_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    preview_message: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
        content: z.ZodString;
        sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
        created_at: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
        is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
    sort_index: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    universe_id: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>;
}, z.core.$strip>;
/** 만들기/바꾸기 응답의 항목. 실패한 항목은 `status: "failed"`이고 나머지가 null이다 */
declare const RobloxChatConversationResultSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    source: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    name: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    is_default_name: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    created_by: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>>>;
    user_data: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        display_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        combined_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_verified: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, z.core.$strip>>>>>;
    messages: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
        content: z.ZodString;
        sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
        created_at: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
        is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>>>;
    unread_message_count: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    updated_at: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    created_at: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    moderation_type: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    preview_message: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
        content: z.ZodString;
        sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
        created_at: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
        is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>>;
    sort_index: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    universe_id: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>>;
    id: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxConversationId", "out">>>;
    participant_user_ids: z.ZodOptional<z.ZodNullable<z.ZodArray<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>>>;
    status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const RobloxChatConversationPageRawSchema: z.ZodObject<{
    conversations: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxConversationId", "out">;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_default_name: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        created_by: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>>;
        participant_user_ids: z.ZodArray<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
        user_data: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            display_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            combined_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            is_verified: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>>;
        messages: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
            content: z.ZodString;
            sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
            created_at: z.ZodString;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
            is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>>;
        unread_message_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        updated_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        preview_message: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
            content: z.ZodString;
            sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
            created_at: z.ZodString;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
            is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
        sort_index: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        universe_id: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>;
    }, z.core.$strip>>;
    next_cursor: z.ZodPipe<z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>;
}, z.core.$strip>;
declare const RobloxChatMessagePageRawSchema: z.ZodObject<{
    messages: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
        content: z.ZodString;
        sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
        created_at: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
        is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
    next_cursor: z.ZodPipe<z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>;
    previous_cursor: z.ZodPipe<z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>;
}, z.core.$strip>;
declare const RobloxChatConversationsResponseSchema: z.ZodObject<{
    conversations: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxConversationId", "out">;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_default_name: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        created_by: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>>;
        participant_user_ids: z.ZodArray<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
        user_data: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            display_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            combined_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            is_verified: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>>;
        messages: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
            content: z.ZodString;
            sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
            created_at: z.ZodString;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
            is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>>;
        unread_message_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        updated_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created_at: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        preview_message: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
            content: z.ZodString;
            sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
            created_at: z.ZodString;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
            is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>;
        sort_index: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        universe_id: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxChatConversationResultsResponseSchema: z.ZodObject<{
    conversations: z.ZodArray<z.ZodObject<{
        type: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        source: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        name: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        is_default_name: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
        created_by: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>>>;
        user_data: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            display_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            combined_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            is_verified: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, z.core.$strip>>>>>;
        messages: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
            content: z.ZodString;
            sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
            created_at: z.ZodString;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
            is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>>>;
        unread_message_count: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
        updated_at: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        created_at: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        moderation_type: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        preview_message: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
            content: z.ZodString;
            sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
            created_at: z.ZodString;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
            is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>>>;
        sort_index: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
        universe_id: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUniverseId", "out">>>>;
        id: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxConversationId", "out">>>;
        participant_user_ids: z.ZodOptional<z.ZodNullable<z.ZodArray<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>>>;
        status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const RobloxChatSendResponseSchema: z.ZodObject<{
    messages: z.ZodArray<z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">;
        content: z.ZodString;
        sender_user_id: z.ZodNullable<z.core.$ZodBranded<z.ZodNumber, "RobloxUserId", "out">>;
        created_at: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        moderation_type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        replies_to: z.ZodOptional<z.ZodNullable<z.core.$ZodBranded<z.ZodString, "RobloxChatMessageId", "out">>>;
        is_deleted: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_previewable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        is_badgeable: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        visibility: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** GET get-conversation-metadata — 안 읽은 수 */
declare const RobloxChatUnreadCountsSchema: z.ZodObject<{
    global_unread_message_count: z.ZodNumber;
    global_unread_count: z.ZodNumber;
}, z.core.$strip>;
/**
 * GET metadata — 계정의 채팅 설정과 서버 피처 플래그. 이것만 camelCase이고 필드가 수시로 바뀌어 모르는 키도 남긴다.
 * `isChatVisible`/`isChatUserMessagesEnabled`가 false면 이 계정은 메시지를 보낼 수 없다 (실측: 나이 인증 안 한 봇 계정).
 */
declare const RobloxChatMetadataSchema: z.ZodObject<{
    isChatEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isChatEnabledByPrivacySetting: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isGroupChatEnabledByPrivacySetting: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isChatEnabledByGlobalRules: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isChatVisible: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    isChatUserMessagesEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    maxConversationTitleLength: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    typingInChatFromSenderThrottleMs: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    typingInChatForReceiverExpirationMs: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    validMessageTypesWhiteList: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
}, z.core.$loose>;
type RobloxChatMessage = z.infer<typeof RobloxChatMessageSchema>;
type RobloxChatUserData = z.infer<typeof RobloxChatUserDataSchema>;
type RobloxChatConversation = z.infer<typeof RobloxChatConversationSchema>;
type RobloxChatConversationResult = z.infer<typeof RobloxChatConversationResultSchema>;
type RobloxChatUnreadCounts = z.infer<typeof RobloxChatUnreadCountsSchema>;
type RobloxChatMetadata = z.infer<typeof RobloxChatMetadataSchema>;
type RobloxChatConversationPage = {
    conversations: RobloxChatConversation[];
    nextCursor: string | null;
};
type RobloxChatMessagePage = {
    messages: RobloxChatMessage[];
    nextCursor: string | null;
    previousCursor: string | null;
};
type RobloxChatPageQuery = {
    pageSize?: number;
    cursor?: string;
};
/** 새 대화. 참가자는 모두 친구여야 한다 (아니면 403 participants_not_friends) */
type RobloxCreateConversationRequest = {
    type: "one_to_one";
    userId: RobloxUserId;
} | {
    type: "group";
    userIds: RobloxUserId[];
    name?: string;
};
type RobloxRenameConversationRequest = {
    id: RobloxConversationId;
    name: string;
};
/** 메시지 하나. 답장은 `repliesTo` */
type RobloxSendMessageRequest = string | {
    content: string;
    repliesTo?: RobloxChatMessageId;
};

/**
 * apis.roblox.com/platform-chat-api/v1 — roblox.com 웹 채팅이 쓰는 비공개 API.
 * 전부 요청 계정 기준이라 계정이 하나로 정해져 있어야 한다 (`.as(cookie)` 또는 확장 모드).
 * 엔드포인트 이름과 body 형식은 실측으로 찾았다. 한도는 2026-10 실측.
 */
declare class RobloxChatApi {
    private readonly config;
    private readonly http;
    private readonly conversations;
    constructor(config: RobloxConfig);
    private viewer;
    /** 대화 상세(참가자 이름 포함). 같은 틱에 들어온 호출은 25개씩 묶는다. 내가 참가하지 않은 대화는 뺀다. */
    getConversations(ids: readonly RobloxConversationId[]): Promise<RobloxChatConversation[]>;
    /** GET get-user-conversations — 내 대화 목록 (120회/분) */
    listConversations(query?: RobloxChatPageQuery): Promise<RobloxChatConversationPage>;
    /** POST search-conversations — 대화를 이름/참가자로 찾는다 */
    searchConversations(query: string, page?: RobloxChatPageQuery): Promise<RobloxChatConversationPage>;
    /** GET get-conversation-messages — 최신순 (120회/분). 커서 두 개를 응답 그대로 돌려준다 */
    getMessages(conversationId: RobloxConversationId, query?: RobloxChatPageQuery): Promise<RobloxChatMessagePage>;
    /** POST search-messages — 한 대화 안에서 메시지 검색 */
    searchMessages(conversationId: RobloxConversationId, query: string, page?: RobloxChatPageQuery): Promise<RobloxChatMessagePage>;
    /** GET get-conversation-metadata — 전체 안 읽은 수 */
    getUnreadCounts(): Promise<{
        global_unread_message_count: number;
        global_unread_count: number;
    }>;
    /** GET metadata — 채팅 가능 여부와 설정. `isChatUserMessagesEnabled`가 false면 메시지를 보낼 수 없다 */
    getMetadata(): Promise<{
        [x: string]: unknown;
        isChatEnabled?: boolean | null | undefined;
        isChatEnabledByPrivacySetting?: string | null | undefined;
        isGroupChatEnabledByPrivacySetting?: string | null | undefined;
        isChatEnabledByGlobalRules?: string | null | undefined;
        isChatVisible?: boolean | null | undefined;
        isChatUserMessagesEnabled?: boolean | null | undefined;
        maxConversationTitleLength?: number | null | undefined;
        typingInChatFromSenderThrottleMs?: number | null | undefined;
        typingInChatForReceiverExpirationMs?: number | null | undefined;
        validMessageTypesWhiteList?: string[] | null | undefined;
    }>;
    /**
     * POST send-messages — 한 대화에 여러 메시지 (4회/초). 각 메시지의 `status`로 결과를 본다.
     * 채팅이 꺼진 계정은 403 chat_disabled_for_user가 난다.
     */
    sendMessages(conversationId: RobloxConversationId, messages: readonly RobloxSendMessageRequest[]): Promise<RobloxChatMessage[]>;
    /** POST mark-conversations — 읽음 처리 (60회/분) */
    markRead(conversationIds: readonly RobloxConversationId[]): Promise<void>;
    /** POST update-typing-status — 입력 중 표시 (30회/분, 보내는 쪽 throttle은 metadata 참고) */
    setTyping(conversationId: RobloxConversationId): Promise<void>;
    /** POST create-conversations — 1:1 또는 그룹 대화 (15회/분). 참가자는 모두 친구여야 한다 */
    createConversations(requests: readonly RobloxCreateConversationRequest[]): Promise<RobloxChatConversationResult[]>;
    /** POST update-conversations — 그룹 대화 이름 바꾸기 (15회/분) */
    renameConversations(requests: readonly RobloxRenameConversationRequest[]): Promise<RobloxChatConversationResult[]>;
    /** POST add-users — 그룹 대화에 친구 추가 (15회/분) */
    addUsers(conversationId: RobloxConversationId, userIds: readonly RobloxUserId[]): Promise<void>;
    /** POST remove-users — 그룹 대화에서 내보내기. 자기 자신이면 나가기 (15회/분) */
    removeUsers(conversationId: RobloxConversationId, userIds: readonly RobloxUserId[]): Promise<void>;
}

/**
 * 서비스 네임스페이스를 제공하는 공통 부모. 빌더의 모든 단계가 이걸 상속하므로
 * 어느 단계에서든 바로 `.users` 등을 쓸 수 있다.
 * `L`은 `.geolocation(fn)` 콜백이 돌려주는 위치 타입이다 (서버 위치 결과에 그대로 들어간다).
 */
declare class RobloxClient<L = unknown> {
    protected readonly config: RobloxConfig;
    private _users?;
    private _thumbnails?;
    private _presence?;
    private _games?;
    private _friends?;
    private _chat?;
    private _groups?;
    private _badges?;
    /** 쿠키 → 고정 클라이언트. 같은 쿠키면 같은 클라이언트를 돌려줘 요청 묶기·중복 제거·내 id 캐시가 이어진다 */
    private readonly asClients;
    constructor(config: RobloxConfig);
    /** users.roblox.com */
    get users(): RobloxUsersApi;
    /** thumbnails.roblox.com */
    get thumbnails(): RobloxThumbnailsApi;
    /** presence.roblox.com */
    get presence(): RobloxPresenceApi;
    /** games.roblox.com + gamejoin.roblox.com */
    get games(): RobloxGamesApi<L>;
    /** friends.roblox.com */
    get friends(): RobloxFriendsApi;
    /** groups.roblox.com */
    get groups(): RobloxGroupsApi;
    /** badges.roblox.com */
    get badges(): RobloxBadgesApi;
    /** apis.roblox.com/platform-chat-api — 요청 계정의 채팅. `.as(cookie)`나 확장 모드에서 쓴다 */
    get chat(): RobloxChatApi;
    /**
     * 지정한 쿠키로 고정한 클라이언트. 요청 계정에 따라 응답이 달라지는 API용.
     * 확장 모드에서는 쿠키를 붙일 수 없으므로 의미가 없다.
     */
    as(cookie: RobloxCookie): RobloxClient<L>;
}

/**
 * 단계별 불변 빌더.
 *
 *   vigorRoblox.mode() ─┬─▶ RobloxExtensionStage ───────────┐
 *                       └─▶ RobloxNodeStage (인증)           │
 *                                 └──────────▶ RobloxOptionsStage ── cache(store) ─▶ RobloxCacheStage (ttl)
 *
 * 모든 단계는 RobloxClient를 상속하므로 어디서든 `.users` 등을 바로 쓸 수 있다.
 * 바뀌는 상태(쿠키 풀, 레이트리밋)는 사용자가 저장소를 넣어 밖에 둘 수 있다.
 * `L`은 `.geolocation(fn)` 콜백이 돌려주는 위치 타입이고, 이후 단계로 그대로 넘어간다.
 */
/** `retry`/`cache`는 단계 1 이후 어디서든 쓸 수 있다. */
declare abstract class RobloxConfigurableStage<L = unknown> extends RobloxClient<L> {
    /** 모든 서비스 요청의 재시도 설정 */
    retry(options: RobloxRetryOptions): RobloxOptionsStage<L>;
    /**
     * 서버 위치 조회에 쓸 IP → 위치 콜백. 어느 서비스(ipgeolocation.io, ip-api.com, MaxMind 로컬 DB …)를 쓸지는 사용자가 정한다.
     * 라이브러리는 돌려준 값을 해석하지 않는다 — 어떤 모양이든 되고, 결과에는 그 값과 타입이 그대로 들어간다.
     */
    geolocation<G>(geolocate: RobloxGeolocator<G>): RobloxOptionsStage<G>;
    /** 레이트리밋 상태를 밖과 동기화할 저장소. 새로고침·재시작 뒤에도, 같은 IP를 쓰는 다른 탭/인스턴스와도 한도를 이어받는다. */
    rateLimits(store: RobloxRateLimitStore): RobloxOptionsStage<L>;
    /** 캐시 저장소. `ttl()`은 이걸 지정한 다음에만 쓸 수 있다. */
    cache(store: RobloxCacheStore): RobloxCacheStage<L>;
}
declare class VigorRoblox {
    mode(mode: "extension"): RobloxExtensionStage;
    mode(mode: "node"): RobloxNodeStage;
}
/**
 * 확장 프로그램(또는 roblox.com 위의 스크립트)용. 브라우저의 쿠키 저장소로 인증한다 (`credentials: "include"`).
 * fetch로 붙일 수 없는 User-Agent(gamejoin용)는 `robloxDnrRules()`의 declarativeNetRequest 규칙에 맡긴다. 쿠키는 건드리지 않는다.
 */
declare class RobloxExtensionStage<L = unknown> extends RobloxConfigurableStage<L> {
}
declare class RobloxNodeStage<L = unknown> extends RobloxConfigurableStage<L> {
    /**
     * 요청마다 하나씩 쓸 쿠키 풀. 배열은 프로세스 메모리의 라운드 로빈 풀(`RobloxMemoryCookies`)로 감싼다.
     * 서버리스처럼 프로세스가 자주 새로 뜨는 곳에서는 외부 저장소로 만든 `RobloxCookieStore`를 넣는다.
     * 실행 중에 쿠키를 바꾸려면 `RobloxMemoryCookies`를 직접 만들어 넣고 그걸 고친다.
     */
    cookies(cookies: readonly RobloxCookie[] | RobloxCookieStore): RobloxNodeStage<L>;
    /**
     * Roblox가 쿠키를 거부했을 때(401, 403 "User is moderated") 할 일. 이유(`RobloxCookieRejectReason`)는 두 번째 인자로 온다.
     * 지정하면 기본 처리(풀에서 빼기, `store.remove`)는 하지 않는다 — 원본 DB에서 지우거나, 정지가 풀릴 때까지 빼 두거나,
     * 기록만 하고 남겨 두는 것은 여기서 정한다. `.as(cookie)`의 쿠키도 같은 콜백을 탄다.
     * 풀에서 돌려 쓰는 요청은 처리가 끝난 뒤 다른 쿠키로 다시 보낸다.
     */
    onCookieRejected(handler: RobloxCookieRejectedHandler): RobloxNodeStage<L>;
}
declare class RobloxOptionsStage<L = unknown> extends RobloxConfigurableStage<L> {
}
declare class RobloxCacheStage<L = unknown> extends RobloxClient<L> {
    /** 서비스 → 메서드 → TTL(ms). 적지 않은 메서드는 기본값(`RobloxDefaultTtl`)을 쓴다. 0이어도 저장소의 get/set은 불린다 (0의 처리는 저장소가 정한다). */
    ttl(ttl: RobloxTtl): RobloxCacheStage<L>;
    retry(options: RobloxRetryOptions): RobloxCacheStage<L>;
    geolocation<G>(geolocate: RobloxGeolocator<G>): RobloxCacheStage<G>;
    rateLimits(store: RobloxRateLimitStore): RobloxCacheStage<L>;
}
declare const vigorRoblox: VigorRoblox;

/** retry 엔진이 감싼 에러(RETRY_EXHAUSTED 등)까지 풀어서 FETCH_FAILED를 찾는다. */
declare function findFetchFailed(error: unknown): vigor_fetch.VigorFetchError<"FETCH_FAILED", any> | null;

/** `chrome.declarativeNetRequest.Rule` 중 여기서 쓰는 부분 */
type RobloxDnrRule = {
    id: number;
    priority: number;
    action: {
        type: "modifyHeaders";
        requestHeaders: {
            header: string;
            operation: "set";
            value: string;
        }[];
    };
    condition: {
        requestDomains: string[];
        resourceTypes: "xmlhttprequest"[];
        tabIds?: number[];
    };
};
type RobloxDnrOptions = {
    /** 첫 규칙의 id. 규칙마다 1씩 늘린다. 확장의 다른 규칙과 겹치지 않게 고른다. 기본 1 */
    firstRuleId?: number;
    /** 기본 1 */
    priority?: number;
    /**
     * true면 확장 자신의 요청(service worker, popup, offscreen 등 탭 밖, `tabIds: [-1]`)에만 건다. session 규칙에서만 쓸 수 있다.
     * false면 gamejoin.roblox.com으로 가는 모든 요청에 걸린다 (roblox.com 탭 안의 content script도 포함). 기본 false
     */
    extensionOnly?: boolean;
};
/**
 * 확장 모드에 필요한 declarativeNetRequest 규칙. gamejoin.roblox.com 요청의 User-Agent를
 * Roblox 클라이언트 값으로 바꾼다 (`games.getServerAddresses` 등).
 *
 * ```ts
 * const rules = robloxDnrRules({ firstRuleId: 1000 })
 * await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: rules.map(r => r.id), addRules: rules })
 * ```
 *
 * manifest에 `declarativeNetRequest` 권한(또는 `declarativeNetRequestWithHostAccess`)과
 * `*://*.roblox.com/*` host 권한이 있어야 한다.
 */
declare function robloxDnrRules(options?: RobloxDnrOptions): RobloxDnrRule[];

/**
 * 유저나 그룹을 가리키는 참조(게임 제작자, 그룹 소유자 등). `type`으로 좁히면 `id`가 브랜드 타입이 된다.
 * Roblox가 문자열("User")로도 숫자 enum(1)으로도 주므로 둘 다 받는다. 그 밖의 값은 `"Unknown"`이고 원래 값은 `rawType`에 남는다.
 *
 * ```ts
 * if (game.creator.type === "Group") groups.getGroups([game.creator.id])   // id: RobloxGroupId
 * ```
 */
type RobloxCreator = {
    type: "User";
    id: RobloxUserId;
} | {
    type: "Group";
    id: RobloxGroupId;
} | {
    type: "Unknown";
    id: number;
    rawType: string | number;
};
type RobloxCreatorType = RobloxCreator["type"];
/** 응답의 id와 type을 `RobloxCreator`로 바꾼다. id가 브랜드 조건(양의 정수)에 맞지 않으면 `"Unknown"`이다 */
declare function toRobloxCreator(id: number, type: string | number): RobloxCreator;
/** 응답의 `{ id, type }`(나머지 필드는 그대로)를 `RobloxCreator`와 합친 모양으로 바꾸는 스키마 */
declare function RobloxCreatorSchema<S extends z.ZodRawShape = {}>(extra?: S): z.ZodPipe<z.ZodObject<{
    id: z.ZodNumber;
    type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
} & S extends infer T ? { -readonly [P in keyof T]: ({
    id: z.ZodNumber;
    type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
} & S)[P]; } : never, z.core.$strip>, z.ZodTransform<Awaited<{
    type: "User";
    id: RobloxUserId;
} & Omit<z.core.$InferObjectOutput<S, {}>, "type" | "id">> | Awaited<{
    type: "Group";
    id: RobloxGroupId;
} & Omit<z.core.$InferObjectOutput<S, {}>, "type" | "id">> | Awaited<{
    type: "Unknown";
    id: number;
    rawType: string | number;
} & Omit<z.core.$InferObjectOutput<S, {}>, "type" | "id">>, z.core.$InferObjectOutput<{
    id: z.ZodNumber;
    type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
} & S extends infer T_1 ? { -readonly [P in keyof T_1]: ({
    id: z.ZodNumber;
    type: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
} & S)[P]; } : never, {}>>>;

export { RobloxAgeBracket, RobloxAgeBracketSchema, RobloxArrayResponseSchema, type RobloxAssetId, RobloxAssetIdSchema, type RobloxAuthenticatedUser, RobloxAuthenticatedUserSchema, type RobloxAvatarThumbnailOptions, type RobloxBadge, type RobloxBadgeAward, RobloxBadgeAwardSchema, type RobloxBadgeAwardStatus, RobloxBadgeAwardsResponseSchema, type RobloxBadgeIconOptions, type RobloxBadgeId, RobloxBadgeIdSchema, type RobloxBadgeMetadata, RobloxBadgeMetadataSchema, type RobloxBadgePageQuery, RobloxBadgePageSchema, RobloxBadgeSchema, type RobloxBadgeStatistics, RobloxBadgeStatisticsSchema, RobloxBadgesApi, type RobloxBadgesCacheable, type RobloxBirthDay, RobloxBirthDaySchema, type RobloxBirthMonth, RobloxBirthMonthSchema, type RobloxBirthYear, RobloxBirthYearSchema, type RobloxBirthdate, RobloxBirthdateSchema, type RobloxBundleId, RobloxBundleIdSchema, type RobloxCacheEntry, type RobloxCacheKey, RobloxCacheStage, type RobloxCacheStore, type RobloxCacheValue, type RobloxCacheValues, type RobloxCaptchaStatus, RobloxCaptchaStatusSchema, type RobloxCaptchaTokenRequest, RobloxChatApi, type RobloxChatConversation, type RobloxChatConversationPage, RobloxChatConversationPageRawSchema, type RobloxChatConversationResult, RobloxChatConversationResultSchema, RobloxChatConversationResultsResponseSchema, RobloxChatConversationSchema, RobloxChatConversationsResponseSchema, type RobloxChatMessage, type RobloxChatMessageId, RobloxChatMessageIdSchema, type RobloxChatMessagePage, RobloxChatMessagePageRawSchema, RobloxChatMessageSchema, type RobloxChatMetadata, RobloxChatMetadataSchema, type RobloxChatPageQuery, RobloxChatSendResponseSchema, type RobloxChatUnreadCounts, RobloxChatUnreadCountsSchema, type RobloxChatUserData, RobloxChatUserDataSchema, RobloxClient, type RobloxCommunityTier, RobloxCommunityTierSchema, type RobloxConversationId, RobloxConversationIdSchema, type RobloxCookie, type RobloxCookieRejectReason, type RobloxCookieRejectedHandler, RobloxCookieSchema, type RobloxCookieStore, RobloxCountResponseSchema, type RobloxCreateBadgeRequest, type RobloxCreateConversationRequest, type RobloxCreateGroupKeywordsResponse, RobloxCreateGroupKeywordsResponseSchema, type RobloxCreateGroupRequest, type RobloxCreateGroupRoleRequest, type RobloxCreatePrivateServerRequest, type RobloxCreatedBadge, RobloxCreatedBadgeSchema, type RobloxCreator, RobloxCreatorSchema, type RobloxCreatorType, type RobloxCursor, RobloxCursorSchema, RobloxDefaultTtl, type RobloxDeveloperProductId, RobloxDeveloperProductIdSchema, type RobloxDnrOptions, type RobloxDnrRule, type RobloxEmptyResponse, RobloxEmptyResponseSchema, type RobloxErrorResponse, RobloxErrorResponseSchema, RobloxExtensionStage, type RobloxFavoriteGame, type RobloxFavoriteGamePage, RobloxFavoriteGamePageSchema, RobloxFavoriteGameSchema, RobloxFiatPurchaseDataSchema, type RobloxFindUsersOptions, type RobloxFollowPage, type RobloxFollowPageQuery, RobloxFollowPageSchema, RobloxFollowingExistsResponseSchema, type RobloxFollowingStatus, RobloxFollowingStatusSchema, RobloxFriendListResponseSchema, type RobloxFriendPage, RobloxFriendPageRawSchema, type RobloxFriendPresence, RobloxFriendPresenceSchema, type RobloxFriendRequest, type RobloxFriendRequestPage, RobloxFriendRequestPageSchema, RobloxFriendRequestSchema, type RobloxFriendRequestsQuery, type RobloxFriendSearchQuery, type RobloxFriendStatus, RobloxFriendStatusSchema, RobloxFriendStatusesResponseSchema, RobloxFriendsApi, type RobloxFriendsCacheable, RobloxFriendsGroupsResponseSchema, type RobloxFriendsMetadata, RobloxFriendsMetadataSchema, type RobloxGame, type RobloxGameCreator, RobloxGameCreatorSchema, type RobloxGameFavoriteCount, type RobloxGameListQuery, type RobloxGameMedia, RobloxGameMediaResponseSchema, RobloxGameMediaSchema, type RobloxGamePassId, RobloxGamePassIdSchema, type RobloxGamePlayability, RobloxGamePlayabilitySchema, type RobloxGameProduct, RobloxGameProductSchema, RobloxGameProductsResponseSchema, type RobloxGameRecommendations, RobloxGameRecommendationsSchema, RobloxGameSchema, type RobloxGameSummary, type RobloxGameSummaryPage, RobloxGameSummaryPageSchema, RobloxGameSummarySchema, type RobloxGameThumbnailId, RobloxGameThumbnailIdSchema, type RobloxGameVotes, RobloxGameVotesResponseSchema, RobloxGameVotesSchema, RobloxGamesApi, type RobloxGamesCacheable, RobloxGamesResponseSchema, RobloxGender, RobloxGenderSchema, type RobloxGeolocator, type RobloxGetServersOptions, type RobloxGroup, type RobloxGroupAuditActionType, RobloxGroupAuditActionTypes, type RobloxGroupAuditLogItem, RobloxGroupAuditLogItemSchema, type RobloxGroupAuditLogPage, RobloxGroupAuditLogPageSchema, type RobloxGroupAuditLogQuery, type RobloxGroupBan, type RobloxGroupBanPage, RobloxGroupBanPageSchema, RobloxGroupBanSchema, type RobloxGroupBasic, RobloxGroupBasicSchema, type RobloxGroupConfiguration, type RobloxGroupConfigurationMetadata, RobloxGroupConfigurationMetadataSchema, RobloxGroupConfigurationSchema, type RobloxGroupDetail, type RobloxGroupDetailPartial, RobloxGroupDetailPartialSchema, RobloxGroupDetailSchema, type RobloxGroupEmoteSet, RobloxGroupEmoteSetsResponseSchema, type RobloxGroupEventId, RobloxGroupEventIdSchema, type RobloxGroupFeatureFreeze, RobloxGroupFeatureFreezesResponseSchema, type RobloxGroupFeaturedEvent, RobloxGroupFeaturedEventSchema, type RobloxGroupFeatures, RobloxGroupFeaturesSchema, type RobloxGroupIconOptions, type RobloxGroupId, RobloxGroupIdSchema, type RobloxGroupJoinRequest, type RobloxGroupJoinRequestPage, RobloxGroupJoinRequestPageSchema, RobloxGroupJoinRequestSchema, type RobloxGroupKeyword, type RobloxGroupKeywordId, RobloxGroupKeywordIdSchema, type RobloxGroupKeywordPage, RobloxGroupKeywordPageSchema, RobloxGroupKeywordSchema, RobloxGroupLookupResponseSchema, type RobloxGroupMember, type RobloxGroupMemberPage, RobloxGroupMemberPageSchema, RobloxGroupMemberSchema, type RobloxGroupMembership, type RobloxGroupMembershipDetail, RobloxGroupMembershipDetailSchema, RobloxGroupMembershipSchema, type RobloxGroupNameHistoryPage, RobloxGroupNameHistoryPageSchema, type RobloxGroupNotificationPreference, RobloxGroupNotificationPreferenceSchema, type RobloxGroupPageQuery, type RobloxGroupPayout, type RobloxGroupPayoutRecipient, type RobloxGroupPayoutRestriction, RobloxGroupPayoutRestrictionSchema, RobloxGroupPayoutsResponseSchema, type RobloxGroupPermissions, RobloxGroupPermissionsSchema, RobloxGroupPoliciesResponseSchema, type RobloxGroupRecurringPayoutRecipient, type RobloxGroupRelationshipType, type RobloxGroupRelationships, type RobloxGroupRelationshipsQuery, RobloxGroupRelationshipsSchema, type RobloxGroupRole, type RobloxGroupRoleDetail, RobloxGroupRoleDetailSchema, RobloxGroupRoleDetailsResponseSchema, type RobloxGroupRoleId, RobloxGroupRoleIdSchema, type RobloxGroupRolePermissions, RobloxGroupRolePermissionsResponseSchema, RobloxGroupRolePermissionsSchema, RobloxGroupRoleSchema, RobloxGroupRolesResponseSchema, RobloxGroupSchema, type RobloxGroupSearchItem, RobloxGroupSearchItemSchema, type RobloxGroupSearchMetadata, RobloxGroupSearchMetadataSchema, type RobloxGroupSearchPage, RobloxGroupSearchPageSchema, type RobloxGroupSearchQuery, type RobloxGroupSettings, RobloxGroupSettingsSchema, type RobloxGroupShout, RobloxGroupShoutSchema, type RobloxGroupSocialLink, type RobloxGroupSocialLinkId, RobloxGroupSocialLinkIdSchema, type RobloxGroupSocialLinkRequest, RobloxGroupSocialLinkSchema, type RobloxGroupSocialLinkType, RobloxGroupSocialLinksResponseSchema, type RobloxGroupTierEvaluation, RobloxGroupTierEvaluationSchema, type RobloxGroupUser, type RobloxGroupUserPage, RobloxGroupUserPageSchema, RobloxGroupUserSchema, RobloxGroupsApi, type RobloxGroupsCacheable, type RobloxGroupsMetadata, RobloxGroupsMetadataSchema, RobloxGroupsResponseSchema, type RobloxIpAddress, RobloxIpAddressSchema, type RobloxJobId, RobloxJobIdSchema, type RobloxJoinGroupRequest, type RobloxJoinResponse, RobloxJoinResponseSchema, RobloxJoinStatus, RobloxMemoryCache, RobloxMemoryCookies, type RobloxMode, type RobloxMyPrivateServerPage, RobloxMyPrivateServerPageSchema, type RobloxMyPrivateServersQuery, RobloxNodeStage, type RobloxOnlineFriend, RobloxOnlineFriendSchema, RobloxOnlineFriendsResponseSchema, RobloxOptionsStage, type RobloxOutfitId, RobloxOutfitIdSchema, type RobloxPageLimit, RobloxPageLimitSchema, RobloxPageResponseSchema, type RobloxPlace, type RobloxPlaceDetails, RobloxPlaceDetailsSchema, type RobloxPlaceId, RobloxPlaceIdSchema, RobloxPresenceApi, type RobloxPresenceCacheable, RobloxPresenceType, RobloxPresenceTypeSchema, type RobloxPrimaryGroup, RobloxPrimaryGroupResponseSchema, type RobloxPrivateServer, type RobloxPrivateServerDetail, RobloxPrivateServerDetailSchema, type RobloxPrivateServerId, RobloxPrivateServerIdSchema, type RobloxPrivateServerInvite, RobloxPrivateServerInviteSchema, type RobloxPrivateServerPage, type RobloxPrivateServerPageQuery, RobloxPrivateServerPageSchema, type RobloxPrivateServerPermissions, RobloxPrivateServerPermissionsSchema, RobloxPrivateServerSchema, type RobloxPrivateServerSubscription, RobloxPrivateServerSubscriptionSchema, type RobloxRateLimitState, type RobloxRateLimitStore, type RobloxRecommendationsQuery, type RobloxRecommendedGame, RobloxRecommendedGameSchema, type RobloxRenameConversationRequest, type RobloxRetryOptions, type RobloxSendMessageRequest, type RobloxServer, type RobloxServerAddress, type RobloxServerAddressTarget, type RobloxServerInfo, type RobloxServerLocation, type RobloxServerPage, type RobloxServerPageQuery, RobloxServerPageRawSchema, RobloxServerRawSchema, RobloxServerSchema, type RobloxServerType, RobloxServerTypeSchema, type RobloxSetBirthdateRequest, RobloxSetBirthdateRequestSchema, type RobloxSetDescriptionRequest, RobloxSetDescriptionRequestSchema, type RobloxSetDisplayNameRequest, RobloxSetDisplayNameRequestSchema, type RobloxSetGenderRequest, RobloxSetGenderRequestSchema, type RobloxSortOrder, RobloxSortOrderSchema, type RobloxThumbnail, RobloxThumbnailBatchItemSchema, RobloxThumbnailBatchResponseSchema, type RobloxThumbnailReturnPolicy, RobloxThumbnailReturnPolicySchema, RobloxThumbnailSchema, type RobloxThumbnailSize, RobloxThumbnailSizes, type RobloxThumbnailState, RobloxThumbnailStateSchema, type RobloxThumbnailTarget, type RobloxThumbnailTargetIdOf, type RobloxThumbnailType, RobloxThumbnailsApi, type RobloxThumbnailsCacheable, RobloxThumbnailsResponseSchema, type RobloxTrustedFriendRequestPage, RobloxTrustedFriendRequestPageSchema, type RobloxTtl, type RobloxUniverseBadgesQuery, type RobloxUniverseId, RobloxUniverseIdSchema, type RobloxUniverseThumbnails, type RobloxUniverseThumbnailsQuery, RobloxUniverseThumbnailsResponseSchema, RobloxUniverseThumbnailsSchema, type RobloxUpdateBadgeRequest, type RobloxUpdateGroupRoleRequest, type RobloxUpdateGroupSettingsRequest, type RobloxUpdatePrivateServerPermissionsRequest, type RobloxUpdatePrivateServerRequest, type RobloxUpdatePrivateServerSubscriptionRequest, type RobloxUser, type RobloxUserAgeBracket, RobloxUserAgeBracketSchema, type RobloxUserBadge, RobloxUserBadgePageSchema, RobloxUserBadgeSchema, type RobloxUserByName, RobloxUserByNameSchema, type RobloxUserCountryCode, RobloxUserCountryCodeSchema, type RobloxUserDescription, RobloxUserDescriptionSchema, type RobloxUserDetail, RobloxUserDetailSchema, type RobloxUserDisplayname, RobloxUserDisplaynameSchema, type RobloxUserFriends, type RobloxUserGameVote, RobloxUserGameVoteSchema, type RobloxUserGender, RobloxUserGenderSchema, type RobloxUserGroupRole, RobloxUserGroupRoleV1Schema, RobloxUserGroupRoleV2Schema, RobloxUserGroupRolesV1ResponseSchema, RobloxUserGroupRolesV2ResponseSchema, type RobloxUserGroups, type RobloxUserId, RobloxUserIdSchema, type RobloxUserName, RobloxUserNameSchema, type RobloxUserPresence, RobloxUserPresenceSchema, type RobloxUserPresencesResponse, RobloxUserPresencesResponseSchema, type RobloxUserRoles, RobloxUserRolesSchema, RobloxUserSchema, type RobloxUserSearchQuery, RobloxUserSearchQuerySchema, type RobloxUserSearchResponse, RobloxUserSearchResponseSchema, type RobloxUserSearchResult, RobloxUserSearchResultSchema, type RobloxUserServer, type RobloxUsernameHistoryEntry, RobloxUsernameHistoryEntrySchema, type RobloxUsernameHistoryQuery, RobloxUsernameHistoryQuerySchema, type RobloxUsernameHistoryResponse, RobloxUsernameHistoryResponseSchema, RobloxUsersApi, type RobloxUsersByNameRequest, RobloxUsersByNameRequestSchema, type RobloxUsersByNameResponse, RobloxUsersByNameResponseSchema, type RobloxUsersCacheable, type RobloxUsersRequest, RobloxUsersRequestSchema, type RobloxUsersResponse, RobloxUsersResponseSchema, type RobloxValidateDisplayNameQuery, RobloxValidateDisplayNameQuerySchema, type RobloxValidateUserDisplayNameQuery, RobloxValidateUserDisplayNameQuerySchema, type RobloxViewerKey, type RobloxWithThumbnail, VigorRoblox, vigorRoblox as default, findFetchFailed, robloxCacheKeyString, robloxDnrRules, toRobloxCreator, vigorRoblox };
