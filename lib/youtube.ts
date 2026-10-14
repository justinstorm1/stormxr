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

/** Latest StormyCs VR uploads, newest first. Empty if YouTube is unreachable. */
export async function getLatestVideos(limit = 6): Promise<Video[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`YouTube feed responded with ${res.status}`)
    return parseYouTubeFeed(await res.text()).slice(0, limit)
  } catch (error) {
    console.error("Couldn't load StormyCs VR videos", error)
    return []
  }
}
