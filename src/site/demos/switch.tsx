import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SwitchDemo() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="s1">Auto cooling</Label>
        <Switch id="s1" defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="s2">Priority alerts</Label>
        <Switch id="s2" tone="highlight" defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="s3">Night scene</Label>
        <Switch id="s3" tone="ink" />
      </div>
    </div>
  )
}
