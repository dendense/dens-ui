import { Progress } from "@/components/ui/progress"

export default function ProgressDemo() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      {[
        { label: "Monthly balance", value: 72, tone: "primary" as const },
        { label: "Storage", value: 91, tone: "highlight" as const },
        { label: "Reading goal", value: 38, tone: "ink" as const },
      ].map((p) => (
        <div key={p.label} className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{p.label}</span>
            <span className="tabular-nums text-muted-foreground">{p.value}%</span>
          </div>
          <Progress value={p.value} tone={p.tone} aria-label={p.label} />
        </div>
      ))}
    </div>
  )
}
