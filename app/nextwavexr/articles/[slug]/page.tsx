import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { ArticleView } from "@/components/articles/article-view"
import { excerptFromContent, isExternal } from "@/lib/articles"
import { getPublishedArticle, getPublishedArticles } from "@/lib/convex-server"
import { baseOpenGraph } from "@/lib/metadata"

export const revalidate = 60

// Prerender articles written here; new ones render on first request.
export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles
    .filter((a) => !isExternal(a) && a.slug)
    .map((a) => ({ slug: a.slug! }))
}

export async function generateMetadata(
  props: PageProps<"/nextwavexr/articles/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  const article = await getPublishedArticle(slug)
  if (!article) return { title: "Article not found" }
  // Some imports set the SEO description to the title; skip those.
  const meta =
    article.metaDescription && article.metaDescription !== article.title
      ? article.metaDescription
      : undefined
  const description =
    meta ?? article.excerpt ?? excerptFromContent(article.content)
  const path = `/nextwavexr/articles/${article.slug ?? article._id}`
  return {
    title: article.title,
    description,
    authors: [{ name: article.author }],
    alternates: { canonical: article.canonicalUrl ?? path },
    // The share image comes from ./opengraph-image.tsx.
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      title: article.title,
      description,
      url: path,
      publishedTime: new Date(article.date).toISOString(),
      modifiedTime: article.updatedAt
        ? new Date(article.updatedAt).toISOString()
        : undefined,
      authors: [article.author],
      section: article.category,
      tags: article.tags,
    },
    twitter: { title: article.title, description },
  }
}

export default async function ArticlePage(
  props: PageProps<"/nextwavexr/articles/[slug]">
) {
  const { slug } = await props.params
  const article = await getPublishedArticle(slug)
  if (!article) notFound()

  // UploadVR imports live on UploadVR; send old links there.
  if (isExternal(article)) redirect(article.link!)

  // Old links used the document id; keep a single canonical slug URL.
  if (article.slug && slug !== article.slug) {
    redirect(`/nextwavexr/articles/${article.slug}`)
  }

  return <ArticleView article={article} />
}
