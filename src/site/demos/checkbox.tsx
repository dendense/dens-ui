import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function CheckboxDemo() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2.5">
        <Checkbox id="c1" defaultChecked />
        <Label htmlFor="c1">Retry failed runs automatically</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="c2" checked="indeterminate" />
        <Label htmlFor="c2">Some folders selected</Label>
      </div>
      <div className="flex items-start gap-2.5">
        <Checkbox id="c3" className="mt-0.5" />
        <div className="grid gap-1">
          <Label htmlFor="c3">Weekly digest</Label>
          <p className="text-[13px] text-muted-foreground">A Monday summary of slow and failed workflows.</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="c4" disabled />
        <Label htmlFor="c4">Archive after 90 days (admins only)</Label>
      </div>
    </div>
  )
}
