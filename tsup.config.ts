import { readFileSync } from "node:fs"
import { defineConfig } from "tsup"

const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"))

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    sourcemap: false,
    target: "esnext",
    // Library version appended to cache keys (src/core/cache.ts)
    define: { __VIGOR_ROBLOX_VERSION__: JSON.stringify(version) },
    // Rollup tree-shaking drops dead code that esbuild leaves behind
    treeshake: true,
    // Terser instead of esbuild's minifier: esbuild cannot mangle locals while leaving top-level names alone,
    // and its `keepNames` helper adds bytes to every consumer bundle
    minify: "terser",
    terserOptions: {
        ecma: 2020,
        // Classes are emitted as `var Name = class {}`, so `.name` comes from the top-level binding.
        // Leave top-level bindings alone (no renaming, no inlining) so class names survive
        // (stack traces, devtools); consumer bundlers rename them anyway
        compress: { passes: 2, module: false, toplevel: false, keep_classnames: true },
        mangle: { module: false, toplevel: false, keep_classnames: true },
        format: { comments: false },
    },
})
