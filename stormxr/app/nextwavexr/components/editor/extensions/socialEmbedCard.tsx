"use client"

import { Node, mergeAttributes } from "@tiptap/core"
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from "@tiptap/react"
import { ExternalLink, Trash2 } from "lucide-react"

export interface SocialEmbedAttrs {
    url: string
    title: string | null
    thumbnail: string | null
    siteName: string | null
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        socialEmbedCard: {
            setSocialEmbedCard: (attrs: SocialEmbedAttrs) => ReturnType
        }
    }
}

export const SocialEmbedCard = Node.create({
    name: "socialEmbedCard",
    group: "block",
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            url: { default: null },
            title: { default: null },
            thumbnail: { default: null },
            siteName: { default: null }
        }
    },

    parseHTML() {
        return [{ tag: "div[data-social-embed]" }]
    },

    renderHTML({ HTMLAttributes, node }) {
        const { url, title, thumbnail, siteName } = node.attrs
        const children: unknown[] = []
        if (thumbnail) children.push(["img", { src: thumbnail, alt: "" }])
        children.push(["span", {}, siteName ?? new URL(url).hostname])
        children.push(["strong", {}, title ?? url])

        return [
            "div",
            mergeAttributes(HTMLAttributes, { "data-social-embed": "" }),
            ["a", { href: url, target: "_blank", rel: "noopener noreferrer" }, ...children]
        ]
    },

    addCommands() {
        return {
            setSocialEmbedCard:
                (attrs: SocialEmbedAttrs) =>
                ({ commands }) =>
                    commands.insertContent({ type: this.name, attrs })
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(SocialEmbedCardView)
    }
})

function SocialEmbedCardView({ node, deleteNode, selected, editor }: ReactNodeViewProps) {
    const { url, title, thumbnail, siteName } = node.attrs as SocialEmbedAttrs
    const editable = editor.isEditable
    let hostname = siteName
    try {
        hostname = siteName ?? new URL(url).hostname
    } catch {
        hostname = siteName ?? url
    }

    return (
        <NodeViewWrapper data-social-embed className="group/social relative my-6">
            {editable && selected && (
                <div className="absolute -top-10 right-0 z-10 flex items-center gap-1 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
                    <button
                        type="button"
                        aria-label="Remove embed"
                        onClick={() => deleteNode()}
                        className="flex size-7 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
            )}

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => editable && e.preventDefault()}
                className="flex items-center gap-4 overflow-hidden rounded-lg border border-border bg-card p-4 no-underline transition-colors hover:bg-muted"
            >
                {thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumbnail} alt="" className="size-16 shrink-0 rounded-md object-cover" />
                )}
                <div className="flex min-w-0 flex-col gap-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ExternalLink className="size-3" />
                        {hostname}
                    </span>
                    <strong className="truncate text-sm font-semibold text-foreground">{title ?? url}</strong>
                </div>
            </a>
        </NodeViewWrapper>
    )
}
