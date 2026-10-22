import type { RobloxViewerKey } from "./cache"
import type { RobloxConfig } from "./config"

/** 쿠키 → 해시. 쿠키 원문은 외부 캐시 저장소에 남지 않게 한다. */
const hashes = new Map<string, Promise<string>>()

async function sha256(text: string) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))
    return Array.from(new Uint8Array(digest).slice(0, 12), b => b.toString(16).padStart(2, "0")).join("")
}

/**
 * 요청 계정에 따라 결과가 달라지는 API의 캐시 키 앞부분. 누구 관점인지 정할 수 없으면(쿠키 로테이션) null이고,
 * 그때는 캐시하지 않는다. 외부 쿠키 풀은 비어 있는지 알 수 없으므로 풀이 있으면 로테이션으로 본다.
 */
export async function viewerKey(config: RobloxConfig): Promise<RobloxViewerKey | null> {
    if (config.mode === "extension") return "extension"
    if (config.fixedCookie) {
        let hash = hashes.get(config.fixedCookie)
        if (!hash) hashes.set(config.fixedCookie, hash = sha256(config.fixedCookie))
        return `cookie:${await hash}`
    }
    if (!config.cookies) return "anonymous"
    return null
}

/** 쿠키(또는 확장 모드의 브라우저 세션)로 인증된 요청을 보낼 수 있는지 */
export function canAuthenticate(config: RobloxConfig): boolean {
    return config.mode === "extension" || config.fixedCookie !== null || config.cookies !== null
}

/**
 * 요청 계정을 기준으로 답하는 API(채팅, 친구 상태 등)는 계정이 하나로 정해져 있어야 한다.
 * 쿠키를 돌려 쓰는 중이면 요청마다 계정이 달라지므로 `.as(cookie)`를 쓰라고 알린다.
 */
export async function requireViewer(config: RobloxConfig): Promise<RobloxViewerKey> {
    const viewer = await viewerKey(config)
    if (viewer === null) throw new Error("이 API는 요청 계정을 기준으로 답한다. 쿠키 로테이션 대신 .as(cookie)로 계정을 정해야 한다.")
    return viewer
}
