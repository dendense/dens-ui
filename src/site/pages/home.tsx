import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { Badge, StatusDot } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { componentGroups, components } from "../catalog"
import { Link, REGISTRY_URL } from "../lib"
import { CopyButton } from "../parts/code"
import { PaletteSheet, sheetPairs } from "../parts/palette-sheet"
import { DashboardBlock } from "../blocks/dashboard"
import { LoginBlock } from "../blocks/login"

function InstallLine() {
  const cmd = `npx shadcn@latest add ${REGISTRY_URL}/button.json`
  return (
    <div className="flex max-w-full items-start gap-3 rounded-[24px] bg-card py-2 pl-4 pr-2 shadow-panel ring-1 ring-border">
      <span className="select-none pt-1.5 font-mono text-[13px] text-primary">$</span>
      <code className="min-w-0 flex-1 py-1.5 font-mono text-[13px] leading-relaxed [overflow-wrap:break-word]">
        {cmd.split("/").map((part, i, all) => (
          <React.Fragment key={i}>
            {part}
            {i < all.length - 1 && (
              <>
                /<wbr />
              </>
            )}
          </React.Fragment>
        ))}
      </code>
      <CopyButton value={cmd} className="shrink-0 rounded-full" />
    </div>
  )
}

function SheetCard() {
  return (
    <Card className="gap-3 py-[3cqw] shadow-raised">
      <div className="flex items-center justify-between gap-2 px-[3.2cqw]">
        <span className="text-[clamp(11px,2.6cqw,15px)] font-semibold">Runs today</span>
        <Badge variant="highlight" className="text-[clamp(9px,2cqw,12px)]">Waiting on you</Badge>
      </div>
      <div className="px-[3.2cqw]">
        <Tabs defaultValue="today">
          <TabsList className="h-[clamp(28px,6.6cqw,40px)] [&_button]:px-[clamp(6px,2.2cqw,14px)] [&_button]:text-[clamp(10px,2.3cqw,14px)]" aria-label="Range">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="7d">7 days</TabsTrigger>
            <TabsTrigger value="30d">30 days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center justify-between gap-2 px-[3.2cqw]">
        <Label htmlFor="hero-retry" className="text-[clamp(10px,2.3cqw,14px)] font-medium">
          <StatusDot /> Auto-retry
        </Label>
        <Switch id="hero-retry" defaultChecked />
      </div>
    </Card>
  )
}

export function HomePage() {
  const [pair, setPair] = React.useState(0)
  const total = components.length
  return (
    <div>
      {/* First viewport */}
      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16 lg:pt-16 xl:grid-cols-[minmax(0,1fr)_600px]">
        <div className="max-w-xl">
          <h1 className="text-[clamp(56px,9vw,96px)] font-bold leading-[0.92] tracking-[-0.04em]">
            Dens<span className="text-brand">-</span>UI
          </h1>
          <p className="mt-6 text-pretty text-[19px] leading-relaxed text-muted-foreground">
            {total} React components and a theme you copy into your project, not a package you depend on.
            Mars Green, one orange accent, soft light panels and a near-black dark mode. Built on Radix and
            Tailwind v4, and installable with the shadcn CLI.
          </p>
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4">
            <InstallLine />
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/docs/installation">
                  Get started <ArrowRightIcon />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/docs/components/button">Browse components</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <PaletteSheet pair={pair} topSlot={<SheetCard />} />
          <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Palette pairing">
            <span className="mr-1 text-[13px] text-muted-foreground">Pairings from the sheet:</span>
            {sheetPairs.map((p, i) => (
              <button
                key={p.accent.name}
                type="button"
                onClick={() => setPair(i)}
                aria-pressed={pair === i}
                aria-label={`${p.soft.name} and ${p.accent.name}`}
                title={`${p.soft.name} + ${p.accent.name}`}
                className="flex h-8 items-center gap-0.5 rounded-full bg-card px-1.5 ring-1 ring-border transition-shadow outline-none hover:shadow-panel focus-visible:ring-2 focus-visible:ring-ring aria-pressed:ring-2 aria-pressed:ring-foreground"
              >
                <span className="size-5 rounded-full" style={{ background: "#008C8D" }} />
                <span className="size-5 rounded-full" style={{ background: p.soft.hex }} />
                <span className="size-5 rounded-full" style={{ background: p.accent.hex }} />
              </button>
            ))}
          </div>
          <p className="mt-2 text-[13px] text-muted-foreground">
            The theme ships Mars Green with Mint and Hermès orange; the other pairings are the reference sheets, kept as supporting colors.
          </p>
        </div>
      </section>

      {/* The kit at work */}
      <section className="border-t border-border/70 bg-surface/60">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[60ch]">
              <h2 className="text-[34px] font-bold leading-tight tracking-[-0.035em]">An ops console, built only from the kit</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
                Sidebar, Tabs, Card, Table, Badge, Button, Tooltip and Kbd, composed the way the reference dashboards are. Switch the theme in the top bar to see dark mode.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/blocks/dashboard">View block source <ArrowRightIcon /></Link>
            </Button>
          </div>
          <DashboardBlock />
          <p className="mt-3 text-[13px] text-muted-foreground">Demo data. Lumbung is a fictional workspace; its people and figures are invented.</p>
        </div>
      </section>

      {/* Index */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <div>
            <h2 className="text-[34px] font-bold leading-tight tracking-[-0.035em]">Everything in the kit</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
              Each component is one file in <code className="font-mono text-[14px] text-foreground">components/ui</code>. Install the ones you need; nothing else comes along.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {componentGroups.map((g) => (
              <div key={g.label}>
                <h3 className="border-b border-border pb-2 text-sm font-semibold">{g.label}</h3>
                <ul className="mt-1">
                  {g.slugs.map((s) => {
                    const c = components.find((x) => x.slug === s)!
                    return (
                      <li key={s}>
                        <Link
                          to={`/docs/components/${s}`}
                          className="group flex items-baseline gap-3 rounded-lg py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <span className="w-32 shrink-0 text-[15px] font-semibold group-hover:text-primary">{c.name}</span>
                          <span className="line-clamp-1 text-[13.5px] text-muted-foreground">{c.description}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[34px] font-bold leading-tight tracking-[-0.035em]">Blocks: whole screens to start from</h2>
          <div className="flex gap-2">
            <Button variant="outline" asChild><Link to="/blocks/login">Login</Link></Button>
            <Button variant="outline" asChild><Link to="/blocks/mobile">Mobile</Link></Button>
          </div>
        </div>
        <LoginBlock />
      </section>
    </div>
  )
}
