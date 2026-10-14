import "server-only"

import { slugify } from "@/lib/articles"
import { podcastLinks } from "@/lib/site"
import { attr, htmlParagraphs, items, tag } from "@/lib/xml"

export type Episode = {
  slug: string
  title: string
  /** Show notes as plain-text paragraphs. */
  notes: string[]
  /** ISO timestamp. */
  date: string
  /** Seconds. */
  duration: number
  audioUrl: string
  /** The episode on Spotify for Creators. */
  link: string
  image?: string
  season?: number
  episode?: number
}

/** The VR Lens RSS feed, hosted by Spotify for Creators (Anchor). */
const FEED_URL = podcastLinks.rss
/** New episodes show up within the hour (ISR). */
const REVALIDATE_SECONDS = 60 * 60

/** `HH:MM:SS`, `MM:SS` or plain seconds → seconds. */
function parseDuration(s: string) {
  return s
    .split(":")
    .map(Number)
    .reduce((total, part) => total * 60 + (part || 0), 0)
}

const optionalNumber = (s: string) => (s ? Number(s) || undefined : undefined)

export function parsePodcastFeed(xml: string): Episode[] {
  const show = attr(xml, "itunes:image", "href") || undefined
  const seen = new Set<string>()
  return items(xml, "item")
    .map((item) => {
      const title = tag(item, "title")
      const pubDate = tag(item, "pubDate")
      return {
        title,
        notes: htmlParagraphs(tag(item, "description")),
        date: Number.isNaN(Date.parse(pubDate))
          ? ""
          : new Date(pubDate).toISOString(),
        duration: parseDuration(tag(item, "itunes:duration")),
        audioUrl: attr(item, "enclosure", "url"),
        link: tag(item, "link"),
        image: attr(item, "itunes:image", "href") || show,
        season: optionalNumber(tag(item, "itunes:season")),
        episode: optionalNumber(tag(item, "itunes:episode")),
      }
    })
    .filter((e) => e.title && e.date && /^https:\/\//.test(e.audioUrl))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((e) => {
      // Titles can repeat; keep every slug unique and stable.
      let slug = slugify(e.title) || "episode"
      if (seen.has(slug)) slug = `${slug}-${e.date.slice(0, 10)}`
      seen.add(slug)
      return { ...e, slug }
    })
}

/** VR Lens episodes, newest first. Empty if the feed is unreachable. */
export async function getEpisodes(): Promise<Episode[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`Podcast feed responded with ${res.status}`)
    return parsePodcastFeed(await res.text())
  } catch (error) {
    console.error("Couldn't load VR Lens episodes", error)
    return []
  }
}

export async function getEpisode(slug: string) {
  return (await getEpisodes()).find((e) => e.slug === slug) ?? null
}

export const episodeHref = (e: Pick<Episode, "slug">) =>
  `/vrlens/episodes/${e.slug}`

/** `10:30` or `1:02:05`. */
export function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = String(seconds % 60).padStart(2, "0")
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`
}

/** ISO 8601 duration for JSON-LD, e.g. `PT10M30S`. */
export const isoDuration = (seconds: number) =>
  `PT${Math.floor(seconds / 60)}M${seconds % 60}S`
