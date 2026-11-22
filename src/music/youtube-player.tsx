import * as React from "react"

import { MusicPlayerContext, type MusicPlayerState, type RepeatMode, type Track } from "@/components/ui/music-player"

/*
 * A YouTube IFrame engine behind the Dens-UI music player faces.
 *
 * The page shuffles its own copy of the playlist (the IFrame API only loads the
 * first 200 videos of a list). YouTube's terms want the player visible, at least
 * 200 × 200, so the iframe lives in <VideoPanel>, which never hides.
 * Videos that refuse to embed (errors 101 / 150) are skipped on their own.
 */

/* ---------- the IFrame API, loaded once ---------- */

type YTPlayer = {
  loadVideoById(id: string): void
  cueVideoById(id: string): void
  playVideo(): void
  pauseVideo(): void
  seekTo(s: number, allowSeekAhead: boolean): void
  setVolume(v: number): void
  mute(): void
  unMute(): void
  getCurrentTime(): number
  getDuration(): number
  getVideoLoadedFraction(): number
  getPlayerState(): number
  destroy(): void
}
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string
      width: string
      height: string
      playerVars: Record<string, string | number>
      events: {
        onReady: () => void
        onStateChange: (e: { data: number }) => void
        onError: (e: { data: number }) => void
      }
    }
  ) => YTPlayer
}
declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let api: Promise<YTNamespace> | null = null
function loadApi() {
  if (api) return api
  api = new Promise((resolve, reject) => {
    if (window.YT?.Player) return resolve(window.YT)
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve(window.YT!)
    }
    const s = document.createElement("script")
    s.src = "https://www.youtube.com/iframe_api"
    s.async = true
    s.onerror = () => {
      api = null
      reject(new Error("YouTube IFrame API failed to load"))
    }
    document.head.appendChild(s)
  })
  return api
}

const STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 }
const UNEMBEDDABLE = new Set([2, 5, 100, 101, 150])

function shuffled(n: number, first?: number) {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  if (first != null) {
    const k = a.indexOf(first)
    ;[a[0], a[k]] = [a[k], a[0]]
  }
  return a
}

/* ---------- the slot the video plays in ---------- */

type VideoCtx = {
  mount: (el: HTMLDivElement | null) => void
  unavailable: number
}
const VideoContext = React.createContext<VideoCtx | null>(null)
export function useVideoWindow() {
  const ctx = React.useContext(VideoContext)
  if (!ctx) throw new Error("useVideoWindow must be used inside <YouTubePlayerProvider>")
  return ctx
}

/* ---------- provider ---------- */

export function YouTubePlayerProvider({ tracks, children }: { tracks: Track[]; children: React.ReactNode }) {
  const n = tracks.length
  const order = React.useRef<number[]>([])
  const pos = React.useRef(0)
  const [index, setIndex] = React.useState(() => {
    order.current = shuffled(n)
    return order.current[0] ?? 0
  })
  const [playing, setPlaying] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [duration, setDuration] = React.useState(tracks[index]?.duration ?? 0)
  const [buffered, setBuffered] = React.useState(0)
  const [volume, setVolumeState] = React.useState(0.8)
  const [muted, setMuted] = React.useState(false)
  const [shuffle, setShuffle] = React.useState(true)
  const [repeat, setRepeat] = React.useState<RepeatMode>("all")
  const [unavailable, setUnavailable] = React.useState(0)
  const [mountEl, setMountEl] = React.useState<HTMLDivElement | null>(null)

  const player = React.useRef<YTPlayer | null>(null)
  const ready = React.useRef(false)
  const wantsPlay = React.useRef(false)
  const indexRef = React.useRef(index)
  indexRef.current = index
  const track = tracks[index]

  /* step through the queue: the shuffled order, or the list as it is */
  const stepFrom = React.useCallback(
    (dir: 1 | -1) => {
      if (!shuffle) return (((indexRef.current + dir) % n) + n) % n
      let p = pos.current + dir
      if (p >= n) {
        order.current = shuffled(n)
        p = 0
      }
      if (p < 0) p = 0
      pos.current = p
      return order.current[p]
    },
    [shuffle, n]
  )

  const load = React.useCallback(
    (i: number, autoplay: boolean) => {
      const t = tracks[i]
      if (!t) return
      setIndex(i)
      setError(false)
      setTime(0)
      setBuffered(0)
      setDuration(t.duration ?? 0)
      wantsPlay.current = autoplay
      const p = player.current
      if (!p || !ready.current) return
      if (autoplay) {
        setLoading(true)
        p.loadVideoById(t.id!)
      } else p.cueVideoById(t.id!)
    },
    [tracks]
  )

  const next = React.useCallback((autoplay: boolean) => load(stepFrom(1), autoplay), [load, stepFrom])

  /* the player itself, created once the window has mounted its slot */
  const latest = React.useRef({ next, repeat })
  latest.current = { next, repeat }
  React.useEffect(() => {
    if (!mountEl) return
    let cancelled = false
    let created: YTPlayer | null = null
    const slot = document.createElement("div")
    mountEl.appendChild(slot)
    loadApi()
      .then((YT) => {
        if (cancelled) return
        created = new YT.Player(slot, {
          videoId: tracks[indexRef.current]?.id ?? "",
          width: "100%",
          height: "100%",
          playerVars: { playsinline: 1, rel: 0, modestbranding: 1, iv_load_policy: 3, cc_load_policy: 0, origin: window.location.origin },
          events: {
            onReady: () => {
              ready.current = true
              player.current = created
              created!.setVolume(80)
              if (wantsPlay.current) created!.loadVideoById(tracks[indexRef.current].id!)
            },
            onStateChange: ({ data }) => {
              if (data === STATE.PLAYING) {
                setPlaying(true)
                setLoading(false)
                setError(false)
                const d = created!.getDuration()
                if (d) setDuration(d)
              } else if (data === STATE.PAUSED) {
                setPlaying(false)
                setLoading(false)
              } else if (data === STATE.BUFFERING) setLoading(true)
              else if (data === STATE.CUED) setLoading(false)
              else if (data === STATE.ENDED) {
                if (latest.current.repeat === "one") {
                  created!.seekTo(0, true)
                  created!.playVideo()
                } else latest.current.next(true)
              }
            },
            onError: ({ data }) => {
              setError(true)
              setLoading(false)
              setPlaying(false)
              if (UNEMBEDDABLE.has(data)) {
                setUnavailable((u) => u + 1)
                const at = indexRef.current
                // a beat so the row's "could not be played" reads, then move on
                window.setTimeout(() => {
                  if (indexRef.current === at) latest.current.next(wantsPlay.current)
                }, 1400)
              }
            },
          },
        })
      })
      .catch(() => setError(true))
    return () => {
      cancelled = true
      ready.current = false
      player.current = null
      created?.destroy()
      slot.remove()
    }
    // the player is built once per slot; track changes go through load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountEl])

  /* the playhead, polled while playing */
  React.useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      const p = player.current
      if (!p) return
      const d = p.getDuration() || 0
      setTime(p.getCurrentTime() || 0)
      if (d) setDuration(d)
      setBuffered((p.getVideoLoadedFraction() || 0) * d)
    }, 250)
    return () => window.clearInterval(id)
  }, [playing])

  React.useEffect(() => {
    const p = player.current
    if (!p || !ready.current) return
    p.setVolume(Math.round(volume * 100))
    if (muted) p.mute()
    else p.unMute()
  }, [volume, muted])

  const doPlay = React.useCallback(() => {
    wantsPlay.current = true
    const p = player.current
    if (!p || !ready.current) return
    const s = p.getPlayerState()
    if (s === STATE.CUED || s === -1) p.loadVideoById(tracks[indexRef.current].id!)
    else p.playVideo()
  }, [tracks])

  const doPause = React.useCallback(() => {
    wantsPlay.current = false
    player.current?.pauseVideo()
  }, [])

  const state = React.useMemo<MusicPlayerState>(
    () => ({
      tracks,
      index,
      track,
      playing,
      loading,
      error,
      time,
      duration,
      buffered,
      volume,
      muted,
      shuffle,
      repeat,
      play: (i) => {
        if (i == null || i === index) return doPlay()
        if (shuffle) {
          // put the picked track next in the shuffled order and step onto it
          const o = order.current
          const j = o.indexOf(i)
          const k = Math.min(pos.current + 1, n - 1)
          ;[o[k], o[j]] = [o[j], o[k]]
          pos.current = k
        }
        load(i, true)
      },
      pause: doPause,
      toggle: () => (playing || wantsPlay.current ? doPause() : doPlay()),
      next: () => next(playing || wantsPlay.current),
      prev: () => {
        const p = player.current
        if (p && time > 3) {
          p.seekTo(0, true)
          setTime(0)
          return
        }
        load(stepFrom(-1), playing || wantsPlay.current)
      },
      seek: (s) => {
        player.current?.seekTo(s, true)
        setTime(s)
      },
      setVolume: (v) => {
        setVolumeState(v)
        if (v > 0) setMuted(false)
      },
      toggleMute: () => setMuted((m) => !m),
      toggleShuffle: () =>
        setShuffle((s) => {
          if (!s) {
            // re-deal from the current track so "next" stays a surprise
            order.current = shuffled(n, indexRef.current)
            pos.current = 0
          }
          return !s
        }),
      cycleRepeat: () => setRepeat((r) => (r === "all" ? "one" : r === "one" ? "off" : "all")),
    }),
    [tracks, index, track, playing, loading, error, time, duration, buffered, volume, muted, shuffle, repeat, doPlay, doPause, load, next, stepFrom, n]
  )

  const video = React.useMemo<VideoCtx>(
    () => ({ mount: setMountEl, unavailable }),
    [unavailable]
  )

  return (
    <MusicPlayerContext.Provider value={state}>
      <VideoContext.Provider value={video}>{children}</VideoContext.Provider>
    </MusicPlayerContext.Provider>
  )
}
