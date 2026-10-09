import {
    RobloxCookie,
    RobloxPlaceId,
} from './branded'
import { RobloxThumbnailTarget } from './responses'
import { RobloxApiCache, RobloxTtlConfig } from './cache'
import { OAuthTokenRateLimit } from '@/lib/credentials'

interface CreateRobloxApiCommonOptions {
    cache:            RobloxApiCache
    /** Per-resource cache TTL overrides. See RobloxTtlConfig for defaults / disabling. */
    ttl?:             RobloxTtlConfig
}

/** 서버(Node)에서 쓰는 기본 모드. `.ROBLOSECURITY` 쿠키/OAuth 토큰을 직접 헤더에 붙인다. */
export interface CreateRobloxApiNodeOptions extends CreateRobloxApiCommonOptions {
    type?:            'node'
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
}

/**
 * 브라우저 모드. 쿠키를 받지 않고, 브라우저에 로그인된 Roblox 세션(쿠키 저장소)을
 * `credentials: "include"`로 그대로 쓴다. roblox.com 페이지(또는 그 권한을 가진 확장)에서만 동작한다.
 *
 * 계정별 캐시 키가 계정과 무관한 고정 값이 되므로, `cache`는 계정이 바뀌어도 남는
 * 저장소가 아니라 페이지 수명 동안만 사는 것(예: 메모리 Map)이어야 한다.
 */
export interface CreateRobloxApiBrowserOptions extends CreateRobloxApiCommonOptions {
    type: 'browser'
}

export type CreateRobloxApiOptions = CreateRobloxApiNodeOptions | CreateRobloxApiBrowserOptions

/**
 * - `Public`: 공개 서버
 * - `Friend`: 요청 계정의 친구가 있는 서버
 * - `Private`: 요청 계정이 접근할 수 있는 비공개(VIP) 서버
 */
export type RobloxServerType = 'Public' | 'Friend' | 'Private'

export interface ServersOpts {
    placeId:          RobloxPlaceId
    count?:           number
    serverType?:      RobloxServerType
    /**
     * 이 계정 쿠키로 조회한다. `Friend`/`Private`은 계정에 따라 결과가 달라지므로
     * 원하는 계정(예: 대상 유저의 친구 계정)의 쿠키를 지정해야 한다.
     * 미지정이면 풀에서 임의의 쿠키를 쓴다.
     */
    cookie?:          RobloxCookie
    cursor?:          string
    thumbnailFormat?: Partial<RobloxThumbnailTarget>
}

export type WithImg<T> = T & { img: string | null }
