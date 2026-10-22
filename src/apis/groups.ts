import z from "zod"
import { RobloxBatcher, captureHeaders, nullOn, type RobloxBatchRoute } from "@/core/batcher"
import type { RobloxCacheKey, RobloxCacheValue } from "@/core/cache"
import { resolveTtl, type RobloxConfig } from "@/core/config"
import { cached, chunk, createHttp, validate } from "@/core/http"
import { requireViewer } from "@/core/viewer"
import type { RobloxThumbnailsApi } from "@/apis/thumbnails"
import type { RobloxUsersApi } from "@/apis/users"
import { RobloxEmptyResponseSchema, type RobloxGroupId } from "@/types/common"
import {
    RobloxCreateGroupKeywordsResponseSchema,
    RobloxFriendsGroupsResponseSchema,
    RobloxGroupAuditLogPageSchema,
    RobloxGroupBanPageSchema,
    RobloxGroupBanSchema,
    RobloxGroupConfigurationMetadataSchema,
    RobloxGroupConfigurationSchema,
    RobloxGroupDetailPartialSchema,
    RobloxGroupDetailSchema,
    RobloxGroupEmoteSetsResponseSchema,
    RobloxGroupFeaturedEventSchema,
    RobloxGroupFeatureFreezesResponseSchema,
    RobloxGroupFeaturesSchema,
    RobloxGroupJoinRequestPageSchema,
    RobloxGroupJoinRequestSchema,
    RobloxGroupKeywordPageSchema,
    RobloxGroupKeywordSchema,
    RobloxGroupLookupResponseSchema,
    RobloxGroupMemberPageSchema,
    RobloxGroupMembershipSchema,
    RobloxGroupNameHistoryPageSchema,
    RobloxGroupPayoutRestrictionSchema,
    RobloxGroupPayoutsResponseSchema,
    RobloxGroupPoliciesResponseSchema,
    RobloxGroupRelationshipsSchema,
    RobloxGroupRoleDetailsResponseSchema,
    RobloxGroupRolePermissionsResponseSchema,
    RobloxGroupRolePermissionsSchema,
    RobloxGroupRoleSchema,
    RobloxGroupRolesResponseSchema,
    RobloxGroupSchema,
    RobloxGroupSearchMetadataSchema,
    RobloxGroupSearchPageSchema,
    RobloxGroupSettingsSchema,
    RobloxGroupShoutSchema,
    RobloxGroupSocialLinkSchema,
    RobloxGroupSocialLinksResponseSchema,
    RobloxGroupsMetadataSchema,
    RobloxGroupsResponseSchema,
    RobloxGroupTierEvaluationSchema,
    RobloxGroupUserPageSchema,
    RobloxPrimaryGroupResponseSchema,
    RobloxUserGroupRolesV1ResponseSchema,
    RobloxUserGroupRolesV2ResponseSchema,
    type RobloxCreateGroupRequest,
    type RobloxCreateGroupRoleRequest,
    type RobloxGroup,
    type RobloxGroupAuditLogQuery,
    type RobloxGroupBan,
    type RobloxGroupConfiguration,
    type RobloxGroupDetail,
    type RobloxGroupDetailPartial,
    type RobloxGroupEmoteSet,
    type RobloxGroupEventId,
    type RobloxGroupFeaturedEvent,
    type RobloxGroupFeatureFreeze,
    type RobloxGroupFeatures,
    type RobloxGroupJoinRequest,
    type RobloxGroupKeywordId,
    type RobloxGroupMembership,
    type RobloxGroupPageQuery,
    type RobloxGroupPayout,
    type RobloxGroupPayoutRecipient,
    type RobloxGroupPayoutRestriction,
    type RobloxGroupRecurringPayoutRecipient,
    type RobloxGroupRelationshipsQuery,
    type RobloxGroupRelationshipType,
    type RobloxGroupRole,
    type RobloxGroupRoleDetail,
    type RobloxGroupRoleId,
    type RobloxGroupRolePermissions,
    type RobloxGroupSearchQuery,
    type RobloxGroupSettings,
    type RobloxGroupSocialLink,
    type RobloxGroupSocialLinkId,
    type RobloxGroupSocialLinkRequest,
    type RobloxJoinGroupRequest,
    type RobloxPrimaryGroup,
    type RobloxUpdateGroupRoleRequest,
    type RobloxUpdateGroupSettingsRequest,
    type RobloxUserGroupRole,
    type RobloxUserGroups,
} from "@/types/groups"
import type { RobloxGroupIconOptions, RobloxWithThumbnail } from "@/types/thumbnails"
import type { RobloxUserId } from "@/types/users"

/** `.ttl({ groups: { ... } })`로 캐시할 수 있는 메서드. 배열을 받는 메서드는 항목 하나씩 캐시한다. */
export type RobloxGroupsCacheable = "getGroups" | "getGroupDetails" | "getRoles" | "getRolesByIds" | "getUserGroups"

const ORIGIN = "https://groups.roblox.com"

/** GET /v2/groups, /v1/roles 한 번에 보낼 수 있는 최대 개수 (101개부터 400 code 2) */
const MULTI_GET_LIMIT = 100
/** 묶음 수락/거절 한 번에 보내는 개수. 서버 한도는 확인하지 못했다 */
const MULTI_WRITE_LIMIT = 100

const found = <T>(list: (T | null)[]) => list.filter((x): x is T => x !== null)
const csv = (ids: readonly number[]) => ids.join(",")
const relationshipPath = (type: RobloxGroupRelationshipType) => type.toLowerCase()

type Query = Record<string, string | number | boolean>

/** 대상 하나씩 묻는 GET. 없는 대상(기본 400 — 그룹/유저가 없을 때 Roblox가 주는 상태)은 null */
function singleRoute<T, S extends z.ZodType, R>(opts: {
    bucket:   string
    path:     (t: T) => (string | number)[]
    query?:   (t: T) => Query
    schema:   S
    pick:     (res: z.output<S>, t: T) => R | null
    missing?: number[]
}): RobloxBatchRoute<T, R | null> {
    return {
        bucket: opts.bucket,
        limit:  1,
        group:  () => "",
        async send(http, [t], onHeaders) {
            const res = await nullOn(opts.missing ?? [400], onHeaders, () => http()
                .path(...opts.path(t))
                .query(opts.query?.(t) ?? {})
                .middlewares(captureHeaders(onHeaders))
                .middlewares(validate(opts.schema))
                .request())
            return [res === null ? null : opts.pick(res as z.output<S>, t)]
        },
    }
}

/** id 목록을 쿼리로 받는 GET. 서버는 없는 id를 빼고 준다 */
function listRoute<R>(opts: {
    bucket: string
    path:   string[]
    param:  string
    schema: z.ZodType<{ data: R[] }>
    idOf:   (item: R) => number
}): RobloxBatchRoute<number, R | null> {
    return {
        bucket: opts.bucket,
        limit:  MULTI_GET_LIMIT,
        group:  () => "",
        async send(http, ids, onHeaders) {
            const res = await http()
                .path(...opts.path)
                .query({ [opts.param]: csv(ids) })
                .middlewares(captureHeaders(onHeaders))
                .middlewares(validate(opts.schema))
                .request()
            const byId = new Map(res.data.map(item => [opts.idOf(item), item]))
            return ids.map(id => byId.get(id) ?? null)
        },
    }
}

/** 유저의 그룹 목록. v1은 그룹 상세까지, v2는 기본 정보만 준다 — 둘 다 같은 모양으로 줄인다 */
function userGroupsRoute(bucket: string, version: "v1" | "v2"): RobloxBatchRoute<RobloxUserId, RobloxUserGroupRole[] | null> {
    return singleRoute({
        bucket,
        path:   userId => [version, "users", userId, "groups", "roles"],
        schema: version === "v1" ? RobloxUserGroupRolesV1ResponseSchema : RobloxUserGroupRolesV2ResponseSchema,
        pick:   res => res.data.map(({ group, role }): RobloxUserGroupRole => ({
            group: { id: group.id, name: group.name, memberCount: group.memberCount, hasVerifiedBadge: group.hasVerifiedBadge },
            role:  { id: role.id, name: role.name, rank: role.rank },
        })),
    })
}

type GroupRoleTarget = { groupId: RobloxGroupId, roleId: RobloxGroupRoleId }
type GroupUserTarget = { groupId: RobloxGroupId, userId: RobloxUserId }

/** groups.roblox.com */
export class RobloxGroupsApi {
    private readonly http
    /** 요청 계정 → 내 id. 같은 계정이면 한 번만 묻는다 */
    private readonly me = new Map<string, Promise<RobloxUserId>>()

    private readonly groups
    private readonly details
    private readonly roles
    private readonly roleDetails
    private readonly userGroups
    private readonly primaryGroups
    private readonly guestPermissions
    private readonly rolePermissions
    private readonly userPermissions
    private readonly featureFreezes
    private readonly featuredEvents
    private readonly socialLinks
    private readonly emotes
    private readonly memberships
    private readonly policies
    private readonly settings
    private readonly configurations
    private readonly features
    private readonly featuresBlocked
    private readonly payouts
    private readonly payoutRestrictions
    private readonly joinRequests
    private readonly bans

    constructor(private readonly config: RobloxConfig, private readonly thumbnails: RobloxThumbnailsApi, private readonly users: RobloxUsersApi) {
        this.http = createHttp(config, ORIGIN)
        const batcher = <T, R>(...routes: RobloxBatchRoute<T, R>[]) => new RobloxBatcher<T, R>(config, ORIGIN, routes)
        const perGroup = <S extends z.ZodType, R>(path: string[], schema: S, pick: (res: z.output<S>, groupId: RobloxGroupId) => R | null, missing?: number[]) =>
            batcher(singleRoute<RobloxGroupId, S, R>({
                bucket: `groups GET /v1/groups/{groupId}/${path.join("/")}`,
                path:   groupId => ["v1", "groups", groupId, ...path],
                schema, pick, missing,
            }))

        // 한도는 2026-10 실측 (IP 단위)
        // GET /v2/groups — 1회/초, 100개씩
        this.groups = batcher(listRoute({
            bucket: "groups GET /v2/groups", path: ["v2", "groups"], param: "groupIds",
            schema: RobloxGroupsResponseSchema, idOf: g => g.id,
        }))
        // GET /v1/groups/{groupId} — 7회/분뿐이다
        this.details = batcher(singleRoute({
            bucket: "groups GET /v1/groups/{groupId}", path: (groupId: RobloxGroupId) => ["v1", "groups", groupId],
            schema: RobloxGroupDetailSchema, pick: res => res,
        }))
        // GET /v1/groups/{groupId}/roles — 800회/분
        this.roles = perGroup(["roles"], RobloxGroupRolesResponseSchema, res => res.roles)
        // GET /v1/roles — 60회/분, 100개씩
        this.roleDetails = batcher(listRoute({
            bucket: "groups GET /v1/roles", path: ["v1", "roles"], param: "ids",
            schema: RobloxGroupRoleDetailsResponseSchema, idOf: r => r.id,
        }))
        // 유저의 그룹 — v1(400회/분)과 v2(500회/분)는 한도가 따로다
        this.userGroups = batcher(
            userGroupsRoute("groups GET /v2/users/{userId}/groups/roles", "v2"),
            userGroupsRoute("groups GET /v1/users/{userId}/groups/roles", "v1"),
        )
        // GET /v1/users/{userId}/groups/primary/role — 1000회/분. 대표 그룹이 없으면 body가 null이다
        this.primaryGroups = batcher(singleRoute({
            bucket: "groups GET /v1/users/{userId}/groups/primary/role", path: (userId: RobloxUserId) => ["v1", "users", userId, "groups", "primary", "role"],
            schema: RobloxPrimaryGroupResponseSchema, pick: (res, userId): RobloxPrimaryGroup | null => res && { userId, ...res },
        }))
        // 30회/분
        this.guestPermissions = perGroup(["roles", "guest", "permissions"], RobloxGroupRolePermissionsSchema, res => res)
        // 역할 권한 — 역할 하나씩(200회/분)과 모든 역할 한 번에(200회/분)는 한도가 따로다.
        // 모든 역할은 주인만 볼 수 있어서, 거절되면 역할 하나씩으로 넘어간다.
        this.rolePermissions = batcher<GroupRoleTarget, RobloxGroupRolePermissions | null>(
            {
                bucket: "groups GET /v1/groups/{groupId}/roles/permissions",
                limit:  Infinity,
                group:  t => String(t.groupId),
                async send(http, targets, onHeaders) {
                    const res = await http()
                        .path("v1", "groups", targets[0].groupId, "roles", "permissions")
                        .middlewares(captureHeaders(onHeaders))
                        .middlewares(validate(RobloxGroupRolePermissionsResponseSchema))
                        .request()
                    const byId = new Map(res.data.map(p => [p.role.id, p]))
                    return targets.map(t => byId.get(t.roleId) ?? null)
                },
            },
            singleRoute({
                bucket: "groups GET /v1/groups/{groupId}/roles/{roleSetId}/permissions",
                path:   (t: GroupRoleTarget) => ["v1", "groups", t.groupId, "roles", t.roleId, "permissions"],
                schema: RobloxGroupRolePermissionsSchema, pick: res => res,
            }),
        )
        // 240회/분
        this.userPermissions = batcher(singleRoute({
            bucket: "groups GET /v1/groups/{groupId}/users/{userId}/permissions",
            path:   (t: GroupUserTarget) => ["v1", "groups", t.groupId, "users", t.userId, "permissions"],
            schema: RobloxGroupRolePermissionsSchema, pick: (res, t) => ({ userId: t.userId, ...res }), missing: [400, 404],
        }))
        // 100회/분
        this.featureFreezes = perGroup(["community-feature-freezes"], RobloxGroupFeatureFreezesResponseSchema, res => res.features)
        // GET /v1/featured-content/event — 600회/분. 없으면 body가 null이다
        this.featuredEvents = batcher(singleRoute({
            bucket: "groups GET /v1/featured-content/event", path: () => ["v1", "featured-content", "event"], query: (groupId: RobloxGroupId) => ({ groupId }),
            schema: RobloxGroupFeaturedEventSchema.nullable(), pick: res => res,
        }))
        // 인증 필요. 600회/분, 200회/분, 1800회/분
        this.socialLinks = perGroup(["social-links"], RobloxGroupSocialLinksResponseSchema, res => res.data, [400, 404])
        this.emotes = perGroup(["emotes"], RobloxGroupEmoteSetsResponseSchema, res => res.emoteSets)
        this.memberships = perGroup(["membership"], RobloxGroupMembershipSchema, res => res)
        // POST /v1/groups/policies — 120회/분. 한 번에 받는 개수는 확인하지 못했다
        this.policies = batcher<RobloxGroupId, boolean | null>({
            bucket: "groups POST /v1/groups/policies",
            limit:  MULTI_GET_LIMIT,
            group:  () => "",
            async send(http, groupIds, onHeaders) {
                const res = await http()
                    .path("v1", "groups", "policies")
                    .body("overwrite", { groupIds })
                    .middlewares(captureHeaders(onHeaders))
                    .middlewares(validate(RobloxGroupPoliciesResponseSchema))
                    .request()
                const byId = new Map(res.groups.map(p => [p.groupId, p.canViewGroup]))
                return groupIds.map(id => byId.get(id) ?? null)
            },
        })
        // 관리 권한 필요
        this.settings = perGroup(["settings"], RobloxGroupSettingsSchema, res => res)
        this.configurations = perGroup(["configuration"], RobloxGroupConfigurationSchema, res => res)
        this.features = perGroup(["features"], RobloxGroupFeaturesSchema, res => res)
        this.featuresBlocked = perGroup(["features", "status"], z.object({ hasFeaturesBlocked: z.boolean() }), res => res.hasFeaturesBlocked)
        this.payouts = perGroup(["payouts"], RobloxGroupPayoutsResponseSchema, res => res.data)
        this.payoutRestrictions = perGroup(["payout-restriction"], RobloxGroupPayoutRestrictionSchema, res => res)
        this.joinRequests = batcher(singleRoute({
            bucket: "groups GET /v1/groups/{groupId}/join-requests/users/{userId}",
            path:   (t: GroupUserTarget) => ["v1", "groups", t.groupId, "join-requests", "users", t.userId],
            // 요청이 없으면 body가 null이다
            schema: RobloxGroupJoinRequestSchema.nullable(), pick: res => res,
        }))
        this.bans = batcher(singleRoute({
            bucket: "groups GET /v1/groups/{groupId}/bans/{userId}",
            path:   (t: GroupUserTarget) => ["v1", "groups", t.groupId, "bans", t.userId],
            schema: RobloxGroupBanSchema, pick: res => res, missing: [400, 404],
        }))
    }

    private ttl(method: RobloxGroupsCacheable) {
        return resolveTtl(this.config, "groups", method)
    }

    /** 요청 계정의 id. 계정이 정해져 있지 않으면 에러 (requireViewer) */
    private async myId(): Promise<RobloxUserId> {
        const viewer = await requireViewer(this.config)
        let id = this.me.get(viewer)
        if (!id) {
            this.me.set(viewer, id = this.users.getAuthenticated().then(u => u.id))
            id.catch(() => this.me.delete(viewer))
        }
        return id
    }

    /** 항목 하나씩 캐시하며 batcher로 보낸다 */
    private each<R extends RobloxCacheValue<RobloxCacheKey>>(method: RobloxGroupsCacheable, ids: readonly number[], load: (id: number) => Promise<R | null>) {
        return Promise.all(ids.map(id => cached(this.config, ["groups", method, id] as RobloxCacheKey, this.ttl(method), () => load(id))))
    }

    /** 대상마다 batcher로 보내고 없는 대상은 뺀다 */
    private async many<T, R>(batcher: RobloxBatcher<T, R | null>, targets: readonly T[], key: (t: T) => string): Promise<R[]> {
        return found(await Promise.all(targets.map(t => batcher.load(key(t), t))))
    }

    /** 그룹들에 아이콘을 붙인다 */
    private async attach<G extends { id: RobloxGroupId }>(groups: Promise<G[]>, ids: readonly RobloxGroupId[], option: true | RobloxGroupIconOptions): Promise<RobloxWithThumbnail<G>[]> {
        const target = option === true ? {} : option
        const [list, icons] = await Promise.all([groups, this.thumbnails.get(ids.map(targetId => ({ ...target, type: "GroupIcon", targetId }) as const))])
        const byId = new Map(ids.map((id, i) => [id, icons[i]]))
        return list.map(g => ({ ...g, thumbnail: byId.get(g.id)! }))
    }

    // ── 공개 조회 ──────────────────────────────────────
    // 배열을 받는 메서드는 입력 순서로 돌려주고, 없는 대상은 뺀다.
    // 같은 틱에 들어온 호출은 모아서 보내므로 따로따로 불러도 된다.

    /**
     * GET /v2/groups — 이름, 설명, 주인 id, 만든 날짜. 100개씩 묶어서 보낸다 (1회/초).
     * 멤버 수와 주인 이름이 필요하면 `getGroupDetails`를 쓴다. `thumbnail`을 주면 그룹 아이콘을 같이 받는다.
     */
    getGroups(groupIds: readonly RobloxGroupId[], opts: { thumbnail: true | RobloxGroupIconOptions }): Promise<RobloxWithThumbnail<RobloxGroup>[]>
    getGroups(groupIds: readonly RobloxGroupId[], opts?: { thumbnail?: undefined }): Promise<RobloxGroup[]>
    getGroups(groupIds: readonly RobloxGroupId[], opts: { thumbnail?: true | RobloxGroupIconOptions } = {}): Promise<RobloxGroup[]> {
        const groups = this.each("getGroups", groupIds, id => this.groups.load(String(id), id)).then(list => found(list as (RobloxGroup | null)[]))
        return opts.thumbnail ? this.attach(groups, groupIds, opts.thumbnail) : groups
    }

    /**
     * GET /v1/groups/{groupId} — 멤버 수, 주인 이름, 샤우트, 가입 방식까지. 그룹 하나당 요청 하나이고 한도가 7회/분뿐이다.
     * `thumbnail`을 주면 그룹 아이콘을 같이 받는다.
     */
    getGroupDetails(groupIds: readonly RobloxGroupId[], opts: { thumbnail: true | RobloxGroupIconOptions }): Promise<RobloxWithThumbnail<RobloxGroupDetail>[]>
    getGroupDetails(groupIds: readonly RobloxGroupId[], opts?: { thumbnail?: undefined }): Promise<RobloxGroupDetail[]>
    getGroupDetails(groupIds: readonly RobloxGroupId[], opts: { thumbnail?: true | RobloxGroupIconOptions } = {}): Promise<RobloxGroupDetail[]> {
        const groups = this.each("getGroupDetails", groupIds, id => this.details.load(String(id), id as RobloxGroupId)).then(list => found(list as (RobloxGroupDetail | null)[]))
        return opts.thumbnail ? this.attach(groups, groupIds, opts.thumbnail) : groups
    }

    /** GET /v1/groups/{groupId}/roles — 그룹의 역할 목록 (멤버 수 포함, 낮은 rank부터) */
    async getRoles(groupIds: readonly RobloxGroupId[]): Promise<{ groupId: RobloxGroupId, roles: RobloxGroupRole[] }[]> {
        const lists = await this.each("getRoles", groupIds, id => this.roles.load(String(id), id as RobloxGroupId))
        return found(groupIds.map((groupId, i) => lists[i] ? { groupId, roles: lists[i] as RobloxGroupRole[] } : null))
    }

    /** GET /v1/roles — 역할 id로 역할과 그 역할의 그룹. 100개씩 묶어서 보낸다 (60회/분) */
    async getRolesByIds(roleIds: readonly RobloxGroupRoleId[]): Promise<RobloxGroupRoleDetail[]> {
        return found(await this.each("getRolesByIds", roleIds, id => this.roleDetails.load(String(id), id))) as RobloxGroupRoleDetail[]
    }

    /** 유저들이 속한 그룹과 역할. /v1과 /v2의 users/{userId}/groups/roles를 나눠 쓴다 */
    async getUserGroups(userIds: readonly RobloxUserId[]): Promise<RobloxUserGroups[]> {
        const lists = await this.each("getUserGroups", userIds, id => this.userGroups.load(String(id), id as RobloxUserId))
        return found(userIds.map((userId, i) => lists[i] ? { userId, groups: lists[i] as RobloxUserGroupRole[] } : null))
    }

    /** GET /v1/users/{userId}/groups/primary/role — 대표 그룹. 대표 그룹이 없는 유저는 뺀다 */
    getPrimaryGroups(userIds: readonly RobloxUserId[]): Promise<RobloxPrimaryGroup[]> {
        return this.many(this.primaryGroups, userIds, String)
    }

    /** GET /v1/groups/{groupId}/users — 멤버와 역할 */
    getMembers(groupId: RobloxGroupId, query: RobloxGroupPageQuery = {}) {
        return this.http()
            .path("v1", "groups", groupId, "users")
            .query(query)
            .middlewares(validate(RobloxGroupMemberPageSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/roles/{roleSetId}/users — 역할 하나의 멤버 */
    getRoleMembers(groupId: RobloxGroupId, roleId: RobloxGroupRoleId, query: RobloxGroupPageQuery = {}) {
        return this.http()
            .path("v1", "groups", groupId, "roles", roleId, "users")
            .query(query)
            .middlewares(validate(RobloxGroupUserPageSchema))
            .request()
    }

    /** GET /v1/groups/search — 키워드 검색. totalResults는 1000에서 멈춘다 */
    searchGroups(query: RobloxGroupSearchQuery) {
        return this.http()
            .path("v1", "groups", "search")
            .query(query)
            .middlewares(validate(RobloxGroupSearchPageSchema))
            .request()
    }

    /** GET /v1/groups/search/lookup — 이름으로 찾는다. 정확히 맞는 그룹이 있으면 맨 앞에 온다 */
    async lookupGroups(groupName: string) {
        const res = await this.http()
            .path("v1", "groups", "search", "lookup")
            .query({ groupName })
            .middlewares(validate(RobloxGroupLookupResponseSchema))
            .request()
        return res.data
    }

    /** GET /v1/groups/{groupId}/name-history */
    getNameHistory(groupId: RobloxGroupId, query: RobloxGroupPageQuery = {}) {
        return this.http()
            .path("v1", "groups", groupId, "name-history")
            .query(query)
            .middlewares(validate(RobloxGroupNameHistoryPageSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/relationships/{allies|enemies} — 동맹/적 그룹 */
    getRelationships(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, query: RobloxGroupRelationshipsQuery = {}) {
        return this.http()
            .path("v1", "groups", groupId, "relationships", relationshipPath(type))
            .query({ StartRowIndex: query.startRowIndex ?? 0, MaxRows: query.maxRows ?? 100 })
            .middlewares(validate(RobloxGroupRelationshipsSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/roles/guest/permissions — 멤버가 아닌 사람이 할 수 있는 것 (30회/분) */
    getGuestPermissions(groupIds: readonly RobloxGroupId[]): Promise<RobloxGroupRolePermissions[]> {
        return this.many(this.guestPermissions, groupIds, String)
    }

    /** GET /v1/groups/{groupId}/community-feature-freezes — 포럼 등 기능이 멈춰 있는지 */
    async getFeatureFreezes(groupIds: readonly RobloxGroupId[]): Promise<{ groupId: RobloxGroupId, features: RobloxGroupFeatureFreeze[] }[]> {
        const lists = await Promise.all(groupIds.map(id => this.featureFreezes.load(String(id), id)))
        return found(groupIds.map((groupId, i) => lists[i] ? { groupId, features: lists[i] } : null))
    }

    /** GET /v1/featured-content/event — 그룹이 내건 이벤트. 없는 그룹은 뺀다 */
    getFeaturedEvents(groupIds: readonly RobloxGroupId[]): Promise<RobloxGroupFeaturedEvent[]> {
        return this.many(this.featuredEvents, groupIds, String)
    }

    /** GET /v1/groups/metadata — 그룹 수 한도 등. 인증하면 요청 계정의 가입 수가 들어간다 */
    getMetadata() {
        return this.http()
            .path("v1", "groups", "metadata")
            .middlewares(validate(RobloxGroupsMetadataSchema))
            .request()
    }

    /** GET /v1/groups/configuration/metadata — 이름 길이, 생성/개명 비용 등 */
    getConfigurationMetadata() {
        return this.http()
            .path("v1", "groups", "configuration", "metadata")
            .middlewares(validate(RobloxGroupConfigurationMetadataSchema))
            .request()
    }

    /** GET /v1/groups/search/metadata — 추천 검색어 */
    getSearchMetadata() {
        return this.http()
            .path("v1", "groups", "search", "metadata")
            .middlewares(validate(RobloxGroupSearchMetadataSchema))
            .request()
    }

    // ── 요청 계정 기준 (인증 필요) ─────────────────────

    /** GET /v1/groups/{groupId}/membership — 내 역할, 권한, 가입 대기 여부, 알림 설정 */
    getMemberships(groupIds: readonly RobloxGroupId[]): Promise<RobloxGroupMembership[]> {
        return this.many(this.memberships, groupIds, String)
    }

    /** POST /v1/groups/policies — 내 계정으로 그룹을 볼 수 있는지 (지역 정책) */
    async getPolicies(groupIds: readonly RobloxGroupId[]): Promise<{ groupId: RobloxGroupId, canViewGroup: boolean }[]> {
        const list = await Promise.all(groupIds.map(id => this.policies.load(String(id), id)))
        return found(groupIds.map((groupId, i) => list[i] === null ? null : { groupId, canViewGroup: list[i] }))
    }

    /** GET /v1/groups/{groupId}/social-links */
    async getSocialLinks(groupIds: readonly RobloxGroupId[]): Promise<{ groupId: RobloxGroupId, links: RobloxGroupSocialLink[] }[]> {
        const lists = await Promise.all(groupIds.map(id => this.socialLinks.load(String(id), id)))
        return found(groupIds.map((groupId, i) => lists[i] ? { groupId, links: lists[i] } : null))
    }

    /** GET /v1/groups/{groupId}/emotes — 포럼 이모트 */
    async getEmotes(groupIds: readonly RobloxGroupId[]): Promise<{ groupId: RobloxGroupId, emoteSets: RobloxGroupEmoteSet[] }[]> {
        const lists = await Promise.all(groupIds.map(id => this.emotes.load(String(id), id)))
        return found(groupIds.map((groupId, i) => lists[i] ? { groupId, emoteSets: lists[i] } : null))
    }

    /** GET /v1/user/groups/pending — 가입을 요청해 둔 그룹 */
    async getPendingGroups(): Promise<RobloxGroupDetailPartial[]> {
        const res = await this.http()
            .path("v1", "user", "groups", "pending")
            .middlewares(validate(z.object({ data: z.array(RobloxGroupDetailPartialSchema) })))
            .request()
        return res.data
    }

    /** GET /v1/users/{me}/friends/groups/roles — 내 친구들이 속한 그룹. 다른 유저로는 403이다 */
    async getFriendsGroups() {
        const me = await this.myId()
        const res = await this.http()
            .path("v1", "users", me, "friends", "groups", "roles")
            .middlewares(validate(RobloxFriendsGroupsResponseSchema))
            .request()
        return res.data
    }

    /** POST /v1/groups/{groupId}/users — 가입한다. 승인제 그룹이면 가입 요청이 된다. 캡차를 요구할 수 있다 */
    async joinGroup(groupId: RobloxGroupId, request: RobloxJoinGroupRequest = {}): Promise<void> {
        await this.http()
            .path("v1", "groups", groupId, "users")
            .body("overwrite", request)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** DELETE /v1/groups/{groupId}/users/{me} — 탈퇴한다. 가입 요청 중이면 그 요청을 취소한다 */
    async leaveGroup(groupId: RobloxGroupId): Promise<void> {
        await this.removeMember(groupId, await this.myId())
    }

    /** POST /v1/user/groups/primary */
    async setPrimaryGroup(groupId: RobloxGroupId): Promise<void> {
        await this.http()
            .path("v1", "user", "groups", "primary")
            .body("overwrite", { groupId })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** DELETE /v1/user/groups/primary */
    async removePrimaryGroup(): Promise<void> {
        await this.http()
            .method("DELETE")
            .path("v1", "user", "groups", "primary")
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** PATCH /v1/groups/{groupId}/notification-preference — 알림 종류 하나를 켜고 끈다 */
    async setNotificationPreference(groupId: RobloxGroupId, request: { type: string | number, notificationsEnabled: boolean }): Promise<void> {
        await this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "notification-preference")
            .body("overwrite", request)
            .middlewares(validate(z.unknown()))
            .request()
    }

    /**
     * POST /v1/groups/create — 그룹을 만든다. 비용(Robux)은 `getConfigurationMetadata()`의 `groupConfiguration.cost`.
     * 아이콘과 함께 multipart로 보낸다.
     */
    createGroup(request: RobloxCreateGroupRequest) {
        const form = new FormData()
        form.append("name", request.name)
        if (request.description !== undefined) form.append("description", request.description)
        if (request.publicGroup !== undefined) form.append("publicGroup", String(request.publicGroup))
        if (request.buildersClubMembersOnly !== undefined) form.append("buildersClubMembersOnly", String(request.buildersClubMembersOnly))
        form.append("Files", request.icon)
        return this.http()
            .path("v1", "groups", "create")
            .body("overwrite", form)
            .middlewares(validate(RobloxGroupSchema.extend({ memberCount: z.number().nullish() })))
            .request()
    }

    // ── 관리 (그룹 권한 필요) ──────────────────────────
    // 권한이 없으면 403 FETCH_FAILED로 실패한다.

    /** 역할들의 권한. 주인이면 모든 역할을 한 번에(/roles/permissions), 아니면 역할 하나씩 받는다 */
    getRolePermissions(groupId: RobloxGroupId, roleIds: readonly RobloxGroupRoleId[]): Promise<RobloxGroupRolePermissions[]> {
        return this.many(this.rolePermissions, roleIds.map(roleId => ({ groupId, roleId })), t => `${t.groupId}:${t.roleId}`)
    }

    /** PATCH /v1/groups/{groupId}/roles/{roleSetId}/permissions — `{ "ViewWall": true }`처럼 권한 이름 → 값 */
    async updateRolePermissions(groupId: RobloxGroupId, roleId: RobloxGroupRoleId, permissions: Record<string, boolean>): Promise<void> {
        await this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "roles", roleId, "permissions")
            .body("overwrite", { permissions })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/users/{userId}/permissions — 주인과 권한 관리자만 볼 수 있다 */
    getUserPermissions(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<(RobloxGroupRolePermissions & { userId: RobloxUserId })[]> {
        return this.many(this.userPermissions, userIds.map(userId => ({ groupId, userId })), t => `${t.groupId}:${t.userId}`)
    }

    /** POST /v1/groups/{groupId}/rolesets/create */
    createRole(groupId: RobloxGroupId, request: RobloxCreateGroupRoleRequest) {
        return this.http()
            .path("v1", "groups", groupId, "rolesets", "create")
            .body("overwrite", request)
            .middlewares(validate(RobloxGroupRoleSchema))
            .request()
    }

    /** PATCH /v1/groups/{groupId}/rolesets/{rolesetId} */
    updateRole(groupId: RobloxGroupId, roleId: RobloxGroupRoleId, request: RobloxUpdateGroupRoleRequest) {
        return this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "rolesets", roleId)
            .body("overwrite", request)
            .middlewares(validate(RobloxGroupRoleSchema))
            .request()
    }

    /** DELETE /v1/groups/{groupId}/rolesets/{rolesetId} — 멤버가 있는 역할은 지울 수 없다 (409) */
    async deleteRole(groupId: RobloxGroupId, roleId: RobloxGroupRoleId): Promise<void> {
        await this.http()
            .method("DELETE")
            .path("v1", "groups", groupId, "rolesets", roleId)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** PATCH /v1/groups/{groupId}/users/{userId} — 멤버의 역할을 바꾼다 */
    async setMemberRole(groupId: RobloxGroupId, userId: RobloxUserId, roleId: RobloxGroupRoleId): Promise<void> {
        await this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "users", userId)
            .body("overwrite", { roleId })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** DELETE /v1/groups/{groupId}/users/{userId} — 멤버를 내보낸다 */
    async removeMember(groupId: RobloxGroupId, userId: RobloxUserId): Promise<void> {
        await this.http()
            .method("DELETE")
            .path("v1", "groups", groupId, "users", userId)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/join-requests — 가입 요청 목록 */
    getJoinRequests(groupId: RobloxGroupId, query: RobloxGroupPageQuery = {}) {
        return this.http()
            .path("v1", "groups", groupId, "join-requests")
            .query(query)
            .middlewares(validate(RobloxGroupJoinRequestPageSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/join-requests/users/{userId} — 이 유저들의 가입 요청. 요청이 없는 유저는 뺀다 */
    async getJoinRequestsByUsers(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<RobloxGroupJoinRequest[]> {
        return this.many(this.joinRequests, userIds.map(userId => ({ groupId, userId })), t => `${t.groupId}:${t.userId}`)
    }

    /** 가입 요청을 받아들인다. 한 명이면 /users/{userId}, 여러 명이면 묶음 엔드포인트로 보낸다 */
    async acceptJoinRequests(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<void> {
        await this.batchWrite(userIds,
            userId => this.http().path("v1", "groups", groupId, "join-requests", "users", userId).body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request(),
            UserIds => this.http().path("v1", "groups", groupId, "join-requests").body("overwrite", { UserIds }).middlewares(validate(RobloxEmptyResponseSchema)).request())
    }

    /** 가입 요청을 거절한다. 한 명이면 /users/{userId}, 여러 명이면 묶음 엔드포인트로 보낸다 */
    async declineJoinRequests(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<void> {
        await this.batchWrite(userIds,
            userId => this.http().method("DELETE").path("v1", "groups", groupId, "join-requests", "users", userId).middlewares(validate(RobloxEmptyResponseSchema)).request(),
            UserIds => this.http().method("DELETE").path("v1", "groups", groupId, "join-requests").body("overwrite", { UserIds }).middlewares(validate(RobloxEmptyResponseSchema)).request())
    }

    /** 하나면 single, 여럿이면 묶음 엔드포인트로 나눠 보낸다 */
    private async batchWrite<I>(ids: readonly I[], single: (id: I) => Promise<unknown>, multi: (ids: I[]) => Promise<unknown>) {
        if (!ids.length) return
        await Promise.all(ids.length === 1 ? [single(ids[0])] : chunk(ids, MULTI_WRITE_LIMIT).map(multi))
    }

    /** GET /v1/groups/{groupId}/bans */
    getBans(groupId: RobloxGroupId, query: RobloxGroupPageQuery = {}) {
        return this.http()
            .path("v1", "groups", groupId, "bans")
            .query(query)
            .middlewares(validate(RobloxGroupBanPageSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/bans/{userId} — 이 유저들의 차단 정보. 차단되지 않은 유저는 뺀다 */
    getBannedUsers(groupId: RobloxGroupId, userIds: readonly RobloxUserId[]): Promise<RobloxGroupBan[]> {
        return this.many(this.bans, userIds.map(userId => ({ groupId, userId })), t => `${t.groupId}:${t.userId}`)
    }

    /** POST /v1/groups/{groupId}/bans/{userId} */
    banUser(groupId: RobloxGroupId, userId: RobloxUserId) {
        return this.http()
            .path("v1", "groups", groupId, "bans", userId)
            .body("overwrite", {})
            .middlewares(validate(RobloxGroupBanSchema))
            .request()
    }

    /** DELETE /v1/groups/{groupId}/bans/{userId} */
    async unbanUser(groupId: RobloxGroupId, userId: RobloxUserId): Promise<void> {
        await this.http()
            .method("DELETE")
            .path("v1", "groups", groupId, "bans", userId)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/audit-log */
    getAuditLog(groupId: RobloxGroupId, query: RobloxGroupAuditLogQuery = {}) {
        return this.http()
            .path("v1", "groups", groupId, "audit-log")
            .query(query)
            .middlewares(validate(RobloxGroupAuditLogPageSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/settings */
    async getSettings(groupIds: readonly RobloxGroupId[]): Promise<(RobloxGroupSettings & { groupId: RobloxGroupId })[]> {
        const list = await Promise.all(groupIds.map(id => this.settings.load(String(id), id)))
        return found(groupIds.map((groupId, i) => list[i] && { groupId, ...list[i] }))
    }

    /** PATCH /v1/groups/{groupId}/settings — 넣은 항목만 바꾼다 */
    async updateSettings(groupId: RobloxGroupId, request: RobloxUpdateGroupSettingsRequest): Promise<void> {
        await this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "settings")
            .body("overwrite", request)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/configuration — 엠블럼/커버 사진 asset id */
    getConfigurations(groupIds: readonly RobloxGroupId[]): Promise<RobloxGroupConfiguration[]> {
        return this.many(this.configurations, groupIds, String)
    }

    /** GET /v1/groups/{groupId}/features — 기능별 차단 상태와 잠금 여부 */
    async getFeatures(groupIds: readonly RobloxGroupId[]): Promise<(RobloxGroupFeatures & { groupId: RobloxGroupId })[]> {
        const list = await Promise.all(groupIds.map(id => this.features.load(String(id), id)))
        return found(groupIds.map((groupId, i) => list[i] && { groupId, ...list[i] }))
    }

    /** GET /v1/groups/{groupId}/features/status — 막힌 기능이 하나라도 있는지 */
    async getFeaturesBlocked(groupIds: readonly RobloxGroupId[]): Promise<{ groupId: RobloxGroupId, hasFeaturesBlocked: boolean }[]> {
        const list = await Promise.all(groupIds.map(id => this.featuresBlocked.load(String(id), id)))
        return found(groupIds.map((groupId, i) => list[i] === null ? null : { groupId, hasFeaturesBlocked: list[i] }))
    }

    /** PATCH /v1/groups/{groupId}/features — 지금은 걸려 있는 차단을 푸는 것만 된다. 바뀌었으면 true */
    async updateFeatures(groupId: RobloxGroupId, features: Record<string, boolean>): Promise<boolean> {
        const res = await this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "features")
            .body("overwrite", { Features: features })
            .middlewares(validate(z.object({ Updated: z.boolean() })))
            .request()
        return res.Updated
    }

    /** PATCH /v1/groups/{groupId}/name — 비용과 대기 기간은 `getConfigurationMetadata()`의 groupNameChangeConfiguration */
    async setName(groupId: RobloxGroupId, name: string): Promise<string> {
        const res = await this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "name")
            .body("overwrite", { name })
            .middlewares(validate(z.object({ newName: z.string() })))
            .request()
        return res.newName
    }

    /** PATCH /v1/groups/{groupId}/description — 필터링된 뒤의 설명을 돌려준다 */
    async setDescription(groupId: RobloxGroupId, description: string): Promise<string> {
        const res = await this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "description")
            .body("overwrite", { description })
            .middlewares(validate(z.object({ newDescription: z.string() })))
            .request()
        return res.newDescription
    }

    /** PATCH /v1/groups/{groupId}/status — 샤우트. 빈 문자열이면 지운다 */
    setShout(groupId: RobloxGroupId, message: string) {
        return this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "status")
            .body("overwrite", { message })
            .middlewares(validate(RobloxGroupShoutSchema.nullable()))
            .request()
    }

    /** PATCH /v1/groups/icon — 아이콘을 multipart로 올린다 */
    async setIcon(groupId: RobloxGroupId, icon: Blob): Promise<void> {
        const form = new FormData()
        form.append("Files", icon)
        await this.http()
            .method("PATCH")
            .path("v1", "groups", "icon")
            .query({ groupId })
            .body("overwrite", form)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** POST /v1/groups/{groupId}/social-links */
    createSocialLink(groupId: RobloxGroupId, request: RobloxGroupSocialLinkRequest) {
        return this.http()
            .path("v1", "groups", groupId, "social-links")
            .body("overwrite", request)
            .middlewares(validate(RobloxGroupSocialLinkSchema))
            .request()
    }

    /** PATCH /v1/groups/{groupId}/social-links/{socialLinkId} */
    async updateSocialLink(groupId: RobloxGroupId, socialLinkId: RobloxGroupSocialLinkId, request: RobloxGroupSocialLinkRequest): Promise<void> {
        await this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "social-links", socialLinkId)
            .body("overwrite", request)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** DELETE /v1/groups/{groupId}/social-links/{socialLinkId} */
    async deleteSocialLink(groupId: RobloxGroupId, socialLinkId: RobloxGroupSocialLinkId): Promise<void> {
        await this.http()
            .method("DELETE")
            .path("v1", "groups", groupId, "social-links", socialLinkId)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/blocked-keywords — 포럼 차단 키워드 */
    getKeywords(groupId: RobloxGroupId, query: RobloxGroupPageQuery = {}) {
        return this.http()
            .path("v1", "groups", groupId, "blocked-keywords")
            .query(query)
            .middlewares(validate(RobloxGroupKeywordPageSchema))
            .request()
    }

    /** POST /v1/groups/{groupId}/blocked-keywords — 스펙은 keywords를 문자열 하나로 받는다 */
    createKeywords(groupId: RobloxGroupId, request: { keywords: string, isPrivate?: boolean }) {
        return this.http()
            .path("v1", "groups", groupId, "blocked-keywords")
            .body("overwrite", request)
            .middlewares(validate(RobloxCreateGroupKeywordsResponseSchema))
            .request()
    }

    /** PATCH /v1/groups/{groupId}/blocked-keywords/{keywordId} */
    updateKeyword(groupId: RobloxGroupId, keywordId: RobloxGroupKeywordId, request: { keyword?: string, isPrivate?: boolean }) {
        return this.http()
            .method("PATCH")
            .path("v1", "groups", groupId, "blocked-keywords", keywordId)
            .body("overwrite", request)
            .middlewares(validate(RobloxGroupKeywordSchema))
            .request()
    }

    /** DELETE /v1/groups/{groupId}/blocked-keywords/{keywordId} */
    async deleteKeyword(groupId: RobloxGroupId, keywordId: RobloxGroupKeywordId): Promise<void> {
        await this.http()
            .method("DELETE")
            .path("v1", "groups", groupId, "blocked-keywords", keywordId)
            .middlewares(validate(z.unknown()))
            .request()
    }

    /** POST /v1/featured-content/event — 그룹에 이벤트를 내건다 */
    setFeaturedEvent(groupId: RobloxGroupId, eventId: RobloxGroupEventId) {
        return this.http()
            .path("v1", "featured-content", "event")
            .query({ groupId, eventId })
            .body("overwrite", {})
            .middlewares(validate(RobloxGroupFeaturedEventSchema))
            .request()
    }

    /** DELETE /v1/featured-content/event */
    async removeFeaturedEvent(groupId: RobloxGroupId, eventId: RobloxGroupEventId): Promise<void> {
        await this.http()
            .method("DELETE")
            .path("v1", "featured-content", "event")
            .query({ groupId, eventId })
            .middlewares(validate(z.unknown()))
            .request()
    }

    /** GET /v1/groups/{groupId}/relationships/{type}/requests — 받은 동맹 요청 */
    getRelationshipRequests(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, query: RobloxGroupRelationshipsQuery = {}) {
        return this.http()
            .path("v1", "groups", groupId, "relationships", relationshipPath(type), "requests")
            .query({ StartRowIndex: query.startRowIndex ?? 0, MaxRows: query.maxRows ?? 100 })
            .middlewares(validate(RobloxGroupRelationshipsSchema))
            .request()
    }

    /** 받은 동맹 요청을 받아들인다. 하나면 /requests/{relatedGroupId}, 여러 개면 묶음 엔드포인트로 보낸다 */
    async acceptRelationshipRequests(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, relatedGroupIds: readonly RobloxGroupId[]): Promise<void> {
        const base = ["v1", "groups", groupId, "relationships", relationshipPath(type), "requests"] as const
        await this.batchWrite(relatedGroupIds,
            id => this.http().path(...base, id).body("overwrite", {}).middlewares(validate(RobloxEmptyResponseSchema)).request(),
            GroupIds => this.http().path(...base).body("overwrite", { GroupIds }).middlewares(validate(RobloxEmptyResponseSchema)).request())
    }

    /** 받은 동맹 요청을 거절한다 */
    async declineRelationshipRequests(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, relatedGroupIds: readonly RobloxGroupId[]): Promise<void> {
        const base = ["v1", "groups", groupId, "relationships", relationshipPath(type), "requests"] as const
        await this.batchWrite(relatedGroupIds,
            id => this.http().method("DELETE").path(...base, id).middlewares(validate(RobloxEmptyResponseSchema)).request(),
            GroupIds => this.http().method("DELETE").path(...base).body("overwrite", { GroupIds }).middlewares(validate(RobloxEmptyResponseSchema)).request())
    }

    /** POST /v1/groups/{groupId}/relationships/{type}/{relatedGroupId} — 동맹 요청을 보내거나 적으로 정한다 */
    async createRelationship(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, relatedGroupId: RobloxGroupId): Promise<void> {
        await this.http()
            .path("v1", "groups", groupId, "relationships", relationshipPath(type), relatedGroupId)
            .body("overwrite", {})
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** DELETE /v1/groups/{groupId}/relationships/{type}/{relatedGroupId} */
    async deleteRelationship(groupId: RobloxGroupId, type: RobloxGroupRelationshipType, relatedGroupId: RobloxGroupId): Promise<void> {
        await this.http()
            .method("DELETE")
            .path("v1", "groups", groupId, "relationships", relationshipPath(type), relatedGroupId)
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** GET /v1/groups/{groupId}/payouts — 정기 지급 대상과 비율 */
    async getPayouts(groupIds: readonly RobloxGroupId[]): Promise<{ groupId: RobloxGroupId, payouts: RobloxGroupPayout[] }[]> {
        const lists = await Promise.all(groupIds.map(id => this.payouts.load(String(id), id)))
        return found(groupIds.map((groupId, i) => lists[i] ? { groupId, payouts: lists[i] } : null))
    }

    /** GET /v1/groups/{groupId}/payout-restriction — 지급 기능을 쓸 수 있는지 */
    async getPayoutRestrictions(groupIds: readonly RobloxGroupId[]): Promise<(RobloxGroupPayoutRestriction & { groupId: RobloxGroupId })[]> {
        const list = await Promise.all(groupIds.map(id => this.payoutRestrictions.load(String(id), id)))
        return found(groupIds.map((groupId, i) => list[i] && { groupId, ...list[i] }))
    }

    /**
     * POST /v1/groups/{groupId}/payouts — 그룹 자금에서 Robux를 지급한다. 다시 보내도 두 번 나가지 않게
     * `idempotencyKey`를 붙인다 (주지 않으면 만들어 넣는다 — 재시도도 같은 키로 나간다). 처리됐으면 status 0이 아닌 값이 올 수 있다.
     */
    async payout(groupId: RobloxGroupId, recipients: readonly RobloxGroupPayoutRecipient[], opts: { idempotencyKey?: string } = {}): Promise<number> {
        const res = await this.http()
            .path("v1", "groups", groupId, "payouts")
            .body("overwrite", {
                PayoutType:     1,
                Recipients:     recipients.map(r => ({ recipientId: r.userId, recipientType: 0, amount: r.amount })),
                IdempotencyKey: opts.idempotencyKey ?? crypto.randomUUID(),
            })
            .middlewares(validate(z.object({ status: z.union([z.number(), z.string()]) })))
            .request()
        return Number(res.status)
    }

    /** POST /v1/groups/{groupId}/payouts/recurring — 정기 지급 비율을 통째로 바꾼다 */
    async setRecurringPayouts(groupId: RobloxGroupId, recipients: readonly RobloxGroupRecurringPayoutRecipient[]): Promise<void> {
        await this.http()
            .path("v1", "groups", groupId, "payouts", "recurring")
            .body("overwrite", {
                PayoutType: 2,
                Recipients: recipients.map(r => ({ recipientId: r.userId, recipientType: 0, amount: r.percentage })),
            })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** POST /v1/groups/{groupId}/change-owner — 주인을 넘긴다 (멤버여야 한다) */
    async changeOwner(groupId: RobloxGroupId, userId: RobloxUserId): Promise<void> {
        await this.http()
            .path("v1", "groups", groupId, "change-owner")
            .body("overwrite", { userId })
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** POST /v1/groups/{groupId}/claim-ownership — 주인이 없는 그룹을 가져온다 */
    async claimOwnership(groupId: RobloxGroupId): Promise<void> {
        await this.http()
            .path("v1", "groups", groupId, "claim-ownership")
            .body("overwrite", {})
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }

    /** POST /v1/groups/{groupId}/community-tier/evaluate — 커뮤니티 등급을 다시 계산한다 */
    evaluateCommunityTier(groupId: RobloxGroupId) {
        return this.http()
            .path("v1", "groups", groupId, "community-tier", "evaluate")
            .body("overwrite", {})
            .middlewares(validate(RobloxGroupTierEvaluationSchema))
            .request()
    }

    /** POST /v1/groups/{groupId}/deactivate — 주인만 할 수 있다 */
    async deactivateGroup(groupId: RobloxGroupId): Promise<void> {
        await this.http()
            .path("v1", "groups", groupId, "deactivate")
            .body("overwrite", {})
            .middlewares(validate(RobloxEmptyResponseSchema))
            .request()
    }
}
