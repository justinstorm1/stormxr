"use client"

import { ArrowRight, CircleAlert, CircleCheck, Loader } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Script from "next/script"
import { useActionState, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { contactTopics } from "@/lib/site"
import { cn } from "@/lib/utils"

import { sendContact, type ContactState } from "./actions"

const inputClass =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 transition outline-none focus:border-signal focus:ring-3 focus:ring-ring/25 aria-invalid:border-destructive/70 sm:text-sm"

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="label mb-2.5 flex justify-between text-muted-foreground"
      >
        {label}
        {optional && (
          <span className="font-normal text-muted-foreground">Optional</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string
          theme?: "dark" | "light"
          callback?: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
        }
      ) => number
      reset: (id?: number) => void
    }
  }
}

function Recaptcha({
  siteKey,
  resetKey,
  onChange,
}: {
  siteKey: string
  resetKey: unknown
  onChange: (verified: boolean) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetId = useRef<number | null>(null)
  const [loaded, setLoaded] = useState(
    () => typeof window !== "undefined" && !!window.grecaptcha?.render
  )

  useEffect(() => {
    const g = window.grecaptcha
    const el = ref.current
    if (!loaded || !g || !el) return
    g.ready(() => {
      if (widgetId.current !== null || !el.isConnected) return
      widgetId.current = g.render(el, {
        sitekey: siteKey,
        theme: "dark",
        callback: () => onChange(true),
        "expired-callback": () => onChange(false),
        "error-callback": () => onChange(false),
      })
    })
  }, [loaded, siteKey, onChange])

  // Tokens are single-use, so a fresh check is needed after every attempt.
  useEffect(() => {
    if (widgetId.current === null) return
    window.grecaptcha?.reset(widgetId.current)
    onChange(false)
  }, [resetKey, onChange])

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setLoaded(true)}
      />
      <div ref={ref} className="min-h-[78px]" />
    </>
  )
}

export function ContactForm({
  recaptchaSiteKey,
}: {
  recaptchaSiteKey: string
}) {
  const searchParams = useSearchParams()
  const requestedTopic = searchParams.get("topic")
  const defaultTopic = contactTopics.some((t) => t.value === requestedTopic)
    ? requestedTopic!
    : "general"

  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendContact,
    { status: "idle" }
  )

  const [verified, setVerified] = useState(false)

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-10">
        <span className="icon-tile size-12">
          <CircleCheck className="size-6 text-signal" />
        </span>
        <h2 className="display text-4xl">Message sent</h2>
        <p className="text-muted-foreground">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    )
  }

  const v = state.values ?? {}
  const err = state.errors ?? {}

  return (
    <form key={defaultTopic} action={action} noValidate className="space-y-5">
      {state.message && (
        <p
          role="alert"
          className="flex gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={err.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={v.name}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v.email}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone" optional>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={v.phone}
            className={inputClass}
          />
        </Field>
        <Field label="What's this about?" htmlFor="topic">
          <select
            id="topic"
            name="topic"
            defaultValue={v.topic ?? defaultTopic}
            className={cn(
              inputClass,
              "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23a3aac2%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] appearance-none bg-position-[right_1rem_center] bg-no-repeat pr-10"
            )}
          >
            {contactTopics.map((t) => (
              <option key={t.value} value={t.value} className="bg-popover">
                {t.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" htmlFor="message" error={err.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={v.message}
          placeholder="Tell us about your project, idea, or question…"
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-error" : undefined}
          className={cn(inputClass, "resize-y")}
        />
      </Field>

      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Leave this field empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Recaptcha
        siteKey={recaptchaSiteKey}
        resetKey={state}
        onChange={setVerified}
      />

      <Button
        type="submit"
        size="xl"
        disabled={pending || !verified}
        className="w-full sm:w-auto"
      >
        {pending ? (
          <>
            <Loader className="animate-spin" data-icon="inline-start" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight data-icon="inline-end" />
          </>
        )}
      </Button>
    </form>
  )
}
