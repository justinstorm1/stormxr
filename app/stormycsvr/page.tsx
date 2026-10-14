import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"

import { Container, CtaBand, PageHero, SectionRule } from "@/components/section"
import { YouTubePlayer } from "@/components/youtube-player"
import { formatArticleDate } from "@/lib/articles"
import { pageMetadata } from "@/lib/metadata"
import { stormycsSocials } from "@/lib/site"
import { getLatestVideos } from "@/lib/youtube"

export const metadata: Metadata = pageMetadata({
  title: "StormyCs VR",
  description:
    "Gaming, fitness, and personality-driven VR content from StormyCs VR across YouTube, TikTok, Instagram, X, Threads, and Bluesky.",
  path: "/stormycsvr",
})

// Videos come from the YouTube channel feed; refresh hourly.
export const revalidate = 3600

const youtube = stormycsSocials.find((s) => s.name === "YouTube")!

export default async function StormyCsVRPage() {
  const videos = await getLatestVideos()
  return (
    <>
      <PageHero
        eyebrow="Creator & community"
        title={
          <>
            StormyCs <em>VR</em>
          </>
        }
        description="Gaming, fitness, and personality-driven VR content across every platform. Follow along for hands-on hardware impressions, community highlights, and an unfiltered look at life inside the headset."
      />
      {videos.length > 0 && (
        <Container className="mb-24 sm:mb-32">
          <SectionRule index="01" label="Latest videos" className="mb-10" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id} className="glass reveal flex flex-col p-2">
                <div className="relative aspect-video overflow-hidden rounded-[1.4rem] bg-card">
                  <YouTubePlayer
                    id={v.id}
                    title={v.title}
                    thumbnail={v.thumbnail}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="label text-muted-foreground">
                    {v.short ? "Short" : "Video"} ·{" "}
                    <time dateTime={v.published}>
                      {formatArticleDate(Date.parse(v.published))}
                    </time>
                  </p>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-snug font-medium transition-colors hover:text-signal"
                  >
                    {v.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <a
            href={youtube.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-signal"
          >
            More on YouTube
            <ArrowUpRight className="size-4 text-signal" />
          </a>
        </Container>
      )}
      <Container>
        {videos.length > 0 && (
          <SectionRule index="02" label="Follow along" className="mb-10" />
        )}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stormycsSocials.map((s) => (
            <li key={s.name} className="reveal flex">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex w-full items-center gap-5 p-5 outline-none sm:p-6"
              >
                <span className="icon-tile size-14 shrink-0">
                  <Image
                    src={s.icon}
                    alt=""
                    width={30}
                    height={30}
                    className="size-7.5 rounded-md object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="display block text-xl">{s.name}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {s.handle}
                  </span>
                </span>
                <span className="flex size-10 items-center justify-center rounded-full bg-white/4 ring-1 ring-line-strong transition group-hover:bg-primary group-hover:ring-primary">
                  <ArrowUpRight className="size-4" />
                  <span className="sr-only">Follow on {s.name}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand
        eyebrow="Community"
        title={
          <>
            Want to <em>collab</em> or connect?
          </>
        }
        description="Whether you're a brand, creator, or just a VR enthusiast — reach out. Always open to new collabs, sponsorships, and community conversations."
        href="/contact?topic=media"
        cta="Get in touch"
      />
    </>
  )
}
