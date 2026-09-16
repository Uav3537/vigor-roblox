import { vigor } from 'vigor-fetch'
import { RobloxCookie } from '@/types/branded'
import { CsrfTokenManager } from './csrf'
import { makeHeaderMiddlewares } from './middlewares'

export function createNetworkClients(opts: {
    cookies:     RobloxCookie[]
    csrfManager: CsrfTokenManager
}) {
    const { cookies, csrfManager } = opts
    const cookiePool = cookies.map(cookie => ({ cookie, lastUsed: 0 }))

    function pickCookie(): RobloxCookie {
        const entry = cookiePool.reduce((a, b) => a.lastUsed < b.lastUsed ? a : b)
        entry.lastUsed = Date.now()
        return entry.cookie
    }

    const poolCookieMiddlewares        = makeHeaderMiddlewares({ getCookie: pickCookie, csrfManager })
    const poolCookieWinInetMiddlewares = makeHeaderMiddlewares({ getCookie: pickCookie, csrfManager, winInet: true })
    const poolCookieCsrfMiddlewares    = makeHeaderMiddlewares({ getCookie: pickCookie, csrfManager, winInet: true, csrf: true })

    const usersApi = vigor.fetch('https://users.roblox.com/v1')
        .middlewares(poolCookieWinInetMiddlewares)
        .retry(r => r
            .settings(s => s.maxAttempts(7))
            .algorithms(a => a.backoff({ initial: 200, unit: 800, multiplier: 1.7 }))
        )

    const thumbnailsApi = vigor.fetch('https://thumbnails.roblox.com/v1')
        .middlewares(poolCookieWinInetMiddlewares)
        .retry(r => r
            .settings(s => s.maxAttempts(5))
            .algorithms(a => a.backoff({ initial: 1000, multiplier: 2.5 }))
        )

    const gamesApi = vigor.fetch('https://games.roblox.com/v1')
        .middlewares(poolCookieMiddlewares)
        .retry(r => r
            .settings(s => s.maxAttempts(5))
            .algorithms(a => a.backoff({ initial: 1000, multiplier: 2.5 }))
        )

    /**
     * presenceApi 빌더. `cookie`를 지정하면 그 계정 쿠키를 고정으로 쓰고,
     * 미지정이면 기존과 동일하게 풀에서 라운드로빈으로 고른다.
     * presence는 요청 계정 ↔ 대상 유저 관계(친구 여부 등 프라이버시 설정)에
     * 따라 응답이 달라질 수 있어 계정을 고정할 수 있어야 한다.
     */
    function buildPresenceApi(cookie?: RobloxCookie) {
        const middlewares = cookie
            ? makeHeaderMiddlewares({ getCookie: () => cookie, csrfManager })
            : poolCookieMiddlewares

        return vigor.fetch('https://presence.roblox.com/v1')
            .middlewares(middlewares)
            .retry(r => r
                .settings(s => s.maxAttempts(5))
                .algorithms(a => a.backoff({ initial: 500, multiplier: 2 }))
            )
    }
    const presenceApi = buildPresenceApi()

    const apisRoblox = vigor.fetch('https://apis.roblox.com')
        .middlewares(poolCookieMiddlewares)
        .retry(r => r
            .settings(s => s.maxAttempts(5))
            .algorithms(a => a.backoff({ initial: 1000, multiplier: 2 }))
        )

    /**
     * gamejoinApi 빌더. presenceApi와 동일한 이유(계정별 고정 필요)로 존재한다.
     * gamejoin은 실험/계정 밴 등으로 같은 서버라도 계정에 따라 ip 대신 밴
     * 메시지가 올 수 있어 "같은 서버 = 같은 ip"라는 가정이 완전히 안전하진
     * 않다는 점을 호출부에서 감안해야 한다.
     */
    function buildGamejoinApi(cookie?: RobloxCookie) {
        const middlewares = cookie
            ? makeHeaderMiddlewares({ getCookie: () => cookie, csrfManager, winInet: true })
            : poolCookieWinInetMiddlewares

        return vigor.fetch('https://gamejoin.roblox.com/v1')
            .middlewares(middlewares)
            .retry(r => r
                .settings(s => s.maxAttempts(7))
                .algorithms(a => a.backoff({ initial: 500, multiplier: 1.5 }))
            )
    }
    const gamejoinApi = buildGamejoinApi()

    const ipgeolocationApi = vigor.fetch('https://api.ipgeolocation.io')
        .retry(r => r
            .settings(s => s.maxAttempts(4))
            .algorithms(a => a.backoff({ initial: 500, multiplier: 2 }))
        )

    const friendsApi = vigor.fetch('https://friends.roblox.com/v1')
        .middlewares(poolCookieCsrfMiddlewares)
        .retry(r => r
            .settings(s => s.maxAttempts(5))
            .algorithms(a => a.backoff({ initial: 500, multiplier: 2 }))
        )

    return {
        pickCookie,
        usersApi,
        thumbnailsApi,
        gamesApi,
        presenceApi,
        buildPresenceApi,
        apisRoblox,
        gamejoinApi,
        buildGamejoinApi,
        ipgeolocationApi,
        friendsApi,
    }
}