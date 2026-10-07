"use client"

import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react"
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 rounded-2xl pr-3 pl-4 transition-all duration-300 sm:pl-5",
          scrolled || open
            ? "bg-background/70 shadow-[inset_0_0_0_1px_var(--line),inset_0_1px_0_0_oklch(1_0_0/8%),0_20px_50px_-20px_oklch(0_0_0/70%)] backdrop-blur-2xl"
            : "bg-transparent"
        )}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5 rounded-full p-1 ring-1 ring-line">
            {nav.map((item, i) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring lg:px-4",
                      active
                        ? "bg-white/8 text-foreground shadow-[inset_0_1px_0_0_oklch(1_0_0/8%)]"
                        : "text-muted-foreground hover:bg-white/4 hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[0.62rem]",
                        active ? "text-gradient" : "text-muted-foreground/60"
                      )}
                    >
                      0{i + 1}
                    </span>
                    {item.label}
                    {active && (
                      <span
                        aria-hidden
                        className="bg-brand absolute inset-x-5 -bottom-1 h-0.5 rounded-full"
                      />
                    )}
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
              buttonVariants({ size: "pill" }),
              "hidden sm:inline-flex"
            )}
          >
            Contact
            <ArrowUpRight data-icon="inline-end" />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground ring-1 ring-line outline-none hover:bg-white/8 focus-visible:ring-3 focus-visible:ring-ring md:hidden"
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
        className="glass mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-7xl overflow-y-auto bg-background/90 p-2 md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {[
              { href: "/", label: "Home" },
              ...nav,
              { href: "/contact", label: "Contact" },
            ].map((item, i) => {
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
                      "group flex items-center gap-4 rounded-xl px-4 py-4 transition-colors",
                      active
                        ? "bg-white/6 text-foreground"
                        : "text-muted-foreground hover:bg-white/4 hover:text-foreground"
                    )}
                  >
                    <span className="text-gradient font-mono text-xs">
                      0{i}
                    </span>
                    <span className="display flex-1 text-3xl">
                      {item.label}
                    </span>
                    <ArrowRight
                      className={cn(
                        "size-5 transition-transform group-hover:translate-x-1",
                        active ? "text-signal" : "text-muted-foreground"
                      )}
                    />
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
