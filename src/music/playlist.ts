import type { Track } from "@/components/ui/music-player"
import data from "./playlist.json"

/**
 * The playlist this page plays, written by `node scripts/fetch-playlist.mjs`.
 * Each row is [videoId, title, artist, seconds].
 */
export const PLAYLIST = {
  id: data.id,
  title: data.title,
  fetched: data.fetched,
  tracks: (data.tracks as [string, string, string, number][]).map<Track>(([id, title, artist, duration]) => ({
    id,
    title,
    artist,
    duration,
    src: `https://www.youtube.com/watch?v=${id}`,
    cover: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
  })),
}
