import type { NextRequest } from "next/server"

import { importSourceOf } from "@/lib/articles"

function decodeEntities(s: string) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16))
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

/** Reads `<meta property|name="key" content="…">` in either attribute order. */
function meta(html: string, key: string) {
  const k = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const m =
    html.match(
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${k}["'][^>]*content=(["'])(.*?)\\1`,
        "i"
      )
    ) ??
    html.match(
      new RegExp(
        `<meta[^>]+content=(["'])(.*?)\\1[^>]*(?:property|name)=["']${k}["']`,
        "i"
      )
    )
  return m ? decodeEntities(m[2]).trim() || undefined : undefined
}

/** The first schema.org Article-ish object in the page's JSON-LD, if any. */
function jsonLd(html: string): Record<string, unknown> | undefined {
  const blocks = html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )
  for (const [, body] of blocks) {
    try {
      const data = JSON.parse(body) as unknown
      const items = Array.isArray(data) ? data : [data]
      const article = items.find(
        (d): d is Record<string, unknown> =>
          !!d && typeof d === "object" && "datePublished" in d
      )
      if (article) return article
    } catch {
      // Ignore malformed blocks.
    }
  }
}

function ldAuthor(ld: Record<string, unknown> | undefined) {
  const a = ld?.author
  const first = Array.isArray(a) ? a[0] : a
  if (typeof first === "string") return first
  if (first && typeof first === "object" && "name" in first) {
    return typeof first.name === "string" ? first.name : undefined
  }
}

const isoDay = (s: unknown) =>
  typeof s === "string" && /^\d{4}-\d{2}-\d{2}/.test(s)
    ? s.slice(0, 10)
    : undefined

/** UploadVR runs on Ghost, which exposes author/category as Twitter labels. */
function parseUploadVr(html: string) {
  return {
    author: meta(html, "twitter:data1"),
    category: meta(html, "twitter:data2") ?? meta(html, "article:tag"),
    date: isoDay(meta(html, "article:published_time")),
  }
}

/** Substack puts the author in `<meta name="author">` and dates in JSON-LD. */
function parseSubstack(html: string) {
  const ld = jsonLd(html)
  return {
    author: meta(html, "author") ?? ldAuthor(ld),
    category: meta(html, "article:section"),
    date:
      isoDay(ld?.datePublished) ??
      isoDay(meta(html, "article:published_time")),
  }
}

/**
 * Pulls article metadata from an UploadVR or Substack post so the admin
 * importer can prefill title, header image, author, category, and date.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url")
  let url: URL
  try {
    url = new URL(raw ?? "")
  } catch {
    return Response.json({ error: "Invalid URL" }, { status: 400 })
  }
  const source = url.protocol === "https:" ? importSourceOf(url) : undefined
  if (!source) {
    return Response.json(
      { error: "Only UploadVR and Substack article links can be imported" },
      { status: 400 }
    )
  }
  const sourceName = source === "uploadvr" ? "UploadVR" : "Substack"

  let html: string
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; StormXR importer)" },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    })
    if (!res.ok) {
      return Response.json(
        { error: `${sourceName} responded with ${res.status}` },
        { status: 502 }
      )
    }
    html = await res.text()
  } catch {
    return Response.json(
      { error: `Couldn't reach ${sourceName}` },
      { status: 502 }
    )
  }

  // Custom-domain Substacks are only recognised by their URL shape, so make
  // sure the page really is one before trusting it.
  if (source === "substack" && !/substackcdn\.com/.test(html)) {
    return Response.json(
      { error: "That link doesn't look like a Substack post" },
      { status: 400 }
    )
  }

  const details =
    source === "uploadvr" ? parseUploadVr(html) : parseSubstack(html)
  return Response.json({
    url: meta(html, "og:url") ?? url.toString(),
    title: meta(html, "og:title") ?? meta(html, "twitter:title"),
    description: meta(html, "og:description"),
    image: meta(html, "og:image") ?? meta(html, "twitter:image"),
    ...details,
  })
}
