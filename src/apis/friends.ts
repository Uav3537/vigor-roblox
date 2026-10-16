import { z } from 'zod'

import { RobloxUserId } from '@/types/branded'
import { RobloxFriendEntry, RobloxFriendEntrySchema } from '@/types/responses'

import { createNetworkClients } from '@/lib/network'
import { createCacheHelpers } from '@/lib/cache'
import { pickKeyValidated } from '@/lib/middlewares'
import { friendsApiRateLimiter } from '@/lib/rate-limiter'

export type FriendsApiDeps = {
    friendsApi: ReturnType<typeof createNetworkClients>['friendsApi']
    withCache:  ReturnType<typeof createCacheHelpers>['withCache']
}

/**
 * friends 목록에는 실제 유저가 아닌 자리표시 항목이 섞여 온다
 * (`{ id: -1, name: "", displayName: "" }` — 숨겨진 친구로 보임). id가 양수가 아니므로
 * 스키마 검증 전에 걸러내지 않으면 목록 전체가 ZodError로 실패한다.
 */
const FriendListSchema = z.preprocess(
    (list) => Array.isArray(list)
        ? list.filter((entry) => typeof entry?.id === 'number' && entry.id > 0)
        : list,
    z.array(RobloxFriendEntrySchema),
)

export function createFriendsApi({ friendsApi, withCache }: FriendsApiDeps) {

    async function friends(userId: RobloxUserId): Promise<RobloxFriendEntry[]> {
        const [result] = await withCache<RobloxFriendEntry[]>({
            type:     'friends',
            ttlKey:   'friends',
            keys:     [String(userId)],
            getKey:   () => String(userId),
            fallback: [] as RobloxFriendEntry[],
            fetchMissing: async () => {
                const list = await friendsApiRateLimiter(() =>
                    friendsApi
                        .path('users', userId, 'friends')
                        .middlewares(pickKeyValidated('data', FriendListSchema))
                        .request<RobloxFriendEntry[]>()
                )
                return [list]
            },
        })
        return result
    }

    async function sendFriendRequest(targetUserId: RobloxUserId): Promise<void> {
        await friendsApiRateLimiter(() =>
            friendsApi
                .path('users', targetUserId, 'request-friendship')
                .body("overwrite", {})
                .request<unknown>()
        )
    }

    async function unfriend(targetUserId: RobloxUserId): Promise<void> {
        await friendsApiRateLimiter(() =>
            friendsApi
                .path('users', targetUserId, 'unfriend')
                .body("overwrite", {})
                .request<unknown>()
        )
    }

    return { friends, sendFriendRequest, unfriend }
}
