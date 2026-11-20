import { Kbd } from "@/components/ui/kbd"

export default function KbdDemo() {
  return (
    <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      Press <Kbd>A</Kbd> to approve, <Kbd>Esc</Kbd> to decline, <Kbd>⌘</Kbd>
      <Kbd>K</Kbd> to search.
    </p>
  )
}
