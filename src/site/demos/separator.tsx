import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="text-sm font-semibold">Lumbung workspace</div>
      <p className="text-[13px] text-muted-foreground">Ops console for Denslab.</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Runs</span>
        <Separator orientation="vertical" />
        <span>Approvals</span>
        <Separator orientation="vertical" />
        <span>Folders</span>
      </div>
    </div>
  )
}
