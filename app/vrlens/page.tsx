import { ArrowUpRight, Glasses, Mic, Sparkles } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"

import { Container, CtaBand, PageHero } from "@/components/section"
import { pageMetadata } from "@/lib/metadata"
import { podcastLinks } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "VR Lens Podcast",
  description:
    "Interviews, analysis, and unfiltered conversation about virtual reality, spatial computing, and the people building the next dimension of media.",
  path: "/vrlens",
})

const listen = [
  {
    name: "Apple Podcasts",
    href: podcastLinks.apple,
    icon: "/images/ApplePodcastsLogo.png",
    body: "Subscribe and listen on Apple Podcasts. Leave a rating to help others discover the show.",
  },
  {
    name: "Spotify",
    href: podcastLinks.spotify,
    icon: "/images/SpotifyLogo.png",
    body: "Stream every episode on Spotify. Follow the show to get notified when new episodes drop.",
  },
]

const themes = [
  { icon: Glasses, label: "VR hardware reviews" },
  { icon: Mic, label: "Industry interviews" },
  { icon: Sparkles, label: "Emerging tech trends" },
]

export default function VRLensPage() {
  return (
    <>
      <PageHero
        eyebrow="Podcast"
        title={
          <>
            VR <em>Lens</em>
          </>
        }
        description="Interviews, analysis, and unfiltered conversation about virtual reality, spatial computing, and the people building the next dimension of media. New episodes drop regularly — subscribe on your platform of choice."
      >
        <ul className="flex flex-wrap gap-2">
          {themes.map((t) => (
            <li
              key={t.label}
              className="inline-flex items-center gap-2 rounded-full bg-white/4 px-3.5 py-2 text-sm text-muted-foreground ring-1 ring-line"
            >
              <t.icon className="size-4 text-signal" />
              {t.label}
            </li>
          ))}
        </ul>
      </PageHero>

      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {listen.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass reveal group flex flex-col p-8 outline-none sm:p-10"
            >
              <Image
                src={l.icon}
                alt=""
                width={56}
                height={56}
                className="size-16 rounded-2xl object-contain shadow-lg shadow-black/40"
              />
              <h2 className="display mt-10 text-4xl">{l.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {l.body}
              </p>
              <span className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium">
                Listen now
                <ArrowUpRight className="size-4 text-signal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </Container>

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
