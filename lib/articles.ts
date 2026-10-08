import type { FunctionReturnType } from "convex/server"

import type { api } from "@/convex/_generated/api"

export type ArticleSummary = FunctionReturnType<
  typeof api.articles.listPublishedArticles
>[number]

/** UploadVR imports link out; articles written in-house live on this site. */
export function isExternal(article: Pick<ArticleSummary, "source" | "link">) {
  return article.source !== "native" && !!article.link
}

export function articleHref(
  article: Pick<ArticleSummary, "_id" | "slug" | "source" | "link">
) {
  if (isExternal(article)) return article.link!
  return `/nextwavexr/articles/${article.slug ?? article._id}`
}

export function formatArticleDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

/** Slugs that would collide with real routes under /nextwavexr. */
/**
 * Fonts writers can apply to article text. `value` is stored on TipTap's
 * `textStyle` mark as `fontFamily`; the public renderer only honours these.
 */
export const articleFonts = [
  { label: "Default", value: "" },
  { label: "Serif", value: "var(--font-serif)" },
  { label: "Slab", value: "var(--font-slab)" },
  { label: "Mono", value: "var(--font-mono)" },
] as const

export const isArticleFont = (value: unknown): value is string =>
  typeof value === "string" &&
  value !== "" &&
  articleFonts.some((f) => f.value === value)

export const reservedSlugs = ["admin", "articles"]

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

type TextNode = { type?: string; text?: string; content?: TextNode[] }

/** Plain-text opening of a TipTap document, for meta descriptions. */
export function excerptFromContent(content: unknown, max = 160) {
  const doc = content as TextNode | null
  const text = (doc?.content ?? [])
    .filter((n) => n.type === "paragraph")
    .map(function collect(n: TextNode): string {
      return n.text ?? (n.content ?? []).map(collect).join("")
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
  if (text.length <= max) return text || undefined
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`
}
