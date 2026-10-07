"use client"

import { Link2, PenLine } from "lucide-react"
import * as React from "react"

import {
  ImportArticleForm,
  WriteArticleForm,
} from "@/components/admin/article-forms"
import { cn } from "@/lib/utils"

const modes = [
  { value: "import", label: "Import from UploadVR", icon: Link2 },
  { value: "write", label: "Write an article", icon: PenLine },
] as const

export default function CreateArticlePage() {
  const [mode, setMode] = React.useState<"import" | "write">("import")

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="display text-4xl sm:text-5xl">
          New <em>article</em>
        </h1>
        <div
          role="tablist"
          aria-label="How to add the article"
          className="inline-flex rounded-full p-1 ring-1 ring-line"
        >
          {modes.map((m) => (
            <button
              key={m.value}
              type="button"
              role="tab"
              aria-selected={mode === m.value}
              onClick={() => setMode(m.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                mode === m.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <m.icon className="size-4" />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel">
        {mode === "import" ? <ImportArticleForm /> : <WriteArticleForm />}
      </div>
    </div>
  )
}
