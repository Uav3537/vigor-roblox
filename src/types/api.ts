import {
    RobloxCookie,
    RobloxPlaceId,
} from './branded'
import { RobloxThumbnailTarget } from './responses'
import { RobloxApiCache, RobloxTtlConfig } from './cache'
import { OAuthTokenRateLimit } from '@/lib/credentials'

export interface CreateRobloxApiOptions {
    cache:            RobloxApiCache
    /**
     * .ROBLOSECURITY 쿠키 목록. 복사하지 않고 참조로 쓰므로 외부에서 push/splice 하면 바로 반영된다.
     * games(서버 목록 제외)/users/presence에서는 쓸 수 있는 OAuth 토큰이 없을 때만 쓰인다. 서버 목록은 항상 쿠키를 쓴다.
     */
    cookies:          RobloxCookie[]
    /**
     * OAuth 2.0 access token 목록 (games(서버 목록 제외)/users/presence에 우선 사용). 참조로 쓰므로 만료/갱신 시
     * 외부에서 배열을 직접 수정하면 된다.
     */
    oauthTokens?:     string[]
    /** games/users/presence에서 OAuth 토큰 하나당 허용 사용량. 넘으면 쿠키로 넘어간다. 기본 1분에 4회. */
    oauthTokenRateLimit?: OAuthTokenRateLimit
    ipgeolocationKey: string
    /** Per-resource cache TTL overrides. See RobloxTtlConfig for defaults / disabling. */
    ttl?:             RobloxTtlConfig
}

export interface ServersOpts {
    placeId:          RobloxPlaceId
    count?:           number
    serverType?:      'Public' | 'Friend'
    cursor?:          string
    thumbnailFormat?: Partial<RobloxThumbnailTarget>
}

export type WithImg<T> = T & { img: string | null }
