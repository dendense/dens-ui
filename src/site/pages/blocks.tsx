import { DashboardBlock } from "../blocks/dashboard"
import { LoginBlock } from "../blocks/login"
import { MobileBlock } from "../blocks/mobile"
import dashboardSource from "../blocks/dashboard.tsx?raw"
import loginSource from "../blocks/login.tsx?raw"
import mobileSource from "../blocks/mobile.tsx?raw"
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
