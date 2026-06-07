'use strict';

const VigorErrorMessageFuncs = {
    INVALID_TARGET: ({ expected, received }) => `Invalid Task: ${typeof received} (expected: ${expected.join(', ')})`,
    EXHAUSTED: ({ maxAttempts }) => `Retry exhausted, (max ${maxAttempts})`,
    TIMED_OUT: ({ limit, attempt }) => `Timeout: exceeded ${limit}ms (attempt: ${attempt})`,
    INVALID_CONTENT_TYPE: ({ expected, received, response }) => `Invalid Content Type Header: ${typeof received} (expected: ${expected.join(', ')})`,
    PARSER_NOT_FOUND: ({ expected, received, response }) => `Parser Not Found For Header: ${typeof received} (expected: ${expected.join(', ')})`,
    PARSER_ALL_FAILED: ({ tried, response }) => `All Parser Failed, Tried: ${tried.join(', ')}`,
    INVALID_PROTOCOL: ({ expected, received }) => `Invalid Protocol: ${typeof received} (expected: ${expected.join(', ')})`,
    INVALID_BODY: ({ expected, received }) => `Invalid Body: ${typeof received} (expected: ${expected.join(', ')})`,
    FETCH_FAILED: ({ status, response, url, headers, body, statusText }) => `Fetch Failed: ${status}`,
    EMPTY_TARGET: ({}) => `Empty Body`
};
class VigorError extends Error {
    timestamp = new Date();
    cause;
    code;
    data;
    method;
    stats;
    context;
    constructor(code, options) {
        const messageFn = VigorErrorMessageFuncs[code];
        const message = `[${code}] ${messageFn(options?.data)}`;
        super(message, { cause: options?.cause });
        this.name = new.target.name;
        this.code = code;
        this.cause = options.cause;
        this.data = options.data;
        this.method = options.method;
        this.stats = options.stats;
        this.context = options.context;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace?.(this, new.target);
    }
}
class VigorRetryError extends VigorError {
    constructor(code, options) {
        super(code, options);
    }
}
class VigorParseError extends VigorError {
    constructor(code, options) {
        super(code, options);
    }
}
class VigorFetchError extends VigorError {
    constructor(code, options) {
        super(code, options);
    }
}
class VigorAllError extends VigorError {
    constructor(code, options) {
        super(code, options);
    }
}
class VigorStatus {
    _base;
    ctor;
    _config;
    constructor(config = {}, _base, ctor) {
        this._base = _base;
        this.ctor = ctor;
        this._config = { ...this._base, ...(config || {}) };
    }
    _mergeConfig(source, target) {
        const isPlainObject = (val) => val !== null && typeof val === 'object' && Object.getPrototypeOf(val) === Object.prototype;
        if (target === undefined || target === null) {
            return source;
        }
        if (isPlainObject(source) && isPlainObject(target)) {
            const result = { ...source };
            Object.keys(target).forEach((key) => {
                result[key] = this._mergeConfig(result[key], target[key]);
            });
            return result;
        }
        if (Array.isArray(source) && Array.isArray(target)) {
            return [...source, ...target];
        }
        return target;
    }
    _next(config) { return this.ctor(this._mergeConfig(this._config, config)); }
    _getConfig() { return this._config; }
    _getBase() { return this._base; }
}
const VigorDefault = Symbol("DEFAULT");
class VigorRetrySettings extends VigorStatus {
    constructor(config) {
        const base = {
            default: VigorDefault,
            timeout: 20 * 1000,
            attempt: 5,
            jitter: 1000
        };
        super(config, base, (c) => new VigorRetrySettings(c));
    }
    default(unk) { return this._next({ default: unk }); }
    timeout(num) { return this._next({ timeout: num }); }
    attempt(num) { return this._next({ attempt: num }); }
    jitter(num) { return this._next({ jitter: num }); }
}
class VigorRetryInterceptors extends VigorStatus {
    constructor(config) {
        const base = {
            before: [],
            after: [],
            result: [],
            retryIf: [],
            onRetry: [],
            onError: []
        };
        super(config, base, (c) => new VigorRetryInterceptors(c));
    }
    before(...funcs) { return this._next({ before: funcs.flat() }); }
    after(...funcs) { return this._next({ after: funcs.flat() }); }
    result(...funcs) { return this._next({ result: funcs.flat() }); }
    retryIf(...funcs) { return this._next({ retryIf: funcs.flat() }); }
    onRetry(...funcs) { return this._next({ onRetry: funcs.flat() }); }
    onError(...funcs) { return this._next({ onError: funcs.flat() }); }
}
class VigorRetryAlgorithmsConstant extends VigorStatus {
    constructor(config) {
        const base = {
            interval: 2000
        };
        super(config, base, (c) => new VigorRetryAlgorithmsConstant(c));
    }
    interval(num) { return this._next({ interval: num }); }
    _calculateDelay(attempt) {
        return this._config.interval;
    }
}
class VigorRetryAlgorithmsLinear extends VigorStatus {
    constructor(config) {
        const base = {
            initial: 1000,
            increment: 1000,
            minDelay: 500,
            maxDelay: 20 * 1000
        };
        super(config, base, (c) => new VigorRetryAlgorithmsLinear(c));
    }
    initial(num) { return this._next({ initial: num }); }
    increment(num) { return this._next({ increment: num }); }
    minDelay(num) { return this._next({ minDelay: num }); }
    maxDelay(num) { return this._next({ maxDelay: num }); }
    _calculateDelay(attempt) {
        const { initial, increment, minDelay, maxDelay } = this._config;
        return Math.max(minDelay, Math.min(maxDelay, initial + increment * attempt));
    }
}
class VigorRetryAlgorithmsBackoff extends VigorStatus {
    constructor(config) {
        const base = {
            initial: 1000,
            multiplier: 1.7,
            unit: 1000,
            minDelay: 500,
            maxDelay: 20 * 1000
        };
        super(config, base, (c) => new VigorRetryAlgorithmsBackoff(c));
    }
    initial(num) { return this._next({ initial: num }); }
    multiplier(num) { return this._next({ multiplier: num }); }
    unit(num) { return this._next({ unit: num }); }
    minDelay(num) { return this._next({ minDelay: num }); }
    maxDelay(num) { return this._next({ maxDelay: num }); }
    _calculateDelay(attempt) {
        const { initial, multiplier, unit, minDelay, maxDelay } = this._config;
        return Math.max(minDelay, Math.min(maxDelay, initial + unit * Math.pow(multiplier, attempt)));
    }
}
class VigorRetryAlgorithmsCustom extends VigorStatus {
    constructor(config) {
        const base = {
            func: (attempt) => attempt * 1000,
            minDelay: 500,
            maxDelay: 20 * 1000
        };
        super(config, base, (c) => new VigorRetryAlgorithmsCustom(c));
    }
    func(num) { return this._next({ func: num }); }
    _calculateDelay(attempt) {
        const { func, minDelay, maxDelay } = this._config;
        return Math.max(minDelay, Math.min(maxDelay, func(attempt)));
    }
}
class VigorRetry extends VigorStatus {
    constructor(config) {
        const base = {
            target: VigorDefault,
            settings: new VigorRetrySettings()._getBase(),
            interceptors: new VigorRetryInterceptors()._getBase(),
            algorithm: (attempt) => new VigorRetryAlgorithmsBackoff()._calculateDelay(attempt),
            abortSignals: []
        };
        super(config, base, (c) => new VigorRetry(c));
    }
    RetryAlgorithms = {
        constant: (config) => new VigorRetryAlgorithmsConstant(config),
        linear: (config) => new VigorRetryAlgorithmsLinear(config),
        backoff: (config) => new VigorRetryAlgorithmsBackoff(config),
        custom: (config) => new VigorRetryAlgorithmsCustom(config)
    };
    _createTimelineHandler(timeline) {
        return (action, content) => {
            timeline.push({
                action: action,
                content: content,
                time: Date.now()
            });
        };
    }
    _createInterceptorHandler(ctx, addTimeline) {
        return async (interceptorType, api) => {
            const interceptorsConfig = ctx["stats"]["interceptors"];
            const interceptors = interceptorsConfig[interceptorType];
            addTimeline("INTERCEPTOR_LOOP_STARTED", {
                interceptorType: interceptorType,
                interceptors,
            });
            const startTime = performance.now();
            for (const func of interceptors) {
                const scopedApi = api(interceptorType, func);
                await func(ctx, scopedApi);
            }
            const endTime = performance.now();
            addTimeline("INTERCEPTOR_LOOP_ENDED", {
                interceptorType: interceptorType,
                interceptors,
                took: endTime - startTime
            });
        };
    }
    target(func) { return this._next({ target: func }); }
    settings(func) {
        if (func instanceof VigorRetrySettings) {
            return this._next({ settings: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ settings: func(new VigorRetrySettings(this._config.settings))._getConfig() });
        }
        return this._next({ settings: func });
    }
    interceptors(func) {
        if (func instanceof VigorRetryInterceptors) {
            return this._next({ interceptors: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ interceptors: func(new VigorRetryInterceptors(this._config.interceptors))._getConfig() });
        }
        return this._next({ interceptors: func });
    }
    algorithms(func) {
        const instance = func(this.RetryAlgorithms);
        return this._next({ algorithm: (attempt) => instance._calculateDelay(attempt) });
    }
    abortSignals(...abortSignals) {
        return this._next({ abortSignals: abortSignals.flat() });
    }
    async request(config, timeline = []) {
        const stats = this._mergeConfig(this._config, config);
        let ctx = {
            result: VigorDefault,
            error: VigorDefault,
            attempt: 0,
            delay: 0,
            controller: VigorDefault,
            timeline: timeline,
            stats,
            flag: {
                broke: false,
                overwritten: false,
                restarted: false
            }
        };
        const addTimeline = this._createTimelineHandler(ctx.timeline);
        const handleInterceptor = this._createInterceptorHandler(ctx, addTimeline);
        addTimeline("PROCESS_HANDLING", {
            type: "REQUEST_START",
            data: {}
        });
        try {
            if (typeof stats.target !== 'function')
                throw new VigorRetryError("INVALID_TARGET", {
                    method: "request",
                    data: {
                        expected: ["function"],
                        received: stats.target
                    },
                    stats: stats,
                    context: ctx
                });
            while (ctx.attempt < stats.settings.attempt) {
                ctx.attempt++;
                addTimeline("ATTEMPT_INCREASED", {
                    attempt: ctx.attempt
                });
                try {
                    addTimeline("PROCESS_HANDLING", {
                        type: "RETRY_START",
                        data: {}
                    });
                    const controller = new AbortController();
                    const timeoutController = new AbortController();
                    const signal = AbortSignal.any([controller.signal, timeoutController.signal, ...stats.abortSignals]);
                    await handleInterceptor("before", (interceptorType, func) => ({
                        abort: (error) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "abort",
                                args: [error]
                            });
                            controller.abort(error);
                            throw error;
                        },
                        breakRetry: (error) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "breakRetry",
                                args: [error]
                            });
                            ctx.flag.broke = true;
                            throw error;
                        },
                        throwError: (error) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "throwError",
                                args: [error]
                            });
                            throw error;
                        }
                    }));
                    const timeoutTimer = setTimeout(() => {
                        clearTimeout(timeoutTimer);
                        timeoutController.abort(new VigorRetryError("TIMED_OUT", {
                            method: "request",
                            data: {
                                limit: stats.settings.timeout,
                                attempt: ctx.attempt
                            },
                        }));
                    }, stats.settings.timeout);
                    signal.throwIfAborted();
                    let onAbort;
                    try {
                        addTimeline("TARGET_REQUEST_STARTED", {
                            target: stats.target
                        });
                        const abort = (error) => {
                            addTimeline("TARGET_API_CALLED", {
                                target: stats.target,
                                method: "abort"
                            });
                            controller.abort(error);
                            throw error;
                        };
                        const started = performance.now();
                        ctx.result = await Promise.race([
                            stats.target(ctx, { abort, signal }),
                            new Promise((_, rej) => {
                                onAbort = () => rej(signal.reason);
                                signal.addEventListener("abort", onAbort);
                            })
                        ]);
                        const endTime = performance.now();
                        addTimeline("TARGET_REQUEST_ENDED", {
                            target: stats.target,
                            took: endTime - started
                        });
                    }
                    finally {
                        clearTimeout(timeoutTimer);
                        if (onAbort)
                            signal.removeEventListener("abort", onAbort);
                    }
                    await handleInterceptor("after", (interceptorType, func) => ({
                        setResult: (unknown) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "setResult",
                                args: [unknown]
                            });
                            ctx.result = unknown;
                            return unknown;
                        },
                        throwError: (error) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "throwError",
                                args: [error]
                            });
                            throw error;
                        },
                        breakRetry: (error) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "breakRetry",
                                args: [error]
                            });
                            ctx.flag.broke = true;
                            throw error;
                        },
                    }));
                    await handleInterceptor("result", (interceptorType, func) => ({
                        setResult: (unknown) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "setResult",
                                args: [unknown]
                            });
                            ctx.result = unknown;
                            return unknown;
                        },
                        throwError: (error) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "throwError",
                                args: [error]
                            });
                            throw error;
                        },
                    }));
                    return ctx.result;
                }
                catch (error) {
                    ctx.error = error;
                    addTimeline("PROCESS_HANDLING", {
                        type: "RETRY_ERROR",
                        data: {
                            error
                        }
                    });
                    if (ctx.flag.broke)
                        throw error;
                    let proceed = true;
                    await handleInterceptor("retryIf", (interceptorType, func) => ({
                        proceedRetry: () => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "proceedRetry",
                                args: []
                            });
                            return proceed = true;
                        },
                        cancelRetry: () => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "cancelRetry",
                                args: []
                            });
                            return proceed = false;
                        }
                    }));
                    if (!proceed)
                        throw error;
                    ctx.delay = VigorDefault;
                    await handleInterceptor("onRetry", (interceptorType, func) => ({
                        throwError: (error) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "throwError",
                                args: [error]
                            });
                            throw error;
                        },
                        setDelay: (number) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "setDelay",
                                args: [number]
                            });
                            return ctx.delay = number;
                        },
                        setAttempt: (number) => {
                            addTimeline("INTERCEPTOR_API_CALLED", {
                                interceptorType,
                                interceptor: func,
                                method: "setAttempt",
                                args: [number]
                            });
                            return ctx.attempt = number;
                        }
                    }));
                    if (typeof ctx.delay !== 'number')
                        ctx.delay = stats.algorithm(ctx.attempt) + Math.random() * stats.settings.jitter;
                    const delay = ctx.delay;
                    await new Promise(r => setTimeout(r, delay));
                }
            }
            throw new VigorRetryError("EXHAUSTED", {
                method: "request",
                data: {
                    maxAttempts: stats.settings.attempt,
                },
                context: ctx
            });
        }
        catch (error) {
            ctx.error = error;
            addTimeline("PROCESS_HANDLING", {
                type: "REQUEST_ERROR",
                data: {
                    error
                }
            });
            await handleInterceptor("onError", (interceptorType, func) => ({
                setResult: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setResult",
                        args: [unknown]
                    });
                    ctx.result = unknown;
                    ctx.flag.overwritten = true;
                    return unknown;
                },
                throwError: (error) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
                restart: () => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "restart",
                        args: []
                    });
                    ctx.flag.restarted = true;
                }
            }));
            if (ctx.flag.restarted) {
                return await this.request(stats, ctx.timeline);
            }
            if (ctx.flag.overwritten)
                return ctx.result;
            if (stats.settings.default !== VigorDefault)
                return stats.settings.default;
            throw error;
        }
    }
}
class VigorParseSettings extends VigorStatus {
    constructor(config) {
        const base = {
            raw: false,
            default: VigorDefault
        };
        super(config, base, (c) => new VigorParseSettings(c));
    }
    original(bool) { return this._next({ raw: bool }); }
    default(unk) { return this._next({ default: unk }); }
}
class VigorParseStrategies extends VigorStatus {
    constructor(config) {
        const base = {
            funcs: []
        };
        super(config, base, (c) => new VigorParseStrategies(c));
    }
    ParseAutoHeaders = [
        { header: "application/json", regExp: /application\/(.+\+)?json(.+\+)?/i, method: (res) => res.json() },
        { header: "application/xml", regExp: /application\/(.+\+)?xml(.+\+)?/i, method: (res) => res.text() },
        { header: "application/x-www-form-urlencoded", regExp: /application\/(.+\+)?x-www-form-urlencoded(.+\+)?/i, method: (res) => res.formData() },
        { header: "application/octet-stream", regExp: /application\/(.+\+)?octet-stream(.+\+)?/i, method: (res) => res.arrayBuffer() },
        { header: "image/*", regExp: /^image\/.+/i, method: (res) => res.blob() },
        { header: "audio/*", regExp: /^audio\/.+/i, method: (res) => res.blob() },
        { header: "video/*", regExp: /^video\/.+/i, method: (res) => res.blob() },
        { header: "multipart/form-data", regExp: /multipart\/(.+\+)?form-data(.+\+)?/i, method: (res) => res.formData() },
        { header: "text/*", regExp: /^text\/.+/i, method: (res) => res.text() },
    ];
    ParseAutoMethods = [
        { title: "json", method: (res) => res.json() },
        { title: "formData", method: (res) => res.formData() },
        { title: "text", method: (res) => res.text() },
        { title: "blob", method: (res) => res.blob() },
    ];
    ParseAutoAlgorithms = {
        contentType: async (response) => {
            const parsers = this.ParseAutoHeaders;
            const contentTypeHeader = response.headers.get("content-type");
            if (!contentTypeHeader)
                throw new VigorParseError("INVALID_CONTENT_TYPE", {
                    method: "ParseAutoAlgorithms.contentType",
                    data: {
                        expected: ["string"],
                        received: contentTypeHeader,
                        response: response
                    }
                });
            const toDo = parsers.find(parser => parser.regExp.test(contentTypeHeader));
            if (!toDo)
                throw new VigorParseError("PARSER_NOT_FOUND", {
                    method: "ParseAutoAlgorithms.contentType",
                    data: {
                        expected: parsers.map(parser => parser.header),
                        received: contentTypeHeader,
                        response: response
                    }
                });
            return await toDo.method(response);
        },
        sniff: async (response) => {
            const parsers = this.ParseAutoMethods;
            for (const [i, parser] of parsers.entries()) {
                const cloned = (i === parsers.length - 1)
                    ? response
                    : response.clone();
                try {
                    const data = await parser.method(cloned);
                    return data;
                }
                catch { }
            }
            throw new VigorParseError("PARSER_ALL_FAILED", {
                method: "ParseAutoAlgorithms.sniff",
                data: {
                    tried: parsers.map(parser => parser.title),
                    response: response
                }
            });
        }
    };
    contentType() { return this._next({ funcs: [this.ParseAutoAlgorithms.contentType] }); }
    sniff() { return this._next({ funcs: [this.ParseAutoAlgorithms.sniff] }); }
    json() { return this._next({ funcs: [(res) => res.json()] }); }
    text() { return this._next({ funcs: [(res) => res.text()] }); }
    arrayBuffer() { return this._next({ funcs: [(res) => res.arrayBuffer()] }); }
    blob() { return this._next({ funcs: [(res) => res.blob()] }); }
    bytes() { return this._next({ funcs: [(res) => res.arrayBuffer().then(r => new Uint8Array(r))] }); }
    formData() { return this._next({ funcs: [(res) => res.formData()] }); }
}
class VigorParseInterceptors extends VigorStatus {
    constructor(config) {
        const base = {
            before: [],
            after: [],
            result: [],
            onError: []
        };
        super(config, base, (c) => new VigorParseInterceptors(c));
    }
    before(...funcs) { return this._next({ before: funcs.flat() }); }
    after(...funcs) { return this._next({ after: funcs.flat() }); }
    result(...funcs) { return this._next({ result: funcs.flat() }); }
    onError(...funcs) { return this._next({ onError: funcs.flat() }); }
}
class VigorParse extends VigorStatus {
    constructor(config) {
        const base = {
            target: VigorDefault,
            settings: new VigorParseSettings()._getBase(),
            strategies: new VigorParseStrategies()._getBase(),
            interceptors: new VigorParseInterceptors()._getBase()
        };
        super(config, base, (c) => new VigorParse(c));
    }
    _createTimelineHandler(timeline) {
        return (action, content) => {
            timeline.push({
                action: action,
                content: content,
                time: Date.now()
            });
        };
    }
    _createInterceptorHandler(ctx, addTimeline) {
        return async (interceptorType, api) => {
            const interceptorsConfig = ctx["stats"]["interceptors"];
            const interceptors = interceptorsConfig[interceptorType];
            addTimeline("INTERCEPTOR_LOOP_STARTED", {
                interceptorType: interceptorType,
                interceptors,
            });
            const startTime = performance.now();
            for (const func of interceptors) {
                const scopedApi = api(interceptorType, func);
                await func(ctx, scopedApi);
            }
            const endTime = performance.now();
            addTimeline("INTERCEPTOR_LOOP_ENDED", {
                interceptorType: interceptorType,
                interceptors,
                took: endTime - startTime
            });
        };
    }
    target(response) { return this._next({ target: response }); }
    settings(func) {
        if (func instanceof VigorParseSettings) {
            return this._next({ settings: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ settings: func(new VigorParseSettings(this._config.settings))._getConfig() });
        }
        return this._next({ settings: func });
    }
    strategies(func) {
        if (func instanceof VigorParseStrategies) {
            return this._next({ strategies: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ strategies: func(new VigorParseStrategies(this._config.strategies))._getConfig() });
        }
        return this._next({ strategies: func });
    }
    interceptors(func) {
        if (func instanceof VigorParseInterceptors) {
            return this._next({ interceptors: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ interceptors: func(new VigorParseInterceptors(this._config.interceptors))._getConfig() });
        }
        return this._next({ interceptors: func });
    }
    async request(config, timeline = []) {
        const stats = this._mergeConfig(this._config, config);
        const target = stats.target;
        let ctx = {
            timeline: timeline,
            stats,
            response: target,
            result: VigorDefault,
            error: VigorDefault,
            flag: {
                overwritten: false
            }
        };
        const addTimeline = this._createTimelineHandler(ctx.timeline);
        const handleInterceptor = this._createInterceptorHandler(ctx, addTimeline);
        addTimeline("PROCESS_HANDLING", {
            type: "REQUEST_START",
            data: {}
        });
        try {
            if (target === VigorDefault)
                throw new VigorParseError("INVALID_TARGET", {
                    method: "request",
                    data: {
                        expected: ["Response"],
                        received: target
                    },
                    context: ctx
                });
            await handleInterceptor("before", (interceptorType, func) => ({
                throwError: (error) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
            }));
            if (stats.settings.raw) {
                ctx.result = ctx.response;
            }
            else {
                let parsed = false;
                for (const [i, func] of stats.strategies.funcs.length > 0
                    ? stats.strategies.funcs.entries()
                    : new VigorParseStrategies().contentType()._getConfig().funcs.entries()) {
                    const cloned = (i === stats.strategies.funcs.length - 1)
                        ? ctx.response
                        : ctx.response.clone();
                    try {
                        ctx.result = await func(cloned);
                        parsed = true;
                        break;
                    }
                    catch { }
                }
                if (!parsed)
                    throw new VigorParseError("PARSER_ALL_FAILED", {
                        method: "request",
                        data: {
                            tried: stats.strategies.funcs,
                            response: ctx.response
                        },
                        context: ctx
                    });
            }
            await handleInterceptor("after", (interceptorType, func) => ({
                setResult: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setResult",
                        args: [unknown]
                    });
                    ctx.result = unknown;
                    return unknown;
                },
                throwError: (error) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
            }));
            await handleInterceptor("result", (interceptorType, func) => ({
                setResult: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setResult",
                        args: [unknown]
                    });
                    ctx.result = unknown;
                    return unknown;
                },
                throwError: (error) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
            }));
            return ctx.result;
        }
        catch (error) {
            ctx.error = error;
            addTimeline("PROCESS_HANDLING", {
                type: "REQUEST_ERROR",
                data: {
                    error
                }
            });
            await handleInterceptor("onError", (interceptorType, func) => ({
                setResult: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setResult",
                        args: [unknown]
                    });
                    ctx.result = unknown;
                    ctx.flag.overwritten = true;
                    return unknown;
                },
                throwError: (error) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
            }));
            if (ctx.flag.overwritten)
                return ctx.result;
            if (stats.settings.default !== VigorDefault)
                return stats.settings.default;
            throw error;
        }
    }
}
class VigorFetchSettings extends VigorStatus {
    constructor(config) {
        const base = {
            retryHeaders: ["retry-after", "ratelimit-reset", "x-ratelimit-reset", "x-retry-after", "x-amz-retry-after", "chrome-proxy-next-link"],
            unretryStatus: [400, 401, 403, 404, 405, 413, 422],
            default: VigorDefault
        };
        super(config, base, (c) => new VigorFetchSettings(c));
    }
    retryHeaders(...strs) { return this._next({ retryHeaders: strs.flat() }); }
    unretryStatus(...nums) { return this._next({ unretryStatus: nums.flat() }); }
    default(unk) { return this._next({ default: unk }); }
}
class VigorFetchInterceptors extends VigorStatus {
    constructor(config) {
        const base = {
            before: [],
            after: [],
            result: [],
            onError: []
        };
        super(config, base, (c) => new VigorFetchInterceptors(c));
    }
    before(...funcs) { return this._next({ before: funcs.flat() }); }
    after(...funcs) { return this._next({ after: funcs.flat() }); }
    result(...funcs) { return this._next({ result: funcs.flat() }); }
    onError(...funcs) { return this._next({ onError: funcs.flat() }); }
}
class VigorFetch extends VigorStatus {
    constructor(config) {
        const base = {
            origin: VigorDefault,
            path: [],
            query: [],
            hash: "",
            options: {
                headers: {},
                body: VigorDefault
            },
            settings: new VigorFetchSettings()._getBase(),
            interceptors: new VigorFetchInterceptors()._getBase(),
            retryConfig: new VigorRetry()._getBase(),
            parseConfig: new VigorParse()._getBase()
        };
        super(config, base, (c) => new VigorFetch(c));
    }
    _createTimelineHandler(timeline) {
        return (action, content) => {
            timeline.push({
                action: action,
                content: content,
                time: Date.now()
            });
        };
    }
    _createInterceptorHandler(ctx, addTimeline) {
        return async (interceptorType, api) => {
            const interceptorsConfig = ctx["stats"]["interceptors"];
            const interceptors = interceptorsConfig[interceptorType];
            addTimeline("INTERCEPTOR_LOOP_STARTED", {
                interceptorType: interceptorType,
                interceptors,
            });
            const startTime = performance.now();
            for (const func of interceptors) {
                const scopedApi = api(interceptorType, func);
                await func(ctx, scopedApi);
            }
            const endTime = performance.now();
            addTimeline("INTERCEPTOR_LOOP_ENDED", {
                interceptorType: interceptorType,
                interceptors,
                took: endTime - startTime
            });
        };
    }
    _stringifyList(unkList) {
        return unkList
            .filter(unk => unk !== null && unk !== undefined)
            .map(unk => {
            if (unk instanceof Date)
                return unk.toISOString();
            return String(unk);
        });
    }
    method(str) { return this._next({ method: str }); }
    origin(str) { return this._next({ origin: str }); }
    path(...strs) { return this._next({ path: this._stringifyList(strs.flat()) }); }
    query(...strs) { return this._next({ query: strs.flat() }); }
    hash(str) { return this._next({ hash: str }); }
    options(obj) { return this._next({ options: obj }); }
    headers(obj) { return this._next({ options: { headers: obj } }); }
    body(obj) { return this._next({ options: { headers: this._config.options.headers, body: obj } }); }
    _buildUrl(origin, path, query, hash) {
        const originObj = new URL(origin);
        const baseStr = originObj.origin;
        const pathObj = [originObj.pathname.replace(/^\/+|\/+$/g, '')];
        for (const str of path) {
            pathObj.push(str.replace(/^\/+|\/+$/g, ''));
        }
        const pathStr = pathObj.join('/');
        const mainObj = new URL(pathStr, baseStr);
        const parseVal = (val) => {
            if (val instanceof Date)
                return val.toISOString();
            return String(val);
        };
        const queryObj = [...Array.from(originObj.searchParams.entries()), ...query.flatMap(qu => Object.entries(qu))];
        for (const [key, val] of queryObj) {
            if (val === undefined || val === null)
                continue;
            if (Array.isArray(val))
                for (const e of val) {
                    mainObj.searchParams.append(key, parseVal(e));
                }
            else {
                mainObj.searchParams.append(key, parseVal(val));
            }
        }
        mainObj.hash = hash ?? originObj.hash;
        return mainObj.href;
    }
    _normalizeOptions(body) {
        if (body == null)
            return { isJson: false, headers: {}, body };
        if (typeof body === "string")
            return { isJson: false, headers: {
                    "Content-Type": "text/plain;charset=UTF-8"
                }, body };
        if (body instanceof Blob)
            return { isJson: false, headers: {
                    ...(body.type && { "Content-Type": body.type })
                }, body };
        if (body instanceof ArrayBuffer)
            return { isJson: false, headers: {
                    "Content-Type": "application/octet-stream"
                }, body };
        if (body instanceof URLSearchParams)
            return { isJson: false, headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                }, body };
        if (body instanceof FormData)
            return { isJson: false, headers: {}, body };
        if (typeof body === "object") {
            return { isJson: true, headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(body) };
        }
        throw new VigorFetchError("INVALID_BODY", {
            method: "_normalizeBody",
            data: {
                expected: ["string", "Blob", "ArrayBuffer", "URLSearchParams", "FormData"],
                received: body
            }
        });
    }
    settings(func) {
        if (func instanceof VigorFetchSettings) {
            return this._next({ settings: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ settings: func(new VigorFetchSettings(this._config.settings))._getConfig() });
        }
        return this._next({ settings: func });
    }
    interceptors(func) {
        if (func instanceof VigorFetchInterceptors) {
            return this._next({ interceptors: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ interceptors: func(new VigorFetchInterceptors(this._config.interceptors))._getConfig() });
        }
        return this._next({ interceptors: func });
    }
    retryConfig(func) {
        if (func instanceof VigorRetry) {
            return this._next({ retryConfig: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ retryConfig: func(new VigorRetry(this._config.retryConfig))._getConfig() });
        }
        return this._next({ retryConfig: func });
    }
    parseConfig(func) {
        if (func instanceof VigorParse) {
            return this._next({ parseConfig: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ parseConfig: func(new VigorParse(this._config.parseConfig))._getConfig() });
        }
        return this._next({ parseConfig: func });
    }
    async request(config, timeline = []) {
        const stats = this._mergeConfig(this._config, config);
        let ctx = {
            href: "",
            result: VigorDefault,
            response: VigorDefault,
            options: {
                headers: VigorDefault,
                body: VigorDefault
            },
            error: VigorDefault,
            timeline: timeline,
            stats,
            flag: {
                overwritten: false,
                restarted: false
            }
        };
        const addTimeline = this._createTimelineHandler(ctx.timeline);
        const handleInterceptor = this._createInterceptorHandler(ctx, addTimeline);
        addTimeline("PROCESS_HANDLING", {
            type: "REQUEST_START",
            data: {}
        });
        try {
            try {
                new URL(stats.origin[0]);
            }
            catch {
                throw new VigorFetchError("INVALID_PROTOCOL", {
                    method: "request",
                    data: {
                        expected: ["valid URL protocol"],
                        received: stats.origin
                    }
                });
            }
            ctx.href = this._buildUrl(stats.origin, stats.path, stats.query, stats.hash);
            addTimeline("BUILT_URL", {
                url: ctx.href
            });
            const { headers, body, ...others } = stats.options;
            const hasBody = body !== VigorDefault &&
                body !== undefined;
            const method = stats.method || (hasBody ? 'POST' : 'GET');
            ctx.options = {
                ...others,
                method: method,
                headers: {}
            };
            if (hasBody) {
                const normalized = this._normalizeOptions(body);
                if (normalized.body !== undefined) {
                    ctx.options.body = normalized.body;
                }
                Object.assign(ctx.options.headers, normalized.headers);
            }
            Object.assign(ctx.options.headers, headers);
            addTimeline("SET_OPTIONS", {
                options: ctx.options
            });
            const fetchTask = async (ctx2, { abort, signal }) => {
                ctx.options.signal = signal;
                const result = await fetch(ctx.href, ctx.options);
                return result;
            };
            const throwStatus = async (ctx2, api) => {
                const response = ctx2.result;
                if (!response.ok) {
                    api.throwError(new VigorFetchError("FETCH_FAILED", {
                        method: "request",
                        data: {
                            status: response.status,
                            response: response,
                            url: response.url,
                            headers: response.headers,
                            body: response.body,
                            statusText: response.statusText
                        }
                    }));
                }
            };
            const handleBlacklist = async (ctx2, api) => {
                const response = ctx2.result;
                ctx.error = ctx2.error;
                if (response instanceof Response) {
                    if (stats.settings.unretryStatus.includes(response.status))
                        api.cancelRetry();
                    else
                        api.proceedRetry();
                }
            };
            const handleRatelimit = async (ctx2, api) => {
                const response = ctx2.result;
                ctx.error = ctx2.error;
                if (response instanceof Response) {
                    if (response.status === 429) {
                        let retryHeader = null;
                        for (const header of stats.settings.retryHeaders) {
                            retryHeader = response.headers.get(header);
                            if (retryHeader)
                                break;
                        }
                        if (retryHeader) {
                            const toNumber = Number(retryHeader);
                            const delay = !isNaN(toNumber)
                                ? toNumber * 1000
                                : (() => {
                                    const toDate = new Date(retryHeader).getTime();
                                    return !isNaN(toDate)
                                        ? toDate - Date.now()
                                        : null;
                                })();
                            if (delay !== null && delay > 0)
                                api.setDelay(delay + Math.random() * ctx2.stats.settings.jitter);
                        }
                    }
                }
            };
            stats.retryConfig.interceptors.after = [throwStatus, ...stats.retryConfig.interceptors.after];
            stats.retryConfig.interceptors.retryIf = [handleBlacklist, ...stats.retryConfig.interceptors.retryIf];
            stats.retryConfig.interceptors.onRetry = [handleRatelimit, ...stats.retryConfig.interceptors.onRetry];
            const retryEngine = new VigorRetry(stats.retryConfig)
                .target(fetchTask);
            const parseEngine = new VigorParse(stats.parseConfig);
            addTimeline("ENGINE_CREATED", {
                retryEngine,
                parseEngine
            });
            await handleInterceptor("before", (interceptorType, func) => ({
                throwError: (error) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
                setOptions: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setOptions",
                        args: [unknown]
                    });
                    return ctx.options = unknown;
                },
                setHeaders: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setHeaders",
                        args: [unknown]
                    });
                    return ctx.options.headers = unknown;
                },
                setBody: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setBody",
                        args: [unknown]
                    });
                    return ctx.options.body = unknown;
                }
            }));
            addTimeline("RETRY_STARTED", {
                engine: retryEngine
            });
            const retryStart = performance.now();
            const retryTimeline = [];
            ctx.response = await retryEngine.request(undefined, retryTimeline);
            const retryEnd = performance.now();
            addTimeline("RETRY_ENDED", {
                engine: retryEngine,
                timeline: retryTimeline,
                took: retryEnd - retryStart,
                response: ctx.response
            });
            addTimeline("PARSE_STARTED", {
                engine: parseEngine
            });
            const parseStart = performance.now();
            const parseTimeline = [];
            ctx.result = await parseEngine.target(ctx.response).request(undefined, parseTimeline);
            const parseEnd = performance.now();
            addTimeline("PARSE_ENDED", {
                engine: parseEngine,
                timeline: parseTimeline,
                took: parseEnd - parseStart,
                result: ctx.result
            });
            await handleInterceptor("after", (interceptorType, func) => ({
                setResult: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setResult",
                        args: [unknown]
                    });
                    ctx.result = unknown;
                    return unknown;
                },
                throwError: (error) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
            }));
            await handleInterceptor("result", (interceptorType, func) => ({
                setResult: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setResult",
                        args: [unknown]
                    });
                    ctx.result = unknown;
                    return unknown;
                },
                throwError: (error) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
            }));
            return ctx.result;
        }
        catch (error) {
            ctx.error = error;
            addTimeline("PROCESS_HANDLING", {
                type: "REQUEST_ERROR",
                data: {
                    error
                }
            });
            await handleInterceptor("onError", (interceptorType, func) => ({
                setResult: (unknown) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setResult",
                        args: [unknown]
                    });
                    ctx.result = unknown;
                    ctx.flag.overwritten = true;
                    return unknown;
                },
                throwError: (error) => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
                restart: () => {
                    addTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "restart",
                        args: []
                    });
                    ctx.flag.restarted = true;
                }
            }));
            if (ctx.flag.restarted) {
                return await this.request(stats, ctx.timeline);
            }
            if (ctx.flag.overwritten)
                return ctx.result;
            if (stats.settings.default !== VigorDefault)
                return stats.settings.default;
            throw error;
        }
    }
}
class VigorAllSettings extends VigorStatus {
    constructor(config) {
        const base = {
            concurrency: 5,
            onlySuccess: false
        };
        super(config, base, (c) => new VigorAllSettings(c));
    }
    concurrency(num) { return this._next({ concurrency: num }); }
    onlySuccess(num) { return this._next({ onlySuccess: num }); }
}
class VigorAllInterceptors extends VigorStatus {
    constructor(config) {
        const base = {
            before: [],
            after: [],
            result: [],
            onError: []
        };
        super(config, base, (c) => new VigorAllInterceptors(c));
    }
    before(...funcs) { return this._next({ before: funcs.flat() }); }
    after(...funcs) { return this._next({ after: funcs.flat() }); }
    result(...funcs) { return this._next({ result: funcs.flat() }); }
    onError(...funcs) { return this._next({ onError: funcs.flat() }); }
}
class VigorAll extends VigorStatus {
    constructor(config) {
        const base = {
            target: [],
            settings: new VigorAllSettings()._getBase(),
            interceptors: new VigorAllInterceptors()._getBase()
        };
        super(config, base, (c) => new VigorAll(c));
    }
    _createTimelineHandler(timeline) {
        return (action, content) => {
            timeline.push({
                action: action,
                content: content,
                time: Date.now()
            });
        };
    }
    _createInterceptorHandler(ctx, addTimeline) {
        return async (interceptorType, api) => {
            const interceptorsConfig = ctx["stats"]["interceptors"];
            const interceptors = interceptorsConfig[interceptorType];
            addTimeline("INTERCEPTOR_LOOP_STARTED", {
                interceptorType: interceptorType,
                interceptors,
            });
            const startTime = performance.now();
            for (const func of interceptors) {
                const scopedApi = api(interceptorType, func);
                await func(ctx, scopedApi);
            }
            const endTime = performance.now();
            addTimeline("INTERCEPTOR_LOOP_ENDED", {
                interceptorType: interceptorType,
                interceptors,
                took: endTime - startTime
            });
        };
    }
    _createEachTimelineHandler(timeline) {
        return (action, content) => {
            timeline.push({
                action: action,
                content: content,
                time: Date.now()
            });
        };
    }
    _createEachInterceptorHandler(ctx, addEachTimeline) {
        return async (interceptorType, api) => {
            const interceptorsConfig = ctx["stats"]["interceptors"];
            const interceptors = interceptorsConfig[interceptorType];
            addEachTimeline("INTERCEPTOR_LOOP_STARTED", {
                interceptorType: interceptorType,
                interceptors,
            });
            const startTime = performance.now();
            for (const func of interceptors) {
                const scopedApi = api(interceptorType, func);
                await func(ctx, scopedApi);
            }
            const endTime = performance.now();
            addEachTimeline("INTERCEPTOR_LOOP_ENDED", {
                interceptorType: interceptorType,
                interceptors,
                took: endTime - startTime
            });
        };
    }
    target(...funcs) { return this._next({ target: funcs.flat() }); }
    settings(func) {
        if (func instanceof VigorAllSettings) {
            return this._next({ settings: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ settings: func(new VigorAllSettings(this._config.settings))._getConfig() });
        }
        return this._next({ settings: func });
    }
    interceptors(func) {
        if (func instanceof VigorAllInterceptors) {
            return this._next({ interceptors: func._getConfig() });
        }
        if (typeof func === 'function') {
            return this._next({ interceptors: func(new VigorAllInterceptors(this._config.interceptors))._getConfig() });
        }
        return this._next({ interceptors: func });
    }
    async runTask(task, { stats, root }, semaphore) {
        let ctx = {
            result: VigorDefault,
            error: VigorDefault,
            timeline: [],
            stats,
            root,
            target: task,
            semaphore,
            flag: {
                overwritten: false
            }
        };
        const addEachTimeline = this._createEachTimelineHandler(ctx.timeline);
        const handleEachInterceptor = this._createEachInterceptorHandler(ctx, addEachTimeline);
        addEachTimeline("PROCESS_HANDLING", {
            type: "TASK_START",
            data: {}
        });
        try {
            try {
                await semaphore.acquire();
                addEachTimeline("TASK_ACQUIRED", {
                    target: ctx.target
                });
                await handleEachInterceptor("before", (interceptorType, func) => ({
                    throwError: (error) => {
                        addEachTimeline("INTERCEPTOR_API_CALLED", {
                            interceptorType,
                            interceptor: func,
                            method: "throwError",
                            args: [error]
                        });
                        throw error;
                    }
                }));
                addEachTimeline("TASK_STARTED", {
                    target: ctx.target
                });
                const startTime = performance.now();
                ctx.result = await ctx.target(ctx);
                const endTime = performance.now();
                addEachTimeline("TASK_ENDED", {
                    target: ctx.target,
                    took: endTime - startTime
                });
                await handleEachInterceptor("after", (interceptorType, func) => ({
                    setResult: (unknown) => {
                        addEachTimeline("INTERCEPTOR_API_CALLED", {
                            interceptorType,
                            interceptor: func,
                            method: "setResult",
                            args: [unknown]
                        });
                        ctx.result = unknown;
                        return unknown;
                    },
                    throwError: (error) => {
                        addEachTimeline("INTERCEPTOR_API_CALLED", {
                            interceptorType,
                            interceptor: func,
                            method: "throwError",
                            args: [error]
                        });
                        throw error;
                    }
                }));
            }
            finally {
                semaphore.release();
                addEachTimeline("TASK_RELEASED", {
                    target: ctx.target
                });
            }
        }
        catch (error) {
            ctx.error = error;
            addEachTimeline("PROCESS_HANDLING", {
                type: "TASK_ERROR",
                data: {
                    error
                }
            });
            await handleEachInterceptor("onError", (interceptorType, func) => ({
                setResult: (unknown) => {
                    addEachTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "setResult",
                        args: [unknown]
                    });
                    ctx.result = unknown;
                    ctx.flag.overwritten = true;
                    return unknown;
                },
                throwError: (error) => {
                    addEachTimeline("INTERCEPTOR_API_CALLED", {
                        interceptorType,
                        interceptor: func,
                        method: "throwError",
                        args: [error]
                    });
                    throw error;
                },
            }));
            if (ctx.flag.overwritten)
                return ctx.result;
            throw error;
        }
        return ctx.result;
    }
    async request(config, timeline = []) {
        const stats = this._mergeConfig(this._config, config);
        let ctx = {
            result: VigorDefault,
            timeline,
            stats,
            queue: new Set(),
            active: 0
        };
        const addTimeline = this._createTimelineHandler(ctx.timeline);
        const handleInterceptor = this._createInterceptorHandler(ctx, addTimeline);
        addTimeline("PROCESS_HANDLING", {
            type: "REQUEST_START",
            data: {}
        });
        if (stats.target.length === 0)
            throw new VigorAllError("EMPTY_TARGET", {
                method: "request",
                data: {}
            });
        const waitQueue = [];
        const acquire = () => {
            if (ctx.active < stats.settings.concurrency) {
                ctx.active++;
                return Promise.resolve();
            }
            return new Promise((res) => waitQueue.push(() => { ctx.active++; res(); }));
        };
        const release = () => {
            ctx.active--;
            if (waitQueue.length > 0) {
                const next = waitQueue.shift();
                if (next)
                    next();
            }
        };
        for (const task of stats.target) {
            let promise;
            promise = this.runTask(task, { stats, root: ctx }, { acquire, release })
                .then(res => ({ success: true, value: res }))
                .catch(err => ({ success: false, value: err }))
                .finally(() => ctx.queue.delete(promise));
            ctx.queue.add(promise);
        }
        addTimeline("QUEUE_REQUEST_STARTED", {
            queue: ctx.queue
        });
        const startTime = performance.now();
        const raw = await Promise.all(ctx.queue);
        const endTime = performance.now();
        addTimeline("QUEUE_REQUEST_ENDED", {
            queue: ctx.queue,
            took: endTime - startTime
        });
        ctx.result = stats.settings.onlySuccess
            ? raw.filter(r => r.success).map(r => r.value)
            : raw.map(r => r.value);
        await handleInterceptor("result", (interceptorType, func) => ({
            setResult: (unknown) => {
                addTimeline("INTERCEPTOR_API_CALLED", {
                    interceptorType,
                    interceptor: func,
                    method: "setResult",
                    args: [unknown]
                });
                ctx.result = unknown;
                return unknown;
            },
            throwError: (error) => {
                addTimeline("INTERCEPTOR_API_CALLED", {
                    interceptorType,
                    interceptor: func,
                    method: "throwError",
                    args: [error]
                });
                throw error;
            },
        }));
        return ctx.result;
    }
}
const VigorEntry = {
    retry: {
        main: VigorRetry,
        settings: VigorRetrySettings,
        interceptors: VigorRetryInterceptors,
        error: VigorRetryError,
        algorithms: {
            constant: VigorRetryAlgorithmsConstant,
            linear: VigorRetryAlgorithmsLinear,
            backoff: VigorRetryAlgorithmsBackoff,
            custom: VigorRetryAlgorithmsCustom
        }
    },
    parse: {
        main: VigorParse,
        settings: VigorParseSettings,
        interceptors: VigorParseInterceptors,
        error: VigorParseError,
        strategies: VigorParseStrategies
    },
    fetch: {
        main: VigorFetch,
        settings: VigorFetchSettings,
        interceptors: VigorFetchInterceptors,
        error: VigorFetchError,
    },
    all: {
        main: VigorAll,
        settings: VigorAllSettings,
        interceptors: VigorAllInterceptors,
        error: VigorAllError
    }
};
const vigor = {
    use: async (func, config) => {
        return await func(VigorEntry, config);
    },
    fetch: (str) => {
        return new VigorFetch().origin(str);
    },
    retry: (target) => {
        return new VigorRetry().target(target);
    },
    parse: (response) => {
        return new VigorParse().target(response);
    },
    all: (...funcs) => {
        return new VigorAll().target(...funcs);
    },
    builder: {
        fetch: {
            settings: (c) => new VigorFetchSettings(c),
            interceptors: (c) => new VigorFetchInterceptors(c),
        },
        retry: {
            settings: (c) => new VigorRetrySettings(c),
            interceptors: (c) => new VigorRetryInterceptors(c),
        },
        parse: {
            settings: (c) => new VigorParseSettings(c),
            interceptors: (c) => new VigorParseInterceptors(c),
        },
        all: {
            settings: (c) => new VigorAllSettings(c),
            interceptors: (c) => new VigorAllInterceptors(c),
        }
    }
};

// ----------------------------------------------------------------
// Error system
// ----------------------------------------------------------------
const RobloxErrorMessageFuncs = {
    AUTH_FAILED: ({ status, cookie }) => `Cookie authentication failed (status: ${status ?? 'unknown'}, cookie: ${cookie.slice(0, 8)}...)`,
    RATE_LIMITED: ({ status, url, retryAfterMs }) => `Rate limited (status: ${status}, url: ${url ?? 'unknown'}, retryAfter: ${retryAfterMs ?? 'unknown'}ms)`,
    REQUEST_FAILED: ({ status, url }) => `Request failed (status: ${status ?? 'unknown'}, url: ${url ?? 'unknown'})`,
};
class RobloxApiError extends Error {
    timestamp = new Date();
    cause;
    code;
    data;
    timeline;
    context;
    constructor(code, options) {
        const messageFn = RobloxErrorMessageFuncs[code];
        super(`[${code}] ${messageFn(options.data)}`, { cause: options.cause });
        this.name = new.target.name;
        this.code = code;
        this.cause = options.cause;
        this.data = options.data;
        this.timeline = options.timeline ?? [];
        this.context = options.context;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace?.(this, new.target);
    }
}
class RobloxAuthError extends RobloxApiError {
    constructor(options) {
        super('AUTH_FAILED', options);
    }
}
class RobloxRateLimitError extends RobloxApiError {
    constructor(options) {
        super('RATE_LIMITED', options);
    }
}
class RobloxRequestError extends RobloxApiError {
    constructor(options) {
        super('REQUEST_FAILED', options);
    }
}
function isFetchFailed(cause) {
    return cause instanceof VigorFetchError && cause.code === 'FETCH_FAILED' && cause.data != null;
}
function extractTimeline(cause) {
    if (cause instanceof VigorFetchError)
        return (cause.context?.timeline ?? []);
    if (cause instanceof VigorRetryError)
        return (cause.context?.timeline ?? []);
    return [];
}
function extractStatus(cause) {
    return isFetchFailed(cause) ? cause.data.status : null;
}
function extractUrl(cause) {
    return isFetchFailed(cause) ? cause.data.url : null;
}
function extractRetryAfterMs(cause) {
    if (!isFetchFailed(cause))
        return null;
    const headers = cause.data.response.headers;
    const raw = headers.get('retry-after')
        ?? headers.get('ratelimit-reset')
        ?? headers.get('x-ratelimit-reset')
        ?? null;
    if (raw === null)
        return null;
    const asNum = Number(raw);
    if (!isNaN(asNum))
        return asNum * 1000;
    const asDate = new Date(raw).getTime();
    return !isNaN(asDate) ? asDate - Date.now() : null;
}
function wrapVigorError(cause) {
    const status = extractStatus(cause);
    const url = extractUrl(cause);
    const timeline = extractTimeline(cause);
    if (status === 429)
        return new RobloxRateLimitError({
            data: { status, url, retryAfterMs: extractRetryAfterMs(cause) },
            timeline,
            cause,
        });
    return new RobloxRequestError({ data: { status, url }, timeline, cause });
}
function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size)
        out.push(arr.slice(i, i + size));
    return out;
}
function partition(arr, pred) {
    const pass = [], fail = [];
    for (const item of arr)
        (pred(item) ? pass : fail).push(item);
    return { pass, fail };
}
// ----------------------------------------------------------------
// Factory
// ----------------------------------------------------------------
function createRobloxApi({ cache, cookies: cookiesList, ipgeolocationKey, }) {
    const cookiePool = cookiesList.map(cookie => ({ cookie, lastUsed: 0 }));
    function pickCookie() {
        const entry = cookiePool.reduce((a, b) => a.lastUsed < b.lastUsed ? a : b);
        entry.lastUsed = Date.now();
        return entry.cookie;
    }
    function pickKey(key) {
        return vigor.builder.fetch.interceptors()
            .result((ctx, api) => {
            api.setResult(ctx.result[key]);
        });
    }
    const dataInterceptor = pickKey('data');
    const cookieInterceptor = vigor.builder.fetch.interceptors()
        .before((ctx, api) => {
        api.setHeaders({
            ...ctx.options.headers,
            Cookie: `.ROBLOSECURITY=${pickCookie()}`,
        });
    });
    const winInetInterceptor = vigor.builder.fetch.interceptors()
        .before((ctx, api) => {
        api.setHeaders({
            ...ctx.options.headers,
            'User-Agent': 'Roblox/WinInet',
        });
    });
    const usersApi = vigor.fetch('https://users.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .interceptors(winInetInterceptor)
        .retryConfig(c => c
        .settings(s => s.attempt(7))
        .algorithms(a => a.backoff().initial(200).unit(800).multiplier(1.7)));
    const thumbnailsApi = vigor.fetch('https://thumbnails.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .interceptors(winInetInterceptor)
        .retryConfig(c => c
        .settings(s => s.attempt(5))
        .algorithms(a => a.backoff().initial(1000).multiplier(2.5)));
    const gamesApi = vigor.fetch('https://games.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .retryConfig(c => c
        .settings(s => s.attempt(5))
        .algorithms(a => a.backoff().initial(1000).multiplier(2.5)));
    const presenceApi = vigor.fetch('https://presence.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .retryConfig(c => c
        .settings(s => s.attempt(5))
        .algorithms(a => a.backoff().initial(500).multiplier(2)));
    const apisRoblox = vigor.fetch('https://apis.roblox.com')
        .interceptors(cookieInterceptor)
        .retryConfig(c => c
        .settings(s => s.attempt(5))
        .algorithms(a => a.backoff().initial(1000).multiplier(2)));
    const gamejoinApi = vigor.fetch('https://gamejoin.roblox.com/v1')
        .interceptors(cookieInterceptor)
        .retryConfig(c => c
        .settings(s => s.attempt(7))
        .algorithms(a => a.backoff().initial(500).multiplier(1.5)));
    const ipgeolocationApi = vigor.fetch('https://api.ipgeolocation.io')
        .retryConfig(c => c
        .settings(s => s.attempt(4))
        .algorithms(a => a.backoff().initial(500).multiplier(2)));
    async function withCache(opts) {
        const { type, keys, ttlMs, getKey, fetchMissing, fallback } = opts;
        const cached = await cache.select(type, keys);
        const cacheMap = new Map(cached.map(({ separator, data }) => [separator, data]));
        const missing = keys.filter(k => !cacheMap.has(k));
        if (missing.length > 0) {
            const fetched = await fetchMissing(missing);
            await cache.upsert(type, ttlMs, fetched.map(item => ({ separator: getKey(item), data: item })));
            fetched.forEach(item => cacheMap.set(getKey(item), item));
        }
        return keys.map(k => cacheMap.get(k) ?? fallback);
    }
    async function authenticated(cookies) {
        return vigor.all(...cookies.map(cookie => async () => {
            const fixedCookieInterceptor = vigor.builder.fetch.interceptors()
                .before((ctx, api) => {
                api.setHeaders({
                    ...ctx.options.headers,
                    Cookie: `.ROBLOSECURITY=${cookie}`,
                });
            });
            const base = usersApi.interceptors(fixedCookieInterceptor);
            const [user, description, birthdate, gender, ageBracket, countryCode, roles] = await Promise.allSettled([
                base.path('users', 'authenticated').request(),
                base.path('description').request(),
                base.path('birthdate').request(),
                base.path('gender').request(),
                base.path('users', 'authenticated', 'age-bracket').request(),
                base.path('users', 'authenticated', 'country-code').request(),
                base.path('users', 'authenticated', 'roles').request(),
            ]);
            if (user.status === 'rejected') {
                const cause = user.reason;
                const status = extractStatus(cause);
                const timeline = extractTimeline(cause);
                if (status === 429)
                    throw new RobloxRateLimitError({
                        data: { status, url: extractUrl(cause), retryAfterMs: extractRetryAfterMs(cause) },
                        timeline,
                        cause,
                    });
                throw new RobloxAuthError({ data: { status, cookie }, timeline, cause });
            }
            return {
                ...user.value,
                ...(description.status === 'fulfilled' ? description.value : {}),
                ...(birthdate.status === 'fulfilled' ? birthdate.value : {}),
                ...(gender.status === 'fulfilled' ? gender.value : {}),
                ...(ageBracket.status === 'fulfilled' ? ageBracket.value : {}),
                ...(countryCode.status === 'fulfilled' ? countryCode.value : {}),
                ...(roles.status === 'fulfilled' ? roles.value : {}),
            };
        })).request();
    }
    async function usersSimple(userIds) {
        return withCache({
            type: 'usersSimple',
            keys: userIds.map(String),
            ttlMs: 30 * 60 * 1000,
            getKey: item => String(item.id),
            fallback: {},
            fetchMissing: async (missing) => {
                try {
                    const results = await vigor.all(...chunk(missing.map(Number), 100).map(group => () => usersApi
                        .path('users')
                        .body({ userIds: group, excludeBannedUsers: false })
                        .interceptors(dataInterceptor)
                        .request()))
                        .interceptors(vigor.builder.all.interceptors()
                        .result((ctx, api) => {
                        api.setResult(ctx.result.flat());
                    }))
                        .request();
                    return results.filter(u => u.id != null && u.name != null && u.displayName != null);
                }
                catch (cause) {
                    throw wrapVigorError(cause);
                }
            },
        });
    }
    async function users(userIds) {
        return withCache({
            type: 'users',
            keys: userIds.map(String),
            ttlMs: 60 * 60 * 1000,
            getKey: item => String(item.id),
            fallback: {},
            fetchMissing: async (missing) => {
                try {
                    const results = await vigor.all(...missing.map(id => () => usersApi.path('users', id).request()))
                        .settings(s => s.concurrency(2))
                        .request();
                    return results.filter(u => u.id != null && u.name != null && u.displayName != null && u.description != null);
                }
                catch (cause) {
                    throw wrapVigorError(cause);
                }
            },
        });
    }
    async function usersByName(usernames) {
        return withCache({
            type: 'usernames',
            keys: usernames,
            ttlMs: 30 * 60 * 1000,
            getKey: item => item.requestedUsername ?? item.name,
            fallback: {},
            fetchMissing: async (missing) => {
                try {
                    const results = await vigor.all(...chunk(missing, 100).map(group => () => usersApi
                        .path('usernames', 'users')
                        .body({ usernames: group, excludeBannedUsers: false })
                        .interceptors(dataInterceptor)
                        .request()))
                        .interceptors(vigor.builder.all.interceptors()
                        .result((ctx, api) => {
                        api.setResult(ctx.result.flat());
                    }))
                        .request();
                    return results.filter(u => u.id != null && u.name != null && u.displayName != null);
                }
                catch (cause) {
                    throw wrapVigorError(cause);
                }
            },
        });
    }
    async function presence(userIds) {
        try {
            return await vigor.all(...chunk(userIds, 50).map(group => () => presenceApi
                .path('presence', 'users')
                .body({ userIds: group })
                .interceptors(pickKey('userPresences'))
                .request()))
                .interceptors(vigor.builder.all.interceptors()
                .result((ctx, api) => {
                api.setResult(ctx.result.flat());
            }))
                .request();
        }
        catch (cause) {
            throw wrapVigorError(cause);
        }
    }
    async function thumbnailAssets(opts) {
        const { assetIds, size = '150x150', format = 'Png' } = opts;
        try {
            const results = await vigor.all(...chunk(assetIds, 100).map(group => () => thumbnailsApi
                .path('assets')
                .query({ assetIds: group.join(','), size, format })
                .interceptors(dataInterceptor)
                .request()))
                .interceptors(vigor.builder.all.interceptors()
                .result((ctx, api) => {
                api.setResult(ctx.result.flat());
            }))
                .request();
            return results.map(t => ({ ...t, url: t.state === 'Completed' ? t.url : null }));
        }
        catch (cause) {
            throw wrapVigorError(cause);
        }
    }
    async function thumbnailsBatch(targets, formatDefaults = {}) {
        const defaults = {
            type: 'AvatarHeadShot',
            size: '150x150',
            format: 'Png',
            isCircular: false,
            ...formatDefaults,
        };
        const batch = targets.map((t, i) => ({ ...defaults, ...t, requestId: String(i) }));
        const batchMap = new Map(batch.map(t => [t.requestId, t]));
        try {
            const results = await vigor.all(...chunk(batch, 100).map(group => () => thumbnailsApi
                .path('batch')
                .body(group)
                .interceptors(dataInterceptor)
                .request()))
                .interceptors(vigor.builder.all.interceptors()
                .result((ctx, api) => {
                api.setResult(ctx.result.flat());
            }))
                .request();
            return results.map(item => {
                const original = batchMap.get(item.requestId) ?? {};
                const { requestId: _rid, ...rest } = item;
                return { ...original, ...rest, url: rest.state === 'Completed' ? rest.url : null };
            });
        }
        catch (cause) {
            throw wrapVigorError(cause);
        }
    }
    async function serversSimple(opts) {
        const { placeId, count = 1, serverType = 'Public', cursor, thumbnailFormat } = opts;
        let nextCursor = cursor ?? null;
        let prevCursor = null;
        const rawData = [];
        try {
            for (let i = 0; i < count; i++) {
                const page = await gamesApi
                    .path('games', placeId, 'servers', serverType)
                    .query({ limit: 100, ...(nextCursor ? { cursor: nextCursor } : {}) })
                    .request();
                if (i === 0)
                    prevCursor = page.previousPageCursor;
                nextCursor = page.nextPageCursor;
                rawData.push(...page.data);
                if (!nextCursor)
                    break;
            }
        }
        catch (cause) {
            throw wrapVigorError(cause);
        }
        const thumbTargets = rawData
            .flatMap(s => s.playerTokens.map(token => ({ token, type: 'AvatarHeadShot', size: '150x150', format: 'Png', ...thumbnailFormat })));
        const thumbResults = await thumbnailsBatch(thumbTargets, thumbnailFormat);
        const thumbMap = new Map(thumbResults.map(t => [t.token, t.url]));
        return {
            previousPageCursor: prevCursor,
            nextPageCursor: nextCursor,
            data: rawData.map(s => ({
                jobId: s.id,
                maxPlayers: s.maxPlayers,
                playing: s.playing,
                fps: s.fps,
                ping: s.ping,
                playerImgs: s.playerTokens.map(tok => thumbMap.get(tok)).filter((url) => url != null),
            })),
        };
    }
    async function servers(opts) {
        const result = await serversSimple(opts);
        const jobIds = result.data.map(s => s.jobId);
        const locationList = await serversRegion({ placeId: opts.placeId, jobIds }).catch(() => []);
        const locationMap = new Map(locationList.map(l => [l.jobId, l]));
        return {
            ...result,
            data: result.data.map(s => ({
                ...s,
                location: locationMap.get(s.jobId) ?? null,
            })),
        };
    }
    async function placeInfo(placeIds) {
        return withCache({
            type: 'placeInfo',
            keys: placeIds.map(String),
            ttlMs: 60 * 60 * 1000,
            getKey: item => String(item.placeId),
            fallback: {},
            fetchMissing: async (missing) => {
                try {
                    const universeEntries = await vigor.all(...missing.map(placeId => () => apisRoblox
                        .path('universes', 'v1', 'places', placeId, 'universe')
                        .interceptors(vigor.builder.fetch.interceptors()
                        .result((ctx, api) => {
                        const r = ctx.result;
                        api.setResult({ placeId: Number(placeId), universeId: r?.universeId ?? null });
                    }))
                        .request())).request();
                    const metaList = await vigor.all(...universeEntries.map(({ placeId, universeId }) => async () => {
                        if (!universeId)
                            return { placeId, universeId: null, info: null, assetIds: [] };
                        const [details, media] = await Promise.all([
                            gamesApi.path('games').query({ universeIds: universeId }).interceptors(dataInterceptor).request(),
                            gamesApi.path('games', universeId, 'media').interceptors(dataInterceptor).request(),
                        ]);
                        return {
                            placeId,
                            universeId,
                            info: details?.[0] ?? null,
                            assetIds: (media ?? []).map(m => m.imageId).filter((id) => id != null),
                        };
                    })).request();
                    const allAssetIds = [...new Set(metaList.flatMap(m => m.assetIds))];
                    const assetUrlMap = new Map();
                    if (allAssetIds.length > 0) {
                        const thumbs = await thumbnailAssets({ assetIds: allAssetIds, size: '768x432', format: 'Png' });
                        thumbs.forEach(t => { if (t.targetId != null && t.url)
                            assetUrlMap.set(t.targetId, t.url); });
                    }
                    return metaList.map(({ placeId, universeId, info, assetIds }) => ({
                        ...(info ?? {}),
                        placeId,
                        universeId,
                        logos: assetIds.map(id => assetUrlMap.get(id)).filter((u) => u != null),
                    }));
                }
                catch (cause) {
                    throw wrapVigorError(cause);
                }
            },
        });
    }
    async function usersSimpleWithImg(userIds) {
        const [userList, thumbs] = await Promise.all([
            usersSimple(userIds),
            thumbnailsBatch(userIds.map(id => ({ targetId: id }))),
        ]);
        const imgMap = new Map(thumbs.map(t => [t.targetId, t.url]));
        return userList.map(u => ({ ...u, img: imgMap.get(u.id) ?? null }));
    }
    async function usersWithImg(userIds) {
        const [userList, thumbs] = await Promise.all([
            users(userIds),
            thumbnailsBatch(userIds.map(id => ({ targetId: id }))),
        ]);
        const imgMap = new Map(thumbs.map(t => [t.targetId, t.url]));
        return userList.map(u => ({ ...u, img: imgMap.get(u.id) ?? null }));
    }
    async function track(opts) {
        const { placeId, targets } = opts;
        const { pass: rawIds, fail: names } = partition(targets, t => !Number.isNaN(Number(t)));
        const resolvedIds = (await usersByName(names)).map(u => u.id);
        const idList = [...rawIds.map(Number), ...resolvedIds];
        const [userList, serverResult, thumbs] = await Promise.all([
            usersSimple(idList),
            serversSimple({ placeId, count: 20 }),
            thumbnailsBatch(idList.map(id => ({ targetId: id }))),
        ]);
        const thumbnailsMap = new Map(thumbs.map(t => [t.targetId, t.url]));
        const defaultHashes = new Set([
            '5816BB6B457A7A2FD8F0299D6F79DADF', 'D517857E5CC51E2FF93E63E20241169E',
            '56DFC0F87BABBE49C6D1BE708AE9A66A', 'C16BE31B5A403C45279B3FF5533980E9',
            '51E47F0C53DA3A617158586DF73B1236', 'ACCF91F734E311F4A0EF23C3EDA54284',
            'CF083BB49C3304C593C43617FF06418E', '3259891600987E41060EC3A43511F2F9',
            '19F6EB627A565DF5ABC0B82925B2C760', '5CB6042A80C64D34BA98721C96F5D6A3',
            'E592BA2BBFA44C9021643D25BC014BD5', '661AD135B4409FF51BC4A6D80E6AC0C7',
            '8E0E19FD517F46AD46A8A322377CA89B', '1E8FFEC57F042949AEFAC69FECC72D38',
            '64D3D8C3021F7E8442CCA2825051A87A',
        ]);
        const getHash = (url) => {
            if (!url)
                return null;
            try {
                const segments = new URL(url).pathname.split('/');
                const segment = segments.find(s => s.includes('-'));
                if (!segment)
                    return null;
                const parts = segment.split('-');
                return parts.length >= 3 ? parts.slice(1, -1).join('-') : null;
            }
            catch {
                return null;
            }
        };
        const serverHashMap = new Map();
        serverResult.data.forEach(s => s.playerImgs.forEach(img => {
            const h = getHash(img);
            if (h)
                serverHashMap.set(h, s);
        }));
        const matchedJobIds = new Set();
        const userServerMap = new Map();
        for (const user of userList) {
            const img = thumbnailsMap.get(user.id) ?? null;
            const hash = getHash(img);
            const server = hash && !defaultHashes.has(hash) ? (serverHashMap.get(hash) ?? null) : null;
            if (server) {
                userServerMap.set(user.id, server);
                matchedJobIds.add(server.jobId);
            }
        }
        const locationList = matchedJobIds.size > 0
            ? await serversRegion({ placeId, jobIds: [...matchedJobIds] })
            : [];
        const locationMap = new Map(locationList.map(l => [l.jobId, l]));
        return userList.map(user => {
            const img = thumbnailsMap.get(user.id) ?? null;
            const server = userServerMap.get(user.id) ?? null;
            return {
                user: { ...user, img },
                server: server ? { ...server, location: locationMap.get(server.jobId) ?? null } : null,
            };
        });
    }
    async function extractIps(placeId, jobId) {
        try {
            const res = await gamejoinApi
                .path('join-game-instance')
                .body({ placeId, gameId: jobId })
                .request();
            return {
                publicIp: res?.joinScript?.UdmuxEndpoint?.[0]?.Address ?? null,
                machineAddress: res?.joinScript?.MachineAddress ?? null,
            };
        }
        catch {
            return { publicIp: null, machineAddress: null };
        }
    }
    async function fetchIpLocation(ip) {
        try {
            const raw = await ipgeolocationApi
                .path('ipgeo')
                .query({ apiKey: ipgeolocationKey, ip, fields: 'country_code2,country_name,state_prov,city,latitude,longitude,isp,time_zone' })
                .request();
            return {
                ip,
                countryCode: String(raw.country_code2 ?? ''),
                countryName: String(raw.country_name ?? ''),
                regionName: String(raw.state_prov ?? ''),
                city: String(raw.city ?? ''),
                latitude: Number(raw.latitude ?? 0),
                longitude: Number(raw.longitude ?? 0),
                isp: String(raw.isp ?? ''),
                timezone: String(raw.time_zone?.name ?? ''),
            };
        }
        catch {
            return null;
        }
    }
    async function serversRegion(opts) {
        const { placeId, jobIds } = opts;
        if (jobIds.length === 0)
            return [];
        const JOB_TTL = 12 * 60 * 60 * 1000;
        const IP_TTL = 31 * 24 * 60 * 60 * 1000;
        const MACHINE_TTL = 2 * 24 * 60 * 60 * 1000;
        const cachedByJob = await cache.select('serverLocation:job', jobIds);
        const jobHitMap = new Map(cachedByJob.map(({ separator, data }) => [separator, data]));
        const missJobIds = jobIds.filter(id => !jobHitMap.has(id));
        if (missJobIds.length === 0)
            return jobIds.map(id => jobHitMap.get(id));
        const extracted = await vigor.all(...missJobIds.map(jobId => async () => {
            const { publicIp, machineAddress } = await extractIps(placeId, jobId);
            return { jobId, publicIp, machineAddress };
        }))
            .settings(s => s.concurrency(3))
            .request();
        const validExtracted = extracted.filter((e) => e.publicIp !== null);
        const machineAddresses = [...new Set(validExtracted.map(e => e.machineAddress).filter((m) => m !== null))];
        const cachedByMachine = await cache.select('serverLocation:machine', machineAddresses);
        const machineHitMap = new Map(cachedByMachine.map(({ separator, data }) => [separator, data]));
        const { pass: machineHits, fail: machineMiss } = validExtracted.reduce((acc, e) => {
            const cached = e.machineAddress ? machineHitMap.get(e.machineAddress) : undefined;
            if (cached)
                acc.pass.push({ ...e, loc: cached });
            else
                acc.fail.push(e);
            return acc;
        }, { pass: [], fail: [] });
        const missPublicIps = [...new Set(machineMiss.map(e => e.publicIp))];
        const cachedByIp = await cache.select('serverLocation:ip', missPublicIps);
        const ipHitMap = new Map(cachedByIp.map(({ separator, data }) => [separator, data]));
        const stillMissIps = missPublicIps.filter(ip => !ipHitMap.has(ip));
        if (stillMissIps.length > 0) {
            const fetched = await vigor.all(...stillMissIps.map(ip => async () => ({ ip, loc: await fetchIpLocation(ip) })))
                .settings(s => s.concurrency(5))
                .request();
            const toUpsertIp = fetched.filter((e) => e.loc !== null);
            if (toUpsertIp.length > 0) {
                await cache.upsert('serverLocation:ip', IP_TTL, toUpsertIp.map(({ ip, loc }) => ({ separator: ip, data: loc })));
                toUpsertIp.forEach(({ ip, loc }) => ipHitMap.set(ip, loc));
            }
        }
        const toUpsertMachine = [];
        for (const e of machineMiss) {
            const loc = ipHitMap.get(e.publicIp);
            if (loc && e.machineAddress && !machineHitMap.has(e.machineAddress)) {
                toUpsertMachine.push({ separator: e.machineAddress, data: loc });
                machineHitMap.set(e.machineAddress, loc);
            }
        }
        if (toUpsertMachine.length > 0)
            await cache.upsert('serverLocation:machine', MACHINE_TTL, toUpsertMachine);
        const jobLocations = [];
        const toUpsertJob = [];
        for (const { jobId, loc } of machineHits) {
            const full = { ...loc, jobId: jobId };
            jobLocations.push(full);
            toUpsertJob.push({ separator: jobId, data: full });
        }
        for (const e of machineMiss) {
            const loc = ipHitMap.get(e.publicIp);
            if (!loc)
                continue;
            const full = { ...loc, jobId: e.jobId };
            jobLocations.push(full);
            toUpsertJob.push({ separator: e.jobId, data: full });
        }
        if (toUpsertJob.length > 0)
            await cache.upsert('serverLocation:job', JOB_TTL, toUpsertJob);
        const resultMap = new Map([
            ...jobHitMap.entries(),
            ...jobLocations.map(loc => [loc.jobId, loc]),
        ]);
        return jobIds.flatMap(id => { const loc = resultMap.get(id); return loc ? [loc] : []; });
    }
    return {
        authenticated,
        usersSimple,
        users,
        usersByName,
        thumbnailAssets,
        thumbnailsBatch,
        serversSimple,
        servers,
        presence,
        placeInfo,
        usersSimpleWithImg,
        usersWithImg,
        track,
        serversRegion,
        _internal: { gamejoinApi, gamesApi, apisRoblox },
    };
}

exports.RobloxAuthError = RobloxAuthError;
exports.RobloxRateLimitError = RobloxRateLimitError;
exports.RobloxRequestError = RobloxRequestError;
exports.createRobloxApi = createRobloxApi;
