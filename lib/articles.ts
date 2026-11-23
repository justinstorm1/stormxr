import type { FunctionReturnType } from "convex/server"

import type { api } from "@/convex/_generated/api"

export type ArticleSummary = FunctionReturnType<
  typeof api.articles.listPublishedArticles
>[number]

/** Imported (UploadVR / Substack) articles link out; written ones live here. */
export function isExternal(article: Pick<ArticleSummary, "source" | "link">) {
  return article.source !== "native" && !!article.link
}

/**
 * Which importer handles a link. Substack posts on custom domains are matched
 * by their `/p/<slug>` path; the API route then confirms the page is Substack.
 */
export function importSourceOf(url: URL): "uploadvr" | "substack" | undefined {
  const host = url.hostname.toLowerCase()
  if (host === "uploadvr.com" || host.endsWith(".uploadvr.com")) {
    return url.pathname.length > 1 ? "uploadvr" : undefined
  }
  if (!/^\/p\/[^/]+/.test(url.pathname)) return undefined
  if (host.endsWith(".substack.com")) return "substack"
  // Custom domain: require a real public-looking hostname, not an IP/localhost.
  const isIp = /^[\d.]+$/.test(host) || host.includes(":")
  if (!isIp && host.includes(".") && !host.endsWith(".local")) {
    return "substack"
  }
}

/** Short name of where an imported article lives, for "Read on …" labels. */
export function externalSourceName(link: string | undefined) {
  try {
    const host = new URL(link ?? "").hostname.replace(/^www\./, "")
    if (host === "uploadvr.com" || host.endsWith(".uploadvr.com")) {
      return "UploadVR"
    }
    if (host.endsWith("substack.com")) return "Substack"
    return host
  } catch {
    return "the web"
  }
}

export function articleHref(
  article: Pick<ArticleSummary, "_id" | "slug" | "source" | "link">
) {
  if (isExternal(article)) return article.link!
  return `/nextwavexr/articles/${article.slug ?? article._id}`
}

export const FEED_PATH = "/nextwavexr/feed.xml"

export const categoryHref = (category: string) =>
  `/nextwavexr/category/${slugify(category)}`

export const tagHref = (tag: string) => `/nextwavexr/tag/${slugify(tag)}`

/**
 * `limit` articles to read next: those most like `article` first (shared tags
 * count most, then a shared category, newer breaking ties), topped up with the
 * newest articles. `all` must be sorted newest first.
 */
export function relatedArticles(
  article: Pick<ArticleSummary, "_id" | "category" | "tags">,
  all: ArticleSummary[],
  limit = 3
) {
  const tags = new Set((article.tags ?? []).map(slugify))
  const others = all.filter((a) => a._id !== article._id)
  const similar = others
    .map((a) => ({
      a,
      score:
        (a.tags ?? []).filter((t) => tags.has(slugify(t))).length * 2 +
        (a.category === article.category ? 1 : 0),
    }))
    .filter((r) => r.score > 0)
    .sort((x, y) => y.score - x.score || y.a.date - x.a.date)
    .slice(0, limit)
    .map((r) => r.a)
  const newest = others.filter((a) => !similar.includes(a))
  return [...similar, ...newest].slice(0, limit)
}

export function formatArticleDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

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

/** Slugs that would collide with real routes under /nextwavexr. */
export const reservedSlugs = [
  "admin",
  "articles",
  "category",
  "tag",
  "feed.xml",
]

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

type TextNode = {
  type?: string
  text?: string
  attrs?: Record<string, unknown>
  content?: TextNode[]
}

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

const isInline = (n: TextNode) => n.type === "text" || n.type === "hardBreak"

/** All of a node's text; inline runs join directly, blocks with a space. */
const nodeText = (n: TextNode): string =>
  n.type === "text"
    ? (n.text ?? "")
    : n.type === "hardBreak"
      ? " "
      : (n.content ?? [])
          .map((c) => (isInline(c) ? nodeText(c) : ` ${nodeText(c)} `))
          .join("")

/** Rounded-up minutes to read a TipTap document at ~230 words a minute. */
export function readingMinutes(content: unknown) {
  const words = nodeText((content as TextNode | null) ?? {})
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(words / 230))
}

export type ArticleHeading = {
  /** Position among the document's top-level nodes. */
  index: number
  id: string
  text: string
  level: number
}

/** Top-level headings with unique anchor ids, for a table of contents. */
export function articleHeadings(content: unknown): ArticleHeading[] {
  const seen = new Map<string, number>()
  return ((content as TextNode | null)?.content ?? []).flatMap((n, index) => {
    if (n.type !== "heading") return []
    const text = nodeText(n).replace(/\s+/g, " ").trim()
    const base = slugify(text) || "section"
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const level = Math.min(Math.max(Number(n.attrs?.level) || 2, 2), 4)
    return text
      ? [{ index, id: count ? `${base}-${count + 1}` : base, text, level }]
      : []
  })
}
