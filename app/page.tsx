import {
  ArrowRight,
  ArrowUpRight,
  Code,
  Compass,
  Megaphone,
  Mic,
  Newspaper,
  Users,
} from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { AppCard } from "@/components/app-card"
import { Planes } from "@/components/planes"
import { PlatformCard } from "@/components/platform-card"
import { PressList } from "@/components/press-list"
import {
  Container,
  CtaBand,
  SectionHeading,
  SectionRule,
} from "@/components/section"
import { buttonVariants } from "@/components/ui/button"
import { pageMetadata } from "@/lib/metadata"
import { getPressReleases } from "@/lib/press"
import { apps, people, platforms, site, topics } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
})

const facts = [
  { value: "03", label: "Media platforms" },
  { value: "04", label: "Apps shipped" },
  { value: "03", label: "Build targets — web, mobile & VR" },
]

const platformIcons = {
  nextwavexr: Newspaper,
  vrlens: Mic,
  stormycsvr: Users,
}

export default async function Home() {
  const [latest] = await getPressReleases()
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 sm:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="bg-dots absolute inset-0 mask-[radial-gradient(ellipse_at_70%_35%,black,transparent_65%)] opacity-70" />
          <div className="absolute top-[5%] right-[2%] h-136 w-136 rounded-full bg-primary/25 blur-[160px]" />
          <div className="absolute top-[30%] right-[25%] h-96 w-96 rounded-full bg-violet/20 blur-[140px]" />
        </div>

        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-6">
            <div>
              <Link
                href="/press"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white/4 py-1 pr-3.5 pl-1 text-xs text-muted-foreground ring-1 ring-line backdrop-blur transition hover:bg-white/8 hover:text-foreground"
              >
                <span className="bg-brand rounded-full px-2.5 py-1 text-[0.68rem] font-semibold text-white">
                  New
                </span>
                <span className="max-w-[15rem] truncate sm:max-w-md">
                  {latest.title}
                </span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <h1 className="display mt-8 text-[2.9rem] sm:text-7xl lg:text-[5.4rem] xl:text-[6.4rem]">
                Tracking the <em>next wave</em> of immersive technology
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
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
                  className={buttonVariants({ size: "xl", variant: "outline" })}
                >
                  About StormXR
                </Link>
              </div>
            </div>
            <Planes className="mx-auto w-full max-w-sm lg:max-w-none" />
          </div>

          <div className="glass mt-14 grid overflow-hidden sm:mt-20 md:grid-cols-[1fr_1fr_1fr_1.6fr]">
            {facts.map((f) => (
              <dl
                key={f.label}
                className="flex flex-row-reverse items-end justify-end gap-4 border-b border-line p-6 md:flex-col-reverse md:items-start md:gap-2 md:border-r md:border-b-0 md:p-7"
              >
                <dt className="pb-1.5 text-sm leading-snug text-muted-foreground md:pb-0">
                  {f.label}
                </dt>
                <dd className="display text-gradient text-5xl">{f.value}</dd>
              </dl>
            ))}
            <a
              href={latest.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between gap-4 p-6 transition-colors hover:bg-white/3 md:p-7"
            >
              <span className="label flex items-center justify-between text-muted-foreground">
                Latest release
                <ArrowUpRight className="size-4 text-signal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="leading-snug font-medium">{latest.title}</span>
            </a>
          </div>
        </Container>
      </section>

      {/* Topic ticker */}
      <Container className="mt-16 sm:mt-20">
        <div
          className="glass overflow-hidden rounded-full mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-4"
          aria-label="Topics we cover"
        >
          <div className="animate-marquee flex w-max">
            {[...topics, ...topics].map((t, i) => (
              <span
                key={i}
                aria-hidden={i >= topics.length}
                className="display flex items-center text-xl whitespace-nowrap sm:text-2xl"
              >
                <span className="px-7">{t}</span>
                <span className="text-gradient">✳</span>
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* 01 — What we do (bento) */}
      <section className="pt-24 sm:pt-32">
        <Container>
          <SectionRule index="01" label="What we do" />
          <div className="reveal mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <SectionHeading
              title={
                <>
                  One platform for where XR is <em>headed next</em>
                </>
              }
            />
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Writing, analysis, media, partnerships, and hands-on product
              development — focused on practical adoption and real-world impact,
              not hype.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
            {/* Media — tall tile */}
            <Link
              href="/media-projects"
              className="glass reveal group relative flex flex-col overflow-hidden p-7 outline-none sm:p-9 lg:row-span-2"
            >
              <div className="flex items-center justify-between">
                <span className="icon-tile size-12">
                  <Megaphone className="size-5" />
                </span>
                <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
              </div>
              <h3 className="display mt-10 text-4xl sm:text-5xl">Media</h3>
              <p className="mt-4 max-w-md text-muted-foreground">
                Editorial analysis, a podcast, and a creator community — three
                channels covering where XR is actually headed.
              </p>
              <ul className="mt-auto space-y-2 pt-10">
                {platforms.map((p) => {
                  const Icon = platformIcons[p.slug]
                  return (
                    <li
                      key={p.slug}
                      className="flex items-center gap-4 rounded-xl bg-white/3 p-3 ring-1 ring-line"
                    >
                      <span className="icon-tile size-10 rounded-lg">
                        <Icon className="size-4" />
                      </span>
                      <span className="flex-1 font-medium">{p.name}</span>
                      <span className="label hidden text-[0.6rem] text-muted-foreground sm:block">
                        {p.kind}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Link>

            {/* Development — with the shipped app icons */}
            <Link
              href="/development"
              className="glass reveal group relative flex flex-col overflow-hidden p-7 outline-none sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="icon-tile size-12">
                  <Code className="size-5" />
                </span>
                <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <h3 className="display text-4xl">Development</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Native iOS and Android apps, Meta Quest experiences, and
                    fast modern web platforms — designed and shipped in-house.
                  </p>
                </div>
                <div className="flex -space-x-3">
                  {apps.map((app, i) => (
                    <Image
                      key={app.slug}
                      src={app.icon}
                      alt=""
                      width={56}
                      height={56}
                      style={{ transitionDelay: `${i * 40}ms` }}
                      className="size-14 rounded-2xl object-cover shadow-lg ring-2 shadow-black/40 ring-background transition-transform duration-300 group-hover:-translate-y-1.5"
                    />
                  ))}
                </div>
              </div>
            </Link>

            {/* Advisory */}
            <Link
              href="/advisory"
              className="glass reveal group relative flex flex-col overflow-hidden p-7 outline-none sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="icon-tile size-12">
                  <Compass className="size-5" />
                </span>
                <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
              </div>
              <h3 className="display mt-8 text-4xl">Advisory</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Grounded perspective on XR markets, immersive media strategy,
                and how to talk about emerging tech without the hype.
              </p>
            </Link>
          </div>
        </Container>
      </section>

      {/* 02 — Media platforms */}
      <section className="pt-24 sm:pt-32">
        <Container>
          <SectionRule index="02" label="Media & content" />
          <div className="reveal mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
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
          <div className="mt-14 space-y-4">
            {platforms.map((p, i) => (
              <div key={p.slug} className="reveal">
                <PlatformCard platform={p} index={i} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — Apps */}
      <section className="pt-24 sm:pt-32">
        <Container>
          <SectionRule index="03" label="Built by StormXR" />
          <div className="reveal mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
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

      {/* 04 — People */}
      <section className="pt-24 sm:pt-32">
        <Container>
          <SectionRule index="04" label="The team" />
          <SectionHeading
            className="reveal mt-10"
            title={
              <>
                Industry perspective meets <em>hands-on building</em>
              </>
            }
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {people.map((person, i) => (
              <article
                key={person.name}
                className="glass reveal flex flex-col p-2"
              >
                <div className="relative isolate flex h-48 items-end justify-between overflow-hidden rounded-[1.4rem] p-6">
                  <div
                    aria-hidden
                    className="bg-dots absolute inset-0 -z-10 opacity-50"
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute -top-20 -z-10 h-56 w-72 rounded-full blur-[70px]",
                      i % 2
                        ? "-left-10 bg-violet/35"
                        : "-right-10 bg-primary/40"
                    )}
                  />
                  <span className="label rounded-full bg-background/50 px-3 py-1.5 text-signal ring-1 ring-line backdrop-blur">
                    {person.role}
                  </span>
                  <span
                    aria-hidden
                    className="display text-[8rem] leading-[0.75] text-transparent [-webkit-text-stroke:1px_color-mix(in_oklch,var(--signal)_55%,transparent)]"
                  >
                    {person.initials}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="display text-3xl">{person.name}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {person.short}
                  </p>
                  <div className="mt-6 flex gap-6 text-sm">
                    <Link
                      href={`/about#${person.name.split(" ")[0].toLowerCase()}`}
                      className="group inline-flex items-center gap-1.5 font-medium text-signal"
                    >
                      Full bio
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
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

      {/* 05 — Press */}
      <section className="pt-24 sm:pt-32">
        <Container>
          <SectionRule index="05" label="In the news" />
          <div className="reveal mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title="Latest announcements" />
            <Link
              href="/press"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-signal"
            >
              All press releases
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
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
