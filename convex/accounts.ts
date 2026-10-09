import {
  createAccount as createAuthAccount,
  getAuthSessionId,
  getAuthUserId,
  invalidateSessions,
  modifyAccountCredentials,
  retrieveAccount,
} from "@convex-dev/auth/server"
import { ConvexError, v } from "convex/values"

import { api, internal } from "./_generated/api"
import type { ActionCtx } from "./_generated/server"
import { action, internalQuery, mutation, query } from "./_generated/server"
import { logActivity } from "./activity"
import { MAGIC_LINK_PROVIDER } from "./auth"
import { requireAuth } from "./authHelpers"

// Every account is an admin, so any signed-in user may manage accounts.
const PROVIDER = "password"
const MIN_PASSWORD_LENGTH = 8
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function checkPassword(password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new ConvexError(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    )
  }
}

async function requireActionAuth(ctx: ActionCtx) {
  const userId = await getAuthUserId(ctx)
  if (!userId) throw new ConvexError("Not authenticated")
  return userId
}

export const listAccounts = query({
  handler: async (ctx) => {
    const me = await requireAuth(ctx)
    const users = await ctx.db.query("users").collect()
    const now = Date.now()

    const rows = await Promise.all(
      users.map(async (user) => {
        const account = await ctx.db
          .query("authAccounts")
          .withIndex("userIdAndProvider", (q) =>
            q.eq("userId", user._id).eq("provider", PROVIDER)
          )
          .unique()
        const sessions = await ctx.db
          .query("authSessions")
          .withIndex("userId", (q) => q.eq("userId", user._id))
          .collect()
        return {
          _id: user._id,
          email: account?.providerAccountId ?? user.email ?? "—",
          name: user.name,
          createdAt: user._creationTime,
          lastSignIn: sessions.length
            ? Math.max(...sessions.map((s) => s._creationTime))
            : null,
          activeSessions: sessions.filter((s) => s.expirationTime > now).length,
          isYou: user._id === me,
        }
      })
    )
    return rows.sort((a, b) => a.createdAt - b.createdAt)
  },
})

export const accountEmail = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const account = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) =>
        q.eq("userId", userId).eq("provider", PROVIDER)
      )
      .unique()
    return account?.providerAccountId ?? null
  },
})

export const hasAccountWithEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const account = await ctx.db
      .query("authAccounts")
      .withIndex("providerAndAccountId", (q) =>
        q.eq("provider", PROVIDER).eq("providerAccountId", email)
      )
      .unique()
    return account !== null
  },
})

/**
 * "Forgot your password": email a one-time sign-in link, but only if an
 * account with that email exists. Returns the same result either way so the
 * form can't be used to discover which emails have accounts.
 */
export const sendSignInLink = action({
  args: { email: v.string(), redirectTo: v.string() },
  handler: async (ctx, args) => {
    const email = args.email.trim()
    if (!EMAIL_RE.test(email)) {
      throw new ConvexError("Enter a valid email address.")
    }
    if (!args.redirectTo.startsWith("/")) {
      throw new ConvexError("Invalid redirect.")
    }
    const exists = await ctx.runQuery(internal.accounts.hasAccountWithEmail, {
      email,
    })
    if (!exists) return

    await ctx.runAction(api.auth.signIn, {
      provider: MAGIC_LINK_PROVIDER,
      params: { email, redirectTo: args.redirectTo },
    })
  },
})

export const createAccount = action({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const me = await requireActionAuth(ctx)
    // Kept as typed: sign-in matches the email exactly.
    const email = args.email.trim()
    const name = args.name?.trim() || undefined
    if (!EMAIL_RE.test(email)) {
      throw new ConvexError("Enter a valid email address.")
    }
    checkPassword(args.password)

    const existing = await retrieveAccount(ctx, {
      provider: PROVIDER,
      account: { id: email },
    }).catch(() => null)
    if (existing) {
      throw new ConvexError("An account with that email already exists.")
    }

    const { user } = await createAuthAccount(ctx, {
      provider: PROVIDER,
      account: { id: email, secret: args.password },
      profile: { email, name },
    })
    await ctx.runMutation(internal.activity.record, {
      action: "account.create",
      actorId: me,
      targetId: user._id,
      targetTitle: email,
    })
  },
})

/** Change your own password. Signs out your other devices. */
export const changeMyPassword = action({
  args: { currentPassword: v.string(), newPassword: v.string() },
  handler: async (ctx, { currentPassword, newPassword }) => {
    const userId = await requireActionAuth(ctx)
    const email = await ctx.runQuery(internal.accounts.accountEmail, {
      userId,
    })
    if (!email) throw new ConvexError("No password account found.")

    try {
      await retrieveAccount(ctx, {
        provider: PROVIDER,
        account: { id: email, secret: currentPassword },
      })
    } catch (e) {
      throw new ConvexError(
        e instanceof Error && e.message === "TooManyFailedAttempts"
          ? "Too many failed attempts. Try again in a few minutes."
          : "Your current password is incorrect."
      )
    }
    checkPassword(newPassword)
    if (newPassword === currentPassword) {
      throw new ConvexError(
        "Choose a password different from your current one."
      )
    }

    await modifyAccountCredentials(ctx, {
      provider: PROVIDER,
      account: { id: email, secret: newPassword },
    })
    const sessionId = await getAuthSessionId(ctx)
    await invalidateSessions(ctx, {
      userId,
      except: sessionId ? [sessionId] : [],
    })
    await ctx.runMutation(internal.activity.record, {
      action: "account.changePassword",
      actorId: userId,
      targetId: userId,
      targetTitle: email,
    })
  },
})

/** Set a new password for another admin and sign them out everywhere. */
export const resetPassword = action({
  args: { userId: v.id("users"), newPassword: v.string() },
  handler: async (ctx, { userId, newPassword }) => {
    const me = await requireActionAuth(ctx)
    if (userId === me) {
      throw new ConvexError("Use “Change password” for your own account.")
    }
    const email = await ctx.runQuery(internal.accounts.accountEmail, {
      userId,
    })
    if (!email) throw new ConvexError("That account has no password login.")
    checkPassword(newPassword)

    await modifyAccountCredentials(ctx, {
      provider: PROVIDER,
      account: { id: email, secret: newPassword },
    })
    await invalidateSessions(ctx, { userId })
    await ctx.runMutation(internal.activity.record, {
      action: "account.resetPassword",
      actorId: me,
      targetId: userId,
      targetTitle: email,
    })
  },
})

export const deleteAccount = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const me = await requireAuth(ctx)
    if (userId === me) {
      throw new ConvexError("You can't delete your own account.")
    }
    const user = await ctx.db.get(userId)

    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .collect()
    for (const session of sessions) {
      const tokens = await ctx.db
        .query("authRefreshTokens")
        .withIndex("sessionId", (q) => q.eq("sessionId", session._id))
        .collect()
      for (const t of tokens) await ctx.db.delete(t._id)
      await ctx.db.delete(session._id)
    }

    const accounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", userId))
      .collect()
    for (const account of accounts) await ctx.db.delete(account._id)

    await ctx.db.delete(userId)
    await logActivity(ctx, {
      action: "account.delete",
      actorId: me,
      targetId: userId,
      targetTitle:
        accounts.find((a) => a.provider === PROVIDER)?.providerAccountId ??
        user?.email,
    })
  },
})
