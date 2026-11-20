import { ArrowRightIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        <PlusIcon /> New workflow
      </Button>
      <Button variant="ink">Approve</Button>
      <Button variant="outline">
        Open run log <ArrowRightIcon />
      </Button>
      <Button variant="highlight">Upgrade</Button>
    </div>
  )
}
