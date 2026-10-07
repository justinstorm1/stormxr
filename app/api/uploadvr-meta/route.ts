import type { NextRequest } from "next/server"

const allowedHosts = ["uploadvr.com", "www.uploadvr.com"]

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
        `<meta[^>]+(?:property|name)=["']${k}["'][^>]*content=["']([^"']*)["']`,
        "i"
      )
    ) ??
    html.match(
      new RegExp(
        `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${k}["']`,
        "i"
      )
    )
  return m ? decodeEntities(m[1]).trim() : undefined
}

/**
 * Pulls article metadata from an UploadVR (Ghost) post so the admin importer
 * can prefill title, header image, author, category, and date.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url")
  let url: URL
  try {
    url = new URL(raw ?? "")
  } catch {
    return Response.json({ error: "Invalid URL" }, { status: 400 })
  }
  if (url.protocol !== "https:" || !allowedHosts.includes(url.hostname)) {
    return Response.json(
      { error: "Only uploadvr.com article links can be imported" },
      { status: 400 }
    )
  }

  let html: string
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; StormXR importer)" },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    })
    if (!res.ok) {
      return Response.json(
        { error: `UploadVR responded with ${res.status}` },
        { status: 502 }
      )
    }
    html = await res.text()
  } catch {
    return Response.json({ error: "Couldn't reach UploadVR" }, { status: 502 })
  }

  const published = meta(html, "article:published_time")
  return Response.json({
    url: meta(html, "og:url") ?? url.toString(),
    title: meta(html, "og:title") ?? meta(html, "twitter:title"),
    description: meta(html, "og:description"),
    image: meta(html, "og:image") ?? meta(html, "twitter:image"),
    // Ghost exposes "Written by" / "Filed under" as Twitter labels.
    author: meta(html, "twitter:data1"),
    category: meta(html, "twitter:data2") ?? meta(html, "article:tag"),
    date: published ? published.slice(0, 10) : undefined,
  })
}
