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
    // 캐시 키에 붙는 라이브러리 버전 (src/core/cache.ts)
    define: { __VIGOR_ROBLOX_VERSION__: JSON.stringify(version) },
})
