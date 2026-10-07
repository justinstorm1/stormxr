import type { Metadata } from "next"

import { PressList } from "@/components/press-list"
import { Container, CtaBand, PageHero } from "@/components/section"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Press Releases",
  description: "Official announcements from StormXR, syndicated via PRLog.",
  path: "/press",
})

export default function PressPage() {
  return (
    <>
      <PageHero
        eyebrow="Press"
        title={
          <>
            Press <em>releases</em>
          </>
        }
        description="Official announcements from StormXR, syndicated via PRLog."
      />
      <Container>
        <PressList />
      </Container>
      <CtaBand
        eyebrow="Media inquiries"
        title={
          <>
            Covering <em>StormXR?</em>
          </>
        }
        description="For interviews, assets, or comment on immersive technology, get in touch and we'll get back to you."
        href="/contact?topic=press"
        cta="Contact press"
      />
    </>
  )
}
