import { findInVigorErrorChain, isVigorFetchError } from "vigor-fetch"
import { z } from "zod"

/** One entry of a Roblox error body (`{ errors: [{ code, message }] }`) */
export type RobloxApiError = { code: number | string | null, message: string }

/** Why one item of an array call failed. `input` is the value passed to the method, as is */
export type RobloxItemError<I = unknown> = { input: I, error: RobloxError }

export const RobloxErrorMessageFuncs = {
    /** The request failed after its retries, on its last available endpoint */
    HTTP_FAILED: ({ status, url, robloxErrors }: { status: number, url: string, robloxErrors: RobloxApiError[], parsed: unknown, response: Response }) =>
        `${status} from ${url}${robloxErrors.length ? `: ${robloxErrors.map(e => e.message).join(", ")}` : ""}`,
    /** The request did not finish in time */
    TIMED_OUT: ({ limit }: { limit: number }) => `Timed out after ${limit}ms`,
    /** The response did not match the expected shape. Roblox may have changed the API */
    INVALID_RESPONSE: ({ issues, url }: { issues: z.core.$ZodIssue[], url: string | null }) => `Unexpected response shape${url ? ` from ${url}` : ""}: ${z.prettifyError({ issues } as z.ZodError).replace(/\n/g, " ")}`,
    /** Some items of an array call failed. `results` holds the rest, in input order */
    PARTIAL: ({ results, errors }: { results: unknown[], errors: RobloxItemError[] }) => `${errors.length} item(s) failed (${results.length} succeeded)`,
    /** The API answers for one account, but the client rotates cookies */
    VIEWER_REQUIRED: (_: {}) => "This API answers for the requesting account. Pin an account with .as(cookie) instead of rotating cookies",
    /** The API needs a signed-in account */
    AUTH_REQUIRED: ({ reason }: { reason: string }) => `Authentication required: ${reason}`,
    /** Server locations need `.geolocation(fn)` */
    GEOLOCATION_REQUIRED: (_: {}) => "Looking up server locations needs an IP-to-location callback set with .geolocation(fn)",
    /** No endpoint could take or answer this request */
    NO_ROUTE: ({ target }: { target: unknown }) => `No endpoint could answer ${JSON.stringify(target)}`,
    /** Anything else: a network failure, a callback that threw, ... The original is `cause` */
    UNKNOWN: (_: {}) => "Request failed",
} as const

export type RobloxErrorCode = keyof typeof RobloxErrorMessageFuncs
export type RobloxErrorData<C extends RobloxErrorCode> = Parameters<typeof RobloxErrorMessageFuncs[C]>[0]

/**
 * Every error the library throws. `code` says what went wrong and narrows `data`.
 * The original error (vigor-fetch, zod, ...) is kept as `cause`.
 */
export class RobloxError<C extends RobloxErrorCode = RobloxErrorCode> extends Error {
    override readonly name = "RobloxError"
    readonly code: C
    readonly data: RobloxErrorData<C>

    constructor(code: C, data: RobloxErrorData<C>, options: { cause?: unknown } = {}) {
        const message = (RobloxErrorMessageFuncs[code] as (data: RobloxErrorData<C>) => string)(data)
        super(`[${code}] ${message}`, { cause: options.cause })
        this.code = code
        this.data = data
    }
}

/** Each code as its own union member, so narrowing `code` narrows `data` */
export type RobloxErrors<C extends RobloxErrorCode = RobloxErrorCode> = { [K in C]: RobloxError<K> }[C]

/**
 * Narrows `error` to a `RobloxError`, optionally with one of `codes`.
 *
 * With a `callback` as the third argument (the code, or an array of codes, as the second),
 * it also looks inside the errors `error` wraps (`cause`, and the errors vigor-fetch wraps),
 * and calls `callback` with the first match. Returns what `callback` returns, or `undefined`.
 *
 * @example
 * if (isRobloxError(error, "HTTP_FAILED")) error.data.status
 * isRobloxError(error, "HTTP_FAILED", e => e.data.status) // number | undefined
 */
export function isRobloxError<const C extends RobloxErrorCode, R>(error: unknown, codes: C | readonly [C, ...C[]], callback: (error: RobloxErrors<C>) => R): R | undefined
export function isRobloxError(error: unknown): error is RobloxErrors
export function isRobloxError<const C extends RobloxErrorCode>(error: unknown, ...codes: [C, ...C[]]): error is RobloxErrors<C>
export function isRobloxError(error: unknown, ...args: unknown[]): any {
    const is = (e: unknown, codes: readonly unknown[]) => e instanceof RobloxError && (codes.length === 0 || codes.includes(e.code))
    const callback = args[args.length - 1]
    if (typeof callback !== "function") return is(error, args)
    const codes: readonly unknown[] = Array.isArray(args[0]) ? args[0] : [args[0]]
    const found = findInVigorErrorChain(error, e => is(e, codes))
    return found === undefined ? undefined : callback(found)
}

/** Roblox error body entries, or none */
function robloxErrors(parsed: unknown): RobloxApiError[] {
    const errors = (parsed as { errors?: unknown } | null)?.errors
    if (!Array.isArray(errors)) return []
    return errors.map(e => {
        const { code, message } = (e ?? {}) as { code?: unknown, message?: unknown }
        return {
            code:    typeof code === "number" || typeof code === "string" ? code : null,
            message: typeof message === "string" ? message : "",
        }
    })
}

/**
 * Turns anything the library caught into a `RobloxError`. A `RobloxError` anywhere in the chain is used as is,
 * then the HTTP failure, then a timeout. Anything else becomes `UNKNOWN`. The original is kept as `cause`.
 */
export function toRobloxError(error: unknown): RobloxError {
    const inner = findInVigorErrorChain(error, e => e instanceof RobloxError)
    if (inner) return inner as RobloxError

    const http = isVigorFetchError(error, "FETCH_FAILED", e => new RobloxError("HTTP_FAILED", {
        status:       e.data.status,
        url:          e.data.url || e.context.href,
        robloxErrors: robloxErrors(e.data.parsed),
        parsed:       e.data.parsed,
        response:     e.data.response,
    }, { cause: error }))
    if (http) return http

    const timeout = isVigorFetchError(error, "TIMED_OUT", e => new RobloxError("TIMED_OUT", { limit: e.data.limit }, { cause: error }))
    if (timeout) return timeout

    const zod = findInVigorErrorChain(error, e => e instanceof z.ZodError) as z.ZodError | undefined
    if (zod) return new RobloxError("INVALID_RESPONSE", { issues: zod.issues, url: null }, { cause: error })
    return new RobloxError("UNKNOWN", {}, { cause: error })
}

/**
 * Wraps a service object so every method's error leaves as a `RobloxError`.
 * Only calls from outside go through the wrapper: methods still run with the real object as `this`,
 * so the library's own code keeps seeing the original errors.
 */
export function withRobloxErrors<T extends object>(target: T): T {
    const wrappers = new Map<PropertyKey, Function>()
    return new Proxy(target, {
        get(obj, prop) {
            const value = Reflect.get(obj, prop, obj)
            if (typeof value !== "function" || prop === "constructor") return value
            let wrapper = wrappers.get(prop)
            if (!wrapper) {
                wrapper = (...args: unknown[]) => {
                    try {
                        const result = value.apply(obj, args)
                        return result instanceof Promise ? result.catch(e => { throw toRobloxError(e) }) : result
                    } catch (e) {
                        throw toRobloxError(e)
                    }
                }
                wrappers.set(prop, wrapper)
            }
            return wrapper
        },
    })
}
