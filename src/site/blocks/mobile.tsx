import {
  BellIcon,
  BookmarkIcon,
  ChevronRightIcon,
  CompassIcon,
  DownloadIcon,
  HeartIcon,
  HistoryIcon,
  HomeIcon,
  LibraryIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  PlayIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  UserIcon,
  BarChart3Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* Book covers are authored typographic covers in the palette, demo content only. */
const covers = {
  arus: { bg: "#008C8D", fg: "#FFF2DF", title: "Arus Tenang", author: "Sari Wulan" },
  kota: { bg: "#FF8A00", fg: "#0c0b0b", title: "Kota Tanpa Peta", author: "Bima Arya" },
  garam: { bg: "#0B3289", fg: "#AED4E1", title: "Garam & Waktu", author: "Rani Putri" },
}

function Cover({ book, className }: { book: keyof typeof covers; className?: string }) {
  const c = covers[book]
  return (
    <div className={cn("relative flex flex-col justify-between overflow-hidden rounded-lg p-2.5 shadow-[0_6px_14px_-6px_rgb(0_0_0/0.35)]", className)} style={{ background: c.bg, color: c.fg }}>
      <span className="absolute -right-6 -top-6 size-16 rounded-full opacity-25" style={{ background: c.fg }} />
      <div className="relative text-[13px] font-bold leading-[1.05] tracking-[-0.02em]">{c.title}</div>
      <div className="relative text-[8px] font-medium uppercase tracking-[0.12em] opacity-80">{c.author}</div>
    </div>
  )
}

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="relative h-[640px] w-[300px] shrink-0 overflow-hidden rounded-[44px] bg-card p-0 shadow-raised ring-[6px] ring-[#0c0b0b] dark:ring-[#2b302f]">
        <div className="flex h-9 items-center justify-between px-7 pt-2 text-[12px] font-semibold">
          <span>9:41</span>
          <span className="h-[22px] w-[84px] rounded-full bg-foreground/90" aria-hidden />
          <span className="flex items-center gap-1" aria-hidden>
            <span className="h-2.5 w-4 rounded-[3px] border border-foreground/70" />
          </span>
        </div>
        {children}
      </div>
      <figcaption className="text-[13px] text-muted-foreground">{label}</figcaption>
    </figure>
  )
}

function TabBar({ active }: { active: string }) {
  const items = [
    ["Home", HomeIcon],
    ["Explore", CompassIcon],
    ["Library", LibraryIcon],
    ["Profile", UserIcon],
  ] as const
  return (
    <nav className="absolute inset-x-3 bottom-3 flex h-[60px] items-center justify-around rounded-[32px] bg-foreground text-background" aria-label="App">
      {items.map(([name, Icon]) => (
        <span key={name} className={cn("flex flex-col items-center gap-0.5 text-[10px] font-medium", name === active ? "text-background" : "text-background/50")}>
          <Icon className="size-[18px]" />
          {name}
          {name === active && <span className="mt-0.5 size-1 rounded-full bg-highlight" />}
        </span>
      ))}
    </nav>
  )
}

function HomeScreen() {
  return (
    <div className="flex h-[calc(100%-36px)] flex-col gap-4 overflow-hidden px-4 pb-24 pt-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[28px] font-bold tracking-[-0.035em]">Library</h4>
        <Button size="icon-sm" variant="secondary" aria-label="Search"><SearchIcon /></Button>
      </div>
      <div className="relative overflow-hidden rounded-[22px] bg-brand p-4 text-brand-foreground">
        <div className="relative z-10 max-w-[62%]">
          <div className="text-[19px] font-bold leading-tight tracking-[-0.02em]">Read slower, keep more</div>
          <p className="mt-1 text-[12px] text-brand-foreground/80">Twelve minutes a day is enough.</p>
          <Button size="sm" variant="ink" className="mt-3 h-7 bg-[#0c0b0b] px-3 text-[12px] text-white">Explore</Button>
        </div>
        <div className="absolute -right-3 bottom-2 flex rotate-[-8deg] gap-1">
          <Cover book="kota" className="h-[78px] w-[52px] p-1.5 [&>div:first-of-type]:text-[9px]" />
          <Cover book="garam" className="mt-3 h-[78px] w-[52px] p-1.5 [&>div:first-of-type]:text-[9px]" />
        </div>
      </div>
      <Tabs defaultValue="all">
        <TabsList className="h-8 [&_button]:px-2.5 [&_button]:text-[12px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="fiction">Fiction</TabsTrigger>
          <TabsTrigger value="essays">Essays</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>
      </Tabs>
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-[15px] font-semibold">Recommended for you</span>
          <span className="text-[12px] text-muted-foreground">See all</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {(["arus", "kota", "garam"] as const).map((b) => (
            <div key={b} className="grid gap-1.5">
              <Cover book={b} className="aspect-[3/4.2]" />
              <div className="truncate text-[11.5px] font-semibold">{covers[b].title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-surface p-2.5 ring-1 ring-border">
        <Cover book="arus" className="h-14 w-10 shrink-0 p-1.5 [&>div:first-of-type]:text-[7px]" />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold">Arus Tenang</div>
          <div className="mt-1.5 flex items-center gap-2">
            <Progress value={68} className="h-1.5" aria-label="Reading progress" />
            <span className="font-mono text-[10px] text-muted-foreground">68%</span>
          </div>
        </div>
        <Button size="icon-sm" variant="ink" aria-label="Continue reading"><PlayIcon className="fill-current" /></Button>
      </div>
      <TabBar active="Home" />
    </div>
  )
}

function ProfileScreen() {
  return (
    <div className="flex h-[calc(100%-36px)] flex-col gap-3 overflow-hidden px-4 pb-24 pt-3">
      <div className="flex items-center justify-between">
        <Avatar className="size-12"><AvatarFallback className="text-sm">RP</AvatarFallback></Avatar>
        <div className="flex gap-1.5">
          <Button size="icon-sm" variant="secondary" aria-label="Notifications"><BellIcon /></Button>
          <Button size="icon-sm" variant="secondary" aria-label="More"><MoreHorizontalIcon /></Button>
        </div>
      </div>
      <div>
        <div className="text-[22px] font-bold tracking-[-0.03em]">Rani Putri</div>
        <div className="text-[12.5px] text-muted-foreground">Keep reading, keep growing.</div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border rounded-2xl bg-surface py-3 text-center ring-1 ring-border">
        {[["24", "Books"], ["87h", "Reading"], ["12", "This year"]].map(([v, k]) => (
          <div key={k}>
            <div className="text-[18px] font-bold tabular-nums tracking-[-0.02em]">{v}</div>
            <div className="text-[10.5px] text-muted-foreground">{k}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-[#0c0b0b] p-3 text-[#fff2df]">
        <span className="grid size-8 place-content-center rounded-full bg-highlight text-[#1f1100]"><SparklesIcon className="size-4" /></span>
        <div className="flex-1">
          <div className="text-[13px] font-semibold">Premium member</div>
          <div className="text-[11px] text-[#fff2df]/65">Offline shelves and audio</div>
        </div>
        <ChevronRightIcon className="size-4 opacity-70" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[["Saved", BookmarkIcon], ["History", HistoryIcon], ["Offline", DownloadIcon], ["Loved", HeartIcon]].map(([k, Icon]) => {
          const I = Icon as typeof BookmarkIcon
          return (
            <div key={k as string} className="flex flex-col items-center gap-1 rounded-2xl bg-surface py-2.5 ring-1 ring-border">
              <I className="size-[18px]" />
              <span className="text-[10.5px] font-medium">{k as string}</span>
            </div>
          )
        })}
      </div>
      <div className="divide-y divide-border rounded-2xl bg-surface ring-1 ring-border">
        {[["App settings", SettingsIcon], ["Reading stats", BarChart3Icon]].map(([k, Icon]) => {
          const I = Icon as typeof SettingsIcon
          return (
            <div key={k as string} className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium">
              <I className="size-4 text-muted-foreground" />
              <span className="flex-1">{k as string}</span>
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            </div>
          )
        })}
      </div>
      <Button variant="secondary" size="sm" className="w-full"><LogOutIcon /> Log out</Button>
      <TabBar active="Profile" />
    </div>
  )
}

export function MobileBlock({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-10 rounded-[28px] bg-surface px-4 py-10 ring-1 ring-border", className)}>
      <Phone label="Home · Library">
        <HomeScreen />
      </Phone>
      <Phone label="Profile">
        <ProfileScreen />
      </Phone>
    </div>
  )
}
