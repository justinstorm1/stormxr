import "server-only"

import { fetchQuery } from "convex/nextjs"
import { unstable_cache } from "next/cache"

import { api } from "@/convex/_generated/api"
import type { ArticleSummary } from "@/lib/articles"

// Convex's fetchQuery opts out of Next's fetch cache, so cache the results
// explicitly. Pages stay statically rendered and refresh every minute.
const REVALIDATE_SECONDS = 60

const cachedPublishedArticles = unstable_cache(
  () => fetchQuery(api.articles.listPublishedArticles, {}),
  ["published-articles"],
  { revalidate: REVALIDATE_SECONDS, tags: ["articles"] }
)

const cachedPublishedArticle = unstable_cache(
  (idOrSlug: string) =>
    fetchQuery(api.articles.getPublishedArticle, { idOrSlug }),
  ["published-article"],
  { revalidate: REVALIDATE_SECONDS, tags: ["articles"] }
)

/**
 * Published articles for server-rendered pages. Never throws: if Convex is
 * unreachable the page renders without articles and ISR retries later.
 */
export async function getPublishedArticles(): Promise<ArticleSummary[]> {
  try {
    return await cachedPublishedArticles()
  } catch (error) {
    console.error("Failed to load articles from Convex", error)
    return []
  }
}

export async function getPublishedArticle(idOrSlug: string) {
  try {
    return await cachedPublishedArticle(idOrSlug)
  } catch (error) {
    console.error(`Failed to load article "${idOrSlug}" from Convex`, error)
    return null
  }
}
