import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="note">Note for the approver</Label>
      <Textarea id="note" placeholder="Why does this payout need a manual check?" />
      <p className="text-[13px] text-muted-foreground">Visible to everyone in the Finance folder.</p>
    </div>
  )
}
