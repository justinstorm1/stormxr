"use client"

import { Eye } from "lucide-react"
import * as React from "react"

import {
  ArticleView,
  type ArticleViewData,
} from "@/components/articles/article-view"

/**
 * The editor writes its draft here and the preview tab reads it, so the
 * preview needs no auth or save and updates live while you type.
 */
const STORAGE_KEY = "nextwavexr:article-preview"

export function writePreviewDraft(draft: ArticleViewData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
  } catch {
    // Storage blocked or full; the preview just won't update.
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange()
  }
  window.addEventListener("storage", onStorage)
  return () => window.removeEventListener("storage", onStorage)
}

function readRawDraft() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function ArticlePreview() {
  // `undefined` while server rendering, `null` when there's no draft.
  const raw = React.useSyncExternalStore(
    subscribe,
    readRawDraft,
    () => undefined
  )
  const draft = React.useMemo(() => {
    if (!raw) return null
    try {
      return JSON.parse(raw) as ArticleViewData
    } catch {
      return null
    }
  }, [raw])

  if (raw === undefined) return null

  if (!draft) {
    return (
      <p className="flex min-h-[60svh] items-center justify-center pt-24 text-muted-foreground">
        Nothing to preview. Open a preview from the article editor.
      </p>
    )
  }

  return (
    <>
      <ArticleView article={draft} />
      <div className="label pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-muted-foreground ring-1 ring-line backdrop-blur">
          <Eye className="size-3.5" />
          Preview · updates as you edit
        </span>
      </div>
    </>
  )
}
