import z from "zod"
import { RobloxBatcher, captureHeaders, nullOn, type RobloxBatchRoute } from "@/core/batcher"
import { resolveTtl, type RobloxConfig } from "@/core/config"
import { cached, createHttp, validate } from "@/core/http"
import { finish, found, settle } from "@/core/partial"
import type { RobloxThumbnailsApi } from "@/apis/thumbnails"
import { RobloxAssetIdSchema, RobloxEmptyResponseSchema, type RobloxAssetId, type RobloxBadgeId, type RobloxUniverseId } from "@/types/common"
import {
    RobloxBadgeAwardSchema,
    RobloxBadgeAwardsResponseSchema,
    RobloxBadgeMetadataSchema,
    RobloxBadgePageSchema,
    RobloxBadgeSchema,
    RobloxCreatedBadgeSchema,
    RobloxUserBadgePageSchema,
    type RobloxBadge,
    type RobloxBadgeAwardStatus,
    type RobloxBadgePageQuery,
    type RobloxCreateBadgeRequest,
    type RobloxUniverseBadgesQuery,
    type RobloxUpdateBadgeRequest,
} from "@/types/badges"
import type { RobloxBadgeIconOptions, RobloxWithThumbnail } from "@/types/thumbnails"
import type { RobloxUserId } from "@/types/users"

/** `.ttl({ badges: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
export type RobloxBadgesCacheable = "getBadges" | "getAwardedDates"

const ORIGIN = "https://badges.roblox.com"

/** awarded-dates 한 번에 보낼 수 있는 최대 개수 (101개부터 403 "Challenge is required") */
const AWARDED_DATES_LIMIT = 100


type AwardTarget = { userId: RobloxUserId, badgeId: RobloxBadgeId }

/** badges.roblox.com */
export class RobloxBadgesApi {
    private readonly http

    private readonly badges
    private readonly awards
    private readonly freeQuotas

    constructor(private readonly config: RobloxConfig, private readonly thumbnails: RobloxThumbnailsApi) {
        this.http = createHttp(config, ORIGIN)
        const batcher = <T, R>(...routes: RobloxBatchRoute<T, R>[]) => new RobloxBatcher<T, R>(config, ORIGIN, routes)

        // 한도는 2026-10 실측 (IP 단위)
        // GET /v1/badges/{badgeId} — 600회/분. 여러 개를 한 번에 받는 엔드포인트는 없다
        this.badges = batcher<RobloxBadgeId, RobloxBadge | null>({
            bucket: "badges GET /v1/badges/{badgeId}",
            limit:  1,
            group:  () => "",
            async send(http, [badgeId], onHeaders) {
                return [await nullOn([404], onHeaders, () => http()
                    .path("v1", "badges", badgeId)
                    .middlewares(captureHeaders(onHeaders))
                    .middlewares(validate(RobloxBadgeSchema))
                    .request())]
            },
        })
        // 획득 날짜 — 묶음(10회/분, 100개씩)과 하나씩(100회/분)은 한도가 따로다. 둘 다 인증이 필요하다.
        // 묶음이 403(Challenge)으로 막히면 하나씩으로 넘어간다.
        this.awards = batcher<AwardTarget, string | null>(
            {
                bucket: "badges GET /v1/users/{userId}/badges/awarded-dates",
                limit:  AWARDED_DATES_LIMIT,
                group:  t => String(t.userId),
                async send(http, targets, onHeaders) {
                    const res = await http()
                        .path("v1", "users", targets[0].userId, "badges", "awarded-dates")
                        .query({ badgeIds: targets.map(t => t.badgeId).join(",") })
                        .middlewares(captureHeaders(onHeaders))
                        .middlewares(validate(RobloxBadgeAwardsResponseSchema))
                        .request()
                    const byId = new Map(res.data.map(a => [a.badgeId, a.awardedDate]))
                    return targets.map(t => byId.get(t.badgeId) ?? null)
                },
            },
            {
                bucket: "badges GET /v1/users/{userId}/badges/{badgeId}/awarded-date",
                limit:  1,
                group:  () => "",
                async send(http, [t], onHeaders) {
                    // 받지 않았으면 204와 빈 body
                    const res = await http()
                        .path("v1", "users", t.userId, "badges", t.badgeId, "awarded-date")
                        .middlewares(captureHeaders(onHeaders))
                        .middlewares(validate(RobloxBadgeAwardSchema.nullish().catch(null)))
                        .request()
                    return [res?.awardedDate ?? null]
                },
            },
        )
        // GET /v1/universes/{universeId}/free-badges-quota — 60회/분
        this.freeQuotas = batcher<RobloxUniverseId, number | null>({
            bucket: "badges GET /v1/universes/{universeId}/free-badges-quota",
            limit:  1,
            group:  () => "",
            async send(http, [universeId], onHeaders) {
                return [await nullOn([404], onHeaders, () => http()
                    .path("v1", "universes", universeId, "free-badges-quota")
                    .middlewares(captureHeaders(onHeaders))
                    .middlewares(validate(z.number()))
                    .request())]
            },
        })
    }

    private ttl(method: RobloxBadgesCacheable) {
        return resolveTtl(this.config, "badges", method)
    }

    // ── 공개 조회 ──────────────────────────────────────
    // 배열을 받는 메서드는 입력 순서로 돌려주고, 없는 대상은 뺀다.
    // 같은 틱에 들어온 호출은 모아서 보내므로 따로따로 불러도 된다.

    /**
     * GET /v1/badges/{badgeId} — 배지 상세, 통계, 배지를 주는 게임. 배지 하나당 요청 하나다 (600회/분).
     * `thumbnail`을 주면 배지 아이콘을 같이 받는다.
     */
    getBadges(badgeIds: readonly RobloxBadgeId[], opts: { thumbnail: true | RobloxBadgeIconOptions }): Promise<RobloxWithThumbnail<RobloxBadge>[]>
    getBadges(badgeIds: readonly RobloxBadgeId[], opts?: { thumbnail?: undefined }): Promise<RobloxBadge[]>
    async getBadges(badgeIds: readonly RobloxBadgeId[], opts: { thumbnail?: true | RobloxBadgeIconOptions } = {}): Promise<RobloxBadge[]> {
        const badges = settle(badgeIds, id => cached(this.config, { service: "badges", method: "getBadges", badgeId: id }, this.ttl("getBadges"), () => this.badges.load(String(id), id)))
        if (!opts.thumbnail) {
            const { values, errors } = await badges
            return finish(found(values), errors)
        }
        const target = opts.thumbnail === true ? {} : opts.thumbnail
        const [{ values, errors }, icons] = await Promise.all([badges, this.thumbnails.getSettled(badgeIds.map(targetId => ({ ...target, type: "BadgeIcon", targetId }) as const))])
        const byId = new Map(badgeIds.map((id, i) => [id, icons.values[i]]))
        return finish(found(values).map(b => ({ ...b, thumbnail: byId.get(b.id) ?? null })), errors)
    }

    /** GET /v1/universes/{universeId}/badges — 게임의 배지 (100회/분). 없는 게임이면 빈 목록이다 */
    getUniverseBadges(universeId: RobloxUniverseId, query: RobloxUniverseBadgesQuery = {}) {
        return this.http()
            .path("v1", "universes", universeId, "badges")
            .query(query)
            .middlewares(validate(RobloxBadgePageSchema))
            .request()
    }

    /** GET /v1/users/{userId}/badges — 유저가 받은 배지 (1000회/분). 인증 필요. 없는 유저면 404 */
    getUserBadges(userId: RobloxUserId, query: RobloxBadgePageQuery = {}) {
        return this.http()
            .path("v1", "users", userId, "badges")
            .query(query)
            .middlewares(validate(RobloxUserBadgePageSchema))
            .request()
    }

    /**
     * 유저가 배지들을 받았는지와 받은 날짜. 인증 필요. 결과는 입력과 같은 순서이고, 받지 않은 배지는 `awardedDate`가 null이다
     * (없는 배지도 null이다 — 서버가 구분해 주지 않는다).
     * awarded-dates(100개씩, 10회/분)와 awarded-date(하나씩, 100회/분)를 나눠 쓴다. 받은 날짜만 캐시한다.
     */
    async getAwardedDates(userId: RobloxUserId, badgeIds: readonly RobloxBadgeId[]): Promise<RobloxBadgeAwardStatus[]> {
        const { values, errors } = await settle(badgeIds, badgeId => cached(
            this.config, { service: "badges", method: "getAwardedDates", userId, badgeId }, this.ttl("getAwardedDates"),
            () => this.awards.load(`${userId}:${badgeId}`, { userId, badgeId }),
        ))
        const failed = new Set(errors.map(e => e.input))
        // 받지 않은 배지도 null이라 실패는 errors로 가린다
        return finish(badgeIds.flatMap((badgeId, i) => failed.has(badgeId) ? [] : [{ badgeId, awardedDate: values[i] }]), errors)
    }

    /** GET /v1/universes/{universeId}/free-badges-quota — 오늘(UTC) 남은 무료 배지 수. 없는 게임은 뺀다 */
    async getFreeQuotas(universeIds: readonly RobloxUniverseId[]): Promise<{ universeId: RobloxUniverseId, quota: number }[]> {
        const { values, errors } = await settle(universeIds, id => this.freeQuotas.load(String(id), id))
        return finish(found(universeIds.map((universeId, i) => values[i] === null ? null : { universeId, quota: values[i] })), errors)
    }

    /** GET /v1/badges/metadata — 배지 비용과 이름/설명 길이 제한 */
    getMetadata() {
        return this.http()
            .path("v1", "badges", "metadata")
            .middlewares(validate(RobloxBadgeMetadataSchema))
            .request()
    }

    // ── 관리 (인증 필요) ───────────────────────────────

    /**
     * POST /v1/universes/{universeId}/badges — 배지를 만든다. 게임의 시작 place에 붙는다.
     * 그날의 무료 한도(`getFreeQuotas`)를 넘으면 `paymentSource`에서 `getMetadata().badgeCreationPrice`만큼 낸다.
     */
    createBadge(universeId: RobloxUniverseId, request: RobloxCreateBadgeRequest) {
        const form = new FormData()
        form.append("name", request.name)
        if (request.description !== undefined) form.append("description", request.description)
        if (request.paymentSource !== undefined) form.append("paymentSourceType", request.paymentSource === "User" ? "1" : "2")
        if (request.expectedCost !== undefined) form.append("expectedCost", String(request.expectedCost))
        if (request.isActive !== undefined) form.append("isActive", String(request.isActive))
        if (request.icon !== undefined) form.append("files", request.icon)
        return this.http()
            .path("v1", "universes", universeId, "badges")
            .body("overwrite", form)
            .middlewares(validate(RobloxCreatedBadgeSchema))
            .request()
    }

    /** PATCH /v1/badges/{badgeId} — 이름, 설명, 활성화 여부 */
    async updateBadge(badgeId: RobloxBadgeId, request: RobloxUpdateBadgeRequest): Promise<void> {
        await this.http()
            .method("PATCH")
            .path("v1", "badges", badgeId)
            .body("overwrite", request)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** POST /v1/badges/{badgeId}/icon — 아이콘을 multipart로 올린다. 새 아이콘 이미지의 asset id를 돌려준다 */
    async setIcon(badgeId: RobloxBadgeId, icon: Blob): Promise<RobloxAssetId> {
        const form = new FormData()
        form.append("Files", icon)
        const res = await this.http()
            .path("v1", "badges", badgeId, "icon")
            .body("overwrite", form)
            .middlewares(validate(z.object({ targetId: RobloxAssetIdSchema })))
            .request()
        return res.targetId
    }

    /** DELETE /v1/user/badges/{badgeId} — 요청 계정에서 배지를 지운다 */
    async removeBadge(badgeId: RobloxBadgeId): Promise<void> {
        await this.http()
            .method("DELETE")
            .path("v1", "user", "badges", badgeId)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }
}
