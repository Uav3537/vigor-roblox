import { CreateRobloxApiOptions } from '@/types/api'

import { CsrfTokenManager } from '@/lib/csrf'
import { createNetworkClients } from '@/lib/network'
import { createCacheHelpers } from '@/lib/cache'

import { createUsersApi } from '@/apis/users'
import { createUsersByNameApi } from '@/apis/usersByName'
import { createPresenceApi } from '@/apis/presence'
import { createThumbnailsApi } from '@/apis/thumbnails'
import { createGamejoinApi } from '@/apis/gamejoin'
import { createServersRegionApi } from '@/apis/serversRegion'
import { createServersApi } from '@/apis/servers'
import { createPlaceInfoApi } from '@/apis/placeInfo'
import { createWithImgApi } from '@/apis/withImg'
import { createTrackApi } from '@/apis/track'
import { createFriendsApi } from '@/apis/friends'

export * from '@/types/branded'
export * from '@/types/responses'
export * from '@/types/cache'
export * from '@/types/api'
export type { RobloxCredential, OAuthTokenRateLimit } from '@/lib/credentials'

export function createRobloxApi({
    cache,
    cookies: cookiesList,
    oauthTokens = [],
    oauthTokenRateLimit,
    ipgeolocationKey,
    ttl,
}: CreateRobloxApiOptions) {

    const csrfManager = new CsrfTokenManager()

    const {
        usersApi,
        usersPlainApi,
        thumbnailsApi,
        gamesApi,
        gamesServersApi,
        presenceApi,
        buildPresenceApi,
        apisRoblox,
        gamejoinApi,
        buildGamejoinApi,
        ipgeolocationApi,
        friendsApi,
    } = createNetworkClients({ cookies: cookiesList, oauthTokens, oauthTokenRateLimit, csrfManager })

    const { withCache, ttlSelect, ttlUpsert } = createCacheHelpers(cache, ttl)

    const { authenticated, usersSimple, users } = createUsersApi({ usersApi, usersPlainApi, csrfManager, withCache })
    const { usersByName } = createUsersByNameApi({ usersApi, withCache })
    const { presence } = createPresenceApi({ presenceApi, buildPresenceApi, ttlSelect, ttlUpsert })
    const { thumbnailAssets, thumbnailsBatch } = createThumbnailsApi({ thumbnailsApi, withCache })
    const { extractIps } = createGamejoinApi({ gamejoinApi, buildGamejoinApi, ttlSelect, ttlUpsert })
    const { serversRegion } = createServersRegionApi({ ipgeolocationApi, ipgeolocationKey, extractIps, ttlSelect, ttlUpsert })
    const { serversSimple, servers } = createServersApi({ gamesServersApi, withCache, thumbnailsBatch, serversRegion })
    const { placeInfo } = createPlaceInfoApi({ apisRoblox, gamesApi, withCache, thumbnailAssets })
    const { usersSimpleWithImg, usersWithImg, usersByNamesWithImg } = createWithImgApi({ usersSimple, users, usersByName, thumbnailsBatch })
    const { track } = createTrackApi({ usersByName, usersSimple, serversSimple, thumbnailsBatch, serversRegion })
    const { friends, sendFriendRequest, unfriend } = createFriendsApi({ friendsApi, withCache })

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
        gamejoin: extractIps,
        placeInfo,
        usersSimpleWithImg,
        usersWithImg,
        usersByNamesWithImg,
        track,
        serversRegion,
        friends,
        sendFriendRequest,
        unfriend,
    }
}

export type RobloxApi = ReturnType<typeof createRobloxApi>