"use client"

import { useAuthActions } from "@convex-dev/auth/react"
import { useConvexAuth } from "convex/react"
import { ArrowRight, Eye, EyeOff, Loader, Lock } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import * as React from "react"

import { DASHBOARD_PATH } from "@/components/admin/admin-shell"
import { Field, Input, Notice } from "@/components/admin/fields"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useConvexAuth()
  const { signIn } = useAuthActions()

  const [showPassword, setShowPassword] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace(DASHBOARD_PATH)
  }, [isAuthenticated, isLoading, router])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setPending(true)
    setError(false)
    try {
      await signIn("password", {
        email: String(form.get("email")).trim(),
        password: String(form.get("password")),
        flow: "signIn",
      })
      router.replace(DASHBOARD_PATH)
    } catch {
      setError(true)
      setPending(false)
    }
  }

  return (
    <section className="relative isolate flex min-h-svh items-center justify-center px-4 pt-24 pb-12">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0 mask-[radial-gradient(ellipse_at_center,black,transparent_65%)] opacity-60" />
        <div className="absolute top-1/3 left-1/2 h-96 w-160 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      </div>

      <div className="glass w-full max-w-md p-8 sm:p-10">
        <Image
          src="/images/NextWaveXRLogo.png"
          alt=""
          width={56}
          height={56}
          className="size-14 rounded-2xl ring-1 ring-line"
        />
        <h1 className="display mt-8 text-4xl">
          Admin <em>sign in</em>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Manage NextWave XR articles.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          {error && <Notice tone="error">Invalid email or password.</Notice>}
          <Field label="Email" htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              aria-invalid={error}
            />
          </Field>
          <Field label="Password" htmlFor="password">
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                aria-invalid={error}
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </Field>
          <Button
            type="submit"
            size="xl"
            disabled={pending || isLoading}
            className="w-full"
          >
            {pending ? (
              <>
                <Loader className="animate-spin" data-icon="inline-start" />
                Signing in…
              </>
            ) : (
              <>
                <Lock data-icon="inline-start" />
                Sign in
                <ArrowRight data-icon="inline-end" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
