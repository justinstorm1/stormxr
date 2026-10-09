"use client"

import { useMutation, useQuery } from "convex/react"
import {
  Check,
  Loader,
  Mail,
  Phone,
  Reply,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react"
import * as React from "react"

import { Input, Notice } from "@/components/admin/fields"
import { api } from "@/convex/_generated/api"
import type { Doc } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"

type Filter = "open" | "handled" | "all"

function formatWhen(ms: number) {
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export default function MessagesPage() {
  const messages = useQuery(api.messages.list)
  const [filter, setFilter] = React.useState<Filter>("open")
  const [query, setQuery] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  if (messages === undefined) {
    return (
      <div className="flex justify-center py-24">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const counts = {
    open: messages.filter((m) => !m.completed).length,
    handled: messages.filter((m) => m.completed).length,
    all: messages.length,
  }
  const q = query.trim().toLowerCase()
  const shown = messages.filter(
    (m) =>
      (filter === "all" || m.completed === (filter === "handled")) &&
      (!q ||
        [m.name, m.email, m.subject, m.content].some((s) =>
          s.toLowerCase().includes(q)
        ))
  )

  const chip = (active: boolean) =>
    cn(
      "shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap ring-1 transition",
      active
        ? "bg-primary text-primary-foreground ring-primary"
        : "bg-white/4 text-muted-foreground ring-line hover:bg-white/8 hover:text-foreground"
    )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="display text-4xl sm:text-5xl">
          <em>Messages</em>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Submissions from the contact form, newest first.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="toolbar" aria-label="Filter messages" className="flex gap-2">
          {(["open", "handled", "all"] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={chip(filter === f)}
            >
              {f[0].toUpperCase() + f.slice(1)}{" "}
              <span className="opacity-60">{counts[f]}</span>
            </button>
          ))}
        </div>
        <div className="relative sm:w-80">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search messages"
            aria-label="Search messages"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-11"
          />
        </div>
      </div>

      {error && <Notice tone="error">{error}</Notice>}

      {shown.length === 0 ? (
        <p className="glass p-10 text-center text-muted-foreground">
          {messages.length === 0
            ? "No messages yet — contact form submissions will show up here."
            : q
              ? "No messages match your search."
              : filter === "open"
                ? "You're all caught up."
                : "No messages here."}
        </p>
      ) : (
        <ul className="space-y-3">
          {shown.map((m) => (
            <MessageCard key={m._id} message={m} onError={setError} />
          ))}
        </ul>
      )}
    </div>
  )
}

function MessageCard({
  message: m,
  onError,
}: {
  message: Doc<"messages">
  onError: (message: string | null) => void
}) {
  const setCompleted = useMutation(api.messages.setCompleted)
  const remove = useMutation(api.messages.remove)
  const [confirming, setConfirming] = React.useState(false)
  const [busy, setBusy] = React.useState(false)

  async function run(action: () => Promise<unknown>, failure: string) {
    setBusy(true)
    onError(null)
    try {
      await action()
    } catch (e) {
      console.error(e)
      onError(failure)
    } finally {
      setBusy(false)
    }
  }

  const replyHref = `mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`
  const button =
    "inline-flex h-10 items-center gap-2 rounded-xl px-3.5 text-sm text-muted-foreground ring-1 ring-line transition hover:bg-white/8 hover:text-foreground disabled:opacity-50"

  return (
    <li className={cn("glass p-5 sm:p-6", m.completed && "opacity-70")}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label rounded-full bg-primary/15 px-2.5 py-1 text-[0.6rem] text-signal ring-1 ring-primary/40">
              {m.subject}
            </span>
            {m.completed && (
              <span className="label rounded-full bg-white/5 px-2.5 py-1 text-[0.6rem] text-muted-foreground ring-1 ring-line">
                Handled
              </span>
            )}
          </div>
          <p className="mt-3 font-medium">{m.name}</p>
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a
              href={`mailto:${m.email}`}
              className="inline-flex items-center gap-1.5 text-signal hover:underline"
            >
              <Mail className="size-3.5" />
              {m.email}
            </a>
            {m.phoneNumber && (
              <a
                href={`tel:${m.phoneNumber.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-1.5 text-signal hover:underline"
              >
                <Phone className="size-3.5" />
                {m.phoneNumber}
              </a>
            )}
          </p>
        </div>
        <time
          dateTime={new Date(m._creationTime).toISOString()}
          className="shrink-0 text-sm text-muted-foreground"
        >
          {formatWhen(m._creationTime)}
        </time>
      </div>

      <p className="mt-4 rounded-xl border [border-left-width:3px] border-line border-l-violet bg-white/2 px-4 py-3 text-sm leading-relaxed break-words whitespace-pre-wrap text-foreground/90">
        {m.content}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {confirming ? (
          <>
            <span className="text-sm text-muted-foreground">
              Delete this message?
            </span>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                run(
                  () => remove({ messageId: m._id }),
                  "Couldn't delete the message."
                )
              }
              className="inline-flex h-10 items-center rounded-xl bg-destructive/15 px-3.5 text-sm text-destructive ring-1 ring-destructive/40 transition hover:bg-destructive/25"
            >
              {busy ? <Loader className="size-4 animate-spin" /> : "Delete"}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className={button}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <a href={replyHref} className={button}>
              <Reply className="size-4" />
              Reply
            </a>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                run(
                  () =>
                    setCompleted({ messageId: m._id, completed: !m.completed }),
                  "Couldn't update the message."
                )
              }
              className={button}
            >
              {m.completed ? (
                <RotateCcw className="size-4" />
              ) : (
                <Check className="size-4" />
              )}
              {m.completed ? "Reopen" : "Mark handled"}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className={cn(button, "hover:text-destructive")}
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}
