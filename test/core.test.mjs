// dist를 대상으로 배처/레이트리밋/캐시 동작을 확인한다. 네트워크는 쓰지 않는다 (fetch를 바꿔 끼운다).
import { test, beforeEach } from "node:test"
import { readFile } from "node:fs/promises"
import assert from "node:assert/strict"
import { vigorRoblox, robloxCacheKey, RobloxPartialError, RobloxMemoryCache, RobloxMemoryCookies, RobloxCookieSchema, RobloxIpAddressSchema, robloxDnrRules } from "../dist/index.js"

/** path → (url, init) => { status, body, headers?, delay? } */
let routes = {}
let calls = []

const realFetch = globalThis.fetch
globalThis.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === "string" ? input : input.url)
    const key = `${init.method ?? "GET"} ${url.host.split(".")[0]}${url.pathname}`
    const reqHeaders = new Headers(init.headers)
    calls.push({ key, url, body: init.body ? JSON.parse(init.body) : undefined, headers: reqHeaders })
    // "*"는 따로 정하지 않은 경로 전부
    const handler = routes[key] ?? routes["*"]
    if (!handler) return realFetch === undefined ? null : new Response(`no mock for ${key}`, { status: 599 })
    const { status = 200, body = {}, headers = {}, delay = 0 } = await handler(url, init.body ? JSON.parse(init.body) : undefined, reqHeaders)
    if (delay) await new Promise(r => setTimeout(r, delay))
    if (status === 204) return new Response(null, { status, headers })
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } })
}

beforeEach(() => {
    routes = {}
    calls = []
})

const count = key => calls.filter(c => c.key === key).length
const PROFILES = "POST apis/user-profile-api/v1/user/profiles/get-profiles"
const USERS = "POST users/v1/users"

const profile = id => ({ userId: id, names: { username: `u${id}`, displayName: `d${id}` }, isVerified: false, isDeleted: false })
const user = id => ({ id, name: `u${id}`, displayName: `d${id}`, hasVerifiedBadge: false })

test("같은 틱의 호출은 경로 한도(200개)에 맞춰 묶인다", async () => {
    routes[PROFILES] = (_, body) => ({ body: { profileDetails: body.userIds.map(profile), errors: [] } })
    const client = vigorRoblox.mode("node")
    const ids = Array.from({ length: 250 }, (_, i) => i + 1)
    const [a, b] = await Promise.all([client.users.getUsers(ids.slice(0, 120)), client.users.getUsers(ids.slice(120))])
    assert.equal(a.length + b.length, 250)
    assert.equal(count(PROFILES), 2)
    assert.deepEqual(calls.map(c => c.body.userIds.length).sort((x, y) => x - y), [50, 200])
})

test("레이트리밋이 아닌 실패(403)는 다음 경로로 넘어간다", async () => {
    routes[PROFILES] = () => ({ status: 403, body: { errors: [{ code: 0, message: "Forbidden" }] } })
    routes[USERS] = (_, body) => ({ body: { data: body.userIds.map(user) } })
    const users = await vigorRoblox.mode("node").users.getUsers([1, 2, 3])
    assert.deepEqual(users.map(u => u.id), [1, 2, 3])
    assert.equal(count(PROFILES), 1)
    assert.equal(count(USERS), 1)
})

test("429는 다른 경로로 다시 보낸다", async () => {
    routes[PROFILES] = () => ({ status: 429, body: {}, headers: { "x-ratelimit-remaining": "0", "x-ratelimit-reset": "30" } })
    routes[USERS] = (_, body) => ({ body: { data: body.userIds.map(user) } })
    const users = await vigorRoblox.mode("node").users.getUsers([7])
    assert.equal(users[0].name, "u7")
})

test("마지막 경로까지 실패하면 그 에러로 reject한다", async () => {
    routes[PROFILES] = () => ({ status: 403, body: {} })
    routes[USERS] = () => ({ status: 400, body: { errors: [{ code: 1, message: "bad" }] } })
    routes["GET users/v1/users/5"] = () => ({ status: 400, body: { errors: [{ code: 1, message: "bad" }] } })
    await assert.rejects(vigorRoblox.mode("node").users.getUsers([5]))
})

test("버킷을 같이 쓰는 다른 배처도 자리가 나면 깨어난다", { timeout: 5000 }, async () => {
    const PRESENCE = "POST presence/v1/presence/users"
    routes[PRESENCE] = (_, body) => ({
        delay: 150,
        body: { userPresences: body.userIds.map(id => ({ userId: id, userPresenceType: 0, lastLocation: null, placeId: null, rootPlaceId: null, gameId: null, universeId: null })) },
    })
    const root = vigorRoblox.mode("node")
    const other = root.as(RobloxCookieSchema.parse("cookie-b"))
    // root가 버킷의 probe 자리(4개)를 다 차지하게 틱을 나눠 보낸다
    const first = []
    for (let i = 0; i < 4; i++) {
        first.push(root.presence.get([i + 1]))
        await new Promise(r => setTimeout(r, 5))
    }
    // other의 배처는 자리가 없어서 기다린다. root의 요청이 끝나면 깨어나야 한다.
    const late = await other.presence.get([99])
    assert.equal(late[0].userId, 99)
    await Promise.all(first)
})

test(".as(cookie)는 같은 쿠키면 같은 클라이언트를 돌려준다", () => {
    const root = vigorRoblox.mode("node")
    const c = RobloxCookieSchema.parse("cookie-a")
    assert.equal(root.as(c), root.as(c))
    assert.notEqual(root.as(c), root.as(RobloxCookieSchema.parse("cookie-b")))
})

test("getServers는 페이지를 자르지 않아 커서로 빠짐없이 이어 받는다", async () => {
    const page = (start, n, next) => ({
        previousPageCursor: null,
        nextPageCursor: next,
        data: Array.from({ length: n }, (_, i) => ({
            id: `00000000-0000-4000-8000-${String(start + i).padStart(12, "0")}`, maxPlayers: 10, playing: 1, playerTokens: [], fps: 60, ping: 50,
        })),
    })
    const handler = url => {
        const cursor = url.searchParams.get("cursor")
        if (!cursor) return { body: page(0, 25, "c1") }
        if (cursor === "c1") return { body: page(25, 25, "c2") }
        return { body: page(50, 25, null) }
    }
    routes["GET games/v1/games/1/servers/Public"] = handler
    routes["GET games/v1/public-server-browser-service/games/1/servers/Public"] = handler
    routes["GET games/v2/games/1/servers/Public"] = handler

    const games = vigorRoblox.mode("node").games
    const first = await games.getServers(1, { count: 30, limit: 25, headshots: false })
    assert.equal(first.data.length, 50)
    const rest = await games.getServers(1, { count: 100, limit: 25, headshots: false, cursor: first.nextPageCursor })
    const ids = new Set([...first.data, ...rest.data].map(s => s.id))
    assert.equal(ids.size, 75)
})

test("TTL이 0이어도 저장소의 get/set은 불린다", async () => {
    routes[PROFILES] = (_, body) => ({ body: { profileDetails: body.userIds.map(profile), errors: [] } })
    const seen = []
    const store = {
        get: (_, info) => { seen.push(["get", info.method]); return undefined },
        set: (_, __, ttl, info) => { seen.push(["set", info.method, ttl]) },
    }
    await vigorRoblox.mode("node").cache(store).ttl({ users: { getUsers: 0 } }).users.getUsers([1])
    assert.deepEqual(seen, [["get", "getUsers"], ["set", "getUsers", 0]])
})

test("RobloxMemoryCache는 TTL이 0 이하인 항목을 저장하지 않는다", () => {
    const cache = new RobloxMemoryCache()
    cache.set("a", { id: 1, upVotes: 1, downVotes: 0 }, 0)
    assert.equal(cache.entries.size, 0)
})

test("RobloxMemoryCache는 만료된 항목을 주기적으로 지운다", async () => {
    const cache = new RobloxMemoryCache(10)
    cache.set("a", { id: 1, upVotes: 1, downVotes: 0 }, 5)
    await new Promise(r => setTimeout(r, 20))
    cache.set("b", { id: 2, upVotes: 1, downVotes: 0 }, 10_000)
    assert.equal(cache.entries.size, 1)
    assert.equal(cache.get("a"), undefined)
    assert.equal(cache.get("b").id, 2)
})

test("robloxDnrRules는 gamejoin UA 규칙만 만든다", () => {
    const [ua, ...rest] = robloxDnrRules()
    assert.equal(rest.length, 0)
    assert.equal(ua.id, 1)
    assert.deepEqual(ua.condition, { requestDomains: ["gamejoin.roblox.com"], resourceTypes: ["xmlhttprequest"] })
    assert.deepEqual(ua.action.requestHeaders, [{ header: "User-Agent", operation: "set", value: "Roblox/WinInet" }])

    const [own] = robloxDnrRules({ firstRuleId: 10, extensionOnly: true })
    assert.equal(own.id, 10)
    assert.deepEqual(own.condition.tabIds, [-1])
})

const cookie = c => RobloxCookieSchema.parse(c)
const sentCookie = call => call.headers.get("cookie")?.replace(".ROBLOSECURITY=", "") ?? null
/** dead 쿠키면 401, 아니면 프로필을 돌려준다 */
const profilesUnless = dead => (_, body, headers) => headers.get("cookie") === `.ROBLOSECURITY=${dead}`
    ? { status: 401, body: { errors: [{ code: 0, message: "Authorization has been denied for this request." }] } }
    : { body: { profileDetails: body.userIds.map(profile), errors: [] } }

test("401을 받은 쿠키는 기본으로 풀에서 빠지고, 요청은 다른 쿠키로 다시 나간다", async () => {
    routes[PROFILES] = profilesUnless("dead")
    const pool = new RobloxMemoryCookies([cookie("dead"), cookie("good")])
    const users = await vigorRoblox.mode("node").cookies(pool).users.getUsers([1])
    assert.equal(users[0].id, 1)
    assert.deepEqual(pool.list(), ["good"])
    assert.deepEqual(calls.filter(c => c.key === PROFILES).map(sentCookie), ["dead", "good"])
})

test("onCookieRejected를 지정하면 기본 처리(풀에서 빼기) 대신 그것만 불린다", async () => {
    routes[PROFILES] = profilesUnless("dead")
    const pool = new RobloxMemoryCookies([cookie("dead"), cookie("good")])
    const rejected = []
    const client = vigorRoblox.mode("node").cookies(pool).onCookieRejected(c => { rejected.push(c) })
    await client.users.getUsers([1])
    assert.deepEqual(rejected, ["dead"])
    assert.deepEqual(pool.list(), ["dead", "good"])
})

test("같은 쿠키로 동시에 401을 받아도 거부 처리는 한 번만 불린다", async () => {
    routes["GET users/v1/users/authenticated"] = () => ({ status: 401, body: { errors: [{ code: 0, message: "Authorization has been denied for this request." }] } })
    let handled = 0
    const me = vigorRoblox.mode("node").onCookieRejected(async () => { handled++; await new Promise(r => setTimeout(r, 50)) }).as(cookie("dead"))
    const results = await Promise.allSettled([me.users.getAuthenticated(), me.users.getAuthenticated()])
    assert.deepEqual(results.map(r => r.status), ["rejected", "rejected"])
    assert.equal(count("GET users/v1/users/authenticated"), 2)
    assert.equal(handled, 1)
})

test("외부 쿠키 저장소는 비동기 next()로 쓴다", async () => {
    routes[PROFILES] = (_, body) => ({ body: { profileDetails: body.userIds.map(profile), errors: [] } })
    const store = { next: async () => cookie("remote") }
    await vigorRoblox.mode("node").cookies(store).users.getUsers([1])
    assert.equal(sentCookie(calls.find(c => c.key === PROFILES)), "remote")
})

test("레이트리밋 저장소: 처음 쓸 때 읽은 한도를 따르고, 응답으로 바뀐 상태를 기록한다", async () => {
    routes[PROFILES] = (_, body) => ({ body: { profileDetails: body.userIds.map(profile), errors: [] } })
    routes[USERS] = (_, body) => ({ body: { data: body.userIds.map(user) }, headers: { "x-ratelimit-remaining": "9", "x-ratelimit-reset": "30" } })
    const saved = new Map()
    const store = {
        // 다른 탭이 프로필 경로의 한도를 이미 다 쓴 상태
        get: async key => key.includes("get-profiles") ? { remaining: 0, resetAt: Date.now() + 60_000, strikes: 0 } : undefined,
        set: (key, state) => { saved.set(key, state) },
    }
    const users = await vigorRoblox.mode("node").rateLimits(store).users.getUsers([1])
    assert.equal(users[0].id, 1)
    assert.equal(count(PROFILES), 0)
    assert.equal(count(USERS), 1)
    await new Promise(r => setTimeout(r, 0))
    assert.equal(saved.get("users POST /v1/users").remaining, 9)
})

test("레이트리밋 저장소의 watch로 받은 상태는 더 보수적인 쪽으로 합친다", async () => {
    routes[PROFILES] = (_, body) => ({ body: { profileDetails: body.userIds.map(profile), errors: [] }, headers: { "x-ratelimit-remaining": "50", "x-ratelimit-reset": "30" } })
    routes[USERS] = (_, body) => ({ body: { data: body.userIds.map(user) } })
    let push
    const store = { get: () => undefined, set: () => {}, watch: fn => { push = fn } }
    const client = vigorRoblox.mode("node").rateLimits(store)
    await client.users.getUsers([1])
    push("apis POST /user-profile-api/v1/user/profiles/get-profiles", { remaining: 0, resetAt: Date.now() + 60_000, strikes: 1 })
    await client.users.getUsers([2])
    assert.equal(count(PROFILES), 1)
    assert.equal(count(USERS), 1)
})

test("배지 획득 날짜: 묶음이 403(Challenge)으로 막히면 하나씩으로 넘어가고, 받지 않은 배지(204)는 null이다", async () => {
    routes["GET badges/v1/users/1/badges/awarded-dates"] = () => ({ status: 403, body: { errors: [{ code: 0, message: "Challenge is required to authorize the request" }] } })
    routes["GET badges/v1/users/1/badges/10/awarded-date"] = () => ({ body: { badgeId: 10, awardedDate: "2020-01-01T00:00:00Z" } })
    routes["GET badges/v1/users/1/badges/20/awarded-date"] = () => ({ status: 204 })
    const result = await vigorRoblox.mode("node").badges.getAwardedDates(1, [10, 20])
    assert.deepEqual(result, [{ badgeId: 10, awardedDate: "2020-01-01T00:00:00Z" }, { badgeId: 20, awardedDate: null }])
    assert.equal(count("GET badges/v1/users/1/badges/awarded-dates"), 1)
})

test("배지 획득 날짜: 같은 유저의 배지는 100개씩 묶어 보낸다", async () => {
    routes["GET badges/v1/users/1/badges/awarded-dates"] = url => ({
        body: { data: url.searchParams.get("badgeIds").split(",").filter(id => id % 2 === 0).map(id => ({ badgeId: Number(id), awardedDate: "2020-01-01T00:00:00Z" })) },
    })
    const ids = Array.from({ length: 150 }, (_, i) => i + 1)
    const result = await vigorRoblox.mode("node").badges.getAwardedDates(1, ids)
    assert.equal(result.length, 150)
    assert.equal(result.filter(r => r.awardedDate).length, 75)
    assert.deepEqual(calls.map(c => c.url.searchParams.get("badgeIds").split(",").length).sort((a, b) => a - b), [50, 100])
})

test("403 \"User is moderated\"도 쿠키 거부로 처리하고 이유를 넘긴다. 다른 403은 거부가 아니다", async () => {
    routes[PROFILES] = (_, body, headers) => {
        const sent = headers.get("cookie")
        if (sent === ".ROBLOSECURITY=banned") return { status: 403, body: { errors: [{ code: 0, message: "User is moderated" }] } }
        return { body: { profileDetails: body.userIds.map(profile), errors: [] } }
    }
    const seen = []
    const pool = new RobloxMemoryCookies([cookie("banned"), cookie("good")])
    const client = vigorRoblox.mode("node").cookies(pool).onCookieRejected((c, reason) => { seen.push([c, reason]); pool.remove(c) })
    const users = await client.users.getUsers([1])
    assert.equal(users[0].id, 1)
    assert.deepEqual(seen, [["banned", "moderated"]])
    assert.deepEqual(pool.list(), ["good"])

    routes["GET users/v1/users/authenticated"] = () => ({ status: 403, body: { errors: [{ code: 0, message: "Forbidden" }] } })
    await assert.rejects(client.as(cookie("good")).users.getAuthenticated())
    assert.equal(seen.length, 1)
})

test("geolocation 콜백은 캐시에 없는 IP만 중복 없이 한 번에 받고, 돌려준 값을 그대로 쓴다. null을 준 IP는 빠진다", async () => {
    const asked = []
    const made = new Map()
    const geolocate = ips => {
        asked.push([...ips])
        return ips.map(ip => {
            if (ip === "10.0.0.3") return null
            const location = { countryCode: ip === "10.0.0.1" ? "US" : "KR", extra: { asn: 22697 } }
            made.set(ip, location)
            return location
        })
    }
    const ip = s => RobloxIpAddressSchema.parse(s)
    const games = vigorRoblox.mode("node").geolocation(geolocate).cache(new RobloxMemoryCache()).games
    const first = await games.getServerLocations([ip("10.0.0.1"), ip("10.0.0.2"), ip("10.0.0.1"), ip("10.0.0.3")])
    assert.deepEqual(first.map(l => [l.ip, l.location.countryCode]), [["10.0.0.1", "US"], ["10.0.0.2", "KR"], ["10.0.0.1", "US"]])
    assert.equal(first[0].location, made.get("10.0.0.1"))
    await games.getServerLocations([ip("10.0.0.2"), ip("10.0.0.4")])
    assert.deepEqual(asked, [["10.0.0.1", "10.0.0.2", "10.0.0.3"], ["10.0.0.4"]])
})

test("geolocation 콜백이 없으면 위치를 물을 때 에러", async () => {
    await assert.rejects(vigorRoblox.mode("node").games.getServerLocations([RobloxIpAddressSchema.parse("10.0.0.1")]), /geolocation/)
})

test("같은 IP를 동시에 물으면 진행 중인 조회를 같이 기다리고 콜백에 다시 넘기지 않는다", async () => {
    const asked = []
    const geolocate = async ips => {
        asked.push([...ips])
        await new Promise(r => setTimeout(r, 30))
        return ips.map(ip => ({ country: ip.endsWith("1") ? "US" : "KR" }))
    }
    const ip = s => RobloxIpAddressSchema.parse(s)
    const games = vigorRoblox.mode("node").geolocation(geolocate).games
    const [a, b] = await Promise.all([
        games.getServerLocations([ip("10.0.0.1"), ip("10.0.0.2")]),
        games.getServerLocations([ip("10.0.0.2"), ip("10.0.0.3")]),
    ])
    assert.deepEqual(asked, [["10.0.0.1", "10.0.0.2"], ["10.0.0.3"]])
    assert.deepEqual(b.map(l => [l.ip, l.location.country]), [["10.0.0.2", "KR"], ["10.0.0.3", "KR"]])
    assert.equal(a[1].location, b[0].location)
    // 끝나면 지우므로 다음 조회는 다시 묻는다 (캐시가 없을 때)
    await games.getServerLocations([ip("10.0.0.1")])
    assert.deepEqual(asked.at(-1), ["10.0.0.1"])
})

test("캐시되는 조회는 같은 키를 동시에 물으면 저장소 조회와 요청을 한 번만 한다", async () => {
    routes["GET users/v1/users/1/username-history"] = () => ({ delay: 20, body: { previousPageCursor: null, nextPageCursor: null, data: [{ name: "a" }] } })
    let gets = 0
    const store = {
        get: async () => { gets++; await new Promise(r => setTimeout(r, 10)); return undefined },
        set: () => {},
    }
    const users = vigorRoblox.mode("node").cache(store).users
    const [x, y] = await Promise.all([users.getUsernameHistory(1), users.getUsernameHistory(1)])
    assert.equal(x, y)
    assert.equal(gets, 1)
    assert.equal(count("GET users/v1/users/1/username-history"), 1)
})

test("서버 페이지: Public은 쿠키를 돌려 써도 캐시하고, 기본 serverType과 명시한 Public은 같은 키다. Friend는 로테이션 중이면 캐시하지 않는다", async () => {
    const empty = { previousPageCursor: null, nextPageCursor: null, data: [] }
    for (const type of ["Public", "Friend"]) {
        routes[`GET games/v1/games/1/servers/${type}`] = () => ({ body: empty })
        routes[`GET games/v1/public-server-browser-service/games/1/servers/${type}`] = () => ({ body: empty })
        routes[`GET games/v2/games/1/servers/${type}`] = () => ({ body: empty })
    }
    const servers = key => calls.filter(c => c.key.endsWith(key)).length
    const cookies = ["cookie-a", "cookie-b"].map(c => RobloxCookieSchema.parse(c))
    const games = vigorRoblox.mode("node").cookies(cookies).cache(new RobloxMemoryCache()).games

    await games.getServerPage(1)
    await games.getServerPage(1, { serverType: "Public" })
    assert.equal(servers("/servers/Public"), 1)

    await games.getServerPage(1, { serverType: "Friend" })
    await games.getServerPage(1, { serverType: "Friend" })
    assert.equal(servers("/servers/Friend"), 2)
})

test("캐시 키: \"<버전>:<서비스>.<메서드>::<해시>\"이고, 인자의 필드 순서와 undefined 필드는 키에 영향이 없다. 위치 조회에는 버전이 없다", async () => {
    const { version } = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"))
    const a = await robloxCacheKey({ service: "users", method: "getUsernameHistory", userId: 1, query: { limit: 10, sortOrder: "Asc" } })
    const b = await robloxCacheKey({ query: { sortOrder: "Asc", cursor: undefined, limit: 10 }, method: "getUsernameHistory", userId: 1, service: "users" })
    assert.equal(a, b)
    assert.ok(a.startsWith(`${version}:users.getUsernameHistory::`))
    assert.match(a, /::[A-Za-z0-9_-]{22}$/)
    assert.notEqual(a, await robloxCacheKey({ service: "users", method: "getUsernameHistory", userId: 2, query: { limit: 10, sortOrder: "Asc" } }))
    assert.match(await robloxCacheKey({ service: "games", method: "getServerLocations", ip: "10.0.0.1" }), /^games\.getServerLocations::[A-Za-z0-9_-]{22}$/)
})

test("저장소는 라이브러리가 만든 키와 정리된 분류 데이터를 받는다", async () => {
    routes["GET users/v1/users/1/username-history"] = () => ({ body: { previousPageCursor: null, nextPageCursor: null, data: [{ name: "a" }] } })
    const seen = []
    const store = { get: (key, info) => { seen.push({ key, info }); return undefined }, set: () => {} }
    await vigorRoblox.mode("node").cache(store).users.getUsernameHistory(1, { sortOrder: "Asc", cursor: undefined, limit: 10 })
    assert.deepEqual(seen[0].info, { method: "getUsernameHistory", query: { limit: 10, sortOrder: "Asc" }, service: "users", userId: 1 })
    assert.equal(seen[0].key, await robloxCacheKey(seen[0].info))
})


test("일부 항목이 실패하면 받은 결과를 담아 RobloxPartialError를 던진다", async () => {
    routes["GET friends/v1/users/1/friends/count"] = () => ({ body: { count: 10 } })
    routes["GET friends/v1/users/2/friends/count"] = () => ({ status: 403, body: { errors: [{ code: 0, message: "Forbidden" }] } })
    routes["GET friends/v1/users/3/friends/count"] = () => ({ body: { count: 30 } })
    const error = await vigorRoblox.mode("node").friends.getFriendCounts([1, 2, 3]).then(() => null, e => e)
    assert.ok(error instanceof RobloxPartialError)
    assert.deepEqual(error.results, [{ userId: 1, count: 10 }, { userId: 3, count: 30 }])
    assert.deepEqual(error.errors.map(e => e.input), [2])
})

test("곁들이는 썸네일을 받지 못하면 thumbnail만 null이고 유저는 그대로 돌려준다", async () => {
    routes[PROFILES] = (_, body) => ({ body: { profileDetails: body.userIds.map(profile), errors: [] } })
    routes["*"] = () => ({ status: 403, body: { errors: [{ code: 0, message: "Forbidden" }] } })
    const users = await vigorRoblox.mode("node").users.getUsers([1, 2], { thumbnail: true })
    assert.deepEqual(users.map(u => [u.id, u.thumbnail]), [[1, null], [2, null]])
})

test("친구 서버 목록의 players(유저 id)를 버리지 않고, findUsers는 그 id로 바로 찾는다", async () => {
    const server = { id: "00000000-0000-4000-8000-000000000001", maxPlayers: 10, playing: 2, playerTokens: ["t1", "t2"], fps: 60, ping: 50,
        players: [{ playerToken: "t1", id: 42, name: "u42", displayName: "d42" }] }
    const handler = () => ({ body: { previousPageCursor: null, nextPageCursor: null, data: [server] } })
    routes["GET games/v1/games/1/servers/Friend"] = handler
    routes["GET games/v1/public-server-browser-service/games/1/servers/Friend"] = handler
    routes["GET games/v2/games/1/servers/Friend"] = handler
    // 대상 헤드샷은 기본 아바타라 헤드샷으로는 찾을 수 없다
    routes["POST thumbnails/v1/batch"] = (_, body) => ({ body: { data: body.map(r => ({
        requestId: r.requestId, targetId: r.targetId ?? 0, state: "Completed", errorCode: 0, errorMessage: "", version: null,
        imageUrl: "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-5816BB6B457A7A2FD8F0299D6F79DADF-Png/150/150/AvatarHeadshot/Png/noFilter",
    })) } })

    const client = vigorRoblox.mode("node").cookies(new RobloxMemoryCookies([RobloxCookieSchema.parse("cookie-a")]))
    const page = await client.games.getServerPage(1, { serverType: "Friend" })
    // 토큰은 돌려주지 않고, 플레이어마다 헤드샷을 붙인다. 이름이 나온 플레이어는 유저 id로 받는다
    assert.ok(!("playerTokens" in page.data[0]))
    assert.deepEqual(page.data[0].players.map(p => p.user), [{ id: 42, name: "u42", displayName: "d42" }, null])
    assert.ok(page.data[0].players.every(p => p.thumbnail?.state === "Completed"))
    const requested = calls.filter(c => c.key === "POST thumbnails/v1/batch").flatMap(c => c.body)
    assert.ok(requested.some(r => r.targetId === 42) && requested.some(r => r.token === "t2") && !requested.some(r => r.token === "t1"))

    const [found] = await client.games.findUsers(1, [42], { serverType: "Friend", presence: false })
    assert.equal(found.foundBy, "server")
    assert.equal(found.jobId, server.id)
})

