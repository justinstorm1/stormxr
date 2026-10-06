import {
  ArrowRight,
  ArrowUpRight,
  Code,
  Compass,
  Megaphone,
} from "lucide-react"
import Link from "next/link"

import { AppCard } from "@/components/app-card"
import { PlatformCard } from "@/components/platform-card"
import { PressList } from "@/components/press-list"
import {
  Container,
  CtaBand,
  Eyebrow,
  SectionHeading,
} from "@/components/section"
import { buttonVariants } from "@/components/ui/button"
import { apps, people, platforms, topics } from "@/lib/site"
import { cn } from "@/lib/utils"

const pillars = [
  {
    icon: Megaphone,
    title: "Media",
    href: "/media-projects",
    body: "Editorial analysis, a podcast, and a creator community — three channels covering where XR is actually headed.",
  },
  {
    icon: Code,
    title: "Development",
    href: "/development",
    body: "Native iOS and Android apps, Meta Quest experiences, and fast modern web platforms — designed and shipped in-house.",
  },
  {
    icon: Compass,
    title: "Advisory",
    href: "/advisory",
    body: "Grounded perspective on XR markets, immersive media strategy, and how to talk about emerging tech without the hype.",
  },
]

const facts = [
  { value: "3", label: "Media platforms" },
  { value: "4", label: "Apps shipped" },
  { value: "3", label: "Build targets — web, mobile & VR" },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-48 sm:pb-36">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="animate-drift absolute top-[-20%] left-[10%] h-136 w-136 rounded-full bg-primary/20 blur-[140px]" />
          <div className="animate-drift-slow absolute top-[5%] right-[-5%] h-120 w-120 rounded-full bg-violet/25 blur-[140px]" />
          <div className="hero-grid opacity-40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
        </div>

        <Container className="flex flex-col items-center text-center">
          <Link
            href="/press"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 py-1 pr-3 pl-1 text-xs text-muted-foreground backdrop-blur transition hover:border-primary/40 hover:text-foreground"
          >
            <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground">
              New
            </span>
            Whack-A-PC is out on iPhone, iPad &amp; Android
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="mt-8 max-w-4xl text-5xl leading-[1.02] font-medium tracking-tight sm:text-7xl md:text-[5.5rem]">
            Tracking the next wave of{" "}
            <em className="text-storm pr-2 font-serif font-normal tracking-normal">
              immersive technology
            </em>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Exploring how immersive technology is moving beyond gaming into
            media, wellness, communication, and everyday life.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/media-projects"
              className={buttonVariants({ size: "xl" })}
            >
              Explore media projects
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ size: "xl", variant: "outline" }),
                "backdrop-blur"
              )}
            >
              Learn more about StormXR
            </Link>
          </div>
        </Container>
      </section>

      {/* Topic marquee */}
      <div
        className="relative border-y border-white/8 bg-card/40 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-5"
        aria-label="Topics we cover"
      >
        <div className="animate-marquee flex w-max gap-10">
          {[...topics, ...topics].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= topics.length}
              className="flex items-center gap-10 font-mono text-sm tracking-wider whitespace-nowrap text-muted-foreground uppercase"
            >
              {t}
              <span className="size-1 rounded-full bg-primary/60" />
            </span>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div className="reveal">
              <SectionHeading
                eyebrow="What we do"
                title={
                  <>
                    One platform for where XR is <em>headed next</em>
                  </>
                }
                description="StormXR brings together writing, analysis, media, partnerships, and hands-on product development — focused on practical adoption and real-world impact, not hype."
              />
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/8 pt-8">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="font-serif text-5xl text-foreground">
                      {f.value}
                    </dd>
                    <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                      {f.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <ul className="grid gap-4">
              {pillars.map((p) => (
                <li key={p.title} className="reveal">
                  <Link
                    href={p.href}
                    className="glass-card group flex gap-5 p-6 outline-none focus-visible:ring-3 focus-visible:ring-ring sm:p-7"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <p.icon className="size-5" />
                    </span>
                    <div className="flex-1">
                      <h3 className="flex items-center justify-between text-xl font-medium">
                        {p.title}
                        <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:text-primary" />
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Media platforms */}
      <section className="relative py-24 sm:py-32">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-40"
        />
        <Container>
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Media & content"
              title={
                <>
                  Three platforms, <em>one vision</em>
                </>
              }
              description="Editorial, audio, and social — all rooted in the same passion for immersive technology and spatial computing."
            />
            <Link
              href="/media-projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "self-start md:self-auto"
              )}
            >
              All media
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {platforms.map((p, i) => (
              <div key={p.slug} className="reveal flex">
                <PlatformCard platform={p} index={i} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Apps */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Built by StormXR"
              title={
                <>
                  Apps and experiences, <em>live today</em>
                </>
              }
              description="Designed, built, and shipped in-house — on the App Store, Google Play, and the Meta Quest Store."
            />
            <Link
              href="/development"
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "self-start md:self-auto"
              )}
            >
              Our development work
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} className="reveal" />
            ))}
          </div>
        </Container>
      </section>

      {/* People */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            className="reveal"
            eyebrow="The team"
            title={
              <>
                Industry perspective meets <em>hands-on building</em>
              </>
            }
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {people.map((person) => (
              <article
                key={person.name}
                className="glass-card reveal flex flex-col gap-6 p-7 sm:flex-row sm:p-8"
              >
                <div
                  aria-hidden
                  className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary/30 via-primary/5 to-violet/30 font-serif text-3xl ring-1 ring-white/10"
                >
                  {person.initials}
                </div>
                <div>
                  <Eyebrow>{person.role}</Eyebrow>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight">
                    {person.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {person.short}
                  </p>
                  <div className="mt-5 flex gap-4 text-sm">
                    <Link
                      href={`/about#${person.name.split(" ")[0].toLowerCase()}`}
                      className="font-medium text-primary hover:underline"
                    >
                      Full bio
                    </Link>
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      LinkedIn <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Press */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="In the news"
              title="Latest announcements"
            />
            <Link
              href="/press"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              All press releases <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="reveal mt-10">
            <PressList />
          </div>
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Let&apos;s talk <em>XR</em>
          </>
        }
        description="Sponsored content, editorial coverage, a podcast appearance, an advisory call, or a product to build — reach out and we'll get back to you."
      />
    </>
  )
}
