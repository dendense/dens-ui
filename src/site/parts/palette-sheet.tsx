import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The signature move: the Mars Green palette sheet from the references,
 * three blocks joined by concave curves on near-black. Live UI can sit on top
 * through the `slots` (positioned in % of the sheet).
 */
const TOP = "M0,56 Q0,0 56,0 H544 Q600,0 600,56 V300 Q600,372 528,372 H92 Q30,372 0,430 Z"
const LEFT = "M0,468 Q38,388 110,388 H236 Q292,388 292,444 V584 Q292,640 236,640 H56 Q0,640 0,584 Z"
const RIGHT = "M308,444 Q308,388 364,388 H520 Q590,388 600,330 V584 Q600,640 544,640 H364 Q308,640 308,584 Z"

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
  return (
    <div className={cn("cq", className)}>
    <div className="relative rounded-[clamp(20px,5cqw,40px)] bg-[#0c0b0b] p-[4.5cqw] shadow-raised ring-1 ring-white/5">
      <div className="relative aspect-[600/640]">
        <svg viewBox="0 0 600 640" className="absolute inset-0 size-full" aria-hidden>
          <path d={TOP} fill="#008C8D" />
          <path d={LEFT} fill={soft.hex} style={{ transition: "fill 400ms cubic-bezier(0.16,1,0.3,1)" }} />
          <path d={RIGHT} fill={accent.hex} style={{ transition: "fill 400ms cubic-bezier(0.16,1,0.3,1)" }} />
        </svg>

        {topSlot && <div className="absolute right-[5%] top-[6%] w-[54%]">{topSlot}</div>}

        {showLabels && (
          <>
            <div className="absolute left-[7%] top-[39%] text-[#fff2df]">
              <div className="text-[7.4cqw] font-bold leading-none tracking-[-0.03em]">Mars Green</div>
              <div className="mt-[1.6cqw] font-mono text-[2.5cqw] font-medium tracking-[0.08em] text-[#031414]">#008C8D&nbsp;&nbsp;RGB 0 140 141</div>
            </div>
            <div className="absolute bottom-[6%] left-[6%]" style={{ color: soft.ink }}>
              <div className="font-mono text-[2.3cqw] tracking-[0.08em]">RGB {soft.rgb}</div>
              <div className="mt-[0.8cqw] text-[5.2cqw] font-bold leading-none tracking-[-0.02em]">{soft.name}</div>
              <div className="mt-[1cqw] font-mono text-[2.5cqw] font-medium tracking-[0.08em]">{soft.hex}</div>
            </div>
            <div className="absolute bottom-[6%] left-[57%]" style={{ color: accent.ink }}>
              <div className="font-mono text-[2.3cqw] tracking-[0.08em]">RGB {accent.rgb}</div>
              <div className="mt-[0.8cqw] text-[5.2cqw] font-bold leading-none tracking-[-0.02em]">{accent.name}</div>
              <div className="mt-[1cqw] font-mono text-[2.5cqw] font-medium tracking-[0.08em]">{accent.hex}</div>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  )
}
