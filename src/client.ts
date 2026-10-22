import type { RobloxConfig } from "./core/config"
import type { RobloxCookie } from "./core/cookies"
import { RobloxUsersApi } from "./apis/users"
import { RobloxThumbnailsApi } from "./apis/thumbnails"
import { RobloxPresenceApi } from "./apis/presence"
import { RobloxGamesApi } from "./apis/games"
import { RobloxFriendsApi } from "./apis/friends"
import { RobloxChatApi } from "./apis/chat"
import { RobloxGroupsApi } from "./apis/groups"
import { RobloxBadgesApi } from "./apis/badges"

/**
 * 서비스 네임스페이스를 제공하는 공통 부모. 빌더의 모든 단계가 이걸 상속하므로
 * 어느 단계에서든 바로 `.users` 등을 쓸 수 있다.
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
    /** 쿠키 → 고정 클라이언트. 같은 쿠키면 같은 클라이언트를 돌려줘 요청 묶기·중복 제거·내 id 캐시가 이어진다 */
    private readonly asClients = new Map<RobloxCookie, RobloxClient<L>>()

    constructor(protected readonly config: RobloxConfig) {}

    /** users.roblox.com */
    get users(): RobloxUsersApi {
        return this._users ??= new RobloxUsersApi(this.config, this.thumbnails)
    }

    /** thumbnails.roblox.com */
    get thumbnails(): RobloxThumbnailsApi {
        return this._thumbnails ??= new RobloxThumbnailsApi(this.config)
    }

    /** presence.roblox.com */
    get presence(): RobloxPresenceApi {
        return this._presence ??= new RobloxPresenceApi(this.config)
    }

    /** games.roblox.com + gamejoin.roblox.com */
    get games(): RobloxGamesApi<L> {
        return this._games ??= new RobloxGamesApi<L>(this.config, this.thumbnails, this.presence)
    }

    /** friends.roblox.com */
    get friends(): RobloxFriendsApi {
        return this._friends ??= new RobloxFriendsApi(this.config, this.users)
    }

    /** groups.roblox.com */
    get groups(): RobloxGroupsApi {
        return this._groups ??= new RobloxGroupsApi(this.config, this.thumbnails, this.users)
    }

    /** badges.roblox.com */
    get badges(): RobloxBadgesApi {
        return this._badges ??= new RobloxBadgesApi(this.config, this.thumbnails)
    }

    /** apis.roblox.com/platform-chat-api — 요청 계정의 채팅. `.as(cookie)`나 확장 모드에서 쓴다 */
    get chat(): RobloxChatApi {
        return this._chat ??= new RobloxChatApi(this.config)
    }

    /**
     * 지정한 쿠키로 고정한 클라이언트. 요청 계정에 따라 응답이 달라지는 API용.
     * 확장 모드에서는 쿠키를 붙일 수 없으므로 의미가 없다.
     */
    as(cookie: RobloxCookie): RobloxClient<L> {
        let client = this.asClients.get(cookie)
        if (!client) this.asClients.set(cookie, client = new RobloxClient<L>({ ...this.config, fixedCookie: cookie }))
        return client
    }
}
