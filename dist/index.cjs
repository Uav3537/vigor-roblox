"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createRobloxApi: () => createRobloxApi
});
module.exports = __toCommonJS(index_exports);
var import_vigor_fetch = require("vigor-fetch");
function isFetchFailed(cause) {
  return cause instanceof import_vigor_fetch.VigorFetchError && cause.code === "FETCH_FAILED" && cause.data != null;
}
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
function partition(arr, pred) {
  const pass = [], fail = [];
  for (const item of arr) (pred(item) ? pass : fail).push(item);
  return { pass, fail };
}
function makeRateLimiter(opts) {
  const { limit, windowMs } = opts;
  const queue = [];
  let count = 0;
  let windowStart = Date.now();
  let timer = null;
  function drain() {
    const now = Date.now();
    if (now - windowStart >= windowMs) {
      windowStart = now;
      count = 0;
    }
    while (queue.length > 0 && count < limit) {
      count++;
      const next = queue.shift();
      next();
    }
    if (queue.length > 0 && timer == null) {
      const delay = Math.max(0, windowMs - (Date.now() - windowStart));
      timer = setTimeout(() => {
        timer = null;
        drain();
      }, delay);
    }
  }
  return function schedule(fn) {
    return new Promise((resolve, reject) => {
      queue.push(() => {
        fn().then(resolve, reject);
      });
      drain();
    });
  };
}
var gamesServersRateLimiter = makeRateLimiter({ limit: 20, windowMs: 60 * 1e3 });
var friendsApiRateLimiter = makeRateLimiter({ limit: 20, windowMs: 60 * 1e3 });
var CsrfTokenManager = class {
  tokenMap = /* @__PURE__ */ new Map();
  pendingMap = /* @__PURE__ */ new Map();
  get(cookie) {
    return this.tokenMap.get(cookie) ?? null;
  }
  set(cookie, token) {
    this.tokenMap.set(cookie, token);
  }
  invalidate(cookie) {
    this.tokenMap.delete(cookie);
  }
  async refresh(cookie) {
    const existing = this.pendingMap.get(cookie);
    if (existing) return existing;
    const pending = (async () => {
      try {
        const response = await fetch("https://accountinformation.roblox.com/v1/description", {
          method: "POST",
          headers: {
            "Cookie": `.ROBLOSECURITY=${cookie}`,
            "User-Agent": "Roblox/WinInet",
            "Content-Type": "application/json",
            "Content-Length": "2"
          },
          body: "{}"
        });
        const token = response.headers.get("x-csrf-token");
        if (!token) throw new Error("CSRF token not found in response headers");
        this.tokenMap.set(cookie, token);
        return token;
      } finally {
        this.pendingMap.delete(cookie);
      }
    })();
    this.pendingMap.set(cookie, pending);
    return pending;
  }
  async getOrRefresh(cookie) {
    const cached = this.get(cookie);
    if (cached) return cached;
    return this.refresh(cookie);
  }
};
function createRobloxApi({
  cache,
  cookies: cookiesList,
  ipgeolocationKey
}) {
  const cookiePool = cookiesList.map((cookie) => ({ cookie, lastUsed: 0 }));
  const csrfManager = new CsrfTokenManager();
  function pickCookie() {
    const entry = cookiePool.reduce((a, b) => a.lastUsed < b.lastUsed ? a : b);
    entry.lastUsed = Date.now();
    return entry.cookie;
  }
  function makeHeaderMiddlewares(opts) {
    const { getCookie, winInet = false, csrf = false } = opts;
    let builder = import_vigor_fetch.vigor.builders.fetch.middlewares().before("intercept", async (ctx, api) => {
      const cookie = getCookie();
      ctx.record.cookie = cookie;
      const headers = {
        Cookie: `.ROBLOSECURITY=${cookie}`
      };
      if (winInet) headers["User-Agent"] = "Roblox/WinInet";
      if (csrf) headers["X-CSRF-Token"] = await csrfManager.getOrRefresh(cookie);
      api.setHeaders(headers);
      return ctx;
    });
    if (csrf) {
      builder = builder.onError("intercept", async (ctx, api) => {
        const cause = ctx.error;
        if (isFetchFailed(cause) && cause.data.status === 403) {
          const cookie = ctx.record.cookie ?? getCookie();
          const newToken = cause.data.response.headers.get("x-csrf-token");
          if (newToken) {
            csrfManager.set(cookie, newToken);
          } else {
            csrfManager.invalidate(cookie);
            await csrfManager.refresh(cookie);
          }
          api.proceedRestart();
        }
        return ctx;
      });
    }
    return builder;
  }
  function pickKey(key) {
    return import_vigor_fetch.vigor.builders.fetch.middlewares().after("intercept", async (ctx, api) => {
      api.setResult(ctx.result[key]);
      return ctx;
    });
  }
  const dataInterceptor = pickKey("data");
  const poolCookieMiddlewares = makeHeaderMiddlewares({ getCookie: pickCookie });
  const poolCookieWinInetMiddlewares = makeHeaderMiddlewares({ getCookie: pickCookie, winInet: true });
  const poolCookieCsrfMiddlewares = makeHeaderMiddlewares({ getCookie: pickCookie, winInet: true, csrf: true });
  const usersApi = import_vigor_fetch.vigor.fetch("https://users.roblox.com/v1").middlewares(poolCookieWinInetMiddlewares).retry(
    (r) => r.settings((s) => s.maxAttempts(7)).algorithms((a) => a.backoff({ initial: 200, unit: 800, multiplier: 1.7 }))
  );
  const thumbnailsApi = import_vigor_fetch.vigor.fetch("https://thumbnails.roblox.com/v1").middlewares(poolCookieWinInetMiddlewares).retry(
    (r) => r.settings((s) => s.maxAttempts(5)).algorithms((a) => a.backoff({ initial: 1e3, multiplier: 2.5 }))
  );
  const gamesApi = import_vigor_fetch.vigor.fetch("https://games.roblox.com/v1").middlewares(poolCookieMiddlewares).retry(
    (r) => r.settings((s) => s.maxAttempts(5)).algorithms((a) => a.backoff({ initial: 1e3, multiplier: 2.5 }))
  );
  const presenceApi = import_vigor_fetch.vigor.fetch("https://presence.roblox.com/v1").middlewares(poolCookieMiddlewares).retry(
    (r) => r.settings((s) => s.maxAttempts(5)).algorithms((a) => a.backoff({ initial: 500, multiplier: 2 }))
  );
  const apisRoblox = import_vigor_fetch.vigor.fetch("https://apis.roblox.com").middlewares(poolCookieMiddlewares).retry(
    (r) => r.settings((s) => s.maxAttempts(5)).algorithms((a) => a.backoff({ initial: 1e3, multiplier: 2 }))
  );
  const gamejoinApi = import_vigor_fetch.vigor.fetch("https://gamejoin.roblox.com/v1").middlewares(poolCookieWinInetMiddlewares).retry(
    (r) => r.settings((s) => s.maxAttempts(7)).algorithms((a) => a.backoff({ initial: 500, multiplier: 1.5 }))
  );
  const ipgeolocationApi = import_vigor_fetch.vigor.fetch("https://api.ipgeolocation.io").retry(
    (r) => r.settings((s) => s.maxAttempts(4)).algorithms((a) => a.backoff({ initial: 500, multiplier: 2 }))
  );
  const friendsApi = import_vigor_fetch.vigor.fetch("https://friends.roblox.com/v1").middlewares(poolCookieCsrfMiddlewares).retry(
    (r) => r.settings((s) => s.maxAttempts(5)).algorithms((a) => a.backoff({ initial: 500, multiplier: 2 }))
  );
  async function withCache(opts) {
    const { type, keys, ttlMs, getKey, fetchMissing, fallback } = opts;
    const cached = await cache.select(type, keys);
    const cacheMap = new Map(cached.map(({ separator, data }) => [separator, data]));
    const missing = keys.filter((k) => !cacheMap.has(k));
    if (missing.length > 0) {
      const fetched = await fetchMissing(missing);
      await cache.upsert(type, ttlMs, fetched.map((item) => ({ separator: getKey(item), data: item })));
      fetched.forEach((item) => cacheMap.set(getKey(item), item));
    }
    return keys.map((k) => cacheMap.get(k) ?? fallback);
  }
  async function authenticated(cookies) {
    const results = await import_vigor_fetch.vigor.all(...cookies.map((cookie) => async () => {
      const base = usersApi.middlewares(makeHeaderMiddlewares({ getCookie: () => cookie, winInet: true }));
      const [user, description, birthdate, gender, ageBracket, countryCode, roles] = await Promise.allSettled([
        base.path("users", "authenticated").request(),
        base.path("description").request(),
        base.path("birthdate").request(),
        base.path("gender").request(),
        base.path("users", "authenticated", "age-bracket").request(),
        base.path("users", "authenticated", "country-code").request(),
        base.path("users", "authenticated", "roles").request()
      ]);
      if (user.status === "rejected") throw user.reason;
      return {
        ...user.value,
        ...description.status === "fulfilled" ? description.value : {},
        ...birthdate.status === "fulfilled" ? birthdate.value : {},
        ...gender.status === "fulfilled" ? gender.value : {},
        ...ageBracket.status === "fulfilled" ? ageBracket.value : {},
        ...countryCode.status === "fulfilled" ? countryCode.value : {},
        ...roles.status === "fulfilled" ? roles.value : {}
      };
    })).request();
    return results;
  }
  async function usersSimple(userIds) {
    return withCache({
      type: "usersSimple",
      keys: userIds.map(String),
      ttlMs: 30 * 60 * 1e3,
      getKey: (item) => String(item.id),
      fallback: {},
      fetchMissing: async (missing) => {
        const grouped = await import_vigor_fetch.vigor.all(
          ...chunk(missing.map(Number), 100).map(
            (group) => () => usersApi.path("users").body("overwrite", { userIds: group, excludeBannedUsers: false }).middlewares(dataInterceptor).request()
          )
        ).request();
        const results = grouped.flat();
        return results.filter((u) => u.id != null && u.name != null && u.displayName != null);
      }
    });
  }
  async function users(userIds) {
    return withCache({
      type: "users",
      keys: userIds.map(String),
      ttlMs: 60 * 60 * 1e3,
      getKey: (item) => String(item.id),
      fallback: {},
      fetchMissing: async (missing) => {
        const results = await import_vigor_fetch.vigor.all(
          ...missing.map((id) => () => usersApi.path("users", id).request())
        ).settings((s) => s.concurrency(2)).request();
        return results.filter(
          (u) => u.id != null && u.name != null && u.displayName != null && u.description != null
        );
      }
    });
  }
  async function usersByName(usernames) {
    return withCache({
      type: "usernames",
      keys: usernames,
      ttlMs: 30 * 60 * 1e3,
      getKey: (item) => item.requestedUsername ?? item.name,
      fallback: {},
      fetchMissing: async (missing) => {
        const grouped = await import_vigor_fetch.vigor.all(
          ...chunk(missing, 100).map(
            (group) => () => usersApi.path("usernames", "users").body("overwrite", { usernames: group, excludeBannedUsers: false }).middlewares(dataInterceptor).request()
          )
        ).request();
        const results = grouped.flat();
        return results.filter((u) => u.id != null && u.name != null && u.displayName != null);
      }
    });
  }
  async function presence(userIds) {
    const grouped = await import_vigor_fetch.vigor.all(
      ...chunk(userIds, 50).map(
        (group) => () => presenceApi.path("presence", "users").body("overwrite", { userIds: group }).middlewares(pickKey("userPresences")).request()
      )
    ).request();
    return grouped.flat();
  }
  function thumbnailCacheKey(t) {
    const base = t.targetId ? `id:${t.targetId}` : `token:${t.token}`;
    return `${base}:${t.type}:${t.size}:${t.format}`;
  }
  async function fetchThumbnailFallback(targets) {
    const byUserId = targets.filter(
      (t) => t.targetId != null
    );
    if (byUserId.length === 0) return /* @__PURE__ */ new Map();
    const groups = /* @__PURE__ */ new Map();
    for (const t of byUserId) {
      const key = `${t.size}:${t.format}:${t.isCircular ?? false}`;
      const list = groups.get(key) ?? [];
      list.push(t);
      groups.set(key, list);
    }
    const resultMap = /* @__PURE__ */ new Map();
    await import_vigor_fetch.vigor.all(
      ...Array.from(groups.values()).flatMap(
        (group) => chunk(group, 100).map((part) => async () => {
          try {
            const res = await thumbnailsApi.path("users", "avatar-headshot").query({
              userIds: part.map((t) => t.targetId).join(","),
              size: part[0].size,
              format: part[0].format,
              isCircular: part[0].isCircular ?? false,
              includeBackground: false
            }).middlewares(dataInterceptor).request();
            const byTargetId = new Map(res.map((r) => [r.targetId, r]));
            part.forEach((t) => {
              const found = byTargetId.get(t.targetId);
              if (found) resultMap.set(t.requestId, found);
            });
          } catch {
          }
        })
      )
    ).settings((s) => s.concurrency(5)).request();
    return resultMap;
  }
  async function thumbnailAssets(opts) {
    const { assetIds, size = "150x150", format = "Png" } = opts;
    const targets = assetIds.map((id) => ({ targetId: id, type: "Asset", size, format }));
    return withCache({
      type: "thumbnailAssets",
      keys: targets.map(thumbnailCacheKey),
      ttlMs: 6 * 60 * 60 * 1e3,
      getKey: (item) => thumbnailCacheKey(item),
      fallback: { url: null },
      fetchMissing: async (missingKeys) => {
        const missingTargets = targets.filter((t) => missingKeys.includes(thumbnailCacheKey(t)));
        const missingIds = missingTargets.map((t) => t.targetId);
        const grouped = await import_vigor_fetch.vigor.all(
          ...chunk(missingIds, 100).map(
            (group) => () => thumbnailsApi.path("assets").query({ assetIds: group.join(","), size, format }).middlewares(dataInterceptor).request()
          )
        ).request();
        const results = grouped.flat().map((t) => ({
          ...t,
          type: "Asset",
          size,
          format,
          url: t.state === "Completed" ? t.imageUrl : null
        }));
        return results.filter((r) => r.state === "Completed");
      }
    });
  }
  async function thumbnailsBatch(targets, formatDefaults = {}) {
    const defaults = {
      type: "AvatarHeadShot",
      size: "150x150",
      format: "Png",
      isCircular: false,
      ...formatDefaults
    };
    const withDefaults = targets.map((t) => ({ ...defaults, ...t }));
    return withCache({
      type: "thumbnails",
      keys: withDefaults.map(thumbnailCacheKey),
      ttlMs: 6 * 60 * 60 * 1e3,
      getKey: (item) => thumbnailCacheKey(item),
      fallback: { url: null },
      fetchMissing: async (missingKeys) => {
        const missingTargets = withDefaults.filter((t) => missingKeys.includes(thumbnailCacheKey(t)));
        const batch = missingTargets.map((t, i) => ({ ...t, requestId: String(i) }));
        const batchMap = new Map(batch.map((t) => [t.requestId, t]));
        const grouped = await import_vigor_fetch.vigor.all(
          ...chunk(batch, 100).map(
            (group) => () => thumbnailsApi.path("batch").body("overwrite", group).middlewares(dataInterceptor).request()
          )
        ).request();
        const results = grouped.flat();
        const resultByRequestId = new Map(results.map((r) => [r.requestId, r]));
        const needsFallback = batch.filter((t) => {
          const r = resultByRequestId.get(t.requestId);
          return !r || r.state !== "Completed";
        });
        if (needsFallback.length > 0) {
          const fallbackMap = await fetchThumbnailFallback(needsFallback);
          fallbackMap.forEach((raw, requestId) => resultByRequestId.set(requestId, { ...raw, requestId }));
        }
        const merged = batch.map((t) => {
          const item = resultByRequestId.get(t.requestId);
          const original = batchMap.get(t.requestId) ?? {};
          if (!item) {
            return { ...original, url: null, state: "Error", version: "" };
          }
          const { requestId: _rid, ...rest } = item;
          return {
            ...original,
            ...rest,
            url: rest.state === "Completed" ? rest.imageUrl : null
          };
        });
        return merged.filter((m) => m.state === "Completed");
      }
    });
  }
  const SERVERS_SIMPLE_CACHE_TTL_MS = 5 * 1e3;
  async function serversSimple(opts) {
    const { placeId, count = 1, serverType = "Public", cursor, thumbnailFormat } = opts;
    const cacheKey = `${placeId}:${serverType}:${count}:${cursor ?? ""}`;
    const [result] = await withCache({
      type: "serversSimple",
      keys: [cacheKey],
      ttlMs: SERVERS_SIMPLE_CACHE_TTL_MS,
      getKey: () => cacheKey,
      fallback: { previousPageCursor: null, nextPageCursor: null, data: [] },
      fetchMissing: async () => {
        let nextCursor = cursor ?? null;
        let prevCursor = null;
        const rawData = [];
        for (let i = 0; i < count; i++) {
          const page = await gamesServersRateLimiter(
            () => gamesApi.path("games", placeId, "servers", serverType).query({ limit: 100, ...nextCursor ? { cursor: nextCursor } : {} }).request()
          );
          if (i === 0) prevCursor = page.previousPageCursor;
          nextCursor = page.nextPageCursor;
          rawData.push(...page.data);
          if (!nextCursor) break;
        }
        const thumbTargets = rawData.flatMap((s) => s.playerTokens.map((token) => ({ token, type: "AvatarHeadShot", size: "150x150", format: "Png", ...thumbnailFormat })));
        const thumbResults = await thumbnailsBatch(thumbTargets, thumbnailFormat);
        const thumbMap = new Map(thumbResults.map((t) => [t.token, t.url]));
        return [{
          previousPageCursor: prevCursor,
          nextPageCursor: nextCursor,
          data: rawData.map((s) => ({
            jobId: s.id,
            maxPlayers: s.maxPlayers,
            playing: s.playing,
            fps: s.fps,
            ping: s.ping,
            playerImgs: s.playerTokens.map((tok) => thumbMap.get(tok)).filter((url) => url != null)
          }))
        }];
      }
    });
    return result;
  }
  async function servers(opts) {
    const result = await serversSimple(opts);
    const jobIds = result.data.map((s) => s.jobId);
    const locationList = await serversRegion({ placeId: opts.placeId, jobIds }).catch(() => []);
    const locationMap = new Map(locationList.map((l) => [l.jobId, l]));
    return {
      ...result,
      data: result.data.map((s) => ({
        ...s,
        location: locationMap.get(s.jobId) ?? null
      }))
    };
  }
  async function placeInfo(placeIds) {
    return withCache({
      type: "placeInfo",
      keys: placeIds.map(String),
      ttlMs: 60 * 60 * 1e3,
      getKey: (item) => String(item.placeId),
      fallback: {},
      fetchMissing: async (missing) => {
        const universeEntries = await import_vigor_fetch.vigor.all(
          ...missing.map(
            (placeId) => () => apisRoblox.path("universes", "v1", "places", placeId, "universe").middlewares(
              import_vigor_fetch.vigor.builders.fetch.middlewares().after("intercept", async (ctx, api) => {
                const r = ctx.result;
                api.setResult({ placeId: Number(placeId), universeId: r?.universeId ?? null });
                return ctx;
              })
            ).request()
          )
        ).request();
        const metaList = await import_vigor_fetch.vigor.all(
          ...universeEntries.map(({ placeId, universeId }) => async () => {
            if (!universeId) return { placeId, universeId: null, info: null, assetIds: [] };
            const [details, media] = await Promise.all([
              gamesApi.path("games").query({ universeIds: universeId }).middlewares(dataInterceptor).request(),
              gamesApi.path("games", universeId, "media").middlewares(dataInterceptor).request()
            ]);
            return {
              placeId,
              universeId,
              info: details?.[0] ?? null,
              assetIds: (media ?? []).map((m) => m.imageId).filter((id) => id != null)
            };
          })
        ).request();
        const allAssetIds = [...new Set(metaList.flatMap((m) => m.assetIds))];
        const assetUrlMap = /* @__PURE__ */ new Map();
        if (allAssetIds.length > 0) {
          const thumbs = await thumbnailAssets({ assetIds: allAssetIds, size: "768x432", format: "Png" });
          thumbs.forEach((t) => {
            if (t.targetId != null && t.url) assetUrlMap.set(t.targetId, t.url);
          });
        }
        return metaList.map(({ placeId, universeId, info, assetIds }) => ({
          ...info ?? {},
          placeId,
          universeId,
          logos: assetIds.map((id) => assetUrlMap.get(id)).filter((u) => u != null)
        }));
      }
    });
  }
  async function usersSimpleWithImg(userIds) {
    const [userList, thumbs] = await Promise.all([
      usersSimple(userIds),
      thumbnailsBatch(userIds.map((id) => ({ targetId: id })))
    ]);
    const imgMap = new Map(thumbs.map((t) => [t.targetId, t.url]));
    return userList.map((u) => ({ ...u, img: imgMap.get(u.id) ?? null }));
  }
  async function usersWithImg(userIds) {
    const [userList, thumbs] = await Promise.all([
      users(userIds),
      thumbnailsBatch(userIds.map((id) => ({ targetId: id })))
    ]);
    const imgMap = new Map(thumbs.map((t) => [t.targetId, t.url]));
    return userList.map((u) => ({ ...u, img: imgMap.get(u.id) ?? null }));
  }
  async function track(opts) {
    const { placeId, targets } = opts;
    const { pass: rawIds, fail: names } = partition(targets, (t) => !Number.isNaN(Number(t)));
    const resolvedIds = (await usersByName(names)).map((u) => u.id);
    const idList = [...rawIds.map(Number), ...resolvedIds];
    const [userList, serverResult, thumbs] = await Promise.all([
      usersSimple(idList),
      serversSimple({ placeId, count: 20 }),
      thumbnailsBatch(idList.map((id) => ({ targetId: id })))
    ]);
    const thumbnailsMap = new Map(thumbs.map((t) => [t.targetId, t.url]));
    const defaultHashes = /* @__PURE__ */ new Set([
      "5816BB6B457A7A2FD8F0299D6F79DADF",
      "D517857E5CC51E2FF93E63E20241169E",
      "56DFC0F87BABBE49C6D1BE708AE9A66A",
      "C16BE31B5A403C45279B3FF5533980E9",
      "51E47F0C53DA3A617158586DF73B1236",
      "ACCF91F734E311F4A0EF23C3EDA54284",
      "CF083BB49C3304C593C43617FF06418E",
      "3259891600987E41060EC3A43511F2F9",
      "19F6EB627A565DF5ABC0B82925B2C760",
      "5CB6042A80C64D34BA98721C96F5D6A3",
      "E592BA2BBFA44C9021643D25BC014BD5",
      "661AD135B4409FF51BC4A6D80E6AC0C7",
      "8E0E19FD517F46AD46A8A322377CA89B",
      "1E8FFEC57F042949AEFAC69FECC72D38",
      "64D3D8C3021F7E8442CCA2825051A87A"
    ]);
    const getHash = (url) => {
      if (!url) return null;
      const match = url.match(/-([0-9A-Fa-f]{32})-/);
      return match ? match[1].toUpperCase() : null;
    };
    const serverHashMap = /* @__PURE__ */ new Map();
    serverResult.data.forEach(
      (s) => s.playerImgs.forEach((img) => {
        const h = getHash(img);
        if (h) serverHashMap.set(h, s);
      })
    );
    const matchedJobIds = /* @__PURE__ */ new Set();
    const userServerMap = /* @__PURE__ */ new Map();
    for (const user of userList) {
      const img = thumbnailsMap.get(user.id) ?? null;
      const hash = getHash(img);
      const server = hash && !defaultHashes.has(hash) ? serverHashMap.get(hash) ?? null : null;
      if (server) {
        userServerMap.set(user.id, server);
        matchedJobIds.add(server.jobId);
      }
    }
    const locationList = matchedJobIds.size > 0 ? await serversRegion({ placeId, jobIds: [...matchedJobIds] }) : [];
    const locationMap = new Map(locationList.map((l) => [l.jobId, l]));
    return userList.map((user) => {
      const img = thumbnailsMap.get(user.id) ?? null;
      const server = userServerMap.get(user.id) ?? null;
      return {
        user: { ...user, img },
        server: server ? { ...server, location: locationMap.get(server.jobId) ?? null } : null
      };
    });
  }
  async function extractIps(placeId, jobId) {
    try {
      const res = await gamejoinApi.path("join-game-instance").body("overwrite", { placeId, gameId: jobId }).request();
      return {
        publicIp: res?.joinScript?.UdmuxEndpoints?.[0]?.Address ?? null,
        machineAddress: res?.joinScript?.MachineAddress ?? null
      };
    } catch {
      return { publicIp: null, machineAddress: null };
    }
  }
  async function fetchIpLocation(ip) {
    try {
      const raw = await ipgeolocationApi.path("ipgeo").query({ apiKey: ipgeolocationKey, ip, fields: "country_code2,country_name,state_prov,city,latitude,longitude,isp,time_zone" }).request();
      return {
        ip,
        countryCode: String(raw.country_code2 ?? ""),
        countryName: String(raw.country_name ?? ""),
        regionName: String(raw.state_prov ?? ""),
        city: String(raw.city ?? ""),
        latitude: Number(raw.latitude ?? 0),
        longitude: Number(raw.longitude ?? 0),
        isp: String(raw.isp ?? ""),
        timezone: String(raw.time_zone?.name ?? "")
      };
    } catch {
      return null;
    }
  }
  async function serversRegion(opts) {
    const { placeId, jobIds } = opts;
    if (jobIds.length === 0) return [];
    const JOB_TTL = 12 * 60 * 60 * 1e3;
    const IP_TTL = 31 * 24 * 60 * 60 * 1e3;
    const MACHINE_TTL = 2 * 24 * 60 * 60 * 1e3;
    const cachedByJob = await cache.select("serverLocation:job", jobIds);
    const jobHitMap = new Map(cachedByJob.map(({ separator, data }) => [separator, data]));
    const missJobIds = jobIds.filter((id) => !jobHitMap.has(id));
    if (missJobIds.length === 0) return jobIds.map((id) => jobHitMap.get(id));
    const extracted = await import_vigor_fetch.vigor.all(
      ...missJobIds.map((jobId) => async () => {
        const { publicIp, machineAddress } = await extractIps(placeId, jobId);
        return { jobId, publicIp, machineAddress };
      })
    ).settings((s) => s.concurrency(3)).request();
    const validExtracted = extracted.filter(
      (e) => e.publicIp !== null
    );
    const machineAddresses = [...new Set(validExtracted.map((e) => e.machineAddress).filter((m) => m !== null))];
    const cachedByMachine = await cache.select("serverLocation:machine", machineAddresses);
    const machineHitMap = new Map(cachedByMachine.map(({ separator, data }) => [separator, data]));
    const { pass: machineHits, fail: machineMiss } = validExtracted.reduce(
      (acc, e) => {
        const cached = e.machineAddress ? machineHitMap.get(e.machineAddress) : void 0;
        if (cached) acc.pass.push({ ...e, loc: cached });
        else acc.fail.push(e);
        return acc;
      },
      { pass: [], fail: [] }
    );
    const missPublicIps = [...new Set(machineMiss.map((e) => e.publicIp))];
    const cachedByIp = await cache.select("serverLocation:ip", missPublicIps);
    const ipHitMap = new Map(cachedByIp.map(({ separator, data }) => [separator, data]));
    const stillMissIps = missPublicIps.filter((ip) => !ipHitMap.has(ip));
    if (stillMissIps.length > 0) {
      const fetched = await import_vigor_fetch.vigor.all(
        ...stillMissIps.map((ip) => async () => ({ ip, loc: await fetchIpLocation(ip) }))
      ).settings((s) => s.concurrency(5)).request();
      const toUpsertIp = fetched.filter((e) => e.loc !== null);
      if (toUpsertIp.length > 0) {
        await cache.upsert("serverLocation:ip", IP_TTL, toUpsertIp.map(({ ip, loc }) => ({ separator: ip, data: loc })));
        toUpsertIp.forEach(({ ip, loc }) => ipHitMap.set(ip, loc));
      }
    }
    const toUpsertMachine = [];
    for (const e of machineMiss) {
      const loc = ipHitMap.get(e.publicIp);
      if (loc && e.machineAddress && !machineHitMap.has(e.machineAddress)) {
        toUpsertMachine.push({ separator: e.machineAddress, data: loc });
        machineHitMap.set(e.machineAddress, loc);
      }
    }
    if (toUpsertMachine.length > 0) await cache.upsert("serverLocation:machine", MACHINE_TTL, toUpsertMachine);
    const jobLocations = [];
    const toUpsertJob = [];
    for (const { jobId, loc } of machineHits) {
      const full = { ...loc, jobId };
      jobLocations.push(full);
      toUpsertJob.push({ separator: jobId, data: full });
    }
    for (const e of machineMiss) {
      const loc = ipHitMap.get(e.publicIp);
      if (!loc) continue;
      const full = { ...loc, jobId: e.jobId };
      jobLocations.push(full);
      toUpsertJob.push({ separator: e.jobId, data: full });
    }
    if (toUpsertJob.length > 0) await cache.upsert("serverLocation:job", JOB_TTL, toUpsertJob);
    const resultMap = new Map([
      ...jobHitMap.entries(),
      ...jobLocations.map((loc) => [loc.jobId, loc])
    ]);
    return jobIds.flatMap((id) => {
      const loc = resultMap.get(id);
      return loc ? [loc] : [];
    });
  }
  async function friends(userId) {
    const [result] = await withCache({
      type: "friends",
      keys: [String(userId)],
      ttlMs: 10 * 60 * 1e3,
      getKey: () => String(userId),
      fallback: [],
      fetchMissing: async () => {
        const list = await friendsApiRateLimiter(
          () => friendsApi.path("users", userId, "friends").middlewares(dataInterceptor).request()
        );
        return [list];
      }
    });
    return result;
  }
  async function sendFriendRequest(targetUserId) {
    await friendsApiRateLimiter(
      () => friendsApi.path("users", targetUserId, "request-friendship").body("overwrite", {}).request()
    );
  }
  async function unfriend(targetUserId) {
    await friendsApiRateLimiter(
      () => friendsApi.path("users", targetUserId, "unfriend").body("overwrite", {}).request()
    );
  }
  return {
    authenticated,
    usersSimple,
    users,
    usersByName,
    thumbnailAssets,
    thumbnailsBatch,
    serversSimple,
    servers,
    presence,
    placeInfo,
    usersSimpleWithImg,
    usersWithImg,
    track,
    serversRegion,
    friends,
    sendFriendRequest,
    unfriend,
    _internal: { gamejoinApi, gamesApi, apisRoblox, friendsApi, presenceApi }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRobloxApi
});
