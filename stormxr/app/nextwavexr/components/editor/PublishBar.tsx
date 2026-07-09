"use client"

import { Button } from "@/components/ui/button"
import { Check, Eye, Loader2, Maximize2, Minimize2, Pencil } from "lucide-react"
import type { AutosaveStatus } from "./hooks/useAutosave"

export function PublishBar({
    status,
    mode,
    saving,
    autosaveStatus,
    words,
    readingTime,
    isFullscreen,
    onToggleFullscreen,
    previewMode,
    onTogglePreview,
    onSave
}: {
    status: "draft" | "scheduled" | "published"
    mode: "create" | "edit"
    saving: boolean
    autosaveStatus: AutosaveStatus
    words: number
    readingTime: number
    isFullscreen: boolean
    onToggleFullscreen: () => void
    previewMode: boolean
    onTogglePreview: () => void
    onSave: () => void
}) {
    const primaryLabel =
        status === "draft" ? "Save Draft" : status === "scheduled" ? "Schedule" : mode === "edit" ? "Update" : "Publish"

    return (
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur supports-backdrop-filter:bg-background/75">
            <div className="flex flex-1 items-center gap-2 text-xs text-muted-foreground">
                <span>{words} words</span>
                <span aria-hidden>·</span>
                <span>{readingTime} min read</span>
                {autosaveStatus !== "idle" && (
                    <>
                        <span aria-hidden>·</span>
                        <span className="flex items-center gap-1" role="status">
                            {autosaveStatus === "saving" && (
                                <>
                                    <Loader2 className="size-3 animate-spin" /> Saving…
                                </>
                            )}
                            {autosaveStatus === "saved" && (
                                <>
                                    <Check className="size-3" /> Saved
                                </>
                            )}
                            {autosaveStatus === "error" && <span className="text-destructive">Autosave failed</span>}
                        </span>
                    </>
                )}
            </div>

            <Button
                variant="ghost"
                size="icon-sm"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                onClick={onToggleFullscreen}
            >
                {isFullscreen ? <Minimize2 /> : <Maximize2 />}
            </Button>

            <Button variant="outline" size="sm" onClick={onTogglePreview}>
                {previewMode ? <Pencil /> : <Eye />}
                {previewMode ? "Edit" : "Preview"}
            </Button>

            <Button size="sm" onClick={onSave} disabled={saving}>
                {saving && <Loader2 className="animate-spin" />}
                {primaryLabel}
            </Button>
        </div>
    )
}
