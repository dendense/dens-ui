import * as React from "react"
import { DashboardBlock } from "../blocks/dashboard"
import { LoginBlock } from "../blocks/login"
import { MobileBlock } from "../blocks/mobile"
import dashboardSource from "../blocks/dashboard.tsx?raw"
import loginSource from "../blocks/login.tsx?raw"
import mobileSource from "../blocks/mobile.tsx?raw"
import heroSource from "../blocks/hero.tsx?raw"
import footerSource from "../blocks/footer.tsx?raw"
import { HeroPhoto, HeroSplit } from "../blocks/hero"
import { FooterSheet, FooterSimple } from "../blocks/footer"
import { localImage } from "../parts/banner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ImageIcon } from "lucide-react"

function Variants({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <div className="grid gap-12">
      {items.map(([title, node]) => (
        <section key={title} className="grid gap-4">
          <h2 className="text-[22px] font-bold tracking-[-0.02em]">{title}</h2>
          {node}
        </section>
      ))}
    </div>
  )
}

function HeroBlocks() {
  const hasLocal = Boolean(localImage("hero-photo"))
  return (
    <div className="grid gap-6">
      {!hasLocal && (
        <Alert>
          <ImageIcon />
          <AlertTitle>The cat stands in for your photos</AlertTitle>
          <AlertDescription>
            Banner photos are not published with Dens-UI. Put your own files in src/site/assets/local (hero-photo, thumb-1, hero-portrait, portrait-thumb as .jpg, .png or .webp); that folder is gitignored, so licensed or private photos never reach the public repo. Until then, each slot shows this dot-matrix cat.
          </AlertDescription>
        </Alert>
      )}
      <Variants
        items={[
          ["Photo", <HeroPhoto key="p" />],
          ["Split", <HeroSplit key="s" />],
        ]}
      />
    </div>
  )
}

function FooterBlocks() {
  return (
    <Variants
      items={[
        ["Sheet", <FooterSheet key="s" />],
        ["Simple", <FooterSimple key="m" />],
      ]}
    />
  )
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "../parts/code"
import { PageHeader } from "../parts/shell"

const blocks = {
  dashboard: {
    title: "Dashboard",
    lead: "An ops overview: sidebar with counts, range control, a runs chart with the slowdown marked, a workflow table and an approval queue.",
    Comp: DashboardBlock,
    source: dashboardSource,
  },
  login: {
    title: "Login",
    lead: "Split sign-in screen. The brand side is the palette sheet carrying the pitch; the form side uses Tabs, InputGroup, Checkbox and Button.",
    Comp: LoginBlock,
    source: loginSource,
  },
  hero: {
    title: "Hero",
    lead: "Two page openers with the Navbar component. Photo: a full-bleed banner with a glass navbar, a story card and an ink band. Split: headline beside a framed image with floating cards.",
    Comp: HeroBlocks,
    source: heroSource,
  },
  footer: {
    title: "Footer",
    lead: "Sheet: an ink footer with newsletter, link columns and a wide palette-sheet strip built from the same arc geometry. Simple: one row for docs and app pages.",
    Comp: FooterBlocks,
    source: footerSource,
  },
  mobile: {
    title: "Mobile",
    lead: "Two screens of a reading app: library home and profile. Same tokens, tighter sizes, an ink tab bar.",
    Comp: MobileBlock,
    source: mobileSource,
  },
} as const

export function BlockPage({ name }: { name: keyof typeof blocks }) {
  const b = blocks[name]
  return (
    <article>
      <PageHeader title={b.title} lead={b.lead} />
      <Tabs defaultValue="preview" className="gap-4">
        <TabsList variant="line">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <b.Comp />
          <p className="mt-3 text-[13px] text-muted-foreground">Demo data. Names and figures are fictional.</p>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock code={b.source} title={`blocks/${name}.tsx`} maxHeight={640} />
        </TabsContent>
      </Tabs>
    </article>
  )
}

export function isBlock(name: string): name is keyof typeof blocks {
  return name in blocks
}
