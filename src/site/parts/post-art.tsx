import { sheetGeometry, type SheetParams } from "./sheet-geometry"
import { sheetPairs } from "./palette-sheet"

/*
 * Cover art for the PostCard demos: the palette sheet re-cut to a 16:10 frame.
 * Same arc rules as the hero sheet (constant gap g, concentric bends), so the
 * demo covers belong to the system instead of borrowing stock photos.
 */
const COVER: SheetParams = { W: 800, H: 500, g: 16, R: 36, split: 300, col: 470, rTail: 56, rShoulder: 56, rInner: 36 }
const cover = sheetGeometry(COVER)

export function PostArt({ pair = 0, flip = false, className }: { pair?: number; flip?: boolean; className?: string }) {
  const { soft, accent } = sheetPairs[pair % sheetPairs.length]
  return (
    <svg viewBox={`-16 -16 ${COVER.W + 32} ${COVER.H + 32}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect x={-16} y={-16} width={COVER.W + 32} height={COVER.H + 32} fill="#0c0b0b" />
      <g transform={flip ? `translate(${COVER.W} 0) scale(-1 1)` : undefined}>
        <path d={cover.top} fill="#008C8D" />
        <path d={cover.left} fill={soft.hex} />
        <path d={cover.right} fill={accent.hex} />
      </g>
    </svg>
  )
}
