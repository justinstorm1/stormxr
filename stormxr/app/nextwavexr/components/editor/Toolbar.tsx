"use client"

import { useState } from "react"
import { type Editor, useEditorState } from "@tiptap/react"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LinkEditPopover } from "./toolbar/LinkEditPopover"
import { VideoEmbedPopover } from "./toolbar/VideoEmbedPopover"
import { SocialEmbedPopover } from "./toolbar/SocialEmbedPopover"
import { MediaLibraryDialog } from "./MediaLibraryDialog"
import {
    Bold,
    ChevronDown,
    Code,
    Heading1,
    Heading2,
    Heading3,
    ImageIcon,
    Italic,
    List,
    ListOrdered,
    Minus,
    Pilcrow,
    Quote,
    Redo2,
    Strikethrough,
    Table as TableIcon,
    TextQuote,
    Underline as UnderlineIcon,
    Undo2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify
} from "lucide-react"

const HEADING_OPTIONS = [
    { level: 0 as const, label: "Paragraph", icon: Pilcrow },
    { level: 1 as const, label: "Heading 1", icon: Heading1 },
    { level: 2 as const, label: "Heading 2", icon: Heading2 },
    { level: 3 as const, label: "Heading 3", icon: Heading3 },
    { level: 4 as const, label: "Heading 4", icon: TextQuote },
    { level: 5 as const, label: "Heading 5", icon: TextQuote },
    { level: 6 as const, label: "Heading 6", icon: TextQuote }
]

export function Toolbar({ editor }: { editor: Editor }) {
    const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false)

    const state = useEditorState({
        editor,
        selector: ({ editor }) => ({
            bold: editor.isActive("bold"),
            italic: editor.isActive("italic"),
            underline: editor.isActive("underline"),
            strike: editor.isActive("strike"),
            code: editor.isActive("code"),
            blockquote: editor.isActive("blockquote"),
            bulletList: editor.isActive("bulletList"),
            orderedList: editor.isActive("orderedList"),
            codeBlock: editor.isActive("codeBlock"),
            heading: editor.getAttributes("heading").level as number | undefined,
            alignLeft: editor.isActive({ textAlign: "left" }),
            alignCenter: editor.isActive({ textAlign: "center" }),
            alignRight: editor.isActive({ textAlign: "right" }),
            alignJustify: editor.isActive({ textAlign: "justify" }),
            canUndo: editor.can().undo(),
            canRedo: editor.can().redo()
        })
    })

    const activeHeading = HEADING_OPTIONS.find((h) => h.level === (state.heading ?? 0)) ?? HEADING_OPTIONS[0]

    return (
        <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 rounded-t-lg border-b border-border bg-background/95 p-1.5 backdrop-blur supports-backdrop-filter:bg-background/75">
            <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Undo"
                disabled={!state.canUndo}
                onClick={() => editor.chain().focus().undo().run()}
            >
                <Undo2 />
            </Button>
            <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Redo"
                disabled={!state.canRedo}
                onClick={() => editor.chain().focus().redo().run()}
            >
                <Redo2 />
            </Button>

            <Separator orientation="vertical" className="mx-1 h-6" />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1">
                        <activeHeading.icon />
                        {activeHeading.label}
                        <ChevronDown className="size-3.5 opacity-60" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {HEADING_OPTIONS.map(({ level, label, icon: Icon }) => (
                        <DropdownMenuItem
                            key={level}
                            onSelect={() =>
                                level === 0
                                    ? editor.chain().focus().setParagraph().run()
                                    : editor
                                          .chain()
                                          .focus()
                                          .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                                          .run()
                            }
                        >
                            <Icon className="size-4" />
                            {label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="mx-1 h-6" />

            <Toggle
                size="sm"
                pressed={state.bold}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                aria-label="Bold"
            >
                <Bold />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.italic}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Italic"
            >
                <Italic />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.underline}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                aria-label="Underline"
            >
                <UnderlineIcon />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.strike}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                aria-label="Strikethrough"
            >
                <Strikethrough />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.code}
                onPressedChange={() => editor.chain().focus().toggleCode().run()}
                aria-label="Inline code"
            >
                <Code />
            </Toggle>

            <Separator orientation="vertical" className="mx-1 h-6" />

            <Toggle
                size="sm"
                pressed={state.blockquote}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                aria-label="Blockquote"
            >
                <Quote />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.bulletList}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Bullet list"
            >
                <List />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.orderedList}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Ordered list"
            >
                <ListOrdered />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.codeBlock}
                onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
                aria-label="Code block"
            >
                <Code className="rotate-90" />
            </Toggle>
            <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Horizontal rule"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <Minus />
            </Button>
            <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Insert table"
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            >
                <TableIcon />
            </Button>

            <Separator orientation="vertical" className="mx-1 h-6" />

            <Toggle
                size="sm"
                pressed={state.alignLeft}
                onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
                aria-label="Align left"
            >
                <AlignLeft />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.alignCenter}
                onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
                aria-label="Align center"
            >
                <AlignCenter />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.alignRight}
                onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
                aria-label="Align right"
            >
                <AlignRight />
            </Toggle>
            <Toggle
                size="sm"
                pressed={state.alignJustify}
                onPressedChange={() => editor.chain().focus().setTextAlign("justify").run()}
                aria-label="Justify"
            >
                <AlignJustify />
            </Toggle>

            <Separator orientation="vertical" className="mx-1 h-6" />

            <LinkEditPopover editor={editor} />
            <Button variant="ghost" size="icon-sm" aria-label="Insert image" onClick={() => setMediaLibraryOpen(true)}>
                <ImageIcon />
            </Button>
            <VideoEmbedPopover editor={editor} />
            <SocialEmbedPopover editor={editor} />

            <MediaLibraryDialog
                open={mediaLibraryOpen}
                onOpenChange={setMediaLibraryOpen}
                kind="image"
                onSelect={(asset) => {
                    if (asset.url) {
                        editor
                            .chain()
                            .focus()
                            .insertContent({
                                type: "resizableImage",
                                attrs: { src: asset.url, width: 100, align: "center" }
                            })
                            .run()
                    }
                    setMediaLibraryOpen(false)
                }}
            />
        </div>
    )
}
