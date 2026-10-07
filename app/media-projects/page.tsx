import type { Metadata } from "next"

import { PlatformCard } from "@/components/platform-card"
import { Container, CtaBand, PageHero } from "@/components/section"
import { pageMetadata } from "@/lib/metadata"
import { platforms } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Media Projects",
  description:
    "NextWave XR, the VR Lens Podcast, and StormyCs VR — StormXR's editorial, audio, and creator channels covering immersive technology and spatial computing.",
  path: "/media-projects",
})

export default function MediaProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Media & content"
        title={
          <>
            Three platforms, <em>one vision</em>
          </>
        }
        description="StormXR's media presence spans editorial, audio, and social — all rooted in the same passion for immersive technology and spatial computing."
      />
      <Container>
        <div className="space-y-4 border-b border-line">
          {platforms.map((p, i) => (
            <div key={p.slug} className="reveal">
              <PlatformCard platform={p} index={i} expanded />
            </div>
          ))}
        </div>
      </Container>
      <CtaBand
        eyebrow="Work with us"
        title={
          <>
            Interested in a <em>media partnership?</em>
          </>
        }
        description="Whether it's sponsored content, editorial coverage, or a podcast appearance — reach out and let's talk about how StormXR's media channels can amplify your brand in the XR space."
        href="/contact?topic=media"
        cta="Get in touch"
      />
    </>
  )
}
