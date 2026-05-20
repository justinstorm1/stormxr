import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { title } from "process";
import Providers from "@/components/Providers";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const metadata: Metadata = {
  title: "StormXR",
  description: "A powerful and intuitive tool for managing your cloud infrastructure.",
  icons: {
    icon: "/images/StormXRLogo.png",
    apple: "/images/StormXRLogo.png",
  },
  openGraph: {
    title: "StormXR",
    description: "A powerful and intuitive tool for managing your cloud infrastructure.",
    url: "https://www.stormxr.com",
    images: [
      {
        url: "/images/StormXRLogo.png",
        width: 1200,
        height: 630,
      },
    ],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
