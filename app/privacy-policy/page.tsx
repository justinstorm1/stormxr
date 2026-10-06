import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Container, PageHero } from "@/components/section"
import { privacyPolicies } from "@/lib/privacy-policies"
import { apps } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy Policies",
  description:
    "Privacy policies for apps and experiences published by StormXR, LLC.",
  alternates: { canonical: "/privacy-policy" },
}

export default function PrivacyIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy <em>policies</em>
          </>
        }
        description="Select an app below to view its privacy policy."
      />
      <Container>
        <ul className="grid gap-3 sm:grid-cols-2">
          {privacyPolicies.map((p) => {
            const app = apps.find((a) => a.slug === p.slug)
            return (
              <li key={p.slug}>
                <Link
                  href={`/privacy-policy/${p.slug}`}
                  className="glass-card group flex items-center gap-4 p-5 outline-none focus-visible:ring-3 focus-visible:ring-ring"
                >
                  {app && (
                    <Image
                      src={app.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-xl ring-1 ring-white/10"
                    />
                  )}
                  <span className="flex-1">
                    <span className="block font-medium">{p.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      Effective {p.effectiveDate}
                    </span>
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
