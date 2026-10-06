import { ChartLine, Layers, MessagesSquare } from "lucide-react"
import type { Metadata } from "next"

import {
  Container,
  CtaBand,
  PageHero,
  SectionHeading,
} from "@/components/section"

export const metadata: Metadata = {
  title: "Advisory",
  description:
    "Strategic advisory bridging immersive technology with real-world experience — XR market analysis, immersive media strategy, and industry communication.",
  alternates: { canonical: "/advisory" },
}

const offerings = [
  {
    icon: ChartLine,
    title: "XR market & trend analysis",
    body: "Helping brands and organizations understand where immersive technology is gaining traction, where expectations exceed reality, and which developments are worth paying attention to.",
  },
  {
    icon: Layers,
    title: "Immersive media & experience strategy",
    body: "Exploring how spatial computing, VR, and emerging display technologies can improve engagement, communication, entertainment, and customer experience.",
  },
  {
    icon: MessagesSquare,
    title: "Industry communication & positioning",
    body: "Helping businesses and creators communicate immersive technology clearly to audiences, partners, and stakeholders without relying on hype or buzzwords.",
  },
]

const audiences = [
  "Brands weighing an XR or spatial computing initiative",
  "Organizations evaluating immersive tech for training, wellness, or customer experience",
  "Creators and startups positioning an XR product for launch",
  "Teams that need a clear, hype-free read on the market",
]

export default function AdvisoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Strategic advisory"
        title={
          <>
            Bridging immersive technology with <em>real-world experience</em>
          </>
        }
        description="Immersive technology is evolving quickly, but separating meaningful progress from industry noise is increasingly difficult. StormXR focuses on practical analysis, emerging media, and real-world insight into where XR, spatial computing, and immersive experiences are headed next."
      />

      <Container>
        <ol className="grid gap-4 lg:grid-cols-3">
          {offerings.map((o, i) => (
            <li key={o.title} className="glass-card reveal flex flex-col p-8">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                  <o.icon className="size-5 text-primary" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h2 className="mt-6 text-xl font-medium">{o.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {o.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>

      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            className="reveal"
            eyebrow="Who it's for"
            title={
              <>
                Perspective from inside the <em>industry</em>
              </>
            }
            description="Advice shaped by XR writing for a major industry publication and by hands-on experience deploying digital communication technology in operational environments."
          />
          <ul className="reveal divide-y divide-white/8 self-end border-y border-white/8">
            {audiences.map((a) => (
              <li key={a} className="flex items-start gap-4 py-5 text-base">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {a}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        eyebrow="Engage"
        title={
          <>
            Looking for perspective on <em>immersive technology?</em>
          </>
        }
        description="Book a focused advisory conversation around immersive media, XR strategy, communication, and emerging technology trends."
        href="/contact?topic=advisory"
        cta="Schedule an advisory call"
      />
    </>
  )
}
