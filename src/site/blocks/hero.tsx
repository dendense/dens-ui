import { ArrowRightIcon, ArrowUpRightIcon, BookOpenIcon, CameraIcon, ClockIcon, SunIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Navbar, NavbarActions, NavbarBrand, NavbarLink, NavbarLinks, NavbarMenu } from "@/components/ui/navbar"
import { Mark } from "../parts/brand"
import { BannerImage } from "../parts/banner"

/*
 * Geometry used by both heroes
 *   container radius 40, inset 12  →  inner frames and the navbar pill: 40 − 12 = 28
 *   content sits 40 from the frame edge (the same inset the palette sheet uses)
 */

const links = ["Discover", "Stories", "Pricing"]

/* ------------------------------------------------------------------ */
/* Hero · Photo — full-bleed banner, glass navbar, story card, ink band */
/* ------------------------------------------------------------------ */

export function HeroPhoto({ className }: { className?: string }) {
  return (
    <section className={cn("@container overflow-hidden rounded-[40px] bg-[#0c0b0b] text-white", className)} aria-label="Hero, photo">
      <div className="relative flex min-h-[760px] flex-col @xl:min-h-[600px] @3xl:min-h-[640px]">
        <div className="absolute inset-0">
          <BannerImage name="hero-photo" alt="Two people crossing deep snow at dusk" position="15% 50%" slotLabel="Banner · 2000 × 1125" placeholder="live" cat={{ focusX: 0.5, focusY: 0.12, faceHeight: 0.6 }} />
          {/* scrim: keeps white type at ≥ 4.5:1 over any photo */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(12_11_11/0.45)_0%,rgb(12_11_11/0)_28%,rgb(12_11_11/0.15)_55%,rgb(12_11_11/0.82)_100%)]" />
        </div>

        <div className="relative p-3">
          <Navbar variant="glass">
            <NavbarBrand href="#/blocks/hero">
              <Mark className="size-7" />
              Lembar
            </NavbarBrand>
            <NavbarLinks>
              {links.map((l, i) => (
                <NavbarLink key={l} href="#/blocks/hero" active={i === 0}>
                  {l}
                </NavbarLink>
              ))}
            </NavbarLinks>
            <NavbarActions>
              <Button variant="ghost" className="hidden text-white hover:bg-white/10 sm:inline-flex">
                Sign in
              </Button>
              <Button className="bg-white text-[#0f1716] shadow-none hover:bg-white/90">Start a story</Button>
              <NavbarMenu>
                {links.map((l) => (
                  <DropdownMenuItem key={l}>{l}</DropdownMenuItem>
                ))}
                <DropdownMenuItem>Sign in</DropdownMenuItem>
              </NavbarMenu>
            </NavbarActions>
          </Navbar>
        </div>

        {/* story card, top right under the navbar */}
        <article className="absolute bottom-10 right-3 z-10 hidden w-[300px] rounded-[28px] bg-[rgb(12_11_11/0.38)] p-2 ring-1 ring-white/15 backdrop-blur-md @3xl:block">
          <div className="flex gap-3">
            <div className="h-[84px] w-[112px] shrink-0 overflow-hidden rounded-[20px]">
              <BannerImage name="thumb-1" alt="Two friends drawing at a desk by the window" position="50% 40%" />
            </div>
            <div className="flex min-w-0 flex-col justify-center py-1 pr-2">
              <span className="text-[12px] text-white/70">Now reading</span>
              <span className="truncate text-[15px] font-semibold leading-snug">Winter, slowly</span>
              <span className="text-[12px] text-white/70">24 photographs · 12 min</span>
            </div>
          </div>
        </article>

        <div className="relative mt-auto flex flex-col gap-6 p-10 @3xl:max-w-[62%]">
          <h2 className="text-[clamp(40px,7cqw,76px)] font-bold leading-[0.98] tracking-[-0.04em] text-balance">
            Stories that take their time.
          </h2>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-white/85">
            Publish photo essays with room to breathe: full-bleed images, quiet type, and no feed pulling readers away.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="bg-white text-[#0f1716] shadow-none hover:bg-white/90">
              Start a story <ArrowRightIcon />
            </Button>
            <Button size="lg" variant="ghost" className="text-white ring-1 ring-inset ring-white/35 hover:bg-white/10">
              Read the journal
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/80">
            <li className="flex items-center gap-2"><CameraIcon className="size-4" aria-hidden /> Photo essays</li>
            <li className="flex items-center gap-2"><BookOpenIcon className="size-4" aria-hidden /> Free to read</li>
            <li className="flex items-center gap-2"><ClockIcon className="size-4" aria-hidden /> No algorithmic feed</li>
          </ul>
        </div>
      </div>

      {/* ink band */}
      <div className="grid gap-6 border-t border-white/10 p-10 @3xl:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] @3xl:items-center @3xl:gap-10">
        <p className="text-[clamp(28px,4cqw,40px)] font-bold leading-[1.05] tracking-[-0.03em]">
          Less scrolling.
          <br />
          More looking.
        </p>
        <span className="hidden h-full w-px bg-white/15 @3xl:block" aria-hidden />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-white/75">
            Write, sequence your photographs and publish one link. Readers get the story, not a timeline.
          </p>
          <Button variant="ghost" className="text-white ring-1 ring-inset ring-white/30 hover:bg-white/10">
            How it works <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Hero · Split — headline beside a framed image with floating cards   */
/* ------------------------------------------------------------------ */

const sessions = ["Portraits", "Editorial", "Small weddings"]

export function HeroSplit({ className }: { className?: string }) {
  return (
    <section className={cn("@container rounded-[40px] bg-card p-3 text-card-foreground ring-1 ring-border/60", className)} aria-label="Hero, split">
      <Navbar className="bg-surface shadow-none ring-0">
        <NavbarBrand href="#/blocks/hero">
          <span className="grid size-7 place-content-center rounded-full bg-foreground text-background [&_svg]:size-4">
            <SunIcon />
          </span>
          Sela Studio
        </NavbarBrand>
        <NavbarLinks>
          {["Work", "Sessions", "Journal", "About"].map((l, i) => (
            <NavbarLink key={l} href="#/blocks/hero" active={i === 0}>
              {l}
            </NavbarLink>
          ))}
        </NavbarLinks>
        <NavbarActions>
          <Button variant="ink">
            Book a session <ArrowUpRightIcon />
          </Button>
          <NavbarMenu>
            {["Work", "Sessions", "Journal", "About"].map((l) => (
              <DropdownMenuItem key={l}>{l}</DropdownMenuItem>
            ))}
          </NavbarMenu>
        </NavbarActions>
      </Navbar>

      <div className="mt-3 grid gap-3 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col justify-between gap-10 p-7 @xl:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-[clamp(40px,6cqw,68px)] font-bold leading-[1] tracking-[-0.04em] text-balance">
              Portraits made in <span className="text-primary">available light.</span>
            </h2>
            <p className="max-w-[44ch] text-[17px] leading-relaxed text-muted-foreground">
              A small studio that photographs people where they already are, at the hour the light is kindest.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" variant="ink">
                See the work <ArrowRightIcon />
              </Button>
              <Button size="lg" variant="outline">
                How a session works
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-3 divide-x divide-border border-t border-border pt-6">
            {[
              ["9", "years behind the camera"],
              ["140+", "sessions so far"],
              ["3", "cities, by appointment"],
            ].map(([v, k]) => (
              <div key={k} className="px-4 first:pl-0">
                <dt className="sr-only">{k}</dt>
                <dd className="text-[28px] font-bold leading-none tracking-[-0.03em] tabular-nums">{v}</dd>
                <dd className="mt-2 text-[13px] leading-snug text-muted-foreground">{k}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* image frame: radius 28 = container 40 − inset 12 */}
        <div className="relative min-h-[460px] overflow-hidden rounded-[28px] @4xl:min-h-[560px]">
          <BannerImage name="hero-portrait" alt="Portrait of a woman looking up through pine branches against a blue sky" position="45% 45%" tone="light" slotLabel="Portrait · 1600 × 760 or taller" labelAt="top-left" placeholder="live" cat={{ focusX: -0.45, focusY: 0.2, faceHeight: 0.5, rows: 46 }} />

          {/* cards sit 12 inside the frame: radius 28 − 12 = 16; thumbnails 16 − 6 = 10 */}
          <div className="absolute bottom-3 right-3 flex w-[260px] flex-col gap-2">
            <div className="rounded-[16px] bg-card/92 p-4 text-card-foreground shadow-raised ring-1 ring-black/5 backdrop-blur-sm">
              <div className="text-[12px] text-muted-foreground">Approach</div>
              <p className="mt-1 text-[14px] font-semibold leading-snug">Natural light. No retouching beyond colour.</p>
            </div>
            <div className="flex items-center gap-3 bg-card/92 p-1.5 pr-3 text-card-foreground shadow-raised ring-1 ring-black/5 rounded-[16px] backdrop-blur-sm">
              <div className="size-14 shrink-0 overflow-hidden rounded-[10px]">
                <BannerImage name="portrait-thumb" alt="Close portrait in shade" position="50% 40%" tone="light" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] text-muted-foreground">Selected series</div>
                <div className="truncate text-[14px] font-semibold">Pine, late summer</div>
                <div className="text-[12px] text-muted-foreground">24 frames</div>
              </div>
              <Button size="icon-sm" variant="ink" aria-label="Open the series">
                <ArrowUpRightIcon />
              </Button>
            </div>
            <div className="bg-card/92 p-4 text-card-foreground shadow-raised ring-1 ring-black/5 rounded-[16px] backdrop-blur-sm">
              <div className="text-[12px] text-muted-foreground">Sessions</div>
              <ul className="mt-1.5 flex flex-col gap-1 text-[14px]">
                {sessions.map((s) => (
                  <li key={s} className="flex items-center justify-between">
                    {s} <ArrowRightIcon className="size-3.5 text-muted-foreground" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
