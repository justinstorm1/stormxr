import type { Metadata } from "next"

import { PolicyDocument } from "@/components/policy-document"
import { pageMetadata } from "@/lib/metadata"
import { termsOfUse } from "@/lib/site-legal"

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that govern your use of stormxr.tech.",
  path: "/terms",
})

export default function TermsPage() {
  return <PolicyDocument policy={termsOfUse} eyebrow="Legal" />
}
