import { legalDocumentToText, termsOfUse } from "@/lib/site-legal"

// Plain-text Terms of Use, for pasting into App Store Connect
// (App Information → License Agreement).
export const dynamic = "force-static"

export function GET() {
  return new Response(legalDocumentToText(termsOfUse), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
