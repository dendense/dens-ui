# Changelog

## Unreleased

### Changed
- **Chart**: `CandlestickChart` and `AreaChart` now draw through [TradingView Lightweight Charts™](https://github.com/tradingview/lightweight-charts) (Apache-2.0), themed from the Dens-UI tokens. Colours and font are re-read on every light/dark switch, the canvas resizes with its container and is freed on unmount. The candlestick chart pans and zooms by drag and pinch; the mouse wheel and vertical swipes keep scrolling the page. Readout, legend, keyboard navigation and the hidden data table work as before.
- `Candle.time` (and an AreaChart `index` value) may be an ISO day (`"2026-09-01"`) or unix seconds for a real time axis. Any other string is still drawn as a plain label.
- The `chart` registry item now lists `lightweight-charts` as a dependency. `BarChart`, `DonutChart`, `BarList` and `SegmentedBar` are unchanged and still need no library.

### Added
- `LineChart`: `AreaChart` without the fill.

## 0.2.0 · 2026-11-21

### Added
- **Chart** (`chart.tsx`): SVG charts with no chart library.
  - `CandlestickChart` for trading: OHLC candles (up hollow, down filled), volume, an optional moving average, a last-price line and a crosshair readout.
  - `AreaChart` (one or more series), `BarChart` (single or grouped), `DonutChart` with a centre total, `BarList` for ranked shares, `SegmentedBar` for one whole split into parts.
  - Keyboard readout (← →, Home, End, Escape) and a visually hidden data table on every chart.
- **Post Card** (`post-card.tsx`): image-led cards for blog posts in stacked, horizontal and overlay layouts, with tag, meta, title link over the whole card, excerpt and author row.
- **Divider** (`divider.tsx`): section breaks as a line, a fading line, a labelled rule, dots or the Mars Green mark, with 24 / 48 / 80px spacing.
- **Skeleton**: `SkeletonText`, `SkeletonImage` and `SkeletonPostCard`, plus a `shimmer` variant next to `pulse`.
- **Music Player** (`music-player.tsx`): one audio queue with a Now Playing card, a mini row, an app bottom bar and a playlist. Shuffle, repeat (off / all / one), volume, seek, Media Session support, and an `ink` tone.
- **Video Player** (`video-player.tsx`): Dens-UI controls over the native `<video>`: seek with buffer, volume, 0.5× to 2× speed, WebVTT captions, picture in picture, full screen, keyboard shortcuts and controls that fade during playback.
- **Slider** (`slider.tsx`): single value or range, plus a 4px media size with a buffer fill. Used by both players.
- Theme: `--chart-up`, `--chart-down` and the `animate-shimmer` and `animate-eq` utilities.
- Docs: a Desktop apps guide (Tauri, Electron, Wails, Dioxus / Leptos, native toolkits), Hero blocks on the home page, and a "Buy me a Coffee" dialog in the site header.

### Changed
- `--chart-1` … `--chart-5` are a new categorical set, checked for colour-blind separation in light and dark. If you used the old values for your own charts, the hues stay in the same family (teal, orange, blue) but series 4 and 5 are now olive and magenta.
- The docs group Table and Progress with Chart under a new "Data" section, and the players under "Media".

## 0.1.0

First release: 24 components, the Mars Green theme, five blocks and the shadcn registry.
