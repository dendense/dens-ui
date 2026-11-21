import { CoffeeIcon, QrCodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

/**
 * "Buy me a Coffee": a dialog with two QR codes.
 *
 * Drop the images into src/site/assets/donate/ as dana.(png|jpg|webp|svg) and
 * crypto.(png|jpg|webp|svg). They are published with the site. Until a file is
 * there, its tile shows an empty slot.
 *
 * Geometry: dialog radius 28, padding 12 → tiles 16; tile padding 12 → QR plate 4.
 */
const qrFiles = import.meta.glob<string>("../assets/donate/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
})

function qr(name: string) {
  return Object.entries(qrFiles).find(([p]) => p.split("/").pop()?.split(".")[0] === name)?.[1]
}

const methods = [
  { id: "dana", title: "Dana", note: "Scan with the DANA app." },
  { id: "crypto", title: "Crypto", note: "USDT. Check the network in your wallet before you send." },
]

export function BuyMeACoffee() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="soft" size="sm" className="max-sm:size-8 max-sm:px-0" aria-label="Buy me a Coffee">
          <CoffeeIcon />
          <span className="max-sm:sr-only">Buy me a Coffee</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[600px] gap-3 overflow-y-auto p-3">
        <DialogHeader className="px-3 pt-3">
          <DialogTitle>Buy me a Coffee</DialogTitle>
          <DialogDescription>Dens-UI is free and MIT licensed. If it saved you some time, a coffee keeps it going.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          {methods.map((m) => {
            const src = qr(m.id)
            return (
              <figure key={m.id} className="grid gap-3 rounded-[16px] bg-surface p-3 ring-1 ring-border/70">
                <div className="mx-auto aspect-square w-full max-w-[232px] overflow-hidden rounded-[4px] bg-white sm:max-w-none">
                  {src ? (
                    <img src={src} alt={`QR code: buy me a coffee with ${m.title}`} className="size-full object-contain p-3" />
                  ) : (
                    <div className="grid size-full place-content-center justify-items-center gap-2 text-[#566361]">
                      <QrCodeIcon className="size-8" aria-hidden />
                      <span className="text-[12px]">QR code coming soon</span>
                    </div>
                  )}
                </div>
                <figcaption className="grid gap-0.5 px-1 pb-1">
                  <span className="text-[15px] font-semibold">Buy me a Coffee with {m.title}</span>
                  <span className="text-[13px] leading-snug text-muted-foreground">{m.note}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
