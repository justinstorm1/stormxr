import type { Metadata } from "next"

import { FEED_PATH } from "@/lib/articles"
import { site } from "@/lib/site"

/**
 * Advertises the NextWave XR RSS feed. `alternates` is replaced, not merged,
 * by any page that sets a canonical URL, so those pages spread this back in.
 */
export const feedAlternates = {
  types: {
    "application/rss+xml": [{ url: FEED_PATH, title: "NextWave XR" }],
  },
} satisfies Metadata["alternates"]

/**
 * Open Graph fields shared by every page. Next merges metadata shallowly, so
 * any page that sets `openGraph` must spread these back in.
 */
export const baseOpenGraph = {
  type: "website",
  siteName: site.name,
  locale: "en_US",
} satisfies Metadata["openGraph"]

/**
 * Title, description, canonical URL, and Open Graph tags for a page. The
 * share image comes from the route's `opengraph-image` file.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string
  description: string
  /** Site-relative path, e.g. `/about`. */
  path: string
  /** Skip the `| StormXR` title template. */
  absoluteTitle?: boolean
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { ...feedAlternates, canonical: path },
    openGraph: { ...baseOpenGraph, title, description, url: path },
    twitter: { title, description },
  }
}
