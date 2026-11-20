// Builds shadcn-compatible registry files into public/r/*.json
// Usage: npx shadcn@latest add https://dendense.github.io/dens-ui/r/<name>.json
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const uiDir = path.join(root, "src/components/ui")
const outDir = path.join(root, "public/r")
const BASE = process.env.REGISTRY_BASE ?? "https://dendense.github.io/dens-ui/r"
const SCHEMA = "https://ui.shadcn.com/schema/registry-item.json"

fs.mkdirSync(outDir, { recursive: true })

const titleCase = (s) => s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")
const write = (name, data) => fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(data, null, 2) + "\n")

/* theme: installs the stylesheet + fonts */
const css = fs.readFileSync(path.join(root, "src/styles/dens-ui.css"), "utf8")
write("theme", {
  $schema: SCHEMA,
  name: "theme",
  type: "registry:file",
  title: "Dens-UI theme",
  description: "Mars Green + Hermès orange tokens for light and dark. Import it after tailwindcss in your global CSS.",
  dependencies: ["@fontsource-variable/figtree", "@fontsource-variable/jetbrains-mono"],
  files: [{ path: "src/styles/dens-ui.css", type: "registry:file", target: "src/styles/dens-ui.css", content: css }],
})

/* utils */
const utils = fs.readFileSync(path.join(root, "src/lib/utils.ts"), "utf8")
write("utils", {
  $schema: SCHEMA,
  name: "utils",
  type: "registry:lib",
  dependencies: ["clsx", "tailwind-merge"],
  files: [{ path: "lib/utils.ts", type: "registry:lib", content: utils }],
})

/* components */
const items = []
for (const file of fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx")).sort()) {
  const name = file.replace(/\.tsx$/, "")
  const content = fs.readFileSync(path.join(uiDir, file), "utf8")
  const deps = new Set()
  const regDeps = new Set([`${BASE}/utils.json`])
  for (const [, spec] of content.matchAll(/from "([^"]+)"/g)) {
    if (spec === "react" || spec === "@/lib/utils") continue
    if (spec.startsWith("@/components/ui/")) regDeps.add(`${BASE}/${spec.split("/").pop()}.json`)
    else if (!spec.startsWith(".") && !spec.startsWith("@/")) deps.add(spec)
  }
  const item = {
    $schema: SCHEMA,
    name,
    type: "registry:ui",
    title: titleCase(name),
    dependencies: [...deps],
    registryDependencies: [...regDeps],
    files: [{ path: `components/ui/${file}`, type: "registry:ui", content }],
  }
  write(name, item)
  items.push(item)
}

/* all: theme + every component */
write("all", {
  $schema: SCHEMA,
  name: "all",
  type: "registry:block",
  title: "Everything in Dens-UI",
  registryDependencies: [`${BASE}/theme.json`, ...items.map((i) => `${BASE}/${i.name}.json`)],
  files: [],
})

/* index */
fs.writeFileSync(
  path.join(outDir, "registry.json"),
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "dens-ui",
      homepage: "https://dendense.github.io/dens-ui",
      items: [
        { name: "theme", type: "registry:file", title: "Dens-UI theme" },
        { name: "utils", type: "registry:lib" },
        ...items.map(({ name, type, title, dependencies, registryDependencies }) => ({ name, type, title, dependencies, registryDependencies })),
      ],
    },
    null,
    2
  ) + "\n"
)

console.log(`registry: ${items.length} components + theme, utils, all → public/r`)
