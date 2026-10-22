import { vigor } from "vigor-fetch"
import type { RobloxConfig } from "./config"
import { createHttp, findFetchFailed } from "./http"

export type RobloxHttp = ReturnType<typeof createHttp>

/** route가 이 항목은 답할 수 없다고 할 때 돌려준다. 그 항목은 남은 다른 경로로 다시 보낸다. */
export const RobloxBatchSkip: unique symbol = Symbol("RobloxBatchSkip")

/** 같은 결과를 받을 수 있는 엔드포인트 하나 */
export type RobloxBatchRoute<T, R> = {
    /** 레이트리밋 버킷 키 */
    bucket: string
    /** 배처의 기본 origin과 다른 서비스로 보내는 경로 */
    origin?: string
    /** 한 요청에 넣을 수 있는 최대 개수 */
    limit:  number
    /** 이 경로로 보낼 수 없으면 null, 보낼 수 있으면 같은 요청에 묶을 수 있는 키 */
    group(target: T): string | null
    /** 결과는 targets와 같은 순서 */
    send(http: RobloxHttp, targets: T[], onHeaders: (headers: Headers) => void): Promise<(R | typeof RobloxBatchSkip)[]>
}

export type RobloxBatcherOptions<R> = {
    /** createHttp에 넘기는 User-Agent */
    userAgent?: string
    /** 결과를 다시 물어야 하면 기다릴 시간(ms), 아니면 null. tries는 지금까지 다시 물은 횟수 */
    again?: (result: R, tries: number) => number | null
}

type Job<T, R> = {
    target:       T
    routes:       RobloxBatchRoute<T, R>[]
    resolve:      (result: R) => void
    reject:       (error: unknown) => void
    notBefore:    number
    againTries:   number
    limitedTries: number
}

/**
 * 같은 틱에 들어온 요청을 모아 경로별로 묶어 보낸다. 경로의 한도가 남아 있지 않으면
 * 다음 경로로, 모두 막혔으면 가장 빨리 풀리는 때까지 기다린다.
 * 429는 retry 엔진이 기다리지 않고 여기서 다시 배치한다. 그 밖의 실패는 남은 경로가 있으면 그쪽으로 넘기고,
 * 마지막 경로까지 실패하면 그 에러로 reject한다.
 */
export class RobloxBatcher<T, R> {
    private queue: Job<T, R>[] = []
    private timer: ReturnType<typeof setTimeout> | null = null
    private timerAt = Infinity
    private readonly https = new Map<string, RobloxHttp>()
    /** key → 진행 중인 요청. 같은 대상을 동시에 여러 번 물어도 한 번만 보낸다. */
    private readonly inflight = new Map<string, Promise<R>>()
    /** 버킷에 자리가 나면 깨운다. 같은 함수라 버킷 쪽 Set에서 중복이 걸러진다 */
    private readonly onBucketFree = () => this.wake(0)

    constructor(
        private readonly config: RobloxConfig,
        private readonly origin: string,
        private readonly routes: RobloxBatchRoute<T, R>[],
        private readonly options: RobloxBatcherOptions<R> = {},
    ) {}

    private httpFor(route: RobloxBatchRoute<T, R>): RobloxHttp {
        const origin = route.origin ?? this.origin
        let http = this.https.get(origin)
        if (!http) this.https.set(origin, http = createHttp(this.config, origin, { userAgent: this.options.userAgent, retryRateLimited: false }))
        return http
    }

    /** key가 같은 요청이 진행 중이면 그 결과를 같이 받는다. */
    load(key: string, target: T): Promise<R> {
        const running = this.inflight.get(key)
        if (running) return running

        const promise = this.enqueue(target).finally(() => this.inflight.delete(key))
        this.inflight.set(key, promise)
        return promise
    }

    private enqueue(target: T): Promise<R> {
        const routes = this.routes.filter(r => r.group(target) !== null)
        if (!routes.length) return Promise.reject(new Error(`No endpoint accepts ${JSON.stringify(target)}`))
        return new Promise((resolve, reject) => {
            this.queue.push({ target, routes, resolve, reject, notBefore: 0, againTries: 0, limitedTries: 0 })
            this.wake(0)
        })
    }

    private wake(delay: number) {
        const at = Date.now() + delay
        if (this.timer && this.timerAt <= at) return
        if (this.timer) clearTimeout(this.timer)
        this.timerAt = at
        this.timer = setTimeout(() => {
            this.timer = null
            this.timerAt = Infinity
            this.flush()
        }, delay)
    }

    private flush() {
        const now = Date.now()
        const open = new Map<string, { route: RobloxBatchRoute<T, R>, jobs: Job<T, R>[] }>()
        const batches: { route: RobloxBatchRoute<T, R>, jobs: Job<T, R>[] }[] = []
        const waiting: Job<T, R>[] = []

        for (const job of this.queue) {
            if (job.notBefore > now) {
                waiting.push(job)
                continue
            }
            let placed = false
            for (const route of job.routes) {
                const key = `${route.bucket}|${route.group(job.target)}`
                const current = open.get(key)
                if (current && current.jobs.length < route.limit) {
                    current.jobs.push(job)
                    placed = true
                    break
                }
                if (this.config.rateLimits.bucket(route.bucket).tryAcquire(now)) {
                    const next = { route, jobs: [job] }
                    open.set(key, next)
                    batches.push(next)
                    placed = true
                    break
                }
            }
            if (!placed) waiting.push(job)
        }

        this.queue = waiting
        for (const batch of batches) void this.send(batch.route, batch.jobs)

        // 다음에 깨어날 때. 0이면 진행 중인 요청이 끝나야 자리가 나므로, 그 버킷에 자리가 나면 깨워 달라고 한다
        // (그 요청은 다른 batcher가 보낸 것일 수 있다).
        let next = Infinity
        for (const job of waiting) {
            if (job.notBefore > now) {
                next = Math.min(next, job.notBefore - now)
                continue
            }
            const buckets = job.routes.map(r => this.config.rateLimits.bucket(r.bucket))
            const wait = Math.min(...buckets.map(b => b.waitTime(now)))
            if (wait > 0) next = Math.min(next, wait)
            else for (const bucket of buckets) bucket.whenFree(this.onBucketFree)
        }
        if (next !== Infinity) this.wake(next)
    }

    private async send(route: RobloxBatchRoute<T, R>, jobs: Job<T, R>[]) {
        const bucket = this.config.rateLimits.bucket(route.bucket)
        let headers: Headers | null = null
        try {
            const results = await route.send(this.httpFor(route), jobs.map(j => j.target), h => { headers = h })
            bucket.release(headers)
            jobs.forEach((job, i) => {
                const result = results[i]
                if (result === RobloxBatchSkip) {
                    job.routes = job.routes.filter(r => r !== route)
                    if (!job.routes.length) return job.reject(new Error(`No endpoint could answer ${JSON.stringify(job.target)}`))
                    this.queue.push(job)
                    return
                }
                const delay = this.options.again?.(result, job.againTries) ?? null
                if (delay === null) return job.resolve(result)
                job.againTries++
                job.notBefore = Date.now() + delay
                this.queue.push(job)
            })
        } catch (error) {
            const failed = findFetchFailed(error)
            if (failed?.data.status === 429) {
                bucket.exhaust(failed.data.response.headers)
                // 한도는 기다리면 풀리므로 일반 실패보다 넉넉하게 기다린다.
                const maxTries = (this.config.retry.maxAttempts ?? 5) * 2
                for (const job of jobs) {
                    if (++job.limitedTries >= maxTries) job.reject(error)
                    else this.queue.push(job)
                }
            } else {
                bucket.release(failed?.data.response.headers)
                // 같은 결과를 주는 다른 경로가 남아 있으면 그쪽으로 넘긴다 (비공개 엔드포인트의 403/5xx, 응답 모양 변경 등).
                for (const job of jobs) {
                    job.routes = job.routes.filter(r => r !== route)
                    if (job.routes.length) this.queue.push(job)
                    else job.reject(error)
                }
            }
        } finally {
            if (this.queue.length) this.wake(0)
        }
    }
}


/** 응답 헤더를 batcher에 넘기는 미들웨어. 레이트리밋 추적에 쓴다. */
export const captureHeaders = (onHeaders: (headers: Headers) => void) =>
    vigor.builders.fetch.middlewares().after("fluent", ctx => onHeaders(ctx.response.headers))

/** 지정한 상태(404 등)로 실패하면 null을 돌려준다. 실패 응답의 헤더도 넘긴다. */
export async function nullOn<R>(statuses: readonly number[], onHeaders: (headers: Headers) => void, run: () => Promise<R>): Promise<R | null> {
    try {
        return await run()
    } catch (error) {
        const failed = findFetchFailed(error)
        if (!failed || !statuses.includes(failed.data.status)) throw error
        onHeaders(failed.data.response.headers)
        return null
    }
}

/** 다른 route의 결과를 바꿔 쓰는 route. 버킷과 묶음 규칙은 그대로이고, Skip은 그대로 넘긴다. */
export function mapRoute<T, A, B>(route: RobloxBatchRoute<T, A>, fn: (result: A, target: T) => B, overrides: Partial<Pick<RobloxBatchRoute<T, B>, "group" | "limit">> = {}): RobloxBatchRoute<T, B> {
    return {
        ...route,
        ...overrides,
        async send(http, targets, onHeaders) {
            const results = await route.send(http, targets, onHeaders)
            return results.map((r, i): B | typeof RobloxBatchSkip => r === RobloxBatchSkip ? RobloxBatchSkip : fn(r as A, targets[i]))
        },
    }
}
