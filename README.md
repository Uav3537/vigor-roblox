# vigor-roblox

A typed client for Roblox's web APIs, built on [vigor-fetch](https://www.npmjs.com/package/vigor-fetch).

- Users, presence, friends, thumbnails, server lists, place info and chat behind one object
- Every response validated with [zod](https://zod.dev) before it reaches you
- Read-through caching against a store you provide, with a TTL per resource
- Credential rotation across several cookies and OAuth tokens, with per-credential rate-limit cooldown
- Two modes: `node` for servers that hold cookies, `browser` for code running on roblox.com

## Install

```sh
npm install vigor-roblox
```

Ships ESM and CommonJS builds with type declarations. It uses the global `fetch` and Web Crypto, so Node needs to be 18 or newer.

## Quick start

```ts
import { createRobloxApi, RobloxCookieSchema, RobloxUserIdSchema } from "vigor-roblox"

const roblox = createRobloxApi({
    cache,                                             // see "Cache" below
    cookies: [RobloxCookieSchema.parse(process.env.ROBLOX_COOKIE)],
    ipgeolocationKey: process.env.IPGEOLOCATION_KEY!,
})

const [user] = await roblox.usersSimple([RobloxUserIdSchema.parse(1)])
console.log(user.name)
```

## Modes

`createRobloxApi` takes a `type` of `"node"` or `"browser"`. It defaults to `"node"`.

### Node (default)

Authenticates by attaching credentials to each request itself.

```ts
const roblox = createRobloxApi({
    type: "node",            // optional
    cache,
    cookies,
    oauthTokens,             // optional
    oauthTokenRateLimit,     // optional
    ipgeolocationKey,
    ttl,                     // optional
})
```

| Option | Type | Description |
| --- | --- | --- |
| `cache` | `RobloxApiCache` | Where cached responses are stored. Required. |
| `cookies` | `RobloxCookie[]` | `.ROBLOSECURITY` cookies to rotate through. |
| `oauthTokens` | `string[]` | OAuth 2.0 access tokens. Used ahead of cookies for the users, games and presence APIs. |
| `oauthTokenRateLimit` | `{ limit, windowMs }` | How often one OAuth token may be used before falling back to a cookie. Defaults to 4 per minute. |
| `ipgeolocationKey` | `string` | [ipgeolocation.io](https://ipgeolocation.io) API key, used to resolve server locations. |
| `ttl` | `RobloxTtlConfig` | Cache TTL overrides. |

`cookies` and `oauthTokens` are held by reference, not copied. Push, splice or replace entries in the arrays you passed and the next request sees the change, which is how you rotate or refresh credentials without rebuilding the client.

Requests that do not need a particular account pick the least recently used credential. When Roblox rate-limits one, that credential rests until its limit resets and the request is retried with another.

> Roblox ties a session to the region it was signed in from. A cookie that was created in a user's browser and is then used from your server can get that session reset, signing the user out. Use node mode with accounts you own, and use browser mode for anything that should act as the visitor.

### Browser

Takes no cookies. Requests are sent with `credentials: "include"`, so they are authenticated by whatever Roblox account the browser is signed in to.

```ts
const roblox = createRobloxApi({ type: "browser", cache })

const me = await roblox.authenticated()
const { conversations } = await roblox.chatConversations({})
```

| Option | Type | Description |
| --- | --- | --- |
| `type` | `"browser"` | Required to select this mode. |
| `cache` | `RobloxApiCache` | Where cached responses are stored. Required. |
| `ttl` | `RobloxTtlConfig` | Cache TTL overrides. |

Things to know:

- **It only works from a roblox.com origin**, such as a browser extension script running on a Roblox page. Anywhere else the requests are cross-site and Roblox's CORS policy rejects them.
- **No method accepts a cookie.** Methods that take a `cookie` in node mode drop that parameter, and `authenticated()` takes no arguments and resolves to the one signed-in user.
- **`gamejoin`, `serversRegion`, `servers` and `track` are not available.** They depend on Roblox's game-join endpoint, which only answers Roblox's own client. Use `serversSimple` for server lists and resolve locations from a server running node mode.
- **Use a cache that lives no longer than the page**, such as an in-memory `Map`. Account-scoped entries are not keyed by account in this mode, so a persistent store would serve one account's results to the next one that signs in.

## Cache

You supply the storage. The client calls two methods:

```ts
interface RobloxApiCache {
    select<T>(type: string, separators: string[]): Promise<Array<{ separator: string; data: T }>>
    upsert<T>(type: string, expire: number, items: Array<{ separator: string; data: T }>): Promise<void>
}
```

`type` is the resource name and `separator` identifies one entry within it. `select` returns only the entries it has; anything missing is fetched and passed to `upsert`. `expire` is in milliseconds.

A minimal in-memory implementation:

```ts
import type { RobloxApiCache } from "vigor-roblox"

const store = new Map<string, { data: unknown; expiresAt: number }>()

const cache: RobloxApiCache = {
    async select<T>(type: string, separators: string[]) {
        const now = Date.now()
        const hits: Array<{ separator: string; data: T }> = []
        for (const separator of separators) {
            const entry = store.get(`${type}:${separator}`)
            if (entry && entry.expiresAt > now) hits.push({ separator, data: entry.data as T })
        }
        return hits
    },
    async upsert<T>(type: string, expire: number, items: Array<{ separator: string; data: T }>) {
        const expiresAt = Date.now() + expire
        for (const item of items) store.set(`${type}:${item.separator}`, { data: item.data, expiresAt })
    },
}
```

### TTLs

Pass `ttl` to override any of these, in milliseconds. Setting a key to `0` turns caching off for that resource: every call fetches and nothing is read or written.

| Key | Default |
| --- | --- |
| `usersSimple` | 24 hours |
| `users` | 24 hours |
| `usernames` | 30 minutes |
| `thumbnails` | 48 hours |
| `thumbnailAssets` | 48 hours |
| `serversSimple` | 5 seconds |
| `friends` | 10 minutes |
| `placeInfo` | 1 hour |
| `presence` | 30 seconds |
| `gamejoin` | 30 minutes |
| `serverLocationJob` | 12 hours |
| `serverLocationMachine` | 2 days |
| `serverLocationIp` | 31 days |

## API

Signatures below are for node mode. In browser mode, drop every `cookie` parameter.

### Users

| Method | Returns |
| --- | --- |
| `usersSimple(userIds)` | Id, name and display name for each user. |
| `users(userIds)` | Full profiles, including description and creation date. |
| `usersByName(usernames)` | Users looked up by username. |
| `usersSimpleWithImg(userIds)` | `usersSimple` plus an `img` headshot URL. |
| `usersWithImg(userIds)` | `users` plus an `img` headshot URL. |
| `usersByNamesWithImg(usernames)` | `usersByName` plus an `img` headshot URL. |
| `authenticated(cookies)` | The account behind each cookie, with description, birthdate, gender, age bracket, country and roles where Roblox returns them. |

### Presence and friends

| Method | Returns |
| --- | --- |
| `presence(userIds, { cookie }?)` | Online status for each user. |
| `friends(userId)` | A user's friends list. |
| `sendFriendRequest(userId)` | Sends a friend request. |
| `unfriend(userId)` | Removes a friend. |

What presence reveals depends on who is asking, since privacy settings take friendship into account. Pass `cookie` to ask as a specific account; those results are cached per account. Without it a pooled credential is used and the result is not cached.

`sendFriendRequest` and `unfriend` act as a pooled account in node mode, and as the signed-in user in browser mode.

### Thumbnails

| Method | Returns |
| --- | --- |
| `thumbnailsBatch(targets, defaults?)` | Thumbnails for a mixed list of targets. Each target names either a `targetId` or a `token`. |
| `thumbnailAssets({ assetIds, size?, format? })` | Asset thumbnails. |

Targets default to `AvatarHeadShot`, `150x150`, `Png`. Thumbnails that Roblox has not finished rendering are left out of the result.

### Servers

| Method | Returns |
| --- | --- |
| `serversSimple(opts)` | One or more pages of a place's servers, with player headshots. |
| `servers(opts)` | `serversSimple` plus a `location` for each server. Node only. |
| `serversRegion({ placeId, jobIds })` | The location of specific servers. Node only. |
| `gamejoin(placeId, jobId, { cookie }?)` | A server's public IP and machine address. Node only. |
| `track({ placeId, targets })` | Finds which server of a place each target user is in, by matching headshots. Node only. |

```ts
const page = await roblox.serversSimple({
    placeId,
    serverType: "Public",   // "Public" | "Friend" | "Private", defaults to "Public"
    count: 2,               // pages of 100 to walk, defaults to 1
    cursor,                 // continue from a previous result's nextPageCursor
})
```

`Friend` and `Private` lists are specific to the requesting account. In node mode, pass the `cookie` of the account whose view you want; without one the request uses a pooled cookie and the result is not cached. A private server that is not running has a `jobId` of `null`.

### Places

| Method | Returns |
| --- | --- |
| `placeInfo(placeIds)` | Name, description, creator, player and visit counts, and logo URLs for each place. |

### Chat

Chat is always read and written as one account, so in node mode every method requires a `cookie`.

| Method | Returns |
| --- | --- |
| `chatConversations({ cookie, pageSize?, cursor?, includeUserData? })` | `{ conversations, nextCursor }` |
| `chatMessages({ cookie, conversationId, pageSize?, cursor? })` | `{ messages, nextCursor, previousCursor }`, newest first. |
| `sendChatMessage({ cookie, conversationId, content })` | The sent message, or `null`. |
| `sendChatMessages({ cookie, conversationId, contents })` | The sent messages. |
| `chatMetadata({ cookie, userId? })` | The account's chat settings and feature flags. |

These use Roblox's `platform-chat-api`, which is undocumented and may change without notice.

## Types and validation

Ids and cookies are branded types, so a plain `number` or `string` is not accepted where a `RobloxUserId` or `RobloxCookie` is expected. Each has a zod schema and a type guard:

```ts
import { RobloxPlaceIdSchema, isRobloxJobId } from "vigor-roblox"

const placeId = RobloxPlaceIdSchema.parse(Number(input))   // throws if invalid

if (isRobloxJobId(value)) {
    // value is a RobloxJobId here
}
```

Available for `UserId`, `UserName`, `DisplayName`, `Cookie`, `PlaceId`, `UniverseId`, `JobId`, `AssetId`, `ConversationId` and `ChatMessageId`, as `Roblox<Name>Schema` and `isRoblox<Name>`.

Response schemas and their inferred types are exported under the same naming, for example `RobloxUserSimpleSchema` and `RobloxUserSimple`. `RobloxApi` is the type of a node-mode client and `RobloxBrowserApi` the type of a browser-mode one.

## Errors

A request that fails after its retries throws the underlying vigor-fetch error. A response that does not match its schema throws a `ZodError`.

## License

MIT
