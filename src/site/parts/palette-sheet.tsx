import * as React from "react"

import { cn } from "@/lib/utils"
import { SHEET, SHEET_FRAME, SHEET_INSET, sheet } from "./sheet-geometry"

/**
 * The signature move: the Mars Green palette sheet from the references,
 * three blocks joined by concave arcs on near-black. Geometry lives in
 * sheet-geometry.ts (constant 16-unit gap, concentric arcs and corners).
 * Live UI can sit on the green block through `topSlot`.
 */
const { W, H, R } = SHEET
const P = SHEET_FRAME
const VW = W + 2 * P
const VH = H + 2 * P
/** units → % of the inner block area */
const px = (u: number) => `${(u / W) * 100}%`
const py = (u: number) => `${(u / H) * 100}%`
/** units → container-query width of the inner area (1cqw = W/100 units) */
const cq = (u: number) => `${(u / W) * 100}cqw`

export type Swatch = { name: string; hex: string; rgb: string; ink: string }

export const sheetPairs: { accent: Swatch; soft: Swatch }[] = [
  { soft: { name: "Mint", hex: "#C0EBD7", rgb: "192 235 215", ink: "#00585a" }, accent: { name: "Hermès orange", hex: "#FF8A00", rgb: "255 138 0", ink: "#1f1100" } },
  { soft: { name: "Powder", hex: "#FFF2DF", rgb: "255 242 223", ink: "#00585a" }, accent: { name: "Periwinkle", hex: "#53589A", rgb: "83 88 154", ink: "#fff2df" } },
  { soft: { name: "Champagne", hex: "#EBE3A5", rgb: "235 227 165", ink: "#00585a" }, accent: { name: "Cartier red", hex: "#A42423", rgb: "164 36 35", ink: "#ebe3a5" } },
  { soft: { name: "Lake blue", hex: "#AED4E1", rgb: "174 212 225", ink: "#00585a" }, accent: { name: "Klein blue", hex: "#0B3289", rgb: "11 50 137", ink: "#aed4e1" } },
  { soft: { name: "Skin", hex: "#FCE2C4", rgb: "252 226 196", ink: "#00585a" }, accent: { name: "Pomegranate", hex: "#F74835", rgb: "247 72 53", ink: "#200604" } },
]

export function PaletteSheet({
  pair = 0,
  className,
  topSlot,
  showLabels = true,
}: {
  pair?: number
  className?: string
  topSlot?: React.ReactNode
  showLabels?: boolean
}) {
  const { soft, accent } = sheetPairs[pair]
  const fill = { transition: "fill 400ms cubic-bezier(0.16,1,0.3,1)" }
  const inset = SHEET_INSET
  return (
    <div className={cn("relative", className)}>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="block h-auto w-full drop-shadow-[0_18px_28px_rgb(15_23_22/0.22)]" aria-hidden>
        {/* frame radius = block radius + margin, so the corners are concentric */}
        <rect width={VW} height={VH} rx={R + P} fill="#0c0b0b" />
        <g transform={`translate(${P} ${P})`}>
          <path d={sheet.top} fill="#008C8D" />
          <path d={sheet.left} fill={soft.hex} style={fill} />
          <path d={sheet.right} fill={accent.hex} style={fill} />
        </g>
      </svg>

      {/* overlay covering exactly the inner block area */}
      <div className="cq absolute" style={{ left: `${(P / VW) * 100}%`, top: `${(P / VH) * 100}%`, width: `${(W / VW) * 100}%`, height: `${(H / VH) * 100}%` }}>
        {topSlot && (
          <div
            className="absolute w-[54%] [&>[data-slot=card]]:rounded-[var(--slot-r)]"
            style={{ right: px(inset), top: py(inset), ["--slot-r" as string]: cq(R - inset) }}
          >
            {topSlot}
          </div>
        )}

        {showLabels && (
          <>
            <div className="absolute text-[#fff2df]" style={{ left: px(inset), bottom: py(H - sheet.yt + inset) }}>
              <div className="font-bold leading-none tracking-[-0.03em]" style={{ fontSize: cq(48) }}>Mars Green</div>
              <div className="font-mono font-medium tracking-[0.08em] text-[#031414]" style={{ fontSize: cq(16), marginTop: cq(10) }}>
                #008C8D&nbsp;&nbsp;RGB 0 140 141
              </div>
            </div>
            <div className="absolute" style={{ left: px(inset), bottom: py(inset), color: soft.ink }}>
              <SwatchLabel s={soft} />
            </div>
            <div className="absolute" style={{ left: px(sheet.x0 + inset), bottom: py(inset), color: accent.ink }}>
              <SwatchLabel s={accent} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function SwatchLabel({ s }: { s: Swatch }) {
  return (
    <>
      <div className="font-mono tracking-[0.08em]" style={{ fontSize: cq(15) }}>RGB {s.rgb}</div>
      <div className="font-bold leading-none tracking-[-0.02em]" style={{ fontSize: cq(34), marginTop: cq(6) }}>{s.name}</div>
      <div className="font-mono font-medium tracking-[0.08em]" style={{ fontSize: cq(16), marginTop: cq(8) }}>{s.hex}</div>
    </>
  )
}
