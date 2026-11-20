import * as React from "react"
import { MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, REPO_URL, setTheme, usePath, useTheme } from "../lib"
import { componentGroups, components } from "../catalog"
import { GitHubIcon, Mark } from "./brand"

export function ThemeToggle() {
  const theme = useTheme()
  const next = theme === "dark" ? "light" : "dark"
  return (
    <Button variant="ghost" size="icon" aria-label={`Switch to ${next} theme`} onClick={() => setTheme(next)}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

const topLinks = [
  { to: "/docs/installation", label: "Docs", match: "/docs/" },
  { to: "/docs/components/button", label: "Components", match: "/docs/components" },
  { to: "/blocks/dashboard", label: "Blocks", match: "/blocks" },
  { to: "/docs/theming", label: "Theming", match: "/docs/theming" },
]

export function TopBar() {
  const path = usePath()
  const active = (m: string) =>
    m === "/docs/" ? path.startsWith("/docs/") && !path.startsWith("/docs/components") && !path.startsWith("/docs/theming") : path.startsWith(m)
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Mark />
          <span className="text-[17px] font-bold tracking-[-0.02em]">Dens-UI</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {topLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={active(l.match) ? "page" : undefined}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:bg-card aria-[current=page]:text-foreground aria-[current=page]:shadow-panel"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <span className="mr-2 hidden font-mono text-xs text-muted-foreground sm:inline">v0.1.0</span>
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <a href={REPO_URL} aria-label="Dens-UI on GitHub" target="_blank" rel="noreferrer">
              <GitHubIcon />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

const docsNav = [
  {
    label: "Getting started",
    items: [
      { to: "/docs/introduction", label: "Introduction" },
      { to: "/docs/installation", label: "Installation" },
      { to: "/docs/theming", label: "Theming" },
    ],
  },
  ...componentGroups.map((g) => ({
    label: g.label,
    items: g.slugs.map((s) => ({ to: `/docs/components/${s}`, label: components.find((c) => c.slug === s)!.name })),
  })),
  {
    label: "Blocks",
    items: [
      { to: "/blocks/dashboard", label: "Dashboard" },
      { to: "/blocks/login", label: "Login" },
      { to: "/blocks/mobile", label: "Mobile" },
    ],
  },
]

function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePath()
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6 pb-10">
      {docsNav.map((g) => (
        <div key={g.label} className="flex flex-col gap-0.5">
          <div className="px-3 pb-1.5 text-[13px] font-semibold text-foreground">{g.label}</div>
          {g.items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              onClick={onNavigate}
              aria-current={path === it.to ? "page" : undefined}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-card/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:bg-card aria-[current=page]:font-semibold aria-[current=page]:text-foreground aria-[current=page]:shadow-panel"
            >
              {it.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const path = usePath()
  React.useEffect(() => {
    setOpen(false)
  }, [path])
  return (
    <div className="mx-auto flex max-w-[1400px] gap-10 px-4 sm:px-6">
      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-56 shrink-0 overflow-y-auto pt-8 lg:block">
        <DocsNav />
      </aside>
      <div className="min-w-0 flex-1 pb-24 pt-6 lg:pt-10">
        <div className="mb-6 lg:hidden">
          <Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? <XIcon /> : <MenuIcon />} {open ? "Close menu" : "Browse docs"}
          </Button>
          {open && (
            <div className="mt-3 rounded-2xl bg-surface p-3 ring-1 ring-border">
              <DocsNav onNavigate={() => setOpen(false)} />
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

export function PageHeader({ title, lead, className }: { title: string; lead?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-10 max-w-[68ch]", className)}>
      <h1 className="text-balance text-4xl font-bold tracking-[-0.035em] sm:text-[44px] sm:leading-[1.05]">{title}</h1>
      {lead && <p className="mt-4 text-pretty text-[17px] leading-relaxed text-muted-foreground">{lead}</p>}
    </div>
  )
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-4 mt-14 scroll-mt-24 text-[22px] font-bold tracking-[-0.02em]">
      {children}
    </h2>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <Mark className="size-5" />
          <span>Dens-UI by Denslab · MIT licensed</span>
        </div>
        <div className="flex gap-5">
          <a className="hover:text-foreground" href={REPO_URL}>GitHub</a>
          <Link className="hover:text-foreground" to="/docs/installation">Installation</Link>
          <Link className="hover:text-foreground" to="/docs/theming">Theming</Link>
        </div>
      </div>
    </footer>
  )
}
