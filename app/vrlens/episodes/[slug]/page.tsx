import { ArrowLeft, ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  EpisodeList,
  EpisodeMeta,
  EpisodePlayer,
} from "@/components/episode-list"
import { Container, CtaBand, Eyebrow, SectionRule } from "@/components/section"
import { baseOpenGraph, feedAlternates } from "@/lib/metadata"
import {
  episodeHref,
  getEpisode,
  getEpisodes,
  isoDuration,
} from "@/lib/podcast"
import { podcastLinks, site } from "@/lib/site"

export const revalidate = 3600

// Prerender known episodes; new ones render on first request.
export async function generateStaticParams() {
  return (await getEpisodes()).map((e) => ({ slug: e.slug }))
}

export async function generateMetadata(
  props: PageProps<"/vrlens/episodes/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  const episode = await getEpisode(slug)
  if (!episode) return { title: "Episode not found" }
  const title = `${episode.title} — VR Lens`
  const description = episode.notes[0]?.slice(0, 200)
  const path = episodeHref(episode)
  return {
    title,
    description,
    alternates: { ...feedAlternates, canonical: path },
    // The share image comes from ./opengraph-image.tsx.
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      title,
      description,
      url: path,
      publishedTime: episode.date,
    },
    twitter: { title, description },
  }
}

const listen = [
  { name: "Apple Podcasts", href: podcastLinks.apple },
  { name: "Spotify", href: podcastLinks.spotify },
]

export default async function EpisodePage(
  props: PageProps<"/vrlens/episodes/[slug]">
) {
  const { slug } = await props.params
  const episodes = await getEpisodes()
  const episode = episodes.find((e) => e.slug === slug)
  if (!episode) notFound()

  const url = `${site.url}${episodeHref(episode)}`
  const others = episodes.filter((e) => e !== episode).slice(0, 5)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.notes.join("\n\n"),
    url,
    datePublished: episode.date,
    ...(episode.episode && { episodeNumber: episode.episode }),
    ...(episode.duration > 0 && {
      timeRequired: isoDuration(episode.duration),
    }),
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: episode.audioUrl,
    },
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "VR Lens",
      url: `${site.url}/vrlens`,
    },
    author: { "@type": "Person", name: "Craig Storm" },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="relative isolate pt-32 sm:pt-40">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-160 overflow-hidden"
        >
          <div className="bg-dots absolute inset-0 mask-[radial-gradient(ellipse_at_top,black_10%,transparent_65%)] opacity-60" />
          <div className="absolute -top-40 left-1/2 h-112 w-176 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        </div>

        <Container className="max-w-4xl">
          <Link
            href="/vrlens"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/4 py-2 pr-4 pl-3 text-sm text-muted-foreground ring-1 ring-line transition hover:bg-white/8 hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            VR Lens
          </Link>

          <header className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-end">
            {episode.image && (
              <Image
                src={episode.image}
                alt="VR Lens cover art"
                width={176}
                height={176}
                priority
                className="size-32 rounded-2xl shadow-lg shadow-black/40 sm:size-44"
              />
            )}
            <div>
              <Eyebrow>Podcast episode</Eyebrow>
              <h1 className="display mt-5 text-4xl sm:text-5xl">
                {episode.title}
              </h1>
              <div className="mt-6">
                <EpisodeMeta episode={episode} />
              </div>
            </div>
          </header>

          <div className="glass mt-10 p-4 sm:p-5">
            <EpisodePlayer episode={episode} />
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-[1fr_14rem]">
            <div className="prose-article">
              {episode.notes.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <aside className="self-start">
              <p className="label text-muted-foreground">Listen on</p>
              <ul className="mt-3 divide-y divide-line">
                {[
                  ...listen,
                  { name: "Spotify for Creators", href: episode.link },
                ].map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-3 text-sm"
                    >
                      {l.name}
                      <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-signal" />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </article>

      {others.length > 0 && (
        <Container className="mt-24 max-w-4xl sm:mt-32">
          <SectionRule index="→" label="More episodes" />
          <EpisodeList episodes={others} />
        </Container>
      )}

      <CtaBand
        eyebrow="Join the conversation"
        title={
          <>
            Want to be a guest on <em>VR Lens?</em>
          </>
        }
        description="Building something interesting in XR, spatial computing, or immersive media? Reach out — we're always looking for practitioners with real stories to tell."
        href="/contact?topic=podcast"
        cta="Pitch an episode"
      />
    </>
  )
}
