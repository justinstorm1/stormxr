"use client"

import { useEffect, useRef, useState } from "react"
import type { Editor, JSONContent } from "@tiptap/react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

export type AutosaveStatus = "idle" | "saving" | "saved" | "error"

// Mirrors content to localStorage on every keystroke (crash recovery, even
// before the article has been saved for the first time), and separately
// debounces a real autosave mutation once an articleId exists.
export function useAutosave({
    editor,
    articleId,
    localStorageKey,
    enabled = true
}: {
    editor: Editor | null
    articleId: Id<"articles"> | null
    localStorageKey: string
    enabled?: boolean
}) {
    const autosaveArticle = useMutation(api.articles.autosaveArticle)
    const [status, setStatus] = useState<AutosaveStatus>("idle")
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (!editor || !enabled) return

        const handleUpdate = () => {
            const json = editor.getJSON()
            try {
                window.localStorage.setItem(localStorageKey, JSON.stringify(json))
            } catch {
                // localStorage unavailable (private mode, quota) — crash recovery is best-effort
            }

            if (!articleId) return

            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            setStatus("saving")
            timeoutRef.current = setTimeout(async () => {
                try {
                    await autosaveArticle({ articleId, content: json })
                    setStatus("saved")
                } catch (error) {
                    console.error(error)
                    setStatus("error")
                }
            }, 2000)
        }

        editor.on("update", handleUpdate)
        return () => {
            editor.off("update", handleUpdate)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [editor, articleId, autosaveArticle, localStorageKey, enabled])

    const recoverLocalDraft = (): JSONContent | null => {
        try {
            const raw = window.localStorage.getItem(localStorageKey)
            return raw ? JSON.parse(raw) : null
        } catch {
            return null
        }
    }

    const clearLocalDraft = () => {
        try {
            window.localStorage.removeItem(localStorageKey)
        } catch {
            // ignore
        }
    }

    return { status, recoverLocalDraft, clearLocalDraft }
}
