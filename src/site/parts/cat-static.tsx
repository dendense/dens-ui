import type * as React from "react"
import { KIND, classify } from "./cat-shape"

/**
 * The same cat as <CatDots>, drawn once as SVG dots: for small slots
 * (thumbnails), where a WebGL context would cost more than it gives.
 */
const palettes = {
  dark: { bg: "#19a3a4", face: "#c0ebd7", eye: "#ff8a00", line: "#fff2df", bgA: 0.22, faceA: 0.8 },
  light: { bg: "#00797a", face: "#0a4a44", eye: "#ff8a00", line: "#0f1716", bgA: 0.2, faceA: 0.8 },
}

export function CatStatic({ tone = "dark", rows = 18, aspect = 4 / 3 }: { tone?: "dark" | "light"; rows?: number; aspect?: number }) {
  const pal = palettes[tone]
  const step = 2 / rows
  const cols = Math.round((2 * aspect) / step)
  const s = (0.8 * 2) / 1.3
  const cy = -0.13 * s
  const line = (0.6 * step) / s
  const dots: React.ReactElement[] = []
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = -((cols - 1) * step) / 2 + i * step
      const y = ((rows - 1) * step) / 2 - j * step
      const k = classify(x / s, (y - cy) / s, line)
      if (k === KIND.none) continue
      const [fill, a, r] =
        k === KIND.eye ? [pal.eye, 1, 0.5] : k === KIND.line ? [pal.line, 0.95, 0.5] : k === KIND.face ? [pal.face, pal.faceA, 0.43] : [pal.bg, pal.bgA, 0.31]
      dots.push(<circle key={`${i}-${j}`} cx={i + 0.5} cy={j + 0.5} r={r} fill={fill} fillOpacity={a} />)
    }
  }
  return (
    <svg viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      {dots}
    </svg>
  )
}
