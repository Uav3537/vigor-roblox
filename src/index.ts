import {
    CreateRobloxApiOptions,
    CreateRobloxApiNodeOptions,
    CreateRobloxApiBrowserOptions,
    ServersOpts,
} from '@/types/api'
import { RobloxUserId } from '@/types/branded'
import {
    RobloxAuthenticatedUser,
    RobloxPresenceEntry,
    RobloxPrivateServerEntry,
    RobloxServerEntry,
    RobloxServersResult,
} from '@/types/responses'

import { CsrfTokenManager } from '@/lib/csrf'
import { createNetworkClients } from '@/lib/network'
import { createCacheHelpers } from '@/lib/cache'
import { BROWSER_SESSION } from '@/lib/credentials'

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
import { createChatApi } from '@/apis/chat'

export * from '@/types/branded'
export * from '@/types/responses'
export * from '@/types/cache'
export * from '@/types/api'
export type { RobloxCredential, OAuthTokenRateLimit } from '@/lib/credentials'

function buildRobloxApi(opts: CreateRobloxApiOptions) {
    const browser = opts.type === 'browser'

    // browser 모드는 쿠키를 받지 않는다. 풀에는 전송되지 않는 자리표시 값 하나만 둔다.
    const cookiesList = opts.type === 'browser' ? [BROWSER_SESSION] : opts.cookies
    const oauthTokens = opts.type === 'browser' ? [] : (opts.oauthTokens ?? [])
    const oauthTokenRateLimit = opts.type === 'browser' ? undefined : opts.oauthTokenRateLimit
    // 위치 조회(gamejoin 의존)는 browser 모드에서 노출되지 않으므로 키도 없다.
    const ipgeolocationKey = opts.type === 'browser' ? '' : opts.ipgeolocationKey
    const { cache, ttl } = opts

    const csrfManager = new CsrfTokenManager(browser)

    const {
        usersApi,
        usersPlainApi,
        thumbnailsApi,
        gamesApi,
        buildGamesServersApi,
        presenceApi,
        buildPresenceApi,
        apisRoblox,
        gamejoinApi,
        buildGamejoinApi,
        ipgeolocationApi,
        friendsApi,
        buildChatApi,
    } = createNetworkClients({ cookies: cookiesList, oauthTokens, oauthTokenRateLimit, csrfManager, browser })

    const { withCache, ttlSelect, ttlUpsert } = createCacheHelpers(cache, ttl)

    const { authenticated, usersSimple, users } = createUsersApi({ usersApi, usersPlainApi, csrfManager, withCache, browser })
    const { usersByName } = createUsersByNameApi({ usersApi, withCache })
    const { presence } = createPresenceApi({ presenceApi, buildPresenceApi, ttlSelect, ttlUpsert })
    const { thumbnailAssets, thumbnailsBatch } = createThumbnailsApi({ thumbnailsApi, withCache })
    const { extractIps } = createGamejoinApi({ gamejoinApi, buildGamejoinApi, ttlSelect, ttlUpsert })
    const { serversRegion } = createServersRegionApi({ ipgeolocationApi, ipgeolocationKey, extractIps, ttlSelect, ttlUpsert })
    const { serversSimple, servers } = createServersApi({ buildGamesServersApi, withCache, thumbnailsBatch, serversRegion })
    const { placeInfo } = createPlaceInfoApi({ apisRoblox, gamesApi, withCache, thumbnailAssets })
    const { usersSimpleWithImg, usersWithImg, usersByNamesWithImg } = createWithImgApi({ usersSimple, users, usersByName, thumbnailsBatch })
    const { track } = createTrackApi({ usersByName, usersSimple, serversSimple, thumbnailsBatch, serversRegion })
    const { friends, sendFriendRequest, unfriend } = createFriendsApi({ friendsApi, withCache })
    const { chatConversations, chatMessages, sendChatMessages, sendChatMessage, chatMetadata } = createChatApi({ buildChatApi })

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
        chatConversations,
        chatMessages,
        sendChatMessages,
        sendChatMessage,
        chatMetadata,
    }
}

export type RobloxApi = ReturnType<typeof buildRobloxApi>

type WithoutCookie<F> = F extends (opts: infer A) => infer R ? (opts: Omit<A, 'cookie'>) => R : never

type BrowserServersOpts        = Omit<ServersOpts, 'cookie'>
type BrowserPrivateServersOpts = BrowserServersOpts & { serverType: 'Private' }
type BrowserPublicServersOpts  = BrowserServersOpts & { serverType?: 'Public' | 'Friend' }

/** 계정이 정해져 있는(= 브라우저에 로그인된 계정) API. 어떤 메서드도 쿠키를 받지 않는다. */
type RobloxBrowserAccountApi = {
    /** 브라우저에 로그인된 계정. 로그인돼 있지 않으면 reject된다. */
    authenticated(): Promise<RobloxAuthenticatedUser>
    presence(userIds: RobloxUserId[]): Promise<RobloxPresenceEntry[]>

    serversSimple(opts: BrowserPrivateServersOpts): Promise<RobloxServersResult<RobloxPrivateServerEntry>>
    serversSimple(opts: BrowserPublicServersOpts): Promise<RobloxServersResult<RobloxServerEntry>>
    serversSimple(opts: BrowserServersOpts): Promise<RobloxServersResult<RobloxServerEntry | RobloxPrivateServerEntry>>

    chatConversations: WithoutCookie<RobloxApi['chatConversations']>
    chatMessages:      WithoutCookie<RobloxApi['chatMessages']>
    sendChatMessages:  WithoutCookie<RobloxApi['sendChatMessages']>
    sendChatMessage:   WithoutCookie<RobloxApi['sendChatMessage']>
    chatMetadata:      WithoutCookie<RobloxApi['chatMetadata']>
}

/**
 * gamejoin은 Roblox 클라이언트 User-Agent가 있어야 응답하는데 브라우저는 그걸 붙일 수 없다.
 * 그래서 gamejoin과 거기에 의존하는(= 서버 위치를 조회하는) 메서드는 browser 모드에 없다.
 */
type GamejoinDependent = 'gamejoin' | 'serversRegion' | 'servers' | 'track'

export type RobloxBrowserApi =
    Omit<RobloxApi, keyof RobloxBrowserAccountApi | GamejoinDependent>
    & RobloxBrowserAccountApi

/** 쿠키를 받던 자리를 전부 브라우저 세션으로 고정하고, gamejoin 의존 메서드를 뺀다. */
function toBrowserApi({ gamejoin, serversRegion, servers, track, ...api }: RobloxApi): RobloxBrowserApi {
    const cookie = BROWSER_SESSION

    const account: RobloxBrowserAccountApi = {
        authenticated: async () => (await api.authenticated([cookie]))[0],
        presence:      userIds => api.presence(userIds, { cookie }),

        serversSimple: ((opts: BrowserServersOpts) => api.serversSimple({ ...opts, cookie })) as RobloxBrowserAccountApi['serversSimple'],

        chatConversations: opts => api.chatConversations({ ...opts, cookie }),
        chatMessages:      opts => api.chatMessages({ ...opts, cookie }),
        sendChatMessages:  opts => api.sendChatMessages({ ...opts, cookie }),
        sendChatMessage:   opts => api.sendChatMessage({ ...opts, cookie }),
        chatMetadata:      opts => api.chatMetadata({ ...opts, cookie }),
    }

    return { ...api, ...account }
}

/**
 * `type`을 생략하거나 `'node'`로 주면 쿠키/OAuth 토큰으로 인증하는 서버용 API를,
 * `'browser'`로 주면 브라우저에 로그인된 세션을 쓰는 API(쿠키를 받지 않음)를 만든다.
 */
export function createRobloxApi(opts: CreateRobloxApiBrowserOptions): RobloxBrowserApi
export function createRobloxApi(opts: CreateRobloxApiNodeOptions): RobloxApi
export function createRobloxApi(opts: CreateRobloxApiOptions): RobloxApi | RobloxBrowserApi
export function createRobloxApi(opts: CreateRobloxApiOptions): RobloxApi | RobloxBrowserApi {
    const api = buildRobloxApi(opts)
    return opts.type === 'browser' ? toBrowserApi(api) : api
}
