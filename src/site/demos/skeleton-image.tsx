import { SkeletonImage, SkeletonText } from "@/components/ui/skeleton"

export default function SkeletonImageDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-6 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="grid gap-3">
        <SkeletonImage ratio="16 / 9" className="rounded-2xl" />
        <span className="text-[12px] text-muted-foreground">shimmer · 16 / 9</span>
      </div>
      <div className="grid content-start gap-3">
        <SkeletonImage ratio="1" variant="pulse" className="rounded-2xl" />
        <span className="text-[12px] text-muted-foreground">pulse · 1 / 1</span>
      </div>
      <div className="flex items-center gap-4 sm:col-span-2">
        <SkeletonImage ratio="1" icon={false} className="size-14 shrink-0 rounded-full" />
        <SkeletonText lines={2} className="flex-1" />
      </div>
    </div>
  )
}
