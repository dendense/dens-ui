import { CheckCircle2Icon, HistoryIcon, LayoutGridIcon, SettingsIcon, WorkflowIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sidebar, SidebarCount, SidebarFooter, SidebarHeader, SidebarItem, SidebarSection } from "@/components/ui/sidebar"

function Nav({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Sidebar collapsed={collapsed} className="h-[440px]">
      <SidebarHeader>
        <span className="grid size-9 shrink-0 place-content-center rounded-xl bg-foreground text-sm font-bold text-background">L</span>
        {!collapsed && (
          <div className="leading-tight">
            <div className="text-sm font-semibold">Lumbung</div>
            <div className="text-xs text-muted-foreground">Ops workspace</div>
          </div>
        )}
      </SidebarHeader>
      <SidebarSection label="Workspace">
        <SidebarItem icon={<LayoutGridIcon />} active>Overview</SidebarItem>
        <SidebarItem icon={<WorkflowIcon />} badge={<SidebarCount>24</SidebarCount>}>Workflows</SidebarItem>
        <SidebarItem icon={<CheckCircle2Icon />} badge={<SidebarCount tone="highlight">3</SidebarCount>}>Approvals</SidebarItem>
        <SidebarItem icon={<HistoryIcon />}>Run history</SidebarItem>
      </SidebarSection>
      <SidebarFooter>
        <SidebarItem icon={<SettingsIcon />}>Settings</SidebarItem>
        {!collapsed ? (
          <div className="flex items-center gap-2.5 rounded-[18px] bg-sidebar-accent p-2 ring-1 ring-sidebar-border">
            <Avatar className="size-8"><AvatarFallback>NR</AvatarFallback></Avatar>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold">Nadia Rahma</div>
              <div className="text-xs text-muted-foreground">Ops lead</div>
            </div>
          </div>
        ) : (
          <Avatar className="mx-auto size-8"><AvatarFallback>NR</AvatarFallback></Avatar>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

export default function SidebarDemo() {
  return (
    <div className="flex items-start gap-4">
      <Nav />
      <Nav collapsed />
    </div>
  )
}
