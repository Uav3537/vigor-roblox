import { RobloxPlaceId, RobloxJobId, RobloxCookie } from '@/types/branded'
import { GamejoinResponse, GamejoinResponseSchema } from '@/types/responses'

import { createNetworkClients } from '@/lib/network'
import { createCacheHelpers } from '@/lib/cache'
import { validate } from '@/lib/middlewares'
import { cookieHash } from '@/lib/tools'

export type GamejoinApiDeps = {
    gamejoinApi:      ReturnType<typeof createNetworkClients>['gamejoinApi']
    buildGamejoinApi: ReturnType<typeof createNetworkClients>['buildGamejoinApi']
    ttlSelect:        ReturnType<typeof createCacheHelpers>['ttlSelect']
    ttlUpsert:        ReturnType<typeof createCacheHelpers>['ttlUpsert']
}

type GamejoinIpResult = {
    publicIp:       string | null
    machineAddress: string | null
}

export function createGamejoinApi({ gamejoinApi, buildGamejoinApi, ttlSelect, ttlUpsert }: GamejoinApiDeps) {

    async function fetchIpsRaw(
        placeId: RobloxPlaceId,
        jobId:   RobloxJobId,
        client:  ReturnType<typeof buildGamejoinApi>
    ): Promise<GamejoinIpResult> {
        try {
            const res = await client
                .path('join-game-instance')
                .body("overwrite", { placeId, gameId: jobId })
                .middlewares(validate(GamejoinResponseSchema))
                .request<GamejoinResponse>()
            return {
                publicIp:       res?.joinScript?.UdmuxEndpoints?.[0]?.Address ?? null,
                machineAddress: res?.joinScript?.MachineAddress ?? null,
            }
        } catch {
            return { publicIp: null, machineAddress: null }
        }
    }

    /**
     * join-game-instance authTicket을 요청해 서버의 publicIp/machineAddress를 뽑아낸다.
     *
     * "같은 서버(jobId)는 어느 계정으로 조회하든 ip가 같다"는 가정은 완전히
     * 안전하지 않다 — experience 내부 또는 로블록스 계정 자체가 밴당한 상태라면
     * ip 대신 밴 메시지가 온다. 그래서:
     *
     * - `opts.cookie` 지정: 그 계정 전용 캐시 (`{placeId}:{jobId}:{cookieHash}`)
     * - 미지정: `{placeId}:{jobId}:shared` 하나로 풀 전체가 캐시를 공유
     *   (rate limit이 특히 심한 API라 히트율을 최대한 유지하기 위함)
     *
     * 밴 등으로 ip를 못 받은 경우(`publicIp === null`)는 캐시에 쓰지 않는다 —
     * 그 결과가 캐시되면 이후 정상 계정으로도 계속 실패한 것처럼 보일 수 있다.
     */
    async function extractIps(
        placeId: RobloxPlaceId,
        jobId:   RobloxJobId,
        opts?:   { cookie?: RobloxCookie }
    ): Promise<GamejoinIpResult> {
        const accountKey = opts?.cookie ? cookieHash(opts.cookie) : 'shared'
        const client      = opts?.cookie ? buildGamejoinApi(opts.cookie) : gamejoinApi
        const cacheKey    = `${placeId}:${jobId}:${accountKey}`

        const [hit] = await ttlSelect<GamejoinIpResult>('gamejoin', 'gamejoin', [cacheKey])
        if (hit) return hit.data

        const result = await fetchIpsRaw(placeId, jobId, client)
        if (result.publicIp) {
            await ttlUpsert<GamejoinIpResult>('gamejoin', 'gamejoin', [{ separator: cacheKey, data: result }])
        }
        return result
    }

    return { extractIps }
}