import { ListMusicIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MusicPlayer } from "@/components/ui/music-player"
import { demoTracks } from "../parts/demo-tracks"

export default function MusicPlayerBarDemo() {
  return (
    <MusicPlayer
      variant="bar"
      tracks={[demoTracks[2], demoTracks[0], demoTracks[1]]}
      actions={
        <Button variant="ghost" size="icon-sm" aria-label="Queue">
          <ListMusicIcon />
        </Button>
      }
    />
  )
}
