import z from "zod";
import {
    RobloxAssetIdSchema,
    RobloxCursorSchema,
    RobloxGroupIdSchema,
    RobloxJobIdSchema,
    RobloxPageResponseSchema,
    RobloxPlaceIdSchema,
    RobloxPrivateServerIdSchema,
    RobloxUniverseIdSchema,
    type RobloxCursor,
    type RobloxJobId,
    type RobloxPageLimit,
    type RobloxPlaceId,
    type RobloxSortOrder,
    type RobloxUniverseId,
} from "./common";
import { RobloxUserIdSchema, type RobloxUserId } from "./users";
import type { RobloxThumbnail } from "./thumbnails";
import { RobloxCreatorSchema, toRobloxCreator } from "./creator";

// 스펙(create.roblox.com 문서)과 실제 응답이 다른 곳이 많아 실측을 따랐다.
// 예: universeAvatarType/playabilityStatus는 숫자가 아니라 문자열, creator.type도 문자열로 온다.

/** `GameCreator` — `type`으로 좁히면 `id`가 `RobloxUserId` / `RobloxGroupId`가 된다 */
export const RobloxGameCreatorSchema = RobloxCreatorSchema({
    name:             z.string(),
    isRNVAccount:     z.boolean().nullish(),
    hasVerifiedBadge: z.boolean(),
})

/** `GameDetailResponse` — GET /v1/games 의 항목 */
export const RobloxGameSchema = z.object({
    id:                        RobloxUniverseIdSchema,
    rootPlaceId:               RobloxPlaceIdSchema,
    name:                      z.string(),
    description:               z.string().nullable(),
    sourceName:                z.string().nullable(),
    sourceDescription:         z.string().nullable(),
    creator:                   RobloxGameCreatorSchema,
    price:                     z.number().nullable(),
    allowedGearGenres:         z.array(z.string()),
    allowedGearCategories:     z.array(z.string()),
    isGenreEnforced:           z.boolean(),
    copyingAllowed:            z.boolean(),
    playing:                   z.number(),
    visits:                    z.number(),
    maxPlayers:                z.number(),
    created:                   z.string(),
    updated:                   z.string(),
    studioAccessToApisAllowed: z.boolean(),
    createVipServersAllowed:   z.boolean(),
    /** "MorphToR6" | "MorphToR15" | "PlayerChoice" */
    universeAvatarType:        z.string(),
    genre:                     z.string(),
    genre_l1:                  z.string().nullish(),
    genre_l2:                  z.string().nullish(),
    untranslated_genre_l1:     z.string().nullish(),
    isAllGenre:                z.boolean(),
    isFavoritedByUser:         z.boolean(),
    favoritedCount:            z.number(),
    canonicalUrlPath:          z.string().nullish(),
    isContentRestricted:       z.boolean().nullish(),
    licenseDescription:        z.string().nullish(),
    refundLink:                z.string().nullish(),
    localizedFiatPrice:        z.string().nullish(),
})

/** `PurchaseData` */
export const RobloxFiatPurchaseDataSchema = z.object({
    localizedFiatPrice: z.string().nullish(),
    basePriceId:        z.string().nullish(),
})

/** `PlaceDetails` — GET /v1/games/multiget-place-details 의 항목 (인증 필요) */
export const RobloxPlaceDetailsSchema = z.object({
    placeId:             RobloxPlaceIdSchema,
    name:                z.string(),
    description:         z.string().nullish(),
    sourceName:          z.string().nullish(),
    sourceDescription:   z.string().nullish(),
    url:                 z.string(),
    builder:             z.string(),
    /** 유저 id인지 그룹 id인지 응답이 알려 주지 않는다. 필요하면 `getGames([universeId])`의 `creator`를 쓴다 */
    builderId:           z.number(),
    hasVerifiedBadge:    z.boolean(),
    isPlayable:          z.boolean().nullish(),
    reasonProhibited:    z.string().nullish(),
    universeId:          RobloxUniverseIdSchema,
    universeRootPlaceId: RobloxPlaceIdSchema,
    price:               z.number().nullish(),
    imageToken:          z.string().nullish(),
    fiatPurchaseData:    RobloxFiatPurchaseDataSchema.nullish(),
})

/** `GameProductResponse` — GET /v1/games/games-product-info 의 항목 */
export const RobloxGameProductSchema = z.object({
    universeId:       RobloxUniverseIdSchema,
    isForSale:        z.boolean(),
    productId:        z.number().nullable(),
    price:            z.number().nullable(),
    /** 유저 id인지 그룹 id인지 응답이 알려 주지 않는다. 필요하면 `getGames([universeId])`의 `creator`를 쓴다 */
    sellerId:         z.number().nullable(),
    fiatPurchaseData: RobloxFiatPurchaseDataSchema.nullish(),
})

/** `PlayabilityStatusResponse` — 요청 계정 기준 */
export const RobloxGamePlayabilitySchema = z.object({
    universeId:            RobloxUniverseIdSchema,
    /** "Playable", "GuestProhibited", "PurchaseRequired" 등 (스펙은 숫자 enum이라 적지만 문자열로 온다) */
    playabilityStatus:     z.string(),
    isPlayable:            z.boolean(),
    unplayableDisplayText: z.string().nullable(),
    playableUxTreatment:   z.unknown().nullish(),
    upsellUxTreatment:     z.unknown().nullish(),
    privatePlaytestInfo:   z.unknown().nullish(),
    demoModeAvailable:     z.boolean().nullish(),
})

/** `GameVoteResponse` */
export const RobloxGameVotesSchema = z.object({
    id:        RobloxUniverseIdSchema,
    upVotes:   z.number(),
    downVotes: z.number(),
})

/** 즐겨찾기 수. GET /v1/games(`favoritedCount`)나 /v1/games/{id}/favorites/count에서 온다. */
export type RobloxGameFavoriteCount = { universeId: RobloxUniverseId, favoritesCount: number }

/** `UserGameVoteResponse` — 요청 계정의 투표 */
export const RobloxUserGameVoteSchema = z.object({
    canVote:              z.boolean(),
    /** true = 좋아요, false = 싫어요, null = 안 함 */
    userVote:             z.boolean().nullable(),
    reasonForNotVoteable: z.string().nullable(),
})

/** `GameMediaItemResponseV2` — GET /v2/games/{universeId}/media 의 항목 */
export const RobloxGameMediaSchema = z.object({
    assetTypeId: z.number(),
    /** "Image" | "YouTubeVideo" | "GamePreviewVideo" ... */
    assetType:   z.string(),
    /** 동영상 항목은 비어 올 수 있다 (0 등은 null로 바꾼다) */
    imageId:     RobloxAssetIdSchema.nullable().catch(null),
    videoHash:   z.string().nullable(),
    videoTitle:  z.string().nullable(),
    approved:    z.boolean(),
    altText:     z.string().nullable(),
    videoId:     z.string().nullish(),
})

/** `GameResponseModel` — 추천 목록의 항목. 평평하게 오는 `creatorId`/`creatorName`/`creatorType`/`creatorHasVerifiedBadge`는 `creator` 하나로 묶는다 */
export const RobloxRecommendedGameSchema = z.object({
    creatorId:                    z.number(),
    creatorName:                  z.string(),
    creatorType:                  z.string(),
    creatorHasVerifiedBadge:      z.boolean(),
    totalUpVotes:                 z.number(),
    totalDownVotes:               z.number(),
    universeId:                   RobloxUniverseIdSchema,
    name:                         z.string(),
    placeId:                      RobloxPlaceIdSchema,
    playerCount:                  z.number(),
    imageToken:                   z.string().nullable(),
    isSponsored:                  z.boolean(),
    nativeAdData:                 z.string().nullable(),
    isShowSponsoredLabel:         z.boolean(),
    price:                        z.number().nullable(),
    analyticsIdentifier:          z.string().nullable(),
    gameDescription:              z.string().nullable(),
    genre:                        z.string().nullable(),
    minimumAge:                   z.number().nullish(),
    ageRecommendationDisplayName: z.string().nullish(),
    canonicalUrlPath:             z.string().nullish(),
}).transform(({ creatorId, creatorName, creatorType, creatorHasVerifiedBadge, ...rest }) => ({
    ...rest,
    creator: { ...toRobloxCreator(creatorId, creatorType), name: creatorName, hasVerifiedBadge: creatorHasVerifiedBadge },
}))

/** `GameRecommendationsResponse` */
export const RobloxGameRecommendationsSchema = z.object({
    games:             z.array(RobloxRecommendedGameSchema),
    /** 마지막 페이지면 null */
    nextPaginationKey: z.string().nullable(),
})

/** 응답은 `{ id, type: "Place" }`. type은 언제나 Place라 뺀다 */
const RelatedPlaceSchema = z.object({
    id:   RobloxPlaceIdSchema,
    name: z.string().nullish(),
})

/** `GameResponseV2` / `GroupExperienceResponse` — 유저/그룹의 게임 목록 항목 */
export const RobloxGameSummarySchema = z.object({
    id:          RobloxUniverseIdSchema,
    name:        z.string(),
    description: z.string().nullable(),
    creator:     RobloxCreatorSchema({ name: z.string().nullish() }),
    rootPlace:   RelatedPlaceSchema,
    created:     z.string(),
    updated:     z.string(),
    placeVisits: z.number(),
})

/** `GameFavoriteResponseModel` — 즐겨찾기 목록 항목 */
export const RobloxFavoriteGameSchema = RobloxGameSummarySchema.extend({
    price: z.number().nullable(),
})


// ── 서버 ───────────────────────────────────────────────

/** "Public" = 공개, "Friend" = 친구가 있는 서버 (인증 필요) */
export const RobloxServerTypeSchema = z.enum(["Public", "Friend"])

export type RobloxServerType = z.infer<typeof RobloxServerTypeSchema>

/**
 * `GameServerResponse` — 서버 목록 항목. 엔드포인트마다 필드가 조금씩 달라 공통 부분만 남겼다.
 * `playerTokens`는 인증된 요청에서만 채워진다 (아바타 헤드샷의 token 대상으로 쓴다).
 */
export const RobloxServerSchema = z.object({
    id:           RobloxJobIdSchema,
    maxPlayers:   z.number(),
    playing:      z.number(),
    playerTokens: z.array(z.string()),
    fps:          z.number(),
    /** v2 목록에서 인증 없이 받으면 없다 */
    ping:         z.number().nullable(),
})

export type RobloxServer = z.infer<typeof RobloxServerSchema>

export const RobloxServerRawSchema = z.object({
    id:           RobloxJobIdSchema,
    maxPlayers:   z.number(),
    playing:      z.number().nullish(),
    playerTokens: z.array(z.string()).nullish(),
    fps:          z.number().nullish(),
    ping:         z.number().nullish(),
})

export const RobloxServerPageRawSchema = RobloxPageResponseSchema(RobloxServerRawSchema)

/** `PrivateServersApi.GameServerResponse` — 실행 중이 아니면 id/playing/fps/ping이 없다 */
export const RobloxPrivateServerSchema = z.object({
    id:           RobloxJobIdSchema.nullish(),
    maxPlayers:   z.number(),
    playing:      z.number().nullish(),
    playerTokens: z.array(z.string()).nullish(),
    fps:          z.number().nullish(),
    ping:         z.number().nullish(),
    name:         z.string(),
    vipServerId:  RobloxPrivateServerIdSchema,
    accessCode:   z.string().nullish(),
    owner:        z.object({
        id:               RobloxUserIdSchema,
        name:             z.string(),
        displayName:      z.string(),
        hasVerifiedBadge: z.boolean().nullish(),
    }).nullish(),
})

/** `GetPrivateServerListResponse` */
export const RobloxPrivateServerPageSchema = z.object({
    gameJoinRestricted: z.boolean().nullish(),
    previousPageCursor: RobloxCursorSchema.nullable(),
    nextPageCursor:     RobloxCursorSchema.nullable(),
    data:               z.array(RobloxPrivateServerSchema),
})

/** `MyPrivateServersResponse` — 항목 모양은 문서화돼 있지 않다 */
export const RobloxMyPrivateServerPageSchema = z.object({
    previousPageCursor: RobloxCursorSchema.nullable(),
    nextPageCursor:     RobloxCursorSchema.nullable(),
    data:               z.array(z.record(z.string(), z.unknown())),
})

/** `PrivateServerSubscriptionResponse` */
export const RobloxPrivateServerSubscriptionSchema = z.object({
    active:                     z.boolean(),
    expired:                    z.boolean().nullish(),
    expirationDate:             z.string().nullish(),
    price:                      z.number().nullish(),
    canRenew:                   z.boolean().nullish(),
    hasInsufficientFunds:       z.boolean().nullish(),
    hasRecurringProfile:        z.boolean().nullish(),
    hasPriceChanged:            z.boolean().nullish(),
    purchaseScheduleId:         z.number().nullish(),
    totalDiscountAmountInRobux: z.number().nullish(),
    metadata:                   z.unknown().nullish(),
})

/** `PrivateServerPermissionsResponse` */
export const RobloxPrivateServerPermissionsSchema = z.object({
    clanAllowed:    z.boolean(),
    enemyClanId:    RobloxGroupIdSchema.nullish(),
    friendsAllowed: z.boolean(),
    users:          z.array(z.object({ id: RobloxUserIdSchema, name: z.string(), displayName: z.string() })),
})

/** `PrivateServerResponse` — GET/PATCH /v1/vip-servers/{id} */
export const RobloxPrivateServerDetailSchema = z.object({
    id:           RobloxPrivateServerIdSchema,
    name:         z.string(),
    game:         z.unknown().nullish(),
    joinCode:     z.string().nullish(),
    active:       z.boolean(),
    subscription: RobloxPrivateServerSubscriptionSchema.nullish(),
    permissions:  RobloxPrivateServerPermissionsSchema.nullish(),
    link:         z.string().nullish(),
})

/** `CanInviteUserResponse` */
export const RobloxPrivateServerInviteSchema = z.object({
    canInvite:                     z.boolean(),
    doesOwnerPrivacyRestrictJoins: z.boolean(),
    inviteResponseType:            z.number(),
})


// ── gamejoin ───────────────────────────────────────────
// gamejoin.roblox.com은 공개 문서가 없다. 실측한 것만 적는다.
// - User-Agent가 Roblox 클라이언트(`Roblox/WinInet`)가 아니면 status 12로 거절한다.
// - 꽉 찬 서버는 대기열(status 22)로 들어가 joinScript가 없다.

/** 실측한 status 값. 2 = 접속 가능(joinScript 있음), 5 = 서버 없음, 12 = 거절, 22 = 대기열(꽉 참) */
export const RobloxJoinStatus = { Ready: 2, NotFound: 5, Rejected: 12, Queued: 22 } as const

export const RobloxJoinResponseSchema = z.object({
    /** 서버가 없거나 거절되면 비어 올 수 있다 */
    jobId:         RobloxJobIdSchema.nullish().catch(null),
    status:        z.number(),
    message:       z.string().nullable(),
    queuePosition: z.number().nullish(),
    joinScript:    z.object({
        MachineAddress: z.string().nullish(),
        DataCenterId:   z.number().nullish(),
        UdmuxEndpoints: z.array(z.object({ Address: z.string(), Port: z.number() })).nullish(),
    }).nullable(),
})

/** 서버 공개 주소(UDMUX 프록시의 IPv4) */
export const RobloxIpAddressSchema = z.string().min(1).brand("RobloxIpAddress")

export type RobloxIpAddress = z.infer<typeof RobloxIpAddressSchema>

/** `getServerAddresses`에 넘기는 서버 하나. jobId는 place 안에서만 겹치지 않으므로 placeId와 함께 지정한다 */
export type RobloxServerAddressTarget = { placeId: RobloxPlaceId, jobId: RobloxJobId }

/** 서버의 접속 주소. joinScript를 받지 못하면(꽉 참, 인증 없음 등) 주소 필드가 null이다. */
export type RobloxServerAddress = {
    placeId:        RobloxPlaceId
    jobId:          RobloxJobId
    status:         number
    /** 공개 접속 주소 (UDMUX 프록시) */
    ip:             RobloxIpAddress | null
    port:           number | null
    /** 서버 내부 주소 */
    machineAddress: string | null
    dataCenterId:   number | null
}

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
export type RobloxGeolocator<L = unknown> =
    (ips: RobloxIpAddress[]) => readonly (L | null | undefined)[] | Promise<readonly (L | null | undefined)[]>

/** `getServerLocations` 결과의 항목. `location`은 콜백이 돌려준 값 그대로다 */
export type RobloxServerLocation<L = unknown> = {
    ip:       RobloxIpAddress
    location: L
}


// ── 고수준 결과 ─────────────────────────────────────────

/** `getPlaces` 결과 */
export type RobloxPlace = {
    placeId:     RobloxPlaceId
    universeId:  RobloxUniverseId
    game:        RobloxGame
    votes:       RobloxGameVotes | null
    icon:        RobloxThumbnail | null
    thumbnails:  RobloxThumbnail[]
}

/** `getServers` 결과의 항목. `L`은 `.geolocation(fn)` 콜백이 돌려주는 위치 타입 */
export type RobloxServerInfo<L = unknown> = RobloxServer & {
    /** 플레이어 헤드샷. `players` 옵션이 false거나 토큰이 없으면 빈 배열 */
    players:  RobloxThumbnail[]
    /** `address`/`location` 옵션을 켰을 때만 */
    address:  RobloxServerAddress | null
    location: L | null
}

/** `findUsers` 결과의 항목. `L`은 `.geolocation(fn)` 콜백이 돌려주는 위치 타입 */
export type RobloxUserServer<L = unknown> = {
    userId:   RobloxUserId
    /** 어떻게 찾았는지. 못 찾았으면 null */
    foundBy:  "presence" | "headshot" | null
    jobId:    RobloxJobId | null
    /** 서버 목록에서 본 서버. presence로 찾았으면 null */
    server:   RobloxServer | null
    /** `address`/`location` 옵션을 켰을 때만 */
    address:  RobloxServerAddress | null
    location: L | null
}


// ── 요청 ───────────────────────────────────────────────

export type RobloxServerPageQuery = {
    serverType?:       RobloxServerType
    sortOrder?:        RobloxSortOrder
    excludeFullGames?: boolean
    limit?:            RobloxPageLimit
    cursor?:           RobloxCursor
}

export type RobloxGameListQuery = {
    /** 1 = 공개, 2 = 비공개, 4 = 전부 (스펙에 의미가 적혀 있지 않다) */
    accessFilter?: 1 | 2 | 4
    limit?:        RobloxPageLimit
    cursor?:       RobloxCursor
    sortOrder?:    RobloxSortOrder
}

export type RobloxRecommendationsQuery = {
    maxRows?:       number
    paginationKey?: string
}

export type RobloxPrivateServerPageQuery = {
    cursor?:               RobloxCursor
    excludeFriendServers?: boolean
}

export type RobloxMyPrivateServersQuery = {
    /** 0 = 내가 소유한 서버, 1 = 참가한 서버 (스펙에 의미가 적혀 있지 않다) */
    privateServersTab?: number
    itemsPerPage?:      number
    cursor?:            RobloxCursor
}

export type RobloxCreatePrivateServerRequest = { name: string, expectedPrice: number }
export type RobloxUpdatePrivateServerRequest = { name?: string, newJoinCode?: boolean, active?: boolean }
export type RobloxUpdatePrivateServerPermissionsRequest = {
    clanAllowed?:    boolean
    enemyClanId?:    number
    friendsAllowed?: boolean
    usersToAdd?:     RobloxUserId[]
    usersToRemove?:  RobloxUserId[]
}
export type RobloxUpdatePrivateServerSubscriptionRequest = { active: boolean, price?: number }


export const RobloxGamesResponseSchema = z.object({ data: z.array(RobloxGameSchema) })
export const RobloxGameProductsResponseSchema = z.object({ data: z.array(RobloxGameProductSchema) })
export const RobloxGameVotesResponseSchema = z.object({ data: z.array(RobloxGameVotesSchema) })
export const RobloxGameMediaResponseSchema = z.object({ data: z.array(RobloxGameMediaSchema) })
export const RobloxGameSummaryPageSchema = RobloxPageResponseSchema(RobloxGameSummarySchema)
export const RobloxFavoriteGamePageSchema = RobloxPageResponseSchema(RobloxFavoriteGameSchema)

export type RobloxGameCreator = z.infer<typeof RobloxGameCreatorSchema>
export type RobloxGame = z.infer<typeof RobloxGameSchema>
export type RobloxPlaceDetails = z.infer<typeof RobloxPlaceDetailsSchema>
export type RobloxGameProduct = z.infer<typeof RobloxGameProductSchema>
export type RobloxGamePlayability = z.infer<typeof RobloxGamePlayabilitySchema>
export type RobloxGameVotes = z.infer<typeof RobloxGameVotesSchema>
export type RobloxUserGameVote = z.infer<typeof RobloxUserGameVoteSchema>
export type RobloxGameMedia = z.infer<typeof RobloxGameMediaSchema>
export type RobloxRecommendedGame = z.infer<typeof RobloxRecommendedGameSchema>
export type RobloxGameRecommendations = z.infer<typeof RobloxGameRecommendationsSchema>
export type RobloxGameSummary = z.infer<typeof RobloxGameSummarySchema>
export type RobloxFavoriteGame = z.infer<typeof RobloxFavoriteGameSchema>
export type RobloxGameSummaryPage = z.infer<typeof RobloxGameSummaryPageSchema>
export type RobloxFavoriteGamePage = z.infer<typeof RobloxFavoriteGamePageSchema>
export type RobloxPrivateServer = z.infer<typeof RobloxPrivateServerSchema>
export type RobloxPrivateServerPage = z.infer<typeof RobloxPrivateServerPageSchema>
export type RobloxMyPrivateServerPage = z.infer<typeof RobloxMyPrivateServerPageSchema>
export type RobloxPrivateServerDetail = z.infer<typeof RobloxPrivateServerDetailSchema>
export type RobloxPrivateServerSubscription = z.infer<typeof RobloxPrivateServerSubscriptionSchema>
export type RobloxPrivateServerPermissions = z.infer<typeof RobloxPrivateServerPermissionsSchema>
export type RobloxPrivateServerInvite = z.infer<typeof RobloxPrivateServerInviteSchema>
export type RobloxJoinResponse = z.infer<typeof RobloxJoinResponseSchema>
export type RobloxServerPage = { previousPageCursor: RobloxCursor | null, nextPageCursor: RobloxCursor | null, data: RobloxServer[] }
