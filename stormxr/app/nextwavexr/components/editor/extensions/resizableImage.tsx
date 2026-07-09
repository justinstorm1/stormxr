"use client"

import { mergeAttributes } from "@tiptap/core"
import Image from "@tiptap/extension-image"
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from "@tiptap/react"
import { useRef, useState } from "react"
import { AlignCenter, AlignLeft, AlignRight, Maximize2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type ImageAlign = "left" | "center" | "right" | "full"

const MIN_WIDTH = 20
const MAX_WIDTH = 100

export const ResizableImage = Image.extend({
    name: "resizableImage",

    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: 100,
                parseHTML: (element) => {
                    const value = element.style.width || element.getAttribute("data-width")
                    const parsed = value ? parseFloat(value) : 100
                    return Number.isFinite(parsed) ? parsed : 100
                }
            },
            align: {
                default: "center",
                parseHTML: (element) => element.getAttribute("data-align") ?? "center"
            },
            caption: {
                default: null,
                parseHTML: (element) =>
                    element.querySelector("figcaption")?.textContent ?? null
            }
        }
    },

    parseHTML() {
        return [
            { tag: 'figure[data-type="resizable-image"]' },
            { tag: "img[src]" }
        ]
    },

    renderHTML({ HTMLAttributes, node }) {
        const { src, alt, title, width, align, caption } = node.attrs
        const children: unknown[] = [["img", mergeAttributes(HTMLAttributes, { src, alt, title })]]
        if (caption) children.push(["figcaption", {}, caption])

        return [
            "figure",
            mergeAttributes({
                "data-type": "resizable-image",
                "data-align": align,
                style: `width: ${align === "full" ? 100 : width}%;`
            }),
            ...children
        ]
    },

    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageView)
    }
})

function ResizableImageView({ node, updateAttributes, deleteNode, selected, editor }: ReactNodeViewProps) {
    const { src, alt, caption, width, align } = node.attrs as {
        src: string
        alt: string | null
        caption: string | null
        width: number
        align: ImageAlign
    }

    const figureRef = useRef<HTMLElement | null>(null)
    const [resizing, setResizing] = useState(false)
    const editable = editor.isEditable

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>, direction: 1 | -1) => {
        event.preventDefault()
        event.stopPropagation()

        const container = figureRef.current?.closest(".ProseMirror") as HTMLElement | null
        const containerWidth = container?.clientWidth ?? 800
        const startX = event.clientX
        const startWidth = width

        setResizing(true)

        const handleMove = (moveEvent: PointerEvent) => {
            const deltaX = (moveEvent.clientX - startX) * direction
            const deltaPercent = (deltaX / containerWidth) * 100
            const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(startWidth + deltaPercent)))
            updateAttributes({ width: next })
        }

        const handleUp = () => {
            setResizing(false)
            window.removeEventListener("pointermove", handleMove)
            window.removeEventListener("pointerup", handleUp)
        }

        window.addEventListener("pointermove", handleMove)
        window.addEventListener("pointerup", handleUp)
    }

    const alignClass =
        align === "left" ? "mr-auto" : align === "right" ? "ml-auto" : align === "full" ? "w-full!" : "mx-auto"

    return (
        <NodeViewWrapper
            as="figure"
            ref={figureRef}
            data-align={align}
            className={cn("group/image relative my-6", alignClass)}
            style={{ width: align === "full" ? "100%" : `${width}%` }}
        >
            {editable && selected && (
                <div className="absolute -top-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
                    {[
                        { value: "left", icon: AlignLeft, label: "Align left" },
                        { value: "center", icon: AlignCenter, label: "Align center" },
                        { value: "right", icon: AlignRight, label: "Align right" },
                        { value: "full", icon: Maximize2, label: "Full width" }
                    ].map(({ value, icon: Icon, label }) => (
                        <button
                            key={value}
                            type="button"
                            aria-label={label}
                            aria-pressed={align === value}
                            onClick={() => updateAttributes({ align: value })}
                            className={cn(
                                "flex size-7 items-center justify-center rounded-md hover:bg-muted",
                                align === value && "bg-muted text-foreground"
                            )}
                        >
                            <Icon className="size-4" />
                        </button>
                    ))}
                    <div className="mx-1 h-4 w-px bg-border" />
                    <button
                        type="button"
                        aria-label="Remove image"
                        onClick={() => deleteNode()}
                        className="flex size-7 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
            )}

            <img
                src={src}
                alt={alt ?? ""}
                draggable={false}
                className="w-full rounded-lg object-cover"
            />

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

            {editable && selected && (
                <>
                    <div
                        onPointerDown={(e) => handlePointerDown(e, 1)}
                        className={cn(
                            "absolute top-1/2 right-0 h-10 w-1.5 -translate-y-1/2 cursor-ew-resize rounded-full bg-primary/70 opacity-0 transition-opacity group-hover/image:opacity-100",
                            resizing && "opacity-100"
                        )}
                    />
                    <div
                        onPointerDown={(e) => handlePointerDown(e, -1)}
                        className={cn(
                            "absolute top-1/2 left-0 h-10 w-1.5 -translate-y-1/2 cursor-ew-resize rounded-full bg-primary/70 opacity-0 transition-opacity group-hover/image:opacity-100",
                            resizing && "opacity-100"
                        )}
                    />
                </>
            )}
        </NodeViewWrapper>
    )
}
