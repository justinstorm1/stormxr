import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"

import { Container, CtaBand, PageHero } from "@/components/section"
import { stormycsSocials } from "@/lib/site"

export const metadata: Metadata = {
  title: "StormyCs VR",
  description:
    "Gaming, fitness, and personality-driven VR content from StormyCs VR across YouTube, TikTok, Instagram, X, Threads, and Bluesky.",
  alternates: { canonical: "/stormycsvr" },
}

export default function StormyCsVRPage() {
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
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stormycsSocials.map((s) => (
            <li key={s.name} className="reveal">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group flex items-center gap-5 p-6 outline-none focus-visible:ring-3 focus-visible:ring-ring"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Image
                    src={s.icon}
                    alt=""
                    width={30}
                    height={30}
                    className="size-7.5 rounded-md object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{s.name}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {s.handle}
                  </span>
                </span>
                <span className="flex size-9 items-center justify-center rounded-full ring-1 ring-white/10 transition group-hover:bg-primary group-hover:text-primary-foreground">
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
