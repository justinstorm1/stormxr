"use client"

import { ArrowUpRight, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { Logo } from "@/components/logo"
import { buttonVariants } from "@/components/ui/button"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"

function isActive(pathname: string, href: string) {
  if (href === "/media-projects") {
    return ["/media-projects", "/nextwavexr", "/vrlens", "/stormycsvr"].some(
      (p) => pathname.startsWith(p)
    )
  }
  return pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = React.useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-3 pl-4 transition-all duration-300",
          scrolled || open
            ? "border-white/10 bg-background/70 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring",
                      active
                        ? "bg-white/8 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden rounded-full px-4 sm:inline-flex"
            )}
          >
            Contact
            <ArrowUpRight data-icon="inline-end" />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground outline-none hover:bg-white/8 focus-visible:ring-3 focus-visible:ring-ring md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-background/90 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {[
              { href: "/", label: "Home" },
              ...nav,
              { href: "/contact", label: "Contact" },
            ].map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg transition-colors",
                      active
                        ? "bg-white/8 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="size-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
