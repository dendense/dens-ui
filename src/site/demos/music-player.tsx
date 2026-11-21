import { MusicPlayer, MusicPlayerProvider, MusicPlaylist } from "@/components/ui/music-player"
import { demoTracks } from "../parts/demo-tracks"

export default function MusicPlayerDemo() {
  return (
    <MusicPlayerProvider tracks={demoTracks}>
      <div className="flex w-full flex-wrap items-start justify-center gap-6">
        <MusicPlayer tone="ink" className="w-full sm:w-[340px]" />
        <div className="grid min-w-[min(100%,300px)] flex-1 gap-3 rounded-[22px] bg-card p-3 shadow-panel ring-1 ring-border/60">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 px-1.5 pt-1">
            <h3 className="text-[17px] font-bold tracking-[-0.01em]">Evening queue</h3>
            <span className="text-[13px] text-muted-foreground">3 tracks, 2:17</span>
          </div>
          <MusicPlaylist />
        </div>
      </div>
    </MusicPlayerProvider>
  )
}
