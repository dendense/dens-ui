---
name: Dens-UI
description: Copy-paste React components wearing the Mars Green palette sheet, in soft light and near-black dark.
colors:
  mars-green: "#008c8d"
  mars-green-text: "#00797a"
  mars-green-dark-text: "#19a3a4"
  hermes-orange: "#ff8a00"
  hermes-orange-dark: "#ff9a1f"
  orange-ink: "#1f1100"
  mint: "#c0ebd7"
  mint-ink: "#0a4a44"
  champagne: "#ebe3a5"
  klein-blue: "#0b3289"
  cartier-red: "#a42423"
  pomegranate: "#f74835"
  periwinkle: "#53589a"
  ink: "#0f1716"
  teal-gray-ground: "#edf0ef"
  surface: "#f5f7f6"
  rail: "#0f1716"
  night-rail: "#1b1f1e"
  panel-white: "#ffffff"
  muted-fill: "#e6ebe9"
  secondary-fill: "#e1e7e5"
  muted-ink: "#566361"
  hairline: "#dbe2df"
  field-stroke: "#cfd8d5"
  night-ground: "#0c0b0b"
  night-surface: "#121514"
  night-panel: "#161918"
  night-ink: "#ecf2f0"
  night-muted-ink: "#9aa8a5"
  night-hairline: "#262c2b"
typography:
  display:
    fontFamily: "Figtree Variable, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(56px, 9vw, 96px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Figtree Variable, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  section:
    fontFamily: "Figtree Variable, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Figtree Variable, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Figtree Variable, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Figtree Variable, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.7
  ui:
    fontFamily: "Figtree Variable, Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
  mono:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
  xl: "18px"
  panel: "22px"
  dialog: "28px"
  pill: "9999px"
spacing:
  card-inset: "20px"
  stack: "16px"
  gutter-mobile: "16px"
  gutter: "24px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.mars-green-text}"
    textColor: "{colors.panel-white}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
    typography: "{typography.ui}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.teal-gray-ground}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
  button-highlight:
    backgroundColor: "{colors.hermes-orange}"
    textColor: "{colors.orange-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.panel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "40px"
  button-ghost:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "40px"
  badge-highlight:
    backgroundColor: "{colors.hermes-orange}"
    textColor: "{colors.orange-ink}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  badge-soft:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.mint-ink}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  card:
    backgroundColor: "{colors.panel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "20px"
  card-brand:
    backgroundColor: "{colors.mars-green}"
    textColor: "{colors.panel-white}"
    rounded: "{rounded.panel}"
    padding: "20px"
  input:
    backgroundColor: "{colors.panel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "8px 14px"
    height: "40px"
  segmented-control:
    backgroundColor: "{colors.muted-fill}"
    textColor: "{colors.muted-ink}"
    rounded: "{rounded.pill}"
    padding: "4px"
    height: "40px"
  segmented-control-active:
    backgroundColor: "{colors.panel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
  switch:
    backgroundColor: "{colors.field-stroke}"
    rounded: "{rounded.pill}"
    width: "42px"
    height: "24px"
  switch-checked:
    backgroundColor: "{colors.mars-green-text}"
  tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.teal-gray-ground}"
    rounded: "{rounded.lg}"
    padding: "6px 10px"
---

# Design System: Dens-UI

## Overview

**Creative North Star: "The Palette Sheet"**

Dens-UI takes its identity from a printed color study: a large Mars Green block, a soft mint block and a Hermès orange block, cut with generous rounded corners and joined by concave curves on a near-black sheet. Everything else in the system is quieter so that sheet can speak. The ground is a soft gray tinted toward the green, panels are white with large radii and soft, low shadows, and text is a green-black ink rather than pure black. Dark mode moves to the sheet's own near-black and lifts the green to a brighter teal so it still reads.

The system is dense enough for dashboards and admin screens (40px controls, 20px card insets, 13 to 15px UI text) but never cramped: radii are big, pills are fully round, and the single orange accent appears only where something needs attention. It is a shadcn-compatible theme, so the token names are shadcn's; the character comes from the values and from a few signature forms, not from new APIs.

**Key Characteristics:**
- One brand green, one orange accent, one mint tint; the rest of the palette is supporting.
- Green-tinted neutrals in both themes; no pure gray, no pure black text.
- Big, soft geometry: 22px panels, 28px dialogs and frames, fully round buttons, badges and segmented controls.
- Two soft, negative-spread elevations (panel and raised); no hard shadows.
- Figtree for everything you read, JetBrains Mono for code, hex values, keyboard hints and data column labels.

## Colors

A cool teal-gray world carried by one saturated green, punctuated by one warm orange.

### Primary
- **Mars Green** (`mars-green`): the swatch color. Used as a fill on large brand surfaces (the palette sheet's top block, brand cards, the wordmark hyphen, status dots, focus rings). White text on it is for large or bold labels only.
- **Mars Green, text tone** (`mars-green-text`): the AA-safe working tone behind `--primary`. Primary buttons, links, checked switches and checkboxes, active sidebar items, the `$` prompt in install lines.
- **Mars Green, dark text tone** (`mars-green-dark-text`): `--primary` in dark mode; paired with a near-black foreground (#031414) instead of white.

### Secondary
- **Mint** (`mint`): soft fills and success. Soft buttons and badges, success states, the sheet's lower-left block. Always carries Mint Ink (`mint-ink`) text in light mode; in dark mode the roles invert to a deep green fill (#123f3a) with mint text.

### Tertiary
- **Hermès Orange** (`hermes-orange`, dark `hermes-orange-dark`): the one accent. Highlight badges ("Waiting on you"), highlight buttons and switches, the attention item. Text on it is Orange Ink (`orange-ink`), never white.

### Supporting (status and charts)
- **Champagne** (`champagne`): warning fills, with dark olive text (#4a3f00).
- **Klein Blue** (`klein-blue`): info fills.
- **Cartier Red** (`cartier-red`): destructive in light mode. Dark mode swaps to **Pomegranate** (`pomegranate`), which reads better on black.
- **Periwinkle** (`periwinkle`): a supporting sheet colour; not used in the UI tokens.
- **Chart series** (`--chart-1` … `--chart-5`): their own categorical set, re-stepped from the sheet hues so every adjacent pair stays apart for colour-blind readers. Light: teal #059488, orange #e16c10, blue #2d54bc, olive #a79300, magenta #c63895. Dark: #00a0a1, #de7515, #456ed1, #a5931b, #ca449a. Always in that order, never cycled.
- **Price direction** (`--chart-up` #009267 / dark #24ab7e, `--chart-down` #cc3430 / dark #e24942): candles and price changes only.

### Neutral
- **Teal-Gray Ground** (`teal-gray-ground`): the page background in light mode.
- **Surface** (`surface`): inset areas and alternating page bands, one step above the ground.
- **Panel White** (`panel-white`): cards, popovers, inputs, active nav items.
- **Ink** (`ink`): foreground text, ink buttons and tooltips.
- **Muted Ink** (`muted-ink`): secondary text, placeholder, inactive tabs.
- **Muted Fill / Secondary Fill** (`muted-fill`, `secondary-fill`): segmented-control track, inline code, secondary buttons.
- **Hairline** (`hairline`) and **Field Stroke** (`field-stroke`): borders and dividers; input outlines and unchecked switch tracks.
- **Night Ground / Night Surface / Night Panel** (`night-ground`, `night-surface`, `night-panel`): the dark-mode ground (the sheet's near-black), inset areas and cards. Popovers sit one step higher (#1b1f1e).
- **Night Ink / Night Muted Ink / Night Hairline**: dark-mode text, secondary text and borders.

### Named Rules
**The One Accent Rule.** Hermès Orange marks attention and nothing else: a badge, a highlighted action, the item waiting on the user. A screen with orange on more than one or two elements has lost its signal.

**The Two Greens Rule.** `--brand` (#008c8d) is the swatch for fills; `--primary` is the tone that carries or sits behind text. Never put small white text on the swatch, and never paint large brand blocks in the text tone.

**The Tinted Neutral Rule.** Every neutral leans toward the green. Do not introduce neutral grays or #000/#fff text.

## Typography

**Display Font:** Figtree Variable (with ui-sans-serif, system-ui)
**Body Font:** Figtree Variable
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, SFMono-Regular)

**Character:** A friendly geometric grotesk set bold and tight at large sizes, plain and open for reading; mono is reserved for things that are literally code or data.

### Hierarchy
- **Display** (700, clamp(56px, 9vw, 96px), 0.92, -0.04em): the wordmark title on the home page only.
- **Headline** (700, 36px to 44px, 1.05, -0.035em): page titles in the docs.
- **Section** (700, 34px, ~1.25, -0.035em): home-page section headings.
- **Title** (700, 22px, -0.02em): H2 inside docs pages.
- **Card Title** (600, 15px, -0.01em): card and panel headers.
- **Body** (400, 15.5px, 1.7, max 68ch): docs reading column. Leads run 17 to 19px with relaxed leading in Muted Ink.
- **UI** (600, 14px; 13px small, 15px large): buttons, tabs, nav.
- **Mono** (400 to 500, 13px): install commands, code blocks, hex values, version tag, Kbd.
- **Label** (500, 10.5 to 11px, 0.06 to 0.08em, uppercase, mono): table column headers and sidebar group labels only.

### Named Rules
**The Tight Display Rule.** Large Figtree is bold with negative tracking (-0.02em to -0.04em). Body text is never tracked.

**The Mono Is Data Rule.** Mono and uppercase-tracked mono appear only on code, values and data column labels. They are not used as decorative labels above headings.

## Layout

Content sits in a centered container up to 1400px wide, with 16px side gutters on phones and 24px from the small breakpoint up. The docs use a sticky 56-unit (224px) sidebar tree beside a reading column capped at 68ch; below the `lg` breakpoint the tree collapses behind a "Browse docs" outline button into an inset panel. The top bar is 64px, sticky, on a translucent ground with a backdrop blur.

The home page runs a two-column first viewport (text left, palette sheet right, 560 to 600px wide) that stacks to one column below `lg`. Sections are separated by 80px vertical padding and a hairline, with alternating bands on Surface. Inside components the rhythm is 4px-based: cards stack at 20px with 20px side insets, form rows at 16px, control groups at 8 to 12px. Blocks (dashboard, login, mobile) are framed in 28px-radius containers and use container queries to reflow inside their frame rather than at viewport breakpoints. The palette sheet scales with container-query units so its labels and live slot keep proportion at any width.

## Elevation & Depth

Depth is soft and mostly tonal: ground, Surface, then white panels, each with a hairline ring at reduced opacity. Two shadow tokens add lift, both with a tight contact shadow plus a large, negative-spread ambient one so edges stay crisp and nothing glows. Dark mode keeps the same two roles with heavier black alphas.

### Shadow Vocabulary
- **Panel** (`box-shadow: 0 1px 2px rgb(15 23 22 / 0.04), 0 10px 28px -14px rgb(15 23 22 / 0.14)`): resting cards, active nav items, the install line.
- **Raised** (`box-shadow: 0 2px 6px rgb(15 23 22 / 0.06), 0 18px 40px -16px rgb(15 23 22 / 0.24)`): menus, dialogs, the palette sheet, and the one item that needs attention.
- **Control** (small inset highlight plus 1px contact shadow): filled buttons carry a 1px inner white highlight; inputs carry a faint inset shadow; the active segment carries a short two-layer lift.

### Named Rules
**The Ring Plus Shadow Rule.** Panels are defined by a hairline ring and a soft shadow together, never by a heavy border or a hard offset shadow.

**The Raised Is Rare Rule.** Raised elevation is for overlays and the single attention item; a grid of raised cards flattens the hierarchy.

## Shapes

Everything is generously rounded from one base radius (14px). Fields and small containers use 14px, panels and cards 22px, dialogs, sidebars and block frames 28px, and buttons, badges, segmented controls, switches and swatch chips are fully round pills. The signature silhouette is the palette sheet: three blocks with large rounded outer corners and concave, inverted curves where they meet, set in a near-black frame with a 20 to 40px fluid radius. Lines are hairlines (1px) at reduced opacity; the only heavy stroke is the 2px underline on line tabs.

### Named Rules
**The Concave Join Rule.** When brand blocks meet, they meet with a concave curve, not a straight gutter. This join is the system's mark; use it on home, theming and brand surfaces, not on every card.

## Components

### Buttons
Tactile, fully round pills with a confident weight.
- **Shape:** pill (9999px); heights 32px (sm), 40px (default), 48px (lg); icon buttons are square at the same heights.
- **Primary:** Mars Green text tone with white label, 20px side padding, 1px inner highlight and a 1px contact shadow.
- **Ink:** Ink fill with ground-colored label; the neutral strong action.
- **Highlight / Soft / Secondary / Destructive:** orange with Orange Ink, mint with Mint Ink, secondary fill, Cartier red.
- **Outline:** white panel, Field Stroke border, faint contact shadow. **Ghost:** text only.
- **Hover / Focus / Active:** fills drop to 90% (soft to 75%); outline and ghost gain the accent tint. Focus is a 2px ring in Mars Green with a 2px offset. Pressing nudges the button down 1px. Transitions are 150ms ease-out.

### Chips / Badges
- **Style:** pill, 12px semibold, tabular numerals, 2px by 10px padding. Variants map one-to-one to the color roles (primary, highlight, soft, secondary, outline, success, warning, info, destructive).
- **Status Dot:** a 6px round dot in brand, highlight, destructive or muted, used inside badges and labels.

### Cards / Containers
- **Corner Style:** 22px.
- **Background:** white (default), Surface (inset), Mars Green swatch (brand) or Ink (ink).
- **Shadow Strategy:** Panel elevation plus a hairline ring at 60% on the default card; inset cards have the ring only.
- **Internal Padding:** 20px all round, 20px gap between header, content and footer.

### Inputs / Fields
- **Style:** 40px tall, 14px radius, white fill, Field Stroke border, faint inset shadow, 14px side padding.
- **Focus:** border turns Mars Green with a 3px ring at 20% opacity.
- **Error / Disabled:** destructive border with a 3px ring at 15%; disabled drops to 50% opacity. An input group places a 16px leading icon and an optional trailing Kbd hint.

### Navigation
- **Top bar:** wordmark, then pill links in Muted Ink; the current page becomes a white pill with Panel elevation. Ghost icon buttons for theme and GitHub.
- **Docs tree:** group headings in 13px semibold Ink; items are 14px Muted Ink in a 14px-radius row, hover tints to a translucent panel, current item becomes a white panel row in semibold with Panel elevation.
- **App sidebar (component):** a 28px-radius column on the sidebar tint with a hairline ring; collapses to icons with a short divider in place of each group label.
- **Folders:** a folder row with a chevron that rotates 90° on open; nested items are 32px, 13px text, hung off a 1px guide line in Sidebar Border. The folder's count hides while it is open.
- **Icon rail:** a 56px ink column (`--rail`, 22px radius, Raised elevation) of 40px icon buttons at 55% Rail Foreground. The active button gets a 15% tint and a 4 by 16px Hermès Orange tab on its left edge; an area needing attention gets a 6px orange dot. Every rail button carries an accessible label.
- **24h meter:** a 56px pill on the sidebar tint with a mono "24H" label, the total, and one 2px tick per hour, its width proportional to that hour's count, newest at the bottom in Hermès Orange.

### Segmented Control and Tabs
- **Pill:** a 40px Muted Fill track with a 4px inset and hairline ring; the active segment is a white pill with a short two-layer lift.
- **Line:** a hairline baseline with a 2px Ink underline on the active tab, optional tabular counts beside labels.

### Switch
A 42 by 24px pill track (Field Stroke when off) with an 18px white thumb that slides 18px on the expo ease-out over 200ms. Checked tone is primary by default, or highlight or ink.

### Palette Sheet (signature)
The Mars Green block, a soft block and an accent block joined by concave curves on the near-black frame, labelled in bold Figtree names with mono hex and RGB values. It accepts live UI in a slot on the green block. Five pairings come from the reference sheets (Mint with Hermès Orange is the theme's own; Powder with Periwinkle, Champagne with Cartier Red, Lake Blue with Klein Blue, Skin with Pomegranate are supporting), and the fills cross-fade over 400ms on the expo ease-out.

### Dot-matrix chart (dashboard block)
Run counts per hour are stacked dots, one dot per three runs: done hours in Ink at 80%, hours after a slowdown in Hermès Orange, scheduled hours as hollow Muted Ink rings. A 1.5px Ink line marks "now" and an orange line marks the onset of the slowdown, each with a mono pill label.

### Geometry (curves, gaps and nested corners)
- **Palette sheet:** every curve is a circular arc. Facing arcs across a gap are concentric, and their radii differ by exactly the gap `g`, so the gap is constant through every bend (16 units on the 600 × 640 sheet, 2 on the 24 × 24 mark). The formulas are in `src/site/parts/sheet-geometry.ts`; `node scripts/check-sheet-geometry.ts` measures the gap along every facing edge (16.00 … 16.00).
- **Frame:** margin `P = 2g`, frame radius `R + P` (56 + 32 = 88), concentric with the blocks.
- **Inset content:** labels and slotted UI sit 40 units inside a block; slotted UI takes radius `R − 40` (16).
- **Nested corners:** where an element hugs its container's corner, outer radius = inner radius + padding. Examples: Sidebar 28 = item 18 + 10; rail 22 = item 14 + 8; dialog close button 16 + inset 12 = 28; select and menu 18 = item 14 + 4; Kbd in an input 6 + 8 = 14; dashboard main 34 = card 22 + 12 and frame 46 = 34 + 12.
- **Charts on buckets:** dot columns sit at bucket centres, x = (h + ½)·col. Time markers sit on bucket boundaries, x = h·col, the middle of the gutter, so a full-height line never touches a dot. Axis labels sit under column centres.

### Navbar and Footer
- **Navbar:** a 56px pill with 8px inner padding, so 40px actions keep the corners concentric (28 = 20 + 8). It comes in three variants:
  - **Solid:** a white panel.
  - **Glass:** translucent ink with blur, used only over photos and always with a scrim beneath.
  - **Ink:** the rail colour.
  
  Active links get a 16 × 2 bar under the label. Below md, the links collapse into a menu.
- **Footer:** a panel or near-black ink at 40px radius, with link columns titled in 13px semibold.
  - **Sheet footer:** ends in a 1200 × 300 palette-sheet strip built from the same arc geometry (gap 16, R 48, rTail 48, which must stay ≤ H − R − yb).

### Hero blocks
- **Container and inset:** the container is 40 radius with a 12 inset, so inner frames and the navbar are 28. Copy sits 40 from the frame edge.
- **Photo hero:** full-bleed image with a scrim that keeps white type above 4.5:1, plus an ink band.
- **Split hero:** headline with one Mars Green phrase beside a framed image. The floating cards are 16 radius (28 − 12), with 10-radius thumbnails (16 − 6).

### Empty image slots: the dot-matrix cat
When a banner file is missing, the slot shows a dot matrix in which a cat face assembles.
- **Live (three.js):** dots fly in over 2.4 s, timed in seconds rather than frames. The background ripples while the face holds still. The eyes are Hermès orange and blink for 180 ms every 3–6 s, and the view orbits up to ±4° with the pointer.
- **Frame rate and motion:** the animation pauses offscreen and in hidden tabs, and renders a single frame under reduced motion.
- **Thumbnails:** use the same cat as a static SVG.
- **Narrow slots** (aspect < 1.1): the cat moves to a band at the top, with ear tips at y = 0.80 and the lowest whisker at 0.41, so it never sits behind the copy.

### Charts
One file (`chart.tsx`). Time series (CandlestickChart, AreaChart, LineChart) draw on canvas through TradingView Lightweight Charts™ (Apache-2.0); BarChart, DonutChart, BarList and SegmentedBar stay SVG/HTML with no library. The canvas takes every colour and the font from the tokens at runtime and re-reads them on each light/dark switch; its background is transparent so patterned surfaces show through, and the TradingView attribution logo stays on as the licence asks. Lines are 2px with round joins; columns are at most 24px wide with a 4px rounded data end and a square baseline; touching marks keep a 2px surface gap; end markers are 12px with a 2px surface ring; area fills are the series hue at 10% down to a zero baseline. Gridlines are horizontal only, 1px `border`; axes are 11px `muted-foreground`; the crosshair is 1px `muted-foreground` at 55% with `foreground` axis labels, and no text ever wears a series colour. Line charts get one tooltip listing every series (value first, name second, a short line key); bars and donut slices are their own hit targets. Every plot is focusable and reads with the arrow keys, and renders a visually hidden data table. Candles follow the trading convention: price axis on the right, up candles hollow and down candles filled (shape, not only colour, carries direction), a last-price line with its value on the axis in the direction colour, volume at 30% in the bottom fifth, drag and pinch to pan and zoom while the wheel and vertical swipes still scroll the page.

### Post Card
An image-led card in three layouts: stacked (image on top), horizontal (image beside the text from `sm`) and overlay (text on the image over a near-black scrim that reaches 60% by 40% of the height). Card radius 22 = image radius 14 + padding 8. The title link stretches over the whole card; tags sit above it and stay clickable. Category tags are mint pills; the meta line separates items with a 3px dot.

### Skeletons
Loading placeholders keep the final shape: `SkeletonText` ends on a 60% line, `SkeletonImage` takes the final aspect ratio and a faint image glyph, `SkeletonPostCard` copies PostCard's geometry. Two animations: pulse for text and blocks, shimmer (a soft band sweeping over 1.6s) for images. Both stop under reduced motion.

### Divider
The break between page sections, as opposed to Separator inside a component. Four forms: a hairline, a hairline fading at both ends, three 4px dots, and the mark (a 40 × 4 Mars Green pill). Line and fade take an optional label at the start, centre or end. Spacing steps are 24, 48 and 80px.

### Media players
`MusicPlayer` has three faces over one `<audio>` element: the card (cover on top, scrubber, shuffle / previous / play / next / repeat), the mini row and the app bottom bar (track, transport over a scrubber with times, volume). The ink tone is the dark Now Playing surface `#0c0b0b` with a white play disc; the default tone is a panel with a Mars Green play disc. Card radius 28 = cover 16 + padding 12. The playlist marks the playing row with a mint wash and three moving 3px bars that stand still under reduced motion. `VideoPlayer` lays its controls over the picture on a near-black scrim: a white 4px scrubber with a buffer fill, the speed menu inside the frame (so it works in full screen) and an orange `#ffb14a` cue for "captions on". Controls fade after 2.5s of playback and return on pointer movement, focus or a tap. Both use `Slider`, whose media size is a 4px track with a thumb that appears on hover or focus. Times are tabular. Another playback engine (a YouTube or streaming SDK) drives the same faces by putting a `MusicPlayerState` into `MusicPlayerContext.Provider` instead of using `MusicPlayerProvider`; `MusicPlaylist` takes a `filter` that hides rows (a search box) without changing the queue's indexes, and cover images load lazily.

### Motion
Overlays pop in over 180ms (4px rise, 0.97 scale) on `cubic-bezier(0.16, 1, 0.3, 1)` and leave over 120ms ease-in. With reduced motion every animation and transition collapses to 1ms.

## Do's and Don'ts

### Do:
- **Do** keep Hermès Orange to one or two attention elements per screen, always with Orange Ink text.
- **Do** use `--primary` (#00797a light, #19a3a4 dark) for anything that carries or sits behind small text, and the #008c8d swatch for large brand fills.
- **Do** pair every panel with a hairline ring and the Panel shadow; reserve Raised for overlays and the single attention item.
- **Do** use pills for every button, badge, segmented control and switch, 22px for panels, 28px for dialogs and frames.
- **Do** show a 2px Mars Green focus ring with a 2px offset on every interactive element.
- **Do** keep shadcn token names so third-party shadcn components inherit the theme.

### Don't:
- **Don't** use hard offset or high-contrast drop shadows; elevation here is soft and negative-spread.
- **Don't** introduce pure gray neutrals or pure black text; stay on the green-tinted scale.
- **Don't** put small white text on the #008c8d swatch.
- **Don't** use uppercase tracked mono as a label above headings; it belongs to table headers and sidebar groups.
- **Don't** add a second accent hue to compete with the orange; the supporting palette is for status and charts.
