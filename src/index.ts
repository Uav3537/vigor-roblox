import {
    vigor,
    type VigorFetchContext,
    type VigorFetchInterceptorsApi,
    type VigorAllContext,
    type VigorAllInterceptorsApi,
    VigorFetchError,
    VigorRetryError,
} from 'vigor-fetch'

// ----------------------------------------------------------------
// Branded types
// ----------------------------------------------------------------

export type RobloxUserId      = number & { __brand__: 'Roblox_UserId' }
export type RobloxUserName    = string & { __brand__: 'Roblox_UserName' }
export type RobloxDisplayName = string & { __brand__: 'Roblox_UserDisplayName' }
export type RobloxCookie      = string & { __brand__: 'Roblox_Cookie' }
export type RobloxPlaceId     = number & { __brand__: 'Roblox_PlaceId' }
export type RobloxUniverseId  = number & { __brand__: 'Roblox_UniverseId' }
export type RobloxJobId       = string & { __brand__: 'Roblox_JobId' }
export type RobloxAssetId     = number & { __brand__: 'Roblox_AssetId' }

// ----------------------------------------------------------------
// Error system
// ----------------------------------------------------------------

const RobloxErrorMessageFuncs = {
    AUTH_FAILED:    ({ status, cookie }: { status: number | null; cookie: string }) =>
        `Cookie authentication failed (status: ${status ?? 'unknown'}, cookie: ${cookie.slice(0, 8)}...)`,
    RATE_LIMITED:   ({ status, url, retryAfterMs }: { status: number; url: string | null; retryAfterMs: number | null }) =>
        `Rate limited (status: ${status}, url: ${url ?? 'unknown'}, retryAfter: ${retryAfterMs ?? 'unknown'}ms)`,
    REQUEST_FAILED: ({ status, url }: { status: number | null; url: string | null }) =>
        `Request failed (status: ${status ?? 'unknown'}, url: ${url ?? 'unknown'})`,
} as const

type RobloxErrorCodes = keyof typeof RobloxErrorMessageFuncs

type RobloxErrorDatas<C extends RobloxErrorCodes> =
    Parameters<typeof RobloxErrorMessageFuncs[C]> extends [infer A] ? A : undefined

type RobloxErrorOptions<C extends RobloxErrorCodes, T> = {
    cause?:    unknown
    data?:     RobloxErrorDatas<C>
    timeline?: unknown[]
    context?:  T
}

abstract class RobloxApiError<C extends RobloxErrorCodes, T = unknown> extends Error {
    public readonly timestamp: Date = new Date()
    public readonly cause?:    unknown
    public readonly code:      C
    public readonly data:      RobloxErrorDatas<C> | undefined
    public readonly timeline:  unknown[]
    public readonly context:   T | undefined

    constructor(code: C, options: RobloxErrorOptions<C, T>) {
        const messageFn = RobloxErrorMessageFuncs[code] as (arg: RobloxErrorDatas<C>) => string
        super(`[${code}] ${messageFn(options.data as RobloxErrorDatas<C>)}`, { cause: options.cause })
        this.name     = new.target.name
        this.code     = code
        this.cause    = options.cause
        this.data     = options.data
        this.timeline = options.timeline ?? []
        this.context  = options.context
        Object.setPrototypeOf(this, new.target.prototype);
        (Error as any).captureStackTrace?.(this, new.target)
    }
}

export class RobloxAuthError extends RobloxApiError<'AUTH_FAILED'> {
    constructor(options: RobloxErrorOptions<'AUTH_FAILED', never>) {
        super('AUTH_FAILED', options)
    }
}

export class RobloxRateLimitError extends RobloxApiError<'RATE_LIMITED'> {
    constructor(options: RobloxErrorOptions<'RATE_LIMITED', never>) {
        super('RATE_LIMITED', options)
    }
}

export class RobloxRequestError extends RobloxApiError<'REQUEST_FAILED'> {
    constructor(options: RobloxErrorOptions<'REQUEST_FAILED', never>) {
        super('REQUEST_FAILED', options)
    }
}

// ----------------------------------------------------------------
// Error helpers
// ----------------------------------------------------------------

type VigorFetchFailedData = {
    status:     number
    response:   Response
    url:        string
    headers:    unknown
    body:       unknown
    statusText: string
}

function isFetchFailed(cause: unknown): cause is VigorFetchError<'FETCH_FAILED'> & { data: VigorFetchFailedData } {
    return cause instanceof VigorFetchError && cause.code === 'FETCH_FAILED' && cause.data != null
}

function extractTimeline(cause: unknown): unknown[] {
    if (cause instanceof VigorFetchError) return (cause.context?.timeline ?? []) as unknown[]
    if (cause instanceof VigorRetryError) return (cause.context?.timeline ?? []) as unknown[]
    return []
}

function extractStatus(cause: unknown): number | null {
    return isFetchFailed(cause) ? cause.data.status : null
}

function extractUrl(cause: unknown): string | null {
    return isFetchFailed(cause) ? cause.data.url : null
}

function extractRetryAfterMs(cause: unknown): number | null {
    if (!isFetchFailed(cause)) return null
    const headers = cause.data.response.headers
    const raw = headers.get('retry-after')
             ?? headers.get('ratelimit-reset')
             ?? headers.get('x-ratelimit-reset')
             ?? null
    if (raw === null) return null
    const asNum = Number(raw)
    if (!isNaN(asNum)) return asNum * 1000
    const asDate = new Date(raw).getTime()
    return !isNaN(asDate) ? asDate - Date.now() : null
}

function wrapVigorError(cause: unknown): RobloxRateLimitError | RobloxRequestError {
    const status   = extractStatus(cause)
    const url      = extractUrl(cause)
    const timeline = extractTimeline(cause)
    if (status === 429) return new RobloxRateLimitError({
        data: { status, url, retryAfterMs: extractRetryAfterMs(cause) },
        timeline,
        cause,
    })
    return new RobloxRequestError({ data: { status, url }, timeline, cause })
}

// ----------------------------------------------------------------
// Authenticated user extra types
// ----------------------------------------------------------------

export interface RobloxUserDescription {
    description: string
}

export interface RobloxUserBirthdate {
    birthYear:  number
    birthMonth: number
    birthDay:   number
}

export interface RobloxUserGender {
    gender: number
}

export interface RobloxUserAgeBracket {
    ageBracket: number
}

export interface RobloxUserCountryCode {
    countryCode: string
}

export interface RobloxUserRoles {
    roles: string[]
}

export type RobloxAuthenticatedUser =
    RobloxUserSimple
    & Partial<RobloxUserDescription>
    & Partial<RobloxUserBirthdate>
    & Partial<RobloxUserGender>
    & Partial<RobloxUserAgeBracket>
    & Partial<RobloxUserCountryCode>
    & Partial<RobloxUserRoles>

// ----------------------------------------------------------------
// Cache abstraction
// ----------------------------------------------------------------

export interface RobloxApiCache {
    select: <T>(type: string, separators: string[]) => Promise<Array<{ separator: string; data: T }>>
    upsert: <T>(type: string, expire: number, items: Array<{ separator: string; data: T }>) => Promise<void>
}

// ----------------------------------------------------------------
// Response types
// ----------------------------------------------------------------

export interface RobloxUserSimple {
    id:                 RobloxUserId
    name:               RobloxUserName
    displayName:        RobloxDisplayName
    hasVerifiedBadge:   boolean
    requestedUsername?: string
}

export interface RobloxUser extends RobloxUserSimple {
    description:            string
    externalAppDisplayName: string | null
    isBanned:               boolean
    created:                string
}

export interface RobloxThumbnailTarget {
    targetId?:   RobloxAssetId | RobloxUserId
    token?:      string
    type?:       string
    size?:       string
    format?:     string
    isCircular?: boolean
}

export interface RobloxThumbnailRaw extends RobloxThumbnailTarget {
    imageUrl: string | null
    state:    string
    version:  string
}

export interface RobloxThumbnail extends RobloxThumbnailTarget {
    url:     string | null
    state:   string
    version: string
}

interface RobloxServerRaw {
    id:           RobloxJobId
    maxPlayers:   number
    playing:      number
    fps:          number
    ping:         number
    playerTokens: string[]
    [key: string]: unknown
}

export interface RobloxServerEntry {
    jobId:      RobloxJobId
    maxPlayers: number
    playing:    number
    fps:        number
    ping:       number
    playerImgs: string[]
}

export interface RobloxServerEntryWithLocation extends RobloxServerEntry {
    location: RobloxServerLocation | null
}

export interface RobloxServersResult<E extends RobloxServerEntry = RobloxServerEntry> {
    previousPageCursor: string | null
    nextPageCursor:     string | null
    data:               E[]
}

export interface RobloxPresenceEntry {
    userId:           RobloxUserId
    userPresenceType: number
    lastLocation:     string
    placeId:          RobloxPlaceId | null
    rootPlaceId:      RobloxPlaceId | null
    gameId:           RobloxJobId | null
    universeId:       RobloxUniverseId | null
    lastOnline:       string
}

export interface RobloxPlaceInfo {
    placeId:     RobloxPlaceId
    universeId:  RobloxUniverseId | null
    name:        string
    description: string
    creator:     { id: number; name: string; type: string }
    price:       number | null
    playing:     number
    visits:      number
    maxPlayers:  number
    created:     string
    updated:     string
    logos:       string[]
}

export interface RobloxServerLocation {
    ip:          string
    jobId:       RobloxJobId
    countryCode: string
    countryName: string
    regionName:  string
    city:        string
    latitude:    number
    longitude:   number
    isp:         string
    timezone:    string
}

// ----------------------------------------------------------------
// Factory options
// ----------------------------------------------------------------

export interface CreateRobloxApiOptions {
    cache:            RobloxApiCache
    cookies:          RobloxCookie[]
    ipgeolocationKey: string
}

// ----------------------------------------------------------------
// Shared servers opts
// ----------------------------------------------------------------

interface ServersOpts {
    placeId:          RobloxPlaceId
    count?:           number
    serverType?:      'Public' | 'Friend'
    cursor?:          string
    thumbnailFormat?: Partial<RobloxThumbnailTarget>
}

// ----------------------------------------------------------------
// Public API shape
// ----------------------------------------------------------------

export type VigorFetchInstance = ReturnType<typeof vigor.fetch>

export interface RobloxApi {
    authenticated:      (cookies: RobloxCookie[]) => Promise<RobloxAuthenticatedUser[]>
    usersSimple:        (userIds: RobloxUserId[]) => Promise<RobloxUserSimple[]>
    users:              (userIds: RobloxUserId[]) => Promise<RobloxUser[]>
    usersByName:        (usernames: string[]) => Promise<RobloxUserSimple[]>
    thumbnailAssets:    (opts: { assetIds: RobloxAssetId[]; size?: string; format?: string }) => Promise<RobloxThumbnail[]>
    thumbnailsBatch:    (targets: RobloxThumbnailTarget[], formatDefaults?: Partial<RobloxThumbnailTarget>) => Promise<RobloxThumbnail[]>
    serversSimple:      (opts: ServersOpts) => Promise<RobloxServersResult<RobloxServerEntry>>
    servers:            (opts: ServersOpts) => Promise<RobloxServersResult<RobloxServerEntryWithLocation>>
    presence:           (userIds: RobloxUserId[]) => Promise<RobloxPresenceEntry[]>
    placeInfo:          (placeIds: RobloxPlaceId[]) => Promise<RobloxPlaceInfo[]>
    usersSimpleWithImg: (userIds: RobloxUserId[]) => Promise<Array<RobloxUserSimple & { img: string | null }>>
    usersWithImg:       (userIds: RobloxUserId[]) => Promise<Array<RobloxUser        & { img: string | null }>>
    track:              (opts: { placeId: RobloxPlaceId; targets: Array<string | number> }) => Promise<Array<{
        user:   RobloxUserSimple & { img: string | null }
        server: RobloxServerEntry & { location: RobloxServerLocation | null } | null
    }>>
    serversRegion:      (opts: { placeId: RobloxPlaceId; jobIds: RobloxJobId[] }) => Promise<RobloxServerLocation[]>
    _internal: {
        gamejoinApi: VigorFetchInstance
        gamesApi:    VigorFetchInstance
        apisRoblox:  VigorFetchInstance
    }
}

// ----------------------------------------------------------------
// Internal helpers
// ----------------------------------------------------------------

type WithImg<T> = T & { img: string | null }

type FetchBeforeCtx = VigorFetchContext
type FetchBeforeApi = Pick<VigorFetchInterceptorsApi<unknown>, 'setHeaders' | 'setOptions' | 'setBody' | 'throwError'>
type FetchResultCtx = VigorFetchContext
type FetchResultApi = Pick<VigorFetchInterceptorsApi<unknown>, 'setResult' | 'throwError'>

type AllResultCtx = VigorAllContext
type AllResultApi = Pick<VigorAllInterceptorsApi<unknown>, 'setResult' | 'throwError'>

function chunk<T>(arr: T[], size: number): T[][] {
    const out: T[][] = []
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
    return out
}

function partition<T>(arr: T[], pred: (item: T) => boolean): { pass: T[]; fail: T[] } {
    const pass: T[] = [], fail: T[] = []
    for (const item of arr) (pred(item) ? pass : fail).push(item)
    return { pass, fail }
}

// ----------------------------------------------------------------
// Factory
// ----------------------------------------------------------------

export function createRobloxApi({
    cache,
    cookies: cookiesList,
    ipgeolocationKey,
}: CreateRobloxApiOptions): RobloxApi {

    const cookiePool = cookiesList.map(cookie => ({ cookie, lastUsed: 0 }))

    function pickCookie(): RobloxCookie {
        const entry = cookiePool.reduce((a, b) => a.lastUsed < b.lastUsed ? a : b)
        entry.lastUsed = Date.now()
        return entry.cookie
    }

    function pickKey(key: string) {
        return vigor.builder.fetch.interceptors()
            .result((ctx: FetchResultCtx, api: FetchResultApi) => {
                api.setResult((ctx.result as Record<string, unknown>)[key])
            })
    }

    const dataInterceptor = pickKey('data')

    const cookieInterceptor = vigor.builder.fetch.interceptors()
        .before((ctx: FetchBeforeCtx, api: FetchBeforeApi) => {
            api.setHeaders({
                ...(ctx.options.headers as Record<string, string>),
                Cookie: `.ROBLOSECURITY=${pickCookie()}`,
            })
        })

    const winInetInterceptor = vigor.builder.fetch.interceptors()
        .before((ctx: FetchBeforeCtx, api: FetchBeforeApi) => {
            api.setHeaders({
                ...(ctx.options.headers as Record<string, string>),
                'User-Agent': 'Roblox/WinInet',
            })
        })

    const usersApi = vigor.fetch('https://users.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .interceptors(winInetInterceptor)
        .retryConfig(c => c
            .settings(s => s.attempt(7))
            .algorithms(a => a.backoff().initial(200).unit(800).multiplier(1.7))
        )

    const thumbnailsApi = vigor.fetch('https://thumbnails.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .interceptors(winInetInterceptor)
        .retryConfig(c => c
            .settings(s => s.attempt(5))
            .algorithms(a => a.backoff().initial(1000).multiplier(2.5))
        )

    const gamesApi = vigor.fetch('https://games.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .retryConfig(c => c
            .settings(s => s.attempt(5))
            .algorithms(a => a.backoff().initial(1000).multiplier(2.5))
        )

    const presenceApi = vigor.fetch('https://presence.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .retryConfig(c => c
            .settings(s => s.attempt(5))
            .algorithms(a => a.backoff().initial(500).multiplier(2))
        )

    const apisRoblox = vigor.fetch('https://apis.roblox.com')
        .interceptors(cookieInterceptor)
        .retryConfig(c => c
            .settings(s => s.attempt(5))
            .algorithms(a => a.backoff().initial(1000).multiplier(2))
        )

    const gamejoinApi = vigor.fetch('https://gamejoin.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .retryConfig(c => c
            .settings(s => s.attempt(7))
            .algorithms(a => a.backoff().initial(500).multiplier(1.5))
        )

    const ipgeolocationApi = vigor.fetch('https://api.ipgeolocation.io')
        .retryConfig(c => c
            .settings(s => s.attempt(4))
            .algorithms(a => a.backoff().initial(500).multiplier(2))
        )

    async function withCache<T>(opts: {
        type:         string
        keys:         string[]
        ttlMs:        number
        getKey:       (item: T) => string
        fetchMissing: (missing: string[]) => Promise<T[]>
        fallback:     T
    }): Promise<T[]> {
        const { type, keys, ttlMs, getKey, fetchMissing, fallback } = opts
        const cached   = await cache.select<T>(type, keys)
        const cacheMap = new Map(cached.map(({ separator, data }) => [separator, data]))
        const missing  = keys.filter(k => !cacheMap.has(k))
        if (missing.length > 0) {
            const fetched = await fetchMissing(missing)
            await cache.upsert<T>(type, ttlMs, fetched.map(item => ({ separator: getKey(item), data: item })))
            fetched.forEach(item => cacheMap.set(getKey(item), item))
        }
        return keys.map(k => cacheMap.get(k) ?? fallback)
    }

    async function authenticated(cookies: RobloxCookie[]): Promise<RobloxAuthenticatedUser[]> {
        return vigor.all(...cookies.map(cookie => async () => {
            const fixedCookieInterceptor = vigor.builder.fetch.interceptors()
                .before((ctx: FetchBeforeCtx, api: FetchBeforeApi) => {
                    api.setHeaders({
                        ...(ctx.options.headers as Record<string, string>),
                        Cookie: `.ROBLOSECURITY=${cookie}`,
                    })
                })

            const base = usersApi.interceptors(fixedCookieInterceptor)

            const [user, description, birthdate, gender, ageBracket, countryCode, roles] = await Promise.allSettled([
                base.path('users', 'authenticated').request<RobloxUserSimple>(),
                base.path('description').request<RobloxUserDescription>(),
                base.path('birthdate').request<RobloxUserBirthdate>(),
                base.path('gender').request<RobloxUserGender>(),
                base.path('users', 'authenticated', 'age-bracket').request<RobloxUserAgeBracket>(),
                base.path('users', 'authenticated', 'country-code').request<RobloxUserCountryCode>(),
                base.path('users', 'authenticated', 'roles').request<RobloxUserRoles>(),
            ])

            if (user.status === 'rejected') {
                const cause    = user.reason
                const status   = extractStatus(cause)
                const timeline = extractTimeline(cause)
                if (status === 429) throw new RobloxRateLimitError({
                    data: { status, url: extractUrl(cause), retryAfterMs: extractRetryAfterMs(cause) },
                    timeline,
                    cause,
                })
                throw new RobloxAuthError({ data: { status, cookie }, timeline, cause })
            }

            return {
                ...user.value,
                ...(description.status === 'fulfilled' ? description.value : {}),
                ...(birthdate.status   === 'fulfilled' ? birthdate.value   : {}),
                ...(gender.status      === 'fulfilled' ? gender.value      : {}),
                ...(ageBracket.status  === 'fulfilled' ? ageBracket.value  : {}),
                ...(countryCode.status === 'fulfilled' ? countryCode.value : {}),
                ...(roles.status       === 'fulfilled' ? roles.value       : {}),
            } satisfies RobloxAuthenticatedUser
        })).request<RobloxAuthenticatedUser[]>()
    }

    async function usersSimple(userIds: RobloxUserId[]): Promise<RobloxUserSimple[]> {
        return withCache<RobloxUserSimple>({
            type:     'usersSimple',
            keys:     userIds.map(String),
            ttlMs:    30 * 60 * 1000,
            getKey:   item => String(item.id),
            fallback: {} as RobloxUserSimple,
            fetchMissing: async missing => {
                try {
                    const results = await vigor.all(
                        ...chunk(missing.map(Number), 100).map(group => () =>
                            usersApi
                                .path('users')
                                .body({ userIds: group, excludeBannedUsers: false })
                                .interceptors(dataInterceptor)
                                .request<RobloxUserSimple[]>()
                        )
                    )
                    .interceptors(vigor.builder.all.interceptors()
                        .result((ctx: AllResultCtx, api: AllResultApi) => {
                            api.setResult((ctx.result as RobloxUserSimple[][]).flat())
                        })
                    )
                    .request<RobloxUserSimple[]>()
                    return results.filter(u => u.id != null && u.name != null && u.displayName != null)
                } catch (cause) {
                    throw wrapVigorError(cause)
                }
            },
        })
    }

    async function users(userIds: RobloxUserId[]): Promise<RobloxUser[]> {
        return withCache<RobloxUser>({
            type:     'users',
            keys:     userIds.map(String),
            ttlMs:    60 * 60 * 1000,
            getKey:   item => String(item.id),
            fallback: {} as RobloxUser,
            fetchMissing: async missing => {
                try {
                    const results = await vigor.all(
                        ...missing.map(id => () => usersApi.path('users', id).request<RobloxUser>())
                    )
                    .settings(s => s.concurrency(2))
                    .request<RobloxUser[]>()
                    return results.filter(
                        u => u.id != null && u.name != null && u.displayName != null && u.description != null
                    )
                } catch (cause) {
                    throw wrapVigorError(cause)
                }
            },
        })
    }

    async function usersByName(usernames: string[]): Promise<RobloxUserSimple[]> {
        return withCache<RobloxUserSimple>({
            type:     'usernames',
            keys:     usernames,
            ttlMs:    30 * 60 * 1000,
            getKey:   item => item.requestedUsername ?? item.name,
            fallback: {} as RobloxUserSimple,
            fetchMissing: async missing => {
                try {
                    const results = await vigor.all(
                        ...chunk(missing, 100).map(group => () =>
                            usersApi
                                .path('usernames', 'users')
                                .body({ usernames: group, excludeBannedUsers: false })
                                .interceptors(dataInterceptor)
                                .request<RobloxUserSimple[]>()
                        )
                    )
                    .interceptors(vigor.builder.all.interceptors()
                        .result((ctx: AllResultCtx, api: AllResultApi) => {
                            api.setResult((ctx.result as RobloxUserSimple[][]).flat())
                        })
                    )
                    .request<RobloxUserSimple[]>()
                    return results.filter(u => u.id != null && u.name != null && u.displayName != null)
                } catch (cause) {
                    throw wrapVigorError(cause)
                }
            },
        })
    }

    async function presence(userIds: RobloxUserId[]): Promise<RobloxPresenceEntry[]> {
        try {
            return await vigor.all(
                ...chunk(userIds, 50).map(group => () =>
                    presenceApi
                        .path('presence', 'users')
                        .body({ userIds: group })
                        .interceptors(pickKey('userPresences'))
                        .request<RobloxPresenceEntry[]>()
                )
            )
            .interceptors(vigor.builder.all.interceptors()
                .result((ctx: AllResultCtx, api: AllResultApi) => {
                    api.setResult((ctx.result as RobloxPresenceEntry[][]).flat())
                })
            )
            .request<RobloxPresenceEntry[]>()
        } catch (cause) {
            throw wrapVigorError(cause)
        }
    }

    async function thumbnailAssets(opts: {
        assetIds: RobloxAssetId[]
        size?:    string
        format?:  string
    }): Promise<RobloxThumbnail[]> {
        const { assetIds, size = '150x150', format = 'Png' } = opts
        try {
            const results = await vigor.all(
                ...chunk(assetIds, 100).map(group => () =>
                    thumbnailsApi
                        .path('assets')
                        .query({ assetIds: group.join(','), size, format })
                        .interceptors(dataInterceptor)
                        .request<RobloxThumbnail[]>()
                )
            )
            .interceptors(vigor.builder.all.interceptors()
                .result((ctx: AllResultCtx, api: AllResultApi) => {
                    api.setResult((ctx.result as RobloxThumbnail[][]).flat())
                })
            )
            .request<RobloxThumbnailRaw[]>()
            return results.map(t => ({ ...t, url: t.state === 'Completed' ? t.imageUrl : null }))
        } catch (cause) {
            throw wrapVigorError(cause)
        }
    }

    async function thumbnailsBatch(
        targets: RobloxThumbnailTarget[],
        formatDefaults: Partial<RobloxThumbnailTarget> = {}
    ): Promise<RobloxThumbnail[]> {
        const defaults: Partial<RobloxThumbnailTarget> = {
            type:       'AvatarHeadShot',
            size:       '150x150',
            format:     'Png',
            isCircular: false,
            ...formatDefaults,
        }
        const batch    = targets.map((t, i) => ({ ...defaults, ...t, requestId: String(i) }))
        const batchMap = new Map(batch.map(t => [t.requestId, t]))
        try {
            const results = await vigor.all(
                ...chunk(batch, 100).map(group => () =>
                    thumbnailsApi
                        .path('batch')
                        .body(group)
                        .interceptors(dataInterceptor)
                        .request<Array<RobloxThumbnail & { requestId: string }>>()
                )
            )
            .interceptors(vigor.builder.all.interceptors()
                .result((ctx: AllResultCtx, api: AllResultApi) => {
                    api.setResult((ctx.result as unknown[][]).flat())
                })
            )
            .request<Array<RobloxThumbnailRaw & { requestId: string }>>()
            return results.map(item => {
                const original = batchMap.get(item.requestId) ?? {}
                const { requestId: _rid, ...rest } = item
                return { ...original, ...rest, url: rest.state === 'Completed' ? rest.imageUrl : null } as RobloxThumbnail
            })
        } catch (cause) {
            throw wrapVigorError(cause)
        }
    }

    async function serversSimple(opts: ServersOpts): Promise<RobloxServersResult<RobloxServerEntry>> {
        const { placeId, count = 1, serverType = 'Public', cursor, thumbnailFormat } = opts
        let nextCursor: string | null = cursor ?? null
        let prevCursor: string | null = null
        const rawData: RobloxServerRaw[] = []
        try {
            for (let i = 0; i < count; i++) {
                const page = await gamesApi
                    .path('games', placeId, 'servers', serverType)
                    .query({ limit: 100, ...(nextCursor ? { cursor: nextCursor } : {}) })
                    .request<{ previousPageCursor: string | null; nextPageCursor: string | null; data: RobloxServerRaw[] }>()
                if (i === 0) prevCursor = page.previousPageCursor
                nextCursor = page.nextPageCursor
                rawData.push(...page.data)
                if (!nextCursor) break
            }
        } catch (cause) {
            throw wrapVigorError(cause)
        }
        const thumbTargets: RobloxThumbnailTarget[] = rawData
            .flatMap(s => s.playerTokens.map(token => ({ token, type: 'AvatarHeadShot', size: '150x150', format: 'Png', ...thumbnailFormat })))
        const thumbResults = await thumbnailsBatch(thumbTargets, thumbnailFormat)
        const thumbMap     = new Map(thumbResults.map(t => [t.token, t.url]))
        return {
            previousPageCursor: prevCursor,
            nextPageCursor:     nextCursor,
            data: rawData.map(s => ({
                jobId:      s.id,
                maxPlayers: s.maxPlayers,
                playing:    s.playing,
                fps:        s.fps,
                ping:       s.ping,
                playerImgs: s.playerTokens.map(tok => thumbMap.get(tok)).filter((url): url is string => url != null),
            })),
        }
    }

    async function servers(opts: ServersOpts): Promise<RobloxServersResult<RobloxServerEntryWithLocation>> {
        const result = await serversSimple(opts)

        const jobIds = result.data.map(s => s.jobId)
        const locationList = await serversRegion({ placeId: opts.placeId, jobIds }).catch(() => [])
        const locationMap  = new Map(locationList.map(l => [l.jobId, l]))

        return {
            ...result,
            data: result.data.map(s => ({
                ...s,
                location: locationMap.get(s.jobId) ?? null,
            })),
        }
    }

    async function placeInfo(placeIds: RobloxPlaceId[]): Promise<RobloxPlaceInfo[]> {
        return withCache<RobloxPlaceInfo>({
            type:     'placeInfo',
            keys:     placeIds.map(String),
            ttlMs:    60 * 60 * 1000,
            getKey:   item => String(item.placeId),
            fallback: {} as RobloxPlaceInfo,
            fetchMissing: async missing => {
                try {
                    const universeEntries = await vigor.all(
                        ...missing.map(placeId => () =>
                            apisRoblox
                                .path('universes', 'v1', 'places', placeId, 'universe')
                                .interceptors(vigor.builder.fetch.interceptors()
                                    .result((ctx: FetchResultCtx, api: FetchResultApi) => {
                                        const r = ctx.result as { universeId?: number }
                                        api.setResult({ placeId: Number(placeId), universeId: r?.universeId ?? null })
                                    })
                                )
                                .request<{ placeId: number; universeId: number | null }>()
                        )
                    ).request<{ placeId: number; universeId: number | null }[]>()

                    type MetaItem = { placeId: number; universeId: number | null; info: unknown; assetIds: number[] }

                    const metaList = await vigor.all(
                        ...universeEntries.map(({ placeId, universeId }) => async () => {
                            if (!universeId) return { placeId, universeId: null, info: null, assetIds: [] as number[] } satisfies MetaItem
                            const [details, media] = await Promise.all([
                                gamesApi.path('games').query({ universeIds: universeId }).interceptors(dataInterceptor).request<unknown[]>(),
                                gamesApi.path('games', universeId, 'media').interceptors(dataInterceptor).request<Array<{ imageId?: number }>>(),
                            ])
                            return {
                                placeId,
                                universeId,
                                info:     (details as unknown[])?.[0] ?? null,
                                assetIds: (media ?? []).map(m => m.imageId).filter((id): id is number => id != null),
                            } satisfies MetaItem
                        })
                    ).request<MetaItem[]>()

                    const allAssetIds = [...new Set(metaList.flatMap(m => m.assetIds))]
                    const assetUrlMap = new Map<number, string>()
                    if (allAssetIds.length > 0) {
                        const thumbs = await thumbnailAssets({ assetIds: allAssetIds as RobloxAssetId[], size: '768x432', format: 'Png' })
                        thumbs.forEach(t => { if (t.targetId != null && t.url) assetUrlMap.set(t.targetId as number, t.url) })
                    }
                    return metaList.map(({ placeId, universeId, info, assetIds }) => ({
                        ...(info as object ?? {}),
                        placeId,
                        universeId,
                        logos: assetIds.map(id => assetUrlMap.get(id)).filter((u): u is string => u != null),
                    })) as RobloxPlaceInfo[]
                } catch (cause) {
                    throw wrapVigorError(cause)
                }
            },
        })
    }

    async function usersSimpleWithImg(userIds: RobloxUserId[]): Promise<WithImg<RobloxUserSimple>[]> {
        const [userList, thumbs] = await Promise.all([
            usersSimple(userIds),
            thumbnailsBatch(userIds.map(id => ({ targetId: id }))),
        ])
        const imgMap = new Map(thumbs.map(t => [t.targetId, t.url]))
        return userList.map(u => ({ ...u, img: imgMap.get(u.id) ?? null }))
    }

    async function usersWithImg(userIds: RobloxUserId[]): Promise<WithImg<RobloxUser>[]> {
        const [userList, thumbs] = await Promise.all([
            users(userIds),
            thumbnailsBatch(userIds.map(id => ({ targetId: id }))),
        ])
        const imgMap = new Map(thumbs.map(t => [t.targetId, t.url]))
        return userList.map(u => ({ ...u, img: imgMap.get(u.id) ?? null }))
    }

    async function track(opts: { placeId: RobloxPlaceId; targets: Array<string | number> }): Promise<Array<{
        user:   RobloxUserSimple & { img: string | null }
        server: RobloxServerEntry & { location: RobloxServerLocation | null } | null
    }>> {
        const { placeId, targets } = opts

        const { pass: rawIds, fail: names } = partition(targets, t => !Number.isNaN(Number(t)))
        const resolvedIds = (await usersByName(names as string[])).map(u => u.id)
        const idList      = [...rawIds.map(Number), ...resolvedIds] as RobloxUserId[]

        const [userList, serverResult, thumbs] = await Promise.all([
            usersSimple(idList),
            serversSimple({ placeId, count: 20 }),
            thumbnailsBatch(idList.map(id => ({ targetId: id }))),
        ])

        const thumbnailsMap = new Map(thumbs.map(t => [t.targetId, t.url]))

        const defaultHashes = new Set([
            '5816BB6B457A7A2FD8F0299D6F79DADF', 'D517857E5CC51E2FF93E63E20241169E',
            '56DFC0F87BABBE49C6D1BE708AE9A66A', 'C16BE31B5A403C45279B3FF5533980E9',
            '51E47F0C53DA3A617158586DF73B1236', 'ACCF91F734E311F4A0EF23C3EDA54284',
            'CF083BB49C3304C593C43617FF06418E', '3259891600987E41060EC3A43511F2F9',
            '19F6EB627A565DF5ABC0B82925B2C760', '5CB6042A80C64D34BA98721C96F5D6A3',
            'E592BA2BBFA44C9021643D25BC014BD5', '661AD135B4409FF51BC4A6D80E6AC0C7',
            '8E0E19FD517F46AD46A8A322377CA89B', '1E8FFEC57F042949AEFAC69FECC72D38',
            '64D3D8C3021F7E8442CCA2825051A87A',
        ])

        const getHash = (url: string | null | undefined): string | null => {
            if (!url) return null
            try {
                const segments = new URL(url).pathname.split('/')
                const segment  = segments.find(s => s.includes('-'))
                if (!segment) return null
                const parts = segment.split('-')
                return parts.length >= 3 ? parts.slice(1, -1).join('-') : null
            } catch {
                return null
            }
        }

        const serverHashMap = new Map<string, RobloxServerEntry>()
        serverResult.data.forEach(s =>
            s.playerImgs.forEach(img => {
                const h = getHash(img)
                if (h) serverHashMap.set(h, s)
            })
        )

        const matchedJobIds = new Set<RobloxJobId>()
        const userServerMap = new Map<RobloxUserId, RobloxServerEntry>()

        for (const user of userList) {
            const img  = thumbnailsMap.get(user.id) ?? null
            const hash = getHash(img)
            const server = hash && !defaultHashes.has(hash) ? (serverHashMap.get(hash) ?? null) : null
            if (server) {
                userServerMap.set(user.id, server)
                matchedJobIds.add(server.jobId)
            }
        }

        const locationList = matchedJobIds.size > 0
            ? await serversRegion({ placeId, jobIds: [...matchedJobIds] })
            : []
        const locationMap = new Map(locationList.map(l => [l.jobId, l]))

        return userList.map(user => {
            const img    = thumbnailsMap.get(user.id) ?? null
            const server = userServerMap.get(user.id) ?? null
            return {
                user:   { ...user, img },
                server: server ? { ...server, location: locationMap.get(server.jobId) ?? null } : null,
            }
        })
    }

    interface GamejoinResponse {
        joinScript?: {
            MachineAddress?: string
            UdmuxEndpoint?:  Array<{ Address: string; Port: number }>
        }
    }

    async function extractIps(placeId: RobloxPlaceId, jobId: RobloxJobId): Promise<{
        publicIp:       string | null
        machineAddress: string | null
    }> {
        try {
            const res = await gamejoinApi
                .path('join-game-instance')
                .body({ placeId, gameId: jobId })
                .request<GamejoinResponse>()
            return {
                publicIp:       res?.joinScript?.UdmuxEndpoint?.[0]?.Address ?? null,
                machineAddress: res?.joinScript?.MachineAddress ?? null,
            }
        } catch {
            return { publicIp: null, machineAddress: null }
        }
    }

    async function fetchIpLocation(ip: string): Promise<Omit<RobloxServerLocation, 'jobId'> | null> {
        try {
            const raw = await ipgeolocationApi
                .path('ipgeo')
                .query({ apiKey: ipgeolocationKey, ip, fields: 'country_code2,country_name,state_prov,city,latitude,longitude,isp,time_zone' })
                .request<Record<string, unknown>>()
            return {
                ip,
                countryCode: String(raw.country_code2 ?? ''),
                countryName: String(raw.country_name  ?? ''),
                regionName:  String(raw.state_prov    ?? ''),
                city:        String(raw.city           ?? ''),
                latitude:    Number(raw.latitude       ?? 0),
                longitude:   Number(raw.longitude      ?? 0),
                isp:         String(raw.isp            ?? ''),
                timezone:    String((raw.time_zone as Record<string, unknown>)?.name ?? ''),
            }
        } catch {
            return null
        }
    }

    async function serversRegion(opts: { placeId: RobloxPlaceId; jobIds: RobloxJobId[] }): Promise<RobloxServerLocation[]> {
        const { placeId, jobIds } = opts
        if (jobIds.length === 0) return []

        const JOB_TTL     = 12 * 60 * 60 * 1000
        const IP_TTL      = 31 * 24 * 60 * 60 * 1000
        const MACHINE_TTL =  2 * 24 * 60 * 60 * 1000
        type LocBase = Omit<RobloxServerLocation, 'jobId'>

        const cachedByJob = await cache.select<RobloxServerLocation>('serverLocation:job', jobIds)
        const jobHitMap   = new Map(cachedByJob.map(({ separator, data }) => [separator, data]))
        const missJobIds  = jobIds.filter(id => !jobHitMap.has(id))
        if (missJobIds.length === 0) return jobIds.map(id => jobHitMap.get(id)!)

        const extracted = await vigor.all(
            ...missJobIds.map(jobId => async () => {
                const { publicIp, machineAddress } = await extractIps(placeId, jobId as RobloxJobId)
                return { jobId, publicIp, machineAddress }
            })
        )
        .settings(s => s.concurrency(3))
        .request<Array<{ jobId: string; publicIp: string | null; machineAddress: string | null }>>()

        const validExtracted = extracted.filter(
            (e): e is { jobId: string; publicIp: string; machineAddress: string | null } => e.publicIp !== null
        )
        const machineAddresses = [...new Set(validExtracted.map(e => e.machineAddress).filter((m): m is string => m !== null))]

        const cachedByMachine = await cache.select<LocBase>('serverLocation:machine', machineAddresses)
        const machineHitMap   = new Map(cachedByMachine.map(({ separator, data }) => [separator, data]))

        type ExtractedValid = { jobId: string; publicIp: string; machineAddress: string | null }
        const { pass: machineHits, fail: machineMiss } = validExtracted.reduce<{
            pass: Array<ExtractedValid & { loc: LocBase }>
            fail: ExtractedValid[]
        }>(
            (acc, e) => {
                const cached = e.machineAddress ? machineHitMap.get(e.machineAddress) : undefined
                if (cached) acc.pass.push({ ...e, loc: cached })
                else        acc.fail.push(e)
                return acc
            },
            { pass: [], fail: [] }
        )

        const missPublicIps = [...new Set(machineMiss.map(e => e.publicIp))]
        const cachedByIp    = await cache.select<LocBase>('serverLocation:ip', missPublicIps)
        const ipHitMap      = new Map(cachedByIp.map(({ separator, data }) => [separator, data]))
        const stillMissIps  = missPublicIps.filter(ip => !ipHitMap.has(ip))

        if (stillMissIps.length > 0) {
            const fetched = await vigor.all(
                ...stillMissIps.map(ip => async () => ({ ip, loc: await fetchIpLocation(ip) }))
            )
            .settings(s => s.concurrency(5))
            .request<Array<{ ip: string; loc: LocBase | null }>>()
            const toUpsertIp = fetched.filter((e): e is { ip: string; loc: LocBase } => e.loc !== null)
            if (toUpsertIp.length > 0) {
                await cache.upsert<LocBase>('serverLocation:ip', IP_TTL, toUpsertIp.map(({ ip, loc }) => ({ separator: ip, data: loc })))
                toUpsertIp.forEach(({ ip, loc }) => ipHitMap.set(ip, loc))
            }
        }

        const toUpsertMachine: Array<{ separator: string; data: LocBase }> = []
        for (const e of machineMiss) {
            const loc = ipHitMap.get(e.publicIp)
            if (loc && e.machineAddress && !machineHitMap.has(e.machineAddress)) {
                toUpsertMachine.push({ separator: e.machineAddress, data: loc })
                machineHitMap.set(e.machineAddress, loc)
            }
        }
        if (toUpsertMachine.length > 0) await cache.upsert<LocBase>('serverLocation:machine', MACHINE_TTL, toUpsertMachine)

        const jobLocations: RobloxServerLocation[] = []
        const toUpsertJob:  Array<{ separator: string; data: RobloxServerLocation }> = []

        for (const { jobId, loc } of machineHits) {
            const full: RobloxServerLocation = { ...loc, jobId: jobId as RobloxJobId }
            jobLocations.push(full)
            toUpsertJob.push({ separator: jobId, data: full })
        }
        for (const e of machineMiss) {
            const loc = ipHitMap.get(e.publicIp)
            if (!loc) continue
            const full: RobloxServerLocation = { ...loc, jobId: e.jobId as RobloxJobId }
            jobLocations.push(full)
            toUpsertJob.push({ separator: e.jobId, data: full })
        }
        if (toUpsertJob.length > 0) await cache.upsert<RobloxServerLocation>('serverLocation:job', JOB_TTL, toUpsertJob)

        const resultMap = new Map<string, RobloxServerLocation>([
            ...jobHitMap.entries(),
            ...jobLocations.map(loc => [loc.jobId, loc] as const),
        ])
        return jobIds.flatMap(id => { const loc = resultMap.get(id); return loc ? [loc] : [] })
    }

    return {
        authenticated,
        usersSimple,
        users,
        usersByName,
        thumbnailAssets,
        thumbnailsBatch,
        serversSimple,
        servers,
        presence,
        placeInfo,
        usersSimpleWithImg,
        usersWithImg,
        track,
        serversRegion,
        _internal: { gamejoinApi, gamesApi, apisRoblox },
    }
}