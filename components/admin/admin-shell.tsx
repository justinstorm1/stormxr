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

// `short` is the label under the icon in the phone-width tab bar.
const links = [
  {
    href: DASHBOARD_PATH,
    label: "Dashboard",
    short: "Articles",
    icon: LayoutGrid,
  },
  {
    href: "/nextwavexr/admin/create",
    label: "New article",
    short: "New",
    icon: Plus,
  },
  { href: MESSAGES_PATH, label: "Messages", short: "Inbox", icon: Mail },
  {
    href: "/nextwavexr/admin/accounts",
    label: "Accounts",
    short: "Users",
    icon: Users,
  },
  {
    href: "/nextwavexr/admin/activity",
    label: "Activity",
    short: "Activity",
    icon: Activity,
  },
]

/**
 * Number of unhandled contact messages. Pinned to the icon's corner in the
 * phone tab bar, inline after the label from `sm` up.
 */
function OpenMessagesBadge() {
  const count = useQuery(api.messages.openCount)
  if (!count) return null
  return (
    <span className="absolute top-0.5 left-1/2 ml-1.5 min-w-4.5 rounded-full bg-primary px-1 text-center text-[0.65rem] leading-4.5 font-medium text-primary-foreground tabular-nums ring-2 ring-card sm:static sm:ml-0 sm:min-w-5 sm:px-1.5 sm:text-xs sm:leading-5 sm:ring-0">
      {count > 99 ? "99+" : count}
      <span className="sr-only"> open</span>
    </span>
  )
}

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-signal/70"
const actionClass = cn(
  "inline-flex size-10 items-center justify-center gap-2 rounded-xl text-sm text-muted-foreground transition-colors hover:bg-white/4 hover:text-foreground sm:w-auto sm:px-3.5",
  focusRing
)

/** The admin brand, section tabs, and account actions. */
export function AdminNavBar({
  pathname,
  badge,
  onSignOut,
}: {
  pathname: string
  /** Shown on the Messages tab. */
  badge?: React.ReactNode
  onSignOut: () => void
}) {
  return (
    <div className="glass flex flex-wrap items-center gap-x-2 gap-y-2 p-2">
      <span className="label text-gradient order-1 shrink-0 px-3">
        NextWave admin
      </span>

      {/*
        Phones: a full-width row of equal icon-over-label tabs.
        sm–lg: a full-width row of inline tabs (scrolls if it must).
        lg+: sits on the same line as the brand and actions.
      */}
      <nav
        aria-label="Admin"
        className="order-3 grid w-full grid-cols-5 gap-1 sm:flex sm:[scrollbar-width:none] sm:overflow-x-auto lg:order-2 lg:w-auto lg:flex-1"
      >
        {links.map((l) => {
          const active = pathname.startsWith(l.href)
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[0.7rem] transition-colors sm:shrink-0 sm:flex-row sm:gap-2 sm:px-3.5 sm:text-sm sm:whitespace-nowrap",
                focusRing,
                active
                  ? "bg-white/8 text-foreground"
                  : "text-muted-foreground hover:bg-white/4 hover:text-foreground"
              )}
            >
              <l.icon className="size-4.5 shrink-0 sm:size-4" />
              <span className="max-w-full truncate sm:hidden">{l.short}</span>
              <span className="hidden sm:inline">{l.label}</span>
              {l.href === MESSAGES_PATH && badge}
            </Link>
          )
        })}
      </nav>

      <div className="order-2 ml-auto flex shrink-0 gap-1 lg:order-3 lg:ml-0">
        <Link
          href="/nextwavexr"
          target="_blank"
          aria-label="View site"
          title="View site"
          className={actionClass}
        >
          <ExternalLink className="size-4" />
          <span className="hidden sm:inline">View site</span>
        </Link>
        <button
          type="button"
          aria-label="Sign out"
          title="Sign out"
          onClick={onSignOut}
          className={actionClass}
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </div>
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
        <AdminNavBar
          pathname={pathname}
          badge={<OpenMessagesBadge />}
          onSignOut={async () => {
            await signOut()
            router.replace(LOGIN_PATH)
          }}
        />
        <div className="mt-8">{children}</div>
      </Container>
    </div>
  )
}
