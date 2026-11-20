import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { StatusDot } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Footer, FooterBottom, FooterBrand, FooterColumn, FooterColumns, FooterLink, FooterTop } from "@/components/ui/footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mark } from "../parts/brand"
import { sheetGeometry, type SheetParams } from "../parts/sheet-geometry"

/*
 * A wide palette sheet for the footer, from the same arc geometry as the hero sheet.
 * 1200 × 300, gap 16, block radius 48. The tail arc fits because
 * rTail ≤ H − R − yb  →  48 ≤ 300 − 48 − 204.
 */
const STRIP: SheetParams = { W: 1200, H: 300, g: 16, R: 48, split: 196, col: 760, rTail: 48, rShoulder: 56, rInner: 40 }
const strip = sheetGeometry(STRIP)
const sx = (u: number) => `${(u / STRIP.W) * 100}%`
const sy = (u: number) => `${(u / STRIP.H) * 100}%`
const cq = (u: number) => `${(u / STRIP.W) * 100}cqw`
const INSET = 32

const columns: [string, string[]][] = [
  ["Product", ["Overview", "Workflows", "Approvals", "Integrations", "Changelog"]],
  ["Resources", ["Documentation", "API reference", "Templates", "Status"]],
  ["Company", ["About", "Careers", "Contact"]],
  ["Legal", ["Privacy", "Terms", "Security"]],
]

/* ------------------------------------------------------------------ */
/* Footer · Sheet — ink footer with newsletter, columns and the strip  */
/* ------------------------------------------------------------------ */

export function FooterSheet({ className }: { className?: string }) {
  return (
    <Footer variant="ink" className={cn("@container", className)}>
      <FooterTop>
        <FooterBrand>
          <a href="#/blocks/footer" className="flex items-center gap-2.5 text-[17px] font-bold tracking-[-0.02em]">
            <Mark className="size-8" /> Lumbung
          </a>
          <p className="text-[15px] leading-relaxed text-[#ecf2f0]/70">Every workflow, one calm console. Approvals, runs and alerts for the whole ops team.</p>
          <form className="flex flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
            <Label htmlFor="footer-email" className="text-[13px] text-[#ecf2f0]">
              Release notes, once a month
            </Label>
            {/* input and button share one 48px pill: button 40 + inset 4 on each side → radius 24 = 20 + 4 */}
            <div className="flex h-12 items-center gap-1 rounded-full bg-white/6 p-1 pl-4 ring-1 ring-white/15 focus-within:ring-2 focus-within:ring-[#19a3a4]">
              <Input
                id="footer-email"
                type="email"
                placeholder="you@company.com"
                autoComplete="off"
                className="h-10 flex-1 border-0 bg-transparent px-0 text-[#ecf2f0] shadow-none placeholder:text-[#ecf2f0]/45 focus-visible:ring-0"
              />
              <Button type="submit" className="bg-[#19a3a4] text-[#031414] hover:bg-[#19a3a4]/90">
                Subscribe <ArrowRightIcon />
              </Button>
            </div>
          </form>
        </FooterBrand>
        <FooterColumns>
          {columns.map(([title, items]) => (
            <FooterColumn key={title} title={title}>
              {items.map((i) => (
                <FooterLink key={i} href="#/blocks/footer">
                  {i}
                </FooterLink>
              ))}
            </FooterColumn>
          ))}
        </FooterColumns>
      </FooterTop>

      {/* the strip: wordmark on Mars Green, place on mint, socials on orange */}
      <div className="cq relative hidden @2xl:block" style={{ aspectRatio: `${STRIP.W} / ${STRIP.H}` }}>
        <svg viewBox={`0 0 ${STRIP.W} ${STRIP.H}`} className="absolute inset-0 size-full" aria-hidden>
          <path d={strip.top} fill="#008C8D" />
          <path d={strip.left} fill="#C0EBD7" />
          <path d={strip.right} fill="#FF8A00" />
        </svg>
        <span
          className="absolute font-bold leading-[0.8] tracking-[-0.05em] text-[#fff2df]"
          style={{ left: sx(INSET), bottom: sy(STRIP.H - strip.yt + INSET * 0.75), fontSize: cq(150) }}
          aria-hidden
        >
          Lumbung
        </span>
        <span className="absolute font-semibold text-[#00585a]" style={{ left: sx(INSET), bottom: sy(INSET), fontSize: cq(22) }}>
          Made in Jakarta · since 2026
        </span>
        <span className="absolute flex gap-[3cqw] font-semibold text-[#1f1100]" style={{ left: sx(strip.x0 + INSET), bottom: sy(INSET), fontSize: cq(22) }}>
          <a href="#/blocks/footer" className="hover:underline">GitHub</a>
          <a href="#/blocks/footer" className="hover:underline">LinkedIn</a>
          <a href="#/blocks/footer" className="hover:underline">Instagram</a>
        </span>
      </div>
      <p className="-mt-4 text-[44px] font-bold leading-none tracking-[-0.045em] text-[#fff2df] @2xl:hidden" aria-hidden>
        Lumbung
      </p>

      <FooterBottom>
        <span>© 2026 Lumbung · demo workspace</span>
        <span className="flex items-center gap-2">
          <StatusDot /> All systems normal
        </span>
      </FooterBottom>
    </Footer>
  )
}

/* ------------------------------------------------------------------ */
/* Footer · Simple — one row of links for docs and app pages           */
/* ------------------------------------------------------------------ */

export function FooterSimple({ className }: { className?: string }) {
  return (
    <Footer className={cn("gap-8 rounded-[28px] p-6 sm:p-8", className)}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <a href="#/blocks/footer" className="flex items-center gap-2.5 text-[15px] font-bold tracking-[-0.02em]">
          <Mark className="size-7" /> Dens-UI
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["Docs", "Components", "Blocks", "Theming", "GitHub"].map((l) => (
              <FooterLink key={l} href="#/blocks/footer">
                {l}
              </FooterLink>
            ))}
          </ul>
        </nav>
      </div>
      <FooterBottom>
        <span>© 2026 Denslab · MIT licensed</span>
        <span>Made with Mars Green #008C8D</span>
      </FooterBottom>
    </Footer>
  )
}
