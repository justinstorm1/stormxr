import { articleHref, FEED_PATH, isExternal } from "@/lib/articles"
import { getPublishedArticles } from "@/lib/convex-server"
import { site } from "@/lib/site"

// Picks up newly published articles without a redeploy.
export const revalidate = 600

const FEED_SIZE = 50

function escapeXml(s: string) {
  return s.replace(
    /[<>&'"]/g,
    (ch) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[ch]!
  )
}

export async function GET() {
  const articles = (await getPublishedArticles()).slice(0, FEED_SIZE)
  const channelUrl = `${site.url}/nextwavexr`

  const items = articles.map((a) => {
    const href = articleHref(a)
    const url = isExternal(a) ? href : `${site.url}${href}`
    // Some imports set the SEO description to the title; skip those.
    const description =
      (a.metaDescription !== a.title && a.metaDescription) || a.excerpt
    return [
      "    <item>",
      `      <title>${escapeXml(a.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      isExternal(a)
        ? `      <guid isPermaLink="false">${a._id}</guid>`
        : `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${new Date(a.date).toUTCString()}</pubDate>`,
      `      <dc:creator>${escapeXml(a.author)}</dc:creator>`,
      ...[a.category, ...(a.tags ?? [])].map(
        (c) => `      <category>${escapeXml(c)}</category>`
      ),
      description &&
        `      <description>${escapeXml(description)}</description>`,
      a.headerImage &&
        `      <media:content url="${escapeXml(a.headerImage)}" medium="image" />`,
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n")
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>NextWave XR</title>
    <link>${channelUrl}</link>
    <description>Craig Storm's writing on spatial computing, immersive media, VR fitness, and real-world XR adoption.</description>
    <language>en-us</language>
    <atom:link href="${site.url}${FEED_PATH}" rel="self" type="application/rss+xml" />
    <image>
      <url>${site.url}/images/email/nextwavexr-96.png</url>
      <title>NextWave XR</title>
      <link>${channelUrl}</link>
    </image>${articles[0] ? `\n    <lastBuildDate>${new Date(articles[0].updatedAt ?? articles[0].date).toUTCString()}</lastBuildDate>` : ""}
${items.join("\n")}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
