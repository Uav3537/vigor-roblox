import * as esm from "./dist/index.js";
import * as cjs from "./dist/index.cjs";

if (!Object.keys(esm).length) throw new Error("ESM broken");
if (!Object.keys(cjs).length) throw new Error("CJS broken");