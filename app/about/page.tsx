import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import {
  Container,
  CtaBand,
  Eyebrow,
  PageHero,
  SectionHeading,
} from "@/components/section"
import { people } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "StormXR is the umbrella brand connecting XR writing, analysis, media, partnerships, and industry experience — founded by Craig Storm, built by Justin Storm.",
  alternates: { canonical: "/about" },
}

const principles = [
  {
    title: "Practical adoption",
    body: "We focus on what people actually use — not what's promised in keynotes.",
  },
  {
    title: "Beyond gaming",
    body: "Media, wellness, fitness, communication, and everyday life are where XR's next chapter is written.",
  },
  {
    title: "Real-world grounding",
    body: "Industry experience deploying technology in operational environments shapes every take.",
  },
  {
    title: "Build what we cover",
    body: "We ship our own apps and experiences, so our perspective comes from making things, not just watching.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our vision"
        title={
          <>
            Bridging immersive technology, media, and{" "}
            <em>real-world adoption</em>
          </>
        }
        description="StormXR is the umbrella brand for our work around immersive technology and the future of XR. It connects writing, analysis, media, partnerships, and industry experience into one platform focused on where immersive technology is headed next."
      >
        <Link
          href="/press"
          className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          In the news — read our press releases
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </PageHero>

      <Container>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li key={p.title} className="reveal bg-background p-7">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h2 className="mt-4 text-lg font-medium">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      <section className="py-24 sm:py-32">
        <Container className="space-y-24 sm:space-y-32">
          {people.map((person, i) => (
            <article
              key={person.name}
              id={person.name.split(" ")[0].toLowerCase()}
              className="reveal grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
            >
              <div className={i % 2 ? "lg:order-2" : undefined}>
                <div className="relative aspect-4/5 max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-card">
                  <div aria-hidden className="absolute inset-0">
                    <div className="absolute -top-10 -left-10 h-60 w-60 rounded-full bg-primary/25 blur-[80px]" />
                    <div className="absolute right-0 -bottom-10 h-60 w-60 rounded-full bg-violet/25 blur-[80px]" />
                    <div className="bg-grid absolute inset-0 opacity-40" />
                  </div>
                  <div className="relative flex h-full flex-col justify-between p-8">
                    <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      {person.role}
                    </span>
                    <span
                      aria-hidden
                      className="text-storm font-serif text-[7rem] leading-none"
                    >
                      {person.initials}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <SectionHeading
                  eyebrow={person.role}
                  title={
                    <>
                      The person{" "}
                      {person.role === "Founder" ? "behind" : "building"}{" "}
                      <em>StormXR</em>
                    </>
                  }
                />
                <h3 className="mt-6 text-xl font-medium">{person.name}</h3>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {person.bio.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                </div>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Connect on LinkedIn <ArrowUpRight className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <Container>
        <div className="reveal grid gap-6 rounded-3xl border border-white/8 p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-10">
          <Eyebrow>Company</Eyebrow>
          <p className="text-lg leading-relaxed text-foreground/90">
            StormXR, LLC is the company Craig founded to power his work in the
            extended reality space — the engine behind NextWave XR, the VR Lens
            Podcast, StormyCs VR, and every app we ship.
          </p>
        </div>
      </Container>

      <CtaBand
        title={
          <>
            Want to explore what&apos;s <em>next in XR?</em>
          </>
        }
        description="Partnerships, coverage, advisory, or development — we'd love to hear what you're working on."
      />
    </>
  )
}
