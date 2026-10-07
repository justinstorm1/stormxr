import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container } from "@/components/section"
import { pageMetadata } from "@/lib/metadata"
import { privacyPolicies } from "@/lib/privacy-policies"

export const dynamicParams = false

export function generateStaticParams() {
  return privacyPolicies.map((p) => ({ slug: p.slug }))
}

function getPolicy(slug: string) {
  return privacyPolicies.find((p) => p.slug === slug)
}

export async function generateMetadata(
  props: PageProps<"/privacy-policy/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  const policy = getPolicy(slug)
  if (!policy) return {}
  return pageMetadata({
    title: `${policy.name} Privacy Policy`,
    description: `Privacy policy for ${policy.name} by StormXR, LLC.`,
    path: `/privacy-policy/${policy.slug}`,
  })
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-")

export default async function PrivacyPolicyPage(
  props: PageProps<"/privacy-policy/[slug]">
) {
  const { slug } = await props.params
  const policy = getPolicy(slug)
  if (!policy) notFound()

  return (
    <Container className="pt-32 sm:pt-40">
      <Link
        href="/privacy-policy"
        className="inline-flex items-center gap-1.5 rounded-full bg-white/4 py-2 pr-4 pl-3 text-sm text-muted-foreground ring-1 ring-line transition hover:bg-white/8 hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All privacy policies
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <p className="label text-signal">Privacy policy</p>
        <h1 className="display mt-5 text-5xl sm:text-6xl">{policy.name}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Effective date:{" "}
          <span className="text-foreground">{policy.effectiveDate}</span>
        </p>
      </header>

      <div className="grid gap-12 py-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="glass sticky top-28 space-y-2.5 p-5 text-sm">
            {policy.sections.map((s) => (
              <li key={s.heading}>
                <a
                  href={`#${slugify(s.heading)}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="max-w-2xl space-y-12">
          {policy.sections.map((section) => (
            <section key={section.heading} id={slugify(section.heading)}>
              <h2 className="display text-2xl">{section.heading}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-foreground/80">
                {section.blocks.map((block, i) =>
                  Array.isArray(block) ? (
                    <ul key={i} className="space-y-2 pl-1">
                      {block.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="bg-brand mt-2.5 size-1.5 shrink-0 rounded-full" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{renderLinks(block)}</p>
                  )
                )}
              </div>
            </section>
          ))}
        </article>
      </div>
    </Container>
  )
}

/** Turns the email and website lines in "Contact Us" into links. */
function renderLinks(text: string) {
  const email = text.match(/^Email: (\S+@\S+)$/)
  if (email) {
    return (
      <>
        Email:{" "}
        <a href={`mailto:${email[1]}`} className="text-signal hover:underline">
          {email[1]}
        </a>
      </>
    )
  }
  const site = text.match(/^Website: (https?:\/\/\S+)$/)
  if (site) {
    return (
      <>
        Website:{" "}
        <a href={site[1]} className="text-signal hover:underline">
          {site[1]}
        </a>
      </>
    )
  }
  return text
}
