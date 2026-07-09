"use client"

import { Node, mergeAttributes } from "@tiptap/core"
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from "@tiptap/react"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type VideoVariant = "youtube" | "vimeo" | "upload"

export interface VideoEmbedAttrs {
    variant: VideoVariant
    src: string
    poster: string | null
    caption: string | null
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        videoEmbed: {
            setVideoEmbed: (attrs: VideoEmbedAttrs) => ReturnType
        }
    }
}

export const VideoEmbed = Node.create({
    name: "videoEmbed",
    group: "block",
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            variant: { default: "youtube" },
            src: { default: null },
            poster: { default: null },
            caption: { default: null }
        }
    },

    parseHTML() {
        return [{ tag: "div[data-video-embed]" }]
    },

    renderHTML({ HTMLAttributes, node }) {
        const { variant, src, poster, caption } = node.attrs
        const media =
            variant === "upload"
                ? ["video", { src, poster, controls: "true" }]
                : ["iframe", { src, allow: "autoplay; fullscreen; picture-in-picture", allowfullscreen: "true" }]

        const children: unknown[] = [media]
        if (caption) children.push(["figcaption", {}, caption])

        return ["div", mergeAttributes(HTMLAttributes, { "data-video-embed": "", "data-variant": variant }), ...children]
    },

    addCommands() {
        return {
            setVideoEmbed:
                (attrs: VideoEmbedAttrs) =>
                ({ commands }) =>
                    commands.insertContent({ type: this.name, attrs })
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(VideoEmbedView)
    }
})

function VideoEmbedView({ node, deleteNode, updateAttributes, selected, editor }: ReactNodeViewProps) {
    const { variant, src, poster, caption } = node.attrs as VideoEmbedAttrs
    const editable = editor.isEditable

    return (
        <NodeViewWrapper data-video-embed data-variant={variant} className="group/video relative my-6">
            {editable && selected && (
                <div className="absolute -top-10 right-0 z-10 flex items-center gap-1 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
                    <button
                        type="button"
                        aria-label="Remove video"
                        onClick={() => deleteNode()}
                        className="flex size-7 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
            )}

            {variant === "upload" ? (
                <video src={src} poster={poster ?? undefined} controls className="w-full rounded-lg bg-muted" />
            ) : (
                <iframe
                    src={src}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className={cn("w-full rounded-lg bg-muted", editable && "pointer-events-none")}
                />
            )}

            {editable ? (
                <input
                    value={caption ?? ""}
                    onChange={(e) => updateAttributes({ caption: e.target.value || null })}
                    placeholder="Add a caption…"
                    className="mt-2 w-full border-none bg-transparent text-center text-sm text-muted-foreground outline-none placeholder:text-muted-foreground/60"
                />
            ) : (
                caption && (
                    <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>
                )
            )}
        </NodeViewWrapper>
    )
}
