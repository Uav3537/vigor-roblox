/** 상태를 모를 때(첫 요청, 창이 리셋된 직후) 동시에 보낼 수 있는 요청 수 */
const PROBE_CONCURRENCY = 4
/** 연속 429일 때 기다리는 최대 시간(초) */
const MAX_BACKOFF = 60

/** 저장소와 주고받는 버킷 상태. `resetAt`은 epoch ms라 탭이나 인스턴스가 달라도 같은 기준으로 비교한다. */
export type RobloxRateLimitState = {
    /** 이 창(window)에 남은 요청 수 */
    remaining: number
    /** 창이 리셋되는 시각(epoch ms) */
    resetAt:   number
    /** 최근 연속 429 횟수 */
    strikes:   number
}

/**
 * `.rateLimits(store)`에 넣는 저장소. 레이트리밋은 저장소 없이도 프로세스 안에서 돌아가고,
 * 저장소는 그 상태를 밖(chrome.storage, Redis 등)과 동기화하는 데만 쓴다 — 새로고침한 content script나
 * 다시 뜬 서비스 워커, 같은 IP를 쓰는 다른 탭이 이미 알고 있는 한도를 이어받는다.
 *
 * - `get`은 버킷을 처음 쓸 때와 창이 지나 상태를 모르게 됐을 때 부른다. 그동안 그 버킷의 요청은 기다린다.
 * - `set`은 응답으로 상태가 바뀔 때마다 기다리지 않고 부른다. 실패는 무시한다.
 * - `watch`가 있으면 다른 곳에서 바뀐 상태를 바로 받는다. 자기가 쓴 값이 되돌아와도 괜찮다.
 *
 * 원자적이지 않으므로 여러 곳이 동시에 탐색하면 한도를 조금 넘을 수 있다. 그때는 429가 다시 막는다.
 */
export interface RobloxRateLimitStore {
    get(bucket: string): RobloxRateLimitState | undefined | Promise<RobloxRateLimitState | undefined>
    set(bucket: string, state: RobloxRateLimitState): void | Promise<void>
    watch?(listener: (bucket: string, state: RobloxRateLimitState) => void): void
}

/**
 * 엔드포인트 하나의 레이트리밋 상태. 응답의 `x-ratelimit-remaining` / `x-ratelimit-reset`으로 갱신한다.
 * Roblox 한도는 IP 단위라 체인 전체가 config로 공유한다.
 *
 * 헤더를 믿을 수 없는 엔드포인트도 있다. POST users /v1/users는 `remaining: 995`라면서 429를 준다
 * (요청 수가 아니라 id 개수로 세는 숨은 한도로 보인다). 그래서 429가 이어지면 헤더와 별개로
 * 1, 2, 4 … 초씩 늘려 기다리고, 그동안은 하나씩만 보낸다.
 */
export class RobloxRateBucket {
    /** null이면 모른다 */
    private remaining: number | null = null
    private resetAt = 0
    private inflight = 0
    /** 최근 연속 429 횟수. 성공하면 줄어든다 */
    private strikes = 0
    /** 자리가 나기를 기다리는 쪽(batcher). 한 번 알리면 지운다 */
    private readonly waiters = new Set<() => void>()
    /** 저장소에서 상태를 읽어야 하는지 (처음, 창이 지난 뒤) */
    private stale: boolean
    private syncing = false

    constructor(private readonly key = "", private readonly store: RobloxRateLimitStore | null = null) {
        this.stale = store !== null
    }

    /**
     * 진행 중인 요청이 끝나 자리가 날 때 한 번 부른다. 버킷은 여러 batcher가 같이 쓰므로
     * (같은 엔드포인트를 쓰는 서비스, `.as(cookie)` 클라이언트) 요청을 보낸 쪽만 깨어나면 안 된다.
     */
    whenFree(callback: () => void) {
        this.waiters.add(callback)
    }

    private notify() {
        const waiters = [...this.waiters]
        this.waiters.clear()
        for (const waiter of waiters) waiter()
    }

    /** 지금 요청 하나를 보낼 수 있으면 자리를 잡고 true. 끝나면 `release` 또는 `exhaust`를 불러야 한다. */
    tryAcquire(now = Date.now()): boolean {
        if (now >= this.resetAt && this.remaining !== null) {
            this.remaining = null
            this.stale = this.store !== null
        }
        if (this.stale) this.load()
        if (this.syncing) return false
        const probe = this.strikes > 0 ? 1 : PROBE_CONCURRENCY
        const free = this.remaining === null ? probe - this.inflight : Math.min(this.remaining, this.strikes > 0 ? 1 - this.inflight : Infinity)
        if (free <= 0) return false
        if (this.remaining !== null) this.remaining--
        this.inflight++
        return true
    }

    /** 요청이 끝났다. 응답 헤더가 있으면 상태를 갱신한다. */
    release(headers?: Headers | null) {
        this.inflight = Math.max(0, this.inflight - 1)
        this.strikes = Math.max(0, this.strikes - 1)
        const remaining = Number(headers?.get("x-ratelimit-remaining"))
        const reset = Number(headers?.get("x-ratelimit-reset"))
        if (headers?.has("x-ratelimit-remaining") && Number.isFinite(remaining) && Number.isFinite(reset)) {
            // 헤더 값에는 아직 응답이 안 온 요청이 빠져 있을 수 있다.
            this.remaining = Math.max(0, remaining - this.inflight)
            this.resetAt = Date.now() + reset * 1000
            this.save()
        }
        this.notify()
    }

    /** 429를 받았다. 리셋될 때까지 막는다. */
    exhaust(headers?: Headers | null) {
        this.inflight = Math.max(0, this.inflight - 1)
        const reset = Number(headers?.get("x-ratelimit-reset"))
        // 동시에 나간 요청들이 한꺼번에 429를 받으면 한 번으로 센다.
        if (Date.now() >= this.resetAt) this.strikes++
        const backoff = Math.min(MAX_BACKOFF, 2 ** (this.strikes - 1))
        this.remaining = 0
        this.resetAt = Date.now() + Math.max(Number.isFinite(reset) && reset > 0 ? reset : 1, backoff) * 1000
        this.save()
        this.notify()
    }

    /**
     * 밖에서 온 상태를 합친다. 지금 상태를 모르면 그대로 받고, 알면 더 보수적인 쪽을 따른다
     * (남은 수는 작은 쪽, 리셋은 늦은 쪽). 이미 지난 창은 버린다.
     */
    merge(state: RobloxRateLimitState, now = Date.now()) {
        if (!(state.resetAt > now) || !Number.isFinite(state.remaining)) return
        if (this.remaining === null || now >= this.resetAt) {
            this.remaining = Math.max(0, state.remaining)
            this.resetAt = state.resetAt
        } else {
            this.remaining = Math.max(0, Math.min(this.remaining, state.remaining))
            this.resetAt = Math.max(this.resetAt, state.resetAt)
        }
        this.strikes = Math.max(this.strikes, state.strikes || 0)
        this.notify()
    }

    private load() {
        this.stale = false
        this.syncing = true
        const store = this.store!
        Promise.resolve()
            .then(() => store.get(this.key))
            .then(state => { if (state) this.merge(state) }, () => {})
            .finally(() => {
                this.syncing = false
                this.notify()
            })
    }

    private save() {
        if (!this.store || this.remaining === null) return
        const state = { remaining: this.remaining, resetAt: this.resetAt, strikes: this.strikes }
        Promise.resolve().then(() => this.store!.set(this.key, state)).catch(() => {})
    }

    /** 다시 보낼 수 있을 때까지 남은 시간(ms). 지금 보낼 수 있으면 0 */
    waitTime(now = Date.now()): number {
        if (now >= this.resetAt) return 0
        return this.remaining === 0 ? this.resetAt - now : 0
    }
}

/** 키(보통 "origin path") → 버킷 */
export class RobloxRateLimiter {
    private readonly buckets = new Map<string, RobloxRateBucket>()

    constructor(private readonly store: RobloxRateLimitStore | null = null) {
        // 아직 안 쓴 버킷은 처음 쓸 때 저장소에서 읽으므로 무시한다
        store?.watch?.((key, state) => this.buckets.get(key)?.merge(state))
    }

    bucket(key: string): RobloxRateBucket {
        let bucket = this.buckets.get(key)
        if (!bucket) this.buckets.set(key, bucket = new RobloxRateBucket(key, this.store))
        return bucket
    }
}
