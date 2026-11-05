import type { Metadata } from "next"

import { PolicyDocument } from "@/components/policy-document"
import { pageMetadata } from "@/lib/metadata"
import { sitePrivacyPolicy } from "@/lib/site-legal"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How StormXR, LLC collects, uses, and protects information on stormxr.tech.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return <PolicyDocument policy={sitePrivacyPolicy} eyebrow="Legal" />
}
