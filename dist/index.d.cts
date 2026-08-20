import { VigorFetch } from 'vigor-fetch';

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
type VigorFetchInstance = VigorFetch<any>;
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

export { type CreateRobloxApiOptions, type RobloxApi, type RobloxApiCache, type RobloxAssetId, type RobloxAuthenticatedUser, type RobloxCookie, type RobloxDisplayName, type RobloxFriendEntry, type RobloxJobId, type RobloxPlaceId, type RobloxPlaceInfo, type RobloxPresenceEntry, type RobloxServerEntry, type RobloxServerEntryWithLocation, type RobloxServerLocation, type RobloxServersResult, type RobloxThumbnail, type RobloxThumbnailRaw, type RobloxThumbnailTarget, type RobloxUniverseId, type RobloxUser, type RobloxUserAgeBracket, type RobloxUserBirthdate, type RobloxUserCountryCode, type RobloxUserDescription, type RobloxUserGender, type RobloxUserId, type RobloxUserName, type RobloxUserRoles, type RobloxUserSimple, type VigorFetchInstance, createRobloxApi };
