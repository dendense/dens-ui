import type * as React from "react"

export type ApiRow = { prop: string; type: string; default?: string; note?: string }

export type ComponentDoc = {
  slug: string
  name: string
  description: string
  /** demo file names in src/site/demos (without .tsx); first is the hero preview */
  demos: { file: string; title?: string; align?: "center" | "start" }[]
  usage: string
  api?: ApiRow[]
  notes?: string[]
}

const demoModules = import.meta.glob<{ default: React.ComponentType }>("./demos/*.tsx", { eager: true })
const demoSources = import.meta.glob<string>("./demos/*.tsx", { eager: true, query: "?raw", import: "default" })
const uiSources = import.meta.glob<string>("../components/ui/*.tsx", { eager: true, query: "?raw", import: "default" })

export function getDemo(file: string) {
  const key = `./demos/${file}.tsx`
  return { Component: demoModules[key]?.default, source: demoSources[key] ?? "" }
}

export function getUiSource(slug: string) {
  return uiSources[`../components/ui/${slug}.tsx`] ?? ""
}

export const components: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    description: "Pill-shaped actions. Mars Green for the primary action, ink for confirmations, orange only for the one thing that needs attention.",
    demos: [{ file: "button" }, { file: "button-variants", title: "Variants and sizes" }],
    usage: `import { Button } from "@/components/ui/button"

<Button>New workflow</Button>
<Button variant="ink">Approve</Button>
<Button asChild><a href="/runs">Open run log</a></Button>`,
    api: [
      { prop: "variant", type: '"default" | "ink" | "highlight" | "soft" | "secondary" | "outline" | "ghost" | "destructive" | "link"', default: '"default"' },
      { prop: "size", type: '"sm" | "default" | "lg" | "icon" | "icon-sm"', default: '"default"' },
      { prop: "asChild", type: "boolean", default: "false", note: "Render the child element (e.g. a link) with button styles." },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    description: "Status and counts. Pair with StatusDot for health states, use highlight for anything waiting on the reader.",
    demos: [{ file: "badge" }],
    usage: `import { Badge, StatusDot } from "@/components/ui/badge"

<Badge variant="soft"><StatusDot /> Healthy</Badge>
<Badge variant="highlight">Waiting on you</Badge>`,
    api: [
      { prop: "variant", type: '"default" | "highlight" | "soft" | "secondary" | "outline" | "success" | "warning" | "info" | "destructive"', default: '"default"' },
      { prop: "StatusDot tone", type: '"brand" | "highlight" | "destructive" | "muted"', default: '"brand"' },
    ],
  },
  {
    slug: "card",
    name: "Card",
    description: "The white, 22px-radius panel the whole system sits on. Variants for a recessed well, a brand panel and an ink panel.",
    demos: [{ file: "card" }],
    usage: `import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Runs today</CardTitle>
    <CardDescription>47 more scheduled before 24:00</CardDescription>
    <CardAction><Button size="sm" variant="outline">Open</Button></CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>`,
    api: [{ prop: "variant", type: '"default" | "inset" | "brand" | "ink"', default: '"default"', note: "Use brand at most once per screen." }],
  },
  {
    slug: "input",
    name: "Input",
    description: "Text fields with a soft inset, a Mars Green focus ring and an aria-invalid error state. InputGroup adds a leading icon or trailing hint.",
    demos: [{ file: "input" }],
    usage: `import { Input, InputGroup } from "@/components/ui/input"

<InputGroup start={<SearchIcon />} end={<Kbd>⌘K</Kbd>}>
  <Input placeholder="Search workflows" />
</InputGroup>`,
    api: [
      { prop: "aria-invalid", type: "boolean", note: "Switches to the error border and ring." },
      { prop: "InputGroup start / end", type: "ReactNode", note: "Leading icon and trailing element." },
    ],
  },
  { slug: "textarea", name: "Textarea", description: "Multi-line input that grows with its content (field-sizing: content).", demos: [{ file: "textarea" }], usage: `import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Add a note" />` },
  { slug: "label", name: "Label", description: "Accessible label built on Radix Label. Dims itself when its peer control is disabled.", demos: [{ file: "label" }], usage: `import { Label } from "@/components/ui/label"

<Label htmlFor="email">Work email</Label>` },
  {
    slug: "checkbox",
    name: "Checkbox",
    description: "Checked, unchecked and indeterminate, on Radix Checkbox.",
    demos: [{ file: "checkbox", align: "start" }],
    usage: `import { Checkbox } from "@/components/ui/checkbox"

<Checkbox id="retry" defaultChecked />`,
    api: [{ prop: "checked", type: 'boolean | "indeterminate"' }],
  },
  {
    slug: "switch",
    name: "Switch",
    description: "On/off toggle for settings that apply immediately.",
    demos: [{ file: "switch" }],
    usage: `import { Switch } from "@/components/ui/switch"

<Switch defaultChecked />
<Switch tone="highlight" />`,
    api: [{ prop: "tone", type: '"primary" | "highlight" | "ink"', default: '"primary"' }],
  },
  { slug: "radio-group", name: "Radio Group", description: "One choice from a short list. Arrow keys move between options.", demos: [{ file: "radio-group" }], usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="daily">
  <RadioGroupItem value="daily" id="daily" />
</RadioGroup>` },
  {
    slug: "select",
    name: "Select",
    description: "A listbox on Radix Select. The small size turns into a pill, for filters in card headers.",
    demos: [{ file: "select" }],
    usage: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

<Select defaultValue="week">
  <SelectTrigger size="sm"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="day">Day</SelectItem>
    <SelectItem value="week">Week</SelectItem>
  </SelectContent>
</Select>`,
    api: [{ prop: "SelectTrigger size", type: '"sm" | "default"', default: '"default"' }],
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "Two looks from the references: a segmented pill control for ranges, and underlined tabs with counts for lists.",
    demos: [{ file: "tabs" }],
    usage: `import { Tabs, TabsList, TabsTrigger, TabsContent, TabsCount } from "@/components/ui/tabs"

<Tabs defaultValue="today">
  <TabsList>
    <TabsTrigger value="today">Today</TabsTrigger>
    <TabsTrigger value="7d">7 days</TabsTrigger>
  </TabsList>
</Tabs>

<TabsList variant="line">
  <TabsTrigger value="active">Active <TabsCount>18</TabsCount></TabsTrigger>
</TabsList>`,
    api: [{ prop: "TabsList variant", type: '"pill" | "line"', default: '"pill"' }],
  },
  {
    slug: "dialog",
    name: "Dialog",
    description: "A modal for decisions that need protected focus, like approving money movement.",
    demos: [{ file: "dialog" }],
    usage: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Approve payout?</DialogTitle>
      <DialogDescription>…</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
    api: [{ prop: "DialogContent showCloseButton", type: "boolean", default: "true" }],
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    description: "Row actions and overflow menus, with shortcuts, checkbox items and a destructive item.",
    demos: [{ file: "dropdown-menu" }],
    usage: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Actions</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    api: [{ prop: "DropdownMenuItem variant", type: '"default" | "destructive"', default: '"default"' }],
  },
  { slug: "tooltip", name: "Tooltip", description: "An ink label for icon-only controls. Each Tooltip brings its own provider.", demos: [{ file: "tooltip" }], usage: `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger asChild><Button size="icon" aria-label="Alerts"><BellIcon /></Button></TooltipTrigger>
  <TooltipContent>3 approvals waiting</TooltipContent>
</Tooltip>` },
  { slug: "avatar", name: "Avatar", description: "Image with initials fallback, plus an overlapping AvatarGroup.", demos: [{ file: "avatar" }], usage: `import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/dana.jpg" alt="Nadia Rahma" />
  <AvatarFallback>NR</AvatarFallback>
</Avatar>` },
  {
    slug: "progress",
    name: "Progress",
    description: "A determinate bar. Give it an aria-label or a visible label.",
    demos: [{ file: "progress" }],
    usage: `import { Progress } from "@/components/ui/progress"

<Progress value={72} aria-label="Monthly balance" />`,
    api: [
      { prop: "value", type: "number", note: "0 to 100" },
      { prop: "tone", type: '"primary" | "highlight" | "ink"', default: '"primary"' },
    ],
  },
  {
    slug: "alert",
    name: "Alert",
    description: "Inline messages that name the problem and the way out. No colored side stripes: tone comes from the fill.",
    demos: [{ file: "alert" }],
    usage: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

<Alert variant="highlight">
  <ZapIcon />
  <AlertTitle>Settlement sync is 2.4× slower</AlertTitle>
  <AlertDescription>Pause retries for 15 minutes.</AlertDescription>
</Alert>`,
    api: [{ prop: "variant", type: '"default" | "soft" | "highlight" | "warning" | "destructive"', default: '"default"' }],
  },
  { slug: "table", name: "Table", description: "Plain semantic table with mono column heads and tabular numerals.", demos: [{ file: "table", align: "start" }], usage: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"` },
  {
    slug: "sidebar",
    name: "Sidebar",
    description: "The navigation from the references: sections with counts, collapsible folders, a collapsed mode, and an ink icon rail with a 24-hour meter.",
    demos: [{ file: "sidebar" }, { file: "sidebar-rail", title: "Icon rail, 24h meter and folder tree", align: "start" }],
    usage: `import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarCount, SidebarFooter, SidebarFolder, SidebarRail, SidebarRailItem, SidebarMeter } from "@/components/ui/sidebar"

<Sidebar>
  <SidebarSection label="Workspace">
    <SidebarItem icon={<LayoutGridIcon />} active>Overview</SidebarItem>
    <SidebarItem icon={<WorkflowIcon />} badge={<SidebarCount>24</SidebarCount>}>Workflows</SidebarItem>
    <SidebarFolder icon={<FolderIcon />} label="Finance" defaultOpen>
      <SidebarItem size="sm">Month-end close</SidebarItem>
    </SidebarFolder>
  </SidebarSection>
</Sidebar>

<SidebarRail aria-label="Apps">
  <SidebarRailItem label="Overview" active><LayoutGridIcon /></SidebarRailItem>
  <SidebarRailItem label="Approvals" dot><CheckCircle2Icon /></SidebarRailItem>
</SidebarRail>
<SidebarMeter label="24h" total={286} levels={hourlyRuns} />`,
    api: [
      { prop: "collapsed", type: "boolean", default: "false", note: "Icon rail; string labels become title tooltips." },
      { prop: "SidebarItem active", type: "boolean", note: "Sets aria-current=page." },
      { prop: "SidebarItem asChild", type: "boolean", note: "Wrap your router's Link." },
      { prop: "SidebarItem size", type: '"default" | "sm"', default: '"default"', note: "Use sm for items inside a SidebarFolder." },
      { prop: "SidebarFolder", type: "label, icon, badge, defaultOpen, open, onOpenChange", note: "Collapsible group on Radix Collapsible; the badge hides while open." },
      { prop: "SidebarRailItem", type: "label (required), active, dot, asChild", note: "label is the accessible name; dot marks an area that needs attention." },
      { prop: "SidebarMeter", type: "label, total?, levels: number[]", note: "One tick per period, newest at the bottom in the highlight colour." },
    ],
  },
  {
    slug: "navbar",
    name: "Navbar",
    description: "The header pill: brand, links with an active marker, actions, and a menu that takes over below md. Solid, glass (over photos) and ink.",
    demos: [{ file: "navbar" }],
    usage: `import { Navbar, NavbarBrand, NavbarLinks, NavbarLink, NavbarActions, NavbarMenu } from "@/components/ui/navbar"

<Navbar variant="glass">
  <NavbarBrand href="/">Lembar</NavbarBrand>
  <NavbarLinks>
    <NavbarLink href="/" active>Discover</NavbarLink>
    <NavbarLink href="/stories">Stories</NavbarLink>
  </NavbarLinks>
  <NavbarActions>
    <Button>Start a story</Button>
    <NavbarMenu>
      <DropdownMenuItem asChild><a href="/">Discover</a></DropdownMenuItem>
    </NavbarMenu>
  </NavbarActions>
</Navbar>`,
    api: [
      { prop: "variant", type: '"solid" | "glass" | "ink"', default: '"solid"', note: "Glass is for sitting on a photo; keep a scrim under it." },
      { prop: "NavbarLink active", type: "boolean", note: "Sets aria-current=page and shows the 16 × 2 marker." },
      { prop: "NavbarMenu", type: "children: DropdownMenuItem[]", note: "Shown below md, where NavbarLinks hide." },
    ],
    notes: ["Height 56, inner padding 8: 40px actions keep the corners concentric (28 = 20 + 8)."],
  },
  {
    slug: "footer",
    name: "Footer",
    description: "Site footer parts: brand, link columns and a bottom bar, in a panel or near-black ink.",
    demos: [{ file: "footer", align: "start" }],
    usage: `import { Footer, FooterTop, FooterBrand, FooterColumns, FooterColumn, FooterLink, FooterBottom } from "@/components/ui/footer"

<Footer variant="ink">
  <FooterTop>
    <FooterBrand>…</FooterBrand>
    <FooterColumns>
      <FooterColumn title="Product">
        <FooterLink href="/changelog">Changelog</FooterLink>
      </FooterColumn>
    </FooterColumns>
  </FooterTop>
  <FooterBottom>© 2026 Lumbung</FooterBottom>
</Footer>`,
    api: [
      { prop: "variant", type: '"default" | "ink"', default: '"default"' },
      { prop: "FooterColumn title", type: "string", note: "Rendered as a heading that labels its list." },
    ],
  },
  { slug: "separator", name: "Separator", description: "A 1px rule, horizontal or vertical.", demos: [{ file: "separator" }], usage: `import { Separator } from "@/components/ui/separator"

<Separator orientation="vertical" />` },
  { slug: "kbd", name: "Kbd", description: "Keyboard keys, for shortcut hints in menus, inputs and help text.", demos: [{ file: "kbd" }], usage: `import { Kbd } from "@/components/ui/kbd"

<Kbd>⌘K</Kbd>` },
  { slug: "skeleton", name: "Skeleton", description: "A loading placeholder in the muted tone.", demos: [{ file: "skeleton" }], usage: `import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-40" />` },
]

export const componentGroups: { label: string; slugs: string[] }[] = [
  { label: "Actions", slugs: ["button", "dropdown-menu", "dialog", "tooltip"] },
  { label: "Forms", slugs: ["input", "textarea", "label", "checkbox", "radio-group", "switch", "select"] },
  { label: "Display", slugs: ["card", "badge", "avatar", "table", "progress", "alert", "kbd", "skeleton", "separator"] },
  { label: "Navigation", slugs: ["navbar", "sidebar", "tabs", "footer"] },
]

/** registry dependencies used by the install instructions */
export function npmDepsFor(slug: string) {
  const src = getUiSource(slug)
  const deps = new Set<string>()
  for (const m of src.matchAll(/from "([^"@.][^"]*|@[^/"]+\/[^"]+)"/g)) {
    const name = m[1]
    if (name === "react" || name.startsWith("@/")) continue
    deps.add(name)
  }
  return [...deps]
}
