import "server-only"

import { youtubeChannelId } from "@/lib/site"
import { attr, items, tag } from "@/lib/xml"

export type Video = {
  id: string
  title: string
  href: string
  /** ISO timestamp. */
  published: string
  thumbnail: string
  short: boolean
}

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannelId}`
const REVALIDATE_SECONDS = 60 * 60

export function parseYouTubeFeed(xml: string): Video[] {
  return items(xml, "entry")
    .map((entry) => {
      const id = tag(entry, "yt:videoId")
      const href = attr(entry, "link", "href")
      return {
        id,
        title: tag(entry, "title"),
        href,
        published: tag(entry, "published"),
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        short: href.includes("/shorts/"),
      }
    })
    .filter((v) => /^[\w-]{11}$/.test(v.id) && v.title)
}

/**
 * Latest StormyCs VR uploads, newest first.
 *
 * YouTube's feed regularly fails for hours at a time (404s and 500s). When it
 * does, this throws on a background revalidation so Next keeps serving the
 * last page that had videos instead of caching one without them. During a
 * build or in dev there's no earlier page to fall back on, so it returns an
 * empty list and the page renders without the videos section.
 */
export async function getLatestVideos(limit = 6): Promise<Video[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`YouTube feed responded with ${res.status}`)
    const videos = parseYouTubeFeed(await res.text())
    if (videos.length === 0) throw new Error("YouTube feed had no videos")
    return videos.slice(0, limit)
  } catch (error) {
    const building = process.env.NEXT_PHASE === "phase-production-build"
    if (process.env.NODE_ENV === "production" && !building) throw error
    console.error("Couldn't load StormyCs VR videos", error)
    return []
  }
}
