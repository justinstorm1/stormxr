import { formatArticleDate, isExternal } from "@/lib/articles"
import { getPublishedArticle, getPublishedArticles } from "@/lib/convex-server"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "NextWave XR article"
export const size = ogSize
export const contentType = ogContentType
export const revalidate = 60

export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles
    .filter((a) => !isExternal(a) && a.slug)
    .map((a) => ({ slug: a.slug! }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getPublishedArticle(slug)
  if (!article) {
    return renderOgImage({
      eyebrow: "Editorial & analysis",
      title: "NextWave XR",
    })
  }
  return renderOgImage({
    eyebrow: `NextWave XR · ${article.category}`,
    title: article.title,
    subtitle: `By ${article.author} · ${formatArticleDate(article.date)}`,
    background: article.headerImage,
  })
}
