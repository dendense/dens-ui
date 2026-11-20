import { CheckCircle2Icon, FolderIcon, HistoryIcon, LayoutGridIcon, PlugIcon, WorkflowIcon } from "lucide-react"
import { StatusDot } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarCount,
  SidebarFolder,
  SidebarItem,
  SidebarMeter,
  SidebarRail,
  SidebarRailItem,
  SidebarSection,
} from "@/components/ui/sidebar"

const hourly = [30, 26, 22, 18, 14, 10, 8, 6, 5, 4, 3, 2, 2, 3, 5, 9, 16, 24, 31, 35, 38, 40, 42, 32]

export default function SidebarRailDemo() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col gap-3">
        <SidebarRail aria-label="Apps">
          <SidebarRailItem label="Overview" active><LayoutGridIcon /></SidebarRailItem>
          <SidebarRailItem label="Workflows"><WorkflowIcon /></SidebarRailItem>
          <SidebarRailItem label="Approvals, 3 waiting" dot><CheckCircle2Icon /></SidebarRailItem>
          <SidebarRailItem label="Run history"><HistoryIcon /></SidebarRailItem>
          <SidebarRailItem label="Integrations"><PlugIcon /></SidebarRailItem>
        </SidebarRail>
        <SidebarMeter label="24h" total={286} levels={hourly} />
      </div>
      <Sidebar className="h-auto">
        <SidebarSection label="Folders">
          <SidebarFolder icon={<FolderIcon />} label="Finance" badge={<SidebarCount>11</SidebarCount>} defaultOpen>
            <SidebarItem size="sm" badge={<SidebarCount>6</SidebarCount>}>Month-end close</SidebarItem>
            <SidebarItem size="sm" badge={<span className="flex items-center gap-1.5"><StatusDot tone="destructive" /><SidebarCount className="px-0">3</SidebarCount></span>}>
              Settlement sync
            </SidebarItem>
            <SidebarItem size="sm" badge={<SidebarCount>2</SidebarCount>}>Vendors</SidebarItem>
          </SidebarFolder>
          <SidebarFolder icon={<FolderIcon />} label="People ops" badge={<SidebarCount>4</SidebarCount>}>
            <SidebarItem size="sm">Onboarding</SidebarItem>
            <SidebarItem size="sm">Payroll</SidebarItem>
          </SidebarFolder>
        </SidebarSection>
      </Sidebar>
    </div>
  )
}
