import * as React from "react"

import { cn } from "@/lib/utils"
import type { Signal } from "./phases"
import type { SceneHandle } from "./scene"

/** Mounts the painted street corner (three.js) into a full-bleed canvas. */
export function SkyScene({
  className,
  hour,
  onSignal,
  playing,
  clearTop = 0,
}: {
  className?: string
  /** preview an hour; null follows the local clock */
  hour: number | null
  onSignal?: (s: Signal) => void
  /** when playback starts the light turns green */
  playing?: boolean
  /** phones: the text column ends here (px from the top); the signal stands below it */
  clearTop?: number
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const handle = React.useRef<SceneHandle | null>(null)
  const signalCb = React.useRef(onSignal)
  signalCb.current = onSignal
  const hourRef = React.useRef(hour)
  hourRef.current = hour
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    import("./scene").then(({ createScene }) => {
      if (cancelled || !ref.current) return
      handle.current = createScene(ref.current, {
        onSignal: (s) => signalCb.current?.(s),
        onReady: () => setReady(true),
      })
      handle.current.setHour(hourRef.current)
      handle.current.setClearTop(clearRef.current)
    })
    return () => {
      cancelled = true
      handle.current?.dispose()
      handle.current = null
    }
  }, [])

  React.useEffect(() => {
    handle.current?.setHour(hour)
  }, [hour])

  React.useEffect(() => {
    if (playing) handle.current?.showSignal("green")
  }, [playing])

  const clearRef = React.useRef(clearTop)
  clearRef.current = clearTop
  React.useEffect(() => {
    handle.current?.setClearTop(clearTop)
  }, [clearTop])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("block size-full transition-opacity duration-700 ease-out", ready ? "opacity-100" : "opacity-0", className)}
    />
  )
}
