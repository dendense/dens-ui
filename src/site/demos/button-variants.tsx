import { Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ButtonVariants() {
  return (
    <div className="flex max-w-xl flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="ink">Ink</Button>
        <Button variant="highlight">Highlight</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="outline" aria-label="Delete">
          <Trash2Icon />
        </Button>
        <Button variant="destructive">Delete run</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  )
}
