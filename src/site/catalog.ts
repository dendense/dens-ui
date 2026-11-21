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
  {
    slug: "skeleton",
    name: "Skeleton",
    description: "Loading placeholders that keep the final shape: plain blocks, text lines, images and whole post cards.",
    demos: [
      { file: "skeleton" },
      { file: "skeleton-image", title: "Images and text" },
      { file: "skeleton-post", title: "Post cards", align: "start" },
    ],
    usage: `import { Skeleton, SkeletonText, SkeletonImage, SkeletonPostCard } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-40" />
<SkeletonText lines={3} />
<SkeletonImage ratio="16 / 9" />
<SkeletonPostCard layout="horizontal" />`,
    api: [
      { prop: "variant", type: '"pulse" | "shimmer"', default: '"pulse"', note: "SkeletonImage and the image in SkeletonPostCard default to shimmer." },
      { prop: "SkeletonText lines", type: "number", default: "3", note: "The last line is 60% wide." },
      { prop: "SkeletonImage ratio", type: "string", default: '"16 / 9"', note: "Any CSS aspect-ratio. Match the image that will replace it, so nothing jumps." },
      { prop: "SkeletonImage icon", type: "boolean", default: "true" },
      { prop: "SkeletonPostCard layout", type: '"stacked" | "horizontal"', default: '"stacked"', note: "Same geometry as PostCard." },
    ],
    notes: [
      "Skeletons are hidden from assistive tech. SkeletonPostCard has role=\"status\" and a visually hidden \"Loading post\" label.",
      "Both animations stop under prefers-reduced-motion.",
    ],
  },
  {
    slug: "post-card",
    name: "Post Card",
    description: "An image-led card for blog posts, articles and case studies, in stacked, horizontal and overlay layouts.",
    demos: [
      { file: "post-card", align: "start" },
      { file: "post-card-layouts", title: "Horizontal and overlay", align: "start" },
    ],
    usage: `import {
  PostCard, PostCardMedia, PostCardBody, PostCardMeta, PostCardTag,
  PostCardDot, PostCardTitle, PostCardExcerpt, PostCardFooter,
} from "@/components/ui/post-card"

<PostCard layout="stacked">
  <PostCardMedia ratio="16 / 10">
    <img src="/covers/retries.jpg" alt="" />
  </PostCardMedia>
  <PostCardBody>
    <PostCardMeta>
      <PostCardTag>Engineering</PostCardTag>
      <span>6 min read</span>
    </PostCardMeta>
    <PostCardTitle href="/blog/retries">How we cut settlement retries by half</PostCardTitle>
    <PostCardExcerpt>Backing off on the bank API's own schedule…</PostCardExcerpt>
    <PostCardFooter>
      <strong>Nadia Rahma</strong> <PostCardDot /> <time>Nov 18</time>
    </PostCardFooter>
  </PostCardBody>
</PostCard>`,
    api: [
      { prop: "layout", type: '"stacked" | "horizontal" | "overlay"', default: '"stacked"', note: "Horizontal puts the image beside the text from the sm breakpoint. Overlay sets the text on the image over a dark scrim." },
      { prop: "PostCardMedia ratio", type: "string", default: '"16 / 10"', note: "Ignored by overlay; horizontal cards stretch the image to the text height from sm up." },
      { prop: "PostCardTitle href", type: "string", note: "The link stretches over the whole card. Links inside PostCardTag stay clickable." },
      { prop: "PostCardTitle as", type: '"h2" | "h3" | "h4"', default: '"h3"' },
    ],
    notes: [
      "Geometry: card radius 22 = image radius 14 + padding 8, so the corners stay concentric.",
      "Cover images are decorative when the title says what the post is: give them alt=\"\".",
      "The demo covers are the palette sheet re-cut to 16:10, not photos.",
    ],
  },
  {
    slug: "divider",
    name: "Divider",
    description: "The break between page sections: a hairline, a fading line, a labelled rule, three dots or the Mars Green mark.",
    demos: [{ file: "divider" }],
    usage: `import { Divider } from "@/components/ui/divider"

<Divider />
<Divider>Earlier this year</Divider>
<Divider variant="fade" align="start"><SparklesIcon /> New in 0.2</Divider>
<Divider variant="mark" spacing="lg" />`,
    api: [
      { prop: "variant", type: '"line" | "fade" | "dots" | "mark"', default: '"line"' },
      { prop: "spacing", type: '"none" | "sm" | "md" | "lg"', default: '"md"', note: "Vertical margin: 24, 48 or 80px." },
      { prop: "align", type: '"start" | "center" | "end"', default: '"center"', note: "Where the label sits on line and fade dividers." },
      { prop: "children", type: "ReactNode", note: "Optional label. A plain string also becomes the accessible name." },
    ],
    notes: ["Use Separator for the 1px rule inside a component, and Divider between sections of a page."],
  },
  {
    slug: "chart",
    name: "Chart",
    description: "SVG charts with no chart library: candlesticks for trading, area, bar, donut, ranked bars and a segmented share bar.",
    demos: [
      { file: "chart-candlestick", title: "Candlestick (trading)", align: "start" },
      { file: "chart-area", title: "Area and line", align: "start" },
      { file: "chart-bar", title: "Bar", align: "start" },
      { file: "chart-donut", title: "Donut: share of sales", align: "start" },
      { file: "chart-share", title: "Bar list and segmented bar", align: "start" },
    ],
    usage: `import { CandlestickChart, AreaChart, BarChart, DonutChart, BarList, SegmentedBar } from "@/components/ui/chart"

<CandlestickChart data={candles} label="LMBG / IDR, daily" movingAveragePeriod={20} />

<AreaChart
  data={rows}
  index="month"
  series={[{ key: "online", name: "Online" }, { key: "store", name: "In store" }]}
/>

<DonutChart data={[{ name: "Coffee beans", value: 412 }, { name: "Gear", value: 268 }]} />`,
    api: [
      { prop: "CandlestickChart data", type: "{ time, open, high, low, close, volume? }[]" },
      { prop: "CandlestickChart movingAveragePeriod", type: "number", note: "Draws a simple moving average of the close." },
      { prop: "CandlestickChart showVolume", type: "boolean", default: "true" },
      { prop: "Area / Bar data, index, series", type: "Row[], string, { key, name, color? }[]", note: "index names the x key in each row; series take --chart-1 … --chart-5 in order." },
      { prop: "AreaChart area", type: "boolean", note: "Fill under the line. On by default for a single series." },
      { prop: "DonutChart data", type: "{ name, value, color? }[]" },
      { prop: "DonutChart centerLabel", type: "string", default: '"Total"' },
      { prop: "BarList data", type: "{ name, value, href? }[]", note: "Ranked rows with value and share of the total." },
      { prop: "SegmentedBar data", type: "{ name, value, color? }[]", note: "One whole; shares print inside a part when they fit." },
      { prop: "valueFormatter / priceFormatter", type: "(n: number) => string", note: "Compact numbers by default (12.9K, 4.2M)." },
      { prop: "label", type: "string", note: "Accessible name and caption of the hidden data table." },
    ],
    notes: [
      "Series colours come in a fixed order and were checked for colour-blind separation in light and dark: --chart-1 teal, --chart-2 orange, --chart-3 blue, --chart-4 olive, --chart-5 magenta.",
      "Candles use --chart-up and --chart-down. Up candles are hollow and down candles filled, so direction never depends on colour alone.",
      "Every chart is focusable: the left and right arrow keys move the readout, Escape clears it. Each one also renders a visually hidden table of its data.",
      "Lines are 2px, columns at most 24px wide with a 4px rounded end, and touching marks keep a 2px gap.",
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    description: "Pick a value or a range on a track. Also the scrubber and volume control of the media players.",
    demos: [{ file: "slider" }],
    usage: `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[45]} aria-label="Budget" />
<Slider defaultValue={[20, 70]} tone="highlight" aria-label="Price" />
<Slider size="sm" tone="white" value={[time]} max={duration} buffered={loaded} aria-label="Seek" />`,
    api: [
      { prop: "value / defaultValue", type: "number[]", note: "One value for a single thumb, two for a range." },
      { prop: "min, max, step", type: "number", default: "0, 100, 1" },
      { prop: "size", type: '"default" | "sm"', default: '"default"', note: "sm is the 4px media track; its thumb appears on hover or focus." },
      { prop: "tone", type: '"primary" | "highlight" | "ink" | "white"', default: '"primary"', note: "white is for controls laid over video." },
      { prop: "buffered", type: "number", note: "Media only: a second, quieter fill for what has loaded." },
      { prop: "onValueChange / onValueCommit", type: "(value: number[]) => void", note: "Commit fires once when the drag or key press ends." },
    ],
    notes: [
      "Built on Radix Slider: arrow keys step, Page Up and Page Down take big steps, Home and End jump to the ends.",
      "aria-label and aria-valuetext go on the thumb, which is the element screen readers announce. Give a range two names by passing one label; the thumbs read it as minimum and maximum.",
    ],
  },
  {
    slug: "music-player",
    name: "Music Player",
    description: "An audio player with a queue: a Now Playing card, a compact row, an app bottom bar and a playlist that share one <audio> element.",
    demos: [
      { file: "music-player", title: "Card and playlist", align: "start" },
      { file: "music-player-mini", title: "Mini" },
      { file: "music-player-bar", title: "Bottom bar", align: "start" },
    ],
    usage: `import { MusicPlayer, MusicPlayerProvider, MusicPlaylist, type Track } from "@/components/ui/music-player"

const tracks: Track[] = [
  { title: "Morning Tide", artist: "Kala Senja", src: "/media/morning-tide.m4a", cover: "/covers/tide.jpg" },
  { title: "Late Tram", artist: "Arus Pelan", src: "/media/late-tram.m4a", cover: "/covers/tram.jpg" },
]

// one player on its own
<MusicPlayer tracks={tracks} variant="mini" />

// a player and a playlist on the same queue
<MusicPlayerProvider tracks={tracks}>
  <MusicPlayer tone="ink" />
  <MusicPlaylist />
</MusicPlayerProvider>`,
    api: [
      { prop: "tracks", type: "Track[]", note: "{ title, artist, src, cover?, duration?, id? }. cover takes an image URL or any node." },
      { prop: "variant", type: '"card" | "mini" | "bar"', default: '"card"' },
      { prop: "tone", type: '"default" | "ink"', default: '"default"', note: "ink is the dark Now Playing surface." },
      { prop: "actions", type: "ReactNode", note: "bar only: buttons after the volume, such as a queue toggle." },
      { prop: "MusicPlayerProvider", type: "{ tracks, initialIndex?, onTrackChange? }", note: "Owns the audio element. Leave tracks off the players inside it." },
      { prop: "useMusicPlayer()", type: "PlayerState", note: "play(i), pause, toggle, next, prev, seek(s), setVolume, toggleShuffle, cycleRepeat and the current state." },
    ],
    notes: [
      "Previous restarts the track when more than 3 seconds have played, then goes back a track: the way people expect it from their phone.",
      "Repeat cycles off, all, one. Shuffle never picks the track that is playing.",
      "The player registers with the Media Session API, so media keys and the lock screen show the track and control it.",
      "The equalizer bars stop moving under prefers-reduced-motion. A file that fails to load says so in place of the artist.",
      "The demo music was synthesised for Dens-UI; use your own files in production.",
    ],
  },
  {
    slug: "video-player",
    name: "Video Player",
    description: "The native <video> element under Dens-UI controls: scrubber with buffer, volume, speed, captions, picture in picture and full screen.",
    demos: [{ file: "video-player" }],
    usage: `import { VideoPlayer } from "@/components/ui/video-player"

<VideoPlayer
  src="/media/launch.mp4"
  poster="/media/launch.jpg"
  title="Launch day, in two minutes"
  captions={[{ src: "/media/launch.en.vtt", srclang: "en", label: "English" }]}
/>`,
    api: [
      { prop: "src, poster", type: "string" },
      { prop: "title", type: "string", note: "Shown top-left with the controls and used as the accessible name." },
      { prop: "captions", type: "{ src, srclang, label, default? }[]", note: "WebVTT tracks. Adds a captions toggle." },
      { prop: "aspect", type: "string", default: '"16 / 9"' },
      { prop: "autoPlay, loop, muted", type: "boolean", note: "Browsers only autoplay muted video." },
    ],
    notes: [
      "Keys while the player has focus: Space or K play and pause, J and L skip 10 s, ← and → skip 5 s, ↑ and ↓ change volume, M mutes, F goes full screen, C toggles captions.",
      "Controls stay up while paused, while the pointer moves and while focus is inside the player; during playback they fade out after 2.5 s.",
      "The speed menu renders inside the player, so it still opens in full screen.",
      "Click the picture to play or pause; double-click for full screen.",
    ],
  },
]

export const componentGroups: { label: string; slugs: string[] }[] = [
  { label: "Actions", slugs: ["button", "dropdown-menu", "dialog", "tooltip"] },
  { label: "Forms", slugs: ["input", "textarea", "label", "checkbox", "radio-group", "switch", "select", "slider"] },
  { label: "Display", slugs: ["card", "post-card", "badge", "avatar", "alert", "kbd", "skeleton", "separator", "divider"] },
  { label: "Data", slugs: ["chart", "table", "progress"] },
  { label: "Media", slugs: ["music-player", "video-player"] },
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
