import type { Metadata } from "next"

import { site } from "@/lib/site"

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
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title, description, url: path },
    twitter: { title, description },
  }
}
