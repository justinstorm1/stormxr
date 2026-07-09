"use client"

import { useEffect } from "react"
import { EditorContent, useEditor, type JSONContent } from "@tiptap/react"
import { createArticleExtensions } from "./editor/extensions"
import { cn } from "@/lib/utils"

// Read-only renderer shared by the in-editor Preview tab AND the public
// article page — same extensions, same output, guaranteed WYSIWYG parity.
export function ArticleContent({
    content,
    className
}: {
    content: JSONContent | null | undefined
    className?: string
}) {
    const editor = useEditor({
        editable: false,
        immediatelyRender: false,
        extensions: createArticleExtensions({ editable: false }),
        content: content ?? undefined
    })

    useEffect(() => {
        if (!editor || !content) return
        const current = JSON.stringify(editor.getJSON())
        const next = JSON.stringify(content)
        if (current !== next) editor.commands.setContent(content, { emitUpdate: false })
    }, [content, editor])

    if (!editor) return null

    return <EditorContent editor={editor} className={cn("prose prose-neutral max-w-none", className)} />
}
