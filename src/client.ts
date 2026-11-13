import type { RobloxConfig, RobloxMode } from "./core/config"
import { withRobloxErrors } from "./core/error"
import type { RobloxCookie } from "./core/cookies"
import { RobloxUsersApi } from "./apis/users"
import { RobloxThumbnailsApi } from "./apis/thumbnails"
import { RobloxPresenceApi } from "./apis/presence"
import { RobloxGamesApi } from "./apis/games"
import { RobloxFriendsApi } from "./apis/friends"
import { RobloxChatApi } from "./apis/chat"
import { RobloxGroupsApi } from "./apis/groups"
import { RobloxBadgesApi } from "./apis/badges"
import { RobloxTradesApi } from "./apis/trades"
import { RobloxAuthApi } from "./apis/auth"

/**
 * 서비스 네임스페이스를 제공하는 공통 부모. 빌더의 모든 단계가 이걸 상속하므로
 * 어느 단계에서든 바로 `.users` 등을 쓸 수 있다.
 * 서비스 메서드의 에러는 모두 `RobloxError`로 나간다 (`withRobloxErrors`).
 * `L`은 `.geolocation(fn)` 콜백이 돌려주는 위치 타입이다 (서버 위치 결과에 그대로 들어간다).
 */
export class RobloxClient<L = unknown> {
    private _users?: RobloxUsersApi
    private _thumbnails?: RobloxThumbnailsApi
    private _presence?: RobloxPresenceApi
    private _games?: RobloxGamesApi<L>
    private _friends?: RobloxFriendsApi
    private _chat?: RobloxChatApi
    private _groups?: RobloxGroupsApi
    private _badges?: RobloxBadgesApi
    private _trades?: RobloxTradesApi
    private _auth?: RobloxAuthApi
    /** 쿠키 → 고정 클라이언트. 같은 쿠키면 같은 클라이언트를 돌려줘 요청 묶기·중복 제거·내 id 캐시가 이어진다 */
    private readonly asClients = new Map<RobloxCookie, RobloxClient<L>>()

    constructor(protected readonly config: RobloxConfig) {}

    /** users.roblox.com */
    get users(): RobloxUsersApi {
        return this._users ??= withRobloxErrors(new RobloxUsersApi(this.config, this.thumbnails))
    }

    /** thumbnails.roblox.com */
    get thumbnails(): RobloxThumbnailsApi {
        return this._thumbnails ??= withRobloxErrors(new RobloxThumbnailsApi(this.config))
    }

    /** presence.roblox.com */
    get presence(): RobloxPresenceApi {
        return this._presence ??= withRobloxErrors(new RobloxPresenceApi(this.config))
    }

    /** games.roblox.com + gamejoin.roblox.com */
    get games(): RobloxGamesApi<L> {
        return this._games ??= withRobloxErrors(new RobloxGamesApi<L>(this.config, this.thumbnails, this.presence, this.users))
    }

    /** friends.roblox.com */
    get friends(): RobloxFriendsApi {
        return this._friends ??= withRobloxErrors(new RobloxFriendsApi(this.config, this.users))
    }

    /** groups.roblox.com */
    get groups(): RobloxGroupsApi {
        return this._groups ??= withRobloxErrors(new RobloxGroupsApi(this.config, this.thumbnails, this.users))
    }

    /** badges.roblox.com */
    get badges(): RobloxBadgesApi {
        return this._badges ??= withRobloxErrors(new RobloxBadgesApi(this.config, this.thumbnails))
    }

    /** `auth` getter의 본체. 타입에는 확장 모드 클라이언트에만 드러난다 (RobloxExtensionServices) */
    protected authApi(): RobloxAuthApi {
        return this._auth ??= withRobloxErrors(new RobloxAuthApi(this.config))
    }

    /** trades.roblox.com — 요청 계정 기준 */
    get trades(): RobloxTradesApi {
        return this._trades ??= withRobloxErrors(new RobloxTradesApi(this.config))
    }

    /** apis.roblox.com/platform-chat-api — 요청 계정의 채팅. `.as(cookie)`나 확장 모드에서 쓴다 */
    get chat(): RobloxChatApi {
        return this._chat ??= withRobloxErrors(new RobloxChatApi(this.config))
    }

    /** `as(cookie)`의 본체. 타입에는 node 모드 클라이언트에만 드러난다 (RobloxNodeServices) */
    protected pin(cookie: RobloxCookie): RobloxPinnedClient<L> {
        let client = this.asClients.get(cookie)
        if (!client) this.asClients.set(cookie, client = new RobloxClient<L>({ ...this.config, fixedCookie: cookie }))
        return client as RobloxPinnedClient<L>
    }
}

/**
 * 확장 모드 클라이언트에만 있는 서비스. `mode("extension")`에서 이어진 단계의 타입에만 붙고,
 * node 모드 타입에는 없어 자동 완성에도 뜨지 않는다.
 */
export interface RobloxExtensionServices {
    /** auth.roblox.com — 확장 모드 전용 (roblox.com 페이지에서 쓴다) */
    readonly auth: RobloxAuthApi
}

/** node 모드 클라이언트에만 있는 기능. 확장 모드는 브라우저의 쿠키를 쓰므로 계정을 고를 수 없다. */
export interface RobloxNodeServices<L = unknown> {
    /**
     * 지정한 쿠키로 고정한 클라이언트. 요청 계정에 따라 응답이 달라지는 API용.
     * 같은 쿠키면 같은 클라이언트를 돌려준다.
     */
    as(cookie: RobloxCookie): RobloxPinnedClient<L>
}

/** `.as(cookie)`로 고정한 node 모드 클라이언트 */
export type RobloxPinnedClient<L = unknown> = RobloxClient<L> & RobloxNodeServices<L>

/** 단계 타입에 모드 전용 기능을 붙인다: 확장 모드면 `auth`, node 모드면 `as` */
export type RobloxModeStage<S, M extends RobloxMode, L = unknown> =
    M extends "extension" ? S & RobloxExtensionServices
    : M extends "node" ? S & RobloxNodeServices<L>
    : S

// 런타임에는 모든 클라이언트에 있다. 타입에서만 모드별로 나눈다
// (타입을 우회한 auth 호출은 메서드가 모드를 다시 확인해 막는다).
Object.defineProperties(RobloxClient.prototype, {
    auth: {
        configurable: true,
        get(this: RobloxClient) {
            return (this as unknown as { authApi(): RobloxAuthApi }).authApi()
        },
    },
    as: {
        configurable: true,
        writable: true,
        value(this: RobloxClient, cookie: RobloxCookie) {
            return (this as unknown as { pin(cookie: RobloxCookie): RobloxPinnedClient }).pin(cookie)
        },
    },
})
