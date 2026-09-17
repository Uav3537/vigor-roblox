import { RobloxCookie } from '@/types/branded'

/**
 * 요청에 붙일 인증 수단.
 * - oauth: `Authorization: Bearer <token>`
 * - cookie: `Cookie: .ROBLOSECURITY=<cookie>`
 */
export type RobloxCredential =
    | { kind: 'oauth';  value: string }
    | { kind: 'cookie'; value: RobloxCookie }

export type OAuthTokenRateLimit = { limit: number; windowMs: number }

export const DEFAULT_OAUTH_TOKEN_RATE_LIMIT: OAuthTokenRateLimit = { limit: 4, windowMs: 60 * 1000 }

/** rate limit 응답에 대기 시간 정보가 없을 때 쓰는 기본 쿨다운 */
const DEFAULT_COOLDOWN_MS = 60 * 1000

const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

/**
 * 가장 오래 전에 쓴 쿠키를 고르는 라운드로빈.
 * `cookies` 배열을 복사하지 않고 참조로 들고 있으므로 외부에서 push/splice 하면 바로 반영된다.
 */
export function createCookieRotator(cookies: RobloxCookie[]) {
    const lastUsed = new Map<string, number>()

    return function pickCookie(): RobloxCookie {
        if (cookies.length === 0) throw new Error('[vigor-roblox] No cookies available')
        let best = cookies[0]
        for (const cookie of cookies) {
            if ((lastUsed.get(cookie) ?? 0) < (lastUsed.get(best) ?? 0)) best = cookie
        }
        lastUsed.set(best, Date.now())
        return best
    }
}

/**
 * OAuth 토큰 우선 + 쿠키 후순위 인증 풀.
 *
 * - OAuth 토큰: 토큰마다 `tokenLimit`(기본 1분 4회)까지 쓰고, rate limit(429 또는 remaining=0)이 오면
 *   리셋 시각까지 쉰다.
 * - 쿠키: 쓸 수 있는 토큰이 없을 때 쓴다. 횟수 제한 없이 가장 오래 전에 쓴 쿠키부터 고르며,
 *   rate limit이 오면 그 쿠키만 리셋 시각까지 쉰다.
 * - 모두 쓸 수 없으면 가장 먼저 풀리는 시각까지 기다렸다가 다시 고른다.
 *
 * Roblox rate limit은 엔드포인트 단위라서, 풀은 API 클라이언트(games/users/presence)마다 따로 만든다.
 * `cookies`/`oauthTokens`는 참조로 들고 있으므로 외부 배열 변경이 바로 반영된다.
 */
export function createCredentialPool(opts: {
    cookies:     RobloxCookie[]
    oauthTokens: string[]
    tokenLimit?: OAuthTokenRateLimit
}) {
    const { cookies, oauthTokens, tokenLimit = DEFAULT_OAUTH_TOKEN_RATE_LIMIT } = opts

    const cooldownUntil  = new Map<string, number>()
    const tokenUsage     = new Map<string, number[]>()
    const cookieLastUsed = new Map<string, number>()

    const keyOf = (c: RobloxCredential) => `${c.kind}:${c.value}`

    /** 이 토큰을 다음에 쓸 수 있는 시각 (지금 쓸 수 있으면 now) */
    function tokenAvailableAt(token: string, now: number): number {
        const usage = (tokenUsage.get(token) ?? []).filter(t => now - t < tokenLimit.windowMs)
        tokenUsage.set(token, usage)
        const byLimit = usage.length < tokenLimit.limit ? now : usage[0] + tokenLimit.windowMs
        return Math.max(byLimit, cooldownUntil.get(`oauth:${token}`) ?? 0, now)
    }

    async function acquire({ allowOAuth }: { allowOAuth: boolean }): Promise<RobloxCredential> {
        for (;;) {
            const now = Date.now()
            let wakeAt = Infinity

            if (allowOAuth) {
                // 지금 쓸 수 있는 토큰 중 최근 사용량이 가장 적은 것
                let bestToken: string | null = null
                let bestUsage = Infinity
                for (const token of oauthTokens) {
                    const at = tokenAvailableAt(token, now)
                    if (at > now) {
                        wakeAt = Math.min(wakeAt, at)
                        continue
                    }
                    const usage = tokenUsage.get(token)!.length
                    if (usage < bestUsage) {
                        bestUsage = usage
                        bestToken = token
                    }
                }
                if (bestToken !== null) {
                    tokenUsage.get(bestToken)!.push(now)
                    return { kind: 'oauth', value: bestToken }
                }
            }

            // 쿨다운이 아닌 쿠키 중 가장 오래 전에 쓴 것
            let bestCookie: RobloxCookie | null = null
            for (const cookie of cookies) {
                const until = cooldownUntil.get(`cookie:${cookie}`) ?? 0
                if (until > now) {
                    wakeAt = Math.min(wakeAt, until)
                    continue
                }
                if (bestCookie === null || (cookieLastUsed.get(cookie) ?? 0) < (cookieLastUsed.get(bestCookie) ?? 0)) {
                    bestCookie = cookie
                }
            }
            if (bestCookie !== null) {
                cookieLastUsed.set(bestCookie, now)
                return { kind: 'cookie', value: bestCookie }
            }

            if (wakeAt === Infinity) throw new Error('[vigor-roblox] No credentials available')
            // 기다리는 동안 외부에서 토큰/쿠키가 추가될 수 있으므로 최대 1초마다 다시 확인한다.
            await sleep(Math.min(1000, Math.max(50, wakeAt - now)))
        }
    }

    /** 이 인증 수단을 `ms` 동안 쓰지 않는다. */
    function cooldown(credential: RobloxCredential, ms: number) {
        const until = Date.now() + ms
        const key = keyOf(credential)
        cooldownUntil.set(key, Math.max(cooldownUntil.get(key) ?? 0, until))
    }

    /**
     * 응답 헤더를 보고 rate limit 상태를 반영한다.
     * 429거나 `x-ratelimit-remaining: 0`이면 리셋 시각까지 쿨다운. 쿨다운을 걸었으면 true.
     */
    function observe(credential: RobloxCredential, response: Response): boolean {
        const rateLimited = response.status === 429
        const exhausted   = response.headers.get('x-ratelimit-remaining')?.trim() === '0'
        if (!rateLimited && !exhausted) return false
        cooldown(credential, resetDelayMs(response.headers))
        return true
    }

    return { acquire, cooldown, observe }
}

export type CredentialPool = ReturnType<typeof createCredentialPool>

/** retry-after / x-ratelimit-reset(초 단위) 중 더 긴 쪽을 대기 시간으로 쓴다. */
function resetDelayMs(headers: Headers): number {
    let delay = 0
    for (const name of ['retry-after', 'x-ratelimit-reset']) {
        const raw = headers.get(name)
        if (!raw) continue
        // "20" 또는 "3, 3;w=60" 같은 형식에서 첫 숫자만 사용
        const seconds = Number.parseFloat(raw)
        if (Number.isFinite(seconds) && seconds >= 0) {
            delay = Math.max(delay, seconds * 1000)
            continue
        }
        const date = Date.parse(raw)
        if (!Number.isNaN(date)) delay = Math.max(delay, date - Date.now())
    }
    return delay > 0 ? Math.max(1000, delay) : DEFAULT_COOLDOWN_MS
}
