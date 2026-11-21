import { MusicPlayer } from "@/components/ui/music-player"
import { demoTracks } from "../parts/demo-tracks"

export default function MusicPlayerMiniDemo() {
  return (
    <div className="grid w-full max-w-[560px] gap-4">
      <MusicPlayer variant="mini" tracks={demoTracks} />
      <MusicPlayer variant="mini" tone="ink" tracks={[demoTracks[1], demoTracks[2], demoTracks[0]]} />
    </div>
  )
}
