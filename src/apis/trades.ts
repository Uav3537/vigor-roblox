import type { RobloxConfig } from "@/core/config"
import { createHttp, validate } from "@/core/http"
import { RobloxCanTradeSchema, type RobloxCanTrade } from "@/types/trades"
import type { RobloxUserId } from "@/types/users"

const ORIGIN = "https://trades.roblox.com"

/** trades.roblox.com — 요청 계정 기준 (인증 필요) */
export class RobloxTradesApi {
    private readonly http

    constructor(config: RobloxConfig) {
        this.http = createHttp(config, ORIGIN)
    }

    /**
     * GET /v1/users/{userId}/can-trade-with — 요청 계정이 이 유저와 거래할 수 있는지와 그 이유.
     * 캐시하지 않는다 (프라이버시 설정·차단에 따라 바로 바뀐다).
     */
    canTradeWith(userId: RobloxUserId): Promise<RobloxCanTrade> {
        return this.http()
            .path("v1", "users", userId, "can-trade-with")
            .middlewares(validate(RobloxCanTradeSchema))
            .request()
    }
}
