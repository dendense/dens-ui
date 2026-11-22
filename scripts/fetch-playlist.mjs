#!/usr/bin/env node
/*
 * Writes src/music/playlist.json from a public YouTube playlist.
 *
 *   node scripts/fetch-playlist.mjs [playlistId]
 *   node scripts/fetch-playlist.mjs --html saved-page.html   (first 100 only, offline)
 *
 * The IFrame API only loads the first 200 videos of a playlist, so the page
 * shuffles its own list instead. Run this again after adding songs.
 * Reads the public playlist page and its "load more" continuations; no API key.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const args = process.argv.slice(2)
const htmlAt = args.indexOf("--html")
const HTML = htmlAt >= 0 ? args.splice(htmlAt, 2)[1] : null
const LIST = args[0] ?? "PLV6oQHOzWjQZTG_vwJ2kwAEY8OPDbU8C8"
const OUT = fileURLToPath(new URL("../src/music/playlist.json", import.meta.url))
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"

function walk(o, fn) {
  if (!o || typeof o !== "object") return
  fn(o)
  for (const k in o) walk(o[k], fn)
}

function seconds(text) {
  if (!text) return 0
  return text.split(":").reduce((s, p) => s * 60 + Number(p), 0) || 0
}

/* "Artist - Title", "Artist『Title』", or the channel as the artist */
function split(raw, channel) {
  const t = raw
    .replace(/^\s*[【\[][^】\]]*[】\]]\s*/, "") // leading 【歌詞動画】-style tags
    .replace(/\s+/g, " ")
    .trim()
  const clean = (s) =>
    s
      .replace(/\s*[(\[（【](official|music video|mv|lyric|lyrics|audio|video|full|ver\.?)[^)\]）】]*[)\]）】]/gi, "")
      .replace(/\s*(official (music )?video|music video|\bMV\b)\s*$/i, "")
      .trim()
  const artistFromChannel = channel
    .replace(/\s*-\s*Topic$/i, "")
    .replace(/[\s_]*official$/i, "")
    .replace(/\s*(official)?\s*(youtube)?\s*channel.*$/i, "")
    .replace(/\s*\((sony music|avex|universal|victor)[^)]*\)\s*$/i, "")
    .trim()
  const tidy = (x) => x.replace(/[\s\-–—:：]+$/, "").trim()
  const quote = t.match(/^(.+?)\s*[「『](.+?)[」』]/)
  if (quote) return { artist: tidy(quote[1]), title: clean(quote[2]) }
  const dash = t.match(/^(.+?)\s+[-–—/／]\s+(.+)$/) ?? t.match(/^([^／]+?)\s*／\s*(.+)$/)
  if (dash) {
    // "Title - Artist" when the channel names the right-hand side
    const ch = artistFromChannel.toLowerCase()
    const swap = ch && dash[2].toLowerCase().includes(ch) && !dash[1].toLowerCase().includes(ch)
    const [a, b] = swap ? [dash[2], dash[1]] : [dash[1], dash[2]]
    return { artist: tidy(a), title: clean(b) }
  }
  return { artist: artistFromChannel || channel, title: clean(t) || t }
}

function collect(json, seen, out) {
  let added = 0
  walk(json, (o) => {
    const l = o.lockupViewModel
    if (l?.contentId && !seen.has(l.contentId)) {
      const meta = l.metadata?.lockupMetadataViewModel
      const raw = meta?.title?.content ?? ""
      const channel = meta?.metadata?.contentMetadataViewModel?.metadataRows?.[0]?.metadataParts?.[0]?.text?.content ?? ""
      let length = ""
      walk(l.contentImage, (x) => {
        if (!length && x.thumbnailBadgeViewModel?.text && /^\d+(:\d+)+$/.test(x.thumbnailBadgeViewModel.text)) length = x.thumbnailBadgeViewModel.text
      })
      seen.add(l.contentId)
      out.push({ id: l.contentId, ...split(raw, channel), raw, channel, duration: seconds(length) })
      added++
    }
  })
  return added
}

function tokens(json) {
  const t = []
  walk(json, (o) => {
    if (o.continuationCommand?.token) t.push(o.continuationCommand.token)
  })
  return t
}

const page = HTML
  ? readFileSync(HTML, "utf8")
  : await fetch(`https://www.youtube.com/playlist?list=${LIST}&hl=en`, {
      headers: { "User-Agent": UA, "Accept-Language": "en" },
    }).then((r) => r.text())

const initial = JSON.parse(page.match(/var ytInitialData = (\{.*?\});<\/script>/s)[1])
const key = page.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1]
const clientVersion = page.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1]
let title = ""
walk(initial, (o) => {
  if (!title && o.pageHeaderViewModel?.title?.dynamicTextViewModel?.text?.content) title = o.pageHeaderViewModel.title.dynamicTextViewModel.text.content
})

const seen = new Set()
const tracks = []
collect(initial, seen, tracks)

const used = new Set()
let queue = HTML ? [] : tokens(initial)
while (queue.length) {
  const token = queue.shift()
  if (used.has(token)) continue
  used.add(token)
  const res = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${key}&prettyPrint=false`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": UA },
    body: JSON.stringify({ context: { client: { clientName: "WEB", clientVersion, hl: "en" } }, continuation: token }),
  }).then((r) => r.json())
  const added = collect(res, seen, tracks)
  if (added) queue = tokens(res).filter((t) => !used.has(t))
  process.stdout.write(`\r${tracks.length} tracks`)
}

const data = {
  id: LIST,
  title,
  fetched: new Date().toISOString().slice(0, 10),
  tracks: tracks.map(({ id, title, artist, duration }) => [id, title, artist, duration]),
}
writeFileSync(OUT, JSON.stringify(data))
console.log(`\nwrote ${tracks.length} tracks to ${OUT}`)
