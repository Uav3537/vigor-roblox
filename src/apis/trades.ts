import { resolveTtl, type RobloxConfig } from "@/core/config"
import { cachedByViewer, createHttp, validate } from "@/core/http"
import { RobloxCanTradeSchema } from "@/types/trades"
import type { RobloxUserId } from "@/types/users"

/** `.ttl({ trades: { ... } })`로 캐시할 수 있는 메서드. 요청 계정 기준이라 기본으로는 캐시하지 않는다. */
export type RobloxTradesCacheable = "canTradeWith"

const ORIGIN = "https://trades.roblox.com"

/** trades.roblox.com — 요청 계정 기준 (인증 필요) */
export class RobloxTradesApi {
    private readonly http

    constructor(private readonly config: RobloxConfig) {
        this.http = createHttp(config, ORIGIN)
    }

    private ttl(method: RobloxTradesCacheable) {
        return resolveTtl(this.config, "trades", method)
    }

    /**
     * GET /v1/users/{userId}/can-trade-with — 요청 계정이 이 유저와 거래할 수 있는지와 그 이유.
     * 프라이버시 설정·차단에 따라 바로 바뀌므로 기본 TTL은 0이다.
     */
    canTradeWith(userId: RobloxUserId) {
        return cachedByViewer(this.config, viewer => ({ service: "trades", method: "canTradeWith", viewer, userId }), this.ttl("canTradeWith"), () => this.http()
            .path("v1", "users", userId, "can-trade-with")
            .middlewares(validate(RobloxCanTradeSchema))
            .request())
    }
}
