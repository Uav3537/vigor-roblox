import { vigor } from 'vigor-fetch';

type RobloxUserId = number & {
    __brand__: 'Roblox_UserId';
};
type RobloxUserName = string & {
    __brand__: 'Roblox_UserName';
};
type RobloxDisplayName = string & {
    __brand__: 'Roblox_UserDisplayName';
};
type RobloxCookie = string & {
    __brand__: 'Roblox_Cookie';
};
type RobloxPlaceId = number & {
    __brand__: 'Roblox_PlaceId';
};
type RobloxUniverseId = number & {
    __brand__: 'Roblox_UniverseId';
};
type RobloxJobId = string & {
    __brand__: 'Roblox_JobId';
};
type RobloxAssetId = number & {
    __brand__: 'Roblox_AssetId';
};
declare const RobloxErrorMessageFuncs: {
    readonly AUTH_FAILED: ({ status, cookie }: {
        status: number | null;
        cookie: string;
    }) => string;
    readonly RATE_LIMITED: ({ status, url, retryAfterMs }: {
        status: number;
        url: string | null;
        retryAfterMs: number | null;
    }) => string;
    readonly REQUEST_FAILED: ({ status, url }: {
        status: number | null;
        url: string | null;
    }) => string;
};
type RobloxErrorCodes = keyof typeof RobloxErrorMessageFuncs;
type RobloxErrorDatas<C extends RobloxErrorCodes> = Parameters<typeof RobloxErrorMessageFuncs[C]> extends [infer A] ? A : undefined;
type RobloxErrorOptions<C extends RobloxErrorCodes, T> = {
    cause?: unknown;
    data?: RobloxErrorDatas<C>;
    timeline?: unknown[];
    context?: T;
};
declare abstract class RobloxApiError<C extends RobloxErrorCodes, T = unknown> extends Error {
    readonly timestamp: Date;
    readonly cause?: unknown;
    readonly code: C;
    readonly data: RobloxErrorDatas<C> | undefined;
    readonly timeline: unknown[];
    readonly context: T | undefined;
    constructor(code: C, options: RobloxErrorOptions<C, T>);
}
declare class RobloxAuthError extends RobloxApiError<'AUTH_FAILED'> {
    constructor(options: RobloxErrorOptions<'AUTH_FAILED', never>);
}
declare class RobloxRateLimitError extends RobloxApiError<'RATE_LIMITED'> {
    constructor(options: RobloxErrorOptions<'RATE_LIMITED', never>);
}
declare class RobloxRequestError extends RobloxApiError<'REQUEST_FAILED'> {
    constructor(options: RobloxErrorOptions<'REQUEST_FAILED', never>);
}
interface RobloxUserDescription {
    description: string;
}
interface RobloxUserBirthdate {
    birthYear: number;
    birthMonth: number;
    birthDay: number;
}
interface RobloxUserGender {
    gender: number;
}
interface RobloxUserAgeBracket {
    ageBracket: number;
}
interface RobloxUserCountryCode {
    countryCode: string;
}
interface RobloxUserRoles {
    roles: string[];
}
type RobloxAuthenticatedUser = RobloxUserSimple & Partial<RobloxUserDescription> & Partial<RobloxUserBirthdate> & Partial<RobloxUserGender> & Partial<RobloxUserAgeBracket> & Partial<RobloxUserCountryCode> & Partial<RobloxUserRoles>;
interface RobloxApiCache {
    select: <T>(type: string, separators: string[]) => Promise<Array<{
        separator: string;
        data: T;
    }>>;
    upsert: <T>(type: string, expire: number, items: Array<{
        separator: string;
        data: T;
    }>) => Promise<void>;
}
interface RobloxUserSimple {
    id: RobloxUserId;
    name: RobloxUserName;
    displayName: RobloxDisplayName;
    hasVerifiedBadge: boolean;
    requestedUsername?: string;
}
interface RobloxUser extends RobloxUserSimple {
    description: string;
    externalAppDisplayName: string | null;
    isBanned: boolean;
    created: string;
}
interface RobloxThumbnailTarget {
    targetId?: RobloxAssetId | RobloxUserId;
    token?: string;
    type?: string;
    size?: string;
    format?: string;
    isCircular?: boolean;
}
interface RobloxThumbnailRaw extends RobloxThumbnailTarget {
    imageUrl: string | null;
    state: string;
    version: string;
}
interface RobloxThumbnail extends RobloxThumbnailTarget {
    url: string | null;
    state: string;
    version: string;
}
interface RobloxServerEntry {
    jobId: RobloxJobId;
    maxPlayers: number;
    playing: number;
    fps: number;
    ping: number;
    playerImgs: string[];
}
interface RobloxServerEntryWithLocation extends RobloxServerEntry {
    location: RobloxServerLocation | null;
}
interface RobloxServersResult<E extends RobloxServerEntry = RobloxServerEntry> {
    previousPageCursor: string | null;
    nextPageCursor: string | null;
    data: E[];
}
interface RobloxPresenceEntry {
    userId: RobloxUserId;
    userPresenceType: number;
    lastLocation: string;
    placeId: RobloxPlaceId | null;
    rootPlaceId: RobloxPlaceId | null;
    gameId: RobloxJobId | null;
    universeId: RobloxUniverseId | null;
    lastOnline: string;
}
interface RobloxPlaceInfo {
    placeId: RobloxPlaceId;
    universeId: RobloxUniverseId | null;
    name: string;
    description: string;
    creator: {
        id: number;
        name: string;
        type: string;
    };
    price: number | null;
    playing: number;
    visits: number;
    maxPlayers: number;
    created: string;
    updated: string;
    logos: string[];
}
interface RobloxServerLocation {
    ip: string;
    jobId: RobloxJobId;
    countryCode: string;
    countryName: string;
    regionName: string;
    city: string;
    latitude: number;
    longitude: number;
    isp: string;
    timezone: string;
}
interface RobloxFriendEntry {
    id: RobloxUserId;
    name: RobloxUserName;
    displayName: RobloxDisplayName;
    hasVerifiedBadge?: boolean;
    isOnline?: boolean;
    isDeleted?: boolean;
    friendFrom?: string | null;
}
interface CreateRobloxApiOptions {
    cache: RobloxApiCache;
    cookies: RobloxCookie[];
    ipgeolocationKey: string;
}
interface ServersOpts {
    placeId: RobloxPlaceId;
    count?: number;
    serverType?: 'Public' | 'Friend';
    cursor?: string;
    thumbnailFormat?: Partial<RobloxThumbnailTarget>;
}
type VigorFetchInstance = ReturnType<typeof vigor.fetch>;
interface RobloxApi {
    authenticated: (cookies: RobloxCookie[]) => Promise<RobloxAuthenticatedUser[]>;
    usersSimple: (userIds: RobloxUserId[]) => Promise<RobloxUserSimple[]>;
    users: (userIds: RobloxUserId[]) => Promise<RobloxUser[]>;
    usersByName: (usernames: string[]) => Promise<RobloxUserSimple[]>;
    thumbnailAssets: (opts: {
        assetIds: RobloxAssetId[];
        size?: string;
        format?: string;
    }) => Promise<RobloxThumbnail[]>;
    thumbnailsBatch: (targets: RobloxThumbnailTarget[], formatDefaults?: Partial<RobloxThumbnailTarget>) => Promise<RobloxThumbnail[]>;
    serversSimple: (opts: ServersOpts) => Promise<RobloxServersResult<RobloxServerEntry>>;
    servers: (opts: ServersOpts) => Promise<RobloxServersResult<RobloxServerEntryWithLocation>>;
    presence: (userIds: RobloxUserId[]) => Promise<RobloxPresenceEntry[]>;
    placeInfo: (placeIds: RobloxPlaceId[]) => Promise<RobloxPlaceInfo[]>;
    usersSimpleWithImg: (userIds: RobloxUserId[]) => Promise<Array<RobloxUserSimple & {
        img: string | null;
    }>>;
    usersWithImg: (userIds: RobloxUserId[]) => Promise<Array<RobloxUser & {
        img: string | null;
    }>>;
    track: (opts: {
        placeId: RobloxPlaceId;
        targets: Array<string | number>;
    }) => Promise<Array<{
        user: RobloxUserSimple & {
            img: string | null;
        };
        server: RobloxServerEntry & {
            location: RobloxServerLocation | null;
        } | null;
    }>>;
    serversRegion: (opts: {
        placeId: RobloxPlaceId;
        jobIds: RobloxJobId[];
    }) => Promise<RobloxServerLocation[]>;
    friends: (userId: RobloxUserId) => Promise<RobloxFriendEntry[]>;
    sendFriendRequest: (targetUserId: RobloxUserId) => Promise<void>;
    unfriend: (targetUserId: RobloxUserId) => Promise<void>;
    _internal: {
        gamejoinApi: VigorFetchInstance;
        gamesApi: VigorFetchInstance;
        apisRoblox: VigorFetchInstance;
        friendsApi: VigorFetchInstance;
        presenceApi: VigorFetchInstance;
    };
}
declare function createRobloxApi({ cache, cookies: cookiesList, ipgeolocationKey, }: CreateRobloxApiOptions): RobloxApi;

export { RobloxAuthError, RobloxRateLimitError, RobloxRequestError, createRobloxApi };
export type { CreateRobloxApiOptions, RobloxApi, RobloxApiCache, RobloxAssetId, RobloxAuthenticatedUser, RobloxCookie, RobloxDisplayName, RobloxFriendEntry, RobloxJobId, RobloxPlaceId, RobloxPlaceInfo, RobloxPresenceEntry, RobloxServerEntry, RobloxServerEntryWithLocation, RobloxServerLocation, RobloxServersResult, RobloxThumbnail, RobloxThumbnailRaw, RobloxThumbnailTarget, RobloxUniverseId, RobloxUser, RobloxUserAgeBracket, RobloxUserBirthdate, RobloxUserCountryCode, RobloxUserDescription, RobloxUserGender, RobloxUserId, RobloxUserName, RobloxUserRoles, RobloxUserSimple, VigorFetchInstance };
