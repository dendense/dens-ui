import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { components, getDemo, getUiSource, npmDepsFor } from "../catalog"
import { Link, REGISTRY_URL, REPO_URL } from "../lib"
import { CodeBlock } from "../parts/code"
import { ComponentPreview } from "../parts/preview"
import { H2, PageHeader } from "../parts/shell"
import { PaletteSheet, sheetPairs } from "../parts/palette-sheet"
import themeCss from "@/styles/dens-ui.css?raw"
import utilsSource from "@/lib/utils.ts?raw"

export function Pager({ prev, next }: { prev?: { to: string; label: string }; next?: { to: string; label: string } }) {
  return (
    <div className="mt-16 flex justify-between gap-4 border-t border-border pt-6">
      {prev ? (
        <Link to={prev.to} className="flex items-center gap-2 text-sm font-semibold hover:text-primary">
          <ArrowLeftIcon className="size-4" /> {prev.label}
        </Link>
      ) : <span />}
      {next && (
        <Link to={next.to} className="flex items-center gap-2 text-sm font-semibold hover:text-primary">
          {next.label} <ArrowRightIcon className="size-4" />
        </Link>
      )}
    </div>
  )
}

export function IntroductionPage() {
  return (
    <article>
      <PageHeader
        title="Introduction"
        lead="Dens-UI is a set of React components and a theme. You copy them into your app and they become your code."
      />
      <div className="prose-dens">
        <p>
          Dens-UI follows the <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">shadcn/ui</a> model. There is no
          <code>dens-ui</code> package to install and keep up to date. Each component is a single file built on
          Radix primitives and Tailwind CSS v4 classes, and you are free to change any line of it.
        </p>
        <p>
          What Dens-UI adds is a <strong>committed look</strong>. The palette comes from a Mars Green colour study:
          Mars Green <code>#008C8D</code> as the brand colour, Hermès orange <code>#FF8A00</code> as the single accent,
          mint <code>#C0EBD7</code> for soft fills. Light mode sits on a soft green-grey ground with white, large-radius
          panels; dark mode sits on the palette sheet's near-black.
        </p>
        <p>
          The token names are the same ones shadcn/ui uses, so a component you already copied from shadcn picks up
          the Dens-UI theme as soon as the stylesheet is in place.
        </p>
      </div>
      <H2>What you get</H2>
      <ul className="prose-dens list-disc space-y-2 pl-5">
        <li><strong>dens-ui.css</strong>: the theme. Colour, radius, elevation and motion tokens for light and dark.</li>
        <li><strong>{components.length} components</strong> in <code>components/ui</code>, from Button to Sidebar.</li>
        <li><strong>Blocks</strong>: a dashboard, a login screen and two mobile screens composed from the components.</li>
        <li><strong>A registry</strong> at <code>{REGISTRY_URL}</code>, so the shadcn CLI can install everything.</li>
      </ul>
      <Pager next={{ to: "/docs/installation", label: "Installation" }} />
    </article>
  )
}

export function InstallationPage() {
  return (
    <article>
      <PageHeader title="Installation" lead="Set up Tailwind v4, add the Dens-UI theme, then add components one at a time." />

      <H2>1. Start from a Tailwind v4 project</H2>
      <p className="prose-dens mb-4">
        Any React setup works: Vite, Next.js, Remix. If you have not configured shadcn/ui yet, run its init once. It
        creates <code>components.json</code>, the <code>@/</code> path alias and <code>lib/utils.ts</code>.
      </p>
      <CodeBlock lang="bash" code={`npx shadcn@latest init`} />

      <H2>2. Add the theme</H2>
      <Tabs defaultValue="cli" className="gap-4">
        <TabsList variant="line">
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" className="grid gap-4">
          <CodeBlock lang="bash" code={`npx shadcn@latest add ${REGISTRY_URL}/theme.json`} />
          <p className="prose-dens">
            This writes <code>src/styles/dens-ui.css</code> and installs the two variable fonts. Then import it in
            your global stylesheet, right after Tailwind:
          </p>
        </TabsContent>
        <TabsContent value="manual" className="grid gap-4">
          <CodeBlock lang="bash" code={`npm install @fontsource-variable/figtree @fontsource-variable/jetbrains-mono`} />
          <p className="prose-dens">
            Copy <a href={`${REPO_URL}/blob/main/src/styles/dens-ui.css`}>dens-ui.css</a> into your project, then
            import it in your global stylesheet, right after Tailwind:
          </p>
        </TabsContent>
      </Tabs>
      <CodeBlock
        className="mt-4"
        lang="css"
        title="src/index.css"
        code={`@import "tailwindcss";
@import "@fontsource-variable/figtree";
@import "@fontsource-variable/jetbrains-mono";
@import "./styles/dens-ui.css";`}
      />
      <Alert className="mt-4">
        <InfoIcon />
        <AlertTitle>Replacing the shadcn defaults</AlertTitle>
        <AlertDescription>
          If shadcn init already wrote <code className="font-mono text-[12.5px]">:root</code> and <code className="font-mono text-[12.5px]">.dark</code> variables into your CSS, delete them. Dens-UI defines the same names.
        </AlertDescription>
      </Alert>

      <H2>3. Add components</H2>
      <p className="prose-dens mb-4">Each component has its own registry file. Dependencies such as Radix and lucide-react are installed for you.</p>
      <CodeBlock
        lang="bash"
        code={`npx shadcn@latest add ${REGISTRY_URL}/button.json
npx shadcn@latest add ${REGISTRY_URL}/card.json ${REGISTRY_URL}/tabs.json`}
      />
      <p className="prose-dens mt-4">Or everything at once:</p>
      <CodeBlock lang="bash" code={`npx shadcn@latest add ${REGISTRY_URL}/all.json`} className="mt-4" />
      <p className="prose-dens mt-4">
        Prefer copying by hand? Every component page has a <strong>Manual</strong> tab with the full source. Components import
        <code>cn</code> from <code>@/lib/utils</code>:
      </p>
      <CodeBlock code={utilsSource} title="src/lib/utils.ts" className="mt-4" />

      <H2>4. Dark mode</H2>
      <p className="prose-dens mb-4">
        Dark mode is class-based. Put <code>dark</code> on <code>&lt;html&gt;</code> and every token switches.
      </p>
      <CodeBlock code={`document.documentElement.classList.toggle("dark", prefersDark)`} />
      <Pager prev={{ to: "/docs/introduction", label: "Introduction" }} next={{ to: "/docs/theming", label: "Theming" }} />
    </article>
  )
}

const tokenRows: { token: string; role: string }[] = [
  { token: "background", role: "Page ground" },
  { token: "surface", role: "Recessed wells inside panels" },
  { token: "card", role: "Panels, menus, dialogs" },
  { token: "foreground", role: "Ink: text and the ink button" },
  { token: "muted-foreground", role: "Secondary text" },
  { token: "brand", role: "Mars Green swatch, for large fills" },
  { token: "primary", role: "Mars Green tuned for AA text on it" },
  { token: "highlight", role: "Hermès orange, the one accent" },
  { token: "soft", role: "Mint fills, success" },
  { token: "warning", role: "Champagne" },
  { token: "info", role: "Klein blue" },
  { token: "destructive", role: "Cartier red (pomegranate in dark)" },
  { token: "rail", role: "Ink icon rail beside the sidebar" },
  { token: "border", role: "Hairlines" },
  { token: "ring", role: "Focus rings" },
]

function readToken(css: string, scope: ":root" | ".dark", token: string) {
  const block = css.split(scope === ":root" ? ":root {" : ".dark {")[1]?.split("}")[0] ?? ""
  return block.match(new RegExp(`--${token}:\\s*([^;]+);`))?.[1]?.trim() ?? ""
}

export function ThemingPage() {
  return (
    <article>
      <PageHeader
        title="Theming"
        lead="One stylesheet, two modes. Every colour is a CSS variable with a shadcn-compatible name, plus a few Dens-UI roles."
      />
      <div className="max-w-[560px]">
        <PaletteSheet />
      </div>

      <H2>The five sheets</H2>
      <p className="prose-dens mb-6">
        The reference study pairs Mars Green with five soft-and-strong couples. Dens-UI ships the first as its theme;
        the other four supply <code>warning</code>, <code>info</code>, <code>destructive</code> and the chart series.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sheetPairs.map((p, i) => (
          <figure key={p.accent.name} className="grid gap-2">
            <PaletteSheet pair={i} />
            <figcaption className="text-[13px] text-muted-foreground">
              <span className="font-semibold text-foreground">{p.soft.name} + {p.accent.name}</span>
              {i === 0 ? " · the shipped theme" : " · supporting colours"}
            </figcaption>
          </figure>
        ))}
      </div>

      <H2>Colour tokens</H2>
      <p className="prose-dens mb-6">
        Use them as Tailwind classes: <code>bg-primary</code>, <code>text-muted-foreground</code>, <code>ring-ring</code>,
        <code>bg-highlight/10</code>. The values below are read from the shipped stylesheet.
      </p>
      <div className="overflow-x-auto rounded-2xl bg-card ring-1 ring-border">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
              <th className="px-4 py-3 font-medium">Token</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Light</th>
              <th className="px-4 py-3 font-medium">Dark</th>
            </tr>
          </thead>
          <tbody>
            {tokenRows.map((r) => {
              const light = readToken(themeCss, ":root", r.token)
              const dark = readToken(themeCss, ".dark", r.token)
              return (
                <tr key={r.token} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[12.5px] font-medium">--{r.token}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{r.role}</td>
                  {[light, dark].map((v, i) => (
                    <td key={i} className="px-4 py-2.5">
                      <span className="flex items-center gap-2 font-mono text-[12px]">
                        <span className="size-5 shrink-0 rounded-md ring-1 ring-black/10" style={{ background: v }} />
                        {v}
                      </span>
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <H2>Shape, depth and type</H2>
      <div className="prose-dens">
        <p>
          <strong>Radius.</strong> <code>--radius</code> is 14px. Controls are pills (<code>rounded-full</code>), fields use
          <code>rounded-lg</code>, panels use <code>rounded-2xl</code> (22px) and dialogs <code>rounded-3xl</code> (28px).
        </p>
        <p>
          <strong>Elevation.</strong> Two soft, offset shadows: <code>shadow-panel</code> for cards resting on the ground and
          <code>shadow-raised</code> for menus, dialogs and the item that needs attention.
        </p>
        <p>
          <strong>Type.</strong> Figtree for interface and reading text, JetBrains Mono for code, IDs, timestamps and column heads.
          Headings are tight (<code>tracking-[-0.035em]</code>); numbers use <code>tabular-nums</code>.
        </p>
        <p>
          <strong>Colour discipline.</strong> Mars Green does the work: primary actions, focus, selection, charts. Orange appears
          only where something is waiting on the reader. Use the <code>brand</code> card variant at most once per screen.
        </p>
      </div>

      <H2>The stylesheet</H2>
      <CodeBlock code={themeCss} lang="css" title="src/styles/dens-ui.css" maxHeight={520} />
      <Pager prev={{ to: "/docs/installation", label: "Installation" }} next={{ to: "/docs/desktop", label: "Desktop apps" }} />
    </article>
  )
}

export function ComponentPage({ slug }: { slug: string }) {
  const index = components.findIndex((c) => c.slug === slug)
  const doc = components[index]
  if (!doc) return <NotFound />
  const prev = components[index - 1]
  const next = components[index + 1]
  const [first, ...rest] = doc.demos
  const firstDemo = getDemo(first.file)
  const deps = npmDepsFor(slug)
  return (
    <article>
      <PageHeader title={doc.name} lead={doc.description} />
      {firstDemo.Component && (
        <ComponentPreview code={firstDemo.source} align={first.align}>
          <firstDemo.Component />
        </ComponentPreview>
      )}

      <H2>Installation</H2>
      <Tabs defaultValue="cli" className="gap-4">
        <TabsList variant="line">
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli">
          <CodeBlock lang="bash" code={`npx shadcn@latest add ${REGISTRY_URL}/${slug}.json`} />
        </TabsContent>
        <TabsContent value="manual" className="grid gap-4">
          {deps.length > 0 && <CodeBlock lang="bash" code={`npm install ${deps.join(" ")}`} />}
          <CodeBlock code={getUiSource(slug)} title={`components/ui/${slug}.tsx`} maxHeight={480} />
        </TabsContent>
      </Tabs>

      <H2>Usage</H2>
      <CodeBlock code={doc.usage} />

      {rest.map((d) => {
        const demo = getDemo(d.file)
        return (
          <section key={d.file}>
            <H2>{d.title}</H2>
            {demo.Component && (
              <ComponentPreview code={demo.source} align={d.align}>
                <demo.Component />
              </ComponentPreview>
            )}
          </section>
        )
      })}

      {doc.api && (
        <>
          <H2>API</H2>
          <div className="overflow-x-auto rounded-2xl bg-card ring-1 ring-border">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Prop</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                </tr>
              </thead>
              <tbody>
                {doc.api.map((r) => (
                  <tr key={r.prop} className="border-b border-border/70 align-top last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[12.5px] font-medium">{r.prop}</td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-[12px] text-primary">{r.type}</code>
                      {r.note && <div className="mt-1 text-[13px] text-muted-foreground">{r.note}</div>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[12px] text-muted-foreground">{r.default ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] text-muted-foreground">All other props pass through to the underlying element or Radix primitive.</p>
        </>
      )}

      {doc.notes && doc.notes.length > 0 && (
        <>
          <H2>Notes</H2>
          <ul className="prose-dens list-disc space-y-2 pl-5">
            {doc.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </>
      )}

      {doc.credit && (
        <p className="mt-6 text-[13px] text-muted-foreground">
          {doc.credit.text}{" "}
          <a href={doc.credit.href} target="_blank" rel="noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">
            {doc.credit.label}
          </a>
        </p>
      )}

      <Pager
        prev={prev ? { to: `/docs/components/${prev.slug}`, label: prev.name } : { to: "/docs/theming", label: "Theming" }}
        next={next ? { to: `/docs/components/${next.slug}`, label: next.name } : { to: "/blocks/dashboard", label: "Blocks" }}
      />
    </article>
  )
}

export function NotFound() {
  return (
    <article>
      <PageHeader title="Page not found" lead="That address is not part of the docs. It may have moved." />
      <Link to="/" className="font-semibold text-primary hover:underline">Back to the home page</Link>
    </article>
  )
}
