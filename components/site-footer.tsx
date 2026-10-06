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
    <footer className="relative mt-24 border-t border-white/8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
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
                  className="flex size-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-primary/40"
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
            <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            Designed and developed by{" "}
            <a
              href="https://www.linkedin.com/in/justin-storm-0208783b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary"
            >
              Justin Storm
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
