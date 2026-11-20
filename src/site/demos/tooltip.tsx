import { BellIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Notifications">
          <BellIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>3 approvals are waiting on you</TooltipContent>
    </Tooltip>
  )
}
