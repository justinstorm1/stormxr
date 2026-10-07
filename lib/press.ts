import "server-only"

import { press as fallbackPress } from "@/lib/site"

export type PressRelease = {
  /** `YYYY-MM-DD` in US Eastern time, as PRLog displays it. */
  date: string
  title: string
  summary: string
  href: string
}

const FEED_URL = "https://pressroom.prlog.org/StormXR/rss.xml"
/** Re-scrape PRLog at most every 6 hours (ISR). */
const REVALIDATE_SECONDS = 6 * 60 * 60

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16))
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim()
}

const tag = (xml: string, name: string) =>
  decode(xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? "")

const easternDate = (pubDate: string) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(pubDate))

export function parsePressFeed(xml: string): PressRelease[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => ({
      title: tag(item, "title"),
      href: tag(item, "link"),
      summary: tag(item, "description"),
      pubDate: tag(item, "pubDate"),
    }))
    .filter(
      (r) =>
        r.title &&
        /^https:\/\/www\.prlog\.org\//.test(r.href) &&
        !Number.isNaN(Date.parse(r.pubDate))
    )
    .map(({ pubDate, ...r }) => ({ ...r, date: easternDate(pubDate) }))
    .sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * StormXR press releases scraped from the PRLog press room feed, newest
 * first. Falls back to the hard-coded list if PRLog is unreachable.
 */
export async function getPressReleases(): Promise<PressRelease[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; StormXR site)" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`PRLog responded with ${res.status}`)
    const releases = parsePressFeed(await res.text())
    return releases.length > 0 ? releases : fallbackPress
  } catch (error) {
    console.error("Falling back to static press releases", error)
    return fallbackPress
  }
}
