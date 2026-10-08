import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ArticleContent } from "@/components/articles/article-content"
import { Container, CtaBand, Eyebrow } from "@/components/section"
import { formatArticleDate } from "@/lib/articles"

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
 * the admin preview so the two never drift apart.
 */
export function ArticleView({ article }: { article: ArticleViewData }) {
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
