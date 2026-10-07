import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "NextWave XR"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Editorial & analysis",
    title: "NextWave XR",
    subtitle: "XR writing and analysis by Craig Storm",
  })
}
