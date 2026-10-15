import { ArrowLeft, ArrowRight, ArrowUpRight, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ArticleCard } from "@/components/articles/article-card"
import { ArticleContent } from "@/components/articles/article-content"
import { ReadingProgress } from "@/components/articles/reading-progress"
import { ShareButtons } from "@/components/articles/share-buttons"
import { Container, CtaBand, Eyebrow, SectionRule } from "@/components/section"
import {
  articleHeadings,
  articleHref,
  categoryHref,
  formatArticleDate,
  readingMinutes,
  tagHref,
  type ArticleSummary,
} from "@/lib/articles"
import { people } from "@/lib/site"

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
 * sharing, neighbours, and related articles, which only make sense for a live
 * article.
 */
export function ArticleView({
  article,
  shareUrl,
  related = [],
  newer,
  older,
}: {
  article: ArticleViewData
  /** Absolute URL of the live article. */
  shareUrl?: string
  related?: ArticleSummary[]
  /** The next and previous articles written here, by date. */
  newer?: ArticleSummary
  older?: ArticleSummary
}) {
  const toc = articleHeadings(article.content).filter((h) => h.level <= 3)
  const author = people.find((p) => p.name === article.author)
  return (
    <>
      <article className="relative isolate pt-32 sm:pt-40">
        <ReadingProgress />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-160 overflow-hidden"
        >
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
              <span aria-hidden>·</span>
              <span>{readingMinutes(article.content)} min read</span>
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
          {toc.length >= 2 && (
            <details className="glass group/toc mb-12 p-0" open>
              <summary className="label flex cursor-pointer list-none items-center gap-2.5 p-5 text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
                <List className="size-4 text-signal" />
                In this article
                <ArrowRight className="ml-auto size-4 transition-transform group-open/toc:rotate-90" />
              </summary>
              <ol className="space-y-2 px-5 pb-5 text-sm">
                {toc.map((h) => (
                  <li key={h.id} className={h.level === 3 ? "pl-4" : undefined}>
                    <a
                      href={`#${h.id}`}
                      className="text-muted-foreground transition-colors hover:text-signal"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}
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

          {author && (
            <aside className="glass mt-10 flex flex-col gap-5 p-6 sm:flex-row sm:p-7">
              <span className="icon-tile display size-14 shrink-0 text-lg">
                {author.initials}
              </span>
              <div>
                <p className="label text-muted-foreground">About the author</p>
                <p className="display mt-2 text-xl">{author.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {author.short}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-signal"
                  >
                    More about {author.name.split(" ")[0]}
                    <ArrowRight className="size-3.5 text-signal" />
                  </Link>
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-signal"
                  >
                    LinkedIn
                    <ArrowUpRight className="size-3.5 text-signal" />
                  </a>
                </div>
              </div>
            </aside>
          )}
        </Container>
      </article>

      {(newer || older) && (
        <Container className="mt-16 max-w-3xl">
          <nav
            aria-label="More from NextWave XR"
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              { a: older, label: "Previous article", right: false },
              { a: newer, label: "Next article", right: true },
            ].map(({ a, label, right }) =>
              a ? (
                <Link
                  key={label}
                  href={articleHref(a)}
                  className={
                    right
                      ? "glass group p-6 sm:col-start-2 sm:text-right"
                      : "glass group p-6"
                  }
                >
                  <span className="label text-muted-foreground">
                    {right ? `${label} →` : `← ${label}`}
                  </span>
                  <span className="mt-2 line-clamp-2 block leading-snug font-medium transition-colors group-hover:text-signal">
                    {a.title}
                  </span>
                </Link>
              ) : null
            )}
          </nav>
        </Container>
      )}

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
