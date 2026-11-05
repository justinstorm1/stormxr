import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PolicyDocument } from "@/components/policy-document"
import { pageMetadata } from "@/lib/metadata"
import { privacyPolicies } from "@/lib/privacy-policies"

export const dynamicParams = false

export function generateStaticParams() {
  return privacyPolicies.map((p) => ({ slug: p.slug }))
}

function getPolicy(slug: string) {
  return privacyPolicies.find((p) => p.slug === slug)
}

export async function generateMetadata(
  props: PageProps<"/privacy-policy/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params
  const policy = getPolicy(slug)
  if (!policy) return {}
  return pageMetadata({
    title: `${policy.name} Privacy Policy`,
    description: `Privacy policy for ${policy.name} by StormXR, LLC.`,
    path: `/privacy-policy/${policy.slug}`,
  })
}

export default async function PrivacyPolicyPage(
  props: PageProps<"/privacy-policy/[slug]">
) {
  const { slug } = await props.params
  const policy = getPolicy(slug)
  if (!policy) notFound()

  return (
    <PolicyDocument
      policy={policy}
      eyebrow="Privacy policy"
      back={{ href: "/privacy-policy", label: "All privacy policies" }}
    />
  )
}
