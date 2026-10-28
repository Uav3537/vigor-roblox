/** 실패한 항목 하나. `input`은 메서드에 넘긴 값 그대로다 */
export type RobloxItemError<I = unknown> = { input: I, error: unknown }

/**
 * 배열을 받는 메서드에서 일부 항목이 실패했다. 성공한 항목은 버리지 않는다.
 * `results`는 실패한 항목을 뺀 결과로, 실패가 없었을 때 돌려줬을 모양과 같다 (입력 순서).
 * `cause`는 첫 번째 에러라 `findFetchFailed(error)`로 HTTP 실패를 그대로 찾을 수 있다.
 */
export class RobloxPartialError<R = unknown, I = unknown> extends Error {
    override readonly name = "RobloxPartialError"

    constructor(readonly results: R[], readonly errors: RobloxItemError<I>[]) {
        super(`${errors.length}개 항목을 받지 못했다 (성공 ${results.length}개)`, { cause: errors[0]?.error })
    }
}

export function isRobloxPartialError(error: unknown): error is RobloxPartialError {
    return error instanceof RobloxPartialError
}

/** null(없는 대상, 실패한 항목)을 뺀다 */
export const found = <T>(list: readonly (T | null)[]) => list.filter((x): x is T => x !== null)

/** 항목마다 따로 기다린다. 실패한 항목은 null로 두고 에러를 모은다 */
export async function settle<I, R>(inputs: readonly I[], load: (input: I) => Promise<R>): Promise<{ values: (R | null)[], errors: RobloxItemError<I>[] }> {
    const settled = await Promise.allSettled(inputs.map(input => load(input)))
    const errors: RobloxItemError<I>[] = []
    const values = settled.map((s, i) => {
        if (s.status === "fulfilled") return s.value
        errors.push({ input: inputs[i], error: s.reason })
        return null
    })
    return { values, errors }
}

/** 실패한 항목이 있으면 결과를 담아 던지고, 없으면 결과를 돌려준다 */
export function finish<R>(results: R[], errors: readonly RobloxItemError[]): R[] {
    if (errors.length) throw new RobloxPartialError(results, [...errors])
    return results
}

/** 다른 배열 메서드의 결과를 받는다. 일부 실패면 성공한 결과와 에러를 나눠 주고, 그 밖의 에러는 그대로 던진다 */
export async function partial<R>(promise: Promise<R[]>): Promise<{ results: R[], errors: RobloxItemError[] }> {
    try {
        return { results: await promise, errors: [] }
    } catch (error) {
        if (error instanceof RobloxPartialError) return { results: error.results as R[], errors: error.errors }
        throw error
    }
}

/** 곁들이는 데이터(아이콘, 투표 등). 실패해도 주 결과를 막지 않도록 받은 만큼만 쓰고, 다 실패하면 `fallback` */
export async function extra<R>(promise: Promise<R[]>, fallback: R[] = []): Promise<R[]> {
    try {
        return await promise
    } catch (error) {
        return error instanceof RobloxPartialError ? error.results as R[] : fallback
    }
}
