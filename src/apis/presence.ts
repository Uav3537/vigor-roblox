import { RobloxBatcher, captureHeaders, type RobloxBatchRoute } from "@/core/batcher"
import { resolveTtl, type RobloxConfig } from "@/core/config"
import { cached, validate } from "@/core/http"
import { viewerKey } from "@/core/viewer"
import { RobloxUserPresencesResponseSchema, RobloxUserPresenceSchema, type RobloxUserPresence } from "@/types/presence"
import type { RobloxUserId } from "@/types/users"

/** `.ttl({ presence: { ... } })`로 캐시할 수 있는 메서드. `get`은 유저 한 명씩 캐시한다. */
export type RobloxPresenceCacheable = "get"

const ORIGIN = "https://presence.roblox.com"

/** POST /v1/presence/users 한 번에 보낼 수 있는 최대 개수 (51개부터 400 code 3) */
const MULTI_GET_LIMIT = 50

/** presence API의 유일한 엔드포인트. 60회/분 (2026-10 실측, IP 단위) */
const usersRoute: RobloxBatchRoute<RobloxUserId, RobloxUserPresence> = {
    bucket: "presence POST /v1/presence/users",
    limit:  MULTI_GET_LIMIT,
    group:  () => "",
    async send(http, userIds, onHeaders) {
        const res = await http()
            .path("v1", "presence", "users")
            .body("overwrite", { userIds })
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(RobloxUserPresencesResponseSchema))
            .request()
        const byId = new Map(res.userPresences.map(p => [p.userId, p]))
        // 서버는 없는 유저도 Offline으로 준다. 빠진 게 있으면 같은 모양으로 채운다.
        return userIds.map(id => byId.get(id) ?? RobloxUserPresenceSchema.parse({
            userId: id, userPresenceType: 0, lastLocation: null, placeId: null, rootPlaceId: null, gameId: null, universeId: null,
        }))
    },
}

/** presence.roblox.com */
export class RobloxPresenceApi {
    private readonly batcher

    constructor(private readonly config: RobloxConfig) {
        this.batcher = new RobloxBatcher(config, ORIGIN, [usersRoute])
    }

    private ttl(method: RobloxPresenceCacheable) {
        return resolveTtl(this.config, "presence", method)
    }

    /**
     * 유저들의 접속 상태. 결과는 입력과 같은 순서다. 한 명만 필요하면 원소 하나짜리 배열을 넣는다.
     * 같은 틱에 들어온 호출은 50명씩 모아서 보내고, 한도(60회/분)가 차면 풀릴 때까지 기다린다.
     * 게임 정보는 요청 계정에 따라 다르게 보일 수 있다 — 특정 계정 관점이 필요하면 `.as(cookie)`를 쓴다.
     */
    get(userIds: readonly RobloxUserId[]): Promise<RobloxUserPresence[]> {
        return Promise.all(userIds.map(id => this.load(id)))
    }

    private async load(userId: RobloxUserId): Promise<RobloxUserPresence> {
        const run = () => this.batcher.load(String(userId), userId)
        const ttl = this.ttl("get")
        const viewer = this.config.cache ? await viewerKey(this.config) : null
        if (viewer === null) return run()
        return cached(this.config, ["presence", "get", viewer, userId], ttl, run)
    }
}
