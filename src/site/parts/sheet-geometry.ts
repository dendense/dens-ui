/**
 * Geometry of the Dens-UI palette sheet.
 *
 * Three blocks — top (T), bottom-left (M) and bottom-right (O) — separated by
 * a gap of constant width `g`. Every curve is a circular arc, and each arc on
 * one side of the gap is concentric with the arc facing it on the other side,
 * with radii that differ by exactly `g`. That is what keeps the gap the same
 * width all the way through the bends.
 *
 *   yt = split - g/2                  bottom edge of T
 *   yb = split + g/2                  top edge of M and O
 *
 *   Left bend (T's "tail" over M):
 *     centre  cL = (rTail, yb + rTail)
 *     M's top-left corner   radius rTail      (quarter circle, meets x = 0 vertically)
 *     T's tail              radius rTail + g  (meets x = 0 at yL = cL.y − √((rTail+g)² − rTail²))
 *
 *   Right bend (O rising beside T):
 *     centre  cR = (W − rShoulder, yt − rShoulder)
 *     T's bottom-right corner  radius rShoulder      (quarter circle)
 *     O's rising edge          radius rShoulder + g  (meets x = W at yR = cR.y + √((rShoulder+g)² − rShoulder²))
 *
 *   Vertical gap: M ends at x = col, O starts at x = col + g; the two corners
 *   facing the gap share radius rInner.
 *
 * The frame around the sheet uses margin P and corner radius R + P, so the
 * outer corners are concentric with the blocks' corners.
 */
export type SheetParams = {
  /** inner width and height (the area the blocks fill) */
  W: number
  H: number
  /** constant gap between blocks */
  g: number
  /** outer corner radius of every block */
  R: number
  /** y of the gap's centre line between the rows */
  split: number
  /** x where the bottom-left block ends (the vertical gap starts here) */
  col: number
  rTail: number
  rShoulder: number
  rInner: number
}

const f = (n: number) => +n.toFixed(3)

export function sheetGeometry(p: SheetParams) {
  const { W, H, g, R, split, col, rTail, rShoulder, rInner } = p
  const yt = split - g / 2
  const yb = split + g / 2
  const tail = rTail + g
  const cLy = yb + rTail
  const yL = cLy - Math.sqrt(tail * tail - rTail * rTail)
  const rise = rShoulder + g
  const cRx = W - rShoulder
  const cRy = yt - rShoulder
  const yR = cRy + Math.sqrt(rise * rise - rShoulder * rShoulder)
  const x0 = col + g

  if (yL <= R || yR >= H - R || cLy > H - R || col - rInner < rTail || x0 + rInner > W - rShoulder) {
    throw new Error("sheetGeometry: parameters do not leave room for every arc")
  }

  const top = [
    `M0,${f(R)}`,
    `A${R},${R} 0 0 1 ${f(R)},0`,
    `H${f(W - R)}`,
    `A${R},${R} 0 0 1 ${f(W)},${f(R)}`,
    `V${f(cRy)}`,
    `A${rShoulder},${rShoulder} 0 0 1 ${f(cRx)},${f(yt)}`,
    `H${f(rTail)}`,
    `A${tail},${tail} 0 0 0 0,${f(yL)}`,
    "Z",
  ].join(" ")

  const left = [
    `M0,${f(cLy)}`,
    `A${rTail},${rTail} 0 0 1 ${f(rTail)},${f(yb)}`,
    `H${f(col - rInner)}`,
    `A${rInner},${rInner} 0 0 1 ${f(col)},${f(yb + rInner)}`,
    `V${f(H - R)}`,
    `A${R},${R} 0 0 1 ${f(col - R)},${f(H)}`,
    `H${f(R)}`,
    `A${R},${R} 0 0 1 0,${f(H - R)}`,
    "Z",
  ].join(" ")

  const right = [
    `M${f(x0)},${f(yb + rInner)}`,
    `A${rInner},${rInner} 0 0 1 ${f(x0 + rInner)},${f(yb)}`,
    `H${f(cRx)}`,
    `A${rise},${rise} 0 0 0 ${f(W)},${f(yR)}`,
    `V${f(H - R)}`,
    `A${R},${R} 0 0 1 ${f(W - R)},${f(H)}`,
    `H${f(x0 + R)}`,
    `A${R},${R} 0 0 1 ${f(x0)},${f(H - R)}`,
    "Z",
  ].join(" ")

  return { top, left, right, yt, yb, yL, yR, x0 }
}

/** The sheet used on the site: 600 × 640 units, 16-unit gap, 32-unit frame margin. */
export const SHEET: SheetParams = {
  W: 600,
  H: 640,
  g: 16,
  R: 56,
  split: 380,
  col: 292,
  rTail: 96,
  rShoulder: 72,
  rInner: 56,
}
export const SHEET_FRAME = 2 * SHEET.g // margin between frame edge and blocks
export const SHEET_INSET = 40 // where labels and slotted UI sit inside a block
export const sheet = sheetGeometry(SHEET)

/** The logo mark: the same sheet at 24 × 24 inside a 32 × 32 frame (margin 4, frame radius 9 = 5 + 4). */
export const MARK: SheetParams = {
  W: 24,
  H: 24,
  g: 2,
  R: 5,
  split: 14,
  col: 11,
  rTail: 4,
  rShoulder: 4,
  rInner: 3,
}
export const mark = sheetGeometry(MARK)
