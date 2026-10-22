import { RobloxBatcher, captureHeaders, mapRoute, nullOn, type RobloxBatchRoute } from "@/core/batcher"
import { robloxCacheKeyString, type RobloxCacheKey, type RobloxCacheValue, type RobloxViewerKey } from "@/core/cache"
import { resolveTtl, type RobloxConfig } from "@/core/config"
import { cached, singleFlight, createHttp, validate } from "@/core/http"
import { canAuthenticate, viewerKey } from "@/core/viewer"
import type { RobloxThumbnailsApi } from "@/apis/thumbnails"
import type { RobloxPresenceApi } from "@/apis/presence"
import { RobloxPresenceType } from "@/types/presence"
import {
    RobloxCursorSchema,
    RobloxEmptyResponseSchema,
    RobloxUniverseIdSchema,
    type RobloxCursor,
    type RobloxGroupId,
    type RobloxJobId,
    type RobloxPlaceId,
    type RobloxPrivateServerId,
    type RobloxUniverseId,
} from "@/types/common"
import {
    RobloxFavoriteGamePageSchema,
    RobloxGameMediaResponseSchema,
    RobloxGamePlayabilitySchema,
    RobloxGameProductsResponseSchema,
    RobloxGameRecommendationsSchema,
    RobloxGamesResponseSchema,
    RobloxGameSummaryPageSchema,
    RobloxGameVotesResponseSchema,
    RobloxGameVotesSchema,
    RobloxIpAddressSchema,
    RobloxJoinResponseSchema,
    RobloxMyPrivateServerPageSchema,
    RobloxPlaceDetailsSchema,
    RobloxPrivateServerDetailSchema,
    RobloxPrivateServerInviteSchema,
    RobloxPrivateServerPageSchema,
    RobloxPrivateServerPermissionsSchema,
    RobloxPrivateServerSubscriptionSchema,
    RobloxServerPageRawSchema,
    RobloxUserGameVoteSchema,
    type RobloxCreatePrivateServerRequest,
    type RobloxGame,
    type RobloxGameFavoriteCount,
    type RobloxGameListQuery,
    type RobloxGameMedia,
    type RobloxGamePlayability,
    type RobloxGameProduct,
    type RobloxGameVotes,
    type RobloxIpAddress,
    type RobloxMyPrivateServersQuery,
    type RobloxPlace,
    type RobloxPlaceDetails,
    type RobloxPrivateServerDetail,
    type RobloxPrivateServerInvite,
    type RobloxPrivateServerPageQuery,
    type RobloxRecommendationsQuery,
    type RobloxServer,
    type RobloxServerAddress,
    type RobloxServerAddressTarget,
    type RobloxGeolocator,
    type RobloxServerInfo,
    type RobloxServerLocation,
    type RobloxServerPage,
    type RobloxServerPageQuery,
    type RobloxUpdatePrivateServerPermissionsRequest,
    type RobloxUpdatePrivateServerRequest,
    type RobloxUpdatePrivateServerSubscriptionRequest,
    type RobloxUserGameVote,
    type RobloxUserServer,
} from "@/types/games"
import type { RobloxThumbnail, RobloxThumbnailSize } from "@/types/thumbnails"
import type { RobloxUserId } from "@/types/users"
import z from "zod"

/** `.ttl({ games: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
export type RobloxGamesCacheable =
    | "getGames" | "getUniverseIds" | "getPlaceDetails" | "getProductInfo" | "getPlayability" | "getVotes"
    | "getFavoriteCounts" | "getMedia" | "getServerAddresses" | "getServerLocations"

const GAMES = "https://games.roblox.com"
const APIS = "https://apis.roblox.com"
const GAMEJOIN = "https://gamejoin.roblox.com"
/** `.geolocation(fn)` 없이 위치를 물었을 때 */
const GEOLOCATE_MISSING = "서버 위치를 조회하려면 .geolocation(fn)으로 IP → 위치 콜백을 넣어야 한다."

/** gamejoin은 Roblox 클라이언트 UA가 아니면 거절한다 (status 12) */
const CLIENT_USER_AGENT = "Roblox/WinInet"

const SERVER_PAGE_LIMIT = 100
/** 우리가 돌려주는 v2 서버 목록 커서 앞에 붙인다. v1과 커서 형식이 달라 섞어 쓸 수 없다. */
const V2_CURSOR = "v2:"

/** `findUsers`가 비교하는 헤드샷. 대상과 서버 플레이어를 같은 옵션으로 받아야 해시가 맞는다 */
const FIND_HEADSHOT = { size: "150x150", format: "Png", isCircular: false } as const

/** 기본 아바타의 헤드샷 해시. 수많은 플레이어가 같은 해시라 이걸로는 찾을 수 없다 (4.1.0에서 옮김) */
const DEFAULT_AVATAR_HASHES = new Set([
    "5816BB6B457A7A2FD8F0299D6F79DADF", "D517857E5CC51E2FF93E63E20241169E",
    "56DFC0F87BABBE49C6D1BE708AE9A66A", "C16BE31B5A403C45279B3FF5533980E9",
    "51E47F0C53DA3A617158586DF73B1236", "ACCF91F734E311F4A0EF23C3EDA54284",
    "CF083BB49C3304C593C43617FF06418E", "3259891600987E41060EC3A43511F2F9",
    "19F6EB627A565DF5ABC0B82925B2C760", "5CB6042A80C64D34BA98721C96F5D6A3",
    "E592BA2BBFA44C9021643D25BC014BD5", "661AD135B4409FF51BC4A6D80E6AC0C7",
    "8E0E19FD517F46AD46A8A322377CA89B", "1E8FFEC57F042949AEFAC69FECC72D38",
    "64D3D8C3021F7E8442CCA2825051A87A",
])

/** 헤드샷 URL의 아바타 해시 (`…-<32자리 hex>-…`). 형식이 다르면 URL 전체를 쓴다 */
function avatarHash(t: RobloxThumbnail): string | null {
    if (t.state !== "Completed" || !t.imageUrl) return null
    return t.imageUrl.match(/-([0-9A-Fa-f]{32})-/)?.[1].toUpperCase() ?? t.imageUrl
}

const csv = (ids: readonly number[]) => ids.join(",")
const found = <T>(list: (T | null)[]) => list.filter((x): x is T => x !== null)


// ── 경로 ───────────────────────────────────────────────
// 같은 결과를 주는 엔드포인트가 여러 개면 경로로 나란히 둔다. 버킷 키가 같으면 한도도 같이 센다.
// 한도는 2026-10 실측이고 IP 단위다 (서버 목록은 계정을 바꿔도 같은 한도를 쓴다).

/** id 목록을 쿼리로 받는 GET. 서버는 없는 id를 빼고 준다. */
function listRoute<R>(opts: {
    bucket:  string
    origin?: string
    limit:   number
    path:    string[]
    param:   string
    /** true면 `a=1&a=2`, false면 `a=1,2` */
    repeat?: boolean
    auth?:   () => boolean
    fetch:   (res: unknown) => R[]
    schema:  z.ZodType
    idOf:    (item: R) => number
}): RobloxBatchRoute<number, R | null> {
    return {
        bucket: opts.bucket,
        origin: opts.origin,
        limit:  opts.limit,
        group:  () => opts.auth && !opts.auth() ? null : "",
        async send(http, ids, onHeaders) {
            const res = await http()
                .path(...opts.path)
                .query({ [opts.param]: opts.repeat ? ids : csv(ids) })
                .middlewares(captureHeaders(onHeaders))
                .middlewares(validate(opts.schema))
                .request()
            const byId = new Map(opts.fetch(res).map(item => [opts.idOf(item), item]))
            return ids.map(id => byId.get(id) ?? null)
        },
    }
}

/** id 하나씩 path로 받는 GET. 없으면(404 등) null */
function singleRoute<R>(opts: {
    bucket:   string
    origin?:  string
    path:     (id: number) => (string | number)[]
    schema:   z.ZodType
    pick:     (res: any, id: number) => R
    missing?: number[]
    auth?:    () => boolean
}): RobloxBatchRoute<number, R | null> {
    return {
        bucket: opts.bucket,
        origin: opts.origin,
        limit:  1,
        group:  () => opts.auth && !opts.auth() ? null : "",
        async send(http, [id], onHeaders) {
            const res = await nullOn(opts.missing ?? [404], onHeaders, () => http()
                .path(...opts.path(id))
                .middlewares(captureHeaders(onHeaders))
                .middlewares(validate(opts.schema))
                .request())
            return [res === null ? null : opts.pick(res, id)]
        },
    }
}

type ServerPageTarget = { placeId: RobloxPlaceId, query: RobloxServerPageQuery }

/** 서버 목록. v1과 public-server-browser-service는 응답과 커서가 같고, v2는 커서 형식이 다르다. */
function serverRoute(bucket: string, path: (placeId: RobloxPlaceId, type: string) => (string | number)[], v2: boolean): RobloxBatchRoute<ServerPageTarget, RobloxServerPage> {
    return {
        bucket,
        limit: 1,
        group(t) {
            const cursor = t.query.cursor
            if (!cursor) return ""
            return cursor.startsWith(V2_CURSOR) === v2 ? "" : null
        },
        async send(http, [t], onHeaders) {
            const { serverType = "Public", cursor, ...rest } = t.query
            const query: Record<string, string | number | boolean> = { limit: SERVER_PAGE_LIMIT }
            if (rest.limit !== undefined) query.limit = rest.limit
            if (rest.excludeFullGames !== undefined) query.excludeFullGames = rest.excludeFullGames
            if (rest.sortOrder !== undefined) query.sortOrder = rest.sortOrder
            if (cursor) query.cursor = v2 ? cursor.slice(V2_CURSOR.length) : cursor

            const res = await http()
                .path(...path(t.placeId, serverType))
                .query(query)
                .middlewares(captureHeaders(onHeaders))
                .middlewares(validate(RobloxServerPageRawSchema))
                .request()
            const tag = (c: RobloxCursor | null) => c && v2 ? RobloxCursorSchema.parse(V2_CURSOR + c) : c
            return [{
                previousPageCursor: tag(res.previousPageCursor),
                nextPageCursor:     tag(res.nextPageCursor),
                data: res.data.map((s): RobloxServer => ({
                    id:           s.id,
                    maxPlayers:   s.maxPlayers,
                    playing:      s.playing ?? 0,
                    playerTokens: s.playerTokens ?? [],
                    fps:          s.fps ?? 0,
                    ping:         s.ping ?? null,
                })),
            }]
        },
    }
}


/** POST gamejoin /v1/join-game-instance — 5회/초. 꽉 찬 서버는 대기열로 들어가 주소가 없다. */
const addressRoute: RobloxBatchRoute<RobloxServerAddressTarget, RobloxServerAddress> = {
    bucket: "gamejoin POST /v1/join-game-instance",
    limit:  1,
    group:  () => "",
    async send(http, [t], onHeaders) {
        const res = await http()
            .path("v1", "join-game-instance")
            .body("overwrite", { placeId: t.placeId, gameId: t.jobId })
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(RobloxJoinResponseSchema))
            .request()
        const endpoint = res.joinScript?.UdmuxEndpoints?.[0]
        return [{
            placeId:        t.placeId,
            jobId:          t.jobId,
            status:         res.status,
            ip:             endpoint ? RobloxIpAddressSchema.parse(endpoint.Address) : null,
            port:           endpoint?.Port ?? null,
            machineAddress: res.joinScript?.MachineAddress ?? null,
            dataCenterId:   res.joinScript?.DataCenterId ?? null,
        }]
    },
}

/** `getServers` 옵션 */
export type RobloxGetServersOptions = RobloxServerPageQuery & {
    /**
     * 이만큼 모일 때까지 페이지를 따라간다. 기본 100.
     * 커서는 페이지 경계만 가리킬 수 있어서 마지막 페이지를 자르지 않는다 — 결과가 이보다 많을 수 있다.
     */
    count?:    number
    /** 플레이어 헤드샷. false면 받지 않는다. 기본 150x150 Png (playerTokens가 있어야 하므로 인증 필요) */
    players?:  false | { size?: RobloxThumbnailSize<"AvatarHeadShot">, format?: "Png" | "Jpeg" | "Webp", isCircular?: boolean }
    /** gamejoin으로 서버 주소를 받는다. 인증 필요. 꽉 찬 서버는 주소가 없다 */
    address?:  boolean
    /** 서버 위치. address를 포함하고 `.geolocation(fn)`이 필요하다 */
    location?: boolean
}

/** `findUsers` 옵션 */
export type RobloxFindUsersOptions = Omit<RobloxServerPageQuery, "cursor"> & {
    /** 서버 목록을 이만큼까지 뒤진다 (페이지 단위라 조금 넘을 수 있다). 기본 1000 */
    maxServers?: number
    /** presence를 보조로 쓴다 (서버가 보이면 바로 쓰고, 다른 place에 있으면 그만 찾는다). 기본 true */
    presence?:   boolean
    /** gamejoin으로 찾은 서버의 주소를 받는다. 인증 필요 */
    address?:    boolean
    /** 찾은 서버의 위치. address를 포함하고 `.geolocation(fn)`이 필요하다 */
    location?:   boolean
}


/** games.roblox.com + gamejoin.roblox.com */
export class RobloxGamesApi<L = unknown> {
    private readonly http
    private readonly auth = () => canAuthenticate(this.config)

    private readonly games
    private readonly favoriteCounts
    private readonly votes
    private readonly products
    private readonly playability
    private readonly placeDetails
    private readonly universeIds
    private readonly media
    private readonly favorited
    private readonly userVotes
    private readonly privateServersEnabled
    private readonly privateServerDetails
    private readonly invites
    private readonly serverPages
    private readonly groupGames
    private readonly myPrivateServers
    private readonly addresses

    constructor(private readonly config: RobloxConfig, private readonly thumbnails: RobloxThumbnailsApi, private readonly presence: RobloxPresenceApi) {
        this.http = createHttp(config, GAMES)

        const gamesRoute = <R>(pick: (g: RobloxGame) => R): RobloxBatchRoute<number, R | null> => {
            const route = listRoute<RobloxGame>({
                bucket: "games GET /v1/games", limit: 50, path: ["v1", "games"], param: "universeIds",
                schema: RobloxGamesResponseSchema, fetch: res => (res as { data: RobloxGame[] }).data, idOf: g => g.id,
            })
            return mapRoute(route, g => g && pick(g))
        }
        const placeDetailsRoute = listRoute<RobloxPlaceDetails>({
            bucket: "games GET /v1/games/multiget-place-details", limit: 50, path: ["v1", "games", "multiget-place-details"],
            param: "placeIds", repeat: true, auth: this.auth,
            schema: z.array(RobloxPlaceDetailsSchema), fetch: res => res as RobloxPlaceDetails[], idOf: p => p.placeId,
        })

        // GET /v1/games — 300회/분, 50개씩
        this.games = new RobloxBatcher(config, GAMES, [gamesRoute(g => g)])
        // 즐겨찾기 수는 게임 상세에도 있다. 상세(50개씩)를 먼저, 막히면 하나씩 받는 엔드포인트(200회/분)로
        this.favoriteCounts = new RobloxBatcher(config, GAMES, [
            gamesRoute(g => g.favoritedCount),
            singleRoute<number>({
                bucket: "games GET /v1/games/{id}/favorites/count", path: id => ["v1", "games", id, "favorites", "count"],
                schema: z.object({ favoritesCount: z.number() }), pick: res => res.favoritesCount,
            }),
        ])
        // 투표 수 — 묶음(100개, 200회/분)과 하나씩(200회/분)은 한도가 따로다
        this.votes = new RobloxBatcher(config, GAMES, [
            listRoute<RobloxGameVotes>({
                bucket: "games GET /v1/games/votes", limit: 100, path: ["v1", "games", "votes"], param: "universeIds",
                schema: RobloxGameVotesResponseSchema, fetch: res => (res as { data: RobloxGameVotes[] }).data, idOf: v => v.id,
            }),
            singleRoute<RobloxGameVotes>({
                bucket: "games GET /v1/games/{id}/votes", path: id => ["v1", "games", id, "votes"],
                schema: RobloxGameVotesSchema, pick: res => res,
            }),
        ])
        this.products = new RobloxBatcher(config, GAMES, [listRoute<RobloxGameProduct>({
            bucket: "games GET /v1/games/games-product-info", limit: 100, path: ["v1", "games", "games-product-info"], param: "universeIds",
            schema: RobloxGameProductsResponseSchema, fetch: res => (res as { data: RobloxGameProduct[] }).data, idOf: p => p.universeId,
        })])
        this.playability = new RobloxBatcher(config, GAMES, [listRoute<RobloxGamePlayability>({
            bucket: "games GET /v1/games/multiget-playability-status", limit: 50, path: ["v1", "games", "multiget-playability-status"], param: "universeIds",
            schema: z.array(RobloxGamePlayabilitySchema), fetch: res => res as RobloxGamePlayability[], idOf: p => p.universeId,
        })])
        this.placeDetails = new RobloxBatcher(config, GAMES, [placeDetailsRoute])
        // place → universe. 인증돼 있으면 상세(50개씩, 1000회/분), 아니면 apis의 하나씩(60회/분)
        this.universeIds = new RobloxBatcher<number, RobloxUniverseId | null>(config, GAMES, [
            mapRoute(placeDetailsRoute, p => p?.universeId ?? null),
            singleRoute<RobloxUniverseId | null>({
                bucket: "apis GET /universes/v1/places/{id}/universe", origin: APIS, path: id => ["universes", "v1", "places", id, "universe"],
                schema: z.object({ universeId: RobloxUniverseIdSchema.nullable() }), pick: res => res.universeId,
            }),
        ])
        this.media = new RobloxBatcher<{ universeId: number, all: boolean }, RobloxGameMedia[] | null>(config, GAMES, [{
            bucket: "games GET /v2/games/{id}/media",
            limit:  1,
            group:  () => "",
            async send(http, [t], onHeaders) {
                const res = await nullOn([404], onHeaders, () => http()
                    .path("v2", "games", t.universeId, "media")
                    .query(t.all ? { fetchAllExperienceRelatedMedia: true } : {})
                    .middlewares(captureHeaders(onHeaders))
                    .middlewares(validate(RobloxGameMediaResponseSchema))
                    .request())
                return [res?.data ?? null]
            },
        }])
        this.favorited = new RobloxBatcher(config, GAMES, [singleRoute<boolean>({
            bucket: "games GET /v1/games/{id}/favorites", path: id => ["v1", "games", id, "favorites"], auth: this.auth,
            schema: z.object({ isFavorited: z.boolean() }), pick: res => res.isFavorited,
        })])
        this.userVotes = new RobloxBatcher(config, GAMES, [singleRoute<RobloxUserGameVote>({
            bucket: "games GET /v1/games/{id}/votes/user", path: id => ["v1", "games", id, "votes", "user"], auth: this.auth,
            schema: RobloxUserGameVoteSchema, pick: res => res,
        })])
        this.privateServersEnabled = new RobloxBatcher(config, GAMES, [singleRoute<boolean>({
            bucket: "games GET /v1/private-servers/enabled-in-universe/{id}", path: id => ["v1", "private-servers", "enabled-in-universe", id],
            schema: z.object({ privateServersEnabled: z.boolean() }), pick: res => res.privateServersEnabled, missing: [400, 404],
        })])
        this.privateServerDetails = new RobloxBatcher(config, GAMES, [singleRoute<RobloxPrivateServerDetail>({
            bucket: "games GET /v1/vip-servers/{id}", path: id => ["v1", "vip-servers", id], auth: this.auth,
            schema: RobloxPrivateServerDetailSchema, pick: res => res, missing: [400, 403, 404],
        })])
        this.invites = new RobloxBatcher(config, GAMES, [singleRoute<RobloxPrivateServerInvite>({
            bucket: "games GET /v1/vip-server/can-invite/{id}", path: id => ["v1", "vip-server", "can-invite", id], auth: this.auth,
            schema: RobloxPrivateServerInviteSchema, pick: res => res,
        })])
        // 서버 목록은 엔드포인트마다 3회/분뿐이다. 세 엔드포인트의 한도가 따로라 나눠 쓴다.
        this.serverPages = new RobloxBatcher(config, GAMES, [
            serverRoute("games GET /v1/games/{id}/servers", (p, type) => ["v1", "games", p, "servers", type], false),
            serverRoute("games GET /v1/public-server-browser-service/games/{id}/servers", (p, type) => ["v1", "public-server-browser-service", "games", p, "servers", type], false),
            serverRoute("games GET /v2/games/{id}/servers", (p, type) => ["v2", "games", p, "servers", type], true),
        ])
        // 그룹 게임 목록 — games와 gamesV2는 응답과 커서가 같고 한도(3회/초)는 따로다
        const groupGamesRoute = (bucket: string, last: string): RobloxBatchRoute<{ groupId: RobloxGroupId, query: RobloxGameListQuery }, z.infer<typeof RobloxGameSummaryPageSchema>> => ({
            bucket, limit: 1, group: () => "",
            async send(http, [t], onHeaders) {
                return [await http()
                    .path("v2", "groups", t.groupId, last)
                    .query(t.query)
                    .middlewares(captureHeaders(onHeaders))
                    .middlewares(validate(RobloxGameSummaryPageSchema))
                    .request()]
            },
        })
        this.groupGames = new RobloxBatcher(config, GAMES, [
            groupGamesRoute("games GET /v2/groups/{id}/games", "games"),
            groupGamesRoute("games GET /v2/groups/{id}/gamesV2", "gamesV2"),
        ])
        // 내 비공개 서버 — 두 엔드포인트의 응답이 같고 한도(100회/분, 200회/분)는 따로다
        const myRoute = (bucket: string, first: string): RobloxBatchRoute<RobloxMyPrivateServersQuery, z.infer<typeof RobloxMyPrivateServerPageSchema>> => ({
            bucket, limit: 1, group: () => this.auth() ? "" : null,
            async send(http, [query], onHeaders) {
                return [await http()
                    .path("v1", first, "my-private-servers")
                    .query(query)
                    .middlewares(captureHeaders(onHeaders))
                    .middlewares(validate(RobloxMyPrivateServerPageSchema))
                    .request()]
            },
        })
        this.myPrivateServers = new RobloxBatcher(config, GAMES, [
            myRoute("games GET /v1/vip-servers/my-private-servers", "vip-servers"),
            myRoute("games GET /v1/private-servers/my-private-servers", "private-servers"),
        ])
        this.addresses = new RobloxBatcher(config, GAMEJOIN, [addressRoute], { userAgent: CLIENT_USER_AGENT })
    }

    private ttl(method: RobloxGamesCacheable) {
        return resolveTtl(this.config, "games", method)
    }

    /** 항목 하나씩 캐시하며 batcher로 보낸다. 계정별로 나누는 키는 viewer를 받는다 (쿠키 로테이션 중이면 캐시하지 않는다). */
    private async each<I, R extends RobloxCacheValue<RobloxCacheKey>>(
        method: RobloxGamesCacheable,
        ids: readonly I[],
        load: (id: I) => Promise<R | null>,
        key: (id: I, viewer: RobloxViewerKey) => RobloxCacheKey,
        byViewer = false,
    ): Promise<(R | null)[]> {
        const ttl = this.ttl(method)
        const viewer = byViewer ? (this.config.cache ? await viewerKey(this.config) : null) : "anonymous"
        return Promise.all(ids.map(id => viewer === null ? load(id) : cached(this.config, key(id, viewer), ttl, () => load(id))))
    }

    // ── 게임 조회 ──────────────────────────────────────
    // 배열을 받는 메서드는 입력 순서로 돌려주고, 없는 대상은 뺀다.
    // 같은 틱에 들어온 호출은 모아서 보내므로 따로따로 불러도 된다.

    /** GET /v1/games — 게임(universe) 상세 */
    async getGames(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGame[]> {
        return found(await this.each("getGames", universeIds, id => this.games.load(String(id), id), id => ["games", "getGames", id]))
    }

    /** place가 속한 universe. 인증돼 있으면 place 상세를 쓰고, 아니면 apis.roblox.com으로 하나씩 묻는다. */
    async getUniverseIds(placeIds: readonly RobloxPlaceId[]): Promise<{ placeId: RobloxPlaceId, universeId: RobloxUniverseId }[]> {
        const ids = await this.each("getUniverseIds", placeIds, id => this.universeIds.load(String(id), id), id => ["games", "getUniverseIds", id])
        return found(placeIds.map((placeId, i) => ids[i] ? { placeId, universeId: ids[i] } : null))
    }

    /** GET /v1/games/multiget-place-details — 인증 필요. 플레이 가능 여부는 요청 계정 기준이다. */
    async getPlaceDetails(placeIds: readonly RobloxPlaceId[]): Promise<RobloxPlaceDetails[]> {
        return found(await this.each("getPlaceDetails", placeIds, id => this.placeDetails.load(String(id), id), (id, v) => ["games", "getPlaceDetails", v, id], true))
    }

    /** GET /v1/games/games-product-info — 유료 게임 구매 정보 */
    async getProductInfo(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGameProduct[]> {
        return found(await this.each("getProductInfo", universeIds, id => this.products.load(String(id), id), id => ["games", "getProductInfo", id]))
    }

    /** GET /v1/games/multiget-playability-status — 요청 계정이 플레이할 수 있는지 */
    async getPlayability(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGamePlayability[]> {
        return found(await this.each("getPlayability", universeIds, id => this.playability.load(String(id), id), (id, v) => ["games", "getPlayability", v, id], true))
    }

    /** 좋아요/싫어요 수 */
    async getVotes(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGameVotes[]> {
        return found(await this.each("getVotes", universeIds, id => this.votes.load(String(id), id), id => ["games", "getVotes", id]))
    }

    /** 즐겨찾기 수 */
    async getFavoriteCounts(universeIds: readonly RobloxUniverseId[]): Promise<RobloxGameFavoriteCount[]> {
        const counts = await this.each("getFavoriteCounts", universeIds, id => this.favoriteCounts.load(String(id), id), id => ["games", "getFavoriteCounts", id])
        return found(universeIds.map((universeId, i) => counts[i] === null ? null : { universeId, favoritesCount: counts[i] }))
    }

    /** GET /v2/games/{universeId}/media — 게임 페이지의 이미지/영상. `all`이면 관련 미디어까지 */
    async getMedia(universeIds: readonly RobloxUniverseId[], opts: { all?: boolean } = {}): Promise<{ universeId: RobloxUniverseId, media: RobloxGameMedia[] }[]> {
        const all = opts.all ?? false
        const lists = await this.each("getMedia", universeIds,
            universeId => this.media.load(`${universeId}:${all}`, { universeId, all }),
            universeId => ["games", "getMedia", universeId, all])
        return found(universeIds.map((universeId, i) => lists[i] ? { universeId, media: lists[i] } : null))
    }

    /** GET /v1/games/recommendations/game/{universeId} — 비슷한 게임 */
    getRecommendations(universeId: RobloxUniverseId, query: RobloxRecommendationsQuery = {}) {
        const params: Record<string, string | number> = { MaxRows: query.maxRows ?? 20 }
        if (query.paginationKey) params.PaginationKey = query.paginationKey
        return this.http()
            .path("v1", "games", "recommendations", "game", universeId)
            .query(params)
            .middlewares(validate(RobloxGameRecommendationsSchema))
            .request()
    }

    /** GET /v2/users/{userId}/games — 유저가 만든 게임 (limit은 10/25/50) */
    getUserGames(userId: RobloxUserId, query: RobloxGameListQuery = {}) {
        return this.http()
            .path("v2", "users", userId, "games")
            .query(query)
            .middlewares(validate(RobloxGameSummaryPageSchema))
            .request()
    }

    /** GET /v2/users/{userId}/favorite/games — 유저의 즐겨찾기 */
    getUserFavoriteGames(userId: RobloxUserId, query: RobloxGameListQuery = {}) {
        return this.http()
            .path("v2", "users", userId, "favorite", "games")
            .query(query)
            .middlewares(validate(RobloxFavoriteGamePageSchema))
            .request()
    }

    /** 그룹이 만든 게임. /v2/groups/{groupId}/games와 gamesV2를 번갈아 쓴다. */
    getGroupGames(groupId: RobloxGroupId, query: RobloxGameListQuery = {}) {
        return this.groupGames.load(JSON.stringify([groupId, query]), { groupId, query })
    }

    // ── 요청 계정 기준 (인증 필요) ─────────────────────

    /** GET /v1/games/{universeId}/favorites — 내가 즐겨찾기했는지 */
    async getFavorited(universeIds: readonly RobloxUniverseId[]): Promise<{ universeId: RobloxUniverseId, isFavorited: boolean }[]> {
        const list = await Promise.all(universeIds.map(id => this.favorited.load(String(id), id)))
        return found(universeIds.map((universeId, i) => list[i] === null ? null : { universeId, isFavorited: list[i] }))
    }

    /** POST /v1/games/{universeId}/favorites */
    async setFavorited(universeId: RobloxUniverseId, isFavorited: boolean): Promise<void> {
        await this.http()
            .path("v1", "games", universeId, "favorites")
            .body("overwrite", { isFavorited })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/games/{universeId}/votes/user — 내 투표와 투표 가능 여부 */
    async getUserVotes(universeIds: readonly RobloxUniverseId[]): Promise<(RobloxUserGameVote & { universeId: RobloxUniverseId })[]> {
        const list = await Promise.all(universeIds.map(id => this.userVotes.load(String(id), id)))
        return found(universeIds.map((universeId, i) => list[i] && { universeId, ...list[i] }))
    }

    /** PATCH /v1/games/{universeId}/user-votes — true = 좋아요, false = 싫어요, null = 취소. 게임을 플레이한 적이 있어야 한다. */
    async setUserVote(universeId: RobloxUniverseId, vote: boolean | null): Promise<void> {
        await this.http()
            .method("PATCH")
            .path("v1", "games", universeId, "user-votes")
            .body("overwrite", { vote })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    // ── 서버 ───────────────────────────────────────────

    /**
     * 서버 목록 한 페이지. 엔드포인트마다 3회/분이라 세 엔드포인트를 나눠 쓴다.
     * 받은 커서는 같은 옵션으로 다시 넘긴다 (어느 엔드포인트의 커서인지는 라이브러리가 기억한다).
     * `Friend`와 `playerTokens`는 인증이 필요하다.
     */
    getServerPage(placeId: RobloxPlaceId, query: RobloxServerPageQuery = {}): Promise<RobloxServerPage> {
        return this.serverPages.load(JSON.stringify([placeId, query]), { placeId, query })
    }

    /**
     * 서버 접속 주소. gamejoin으로 해당 서버에 접속을 요청해 joinScript에서 뽑는다 (인증 필요, 5회/초).
     * 꽉 찬 서버는 대기열로 들어가 주소가 null이다. 주소를 받은 결과만 캐시한다.
     */
    async getServerAddresses(targets: readonly RobloxServerAddressTarget[]): Promise<RobloxServerAddress[]> {
        const ttl = this.ttl("getServerAddresses")
        // jobId는 place 안에서만 겹치지 않는다고 보장되므로 키에 placeId를 함께 넣는다
        return Promise.all(targets.map(t => cached(this.config, ["games", "getServerAddresses", t.placeId, t.jobId], ttl,
            () => this.addresses.load(`${t.placeId}:${t.jobId}`, t), r => r.ip !== null)))
    }

    /**
     * IP → 위치. `.geolocation(fn)`으로 넣은 콜백에 캐시에 없는 IP를 중복 없이 한 번에 넘긴다.
     * 결과는 입력 순서이고 `location`은 콜백이 돌려준 값 그대로다. 콜백이 null을 준 IP는 빼고, 캐시하지 않는다.
     * 같은 IP를 이미 조회하는 중이면(다른 호출이 동시에 물은 경우) 그 결과를 같이 기다리고 다시 묻지 않는다.
     */
    async getServerLocations(ips: readonly RobloxIpAddress[]): Promise<RobloxServerLocation<L>[]> {
        const geolocate = this.config.geolocate
        if (!geolocate) throw new Error(GEOLOCATE_MISSING)
        const id = (ip: RobloxIpAddress) => robloxCacheKeyString(["games", "getServerLocations", ip])

        // 진행 중이 아닌 IP만 한 번에 묻고, IP마다 그 결과를 등록한다. 여기까지는 await 없이 이어져 다른 호출이 끼어들지 않는다.
        const unique = [...new Set(ips)]
        const fresh = unique.filter(ip => !this.config.inflight.has(id(ip)))
        const batch = fresh.length ? this.locate(fresh, geolocate as RobloxGeolocator<L>) : null
        const values = await Promise.all(unique.map(ip => singleFlight(this.config, id(ip), () => batch!.then(located => located.get(ip) ?? null))))

        const known = new Map(unique.map((ip, i) => [ip, values[i]]))
        return found(ips.map(ip => {
            const location = known.get(ip)
            return location === null || location === undefined ? null : { ip, location }
        }))
    }

    /** 캐시를 보고, 없는 IP만 콜백에 넘긴 뒤 저장한다. 모르는 IP는 결과에 없다 */
    private async locate(ips: RobloxIpAddress[], geolocate: RobloxGeolocator<L>): Promise<Map<RobloxIpAddress, L>> {
        const store = this.config.cache
        const ttl = this.ttl("getServerLocations")
        const known = new Map<RobloxIpAddress, L>()

        if (store) await Promise.all(ips.map(async ip => {
            const hit = await store.get(["games", "getServerLocations", ip])
            if (hit !== undefined && hit !== null) known.set(ip, hit as L)
        }))

        const misses = ips.filter(ip => !known.has(ip))
        if (misses.length) {
            const results = await geolocate(misses)
            await Promise.all(misses.map(async (ip, i) => {
                const location = results[i]
                if (location === null || location === undefined) return
                known.set(ip, location)
                if (store) await store.set(["games", "getServerLocations", ip], location, ttl)
            }))
        }
        return known
    }

    /** GET /v1/games/{placeId}/private-servers — 내가 들어갈 수 있는 비공개 서버 */
    getPrivateServers(placeId: RobloxPlaceId, query: RobloxPrivateServerPageQuery = {}) {
        const params: Record<string, string | boolean> = {}
        if (query.cursor) params.exclusiveStartKeyCursor = query.cursor
        if (query.excludeFriendServers !== undefined) params.excludeFriendServers = query.excludeFriendServers
        return this.http()
            .path("v1", "games", placeId, "private-servers")
            .query(params)
            .middlewares(validate(RobloxPrivateServerPageSchema))
            .request()
    }

    /** 내 비공개 서버 목록. /v1/vip-servers/…와 /v1/private-servers/…를 번갈아 쓴다. */
    getMyPrivateServers(query: RobloxMyPrivateServersQuery = {}) {
        return this.myPrivateServers.load(JSON.stringify(query), query)
    }

    /** GET /v1/private-servers/enabled-in-universe/{universeId} */
    async getPrivateServersEnabled(universeIds: readonly RobloxUniverseId[]): Promise<{ universeId: RobloxUniverseId, privateServersEnabled: boolean }[]> {
        const list = await Promise.all(universeIds.map(id => this.privateServersEnabled.load(String(id), id)))
        return found(universeIds.map((universeId, i) => list[i] === null ? null : { universeId, privateServersEnabled: list[i] }))
    }

    /** GET /v1/vip-servers/{id} — 내가 관리하는 비공개 서버의 설정 */
    async getPrivateServerDetails(ids: readonly RobloxPrivateServerId[]): Promise<RobloxPrivateServerDetail[]> {
        return found(await Promise.all(ids.map(id => this.privateServerDetails.load(String(id), id))))
    }

    /** GET /v1/vip-server/can-invite/{userId} — 내 비공개 서버에 초대할 수 있는지 */
    async getPrivateServerInvites(userIds: readonly RobloxUserId[]): Promise<(RobloxPrivateServerInvite & { userId: RobloxUserId })[]> {
        const list = await Promise.all(userIds.map(id => this.invites.load(String(id), id)))
        return found(userIds.map((userId, i) => list[i] && { userId, ...list[i] }))
    }

    /** POST /v1/games/vip-servers/{universeId} — 비공개 서버를 산다 */
    createPrivateServer(universeId: RobloxUniverseId, request: RobloxCreatePrivateServerRequest) {
        return this.http()
            .path("v1", "games", "vip-servers", universeId)
            .body("overwrite", request)
            .middlewares(validate(z.record(z.string(), z.unknown())))
            .request()
    }

    /** PATCH /v1/vip-servers/{id} — 이름, 참가 코드 재발급, 켜기/끄기 */
    updatePrivateServer(id: RobloxPrivateServerId, request: RobloxUpdatePrivateServerRequest) {
        return this.http()
            .method("PATCH")
            .path("v1", "vip-servers", id)
            .body("overwrite", request)
            .middlewares(validate(RobloxPrivateServerDetailSchema))
            .request()
    }

    /** PATCH /v1/vip-servers/{id}/permissions */
    updatePrivateServerPermissions(id: RobloxPrivateServerId, request: RobloxUpdatePrivateServerPermissionsRequest) {
        return this.http()
            .method("PATCH")
            .path("v1", "vip-servers", id, "permissions")
            .body("overwrite", request)
            .middlewares(validate(RobloxPrivateServerPermissionsSchema))
            .request()
    }

    /** PATCH /v1/vip-servers/{id}/subscription — 구독 갱신 켜기/끄기 */
    updatePrivateServerSubscription(id: RobloxPrivateServerId, request: RobloxUpdatePrivateServerSubscriptionRequest) {
        return this.http()
            .method("PATCH")
            .path("v1", "vip-servers", id, "subscription")
            .body("overwrite", request)
            .middlewares(validate(RobloxPrivateServerSubscriptionSchema))
            .request()
    }

    // ── 고수준 ─────────────────────────────────────────

    /**
     * place들의 게임 정보를 한 번에. place → universe → 상세/투표/아이콘/썸네일을 모아서 준다.
     * 없는 place(또는 universe)는 뺀다.
     */
    async getPlaces(placeIds: readonly RobloxPlaceId[]): Promise<RobloxPlace[]> {
        const pairs = await this.getUniverseIds(placeIds)
        const universeIds = [...new Set(pairs.map(p => p.universeId))]
        if (!universeIds.length) return []

        const [games, votes, icons, thumbnails] = await Promise.all([
            this.getGames(universeIds),
            this.getVotes(universeIds),
            this.thumbnails.get(universeIds.map(id => ({ type: "GameIcon", targetId: id, size: "512x512" }) as const)),
            this.thumbnails.getGameThumbnails(universeIds, { countPerUniverse: 10 }),
        ])
        const gameById = new Map(games.map(g => [g.id, g]))
        const votesById = new Map(votes.map(v => [v.id, v]))
        const iconById = new Map(universeIds.map((id, i) => [id, icons[i]]))
        const thumbsById = new Map(thumbnails.map(t => [t.universeId as number, t.thumbnails]))

        return found(pairs.map(({ placeId, universeId }) => {
            const game = gameById.get(universeId)
            if (!game) return null
            const icon = iconById.get(universeId)
            return {
                placeId,
                universeId,
                game,
                votes:      votesById.get(universeId) ?? null,
                icon:       icon && icon.state !== "Error" ? icon : null,
                thumbnails: thumbsById.get(universeId) ?? [],
            }
        }))
    }

    /**
     * 서버 목록을 페이지를 따라가며 `count`개 이상 모으고(페이지 단위), 플레이어 헤드샷/주소/위치를 붙인다.
     * `nextPageCursor`는 마지막으로 받은 페이지의 다음이라, 넘기면 빠짐없이 이어서 받는다.
     * 서버 목록 한도가 빡빡해서(엔드포인트당 3회/분) 많이 모을수록 오래 걸린다.
     */
    async getServers(placeId: RobloxPlaceId, opts: RobloxGetServersOptions = {}): Promise<{ data: RobloxServerInfo<L>[], nextPageCursor: RobloxCursor | null }> {
        const { count = 100, players = {}, address = false, location = false, ...query } = opts
        if (location && !this.config.geolocate) throw new Error(GEOLOCATE_MISSING)

        const servers: RobloxServer[] = []
        let cursor = query.cursor ?? null
        do {
            const page = await this.getServerPage(placeId, { ...query, cursor: cursor ?? undefined })
            servers.push(...page.data)
            cursor = page.nextPageCursor
        } while (cursor && servers.length < count)
        // 자르면 잘린 서버를 돌려받은 커서로 다시 받을 수 없다.
        const data = servers

        const [headshots, addresses] = await Promise.all([
            players === false ? null : this.thumbnails.get(data.flatMap(s => s.playerTokens.map(token => ({ type: "AvatarHeadShot", token, ...players }) as const))),
            address || location ? this.getServerAddresses(data.map(s => ({ placeId, jobId: s.id }))) : null,
        ])
        const ips = [...new Set(addresses?.map(a => a.ip).filter((ip): ip is RobloxIpAddress => ip !== null) ?? [])]
        const locations = location ? new Map((await this.getServerLocations(ips)).map(l => [l.ip, l.location])) : null

        let offset = 0
        return {
            nextPageCursor: cursor,
            data: data.map((server, i): RobloxServerInfo<L> => {
                const own = headshots ? headshots.slice(offset, offset += server.playerTokens.length) : []
                const addr = addresses?.[i] ?? null
                return {
                    ...server,
                    players:  own.filter(t => t.state === "Completed"),
                    address:  addr,
                    location: addr?.ip ? locations?.get(addr.ip) ?? null : null,
                }
            }),
        }
    }

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
    async findUsers(placeId: RobloxPlaceId, userIds: readonly RobloxUserId[], opts: RobloxFindUsersOptions = {}): Promise<RobloxUserServer<L>[]> {
        const { maxServers = 1000, presence = true, address = false, location = false, ...query } = opts
        if (location && !this.config.geolocate) throw new Error(GEOLOCATE_MISSING)
        if (!this.auth()) throw new Error("서버 목록에서 유저를 찾으려면 플레이어 토큰이 필요해 인증해야 한다.")

        const targets = [...new Set(userIds)]
        const hits = new Map<RobloxUserId, { foundBy: "presence" | "headshot", jobId: RobloxJobId, server: RobloxServer | null }>()
        /** presence로 다른 place에 있다고 확정된 유저 */
        const elsewhere = new Set<RobloxUserId>()
        // 실패해도 헤드샷 탐색은 그대로 간다.
        const presenceTask = presence ? this.presence.get(targets).then(list => {
            for (const p of list) {
                if (p.placeId === placeId && p.gameId) {
                    if (!hits.has(p.userId)) hits.set(p.userId, { foundBy: "presence", jobId: p.gameId, server: null })
                } else if (p.userPresenceType === RobloxPresenceType.InGame && p.placeId !== null) {
                    elsewhere.add(p.userId)
                }
            }
        }, () => {}) : null
        const searching = (userId: RobloxUserId) => !hits.has(userId) && !elsewhere.has(userId)

        const shots = await this.thumbnails.get(targets.map(targetId => ({ type: "AvatarHeadShot", targetId, ...FIND_HEADSHOT }) as const))
        const byHash = new Map<string, RobloxUserId[]>()
        shots.forEach((t, i) => {
            const hash = avatarHash(t)
            if (hash && !DEFAULT_AVATAR_HASHES.has(hash)) byHash.set(hash, [...byHash.get(hash) ?? [], targets[i]])
        })
        // 아바타가 같은 대상끼리는 누가 누군지 구별할 수 없다.
        for (const [hash, users] of byHash) if (users.length > 1) byHash.delete(hash)

        let cursor: RobloxCursor | undefined
        let scanned = 0
        while ([...byHash.values()].some(([userId]) => searching(userId)) && scanned < maxServers) {
            const page = await this.getServerPage(placeId, { ...query, cursor })
            scanned += page.data.length
            const players = page.data.flatMap(server => server.playerTokens.map(token => ({ server, token })))
            const headshots = await this.thumbnails.get(players.map(({ token }) => ({ type: "AvatarHeadShot", token, ...FIND_HEADSHOT }) as const))
            headshots.forEach((t, i) => {
                const hash = avatarHash(t)
                const [userId] = hash && byHash.get(hash) || []
                if (!userId || !searching(userId)) return
                hits.set(userId, { foundBy: "headshot", jobId: players[i].server.id, server: players[i].server })
                byHash.delete(hash!)
            })
            if (!page.nextPageCursor) break
            cursor = page.nextPageCursor
        }
        // 헤드샷으로 못 찾은 유저가 남았을 때만 presence를 기다린다. 다 찾았으면 늦게 온 presence는 버린다.
        if (presenceTask && targets.some(searching)) await presenceTask

        const jobIds = [...new Set([...hits.values()].map(f => f.jobId))]
        const addresses = address || location
            ? new Map((await this.getServerAddresses(jobIds.map(jobId => ({ placeId, jobId })))).map(a => [a.jobId, a]))
            : null
        const ips = [...new Set([...addresses?.values() ?? []].map(a => a.ip).filter((ip): ip is RobloxIpAddress => ip !== null))]
        const locations = location ? new Map((await this.getServerLocations(ips)).map(l => [l.ip, l.location])) : null

        return userIds.map((userId): RobloxUserServer<L> => {
            const f = hits.get(userId)
            const addr = f ? addresses?.get(f.jobId) ?? null : null
            return {
                userId,
                foundBy:  f?.foundBy ?? null,
                jobId:    f?.jobId ?? null,
                server:   f?.server ?? null,
                address:  addr,
                location: addr?.ip ? locations?.get(addr.ip) ?? null : null,
            }
        })
    }
}
