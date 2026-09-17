import { z } from 'zod'
import { vigor, VigorFetchError } from 'vigor-fetch'
import { RobloxCookie } from '@/types/branded'
import { CsrfTokenManager } from './csrf'
import { CredentialPool, RobloxCredential } from './credentials'

export type VigorFetchFailedData = {
    status:     number
    statusText: string
    response:   Response
    url:        string
    parsed:     unknown
}

export function isFetchFailed(cause: unknown): cause is VigorFetchError<'FETCH_FAILED', any> & { data: VigorFetchFailedData } {
    return cause instanceof VigorFetchError && cause.code === 'FETCH_FAILED' && cause.data != null
}

/**
 * Builds the before/after middleware chain that attaches the ROBLOSECURITY cookie
 * (and optionally a WinInet user-agent + CSRF token) to every request, with
 * automatic CSRF token refresh + retry on a 403 response.
 */
export function makeHeaderMiddlewares(opts: {
    getCookie:   () => RobloxCookie
    csrfManager: CsrfTokenManager
    winInet?:    boolean
    csrf?:       boolean
}) {
    const { getCookie, csrfManager, winInet = false, csrf = false } = opts

    let builder = vigor.builders.fetch.middlewares()
        .before("intercept", async (ctx, api) => {
            const cookie = getCookie()
            ctx.record.cookie = cookie

            const headers: Record<string, string> = {
                Cookie: `.ROBLOSECURITY=${cookie}`,
            }
            if (winInet) headers['User-Agent'] = 'Roblox/WinInet'
            if (csrf)    headers['X-CSRF-Token'] = await csrfManager.getOrRefresh(cookie)

            api.setHeaders(headers)
            return ctx
        })

    if (csrf) {
        builder = builder.onError("intercept", async (ctx, api) => {
            const cause = ctx.error
            if (isFetchFailed(cause) && cause.data.status === 403) {
                const cookie: RobloxCookie = ctx.record.cookie ?? getCookie()
                const newToken = cause.data.response.headers.get('x-csrf-token')

                if (newToken) {
                    csrfManager.set(cookie, newToken)
                } else {
                    csrfManager.invalidate(cookie)
                    await csrfManager.refresh(cookie)
                }
                api.proceedRestart()
            }
            return ctx
        })
    }

    return builder
}

/** retry 엔진이 감싼 에러(RETRY_EXHAUSTED)까지 풀어서 FETCH_FAILED를 찾는다. */
function findFetchFailed(error: unknown): (VigorFetchError<'FETCH_FAILED', any> & { data: VigorFetchFailedData }) | null {
    let current: unknown = error
    for (let depth = 0; depth < 5 && current != null; depth++) {
        if (isFetchFailed(current)) return current
        const next = current as { data?: { error?: unknown }, cause?: unknown }
        current = next.data?.error ?? next.cause
    }
    return null
}

/**
 * before 미들웨어에서 setHeaders는 헤더를 통째로 교체해서 vigor-fetch가 body로부터 추론한
 * Content-Type이 사라진다. 그래서 body 기반 Content-Type과 `.headers()`로 지정한 헤더를 다시 합친다.
 */
function baseHeaders(ctx: { policy: { body: unknown, headers: unknown } }): Record<string, string> {
    const { body, headers } = ctx.policy
    const isPlainObject = body !== null && typeof body === 'object'
        && (Object.getPrototypeOf(body) === Object.prototype || Array.isArray(body))
    return {
        ...(isPlainObject ? { 'Content-Type': 'application/json' } : {}),
        ...(headers !== null && typeof headers === 'object' ? headers as Record<string, string> : {}),
    }
}

/**
 * 인증 풀에서 OAuth 토큰(allowOAuth일 때 우선) 또는 쿠키를 골라 요청에 붙인다.
 * 응답이 rate limit이면 그 인증 수단을 쿨다운시키고 다른 인증 수단으로 재시작한다.
 *
 * 429는 같은 헤더로 재시도하면 의미가 없으므로 이 미들웨어를 쓰는 클라이언트는
 * `unretryStatus`에 429를 넣고 `maxRestarts`를 넉넉히 줘야 한다.
 */
export function makeCredentialMiddlewares(opts: {
    pool:       CredentialPool
    allowOAuth: boolean
    winInet?:   boolean
}) {
    const { pool, allowOAuth, winInet = false } = opts

    return vigor.builders.fetch.middlewares()
        .before("intercept", async (ctx, api) => {
            const credential = await pool.acquire({ allowOAuth })
            ctx.record.credential = credential
            if (credential.kind === 'cookie') ctx.record.cookie = credential.value

            const headers: Record<string, string> = baseHeaders(ctx)
            if (credential.kind === 'oauth') headers['Authorization'] = `Bearer ${credential.value}`
            else headers['Cookie'] = `.ROBLOSECURITY=${credential.value}`
            if (winInet) headers['User-Agent'] = 'Roblox/WinInet'

            api.setHeaders(headers)
            return ctx
        })
        .after("intercept", async (ctx, api) => {
            // 성공 응답이라도 remaining=0이면 리셋 시각까지 이 인증 수단을 쉬게 한다.
            const { record, response } = ctx as unknown as { record: { credential?: RobloxCredential }, response: unknown }
            if (record.credential && response instanceof Response) pool.observe(record.credential, response)
            return ctx
        })
        .onError("intercept", async (ctx, api) => {
            const credential = ctx.record.credential as RobloxCredential | undefined
            const failed = findFetchFailed(ctx.error)
            if (credential && failed) {
                pool.observe(credential, failed.data.response)
                if (failed.data.status === 429) api.proceedRestart()
            }
            return ctx
        })
}

/** Unwraps a single key from the parsed response body, e.g. `{ data: [...] }` -> `[...]`. */
export function pickKey(key: string) {
    return vigor.builders.fetch.middlewares()
        .after("intercept", async (ctx, api) => {
            api.setResult((ctx.result as Record<string, unknown>)[key])
            return ctx
        })
}

export const dataInterceptor = pickKey('data')

/**
 * 응답 body를 주어진 zod 스키마로 런타임 검증한다. 검증에 실패하면 zod가
 * ZodError를 던지며(상위 try/catch나 vigor 에러 핸들링에서 처리) 스키마와
 * 어긋난 응답이 그대로 흘러들어가는 것을 막는다.
 */
export function validate<T>(schema: z.ZodType<T>) {
    return vigor.builders.fetch.middlewares()
        .after("intercept", async (ctx, api) => {
            api.setResult(schema.parse(ctx.result))
            return ctx
        })
}

/** `pickKey(key)` + `validate(schema)`를 한 스텝으로 합친 헬퍼. */
export function pickKeyValidated<T>(key: string, schema: z.ZodType<T>) {
    return vigor.builders.fetch.middlewares()
        .after("intercept", async (ctx, api) => {
            const picked = (ctx.result as Record<string, unknown>)[key]
            api.setResult(schema.parse(picked))
            return ctx
        })
}
