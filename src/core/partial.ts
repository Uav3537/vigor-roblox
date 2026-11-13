import { RobloxError, toRobloxError, type RobloxItemError } from "./error"

export type { RobloxItemError }

/** null(없는 대상, 실패한 항목)을 뺀다 */
export const found = <T>(list: readonly (T | null)[]) => list.filter((x): x is T => x !== null)

/** 항목마다 따로 기다린다. 실패한 항목은 null로 두고 에러를 RobloxError로 모은다 */
export async function settle<I, R>(inputs: readonly I[], load: (input: I) => Promise<R>): Promise<{ values: (R | null)[], errors: RobloxItemError<I>[] }> {
    const settled = await Promise.allSettled(inputs.map(input => load(input)))
    const errors: RobloxItemError<I>[] = []
    const values = settled.map((s, i) => {
        if (s.status === "fulfilled") return s.value
        errors.push({ input: inputs[i], error: toRobloxError(s.reason) })
        return null
    })
    return { values, errors }
}

/**
 * 실패한 항목이 있으면 `PARTIAL`을 던지고, 없으면 결과를 돌려준다.
 * `data.results`는 실패한 항목을 뺀 결과(입력 순서)이고, `cause`는 첫 번째 항목의 에러다.
 */
export function finish<R>(results: R[], errors: readonly RobloxItemError[]): R[] {
    if (errors.length) throw new RobloxError("PARTIAL", { results, errors: [...errors] }, { cause: errors[0].error })
    return results
}

/** 다른 배열 메서드의 결과를 받는다. 일부 실패면 성공한 결과와 에러를 나눠 주고, 그 밖의 에러는 그대로 던진다 */
export async function partial<R>(promise: Promise<R[]>): Promise<{ results: R[], errors: RobloxItemError[] }> {
    try {
        return { results: await promise, errors: [] }
    } catch (error) {
        if (error instanceof RobloxError && error.code === "PARTIAL") {
            const { results, errors } = (error as RobloxError<"PARTIAL">).data
            return { results: results as R[], errors }
        }
        throw error
    }
}

/** 곁들이는 데이터(아이콘, 투표 등). 실패해도 주 결과를 막지 않도록 받은 만큼만 쓰고, 다 실패하면 `fallback` */
export async function extra<R>(promise: Promise<R[]>, fallback: R[] = []): Promise<R[]> {
    try {
        return await promise
    } catch (error) {
        return error instanceof RobloxError && error.code === "PARTIAL" ? (error as RobloxError<"PARTIAL">).data.results as R[] : fallback
    }
}
