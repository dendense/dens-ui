import { Tabs, TabsContent, TabsCount, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <div className="grid w-full max-w-md gap-8">
      <Tabs defaultValue="today">
        <TabsList aria-label="Range">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="7d">7 days</TabsTrigger>
          <TabsTrigger value="30d">30 days</TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="active">
        <TabsList variant="line" aria-label="Workflow status">
          <TabsTrigger value="active">
            Active <TabsCount>18</TabsCount>
          </TabsTrigger>
          <TabsTrigger value="paused">
            Paused <TabsCount>4</TabsCount>
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts <TabsCount>2</TabsCount>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="text-sm text-muted-foreground">
          18 workflows ran in the last 24 hours.
        </TabsContent>
        <TabsContent value="paused" className="text-sm text-muted-foreground">
          4 workflows are paused by their owners.
        </TabsContent>
        <TabsContent value="drafts" className="text-sm text-muted-foreground">
          2 drafts have not been published yet.
        </TabsContent>
      </Tabs>
    </div>
  )
}
