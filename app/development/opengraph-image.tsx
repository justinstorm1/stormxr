import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "StormXR development"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Development",
    title: "Built for modern digital experiences",
    subtitle: "Web · iOS & Android · Meta Quest",
  })
}
