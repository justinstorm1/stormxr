import { ArrowLeft, Rss } from "lucide-react"
import Link from "next/link"

import { ArticlesBrowser } from "@/components/articles/articles-browser"
import { Container, CtaBand, PageHero } from "@/components/section"
import { buttonVariants } from "@/components/ui/button"
import {
  categoryHref,
  FEED_PATH,
  slugify,
  tagHref,
  type ArticleSummary,
} from "@/lib/articles"
import { getPublishedArticles } from "@/lib/convex-server"
import { pageMetadata } from "@/lib/metadata"

export type TopicKind = "category" | "tag"

type Topic = { kind: TopicKind; name: string; articles: ArticleSummary[] }

const namesOf = (kind: TopicKind, a: ArticleSummary) =>
  kind === "category" ? [a.category] : (a.tags ?? [])

/** Every category or tag with at least one published article, by slug. */
export async function getTopics(kind: TopicKind) {
  const topics = new Map<string, Topic>()
  for (const a of await getPublishedArticles()) {
    for (const name of namesOf(kind, a)) {
      const slug = slugify(name)
      if (!slug) continue
      const topic = topics.get(slug) ?? { kind, name, articles: [] }
      topic.articles.push(a)
      topics.set(slug, topic)
    }
  }
  return topics
}

export const topicHref = (kind: TopicKind, name: string) =>
  kind === "category" ? categoryHref(name) : tagHref(name)

const titleOf = (topic: Pick<Topic, "kind" | "name">) =>
  topic.kind === "category" ? topic.name : `#${topic.name}`

export async function topicMetadata(kind: TopicKind, slug: string) {
  const topic = (await getTopics(kind)).get(slug)
  if (!topic) return { title: "Not found" }
  return pageMetadata({
    title: `${titleOf(topic)} — NextWave XR`,
    description: `${topic.articles.length} article${topic.articles.length === 1 ? "" : "s"} on ${topic.name} from NextWave XR — Craig Storm's writing on spatial computing, immersive media, and real-world XR adoption.`,
    path: topicHref(kind, topic.name),
  })
}

/** A category or tag page: every published article filed under it. */
export function TopicPage({
  topic,
  others,
}: {
  topic: Topic
  /** Other topics of the same kind, most articles first. */
  others: Topic[]
}) {
  const count = topic.articles.length
  return (
    <>
      <PageHero
        eyebrow={topic.kind === "category" ? "Category" : "Tag"}
        title={titleOf(topic)}
        description={`${count} article${count === 1 ? "" : "s"} from NextWave XR.`}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/nextwavexr"
            className={buttonVariants({ size: "xl", variant: "outline" })}
          >
            <ArrowLeft data-icon="inline-start" />
            All articles
          </Link>
          <a
            href={FEED_PATH}
            className={buttonVariants({ size: "xl", variant: "outline" })}
          >
            <Rss data-icon="inline-start" />
            RSS feed
          </a>
        </div>
      </PageHero>

      <Container>
        <ArticlesBrowser
          articles={topic.articles}
          filters={topic.kind === "tag"}
        />

        {others.length > 0 && (
          <nav
            aria-label={
              topic.kind === "category" ? "Other categories" : "Other tags"
            }
            className="mt-20 border-t border-line pt-10"
          >
            <h2 className="label text-muted-foreground">
              {topic.kind === "category" ? "More categories" : "More tags"}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.name}>
                  <Link
                    href={topicHref(o.kind, o.name)}
                    className="block rounded-full bg-white/4 px-4 py-2 text-sm text-muted-foreground ring-1 ring-line transition hover:bg-white/8 hover:text-foreground"
                  >
                    {titleOf(o)}{" "}
                    <span className="opacity-60">{o.articles.length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>

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

/** Shared body of the category and tag routes. */
export async function renderTopic(kind: TopicKind, slug: string) {
  const topics = await getTopics(kind)
  const topic = topics.get(slug)
  if (!topic) return null
  const others = [...topics.values()]
    .filter((t) => t !== topic)
    .sort((a, b) => b.articles.length - a.articles.length)
    .slice(0, 24)
  return <TopicPage topic={topic} others={others} />
}
