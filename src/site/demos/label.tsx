import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LabelDemo() {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Notify me when a run fails</Label>
    </div>
  )
}
