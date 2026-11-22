import { cn } from "@/lib/utils"
import { useVideoWindow } from "./youtube-player"

/*
 * The YouTube player, set into the text column where the reference had its
 * figures. Always on screen and never under 200 px tall, as YouTube's terms
 * ask; before the first play it shows the queued track's poster.
 */
export function VideoPanel({ className }: { className?: string }) {
  const v = useVideoWindow()
  return (
    <section
      aria-label="Video"
      className={cn(
        "overflow-hidden rounded-[18px] bg-black shadow-[0_18px_40px_-18px_rgb(4_20_60/0.7)] ring-1 ring-white/25",
        className
      )}
    >
      <div ref={v.mount} className="h-[200px] w-full sm:aspect-video sm:h-auto sm:min-h-[200px] [&>iframe]:size-full" />
    </section>
  )
}
