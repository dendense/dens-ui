import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * A presentational navigation panel in the Dens-UI look.
 * Set `collapsed` to render an icon rail; labels move into `title` tooltips.
 */
const SidebarContext = React.createContext<{ collapsed: boolean }>({ collapsed: false })

function Sidebar({
  className,
  collapsed = false,
  ...props
}: React.ComponentProps<"nav"> & { collapsed?: boolean }) {
  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <nav
        data-slot="sidebar"
        data-collapsed={collapsed}
        className={cn(
          "group/sidebar flex h-full flex-col gap-5 rounded-3xl bg-sidebar p-3 text-sidebar-foreground ring-1 ring-sidebar-border",
          collapsed ? "w-[68px] items-center" : "w-64",
          className
        )}
        {...props}
      />
    </SidebarContext.Provider>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("flex items-center gap-3 px-1.5 pt-1", className)} {...props} />
}

function SidebarSection({
  className,
  label,
  children,
  ...props
}: React.ComponentProps<"div"> & { label?: React.ReactNode }) {
  const { collapsed } = React.useContext(SidebarContext)
  return (
    <div data-slot="sidebar-section" className={cn("flex w-full flex-col gap-0.5", className)} {...props}>
      {label && !collapsed && (
        <div className="px-3 pb-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </div>
      )}
      {label && collapsed && <div className="mx-auto mb-1.5 h-px w-6 bg-sidebar-border" />}
      {children}
    </div>
  )
}

function SidebarItem({
  className,
  icon,
  badge,
  active = false,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  icon?: React.ReactNode
  badge?: React.ReactNode
  active?: boolean
  asChild?: boolean
}) {
  const { collapsed } = React.useContext(SidebarContext)
  const Comp = asChild ? Slot.Root : "button"
  const label = typeof children === "string" ? children : undefined
  return (
    <Comp
      data-slot="sidebar-item"
      data-active={active}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={cn(
        "relative flex h-9 w-full items-center gap-2.5 rounded-xl px-3 text-left text-sm font-medium text-sidebar-foreground/75 transition-[background-color,color,box-shadow] outline-none hover:bg-sidebar-accent/70 hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold data-[active=true]:text-sidebar-foreground data-[active=true]:shadow-[0_1px_2px_rgb(15_23_22/0.06),0_4px_12px_-6px_rgb(15_23_22/0.16)] [&_svg]:size-[18px] [&_svg]:shrink-0",
        collapsed && "size-10 justify-center px-0",
        className
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {icon}
          {!collapsed && <span className="flex-1 truncate">{children}</span>}
          {!collapsed && badge != null && <span className="ml-auto">{badge}</span>}
          {collapsed && badge != null && (
            <span aria-hidden className="absolute right-1.5 top-1.5 size-2 rounded-full bg-highlight ring-2 ring-sidebar" />
          )}
        </>
      )}
    </Comp>
  )
}

function SidebarCount({ className, tone = "muted", ...props }: React.ComponentProps<"span"> & { tone?: "muted" | "highlight" }) {
  return (
    <span
      data-slot="sidebar-count"
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums",
        tone === "muted" && "text-muted-foreground",
        tone === "highlight" && "bg-highlight text-highlight-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" className={cn("mt-auto flex w-full flex-col gap-2", className)} {...props} />
}

export { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarCount, SidebarFooter }
