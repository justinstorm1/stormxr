import "server-only"

import { fetchQuery } from "convex/nextjs"
import { unstable_cache } from "next/cache"

import { api } from "@/convex/_generated/api"
import type { ArticleSummary } from "@/lib/articles"

const REVALIDATE_SECONDS = 60

const cachedPublishedArticles = unstable_cache(
  async () => {
    const articles = await fetchQuery(api.articles.listPublishedArticles, {})
    return articles.filter((article) => article.published === true)
  },
  ["published-articles"],
  { revalidate: REVALIDATE_SECONDS, tags: ["articles"] }
)

const cachedPublishedArticle = unstable_cache(
  async (idOrSlug: string) => {
    const article = await fetchQuery(api.articles.getPublishedArticle, {
      idOrSlug,
    })

    return article?.published === true ? article : null
  },
  ["published-article"],
  { revalidate: REVALIDATE_SECONDS, tags: ["articles"] }
)

/**
 * Published articles for server-rendered pages.
 * Only articles with published === true are returned.
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