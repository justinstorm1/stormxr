import { ogContentType, ogSize, renderOgImage } from "@/lib/og"
import { termsOfUse } from "@/lib/site-legal"

export const alt = "StormXR terms of use"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Legal",
    title: "Terms of Use",
    subtitle: `Effective ${termsOfUse.effectiveDate}`,
  })
}
