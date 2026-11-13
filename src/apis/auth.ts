import { vigor } from "vigor-fetch"
import type { RobloxConfig } from "@/core/config"
import { RobloxError } from "@/core/error"
import { createHttp, validate } from "@/core/http"
import z from "zod"

const ORIGIN = "https://auth.roblox.com"

/** auth.roblox.com — 요청 계정 기준 (인증 필요) */
export class RobloxAuthApi {
    private readonly http

    constructor(private readonly config: RobloxConfig) {
        this.http = createHttp(config, ORIGIN)
    }

    /**
     * POST /v1/authentication-ticket — Roblox 클라이언트를 요청 계정으로 실행할 때 넘기는 일회용 티켓.
     * 응답 body는 비어 있고 티켓은 `rbx-authentication-ticket` 헤더로 온다. 짧은 시간 안에 한 번만 쓸 수 있다.
     *
     * 확장 모드 전용이다. 세션이 만들어진 브라우저 밖(node)에서 부르면 Roblox가 401로 거절하고
     * **그 세션 쿠키를 무효로 만든다** (2026-11 실측: 요청 직전까지 유효하던 쿠키가 요청 뒤 로그아웃됐다).
     * 그래서 node 모드에서는 요청을 보내지 않고 MODE_UNSUPPORTED로 실패한다.
     *
     * roblox.com 페이지(content script, userscript)에서 불러야 Referer가 roblox.com이 된다.
     *
     * 티켓은 세션 쿠키로 바꿀 수 있는 자격 증명이다. 클라이언트 실행(`roblox-player:` 링크)에만 쓰고,
     * 로그·서버·다른 사람에게 넘기지 않는다.
     */
    async createAuthenticationTicket(): Promise<string> {
        if (this.config.mode !== "extension") {
            throw new RobloxError("MODE_UNSUPPORTED", { mode: this.config.mode, reason: "Roblox signs the session out when a ticket is asked for outside the browser that holds it" })
        }
        let ticket: string | null = null
        await this.http()
            .path("v1", "authentication-ticket")
            .body("overwrite", {})
            .middlewares(vigor.builders.fetch.middlewares().after("fluent", ctx => {
                ticket = ctx.response.headers.get("rbx-authentication-ticket")
            }))
            .middlewares(validate(z.unknown()))
            .request()
        if (!ticket) {
            throw new RobloxError("INVALID_RESPONSE", {
                issues: [{ code: "custom", path: ["rbx-authentication-ticket"], message: "Missing ticket header", input: null }],
                url: `${ORIGIN}/v1/authentication-ticket`,
            })
        }
        return ticket
    }
}
