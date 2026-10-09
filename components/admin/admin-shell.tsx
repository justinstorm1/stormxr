"use client"

import { useAuthActions } from "@convex-dev/auth/react"
import { useConvexAuth, useQuery } from "convex/react"
import {
  Activity,
  ExternalLink,
  LayoutGrid,
  Loader,
  LogOut,
  Mail,
  Plus,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import { Container } from "@/components/section"
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"

export const LOGIN_PATH = "/nextwavexr/admin"
export const DASHBOARD_PATH = "/nextwavexr/admin/dashboard"
const MESSAGES_PATH = "/nextwavexr/admin/messages"

const links = [
  { href: DASHBOARD_PATH, label: "Dashboard", icon: LayoutGrid },
  { href: "/nextwavexr/admin/create", label: "New article", icon: Plus },
  { href: MESSAGES_PATH, label: "Messages", icon: Mail },
  { href: "/nextwavexr/admin/accounts", label: "Accounts", icon: Users },
  { href: "/nextwavexr/admin/activity", label: "Activity", icon: Activity },
]

/** Number of unhandled contact messages, shown next to the nav link. */
function OpenMessagesBadge() {
  const count = useQuery(api.messages.openCount)
  if (!count) return null
  return (
    <span className="min-w-5 rounded-full bg-primary px-1.5 text-center text-xs leading-5 font-medium text-primary-foreground tabular-nums">
      {count}
    </span>
  )
}

/** Guards every admin page except login and renders the admin nav. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading } = useConvexAuth()
  const { signOut } = useAuthActions()
  const isLogin = pathname === LOGIN_PATH

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLogin) router.replace(LOGIN_PATH)
  }, [isAuthenticated, isLoading, isLogin, router])

  if (isLogin) return <>{children}</>

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[70svh] items-center justify-center pt-24">
        <Loader className="size-6 animate-spin text-muted-foreground" />
        <span className="sr-only">Loading</span>
      </div>
    )
  }

  return (
    <div className="pt-28 sm:pt-32">
      <Container>
        <div className="glass flex flex-col gap-3 p-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label text-gradient px-3">NextWave admin</span>
            <nav aria-label="Admin" className="flex flex-wrap gap-1">
              {links.map((l) => {
                const active = pathname.startsWith(l.href)
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm transition-colors",
                      active
                        ? "bg-white/8 text-foreground"
                        : "text-muted-foreground hover:bg-white/4 hover:text-foreground"
                    )}
                  >
                    <l.icon className="size-4" />
                    {l.label}
                    {l.href === MESSAGES_PATH && <OpenMessagesBadge />}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex gap-1">
            <Link
              href="/nextwavexr"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/4 hover:text-foreground"
            >
              <ExternalLink className="size-4" />
              View site
            </Link>
            <button
              type="button"
              onClick={async () => {
                await signOut()
                router.replace(LOGIN_PATH)
              }}
              className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/4 hover:text-foreground"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </div>
        <div className="mt-8">{children}</div>
      </Container>
    </div>
  )
}
