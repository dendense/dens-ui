import { SparklesIcon } from "lucide-react"

import { Divider } from "@/components/ui/divider"

export default function DividerDemo() {
  return (
    <div className="w-full max-w-xl">
      <p className="text-[14px] text-muted-foreground">line</p>
      <Divider spacing="sm" />
      <p className="text-[14px] text-muted-foreground">line with a label</p>
      <Divider spacing="sm">Earlier this year</Divider>
      <p className="text-[14px] text-muted-foreground">fade, label at the start, with an icon</p>
      <Divider variant="fade" align="start" spacing="sm">
        <SparklesIcon /> New in 0.2
      </Divider>
      <p className="text-[14px] text-muted-foreground">dots</p>
      <Divider variant="dots" spacing="sm" />
      <p className="text-[14px] text-muted-foreground">mark</p>
      <Divider variant="mark" spacing="sm" />
    </div>
  )
}
