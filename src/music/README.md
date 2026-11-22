# dens.fm — music landing

A one-page landing that plays a public YouTube playlist on shuffle over a painted street corner. The sky follows the local clock, the traffic light cycles like a real one, and the playlist stays hidden until you ask for it.

It is a second Vite page next to the docs site: `music.html` → `src/music/main.tsx`. Every control is a Dens-UI component (`MusicPlayer`, `MusicPlaylist`, `Button`, `Input`).

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:5173/dens-ui/music.html`. `npm run build` builds it alongside the docs site (see `rollupOptions.input` in `vite.config.ts`).

## Files

| File | What it does |
| --- | --- |
| `landing.tsx` | The page: header, poem, video panel, 24h day bar, player, playlist panel |
| `scene.ts` | three.js effects over the painted plates (no React) |
| `sky-scene.tsx` | Mounts the scene into a canvas and passes it the hour, playback state and layout |
| `phases.ts` | Day phases, sky-plate weights by hour, signal names |
| `youtube-player.tsx` | YouTube IFrame engine that drives the Dens-UI player faces |
| `video-panel.tsx` | The always-visible slot the YouTube iframe plays in |
| `playlist-panel.tsx` | The hidden playlist: search, now playing, `MusicPlaylist` |
| `playlist.ts` / `playlist.json` | The track list (`[videoId, title, artist, seconds]` rows) |
| `music.css` | Page-only tokens (`--sky-*`), hatching for the day bar, type shadow |

## The illustration

The art is painted, not modelled. It lives in `public/media/music/`:

| File | Size | Use |
| --- | --- | --- |
| `sky-day.min.jpg`, `sky-dawn.min.jpg`, `sky-dusk.min.jpg`, `sky-night.min.jpg` | 2752 × 1536 | Sky plates, all edited from one master so the clouds line up |
| `pole-day.png`, `pole-night.png` | 1376 × 768, alpha | Signal pole cut out of a magenta ground, every lens painted dark |

They were generated with Seedream 5.0 Pro from the prompts in `references/music-landing-page/seedream-prompts.md` in the design workspace. Each file carries its origin in embedded metadata.

To replace a plate, keep the same framing and file name. If the pole art changes, re-measure the lens centres and the pole axis in `POLE` at the top of `scene.ts`. The lamp glows are placed from those numbers.

## What three.js does

`scene.ts` uses an orthographic camera in CSS pixels and only adds what a painting can't:

- **Sky**: cross-fades the four plates by hour (`skyWeights` in `phases.ts`), drifts the plate slowly, twinkles stars into the night plate's open sky, and darkens the top-left behind the type (`uScrim`).
- **Signal**: red 11s → green 10s → amber 3s (`CYCLE`). When playback starts, the light jumps to green (`showSignal`). LEDs snap on and fall off fast. The halo grows at night.
- **Pole**: mixes the day and night cutouts with a warm tint at dawn and dusk. Below the painting, the shader repeats the last row so the pole runs off the bottom edge.
- **Birds**: two or three small flocks crossing the upper sky, flapping in bursts. Hidden at night and under `prefers-reduced-motion`.
- **Dust**: sun-lit specks drifting up by day.

The plate for the current hour and the pole load first; the other plates follow. Under `prefers-reduced-motion` the sky, dust and birds hold still, and the signal keeps cycling because it carries meaning.

### Layout

- **Desktop**: the pole axis sits at 87% of the width and the housing is centred vertically, as in the reference.
- **Phones**: the page measures where the text column ends (`clearTop`) and sizes the pole to the gap above the player bar, so every sign stays visible.

## The playlist

The IFrame API only loads the first 200 videos of a playlist, so the page keeps its own copy of the list and shuffles it itself.

```bash
node scripts/fetch-playlist.mjs            # the default playlist
node scripts/fetch-playlist.mjs PLxxxxxxxx # another public playlist
```

This rewrites `playlist.json` from the public playlist page. Run it again after adding songs. Titles are split into artist and title by heuristics (`Artist - Title`, `Artist「Title」`, channel names), so a few rows may read oddly.

YouTube counts hidden (deleted or private) videos that it never lists, so the number of tracks here can be lower than the count YouTube shows.

## Playback

`YouTubePlayerProvider` puts a `MusicPlayerState` into `MusicPlayerContext`, so the stock `MusicPlayer` (`bar` on desktop, `mini` + `ink` on phones) and `MusicPlaylist` work unchanged.

- **Shuffle**: a shuffled order of the whole list, re-dealt after the last track. A track picked from the list plays next in that order.
- **Repeat**: all (default), one, off.
- **Unplayable videos**: embed errors 101 and 150 (the owner blocked embedding) skip to the next track after a moment.
- **Video panel**: YouTube's terms ask for a visible player of at least 200 × 200, so the iframe sits in the text column and never hides. Do not move it off-screen.

## Day bar

The bar from the reference, read as 24 hours: hatched night, light-hatched morning and evening, ruled daylight, and an orange line for "now". It is a range input underneath, so you can drag it or use the arrow keys to preview the sky at another hour. "Back to live" returns it to the clock.
