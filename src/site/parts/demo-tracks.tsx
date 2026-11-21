import type { Track } from "@/components/ui/music-player"
import { PostArt } from "./post-art"

/*
 * Demo audio for the Music Player pages. The three loops in public/media were
 * synthesised for Dens-UI (no samples, no third-party recordings), so they are
 * safe to publish with the site. Covers are the palette sheet, re-cut square.
 */
const base = import.meta.env.BASE_URL

export const demoTracks: Track[] = [
  { id: "tide", title: "Morning Tide", artist: "Kala Senja", src: `${base}media/morning-tide.m4a`, duration: 50, cover: <PostArt pair={0} className="size-full" /> },
  { id: "tram", title: "Late Tram", artist: "Arus Pelan", src: `${base}media/late-tram.m4a`, duration: 46, cover: <PostArt pair={3} flip className="size-full" /> },
  { id: "tin", title: "Rain on Tin", artist: "Teras Belakang", src: `${base}media/rain-on-tin.m4a`, duration: 41, cover: <PostArt pair={1} className="size-full" /> },
]

export const demoVideo = {
  src: `${base}media/sample-video.mp4`,
  poster: `${base}media/sample-video.jpg`,
  captions: [{ src: `${base}media/sample-video.en.vtt`, srclang: "en", label: "English" }],
}
