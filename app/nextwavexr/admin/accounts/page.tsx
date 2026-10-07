"use client"

import { useAction, useMutation, useQuery } from "convex/react"
import { ConvexError } from "convex/values"
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Loader,
  RefreshCw,
  Trash2,
  UserPlus,
  X,
} from "lucide-react"
import * as React from "react"

import { Field, Input, Notice } from "@/components/admin/fields"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"

type Account = NonNullable<
  ReturnType<typeof useQuery<typeof api.accounts.listAccounts>>
>[number]

const MIN_LENGTH = 8

const iconButton =
  "inline-flex h-10 items-center gap-2 rounded-xl px-3.5 text-sm text-muted-foreground ring-1 ring-line transition hover:bg-white/8 hover:text-foreground disabled:opacity-50"

function errorMessage(e: unknown, fallback: string) {
  if (e instanceof ConvexError && typeof e.data === "string") return e.data
  console.error(e)
  return fallback
}

function generatePassword() {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*"
  const bytes = crypto.getRandomValues(new Uint32Array(16))
  return Array.from(bytes, (n) => chars[n % chars.length]).join("")
}

function formatDate(ms: number | null) {
  if (!ms) return "Never"
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function PasswordInput({
  id,
  value,
  onChange,
  autoComplete,
  withGenerate,
}: {
  id: string
  value: string
  onChange: (value: string) => void
  autoComplete: string
  withGenerate?: boolean
}) {
  const [visible, setVisible] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const side =
    "flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"

  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required
        minLength={MIN_LENGTH}
        className={cn("font-mono", withGenerate ? "pr-32" : "pr-12")}
      />
      <div className="absolute inset-y-0 right-1 flex">
        {withGenerate && (
          <>
            <button
              type="button"
              className={side}
              aria-label="Generate a strong password"
              title="Generate"
              onClick={() => {
                onChange(generatePassword())
                setVisible(true)
              }}
            >
              <RefreshCw className="size-4" />
            </button>
            <button
              type="button"
              className={side}
              aria-label="Copy password"
              title="Copy"
              disabled={!value}
              onClick={async () => {
                await navigator.clipboard.writeText(value)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
            >
              {copied ? (
                <Check className="size-4 text-signal" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </>
        )}
        <button
          type="button"
          className={side}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  )
}

export default function AccountsPage() {
  const accounts = useQuery(api.accounts.listAccounts)
  const [adding, setAdding] = React.useState(false)
  const [notice, setNotice] = React.useState<string | null>(null)

  if (accounts === undefined) {
    return (
      <div className="flex justify-center py-24">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const me = accounts.find((a) => a.isYou)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="display text-4xl sm:text-5xl">
            <em>Accounts</em>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Everyone listed here has full admin access.
          </p>
        </div>
        {!adding && (
          <Button size="xl" onClick={() => setAdding(true)}>
            <UserPlus data-icon="inline-start" />
            Add account
          </Button>
        )}
      </div>

      {notice && <Notice tone="success">{notice}</Notice>}

      {adding && (
        <CreateAccountForm
          onDone={(email) => {
            setAdding(false)
            if (email) setNotice(`Account created for ${email}.`)
          }}
        />
      )}

      {me && <ChangePasswordCard email={me.email} onNotice={setNotice} />}

      <section>
        <h2 className="label mb-4 text-muted-foreground">
          All accounts · {accounts.length}
        </h2>
        <ul className="space-y-3">
          {accounts.map((a) => (
            <AccountRow key={a._id} account={a} onNotice={setNotice} />
          ))}
        </ul>
      </section>
    </div>
  )
}

function CreateAccountForm({
  onDone,
}: {
  onDone: (createdEmail?: string) => void
}) {
  const create = useAction(api.accounts.createAccount)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    try {
      await create({ email, password, name })
      onDone(email.trim())
    } catch (err) {
      setError(errorMessage(err, "Couldn't create the account."))
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-5 p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="display text-2xl">New account</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Share the password with them privately — they can change it after
            signing in.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onDone()}
          aria-label="Cancel"
          className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </div>
      {error && <Notice tone="error">{error}</Notice>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="new-name" hint="Optional">
          <Input
            id="new-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </Field>
        <Field label="Email" htmlFor="new-email">
          <Input
            id="new-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
        </Field>
      </div>
      <Field
        label="Password"
        htmlFor="new-password"
        hint={`At least ${MIN_LENGTH} characters`}
      >
        <PasswordInput
          id="new-password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          withGenerate
        />
      </Field>
      <Button type="submit" size="xl" disabled={pending}>
        {pending ? (
          <Loader className="animate-spin" data-icon="inline-start" />
        ) : (
          <UserPlus data-icon="inline-start" />
        )}
        Create account
      </Button>
    </form>
  )
}

function ChangePasswordCard({
  email,
  onNotice,
}: {
  email: string
  onNotice: (message: string | null) => void
}) {
  const change = useAction(api.accounts.changeMyPassword)
  const [open, setOpen] = React.useState(false)
  const [current, setCurrent] = React.useState("")
  const [next, setNext] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  function close() {
    setOpen(false)
    setCurrent("")
    setNext("")
    setConfirm("")
    setError(null)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (next !== confirm) {
      setError("New passwords don't match.")
      return
    }
    setPending(true)
    setError(null)
    try {
      await change({ currentPassword: current, newPassword: next })
      close()
      onNotice("Password changed. Your other devices have been signed out.")
    } catch (err) {
      setError(errorMessage(err, "Couldn't change your password."))
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="glass p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="label text-muted-foreground">Your account</h2>
          <p className="mt-2 font-medium break-all">{email}</p>
        </div>
        {!open && (
          <button
            type="button"
            className={iconButton}
            onClick={() => {
              onNotice(null)
              setOpen(true)
            }}
          >
            <KeyRound className="size-4" />
            Change password
          </button>
        )}
      </div>

      {open && (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          {error && <Notice tone="error">{error}</Notice>}
          <Field label="Current password" htmlFor="current-password">
            <PasswordInput
              id="current-password"
              value={current}
              onChange={setCurrent}
              autoComplete="current-password"
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="New password"
              htmlFor="next-password"
              hint={`${MIN_LENGTH}+ characters`}
            >
              <PasswordInput
                id="next-password"
                value={next}
                onChange={setNext}
                autoComplete="new-password"
              />
            </Field>
            <Field label="Confirm new password" htmlFor="confirm-password">
              <PasswordInput
                id="confirm-password"
                value={confirm}
                onChange={setConfirm}
                autoComplete="new-password"
              />
            </Field>
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="xl" disabled={pending}>
              {pending && (
                <Loader className="animate-spin" data-icon="inline-start" />
              )}
              Update password
            </Button>
            <Button type="button" size="xl" variant="outline" onClick={close}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </section>
  )
}

function AccountRow({
  account,
  onNotice,
}: {
  account: Account
  onNotice: (message: string | null) => void
}) {
  const reset = useAction(api.accounts.resetPassword)
  const remove = useMutation(api.accounts.deleteAccount)
  const [mode, setMode] = React.useState<"idle" | "reset" | "delete">("idle")
  const [password, setPassword] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const id = account._id as Id<"users">
  const label = account.name || account.email

  function cancel() {
    setMode("idle")
    setPassword("")
    setError(null)
  }

  async function run(action: () => Promise<unknown>, done: string) {
    setPending(true)
    setError(null)
    onNotice(null)
    try {
      await action()
      cancel()
      onNotice(done)
    } catch (err) {
      setError(errorMessage(err, "Something went wrong. Please try again."))
    } finally {
      setPending(false)
    }
  }

  return (
    <li className="glass p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span
          aria-hidden
          className="bg-brand flex size-11 shrink-0 items-center justify-center rounded-full font-semibold text-white"
        >
          {label.charAt(0).toUpperCase()}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium break-all">{account.email}</p>
            {account.isYou && (
              <span className="label rounded-full bg-primary/15 px-2.5 py-1 text-[0.6rem] text-signal ring-1 ring-primary/40">
                You
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {account.name && <>{account.name} · </>}
            Last sign-in {formatDate(account.lastSignIn)} ·{" "}
            {account.activeSessions} active{" "}
            {account.activeSessions === 1 ? "session" : "sessions"}
          </p>
        </div>

        {!account.isYou && mode === "idle" && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              className={iconButton}
              onClick={() => setMode("reset")}
            >
              <KeyRound className="size-4" />
              Reset password
            </button>
            <button
              type="button"
              aria-label={`Delete ${account.email}`}
              title="Delete account"
              onClick={() => setMode("delete")}
              className={cn(
                iconButton,
                "w-10 justify-center px-0 hover:text-destructive"
              )}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}

        {mode === "delete" && (
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Delete this account?
            </span>
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                run(() => remove({ userId: id }), `Deleted ${account.email}.`)
              }
              className="inline-flex h-10 items-center rounded-xl bg-destructive/15 px-3.5 text-sm text-destructive ring-1 ring-destructive/40 transition hover:bg-destructive/25"
            >
              {pending ? <Loader className="size-4 animate-spin" /> : "Delete"}
            </button>
            <button type="button" onClick={cancel} className={iconButton}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4">
          <Notice tone="error">{error}</Notice>
        </div>
      )}

      {mode === "reset" && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            run(
              () => reset({ userId: id, newPassword: password }),
              `Password reset for ${account.email}. They've been signed out everywhere — share the new password with them privately.`
            )
          }}
          className="mt-5 space-y-4 border-t border-line pt-5"
        >
          <Field
            label={`New password for ${account.email}`}
            htmlFor={`reset-${account._id}`}
            hint={`${MIN_LENGTH}+ characters`}
          >
            <PasswordInput
              id={`reset-${account._id}`}
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              withGenerate
            />
          </Field>
          <div className="flex gap-2">
            <Button type="submit" size="xl" disabled={pending}>
              {pending && (
                <Loader className="animate-spin" data-icon="inline-start" />
              )}
              Set new password
            </Button>
            <Button type="button" size="xl" variant="outline" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </li>
  )
}
