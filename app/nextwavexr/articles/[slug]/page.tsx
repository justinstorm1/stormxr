import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { ArticleContent } from "@/components/articles/article-content"
import { Container, CtaBand, Eyebrow } from "@/components/section"
import {
  excerptFromContent,
  formatArticleDate,
  isExternal,
} from "@/lib/articles"
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

  return (
    <>
      <article className="relative isolate pt-32 sm:pt-40">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-160">
          <div className="bg-dots absolute inset-0 mask-[radial-gradient(ellipse_at_top,black_10%,transparent_65%)] opacity-60" />
          <div className="absolute -top-40 left-1/2 h-112 w-176 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        </div>

        <Container className="max-w-4xl">
          <Link
            href="/nextwavexr"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/4 py-2 pr-4 pl-3 text-sm text-muted-foreground ring-1 ring-line transition hover:bg-white/8 hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            NextWave XR
          </Link>

          <header className="mt-10">
            <Eyebrow>{article.category}</Eyebrow>
            <h1 className="display mt-5 text-4xl sm:text-6xl">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
            )}
            <p className="label mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
              <span className="text-foreground">By {article.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={new Date(article.date).toISOString()}>
                {formatArticleDate(article.date)}
              </time>
            </p>
          </header>
        </Container>

        {article.headerImage && (
          <Container className="mt-12 max-w-5xl">
            <div className="glass relative aspect-video overflow-hidden p-0">
              <Image
                src={article.headerImage}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        )}

        <Container className="mt-14 max-w-3xl">
          <ArticleContent content={article.content} />
          {article.tags && article.tags.length > 0 && (
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-white/4 px-3 py-1 text-sm text-muted-foreground ring-1 ring-line"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </article>

      <CtaBand
        eyebrow="Editorial"
        title={
          <>
            Have a story <em>worth covering?</em>
          </>
        }
        description="Hardware, software, or an immersive experience that's changing how people live — pitch it to NextWave XR."
        href="/contact?topic=media"
        cta="Pitch a story"
      />
    </>
  )
}
