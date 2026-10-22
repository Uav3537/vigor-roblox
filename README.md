# vigor-roblox

A typed client for Roblox's web APIs, built on [vigor-fetch](https://www.npmjs.com/package/vigor-fetch).

- Users, thumbnails, presence, games (with gamejoin), friends, groups, badges and chat behind one object
- Every lookup takes an array. Calls made in the same tick are batched into as few requests as each endpoint allows
- When several endpoints return the same result, the library picks between them by their remaining rate limit, so you never choose an endpoint
- Every response validated with [zod](https://zod.dev); ids are branded types
- Read-through caching against a store you provide, with typed tuple keys and default TTLs
- Two modes: `node` for servers that hold cookies, `extension` for browser extensions (and scripts running on roblox.com)

## Install

```sh
npm install vigor-roblox
```

Ships ESM and CommonJS builds with type declarations. It uses the global `fetch` and Web Crypto, so Node needs to be 18 or newer.

## Quick start

```ts
import { vigorRoblox, RobloxUserIdSchema } from "vigor-roblox"

const roblox = vigorRoblox.mode("node")

const ids = [1, 156].map(id => RobloxUserIdSchema.parse(id))
const users = await roblox.users.getUsers(ids, { thumbnail: true })
console.log(users[0].name, users[0].thumbnail.imageUrl)
```

## Setup

The client is an immutable builder. Every stage is already a client, so you can stop at any point and use `.users`, `.games` and so on.

```ts
import { vigorRoblox, RobloxCookieSchema, RobloxMemoryCache } from "vigor-roblox"

const roblox = vigorRoblox
    .mode("node")
    .cookies(process.env.COOKIES!.split(",").map(c => RobloxCookieSchema.parse(c)))
    .retry({ maxAttempts: 5, timeout: 20_000 })
    .geolocation(geolocate)                           // optional, IP → location for servers
    .cache(new RobloxMemoryCache())
    .ttl({ presence: { get: 10_000 } })               // optional, overrides defaults
```

| Stage | Description |
| --- | --- |
| `mode("node" \| "extension")` | `node` attaches cookies itself. `extension` sends `credentials: "include"` and uses whatever account the browser is signed in to (see [Extensions](#extensions)). |
| `cookies(list \| store)` | Node only. `.ROBLOSECURITY` cookies, one per request. An array becomes an in-memory round-robin pool. See [Cookie pools](#cookie-pools). |
| `onCookieRejected(fn)` | Node only. Called with the cookie and a reason when Roblox rejects it (`401`, or `403` for a banned account). Replaces the default, which drops the cookie from the pool. |
| `rateLimits(store)` | Syncs rate limit state with a store you provide. See [Rate limits](#rate-limits). |
| `retry(options)` | Attempts and per-attempt timeout for every request. |
| `geolocation(fn)` | IP → location callback, needed for server locations. Whatever it returns is attached to servers as is, with its type. See [Server locations](#server-locations). |
| `cache(store)` | Turns caching on. See [Cache](#cache). |
| `ttl(ttl)` | Only after `cache`. Per-method TTL overrides; calling it again merges per method. |

### Cookie pools

`cookies(list)` wraps the array in `RobloxMemoryCookies`, a round-robin pool held in process memory. To change cookies while the client runs, create the pool yourself and keep a reference:

```ts
import { RobloxMemoryCookies } from "vigor-roblox"

const pool = new RobloxMemoryCookies(cookies)
const roblox = vigorRoblox.mode("node").cookies(pool)

pool.add(newCookie)
pool.remove(oldCookie)
```

An in-memory pool does not survive serverless platforms (Vercel, Lambda...). Every cold start begins the rotation at the first cookie again, and a cookie removed on one instance is still in use on the others. Pass a `RobloxCookieStore` backed by shared storage instead:

```ts
import type { RobloxCookie, RobloxCookieStore } from "vigor-roblox"

const store: RobloxCookieStore = {
    // Rotating a Redis list atomically gives every instance one shared rotation.
    next: async () => (await redis.lmove("cookies", "cookies", "LEFT", "RIGHT")) as RobloxCookie | null,
    remove: async cookie => { await redis.lrem("cookies", 0, cookie) },
}

const roblox = vigorRoblox.mode("node").cookies(store)
```

`next()` may return `null`, in which case the request goes out without a cookie. When a pool is set, the client treats it as rotating even if it happens to be empty (see [Pinning an account](#pinning-an-account)).

#### Rejected cookies

A cookie is rejected when a request that carried it gets one of these answers. The reason is passed to the handler:

| Reason | Response | Meaning |
| --- | --- | --- |
| `"unauthorized"` | `401` | The cookie expired or was logged out. |
| `"moderated"` | `403` "User is moderated" | The account is banned. It still signs in, but authenticated APIs refuse it. A temporary ban lifts later. |

Other `403`s (CSRF token, missing permission, challenge) are not cookie problems and don't reject it. When a cookie is rejected:

1. By default the store's `remove(cookie)` is called. `RobloxMemoryCookies` drops it from the array. A store without `remove` does nothing.
2. `onCookieRejected(fn)` replaces that default completely. The pool is left as it is unless your handler changes it, so you decide whether to delete the cookie from your database, flag it for review, or keep it.
3. If the request came from the pool, it is sent again with the next cookie once the handler finishes. A request made through `.as(cookie)` fails with the original error after the handler runs.

```ts
const roblox = vigorRoblox
    .mode("node")
    .cookies(store)
    .onCookieRejected(async (cookie, reason) => {
        await db.cookies.update({ where: { value: cookie }, data: { status: reason } })
    })
```

Concurrent rejections of the same cookie call the handler once. The handler also runs for cookies given to `.as(cookie)`.

### Pinning an account

Some answers depend on who asks: chat, friend statuses, online friends, playability, friend and private server lists. Use `.as(cookie)` to get a client fixed to one account. Calling it again with the same cookie returns the same client, so its requests keep being batched together.

```ts
const me = roblox.as(cookie)
const conversations = await me.chat.listConversations()
```

APIs that answer for "me" throw if the client has a cookie pool, because each request could come from a different account. In extension mode the signed-in account is used.

### Extensions

Roblox APIs only allow cross-origin requests from `https://www.roblox.com`, so `extension` mode works from an extension's service worker, popup or offscreen page (host permissions skip CORS) and from scripts running on roblox.com (content scripts, userscripts). A regular web page is blocked by CORS in either mode and needs its own backend running `node` mode.

Authentication is left to the browser's cookies. A `fetch` cannot set `User-Agent`, which gamejoin requires, so `robloxDnrRules()` returns a `declarativeNetRequest` rule that does it:

```ts
import { vigorRoblox, robloxDnrRules } from "vigor-roblox"

const rules = robloxDnrRules({ firstRuleId: 1000 })
await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: rules.map(r => r.id), addRules: rules })

const roblox = vigorRoblox.mode("extension")
```

| Option | Description |
| --- | --- |
| `firstRuleId` | Id of the first rule; each rule takes the next id. Default `1`. |
| `priority` | Default `1`. |
| `extensionOnly` | Limits the rule to the extension's own requests (`tabIds: [-1]`, session rules only). By default it applies to every request to `gamejoin.roblox.com`. |

The manifest needs the `declarativeNetRequest` (or `declarativeNetRequestWithHostAccess`) permission and `*://*.roblox.com/*` host permission.

### Server locations

The library doesn't pick a geolocation provider. `geolocation(fn)` takes a callback that maps IPs to locations, so you can use any service or a local database. The library never reads what you return. It attaches the value to each server as is, and its type flows through, so `getServers`, `findUsers` and `getServerLocations` are typed with whatever your callback returns. Anything you derive from it, such as distance or expected ping, belongs in your application.

```ts
import type { RobloxIpAddress } from "vigor-roblox"

// ip-api.com's batch endpoint, 100 IPs per request
async function geolocate(ips: RobloxIpAddress[]) {
    const res = await fetch("http://ip-api.com/batch?fields=status,countryCode,city,lat,lon", {
        method: "POST",
        body: JSON.stringify(ips),
    })
    const rows: { status: string, countryCode: string, city: string, lat: number, lon: number }[] = await res.json()
    return rows.map(r => r.status === "success" ? r : null)
}

const roblox = vigorRoblox.mode("node").cookies(cookies).geolocation(geolocate)
const { data } = await roblox.games.getServers(placeId, { location: true })
data[0].location?.countryCode   // typed from your callback
```

- Return one entry per IP, in the same order. Return `null` or `undefined` for an IP you can't place, and it is left out.
- The callback only receives IPs that aren't cached, with duplicates removed, all in one call. If your provider takes one IP at a time or caps batch size, split the list inside the callback.
- `getServerLocations(ips)` returns `{ ip, location }`, where `location` is your value.
- When a cache is set, results are cached for 31 days. The store receives your value as is, typed as `unknown`. `null` results are not cached.

## Conventions

- **Lookups take arrays and return results in input order.** Ask for one item with a one-element array. Missing items are dropped (thumbnails come back with `state: "Error"` instead, presence comes back offline).
- **Paged lists take one entity.** Methods that walk a cursor (`getUsernameHistory`, `getServerPage`, `getUserGames`, `getFollowers`, ...) take a single id plus a query, since a cursor belongs to one list.
- **Ids are branded.** Parse plain values with the matching schema, for example `RobloxPlaceIdSchema.parse(1818)`. The same goes for cookies (`RobloxCookieSchema`), job ids, conversation ids and server IPs.
- **Creators are discriminated unions.** A field that can point to a user or a group (`game.creator`, `group.owner`, a recommendation's `creator`) is a `RobloxCreator`. Check `type` and `id` narrows to `RobloxUserId` or `RobloxGroupId`. Any other type comes back as `"Unknown"`, with the original value in `rawType`. A thumbnail's `targetId` has the id type of the target you asked for.

  ```ts
  if (game.creator.type === "Group") await roblox.groups.getGroups([game.creator.id])
  ```
- **One function per result.** If two endpoints return the same data, there is still one method. The library routes each call by remaining rate limit and falls back to the other endpoint on `429`, `403`, `5xx` or a response that no longer matches its schema.

## Services

### `users`

| Method | Description |
| --- | --- |
| `getUsers(ids, { excludeBannedUsers?, thumbnail? })` | Name, display name, verified badge. Batched across three endpoints (200 per request on the fastest). |
| `getUserDetails(ids, { thumbnail? })` | Adds description, join date and ban status. One request per user, 30 per minute. |
| `getUsersByNames(names, { excludeBannedUsers?, thumbnail? })` | Resolves current or previous usernames, case-insensitive. |
| `searchUsers(query)`, `getUsernameHistory(id, query)` | Paged. |
| `getAuthenticated()`, `getAgeBracket()`, `getCountryCode()`, `getRoles()` | The signed-in account. |
| `getBirthdate()`, `setBirthdate()`, `getDescription()`, `setDescription()`, `getGender()`, `setGender()` | Account settings. |
| `validateDisplayName()`, `validateUserDisplayName()`, `setDisplayName()` | Display names. |

`thumbnail: true` attaches a 150×150 PNG headshot to each user. Pass an object to pick the type and size, for example `{ type: "Avatar", size: "420x420" }`.

### `thumbnails`

```ts
const images = await roblox.thumbnails.get([
    { type: "AvatarHeadShot", targetId: userId, size: "48x48", isCircular: true },
    { type: "GameIcon", targetId: universeId },
    { type: "AvatarHeadShot", token: playerToken },   // tokens from server lists
])
```

`get` takes any mix of avatar, asset, game, badge, game pass, bundle, group, outfit and developer product targets. Each target type only accepts the sizes and formats Roblox supports for it. Requests go through the batch endpoint (60 per second, 100 targets each) and spill over to the per-type endpoints when it is busy. Pending thumbnails are polled until they finish.

`getGameThumbnails(universeIds, query)` returns each universe's screenshot list.

### `presence`

`get(userIds)` returns online status and, when visible to the requesting account, the game and server. 50 users per request, 60 requests per minute.

### `games`

| Method | Description |
| --- | --- |
| `getPlaces(placeIds)` | Place → universe → details, votes, icon and thumbnails in one call. |
| `getServers(placeId, { count, serverType, players, address, location })` | Walks the server list until `count` servers are collected (whole pages), with player headshots, gamejoin addresses and locations. |
| `findUsers(placeId, userIds, { maxServers, presence, serverType, address, location })` | Which server of a place each user is in. Walks the server list and matches player headshots against each user's headshot, stopping once everyone is found. Presence is asked in parallel as a hint and never waited on unless someone is still missing: a visible server in this place is used, a user confirmed in another place is dropped, and offline or hidden users keep being searched. `presence: false` skips it. Needs a signed-in account. The server list only carries up to 5 player tokens per server, so a user who is in a server can still be missed; users with a default avatar, or sharing an avatar with another target, can't be matched by headshot. |
| `getGames`, `getUniverseIds`, `getPlaceDetails`, `getProductInfo`, `getPlayability`, `getVotes`, `getFavoriteCounts`, `getMedia` | Batched lookups. |
| `getServerPage(placeId, query)` | One page of servers. Spread over three endpoints, each limited to 3 requests per minute per IP. |
| `getServerAddresses(targets)`, `getServerLocations(ips)` | gamejoin addresses (needs a signed-in account; full servers have none) and IP locations from your `geolocation` callback. IPs the callback can't place are left out. |
| `getRecommendations`, `getUserGames`, `getUserFavoriteGames`, `getGroupGames` | Paged lists. |
| `getFavorited`, `setFavorited`, `getUserVotes`, `setUserVote` | The requesting account's favorites and votes. |
| `getPrivateServers`, `getMyPrivateServers`, `getPrivateServerDetails`, `getPrivateServersEnabled`, `getPrivateServerInvites`, `createPrivateServer`, `updatePrivateServer`, `updatePrivateServerPermissions`, `updatePrivateServerSubscription` | Private servers. |

gamejoin only answers requests whose `User-Agent` looks like the Roblox client. Node mode sends `Roblox/WinInet` itself. A `fetch` cannot set that header, so in extension mode addresses come back with `status: 12` and no IP unless the `robloxDnrRules()` rules are installed.

### `friends`

| Method | Description |
| --- | --- |
| `getFriends(ids, { thumbnail? })` | Friend lists with names filled in from `users` (the friends API returns empty names). |
| `getFriendCounts`, `getFollowerCounts`, `getFollowingCounts` | Counts. |
| `getFollowers`, `getFollowings`, `searchFriends`, `getMetadata` | Paged lists and page metadata. |
| `getFriendStatuses`, `getAreFriends`, `getFollowingStatuses`, `getOnlineFriends`, `getInactiveFriends`, `getFriendRequests`, `getTrustedFriendRequests`, `getFriendRequestCount` | Relative to the requesting account. |
| `sendFriendRequest`, `acceptFriendRequest`, `declineFriendRequest`, `declineAllFriendRequests`, `unfriend`, `follow`, `unfollow` | Actions. Friend requests may require a captcha. |

### `groups`

| Method | Description |
| --- | --- |
| `getGroups(ids, { thumbnail? })` | Name, description, owner id and creation date. 100 groups per request, 1 request per second. `thumbnail` attaches the group icon. |
| `getGroupDetails(ids, { thumbnail? })` | Member count, owner name, shout and entry settings. One request per group, only 7 per minute. |
| `getRoles(groupIds)`, `getRolesByIds(roleIds)` | A group's roles with member counts; roles looked up by id (100 per request). |
| `getUserGroups(userIds)`, `getPrimaryGroups(userIds)` | Groups and roles of users, spread over the v1 and v2 endpoints; primary groups (users without one are left out). |
| `getMembers`, `getRoleMembers`, `searchGroups`, `getNameHistory`, `getRelationships` | Paged lists. `lookupGroups(name)` puts an exact name match first. |
| `getGuestPermissions`, `getFeatureFreezes`, `getFeaturedEvents`, `getMetadata`, `getConfigurationMetadata`, `getSearchMetadata` | Public lookups. |
| `getMemberships`, `getPolicies`, `getSocialLinks`, `getEmotes`, `getPendingGroups`, `getFriendsGroups` | Relative to the requesting account. |
| `joinGroup`, `leaveGroup`, `setPrimaryGroup`, `removePrimaryGroup`, `setNotificationPreference`, `createGroup` | The requesting account's actions. `createGroup` costs Robux. |
| `getRolePermissions`, `getUserPermissions`, `createRole`, `updateRole`, `deleteRole`, `updateRolePermissions`, `setMemberRole`, `removeMember` | Roles and members. `getRolePermissions` asks for every role at once and falls back to one role at a time when the account isn't the owner. |
| `getJoinRequests`, `getJoinRequestsByUsers`, `acceptJoinRequests`, `declineJoinRequests`, `getBans`, `getBannedUsers`, `banUser`, `unbanUser`, `getAuditLog` | Moderation. Accepting or declining one user uses the single endpoint, several use the batch endpoint. |
| `getSettings`, `updateSettings`, `getConfigurations`, `getFeatures`, `getFeaturesBlocked`, `updateFeatures`, `setName`, `setDescription`, `setShout`, `setIcon` | Configuration. |
| `getSocialLinks`, `createSocialLink`, `updateSocialLink`, `deleteSocialLink`, `getKeywords`, `createKeywords`, `updateKeyword`, `deleteKeyword`, `setFeaturedEvent`, `removeFeaturedEvent` | Social links, forum keyword block list and featured events. |
| `getRelationshipRequests`, `acceptRelationshipRequests`, `declineRelationshipRequests`, `createRelationship`, `deleteRelationship` | Allies and enemies. |
| `getPayouts`, `getPayoutRestrictions`, `payout`, `setRecurringPayouts` | Group funds. `payout` sends an idempotency key so a retried request doesn't pay twice. |
| `changeOwner`, `claimOwnership`, `evaluateCommunityTier`, `deactivateGroup` | Ownership and lifecycle. |

Management methods need the matching group permission and fail with `403` otherwise.

### `badges`

| Method | Description |
| --- | --- |
| `getBadges(ids, { thumbnail? })` | Badge details, award statistics and the awarding game. One request per badge (600 per minute). `thumbnail` attaches the badge icon. |
| `getUniverseBadges(universeId, query)` | A game's badges, paged. `sortBy` is `"Rank"` or `"DateCreated"`. |
| `getUserBadges(userId, query)` | Badges a user has, paged, with the creator (`RobloxCreator`) and the place that awarded each one. Needs a cookie. |
| `getAwardedDates(userId, badgeIds)` | Whether the user has each badge, and when they got it. Results are in input order, and `awardedDate` is `null` for badges the user doesn't have (a badge that doesn't exist also comes back as `null`). Needs a cookie. Uses the batch endpoint (100 per request, 10 per minute) and the single one (100 per minute), and falls back to the single one when the batch endpoint asks for a challenge. Only awarded dates are cached. |
| `getFreeQuotas(universeIds)`, `getMetadata()` | Free badges left today (UTC) per game; creation price and length limits. |
| `createBadge`, `updateBadge`, `setIcon`, `removeBadge` | Create a badge (multipart, optional icon; costs Robux beyond the daily free quota), rename or disable one, replace its icon, or remove a badge from the requesting account. |

### `chat`

`listConversations`, `getConversations`, `searchConversations`, `getMessages`, `searchMessages`, `getUnreadCounts`, `getMetadata`, `sendMessages`, `markRead`, `setTyping`, `createConversations`, `renameConversations`, `addUsers`, `removeUsers`.

These use Roblox's `platform-chat-api`, which is undocumented and may change without notice. Accounts without chat access (see `getMetadata().isChatUserMessagesEnabled`) get `403 chat_disabled_for_user` when sending.

## Rate limits

Roblox limits most endpoints per IP. The client reads `x-ratelimit-*` headers to track each endpoint's remaining budget, shared by every client built from the same `vigorRoblox.mode()` chain. A request that would exceed the budget waits for the window to reset or goes to another endpoint that returns the same data. A `429` reroutes instead of waiting inside the retry engine, and repeated `429`s back off (1, 2, 4 ... up to 60 seconds) even when the headers claim budget is left, which some endpoints do.

This state lives in memory by default, which is lost whenever the context restarts: a content script on every page load, an MV3 service worker after it idles, a serverless function on every cold start. Separate tabs and instances on the same IP also each start probing from scratch. `rateLimits(store)` syncs it with storage you choose:

```ts
const roblox = vigorRoblox.mode("extension").rateLimits({
    get: async bucket => (await chrome.storage.local.get(`rl:${bucket}`))[`rl:${bucket}`],
    set: (bucket, state) => chrome.storage.local.set({ [`rl:${bucket}`]: state }),
    watch: listener => chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== "local") return
        for (const [key, change] of Object.entries(changes)) {
            if (key.startsWith("rl:") && change.newValue) listener(key.slice(3), change.newValue)
        }
    }),
})
```

- A state is `{ remaining, resetAt, strikes }`. `resetAt` is epoch milliseconds, so it compares across tabs and machines.
- `get` runs when a bucket is first used and again after its window has passed. Requests on that bucket wait for it.
- `set` runs without being awaited whenever a response updates the state. Its errors are ignored.
- `watch` is optional and pushes changes made elsewhere. Your own writes coming back are harmless.
- Incoming state is merged conservatively (lower `remaining`, later `resetAt`). Requests in flight stay local. Nothing is atomic, so contexts probing at the same moment can overshoot slightly, and the resulting `429` is shared like any other state.

On serverless platforms, whether instances share an IP depends on the provider, so check before sharing one budget between them.

## Cache

```ts
interface RobloxCacheStore {
    get<K extends RobloxCacheKey>(key: K): RobloxCacheValue<K> | undefined | Promise<...>
    set<K extends RobloxCacheKey>(key: K, value: RobloxCacheValue<K>, ttl: number): void | Promise<void>
}
```

Keys are tuples, `[service, method, ...arguments]`, so a store can route them with a `switch`:

```ts
const store: RobloxCacheStore = {
    get(key) {
        const k: RobloxCacheKey = key
        switch (k[0]) {
            case "presence": return redis.get(`presence:${k[2]}:${k[3]}`)   // viewer, userId
            default:         return memory.get(robloxCacheKeyString(k))
        }
    },
    set(key, value, ttl) { /* ... */ },
}
```

- `RobloxCacheEntry` lists every key with the value stored under it. `robloxCacheKeyString(key)` turns a key into a stable string.
- Array lookups are cached per item. Missing items, pending thumbnails and thumbnails requested by token are not cached.
- Keys whose answer depends on the account include a viewer: `"extension"`, `"anonymous"` or `cookie:<hash>` (never the cookie itself). While cookies rotate, those entries are not cached at all.
- `RobloxMemoryCache` is an in-process implementation that sweeps expired entries once a minute.

### TTLs

Every method has a default TTL (`RobloxDefaultTtl`), used whenever a cache is set. Override per method with `.ttl()`. A TTL of `0` is passed to the store like any other value: `get` and `set` are still called, and the store decides what `0` means (`RobloxMemoryCache` doesn't store it).

| Service | Defaults |
| --- | --- |
| users | `getUsers` 24 h, `getUserDetails` 1 h, `getUsersByNames` 30 min, `getUsernameHistory` 1 h |
| thumbnails | `get` 24 h, `getGameThumbnails` 1 h |
| presence | `get` 30 s |
| games | `getUniverseIds` 30 d, `getServerLocations` 31 d, `getServerAddresses` 30 min, details/media/products 1 h, votes/counts/playability/games 5 min |
| friends | 10 min |
| groups | `getGroups`, `getRoles`, `getRolesByIds` 1 h, `getGroupDetails`, `getUserGroups` 10 min |
| badges | `getBadges` 10 min, `getAwardedDates` 24 h |

## Errors

A request that fails after its retries, on its last available endpoint, throws the underlying vigor-fetch error (`findFetchFailed(error)` digs out the HTTP failure). A response that does not match its schema throws a `ZodError`. APIs that need a pinned account throw before sending anything.

## License

MIT
