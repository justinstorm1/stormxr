import Image from "next/image"
import Link from "next/link"

import { Logo } from "@/components/logo"
import { site, stormycsSocials } from "@/lib/site"

const columns = [
  {
    title: "Media",
    links: [
      { href: "/media-projects", label: "Overview" },
      { href: "/nextwavexr", label: "NextWave XR" },
      { href: "/vrlens", label: "VR Lens Podcast" },
      { href: "/stormycsvr", label: "StormyCs VR" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { href: "/development", label: "Development" },
      { href: "/advisory", label: "Advisory" },
      { href: "/contact?topic=media", label: "Partnerships" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/press", label: "Press" },
      { href: "/privacy-policy", label: "Privacy policies" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="bg-brand pointer-events-none absolute inset-x-0 top-0 h-px mask-[linear-gradient(to_right,transparent,black,transparent)] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.6fr_repeat(3,1fr)] lg:px-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Tracking how immersive technology moves beyond gaming into media,
            wellness, communication, and everyday life.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social media">
            {stormycsSocials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`StormyCs VR on ${s.name}`}
                  className="flex size-10 items-center justify-center rounded-xl bg-white/3 ring-1 ring-line transition hover:-translate-y-0.5 hover:bg-white/8 hover:ring-line-strong"
                >
                  <Image
                    src={s.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="size-4.5 rounded-[4px] object-contain"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="label text-muted-foreground">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-signal"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p
        aria-hidden
        className="display pointer-events-none mx-auto -mb-[0.18em] max-w-7xl bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--signal)_40%,transparent),color-mix(in_oklch,var(--violet)_18%,transparent)_55%,transparent_85%)] bg-clip-text px-2 text-center text-[19.5vw] leading-none whitespace-nowrap text-transparent select-none xl:text-[16.5rem]"
      >
        StormXR
      </p>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            Designed and developed by{" "}
            <a
              href="https://www.linkedin.com/in/justin-storm-0208783b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-signal"
            >
              Justin Storm
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
