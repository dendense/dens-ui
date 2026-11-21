/* The day as the sky sees it. Hours are local time, 0–24. */

export const PHASES = [
  { id: "night", label: "Night", from: 0, to: 5, fill: "day-hatch-dark" },
  { id: "morning", label: "Morning", from: 5, to: 10, fill: "day-hatch-light" },
  { id: "day", label: "Daytime", from: 10, to: 17, fill: "day-ruled" },
  { id: "evening", label: "Evening", from: 17, to: 20, fill: "day-hatch-light" },
  { id: "late", label: "Night", from: 20, to: 24, fill: "day-hatch-dark" },
] as const

export function phaseAt(hour: number) {
  return PHASES.find((p) => hour >= p.from && hour < p.to) ?? PHASES[0]
}

/** Plate weights for the four painted skies: [day, dawn, dusk, night], summing to 1. */
export type SkyWeights = [number, number, number, number]

// hold a plate, then cross-fade to the next; the fades sit on the phase edges
const KEYS: [number, number][] = [
  [0, 3],
  [4.5, 3],
  [6, 1],
  [8.5, 1],
  [10, 0],
  [16.5, 0],
  [18, 2],
  [19, 2],
  [20.5, 3],
  [24, 3],
]

export function skyWeights(hour: number): SkyWeights {
  const h = ((hour % 24) + 24) % 24
  const w: SkyWeights = [0, 0, 0, 0]
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [h0, a] = KEYS[i]
    const [h1, b] = KEYS[i + 1]
    if (h >= h0 && h <= h1) {
      const t = h1 === h0 ? 0 : (h - h0) / (h1 - h0)
      const s = t * t * (3 - 2 * t)
      w[a] += 1 - s
      w[b] += s
      return w
    }
  }
  w[0] = 1
  return w
}

export type Signal = "red" | "green" | "amber"
export const SIGNAL_LABEL: Record<Signal, string> = { red: "Red", green: "Green", amber: "Amber" }
