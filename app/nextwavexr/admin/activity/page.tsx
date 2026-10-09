"use client"

import { usePaginatedQuery } from "convex/react"
import {
  CalendarClock,
  Clock,
  Eye,
  EyeOff,
  KeyRound,
  Loader,
  Pencil,
  Plus,
  Trash2,
  UserMinus,
  UserPlus,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import type { ActivityAction } from "@/convex/activity"
import type { Doc } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 30

const actions: Record<
  ActivityAction,
  { verb: string; icon: LucideIcon; tone?: "good" | "bad" }
> = {
  "article.create": { verb: "created", icon: Plus },
  "article.update": { verb: "edited", icon: Pencil },
  "article.publish": { verb: "published", icon: Eye, tone: "good" },
  "article.unpublish": { verb: "unpublished", icon: EyeOff },
  "article.schedule": { verb: "scheduled", icon: CalendarClock },
  "article.autopublish": {
    verb: "published on schedule",
    icon: Clock,
    tone: "good",
  },
  "article.delete": { verb: "deleted", icon: Trash2, tone: "bad" },
  "account.create": { verb: "added the account", icon: UserPlus },
  "account.delete": {
    verb: "removed the account",
    icon: UserMinus,
    tone: "bad",
  },
  "account.resetPassword": {
    verb: "reset the password for",
    icon: KeyRound,
  },
  "message.delete": {
    verb: "deleted the message from",
    icon: Trash2,
    tone: "bad",
  },
  "account.changePassword": {
    verb: "changed their password",
    icon: KeyRound,
  },
}

function formatWhen(ms: number) {
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function dayLabel(ms: number) {
  const day = new Date(ms).toDateString()
  const today = new Date()
  if (day === today.toDateString()) return "Today"
  today.setDate(today.getDate() - 1)
  if (day === today.toDateString()) return "Yesterday"
  return new Date(ms).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function ActivityPage() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.activity.list,
    {},
    { initialNumItems: PAGE_SIZE }
  )

  if (status === "LoadingFirstPage") {
    return (
      <div className="flex justify-center py-24">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Group consecutive entries by calendar day.
  const days: { label: string; entries: Doc<"activity">[] }[] = []
  for (const entry of results) {
    const label = dayLabel(entry._creationTime)
    if (days.at(-1)?.label !== label) days.push({ label, entries: [] })
    days.at(-1)!.entries.push(entry)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="display text-4xl sm:text-5xl">
          <em>Activity</em>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Who changed what in the admin, newest first.
        </p>
      </div>

      {results.length === 0 ? (
        <p className="glass p-10 text-center text-muted-foreground">
          Nothing yet — changes to articles and accounts will show up here.
        </p>
      ) : (
        days.map((day) => (
          <section key={day.label}>
            <h2 className="label mb-3 text-muted-foreground">{day.label}</h2>
            <ul className="glass divide-y divide-line">
              {day.entries.map((entry) => (
                <ActivityRow key={entry._id} entry={entry} />
              ))}
            </ul>
          </section>
        ))
      )}

      {status !== "Exhausted" && results.length > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            disabled={status === "LoadingMore"}
            onClick={() => loadMore(PAGE_SIZE)}
            className={buttonVariants({ size: "xl", variant: "outline" })}
          >
            {status === "LoadingMore" ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              "Load older activity"
            )}
          </button>
        </div>
      )}
    </div>
  )
}

function ActivityRow({ entry }: { entry: Doc<"activity"> }) {
  const meta = actions[entry.action as ActivityAction] ?? {
    verb: entry.action,
    icon: Pencil,
  }
  const actor = entry.actorId
    ? (entry.actorEmail ?? "A deleted account")
    : "System"
  const isArticle = entry.action.startsWith("article.")
  const isSelf = entry.action === "account.changePassword"
  const editHref =
    isArticle && entry.action !== "article.delete" && entry.targetId
      ? `/nextwavexr/admin/edit/${entry.targetId}`
      : undefined
  const title = entry.targetTitle ?? "an untitled item"

  return (
    <li className="flex items-start gap-4 p-4">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-line",
          meta.tone === "good" && "bg-primary/15 text-signal",
          meta.tone === "bad" && "bg-destructive/15 text-destructive",
          !meta.tone && "bg-white/4 text-muted-foreground"
        )}
      >
        <meta.icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-relaxed">
          <span className="font-medium">{actor}</span>{" "}
          <span className="text-muted-foreground">{meta.verb}</span>
          {!isSelf && (
            <>
              {" "}
              {editHref ? (
                <Link
                  href={editHref}
                  className="font-medium text-signal hover:underline"
                >
                  {isArticle ? `“${title}”` : title}
                </Link>
              ) : (
                <span className="font-medium">
                  {isArticle ? `“${title}”` : title}
                </span>
              )}
            </>
          )}
        </p>
        {(entry.detail || entry.scheduledFor) && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {entry.scheduledFor
              ? `Goes live ${formatWhen(entry.scheduledFor)}`
              : entry.detail}
          </p>
        )}
      </div>
      <time
        dateTime={new Date(entry._creationTime).toISOString()}
        title={formatWhen(entry._creationTime)}
        className="shrink-0 text-xs text-muted-foreground tabular-nums"
      >
        {new Date(entry._creationTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </time>
    </li>
  )
}
