import type { MetadataRoute } from "next"

import { getTopics, topicHref } from "@/components/articles/topic-page"
import { articleHref, isExternal } from "@/lib/articles"
import { getPublishedArticles } from "@/lib/convex-server"
import { episodeHref, getEpisodes } from "@/lib/podcast"
import { accountDeletionPages } from "@/lib/account-deletion"
import { privacyPolicies } from "@/lib/privacy-policies"
import { site } from "@/lib/site"

const routes = [
  "",
  "/media-projects",
  "/nextwavexr",
  "/vrlens",
  "/stormycsvr",
  "/development",
  "/advisory",
  "/about",
  "/press",
  "/contact",
  "/privacy",
  "/terms",
  "/privacy-policy",
  ...privacyPolicies.map((p) => `/privacy-policy/${p.slug}`),
  ...accountDeletionPages.map((p) => `/delete-account/${p.slug}`),
]

const legalRoutes = ["/privacy", "/terms", "/privacy-policy", "/delete-account"]

// Picks up newly published articles without a redeploy.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = (await getPublishedArticles()).filter((a) => !isExternal(a))
  const episodes = await getEpisodes()
  const topics = [
    ...(await getTopics("category")).values(),
    ...(await getTopics("tag")).values(),
  ]
  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      priority:
        route === ""
          ? 1
          : legalRoutes.some((r) => route.startsWith(r))
            ? 0.3
            : 0.7,
    })),
    ...articles.map((a) => ({
      url: `${site.url}${articleHref(a)}`,
      lastModified: new Date(a.updatedAt ?? a.date),
      priority: 0.6,
    })),
    ...episodes.map((e) => ({
      url: `${site.url}${episodeHref(e)}`,
      lastModified: new Date(e.date),
      priority: 0.6,
    })),
    ...topics.map((t) => ({
      url: `${site.url}${topicHref(t.kind, t.name)}`,
      lastModified: new Date(
        Math.max(...t.articles.map((a) => a.updatedAt ?? a.date))
      ),
      priority: t.kind === "category" ? 0.5 : 0.4,
    })),
  ]
}
