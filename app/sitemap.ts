import type { MetadataRoute } from "next"

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

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    priority:
      route === "" ? 1 : route.startsWith("/privacy-policy") ? 0.3 : 0.7,
  }))
}
