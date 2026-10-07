import { ogContentType, ogSize, renderOgImage } from "@/lib/og"
import { privacyPolicies } from "@/lib/privacy-policies"

export const alt = "StormXR app privacy policy"
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return privacyPolicies.map((p) => ({ slug: p.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const policy = privacyPolicies.find((p) => p.slug === slug)
  return renderOgImage({
    eyebrow: "Privacy policy",
    title: policy?.name ?? "Privacy policy",
    subtitle: policy ? `Effective ${policy.effectiveDate}` : undefined,
  })
}
