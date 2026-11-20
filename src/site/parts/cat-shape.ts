/**
 * The cat face used by the empty banner slots, as a classifier over a dot grid.
 *
 * Face space: the head is an ellipse centred at (0, −0.05) with radii 0.56 × 0.47;
 * the face spans y ≈ −0.52 … 0.78 (ear tips). Every dot of the grid is asked
 * "what are you?" and gets one of these kinds:
 */
export const KIND = {
  /** background matrix */
  bg: 0,
  /** inside the head or ears */
  face: 1,
  /** the eyes (drawn in Hermès orange) */
  eye: 2,
  /** nose, mouth and whiskers */
  line: 3,
  /** pupil slit: no dot, so the slit reads as a gap */
  none: -1,
} as const
export type Kind = (typeof KIND)[keyof typeof KIND]

export const EYES: [number, number][] = [
  [-0.21, 0.02],
  [0.21, 0.02],
]
const EYE_R: [number, number] = [0.085, 0.115]

type P = [number, number]

function inTri([x, y]: P, a: P, b: P, c: P) {
  const s = (p: P, q: P, r: P) => (p[0] - r[0]) * (q[1] - r[1]) - (q[0] - r[0]) * (p[1] - r[1])
  const d1 = s([x, y], a, b)
  const d2 = s([x, y], b, c)
  const d3 = s([x, y], c, a)
  const neg = d1 < 0 || d2 < 0 || d3 < 0
  const pos = d1 > 0 || d2 > 0 || d3 > 0
  return !(neg && pos)
}

function segDist([x, y]: P, [ax, ay]: P, [bx, by]: P) {
  const dx = bx - ax
  const dy = by - ay
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(x - (ax + t * dx), y - (ay + t * dy))
}

const whiskers: [P, P][] = [
  [[0.3, -0.16], [0.95, -0.07]],
  [[0.3, -0.21], [0.98, -0.22]],
  [[0.3, -0.26], [0.92, -0.37]],
]

/**
 * @param x,y   point in face space
 * @param line  half-thickness for strokes, in face units (≈ 0.6 × the grid step)
 */
export function classify(x: number, y: number, line: number): Kind {
  const ax = Math.abs(x)

  // eyes first (they sit inside the head)
  for (const [ex, ey] of EYES) {
    const q = ((x - ex) / EYE_R[0]) ** 2 + ((y - ey) / EYE_R[1]) ** 2
    if (q <= 1) return Math.abs(x - ex) < line * 0.55 && Math.abs(y - ey) < EYE_R[1] * 0.8 ? KIND.none : KIND.eye
  }

  // nose and mouth
  if (inTri([x, y], [-0.055, -0.115], [0.055, -0.115], [0, -0.185])) return KIND.line
  for (const mx of [-0.055, 0.055]) {
    const r = Math.hypot(x - mx, y + 0.185)
    if (y < -0.185 && Math.abs(r - 0.055) < line * 0.8) return KIND.line
  }

  // whiskers (may leave the head)
  for (const [a, b] of whiskers) {
    if (segDist([ax, y], a, b) < line * 0.7) return KIND.line
  }

  // head and ears
  const head = (x / 0.56) ** 2 + ((y + 0.05) / 0.47) ** 2 <= 1
  const ear = inTri([ax, y], [0.52, 0.18], [0.4, 0.78], [0.1, 0.4])
  if (head || ear) return KIND.face

  return KIND.bg
}
