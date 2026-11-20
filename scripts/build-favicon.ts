// Writes public/favicon.svg from the same geometry as the <Mark /> component.
// Run: node scripts/build-favicon.ts
import fs from "node:fs"
import { mark } from "../src/site/parts/sheet-geometry.ts"

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#0c0b0b"/><g transform="translate(4 4)"><path d="${mark.top}" fill="#008c8d"/><path d="${mark.left}" fill="#c0ebd7"/><path d="${mark.right}" fill="#ff8a00"/></g></svg>\n`
fs.writeFileSync(new URL("../public/favicon.svg", import.meta.url), svg)
console.log("favicon.svg written")
