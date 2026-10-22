import z from "zod"

/** `.ROBLOSECURITY` 쿠키 값. 문자열이면 `RobloxCookieSchema.parse(value)`로 바꿔 넣는다 */
export const RobloxCookieSchema = z.string().min(1).brand("RobloxCookie")

export type RobloxCookie = z.infer<typeof RobloxCookieSchema>

/**
 * `.cookies(store)`에 넣는 쿠키 풀. 요청마다 `next()`로 하나를 받는다.
 * 서버리스(Vercel 등)처럼 프로세스가 자주 새로 뜨는 곳에서는 Redis 같은 외부 저장소로 구현해
 * 로테이션과 쿠키 목록을 인스턴스끼리 공유한다.
 *
 * ```ts
 * const store: RobloxCookieStore = {
 *     // 리스트를 원자적으로 돌리면 모든 인스턴스가 하나의 로테이션을 쓴다
 *     next: async () => (await redis.lmove("cookies", "cookies", "LEFT", "RIGHT")) as RobloxCookie | null,
 *     remove: async cookie => { await redis.lrem("cookies", 0, cookie) },
 * }
 * ```
 */
export interface RobloxCookieStore {
    /** 이번 요청에 쓸 쿠키. null이면 쿠키 없이 보낸다 */
    next(): RobloxCookie | null | Promise<RobloxCookie | null>
    /** Roblox가 거부한 쿠키를 뺀다. 기본 거부 처리이고, `.onCookieRejected()`로 덮어쓰면 불리지 않는다 */
    remove?(cookie: RobloxCookie): void | Promise<void>
}

/**
 * 쿠키를 거부한 이유.
 * - `"unauthorized"`: 401. 만료됐거나 로그아웃된 쿠키다.
 * - `"moderated"`: 403 "User is moderated". 계정이 정지됐다. 기간 정지면 풀리고 나서 다시 쓸 수 있다.
 */
export type RobloxCookieRejectReason = "unauthorized" | "moderated"

/** Roblox가 쿠키를 거부했을 때 불린다. 지정하면 기본 처리(`store.remove`)를 대신한다 */
export type RobloxCookieRejectedHandler = (cookie: RobloxCookie, reason: RobloxCookieRejectReason) => void | Promise<void>

/** 프로세스 메모리에 두는 라운드 로빈 풀. `.cookies(list)`에 배열을 넣으면 이걸로 감싼다. 변경은 바로 다음 요청부터 반영된다. */
export class RobloxMemoryCookies implements RobloxCookieStore {
    private cookies: RobloxCookie[]
    private index = 0

    constructor(cookies: readonly RobloxCookie[] = []) {
        this.cookies = [...new Set(cookies)]
    }

    list(): readonly RobloxCookie[] {
        return [...this.cookies]
    }

    has(cookie: RobloxCookie): boolean {
        return this.cookies.includes(cookie)
    }

    add(...cookies: RobloxCookie[]): void {
        for (const cookie of cookies) if (!this.cookies.includes(cookie)) this.cookies.push(cookie)
    }

    remove(...cookies: RobloxCookie[]): void {
        this.cookies = this.cookies.filter(c => !cookies.includes(c))
    }

    replace(cookies: readonly RobloxCookie[]): void {
        this.cookies = [...new Set(cookies)]
        this.index = 0
    }

    /** 라운드 로빈으로 다음 쿠키를 고른다. 비어 있으면 `null`. */
    next(): RobloxCookie | null {
        if (this.cookies.length === 0) return null
        const cookie = this.cookies[this.index % this.cookies.length]
        this.index = (this.index + 1) % this.cookies.length
        return cookie
    }
}
