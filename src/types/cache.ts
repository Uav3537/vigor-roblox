export interface RobloxApiCache {
    select: <T>(type: string, separators: string[]) => Promise<Array<{ separator: string; data: T }>>
    upsert: <T>(type: string, expire: number, items: Array<{ separator: string; data: T }>) => Promise<void>
}

/**
 * Per-resource TTL overrides (milliseconds), passed to `createRobloxApi({ ttl })`.
 * Any key left unset falls back to its built-in default (see DEFAULT_TTL_CONFIG).
 * Setting a key to `0` disables caching entirely for that resource: every call
 * fetches fresh data and nothing is read from or written to the cache.
 */
export interface RobloxTtlConfig {
    usersSimple?:           number
    users?:                 number
    usernames?:             number
    thumbnailAssets?:       number
    thumbnails?:            number
    serversSimple?:         number
    friends?:               number
    placeInfo?:             number
    serverLocationJob?:     number
    serverLocationIp?:      number
    serverLocationMachine?: number
    /** cookie를 지정한 호출만 캐시됨 (계정별 분리). 미지정 호출은 캐시를 타지 않음. */
    presence?:              number
    /** cookie 지정 시 계정별 분리, 미지정 시 "shared" 키 하나로 공유 캐시. */
    gamejoin?:               number
}

export type ResolvedTtlConfig = Required<RobloxTtlConfig>

export const DEFAULT_TTL_CONFIG: ResolvedTtlConfig = {
    usersSimple:           24 * 60 * 60 * 1000,
    users:                 24 * 60 * 60 * 1000,
    usernames:             30 * 60 * 1000,
    thumbnailAssets:        48 * 60 * 60 * 1000,
    thumbnails:             48 * 60 * 60 * 1000,
    serversSimple:          5 * 1000,
    friends:               10 * 60 * 1000,
    placeInfo:             60 * 60 * 1000,
    serverLocationJob:     12 * 60 * 60 * 1000,
    serverLocationIp:      31 * 24 * 60 * 60 * 1000,
    serverLocationMachine:  2 * 24 * 60 * 60 * 1000,
    presence:               30 * 1000,
    gamejoin:               30 * 60 * 1000,
}

export function resolveTtlConfig(ttl?: RobloxTtlConfig): ResolvedTtlConfig {
    return { ...DEFAULT_TTL_CONFIG, ...ttl }
}