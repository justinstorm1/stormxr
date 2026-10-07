import { Glasses, Globe, Smartphone } from "lucide-react"
import type { Metadata } from "next"

import { AppCard } from "@/components/app-card"
import {
  Container,
  CtaBand,
  PageHero,
  SectionHeading,
} from "@/components/section"
import { pageMetadata } from "@/lib/metadata"
import { apps } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Development",
  description:
    "StormXR builds fast, responsive digital experiences — modern web platforms with Next.js, native iOS and Android apps, and Meta Quest VR experiences.",
  path: "/development",
})

const disciplines = [
  {
    icon: Globe,
    title: "Web development",
    body: "Modern web experiences using scalable frameworks, responsive design systems, and optimized deployment workflows focused on speed and usability.",
    stack: [
      "Next.js & React",
      "Tailwind CSS",
      "Vercel deployments",
      "SSR & Jamstack",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile apps",
    body: "Native applications for iOS and Android, focused on clean design, responsive interaction, and modern ecosystem performance.",
    stack: ["Swift", "React Native", "CloudKit", "Real-time backends"],
  },
  {
    icon: Glasses,
    title: "VR development",
    body: "Immersive experiences for standalone headsets, built with real-time engines, physics-driven interaction, and comfortable, responsive gameplay.",
    stack: [
      "Meta Quest",
      "Real-time engines",
      "Hand & controller tracking",
      "Haptics",
    ],
  },
]

export default function DevelopmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Our craft"
        title={
          <>
            Built for modern <em>digital experiences</em>
          </>
        }
        description="From modern web platforms to native mobile apps and immersive VR, we build fast, responsive digital experiences designed for usability, performance, and clean interaction across emerging platforms."
      />

      <Container>
        <div className="grid gap-4 lg:grid-cols-3">
          {disciplines.map((d) => (
            <article
              key={d.title}
              className="glass reveal flex flex-col p-8 sm:p-9"
            >
              <span className="icon-tile size-12">
                <d.icon className="size-5 text-signal" />
              </span>
              <h2 className="display mt-8 text-2xl">{d.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {d.body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {d.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-white/4 px-3 py-1 font-mono text-[0.7rem] text-foreground/80 ring-1 ring-line"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            className="reveal"
            eyebrow="Portfolio"
            title={
              <>
                Live on the App Store, Google Play &amp; <em>Meta Quest</em>
              </>
            }
            description="Every app below was designed, built, and shipped by StormXR."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} className="reveal" />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Build with us"
        title={
          <>
            Have a product <em>in mind?</em>
          </>
        }
        description="Web, mobile, or VR — tell us what you're building and we'll talk through how to get it shipped."
        href="/contact?topic=development"
        cta="Start a project"
      />
    </>
  )
}
