import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "StormXR media projects"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Media & content",
    title: "Three platforms, one vision",
    subtitle: "NextWave XR · VR Lens Podcast · StormyCs VR",
  })
}
