import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import {
  Archivo,
  Geist_Mono,
  Roboto_Slab,
  Source_Serif_4,
} from "next/font/google"

import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { baseOpenGraph, feedAlternates } from "@/lib/metadata"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// Archivo's width axis powers the wide `.display` headline style.
const fontSans = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

// Optional article body fonts (see `articleFonts`); only articles use them,
// so they aren't preloaded on every page.
const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  preload: false,
})
const fontSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-slab",
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: feedAlternates,
  openGraph: baseOpenGraph,
  twitter: {
    card: "summary_large_image",
    site: "@StormyCsVR",
    creator: "@StormyCsVR",
  },
  // Icons come from app/favicon.ico, app/icon.png, and app/apple-icon.png.
}

export const viewport: Viewport = {
  themeColor: "#080a14",
  colorScheme: "dark",
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/images/StormXRLogoNoText.png`,
  email: site.email,
  founder: { "@type": "Person", name: "Craig Storm" },
  sameAs: [
    "https://www.youtube.com/@StormyCsVR",
    "https://x.com/StormyCsVR",
    "https://www.instagram.com/stormycsvr/",
    "https://www.linkedin.com/in/craig-storm/",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark antialiased",
        fontSans.variable,
        fontMono.variable,
        fontSerif.variable,
        fontSlab.variable
      )}
    >
      <body className="flex min-h-svh flex-col overflow-x-clip">
        <a
          href="#main"
          className="sr-only z-100 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1 pb-16 sm:pb-24">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  )
}
