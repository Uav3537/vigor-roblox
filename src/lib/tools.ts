import { RobloxCookie } from '@/types/branded'

export function chunk<T>(arr: T[], size: number): T[][] {
    const out: T[][] = []
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
    return out
}

export function partition<T>(arr: T[], pred: (item: T) => boolean): { pass: T[]; fail: T[] } {
    const pass: T[] = [], fail: T[] = []
    for (const item of arr) (pred(item) ? pass : fail).push(item)
    return { pass, fail }
}


/**
 * 캐시 키용 쿠키 해시 (sha256 앞 16자리).
 * Node 전용 'crypto' 모듈 대신 전역 Web Crypto를 써서 브라우저 번들에서도 동작하게 한다.
 */
export async function cookieHash(cookie: RobloxCookie): Promise<string> {
    const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(cookie))
    return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('').slice(0, 16)
}