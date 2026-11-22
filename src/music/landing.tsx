import * as React from "react"
import { ListMusicIcon, RotateCcwIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MusicPlayer, useMusicPlayer } from "@/components/ui/music-player"
import { PHASES, SIGNAL_LABEL, phaseAt, type Signal } from "./phases"
import { PLAYLIST } from "./playlist"
import { PlaylistPanel } from "./playlist-panel"
import { SkyScene } from "./sky-scene"
import { VideoPanel } from "./video-panel"
import { YouTubePlayerProvider } from "./youtube-player"

function useClock() {
  const [now, setNow] = React.useState(() => new Date())
  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

const nf = new Intl.NumberFormat("en-US")
const hhmm = (h: number) => {
  const m = Math.round(h * 60) % (24 * 60)
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`
}

const COUNT = nf.format(PLAYLIST.tracks.length)

export function MusicLanding() {
  return (
    <YouTubePlayerProvider tracks={PLAYLIST.tracks}>
      <Landing />
    </YouTubePlayerProvider>
  )
}

function Landing() {
  const column = React.useRef<HTMLElement>(null)
  const [columnBottom, setColumnBottom] = React.useState(0)
  React.useLayoutEffect(() => {
    const el = column.current
    if (!el) return
    const measure = () => setColumnBottom(el.getBoundingClientRect().bottom)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])
  const [listOpen, setListOpen] = React.useState(false)
  const listButton = React.useRef<HTMLButtonElement>(null)
  const now = useClock()
  const liveHour = now.getHours() + now.getMinutes() / 60
  const [preview, setPreview] = React.useState<number | null>(null)
  const [signal, setSignal] = React.useState<Signal>("red")
  const hour = preview ?? liveHour
  const { playing } = useMusicPlayer()
  const phase = phaseAt(hour)

  return (
    <div className="relative isolate min-h-dvh overflow-hidden text-[color:var(--sky-ink)]">
      <SkyScene className="absolute inset-0 -z-10" hour={preview} onSignal={setSignal} playing={playing} clearTop={columnBottom} />
      <div aria-hidden className="sky-hatch pointer-events-none absolute inset-0 -z-10" />

      <header className="flex items-center justify-between gap-4 px-4 pt-5 sm:px-8 md:px-[12vw] md:pt-[7vh]">
        <a href="./music.html" className="flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white">
          <img src="./favicon.svg" alt="" className="size-7 rounded-[8px]" />
          <span className="text-[15px] font-bold tracking-[-0.01em]">dens.fm</span>
        </a>
        <Button
          ref={listButton}
          variant="ink"
          size="sm"
          aria-expanded={listOpen}
          aria-controls="playlist-panel"
          onClick={() => setListOpen((o) => !o)}
          className="bg-[#0f1716]/85 text-white backdrop-blur-sm hover:bg-[#0f1716]"
        >
          <ListMusicIcon />
          Playlist
          <span className="font-mono text-[11px] tabular-nums text-white/60">{COUNT}</span>
        </Button>
      </header>

      <main className="px-4 pb-40 pt-7 sm:px-8 sm:pt-10 md:px-[12vw] md:pt-[5vh]">
        <section ref={column} aria-labelledby="headline" className="sky-type max-w-[440px]">
          <h1 id="headline" className="text-balance text-[34px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[44px]">
            Relax and Chill...
          </h1>
          <p className="mt-3 max-w-[40ch] text-[15.5px] leading-[1.6] text-[color:var(--sky-ink-muted)]">
            Neither are we.
            {/* phones keep the first line; the rest needs the room the signal stands in */}
            <span className="hidden sm:inline">
              <br />
              Under a light as crimson as the Tatsuta river,
              <br />
              we wait for the first syllable, and the song begins.
            </span>
          </p>

          <VideoPanel className="mt-5 sm:mt-7" />

          <DayBar
            hour={hour}
            previewing={preview != null}
            onPreview={setPreview}
            status={`${preview == null ? "" : "Previewing "}${hhmm(hour)} · ${phase.label} · ${SIGNAL_LABEL[signal]} light`}
            className="mt-5 sm:mt-7"
          />
        </section>
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 px-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
        {/* phones: the compact ink face, a dark pill under the sky; wider screens: the full bar */}
        <MusicPlayer variant="mini" tone="ink" className="pointer-events-auto p-2.5 pr-3.5 shadow-raised sm:hidden" />
        <MusicPlayer variant="bar" className="pointer-events-auto mx-auto hidden max-w-[920px] px-4 py-2.5 shadow-raised sm:block" />
      </div>
      <PlaylistPanel open={listOpen} onClose={() => setListOpen(false)} title={PLAYLIST.title} returnFocus={listButton} />
    </div>
  )
}

/*
 * The reference's budget bar, read as a day: hatched night, ruled daylight and
 * an orange "now". Drag along it (or use the arrow keys) to preview the sky at
 * another hour; "Live" hands it back to the clock.
 */
function DayBar({
  hour,
  previewing,
  onPreview,
  status,
  className,
}: {
  hour: number
  previewing: boolean
  onPreview: (h: number | null) => void
  status: string
  className?: string
}) {
  const pct = (h: number) => `${(h / 24) * 100}%`
  return (
    <figure className={cn("w-full", className)}>
      <div className="relative">
        <div className="relative flex h-12 overflow-hidden rounded-[10px] border border-white/70 bg-white shadow-[0_8px_24px_-12px_rgb(6_30_80/0.6)]">
          {PHASES.map((p) => (
            <div
              key={p.id}
              className={cn(p.fill, "h-full border-r border-[#9aa0a6] last:border-r-0")}
              style={{ width: pct(p.to - p.from), ["--hours" as string]: p.to - p.from }}
            />
          ))}
          <span aria-hidden className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-highlight shadow-[0_0_0_1px_rgb(31_17_0/0.25)]" style={{ left: pct(hour) }} />
        </div>
        <input
          type="range"
          min={0}
          max={23.75}
          step={0.25}
          value={Math.min(hour, 23.75)}
          onChange={(e) => onPreview(Number(e.target.value))}
          aria-label="Preview the sky at another hour"
          aria-valuetext={hhmm(hour)}
          className="peer absolute inset-0 size-full cursor-ew-resize appearance-none opacity-0"
        />
        <span aria-hidden className="pointer-events-none absolute -inset-1 rounded-[13px] ring-2 ring-white opacity-0 peer-focus-visible:opacity-100" />
      </div>
      <figcaption className="relative mt-1 h-10 text-[11px] leading-tight">
        {PHASES.slice(0, 4).map((p) => (
          <span key={p.id} className="absolute top-0 flex flex-col pl-1.5" style={{ left: pct(p.from) }}>
            <span aria-hidden className="absolute left-0 top-[-4px] h-6 w-px bg-[color:var(--sky-rule)]" />
            <span className="font-mono font-medium tabular-nums">{String(p.from).padStart(2, "0")}:00</span>
            <span className="text-[color:var(--sky-ink)]">{p.label}</span>
          </span>
        ))}
        <span className="absolute right-0 top-0 flex flex-col items-end pr-1.5">
          <span aria-hidden className="absolute right-0 top-[-4px] h-6 w-px bg-[color:var(--sky-rule)]" />
          <span className="font-mono font-medium tabular-nums">24:00</span>
          <span className="text-[color:var(--sky-ink)]">Night</span>
        </span>
      </figcaption>
      <div className="mt-1 flex h-8 items-center gap-3">
        {previewing && (
          <Button variant="ink" size="sm" onClick={() => onPreview(null)} className="bg-[#0f1716]/85 text-white hover:bg-[#0f1716]">
            <RotateCcwIcon />
            Back to live
          </Button>
        )}
        <span className="text-[13px] font-medium tabular-nums text-[color:var(--sky-ink)]">{status}</span>
      </div>
    </figure>
  )
}
