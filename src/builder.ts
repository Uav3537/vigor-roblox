import { RobloxClient } from "./client"
import type { RobloxCacheStore } from "./core/cache"
import { mergeTtl, type RobloxConfig, type RobloxRetryOptions, type RobloxTtl } from "./core/config"
import { RobloxMemoryCookies, type RobloxCookie, type RobloxCookieRejectedHandler, type RobloxCookieStore } from "./core/cookies"
import { RobloxRateLimiter, type RobloxRateLimitStore } from "./core/ratelimit"

/**
 * 단계별 불변 빌더.
 *
 *   vigorRoblox.mode() ─┬─▶ RobloxExtensionStage ───────────┐
 *                       └─▶ RobloxNodeStage (인증)           │
 *                                 └──────────▶ RobloxOptionsStage ── cache(store) ─▶ RobloxCacheStage (ttl)
 *
 * 모든 단계는 RobloxClient를 상속하므로 어디서든 `.users` 등을 바로 쓸 수 있다.
 * 바뀌는 상태(쿠키 풀, 레이트리밋)는 사용자가 저장소를 넣어 밖에 둘 수 있다.
 */

/** `retry`/`cache`는 단계 1 이후 어디서든 쓸 수 있다. */
abstract class RobloxConfigurableStage extends RobloxClient {
    /** 모든 서비스 요청의 재시도 설정 */
    retry(options: RobloxRetryOptions): RobloxOptionsStage {
        return new RobloxOptionsStage({ ...this.config, retry: { ...this.config.retry, ...options } })
    }

    /** 서버 위치 조회에 쓸 [ipgeolocation.io](https://ipgeolocation.io) API 키 */
    geolocation(key: string): RobloxOptionsStage {
        return new RobloxOptionsStage({ ...this.config, geolocationKey: key })
    }

    /** 레이트리밋 상태를 밖과 동기화할 저장소. 새로고침·재시작 뒤에도, 같은 IP를 쓰는 다른 탭/인스턴스와도 한도를 이어받는다. */
    rateLimits(store: RobloxRateLimitStore): RobloxOptionsStage {
        return new RobloxOptionsStage({ ...this.config, rateLimits: new RobloxRateLimiter(store) })
    }

    /** 캐시 저장소. `ttl()`은 이걸 지정한 다음에만 쓸 수 있다. */
    cache(store: RobloxCacheStore): RobloxCacheStage {
        return new RobloxCacheStage({ ...this.config, cache: store })
    }
}

export class VigorRoblox {
    mode(mode: "extension"): RobloxExtensionStage
    mode(mode: "node"): RobloxNodeStage
    mode(mode: "extension" | "node"): RobloxExtensionStage | RobloxNodeStage {
        const config: RobloxConfig = {
            mode,
            cookies:     null,
            onCookieRejected: null,
            rejecting:   new Map(),
            fixedCookie: null,
            retry:       {},
            cache:       null,
            ttl:         {},
            csrf:        new Map(),
            rateLimits:  new RobloxRateLimiter(),
            geolocationKey: null,
        }
        return mode === "extension" ? new RobloxExtensionStage(config) : new RobloxNodeStage(config)
    }
}

/**
 * 확장 프로그램(또는 roblox.com 위의 스크립트)용. 브라우저의 쿠키 저장소로 인증한다 (`credentials: "include"`).
 * fetch로 붙일 수 없는 User-Agent(gamejoin용)는 `robloxDnrRules()`의 declarativeNetRequest 규칙에 맡긴다. 쿠키는 건드리지 않는다.
 */
export class RobloxExtensionStage extends RobloxConfigurableStage {}

export class RobloxNodeStage extends RobloxConfigurableStage {
    /**
     * 요청마다 하나씩 쓸 쿠키 풀. 배열은 프로세스 메모리의 라운드 로빈 풀(`RobloxMemoryCookies`)로 감싼다.
     * 서버리스처럼 프로세스가 자주 새로 뜨는 곳에서는 외부 저장소로 만든 `RobloxCookieStore`를 넣는다.
     * 실행 중에 쿠키를 바꾸려면 `RobloxMemoryCookies`를 직접 만들어 넣고 그걸 고친다.
     */
    cookies(cookies: readonly RobloxCookie[] | RobloxCookieStore): RobloxNodeStage {
        const store = Array.isArray(cookies) ? new RobloxMemoryCookies(cookies as readonly RobloxCookie[]) : cookies as RobloxCookieStore
        return new RobloxNodeStage({ ...this.config, cookies: store })
    }

    /**
     * Roblox가 쿠키를 거부했을 때(401, 403 "User is moderated") 할 일. 이유(`RobloxCookieRejectReason`)는 두 번째 인자로 온다.
     * 지정하면 기본 처리(풀에서 빼기, `store.remove`)는 하지 않는다 — 원본 DB에서 지우거나, 정지가 풀릴 때까지 빼 두거나,
     * 기록만 하고 남겨 두는 것은 여기서 정한다. `.as(cookie)`의 쿠키도 같은 콜백을 탄다.
     * 풀에서 돌려 쓰는 요청은 처리가 끝난 뒤 다른 쿠키로 다시 보낸다.
     */
    onCookieRejected(handler: RobloxCookieRejectedHandler): RobloxNodeStage {
        return new RobloxNodeStage({ ...this.config, onCookieRejected: handler })
    }
}

export class RobloxOptionsStage extends RobloxConfigurableStage {}

export class RobloxCacheStage extends RobloxClient {
    /** 서비스 → 메서드 → TTL(ms). 적지 않은 메서드는 기본값(`RobloxDefaultTtl`)을 쓴다. 0이어도 저장소의 get/set은 불린다 (0의 처리는 저장소가 정한다). */
    ttl(ttl: RobloxTtl): RobloxCacheStage {
        return new RobloxCacheStage({ ...this.config, ttl: mergeTtl(this.config.ttl, ttl) })
    }

    retry(options: RobloxRetryOptions): RobloxCacheStage {
        return new RobloxCacheStage({ ...this.config, retry: { ...this.config.retry, ...options } })
    }

    geolocation(key: string): RobloxCacheStage {
        return new RobloxCacheStage({ ...this.config, geolocationKey: key })
    }

    rateLimits(store: RobloxRateLimitStore): RobloxCacheStage {
        return new RobloxCacheStage({ ...this.config, rateLimits: new RobloxRateLimiter(store) })
    }
}

export const vigorRoblox = new VigorRoblox()
