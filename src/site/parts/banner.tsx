import * as React from "react"
import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { CatDotsProps } from "./cat-dots"
import { CatStatic } from "./cat-static"

// three.js is loaded only when a live slot actually renders
const CatDots = React.lazy(() => import("./cat-dots"))

/**
 * Banner images for the Hero blocks.
 *
 * Real photos live in src/site/assets/local/, which is gitignored: the project's
 * reference images are third-party works and are never published. When a file
 * is missing (a fresh clone, CI, the public site), <BannerImage> fills the slot
 * with a dot-matrix cat instead: animated with three.js for large slots
 * ("live"), a static SVG for thumbnails ("static").
 */
const localImages = import.meta.glob<string>("../assets/local/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
})

export function localImage(name: string): string | undefined {
  const hit = Object.entries(localImages).find(([path]) => path.split("/").pop()?.split(".")[0] === name)
  return hit?.[1]
}

export function BannerImage({
  name,
  alt,
  className,
  position = "50% 50%",
  slotLabel,
  tone = "dark",
  labelAt = "bottom-right",
  placeholder = "static",
  cat,
}: {
  /** file name in src/site/assets/local without extension, e.g. "hero-photo" */
  name: string
  alt: string
  className?: string
  /** CSS object-position for the crop */
  position?: string
  /** caption shown in the empty slot, e.g. "Banner · 2400 × 1350" */
  slotLabel?: string
  tone?: "dark" | "light"
  /** keep the slot caption clear of anything laid over the image */
  labelAt?: "bottom-right" | "top-left"
  /** what fills the slot when the file is missing */
  placeholder?: "live" | "static"
  /** where and how big the cat sits in a live slot */
  cat?: Omit<CatDotsProps, "tone">
}) {
  const src = localImage(name)
  if (src) {
    return <img src={src} alt={alt} className={cn("size-full object-cover", className)} style={{ objectPosition: position }} />
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder for: ${alt}`}
      className={cn(
        "relative size-full overflow-hidden",
        tone === "dark"
          ? "bg-[radial-gradient(120%_90%_at_70%_20%,#1f6f6f_0%,#0f3a3a_42%,#0c0b0b_100%)] text-white/55"
          : "bg-[radial-gradient(120%_90%_at_70%_20%,#ffffff_0%,#e3efeb_45%,#c9dcd6_100%)] text-[#0a4a44]/60",
        className
      )}
    >
      {placeholder === "live" ? (
        <React.Suspense fallback={<CatStatic tone={tone} />}>
          <CatDots tone={tone} {...cat} />
        </React.Suspense>
      ) : (
        <CatStatic tone={tone} />
      )}
      {slotLabel && (
        <span className={cn("absolute flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em]", labelAt === "top-left" ? "left-4 top-4" : "bottom-4 right-4")}>
          <ImageIcon className="size-3.5" aria-hidden /> {slotLabel}
        </span>
      )}
    </div>
  )
}
