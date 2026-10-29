"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  RobloxAgeBracket: () => RobloxAgeBracket,
  RobloxAgeBracketSchema: () => RobloxAgeBracketSchema,
  RobloxArrayResponseSchema: () => RobloxArrayResponseSchema,
  RobloxAssetIdSchema: () => RobloxAssetIdSchema,
  RobloxAuthenticatedUserSchema: () => RobloxAuthenticatedUserSchema,
  RobloxBadgeAwardSchema: () => RobloxBadgeAwardSchema,
  RobloxBadgeAwardsResponseSchema: () => RobloxBadgeAwardsResponseSchema,
  RobloxBadgeIdSchema: () => RobloxBadgeIdSchema,
  RobloxBadgeMetadataSchema: () => RobloxBadgeMetadataSchema,
  RobloxBadgePageSchema: () => RobloxBadgePageSchema,
  RobloxBadgeSchema: () => RobloxBadgeSchema,
  RobloxBadgeStatisticsSchema: () => RobloxBadgeStatisticsSchema,
  RobloxBadgesApi: () => RobloxBadgesApi,
  RobloxBirthDaySchema: () => RobloxBirthDaySchema,
  RobloxBirthMonthSchema: () => RobloxBirthMonthSchema,
  RobloxBirthYearSchema: () => RobloxBirthYearSchema,
  RobloxBirthdateSchema: () => RobloxBirthdateSchema,
  RobloxBundleIdSchema: () => RobloxBundleIdSchema,
  RobloxCacheStage: () => RobloxCacheStage,
  RobloxCaptchaStatusSchema: () => RobloxCaptchaStatusSchema,
  RobloxChatApi: () => RobloxChatApi,
  RobloxChatConversationPageRawSchema: () => RobloxChatConversationPageRawSchema,
  RobloxChatConversationResultSchema: () => RobloxChatConversationResultSchema,
  RobloxChatConversationResultsResponseSchema: () => RobloxChatConversationResultsResponseSchema,
  RobloxChatConversationSchema: () => RobloxChatConversationSchema,
  RobloxChatConversationsResponseSchema: () => RobloxChatConversationsResponseSchema,
  RobloxChatMessageIdSchema: () => RobloxChatMessageIdSchema,
  RobloxChatMessagePageRawSchema: () => RobloxChatMessagePageRawSchema,
  RobloxChatMessageSchema: () => RobloxChatMessageSchema,
  RobloxChatMetadataSchema: () => RobloxChatMetadataSchema,
  RobloxChatSendResponseSchema: () => RobloxChatSendResponseSchema,
  RobloxChatUnreadCountsSchema: () => RobloxChatUnreadCountsSchema,
  RobloxChatUserDataSchema: () => RobloxChatUserDataSchema,
  RobloxClient: () => RobloxClient,
  RobloxCommunityTierSchema: () => RobloxCommunityTierSchema,
  RobloxConversationIdSchema: () => RobloxConversationIdSchema,
  RobloxCookieSchema: () => RobloxCookieSchema,
  RobloxCountResponseSchema: () => RobloxCountResponseSchema,
  RobloxCreateGroupKeywordsResponseSchema: () => RobloxCreateGroupKeywordsResponseSchema,
  RobloxCreatedBadgeSchema: () => RobloxCreatedBadgeSchema,
  RobloxCreatorSchema: () => RobloxCreatorSchema,
  RobloxCursorSchema: () => RobloxCursorSchema,
  RobloxDefaultTtl: () => RobloxDefaultTtl,
  RobloxDeveloperProductIdSchema: () => RobloxDeveloperProductIdSchema,
  RobloxEmptyResponseSchema: () => RobloxEmptyResponseSchema,
  RobloxErrorResponseSchema: () => RobloxErrorResponseSchema,
  RobloxExtensionStage: () => RobloxExtensionStage,
  RobloxFavoriteGamePageSchema: () => RobloxFavoriteGamePageSchema,
  RobloxFavoriteGameSchema: () => RobloxFavoriteGameSchema,
  RobloxFiatPurchaseDataSchema: () => RobloxFiatPurchaseDataSchema,
  RobloxFollowPageSchema: () => RobloxFollowPageSchema,
  RobloxFollowingExistsResponseSchema: () => RobloxFollowingExistsResponseSchema,
  RobloxFollowingStatusSchema: () => RobloxFollowingStatusSchema,
  RobloxFriendListResponseSchema: () => RobloxFriendListResponseSchema,
  RobloxFriendPageRawSchema: () => RobloxFriendPageRawSchema,
  RobloxFriendPresenceSchema: () => RobloxFriendPresenceSchema,
  RobloxFriendRequestPageSchema: () => RobloxFriendRequestPageSchema,
  RobloxFriendRequestSchema: () => RobloxFriendRequestSchema,
  RobloxFriendStatusSchema: () => RobloxFriendStatusSchema,
  RobloxFriendStatusesResponseSchema: () => RobloxFriendStatusesResponseSchema,
  RobloxFriendsApi: () => RobloxFriendsApi,
  RobloxFriendsGroupsResponseSchema: () => RobloxFriendsGroupsResponseSchema,
  RobloxFriendsMetadataSchema: () => RobloxFriendsMetadataSchema,
  RobloxGameCreatorSchema: () => RobloxGameCreatorSchema,
  RobloxGameMediaResponseSchema: () => RobloxGameMediaResponseSchema,
  RobloxGameMediaSchema: () => RobloxGameMediaSchema,
  RobloxGamePassIdSchema: () => RobloxGamePassIdSchema,
  RobloxGamePlayabilitySchema: () => RobloxGamePlayabilitySchema,
  RobloxGameProductSchema: () => RobloxGameProductSchema,
  RobloxGameProductsResponseSchema: () => RobloxGameProductsResponseSchema,
  RobloxGameRecommendationsSchema: () => RobloxGameRecommendationsSchema,
  RobloxGameSchema: () => RobloxGameSchema,
  RobloxGameSummaryPageSchema: () => RobloxGameSummaryPageSchema,
  RobloxGameSummarySchema: () => RobloxGameSummarySchema,
  RobloxGameThumbnailIdSchema: () => RobloxGameThumbnailIdSchema,
  RobloxGameVotesResponseSchema: () => RobloxGameVotesResponseSchema,
  RobloxGameVotesSchema: () => RobloxGameVotesSchema,
  RobloxGamesApi: () => RobloxGamesApi,
  RobloxGamesResponseSchema: () => RobloxGamesResponseSchema,
  RobloxGender: () => RobloxGender,
  RobloxGenderSchema: () => RobloxGenderSchema,
  RobloxGroupAuditActionTypes: () => RobloxGroupAuditActionTypes,
  RobloxGroupAuditLogItemSchema: () => RobloxGroupAuditLogItemSchema,
  RobloxGroupAuditLogPageSchema: () => RobloxGroupAuditLogPageSchema,
  RobloxGroupBanPageSchema: () => RobloxGroupBanPageSchema,
  RobloxGroupBanSchema: () => RobloxGroupBanSchema,
  RobloxGroupBasicSchema: () => RobloxGroupBasicSchema,
  RobloxGroupConfigurationMetadataSchema: () => RobloxGroupConfigurationMetadataSchema,
  RobloxGroupConfigurationSchema: () => RobloxGroupConfigurationSchema,
  RobloxGroupDetailPartialSchema: () => RobloxGroupDetailPartialSchema,
  RobloxGroupDetailSchema: () => RobloxGroupDetailSchema,
  RobloxGroupEmoteSetsResponseSchema: () => RobloxGroupEmoteSetsResponseSchema,
  RobloxGroupEventIdSchema: () => RobloxGroupEventIdSchema,
  RobloxGroupFeatureFreezesResponseSchema: () => RobloxGroupFeatureFreezesResponseSchema,
  RobloxGroupFeaturedEventSchema: () => RobloxGroupFeaturedEventSchema,
  RobloxGroupFeaturesSchema: () => RobloxGroupFeaturesSchema,
  RobloxGroupIdSchema: () => RobloxGroupIdSchema,
  RobloxGroupJoinRequestPageSchema: () => RobloxGroupJoinRequestPageSchema,
  RobloxGroupJoinRequestSchema: () => RobloxGroupJoinRequestSchema,
  RobloxGroupKeywordIdSchema: () => RobloxGroupKeywordIdSchema,
  RobloxGroupKeywordPageSchema: () => RobloxGroupKeywordPageSchema,
  RobloxGroupKeywordSchema: () => RobloxGroupKeywordSchema,
  RobloxGroupLookupResponseSchema: () => RobloxGroupLookupResponseSchema,
  RobloxGroupMemberPageSchema: () => RobloxGroupMemberPageSchema,
  RobloxGroupMemberSchema: () => RobloxGroupMemberSchema,
  RobloxGroupMembershipDetailSchema: () => RobloxGroupMembershipDetailSchema,
  RobloxGroupMembershipSchema: () => RobloxGroupMembershipSchema,
  RobloxGroupNameHistoryPageSchema: () => RobloxGroupNameHistoryPageSchema,
  RobloxGroupNotificationPreferenceSchema: () => RobloxGroupNotificationPreferenceSchema,
  RobloxGroupPayoutRestrictionSchema: () => RobloxGroupPayoutRestrictionSchema,
  RobloxGroupPayoutsResponseSchema: () => RobloxGroupPayoutsResponseSchema,
  RobloxGroupPermissionsSchema: () => RobloxGroupPermissionsSchema,
  RobloxGroupPoliciesResponseSchema: () => RobloxGroupPoliciesResponseSchema,
  RobloxGroupRelationshipsSchema: () => RobloxGroupRelationshipsSchema,
  RobloxGroupRoleDetailSchema: () => RobloxGroupRoleDetailSchema,
  RobloxGroupRoleDetailsResponseSchema: () => RobloxGroupRoleDetailsResponseSchema,
  RobloxGroupRoleIdSchema: () => RobloxGroupRoleIdSchema,
  RobloxGroupRolePermissionsResponseSchema: () => RobloxGroupRolePermissionsResponseSchema,
  RobloxGroupRolePermissionsSchema: () => RobloxGroupRolePermissionsSchema,
  RobloxGroupRoleSchema: () => RobloxGroupRoleSchema,
  RobloxGroupRolesResponseSchema: () => RobloxGroupRolesResponseSchema,
  RobloxGroupSchema: () => RobloxGroupSchema,
  RobloxGroupSearchItemSchema: () => RobloxGroupSearchItemSchema,
  RobloxGroupSearchMetadataSchema: () => RobloxGroupSearchMetadataSchema,
  RobloxGroupSearchPageSchema: () => RobloxGroupSearchPageSchema,
  RobloxGroupSettingsSchema: () => RobloxGroupSettingsSchema,
  RobloxGroupShoutSchema: () => RobloxGroupShoutSchema,
  RobloxGroupSocialLinkIdSchema: () => RobloxGroupSocialLinkIdSchema,
  RobloxGroupSocialLinkSchema: () => RobloxGroupSocialLinkSchema,
  RobloxGroupSocialLinksResponseSchema: () => RobloxGroupSocialLinksResponseSchema,
  RobloxGroupTierEvaluationSchema: () => RobloxGroupTierEvaluationSchema,
  RobloxGroupUserPageSchema: () => RobloxGroupUserPageSchema,
  RobloxGroupUserSchema: () => RobloxGroupUserSchema,
  RobloxGroupsApi: () => RobloxGroupsApi,
  RobloxGroupsMetadataSchema: () => RobloxGroupsMetadataSchema,
  RobloxGroupsResponseSchema: () => RobloxGroupsResponseSchema,
  RobloxIpAddressSchema: () => RobloxIpAddressSchema,
  RobloxJobIdSchema: () => RobloxJobIdSchema,
  RobloxJoinResponseSchema: () => RobloxJoinResponseSchema,
  RobloxJoinStatus: () => RobloxJoinStatus,
  RobloxMemoryCache: () => RobloxMemoryCache,
  RobloxMemoryCookies: () => RobloxMemoryCookies,
  RobloxMyPrivateServerPageSchema: () => RobloxMyPrivateServerPageSchema,
  RobloxNodeStage: () => RobloxNodeStage,
  RobloxOnlineFriendSchema: () => RobloxOnlineFriendSchema,
  RobloxOnlineFriendsResponseSchema: () => RobloxOnlineFriendsResponseSchema,
  RobloxOptionsStage: () => RobloxOptionsStage,
  RobloxOutfitIdSchema: () => RobloxOutfitIdSchema,
  RobloxPageLimitSchema: () => RobloxPageLimitSchema,
  RobloxPageResponseSchema: () => RobloxPageResponseSchema,
  RobloxPartialError: () => RobloxPartialError,
  RobloxPlaceDetailsSchema: () => RobloxPlaceDetailsSchema,
  RobloxPlaceIdSchema: () => RobloxPlaceIdSchema,
  RobloxPresenceApi: () => RobloxPresenceApi,
  RobloxPresenceType: () => RobloxPresenceType,
  RobloxPresenceTypeSchema: () => RobloxPresenceTypeSchema,
  RobloxPrimaryGroupResponseSchema: () => RobloxPrimaryGroupResponseSchema,
  RobloxPrivateServerDetailSchema: () => RobloxPrivateServerDetailSchema,
  RobloxPrivateServerIdSchema: () => RobloxPrivateServerIdSchema,
  RobloxPrivateServerInviteSchema: () => RobloxPrivateServerInviteSchema,
  RobloxPrivateServerPageRawSchema: () => RobloxPrivateServerPageRawSchema,
  RobloxPrivateServerPermissionsSchema: () => RobloxPrivateServerPermissionsSchema,
  RobloxPrivateServerRawSchema: () => RobloxPrivateServerRawSchema,
  RobloxPrivateServerSubscriptionSchema: () => RobloxPrivateServerSubscriptionSchema,
  RobloxRecommendedGameSchema: () => RobloxRecommendedGameSchema,
  RobloxServerPageRawSchema: () => RobloxServerPageRawSchema,
  RobloxServerPlayerRawSchema: () => RobloxServerPlayerRawSchema,
  RobloxServerRawSchema: () => RobloxServerRawSchema,
  RobloxServerTypeSchema: () => RobloxServerTypeSchema,
  RobloxSetBirthdateRequestSchema: () => RobloxSetBirthdateRequestSchema,
  RobloxSetDescriptionRequestSchema: () => RobloxSetDescriptionRequestSchema,
  RobloxSetDisplayNameRequestSchema: () => RobloxSetDisplayNameRequestSchema,
  RobloxSetGenderRequestSchema: () => RobloxSetGenderRequestSchema,
  RobloxSortOrderSchema: () => RobloxSortOrderSchema,
  RobloxThumbnailBatchItemSchema: () => RobloxThumbnailBatchItemSchema,
  RobloxThumbnailBatchResponseSchema: () => RobloxThumbnailBatchResponseSchema,
  RobloxThumbnailReturnPolicySchema: () => RobloxThumbnailReturnPolicySchema,
  RobloxThumbnailSchema: () => RobloxThumbnailSchema,
  RobloxThumbnailSizes: () => RobloxThumbnailSizes,
  RobloxThumbnailStateSchema: () => RobloxThumbnailStateSchema,
  RobloxThumbnailsApi: () => RobloxThumbnailsApi,
  RobloxThumbnailsResponseSchema: () => RobloxThumbnailsResponseSchema,
  RobloxTrustedFriendRequestPageSchema: () => RobloxTrustedFriendRequestPageSchema,
  RobloxUniverseIdSchema: () => RobloxUniverseIdSchema,
  RobloxUniverseThumbnailsResponseSchema: () => RobloxUniverseThumbnailsResponseSchema,
  RobloxUniverseThumbnailsSchema: () => RobloxUniverseThumbnailsSchema,
  RobloxUserAgeBracketSchema: () => RobloxUserAgeBracketSchema,
  RobloxUserBadgePageSchema: () => RobloxUserBadgePageSchema,
  RobloxUserBadgeSchema: () => RobloxUserBadgeSchema,
  RobloxUserByNameSchema: () => RobloxUserByNameSchema,
  RobloxUserCountryCodeSchema: () => RobloxUserCountryCodeSchema,
  RobloxUserDescriptionSchema: () => RobloxUserDescriptionSchema,
  RobloxUserDetailSchema: () => RobloxUserDetailSchema,
  RobloxUserDisplaynameSchema: () => RobloxUserDisplaynameSchema,
  RobloxUserGameVoteSchema: () => RobloxUserGameVoteSchema,
  RobloxUserGenderSchema: () => RobloxUserGenderSchema,
  RobloxUserGroupRoleV1Schema: () => RobloxUserGroupRoleV1Schema,
  RobloxUserGroupRoleV2Schema: () => RobloxUserGroupRoleV2Schema,
  RobloxUserGroupRolesV1ResponseSchema: () => RobloxUserGroupRolesV1ResponseSchema,
  RobloxUserGroupRolesV2ResponseSchema: () => RobloxUserGroupRolesV2ResponseSchema,
  RobloxUserIdSchema: () => RobloxUserIdSchema,
  RobloxUserNameSchema: () => RobloxUserNameSchema,
  RobloxUserPresenceSchema: () => RobloxUserPresenceSchema,
  RobloxUserPresencesResponseSchema: () => RobloxUserPresencesResponseSchema,
  RobloxUserRolesSchema: () => RobloxUserRolesSchema,
  RobloxUserSchema: () => RobloxUserSchema,
  RobloxUserSearchQuerySchema: () => RobloxUserSearchQuerySchema,
  RobloxUserSearchResponseSchema: () => RobloxUserSearchResponseSchema,
  RobloxUserSearchResultSchema: () => RobloxUserSearchResultSchema,
  RobloxUsernameHistoryEntrySchema: () => RobloxUsernameHistoryEntrySchema,
  RobloxUsernameHistoryQuerySchema: () => RobloxUsernameHistoryQuerySchema,
  RobloxUsernameHistoryResponseSchema: () => RobloxUsernameHistoryResponseSchema,
  RobloxUsersApi: () => RobloxUsersApi,
  RobloxUsersByNameRequestSchema: () => RobloxUsersByNameRequestSchema,
  RobloxUsersByNameResponseSchema: () => RobloxUsersByNameResponseSchema,
  RobloxUsersRequestSchema: () => RobloxUsersRequestSchema,
  RobloxUsersResponseSchema: () => RobloxUsersResponseSchema,
  RobloxValidateDisplayNameQuerySchema: () => RobloxValidateDisplayNameQuerySchema,
  RobloxValidateUserDisplayNameQuerySchema: () => RobloxValidateUserDisplayNameQuerySchema,
  VigorRoblox: () => VigorRoblox,
  default: () => index_default,
  findFetchFailed: () => findFetchFailed,
  isRobloxPartialError: () => isRobloxPartialError,
  robloxCacheKey: () => robloxCacheKey,
  robloxDnrRules: () => robloxDnrRules,
  toRobloxCreator: () => toRobloxCreator,
  vigorRoblox: () => vigorRoblox
});
module.exports = __toCommonJS(index_exports);

// src/apis/users.ts
var import_zod3 = __toESM(require("zod"), 1);

// src/core/batcher.ts
var import_vigor_fetch2 = require("vigor-fetch");

// src/core/http.ts
var import_vigor_fetch = require("vigor-fetch");

// src/core/cache.ts
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const key of Object.keys(value).sort()) {
    const field = value[key];
    if (field !== void 0) out[key] = canonical(field);
  }
  return out;
}
function canonicalInfo(info) {
  return canonical(info);
}
var UNVERSIONED = /* @__PURE__ */ new Set(["games.getServerLocations"]);
var encoder = new TextEncoder();
function base64url(bytes) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function robloxCacheKey(info) {
  const { service, method, ...args } = canonicalInfo(info);
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(JSON.stringify(args)));
  const name = `${service}.${method}`;
  const prefix = UNVERSIONED.has(name) ? "" : `${"5.2.0"}:`;
  return `${prefix}${name}::${base64url(new Uint8Array(digest).slice(0, 16))}`;
}
var RobloxMemoryCache = class {
  /** @param sweepInterval 만료된 항목을 한꺼번에 지우는 간격(ms). 저장할 때 확인한다. 기본 1분 */
  constructor(sweepInterval = 6e4) {
    this.sweepInterval = sweepInterval;
  }
  sweepInterval;
  entries = /* @__PURE__ */ new Map();
  lastSweep = Date.now();
  sweep(now) {
    if (now - this.lastSweep < this.sweepInterval) return;
    this.lastSweep = now;
    for (const [id2, entry] of this.entries) if (entry.expiresAt <= now) this.entries.delete(id2);
  }
  get(key) {
    const entry = this.entries.get(key);
    if (!entry) return void 0;
    if (entry.expiresAt <= Date.now()) {
      this.entries.delete(key);
      return void 0;
    }
    return entry.value;
  }
  /** TTL이 0 이하면 저장하지 않는다 */
  set(key, value, ttl) {
    if (ttl <= 0) return;
    const now = Date.now();
    this.sweep(now);
    this.entries.set(key, { value, expiresAt: now + ttl });
  }
};

// src/core/http.ts
function findFetchFailed(error) {
  let current = error;
  for (let depth = 0; depth < 5 && current != null; depth++) {
    if ((0, import_vigor_fetch.isVigorFetchError)(current, "FETCH_FAILED")) return current;
    const next = current;
    current = next.data?.error ?? next.cause;
  }
  return null;
}
var SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];
function errorMessages(parsed) {
  const errors = parsed?.errors;
  return Array.isArray(errors) ? errors.map((e) => String(e?.message ?? "")) : [];
}
function rejectionReason(failed) {
  if (failed?.data.status === 401) return "unauthorized";
  if (failed?.data.status === 403 && errorMessages(failed.data.parsed).some((m) => /moderated/i.test(m))) return "moderated";
  return null;
}
function rejectCookie(config, cookie, reason) {
  let running = config.rejecting.get(cookie);
  if (!running) {
    const handle = config.onCookieRejected ?? ((c) => config.cookies?.remove?.(c));
    running = Promise.resolve().then(() => handle(cookie, reason)).finally(() => config.rejecting.delete(cookie));
    config.rejecting.set(cookie, running);
  }
  return running;
}
function authMiddlewares(config, opts) {
  let picked = null;
  const pick = () => picked ??= Promise.resolve(config.mode === "node" ? config.fixedCookie ?? config.cookies?.next() ?? null : null);
  const csrfKey = (cookie) => config.mode === "extension" ? "extension" : cookie;
  return import_vigor_fetch.vigor.builders.fetch.middlewares().before("fluent", async (ctx) => {
    const options = ctx.options;
    const cookie = await pick();
    if (cookie) options.headers["Cookie"] = `.ROBLOSECURITY=${cookie}`;
    if (config.mode === "node" && opts.userAgent) options.headers["User-Agent"] = opts.userAgent;
    const key = csrfKey(cookie);
    const token = key ? config.csrf.get(key) : void 0;
    if (token && !SAFE_METHODS.includes(options.method ?? "GET")) options.headers["X-CSRF-Token"] = token;
  }).onError("intercept", async (ctx, api) => {
    const failed = findFetchFailed(ctx.error);
    const cookie = await pick();
    const reason = rejectionReason(failed);
    if (reason && cookie) {
      await rejectCookie(config, cookie, reason);
      if (!config.fixedCookie && config.cookies) {
        picked = null;
        api.proceedRestart();
      }
      return ctx;
    }
    const key = csrfKey(cookie);
    const token = failed?.data.status === 403 ? failed.data.response.headers.get("x-csrf-token") : null;
    if (key && token && token !== config.csrf.get(key)) {
      config.csrf.set(key, token);
      api.proceedRestart();
    }
    return ctx;
  });
}
function createHttp(config, origin, opts = {}) {
  const unretryStatus = opts.retryRateLimited === false ? [...import_vigor_fetch.VigorFetchPolicySettingsBase.unretryStatus, 429] : [...import_vigor_fetch.VigorFetchPolicySettingsBase.unretryStatus];
  return () => import_vigor_fetch.vigor.fetch(origin).options("merge", config.mode === "extension" ? { credentials: "include" } : {}).settings((s) => s.unretryStatus(...unretryStatus)).retry((r) => r.settings({
    maxAttempts: config.retry.maxAttempts ?? 5,
    timeout: config.retry.timeout ?? 2e4
  })).middlewares(authMiddlewares(config, opts));
}
function validate(schema) {
  return import_vigor_fetch.vigor.builders.fetch.middlewares().after("intercept", (ctx, api) => {
    const result = schema.parse(ctx.result);
    api.setResult(result);
    return { ...ctx, result };
  });
}
function singleFlight(config, id2, run) {
  const running = config.inflight.get(id2);
  if (running) return running;
  const promise = run().finally(() => {
    if (config.inflight.get(id2) === promise) config.inflight.delete(id2);
  });
  config.inflight.set(id2, promise);
  return promise;
}
function cached(config, info, ttl, run, keep = () => true) {
  const normalized = canonicalInfo(info);
  return singleFlight(config, JSON.stringify(normalized), async () => {
    const store = config.cache;
    if (!store) return run();
    const key = await robloxCacheKey(normalized);
    const hit = await store.get(key, normalized);
    if (hit !== void 0) return hit;
    const result = await run();
    if (result !== null && keep(result)) await store.set(key, result, ttl, normalized);
    return result;
  });
}
function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

// src/core/batcher.ts
var RobloxBatchSkip = /* @__PURE__ */ Symbol("RobloxBatchSkip");
var RobloxBatcher = class {
  constructor(config, origin, routes, options = {}) {
    this.config = config;
    this.origin = origin;
    this.routes = routes;
    this.options = options;
  }
  config;
  origin;
  routes;
  options;
  queue = [];
  timer = null;
  timerAt = Infinity;
  https = /* @__PURE__ */ new Map();
  /** key → 진행 중인 요청. 같은 대상을 동시에 여러 번 물어도 한 번만 보낸다. */
  inflight = /* @__PURE__ */ new Map();
  /** 버킷에 자리가 나면 깨운다. 같은 함수라 버킷 쪽 Set에서 중복이 걸러진다 */
  onBucketFree = () => this.wake(0);
  httpFor(route) {
    const origin = route.origin ?? this.origin;
    let http = this.https.get(origin);
    if (!http) this.https.set(origin, http = createHttp(this.config, origin, { userAgent: this.options.userAgent, retryRateLimited: false }));
    return http;
  }
  /** key가 같은 요청이 진행 중이면 그 결과를 같이 받는다. */
  load(key, target) {
    const running = this.inflight.get(key);
    if (running) return running;
    const promise = this.enqueue(target).finally(() => this.inflight.delete(key));
    this.inflight.set(key, promise);
    return promise;
  }
  enqueue(target) {
    const routes = this.routes.filter((r) => r.group(target) !== null);
    if (!routes.length) return Promise.reject(new Error(`No endpoint accepts ${JSON.stringify(target)}`));
    return new Promise((resolve, reject) => {
      this.queue.push({ target, routes, resolve, reject, notBefore: 0, againTries: 0, limitedTries: 0 });
      this.wake(0);
    });
  }
  wake(delay) {
    const at = Date.now() + delay;
    if (this.timer && this.timerAt <= at) return;
    if (this.timer) clearTimeout(this.timer);
    this.timerAt = at;
    this.timer = setTimeout(() => {
      this.timer = null;
      this.timerAt = Infinity;
      this.flush();
    }, delay);
  }
  flush() {
    const now = Date.now();
    const open = /* @__PURE__ */ new Map();
    const batches = [];
    const waiting = [];
    for (const job of this.queue) {
      if (job.notBefore > now) {
        waiting.push(job);
        continue;
      }
      let placed = false;
      for (const route of job.routes) {
        const key = `${route.bucket}|${route.group(job.target)}`;
        const current = open.get(key);
        if (current && current.jobs.length < route.limit) {
          current.jobs.push(job);
          placed = true;
          break;
        }
        if (this.config.rateLimits.bucket(route.bucket).tryAcquire(now)) {
          const next2 = { route, jobs: [job] };
          open.set(key, next2);
          batches.push(next2);
          placed = true;
          break;
        }
      }
      if (!placed) waiting.push(job);
    }
    this.queue = waiting;
    for (const batch of batches) void this.send(batch.route, batch.jobs);
    let next = Infinity;
    for (const job of waiting) {
      if (job.notBefore > now) {
        next = Math.min(next, job.notBefore - now);
        continue;
      }
      const buckets = job.routes.map((r) => this.config.rateLimits.bucket(r.bucket));
      const wait = Math.min(...buckets.map((b) => b.waitTime(now)));
      if (wait > 0) next = Math.min(next, wait);
      else for (const bucket of buckets) bucket.whenFree(this.onBucketFree);
    }
    if (next !== Infinity) this.wake(next);
  }
  async send(route, jobs) {
    const bucket = this.config.rateLimits.bucket(route.bucket);
    let headers = null;
    try {
      const results = await route.send(this.httpFor(route), jobs.map((j) => j.target), (h) => {
        headers = h;
      });
      bucket.release(headers);
      jobs.forEach((job, i) => {
        const result = results[i];
        if (result === RobloxBatchSkip) {
          job.routes = job.routes.filter((r) => r !== route);
          if (!job.routes.length) return job.reject(new Error(`No endpoint could answer ${JSON.stringify(job.target)}`));
          this.queue.push(job);
          return;
        }
        const delay = this.options.again?.(result, job.againTries) ?? null;
        if (delay === null) return job.resolve(result);
        job.againTries++;
        job.notBefore = Date.now() + delay;
        this.queue.push(job);
      });
    } catch (error) {
      const failed = findFetchFailed(error);
      if (failed?.data.status === 429) {
        bucket.exhaust(failed.data.response.headers);
        const maxTries = (this.config.retry.maxAttempts ?? 5) * 2;
        for (const job of jobs) {
          if (++job.limitedTries >= maxTries) job.reject(error);
          else this.queue.push(job);
        }
      } else {
        bucket.release(failed?.data.response.headers);
        for (const job of jobs) {
          job.routes = job.routes.filter((r) => r !== route);
          if (job.routes.length) this.queue.push(job);
          else job.reject(error);
        }
      }
    } finally {
      if (this.queue.length) this.wake(0);
    }
  }
};
var captureHeaders = (onHeaders) => import_vigor_fetch2.vigor.builders.fetch.middlewares().after("fluent", (ctx) => onHeaders(ctx.response.headers));
async function nullOn(statuses, onHeaders, run) {
  try {
    return await run();
  } catch (error) {
    const failed = findFetchFailed(error);
    if (!failed || !statuses.includes(failed.data.status)) throw error;
    onHeaders(failed.data.response.headers);
    return null;
  }
}
function mapRoute(route, fn, overrides = {}) {
  return {
    ...route,
    ...overrides,
    async send(http, targets, onHeaders) {
      const results = await route.send(http, targets, onHeaders);
      return results.map((r, i) => r === RobloxBatchSkip ? RobloxBatchSkip : fn(r, targets[i]));
    }
  };
}

// src/core/config.ts
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var RobloxDefaultTtl = {
  users: {
    getUsers: DAY,
    getUserDetails: HOUR,
    // 설명/정지 여부는 이름보다 자주 바뀐다
    getUsersByNames: 30 * MINUTE,
    // 이름은 남이 가져갈 수 있다
    getUsernameHistory: HOUR
  },
  thumbnails: {
    get: DAY,
    // 아바타는 바뀔 수 있다 (4.1은 48시간)
    getGameThumbnails: HOUR
  },
  presence: {
    get: 30 * SECOND
  },
  games: {
    getGames: 5 * MINUTE,
    // playing 수가 들어 있다
    getUniverseIds: 30 * DAY,
    // place → universe는 바뀌지 않는다
    getPlaceDetails: HOUR,
    getProductInfo: HOUR,
    getPlayability: 5 * MINUTE,
    getVotes: 5 * MINUTE,
    getFavoriteCounts: 5 * MINUTE,
    getMedia: HOUR,
    getServerAddresses: 30 * MINUTE,
    // 서버가 살아 있는 동안 같다
    getServerLocations: 31 * DAY,
    // IP → 위치
    // 아래는 금방 바뀌거나 페이지째 받는 목록이라 아주 짧게 둔다. 짧은 시간 안에 같은 걸 다시 묻는 경우(여러 탭, 인스턴스, 새로고침)만 막는다
    getServerPage: 5 * SECOND,
    // 엔드포인트당 3회/분
    getRecommendations: 5 * SECOND,
    getUserGames: 5 * SECOND,
    getUserFavoriteGames: 5 * SECOND,
    getGroupGames: 5 * SECOND,
    getPrivateServersEnabled: 5 * SECOND
  },
  friends: {
    getFriends: 10 * MINUTE,
    getFriendCounts: 10 * MINUTE,
    getFollowerCounts: 10 * MINUTE,
    getFollowingCounts: 10 * MINUTE
  },
  groups: {
    getGroups: HOUR,
    getGroupDetails: 10 * MINUTE,
    // 멤버 수가 들어 있다
    getRoles: HOUR,
    getRolesByIds: HOUR,
    getUserGroups: 10 * MINUTE
  },
  badges: {
    getBadges: 10 * MINUTE,
    // 통계(획득 수)가 들어 있다
    getAwardedDates: DAY
    // 받은 날짜는 바뀌지 않는다 (유저가 지우면 사라진다)
  }
};
function resolveTtl(config, service, method) {
  const own = config.ttl[service]?.[method];
  return own ?? RobloxDefaultTtl[service][method];
}
function mergeTtl(base, next) {
  const out = { ...base };
  for (const [service, methods] of Object.entries(next)) out[service] = { ...out[service], ...methods };
  return out;
}

// src/core/partial.ts
var RobloxPartialError = class extends Error {
  constructor(results, errors) {
    super(`${errors.length}\uAC1C \uD56D\uBAA9\uC744 \uBC1B\uC9C0 \uBABB\uD588\uB2E4 (\uC131\uACF5 ${results.length}\uAC1C)`, { cause: errors[0]?.error });
    this.results = results;
    this.errors = errors;
  }
  results;
  errors;
  name = "RobloxPartialError";
};
function isRobloxPartialError(error) {
  return error instanceof RobloxPartialError;
}
var found = (list) => list.filter((x) => x !== null);
async function settle(inputs, load) {
  const settled = await Promise.allSettled(inputs.map((input) => load(input)));
  const errors = [];
  const values = settled.map((s, i) => {
    if (s.status === "fulfilled") return s.value;
    errors.push({ input: inputs[i], error: s.reason });
    return null;
  });
  return { values, errors };
}
function finish(results, errors) {
  if (errors.length) throw new RobloxPartialError(results, [...errors]);
  return results;
}
async function partial(promise) {
  try {
    return { results: await promise, errors: [] };
  } catch (error) {
    if (error instanceof RobloxPartialError) return { results: error.results, errors: error.errors };
    throw error;
  }
}
async function extra(promise, fallback = []) {
  try {
    return await promise;
  } catch (error) {
    return error instanceof RobloxPartialError ? error.results : fallback;
  }
}

// src/types/common.ts
var import_zod = __toESM(require("zod"), 1);
var RobloxCursorSchema = import_zod.default.string().brand("RobloxCursor");
var id = (brand) => import_zod.default.number().int().min(1).brand(brand);
var RobloxAssetIdSchema = id("RobloxAssetId");
var RobloxPlaceIdSchema = id("RobloxPlaceId");
var RobloxUniverseIdSchema = id("RobloxUniverseId");
var RobloxGroupIdSchema = id("RobloxGroupId");
var RobloxBadgeIdSchema = id("RobloxBadgeId");
var RobloxGamePassIdSchema = id("RobloxGamePassId");
var RobloxBundleIdSchema = id("RobloxBundleId");
var RobloxOutfitIdSchema = id("RobloxOutfitId");
var RobloxDeveloperProductIdSchema = id("RobloxDeveloperProductId");
var RobloxGameThumbnailIdSchema = id("RobloxGameThumbnailId");
var RobloxPrivateServerIdSchema = id("RobloxPrivateServerId");
var RobloxJobIdSchema = import_zod.default.uuid().brand("RobloxJobId");
var RobloxConversationIdSchema = import_zod.default.string().min(1).brand("RobloxConversationId");
var RobloxChatMessageIdSchema = import_zod.default.string().min(1).brand("RobloxChatMessageId");
var RobloxPageLimitSchema = import_zod.default.literal([10, 25, 50, 100]);
var RobloxSortOrderSchema = import_zod.default.enum(["Asc", "Desc"]);
var RobloxEmptyResponseSchema = import_zod.default.object({});
var RobloxArrayResponseSchema = (item) => import_zod.default.object({
  data: import_zod.default.array(item)
});
var RobloxPageResponseSchema = (item) => import_zod.default.object({
  previousPageCursor: RobloxCursorSchema.nullable(),
  nextPageCursor: RobloxCursorSchema.nullable(),
  data: import_zod.default.array(item)
});
var RobloxErrorResponseSchema = import_zod.default.object({
  errors: import_zod.default.array(import_zod.default.object({
    code: import_zod.default.number(),
    subcode: import_zod.default.number().optional(),
    message: import_zod.default.string(),
    userFacingMessage: import_zod.default.string().optional(),
    field: import_zod.default.string().optional()
  }))
});

// src/types/users.ts
var import_zod2 = __toESM(require("zod"), 1);
var RobloxBirthYearSchema = import_zod2.default.number().int().max((/* @__PURE__ */ new Date()).getFullYear()).brand("RobloxBirthYear");
var RobloxBirthMonthSchema = import_zod2.default.number().int().min(1).max(12).brand("RobloxBirthMonth");
var RobloxBirthDaySchema = import_zod2.default.number().int().min(1).max(31).brand("RobloxBirthDay");
var RobloxUserIdSchema = import_zod2.default.number().int().min(1).brand("RobloxUserId");
var RobloxUserNameSchema = import_zod2.default.string().brand("RobloxUserName");
var RobloxUserDisplaynameSchema = import_zod2.default.string().brand("RobloxUserDisplayname");
var RobloxGender = { Unknown: 1, Male: 2, Female: 3 };
var RobloxGenderSchema = import_zod2.default.literal([1, 2, 3]);
var RobloxAgeBracket = { Over13: 0, Under13: 1 };
var RobloxAgeBracketSchema = import_zod2.default.number().int();
var RobloxAuthenticatedUserSchema = import_zod2.default.object({
  id: RobloxUserIdSchema,
  name: RobloxUserNameSchema,
  displayName: RobloxUserDisplaynameSchema
});
var RobloxUserSchema = RobloxAuthenticatedUserSchema.extend({
  hasVerifiedBadge: import_zod2.default.boolean()
});
var RobloxUserDetailSchema = RobloxUserSchema.extend({
  description: import_zod2.default.string(),
  created: import_zod2.default.string(),
  isBanned: import_zod2.default.boolean(),
  /** 사용되지 않는 legacy 필드. 항상 null */
  externalAppDisplayName: import_zod2.default.string().nullable()
});
var RobloxUserByNameSchema = RobloxUserSchema.extend({
  requestedUsername: import_zod2.default.string()
});
var RobloxUserSearchResultSchema = RobloxUserSchema.extend({
  previousUsernames: import_zod2.default.array(import_zod2.default.string())
});
var RobloxUsernameHistoryEntrySchema = import_zod2.default.object({
  name: RobloxUserNameSchema
});
var RobloxBirthdateSchema = import_zod2.default.object({
  birthMonth: RobloxBirthMonthSchema,
  birthDay: RobloxBirthDaySchema,
  birthYear: RobloxBirthYearSchema
});
var RobloxUserDescriptionSchema = import_zod2.default.object({
  description: import_zod2.default.string()
});
var RobloxUserGenderSchema = import_zod2.default.object({
  gender: RobloxGenderSchema
});
var RobloxUserAgeBracketSchema = import_zod2.default.object({
  ageBracket: RobloxAgeBracketSchema
});
var RobloxUserCountryCodeSchema = import_zod2.default.object({
  countryCode: import_zod2.default.string()
});
var RobloxUserRolesSchema = import_zod2.default.object({
  roles: import_zod2.default.array(import_zod2.default.string())
});
var RobloxUsersResponseSchema = RobloxArrayResponseSchema(RobloxUserSchema);
var RobloxUsersByNameResponseSchema = RobloxArrayResponseSchema(RobloxUserByNameSchema);
var RobloxUserSearchResponseSchema = RobloxPageResponseSchema(RobloxUserSearchResultSchema);
var RobloxUsernameHistoryResponseSchema = RobloxPageResponseSchema(RobloxUsernameHistoryEntrySchema);
var RobloxSetBirthdateRequestSchema = RobloxBirthdateSchema.extend({
  password: import_zod2.default.string()
});
var RobloxSetDescriptionRequestSchema = import_zod2.default.object({
  description: import_zod2.default.string()
});
var RobloxSetGenderRequestSchema = import_zod2.default.object({
  gender: RobloxGenderSchema
});
var RobloxUsersRequestSchema = import_zod2.default.object({
  userIds: import_zod2.default.array(RobloxUserIdSchema),
  excludeBannedUsers: import_zod2.default.boolean().optional()
});
var RobloxUsersByNameRequestSchema = import_zod2.default.object({
  usernames: import_zod2.default.array(import_zod2.default.string()),
  excludeBannedUsers: import_zod2.default.boolean().optional()
});
var RobloxSetDisplayNameRequestSchema = import_zod2.default.object({
  newDisplayName: import_zod2.default.string()
});
var RobloxUsernameHistoryQuerySchema = import_zod2.default.object({
  limit: RobloxPageLimitSchema.optional(),
  cursor: RobloxCursorSchema.optional(),
  sortOrder: RobloxSortOrderSchema.optional()
});
var RobloxUserSearchQuerySchema = import_zod2.default.object({
  keyword: import_zod2.default.string(),
  sessionId: import_zod2.default.string().optional(),
  limit: RobloxPageLimitSchema.optional(),
  cursor: RobloxCursorSchema.optional()
});
var RobloxValidateDisplayNameQuerySchema = import_zod2.default.object({
  displayName: import_zod2.default.string(),
  birthdate: import_zod2.default.string()
});
var RobloxValidateUserDisplayNameQuerySchema = import_zod2.default.object({
  displayName: import_zod2.default.string()
});

// src/apis/users.ts
var ORIGIN = "https://users.roblox.com";
var USER_AGENT = "Roblox/WinInet";
var MULTI_GET_LIMIT = 100;
var detailRoute = {
  bucket: "users GET /v1/users/{userId}",
  limit: 1,
  group: () => "",
  async send(http, [userId], onHeaders) {
    return [await nullOn([404], onHeaders, () => http().path("v1", "users", userId).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxUserDetailSchema)).request())];
  }
};
var byIdRoute = {
  bucket: "users POST /v1/users",
  limit: MULTI_GET_LIMIT,
  group: (t) => String(t.excludeBannedUsers),
  async send(http, targets, onHeaders) {
    const res = await http().path("v1", "users").body("overwrite", { userIds: targets.map((t) => t.userId), excludeBannedUsers: targets[0].excludeBannedUsers }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxUsersResponseSchema)).request();
    const byId = new Map(res.data.map((u) => [u.id, u]));
    return targets.map((t) => byId.get(t.userId) ?? null);
  }
};
var ProfilesSchema = import_zod3.default.object({
  profileDetails: import_zod3.default.array(import_zod3.default.object({
    userId: import_zod3.default.number(),
    names: import_zod3.default.object({ username: import_zod3.default.string().nullable(), displayName: import_zod3.default.string().nullable() }),
    isVerified: import_zod3.default.boolean(),
    isDeleted: import_zod3.default.boolean().nullish()
  }))
});
var profilesRoute = {
  bucket: "apis POST /user-profile-api/v1/user/profiles/get-profiles",
  origin: "https://apis.roblox.com",
  limit: 200,
  group: (t) => t.excludeBannedUsers ? null : "",
  async send(http, targets, onHeaders) {
    const res = await http().path("user-profile-api", "v1", "user", "profiles", "get-profiles").body("overwrite", { userIds: targets.map((t) => t.userId), fields: ["names.username", "names.displayName", "isVerified", "isDeleted"] }).middlewares(captureHeaders(onHeaders)).middlewares(validate(ProfilesSchema)).request();
    const byId = new Map(res.profileDetails.map((p) => [p.userId, p]));
    return targets.map((t) => {
      const p = byId.get(t.userId);
      if (!p?.names.username) return null;
      if (p.isDeleted) return RobloxBatchSkip;
      return RobloxUserSchema.parse({ id: p.userId, name: p.names.username, displayName: p.names.displayName ?? p.names.username, hasVerifiedBadge: p.isVerified });
    });
  }
};
var byNameRoute = {
  bucket: "users POST /v1/usernames/users",
  limit: MULTI_GET_LIMIT,
  group: (t) => String(t.excludeBannedUsers),
  async send(http, targets, onHeaders) {
    const res = await http().path("v1", "usernames", "users").body("overwrite", { usernames: targets.map((t) => t.username), excludeBannedUsers: targets[0].excludeBannedUsers }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxUsersByNameResponseSchema)).request();
    const byName = new Map(res.data.map((u) => [u.requestedUsername.toLowerCase(), u]));
    return targets.map((t) => byName.get(t.username.toLowerCase()) ?? null);
  }
};
var RobloxUsersApi = class {
  constructor(config, thumbnails) {
    this.config = config;
    this.thumbnails = thumbnails;
    this.http = createHttp(config, ORIGIN, { userAgent: USER_AGENT });
    this.details = new RobloxBatcher(config, ORIGIN, [detailRoute], { userAgent: USER_AGENT });
    this.byId = new RobloxBatcher(config, ORIGIN, [profilesRoute, byIdRoute], { userAgent: USER_AGENT });
    this.byName = new RobloxBatcher(config, ORIGIN, [byNameRoute], { userAgent: USER_AGENT });
  }
  config;
  thumbnails;
  http;
  details;
  byId;
  byName;
  ttl(method) {
    return resolveTtl(this.config, "users", method);
  }
  // ── 공개 조회 ──────────────────────────────────────
  // 배열을 받는 메서드는 결과를 입력 순서로 돌려주고, 없는 유저는 뺀다.
  // 일부 항목이 실패하면 받은 결과를 담아 RobloxPartialError를 던진다.
  // 같은 틱에 들어온 호출은 모아서 보내므로 따로따로 불러도 된다.
  /**
   * 유저들을 받아 실패가 있으면 RobloxPartialError로 던진다. `thumbnail`이 있으면 아바타 썸네일을 붙인다 —
   * id를 아는 경우 users 조회와 동시에 보내고, 썸네일을 받지 못한 유저는 `thumbnail: null`이다.
   */
  async attach(users, ids, option) {
    if (!option) {
      const { values: values2, errors: errors2 } = await users;
      return finish(found(values2), errors2);
    }
    const target = option === true ? { type: "AvatarHeadShot" } : option;
    const thumbnails = (list2) => this.thumbnails.getSettled(list2.map((targetId) => ({ ...target, targetId }))).then((s) => s.values);
    const [{ values, errors }, early] = await Promise.all([users, ids ? thumbnails(ids) : null]);
    const list = found(values);
    const byId = new Map(early ? ids.map((id2, i) => [id2, early[i]]) : []);
    if (!early) (await thumbnails(list.map((u) => u.id))).forEach((t, i) => byId.set(list[i].id, t));
    return finish(list.map((u) => ({ ...u, thumbnail: byId.get(u.id) ?? null })), errors);
  }
  getUserDetails(userIds, opts = {}) {
    const users = settle(userIds, (id2) => cached(this.config, { service: "users", method: "getUserDetails", userId: id2 }, this.ttl("getUserDetails"), () => this.details.load(String(id2), id2)));
    return this.attach(users, userIds, opts.thumbnail);
  }
  getUsers(userIds, opts = {}) {
    const excludeBannedUsers = opts.excludeBannedUsers ?? false;
    const users = settle(userIds, (userId) => {
      const key = `${userId}:${excludeBannedUsers}`;
      return cached(this.config, { service: "users", method: "getUsers", userId, excludeBannedUsers }, this.ttl("getUsers"), () => this.byId.load(key, { userId, excludeBannedUsers }));
    });
    return this.attach(users, userIds, opts.thumbnail);
  }
  getUsersByNames(usernames, opts = {}) {
    const excludeBannedUsers = opts.excludeBannedUsers ?? false;
    const users = settle(usernames, (username) => {
      const lower = username.toLowerCase();
      const key = `${lower}:${excludeBannedUsers}`;
      return cached(this.config, { service: "users", method: "getUsersByNames", username: lower, excludeBannedUsers }, this.ttl("getUsersByNames"), () => this.byName.load(key, { username, excludeBannedUsers }));
    });
    return this.attach(users, null, opts.thumbnail);
  }
  /** GET /v1/users/search */
  searchUsers(query) {
    return this.http().path("v1", "users", "search").query(query).middlewares(validate(RobloxUserSearchResponseSchema)).request();
  }
  /** GET /v1/users/{userId}/username-history */
  getUsernameHistory(userId, query = {}) {
    return cached(
      this.config,
      { service: "users", method: "getUsernameHistory", userId, query },
      this.ttl("getUsernameHistory"),
      () => this.http().path("v1", "users", userId, "username-history").query(query).middlewares(validate(RobloxUsernameHistoryResponseSchema)).request()
    );
  }
  /** GET /v1/display-names/validate — 신규 유저용. 사용할 수 없으면 FETCH_FAILED(400/429)로 실패한다. */
  async validateDisplayName(query) {
    await this.http().path("v1", "display-names", "validate").query(query).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  // ── 인증된 계정 ────────────────────────────────────
  /** GET /v1/users/authenticated */
  getAuthenticated() {
    return this.http().path("v1", "users", "authenticated").middlewares(validate(RobloxAuthenticatedUserSchema)).request();
  }
  /** GET /v1/users/authenticated/age-bracket */
  async getAgeBracket() {
    const res = await this.http().path("v1", "users", "authenticated", "age-bracket").middlewares(validate(RobloxUserAgeBracketSchema)).request();
    return res.ageBracket;
  }
  /** GET /v1/users/authenticated/country-code */
  async getCountryCode() {
    const res = await this.http().path("v1", "users", "authenticated", "country-code").middlewares(validate(RobloxUserCountryCodeSchema)).request();
    return res.countryCode;
  }
  /** GET /v1/users/authenticated/roles */
  async getRoles() {
    const res = await this.http().path("v1", "users", "authenticated", "roles").middlewares(validate(RobloxUserRolesSchema)).request();
    return res.roles;
  }
  /** GET /v1/birthdate */
  getBirthdate() {
    return this.http().path("v1", "birthdate").middlewares(validate(RobloxBirthdateSchema)).request();
  }
  /** POST /v1/birthdate — 비밀번호가 필요하다. */
  async setBirthdate(request) {
    await this.http().path("v1", "birthdate").body("overwrite", request).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** GET /v1/description */
  async getDescription() {
    const res = await this.http().path("v1", "description").middlewares(validate(RobloxUserDescriptionSchema)).request();
    return res.description;
  }
  /** POST /v1/description — 필터링된 뒤의 설명을 돌려준다. */
  async setDescription(description) {
    const res = await this.http().path("v1", "description").body("overwrite", { description }).middlewares(validate(RobloxUserDescriptionSchema)).request();
    return res.description;
  }
  /** GET /v1/gender */
  async getGender() {
    const res = await this.http().path("v1", "gender").middlewares(validate(RobloxUserGenderSchema)).request();
    return res.gender;
  }
  /** POST /v1/gender */
  async setGender(gender) {
    await this.http().path("v1", "gender").body("overwrite", { gender }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** GET /v1/users/{userId}/display-names/validate — 기존 유저용 */
  async validateUserDisplayName(userId, displayName) {
    await this.http().path("v1", "users", userId, "display-names", "validate").query({ displayName }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** PATCH /v1/users/{userId}/display-names — 인증된 본인만 바꿀 수 있다. */
  async setDisplayName(userId, newDisplayName) {
    await this.http().method("PATCH").path("v1", "users", userId, "display-names").body("overwrite", { newDisplayName }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
};

// src/types/thumbnails.ts
var import_zod4 = __toESM(require("zod"), 1);
var RobloxThumbnailStateSchema = import_zod4.default.enum(["Error", "Completed", "InReview", "Pending", "Blocked", "TemporarilyUnavailable"]);
var RobloxThumbnailReturnPolicySchema = import_zod4.default.enum(["PlaceHolder", "ForcePlaceHolder", "AutoGenerated", "ForceAutoGenerated"]);
var sizes = (...values) => import_zod4.default.enum(values);
var RobloxThumbnailSizes = {
  Avatar: sizes("30x30", "48x48", "60x60", "75x75", "100x100", "110x110", "140x140", "150x150", "150x200", "180x180", "250x250", "352x352", "420x420", "720x720"),
  AvatarHeadShot: sizes("48x48", "50x50", "60x60", "75x75", "100x100", "110x110", "150x150", "180x180", "352x352", "420x420", "720x720"),
  AvatarBust: sizes("48x48", "50x50", "60x60", "75x75", "100x100", "150x150", "180x180", "352x352", "420x420"),
  Outfit: sizes("150x150", "420x420"),
  Asset: sizes("30x30", "42x42", "50x50", "60x62", "75x75", "110x110", "140x140", "150x150", "160x100", "160x600", "250x250", "256x144", "300x250", "304x166", "384x216", "396x216", "420x420", "480x270", "512x512", "576x324", "700x700", "728x90", "768x432", "1200x80", "330x110", "660x220", "1320x440", "720x228", "1440x456", "930x480"),
  GameIcon: sizes("50x50", "128x128", "150x150", "256x256", "420x420", "512x512"),
  PlaceIcon: sizes("50x50", "128x128", "150x150", "256x256", "420x420", "512x512"),
  GameThumbnail: sizes("768x432", "576x324", "480x270", "384x216", "256x144"),
  BadgeIcon: sizes("150x150"),
  GamePass: sizes("150x150"),
  BundleThumbnail: sizes("150x150", "420x420"),
  GroupIcon: sizes("150x150", "420x420"),
  DeveloperProduct: sizes("150x150", "420x420")
};
var RobloxThumbnailSchema = import_zod4.default.object({
  targetId: import_zod4.default.number(),
  state: RobloxThumbnailStateSchema,
  imageUrl: import_zod4.default.string().nullable(),
  version: import_zod4.default.string().nullable()
});
var RobloxThumbnailBatchItemSchema = RobloxThumbnailSchema.extend({
  requestId: import_zod4.default.string().nullable(),
  errorCode: import_zod4.default.number(),
  errorMessage: import_zod4.default.string()
});
var RobloxUniverseThumbnailsSchema = import_zod4.default.object({
  universeId: RobloxUniverseIdSchema,
  error: import_zod4.default.object({ code: import_zod4.default.number(), message: import_zod4.default.string() }).nullable(),
  thumbnails: import_zod4.default.array(RobloxThumbnailSchema)
});
var RobloxThumbnailsResponseSchema = import_zod4.default.object({ data: import_zod4.default.array(RobloxThumbnailSchema) });
var RobloxThumbnailBatchResponseSchema = import_zod4.default.object({ data: import_zod4.default.array(RobloxThumbnailBatchItemSchema) });
var RobloxUniverseThumbnailsResponseSchema = import_zod4.default.object({ data: import_zod4.default.array(RobloxUniverseThumbnailsSchema) });

// src/apis/thumbnails.ts
var ORIGIN2 = "https://thumbnails.roblox.com";
var MULTI_GET_LIMIT2 = 100;
var PENDING_RETRIES = 4;
var PENDING_DELAY = 1e3;
var FINAL_STATES = /* @__PURE__ */ new Set(["Completed", "Blocked"]);
var DEFAULT_SIZE = { GameThumbnail: "768x432" };
var SINGLE_TYPES = /* @__PURE__ */ new Set(["AnimatedAsset", "Avatar3d", "Outfit3d", "Asset3d"]);
function normalize(target) {
  const t = { ...target };
  if (!SINGLE_TYPES.has(t.type)) {
    t.size ??= DEFAULT_SIZE[t.type] ?? "150x150";
    t.format ??= "Png";
    t.isCircular ??= false;
  }
  const out = {};
  for (const key of Object.keys(t).sort()) {
    const value = t[key];
    if (value !== void 0) out[key] = value;
  }
  return out;
}
var keyOf = (t) => JSON.stringify(t);
var missing = (t) => ({ targetId: t.targetId ?? 0, state: "Error", imageUrl: null, version: null });
var placeHeader = (t) => t.placeId ? { "Roblox-Place-Id": String(t.placeId) } : {};
var BATCH_TYPES = /* @__PURE__ */ new Set([
  "Avatar",
  "AvatarHeadShot",
  "AvatarBust",
  "Outfit",
  "Asset",
  "GameIcon",
  "PlaceIcon",
  "GameThumbnail",
  "BadgeIcon",
  "GamePass",
  "BundleThumbnail",
  "GroupIcon",
  "DeveloperProduct",
  "Look",
  "Screenshot",
  "CreatorContextAsset"
]);
var batchRoute = {
  bucket: "thumbnails POST /v1/batch",
  limit: MULTI_GET_LIMIT2,
  group(t) {
    if (!BATCH_TYPES.has(t.type)) return null;
    if (t.returnPolicy && t.returnPolicy !== "PlaceHolder") return null;
    return String(t.placeId ?? "");
  },
  async send(http, targets, onHeaders) {
    const body = targets.map((t, i) => ({
      requestId: String(i),
      type: t.type,
      targetId: t.targetId,
      token: t.token,
      size: t.size,
      format: t.format,
      isCircular: t.isCircular,
      includeBackground: t.includeBackground,
      includeProfileFrame: t.includeProfileFrame,
      accessContext: t.accessContext,
      headShape: t.headShape
    }));
    const res = await http().path("v1", "batch").headers("merge", placeHeader(targets[0])).body("overwrite", body).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxThumbnailBatchResponseSchema)).request();
    const byId = new Map(res.data.map((r) => [r.requestId, r]));
    return targets.map((t, i) => {
      const r = byId.get(String(i));
      return r ? RobloxThumbnailSchema.parse(r) : missing(t);
    });
  }
};
function listRoute(type, path, idsParam, limit) {
  const pathOf = (t) => path.map((seg) => seg === "{universeId}" ? String(t.universeId) : seg);
  return {
    bucket: `thumbnails GET /${path.join("/")} (${limit})`,
    limit: MULTI_GET_LIMIT2,
    group(t) {
      if (t.type !== type || t.targetId === void 0) return null;
      if (path.includes("{universeId}") && t.universeId === void 0) return null;
      const { targetId: _, ...rest } = t;
      return keyOf(rest);
    },
    async send(http, targets, onHeaders) {
      const t = targets[0];
      const query = {
        [idsParam]: targets.map((x) => x.targetId).join(","),
        size: t.size,
        format: t.format,
        isCircular: t.isCircular
      };
      if (t.includeBackground !== void 0) query.includeBackground = t.includeBackground;
      if (t.includeProfileFrame !== void 0) query.includeProfileFrame = t.includeProfileFrame;
      if (t.returnPolicy !== void 0) query.returnPolicy = t.returnPolicy;
      const res = await http().path(...pathOf(t)).headers("merge", placeHeader(t)).query(query).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxThumbnailsResponseSchema)).request();
      const byId = new Map(res.data.map((r) => [r.targetId, r]));
      return targets.map((x) => byId.get(x.targetId) ?? missing(x));
    }
  };
}
function singleRoute(type, path, idParam, extra2 = () => ({})) {
  return {
    bucket: `thumbnails GET /${path.join("/")}`,
    limit: 1,
    group: (t) => t.type === type ? "" : null,
    async send(http, [t], onHeaders) {
      const res = await http().path(...path).headers("merge", placeHeader(t)).query({ [idParam]: t.targetId, ...extra2(t) }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxThumbnailSchema)).request();
      return [res];
    }
  };
}
var ROUTES = [
  batchRoute,
  listRoute("Avatar", ["v1", "users", "avatar"], "userIds", "60/min"),
  listRoute("AvatarHeadShot", ["v1", "users", "avatar-headshot"], "userIds", "120/min"),
  listRoute("AvatarBust", ["v1", "users", "avatar-bust"], "userIds", "60/min"),
  listRoute("Outfit", ["v1", "users", "outfits"], "userOutfitIds", "60/min"),
  listRoute("Asset", ["v1", "assets"], "assetIds", "50/s"),
  listRoute("GameIcon", ["v1", "games", "icons"], "universeIds", "1200/min"),
  listRoute("PlaceIcon", ["v1", "places", "gameicons"], "placeIds", "60/min"),
  listRoute("GameThumbnail", ["v1", "games", "{universeId}", "thumbnails"], "thumbnailIds", "60/min"),
  listRoute("BadgeIcon", ["v1", "badges", "icons"], "badgeIds", "100/min"),
  listRoute("GamePass", ["v1", "game-passes"], "gamePassIds", "100/min"),
  listRoute("BundleThumbnail", ["v1", "bundles", "thumbnails"], "bundleIds", "60/min"),
  listRoute("GroupIcon", ["v1", "groups", "icons"], "groupIds", "100/min"),
  listRoute("DeveloperProduct", ["v1", "developer-products", "icons"], "developerProductIds", "60/min"),
  singleRoute("AnimatedAsset", ["v1", "asset-thumbnail-animated"], "assetId"),
  singleRoute("Avatar3d", ["v1", "users", "avatar-3d"], "userId"),
  singleRoute("Outfit3d", ["v1", "users", "outfit-3d"], "outfitId"),
  singleRoute("Asset3d", ["v1", "assets-thumbnail-3d"], "assetId", (t) => t.useGltf === void 0 ? {} : { useGltf: t.useGltf })
];
var gameThumbnailsRoute = {
  bucket: "thumbnails GET /v1/games/multiget/thumbnails",
  limit: MULTI_GET_LIMIT2,
  group: (t) => keyOf(t.query),
  async send(http, targets, onHeaders) {
    const res = await http().path("v1", "games", "multiget", "thumbnails").query({ size: "768x432", format: "Png", isCircular: false, ...targets[0].query, universeIds: targets.map((t) => t.universeId).join(",") }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxUniverseThumbnailsResponseSchema)).request();
    const byId = new Map(res.data.map((u) => [u.universeId, u]));
    return targets.map((t) => byId.get(t.universeId) ?? null);
  }
};
var RobloxThumbnailsApi = class {
  constructor(config) {
    this.config = config;
    this.gameThumbnails = new RobloxBatcher(config, ORIGIN2, [gameThumbnailsRoute]);
    this.batcher = new RobloxBatcher(config, ORIGIN2, ROUTES, {
      again: (result, tries) => result.state === "Pending" && tries < PENDING_RETRIES ? (tries + 1) * PENDING_DELAY : null
    });
  }
  config;
  batcher;
  gameThumbnails;
  ttl(method) {
    return resolveTtl(this.config, "thumbnails", method);
  }
  /**
   * 썸네일들. 결과는 입력과 같은 순서이고, 타입이 섞여도 된다. 하나만 필요하면 원소 하나짜리 배열을 넣는다.
   * 엔드포인트는 대상과 남은 한도를 보고 라이브러리가 고른다. 같은 틱에 들어온 호출은 모아서 보내고,
   * Pending이면 잠시 기다렸다 다시 묻는다. 없는 id는 `state: "Error"`로 돌아온다.
   * 요청이 실패한 대상이 있으면 `RobloxPartialError`를 던진다 (`results`에는 받은 것만 있어 순서가 입력과 어긋난다).
   */
  async get(targets) {
    const { values, errors } = await settle(targets, (t) => this.load(t));
    return finish(found(values), errors);
  }
  /** `get`과 같지만 던지지 않는다. `values`는 입력과 같은 자리이고 요청이 실패한 대상은 null이며, 그 에러는 `errors`에 있다 */
  async getSettled(targets) {
    return settle(targets, (t) => this.load(t));
  }
  load(target) {
    const normalized = normalize(target);
    const key = keyOf(normalized);
    const run = () => this.batcher.load(key, normalized);
    if (normalized.token !== void 0) return run();
    return cached(this.config, { service: "thumbnails", method: "get", target: normalized }, this.ttl("get"), run, (r) => FINAL_STATES.has(r.state));
  }
  /**
   * GET /v1/games/multiget/thumbnails — universe마다 등록된 썸네일 목록. 결과는 입력 순서이고 없는 universe는 뺀다.
   * 같은 틱에 들어온 호출은 옵션이 같으면 100개씩 묶는다.
   */
  async getGameThumbnails(universeIds, query = {}) {
    const { values, errors } = await settle(universeIds, (universeId) => cached(
      this.config,
      { service: "thumbnails", method: "getGameThumbnails", universeId, query },
      this.ttl("getGameThumbnails"),
      () => this.gameThumbnails.load(JSON.stringify([universeId, query]), { universeId, query })
    ));
    return finish(found(values), errors);
  }
};

// src/core/viewer.ts
var hashes = /* @__PURE__ */ new Map();
async function sha256(text) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest).slice(0, 12), (b) => b.toString(16).padStart(2, "0")).join("");
}
async function viewerKey(config) {
  if (config.mode === "extension") return "extension";
  if (config.fixedCookie) {
    let hash = hashes.get(config.fixedCookie);
    if (!hash) hashes.set(config.fixedCookie, hash = sha256(config.fixedCookie));
    return `cookie:${await hash}`;
  }
  if (!config.cookies) return "anonymous";
  return null;
}
function canAuthenticate(config) {
  return config.mode === "extension" || config.fixedCookie !== null || config.cookies !== null;
}
async function requireViewer(config) {
  const viewer = await viewerKey(config);
  if (viewer === null) throw new Error("\uC774 API\uB294 \uC694\uCCAD \uACC4\uC815\uC744 \uAE30\uC900\uC73C\uB85C \uB2F5\uD55C\uB2E4. \uCFE0\uD0A4 \uB85C\uD14C\uC774\uC158 \uB300\uC2E0 .as(cookie)\uB85C \uACC4\uC815\uC744 \uC815\uD574\uC57C \uD55C\uB2E4.");
  return viewer;
}

// src/types/presence.ts
var import_zod5 = __toESM(require("zod"), 1);
var RobloxPresenceType = { Offline: 0, Online: 1, InGame: 2, InStudio: 3 };
var RobloxPresenceTypeSchema = import_zod5.default.number().int();
var RobloxUserPresenceSchema = import_zod5.default.object({
  userId: RobloxUserIdSchema,
  userPresenceType: RobloxPresenceTypeSchema,
  lastLocation: import_zod5.default.string().nullable(),
  placeId: RobloxPlaceIdSchema.nullable(),
  rootPlaceId: RobloxPlaceIdSchema.nullable(),
  /** 접속한 서버 */
  gameId: RobloxJobIdSchema.nullable(),
  universeId: RobloxUniverseIdSchema.nullable()
});
var RobloxUserPresencesResponseSchema = import_zod5.default.object({
  userPresences: import_zod5.default.array(RobloxUserPresenceSchema)
});

// src/apis/presence.ts
var ORIGIN3 = "https://presence.roblox.com";
var MULTI_GET_LIMIT3 = 50;
var usersRoute = {
  bucket: "presence POST /v1/presence/users",
  limit: MULTI_GET_LIMIT3,
  group: () => "",
  async send(http, userIds, onHeaders) {
    const res = await http().path("v1", "presence", "users").body("overwrite", { userIds }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxUserPresencesResponseSchema)).request();
    const byId = new Map(res.userPresences.map((p) => [p.userId, p]));
    return userIds.map((id2) => byId.get(id2) ?? RobloxUserPresenceSchema.parse({
      userId: id2,
      userPresenceType: 0,
      lastLocation: null,
      placeId: null,
      rootPlaceId: null,
      gameId: null,
      universeId: null
    }));
  }
};
var RobloxPresenceApi = class {
  constructor(config) {
    this.config = config;
    this.batcher = new RobloxBatcher(config, ORIGIN3, [usersRoute]);
  }
  config;
  batcher;
  ttl(method) {
    return resolveTtl(this.config, "presence", method);
  }
  /**
   * 유저들의 접속 상태. 결과는 입력과 같은 순서다. 한 명만 필요하면 원소 하나짜리 배열을 넣는다.
   * 같은 틱에 들어온 호출은 50명씩 모아서 보내고, 한도(60회/분)가 차면 풀릴 때까지 기다린다.
   * 게임 정보는 요청 계정에 따라 다르게 보일 수 있다 — 특정 계정 관점이 필요하면 `.as(cookie)`를 쓴다.
   */
  async get(userIds) {
    const { values, errors } = await settle(userIds, (id2) => this.load(id2));
    return finish(found(values), errors);
  }
  async load(userId) {
    const run = () => this.batcher.load(String(userId), userId);
    const ttl = this.ttl("get");
    const viewer = this.config.cache ? await viewerKey(this.config) : null;
    if (viewer === null) return run();
    return cached(this.config, { service: "presence", method: "get", viewer, userId }, ttl, run);
  }
};

// src/types/games.ts
var import_zod7 = __toESM(require("zod"), 1);

// src/types/creator.ts
var import_zod6 = __toESM(require("zod"), 1);
var TYPES = { User: "User", Group: "Group", "1": "User", "2": "Group" };
function toRobloxCreator(id2, type) {
  const kind = TYPES[String(type)];
  if (kind === "User") {
    const parsed = RobloxUserIdSchema.safeParse(id2);
    if (parsed.success) return { type: "User", id: parsed.data };
  }
  if (kind === "Group") {
    const parsed = RobloxGroupIdSchema.safeParse(id2);
    if (parsed.success) return { type: "Group", id: parsed.data };
  }
  return { type: "Unknown", id: id2, rawType: type };
}
function RobloxCreatorSchema(extra2 = {}) {
  return import_zod6.default.object({ id: import_zod6.default.number(), type: import_zod6.default.union([import_zod6.default.string(), import_zod6.default.number()]), ...extra2 }).transform((value) => {
    const { id: id2, type, ...rest } = value;
    return { ...rest, ...toRobloxCreator(id2, type) };
  });
}

// src/types/games.ts
var RobloxGameCreatorSchema = RobloxCreatorSchema({
  name: import_zod7.default.string(),
  isRNVAccount: import_zod7.default.boolean().nullish(),
  hasVerifiedBadge: import_zod7.default.boolean()
});
var RobloxGameSchema = import_zod7.default.object({
  id: RobloxUniverseIdSchema,
  rootPlaceId: RobloxPlaceIdSchema,
  name: import_zod7.default.string(),
  description: import_zod7.default.string().nullable(),
  sourceName: import_zod7.default.string().nullable(),
  sourceDescription: import_zod7.default.string().nullable(),
  creator: RobloxGameCreatorSchema,
  price: import_zod7.default.number().nullable(),
  allowedGearGenres: import_zod7.default.array(import_zod7.default.string()),
  allowedGearCategories: import_zod7.default.array(import_zod7.default.string()),
  isGenreEnforced: import_zod7.default.boolean(),
  copyingAllowed: import_zod7.default.boolean(),
  playing: import_zod7.default.number(),
  visits: import_zod7.default.number(),
  maxPlayers: import_zod7.default.number(),
  created: import_zod7.default.string(),
  updated: import_zod7.default.string(),
  studioAccessToApisAllowed: import_zod7.default.boolean(),
  createVipServersAllowed: import_zod7.default.boolean(),
  /** "MorphToR6" | "MorphToR15" | "PlayerChoice" */
  universeAvatarType: import_zod7.default.string(),
  genre: import_zod7.default.string(),
  genre_l1: import_zod7.default.string().nullish(),
  genre_l2: import_zod7.default.string().nullish(),
  untranslated_genre_l1: import_zod7.default.string().nullish(),
  isAllGenre: import_zod7.default.boolean(),
  isFavoritedByUser: import_zod7.default.boolean(),
  favoritedCount: import_zod7.default.number(),
  canonicalUrlPath: import_zod7.default.string().nullish(),
  isContentRestricted: import_zod7.default.boolean().nullish(),
  licenseDescription: import_zod7.default.string().nullish(),
  refundLink: import_zod7.default.string().nullish(),
  localizedFiatPrice: import_zod7.default.string().nullish()
});
var RobloxFiatPurchaseDataSchema = import_zod7.default.object({
  localizedFiatPrice: import_zod7.default.string().nullish(),
  basePriceId: import_zod7.default.string().nullish()
});
var RobloxPlaceDetailsSchema = import_zod7.default.object({
  placeId: RobloxPlaceIdSchema,
  name: import_zod7.default.string(),
  description: import_zod7.default.string().nullish(),
  sourceName: import_zod7.default.string().nullish(),
  sourceDescription: import_zod7.default.string().nullish(),
  url: import_zod7.default.string(),
  builder: import_zod7.default.string(),
  /** 유저 id인지 그룹 id인지 응답이 알려 주지 않는다. 필요하면 `getGames([universeId])`의 `creator`를 쓴다 */
  builderId: import_zod7.default.number(),
  hasVerifiedBadge: import_zod7.default.boolean(),
  isPlayable: import_zod7.default.boolean().nullish(),
  reasonProhibited: import_zod7.default.string().nullish(),
  universeId: RobloxUniverseIdSchema,
  universeRootPlaceId: RobloxPlaceIdSchema,
  price: import_zod7.default.number().nullish(),
  imageToken: import_zod7.default.string().nullish(),
  fiatPurchaseData: RobloxFiatPurchaseDataSchema.nullish()
});
var RobloxGameProductSchema = import_zod7.default.object({
  universeId: RobloxUniverseIdSchema,
  isForSale: import_zod7.default.boolean(),
  productId: import_zod7.default.number().nullable(),
  price: import_zod7.default.number().nullable(),
  /** 유저 id인지 그룹 id인지 응답이 알려 주지 않는다. 필요하면 `getGames([universeId])`의 `creator`를 쓴다 */
  sellerId: import_zod7.default.number().nullable(),
  fiatPurchaseData: RobloxFiatPurchaseDataSchema.nullish()
});
var RobloxGamePlayabilitySchema = import_zod7.default.object({
  universeId: RobloxUniverseIdSchema,
  /** "Playable", "GuestProhibited", "PurchaseRequired" 등 (스펙은 숫자 enum이라 적지만 문자열로 온다) */
  playabilityStatus: import_zod7.default.string(),
  isPlayable: import_zod7.default.boolean(),
  unplayableDisplayText: import_zod7.default.string().nullable(),
  playableUxTreatment: import_zod7.default.unknown().nullish(),
  upsellUxTreatment: import_zod7.default.unknown().nullish(),
  privatePlaytestInfo: import_zod7.default.unknown().nullish(),
  demoModeAvailable: import_zod7.default.boolean().nullish()
});
var RobloxGameVotesSchema = import_zod7.default.object({
  id: RobloxUniverseIdSchema,
  upVotes: import_zod7.default.number(),
  downVotes: import_zod7.default.number()
});
var RobloxUserGameVoteSchema = import_zod7.default.object({
  canVote: import_zod7.default.boolean(),
  /** true = 좋아요, false = 싫어요, null = 안 함 */
  userVote: import_zod7.default.boolean().nullable(),
  reasonForNotVoteable: import_zod7.default.string().nullable()
});
var RobloxGameMediaSchema = import_zod7.default.object({
  assetTypeId: import_zod7.default.number(),
  /** "Image" | "YouTubeVideo" | "GamePreviewVideo" ... */
  assetType: import_zod7.default.string(),
  /** 동영상 항목은 비어 올 수 있다 (0 등은 null로 바꾼다) */
  imageId: RobloxAssetIdSchema.nullable().catch(null),
  videoHash: import_zod7.default.string().nullable(),
  videoTitle: import_zod7.default.string().nullable(),
  approved: import_zod7.default.boolean(),
  altText: import_zod7.default.string().nullable(),
  videoId: import_zod7.default.string().nullish()
});
var RobloxRecommendedGameSchema = import_zod7.default.object({
  creatorId: import_zod7.default.number(),
  creatorName: import_zod7.default.string(),
  creatorType: import_zod7.default.string(),
  creatorHasVerifiedBadge: import_zod7.default.boolean(),
  totalUpVotes: import_zod7.default.number(),
  totalDownVotes: import_zod7.default.number(),
  universeId: RobloxUniverseIdSchema,
  name: import_zod7.default.string(),
  placeId: RobloxPlaceIdSchema,
  playerCount: import_zod7.default.number(),
  imageToken: import_zod7.default.string().nullable(),
  isSponsored: import_zod7.default.boolean(),
  nativeAdData: import_zod7.default.string().nullable(),
  isShowSponsoredLabel: import_zod7.default.boolean(),
  price: import_zod7.default.number().nullable(),
  analyticsIdentifier: import_zod7.default.string().nullable(),
  gameDescription: import_zod7.default.string().nullable(),
  genre: import_zod7.default.string().nullable(),
  minimumAge: import_zod7.default.number().nullish(),
  ageRecommendationDisplayName: import_zod7.default.string().nullish(),
  canonicalUrlPath: import_zod7.default.string().nullish()
}).transform(({ creatorId, creatorName, creatorType, creatorHasVerifiedBadge, ...rest }) => ({
  ...rest,
  creator: { ...toRobloxCreator(creatorId, creatorType), name: creatorName, hasVerifiedBadge: creatorHasVerifiedBadge }
}));
var RobloxGameRecommendationsSchema = import_zod7.default.object({
  games: import_zod7.default.array(RobloxRecommendedGameSchema),
  /** 마지막 페이지면 null */
  nextPaginationKey: import_zod7.default.string().nullable()
});
var RelatedPlaceSchema = import_zod7.default.object({
  id: RobloxPlaceIdSchema,
  name: import_zod7.default.string().nullish()
});
var RobloxGameSummarySchema = import_zod7.default.object({
  id: RobloxUniverseIdSchema,
  name: import_zod7.default.string(),
  description: import_zod7.default.string().nullable(),
  creator: RobloxCreatorSchema({ name: import_zod7.default.string().nullish() }),
  rootPlace: RelatedPlaceSchema,
  created: import_zod7.default.string(),
  updated: import_zod7.default.string(),
  placeVisits: import_zod7.default.number()
});
var RobloxFavoriteGameSchema = RobloxGameSummarySchema.extend({
  price: import_zod7.default.number().nullable()
});
var RobloxServerTypeSchema = import_zod7.default.enum(["Public", "Friend"]);
var RobloxServerPlayerRawSchema = import_zod7.default.object({
  playerToken: import_zod7.default.string(),
  id: RobloxUserIdSchema,
  name: import_zod7.default.string(),
  displayName: import_zod7.default.string()
});
var RobloxServerRawSchema = import_zod7.default.object({
  id: RobloxJobIdSchema,
  maxPlayers: import_zod7.default.number(),
  playing: import_zod7.default.number().nullish(),
  /** 인증된 요청에서만 채워진다 (아바타 헤드샷의 token 대상) */
  playerTokens: import_zod7.default.array(import_zod7.default.string()).nullish(),
  players: import_zod7.default.array(RobloxServerPlayerRawSchema).nullish(),
  fps: import_zod7.default.number().nullish(),
  ping: import_zod7.default.number().nullish()
});
var RobloxServerPageRawSchema = RobloxPageResponseSchema(RobloxServerRawSchema);
var RobloxPrivateServerRawSchema = import_zod7.default.object({
  id: RobloxJobIdSchema.nullish(),
  maxPlayers: import_zod7.default.number(),
  playing: import_zod7.default.number().nullish(),
  playerTokens: import_zod7.default.array(import_zod7.default.string()).nullish(),
  players: import_zod7.default.array(RobloxServerPlayerRawSchema).nullish(),
  fps: import_zod7.default.number().nullish(),
  ping: import_zod7.default.number().nullish(),
  name: import_zod7.default.string(),
  vipServerId: RobloxPrivateServerIdSchema,
  accessCode: import_zod7.default.string().nullish(),
  owner: import_zod7.default.object({
    id: RobloxUserIdSchema,
    name: import_zod7.default.string(),
    displayName: import_zod7.default.string(),
    hasVerifiedBadge: import_zod7.default.boolean().nullish()
  }).nullish()
});
var RobloxPrivateServerPageRawSchema = import_zod7.default.object({
  gameJoinRestricted: import_zod7.default.boolean().nullish(),
  previousPageCursor: RobloxCursorSchema.nullable(),
  nextPageCursor: RobloxCursorSchema.nullable(),
  data: import_zod7.default.array(RobloxPrivateServerRawSchema)
});
var RobloxMyPrivateServerPageSchema = import_zod7.default.object({
  previousPageCursor: RobloxCursorSchema.nullable(),
  nextPageCursor: RobloxCursorSchema.nullable(),
  data: import_zod7.default.array(import_zod7.default.record(import_zod7.default.string(), import_zod7.default.unknown()))
});
var RobloxPrivateServerSubscriptionSchema = import_zod7.default.object({
  active: import_zod7.default.boolean(),
  expired: import_zod7.default.boolean().nullish(),
  expirationDate: import_zod7.default.string().nullish(),
  price: import_zod7.default.number().nullish(),
  canRenew: import_zod7.default.boolean().nullish(),
  hasInsufficientFunds: import_zod7.default.boolean().nullish(),
  hasRecurringProfile: import_zod7.default.boolean().nullish(),
  hasPriceChanged: import_zod7.default.boolean().nullish(),
  purchaseScheduleId: import_zod7.default.number().nullish(),
  totalDiscountAmountInRobux: import_zod7.default.number().nullish(),
  metadata: import_zod7.default.unknown().nullish()
});
var RobloxPrivateServerPermissionsSchema = import_zod7.default.object({
  clanAllowed: import_zod7.default.boolean(),
  enemyClanId: RobloxGroupIdSchema.nullish(),
  friendsAllowed: import_zod7.default.boolean(),
  users: import_zod7.default.array(import_zod7.default.object({ id: RobloxUserIdSchema, name: import_zod7.default.string(), displayName: import_zod7.default.string() }))
});
var RobloxPrivateServerDetailSchema = import_zod7.default.object({
  id: RobloxPrivateServerIdSchema,
  name: import_zod7.default.string(),
  game: import_zod7.default.unknown().nullish(),
  joinCode: import_zod7.default.string().nullish(),
  active: import_zod7.default.boolean(),
  subscription: RobloxPrivateServerSubscriptionSchema.nullish(),
  permissions: RobloxPrivateServerPermissionsSchema.nullish(),
  link: import_zod7.default.string().nullish()
});
var RobloxPrivateServerInviteSchema = import_zod7.default.object({
  canInvite: import_zod7.default.boolean(),
  doesOwnerPrivacyRestrictJoins: import_zod7.default.boolean(),
  inviteResponseType: import_zod7.default.number()
});
var RobloxJoinStatus = { Ready: 2, NotFound: 5, Rejected: 12, Queued: 22 };
var RobloxJoinResponseSchema = import_zod7.default.object({
  /** 서버가 없거나 거절되면 비어 올 수 있다 */
  jobId: RobloxJobIdSchema.nullish().catch(null),
  status: import_zod7.default.number(),
  message: import_zod7.default.string().nullable(),
  queuePosition: import_zod7.default.number().nullish(),
  joinScript: import_zod7.default.object({
    MachineAddress: import_zod7.default.string().nullish(),
    DataCenterId: import_zod7.default.number().nullish(),
    UdmuxEndpoints: import_zod7.default.array(import_zod7.default.object({ Address: import_zod7.default.string(), Port: import_zod7.default.number() })).nullish()
  }).nullable()
});
var RobloxIpAddressSchema = import_zod7.default.string().min(1).brand("RobloxIpAddress");
var RobloxGamesResponseSchema = import_zod7.default.object({ data: import_zod7.default.array(RobloxGameSchema) });
var RobloxGameProductsResponseSchema = import_zod7.default.object({ data: import_zod7.default.array(RobloxGameProductSchema) });
var RobloxGameVotesResponseSchema = import_zod7.default.object({ data: import_zod7.default.array(RobloxGameVotesSchema) });
var RobloxGameMediaResponseSchema = import_zod7.default.object({ data: import_zod7.default.array(RobloxGameMediaSchema) });
var RobloxGameSummaryPageSchema = RobloxPageResponseSchema(RobloxGameSummarySchema);
var RobloxFavoriteGamePageSchema = RobloxPageResponseSchema(RobloxFavoriteGameSchema);

// src/apis/games.ts
var import_zod8 = __toESM(require("zod"), 1);
var GAMES = "https://games.roblox.com";
var APIS = "https://apis.roblox.com";
var GAMEJOIN = "https://gamejoin.roblox.com";
var GEOLOCATE_MISSING = "\uC11C\uBC84 \uC704\uCE58\uB97C \uC870\uD68C\uD558\uB824\uBA74 .geolocation(fn)\uC73C\uB85C IP \u2192 \uC704\uCE58 \uCF5C\uBC31\uC744 \uB123\uC5B4\uC57C \uD55C\uB2E4.";
var CLIENT_USER_AGENT = "Roblox/WinInet";
var SERVER_PAGE_LIMIT = 100;
var V2_CURSOR = "v2:";
var FIND_HEADSHOT = { size: "150x150", format: "Png", isCircular: false };
var DEFAULT_AVATAR_HASHES = /* @__PURE__ */ new Set([
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
function avatarHash(t) {
  if (t.state !== "Completed" || !t.imageUrl) return null;
  return t.imageUrl.match(/-([0-9A-Fa-f]{32})-/)?.[1].toUpperCase() ?? t.imageUrl;
}
var csv = (ids) => ids.join(",");
function listRoute2(opts) {
  return {
    bucket: opts.bucket,
    origin: opts.origin,
    limit: opts.limit,
    group: () => opts.auth && !opts.auth() ? null : "",
    async send(http, ids, onHeaders) {
      const res = await http().path(...opts.path).query({ [opts.param]: opts.repeat ? ids : csv(ids) }).middlewares(captureHeaders(onHeaders)).middlewares(validate(opts.schema)).request();
      const byId = new Map(opts.fetch(res).map((item) => [opts.idOf(item), item]));
      return ids.map((id2) => byId.get(id2) ?? null);
    }
  };
}
function singleRoute2(opts) {
  return {
    bucket: opts.bucket,
    origin: opts.origin,
    limit: 1,
    group: () => opts.auth && !opts.auth() ? null : "",
    async send(http, [id2], onHeaders) {
      const res = await nullOn(opts.missing ?? [404], onHeaders, () => http().path(...opts.path(id2)).middlewares(captureHeaders(onHeaders)).middlewares(validate(opts.schema)).request());
      return [res === null ? null : opts.pick(res, id2)];
    }
  };
}
function serverRoute(bucket, path, v2) {
  return {
    bucket,
    limit: 1,
    group(t) {
      const cursor = t.query.cursor;
      if (!cursor) return "";
      return cursor.startsWith(V2_CURSOR) === v2 ? "" : null;
    },
    async send(http, [t], onHeaders) {
      const { serverType = "Public", cursor, ...rest } = t.query;
      const query = { limit: SERVER_PAGE_LIMIT };
      if (rest.limit !== void 0) query.limit = rest.limit;
      if (rest.excludeFullGames !== void 0) query.excludeFullGames = rest.excludeFullGames;
      if (rest.sortOrder !== void 0) query.sortOrder = rest.sortOrder;
      if (cursor) query.cursor = v2 ? cursor.slice(V2_CURSOR.length) : cursor;
      const res = await http().path(...path(t.placeId, serverType)).query(query).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxServerPageRawSchema)).request();
      const tag = (c) => c && v2 ? RobloxCursorSchema.parse(V2_CURSOR + c) : c;
      return [{
        previousPageCursor: tag(res.previousPageCursor),
        nextPageCursor: tag(res.nextPageCursor),
        data: res.data.map((s) => ({
          id: s.id,
          maxPlayers: s.maxPlayers,
          playing: s.playing ?? 0,
          playerTokens: s.playerTokens ?? [],
          players: s.players ?? [],
          fps: s.fps ?? 0,
          ping: s.ping ?? null
        }))
      }];
    }
  };
}
var addressRoute = {
  bucket: "gamejoin POST /v1/join-game-instance",
  limit: 1,
  group: () => "",
  async send(http, [t], onHeaders) {
    const res = await http().path("v1", "join-game-instance").body("overwrite", { placeId: t.placeId, gameId: t.jobId }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxJoinResponseSchema)).request();
    const endpoint = res.joinScript?.UdmuxEndpoints?.[0];
    return [{
      placeId: t.placeId,
      jobId: t.jobId,
      status: res.status,
      ip: endpoint ? RobloxIpAddressSchema.parse(endpoint.Address) : null,
      port: endpoint?.Port ?? null,
      machineAddress: res.joinScript?.MachineAddress ?? null,
      dataCenterId: res.joinScript?.DataCenterId ?? null
    }];
  }
};
var RobloxGamesApi = class {
  constructor(config, thumbnails, presence) {
    this.config = config;
    this.thumbnails = thumbnails;
    this.presence = presence;
    this.http = createHttp(config, GAMES);
    const gamesRoute = (pick) => {
      const route = listRoute2({
        bucket: "games GET /v1/games",
        limit: 50,
        path: ["v1", "games"],
        param: "universeIds",
        schema: RobloxGamesResponseSchema,
        fetch: (res) => res.data,
        idOf: (g) => g.id
      });
      return mapRoute(route, (g) => g && pick(g));
    };
    const placeDetailsRoute = listRoute2({
      bucket: "games GET /v1/games/multiget-place-details",
      limit: 50,
      path: ["v1", "games", "multiget-place-details"],
      param: "placeIds",
      repeat: true,
      auth: this.auth,
      schema: import_zod8.default.array(RobloxPlaceDetailsSchema),
      fetch: (res) => res,
      idOf: (p) => p.placeId
    });
    this.games = new RobloxBatcher(config, GAMES, [gamesRoute((g) => g)]);
    this.favoriteCounts = new RobloxBatcher(config, GAMES, [
      gamesRoute((g) => g.favoritedCount),
      singleRoute2({
        bucket: "games GET /v1/games/{id}/favorites/count",
        path: (id2) => ["v1", "games", id2, "favorites", "count"],
        schema: import_zod8.default.object({ favoritesCount: import_zod8.default.number() }),
        pick: (res) => res.favoritesCount
      })
    ]);
    this.votes = new RobloxBatcher(config, GAMES, [
      listRoute2({
        bucket: "games GET /v1/games/votes",
        limit: 100,
        path: ["v1", "games", "votes"],
        param: "universeIds",
        schema: RobloxGameVotesResponseSchema,
        fetch: (res) => res.data,
        idOf: (v) => v.id
      }),
      singleRoute2({
        bucket: "games GET /v1/games/{id}/votes",
        path: (id2) => ["v1", "games", id2, "votes"],
        schema: RobloxGameVotesSchema,
        pick: (res) => res
      })
    ]);
    this.products = new RobloxBatcher(config, GAMES, [listRoute2({
      bucket: "games GET /v1/games/games-product-info",
      limit: 100,
      path: ["v1", "games", "games-product-info"],
      param: "universeIds",
      schema: RobloxGameProductsResponseSchema,
      fetch: (res) => res.data,
      idOf: (p) => p.universeId
    })]);
    this.playability = new RobloxBatcher(config, GAMES, [listRoute2({
      bucket: "games GET /v1/games/multiget-playability-status",
      limit: 50,
      path: ["v1", "games", "multiget-playability-status"],
      param: "universeIds",
      schema: import_zod8.default.array(RobloxGamePlayabilitySchema),
      fetch: (res) => res,
      idOf: (p) => p.universeId
    })]);
    this.placeDetails = new RobloxBatcher(config, GAMES, [placeDetailsRoute]);
    this.universeIds = new RobloxBatcher(config, GAMES, [
      mapRoute(placeDetailsRoute, (p) => p?.universeId ?? null),
      singleRoute2({
        bucket: "apis GET /universes/v1/places/{id}/universe",
        origin: APIS,
        path: (id2) => ["universes", "v1", "places", id2, "universe"],
        schema: import_zod8.default.object({ universeId: RobloxUniverseIdSchema.nullable() }),
        pick: (res) => res.universeId
      })
    ]);
    this.media = new RobloxBatcher(config, GAMES, [{
      bucket: "games GET /v2/games/{id}/media",
      limit: 1,
      group: () => "",
      async send(http, [t], onHeaders) {
        const res = await nullOn([404], onHeaders, () => http().path("v2", "games", t.universeId, "media").query(t.all ? { fetchAllExperienceRelatedMedia: true } : {}).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxGameMediaResponseSchema)).request());
        return [res?.data ?? null];
      }
    }]);
    this.favorited = new RobloxBatcher(config, GAMES, [singleRoute2({
      bucket: "games GET /v1/games/{id}/favorites",
      path: (id2) => ["v1", "games", id2, "favorites"],
      auth: this.auth,
      schema: import_zod8.default.object({ isFavorited: import_zod8.default.boolean() }),
      pick: (res) => res.isFavorited
    })]);
    this.userVotes = new RobloxBatcher(config, GAMES, [singleRoute2({
      bucket: "games GET /v1/games/{id}/votes/user",
      path: (id2) => ["v1", "games", id2, "votes", "user"],
      auth: this.auth,
      schema: RobloxUserGameVoteSchema,
      pick: (res) => res
    })]);
    this.privateServersEnabled = new RobloxBatcher(config, GAMES, [singleRoute2({
      bucket: "games GET /v1/private-servers/enabled-in-universe/{id}",
      path: (id2) => ["v1", "private-servers", "enabled-in-universe", id2],
      schema: import_zod8.default.object({ privateServersEnabled: import_zod8.default.boolean() }),
      pick: (res) => res.privateServersEnabled,
      missing: [400, 404]
    })]);
    this.privateServerDetails = new RobloxBatcher(config, GAMES, [singleRoute2({
      bucket: "games GET /v1/vip-servers/{id}",
      path: (id2) => ["v1", "vip-servers", id2],
      auth: this.auth,
      schema: RobloxPrivateServerDetailSchema,
      pick: (res) => res,
      missing: [400, 403, 404]
    })]);
    this.invites = new RobloxBatcher(config, GAMES, [singleRoute2({
      bucket: "games GET /v1/vip-server/can-invite/{id}",
      path: (id2) => ["v1", "vip-server", "can-invite", id2],
      auth: this.auth,
      schema: RobloxPrivateServerInviteSchema,
      pick: (res) => res
    })]);
    this.serverPages = new RobloxBatcher(config, GAMES, [
      serverRoute("games GET /v1/games/{id}/servers", (p, type) => ["v1", "games", p, "servers", type], false),
      serverRoute("games GET /v1/public-server-browser-service/games/{id}/servers", (p, type) => ["v1", "public-server-browser-service", "games", p, "servers", type], false),
      serverRoute("games GET /v2/games/{id}/servers", (p, type) => ["v2", "games", p, "servers", type], true)
    ]);
    const groupGamesRoute = (bucket, last) => ({
      bucket,
      limit: 1,
      group: () => "",
      async send(http, [t], onHeaders) {
        return [await http().path("v2", "groups", t.groupId, last).query(t.query).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxGameSummaryPageSchema)).request()];
      }
    });
    this.groupGames = new RobloxBatcher(config, GAMES, [
      groupGamesRoute("games GET /v2/groups/{id}/games", "games"),
      groupGamesRoute("games GET /v2/groups/{id}/gamesV2", "gamesV2")
    ]);
    const myRoute = (bucket, first) => ({
      bucket,
      limit: 1,
      group: () => this.auth() ? "" : null,
      async send(http, [query], onHeaders) {
        return [await http().path("v1", first, "my-private-servers").query(query).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxMyPrivateServerPageSchema)).request()];
      }
    });
    this.myPrivateServers = new RobloxBatcher(config, GAMES, [
      myRoute("games GET /v1/vip-servers/my-private-servers", "vip-servers"),
      myRoute("games GET /v1/private-servers/my-private-servers", "private-servers")
    ]);
    this.addresses = new RobloxBatcher(config, GAMEJOIN, [addressRoute], { userAgent: CLIENT_USER_AGENT });
  }
  config;
  thumbnails;
  presence;
  http;
  auth = () => canAuthenticate(this.config);
  games;
  favoriteCounts;
  votes;
  products;
  playability;
  placeDetails;
  universeIds;
  media;
  favorited;
  userVotes;
  privateServersEnabled;
  privateServerDetails;
  invites;
  serverPages;
  groupGames;
  myPrivateServers;
  addresses;
  ttl(method) {
    return resolveTtl(this.config, "games", method);
  }
  /**
   * 항목 하나씩 캐시하며 batcher로 보낸다. 계정별로 나누는 키는 viewer를 받는다 (쿠키 로테이션 중이면 캐시하지 않는다).
   * 실패한 항목은 null로 두고 errors에 모은다.
   */
  async each(method, ids, load, key, byViewer = false) {
    const ttl = this.ttl(method);
    const viewer = byViewer ? this.config.cache ? await viewerKey(this.config) : null : "anonymous";
    return settle(ids, (id2) => viewer === null ? load(id2) : cached(this.config, key(id2, viewer), ttl, () => load(id2)));
  }
  // ── 게임 조회 ──────────────────────────────────────
  // 배열을 받는 메서드는 입력 순서로 돌려주고, 없는 대상은 뺀다.
  // 일부 항목이 실패하면 받은 결과를 담아 RobloxPartialError를 던진다.
  // 같은 틱에 들어온 호출은 모아서 보내므로 따로따로 불러도 된다.
  /** GET /v1/games — 게임(universe) 상세 */
  async getGames(universeIds) {
    const { values, errors } = await this.each("getGames", universeIds, (id2) => this.games.load(String(id2), id2), (universeId) => ({ service: "games", method: "getGames", universeId }));
    return finish(found(values), errors);
  }
  /** place가 속한 universe. 인증돼 있으면 place 상세를 쓰고, 아니면 apis.roblox.com으로 하나씩 묻는다. */
  async getUniverseIds(placeIds) {
    const { values, errors } = await this.each("getUniverseIds", placeIds, (id2) => this.universeIds.load(String(id2), id2), (placeId) => ({ service: "games", method: "getUniverseIds", placeId }));
    return finish(found(placeIds.map((placeId, i) => values[i] ? { placeId, universeId: values[i] } : null)), errors);
  }
  /** GET /v1/games/multiget-place-details — 인증 필요. 플레이 가능 여부는 요청 계정 기준이다. */
  async getPlaceDetails(placeIds) {
    const { values, errors } = await this.each("getPlaceDetails", placeIds, (id2) => this.placeDetails.load(String(id2), id2), (placeId, viewer) => ({ service: "games", method: "getPlaceDetails", viewer, placeId }), true);
    return finish(found(values), errors);
  }
  /** GET /v1/games/games-product-info — 유료 게임 구매 정보 */
  async getProductInfo(universeIds) {
    const { values, errors } = await this.each("getProductInfo", universeIds, (id2) => this.products.load(String(id2), id2), (universeId) => ({ service: "games", method: "getProductInfo", universeId }));
    return finish(found(values), errors);
  }
  /** GET /v1/games/multiget-playability-status — 요청 계정이 플레이할 수 있는지 */
  async getPlayability(universeIds) {
    const { values, errors } = await this.each("getPlayability", universeIds, (id2) => this.playability.load(String(id2), id2), (universeId, viewer) => ({ service: "games", method: "getPlayability", viewer, universeId }), true);
    return finish(found(values), errors);
  }
  /** 좋아요/싫어요 수 */
  async getVotes(universeIds) {
    const { values, errors } = await this.each("getVotes", universeIds, (id2) => this.votes.load(String(id2), id2), (universeId) => ({ service: "games", method: "getVotes", universeId }));
    return finish(found(values), errors);
  }
  /** 즐겨찾기 수 */
  async getFavoriteCounts(universeIds) {
    const { values, errors } = await this.each("getFavoriteCounts", universeIds, (id2) => this.favoriteCounts.load(String(id2), id2), (universeId) => ({ service: "games", method: "getFavoriteCounts", universeId }));
    return finish(found(universeIds.map((universeId, i) => values[i] === null ? null : { universeId, favoritesCount: values[i] })), errors);
  }
  /** GET /v2/games/{universeId}/media — 게임 페이지의 이미지/영상. `all`이면 관련 미디어까지 */
  async getMedia(universeIds, opts = {}) {
    const all = opts.all ?? false;
    const { values, errors } = await this.each(
      "getMedia",
      universeIds,
      (universeId) => this.media.load(`${universeId}:${all}`, { universeId, all }),
      (universeId) => ({ service: "games", method: "getMedia", universeId, all })
    );
    return finish(found(universeIds.map((universeId, i) => values[i] ? { universeId, media: values[i] } : null)), errors);
  }
  /** GET /v1/games/recommendations/game/{universeId} — 비슷한 게임 */
  getRecommendations(universeId, query = {}) {
    const params = { MaxRows: query.maxRows ?? 20 };
    if (query.paginationKey) params.PaginationKey = query.paginationKey;
    return cached(this.config, { service: "games", method: "getRecommendations", universeId, query }, this.ttl("getRecommendations"), () => this.http().path("v1", "games", "recommendations", "game", universeId).query(params).middlewares(validate(RobloxGameRecommendationsSchema)).request());
  }
  /** GET /v2/users/{userId}/games — 유저가 만든 게임 (limit은 10/25/50) */
  getUserGames(userId, query = {}) {
    return cached(this.config, { service: "games", method: "getUserGames", userId, query }, this.ttl("getUserGames"), () => this.http().path("v2", "users", userId, "games").query(query).middlewares(validate(RobloxGameSummaryPageSchema)).request());
  }
  /** GET /v2/users/{userId}/favorite/games — 유저의 즐겨찾기 */
  getUserFavoriteGames(userId, query = {}) {
    return cached(this.config, { service: "games", method: "getUserFavoriteGames", userId, query }, this.ttl("getUserFavoriteGames"), () => this.http().path("v2", "users", userId, "favorite", "games").query(query).middlewares(validate(RobloxFavoriteGamePageSchema)).request());
  }
  /** 그룹이 만든 게임. /v2/groups/{groupId}/games와 gamesV2를 번갈아 쓴다. */
  getGroupGames(groupId, query = {}) {
    return cached(
      this.config,
      { service: "games", method: "getGroupGames", groupId, query },
      this.ttl("getGroupGames"),
      () => this.groupGames.load(JSON.stringify([groupId, query]), { groupId, query })
    );
  }
  // ── 요청 계정 기준 (인증 필요) ─────────────────────
  /** GET /v1/games/{universeId}/favorites — 내가 즐겨찾기했는지 */
  async getFavorited(universeIds) {
    const { values, errors } = await settle(universeIds, (id2) => this.favorited.load(String(id2), id2));
    return finish(found(universeIds.map((universeId, i) => values[i] === null ? null : { universeId, isFavorited: values[i] })), errors);
  }
  /** POST /v1/games/{universeId}/favorites */
  async setFavorited(universeId, isFavorited) {
    await this.http().path("v1", "games", universeId, "favorites").body("overwrite", { isFavorited }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** GET /v1/games/{universeId}/votes/user — 내 투표와 투표 가능 여부 */
  async getUserVotes(universeIds) {
    const { values, errors } = await settle(universeIds, (id2) => this.userVotes.load(String(id2), id2));
    return finish(found(universeIds.map((universeId, i) => values[i] && { universeId, ...values[i] })), errors);
  }
  /** PATCH /v1/games/{universeId}/user-votes — true = 좋아요, false = 싫어요, null = 취소. 게임을 플레이한 적이 있어야 한다. */
  async setUserVote(universeId, vote) {
    await this.http().method("PATCH").path("v1", "games", universeId, "user-votes").body("overwrite", { vote }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  // ── 서버 ───────────────────────────────────────────
  /**
   * 서버 목록 한 페이지. 엔드포인트마다 3회/분이라 세 엔드포인트를 나눠 쓴다.
   * 받은 커서는 같은 옵션으로 다시 넘긴다 (어느 엔드포인트의 커서인지는 라이브러리가 기억한다).
   * `Friend`와 플레이어 헤드샷은 인증이 필요하다. 헤드샷은 서버 목록의 플레이어 토큰으로 이어서 받는다 (`headshots: false`면 받지 않는다).
   */
  async getServerPage(placeId, query = {}) {
    const { headshots = {}, ...rest } = query;
    const page = await this.loadServerPage(placeId, rest);
    return { ...page, data: await this.withPlayers(page.data, headshots) };
  }
  /**
   * 서버 목록 한 페이지를 플레이어 토큰째로 받는다.
   * 캐시 키는 Public이면 인증 여부만, Friend면 계정까지 나눈다 (쿠키 로테이션 중의 Friend는 캐시하지 않는다).
   */
  async loadServerPage(placeId, query) {
    const normalized = { ...query, serverType: query.serverType ?? "Public" };
    const load = () => this.serverPages.load(JSON.stringify([placeId, normalized]), { placeId, query: normalized });
    const access = normalized.serverType === "Public" ? this.auth() ? "authenticated" : "anonymous" : this.config.cache ? await viewerKey(this.config) : null;
    if (access === null) return load();
    return cached(this.config, { service: "games", method: "getServerPage", access, placeId, query: normalized }, this.ttl("getServerPage"), load);
  }
  /**
   * 서버 접속 주소. gamejoin으로 해당 서버에 접속을 요청해 joinScript에서 뽑는다 (인증 필요, 5회/초).
   * 꽉 찬 서버는 대기열로 들어가 주소가 null이다. 주소를 받은 결과만 캐시한다.
   */
  async getServerAddresses(targets) {
    const ttl = this.ttl("getServerAddresses");
    const { values, errors } = await settle(targets, (t) => cached(
      this.config,
      { service: "games", method: "getServerAddresses", placeId: t.placeId, jobId: t.jobId },
      ttl,
      () => this.addresses.load(`${t.placeId}:${t.jobId}`, t),
      (r) => r.ip !== null
    ));
    return finish(found(values), errors);
  }
  /**
   * IP → 위치. `.geolocation(fn)`으로 넣은 콜백에 캐시에 없는 IP를 중복 없이 한 번에 넘긴다.
   * 결과는 입력 순서이고 `location`은 콜백이 돌려준 값 그대로다. 콜백이 null을 준 IP는 빼고, 캐시하지 않는다.
   * 같은 IP를 이미 조회하는 중이면(다른 호출이 동시에 물은 경우) 그 결과를 같이 기다리고 다시 묻지 않는다.
   */
  async getServerLocations(ips) {
    const geolocate = this.config.geolocate;
    if (!geolocate) throw new Error(GEOLOCATE_MISSING);
    const id2 = (ip) => JSON.stringify(canonicalInfo({ service: "games", method: "getServerLocations", ip }));
    const unique = [...new Set(ips)];
    const fresh = unique.filter((ip) => !this.config.inflight.has(id2(ip)));
    const batch = fresh.length ? this.locate(fresh, geolocate) : null;
    const { values, errors } = await settle(unique, (ip) => singleFlight(this.config, id2(ip), () => batch.then((located) => located.get(ip) ?? null)));
    const known = new Map(unique.map((ip, i) => [ip, values[i]]));
    return finish(found(ips.map((ip) => {
      const location = known.get(ip);
      return location === null || location === void 0 ? null : { ip, location };
    })), errors);
  }
  /** 캐시를 보고, 없는 IP만 콜백에 넘긴 뒤 저장한다. 모르는 IP는 결과에 없다 */
  async locate(ips, geolocate) {
    const store = this.config.cache;
    const ttl = this.ttl("getServerLocations");
    const known = /* @__PURE__ */ new Map();
    const entry = async (ip) => {
      const info = { service: "games", method: "getServerLocations", ip };
      return { key: await robloxCacheKey(info), info };
    };
    if (store) await Promise.all(ips.map(async (ip) => {
      const { key, info } = await entry(ip);
      const hit = await store.get(key, info);
      if (hit !== void 0 && hit !== null) known.set(ip, hit);
    }));
    const misses = ips.filter((ip) => !known.has(ip));
    if (misses.length) {
      const results = await geolocate(misses);
      await Promise.all(misses.map(async (ip, i) => {
        const location = results[i];
        if (location === null || location === void 0) return;
        known.set(ip, location);
        if (!store) return;
        const { key, info } = await entry(ip);
        await store.set(key, location, ttl, info);
      }));
    }
    return known;
  }
  /** GET /v1/games/{placeId}/private-servers — 내가 들어갈 수 있는 비공개 서버. 플레이어 헤드샷을 이어서 받는다 (`headshots: false`면 받지 않는다) */
  async getPrivateServers(placeId, query = {}) {
    const params = {};
    if (query.cursor) params.exclusiveStartKeyCursor = query.cursor;
    if (query.excludeFriendServers !== void 0) params.excludeFriendServers = query.excludeFriendServers;
    const res = await this.http().path("v1", "games", placeId, "private-servers").query(params).middlewares(validate(RobloxPrivateServerPageRawSchema)).request();
    const players = await this.players(res.data.map((s) => ({ playerTokens: s.playerTokens ?? [], players: s.players ?? [] })), query.headshots ?? {});
    return { ...res, data: res.data.map(({ playerTokens, players: _, ...server }, i) => ({ ...server, players: players[i] })) };
  }
  /** 서버마다 플레이어 토큰을 헤드샷으로 바꿔 붙이고 토큰은 뗀다 */
  async withPlayers(servers, headshots) {
    const players = await this.players(servers, headshots);
    return servers.map(({ playerTokens, players: _, ...server }, i) => ({ ...server, players: players[i] }));
  }
  /**
   * 서버마다 플레이어 목록. 토큰마다 한 명이고, 서버 목록이 누구인지 알려 준 플레이어는 `user`가 있다.
   * 누구인지 아는 플레이어는 유저 id로(캐시된다), 나머지는 토큰으로 헤드샷을 한 번에 묶어 받는다. 받지 못한 헤드샷은 null이다.
   */
  async players(servers, headshots) {
    const lists = servers.map((server) => {
      const byToken = new Map(server.players.map((p) => [p.playerToken, p]));
      const tokens = [...server.playerTokens, ...server.players.map((p) => p.playerToken).filter((t) => !server.playerTokens.includes(t))];
      return tokens.map((token) => {
        const p = byToken.get(token);
        return { token, user: p ? { id: p.id, name: p.name, displayName: p.displayName } : null };
      });
    });
    const all = lists.flat();
    const shots = headshots === false ? null : (await this.thumbnails.getSettled(all.map(({ token, user }) => user ? { type: "AvatarHeadShot", targetId: user.id, ...headshots } : { type: "AvatarHeadShot", token, ...headshots }))).values;
    let offset = 0;
    return lists.map((list) => list.map(({ user }) => ({ user, thumbnail: shots?.[offset++] ?? null })));
  }
  /** 내 비공개 서버 목록. /v1/vip-servers/…와 /v1/private-servers/…를 번갈아 쓴다. */
  getMyPrivateServers(query = {}) {
    return this.myPrivateServers.load(JSON.stringify(query), query);
  }
  /** GET /v1/private-servers/enabled-in-universe/{universeId} */
  async getPrivateServersEnabled(universeIds) {
    const { values, errors } = await this.each("getPrivateServersEnabled", universeIds, (id2) => this.privateServersEnabled.load(String(id2), id2), (universeId) => ({ service: "games", method: "getPrivateServersEnabled", universeId }));
    return finish(found(universeIds.map((universeId, i) => values[i] === null ? null : { universeId, privateServersEnabled: values[i] })), errors);
  }
  /** GET /v1/vip-servers/{id} — 내가 관리하는 비공개 서버의 설정 */
  async getPrivateServerDetails(ids) {
    const { values, errors } = await settle(ids, (id2) => this.privateServerDetails.load(String(id2), id2));
    return finish(found(values), errors);
  }
  /** GET /v1/vip-server/can-invite/{userId} — 내 비공개 서버에 초대할 수 있는지 */
  async getPrivateServerInvites(userIds) {
    const { values, errors } = await settle(userIds, (id2) => this.invites.load(String(id2), id2));
    return finish(found(userIds.map((userId, i) => values[i] && { userId, ...values[i] })), errors);
  }
  /** POST /v1/games/vip-servers/{universeId} — 비공개 서버를 산다 */
  createPrivateServer(universeId, request) {
    return this.http().path("v1", "games", "vip-servers", universeId).body("overwrite", request).middlewares(validate(import_zod8.default.record(import_zod8.default.string(), import_zod8.default.unknown()))).request();
  }
  /** PATCH /v1/vip-servers/{id} — 이름, 참가 코드 재발급, 켜기/끄기 */
  updatePrivateServer(id2, request) {
    return this.http().method("PATCH").path("v1", "vip-servers", id2).body("overwrite", request).middlewares(validate(RobloxPrivateServerDetailSchema)).request();
  }
  /** PATCH /v1/vip-servers/{id}/permissions */
  updatePrivateServerPermissions(id2, request) {
    return this.http().method("PATCH").path("v1", "vip-servers", id2, "permissions").body("overwrite", request).middlewares(validate(RobloxPrivateServerPermissionsSchema)).request();
  }
  /** PATCH /v1/vip-servers/{id}/subscription — 구독 갱신 켜기/끄기 */
  updatePrivateServerSubscription(id2, request) {
    return this.http().method("PATCH").path("v1", "vip-servers", id2, "subscription").body("overwrite", request).middlewares(validate(RobloxPrivateServerSubscriptionSchema)).request();
  }
  // ── 고수준 ─────────────────────────────────────────
  /**
   * universe들의 게임 정보를 한 번에. 상세/투표/아이콘/썸네일을 모아서 준다. 없는 universe는 뺀다.
   * place에서 시작하면 `getUniverseIds`로 먼저 바꾼다.
   * 투표/아이콘/썸네일을 받지 못하면 null(빈 배열)로 두고, 상세를 받지 못한 universe만 실패로 친다.
   */
  async getGameInfos(universeIds) {
    const unique = [...new Set(universeIds)];
    if (!unique.length) return [];
    const [games, votes, icons, thumbnails] = await Promise.all([
      partial(this.getGames(unique)),
      extra(this.getVotes(unique)),
      this.thumbnails.getSettled(unique.map((id2) => ({ type: "GameIcon", targetId: id2, size: "512x512" }))).then((s) => s.values),
      extra(this.thumbnails.getGameThumbnails(unique, { countPerUniverse: 10 }))
    ]);
    const gameById = new Map(games.results.map((g) => [g.id, g]));
    const votesById = new Map(votes.map((v) => [v.id, v]));
    const iconById = new Map(unique.map((id2, i) => [id2, icons[i]]));
    const thumbsById = new Map(thumbnails.map((t) => [t.universeId, t.thumbnails]));
    return finish(found(universeIds.map((universeId) => {
      const game = gameById.get(universeId);
      if (!game) return null;
      const icon = iconById.get(universeId);
      return {
        universeId,
        game,
        votes: votesById.get(universeId) ?? null,
        icon: icon && icon.state !== "Error" ? icon : null,
        thumbnails: thumbsById.get(universeId) ?? []
      };
    })), games.errors);
  }
  /**
   * 서버 목록을 페이지를 따라가며 `count`개 이상 모으고(페이지 단위), 플레이어 헤드샷/주소/위치를 붙인다.
   * `nextPageCursor`는 마지막으로 받은 페이지의 다음이라, 넘기면 빠짐없이 이어서 받는다.
   * 서버 목록 한도가 빡빡해서(엔드포인트당 3회/분) 많이 모을수록 오래 걸린다.
   * 헤드샷/주소/위치는 받지 못하면 빈 배열(null)로 두고, 서버 목록 자체가 실패할 때만 던진다.
   */
  async getServers(placeId, opts = {}) {
    const { count = 100, headshots: shotOptions = {}, address = false, location = false, ...query } = opts;
    if (location && !this.config.geolocate) throw new Error(GEOLOCATE_MISSING);
    const servers = [];
    let cursor = query.cursor ?? null;
    do {
      const page = await this.loadServerPage(placeId, { ...query, cursor: cursor ?? void 0 });
      servers.push(...page.data);
      cursor = page.nextPageCursor;
    } while (cursor && servers.length < count);
    const [data, addresses] = await Promise.all([
      this.withPlayers(servers, shotOptions),
      address || location ? extra(this.getServerAddresses(servers.map((s) => ({ placeId, jobId: s.id })))).then((list) => new Map(list.map((a) => [a.jobId, a]))) : null
    ]);
    const ips = [...new Set([...addresses?.values() ?? []].map((a) => a.ip).filter((ip) => ip !== null))];
    const locations = location ? new Map((await extra(this.getServerLocations(ips))).map((l) => [l.ip, l.location])) : null;
    return {
      nextPageCursor: cursor,
      data: data.map((server) => {
        const addr = addresses?.get(server.id) ?? null;
        return {
          ...server,
          address: addr,
          location: addr?.ip ? locations?.get(addr.ip) ?? null : null
        };
      })
    };
  }
  /**
   * 유저들이 place의 어느 서버에 있는지. 결과는 입력 순서이고, 못 찾은 유저도 `jobId: null`로 들어간다.
   * 서버 목록을 따라가며, 목록이 플레이어 id를 알려 주면(친구 서버 목록의 `players`) 그걸로 바로 찾고,
   * 못 찾은 대상은 플레이어 헤드샷을 대상의 헤드샷과 맞춰 찾는다. 모두 찾으면 바로 멈춘다.
   * presence는 보조로만 쓴다 — 한도가 빡빡하고(60회/분) 대상의 공개 설정에 따라 보이는 게 달라서, 서버 탐색과 나란히 묻고 기다리지 않는다.
   * presence가 이 place의 서버를 보여주면 그걸 쓰고, 다른 place의 게임에 있다고 확정되면 그 유저는 그만 찾는다.
   * 오프라인·온라인으로 나오거나 게임 정보가 가려진 유저는 계속 찾는다 (접속 상태를 숨겼을 수 있다).
   * 헤드샷 비교에는 플레이어 토큰이 필요해 인증해야 한다. 서버 목록은 서버마다 토큰을 5개까지만 줘서(2026-10 실측, 세 엔드포인트 모두)
   * 서버에 있어도 못 찾을 수 있다. 기본 아바타이거나 대상끼리 아바타가 같으면 헤드샷으로는 찾을 수 없다.
   * 서버 목록 한도(엔드포인트당 3회/분) 때문에 큰 게임일수록 오래 걸린다.
   */
  async findUsers(placeId, userIds, opts = {}) {
    const { maxServers = 1e3, presence = true, address = false, location = false, ...query } = opts;
    if (location && !this.config.geolocate) throw new Error(GEOLOCATE_MISSING);
    if (!this.auth()) throw new Error("\uC11C\uBC84 \uBAA9\uB85D\uC5D0\uC11C \uC720\uC800\uB97C \uCC3E\uC73C\uB824\uBA74 \uD50C\uB808\uC774\uC5B4 \uD1A0\uD070\uC774 \uD544\uC694\uD574 \uC778\uC99D\uD574\uC57C \uD55C\uB2E4.");
    const targets = [...new Set(userIds)];
    const hits = /* @__PURE__ */ new Map();
    const elsewhere = /* @__PURE__ */ new Set();
    const presenceTask = presence ? extra(this.presence.get(targets)).then((list) => {
      for (const p of list) {
        if (p.placeId === placeId && p.gameId) {
          if (!hits.has(p.userId)) hits.set(p.userId, { foundBy: "presence", jobId: p.gameId, server: null });
        } else if (p.userPresenceType === RobloxPresenceType.InGame && p.placeId !== null) {
          elsewhere.add(p.userId);
        }
      }
    }) : null;
    const searching = (userId) => !hits.has(userId) && !elsewhere.has(userId);
    const shots = await this.thumbnails.getSettled(targets.map((targetId) => ({ type: "AvatarHeadShot", targetId, ...FIND_HEADSHOT })));
    const shotErrors = new Map(shots.errors.map((e) => [e.input.targetId, e.error]));
    const byHash = /* @__PURE__ */ new Map();
    shots.values.forEach((t, i) => {
      if (!t) return;
      const hash = avatarHash(t);
      if (hash && !DEFAULT_AVATAR_HASHES.has(hash)) byHash.set(hash, [...byHash.get(hash) ?? [], targets[i]]);
    });
    for (const [hash, users] of byHash) if (users.length > 1) byHash.delete(hash);
    const wanted = new Set(targets);
    const hashOf = new Map([...byHash].map(([hash, [userId]]) => [userId, hash]));
    const hit = (userId, foundBy, server) => {
      hits.set(userId, { foundBy, jobId: server.id, server });
      const hash = hashOf.get(userId);
      if (hash) byHash.delete(hash);
    };
    let listsIds = query.serverType === "Friend";
    const findable = (userId) => searching(userId) && (listsIds || hashOf.has(userId) && byHash.has(hashOf.get(userId)));
    let cursor;
    let scanned = 0;
    while (targets.some(findable) && scanned < maxServers) {
      const page = await this.loadServerPage(placeId, { ...query, cursor });
      scanned += page.data.length;
      const identified = /* @__PURE__ */ new Set();
      for (const server of page.data) for (const p of server.players) {
        listsIds = true;
        identified.add(p.playerToken);
        if (wanted.has(p.id) && searching(p.id)) hit(p.id, "server", server);
      }
      const players = byHash.size ? page.data.flatMap((server) => server.playerTokens.filter((token) => !identified.has(token)).map((token) => ({ server, token }))) : [];
      const headshots = await this.thumbnails.getSettled(players.map(({ token }) => ({ type: "AvatarHeadShot", token, ...FIND_HEADSHOT })));
      headshots.values.forEach((t, i) => {
        const hash = t && avatarHash(t);
        const [userId] = hash && byHash.get(hash) || [];
        if (!userId || !searching(userId)) return;
        hit(userId, "headshot", players[i].server);
      });
      if (!page.nextPageCursor) break;
      cursor = page.nextPageCursor;
    }
    if (presenceTask && targets.some(searching)) await presenceTask;
    const jobIds = [...new Set([...hits.values()].map((f) => f.jobId))];
    const addresses = address || location ? new Map((await extra(this.getServerAddresses(jobIds.map((jobId) => ({ placeId, jobId }))))).map((a) => [a.jobId, a])) : null;
    const ips = [...new Set([...addresses?.values() ?? []].map((a) => a.ip).filter((ip) => ip !== null))];
    const locations = location ? new Map((await extra(this.getServerLocations(ips))).map((l) => [l.ip, l.location])) : null;
    const seen = [...new Map([...hits.values()].flatMap((f) => f.server ? [[f.server.id, f.server]] : [])).values()];
    const servers = new Map((await this.withPlayers(seen, FIND_HEADSHOT)).map((s) => [s.id, s]));
    const failed = (userId) => shotErrors.has(userId) && searching(userId);
    return finish(userIds.filter((userId) => !failed(userId)).map((userId) => {
      const f = hits.get(userId);
      const addr = f ? addresses?.get(f.jobId) ?? null : null;
      return {
        userId,
        foundBy: f?.foundBy ?? null,
        jobId: f?.jobId ?? null,
        server: f?.server ? servers.get(f.server.id) ?? null : null,
        address: addr,
        location: addr?.ip ? locations?.get(addr.ip) ?? null : null
      };
    }), targets.filter(failed).map((userId) => ({ input: userId, error: shotErrors.get(userId) })));
  }
};

// src/types/friends.ts
var import_zod9 = __toESM(require("zod"), 1);
var realUsers = (item) => import_zod9.default.preprocess(
  (list) => Array.isArray(list) ? list.filter((e) => typeof e?.id === "number" && e.id > 0) : list,
  import_zod9.default.array(item)
);
var IdOnlySchema = import_zod9.default.object({ id: RobloxUserIdSchema });
var RobloxFriendListResponseSchema = import_zod9.default.object({ data: realUsers(IdOnlySchema) });
var RobloxFriendPageRawSchema = import_zod9.default.object({
  PreviousCursor: RobloxCursorSchema.nullable(),
  PageItems: realUsers(IdOnlySchema.extend({ hasVerifiedBadge: import_zod9.default.boolean().nullish() })),
  NextCursor: RobloxCursorSchema.nullable(),
  HasMore: import_zod9.default.boolean().nullable()
});
var RobloxFollowPageSchema = import_zod9.default.object({
  previousPageCursor: RobloxCursorSchema.nullable(),
  nextPageCursor: RobloxCursorSchema.nullable(),
  data: realUsers(IdOnlySchema)
});
var RobloxCountResponseSchema = import_zod9.default.object({ count: import_zod9.default.number() });
var RobloxFriendStatusSchema = import_zod9.default.object({
  id: RobloxUserIdSchema,
  /** "NotFriends" | "Friends" | "RequestSent" | "RequestReceived" */
  status: import_zod9.default.string()
});
var RobloxFriendStatusesResponseSchema = import_zod9.default.object({ data: import_zod9.default.array(RobloxFriendStatusSchema) });
var RobloxFriendPresenceSchema = import_zod9.default.object({
  UserPresenceType: import_zod9.default.string().nullish(),
  UserLocationType: import_zod9.default.string().nullish(),
  lastLocation: import_zod9.default.string().nullish(),
  placeId: RobloxPlaceIdSchema.nullish(),
  rootPlaceId: RobloxPlaceIdSchema.nullish(),
  gameInstanceId: RobloxJobIdSchema.nullish(),
  universeId: RobloxUniverseIdSchema.nullish(),
  lastOnline: import_zod9.default.string().nullish()
});
var RobloxOnlineFriendSchema = import_zod9.default.object({
  id: RobloxUserIdSchema,
  name: import_zod9.default.string().nullish(),
  displayName: import_zod9.default.string().nullish(),
  sortScore: import_zod9.default.number().nullish(),
  userPresence: RobloxFriendPresenceSchema.nullish()
});
var RobloxOnlineFriendsResponseSchema = import_zod9.default.object({ data: realUsers(RobloxOnlineFriendSchema) });
var RobloxFriendRequestSchema = import_zod9.default.object({
  id: RobloxUserIdSchema,
  name: import_zod9.default.string(),
  displayName: import_zod9.default.string(),
  hasVerifiedBadge: import_zod9.default.boolean().nullish(),
  description: import_zod9.default.string().nullish(),
  created: import_zod9.default.string().nullish(),
  isBanned: import_zod9.default.boolean().nullish(),
  isUnseen: import_zod9.default.boolean().nullish(),
  mutualFriendsList: import_zod9.default.array(import_zod9.default.string()).nullish(),
  friendRequest: import_zod9.default.object({
    sentAt: import_zod9.default.string(),
    senderId: RobloxUserIdSchema,
    sourceUniverseId: RobloxUniverseIdSchema.nullish(),
    originSourceType: import_zod9.default.union([import_zod9.default.string(), import_zod9.default.number()]).nullish(),
    contactName: import_zod9.default.string().nullish(),
    senderNickname: import_zod9.default.string().nullish()
  }).nullish()
});
var RobloxFriendRequestPageSchema = import_zod9.default.object({
  previousPageCursor: RobloxCursorSchema.nullable(),
  nextPageCursor: RobloxCursorSchema.nullable(),
  data: import_zod9.default.array(RobloxFriendRequestSchema)
});
var RobloxTrustedFriendRequestPageSchema = import_zod9.default.object({
  previousPageCursor: RobloxCursorSchema.nullable(),
  nextPageCursor: RobloxCursorSchema.nullable(),
  data: import_zod9.default.array(import_zod9.default.object({ sentAt: import_zod9.default.string(), senderId: RobloxUserIdSchema }))
});
var RobloxFollowingStatusSchema = import_zod9.default.object({
  userId: RobloxUserIdSchema,
  /** 내가 이 유저를 팔로우하는지 */
  isFollowing: import_zod9.default.boolean(),
  /** 이 유저가 나를 팔로우하는지 */
  isFollowed: import_zod9.default.boolean()
});
var RobloxFollowingExistsResponseSchema = import_zod9.default.object({ followings: import_zod9.default.array(RobloxFollowingStatusSchema) });
var RobloxFriendsMetadataSchema = import_zod9.default.object({
  isFriendsFilterBarEnabled: import_zod9.default.boolean().nullish(),
  isFriendsPageSortExperimentEnabled: import_zod9.default.boolean().nullish(),
  isFriendsUserDataStoreCacheEnabled: import_zod9.default.boolean().nullish(),
  frequentFriendSortRollout: import_zod9.default.number().nullish(),
  userName: import_zod9.default.string().nullish(),
  displayName: import_zod9.default.string().nullish()
});
var RobloxCaptchaStatusSchema = import_zod9.default.object({
  success: import_zod9.default.boolean(),
  isCaptchaRequired: import_zod9.default.boolean().nullish(),
  notificationMuted: import_zod9.default.boolean().nullish()
});

// src/apis/friends.ts
var import_zod10 = __toESM(require("zod"), 1);
var ORIGIN4 = "https://friends.roblox.com";
var FIND_PAGE_LIMIT = 50;
var MULTI_LIMIT = 100;
function countRoute(bucket, last) {
  return {
    bucket,
    limit: 1,
    group: () => "",
    async send(http, [userId], onHeaders) {
      const res = await nullOn([400, 404], onHeaders, () => http().path("v1", "users", userId, ...last).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxCountResponseSchema)).request());
      return [res?.count ?? null];
    }
  };
}
var friendIdRoutes = [
  {
    bucket: "friends GET /v1/users/{id}/friends",
    limit: 1,
    group: () => "",
    async send(http, [userId], onHeaders) {
      const res = await nullOn([400], onHeaders, () => http().path("v1", "users", userId, "friends").middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxFriendListResponseSchema)).request());
      return [res?.data.map((f) => f.id) ?? null];
    }
  },
  {
    bucket: "friends GET /v1/users/{id}/friends/find",
    limit: 1,
    group: () => "",
    async send(http, [userId], onHeaders) {
      const ids = [];
      let cursor = null;
      do {
        const res = await nullOn([400], onHeaders, () => http().path("v1", "users", userId, "friends", "find").query(cursor ? { limit: FIND_PAGE_LIMIT, cursor } : { limit: FIND_PAGE_LIMIT }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxFriendPageRawSchema)).request());
        if (!res) return [null];
        ids.push(...res.PageItems.map((f) => f.id));
        cursor = res.NextCursor;
      } while (cursor);
      return [ids];
    }
  }
];
var RobloxFriendsApi = class {
  constructor(config, users) {
    this.config = config;
    this.users = users;
    this.http = createHttp(config, ORIGIN4);
    this.friendIds = new RobloxBatcher(config, ORIGIN4, friendIdRoutes);
    this.friendCounts = new RobloxBatcher(config, ORIGIN4, [countRoute("friends GET /v1/users/{id}/friends/count", ["friends", "count"])]);
    this.followerCounts = new RobloxBatcher(config, ORIGIN4, [countRoute("friends GET /v1/users/{id}/followers/count", ["followers", "count"])]);
    this.followingCounts = new RobloxBatcher(config, ORIGIN4, [countRoute("friends GET /v1/users/{id}/followings/count", ["followings", "count"])]);
    const statusRoute = {
      bucket: "friends GET /v1/users/{me}/friends/statuses",
      limit: MULTI_LIMIT,
      group: (t) => String(t.me),
      async send(http, targets, onHeaders) {
        const res = await http().path("v1", "users", targets[0].me, "friends", "statuses").query({ userIds: targets.map((t) => t.userId) }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxFriendStatusesResponseSchema)).request();
        const byId = new Map(res.data.map((s) => [s.id, s]));
        return targets.map((t) => byId.get(t.userId) ?? null);
      }
    };
    this.statuses = new RobloxBatcher(config, ORIGIN4, [statusRoute]);
    this.areFriends = new RobloxBatcher(config, ORIGIN4, [
      {
        bucket: "friends POST /v1/user/{me}/multiget-are-friends",
        limit: MULTI_LIMIT,
        group: (t) => String(t.me),
        async send(http, targets, onHeaders) {
          const res = await http().path("v1", "user", targets[0].me, "multiget-are-friends").body("overwrite", { targetUserIds: targets.map((t) => t.userId) }).middlewares(captureHeaders(onHeaders)).middlewares(validate(import_zod10.default.object({ friendsId: import_zod10.default.array(import_zod10.default.number()) }))).request();
          const friends = new Set(res.friendsId);
          return targets.map((t) => friends.has(t.userId));
        }
      },
      mapRoute(statusRoute, (s) => s?.status === "Friends")
    ]);
    this.followings = new RobloxBatcher(config, ORIGIN4, [{
      bucket: "friends POST /v1/user/following-exists",
      limit: MULTI_LIMIT,
      group: (t) => String(t.me),
      async send(http, targets, onHeaders) {
        const res = await http().path("v1", "user", "following-exists").body("overwrite", { targetUserIds: targets.map((t) => t.userId) }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxFollowingExistsResponseSchema)).request();
        const byId = new Map(res.followings.map((f) => [f.userId, f]));
        return targets.map((t) => byId.get(t.userId) ?? null);
      }
    }]);
  }
  config;
  users;
  http;
  friendIds;
  friendCounts;
  followerCounts;
  followingCounts;
  statuses;
  areFriends;
  followings;
  /** viewer → 인증된 내 id */
  me = /* @__PURE__ */ new Map();
  ttl(method) {
    return resolveTtl(this.config, "friends", method);
  }
  /** 요청 계정의 id. 계정이 정해져 있지 않으면 에러 (requireViewer) */
  async myId() {
    const viewer = await requireViewer(this.config);
    let id2 = this.me.get(viewer);
    if (!id2) {
      this.me.set(viewer, id2 = this.users.getAuthenticated().then((u) => u.id));
      id2.catch(() => this.me.delete(viewer));
    }
    return id2;
  }
  /** 항목 하나씩 캐시하며 보낸다. 실패한 항목은 null로 두고 errors에 모은다 */
  each(method, ids, load) {
    return settle(ids, (id2) => cached(this.config, { service: "friends", method, userId: id2 }, this.ttl(method), () => load(id2)));
  }
  async getFriends(userIds, opts = {}) {
    const { values: lists, errors } = await this.each("getFriends", userIds, (id2) => this.friendIds.load(String(id2), id2));
    const all = [...new Set(lists.flatMap((l) => l ?? []))];
    const users = await extra(opts.thumbnail ? this.users.getUsers(all, { thumbnail: opts.thumbnail }) : this.users.getUsers(all));
    const byId = new Map(users.map((u) => [u.id, u]));
    return finish(found(userIds.map((userId, i) => {
      const ids = lists[i];
      return ids ? { userId, friends: found(ids.map((id2) => byId.get(id2) ?? null)) } : null;
    })), errors);
  }
  /** GET /v1/users/{userId}/friends/count */
  async getFriendCounts(userIds) {
    const { values, errors } = await this.each("getFriendCounts", userIds, (id2) => this.friendCounts.load(String(id2), id2));
    return finish(found(userIds.map((userId, i) => values[i] === null ? null : { userId, count: values[i] })), errors);
  }
  /** GET /v1/users/{userId}/followers/count */
  async getFollowerCounts(userIds) {
    const { values, errors } = await this.each("getFollowerCounts", userIds, (id2) => this.followerCounts.load(String(id2), id2));
    return finish(found(userIds.map((userId, i) => values[i] === null ? null : { userId, count: values[i] })), errors);
  }
  /** GET /v1/users/{userId}/followings/count */
  async getFollowingCounts(userIds) {
    const { values, errors } = await this.each("getFollowingCounts", userIds, (id2) => this.followingCounts.load(String(id2), id2));
    return finish(found(userIds.map((userId, i) => values[i] === null ? null : { userId, count: values[i] })), errors);
  }
  /** GET /v1/users/{userId}/followers — 인증 필요. 항목은 id뿐이다 */
  getFollowers(userId, query = {}) {
    return this.http().path("v1", "users", userId, "followers").query(query).middlewares(validate(RobloxFollowPageSchema)).request();
  }
  /** GET /v1/users/{userId}/followings — 인증 필요. 항목은 id뿐이다 */
  getFollowings(userId, query = {}) {
    return this.http().path("v1", "users", userId, "followings").query(query).middlewares(validate(RobloxFollowPageSchema)).request();
  }
  /** GET /v1/users/{userId}/friends/search — 친구를 이름으로 찾는다. 인증 필요 */
  async searchFriends(userId, query) {
    const res = await this.http().path("v1", "users", userId, "friends", "search").query(query).middlewares(validate(RobloxFriendPageRawSchema)).request();
    return {
      previousPageCursor: res.PreviousCursor,
      nextPageCursor: res.NextCursor,
      data: res.PageItems.map((f) => ({ id: f.id, hasVerifiedBadge: f.hasVerifiedBadge ?? null }))
    };
  }
  /** GET /v1/metadata — 친구 페이지 설정과 대상의 이름 */
  getMetadata(targetUserId) {
    return this.http().path("v1", "metadata").query({ targetUserId }).middlewares(validate(RobloxFriendsMetadataSchema)).request();
  }
  // ── 요청 계정 기준 (인증 필요, 계정 고정) ─────────
  /** GET /v1/users/{me}/friends/statuses — 나와의 관계 ("Friends", "RequestSent" 등) */
  async getFriendStatuses(userIds) {
    const me = await this.myId();
    const { values, errors } = await settle(userIds, (userId) => this.statuses.load(`${me}:${userId}`, { me, userId }));
    return finish(found(values), errors);
  }
  /** 나와 친구인지. multiget-are-friends와 statuses를 나눠 쓴다. */
  async getAreFriends(userIds) {
    const me = await this.myId();
    const { values, errors } = await settle(userIds, (userId) => this.areFriends.load(`${me}:${userId}`, { me, userId }));
    return finish(found(userIds.map((userId, i) => values[i] === null ? null : { userId, isFriend: values[i] })), errors);
  }
  /** POST /v1/user/following-exists — 내가 팔로우하는지 / 나를 팔로우하는지 */
  async getFollowingStatuses(userIds) {
    const me = await this.myId();
    const { values, errors } = await settle(userIds, (userId) => this.followings.load(`${me}:${userId}`, { me, userId }));
    return finish(found(values), errors);
  }
  /** GET /v1/users/{me}/friends/online — 지금 접속 중인 내 친구와 위치 */
  async getOnlineFriends() {
    const me = await this.myId();
    const res = await this.http().path("v1", "users", me, "friends", "online").middlewares(validate(RobloxOnlineFriendsResponseSchema)).request();
    return res.data;
  }
  /** GET /v1/users/{me}/friends/inactive — 오래 접속하지 않은 내 친구 */
  async getInactiveFriends() {
    const me = await this.myId();
    const res = await this.http().path("v1", "users", me, "friends", "inactive").middlewares(validate(RobloxFriendListResponseSchema)).request();
    return res.data.map((f) => f.id);
  }
  /** GET /v1/my/friends/requests — 받은 친구 요청 */
  getFriendRequests(query = {}) {
    return this.http().path("v1", "my", "friends", "requests").query(query).middlewares(validate(RobloxFriendRequestPageSchema)).request();
  }
  /** GET /v1/my/trusted-friends/requests — 받은 신뢰하는 친구 요청 */
  getTrustedFriendRequests(query = {}) {
    return this.http().path("v1", "my", "trusted-friends", "requests").query(query).middlewares(validate(RobloxTrustedFriendRequestPageSchema)).request();
  }
  /** 받은 요청 수. `unseen`이면 아직 보지 않은 것만 (/my/new-friend-requests/count) */
  async getFriendRequestCount(opts = {}) {
    const path = opts.unseen ? ["v1", "my", "new-friend-requests", "count"] : ["v1", "user", opts.trusted ? "trusted-friend-requests" : "friend-requests", "count"];
    const res = await this.http().path(...path).middlewares(validate(RobloxCountResponseSchema)).request();
    return res.count;
  }
  // ── 쓰기 ───────────────────────────────────────────
  // 문서에 없는 엔드포인트(request-friendship 등)는 실측으로 확인했다.
  /** POST /v1/users/{userId}/request-friendship — 계정에 따라 챌린지(캡차)를 요구하며 403이 난다 */
  async sendFriendRequest(userId) {
    await this.http().path("v1", "users", userId, "request-friendship").body("overwrite", {}).middlewares(validate(import_zod10.default.unknown())).request();
  }
  /** POST /v1/users/{userId}/accept-friend-request */
  async acceptFriendRequest(userId) {
    await this.http().path("v1", "users", userId, "accept-friend-request").body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** POST /v1/users/{userId}/decline-friend-request */
  async declineFriendRequest(userId) {
    await this.http().path("v1", "users", userId, "decline-friend-request").body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** POST /v1/user/friend-requests/decline-all */
  async declineAllFriendRequests() {
    await this.http().path("v1", "user", "friend-requests", "decline-all").body("overwrite", {}).middlewares(validate(import_zod10.default.unknown())).request();
  }
  /** POST /v1/users/{userId}/unfriend */
  async unfriend(userId) {
    await this.http().path("v1", "users", userId, "unfriend").body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** POST /v1/users/{userId}/follow — 캡차가 필요하면 `isCaptchaRequired`가 true로 온다 */
  follow(userId, captcha = {}) {
    return this.http().path("v1", "users", userId, "follow").body("overwrite", captcha).middlewares(validate(RobloxCaptchaStatusSchema)).request();
  }
  /** POST /v1/users/{userId}/unfollow */
  async unfollow(userId) {
    await this.http().path("v1", "users", userId, "unfollow").body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** POST /v1/my/friends/refresh-qr-session — QR 친구 추가 세션 갱신 */
  async refreshQrSession() {
    const res = await this.http().path("v1", "my", "friends", "refresh-qr-session").body("overwrite", {}).middlewares(validate(import_zod10.default.object({ Success: import_zod10.default.boolean() }))).request();
    return res.Success;
  }
  /** GET /v1/my/friends/{userId}/check-qr-session — QR로 친구가 됐는지 */
  checkQrSession(userId) {
    return this.http().path("v1", "my", "friends", userId, "check-qr-session").middlewares(validate(import_zod10.default.boolean())).request();
  }
};

// src/types/chat.ts
var import_zod11 = __toESM(require("zod"), 1);
var RobloxChatMessageSchema = import_zod11.default.object({
  id: RobloxChatMessageIdSchema,
  content: import_zod11.default.string(),
  /** 시스템 메시지는 보낸 유저가 없다 */
  sender_user_id: RobloxUserIdSchema.nullable(),
  created_at: import_zod11.default.string(),
  type: import_zod11.default.string().nullish(),
  moderation_type: import_zod11.default.string().nullish(),
  replies_to: RobloxChatMessageIdSchema.nullish(),
  is_deleted: import_zod11.default.boolean().nullish(),
  is_previewable: import_zod11.default.boolean().nullish(),
  is_badgeable: import_zod11.default.boolean().nullish(),
  visibility: import_zod11.default.string().nullish(),
  /** send-messages 응답에만 있다 ("success" 등) */
  status: import_zod11.default.string().nullish()
});
var RobloxChatUserDataSchema = import_zod11.default.object({
  id: RobloxUserIdSchema,
  name: import_zod11.default.string().nullish(),
  display_name: import_zod11.default.string().nullish(),
  combined_name: import_zod11.default.string().nullish(),
  is_verified: import_zod11.default.boolean().nullish()
});
var RobloxChatConversationSchema = import_zod11.default.object({
  id: RobloxConversationIdSchema,
  /** "one_to_one" | "group" ... */
  type: import_zod11.default.string().nullish(),
  source: import_zod11.default.string().nullish(),
  name: import_zod11.default.string().nullish(),
  is_default_name: import_zod11.default.boolean().nullish(),
  created_by: RobloxUserIdSchema.nullish(),
  participant_user_ids: import_zod11.default.array(RobloxUserIdSchema),
  user_data: import_zod11.default.record(import_zod11.default.string(), RobloxChatUserDataSchema).nullish(),
  messages: import_zod11.default.array(RobloxChatMessageSchema).nullish(),
  unread_message_count: import_zod11.default.number().nullish(),
  updated_at: import_zod11.default.string().nullish(),
  created_at: import_zod11.default.string().nullish(),
  moderation_type: import_zod11.default.string().nullish(),
  preview_message: RobloxChatMessageSchema.nullish(),
  sort_index: import_zod11.default.number().nullish(),
  universe_id: RobloxUniverseIdSchema.nullish()
});
var RobloxChatConversationResultSchema = RobloxChatConversationSchema.partial().extend({
  id: RobloxConversationIdSchema.nullish(),
  participant_user_ids: import_zod11.default.array(RobloxUserIdSchema).nullish(),
  status: import_zod11.default.string().nullish()
});
var ChatCursorSchema = import_zod11.default.string().nullish().transform((c) => c ? c : null);
var RobloxChatConversationPageRawSchema = import_zod11.default.object({
  conversations: import_zod11.default.array(RobloxChatConversationSchema),
  next_cursor: ChatCursorSchema
});
var RobloxChatMessagePageRawSchema = import_zod11.default.object({
  messages: import_zod11.default.array(RobloxChatMessageSchema),
  next_cursor: ChatCursorSchema,
  previous_cursor: ChatCursorSchema
});
var RobloxChatConversationsResponseSchema = import_zod11.default.object({ conversations: import_zod11.default.array(RobloxChatConversationSchema) });
var RobloxChatConversationResultsResponseSchema = import_zod11.default.object({ conversations: import_zod11.default.array(RobloxChatConversationResultSchema) });
var RobloxChatSendResponseSchema = import_zod11.default.object({ messages: import_zod11.default.array(RobloxChatMessageSchema) });
var RobloxChatUnreadCountsSchema = import_zod11.default.object({
  global_unread_message_count: import_zod11.default.number(),
  global_unread_count: import_zod11.default.number()
});
var RobloxChatMetadataSchema = import_zod11.default.looseObject({
  isChatEnabled: import_zod11.default.boolean().nullish(),
  isChatEnabledByPrivacySetting: import_zod11.default.string().nullish(),
  isGroupChatEnabledByPrivacySetting: import_zod11.default.string().nullish(),
  isChatEnabledByGlobalRules: import_zod11.default.string().nullish(),
  isChatVisible: import_zod11.default.boolean().nullish(),
  isChatUserMessagesEnabled: import_zod11.default.boolean().nullish(),
  maxConversationTitleLength: import_zod11.default.number().nullish(),
  typingInChatFromSenderThrottleMs: import_zod11.default.number().nullish(),
  typingInChatForReceiverExpirationMs: import_zod11.default.number().nullish(),
  validMessageTypesWhiteList: import_zod11.default.array(import_zod11.default.string()).nullish()
});

// src/apis/chat.ts
var import_zod12 = __toESM(require("zod"), 1);
var ORIGIN5 = "https://apis.roblox.com";
var BASE = ["platform-chat-api", "v1"];
var CONVERSATION_BATCH_LIMIT = 25;
var conversationsRoute = {
  bucket: "apis POST /platform-chat-api/v1/get-conversations",
  limit: CONVERSATION_BATCH_LIMIT,
  group: (t) => t.viewer,
  async send(http, targets, onHeaders) {
    const res = await http().path(...BASE, "get-conversations").body("overwrite", { ids: targets.map((t) => t.id), include_user_data: true }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxChatConversationsResponseSchema)).request();
    const byId = new Map(res.conversations.map((c) => [c.id, c]));
    return targets.map((t) => byId.get(t.id) ?? null);
  }
};
var RobloxChatApi = class {
  constructor(config) {
    this.config = config;
    this.http = createHttp(config, ORIGIN5);
    this.conversations = new RobloxBatcher(config, ORIGIN5, [conversationsRoute]);
  }
  config;
  http;
  conversations;
  viewer() {
    return requireViewer(this.config);
  }
  // ── 조회 ───────────────────────────────────────────
  /** 대화 상세(참가자 이름 포함). 같은 틱에 들어온 호출은 25개씩 묶는다. 내가 참가하지 않은 대화는 뺀다. */
  async getConversations(ids) {
    const viewer = await this.viewer();
    const { values, errors } = await settle(ids, (id2) => this.conversations.load(`${viewer}:${id2}`, { viewer, id: id2 }));
    return finish(found(values), errors);
  }
  /** GET get-user-conversations — 내 대화 목록 (120회/분) */
  async listConversations(query = {}) {
    await this.viewer();
    const params = { page_size: query.pageSize ?? 20, include_user_data: true };
    if (query.cursor) params.cursor = query.cursor;
    const res = await this.http().path(...BASE, "get-user-conversations").query(params).middlewares(validate(RobloxChatConversationPageRawSchema)).request();
    return { conversations: res.conversations, nextCursor: res.next_cursor };
  }
  /** POST search-conversations — 대화를 이름/참가자로 찾는다 */
  async searchConversations(query, page = {}) {
    await this.viewer();
    const body = { query, page_size: page.pageSize ?? 20 };
    if (page.cursor) body.cursor = page.cursor;
    const res = await this.http().path(...BASE, "search-conversations").body("overwrite", body).middlewares(validate(RobloxChatConversationPageRawSchema)).request();
    return { conversations: res.conversations, nextCursor: res.next_cursor };
  }
  /** GET get-conversation-messages — 최신순 (120회/분). 커서 두 개를 응답 그대로 돌려준다 */
  async getMessages(conversationId, query = {}) {
    await this.viewer();
    const params = { conversation_id: conversationId, page_size: query.pageSize ?? 30 };
    if (query.cursor) params.cursor = query.cursor;
    const res = await this.http().path(...BASE, "get-conversation-messages").query(params).middlewares(validate(RobloxChatMessagePageRawSchema)).request();
    return { messages: res.messages, nextCursor: res.next_cursor, previousCursor: res.previous_cursor };
  }
  /** POST search-messages — 한 대화 안에서 메시지 검색 */
  async searchMessages(conversationId, query, page = {}) {
    await this.viewer();
    const body = { conversation_id: conversationId, query, page_size: page.pageSize ?? 30 };
    if (page.cursor) body.cursor = page.cursor;
    const res = await this.http().path(...BASE, "search-messages").body("overwrite", body).middlewares(validate(RobloxChatMessagePageRawSchema)).request();
    return { messages: res.messages, nextCursor: res.next_cursor, previousCursor: res.previous_cursor };
  }
  /** GET get-conversation-metadata — 전체 안 읽은 수 */
  async getUnreadCounts() {
    await this.viewer();
    return this.http().path(...BASE, "get-conversation-metadata").middlewares(validate(RobloxChatUnreadCountsSchema)).request();
  }
  /** GET metadata — 채팅 가능 여부와 설정. `isChatUserMessagesEnabled`가 false면 메시지를 보낼 수 없다 */
  async getMetadata() {
    await this.viewer();
    return this.http().path(...BASE, "metadata").middlewares(validate(RobloxChatMetadataSchema)).request();
  }
  // ── 쓰기 ───────────────────────────────────────────
  /**
   * POST send-messages — 한 대화에 여러 메시지 (4회/초). 각 메시지의 `status`로 결과를 본다.
   * 채팅이 꺼진 계정은 403 chat_disabled_for_user가 난다.
   */
  async sendMessages(conversationId, messages) {
    await this.viewer();
    if (!messages.length) return [];
    const res = await this.http().path(...BASE, "send-messages").body("overwrite", {
      conversation_id: conversationId,
      messages: messages.map((m) => typeof m === "string" ? { content: m } : { content: m.content, replies_to: m.repliesTo })
    }).middlewares(validate(RobloxChatSendResponseSchema)).request();
    return res.messages;
  }
  /** POST mark-conversations — 읽음 처리 (60회/분) */
  async markRead(conversationIds) {
    await this.viewer();
    if (!conversationIds.length) return;
    await this.http().path(...BASE, "mark-conversations").body("overwrite", { conversation_ids: conversationIds }).middlewares(validate(import_zod12.default.unknown())).request();
  }
  /** POST update-typing-status — 입력 중 표시 (30회/분, 보내는 쪽 throttle은 metadata 참고) */
  async setTyping(conversationId) {
    await this.viewer();
    await this.http().path(...BASE, "update-typing-status").body("overwrite", { conversation_id: conversationId }).middlewares(validate(import_zod12.default.unknown())).request();
  }
  /** POST create-conversations — 1:1 또는 그룹 대화 (15회/분). 참가자는 모두 친구여야 한다 */
  async createConversations(requests) {
    await this.viewer();
    if (!requests.length) return [];
    const res = await this.http().path(...BASE, "create-conversations").body("overwrite", {
      conversations: requests.map((r) => r.type === "one_to_one" ? { type: "one_to_one", participant_user_ids: [r.userId] } : { type: "group", participant_user_ids: r.userIds, name: r.name }),
      include_user_data: true
    }).middlewares(validate(RobloxChatConversationResultsResponseSchema)).request();
    return res.conversations;
  }
  /** POST update-conversations — 그룹 대화 이름 바꾸기 (15회/분) */
  async renameConversations(requests) {
    await this.viewer();
    if (!requests.length) return [];
    const res = await this.http().path(...BASE, "update-conversations").body("overwrite", { conversations: requests.map((r) => ({ id: r.id, name: r.name })) }).middlewares(validate(RobloxChatConversationResultsResponseSchema)).request();
    return res.conversations;
  }
  /** POST add-users — 그룹 대화에 친구 추가 (15회/분) */
  async addUsers(conversationId, userIds) {
    await this.viewer();
    await this.http().path(...BASE, "add-users").body("overwrite", { conversation_id: conversationId, user_ids: userIds }).middlewares(validate(import_zod12.default.unknown())).request();
  }
  /** POST remove-users — 그룹 대화에서 내보내기. 자기 자신이면 나가기 (15회/분) */
  async removeUsers(conversationId, userIds) {
    await this.viewer();
    await this.http().path(...BASE, "remove-users").body("overwrite", { conversation_id: conversationId, user_ids: userIds }).middlewares(validate(import_zod12.default.unknown())).request();
  }
};

// src/apis/groups.ts
var import_zod14 = __toESM(require("zod"), 1);

// src/types/groups.ts
var import_zod13 = __toESM(require("zod"), 1);
var RobloxGroupRoleIdSchema = import_zod13.default.number().int().min(1).brand("RobloxGroupRoleId");
var RobloxGroupSocialLinkIdSchema = import_zod13.default.number().int().min(1).brand("RobloxGroupSocialLinkId");
var RobloxGroupKeywordIdSchema = import_zod13.default.string().min(1).brand("RobloxGroupKeywordId");
var RobloxGroupEventIdSchema = import_zod13.default.string().min(1).brand("RobloxGroupEventId");
var RobloxGroupUserSchema = import_zod13.default.object({
  userId: RobloxUserIdSchema,
  username: import_zod13.default.string(),
  displayName: import_zod13.default.string(),
  hasVerifiedBadge: import_zod13.default.boolean()
});
var RobloxGroupRoleSchema = import_zod13.default.object({
  id: RobloxGroupRoleIdSchema,
  name: import_zod13.default.string(),
  rank: import_zod13.default.number(),
  description: import_zod13.default.string().nullish(),
  /** 역할 목록(/groups/{id}/roles)에만 있다 */
  memberCount: import_zod13.default.number().nullish(),
  /** 기본(가입하면 받는) 역할이면 true. 아니면 빠진다 */
  isBase: import_zod13.default.boolean().nullish(),
  color: import_zod13.default.number().nullish(),
  isPrivate: import_zod13.default.boolean().nullish()
});
var RobloxGroupMemberSchema = import_zod13.default.object({
  user: RobloxGroupUserSchema,
  role: RobloxGroupRoleSchema
});
var RobloxGroupShoutSchema = import_zod13.default.object({
  body: import_zod13.default.string(),
  poster: RobloxGroupUserSchema.nullable(),
  created: import_zod13.default.string(),
  updated: import_zod13.default.string()
});
var RobloxCommunityTierSchema = import_zod13.default.object({
  groupId: RobloxGroupIdSchema,
  currentTier: import_zod13.default.number().nullable(),
  previousTier: import_zod13.default.number().nullable(),
  tierUpdatedTime: import_zod13.default.string().nullable(),
  lastEvaluatedTime: import_zod13.default.string().nullable(),
  requirements: import_zod13.default.array(import_zod13.default.object({ key: import_zod13.default.number(), satisfied: import_zod13.default.boolean() })).nullish(),
  capabilities: import_zod13.default.object({ isEligibleForUnrestrictedMessages: import_zod13.default.boolean() }).nullish()
});
var GroupDetailBaseSchema = import_zod13.default.object({
  id: RobloxGroupIdSchema,
  name: import_zod13.default.string(),
  description: import_zod13.default.string(),
  /** 주인이 없는 그룹은 null */
  owner: RobloxGroupUserSchema.nullable(),
  shout: RobloxGroupShoutSchema.nullable(),
  isBuildersClubOnly: import_zod13.default.boolean(),
  publicEntryAllowed: import_zod13.default.boolean(),
  isLocked: import_zod13.default.boolean().nullish(),
  isDeactivated: import_zod13.default.boolean().nullish(),
  hasVerifiedBadge: import_zod13.default.boolean(),
  hasSocialModules: import_zod13.default.boolean().nullish(),
  communityTier: RobloxCommunityTierSchema.nullish()
});
var RobloxGroupDetailSchema = GroupDetailBaseSchema.extend({
  memberCount: import_zod13.default.number()
});
var RobloxGroupDetailPartialSchema = GroupDetailBaseSchema.extend({
  memberCount: import_zod13.default.number().nullish()
});
var RobloxGroupSchema = import_zod13.default.object({
  id: RobloxGroupIdSchema,
  name: import_zod13.default.string(),
  description: import_zod13.default.string(),
  /** 소유자가 없으면 null. 지금은 늘 유저지만 응답이 type을 주므로 다른 제작자 참조와 같은 모양으로 받는다 */
  owner: RobloxCreatorSchema().nullable(),
  created: import_zod13.default.string(),
  hasVerifiedBadge: import_zod13.default.boolean()
});
var RobloxGroupsResponseSchema = RobloxArrayResponseSchema(RobloxGroupSchema);
var RobloxGroupBasicSchema = import_zod13.default.object({
  id: RobloxGroupIdSchema,
  name: import_zod13.default.string(),
  memberCount: import_zod13.default.number(),
  hasVerifiedBadge: import_zod13.default.boolean()
});
var RobloxGroupRolesResponseSchema = import_zod13.default.object({
  groupId: RobloxGroupIdSchema,
  roles: import_zod13.default.array(RobloxGroupRoleSchema)
});
var RobloxGroupRoleDetailSchema = RobloxGroupRoleSchema.extend({
  groupId: RobloxGroupIdSchema
});
var RobloxGroupRoleDetailsResponseSchema = RobloxArrayResponseSchema(RobloxGroupRoleDetailSchema);
var RobloxUserGroupRoleV1Schema = import_zod13.default.object({
  group: RobloxGroupDetailSchema,
  role: RobloxGroupRoleSchema
});
var RobloxUserGroupRoleV2Schema = import_zod13.default.object({
  group: RobloxGroupBasicSchema,
  role: import_zod13.default.object({ id: RobloxGroupRoleIdSchema, name: import_zod13.default.string(), rank: import_zod13.default.number() })
});
var RobloxUserGroupRolesV1ResponseSchema = RobloxArrayResponseSchema(RobloxUserGroupRoleV1Schema);
var RobloxUserGroupRolesV2ResponseSchema = RobloxArrayResponseSchema(RobloxUserGroupRoleV2Schema);
var RobloxPrimaryGroupResponseSchema = import_zod13.default.object({
  group: RobloxGroupDetailPartialSchema,
  role: RobloxGroupRoleSchema
}).nullable();
var RobloxGroupMembershipDetailSchema = import_zod13.default.object({
  group: RobloxGroupDetailPartialSchema,
  role: RobloxGroupRoleSchema,
  isPrimaryGroup: import_zod13.default.boolean().nullish()
});
var RobloxFriendsGroupsResponseSchema = RobloxArrayResponseSchema(import_zod13.default.object({
  user: RobloxGroupUserSchema,
  groups: import_zod13.default.array(RobloxGroupMembershipDetailSchema)
}));
var RobloxGroupMemberPageSchema = RobloxPageResponseSchema(RobloxGroupMemberSchema);
var RobloxGroupUserPageSchema = RobloxPageResponseSchema(RobloxGroupUserSchema);
var RobloxGroupSearchItemSchema = import_zod13.default.object({
  id: RobloxGroupIdSchema,
  name: import_zod13.default.string(),
  description: import_zod13.default.string(),
  memberCount: import_zod13.default.number(),
  previousName: import_zod13.default.string().nullish(),
  publicEntryAllowed: import_zod13.default.boolean(),
  created: import_zod13.default.string(),
  updated: import_zod13.default.string(),
  hasVerifiedBadge: import_zod13.default.boolean()
});
var RobloxGroupSearchPageSchema = RobloxPageResponseSchema(RobloxGroupSearchItemSchema).extend({
  keyword: import_zod13.default.string(),
  totalResults: import_zod13.default.number()
});
var RobloxGroupLookupResponseSchema = RobloxArrayResponseSchema(RobloxGroupBasicSchema);
var RobloxGroupNameHistoryPageSchema = RobloxPageResponseSchema(import_zod13.default.object({
  name: import_zod13.default.string(),
  created: import_zod13.default.string()
}));
var RobloxGroupRelationshipsSchema = import_zod13.default.object({
  groupId: RobloxGroupIdSchema,
  /** "Allies" | "Enemies" */
  relationshipType: import_zod13.default.string(),
  totalGroupCount: import_zod13.default.number(),
  relatedGroups: import_zod13.default.array(RobloxGroupDetailPartialSchema),
  /** 마지막 페이지면 null */
  nextRowIndex: import_zod13.default.number().nullable()
});
var flags = (...keys) => import_zod13.default.object(Object.fromEntries(keys.map((k) => [k, import_zod13.default.boolean().nullish()])));
var RobloxGroupPermissionsSchema = import_zod13.default.object({
  groupPostsPermissions: flags("viewStatus", "postToStatus").nullish(),
  groupForumsPermissions: flags("viewForums", "manageCategories", "createPosts", "removePosts", "lockPosts", "pinPosts", "createComments", "removeComments", "createBugReports").nullish(),
  groupContentModerationPermissions: flags("manageKeywordBlockList", "viewKeywordBlockList").nullish(),
  groupMembershipPermissions: flags("changeRank", "inviteMembers", "removeMembers", "banMembers").nullish(),
  groupManagementPermissions: flags("manageRelationships", "manageClan", "viewAuditLogs", "bypassSlowmode", "viewCommunityAnalytics").nullish(),
  groupEconomyPermissions: flags("spendGroupFunds", "advertiseGroup", "createItems", "manageItems", "addGroupPlaces", "manageGroupGames", "viewGroupPayouts", "viewAnalytics").nullish(),
  groupOpenCloudPermissions: flags("useCloudAuthentication", "administerCloudAuthentication").nullish()
});
var RobloxGroupRolePermissionsSchema = import_zod13.default.object({
  groupId: RobloxGroupIdSchema,
  role: RobloxGroupRoleSchema,
  permissions: RobloxGroupPermissionsSchema
});
var RobloxGroupRolePermissionsResponseSchema = RobloxArrayResponseSchema(RobloxGroupRolePermissionsSchema);
var RobloxGroupNotificationPreferenceSchema = import_zod13.default.object({
  type: import_zod13.default.union([import_zod13.default.string(), import_zod13.default.number()]),
  enabled: import_zod13.default.boolean(),
  name: import_zod13.default.string(),
  description: import_zod13.default.string()
});
var RobloxGroupMembershipSchema = import_zod13.default.object({
  groupId: RobloxGroupIdSchema,
  isPrimary: import_zod13.default.boolean(),
  isPendingJoin: import_zod13.default.boolean(),
  userRole: RobloxGroupMemberSchema.nullable(),
  permissions: RobloxGroupPermissionsSchema,
  channelPermissions: import_zod13.default.array(import_zod13.default.object({ channelId: import_zod13.default.string() }).loose()).nullish(),
  areGroupGamesVisible: import_zod13.default.boolean(),
  areGroupFundsVisible: import_zod13.default.boolean(),
  areEnemiesAllowed: import_zod13.default.boolean(),
  canConfigure: import_zod13.default.boolean(),
  isNotificationsEnabled: import_zod13.default.boolean().nullish(),
  notificationPreferences: import_zod13.default.array(RobloxGroupNotificationPreferenceSchema).nullish(),
  isBannedFromGroup: import_zod13.default.boolean().nullish(),
  canViewMemberList: import_zod13.default.boolean().nullish(),
  isOwner: import_zod13.default.boolean().nullish()
});
var RobloxGroupPoliciesResponseSchema = import_zod13.default.object({
  groups: import_zod13.default.array(import_zod13.default.object({ groupId: RobloxGroupIdSchema, canViewGroup: import_zod13.default.boolean() }))
});
var RobloxGroupSocialLinkSchema = import_zod13.default.object({
  id: RobloxGroupSocialLinkIdSchema,
  /** "Discord" 같은 문자열 (스펙은 0~8) */
  type: import_zod13.default.union([import_zod13.default.string(), import_zod13.default.number()]),
  url: import_zod13.default.string(),
  title: import_zod13.default.string()
});
var RobloxGroupSocialLinksResponseSchema = import_zod13.default.object({
  data: import_zod13.default.array(RobloxGroupSocialLinkSchema),
  socialLinksVerificationStatus: import_zod13.default.union([import_zod13.default.string(), import_zod13.default.number()]).nullish()
});
var RobloxGroupEmoteSetsResponseSchema = import_zod13.default.object({
  emoteSets: import_zod13.default.array(import_zod13.default.object({
    id: import_zod13.default.string(),
    name: import_zod13.default.string(),
    emotes: import_zod13.default.array(import_zod13.default.object({ id: import_zod13.default.string(), name: import_zod13.default.string() }))
  }))
});
var RobloxGroupFeatureFreezesResponseSchema = import_zod13.default.object({
  features: import_zod13.default.array(import_zod13.default.object({ feature: import_zod13.default.string(), isDisabled: import_zod13.default.boolean() }))
});
var RobloxGroupFeaturedEventSchema = import_zod13.default.object({
  groupId: RobloxGroupIdSchema,
  contentType: import_zod13.default.string(),
  contentId: RobloxGroupEventIdSchema
});
var RobloxGroupsMetadataSchema = import_zod13.default.object({
  groupLimit: import_zod13.default.number(),
  currentGroupCount: import_zod13.default.number(),
  groupStatusMaxLength: import_zod13.default.number(),
  areProfileGroupsHidden: import_zod13.default.boolean().nullish(),
  isGroupDetailsPolicyEnabled: import_zod13.default.boolean().nullish(),
  showPreviousGroupNames: import_zod13.default.boolean().nullish(),
  areGroupBansEnabled: import_zod13.default.boolean().nullish(),
  canEnableGroupNotifications: import_zod13.default.boolean().nullish()
});
var RobloxGroupConfigurationMetadataSchema = import_zod13.default.object({
  groupConfiguration: import_zod13.default.object({
    nameMaxLength: import_zod13.default.number(),
    descriptionMaxLength: import_zod13.default.number(),
    iconMaxFileSizeMb: import_zod13.default.number(),
    coverPhotoMaxFileSizeMb: import_zod13.default.number().nullish(),
    validCoverPhotoDimensions: import_zod13.default.string().nullish(),
    /** 그룹 생성 비용(Robux) */
    cost: import_zod13.default.number()
  }).loose(),
  recurringPayoutsConfiguration: import_zod13.default.object({ maxPayoutPartners: import_zod13.default.number() }).nullish(),
  roleConfiguration: import_zod13.default.object({
    nameMaxLength: import_zod13.default.number(),
    descriptionMaxLength: import_zod13.default.number(),
    limit: import_zod13.default.number(),
    cost: import_zod13.default.number(),
    minRank: import_zod13.default.number(),
    maxRank: import_zod13.default.number()
  }).nullish(),
  groupNameChangeConfiguration: import_zod13.default.object({ cost: import_zod13.default.number(), cooldownInDays: import_zod13.default.number(), ownershipCooldownInDays: import_zod13.default.number() }).nullish(),
  isPremiumPayoutsEnabled: import_zod13.default.boolean().nullish(),
  isDefaultEmblemPolicyEnabled: import_zod13.default.boolean().nullish()
});
var RobloxGroupSearchMetadataSchema = import_zod13.default.object({
  SuggestedGroupKeywords: import_zod13.default.array(import_zod13.default.string()),
  ShowFriendsGroupsSort: import_zod13.default.boolean()
});
var RobloxGroupJoinRequestSchema = import_zod13.default.object({
  requester: RobloxGroupUserSchema,
  created: import_zod13.default.string()
});
var RobloxGroupJoinRequestPageSchema = RobloxPageResponseSchema(RobloxGroupJoinRequestSchema);
var RobloxGroupBanSchema = import_zod13.default.object({
  user: RobloxGroupUserSchema,
  actingUser: RobloxGroupMemberSchema.nullish(),
  created: import_zod13.default.string()
});
var RobloxGroupBanPageSchema = RobloxPageResponseSchema(RobloxGroupBanSchema);
var RobloxGroupAuditLogItemSchema = import_zod13.default.object({
  actor: RobloxGroupMemberSchema,
  actionType: import_zod13.default.string(),
  description: import_zod13.default.unknown(),
  created: import_zod13.default.string()
});
var RobloxGroupAuditLogPageSchema = RobloxPageResponseSchema(RobloxGroupAuditLogItemSchema);
var RobloxGroupSettingsSchema = import_zod13.default.object({
  isApprovalRequired: import_zod13.default.boolean(),
  isBuildersClubRequired: import_zod13.default.boolean().nullish(),
  areEnemiesAllowed: import_zod13.default.boolean(),
  areGroupFundsVisible: import_zod13.default.boolean(),
  areGroupGamesVisible: import_zod13.default.boolean(),
  isGroupNameChangeEnabled: import_zod13.default.boolean().nullish(),
  verificationLevel: import_zod13.default.union([import_zod13.default.string(), import_zod13.default.number()]).nullish(),
  accountTenureRequirement: import_zod13.default.union([import_zod13.default.string(), import_zod13.default.number()]).nullish(),
  slowmode: import_zod13.default.union([import_zod13.default.string(), import_zod13.default.number()]).nullish(),
  isMemberListVisibleToPublic: import_zod13.default.boolean().nullish(),
  isAutoAssignRoleDisabled: import_zod13.default.boolean().nullish(),
  hasLegacyAutoAssignRole: import_zod13.default.boolean().nullish(),
  communityTier: RobloxCommunityTierSchema.nullish()
});
var RobloxGroupConfigurationSchema = import_zod13.default.object({
  groupId: RobloxGroupIdSchema,
  emblemId: RobloxAssetIdSchema.nullish().catch(null),
  coverPhotoId: RobloxAssetIdSchema.nullish().catch(null)
});
var RobloxGroupFeaturesSchema = import_zod13.default.object({
  isLocked: import_zod13.default.boolean(),
  features: import_zod13.default.array(import_zod13.default.object({
    /** "Payouts" | "ContentUpload" | "GroupOwnershipTransfer" | "GameOwnershipTransfer" | "ForumRead" | "ForumWrite" */
    feature: import_zod13.default.string(),
    isFeatureBlocked: import_zod13.default.boolean(),
    expiration: import_zod13.default.string().nullish()
  }))
});
var RobloxGroupPayoutsResponseSchema = RobloxArrayResponseSchema(import_zod13.default.object({
  user: RobloxGroupUserSchema,
  percentage: import_zod13.default.number()
}));
var RobloxGroupPayoutRestrictionSchema = import_zod13.default.object({
  canUseRecurringPayout: import_zod13.default.boolean(),
  canUseOneTimePayout: import_zod13.default.boolean()
});
var RobloxGroupKeywordSchema = import_zod13.default.object({
  id: RobloxGroupKeywordIdSchema,
  keyword: import_zod13.default.string(),
  createdBy: import_zod13.default.number(),
  isPrivate: import_zod13.default.boolean(),
  createdAt: import_zod13.default.string(),
  updatedAt: import_zod13.default.string()
});
var RobloxGroupKeywordPageSchema = RobloxPageResponseSchema(RobloxGroupKeywordSchema).extend({
  totalActiveKeywordsCount: import_zod13.default.number()
});
var RobloxCreateGroupKeywordsResponseSchema = import_zod13.default.object({
  createdKeywords: import_zod13.default.array(RobloxGroupKeywordSchema),
  hadModeratedKeywords: import_zod13.default.boolean(),
  hadDuplicateKeywords: import_zod13.default.boolean()
});
var RobloxGroupTierEvaluationSchema = import_zod13.default.object({
  tierInfo: RobloxCommunityTierSchema,
  passedSignals: import_zod13.default.array(import_zod13.default.string()).nullish(),
  requirements: import_zod13.default.array(import_zod13.default.object({ key: import_zod13.default.number(), satisfied: import_zod13.default.boolean() })).nullish()
});
var RobloxGroupAuditActionTypes = [
  "DeletePost",
  "RemoveMember",
  "AcceptJoinRequest",
  "DeclineJoinRequest",
  "PostStatus",
  "ChangeRank",
  "BuyAd",
  "SendAllyRequest",
  "CreateEnemy",
  "AcceptAllyRequest",
  "DeclineAllyRequest",
  "DeleteAlly",
  "DeleteEnemy",
  "AddGroupPlace",
  "RemoveGroupPlace",
  "CreateItems",
  "ConfigureItems",
  "SpendGroupFunds",
  "ChangeOwner",
  "Delete",
  "AdjustCurrencyAmounts",
  "Abandon",
  "Claim",
  "Rename",
  "ChangeDescription",
  "InviteToClan",
  "KickFromClan",
  "CancelClanInvite",
  "BuyClan",
  "CreateGroupAsset",
  "UpdateGroupAsset",
  "ConfigureGroupAsset",
  "RevertGroupAsset",
  "CreateGroupDeveloperProduct",
  "ConfigureGroupGame",
  "CreateGroupDeveloperSubscriptionProduct",
  "Lock",
  "Unlock",
  "CreateGamePass",
  "CreateBadge",
  "ConfigureBadge",
  "SavePlace",
  "PublishPlace",
  "UpdateRolesetRank",
  "UpdateRolesetData",
  "UpdateRoleSetPosition",
  "BanMember",
  "UnbanMember",
  "CreateForumCategory",
  "UpdateForumCategory",
  "ArchiveForumCategory",
  "DeleteForumCategory",
  "DeleteForumPost",
  "DeleteForumComment",
  "PinForumPost",
  "UnpinForumPost",
  "LockForumPost",
  "UnlockForumPost",
  "CreateRoleset",
  "DeleteRoleset",
  "CreateCommerceProduct",
  "SetCommerceProductActive",
  "ArchiveCommerceProduct",
  "AcceptCommerceProductBundlingFee",
  "SetCommerceProductInactive",
  "ConnectMerchant",
  "DisconnectMerchant",
  "JoinGroup",
  "LeaveGroup",
  "UpdateGroupIcon",
  "UpdateGroupCoverPhoto",
  "AssignRole",
  "UnassignRole",
  "PublishAnnouncement",
  "DeleteAnnouncement",
  "UpdateRoleSetPermissions",
  "UpdateGroupSecuritySettings",
  "GrantEnterpriseTier",
  "RevokeEnterpriseTier",
  "DeactivateGroup"
];

// src/apis/groups.ts
var ORIGIN6 = "https://groups.roblox.com";
var MULTI_GET_LIMIT4 = 100;
var MULTI_WRITE_LIMIT = 100;
var csv2 = (ids) => ids.join(",");
var relationshipPath = (type) => type.toLowerCase();
function singleRoute3(opts) {
  return {
    bucket: opts.bucket,
    limit: 1,
    group: () => "",
    async send(http, [t], onHeaders) {
      const res = await nullOn(opts.missing ?? [400], onHeaders, () => http().path(...opts.path(t)).query(opts.query?.(t) ?? {}).middlewares(captureHeaders(onHeaders)).middlewares(validate(opts.schema)).request());
      return [res === null ? null : opts.pick(res, t)];
    }
  };
}
function listRoute3(opts) {
  return {
    bucket: opts.bucket,
    limit: MULTI_GET_LIMIT4,
    group: () => "",
    async send(http, ids, onHeaders) {
      const res = await http().path(...opts.path).query({ [opts.param]: csv2(ids) }).middlewares(captureHeaders(onHeaders)).middlewares(validate(opts.schema)).request();
      const byId = new Map(res.data.map((item) => [opts.idOf(item), item]));
      return ids.map((id2) => byId.get(id2) ?? null);
    }
  };
}
function userGroupsRoute(bucket, version) {
  return singleRoute3({
    bucket,
    path: (userId) => [version, "users", userId, "groups", "roles"],
    schema: version === "v1" ? RobloxUserGroupRolesV1ResponseSchema : RobloxUserGroupRolesV2ResponseSchema,
    pick: (res) => res.data.map(({ group, role }) => ({
      group: { id: group.id, name: group.name, memberCount: group.memberCount, hasVerifiedBadge: group.hasVerifiedBadge },
      role: { id: role.id, name: role.name, rank: role.rank }
    }))
  });
}
var RobloxGroupsApi = class {
  constructor(config, thumbnails, users) {
    this.config = config;
    this.thumbnails = thumbnails;
    this.users = users;
    this.http = createHttp(config, ORIGIN6);
    const batcher = (...routes) => new RobloxBatcher(config, ORIGIN6, routes);
    const perGroup = (path, schema, pick, missing2) => batcher(singleRoute3({
      bucket: `groups GET /v1/groups/{groupId}/${path.join("/")}`,
      path: (groupId) => ["v1", "groups", groupId, ...path],
      schema,
      pick,
      missing: missing2
    }));
    this.groups = batcher(listRoute3({
      bucket: "groups GET /v2/groups",
      path: ["v2", "groups"],
      param: "groupIds",
      schema: RobloxGroupsResponseSchema,
      idOf: (g) => g.id
    }));
    this.details = batcher(singleRoute3({
      bucket: "groups GET /v1/groups/{groupId}",
      path: (groupId) => ["v1", "groups", groupId],
      schema: RobloxGroupDetailSchema,
      pick: (res) => res
    }));
    this.roles = perGroup(["roles"], RobloxGroupRolesResponseSchema, (res) => res.roles);
    this.roleDetails = batcher(listRoute3({
      bucket: "groups GET /v1/roles",
      path: ["v1", "roles"],
      param: "ids",
      schema: RobloxGroupRoleDetailsResponseSchema,
      idOf: (r) => r.id
    }));
    this.userGroups = batcher(
      userGroupsRoute("groups GET /v2/users/{userId}/groups/roles", "v2"),
      userGroupsRoute("groups GET /v1/users/{userId}/groups/roles", "v1")
    );
    this.primaryGroups = batcher(singleRoute3({
      bucket: "groups GET /v1/users/{userId}/groups/primary/role",
      path: (userId) => ["v1", "users", userId, "groups", "primary", "role"],
      schema: RobloxPrimaryGroupResponseSchema,
      pick: (res, userId) => res && { userId, ...res }
    }));
    this.guestPermissions = perGroup(["roles", "guest", "permissions"], RobloxGroupRolePermissionsSchema, (res) => res);
    this.rolePermissions = batcher(
      {
        bucket: "groups GET /v1/groups/{groupId}/roles/permissions",
        limit: Infinity,
        group: (t) => String(t.groupId),
        async send(http, targets, onHeaders) {
          const res = await http().path("v1", "groups", targets[0].groupId, "roles", "permissions").middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxGroupRolePermissionsResponseSchema)).request();
          const byId = new Map(res.data.map((p) => [p.role.id, p]));
          return targets.map((t) => byId.get(t.roleId) ?? null);
        }
      },
      singleRoute3({
        bucket: "groups GET /v1/groups/{groupId}/roles/{roleSetId}/permissions",
        path: (t) => ["v1", "groups", t.groupId, "roles", t.roleId, "permissions"],
        schema: RobloxGroupRolePermissionsSchema,
        pick: (res) => res
      })
    );
    this.userPermissions = batcher(singleRoute3({
      bucket: "groups GET /v1/groups/{groupId}/users/{userId}/permissions",
      path: (t) => ["v1", "groups", t.groupId, "users", t.userId, "permissions"],
      schema: RobloxGroupRolePermissionsSchema,
      pick: (res, t) => ({ userId: t.userId, ...res }),
      missing: [400, 404]
    }));
    this.featureFreezes = perGroup(["community-feature-freezes"], RobloxGroupFeatureFreezesResponseSchema, (res) => res.features);
    this.featuredEvents = batcher(singleRoute3({
      bucket: "groups GET /v1/featured-content/event",
      path: () => ["v1", "featured-content", "event"],
      query: (groupId) => ({ groupId }),
      schema: RobloxGroupFeaturedEventSchema.nullable(),
      pick: (res) => res
    }));
    this.socialLinks = perGroup(["social-links"], RobloxGroupSocialLinksResponseSchema, (res) => res.data, [400, 404]);
    this.emotes = perGroup(["emotes"], RobloxGroupEmoteSetsResponseSchema, (res) => res.emoteSets);
    this.memberships = perGroup(["membership"], RobloxGroupMembershipSchema, (res) => res);
    this.policies = batcher({
      bucket: "groups POST /v1/groups/policies",
      limit: MULTI_GET_LIMIT4,
      group: () => "",
      async send(http, groupIds, onHeaders) {
        const res = await http().path("v1", "groups", "policies").body("overwrite", { groupIds }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxGroupPoliciesResponseSchema)).request();
        const byId = new Map(res.groups.map((p) => [p.groupId, p.canViewGroup]));
        return groupIds.map((id2) => byId.get(id2) ?? null);
      }
    });
    this.settings = perGroup(["settings"], RobloxGroupSettingsSchema, (res) => res);
    this.configurations = perGroup(["configuration"], RobloxGroupConfigurationSchema, (res) => res);
    this.features = perGroup(["features"], RobloxGroupFeaturesSchema, (res) => res);
    this.featuresBlocked = perGroup(["features", "status"], import_zod14.default.object({ hasFeaturesBlocked: import_zod14.default.boolean() }), (res) => res.hasFeaturesBlocked);
    this.payouts = perGroup(["payouts"], RobloxGroupPayoutsResponseSchema, (res) => res.data);
    this.payoutRestrictions = perGroup(["payout-restriction"], RobloxGroupPayoutRestrictionSchema, (res) => res);
    this.joinRequests = batcher(singleRoute3({
      bucket: "groups GET /v1/groups/{groupId}/join-requests/users/{userId}",
      path: (t) => ["v1", "groups", t.groupId, "join-requests", "users", t.userId],
      // 요청이 없으면 body가 null이다
      schema: RobloxGroupJoinRequestSchema.nullable(),
      pick: (res) => res
    }));
    this.bans = batcher(singleRoute3({
      bucket: "groups GET /v1/groups/{groupId}/bans/{userId}",
      path: (t) => ["v1", "groups", t.groupId, "bans", t.userId],
      schema: RobloxGroupBanSchema,
      pick: (res) => res,
      missing: [400, 404]
    }));
  }
  config;
  thumbnails;
  users;
  http;
  /** 요청 계정 → 내 id. 같은 계정이면 한 번만 묻는다 */
  me = /* @__PURE__ */ new Map();
  groups;
  details;
  roles;
  roleDetails;
  userGroups;
  primaryGroups;
  guestPermissions;
  rolePermissions;
  userPermissions;
  featureFreezes;
  featuredEvents;
  socialLinks;
  emotes;
  memberships;
  policies;
  settings;
  configurations;
  features;
  featuresBlocked;
  payouts;
  payoutRestrictions;
  joinRequests;
  bans;
  ttl(method) {
    return resolveTtl(this.config, "groups", method);
  }
  /** 요청 계정의 id. 계정이 정해져 있지 않으면 에러 (requireViewer) */
  async myId() {
    const viewer = await requireViewer(this.config);
    let id2 = this.me.get(viewer);
    if (!id2) {
      this.me.set(viewer, id2 = this.users.getAuthenticated().then((u) => u.id));
      id2.catch(() => this.me.delete(viewer));
    }
    return id2;
  }
  /** 항목 하나씩 캐시하며 batcher로 보낸다. 분류 데이터의 id 필드 이름은 메서드마다 다르다 */
  each(method, ids, load) {
    const field = method === "getRolesByIds" ? "roleId" : method === "getUserGroups" ? "userId" : "groupId";
    return settle(ids, (id2) => cached(this.config, { service: "groups", method, [field]: id2 }, this.ttl(method), () => load(id2)));
  }
  /** 대상마다 batcher로 보내고 없는 대상은 뺀다. 일부가 실패하면 RobloxPartialError */
  async many(batcher, targets, key) {
    const { values, errors } = await settle(targets, (t) => batcher.load(key(t), t));
    return finish(found(values), errors);
  }
  /** 그룹들을 받아 실패가 있으면 RobloxPartialError로 던진다. `option`이 있으면 아이콘을 붙이고, 아이콘을 받지 못한 그룹은 `thumbnail: null`이다 */
  async attach(groups, ids, option) {
    if (!option) {
      const { values: values2, errors: errors2 } = await groups;
      return finish(found(values2), errors2);
    }
    const target = option === true ? {} : option;
    const [{ values, errors }, icons] = await Promise.all([groups, this.thumbnails.getSettled(ids.map((targetId) => ({ ...target, type: "GroupIcon", targetId })))]);
    const byId = new Map(ids.map((id2, i) => [id2, icons.values[i]]));
    return finish(found(values).map((g) => ({ ...g, thumbnail: byId.get(g.id) ?? null })), errors);
  }
  getGroups(groupIds, opts = {}) {
    const groups = this.each("getGroups", groupIds, (id2) => this.groups.load(String(id2), id2));
    return this.attach(groups, groupIds, opts.thumbnail);
  }
  getGroupDetails(groupIds, opts = {}) {
    const groups = this.each("getGroupDetails", groupIds, (id2) => this.details.load(String(id2), id2));
    return this.attach(groups, groupIds, opts.thumbnail);
  }
  /** GET /v1/groups/{groupId}/roles — 그룹의 역할 목록 (멤버 수 포함, 낮은 rank부터) */
  async getRoles(groupIds) {
    const { values: lists, errors } = await this.each("getRoles", groupIds, (id2) => this.roles.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => lists[i] ? { groupId, roles: lists[i] } : null)), errors);
  }
  /** GET /v1/roles — 역할 id로 역할과 그 역할의 그룹. 100개씩 묶어서 보낸다 (60회/분) */
  async getRolesByIds(roleIds) {
    const { values, errors } = await this.each("getRolesByIds", roleIds, (id2) => this.roleDetails.load(String(id2), id2));
    return finish(found(values), errors);
  }
  /** 유저들이 속한 그룹과 역할. /v1과 /v2의 users/{userId}/groups/roles를 나눠 쓴다 */
  async getUserGroups(userIds) {
    const { values: lists, errors } = await this.each("getUserGroups", userIds, (id2) => this.userGroups.load(String(id2), id2));
    return finish(found(userIds.map((userId, i) => lists[i] ? { userId, groups: lists[i] } : null)), errors);
  }
  /** GET /v1/users/{userId}/groups/primary/role — 대표 그룹. 대표 그룹이 없는 유저는 뺀다 */
  getPrimaryGroups(userIds) {
    return this.many(this.primaryGroups, userIds, String);
  }
  /** GET /v1/groups/{groupId}/users — 멤버와 역할 */
  getMembers(groupId, query = {}) {
    return this.http().path("v1", "groups", groupId, "users").query(query).middlewares(validate(RobloxGroupMemberPageSchema)).request();
  }
  /** GET /v1/groups/{groupId}/roles/{roleSetId}/users — 역할 하나의 멤버 */
  getRoleMembers(groupId, roleId, query = {}) {
    return this.http().path("v1", "groups", groupId, "roles", roleId, "users").query(query).middlewares(validate(RobloxGroupUserPageSchema)).request();
  }
  /** GET /v1/groups/search — 키워드 검색. totalResults는 1000에서 멈춘다 */
  searchGroups(query) {
    return this.http().path("v1", "groups", "search").query(query).middlewares(validate(RobloxGroupSearchPageSchema)).request();
  }
  /** GET /v1/groups/search/lookup — 이름으로 찾는다. 정확히 맞는 그룹이 있으면 맨 앞에 온다 */
  async lookupGroups(groupName) {
    const res = await this.http().path("v1", "groups", "search", "lookup").query({ groupName }).middlewares(validate(RobloxGroupLookupResponseSchema)).request();
    return res.data;
  }
  /** GET /v1/groups/{groupId}/name-history */
  getNameHistory(groupId, query = {}) {
    return this.http().path("v1", "groups", groupId, "name-history").query(query).middlewares(validate(RobloxGroupNameHistoryPageSchema)).request();
  }
  /** GET /v1/groups/{groupId}/relationships/{allies|enemies} — 동맹/적 그룹 */
  getRelationships(groupId, type, query = {}) {
    return this.http().path("v1", "groups", groupId, "relationships", relationshipPath(type)).query({ StartRowIndex: query.startRowIndex ?? 0, MaxRows: query.maxRows ?? 100 }).middlewares(validate(RobloxGroupRelationshipsSchema)).request();
  }
  /** GET /v1/groups/{groupId}/roles/guest/permissions — 멤버가 아닌 사람이 할 수 있는 것 (30회/분) */
  getGuestPermissions(groupIds) {
    return this.many(this.guestPermissions, groupIds, String);
  }
  /** GET /v1/groups/{groupId}/community-feature-freezes — 포럼 등 기능이 멈춰 있는지 */
  async getFeatureFreezes(groupIds) {
    const { values: lists, errors } = await settle(groupIds, (id2) => this.featureFreezes.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => lists[i] ? { groupId, features: lists[i] } : null)), errors);
  }
  /** GET /v1/featured-content/event — 그룹이 내건 이벤트. 없는 그룹은 뺀다 */
  getFeaturedEvents(groupIds) {
    return this.many(this.featuredEvents, groupIds, String);
  }
  /** GET /v1/groups/metadata — 그룹 수 한도 등. 인증하면 요청 계정의 가입 수가 들어간다 */
  getMetadata() {
    return this.http().path("v1", "groups", "metadata").middlewares(validate(RobloxGroupsMetadataSchema)).request();
  }
  /** GET /v1/groups/configuration/metadata — 이름 길이, 생성/개명 비용 등 */
  getConfigurationMetadata() {
    return this.http().path("v1", "groups", "configuration", "metadata").middlewares(validate(RobloxGroupConfigurationMetadataSchema)).request();
  }
  /** GET /v1/groups/search/metadata — 추천 검색어 */
  getSearchMetadata() {
    return this.http().path("v1", "groups", "search", "metadata").middlewares(validate(RobloxGroupSearchMetadataSchema)).request();
  }
  // ── 요청 계정 기준 (인증 필요) ─────────────────────
  /** GET /v1/groups/{groupId}/membership — 내 역할, 권한, 가입 대기 여부, 알림 설정 */
  getMemberships(groupIds) {
    return this.many(this.memberships, groupIds, String);
  }
  /** POST /v1/groups/policies — 내 계정으로 그룹을 볼 수 있는지 (지역 정책) */
  async getPolicies(groupIds) {
    const { values: list, errors } = await settle(groupIds, (id2) => this.policies.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => list[i] === null ? null : { groupId, canViewGroup: list[i] })), errors);
  }
  /** GET /v1/groups/{groupId}/social-links */
  async getSocialLinks(groupIds) {
    const { values: lists, errors } = await settle(groupIds, (id2) => this.socialLinks.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => lists[i] ? { groupId, links: lists[i] } : null)), errors);
  }
  /** GET /v1/groups/{groupId}/emotes — 포럼 이모트 */
  async getEmotes(groupIds) {
    const { values: lists, errors } = await settle(groupIds, (id2) => this.emotes.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => lists[i] ? { groupId, emoteSets: lists[i] } : null)), errors);
  }
  /** GET /v1/user/groups/pending — 가입을 요청해 둔 그룹 */
  async getPendingGroups() {
    const res = await this.http().path("v1", "user", "groups", "pending").middlewares(validate(import_zod14.default.object({ data: import_zod14.default.array(RobloxGroupDetailPartialSchema) }))).request();
    return res.data;
  }
  /** GET /v1/users/{me}/friends/groups/roles — 내 친구들이 속한 그룹. 다른 유저로는 403이다 */
  async getFriendsGroups() {
    const me = await this.myId();
    const res = await this.http().path("v1", "users", me, "friends", "groups", "roles").middlewares(validate(RobloxFriendsGroupsResponseSchema)).request();
    return res.data;
  }
  /** POST /v1/groups/{groupId}/users — 가입한다. 승인제 그룹이면 가입 요청이 된다. 캡차를 요구할 수 있다 */
  async joinGroup(groupId, request = {}) {
    await this.http().path("v1", "groups", groupId, "users").body("overwrite", request).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** DELETE /v1/groups/{groupId}/users/{me} — 탈퇴한다. 가입 요청 중이면 그 요청을 취소한다 */
  async leaveGroup(groupId) {
    await this.removeMember(groupId, await this.myId());
  }
  /** POST /v1/user/groups/primary */
  async setPrimaryGroup(groupId) {
    await this.http().path("v1", "user", "groups", "primary").body("overwrite", { groupId }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** DELETE /v1/user/groups/primary */
  async removePrimaryGroup() {
    await this.http().method("DELETE").path("v1", "user", "groups", "primary").middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** PATCH /v1/groups/{groupId}/notification-preference — 알림 종류 하나를 켜고 끈다 */
  async setNotificationPreference(groupId, request) {
    await this.http().method("PATCH").path("v1", "groups", groupId, "notification-preference").body("overwrite", request).middlewares(validate(import_zod14.default.unknown())).request();
  }
  /**
   * POST /v1/groups/create — 그룹을 만든다. 비용(Robux)은 `getConfigurationMetadata()`의 `groupConfiguration.cost`.
   * 아이콘과 함께 multipart로 보낸다.
   */
  createGroup(request) {
    const form = new FormData();
    form.append("name", request.name);
    if (request.description !== void 0) form.append("description", request.description);
    if (request.publicGroup !== void 0) form.append("publicGroup", String(request.publicGroup));
    if (request.buildersClubMembersOnly !== void 0) form.append("buildersClubMembersOnly", String(request.buildersClubMembersOnly));
    form.append("Files", request.icon);
    return this.http().path("v1", "groups", "create").body("overwrite", form).middlewares(validate(RobloxGroupSchema.extend({ memberCount: import_zod14.default.number().nullish() }))).request();
  }
  // ── 관리 (그룹 권한 필요) ──────────────────────────
  // 권한이 없으면 403 FETCH_FAILED로 실패한다.
  /** 역할들의 권한. 주인이면 모든 역할을 한 번에(/roles/permissions), 아니면 역할 하나씩 받는다 */
  getRolePermissions(groupId, roleIds) {
    return this.many(this.rolePermissions, roleIds.map((roleId) => ({ groupId, roleId })), (t) => `${t.groupId}:${t.roleId}`);
  }
  /** PATCH /v1/groups/{groupId}/roles/{roleSetId}/permissions — `{ "ViewWall": true }`처럼 권한 이름 → 값 */
  async updateRolePermissions(groupId, roleId, permissions) {
    await this.http().method("PATCH").path("v1", "groups", groupId, "roles", roleId, "permissions").body("overwrite", { permissions }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** GET /v1/groups/{groupId}/users/{userId}/permissions — 주인과 권한 관리자만 볼 수 있다 */
  getUserPermissions(groupId, userIds) {
    return this.many(this.userPermissions, userIds.map((userId) => ({ groupId, userId })), (t) => `${t.groupId}:${t.userId}`);
  }
  /** POST /v1/groups/{groupId}/rolesets/create */
  createRole(groupId, request) {
    return this.http().path("v1", "groups", groupId, "rolesets", "create").body("overwrite", request).middlewares(validate(RobloxGroupRoleSchema)).request();
  }
  /** PATCH /v1/groups/{groupId}/rolesets/{rolesetId} */
  updateRole(groupId, roleId, request) {
    return this.http().method("PATCH").path("v1", "groups", groupId, "rolesets", roleId).body("overwrite", request).middlewares(validate(RobloxGroupRoleSchema)).request();
  }
  /** DELETE /v1/groups/{groupId}/rolesets/{rolesetId} — 멤버가 있는 역할은 지울 수 없다 (409) */
  async deleteRole(groupId, roleId) {
    await this.http().method("DELETE").path("v1", "groups", groupId, "rolesets", roleId).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** PATCH /v1/groups/{groupId}/users/{userId} — 멤버의 역할을 바꾼다 */
  async setMemberRole(groupId, userId, roleId) {
    await this.http().method("PATCH").path("v1", "groups", groupId, "users", userId).body("overwrite", { roleId }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** DELETE /v1/groups/{groupId}/users/{userId} — 멤버를 내보낸다 */
  async removeMember(groupId, userId) {
    await this.http().method("DELETE").path("v1", "groups", groupId, "users", userId).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** GET /v1/groups/{groupId}/join-requests — 가입 요청 목록 */
  getJoinRequests(groupId, query = {}) {
    return this.http().path("v1", "groups", groupId, "join-requests").query(query).middlewares(validate(RobloxGroupJoinRequestPageSchema)).request();
  }
  /** GET /v1/groups/{groupId}/join-requests/users/{userId} — 이 유저들의 가입 요청. 요청이 없는 유저는 뺀다 */
  async getJoinRequestsByUsers(groupId, userIds) {
    return this.many(this.joinRequests, userIds.map((userId) => ({ groupId, userId })), (t) => `${t.groupId}:${t.userId}`);
  }
  /** 가입 요청을 받아들인다. 한 명이면 /users/{userId}, 여러 명이면 묶음 엔드포인트로 보낸다 */
  async acceptJoinRequests(groupId, userIds) {
    await this.batchWrite(
      userIds,
      (userId) => this.http().path("v1", "groups", groupId, "join-requests", "users", userId).body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request(),
      (UserIds) => this.http().path("v1", "groups", groupId, "join-requests").body("overwrite", { UserIds }).middlewares(validate(RobloxEmptyResponseSchema)).request()
    );
  }
  /** 가입 요청을 거절한다. 한 명이면 /users/{userId}, 여러 명이면 묶음 엔드포인트로 보낸다 */
  async declineJoinRequests(groupId, userIds) {
    await this.batchWrite(
      userIds,
      (userId) => this.http().method("DELETE").path("v1", "groups", groupId, "join-requests", "users", userId).middlewares(validate(RobloxEmptyResponseSchema)).request(),
      (UserIds) => this.http().method("DELETE").path("v1", "groups", groupId, "join-requests").body("overwrite", { UserIds }).middlewares(validate(RobloxEmptyResponseSchema)).request()
    );
  }
  /**
   * 하나면 single, 여럿이면 묶음 엔드포인트로 나눠 보낸다. 실패한 묶음이 있으면 RobloxPartialError를 던진다
   * (`results`는 처리된 id, `errors`는 실패한 묶음의 id마다 하나).
   */
  async batchWrite(ids, single, multi) {
    if (!ids.length) return;
    const chunks = ids.length === 1 ? [[ids[0]]] : chunk(ids, MULTI_WRITE_LIMIT);
    const { errors } = await settle(chunks, (part) => ids.length === 1 ? single(part[0]) : multi(part));
    const failed = new Set(errors.flatMap((e) => e.input));
    finish(ids.filter((id2) => !failed.has(id2)), errors.flatMap((e) => e.input.map((input) => ({ input, error: e.error }))));
  }
  /** GET /v1/groups/{groupId}/bans */
  getBans(groupId, query = {}) {
    return this.http().path("v1", "groups", groupId, "bans").query(query).middlewares(validate(RobloxGroupBanPageSchema)).request();
  }
  /** GET /v1/groups/{groupId}/bans/{userId} — 이 유저들의 차단 정보. 차단되지 않은 유저는 뺀다 */
  getBannedUsers(groupId, userIds) {
    return this.many(this.bans, userIds.map((userId) => ({ groupId, userId })), (t) => `${t.groupId}:${t.userId}`);
  }
  /** POST /v1/groups/{groupId}/bans/{userId} */
  banUser(groupId, userId) {
    return this.http().path("v1", "groups", groupId, "bans", userId).body("overwrite", {}).middlewares(validate(RobloxGroupBanSchema)).request();
  }
  /** DELETE /v1/groups/{groupId}/bans/{userId} */
  async unbanUser(groupId, userId) {
    await this.http().method("DELETE").path("v1", "groups", groupId, "bans", userId).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** GET /v1/groups/{groupId}/audit-log */
  getAuditLog(groupId, query = {}) {
    return this.http().path("v1", "groups", groupId, "audit-log").query(query).middlewares(validate(RobloxGroupAuditLogPageSchema)).request();
  }
  /** GET /v1/groups/{groupId}/settings */
  async getSettings(groupIds) {
    const { values: list, errors } = await settle(groupIds, (id2) => this.settings.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => list[i] && { groupId, ...list[i] })), errors);
  }
  /** PATCH /v1/groups/{groupId}/settings — 넣은 항목만 바꾼다 */
  async updateSettings(groupId, request) {
    await this.http().method("PATCH").path("v1", "groups", groupId, "settings").body("overwrite", request).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** GET /v1/groups/{groupId}/configuration — 엠블럼/커버 사진 asset id */
  getConfigurations(groupIds) {
    return this.many(this.configurations, groupIds, String);
  }
  /** GET /v1/groups/{groupId}/features — 기능별 차단 상태와 잠금 여부 */
  async getFeatures(groupIds) {
    const { values: list, errors } = await settle(groupIds, (id2) => this.features.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => list[i] && { groupId, ...list[i] })), errors);
  }
  /** GET /v1/groups/{groupId}/features/status — 막힌 기능이 하나라도 있는지 */
  async getFeaturesBlocked(groupIds) {
    const { values: list, errors } = await settle(groupIds, (id2) => this.featuresBlocked.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => list[i] === null ? null : { groupId, hasFeaturesBlocked: list[i] })), errors);
  }
  /** PATCH /v1/groups/{groupId}/features — 지금은 걸려 있는 차단을 푸는 것만 된다. 바뀌었으면 true */
  async updateFeatures(groupId, features) {
    const res = await this.http().method("PATCH").path("v1", "groups", groupId, "features").body("overwrite", { Features: features }).middlewares(validate(import_zod14.default.object({ Updated: import_zod14.default.boolean() }))).request();
    return res.Updated;
  }
  /** PATCH /v1/groups/{groupId}/name — 비용과 대기 기간은 `getConfigurationMetadata()`의 groupNameChangeConfiguration */
  async setName(groupId, name) {
    const res = await this.http().method("PATCH").path("v1", "groups", groupId, "name").body("overwrite", { name }).middlewares(validate(import_zod14.default.object({ newName: import_zod14.default.string() }))).request();
    return res.newName;
  }
  /** PATCH /v1/groups/{groupId}/description — 필터링된 뒤의 설명을 돌려준다 */
  async setDescription(groupId, description) {
    const res = await this.http().method("PATCH").path("v1", "groups", groupId, "description").body("overwrite", { description }).middlewares(validate(import_zod14.default.object({ newDescription: import_zod14.default.string() }))).request();
    return res.newDescription;
  }
  /** PATCH /v1/groups/{groupId}/status — 샤우트. 빈 문자열이면 지운다 */
  setShout(groupId, message) {
    return this.http().method("PATCH").path("v1", "groups", groupId, "status").body("overwrite", { message }).middlewares(validate(RobloxGroupShoutSchema.nullable())).request();
  }
  /** PATCH /v1/groups/icon — 아이콘을 multipart로 올린다 */
  async setIcon(groupId, icon) {
    const form = new FormData();
    form.append("Files", icon);
    await this.http().method("PATCH").path("v1", "groups", "icon").query({ groupId }).body("overwrite", form).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** POST /v1/groups/{groupId}/social-links */
  createSocialLink(groupId, request) {
    return this.http().path("v1", "groups", groupId, "social-links").body("overwrite", request).middlewares(validate(RobloxGroupSocialLinkSchema)).request();
  }
  /** PATCH /v1/groups/{groupId}/social-links/{socialLinkId} */
  async updateSocialLink(groupId, socialLinkId, request) {
    await this.http().method("PATCH").path("v1", "groups", groupId, "social-links", socialLinkId).body("overwrite", request).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** DELETE /v1/groups/{groupId}/social-links/{socialLinkId} */
  async deleteSocialLink(groupId, socialLinkId) {
    await this.http().method("DELETE").path("v1", "groups", groupId, "social-links", socialLinkId).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** GET /v1/groups/{groupId}/blocked-keywords — 포럼 차단 키워드 */
  getKeywords(groupId, query = {}) {
    return this.http().path("v1", "groups", groupId, "blocked-keywords").query(query).middlewares(validate(RobloxGroupKeywordPageSchema)).request();
  }
  /** POST /v1/groups/{groupId}/blocked-keywords — 스펙은 keywords를 문자열 하나로 받는다 */
  createKeywords(groupId, request) {
    return this.http().path("v1", "groups", groupId, "blocked-keywords").body("overwrite", request).middlewares(validate(RobloxCreateGroupKeywordsResponseSchema)).request();
  }
  /** PATCH /v1/groups/{groupId}/blocked-keywords/{keywordId} */
  updateKeyword(groupId, keywordId, request) {
    return this.http().method("PATCH").path("v1", "groups", groupId, "blocked-keywords", keywordId).body("overwrite", request).middlewares(validate(RobloxGroupKeywordSchema)).request();
  }
  /** DELETE /v1/groups/{groupId}/blocked-keywords/{keywordId} */
  async deleteKeyword(groupId, keywordId) {
    await this.http().method("DELETE").path("v1", "groups", groupId, "blocked-keywords", keywordId).middlewares(validate(import_zod14.default.unknown())).request();
  }
  /** POST /v1/featured-content/event — 그룹에 이벤트를 내건다 */
  setFeaturedEvent(groupId, eventId) {
    return this.http().path("v1", "featured-content", "event").query({ groupId, eventId }).body("overwrite", {}).middlewares(validate(RobloxGroupFeaturedEventSchema)).request();
  }
  /** DELETE /v1/featured-content/event */
  async removeFeaturedEvent(groupId, eventId) {
    await this.http().method("DELETE").path("v1", "featured-content", "event").query({ groupId, eventId }).middlewares(validate(import_zod14.default.unknown())).request();
  }
  /** GET /v1/groups/{groupId}/relationships/{type}/requests — 받은 동맹 요청 */
  getRelationshipRequests(groupId, type, query = {}) {
    return this.http().path("v1", "groups", groupId, "relationships", relationshipPath(type), "requests").query({ StartRowIndex: query.startRowIndex ?? 0, MaxRows: query.maxRows ?? 100 }).middlewares(validate(RobloxGroupRelationshipsSchema)).request();
  }
  /** 받은 동맹 요청을 받아들인다. 하나면 /requests/{relatedGroupId}, 여러 개면 묶음 엔드포인트로 보낸다 */
  async acceptRelationshipRequests(groupId, type, relatedGroupIds) {
    const base = ["v1", "groups", groupId, "relationships", relationshipPath(type), "requests"];
    await this.batchWrite(
      relatedGroupIds,
      (id2) => this.http().path(...base, id2).body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request(),
      (GroupIds) => this.http().path(...base).body("overwrite", { GroupIds }).middlewares(validate(RobloxEmptyResponseSchema)).request()
    );
  }
  /** 받은 동맹 요청을 거절한다 */
  async declineRelationshipRequests(groupId, type, relatedGroupIds) {
    const base = ["v1", "groups", groupId, "relationships", relationshipPath(type), "requests"];
    await this.batchWrite(
      relatedGroupIds,
      (id2) => this.http().method("DELETE").path(...base, id2).middlewares(validate(RobloxEmptyResponseSchema)).request(),
      (GroupIds) => this.http().method("DELETE").path(...base).body("overwrite", { GroupIds }).middlewares(validate(RobloxEmptyResponseSchema)).request()
    );
  }
  /** POST /v1/groups/{groupId}/relationships/{type}/{relatedGroupId} — 동맹 요청을 보내거나 적으로 정한다 */
  async createRelationship(groupId, type, relatedGroupId) {
    await this.http().path("v1", "groups", groupId, "relationships", relationshipPath(type), relatedGroupId).body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** DELETE /v1/groups/{groupId}/relationships/{type}/{relatedGroupId} */
  async deleteRelationship(groupId, type, relatedGroupId) {
    await this.http().method("DELETE").path("v1", "groups", groupId, "relationships", relationshipPath(type), relatedGroupId).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** GET /v1/groups/{groupId}/payouts — 정기 지급 대상과 비율 */
  async getPayouts(groupIds) {
    const { values: lists, errors } = await settle(groupIds, (id2) => this.payouts.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => lists[i] ? { groupId, payouts: lists[i] } : null)), errors);
  }
  /** GET /v1/groups/{groupId}/payout-restriction — 지급 기능을 쓸 수 있는지 */
  async getPayoutRestrictions(groupIds) {
    const { values: list, errors } = await settle(groupIds, (id2) => this.payoutRestrictions.load(String(id2), id2));
    return finish(found(groupIds.map((groupId, i) => list[i] && { groupId, ...list[i] })), errors);
  }
  /**
   * POST /v1/groups/{groupId}/payouts — 그룹 자금에서 Robux를 지급한다. 다시 보내도 두 번 나가지 않게
   * `idempotencyKey`를 붙인다 (주지 않으면 만들어 넣는다 — 재시도도 같은 키로 나간다). 처리됐으면 status 0이 아닌 값이 올 수 있다.
   */
  async payout(groupId, recipients, opts = {}) {
    const res = await this.http().path("v1", "groups", groupId, "payouts").body("overwrite", {
      PayoutType: 1,
      Recipients: recipients.map((r) => ({ recipientId: r.userId, recipientType: 0, amount: r.amount })),
      IdempotencyKey: opts.idempotencyKey ?? crypto.randomUUID()
    }).middlewares(validate(import_zod14.default.object({ status: import_zod14.default.union([import_zod14.default.number(), import_zod14.default.string()]) }))).request();
    return Number(res.status);
  }
  /** POST /v1/groups/{groupId}/payouts/recurring — 정기 지급 비율을 통째로 바꾼다 */
  async setRecurringPayouts(groupId, recipients) {
    await this.http().path("v1", "groups", groupId, "payouts", "recurring").body("overwrite", {
      PayoutType: 2,
      Recipients: recipients.map((r) => ({ recipientId: r.userId, recipientType: 0, amount: r.percentage }))
    }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** POST /v1/groups/{groupId}/change-owner — 주인을 넘긴다 (멤버여야 한다) */
  async changeOwner(groupId, userId) {
    await this.http().path("v1", "groups", groupId, "change-owner").body("overwrite", { userId }).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** POST /v1/groups/{groupId}/claim-ownership — 주인이 없는 그룹을 가져온다 */
  async claimOwnership(groupId) {
    await this.http().path("v1", "groups", groupId, "claim-ownership").body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** POST /v1/groups/{groupId}/community-tier/evaluate — 커뮤니티 등급을 다시 계산한다 */
  evaluateCommunityTier(groupId) {
    return this.http().path("v1", "groups", groupId, "community-tier", "evaluate").body("overwrite", {}).middlewares(validate(RobloxGroupTierEvaluationSchema)).request();
  }
  /** POST /v1/groups/{groupId}/deactivate — 주인만 할 수 있다 */
  async deactivateGroup(groupId) {
    await this.http().path("v1", "groups", groupId, "deactivate").body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
};

// src/apis/badges.ts
var import_zod16 = __toESM(require("zod"), 1);

// src/types/badges.ts
var import_zod15 = __toESM(require("zod"), 1);
var RobloxBadgeStatisticsSchema = import_zod15.default.object({
  pastDayAwardedCount: import_zod15.default.number(),
  awardedCount: import_zod15.default.number(),
  /** 0~1. 지난 하루 동안 게임에 들어온 사람 중 받은 비율 */
  winRatePercentage: import_zod15.default.number()
});
var BadgeBaseSchema = import_zod15.default.object({
  id: RobloxBadgeIdSchema,
  name: import_zod15.default.string(),
  description: import_zod15.default.string().nullable(),
  displayName: import_zod15.default.string(),
  displayDescription: import_zod15.default.string().nullable(),
  enabled: import_zod15.default.boolean(),
  iconImageId: RobloxAssetIdSchema.nullable().catch(null),
  displayIconImageId: RobloxAssetIdSchema.nullable().catch(null),
  created: import_zod15.default.string(),
  updated: import_zod15.default.string(),
  statistics: RobloxBadgeStatisticsSchema
});
var RobloxBadgeSchema = BadgeBaseSchema.extend({
  awardingUniverse: import_zod15.default.object({
    id: RobloxUniverseIdSchema,
    name: import_zod15.default.string(),
    rootPlaceId: RobloxPlaceIdSchema
  })
});
var RobloxUserBadgeSchema = BadgeBaseSchema.extend({
  creator: RobloxCreatorSchema({ name: import_zod15.default.string().nullish() }),
  /** 응답은 `{ id, type: "Place" }`. type은 언제나 Place라 뺀다 */
  awarder: import_zod15.default.object({ id: RobloxPlaceIdSchema, name: import_zod15.default.string().nullish() })
});
var RobloxCreatedBadgeSchema = BadgeBaseSchema.extend({
  awarder: import_zod15.default.object({ id: RobloxPlaceIdSchema, name: import_zod15.default.string().nullish() })
});
var RobloxBadgeAwardSchema = import_zod15.default.object({
  badgeId: RobloxBadgeIdSchema,
  awardedDate: import_zod15.default.string()
});
var RobloxBadgeMetadataSchema = import_zod15.default.object({
  /** 무료 한도를 넘었을 때 배지 하나를 만드는 비용(Robux) */
  badgeCreationPrice: import_zod15.default.number(),
  maxBadgeNameLength: import_zod15.default.number(),
  maxBadgeDescriptionLength: import_zod15.default.number(),
  defaultBadgeIconImageId: RobloxAssetIdSchema.nullable().catch(null)
});
var RobloxBadgePageSchema = RobloxPageResponseSchema(RobloxBadgeSchema);
var RobloxUserBadgePageSchema = RobloxPageResponseSchema(RobloxUserBadgeSchema);
var RobloxBadgeAwardsResponseSchema = import_zod15.default.object({ data: import_zod15.default.array(RobloxBadgeAwardSchema) });

// src/apis/badges.ts
var ORIGIN7 = "https://badges.roblox.com";
var AWARDED_DATES_LIMIT = 100;
var RobloxBadgesApi = class {
  constructor(config, thumbnails) {
    this.config = config;
    this.thumbnails = thumbnails;
    this.http = createHttp(config, ORIGIN7);
    const batcher = (...routes) => new RobloxBatcher(config, ORIGIN7, routes);
    this.badges = batcher({
      bucket: "badges GET /v1/badges/{badgeId}",
      limit: 1,
      group: () => "",
      async send(http, [badgeId], onHeaders) {
        return [await nullOn([404], onHeaders, () => http().path("v1", "badges", badgeId).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxBadgeSchema)).request())];
      }
    });
    this.awards = batcher(
      {
        bucket: "badges GET /v1/users/{userId}/badges/awarded-dates",
        limit: AWARDED_DATES_LIMIT,
        group: (t) => String(t.userId),
        async send(http, targets, onHeaders) {
          const res = await http().path("v1", "users", targets[0].userId, "badges", "awarded-dates").query({ badgeIds: targets.map((t) => t.badgeId).join(",") }).middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxBadgeAwardsResponseSchema)).request();
          const byId = new Map(res.data.map((a) => [a.badgeId, a.awardedDate]));
          return targets.map((t) => byId.get(t.badgeId) ?? null);
        }
      },
      {
        bucket: "badges GET /v1/users/{userId}/badges/{badgeId}/awarded-date",
        limit: 1,
        group: () => "",
        async send(http, [t], onHeaders) {
          const res = await http().path("v1", "users", t.userId, "badges", t.badgeId, "awarded-date").middlewares(captureHeaders(onHeaders)).middlewares(validate(RobloxBadgeAwardSchema.nullish().catch(null))).request();
          return [res?.awardedDate ?? null];
        }
      }
    );
    this.freeQuotas = batcher({
      bucket: "badges GET /v1/universes/{universeId}/free-badges-quota",
      limit: 1,
      group: () => "",
      async send(http, [universeId], onHeaders) {
        return [await nullOn([404], onHeaders, () => http().path("v1", "universes", universeId, "free-badges-quota").middlewares(captureHeaders(onHeaders)).middlewares(validate(import_zod16.default.number())).request())];
      }
    });
  }
  config;
  thumbnails;
  http;
  badges;
  awards;
  freeQuotas;
  ttl(method) {
    return resolveTtl(this.config, "badges", method);
  }
  async getBadges(badgeIds, opts = {}) {
    const badges = settle(badgeIds, (id2) => cached(this.config, { service: "badges", method: "getBadges", badgeId: id2 }, this.ttl("getBadges"), () => this.badges.load(String(id2), id2)));
    if (!opts.thumbnail) {
      const { values: values2, errors: errors2 } = await badges;
      return finish(found(values2), errors2);
    }
    const target = opts.thumbnail === true ? {} : opts.thumbnail;
    const [{ values, errors }, icons] = await Promise.all([badges, this.thumbnails.getSettled(badgeIds.map((targetId) => ({ ...target, type: "BadgeIcon", targetId })))]);
    const byId = new Map(badgeIds.map((id2, i) => [id2, icons.values[i]]));
    return finish(found(values).map((b) => ({ ...b, thumbnail: byId.get(b.id) ?? null })), errors);
  }
  /** GET /v1/universes/{universeId}/badges — 게임의 배지 (100회/분). 없는 게임이면 빈 목록이다 */
  getUniverseBadges(universeId, query = {}) {
    return this.http().path("v1", "universes", universeId, "badges").query(query).middlewares(validate(RobloxBadgePageSchema)).request();
  }
  /** GET /v1/users/{userId}/badges — 유저가 받은 배지 (1000회/분). 인증 필요. 없는 유저면 404 */
  getUserBadges(userId, query = {}) {
    return this.http().path("v1", "users", userId, "badges").query(query).middlewares(validate(RobloxUserBadgePageSchema)).request();
  }
  /**
   * 유저가 배지들을 받았는지와 받은 날짜. 인증 필요. 결과는 입력과 같은 순서이고, 받지 않은 배지는 `awardedDate`가 null이다
   * (없는 배지도 null이다 — 서버가 구분해 주지 않는다).
   * awarded-dates(100개씩, 10회/분)와 awarded-date(하나씩, 100회/분)를 나눠 쓴다. 받은 날짜만 캐시한다.
   */
  async getAwardedDates(userId, badgeIds) {
    const { values, errors } = await settle(badgeIds, (badgeId) => cached(
      this.config,
      { service: "badges", method: "getAwardedDates", userId, badgeId },
      this.ttl("getAwardedDates"),
      () => this.awards.load(`${userId}:${badgeId}`, { userId, badgeId })
    ));
    const failed = new Set(errors.map((e) => e.input));
    return finish(badgeIds.flatMap((badgeId, i) => failed.has(badgeId) ? [] : [{ badgeId, awardedDate: values[i] }]), errors);
  }
  /** GET /v1/universes/{universeId}/free-badges-quota — 오늘(UTC) 남은 무료 배지 수. 없는 게임은 뺀다 */
  async getFreeQuotas(universeIds) {
    const { values, errors } = await settle(universeIds, (id2) => this.freeQuotas.load(String(id2), id2));
    return finish(found(universeIds.map((universeId, i) => values[i] === null ? null : { universeId, quota: values[i] })), errors);
  }
  /** GET /v1/badges/metadata — 배지 비용과 이름/설명 길이 제한 */
  getMetadata() {
    return this.http().path("v1", "badges", "metadata").middlewares(validate(RobloxBadgeMetadataSchema)).request();
  }
  // ── 관리 (인증 필요) ───────────────────────────────
  /**
   * POST /v1/universes/{universeId}/badges — 배지를 만든다. 게임의 시작 place에 붙는다.
   * 그날의 무료 한도(`getFreeQuotas`)를 넘으면 `paymentSource`에서 `getMetadata().badgeCreationPrice`만큼 낸다.
   */
  createBadge(universeId, request) {
    const form = new FormData();
    form.append("name", request.name);
    if (request.description !== void 0) form.append("description", request.description);
    if (request.paymentSource !== void 0) form.append("paymentSourceType", request.paymentSource === "User" ? "1" : "2");
    if (request.expectedCost !== void 0) form.append("expectedCost", String(request.expectedCost));
    if (request.isActive !== void 0) form.append("isActive", String(request.isActive));
    if (request.icon !== void 0) form.append("files", request.icon);
    return this.http().path("v1", "universes", universeId, "badges").body("overwrite", form).middlewares(validate(RobloxCreatedBadgeSchema)).request();
  }
  /** PATCH /v1/badges/{badgeId} — 이름, 설명, 활성화 여부 */
  async updateBadge(badgeId, request) {
    await this.http().method("PATCH").path("v1", "badges", badgeId).body("overwrite", request).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
  /** POST /v1/badges/{badgeId}/icon — 아이콘을 multipart로 올린다. 새 아이콘 이미지의 asset id를 돌려준다 */
  async setIcon(badgeId, icon) {
    const form = new FormData();
    form.append("Files", icon);
    const res = await this.http().path("v1", "badges", badgeId, "icon").body("overwrite", form).middlewares(validate(import_zod16.default.object({ targetId: RobloxAssetIdSchema }))).request();
    return res.targetId;
  }
  /** DELETE /v1/user/badges/{badgeId} — 요청 계정에서 배지를 지운다 */
  async removeBadge(badgeId) {
    await this.http().method("DELETE").path("v1", "user", "badges", badgeId).middlewares(validate(RobloxEmptyResponseSchema)).request();
  }
};

// src/client.ts
var RobloxClient = class _RobloxClient {
  constructor(config) {
    this.config = config;
  }
  config;
  _users;
  _thumbnails;
  _presence;
  _games;
  _friends;
  _chat;
  _groups;
  _badges;
  /** 쿠키 → 고정 클라이언트. 같은 쿠키면 같은 클라이언트를 돌려줘 요청 묶기·중복 제거·내 id 캐시가 이어진다 */
  asClients = /* @__PURE__ */ new Map();
  /** users.roblox.com */
  get users() {
    return this._users ??= new RobloxUsersApi(this.config, this.thumbnails);
  }
  /** thumbnails.roblox.com */
  get thumbnails() {
    return this._thumbnails ??= new RobloxThumbnailsApi(this.config);
  }
  /** presence.roblox.com */
  get presence() {
    return this._presence ??= new RobloxPresenceApi(this.config);
  }
  /** games.roblox.com + gamejoin.roblox.com */
  get games() {
    return this._games ??= new RobloxGamesApi(this.config, this.thumbnails, this.presence);
  }
  /** friends.roblox.com */
  get friends() {
    return this._friends ??= new RobloxFriendsApi(this.config, this.users);
  }
  /** groups.roblox.com */
  get groups() {
    return this._groups ??= new RobloxGroupsApi(this.config, this.thumbnails, this.users);
  }
  /** badges.roblox.com */
  get badges() {
    return this._badges ??= new RobloxBadgesApi(this.config, this.thumbnails);
  }
  /** apis.roblox.com/platform-chat-api — 요청 계정의 채팅. `.as(cookie)`나 확장 모드에서 쓴다 */
  get chat() {
    return this._chat ??= new RobloxChatApi(this.config);
  }
  /**
   * 지정한 쿠키로 고정한 클라이언트. 요청 계정에 따라 응답이 달라지는 API용.
   * 확장 모드에서는 쿠키를 붙일 수 없으므로 의미가 없다.
   */
  as(cookie) {
    let client = this.asClients.get(cookie);
    if (!client) this.asClients.set(cookie, client = new _RobloxClient({ ...this.config, fixedCookie: cookie }));
    return client;
  }
};

// src/core/cookies.ts
var import_zod17 = __toESM(require("zod"), 1);
var RobloxCookieSchema = import_zod17.default.string().min(1).brand("RobloxCookie");
var RobloxMemoryCookies = class {
  cookies;
  index = 0;
  constructor(cookies = []) {
    this.cookies = [...new Set(cookies)];
  }
  list() {
    return [...this.cookies];
  }
  has(cookie) {
    return this.cookies.includes(cookie);
  }
  add(...cookies) {
    for (const cookie of cookies) if (!this.cookies.includes(cookie)) this.cookies.push(cookie);
  }
  remove(...cookies) {
    this.cookies = this.cookies.filter((c) => !cookies.includes(c));
  }
  replace(cookies) {
    this.cookies = [...new Set(cookies)];
    this.index = 0;
  }
  /** 라운드 로빈으로 다음 쿠키를 고른다. 비어 있으면 `null`. */
  next() {
    if (this.cookies.length === 0) return null;
    const cookie = this.cookies[this.index % this.cookies.length];
    this.index = (this.index + 1) % this.cookies.length;
    return cookie;
  }
};

// src/core/ratelimit.ts
var PROBE_CONCURRENCY = 4;
var MAX_BACKOFF = 60;
var RobloxRateBucket = class {
  constructor(key = "", store = null) {
    this.key = key;
    this.store = store;
    this.stale = store !== null;
  }
  key;
  store;
  /** null이면 모른다 */
  remaining = null;
  resetAt = 0;
  inflight = 0;
  /** 최근 연속 429 횟수. 성공하면 줄어든다 */
  strikes = 0;
  /** 자리가 나기를 기다리는 쪽(batcher). 한 번 알리면 지운다 */
  waiters = /* @__PURE__ */ new Set();
  /** 저장소에서 상태를 읽어야 하는지 (처음, 창이 지난 뒤) */
  stale;
  syncing = false;
  /**
   * 진행 중인 요청이 끝나 자리가 날 때 한 번 부른다. 버킷은 여러 batcher가 같이 쓰므로
   * (같은 엔드포인트를 쓰는 서비스, `.as(cookie)` 클라이언트) 요청을 보낸 쪽만 깨어나면 안 된다.
   */
  whenFree(callback) {
    this.waiters.add(callback);
  }
  notify() {
    const waiters = [...this.waiters];
    this.waiters.clear();
    for (const waiter of waiters) waiter();
  }
  /** 지금 요청 하나를 보낼 수 있으면 자리를 잡고 true. 끝나면 `release` 또는 `exhaust`를 불러야 한다. */
  tryAcquire(now = Date.now()) {
    if (now >= this.resetAt && this.remaining !== null) {
      this.remaining = null;
      this.stale = this.store !== null;
    }
    if (this.stale) this.load();
    if (this.syncing) return false;
    const probe = this.strikes > 0 ? 1 : PROBE_CONCURRENCY;
    const free = this.remaining === null ? probe - this.inflight : Math.min(this.remaining, this.strikes > 0 ? 1 - this.inflight : Infinity);
    if (free <= 0) return false;
    if (this.remaining !== null) this.remaining--;
    this.inflight++;
    return true;
  }
  /** 요청이 끝났다. 응답 헤더가 있으면 상태를 갱신한다. */
  release(headers) {
    this.inflight = Math.max(0, this.inflight - 1);
    this.strikes = Math.max(0, this.strikes - 1);
    const remaining = Number(headers?.get("x-ratelimit-remaining"));
    const reset = Number(headers?.get("x-ratelimit-reset"));
    if (headers?.has("x-ratelimit-remaining") && Number.isFinite(remaining) && Number.isFinite(reset)) {
      this.remaining = Math.max(0, remaining - this.inflight);
      this.resetAt = Date.now() + reset * 1e3;
      this.save();
    }
    this.notify();
  }
  /** 429를 받았다. 리셋될 때까지 막는다. */
  exhaust(headers) {
    this.inflight = Math.max(0, this.inflight - 1);
    const reset = Number(headers?.get("x-ratelimit-reset"));
    if (Date.now() >= this.resetAt) this.strikes++;
    const backoff = Math.min(MAX_BACKOFF, 2 ** (this.strikes - 1));
    this.remaining = 0;
    this.resetAt = Date.now() + Math.max(Number.isFinite(reset) && reset > 0 ? reset : 1, backoff) * 1e3;
    this.save();
    this.notify();
  }
  /**
   * 밖에서 온 상태를 합친다. 지금 상태를 모르면 그대로 받고, 알면 더 보수적인 쪽을 따른다
   * (남은 수는 작은 쪽, 리셋은 늦은 쪽). 이미 지난 창은 버린다.
   */
  merge(state, now = Date.now()) {
    if (!(state.resetAt > now) || !Number.isFinite(state.remaining)) return;
    if (this.remaining === null || now >= this.resetAt) {
      this.remaining = Math.max(0, state.remaining);
      this.resetAt = state.resetAt;
    } else {
      this.remaining = Math.max(0, Math.min(this.remaining, state.remaining));
      this.resetAt = Math.max(this.resetAt, state.resetAt);
    }
    this.strikes = Math.max(this.strikes, state.strikes || 0);
    this.notify();
  }
  load() {
    this.stale = false;
    this.syncing = true;
    const store = this.store;
    Promise.resolve().then(() => store.get(this.key)).then((state) => {
      if (state) this.merge(state);
    }, () => {
    }).finally(() => {
      this.syncing = false;
      this.notify();
    });
  }
  save() {
    if (!this.store || this.remaining === null) return;
    const state = { remaining: this.remaining, resetAt: this.resetAt, strikes: this.strikes };
    Promise.resolve().then(() => this.store.set(this.key, state)).catch(() => {
    });
  }
  /** 다시 보낼 수 있을 때까지 남은 시간(ms). 지금 보낼 수 있으면 0 */
  waitTime(now = Date.now()) {
    if (now >= this.resetAt) return 0;
    return this.remaining === 0 ? this.resetAt - now : 0;
  }
};
var RobloxRateLimiter = class {
  constructor(store = null) {
    this.store = store;
    store?.watch?.((key, state) => this.buckets.get(key)?.merge(state));
  }
  store;
  buckets = /* @__PURE__ */ new Map();
  bucket(key) {
    let bucket = this.buckets.get(key);
    if (!bucket) this.buckets.set(key, bucket = new RobloxRateBucket(key, this.store));
    return bucket;
  }
};

// src/builder.ts
var RobloxConfigurableStage = class extends RobloxClient {
  /** 모든 서비스 요청의 재시도 설정 */
  retry(options) {
    return new RobloxOptionsStage({ ...this.config, retry: { ...this.config.retry, ...options } });
  }
  /**
   * 서버 위치 조회에 쓸 IP → 위치 콜백. 어느 서비스(ipgeolocation.io, ip-api.com, MaxMind 로컬 DB …)를 쓸지는 사용자가 정한다.
   * 라이브러리는 돌려준 값을 해석하지 않는다 — 어떤 모양이든 되고, 결과에는 그 값과 타입이 그대로 들어간다.
   */
  geolocation(geolocate) {
    return new RobloxOptionsStage({ ...this.config, geolocate });
  }
  /** 레이트리밋 상태를 밖과 동기화할 저장소. 새로고침·재시작 뒤에도, 같은 IP를 쓰는 다른 탭/인스턴스와도 한도를 이어받는다. */
  rateLimits(store) {
    return new RobloxOptionsStage({ ...this.config, rateLimits: new RobloxRateLimiter(store) });
  }
  /** 캐시 저장소. `ttl()`은 이걸 지정한 다음에만 쓸 수 있다. */
  cache(store) {
    return new RobloxCacheStage({ ...this.config, cache: store });
  }
};
var VigorRoblox = class {
  mode(mode) {
    const config = {
      mode,
      cookies: null,
      onCookieRejected: null,
      rejecting: /* @__PURE__ */ new Map(),
      inflight: /* @__PURE__ */ new Map(),
      fixedCookie: null,
      retry: {},
      cache: null,
      ttl: {},
      csrf: /* @__PURE__ */ new Map(),
      rateLimits: new RobloxRateLimiter(),
      geolocate: null
    };
    return mode === "extension" ? new RobloxExtensionStage(config) : new RobloxNodeStage(config);
  }
};
var RobloxExtensionStage = class extends RobloxConfigurableStage {
};
var RobloxNodeStage = class _RobloxNodeStage extends RobloxConfigurableStage {
  /**
   * 요청마다 하나씩 쓸 쿠키 풀. 배열은 프로세스 메모리의 라운드 로빈 풀(`RobloxMemoryCookies`)로 감싼다.
   * 서버리스처럼 프로세스가 자주 새로 뜨는 곳에서는 외부 저장소로 만든 `RobloxCookieStore`를 넣는다.
   * 실행 중에 쿠키를 바꾸려면 `RobloxMemoryCookies`를 직접 만들어 넣고 그걸 고친다.
   */
  cookies(cookies) {
    const store = Array.isArray(cookies) ? new RobloxMemoryCookies(cookies) : cookies;
    return new _RobloxNodeStage({ ...this.config, cookies: store });
  }
  /**
   * Roblox가 쿠키를 거부했을 때(401, 403 "User is moderated") 할 일. 이유(`RobloxCookieRejectReason`)는 두 번째 인자로 온다.
   * 지정하면 기본 처리(풀에서 빼기, `store.remove`)는 하지 않는다 — 원본 DB에서 지우거나, 정지가 풀릴 때까지 빼 두거나,
   * 기록만 하고 남겨 두는 것은 여기서 정한다. `.as(cookie)`의 쿠키도 같은 콜백을 탄다.
   * 풀에서 돌려 쓰는 요청은 처리가 끝난 뒤 다른 쿠키로 다시 보낸다.
   */
  onCookieRejected(handler) {
    return new _RobloxNodeStage({ ...this.config, onCookieRejected: handler });
  }
};
var RobloxOptionsStage = class extends RobloxConfigurableStage {
};
var RobloxCacheStage = class _RobloxCacheStage extends RobloxClient {
  /** 서비스 → 메서드 → TTL(ms). 적지 않은 메서드는 기본값(`RobloxDefaultTtl`)을 쓴다. 0이어도 저장소의 get/set은 불린다 (0의 처리는 저장소가 정한다). */
  ttl(ttl) {
    return new _RobloxCacheStage({ ...this.config, ttl: mergeTtl(this.config.ttl, ttl) });
  }
  retry(options) {
    return new _RobloxCacheStage({ ...this.config, retry: { ...this.config.retry, ...options } });
  }
  geolocation(geolocate) {
    return new _RobloxCacheStage({ ...this.config, geolocate });
  }
  rateLimits(store) {
    return new _RobloxCacheStage({ ...this.config, rateLimits: new RobloxRateLimiter(store) });
  }
};
var vigorRoblox = new VigorRoblox();

// src/extension.ts
var TAB_ID_NONE = -1;
var CLIENT_USER_AGENT2 = "Roblox/WinInet";
function robloxDnrRules(options = {}) {
  const { firstRuleId = 1, priority = 1, extensionOnly = false } = options;
  return [{
    id: firstRuleId,
    priority,
    action: { type: "modifyHeaders", requestHeaders: [{ header: "User-Agent", operation: "set", value: CLIENT_USER_AGENT2 }] },
    condition: { requestDomains: ["gamejoin.roblox.com"], resourceTypes: ["xmlhttprequest"], ...extensionOnly ? { tabIds: [TAB_ID_NONE] } : {} }
  }];
}

// src/index.ts
var index_default = vigorRoblox;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RobloxAgeBracket,
  RobloxAgeBracketSchema,
  RobloxArrayResponseSchema,
  RobloxAssetIdSchema,
  RobloxAuthenticatedUserSchema,
  RobloxBadgeAwardSchema,
  RobloxBadgeAwardsResponseSchema,
  RobloxBadgeIdSchema,
  RobloxBadgeMetadataSchema,
  RobloxBadgePageSchema,
  RobloxBadgeSchema,
  RobloxBadgeStatisticsSchema,
  RobloxBadgesApi,
  RobloxBirthDaySchema,
  RobloxBirthMonthSchema,
  RobloxBirthYearSchema,
  RobloxBirthdateSchema,
  RobloxBundleIdSchema,
  RobloxCacheStage,
  RobloxCaptchaStatusSchema,
  RobloxChatApi,
  RobloxChatConversationPageRawSchema,
  RobloxChatConversationResultSchema,
  RobloxChatConversationResultsResponseSchema,
  RobloxChatConversationSchema,
  RobloxChatConversationsResponseSchema,
  RobloxChatMessageIdSchema,
  RobloxChatMessagePageRawSchema,
  RobloxChatMessageSchema,
  RobloxChatMetadataSchema,
  RobloxChatSendResponseSchema,
  RobloxChatUnreadCountsSchema,
  RobloxChatUserDataSchema,
  RobloxClient,
  RobloxCommunityTierSchema,
  RobloxConversationIdSchema,
  RobloxCookieSchema,
  RobloxCountResponseSchema,
  RobloxCreateGroupKeywordsResponseSchema,
  RobloxCreatedBadgeSchema,
  RobloxCreatorSchema,
  RobloxCursorSchema,
  RobloxDefaultTtl,
  RobloxDeveloperProductIdSchema,
  RobloxEmptyResponseSchema,
  RobloxErrorResponseSchema,
  RobloxExtensionStage,
  RobloxFavoriteGamePageSchema,
  RobloxFavoriteGameSchema,
  RobloxFiatPurchaseDataSchema,
  RobloxFollowPageSchema,
  RobloxFollowingExistsResponseSchema,
  RobloxFollowingStatusSchema,
  RobloxFriendListResponseSchema,
  RobloxFriendPageRawSchema,
  RobloxFriendPresenceSchema,
  RobloxFriendRequestPageSchema,
  RobloxFriendRequestSchema,
  RobloxFriendStatusSchema,
  RobloxFriendStatusesResponseSchema,
  RobloxFriendsApi,
  RobloxFriendsGroupsResponseSchema,
  RobloxFriendsMetadataSchema,
  RobloxGameCreatorSchema,
  RobloxGameMediaResponseSchema,
  RobloxGameMediaSchema,
  RobloxGamePassIdSchema,
  RobloxGamePlayabilitySchema,
  RobloxGameProductSchema,
  RobloxGameProductsResponseSchema,
  RobloxGameRecommendationsSchema,
  RobloxGameSchema,
  RobloxGameSummaryPageSchema,
  RobloxGameSummarySchema,
  RobloxGameThumbnailIdSchema,
  RobloxGameVotesResponseSchema,
  RobloxGameVotesSchema,
  RobloxGamesApi,
  RobloxGamesResponseSchema,
  RobloxGender,
  RobloxGenderSchema,
  RobloxGroupAuditActionTypes,
  RobloxGroupAuditLogItemSchema,
  RobloxGroupAuditLogPageSchema,
  RobloxGroupBanPageSchema,
  RobloxGroupBanSchema,
  RobloxGroupBasicSchema,
  RobloxGroupConfigurationMetadataSchema,
  RobloxGroupConfigurationSchema,
  RobloxGroupDetailPartialSchema,
  RobloxGroupDetailSchema,
  RobloxGroupEmoteSetsResponseSchema,
  RobloxGroupEventIdSchema,
  RobloxGroupFeatureFreezesResponseSchema,
  RobloxGroupFeaturedEventSchema,
  RobloxGroupFeaturesSchema,
  RobloxGroupIdSchema,
  RobloxGroupJoinRequestPageSchema,
  RobloxGroupJoinRequestSchema,
  RobloxGroupKeywordIdSchema,
  RobloxGroupKeywordPageSchema,
  RobloxGroupKeywordSchema,
  RobloxGroupLookupResponseSchema,
  RobloxGroupMemberPageSchema,
  RobloxGroupMemberSchema,
  RobloxGroupMembershipDetailSchema,
  RobloxGroupMembershipSchema,
  RobloxGroupNameHistoryPageSchema,
  RobloxGroupNotificationPreferenceSchema,
  RobloxGroupPayoutRestrictionSchema,
  RobloxGroupPayoutsResponseSchema,
  RobloxGroupPermissionsSchema,
  RobloxGroupPoliciesResponseSchema,
  RobloxGroupRelationshipsSchema,
  RobloxGroupRoleDetailSchema,
  RobloxGroupRoleDetailsResponseSchema,
  RobloxGroupRoleIdSchema,
  RobloxGroupRolePermissionsResponseSchema,
  RobloxGroupRolePermissionsSchema,
  RobloxGroupRoleSchema,
  RobloxGroupRolesResponseSchema,
  RobloxGroupSchema,
  RobloxGroupSearchItemSchema,
  RobloxGroupSearchMetadataSchema,
  RobloxGroupSearchPageSchema,
  RobloxGroupSettingsSchema,
  RobloxGroupShoutSchema,
  RobloxGroupSocialLinkIdSchema,
  RobloxGroupSocialLinkSchema,
  RobloxGroupSocialLinksResponseSchema,
  RobloxGroupTierEvaluationSchema,
  RobloxGroupUserPageSchema,
  RobloxGroupUserSchema,
  RobloxGroupsApi,
  RobloxGroupsMetadataSchema,
  RobloxGroupsResponseSchema,
  RobloxIpAddressSchema,
  RobloxJobIdSchema,
  RobloxJoinResponseSchema,
  RobloxJoinStatus,
  RobloxMemoryCache,
  RobloxMemoryCookies,
  RobloxMyPrivateServerPageSchema,
  RobloxNodeStage,
  RobloxOnlineFriendSchema,
  RobloxOnlineFriendsResponseSchema,
  RobloxOptionsStage,
  RobloxOutfitIdSchema,
  RobloxPageLimitSchema,
  RobloxPageResponseSchema,
  RobloxPartialError,
  RobloxPlaceDetailsSchema,
  RobloxPlaceIdSchema,
  RobloxPresenceApi,
  RobloxPresenceType,
  RobloxPresenceTypeSchema,
  RobloxPrimaryGroupResponseSchema,
  RobloxPrivateServerDetailSchema,
  RobloxPrivateServerIdSchema,
  RobloxPrivateServerInviteSchema,
  RobloxPrivateServerPageRawSchema,
  RobloxPrivateServerPermissionsSchema,
  RobloxPrivateServerRawSchema,
  RobloxPrivateServerSubscriptionSchema,
  RobloxRecommendedGameSchema,
  RobloxServerPageRawSchema,
  RobloxServerPlayerRawSchema,
  RobloxServerRawSchema,
  RobloxServerTypeSchema,
  RobloxSetBirthdateRequestSchema,
  RobloxSetDescriptionRequestSchema,
  RobloxSetDisplayNameRequestSchema,
  RobloxSetGenderRequestSchema,
  RobloxSortOrderSchema,
  RobloxThumbnailBatchItemSchema,
  RobloxThumbnailBatchResponseSchema,
  RobloxThumbnailReturnPolicySchema,
  RobloxThumbnailSchema,
  RobloxThumbnailSizes,
  RobloxThumbnailStateSchema,
  RobloxThumbnailsApi,
  RobloxThumbnailsResponseSchema,
  RobloxTrustedFriendRequestPageSchema,
  RobloxUniverseIdSchema,
  RobloxUniverseThumbnailsResponseSchema,
  RobloxUniverseThumbnailsSchema,
  RobloxUserAgeBracketSchema,
  RobloxUserBadgePageSchema,
  RobloxUserBadgeSchema,
  RobloxUserByNameSchema,
  RobloxUserCountryCodeSchema,
  RobloxUserDescriptionSchema,
  RobloxUserDetailSchema,
  RobloxUserDisplaynameSchema,
  RobloxUserGameVoteSchema,
  RobloxUserGenderSchema,
  RobloxUserGroupRoleV1Schema,
  RobloxUserGroupRoleV2Schema,
  RobloxUserGroupRolesV1ResponseSchema,
  RobloxUserGroupRolesV2ResponseSchema,
  RobloxUserIdSchema,
  RobloxUserNameSchema,
  RobloxUserPresenceSchema,
  RobloxUserPresencesResponseSchema,
  RobloxUserRolesSchema,
  RobloxUserSchema,
  RobloxUserSearchQuerySchema,
  RobloxUserSearchResponseSchema,
  RobloxUserSearchResultSchema,
  RobloxUsernameHistoryEntrySchema,
  RobloxUsernameHistoryQuerySchema,
  RobloxUsernameHistoryResponseSchema,
  RobloxUsersApi,
  RobloxUsersByNameRequestSchema,
  RobloxUsersByNameResponseSchema,
  RobloxUsersRequestSchema,
  RobloxUsersResponseSchema,
  RobloxValidateDisplayNameQuerySchema,
  RobloxValidateUserDisplayNameQuerySchema,
  VigorRoblox,
  findFetchFailed,
  isRobloxPartialError,
  robloxCacheKey,
  robloxDnrRules,
  toRobloxCreator,
  vigorRoblox
});
