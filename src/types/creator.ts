import z from "zod";
import { RobloxGroupIdSchema, type RobloxGroupId } from "./common";
import { RobloxUserIdSchema, type RobloxUserId } from "./users";

/**
 * 유저나 그룹을 가리키는 참조(게임 제작자, 그룹 소유자 등). `type`으로 좁히면 `id`가 브랜드 타입이 된다.
 * Roblox가 문자열("User")로도 숫자 enum(1)으로도 주므로 둘 다 받는다. 그 밖의 값은 `"Unknown"`이고 원래 값은 `rawType`에 남는다.
 *
 * ```ts
 * if (game.creator.type === "Group") groups.getGroups([game.creator.id])   // id: RobloxGroupId
 * ```
 */
export type RobloxCreator =
    | { type: "User", id: RobloxUserId }
    | { type: "Group", id: RobloxGroupId }
    | { type: "Unknown", id: number, rawType: string | number }

export type RobloxCreatorType = RobloxCreator["type"]

/** 응답의 `type` 값 → 판별자 */
const TYPES: Record<string, "User" | "Group"> = { User: "User", Group: "Group", "1": "User", "2": "Group" }

/** 응답의 id와 type을 `RobloxCreator`로 바꾼다. id가 브랜드 조건(양의 정수)에 맞지 않으면 `"Unknown"`이다 */
export function toRobloxCreator(id: number, type: string | number): RobloxCreator {
    const kind = TYPES[String(type)]
    if (kind === "User") {
        const parsed = RobloxUserIdSchema.safeParse(id)
        if (parsed.success) return { type: "User", id: parsed.data }
    }
    if (kind === "Group") {
        const parsed = RobloxGroupIdSchema.safeParse(id)
        if (parsed.success) return { type: "Group", id: parsed.data }
    }
    return { type: "Unknown", id, rawType: type }
}

/** 응답의 `{ id, type }`(나머지 필드는 그대로)를 `RobloxCreator`와 합친 모양으로 바꾸는 스키마 */
export function RobloxCreatorSchema<S extends z.ZodRawShape = {}>(extra: S = {} as S) {
    return z.object({ id: z.number(), type: z.union([z.string(), z.number()]), ...extra })
        .transform(value => {
            // S가 제네릭이라 zod가 출력 모양을 좁히지 못한다
            const { id, type, ...rest } = value as { id: number, type: string | number }
            return { ...rest, ...toRobloxCreator(id, type) } as RobloxCreator & Omit<z.output<z.ZodObject<S>>, "id" | "type">
        })
}
