import { paginationOptsValidator } from "convex/server"
import { v } from "convex/values"

import type { Id } from "./_generated/dataModel"
import type { MutationCtx } from "./_generated/server"
import { internalMutation, query } from "./_generated/server"
import { requireAuth } from "./authHelpers"

export const activityActions = [
  "article.create",
  "article.update",
  "article.publish",
  "article.unpublish",
  "article.schedule",
  "article.autopublish",
  "article.delete",
  "account.create",
  "account.delete",
  "account.resetPassword",
  "account.changePassword",
  "message.delete",
] as const

export type ActivityAction = (typeof activityActions)[number]

const actionValidator = v.union(...activityActions.map((a) => v.literal(a)))

type Entry = {
  action: ActivityAction
  /** Omitted for changes made by the system, e.g. scheduled publishing. */
  actorId?: Id<"users">
  targetId?: string
  targetTitle?: string
  detail?: string
  scheduledFor?: number
}

async function emailOf(ctx: MutationCtx, userId: Id<"users">) {
  const account = await ctx.db
    .query("authAccounts")
    .withIndex("userIdAndProvider", (q) =>
      q.eq("userId", userId).eq("provider", "password")
    )
    .first()
  return account?.providerAccountId ?? (await ctx.db.get(userId))?.email
}

/** Records an admin change. Call from the mutation that made it. */
export async function logActivity(ctx: MutationCtx, entry: Entry) {
  await ctx.db.insert("activity", {
    ...entry,
    actorEmail: entry.actorId ? await emailOf(ctx, entry.actorId) : undefined,
  })
}

/** For actions, which can't write to the database directly. */
export const record = internalMutation({
  args: {
    action: actionValidator,
    actorId: v.optional(v.id("users")),
    targetId: v.optional(v.string()),
    targetTitle: v.optional(v.string()),
    detail: v.optional(v.string()),
    scheduledFor: v.optional(v.number()),
  },
  handler: logActivity,
})

export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, { paginationOpts }) => {
    await requireAuth(ctx)
    return await ctx.db.query("activity").order("desc").paginate(paginationOpts)
  },
})
