import { ArrowUpRight, Dumbbell, PenLine } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"

import {
  Container,
  CtaBand,
  PageHero,
  SectionHeading,
} from "@/components/section"
import { buttonVariants } from "@/components/ui/button"
import { people, stormycsSocials, uploadVrUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "NextWave XR",
  description:
    "NextWave XR is Craig Storm's editorial and analysis platform covering spatial computing, immersive media, VR fitness, and real-world XR adoption.",
  alternates: { canonical: "/nextwavexr" },
}

const focus = [
  {
    icon: PenLine,
    title: "VR writing",
    body: "Contributor at UploadVR covering fitness, media, hardware, and immersive experiences from an adult user's perspective.",
  },
  {
    icon: Dumbbell,
    title: "Immersive fitness",
    body: "A passionate advocate for VR as a legitimate fitness platform — exploring how movement and technology intersect.",
  },
]

const craig = people[0]
const craigSocials = stormycsSocials.filter((s) =>
  ["X / Twitter", "Bluesky", "Threads"].includes(s.name)
)

export default function NextWaveXRPage() {
  return (
    <>
      <PageHero
        eyebrow="Editorial & analysis"
        title={
          <>
            NextWave <em>XR</em>
          </>
        }
        description="The editorial and analysis platform where Craig writes about spatial computing, immersive media, and real-world XR adoption — in-depth articles, hardware breakdowns, and industry perspective for professionals and enthusiasts alike."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={uploadVrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "xl" })}
          >
            Read Craig on UploadVR
            <ArrowUpRight data-icon="inline-end" />
          </a>
          <a
            href={craig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "xl", variant: "outline" })}
          >
            Follow on LinkedIn
          </a>
        </div>
      </PageHero>

      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          {focus.map((f) => (
            <article key={f.title} className="glass-card reveal p-8">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                <f.icon className="size-5 text-primary" />
              </span>
              <h2 className="mt-6 text-xl font-medium">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </Container>

      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading
              eyebrow="Founder & creator"
              title={
                <>
                  XR from the perspective of <em>everyday adults</em>
                </>
              }
              description="Craig Storm is a VR writer, immersive fitness advocate, and the creator behind NextWave XR. He explores virtual reality from the perspective of everyday adults discovering what XR can be beyond gaming — and builds the platforms to share that story."
            />
          </div>
          <div className="reveal glass-card self-start p-7">
            <div className="flex items-center gap-4">
              <Image
                src="/images/NextWaveXRLogo.png"
                alt="NextWave XR logo"
                width={56}
                height={56}
                className="size-14 rounded-xl ring-1 ring-white/10"
              />
              <div>
                <p className="font-medium">Follow the writing</p>
                <p className="text-sm text-muted-foreground">
                  New pieces, first.
                </p>
              </div>
            </div>
            <ul className="mt-6 divide-y divide-white/8">
              {[
                { name: "UploadVR", handle: "craigstorm", href: uploadVrUrl },
                ...craigSocials,
                {
                  name: "LinkedIn",
                  handle: "craig-storm",
                  href: craig.linkedin,
                },
              ].map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3 text-sm"
                  >
                    <span>{s.name}</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground group-hover:text-primary">
                      {s.handle}
                      <ArrowUpRight className={cn("size-3.5")} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

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
