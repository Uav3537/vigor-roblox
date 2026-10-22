import z from "zod";
import {
    RobloxArrayResponseSchema,
    RobloxAssetIdSchema,
    RobloxGroupIdSchema,
    RobloxPageResponseSchema,
    type RobloxCursor,
    type RobloxPageLimit,
    type RobloxSortOrder,
} from "./common";
import { RobloxUserIdSchema, type RobloxUserId } from "./users";
import type { RobloxCaptchaTokenRequest } from "./friends";
import { RobloxCreatorSchema } from "./creator";

// groups.roblox.com 스펙은 /docs/json/v1이 docsiteassets로 넘겨준다. 실제 응답과 다른 곳은 실측(2026-10)을 따랐다.
// - enum으로 적힌 값(relationshipType, notificationPreferences.type 등)은 숫자가 아니라 문자열로 온다.
// - 역할의 description/memberCount/isBase/isPrivate는 엔드포인트에 따라 빠진다.
// - v2의 그룹 목록에는 memberCount가 없다. /v2/groups/{id}/experiences와 /v2/.../relationships는 404다.
// - shout는 지금 모든 그룹에서 null로 온다.

/** 그룹 역할(roleset) ID. 2^31을 넘는 값도 있다 */
export const RobloxGroupRoleIdSchema = z.number().int().min(1).brand("RobloxGroupRoleId")
/** 그룹 소셜 링크 ID */
export const RobloxGroupSocialLinkIdSchema = z.number().int().min(1).brand("RobloxGroupSocialLinkId")
/** 그룹 차단 키워드 ID (UUID) */
export const RobloxGroupKeywordIdSchema = z.string().min(1).brand("RobloxGroupKeywordId")
/** 그룹 이벤트 ID (featured-content) */
export const RobloxGroupEventIdSchema = z.string().min(1).brand("RobloxGroupEventId")

export type RobloxGroupRoleId = z.infer<typeof RobloxGroupRoleIdSchema>
export type RobloxGroupSocialLinkId = z.infer<typeof RobloxGroupSocialLinkIdSchema>
export type RobloxGroupKeywordId = z.infer<typeof RobloxGroupKeywordIdSchema>
export type RobloxGroupEventId = z.infer<typeof RobloxGroupEventIdSchema>

export type RobloxGroupRelationshipType = "Allies" | "Enemies"


// ── 공통 ───────────────────────────────────────────────

/** `UserModel` */
export const RobloxGroupUserSchema = z.object({
    userId:           RobloxUserIdSchema,
    username:         z.string(),
    displayName:      z.string(),
    hasVerifiedBadge: z.boolean(),
})

/** `GroupRoleResponse` — 역할. 엔드포인트에 따라 빠지는 필드가 있다 */
export const RobloxGroupRoleSchema = z.object({
    id:          RobloxGroupRoleIdSchema,
    name:        z.string(),
    rank:        z.number(),
    description: z.string().nullish(),
    /** 역할 목록(/groups/{id}/roles)에만 있다 */
    memberCount: z.number().nullish(),
    /** 기본(가입하면 받는) 역할이면 true. 아니면 빠진다 */
    isBase:      z.boolean().nullish(),
    color:       z.number().nullish(),
    isPrivate:   z.boolean().nullish(),
})

/** `UserGroupRoleResponse` — 유저와 그 유저의 역할 */
export const RobloxGroupMemberSchema = z.object({
    user: RobloxGroupUserSchema,
    role: RobloxGroupRoleSchema,
})

/** `ShoutResponse` */
export const RobloxGroupShoutSchema = z.object({
    body:    z.string(),
    poster:  RobloxGroupUserSchema.nullable(),
    created: z.string(),
    updated: z.string(),
})

/** `CommunityTierInfoResponse` */
export const RobloxCommunityTierSchema = z.object({
    groupId:           RobloxGroupIdSchema,
    currentTier:       z.number().nullable(),
    previousTier:      z.number().nullable(),
    tierUpdatedTime:   z.string().nullable(),
    lastEvaluatedTime: z.string().nullable(),
    requirements:      z.array(z.object({ key: z.number(), satisfied: z.boolean() })).nullish(),
    capabilities:      z.object({ isEligibleForUnrestrictedMessages: z.boolean() }).nullish(),
})

const GroupDetailBaseSchema = z.object({
    id:                 RobloxGroupIdSchema,
    name:               z.string(),
    description:        z.string(),
    /** 주인이 없는 그룹은 null */
    owner:              RobloxGroupUserSchema.nullable(),
    shout:              RobloxGroupShoutSchema.nullable(),
    isBuildersClubOnly: z.boolean(),
    publicEntryAllowed: z.boolean(),
    isLocked:           z.boolean().nullish(),
    isDeactivated:      z.boolean().nullish(),
    hasVerifiedBadge:   z.boolean(),
    hasSocialModules:   z.boolean().nullish(),
    communityTier:      RobloxCommunityTierSchema.nullish(),
})

/** `GroupDetailResponse` — GET /v1/groups/{groupId} */
export const RobloxGroupDetailSchema = GroupDetailBaseSchema.extend({
    memberCount: z.number(),
})

/** 다른 응답 안에 들어 있는 `GroupDetailResponse`. 대표 그룹 등에서는 memberCount가 빠진다 */
export const RobloxGroupDetailPartialSchema = GroupDetailBaseSchema.extend({
    memberCount: z.number().nullish(),
})

/** `GroupResponseV2` — GET /v2/groups 의 항목 */
export const RobloxGroupSchema = z.object({
    id:               RobloxGroupIdSchema,
    name:             z.string(),
    description:      z.string(),
    /** 소유자가 없으면 null. 지금은 늘 유저지만 응답이 type을 주므로 다른 제작자 참조와 같은 모양으로 받는다 */
    owner:            RobloxCreatorSchema().nullable(),
    created:          z.string(),
    hasVerifiedBadge: z.boolean(),
})

export const RobloxGroupsResponseSchema = RobloxArrayResponseSchema(RobloxGroupSchema)

/** `GroupBasicResponse` */
export const RobloxGroupBasicSchema = z.object({
    id:               RobloxGroupIdSchema,
    name:             z.string(),
    memberCount:      z.number(),
    hasVerifiedBadge: z.boolean(),
})

/** `GroupAllRolesResponse` — GET /v1/groups/{groupId}/roles */
export const RobloxGroupRolesResponseSchema = z.object({
    groupId: RobloxGroupIdSchema,
    roles:   z.array(RobloxGroupRoleSchema),
})

/** `GroupRoleDetailResponse` — GET /v1/roles 의 항목 */
export const RobloxGroupRoleDetailSchema = RobloxGroupRoleSchema.extend({
    groupId: RobloxGroupIdSchema,
})

export const RobloxGroupRoleDetailsResponseSchema = RobloxArrayResponseSchema(RobloxGroupRoleDetailSchema)


// ── 유저의 그룹 ────────────────────────────────────────

/** GET /v1/users/{userId}/groups/roles 의 항목 */
export const RobloxUserGroupRoleV1Schema = z.object({
    group: RobloxGroupDetailSchema,
    role:  RobloxGroupRoleSchema,
})

/** GET /v2/users/{userId}/groups/roles 의 항목 (`GroupMembershipResponse`) */
export const RobloxUserGroupRoleV2Schema = z.object({
    group: RobloxGroupBasicSchema,
    role:  z.object({ id: RobloxGroupRoleIdSchema, name: z.string(), rank: z.number() }),
})

export const RobloxUserGroupRolesV1ResponseSchema = RobloxArrayResponseSchema(RobloxUserGroupRoleV1Schema)
export const RobloxUserGroupRolesV2ResponseSchema = RobloxArrayResponseSchema(RobloxUserGroupRoleV2Schema)

/** GET /v1/users/{userId}/groups/primary/role — 대표 그룹이 없으면 null */
export const RobloxPrimaryGroupResponseSchema = z.object({
    group: RobloxGroupDetailPartialSchema,
    role:  RobloxGroupRoleSchema,
}).nullable()

/** `GroupMembershipDetailResponse` */
export const RobloxGroupMembershipDetailSchema = z.object({
    group:          RobloxGroupDetailPartialSchema,
    role:           RobloxGroupRoleSchema,
    isPrimaryGroup: z.boolean().nullish(),
})

/** GET /v1/users/{userId}/friends/groups/roles — 친구마다 속한 그룹 */
export const RobloxFriendsGroupsResponseSchema = RobloxArrayResponseSchema(z.object({
    user:   RobloxGroupUserSchema,
    groups: z.array(RobloxGroupMembershipDetailSchema),
}))


// ── 목록 / 검색 ────────────────────────────────────────

export const RobloxGroupMemberPageSchema = RobloxPageResponseSchema(RobloxGroupMemberSchema)
export const RobloxGroupUserPageSchema = RobloxPageResponseSchema(RobloxGroupUserSchema)

/** `GroupSearchResponseItem` */
export const RobloxGroupSearchItemSchema = z.object({
    id:                 RobloxGroupIdSchema,
    name:               z.string(),
    description:        z.string(),
    memberCount:        z.number(),
    previousName:       z.string().nullish(),
    publicEntryAllowed: z.boolean(),
    created:            z.string(),
    updated:            z.string(),
    hasVerifiedBadge:   z.boolean(),
})

/** `GroupSearchPageResponse` — totalResults는 1000에서 멈춘다 */
export const RobloxGroupSearchPageSchema = RobloxPageResponseSchema(RobloxGroupSearchItemSchema).extend({
    keyword:      z.string(),
    totalResults: z.number(),
})

export const RobloxGroupLookupResponseSchema = RobloxArrayResponseSchema(RobloxGroupBasicSchema)

export const RobloxGroupNameHistoryPageSchema = RobloxPageResponseSchema(z.object({
    name:    z.string(),
    created: z.string(),
}))

/** `GroupRelationshipsResponse` — StartRowIndex/MaxRows로 넘긴다 */
export const RobloxGroupRelationshipsSchema = z.object({
    groupId:          RobloxGroupIdSchema,
    /** "Allies" | "Enemies" */
    relationshipType: z.string(),
    totalGroupCount:  z.number(),
    relatedGroups:    z.array(RobloxGroupDetailPartialSchema),
    /** 마지막 페이지면 null */
    nextRowIndex:     z.number().nullable(),
})


// ── 권한 ───────────────────────────────────────────────

/** 알려진 권한 이름을 갖되, 서버가 빼거나 새로 넣어도 깨지지 않게 받는다 */
const flags = <const K extends readonly string[]>(...keys: K) =>
    z.object(Object.fromEntries(keys.map(k => [k, z.boolean().nullish()])) as { [P in K[number]]: z.ZodOptional<z.ZodNullable<z.ZodBoolean>> })

/** `GroupPermissionsModel` */
export const RobloxGroupPermissionsSchema = z.object({
    groupPostsPermissions:             flags("viewStatus", "postToStatus").nullish(),
    groupForumsPermissions:            flags("viewForums", "manageCategories", "createPosts", "removePosts", "lockPosts", "pinPosts", "createComments", "removeComments", "createBugReports").nullish(),
    groupContentModerationPermissions: flags("manageKeywordBlockList", "viewKeywordBlockList").nullish(),
    groupMembershipPermissions:        flags("changeRank", "inviteMembers", "removeMembers", "banMembers").nullish(),
    groupManagementPermissions:        flags("manageRelationships", "manageClan", "viewAuditLogs", "bypassSlowmode", "viewCommunityAnalytics").nullish(),
    groupEconomyPermissions:           flags("spendGroupFunds", "advertiseGroup", "createItems", "manageItems", "addGroupPlaces", "manageGroupGames", "viewGroupPayouts", "viewAnalytics").nullish(),
    groupOpenCloudPermissions:         flags("useCloudAuthentication", "administerCloudAuthentication").nullish(),
})

/** `GroupPermissionsResponse` — 역할 하나의 권한 */
export const RobloxGroupRolePermissionsSchema = z.object({
    groupId:     RobloxGroupIdSchema,
    role:        RobloxGroupRoleSchema,
    permissions: RobloxGroupPermissionsSchema,
})

export const RobloxGroupRolePermissionsResponseSchema = RobloxArrayResponseSchema(RobloxGroupRolePermissionsSchema)

/** `GroupNotificationPreferenceData` — type은 "AnnouncementCreatedNotification" 같은 문자열 */
export const RobloxGroupNotificationPreferenceSchema = z.object({
    type:        z.union([z.string(), z.number()]),
    enabled:     z.boolean(),
    name:        z.string(),
    description: z.string(),
})

/** `GroupMembershipMetadataResponse` — 요청 계정 기준의 그룹 관계와 권한 */
export const RobloxGroupMembershipSchema = z.object({
    groupId:                 RobloxGroupIdSchema,
    isPrimary:               z.boolean(),
    isPendingJoin:           z.boolean(),
    userRole:                RobloxGroupMemberSchema.nullable(),
    permissions:             RobloxGroupPermissionsSchema,
    channelPermissions:      z.array(z.object({ channelId: z.string() }).loose()).nullish(),
    areGroupGamesVisible:    z.boolean(),
    areGroupFundsVisible:    z.boolean(),
    areEnemiesAllowed:       z.boolean(),
    canConfigure:            z.boolean(),
    isNotificationsEnabled:  z.boolean().nullish(),
    notificationPreferences: z.array(RobloxGroupNotificationPreferenceSchema).nullish(),
    isBannedFromGroup:       z.boolean().nullish(),
    canViewMemberList:       z.boolean().nullish(),
    isOwner:                 z.boolean().nullish(),
})

/** `GroupPoliciesResponse` */
export const RobloxGroupPoliciesResponseSchema = z.object({
    groups: z.array(z.object({ groupId: RobloxGroupIdSchema, canViewGroup: z.boolean() })),
})


// ── 그룹 정보 (기타) ────────────────────────────────────

/** `GetSocialLinkResponse` */
export const RobloxGroupSocialLinkSchema = z.object({
    id:    RobloxGroupSocialLinkIdSchema,
    /** "Discord" 같은 문자열 (스펙은 0~8) */
    type:  z.union([z.string(), z.number()]),
    url:   z.string(),
    title: z.string(),
})

export const RobloxGroupSocialLinksResponseSchema = z.object({
    data:                          z.array(RobloxGroupSocialLinkSchema),
    socialLinksVerificationStatus: z.union([z.string(), z.number()]).nullish(),
})

/** `GetGroupEmoteSetsResponse` */
export const RobloxGroupEmoteSetsResponseSchema = z.object({
    emoteSets: z.array(z.object({
        id:     z.string(),
        name:   z.string(),
        emotes: z.array(z.object({ id: z.string(), name: z.string() })),
    })),
})

/** `GetCommunityFeatureFreezesResponse` */
export const RobloxGroupFeatureFreezesResponseSchema = z.object({
    features: z.array(z.object({ feature: z.string(), isDisabled: z.boolean() })),
})

/** `GroupFeaturedContentResponse` — 없으면 null */
export const RobloxGroupFeaturedEventSchema = z.object({
    groupId:     RobloxGroupIdSchema,
    contentType: z.string(),
    contentId:   RobloxGroupEventIdSchema,
})

/** `GroupsDisplayOptionsResponse` — GET /v1/groups/metadata */
export const RobloxGroupsMetadataSchema = z.object({
    groupLimit:                  z.number(),
    currentGroupCount:           z.number(),
    groupStatusMaxLength:        z.number(),
    areProfileGroupsHidden:      z.boolean().nullish(),
    isGroupDetailsPolicyEnabled: z.boolean().nullish(),
    showPreviousGroupNames:      z.boolean().nullish(),
    areGroupBansEnabled:         z.boolean().nullish(),
    canEnableGroupNotifications: z.boolean().nullish(),
})

/** `GroupConfigurationDisplayOptionsResponse` — GET /v1/groups/configuration/metadata */
export const RobloxGroupConfigurationMetadataSchema = z.object({
    groupConfiguration: z.object({
        nameMaxLength:             z.number(),
        descriptionMaxLength:      z.number(),
        iconMaxFileSizeMb:         z.number(),
        coverPhotoMaxFileSizeMb:   z.number().nullish(),
        validCoverPhotoDimensions: z.string().nullish(),
        /** 그룹 생성 비용(Robux) */
        cost:                      z.number(),
    }).loose(),
    recurringPayoutsConfiguration: z.object({ maxPayoutPartners: z.number() }).nullish(),
    roleConfiguration:             z.object({
        nameMaxLength:        z.number(),
        descriptionMaxLength: z.number(),
        limit:                z.number(),
        cost:                 z.number(),
        minRank:              z.number(),
        maxRank:              z.number(),
    }).nullish(),
    groupNameChangeConfiguration: z.object({ cost: z.number(), cooldownInDays: z.number(), ownershipCooldownInDays: z.number() }).nullish(),
    isPremiumPayoutsEnabled:      z.boolean().nullish(),
    isDefaultEmblemPolicyEnabled: z.boolean().nullish(),
})

/** `GroupSearchMetadataResponse` */
export const RobloxGroupSearchMetadataSchema = z.object({
    SuggestedGroupKeywords: z.array(z.string()),
    ShowFriendsGroupsSort:  z.boolean(),
})


// ── 관리 (권한 필요) ────────────────────────────────────

/** `GroupJoinRequestResponse` */
export const RobloxGroupJoinRequestSchema = z.object({
    requester: RobloxGroupUserSchema,
    created:   z.string(),
})

export const RobloxGroupJoinRequestPageSchema = RobloxPageResponseSchema(RobloxGroupJoinRequestSchema)

/** `GroupBanMemberResponse` */
export const RobloxGroupBanSchema = z.object({
    user:       RobloxGroupUserSchema,
    actingUser: RobloxGroupMemberSchema.nullish(),
    created:    z.string(),
})

export const RobloxGroupBanPageSchema = RobloxPageResponseSchema(RobloxGroupBanSchema)

/** `GroupAuditLogResponseItem` — description은 actionType마다 모양이 다르다 */
export const RobloxGroupAuditLogItemSchema = z.object({
    actor:       RobloxGroupMemberSchema,
    actionType:  z.string(),
    description: z.unknown(),
    created:     z.string(),
})

export const RobloxGroupAuditLogPageSchema = RobloxPageResponseSchema(RobloxGroupAuditLogItemSchema)

/** `GroupSettingsResponse` — enum 값은 문자열로 올 수 있다 */
export const RobloxGroupSettingsSchema = z.object({
    isApprovalRequired:          z.boolean(),
    isBuildersClubRequired:      z.boolean().nullish(),
    areEnemiesAllowed:           z.boolean(),
    areGroupFundsVisible:        z.boolean(),
    areGroupGamesVisible:        z.boolean(),
    isGroupNameChangeEnabled:    z.boolean().nullish(),
    verificationLevel:           z.union([z.string(), z.number()]).nullish(),
    accountTenureRequirement:    z.union([z.string(), z.number()]).nullish(),
    slowmode:                    z.union([z.string(), z.number()]).nullish(),
    isMemberListVisibleToPublic: z.boolean().nullish(),
    isAutoAssignRoleDisabled:    z.boolean().nullish(),
    hasLegacyAutoAssignRole:     z.boolean().nullish(),
    communityTier:               RobloxCommunityTierSchema.nullish(),
})

/** `GroupConfigurationDetailsResponse` */
export const RobloxGroupConfigurationSchema = z.object({
    groupId:      RobloxGroupIdSchema,
    emblemId:     RobloxAssetIdSchema.nullish().catch(null),
    coverPhotoId: RobloxAssetIdSchema.nullish().catch(null),
})

/** `GetGroupFeaturesResponse` */
export const RobloxGroupFeaturesSchema = z.object({
    isLocked: z.boolean(),
    features: z.array(z.object({
        /** "Payouts" | "ContentUpload" | "GroupOwnershipTransfer" | "GameOwnershipTransfer" | "ForumRead" | "ForumWrite" */
        feature:          z.string(),
        isFeatureBlocked: z.boolean(),
        expiration:       z.string().nullish(),
    })),
})

/** `GroupPayoutResponse` */
export const RobloxGroupPayoutsResponseSchema = RobloxArrayResponseSchema(z.object({
    user:       RobloxGroupUserSchema,
    percentage: z.number(),
}))

/** `GroupPayoutRestrictionResponse` */
export const RobloxGroupPayoutRestrictionSchema = z.object({
    canUseRecurringPayout: z.boolean(),
    canUseOneTimePayout:   z.boolean(),
})

/** `BlockedKeywordModel` */
export const RobloxGroupKeywordSchema = z.object({
    id:        RobloxGroupKeywordIdSchema,
    keyword:   z.string(),
    createdBy: z.number(),
    isPrivate: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const RobloxGroupKeywordPageSchema = RobloxPageResponseSchema(RobloxGroupKeywordSchema).extend({
    totalActiveKeywordsCount: z.number(),
})

/** `CreateBlockedKeywordsResponse` */
export const RobloxCreateGroupKeywordsResponseSchema = z.object({
    createdKeywords:      z.array(RobloxGroupKeywordSchema),
    hadModeratedKeywords: z.boolean(),
    hadDuplicateKeywords: z.boolean(),
})

/** `TierEvaluationResultResponse` */
export const RobloxGroupTierEvaluationSchema = z.object({
    tierInfo:      RobloxCommunityTierSchema,
    passedSignals: z.array(z.string()).nullish(),
    requirements:  z.array(z.object({ key: z.number(), satisfied: z.boolean() })).nullish(),
})


export type RobloxGroupUser = z.infer<typeof RobloxGroupUserSchema>
export type RobloxGroupRole = z.infer<typeof RobloxGroupRoleSchema>
export type RobloxGroupRoleDetail = z.infer<typeof RobloxGroupRoleDetailSchema>
export type RobloxGroupMember = z.infer<typeof RobloxGroupMemberSchema>
export type RobloxGroupShout = z.infer<typeof RobloxGroupShoutSchema>
export type RobloxCommunityTier = z.infer<typeof RobloxCommunityTierSchema>
export type RobloxGroupDetail = z.infer<typeof RobloxGroupDetailSchema>
export type RobloxGroupDetailPartial = z.infer<typeof RobloxGroupDetailPartialSchema>
export type RobloxGroup = z.infer<typeof RobloxGroupSchema>
export type RobloxGroupBasic = z.infer<typeof RobloxGroupBasicSchema>
export type RobloxGroupMembershipDetail = z.infer<typeof RobloxGroupMembershipDetailSchema>
export type RobloxGroupMemberPage = z.infer<typeof RobloxGroupMemberPageSchema>
export type RobloxGroupUserPage = z.infer<typeof RobloxGroupUserPageSchema>
export type RobloxGroupSearchItem = z.infer<typeof RobloxGroupSearchItemSchema>
export type RobloxGroupSearchPage = z.infer<typeof RobloxGroupSearchPageSchema>
export type RobloxGroupNameHistoryPage = z.infer<typeof RobloxGroupNameHistoryPageSchema>
export type RobloxGroupRelationships = z.infer<typeof RobloxGroupRelationshipsSchema>
export type RobloxGroupPermissions = z.infer<typeof RobloxGroupPermissionsSchema>
export type RobloxGroupRolePermissions = z.infer<typeof RobloxGroupRolePermissionsSchema>
export type RobloxGroupNotificationPreference = z.infer<typeof RobloxGroupNotificationPreferenceSchema>
export type RobloxGroupMembership = z.infer<typeof RobloxGroupMembershipSchema>
export type RobloxGroupSocialLink = z.infer<typeof RobloxGroupSocialLinkSchema>
export type RobloxGroupEmoteSet = z.infer<typeof RobloxGroupEmoteSetsResponseSchema>["emoteSets"][number]
export type RobloxGroupFeatureFreeze = z.infer<typeof RobloxGroupFeatureFreezesResponseSchema>["features"][number]
export type RobloxGroupFeaturedEvent = z.infer<typeof RobloxGroupFeaturedEventSchema>
export type RobloxGroupsMetadata = z.infer<typeof RobloxGroupsMetadataSchema>
export type RobloxGroupConfigurationMetadata = z.infer<typeof RobloxGroupConfigurationMetadataSchema>
export type RobloxGroupSearchMetadata = z.infer<typeof RobloxGroupSearchMetadataSchema>
export type RobloxGroupJoinRequest = z.infer<typeof RobloxGroupJoinRequestSchema>
export type RobloxGroupJoinRequestPage = z.infer<typeof RobloxGroupJoinRequestPageSchema>
export type RobloxGroupBan = z.infer<typeof RobloxGroupBanSchema>
export type RobloxGroupBanPage = z.infer<typeof RobloxGroupBanPageSchema>
export type RobloxGroupAuditLogItem = z.infer<typeof RobloxGroupAuditLogItemSchema>
export type RobloxGroupAuditLogPage = z.infer<typeof RobloxGroupAuditLogPageSchema>
export type RobloxGroupSettings = z.infer<typeof RobloxGroupSettingsSchema>
export type RobloxGroupConfiguration = z.infer<typeof RobloxGroupConfigurationSchema>
export type RobloxGroupFeatures = z.infer<typeof RobloxGroupFeaturesSchema>
export type RobloxGroupPayout = z.infer<typeof RobloxGroupPayoutsResponseSchema>["data"][number]
export type RobloxGroupPayoutRestriction = z.infer<typeof RobloxGroupPayoutRestrictionSchema>
export type RobloxGroupKeyword = z.infer<typeof RobloxGroupKeywordSchema>
export type RobloxGroupKeywordPage = z.infer<typeof RobloxGroupKeywordPageSchema>
export type RobloxCreateGroupKeywordsResponse = z.infer<typeof RobloxCreateGroupKeywordsResponseSchema>
export type RobloxGroupTierEvaluation = z.infer<typeof RobloxGroupTierEvaluationSchema>


// ── 고수준 결과 ─────────────────────────────────────────

/** `getUserGroups` 항목의 그룹 하나. v1과 v2 어느 쪽에서 받아도 같은 모양이다 */
export type RobloxUserGroupRole = {
    group: RobloxGroupBasic
    role:  { id: RobloxGroupRoleId, name: string, rank: number }
}

/** `getUserGroups` 결과 */
export type RobloxUserGroups = { userId: RobloxUserId, groups: RobloxUserGroupRole[] }

/** `getPrimaryGroups` 결과 */
export type RobloxPrimaryGroup = { userId: RobloxUserId, group: RobloxGroupDetailPartial, role: RobloxGroupRole }


// ── 요청 ───────────────────────────────────────────────

export type RobloxGroupPageQuery = {
    limit?:     RobloxPageLimit
    cursor?:    RobloxCursor
    sortOrder?: RobloxSortOrder
}

export type RobloxGroupSearchQuery = {
    keyword:               string
    prioritizeExactMatch?: boolean
    limit?:                RobloxPageLimit
    cursor?:               RobloxCursor
}

export type RobloxGroupRelationshipsQuery = {
    /** 기본 0. 다음 페이지는 응답의 nextRowIndex */
    startRowIndex?: number
    /** 기본 100 */
    maxRows?:       number
}

/** 감사 로그의 actionType (스펙의 enum) */
export const RobloxGroupAuditActionTypes = [
    "DeletePost", "RemoveMember", "AcceptJoinRequest", "DeclineJoinRequest", "PostStatus", "ChangeRank", "BuyAd",
    "SendAllyRequest", "CreateEnemy", "AcceptAllyRequest", "DeclineAllyRequest", "DeleteAlly", "DeleteEnemy",
    "AddGroupPlace", "RemoveGroupPlace", "CreateItems", "ConfigureItems", "SpendGroupFunds", "ChangeOwner", "Delete",
    "AdjustCurrencyAmounts", "Abandon", "Claim", "Rename", "ChangeDescription", "InviteToClan", "KickFromClan",
    "CancelClanInvite", "BuyClan", "CreateGroupAsset", "UpdateGroupAsset", "ConfigureGroupAsset", "RevertGroupAsset",
    "CreateGroupDeveloperProduct", "ConfigureGroupGame", "CreateGroupDeveloperSubscriptionProduct", "Lock", "Unlock",
    "CreateGamePass", "CreateBadge", "ConfigureBadge", "SavePlace", "PublishPlace", "UpdateRolesetRank",
    "UpdateRolesetData", "UpdateRoleSetPosition", "BanMember", "UnbanMember", "CreateForumCategory",
    "UpdateForumCategory", "ArchiveForumCategory", "DeleteForumCategory", "DeleteForumPost", "DeleteForumComment",
    "PinForumPost", "UnpinForumPost", "LockForumPost", "UnlockForumPost", "CreateRoleset", "DeleteRoleset",
    "CreateCommerceProduct", "SetCommerceProductActive", "ArchiveCommerceProduct", "AcceptCommerceProductBundlingFee",
    "SetCommerceProductInactive", "ConnectMerchant", "DisconnectMerchant", "JoinGroup", "LeaveGroup", "UpdateGroupIcon",
    "UpdateGroupCoverPhoto", "AssignRole", "UnassignRole", "PublishAnnouncement", "DeleteAnnouncement",
    "UpdateRoleSetPermissions", "UpdateGroupSecuritySettings", "GrantEnterpriseTier", "RevokeEnterpriseTier", "DeactivateGroup",
] as const

export type RobloxGroupAuditActionType = typeof RobloxGroupAuditActionTypes[number]

export type RobloxGroupAuditLogQuery = RobloxGroupPageQuery & {
    actionType?: RobloxGroupAuditActionType
    userId?:     RobloxUserId
}

/** POST /v1/groups/{groupId}/users — 캡차가 걸리면 같이 보낸다 */
export type RobloxJoinGroupRequest = RobloxCaptchaTokenRequest & {
    sessionId?:       string
    redemptionToken?: string
}

export type RobloxUpdateGroupSettingsRequest = {
    isApprovalRequired?:          boolean
    areEnemiesAllowed?:           boolean
    areGroupFundsVisible?:        boolean
    areGroupGamesVisible?:        boolean
    /** 0~3 */
    verificationLevel?:           number
    /** 0~5 */
    accountTenureRequirement?:    number
    /** 0~3 */
    slowmode?:                    number
    isMemberListVisibleToPublic?: boolean
}

export type RobloxCreateGroupRoleRequest = {
    name:             string
    description?:     string
    /** 1~254 */
    rank:             number
    /** 역할 생성 비용을 그룹 자금으로 낸다 */
    usingGroupFunds?: boolean
    isPrivate?:       boolean
}

export type RobloxUpdateGroupRoleRequest = {
    name?:        string
    description?: string
    rank?:        number
    color?:       number
    isPrivate?:   boolean
}

/** 스펙은 0~8의 숫자지만 웹은 이름을 보낸다 */
export type RobloxGroupSocialLinkType =
    | "Facebook" | "Twitter" | "YouTube" | "Twitch" | "GooglePlus" | "Discord" | "RobloxGroup" | "Amazon" | "Guilded"
    | (string & {})

export type RobloxGroupSocialLinkRequest = {
    type:  RobloxGroupSocialLinkType
    url:   string
    title: string
}

export type RobloxCreateGroupRequest = {
    name:                     string
    description?:             string
    publicGroup?:             boolean
    buildersClubMembersOnly?: boolean
    /** 그룹 아이콘 이미지 */
    icon:                     Blob
}

/** 일회성 지급 — Robux를 정해진 만큼 */
export type RobloxGroupPayoutRecipient = { userId: RobloxUserId, amount: number }
/** 정기 지급 — 수익의 퍼센트 */
export type RobloxGroupRecurringPayoutRecipient = { userId: RobloxUserId, percentage: number }

