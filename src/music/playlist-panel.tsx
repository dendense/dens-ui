import * as React from "react"
import { SearchIcon, ShuffleIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input, InputGroup } from "@/components/ui/input"
import { MusicPlaylist, formatTime, useMusicPlayer } from "@/components/ui/music-player"

const nf = new Intl.NumberFormat("en-US")
const fold = (s: string) => s.normalize("NFKC").toLowerCase()

/*
 * The queue, out of sight until asked for. A non-modal panel: the sky and the
 * player keep working behind it. Escape or a click outside closes it.
 */
export function PlaylistPanel({
  open,
  onClose,
  title,
  returnFocus,
}: {
  open: boolean
  onClose: () => void
  title: string
  returnFocus: React.RefObject<HTMLButtonElement | null>
}) {
  const p = useMusicPlayer()
  const panel = React.useRef<HTMLElement>(null)
  const list = React.useRef<HTMLDivElement>(null)
  const total = React.useMemo(() => p.tracks.reduce((s, t) => s + (t.duration ?? 0), 0), [p.tracks])
  const [query, setQuery] = React.useState("")
  const q = fold(query.trim())
  const haystack = React.useMemo(() => p.tracks.map((t) => fold(`${t.title} ${t.artist}`)), [p.tracks])
  const matches = React.useMemo(() => (q ? haystack.filter((h) => h.includes(q)).length : p.tracks.length), [q, haystack, p.tracks.length])

  React.useEffect(() => {
    if (!open) return
    // land on the playing row
    list.current?.querySelector("[aria-current='true']")?.scrollIntoView({ block: "center" })
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        returnFocus.current?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (panel.current?.contains(t) || returnFocus.current?.contains(t)) return
      if ((t as Element).closest?.("[data-slot='music-player'], [aria-label='Video']")) return
      onClose()
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <section
      ref={panel}
      id="playlist-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="playlist-title"
      tabIndex={-1}
      aria-hidden={!open}
      className={cn(
        "fixed z-30 flex flex-col overflow-hidden rounded-[22px] bg-card text-card-foreground shadow-raised outline-none transition-[opacity,translate,visibility] duration-300 ease-out",
        "inset-x-3 top-[68px] bottom-[calc(max(12px,env(safe-area-inset-bottom))+120px)]",
        "sm:inset-x-auto sm:right-6 sm:top-[calc(7vh+44px)] sm:bottom-[calc(24px+92px)] sm:w-[400px] md:right-[12vw]",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
      )}
    >
      <header className="flex items-start gap-3 border-b border-border px-5 pb-4 pt-4">
        <div className="min-w-0 flex-1">
          <h2 id="playlist-title" className="truncate text-[15px] font-semibold tracking-[-0.01em]">
            {title}
          </h2>
          <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <span className="tabular-nums">{nf.format(p.tracks.length)} tracks</span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">{Math.round(total / 3600)} h</span>
            {p.shuffle && (
              <>
                <span aria-hidden>·</span>
                <ShuffleIcon className="size-3.5" aria-hidden />
                <span>Shuffle</span>
              </>
            )}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Close playlist"
          onClick={() => {
            onClose()
            returnFocus.current?.focus()
          }}
          className="-mr-1.5"
        >
          <XIcon />
        </Button>
      </header>
      {p.track && (
        <p className="border-b border-border px-5 py-2.5 text-[12.5px] text-muted-foreground">
          Now <span className="font-semibold text-foreground">{p.track.title}</span> · {p.track.artist}
          {p.duration > 0 && <span className="tabular-nums"> · {formatTime(p.time)} / {formatTime(p.duration)}</span>}
        </p>
      )}
      <div className="border-b border-border px-3 py-2.5">
        <InputGroup start={<SearchIcon />}>
          <Input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              list.current?.scrollTo({ top: 0 })
            }}
            placeholder="Search title or artist"
            aria-label="Search the playlist"
            aria-controls="playlist-rows"
            className="h-9 rounded-full"
          />
        </InputGroup>
        <p aria-live="polite" className="sr-only">
          {q ? `${matches} of ${p.tracks.length} tracks match` : ""}
        </p>
      </div>
      <div ref={list} id="playlist-rows" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
        <MusicPlaylist filter={q ? (_, i) => haystack[i].includes(q) : undefined} />
        {q && matches === 0 && (
          <p className="px-3 py-8 text-center text-[13.5px] text-muted-foreground">
            Nothing matches “{query.trim()}”. Try the artist’s name in its own script.
          </p>
        )}
      </div>
    </section>
  )
}
