import { ogContentType, ogSize, renderOgImage } from "@/lib/og"
import { sitePrivacyPolicy } from "@/lib/site-legal"

export const alt = "StormXR privacy policy"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Legal",
    title: "Privacy Policy",
    subtitle: `Effective ${sitePrivacyPolicy.effectiveDate}`,
  })
}
