import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "./code"

/** Live preview with a Code tab that shows the exact source of the demo file. */
export function ComponentPreview({
  children,
  code,
  className,
  align = "center",
}: {
  children: React.ReactNode
  code: string
  className?: string
  align?: "center" | "start"
}) {
  return (
    <Tabs defaultValue="preview" className="gap-3">
      <TabsList variant="line" className="h-9">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div
          className={cn(
            "flex min-h-56 w-full rounded-2xl bg-surface p-6 ring-1 ring-border/80 sm:p-10",
            align === "center" ? "items-center justify-center" : "items-start justify-start",
            "bg-[radial-gradient(circle_at_1px_1px,color-mix(in_srgb,var(--muted-foreground)_18%,transparent)_1px,transparent_0)] bg-[size:16px_16px]",
            className
          )}
        >
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} maxHeight={480} />
      </TabsContent>
    </Tabs>
  )
}
