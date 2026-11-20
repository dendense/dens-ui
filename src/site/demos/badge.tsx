import { Badge, StatusDot } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Badge>Primary</Badge>
      <Badge variant="highlight">Waiting on you</Badge>
      <Badge variant="soft">
        <StatusDot /> Healthy
      </Badge>
      <Badge variant="outline">
        <StatusDot tone="destructive" /> Slow · 2.4×
      </Badge>
      <Badge variant="warning">Paused</Badge>
      <Badge variant="info">Beta</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="secondary">24</Badge>
    </div>
  )
}
