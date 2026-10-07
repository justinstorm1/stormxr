import type { MetadataRoute } from "next"

import { articleHref, isExternal } from "@/lib/articles"
import { getPublishedArticles } from "@/lib/convex-server"
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
  "/privacy-policy",
  ...privacyPolicies.map((p) => `/privacy-policy/${p.slug}`),
]

// Picks up newly published articles without a redeploy.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = (await getPublishedArticles()).filter((a) => !isExternal(a))
  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      priority:
        route === "" ? 1 : route.startsWith("/privacy-policy") ? 0.3 : 0.7,
    })),
    ...articles.map((a) => ({
      url: `${site.url}${articleHref(a)}`,
      lastModified: new Date(a.updatedAt ?? a.date),
      priority: 0.6,
    })),
  ]
}
