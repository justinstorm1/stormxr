import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "StormXR privacy policies"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Legal",
    title: "Privacy policies",
    subtitle: "Apps and experiences by StormXR, LLC",
  })
}
