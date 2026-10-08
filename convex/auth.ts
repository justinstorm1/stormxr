import { Email } from "@convex-dev/auth/providers/Email"
import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"
import { ConvexError } from "convex/values"

import type { MutationCtx } from "./_generated/server"
import {
  signInEmailHtml,
  signInEmailSubject,
  signInEmailText,
} from "./signInEmail"

export const MAGIC_LINK_PROVIDER = "magic-link"

const MagicLink = Email({
  id: MAGIC_LINK_PROVIDER,
  maxAge: 15 * 60,
  // Magic-link behavior: the emailed code alone signs you in, so the link
  // works even when opened in a different browser than the one requesting it.
  authorize: undefined,
  async sendVerificationRequest({ identifier: email, url, expires }) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error("RESEND_API_KEY is not set")
    const minutes = Math.round((+expires - Date.now()) / 60_000)

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NextWave XR Admin <admin@stormxr.tech>",
        reply_to: "craigstorm@stormxr.tech",
        to: email,
        subject: signInEmailSubject,
        text: signInEmailText(url, minutes),
        html: signInEmailHtml(url, minutes),
      }),
    })
    if (!res.ok) {
      throw new Error(`Resend error ${res.status}: ${await res.text()}`)
    }
  },
})

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      // Admin accounts already exist; refuse new sign-ups so nobody can create
      // an account through the public auth endpoint and gain admin access.
      profile(params) {
        if (params.flow === "signUp") {
          throw new Error("Sign-ups are disabled")
        }
        return { email: params.email as string }
      },
    }),
    MagicLink,
  ],
  callbacks: {
    async createOrUpdateUser(
      genericCtx,
      { existingUserId, provider, profile }
    ) {
      const ctx = genericCtx as unknown as MutationCtx
      if (existingUserId) return existingUserId

      // A magic link may only sign in to an existing password account; it
      // must never create a new (admin) user.
      if (provider.id === MAGIC_LINK_PROVIDER) {
        const account = await ctx.db
          .query("authAccounts")
          .withIndex("providerAndAccountId", (q) =>
            q.eq("provider", "password").eq("providerAccountId", profile.email!)
          )
          .unique()
        if (!account) throw new ConvexError("No account with that email.")
        return account.userId
      }

      // Password accounts created by an admin (accounts.createAccount).
      return await ctx.db.insert("users", {
        email: profile.email,
        name: typeof profile.name === "string" ? profile.name : undefined,
      })
    },
  },
})
