import {
  ArrowRightIcon,
  BellIcon,
  CheckCircle2Icon,
  FolderIcon,
  GripVerticalIcon,
  HistoryIcon,
  LayoutGridIcon,
  PauseIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  WorkflowIcon,
  ZapIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge, StatusDot } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input, InputGroup } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Sidebar, SidebarCount, SidebarFooter, SidebarHeader, SidebarItem, SidebarSection } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsCount, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/* Demo data: synthetic */
const done = [4, 3, 2, 2, 3, 5, 9, 16, 24, 31, 35, 38, 40, 42, 32] // 00–14 h, sums to 286
const scheduled = [9, 8, 7, 6, 5, 4, 4, 2, 2] // 15–23 h, 47 more
const SLOW_FROM = 12

function RunsChart() {
  const max = 46
  const W = 480
  const H = 150
  const col = W / 24
  const bw = col * 0.62
  const y = (v: number) => H - (v / max) * (H - 18)
  const nowX = 14 * col + col * 0.45
  const slowX = 12 * col + col * 0.25
  return (
    <svg viewBox={`0 0 ${W} ${H + 22}`} className="h-auto w-full" role="img" aria-label="Runs per hour today: 286 done, climbing from 07:00 to a 13:00 peak; slower since 12:15; 47 more scheduled.">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={0} x2={W} y1={H - f * (H - 18)} y2={H - f * (H - 18)} className="stroke-border" strokeDasharray="2 4" />
      ))}
      {done.map((v, i) => (
        <rect
          key={i}
          x={i * col + (col - bw) / 2}
          y={y(v)}
          width={bw}
          height={H - y(v)}
          rx={3}
          className={i >= SLOW_FROM ? "fill-highlight" : "fill-foreground/80"}
        />
      ))}
      {scheduled.map((v, i) => (
        <rect
          key={i}
          x={(i + 15) * col + (col - bw) / 2 + 0.5}
          y={y(v) + 0.5}
          width={bw - 1}
          height={H - y(v) - 1}
          rx={3}
          className="fill-none stroke-muted-foreground/45"
          strokeDasharray="3 2"
        />
      ))}
      <line x1={slowX} x2={slowX} y1={8} y2={H} className="stroke-highlight" strokeWidth={1.5} />
      <line x1={nowX} x2={nowX} y1={0} y2={H} className="stroke-foreground" strokeWidth={1.5} />
      <g transform={`translate(${nowX + 6} 2)`}>
        <rect width={74} height={18} rx={9} className="fill-foreground" />
        <text x={37} y={12.5} textAnchor="middle" className="fill-background font-mono text-[10px] font-medium">
          now 14:26
        </text>
      </g>
      <g transform={`translate(${slowX - 140} 10)`}>
        <rect width={132} height={18} rx={9} className="fill-card stroke-highlight" />
        <text x={66} y={12.5} textAnchor="middle" className="fill-foreground font-mono text-[10px]">
          12:15 · 2.4× slower
        </text>
      </g>
      {["00", "06", "12", "18", "24"].map((t, i) => (
        <text key={t} x={i === 4 ? W : i * 6 * col} y={H + 16} textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"} className="fill-muted-foreground font-mono text-[10px]">
          {t}
        </text>
      ))}
    </svg>
  )
}

const workflows = [
  { name: "Settlement sync", route: "bank api → ledger", strip: "ppppppppppppppppppfspsff", status: "slow", icon: "S" },
  { name: "Vendor onboarding", route: "intake form → erp, email", strip: "pppppppppppppppppppppppp", status: "healthy", icon: "V" },
  { name: "Monthly access audit", route: "cron · monthly → sso", strip: "pppppppppppppppppppppppw", status: "waiting", icon: "A" },
  { name: "Contract renewals", route: "crm → mail", strip: "ppppppppppppfppppppppppp", status: "healthy", icon: "C" },
  { name: "Payroll handoff", route: "cron · 16:00 → payroll", strip: "pppppppppppppppppppppppn", status: "next", icon: "P" },
] as const

function RunStrip({ strip }: { strip: string }) {
  return (
    <div className="flex h-5 items-stretch gap-[2px]" aria-hidden>
      {strip.split("").map((c, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-[1px]",
            c === "p" && "bg-foreground/55",
            c === "s" && "bg-highlight",
            c === "f" && "bg-destructive",
            c === "w" && "bg-highlight/50",
            c === "n" && "border border-dashed border-muted-foreground/60"
          )}
        />
      ))}
    </div>
  )
}

function WorkflowStatus({ status }: { status: (typeof workflows)[number]["status"] }) {
  if (status === "slow")
    return (
      <Badge variant="outline">
        <StatusDot tone="destructive" /> Slow · 2.4×
      </Badge>
    )
  if (status === "healthy")
    return (
      <Badge variant="soft">
        <StatusDot /> Healthy
      </Badge>
    )
  if (status === "waiting") return <Badge variant="highlight">Waiting on you</Badge>
  return (
    <Badge variant="outline">
      <StatusDot tone="muted" /> Next 16:00
    </Badge>
  )
}

const approvals = [
  { id: "AC-117", title: "Admin access for Sinta Halim", meta: "Access audit · requested by Bayu Pratama", age: "8m", primary: true },
  { id: "PY-052", title: "Payout Rp 48,5 jt to PT Arunika", meta: "Settlement sync · above the Rp 25 jt auto-limit", age: "27m" },
  { id: "VN-019", title: "Archive 5 inactive vendors", meta: "Contract renewals · no orders for 12 months", age: "2h" },
]

export function DashboardBlock({ className }: { className?: string }) {
  return (
    <div className={cn("@container rounded-[28px] bg-background p-2.5 text-foreground ring-1 ring-border sm:p-3", className)}>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-[236px_minmax(0,1fr)]">
        <Sidebar className="hidden h-auto w-auto lg:flex">
          <SidebarHeader>
            <span className="grid size-9 shrink-0 place-content-center rounded-xl bg-foreground text-sm font-bold text-background">L</span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Lumbung</div>
              <div className="text-xs text-muted-foreground">Ops workspace</div>
            </div>
          </SidebarHeader>
          <InputGroup start={<SearchIcon />} end={<Kbd>⌘K</Kbd>}>
            <Input placeholder="Search" aria-label="Search" className="h-9 rounded-xl bg-card" />
          </InputGroup>
          <SidebarSection label="Workspace">
            <SidebarItem icon={<LayoutGridIcon />} active>Overview</SidebarItem>
            <SidebarItem icon={<WorkflowIcon />} badge={<SidebarCount>19</SidebarCount>}>Workflows</SidebarItem>
            <SidebarItem icon={<CheckCircle2Icon />} badge={<SidebarCount tone="highlight">3</SidebarCount>}>Approvals</SidebarItem>
            <SidebarItem icon={<HistoryIcon />}>Run history</SidebarItem>
          </SidebarSection>
          <SidebarSection label="Live">
            <SidebarItem icon={<StatusDot className="mx-[5px] size-2" />} badge={<SidebarCount>9</SidebarCount>}>Running</SidebarItem>
            <SidebarItem icon={<StatusDot tone="muted" className="mx-[5px] size-2" />} badge={<SidebarCount>27</SidebarCount>}>Queued</SidebarItem>
            <SidebarItem icon={<StatusDot tone="destructive" className="mx-[5px] size-2" />} badge={<SidebarCount>1</SidebarCount>}>Failed today</SidebarItem>
          </SidebarSection>
          <SidebarSection label="Folders">
            <SidebarItem icon={<FolderIcon />} badge={<SidebarCount>11</SidebarCount>}>Finance</SidebarItem>
            <SidebarItem icon={<FolderIcon />} badge={<SidebarCount>4</SidebarCount>}>People ops</SidebarItem>
            <SidebarItem icon={<FolderIcon />} badge={<SidebarCount>4</SidebarCount>}>IT & access</SidebarItem>
          </SidebarSection>
          <SidebarFooter>
            <SidebarItem icon={<SettingsIcon />}>Settings</SidebarItem>
            <div className="flex items-center gap-2.5 rounded-2xl bg-sidebar-accent p-2 ring-1 ring-sidebar-border">
              <Avatar className="size-8">
                <AvatarFallback>NR</AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <div className="text-[13px] font-semibold">Nadia Rahma</div>
                <div className="text-xs text-muted-foreground">Ops lead</div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="@container flex min-w-0 flex-col gap-3 rounded-3xl bg-surface p-2 ring-1 ring-border/70 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-4 px-1 pt-1">
            <div>
              <div className="text-[13px] text-muted-foreground">Lumbung / Overview</div>
              <h3 className="mt-1 text-[30px] font-semibold leading-none tracking-[-0.035em]">Overview</h3>
              <div className="mt-1.5 text-[13px] text-muted-foreground">Tuesday, 17 November · 14:26</div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Tabs defaultValue="today">
                <TabsList aria-label="Range">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="7d">7 days</TabsTrigger>
                  <TabsTrigger value="30d">30 days</TabsTrigger>
                </TabsList>
              </Tabs>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Notifications" className="relative">
                    <BellIcon />
                    <span className="absolute right-2 top-2 size-2 rounded-full bg-highlight ring-2 ring-card" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>3 approvals are waiting on you</TooltipContent>
              </Tooltip>
              <Button variant="ink">
                <PlusIcon /> New workflow
              </Button>
            </div>
          </div>

          <Card className="gap-4">
            <CardHeader className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <CardTitle>Runs today</CardTitle>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-[2px] bg-foreground/80" />done</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-[2px] border border-dashed border-muted-foreground" />scheduled</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-[2px] bg-highlight" />slow</span>
              </div>
              <CardAction className="col-start-auto row-start-auto ml-auto">
                <Button size="sm" variant="outline">Open run log <ArrowRightIcon /></Button>
              </CardAction>
            </CardHeader>
            <CardContent className="grid grid-cols-[minmax(0,1fr)] gap-6 @3xl:grid-cols-[210px_minmax(0,1fr)]">
              <div className="flex flex-col">
                <div className="text-[64px] font-light leading-[0.9] tracking-[-0.04em] tabular-nums">286</div>
                <div className="mt-3 flex items-center gap-2 text-[13px]">
                  <Badge variant="soft">↑ 12.8%</Badge>
                  <span className="text-muted-foreground">vs last Tuesday</span>
                </div>
                <p className="mt-2 text-[13px] leading-snug text-muted-foreground">Runs since midnight, 47 more scheduled before 24:00.</p>
                <dl className="mt-4 grid divide-y divide-border border-y border-border text-[13px]">
                  {[["Success rate", "98.7%"], ["Median run", "6.3 s"], ["Peak hour", "13:00"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="font-mono font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="min-w-0 rounded-2xl bg-surface p-3 ring-1 ring-border/70 sm:p-4">
                <RunsChart />
              </div>
            </CardContent>
            <CardContent>
              <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-highlight/10 p-3 ring-1 ring-highlight/30">
                <span className="grid size-8 shrink-0 place-content-center rounded-full bg-highlight text-highlight-foreground [&_svg]:size-4"><ZapIcon /></span>
                <p className="min-w-0 flex-1 text-[13px] leading-snug">
                  <span className="font-semibold">Settlement sync is 2.4× slower since 12:15.</span>{" "}
                  <span className="text-muted-foreground">27 runs are waiting on the bank API rate limit.</span>
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="ink"><PauseIcon /> Pause retries · 15 min</Button>
                  <Button size="sm" variant="outline">Trace</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-[minmax(0,1fr)] gap-3 @5xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            <Card className="gap-3">
              <CardHeader>
                <CardTitle>Workflows</CardTitle>
                <CardAction>
                  <Button size="sm" variant="outline">All 19 <ArrowRightIcon /></Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList variant="line" className="h-9" aria-label="Workflow status">
                    <TabsTrigger value="active">Active <TabsCount>14</TabsCount></TabsTrigger>
                    <TabsTrigger value="paused">Paused <TabsCount>3</TabsCount></TabsTrigger>
                    <TabsTrigger value="drafts">Drafts <TabsCount>2</TabsCount></TabsTrigger>
                  </TabsList>
                </Tabs>
                <Table className="mt-1">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Workflow</TableHead>
                      <TableHead className="hidden @xl:table-cell">Last 24 runs</TableHead>
                      <TableHead className="hidden text-right @md:table-cell">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflows.map((w) => (
                      <TableRow key={w.name}>
                        <TableCell className="whitespace-normal">
                          <div className="flex items-center gap-3">
                            <span className="grid size-8 shrink-0 place-content-center rounded-lg bg-surface text-xs font-bold ring-1 ring-border">{w.icon}</span>
                            <div className="min-w-0">
                              <div className="truncate font-semibold">{w.name}</div>
                              <div className="truncate font-mono text-[11px] text-muted-foreground">{w.route}</div>
                              <div className="mt-1.5 @md:hidden"><WorkflowStatus status={w.status} /></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden @xl:table-cell"><RunStrip strip={w.strip} /></TableCell>
                        <TableCell className="hidden text-right @md:table-cell"><WorkflowStatus status={w.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="gap-3">
              <CardHeader className="flex items-center gap-2">
                <CardTitle>Needs you</CardTitle>
                <Badge variant="highlight" className="ml-0.5">3</Badge>
                <CardAction className="col-start-auto row-start-auto ml-auto">
                  <Button size="sm" variant="outline">Open queue</Button>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {approvals.map((a) => (
                  <div key={a.id} className={cn("flex gap-2 rounded-2xl p-3", a.primary ? "bg-card shadow-raised ring-1 ring-border" : "bg-surface ring-1 ring-border/70")}>
                    <GripVerticalIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground">{a.id}</span>
                        <span className="font-mono text-[11px] text-muted-foreground">{a.age}</span>
                      </div>
                      <div className="mt-1.5 text-sm font-semibold">{a.title}</div>
                      <div className="text-[12.5px] text-muted-foreground">{a.meta}</div>
                      {a.primary && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Button size="sm" variant="ink">Approve <Kbd className="h-5 border-white/20 bg-white/10 text-background/80 shadow-none dark:border-black/20 dark:bg-black/10">A</Kbd></Button>
                          <Button size="sm" variant="outline">Decline <Kbd className="h-5">Esc</Kbd></Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <p className="px-1 pt-1 font-mono text-[11px] text-muted-foreground">Avg wait 11 min · A approve · Esc decline</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
