import { RobloxClient, type RobloxExtensionServices, type RobloxModeStage, type RobloxNodeServices } from "./client"
import type { RobloxCacheStore } from "./core/cache"
import { mergeTtl, type RobloxConfig, type RobloxMode, type RobloxRetryOptions, type RobloxTtl } from "./core/config"
import { RobloxMemoryCookies, type RobloxCookie, type RobloxCookieRejectedHandler, type RobloxCookieStore } from "./core/cookies"
import { RobloxRateLimiter, type RobloxRateLimitStore } from "./core/ratelimit"
import { isRobloxError } from "./core/error"
import { isVigorFetchError } from "vigor-fetch"
import type { RobloxGeolocator } from "./types/games"

/**
 * 단계별 불변 빌더.
 *
 *   vigorRoblox.mode() ─┬─▶ RobloxExtensionStage ───────────┐
 *                       └─▶ RobloxNodeStage (인증)           │
 *                                 └──────────▶ RobloxOptionsStage ── cache(store) ─▶ RobloxCacheStage (ttl)
 *
 * 모든 단계는 RobloxClient를 상속하므로 어디서든 `.users` 등을 바로 쓸 수 있다.
 * 바뀌는 상태(쿠키 풀, 레이트리밋)는 사용자가 저장소를 넣어 밖에 둘 수 있다.
 * `L`은 `.geolocation(fn)` 콜백이 돌려주는 위치 타입이고, 이후 단계로 그대로 넘어간다.
 * `M`은 모드다. 확장 모드에서 이어진 단계에는 `auth`, node 모드에서 이어진 단계에는 `as`가 타입에 붙는다 (RobloxModeStage).
 */

/** `retry`/`cache`는 단계 1 이후 어디서든 쓸 수 있다. */
abstract class RobloxConfigurableStage<L = unknown, M extends RobloxMode = RobloxMode> extends RobloxClient<L> {
    /** 모든 서비스 요청의 재시도 설정 */
    retry(options: RobloxRetryOptions): RobloxModeStage<RobloxOptionsStage<L, M>, M, L> {
        return new RobloxOptionsStage<L, M>({ ...this.config, retry: { ...this.config.retry, ...options } }) as RobloxModeStage<RobloxOptionsStage<L, M>, M, L>
    }

    /**
     * 서버 위치 조회에 쓸 IP → 위치 콜백. 어느 서비스(ipgeolocation.io, ip-api.com, MaxMind 로컬 DB …)를 쓸지는 사용자가 정한다.
     * 라이브러리는 돌려준 값을 해석하지 않는다 — 어떤 모양이든 되고, 결과에는 그 값과 타입이 그대로 들어간다.
     */
    geolocation<G>(geolocate: RobloxGeolocator<G>): RobloxModeStage<RobloxOptionsStage<G, M>, M, G> {
        return new RobloxOptionsStage<G, M>({ ...this.config, geolocate }) as RobloxModeStage<RobloxOptionsStage<G, M>, M, G>
    }

    /** 레이트리밋 상태를 밖과 동기화할 저장소. 새로고침·재시작 뒤에도, 같은 IP를 쓰는 다른 탭/인스턴스와도 한도를 이어받는다. */
    rateLimits(store: RobloxRateLimitStore): RobloxModeStage<RobloxOptionsStage<L, M>, M, L> {
        return new RobloxOptionsStage<L, M>({ ...this.config, rateLimits: new RobloxRateLimiter(store) }) as RobloxModeStage<RobloxOptionsStage<L, M>, M, L>
    }

    /** 캐시 저장소. `ttl()`은 이걸 지정한 다음에만 쓸 수 있다. */
    cache(store: RobloxCacheStore): RobloxModeStage<RobloxCacheStage<L, M>, M, L> {
        return new RobloxCacheStage<L, M>({ ...this.config, cache: store }) as RobloxModeStage<RobloxCacheStage<L, M>, M, L>
    }
}

export class VigorRoblox {
    /**
     * 에러 type guard. `roblox`는 이 라이브러리가 던지는 `RobloxError`, `fetch`는 vigor-fetch의 에러다.
     * 세 번째 인자로 콜백을 넣으면 감싼 에러 안쪽까지 찾아 그 에러를 넘긴다.
     */
    readonly guards = {
        roblox: isRobloxError,
        fetch:  isVigorFetchError,
    } as const

    mode(mode: "extension"): RobloxExtensionStage
    mode(mode: "node"): RobloxNodeStage
    mode(mode: "extension" | "node"): RobloxExtensionStage | RobloxNodeStage {
        const config: RobloxConfig = {
            mode,
            cookies:     null,
            onCookieRejected: null,
            rejecting:   new Map(),
            inflight:    new Map(),
            fixedCookie: null,
            retry:       {},
            cache:       null,
            ttl:         {},
            csrf:        new Map(),
            rateLimits:  new RobloxRateLimiter(),
            geolocate:   null,
        }
        return mode === "extension" ? new RobloxExtensionStage(config) : new RobloxNodeStage(config)
    }
}

/**
 * 확장 프로그램(또는 roblox.com 위의 스크립트)용. 브라우저의 쿠키 저장소로 인증한다 (`credentials: "include"`).
 * fetch로 붙일 수 없는 User-Agent(gamejoin용)는 `robloxDnrRules()`의 declarativeNetRequest 규칙에 맡긴다. 쿠키는 건드리지 않는다.
 */
export class RobloxExtensionStage<L = unknown> extends RobloxConfigurableStage<L, "extension"> {}
// 클래스와 같은 이름의 interface로 확장 전용 서비스를 타입에 합친다 (런타임 getter는 client.ts).
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RobloxExtensionStage<L = unknown> extends RobloxExtensionServices {}

export class RobloxNodeStage<L = unknown> extends RobloxConfigurableStage<L, "node"> {
    /**
     * 요청마다 하나씩 쓸 쿠키 풀. 배열은 프로세스 메모리의 라운드 로빈 풀(`RobloxMemoryCookies`)로 감싼다.
     * 서버리스처럼 프로세스가 자주 새로 뜨는 곳에서는 외부 저장소로 만든 `RobloxCookieStore`를 넣는다.
     * 실행 중에 쿠키를 바꾸려면 `RobloxMemoryCookies`를 직접 만들어 넣고 그걸 고친다.
     */
    cookies(cookies: readonly RobloxCookie[] | RobloxCookieStore): RobloxNodeStage<L> {
        const store = Array.isArray(cookies) ? new RobloxMemoryCookies(cookies as readonly RobloxCookie[]) : cookies as RobloxCookieStore
        return new RobloxNodeStage<L>({ ...this.config, cookies: store })
    }

    /**
     * Roblox가 쿠키를 거부했을 때(401, 403 "User is moderated") 할 일. 이유(`RobloxCookieRejectReason`)는 두 번째 인자로 온다.
     * 지정하면 기본 처리(풀에서 빼기, `store.remove`)는 하지 않는다 — 원본 DB에서 지우거나, 정지가 풀릴 때까지 빼 두거나,
     * 기록만 하고 남겨 두는 것은 여기서 정한다. `.as(cookie)`의 쿠키도 같은 콜백을 탄다.
     * 풀에서 돌려 쓰는 요청은 처리가 끝난 뒤 다른 쿠키로 다시 보낸다.
     */
    onCookieRejected(handler: RobloxCookieRejectedHandler): RobloxNodeStage<L> {
        return new RobloxNodeStage<L>({ ...this.config, onCookieRejected: handler })
    }
}
// node 전용 기능(`as`)을 타입에 합친다 (런타임은 client.ts).
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RobloxNodeStage<L = unknown> extends RobloxNodeServices<L> {}

export class RobloxOptionsStage<L = unknown, M extends RobloxMode = RobloxMode> extends RobloxConfigurableStage<L, M> {}

export class RobloxCacheStage<L = unknown, M extends RobloxMode = RobloxMode> extends RobloxClient<L> {
    /** 서비스 → 메서드 → TTL(ms). 적지 않은 메서드는 기본값(`RobloxDefaultTtl`)을 쓴다. 0 이하면 캐시하지 않는다 (저장소의 get/set을 부르지 않는다). 만료 없이 두려면 `Infinity`. */
    ttl(ttl: RobloxTtl): RobloxModeStage<RobloxCacheStage<L, M>, M, L> {
        return this.next<L>({ ...this.config, ttl: mergeTtl(this.config.ttl, ttl) })
    }

    retry(options: RobloxRetryOptions): RobloxModeStage<RobloxCacheStage<L, M>, M, L> {
        return this.next<L>({ ...this.config, retry: { ...this.config.retry, ...options } })
    }

    geolocation<G>(geolocate: RobloxGeolocator<G>): RobloxModeStage<RobloxCacheStage<G, M>, M, G> {
        return this.next<G>({ ...this.config, geolocate })
    }

    rateLimits(store: RobloxRateLimitStore): RobloxModeStage<RobloxCacheStage<L, M>, M, L> {
        return this.next<L>({ ...this.config, rateLimits: new RobloxRateLimiter(store) })
    }

    private next<G>(config: RobloxConfig) {
        return new RobloxCacheStage<G, M>(config) as RobloxModeStage<RobloxCacheStage<G, M>, M, G>
    }
}

export const vigorRoblox = new VigorRoblox()
