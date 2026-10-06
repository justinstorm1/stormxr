import { ArrowUpRight, Mail } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { Container, PageHero } from "@/components/section"
import { site } from "@/lib/site"

import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project, a partnership opportunity, or just want to talk XR? Get in touch with StormXR.",
  alternates: { canonical: "/contact" },
}

const shortcuts = [
  { href: "/contact?topic=media", label: "Media partnerships & sponsorships" },
  { href: "/contact?topic=podcast", label: "Be a guest on VR Lens" },
  { href: "/contact?topic=advisory", label: "Book an advisory call" },
  { href: "/contact?topic=development", label: "Build an app or site" },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s start a <em>conversation</em>
          </>
        }
        description="Whether you have a project in mind, a partnership opportunity, or just want to talk XR — fill out the form and we'll get back to you."
      />
      <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="glass-card relative p-6 sm:p-10">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
        <aside className="space-y-10 lg:pt-4">
          <div>
            <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Email us directly
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-flex items-center gap-2 text-lg font-medium hover:text-primary"
            >
              <Mail className="size-5 text-primary" />
              {site.email}
            </a>
          </div>
          <div>
            <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Common requests
            </h2>
            <ul className="mt-3 divide-y divide-white/8 border-y border-white/8">
              {shortcuts.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    scroll={false}
                    className="group flex items-center justify-between py-3.5 text-sm text-foreground/85 hover:text-primary"
                  >
                    {s.label}
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </>
  )
}
