// 확장 모드에서 fetch로 붙일 수 없는 헤더(User-Agent)를 declarativeNetRequest로 바꾼다.
// 인증은 브라우저의 쿠키 저장소(`credentials: "include"`)에 맡기고, 쿠키는 건드리지 않는다.
// 타입은 chrome.declarativeNetRequest.Rule과 같은 모양이다 (@types/chrome에 기대지 않으려고 따로 적었다).

/** `chrome.declarativeNetRequest.Rule` 중 여기서 쓰는 부분 */
export type RobloxDnrRule = {
    id:       number
    priority: number
    action: {
        type:           "modifyHeaders"
        requestHeaders: { header: string, operation: "set", value: string }[]
    }
    condition: {
        requestDomains: string[]
        resourceTypes:  "xmlhttprequest"[]
        tabIds?:        number[]
    }
}

export type RobloxDnrOptions = {
    /** 첫 규칙의 id. 규칙마다 1씩 늘린다. 확장의 다른 규칙과 겹치지 않게 고른다. 기본 1 */
    firstRuleId?:   number
    /** 기본 1 */
    priority?:      number
    /**
     * true면 확장 자신의 요청(service worker, popup, offscreen 등 탭 밖, `tabIds: [-1]`)에만 건다. session 규칙에서만 쓸 수 있다.
     * false면 gamejoin.roblox.com으로 가는 모든 요청에 걸린다 (roblox.com 탭 안의 content script도 포함). 기본 false
     */
    extensionOnly?: boolean
}

/** chrome.tabs.TAB_ID_NONE — 탭에 속하지 않은 요청 */
const TAB_ID_NONE = -1

/** gamejoin은 Roblox 클라이언트 UA가 아니면 거절한다 (status 12). node 모드가 보내는 값과 같다 */
const CLIENT_USER_AGENT = "Roblox/WinInet"

/**
 * 확장 모드에 필요한 declarativeNetRequest 규칙. gamejoin.roblox.com 요청의 User-Agent를
 * Roblox 클라이언트 값으로 바꾼다 (`games.getServerAddresses` 등).
 *
 * ```ts
 * const rules = robloxDnrRules({ firstRuleId: 1000 })
 * await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: rules.map(r => r.id), addRules: rules })
 * ```
 *
 * manifest에 `declarativeNetRequest` 권한(또는 `declarativeNetRequestWithHostAccess`)과
 * `*://*.roblox.com/*` host 권한이 있어야 한다.
 */
export function robloxDnrRules(options: RobloxDnrOptions = {}): RobloxDnrRule[] {
    const { firstRuleId = 1, priority = 1, extensionOnly = false } = options
    return [{
        id: firstRuleId,
        priority,
        action:    { type: "modifyHeaders", requestHeaders: [{ header: "User-Agent", operation: "set", value: CLIENT_USER_AGENT }] },
        condition: { requestDomains: ["gamejoin.roblox.com"], resourceTypes: ["xmlhttprequest"], ...(extensionOnly ? { tabIds: [TAB_ID_NONE] } : {}) },
    }]
}
