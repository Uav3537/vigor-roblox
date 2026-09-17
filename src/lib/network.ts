import { vigor } from 'vigor-fetch'
import { RobloxCookie } from '@/types/branded'
import { CsrfTokenManager } from './csrf'
import { makeCredentialMiddlewares, makeHeaderMiddlewares } from './middlewares'
import { OAuthTokenRateLimit, createCookieRotator, createCredentialPool } from './credentials'

/**
 * OAuth 토큰 → 쿠키 순으로 인증하는 클라이언트 공통 설정.
 * 429는 같은 인증으로 재시도해도 소용없으므로 retry 대상에서 빼고, 미들웨어가 다른 인증 수단으로 재시작한다.
 */
const CREDENTIAL_MAX_RESTARTS = 10

export function createNetworkClients(opts: {
    /** 참조로 사용된다. 외부에서 push/splice 하면 바로 반영된다. */
    cookies:          RobloxCookie[]
    /** 참조로 사용된다. 외부에서 push/splice 하면 바로 반영된다. */
    oauthTokens:      string[]
    oauthTokenRateLimit?: OAuthTokenRateLimit
    csrfManager:      CsrfTokenManager
}) {
    const { cookies, oauthTokens, oauthTokenRateLimit, csrfManager } = opts

    const pickCookie = createCookieRotator(cookies)

    /** rate limit은 엔드포인트 단위라 클라이언트마다 별도의 풀(쿨다운/쿠키 사용 횟수)을 쓴다. */
    function credentialMiddlewares({ winInet = false, allowOAuth = true }: { winInet?: boolean, allowOAuth?: boolean } = {}) {
        const pool = createCredentialPool({ cookies, oauthTokens, tokenLimit: oauthTokenRateLimit })
        return makeCredentialMiddlewares({ pool, allowOAuth, winInet })
    }

    const poolCookieMiddlewares        = makeHeaderMiddlewares({ getCookie: pickCookie, csrfManager })
    const poolCookieWinInetMiddlewares = makeHeaderMiddlewares({ getCookie: pickCookie, csrfManager, winInet: true })
    const poolCookieCsrfMiddlewares    = makeHeaderMiddlewares({ getCookie: pickCookie, csrfManager, winInet: true, csrf: true })

    /** 인증 미들웨어가 없는 users 클라이언트. 호출부에서 특정 쿠키를 붙일 때(authenticated) 쓴다. */
    const usersPlainApi = vigor.fetch('https://users.roblox.com/v1')
        .retry(r => r
            .settings(s => s.maxAttempts(7))
            .algorithms(a => a.backoff({ initial: 200, unit: 800, multiplier: 1.7 }))
        )

    const usersApi = vigor.fetch('https://users.roblox.com/v1')
        .middlewares(credentialMiddlewares({ winInet: true }))
        .settings(s => s.unretryStatus(429).maxRestarts(CREDENTIAL_MAX_RESTARTS))
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
        .middlewares(credentialMiddlewares())
        .settings(s => s.unretryStatus(429).maxRestarts(CREDENTIAL_MAX_RESTARTS))
        .retry(r => r
            .settings(s => s.maxAttempts(5))
            .algorithms(a => a.backoff({ initial: 1000, multiplier: 2.5 }))
        )

    /**
     * 서버 목록 전용 games 클라이언트 (쿠키만 사용).
     * OAuth 토큰으로 요청하면 응답의 playerTokens가 비어서 플레이어 프로필 이미지를 만들 수 없다.
     * 쿠키 로테이션 + 429 쿨다운은 동일하게 적용된다.
     */
    const gamesServersApi = vigor.fetch('https://games.roblox.com/v1')
        .middlewares(credentialMiddlewares({ allowOAuth: false }))
        .settings(s => s.unretryStatus(429).maxRestarts(CREDENTIAL_MAX_RESTARTS))
        .retry(r => r
            .settings(s => s.maxAttempts(5))
            .algorithms(a => a.backoff({ initial: 1000, multiplier: 2.5 }))
        )

    /**
     * presenceApi 빌더. `cookie`를 지정하면 그 계정 쿠키를 고정으로 쓰고,
     * 미지정이면 OAuth 토큰(1분 제한) → 쿠키 순으로 풀에서 고른다.
     * presence는 요청 계정 ↔ 대상 유저 관계(친구 여부 등 프라이버시 설정)에
     * 따라 응답이 달라질 수 있어 계정을 고정할 수 있어야 한다.
     */
    const presenceCredentialMiddlewares = credentialMiddlewares()
    function buildPresenceApi(cookie?: RobloxCookie) {
        const middlewares = cookie
            ? makeHeaderMiddlewares({ getCookie: () => cookie, csrfManager })
            : presenceCredentialMiddlewares

        return vigor.fetch('https://presence.roblox.com/v1')
            .middlewares(middlewares)
            .settings(s => s.unretryStatus(429).maxRestarts(CREDENTIAL_MAX_RESTARTS))
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
    }
}