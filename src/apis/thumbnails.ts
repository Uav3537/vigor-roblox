import { resolveTtl, type RobloxConfig } from "@/core/config"
import { RobloxBatcher, captureHeaders, type RobloxBatchRoute } from "@/core/batcher"
import { cached, validate } from "@/core/http"
import { finish, found, settle, type RobloxItemError } from "@/core/partial"
import type { RobloxUniverseId } from "@/types/common"
import {
    RobloxThumbnailBatchResponseSchema,
    RobloxThumbnailSchema,
    RobloxThumbnailsResponseSchema,
    RobloxUniverseThumbnailsResponseSchema,
    type RobloxThumbnail,
    type RobloxThumbnailTargetIdOf,
    type RobloxThumbnailTarget,
    type RobloxThumbnailType,
    type RobloxUniverseThumbnails,
    type RobloxUniverseThumbnailsQuery,
} from "@/types/thumbnails"

/** `.ttl({ thumbnails: { ... } })`로 캐시할 수 있는 메서드. `get`은 대상 하나씩 캐시한다. */
export type RobloxThumbnailsCacheable = "get" | "getGameThumbnails"

const ORIGIN = "https://thumbnails.roblox.com"

/** batch / 목록 GET 한 번에 보낼 수 있는 최대 개수 (101개부터 400 code 1) */
const MULTI_GET_LIMIT = 100

/** Pending이면 이만큼 기다렸다 다시 묻는다. n번째 재시도는 n × PENDING_DELAY 뒤 */
const PENDING_RETRIES = 4
const PENDING_DELAY = 1000

/** 캐시해도 되는 상태. Pending 등은 곧 바뀐다. */
const FINAL_STATES = new Set(["Completed", "Blocked"])

const DEFAULT_SIZE: Partial<Record<RobloxThumbnailType, string>> = { GameThumbnail: "768x432" }

/** 기본값을 채우고 키를 정렬한 대상. 같은 요청이면 같은 key가 나온다. */
type Normalized = {
    type:                 RobloxThumbnailType
    targetId?:            number
    token?:               string
    size?:                string
    format?:              string
    isCircular?:          boolean
    includeBackground?:   boolean
    includeProfileFrame?: boolean
    returnPolicy?:        string
    placeId?:             number
    universeId?:          number
    accessContext?:       string
    headShape?:           string
    useGltf?:             boolean
}

const SINGLE_TYPES = new Set<RobloxThumbnailType>(["AnimatedAsset", "Avatar3d", "Outfit3d", "Asset3d"])

function normalize(target: RobloxThumbnailTarget): Normalized {
    const t = { ...target } as Normalized
    if (!SINGLE_TYPES.has(t.type)) {
        t.size ??= DEFAULT_SIZE[t.type] ?? "150x150"
        t.format ??= "Png"
        t.isCircular ??= false
    }
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(t).sort()) {
        const value = (t as Record<string, unknown>)[key]
        if (value !== undefined) out[key] = value
    }
    return out as Normalized
}

const keyOf = (t: Normalized) => JSON.stringify(t)

const missing = (t: Normalized): RobloxThumbnail => ({ targetId: t.targetId ?? 0, state: "Error", imageUrl: null, version: null })


// ── 경로 ───────────────────────────────────────────────
// 같은 대상을 받을 수 있는 엔드포인트가 여러 개다. 결과는 어느 쪽이든 같다 (실측으로 확인).
// 한도가 IP 단위로 따로라서, 하나가 막히면 다른 쪽으로 보낸다.

type Route = RobloxBatchRoute<Normalized, RobloxThumbnail>

const placeHeader = (t: Normalized): Record<string, string> => t.placeId ? { "Roblox-Place-Id": String(t.placeId) } : {}

const BATCH_TYPES = new Set<RobloxThumbnailType>([
    "Avatar", "AvatarHeadShot", "AvatarBust", "Outfit", "Asset", "GameIcon", "PlaceIcon", "GameThumbnail",
    "BadgeIcon", "GamePass", "BundleThumbnail", "GroupIcon", "DeveloperProduct", "Look", "Screenshot", "CreatorContextAsset",
])

/** POST /v1/batch — 60회/초, 타입이 섞여도 100개까지 한 번에. 기본 경로. */
const batchRoute: Route = {
    bucket: "thumbnails POST /v1/batch",
    limit:  MULTI_GET_LIMIT,
    group(t) {
        if (!BATCH_TYPES.has(t.type)) return null
        // returnPolicy는 GET에만 있다.
        if (t.returnPolicy && t.returnPolicy !== "PlaceHolder") return null
        return String(t.placeId ?? "")
    },
    async send(http, targets, onHeaders) {
        const body = targets.map((t, i) => ({
            requestId:           String(i),
            type:                t.type,
            targetId:            t.targetId,
            token:               t.token,
            size:                t.size,
            format:              t.format,
            isCircular:          t.isCircular,
            includeBackground:   t.includeBackground,
            includeProfileFrame: t.includeProfileFrame,
            accessContext:       t.accessContext,
            headShape:           t.headShape,
        }))
        const res = await http()
            .path("v1", "batch")
            .headers("merge", placeHeader(targets[0]))
            .body("overwrite", body)
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(RobloxThumbnailBatchResponseSchema))
            .request()
        const byId = new Map(res.data.map(r => [r.requestId, r]))
        return targets.map((t, i) => {
            const r = byId.get(String(i))
            return r ? RobloxThumbnailSchema.parse(r) : missing(t)
        })
    },
}

/** 타입별 목록 GET. 서버가 중복 id는 합치고 없는 id는 빼서 주므로 targetId로 맞춘다. */
function listRoute(type: RobloxThumbnailType, path: string[], idsParam: string, limit: string): Route {
    const pathOf = (t: Normalized) => path.map(seg => seg === "{universeId}" ? String(t.universeId) : seg)
    return {
        bucket: `thumbnails GET /${path.join("/")} (${limit})`,
        limit:  MULTI_GET_LIMIT,
        group(t) {
            if (t.type !== type || t.targetId === undefined) return null
            if (path.includes("{universeId}") && t.universeId === undefined) return null
            const { targetId: _, ...rest } = t
            return keyOf(rest)
        },
        async send(http, targets, onHeaders) {
            const t = targets[0]
            const query: Record<string, string | number | boolean> = {
                [idsParam]: targets.map(x => x.targetId).join(","),
                size:       t.size!,
                format:     t.format!,
                isCircular: t.isCircular!,
            }
            if (t.includeBackground !== undefined) query.includeBackground = t.includeBackground
            if (t.includeProfileFrame !== undefined) query.includeProfileFrame = t.includeProfileFrame
            if (t.returnPolicy !== undefined) query.returnPolicy = t.returnPolicy

            const res = await http()
                .path(...pathOf(t))
                .headers("merge", placeHeader(t))
                .query(query)
                .middlewares(captureHeaders(onHeaders))
                .middlewares(validate(RobloxThumbnailsResponseSchema))
                .request()
            const byId = new Map(res.data.map(r => [r.targetId, r]))
            return targets.map(x => byId.get(x.targetId!) ?? missing(x))
        },
    }
}

/** id 하나씩만 받는 GET */
function singleRoute(type: RobloxThumbnailType, path: string[], idParam: string, extra: (t: Normalized) => Record<string, boolean> = () => ({})): Route {
    return {
        bucket: `thumbnails GET /${path.join("/")}`,
        limit:  1,
        group: t => t.type === type ? "" : null,
        async send(http, [t], onHeaders) {
            const res = await http()
                .path(...path)
                .headers("merge", placeHeader(t))
                .query({ [idParam]: t.targetId!, ...extra(t) })
                .middlewares(captureHeaders(onHeaders))
                .middlewares(validate(RobloxThumbnailSchema))
                .request()
            return [res]
        },
    }
}

/** 앞에 있을수록 먼저 쓴다. 한도는 2026-10 실측 (IP 단위). */
const ROUTES: Route[] = [
    batchRoute,
    listRoute("Avatar",           ["v1", "users", "avatar"],                    "userIds",             "60/min"),
    listRoute("AvatarHeadShot",   ["v1", "users", "avatar-headshot"],           "userIds",             "120/min"),
    listRoute("AvatarBust",       ["v1", "users", "avatar-bust"],               "userIds",             "60/min"),
    listRoute("Outfit",           ["v1", "users", "outfits"],                   "userOutfitIds",       "60/min"),
    listRoute("Asset",            ["v1", "assets"],                             "assetIds",            "50/s"),
    listRoute("GameIcon",         ["v1", "games", "icons"],                     "universeIds",         "1200/min"),
    listRoute("PlaceIcon",        ["v1", "places", "gameicons"],                "placeIds",            "60/min"),
    listRoute("GameThumbnail",    ["v1", "games", "{universeId}", "thumbnails"], "thumbnailIds",       "60/min"),
    listRoute("BadgeIcon",        ["v1", "badges", "icons"],                    "badgeIds",            "100/min"),
    listRoute("GamePass",         ["v1", "game-passes"],                        "gamePassIds",         "100/min"),
    listRoute("BundleThumbnail",  ["v1", "bundles", "thumbnails"],              "bundleIds",           "60/min"),
    listRoute("GroupIcon",        ["v1", "groups", "icons"],                    "groupIds",            "100/min"),
    listRoute("DeveloperProduct", ["v1", "developer-products", "icons"],        "developerProductIds", "60/min"),
    singleRoute("AnimatedAsset", ["v1", "asset-thumbnail-animated"], "assetId"),
    singleRoute("Avatar3d",      ["v1", "users", "avatar-3d"],       "userId"),
    singleRoute("Outfit3d",      ["v1", "users", "outfit-3d"],       "outfitId"),
    singleRoute("Asset3d",       ["v1", "assets-thumbnail-3d"],      "assetId", (t): Record<string, boolean> => t.useGltf === undefined ? {} : { useGltf: t.useGltf }),
]


type GameThumbnailsTarget = { universeId: RobloxUniverseId, query: RobloxUniverseThumbnailsQuery }

/** GET /v1/games/multiget/thumbnails — 60회/분, 100개씩. 옵션이 같은 것끼리만 묶는다 */
const gameThumbnailsRoute: RobloxBatchRoute<GameThumbnailsTarget, RobloxUniverseThumbnails | null> = {
    bucket: "thumbnails GET /v1/games/multiget/thumbnails",
    limit:  MULTI_GET_LIMIT,
    group:  t => keyOf(t.query as Normalized),
    async send(http, targets, onHeaders) {
        const res = await http()
            .path("v1", "games", "multiget", "thumbnails")
            .query({ size: "768x432", format: "Png", isCircular: false, ...targets[0].query, universeIds: targets.map(t => t.universeId).join(",") })
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(RobloxUniverseThumbnailsResponseSchema))
            .request()
        const byId = new Map(res.data.map(u => [u.universeId, u]))
        return targets.map(t => byId.get(t.universeId) ?? null)
    },
}

/** thumbnails.roblox.com */
export class RobloxThumbnailsApi {
    private readonly batcher
    private readonly gameThumbnails

    constructor(private readonly config: RobloxConfig) {
        this.gameThumbnails = new RobloxBatcher(config, ORIGIN, [gameThumbnailsRoute])
        this.batcher = new RobloxBatcher(config, ORIGIN, ROUTES, {
            again: (result, tries) => result.state === "Pending" && tries < PENDING_RETRIES ? (tries + 1) * PENDING_DELAY : null,
        })
    }

    private ttl(method: RobloxThumbnailsCacheable) {
        return resolveTtl(this.config, "thumbnails", method)
    }

    /**
     * 썸네일들. 결과는 입력과 같은 순서이고, 타입이 섞여도 된다. 하나만 필요하면 원소 하나짜리 배열을 넣는다.
     * 엔드포인트는 대상과 남은 한도를 보고 라이브러리가 고른다. 같은 틱에 들어온 호출은 모아서 보내고,
     * Pending이면 잠시 기다렸다 다시 묻는다. 없는 id는 `state: "Error"`로 돌아온다.
     * 요청이 실패한 대상이 있으면 `RobloxPartialError`를 던진다 (`results`에는 받은 것만 있어 순서가 입력과 어긋난다).
     */
    async get<T extends RobloxThumbnailTarget>(targets: readonly T[]): Promise<RobloxThumbnail<RobloxThumbnailTargetIdOf<T>>[]> {
        const { values, errors } = await settle(targets, t => this.load(t))
        return finish(found(values), errors) as RobloxThumbnail<RobloxThumbnailTargetIdOf<T>>[]
    }

    /** `get`과 같지만 던지지 않는다. `values`는 입력과 같은 자리이고 요청이 실패한 대상은 null이며, 그 에러는 `errors`에 있다 */
    async getSettled<T extends RobloxThumbnailTarget>(targets: readonly T[]): Promise<{ values: (RobloxThumbnail<RobloxThumbnailTargetIdOf<T>> | null)[], errors: RobloxItemError<T>[] }> {
        return settle(targets, t => this.load(t) as Promise<RobloxThumbnail<RobloxThumbnailTargetIdOf<T>>>)
    }

    private load(target: RobloxThumbnailTarget): Promise<RobloxThumbnail> {
        const normalized = normalize(target)
        const key = keyOf(normalized)
        const run = () => this.batcher.load(key, normalized)
        // token은 매번 새로 발급되는 일회용 값이라 캐시하지 않는다.
        if (normalized.token !== undefined) return run()
        return cached(this.config, { service: "thumbnails", method: "get", target: normalized as RobloxThumbnailTarget }, this.ttl("get"), run, r => FINAL_STATES.has(r.state))
    }

    /**
     * GET /v1/games/multiget/thumbnails — universe마다 등록된 썸네일 목록. 결과는 입력 순서이고 없는 universe는 뺀다.
     * 같은 틱에 들어온 호출은 옵션이 같으면 100개씩 묶는다.
     */
    async getGameThumbnails(universeIds: readonly RobloxUniverseId[], query: RobloxUniverseThumbnailsQuery = {}): Promise<RobloxUniverseThumbnails[]> {
        const { values, errors } = await settle(universeIds, universeId =>
            cached(this.config, { service: "thumbnails", method: "getGameThumbnails", universeId, query }, this.ttl("getGameThumbnails"),
                () => this.gameThumbnails.load(JSON.stringify([universeId, query]), { universeId, query })))
        return finish(found(values), errors)
    }
}
