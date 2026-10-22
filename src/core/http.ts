import { vigor, isVigorFetchError, VigorFetchPolicySettingsBase } from "vigor-fetch"
import type { VigorFetchOptions } from "vigor-fetch"
import type z from "zod"
import { robloxCacheKeyString, type RobloxCacheKey, type RobloxCacheValue } from "./cache"
import type { RobloxConfig } from "./config"
import type { RobloxCookie, RobloxCookieRejectReason } from "./cookies"

/** retry 엔진이 감싼 에러(RETRY_EXHAUSTED 등)까지 풀어서 FETCH_FAILED를 찾는다. */
export function findFetchFailed(error: unknown) {
    let current: unknown = error
    for (let depth = 0; depth < 5 && current != null; depth++) {
        if (isVigorFetchError(current, "FETCH_FAILED")) return current
        const next = current as { data?: { error?: unknown }, cause?: unknown }
        current = next.data?.error ?? next.cause
    }
    return null
}

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"]

/** Roblox 에러 body(`{ errors: [{ code, message }] }`)의 메시지들 */
function errorMessages(parsed: unknown): string[] {
    const errors = (parsed as { errors?: unknown } | null)?.errors
    return Array.isArray(errors) ? errors.map(e => String((e as { message?: unknown })?.message ?? "")) : []
}

/**
 * 실패가 쿠키 자체의 문제인지. 401은 만료되거나 로그아웃된 쿠키이고,
 * 403 "User is moderated"는 정지된 계정이다 (로그인은 되지만 인증이 필요한 API를 쓸 수 없다).
 * 다른 403(CSRF, 권한 없음, Challenge)은 쿠키 문제가 아니다.
 */
function rejectionReason(failed: ReturnType<typeof findFetchFailed>): RobloxCookieRejectReason | null {
    if (failed?.data.status === 401) return "unauthorized"
    if (failed?.data.status === 403 && errorMessages(failed.data.parsed).some(m => /moderated/i.test(m))) return "moderated"
    return null
}

/**
 * 쿠키가 거부됐다. 지정한 처리가 있으면 그것만, 없으면 저장소의 기본 처리(`remove`)를 부른다.
 * 같은 쿠키로 동시에 여러 요청이 거부돼도 진행 중인 처리를 같이 기다린다.
 */
function rejectCookie(config: RobloxConfig, cookie: RobloxCookie, reason: RobloxCookieRejectReason): Promise<void> {
    let running = config.rejecting.get(cookie)
    if (!running) {
        const handle = config.onCookieRejected ?? (c => config.cookies?.remove?.(c))
        running = Promise.resolve()
            .then(() => handle(cookie, reason))
            .finally(() => config.rejecting.delete(cookie))
        config.rejecting.set(cookie, running)
    }
    return running
}

/**
 * 인증 헤더(Cookie / User-Agent / X-CSRF-Token)를 붙이고, 실패에 따라 재시작하는 미들웨어.
 * - 403 + x-csrf-token: 토큰을 저장하고 같은 쿠키로 다시 보낸다.
 * - 401, 403 "User is moderated": 쿠키를 거부 처리하고, 풀에서 돌려 쓰는 중이면 다른 쿠키로 다시 보낸다.
 *
 * 쿠키는 요청 하나에 하나로 고정한다 — restart마다 ctx.record가 초기화되므로 클로저에 둔다.
 * 요청 중에 매번 고르면 CSRF 재시작이 다른 쿠키로 나가 토큰이 맞지 않는다.
 */
function authMiddlewares(config: RobloxConfig, opts: { userAgent?: string }) {
    let picked: Promise<RobloxCookie | null> | null = null
    const pick = () => picked ??= Promise.resolve(config.mode === "node" ? (config.fixedCookie ?? config.cookies?.next() ?? null) : null)
    const csrfKey = (cookie: RobloxCookie | null) => config.mode === "extension" ? "extension" : cookie

    return vigor.builders.fetch.middlewares()
        .before("fluent", async ctx => {
            const options = ctx.options as VigorFetchOptions
            const cookie = await pick()
            if (cookie) options.headers["Cookie"] = `.ROBLOSECURITY=${cookie}`
            if (config.mode === "node" && opts.userAgent) options.headers["User-Agent"] = opts.userAgent

            const key = csrfKey(cookie)
            const token = key ? config.csrf.get(key) : undefined
            if (token && !SAFE_METHODS.includes(options.method ?? "GET")) options.headers["X-CSRF-Token"] = token
        })
        .onError("intercept", async (ctx, api) => {
            const failed = findFetchFailed(ctx.error)
            const cookie = await pick()

            const reason = rejectionReason(failed)
            if (reason && cookie) {
                await rejectCookie(config, cookie, reason)
                if (!config.fixedCookie && config.cookies) {
                    picked = null
                    api.proceedRestart()
                }
                return ctx
            }

            const key = csrfKey(cookie)
            const token = failed?.data.status === 403 ? failed.data.response.headers.get("x-csrf-token") : null
            if (key && token && token !== config.csrf.get(key)) {
                config.csrf.set(key, token)
                api.proceedRestart()
            }
            return ctx
        })
}

/** 서비스 origin 하나에 대한 요청 빌더. 메서드 호출마다 새로 만든다 (요청마다 쿠키를 새로 고른다). */
export function createHttp(config: RobloxConfig, origin: string, opts: { userAgent?: string, retryRateLimited?: boolean } = {}) {
    // 429를 직접 처리하는 호출자(다른 엔드포인트로 돌리는 등)는 retry 엔진이 기다리지 않게 한다.
    const unretryStatus: number[] = opts.retryRateLimited === false
        ? [...VigorFetchPolicySettingsBase.unretryStatus, 429]
        : [...VigorFetchPolicySettingsBase.unretryStatus]

    return () => vigor.fetch(origin)
        .options("merge", config.mode === "extension" ? { credentials: "include" } : {})
        .settings(s => s.unretryStatus(...unretryStatus))
        .retry(r => r.settings({
            maxAttempts: config.retry.maxAttempts ?? 5,
            timeout:     config.retry.timeout ?? 20000,
        }))
        .middlewares(authMiddlewares(config, opts))
}

/** 응답 body를 zod 스키마로 검증해 결과로 바꾼다. 결과 타입은 `z.output<S>`로 추론된다. */
export function validate<S extends z.ZodType>(schema: S) {
    return vigor.builders.fetch.middlewares()
        .after("intercept", (ctx, api) => {
            const result = schema.parse(ctx.result) as z.output<S>
            api.setResult(result)
            return { ...ctx, result }
        })
}

/**
 * 같은 `id`의 작업이 진행 중이면 그 Promise를 같이 기다리고, 없으면 `run`을 시작해 등록한다.
 * 끝나면(실패해도) 지우므로 다음 호출은 새로 시작한다.
 */
export function singleFlight<R>(config: RobloxConfig, id: string, run: () => Promise<R>): Promise<R> {
    const running = config.inflight.get(id)
    if (running) return running as Promise<R>
    const promise = run().finally(() => {
        if (config.inflight.get(id) === promise) config.inflight.delete(id)
    })
    config.inflight.set(id, promise)
    return promise
}

/**
 * 캐시가 설정돼 있으면 결과를 캐시한다. TTL이 0이어도 get/set은 그대로 부른다 — 0을 어떻게 다룰지는 저장소가 정한다.
 * null(없는 대상)과 `keep`이 false인 결과는 저장하지 않는다. 값의 타입은 키에 맞아야 한다.
 * 같은 키를 동시에 물으면 저장소 조회부터 저장까지 한 번만 한다 (캐시가 없어도 마찬가지).
 */
export function cached<K extends RobloxCacheKey, R extends RobloxCacheValue<K> | null>(
    config: RobloxConfig,
    key: K,
    ttl: number,
    run: () => Promise<R>,
    keep: (result: Exclude<R, null>) => boolean = () => true,
): Promise<R> {
    return singleFlight(config, robloxCacheKeyString(key), async () => {
        const store = config.cache
        if (!store) return run()

        const hit = await store.get(key)
        if (hit !== undefined) return hit as R

        const result = await run()
        if (result !== null && keep(result as Exclude<R, null>)) await store.set(key, result as RobloxCacheValue<K>, ttl)
        return result
    })
}

export function chunk<T>(list: readonly T[], size: number): T[][] {
    const out: T[][] = []
    for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size))
    return out
}
