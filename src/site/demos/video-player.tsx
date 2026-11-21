import { VideoPlayer } from "@/components/ui/video-player"
import { demoVideo } from "../parts/demo-tracks"

export default function VideoPlayerDemo() {
  return (
    <VideoPlayer
      className="max-w-[760px]"
      src={demoVideo.src}
      poster={demoVideo.poster}
      captions={demoVideo.captions}
      title="Late Tram, live from the studio"
    />
  )
}
