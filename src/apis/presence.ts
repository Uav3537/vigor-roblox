import { z } from 'zod'
import { vigor } from 'vigor-fetch'

import { RobloxUserId, RobloxCookie } from '@/types/branded'
import { RobloxPresenceEntry, RobloxPresenceEntrySchema } from '@/types/responses'

import { createNetworkClients } from '@/lib/network'
import { createCacheHelpers } from '@/lib/cache'
import { pickKeyValidated } from '@/lib/middlewares'
import { chunk, cookieHash } from '@/lib/tools'

export type PresenceApiDeps = {
    presenceApi:      ReturnType<typeof createNetworkClients>['presenceApi']
    buildPresenceApi: ReturnType<typeof createNetworkClients>['buildPresenceApi']
    ttlSelect:        ReturnType<typeof createCacheHelpers>['ttlSelect']
    ttlUpsert:        ReturnType<typeof createCacheHelpers>['ttlUpsert']
}

export function createPresenceApi({ presenceApi, buildPresenceApi, ttlSelect, ttlUpsert }: PresenceApiDeps) {

    async function fetchPresenceRaw(
        userIds: RobloxUserId[],
        client:  ReturnType<typeof buildPresenceApi>
    ): Promise<RobloxPresenceEntry[]> {
        const grouped = await vigor.all(
            ...chunk(userIds, 50).map(group => () =>
                client
                    .path('presence', 'users')
                    .body("overwrite", { userIds: group })
                    .middlewares(pickKeyValidated('userPresences', z.array(RobloxPresenceEntrySchema)))
                    .request<RobloxPresenceEntry[]>()
            )
        ).request<RobloxPresenceEntry[][]>()
        return grouped.flat()
    }

    /**
     * 유저들의 presence(접속 상태)를 조회한다.
     *
     * presence는 요청 계정과 대상 유저의 친구 관계 등 프라이버시 설정에 따라
     * 결과가 달라질 수 있다.
     *
     * - `opts.cookie` 지정: 그 계정 기준으로 조회하고, 계정별로 분리된 캐시를
     *   사용한다 (`{cookieHash}:{userId}` 키).
     * - 미지정: 풀에서 임의의 계정으로 조회한다. 어느 계정 관점인지 특정할 수
     *   없는 결과라 캐시하지 않고 매번 새로 fetch한다.
     */
    async function presence(
        userIds: RobloxUserId[],
        opts?:   { cookie?: RobloxCookie }
    ): Promise<RobloxPresenceEntry[]> {
        if (userIds.length === 0) return []

        if (!opts?.cookie) {
            return fetchPresenceRaw(userIds, presenceApi)
        }

        const accountKey = await cookieHash(opts.cookie)
        const client      = buildPresenceApi(opts.cookie)
        const cacheKeys   = userIds.map(id => `${accountKey}:${id}`)

        const cached  = await ttlSelect<RobloxPresenceEntry>('presence', 'presence', cacheKeys)
        const hitMap  = new Map(cached.map(({ separator, data }) => [separator, data]))
        const missIds = userIds.filter(id => !hitMap.has(`${accountKey}:${id}`))

        if (missIds.length > 0) {
            const fetched = await fetchPresenceRaw(missIds, client)
            await ttlUpsert<RobloxPresenceEntry>(
                'presence', 'presence',
                fetched.map(entry => ({ separator: `${accountKey}:${entry.userId}`, data: entry }))
            )
            fetched.forEach(entry => hitMap.set(`${accountKey}:${entry.userId}`, entry))
        }

        return userIds.flatMap(id => {
            const entry = hitMap.get(`${accountKey}:${id}`)
            return entry ? [entry] : []
        })
    }

    return { presence }
}