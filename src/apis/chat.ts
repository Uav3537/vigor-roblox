import { RobloxBatcher, captureHeaders, type RobloxBatchRoute } from "@/core/batcher"
import type { RobloxConfig } from "@/core/config"
import { createHttp, validate } from "@/core/http"
import { finish, found, settle } from "@/core/partial"
import { requireViewer } from "@/core/viewer"
import type { RobloxConversationId } from "@/types/common"
import {
    RobloxChatConversationPageRawSchema,
    RobloxChatConversationResultsResponseSchema,
    RobloxChatConversationsResponseSchema,
    RobloxChatMessagePageRawSchema,
    RobloxChatMetadataSchema,
    RobloxChatSendResponseSchema,
    RobloxChatUnreadCountsSchema,
    type RobloxChatConversation,
    type RobloxChatConversationPage,
    type RobloxChatConversationResult,
    type RobloxChatMessage,
    type RobloxChatMessagePage,
    type RobloxChatPageQuery,
    type RobloxCreateConversationRequest,
    type RobloxRenameConversationRequest,
    type RobloxSendMessageRequest,
} from "@/types/chat"
import type { RobloxUserId } from "@/types/users"
import z from "zod"

const ORIGIN = "https://apis.roblox.com"
const BASE = ["platform-chat-api", "v1"] as const

/** get-conversations 한 번에 넣을 수 있는 최대 개수 (26부터 400 "batch request size is too large") */
const CONVERSATION_BATCH_LIMIT = 25


/**
 * POST get-conversations — 120회/분, 25개씩 (2026-10 실측).
 * 요청 계정이 참가한 대화만 온다.
 */
const conversationsRoute: RobloxBatchRoute<{ viewer: string, id: RobloxConversationId }, RobloxChatConversation | null> = {
    bucket: "apis POST /platform-chat-api/v1/get-conversations",
    limit:  CONVERSATION_BATCH_LIMIT,
    group:  t => t.viewer,
    async send(http, targets, onHeaders) {
        const res = await http()
            .path(...BASE, "get-conversations")
            .body("overwrite", { ids: targets.map(t => t.id), include_user_data: true })
            .middlewares(captureHeaders(onHeaders))
            .middlewares(validate(RobloxChatConversationsResponseSchema))
            .request()
        const byId = new Map(res.conversations.map(c => [c.id, c]))
        return targets.map(t => byId.get(t.id) ?? null)
    },
}

/**
 * apis.roblox.com/platform-chat-api/v1 — roblox.com 웹 채팅이 쓰는 비공개 API.
 * 전부 요청 계정 기준이라 계정이 하나로 정해져 있어야 한다 (`.as(cookie)` 또는 확장 모드).
 * 엔드포인트 이름과 body 형식은 실측으로 찾았다. 한도는 2026-10 실측.
 */
export class RobloxChatApi {
    private readonly http
    private readonly conversations

    constructor(private readonly config: RobloxConfig) {
        this.http = createHttp(config, ORIGIN)
        this.conversations = new RobloxBatcher(config, ORIGIN, [conversationsRoute])
    }

    private viewer() {
        return requireViewer(this.config)
    }

    // ── 조회 ───────────────────────────────────────────

    /** 대화 상세(참가자 이름 포함). 같은 틱에 들어온 호출은 25개씩 묶는다. 내가 참가하지 않은 대화는 뺀다. */
    async getConversations(ids: readonly RobloxConversationId[]): Promise<RobloxChatConversation[]> {
        const viewer = await this.viewer()
        const { values, errors } = await settle(ids, id => this.conversations.load(`${viewer}:${id}`, { viewer, id }))
        return finish(found(values), errors)
    }

    /** GET get-user-conversations — 내 대화 목록 (120회/분) */
    async listConversations(query: RobloxChatPageQuery = {}): Promise<RobloxChatConversationPage> {
        await this.viewer()
        const params: Record<string, string | number | boolean> = { page_size: query.pageSize ?? 20, include_user_data: true }
        if (query.cursor) params.cursor = query.cursor
        const res = await this.http()
            .path(...BASE, "get-user-conversations")
            .query(params)
            .middlewares(validate(RobloxChatConversationPageRawSchema))
            .request()
        return { conversations: res.conversations, nextCursor: res.next_cursor }
    }

    /** POST search-conversations — 대화를 이름/참가자로 찾는다 */
    async searchConversations(query: string, page: RobloxChatPageQuery = {}): Promise<RobloxChatConversationPage> {
        await this.viewer()
        const body: Record<string, string | number> = { query, page_size: page.pageSize ?? 20 }
        if (page.cursor) body.cursor = page.cursor
        const res = await this.http()
            .path(...BASE, "search-conversations")
            .body("overwrite", body)
            .middlewares(validate(RobloxChatConversationPageRawSchema))
            .request()
        return { conversations: res.conversations, nextCursor: res.next_cursor }
    }

    /** GET get-conversation-messages — 최신순 (120회/분). 커서 두 개를 응답 그대로 돌려준다 */
    async getMessages(conversationId: RobloxConversationId, query: RobloxChatPageQuery = {}): Promise<RobloxChatMessagePage> {
        await this.viewer()
        const params: Record<string, string | number> = { conversation_id: conversationId, page_size: query.pageSize ?? 30 }
        if (query.cursor) params.cursor = query.cursor
        const res = await this.http()
            .path(...BASE, "get-conversation-messages")
            .query(params)
            .middlewares(validate(RobloxChatMessagePageRawSchema))
            .request()
        return { messages: res.messages, nextCursor: res.next_cursor, previousCursor: res.previous_cursor }
    }

    /** POST search-messages — 한 대화 안에서 메시지 검색 */
    async searchMessages(conversationId: RobloxConversationId, query: string, page: RobloxChatPageQuery = {}): Promise<RobloxChatMessagePage> {
        await this.viewer()
        const body: Record<string, string | number> = { conversation_id: conversationId, query, page_size: page.pageSize ?? 30 }
        if (page.cursor) body.cursor = page.cursor
        const res = await this.http()
            .path(...BASE, "search-messages")
            .body("overwrite", body)
            .middlewares(validate(RobloxChatMessagePageRawSchema))
            .request()
        return { messages: res.messages, nextCursor: res.next_cursor, previousCursor: res.previous_cursor }
    }

    /** GET get-conversation-metadata — 전체 안 읽은 수 */
    async getUnreadCounts() {
        await this.viewer()
        return this.http()
            .path(...BASE, "get-conversation-metadata")
            .middlewares(validate(RobloxChatUnreadCountsSchema))
            .request()
    }

    /** GET metadata — 채팅 가능 여부와 설정. `isChatUserMessagesEnabled`가 false면 메시지를 보낼 수 없다 */
    async getMetadata() {
        await this.viewer()
        return this.http()
            .path(...BASE, "metadata")
            .middlewares(validate(RobloxChatMetadataSchema))
            .request()
    }

    // ── 쓰기 ───────────────────────────────────────────

    /**
     * POST send-messages — 한 대화에 여러 메시지 (4회/초). 각 메시지의 `status`로 결과를 본다.
     * 채팅이 꺼진 계정은 403 chat_disabled_for_user가 난다.
     */
    async sendMessages(conversationId: RobloxConversationId, messages: readonly RobloxSendMessageRequest[]): Promise<RobloxChatMessage[]> {
        await this.viewer()
        if (!messages.length) return []
        const res = await this.http()
            .path(...BASE, "send-messages")
            .body("overwrite", {
                conversation_id: conversationId,
                messages: messages.map(m => typeof m === "string" ? { content: m } : { content: m.content, replies_to: m.repliesTo }),
            })
            .middlewares(validate(RobloxChatSendResponseSchema))
            .request()
        return res.messages
    }

    /** POST mark-conversations — 읽음 처리 (60회/분) */
    async markRead(conversationIds: readonly RobloxConversationId[]): Promise<void> {
        await this.viewer()
        if (!conversationIds.length) return
        await this.http()
            .path(...BASE, "mark-conversations")
            .body("overwrite", { conversation_ids: conversationIds })
            .middlewares(validate(z.unknown()))
            .request()
    }

    /** POST update-typing-status — 입력 중 표시 (30회/분, 보내는 쪽 throttle은 metadata 참고) */
    async setTyping(conversationId: RobloxConversationId): Promise<void> {
        await this.viewer()
        await this.http()
            .path(...BASE, "update-typing-status")
            .body("overwrite", { conversation_id: conversationId })
            .middlewares(validate(z.unknown()))
            .request()
    }

    /** POST create-conversations — 1:1 또는 그룹 대화 (15회/분). 참가자는 모두 친구여야 한다 */
    async createConversations(requests: readonly RobloxCreateConversationRequest[]): Promise<RobloxChatConversationResult[]> {
        await this.viewer()
        if (!requests.length) return []
        const res = await this.http()
            .path(...BASE, "create-conversations")
            .body("overwrite", {
                conversations: requests.map(r => r.type === "one_to_one"
                    ? { type: "one_to_one", participant_user_ids: [r.userId] }
                    : { type: "group", participant_user_ids: r.userIds, name: r.name }),
                include_user_data: true,
            })
            .middlewares(validate(RobloxChatConversationResultsResponseSchema))
            .request()
        return res.conversations
    }

    /** POST update-conversations — 그룹 대화 이름 바꾸기 (15회/분) */
    async renameConversations(requests: readonly RobloxRenameConversationRequest[]): Promise<RobloxChatConversationResult[]> {
        await this.viewer()
        if (!requests.length) return []
        const res = await this.http()
            .path(...BASE, "update-conversations")
            .body("overwrite", { conversations: requests.map(r => ({ id: r.id, name: r.name })) })
            .middlewares(validate(RobloxChatConversationResultsResponseSchema))
            .request()
        return res.conversations
    }

    /** POST add-users — 그룹 대화에 친구 추가 (15회/분) */
    async addUsers(conversationId: RobloxConversationId, userIds: readonly RobloxUserId[]): Promise<void> {
        await this.viewer()
        await this.http()
            .path(...BASE, "add-users")
            .body("overwrite", { conversation_id: conversationId, user_ids: userIds })
            .middlewares(validate(z.unknown()))
            .request()
    }

    /** POST remove-users — 그룹 대화에서 내보내기. 자기 자신이면 나가기 (15회/분) */
    async removeUsers(conversationId: RobloxConversationId, userIds: readonly RobloxUserId[]): Promise<void> {
        await this.viewer()
        await this.http()
            .path(...BASE, "remove-users")
            .body("overwrite", { conversation_id: conversationId, user_ids: userIds })
            .middlewares(validate(z.unknown()))
            .request()
    }
}
