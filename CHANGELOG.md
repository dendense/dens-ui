# Changelog

## 0.2.0 · 2026-11-21

### Added
- **Chart** (`chart.tsx`): SVG charts with no chart library.
  - `CandlestickChart` for trading: OHLC candles (up hollow, down filled), volume, an optional moving average, a last-price line and a crosshair readout.
  - `AreaChart` (one or more series), `BarChart` (single or grouped), `DonutChart` with a centre total, `BarList` for ranked shares, `SegmentedBar` for one whole split into parts.
  - Keyboard readout (← →, Home, End, Escape) and a visually hidden data table on every chart.
- **Post Card** (`post-card.tsx`): image-led cards for blog posts in stacked, horizontal and overlay layouts, with tag, meta, title link over the whole card, excerpt and author row.
- **Divider** (`divider.tsx`): section breaks as a line, a fading line, a labelled rule, dots or the Mars Green mark, with 24 / 48 / 80px spacing.
- **Skeleton**: `SkeletonText`, `SkeletonImage` and `SkeletonPostCard`, plus a `shimmer` variant next to `pulse`.
- Theme: `--chart-up`, `--chart-down` and the `animate-shimmer` utility.
- Docs: a Desktop apps guide (Tauri, Electron, Wails, Dioxus / Leptos, native toolkits), Hero blocks on the home page, and a "Buy me a Coffee" dialog in the site header.

### Changed
- `--chart-1` … `--chart-5` are a new categorical set, checked for colour-blind separation in light and dark. If you used the old values for your own charts, the hues stay in the same family (teal, orange, blue) but series 4 and 5 are now olive and magenta.
- The docs group Table and Progress with Chart under a new "Data" section.

## 0.1.0

First release: 24 components, the Mars Green theme, five blocks and the shadcn registry.
