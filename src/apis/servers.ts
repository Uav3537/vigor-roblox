import { z } from 'zod'

import { RobloxCookie, RobloxJobId } from '@/types/branded'
import {
    RobloxServerEntry,
    RobloxServerEntryWithLocation,
    RobloxPrivateServerEntry,
    RobloxPrivateServerEntryWithLocation,
    RobloxServerLocation,
    RobloxServersResult,
    RobloxThumbnailTarget,
    RobloxServersPageRawSchema,
    RobloxPrivateServersPageRawSchema,
} from '@/types/responses'
import { ServersOpts } from '@/types/api'

import { createNetworkClients } from '@/lib/network'
import { createCacheHelpers } from '@/lib/cache'
import { validate } from '@/lib/middlewares'
import { gamesServersRateLimiter } from '@/lib/rate-limiter'
import { cookieHash } from '@/lib/tools'

import { createThumbnailsApi } from '@/apis/thumbnails'
import { createServersRegionApi } from '@/apis/serversRegion'

export type ServersApiDeps = {
    buildGamesServersApi: ReturnType<typeof createNetworkClients>['buildGamesServersApi']
    withCache:            ReturnType<typeof createCacheHelpers>['withCache']
    thumbnailsBatch:      ReturnType<typeof createThumbnailsApi>['thumbnailsBatch']
    serversRegion:        ReturnType<typeof createServersRegionApi>['serversRegion']
}

type PrivateServersOpts = ServersOpts & { serverType: 'Private' }
type PublicServersOpts  = ServersOpts & { serverType?: 'Public' | 'Friend' }

type AnyServerEntry = RobloxServerEntry | RobloxPrivateServerEntry

/** 페이지 공통 형태: 엔드포인트마다 항목 스키마만 다르다. */
type RawPage<T> = { previousPageCursor: string | null; nextPageCursor: string | null; data: T[] }

export function createServersApi({ buildGamesServersApi, withCache, thumbnailsBatch, serversRegion }: ServersApiDeps) {

    const poolClient = buildGamesServersApi()

    /** `count` 페이지까지 cursor를 따라가며 원본 항목을 모은다. */
    async function fetchPages<T>(opts: {
        client:  ReturnType<typeof buildGamesServersApi>
        path:    Array<string | number>
        schema:  z.ZodType<RawPage<T>>
        count:   number
        cursor?: string
    }): Promise<RawPage<T>> {
        const { client, path, schema, count, cursor } = opts
        let nextCursor: string | null = cursor ?? null
        let prevCursor: string | null = null
        const data: T[] = []
        for (let i = 0; i < count; i++) {
            const page = await gamesServersRateLimiter(() =>
                client
                    .path(...path)
                    .query({ limit: 100, ...(nextCursor ? { cursor: nextCursor } : {}) })
                    .middlewares(validate(schema))
                    .request<RawPage<T>>()
            )
            if (i === 0) prevCursor = page.previousPageCursor
            nextCursor = page.nextPageCursor
            data.push(...page.data)
            if (!nextCursor) break
        }
        return { previousPageCursor: prevCursor, nextPageCursor: nextCursor, data }
    }

    /** playerTokens → 프로필 이미지 url 맵 */
    async function playerImgMap(tokens: string[], thumbnailFormat: ServersOpts['thumbnailFormat']): Promise<Map<string | undefined, string | null>> {
        const thumbTargets: RobloxThumbnailTarget[] = tokens
            .map(token => ({ token, type: 'AvatarHeadShot', size: '150x150', format: 'Png', ...thumbnailFormat }))
        const thumbResults = await thumbnailsBatch(thumbTargets, thumbnailFormat)
        return new Map(thumbResults.map(t => [t.token, t.url]))
    }

    function toImgs(tokens: string[], thumbMap: Map<string | undefined, string | null>): string[] {
        return tokens.map(tok => thumbMap.get(tok)).filter((url): url is string => url != null)
    }

    async function fetchServers(opts: ServersOpts, client: ReturnType<typeof buildGamesServersApi>): Promise<RobloxServersResult<AnyServerEntry>> {
        const { placeId, count = 1, serverType = 'Public', cursor, thumbnailFormat } = opts

        if (serverType === 'Private') {
            const page = await fetchPages({
                client, count, cursor,
                path:   ['games', placeId, 'private-servers'],
                schema: RobloxPrivateServersPageRawSchema,
            })
            const thumbMap = await playerImgMap(page.data.flatMap(s => s.playerTokens ?? []), thumbnailFormat)
            return {
                ...page,
                data: page.data.map((s): RobloxPrivateServerEntry => ({
                    jobId:       s.id ?? null,
                    maxPlayers:  s.maxPlayers,
                    playing:     s.playing ?? 0,
                    fps:         s.fps,
                    ping:        s.ping,
                    playerImgs:  toImgs(s.playerTokens ?? [], thumbMap),
                    name:        s.name,
                    vipServerId: s.vipServerId,
                    accessCode:  s.accessCode ?? null,
                    owner:       s.owner
                        ? { id: s.owner.id, name: s.owner.name, displayName: s.owner.displayName, hasVerifiedBadge: s.owner.hasVerifiedBadge }
                        : null,
                })),
            }
        }

        const page = await fetchPages({
            client, count, cursor,
            path:   ['games', placeId, 'servers', serverType],
            schema: RobloxServersPageRawSchema,
        })
        const thumbMap = await playerImgMap(page.data.flatMap(s => s.playerTokens), thumbnailFormat)
        return {
            ...page,
            data: page.data.map((s): RobloxServerEntry => ({
                jobId:      s.id,
                maxPlayers: s.maxPlayers,
                playing:    s.playing,
                fps:        s.fps,
                ping:       s.ping,
                playerImgs: toImgs(s.playerTokens, thumbMap),
            })),
        }
    }

    /**
     * 서버 목록을 조회한다.
     *
     * - `Public`: 계정과 무관하므로 모든 호출이 캐시를 공유한다.
     * - `Friend`/`Private`: 요청 계정 기준 결과라 `opts.cookie`를 지정하면 계정별로
     *   분리된 캐시를 쓰고, 미지정이면 어느 계정 관점인지 특정할 수 없어 캐시하지 않는다.
     */
    function serversSimple(opts: PrivateServersOpts): Promise<RobloxServersResult<RobloxPrivateServerEntry>>
    function serversSimple(opts: PublicServersOpts): Promise<RobloxServersResult<RobloxServerEntry>>
    function serversSimple(opts: ServersOpts): Promise<RobloxServersResult<AnyServerEntry>>
    async function serversSimple(opts: ServersOpts): Promise<RobloxServersResult<AnyServerEntry>> {
        const { placeId, count = 1, serverType = 'Public', cursor, cookie } = opts
        const client = cookie ? buildGamesServersApi(cookie) : poolClient

        const accountScoped = serverType !== 'Public'
        if (accountScoped && !cookie) return fetchServers(opts, client)

        const accountKey = accountScoped ? await cookieHash(cookie as RobloxCookie) : 'shared'
        const cacheKey   = `${placeId}:${serverType}:${count}:${cursor ?? ''}:${accountKey}`

        const [result] = await withCache<RobloxServersResult<AnyServerEntry>>({
            type:         'serversSimple',
            ttlKey:       'serversSimple',
            keys:         [cacheKey],
            getKey:       () => cacheKey,
            fallback:     { previousPageCursor: null, nextPageCursor: null, data: [] },
            fetchMissing: async () => [await fetchServers(opts, client)],
        })

        return result
    }

    function servers(opts: PrivateServersOpts): Promise<RobloxServersResult<RobloxPrivateServerEntryWithLocation>>
    function servers(opts: PublicServersOpts): Promise<RobloxServersResult<RobloxServerEntryWithLocation>>
    function servers(opts: ServersOpts): Promise<RobloxServersResult<RobloxServerEntryWithLocation | RobloxPrivateServerEntryWithLocation>>
    async function servers(opts: ServersOpts): Promise<RobloxServersResult<RobloxServerEntryWithLocation | RobloxPrivateServerEntryWithLocation>> {
        const result = await serversSimple(opts)

        // 실행 중이 아닌 비공개 서버는 jobId가 없어 위치를 조회할 수 없다.
        const jobIds = result.data.map(s => s.jobId).filter((id): id is RobloxJobId => id != null)
        const locationList = await serversRegion({ placeId: opts.placeId, jobIds }).catch((): RobloxServerLocation[] => [])
        const locationMap  = new Map(locationList.map(l => [l.jobId, l]))

        return {
            ...result,
            data: result.data.map(s => ({
                ...s,
                location: s.jobId != null ? (locationMap.get(s.jobId) ?? null) : null,
            })) as Array<RobloxServerEntryWithLocation | RobloxPrivateServerEntryWithLocation>,
        }
    }

    return { serversSimple, servers }
}
