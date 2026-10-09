import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ArticleCard } from "@/components/articles/article-card"
import { ArticleContent } from "@/components/articles/article-content"
import { ShareButtons } from "@/components/articles/share-buttons"
import { Container, CtaBand, Eyebrow, SectionRule } from "@/components/section"
import {
  categoryHref,
  formatArticleDate,
  tagHref,
  type ArticleSummary,
} from "@/lib/articles"

export type ArticleViewData = {
  title: string
  category: string
  author: string
  date: number
  excerpt?: string
  headerImage?: string
  content?: unknown
  tags?: string[]
}

/**
 * A written article as readers see it. Shared by the public article page and
 * the admin preview so the two never drift apart. The preview leaves out
 * sharing and related articles, which only make sense for a live article.
 */
export function ArticleView({
  article,
  shareUrl,
  related = [],
}: {
  article: ArticleViewData
  /** Absolute URL of the live article. */
  shareUrl?: string
  related?: ArticleSummary[]
}) {
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
            <Link
              href={categoryHref(article.category)}
              className="transition-opacity hover:opacity-80"
            >
              <Eyebrow>{article.category}</Eyebrow>
            </Link>
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
          {((article.tags && article.tags.length > 0) || shareUrl) && (
            <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8">
              {article.tags && article.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        href={tagHref(tag)}
                        className="block rounded-full bg-white/4 px-3 py-1 text-sm text-muted-foreground ring-1 ring-line transition hover:bg-white/8 hover:text-foreground"
                      >
                        #{tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {shareUrl && (
                <ShareButtons url={shareUrl} title={article.title} />
              )}
            </div>
          )}
        </Container>
      </article>

      {related.length > 0 && (
        <Container className="mt-24 sm:mt-32">
          <SectionRule index="→" label="Keep reading" className="mb-10" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </Container>
      )}

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
