import { ConvexError, v } from "convex/values"

import type { Doc, Id } from "./_generated/dataModel"
import type { QueryCtx } from "./_generated/server"
import { mutation, query } from "./_generated/server"
import { logActivity } from "./activity"
import { requireAuth } from "./authHelpers"

/** Case- and spacing-insensitive identity, so "VR News" == "vr  news". */
const keyOf = (name: string) => name.trim().replace(/\s+/g, " ").toLowerCase()

function cleanName(name: string) {
  const clean = name.trim().replace(/\s+/g, " ")
  if (!clean) throw new ConvexError("Enter a category name.")
  if (clean.length > 60) {
    throw new ConvexError("Keep category names under 60 characters.")
  }
  return clean
}

export type CategoryEntry = {
  name: string
  /** Set when the category was added on the Categories page. */
  categoryId?: Id<"categories">
  articleCount: number
}

/**
 * Every category: those added here plus any typed straight onto an article,
 * merged case-insensitively, with how many articles use each.
 */
async function allCategories(ctx: QueryCtx): Promise<CategoryEntry[]> {
  const [saved, articles] = await Promise.all([
    ctx.db.query("categories").collect(),
    ctx.db.query("articles").collect(),
  ])
  const byKey = new Map<string, CategoryEntry>()
  for (const c of saved) {
    byKey.set(keyOf(c.name), {
      name: c.name,
      categoryId: c._id,
      articleCount: 0,
    })
  }
  for (const a of articles) {
    const key = keyOf(a.category)
    if (!key) continue
    const entry = byKey.get(key) ?? { name: a.category, articleCount: 0 }
    entry.articleCount++
    byKey.set(key, entry)
  }
  return [...byKey.values()].sort((x, y) =>
    x.name.localeCompare(y.name, undefined, { sensitivity: "base" })
  )
}

async function findSaved(ctx: QueryCtx, name: string) {
  const key = keyOf(name)
  const saved = await ctx.db.query("categories").collect()
  return saved.find((c) => keyOf(c.name) === key)
}

async function articlesIn(ctx: QueryCtx, name: string) {
  const key = keyOf(name)
  const articles = await ctx.db.query("articles").collect()
  return articles.filter((a) => keyOf(a.category) === key)
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx)
    return await allCategories(ctx)
  },
})

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx)
    const name = cleanName(args.name)
    if (await findSaved(ctx, name)) {
      throw new ConvexError(`“${name}” already exists.`)
    }
    // Adopt the spelling articles already use, if any.
    const inUse = (await articlesIn(ctx, name))[0]?.category ?? name
    const categoryId = await ctx.db.insert("categories", { name: inUse })
    await logActivity(ctx, {
      action: "category.create",
      actorId: userId,
      targetId: categoryId,
      targetTitle: inUse,
    })
    return categoryId
  },
})

/** Renames a category and moves every article in it to the new name. */
export const rename = mutation({
  args: { from: v.string(), to: v.string() },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx)
    const to = cleanName(args.to)
    const fromKey = keyOf(args.from)
    if (fromKey === keyOf(to) && args.from.trim() === to) return

    // Merging into another existing category is fine; the target row wins.
    const existing = await findSaved(ctx, args.from)
    const target = fromKey === keyOf(to) ? undefined : await findSaved(ctx, to)
    if (existing && target) await ctx.db.delete(existing._id)
    else if (existing) await ctx.db.patch(existing._id, { name: to })
    else if (!target) await ctx.db.insert("categories", { name: to })

    const moved = await articlesIn(ctx, args.from)
    const finalName = target?.name ?? to
    await Promise.all(
      moved.map((a: Doc<"articles">) =>
        ctx.db.patch(a._id, { category: finalName })
      )
    )
    await logActivity(ctx, {
      action: "category.rename",
      actorId: userId,
      targetTitle: finalName,
      detail: `Was “${args.from.trim()}” · ${moved.length} article${moved.length === 1 ? "" : "s"} updated`,
    })
  },
})

/** Deletes a category. Articles must be moved out of it first. */
export const remove = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await requireAuth(ctx)
    const inUse = (await articlesIn(ctx, name)).length
    if (inUse) {
      throw new ConvexError(
        `${inUse} article${inUse === 1 ? " uses" : "s use"} this category. Rename it or move ${inUse === 1 ? "that article" : "those articles"} first.`
      )
    }
    const saved = await findSaved(ctx, name)
    if (!saved) return
    await ctx.db.delete(saved._id)
    await logActivity(ctx, {
      action: "category.delete",
      actorId: userId,
      targetTitle: saved.name,
    })
  },
})
