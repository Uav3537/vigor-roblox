import { RobloxCookie, RobloxUserId } from '@/types/branded'
import {
    RobloxChatConversation,
    RobloxChatConversationsPageSchema,
    RobloxChatMessage,
    RobloxChatMessagesPageSchema,
    RobloxChatSendResultSchema,
    RobloxChatMetadata,
    RobloxChatMetadataSchema,
} from '@/types/responses'

import { createNetworkClients } from '@/lib/network'
import { validate } from '@/lib/middlewares'
import { chatApiRateLimiter } from '@/lib/rate-limiter'

export type ChatApiDeps = {
    buildChatApi: ReturnType<typeof createNetworkClients>['buildChatApi']
}

/** 빈 문자열 커서는 "다음 페이지 없음"을 의미하므로 null로 정규화한다. */
function normalizeCursor(cursor: string | null | undefined): string | null {
    return cursor ? cursor : null
}

export type ChatConversationsResult = {
    conversations: RobloxChatConversation[]
    nextCursor:    string | null
}

export type ChatMessagesResult = {
    messages:       RobloxChatMessage[]
    nextCursor:     string | null
    previousCursor: string | null
}

export function createChatApi({ buildChatApi }: ChatApiDeps) {

    /**
     * 계정의 채팅 대화 목록을 조회한다. 대화는 요청 계정 기준으로만 보이므로
     * `cookie`가 필수다. `include_user_data`를 켜면 각 참가자의 이름 정보가
     * `user_data`에 함께 온다.
     */
    async function chatConversations(opts: {
        cookie:           RobloxCookie
        pageSize?:        number
        cursor?:          string
        includeUserData?: boolean
    }): Promise<ChatConversationsResult> {
        const { cookie, pageSize = 20, cursor, includeUserData = true } = opts
        const client = buildChatApi(cookie)

        const query: Record<string, string | number | boolean> = {
            page_size:         pageSize,
            include_user_data: includeUserData,
        }
        if (cursor) query.cursor = cursor

        const page = await chatApiRateLimiter(() =>
            client
                .path('get-user-conversations')
                .query(query)
                .middlewares(validate(RobloxChatConversationsPageSchema))
                .request<{ conversations: RobloxChatConversation[]; next_cursor?: string | null }>()
        )

        return {
            conversations: page.conversations,
            nextCursor:    normalizeCursor(page.next_cursor),
        }
    }

    /**
     * 한 대화의 메시지를 최신순으로 조회한다. `nextCursor`는 더 최신,
     * `previousCursor`는 더 과거 페이지로 이동할 때 `cursor`에 넣는다.
     */
    async function chatMessages(opts: {
        cookie:         RobloxCookie
        conversationId: string
        pageSize?:      number
        cursor?:        string
    }): Promise<ChatMessagesResult> {
        const { cookie, conversationId, pageSize = 30, cursor } = opts
        const client = buildChatApi(cookie)

        const query: Record<string, string | number> = {
            conversation_id: conversationId,
            page_size:       pageSize,
        }
        if (cursor) query.cursor = cursor

        const page = await chatApiRateLimiter(() =>
            client
                .path('get-conversation-messages')
                .query(query)
                .middlewares(validate(RobloxChatMessagesPageSchema))
                .request<{
                    messages:         RobloxChatMessage[]
                    next_cursor?:     string | null
                    previous_cursor?: string | null
                }>()
        )

        return {
            messages:       page.messages,
            nextCursor:     normalizeCursor(page.next_cursor),
            previousCursor: normalizeCursor(page.previous_cursor),
        }
    }

    /**
     * 대화에 메시지를 보낸다. 여러 개를 한 번에 보낼 수 있다.
     * 반환된 메시지의 `status`로 전송 결과를 확인한다.
     */
    async function sendChatMessages(opts: {
        cookie:         RobloxCookie
        conversationId: string
        contents:       string[]
    }): Promise<RobloxChatMessage[]> {
        const { cookie, conversationId, contents } = opts
        if (contents.length === 0) return []

        const client = buildChatApi(cookie)

        const result = await chatApiRateLimiter(() =>
            client
                .path('send-messages')
                .body('overwrite', {
                    conversation_id: conversationId,
                    messages:        contents.map(content => ({ content })),
                })
                .middlewares(validate(RobloxChatSendResultSchema))
                .request<{ messages: RobloxChatMessage[] }>()
        )

        return result.messages
    }

    /** 한 대화에 단일 메시지를 보내는 간편 함수. */
    async function sendChatMessage(opts: {
        cookie:         RobloxCookie
        conversationId: string
        content:        string
    }): Promise<RobloxChatMessage | null> {
        const [sent] = await sendChatMessages({
            cookie:         opts.cookie,
            conversationId: opts.conversationId,
            contents:       [opts.content],
        })
        return sent ?? null
    }

    /**
     * 계정의 채팅 설정/기능 플래그를 조회한다 (채팅 가능 여부, 프라이버시 설정,
     * 타이핑 throttle 값 등). `userId`는 선택이며, 넘기든 안 넘기든 인증 계정
     * 기준 설정이 온다. 서버 측 피처 플래그라 문서화된 필드 외에도 값이 많다.
     */
    async function chatMetadata(opts: {
        cookie:  RobloxCookie
        userId?: RobloxUserId
    }): Promise<RobloxChatMetadata> {
        const { cookie, userId } = opts
        const client = buildChatApi(cookie)

        const query: Record<string, number> = {}
        if (userId != null) query.userId = userId

        return chatApiRateLimiter(() =>
            client
                .path('metadata')
                .query(query)
                .middlewares(validate(RobloxChatMetadataSchema))
                .request<RobloxChatMetadata>()
        )
    }

    return { chatConversations, chatMessages, sendChatMessages, sendChatMessage, chatMetadata }
}
