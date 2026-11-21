import { SkeletonPostCard } from "@/components/ui/skeleton"

export default function SkeletonPostDemo() {
  return (
    <div className="grid w-full gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
      <SkeletonPostCard />
      <SkeletonPostCard layout="horizontal" />
    </div>
  )
}
