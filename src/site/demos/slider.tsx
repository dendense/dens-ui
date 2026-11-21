import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function SliderDemo() {
  return (
    <div className="grid w-full max-w-sm gap-7">
      <div className="grid gap-3">
        <div className="flex justify-between">
          <Label id="budget">Monthly budget</Label>
          <span className="text-sm tabular-nums text-muted-foreground">Rp 4.5M</span>
        </div>
        <Slider aria-labelledby="budget" defaultValue={[45]} />
      </div>
      <div className="grid gap-3">
        <Label id="range">Price range</Label>
        <Slider aria-labelledby="range" defaultValue={[20, 70]} tone="highlight" />
      </div>
      <div className="grid gap-3">
        <Label id="media">Media track (hover for the thumb)</Label>
        <Slider aria-labelledby="media" size="sm" tone="ink" defaultValue={[30]} buffered={62} />
      </div>
    </div>
  )
}
