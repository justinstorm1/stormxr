"use client"

import TextAlign from "@tiptap/extension-text-align"
import { Placeholder } from "@tiptap/extensions"
import {
  EditorContent,
  useEditor,
  useEditorState,
  type Editor,
  type JSONContent,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Captions,
  Clapperboard,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react"
import * as React from "react"

import { useUpload } from "@/components/admin/use-upload"
import { cn } from "@/lib/utils"

import { ResizableImage, toEmbedUrl, VideoEmbed } from "./nodes"

export function RichTextEditor({
  content,
  onChange,
  onError,
}: {
  content: JSONContent | null
  onChange: (doc: JSONContent) => void
  onError: (message: string) => void
}) {
  const editor = useEditor({
    // Rendered client-side only; avoids hydration mismatches in Next.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing your article…" }),
      ResizableImage,
      VideoEmbed,
    ],
    content: content ?? undefined,
    editorProps: {
      attributes: {
        class:
          "prose-article min-h-[28rem] px-5 py-6 outline-none sm:px-8 sm:py-8",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  })

  return (
    <div className="glass overflow-hidden">
      {editor ? (
        <Toolbar editor={editor} onError={onError} />
      ) : (
        <div className="h-[3.25rem] border-b border-line" />
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

function Toolbar({
  editor,
  onError,
}: {
  editor: Editor
  onError: (message: string) => void
}) {
  const { upload, uploading } = useUpload()
  const fileInput = React.useRef<HTMLInputElement>(null)

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      link: e.isActive("link"),
      image: e.isActive("resizableImage"),
      video: e.isActive("videoEmbed"),
      imageAttrs: e.getAttributes("resizableImage"),
      captionAttrs: e.isActive("videoEmbed")
        ? e.getAttributes("videoEmbed")
        : e.getAttributes("resizableImage"),
      align: e.isActive({ textAlign: "center" })
        ? "center"
        : e.isActive({ textAlign: "right" })
          ? "right"
          : "left",
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  })

  function setLink() {
    const previous = editor.getAttributes("link").href as string | undefined
    const href = window.prompt("Link URL (leave empty to remove)", previous)
    if (href === null) return
    const chain = editor.chain().focus().extendMarkRange("link")
    if (href.trim() === "") chain.unsetLink().run()
    else chain.setLink({ href: href.trim() }).run()
  }

  function addVideo() {
    const input = window.prompt("YouTube or Vimeo link")
    if (!input) return
    const embed = toEmbedUrl(input)
    if (!embed) {
      onError("That doesn't look like a YouTube or Vimeo link.")
      return
    }
    editor.chain().focus().setVideoEmbed(embed).run()
  }

  function editCaption() {
    const type = state.video ? "videoEmbed" : "resizableImage"
    const caption = window.prompt(
      "Caption (leave empty to remove)",
      (state.captionAttrs.caption as string | null) ?? ""
    )
    if (caption === null) return
    editor
      .chain()
      .focus()
      .updateAttributes(type, { caption: caption.trim() || null })
      .run()
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    try {
      const src = await upload(file)
      if (file.type.startsWith("video/")) {
        editor.chain().focus().setVideoEmbed({ src, variant: "file" }).run()
      } else {
        editor.chain().focus().setResizableImage({ src, alt: "" }).run()
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : "Upload failed")
    }
  }

  const sep = <span aria-hidden className="mx-1 h-6 w-px shrink-0 bg-line" />

  return (
    <div
      role="toolbar"
      aria-label="Formatting"
      className="sticky top-20 z-10 flex flex-wrap items-center gap-0.5 border-b border-line bg-card/90 p-2 backdrop-blur"
    >
      <Tool
        label="Bold"
        active={state.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Tool>
      <Tool
        label="Italic"
        active={state.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Tool>
      <Tool
        label="Underline"
        active={state.underline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline />
      </Tool>
      <Tool
        label="Strikethrough"
        active={state.strike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough />
      </Tool>
      <Tool label="Link" active={state.link} onClick={setLink}>
        <Link2 />
      </Tool>
      {sep}
      <Tool
        label="Heading"
        active={state.h2}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 />
      </Tool>
      <Tool
        label="Subheading"
        active={state.h3}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 />
      </Tool>
      <Tool
        label="Bulleted list"
        active={state.bullet}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </Tool>
      <Tool
        label="Numbered list"
        active={state.ordered}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </Tool>
      <Tool
        label="Quote"
        active={state.quote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote />
      </Tool>
      <Tool
        label="Divider"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus />
      </Tool>
      {sep}
      {state.image ? (
        <>
          {[50, 75, 100].map((w) => (
            <Tool
              key={w}
              label={`Image width ${w}%`}
              active={Number(state.imageAttrs.width) === w}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .updateAttributes("resizableImage", { width: w })
                  .run()
              }
            >
              <span className="text-xs font-medium">{w}%</span>
            </Tool>
          ))}
          {(["left", "center", "right"] as const).map((align) => (
            <Tool
              key={align}
              label={`Align image ${align}`}
              active={state.imageAttrs.align === align}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .updateAttributes("resizableImage", { align })
                  .run()
              }
            >
              {align === "left" ? (
                <AlignLeft />
              ) : align === "center" ? (
                <AlignCenter />
              ) : (
                <AlignRight />
              )}
            </Tool>
          ))}
        </>
      ) : (
        (["left", "center", "right"] as const).map((align) => (
          <Tool
            key={align}
            label={`Align text ${align}`}
            active={state.align === align}
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
          >
            {align === "left" ? (
              <AlignLeft />
            ) : align === "center" ? (
              <AlignCenter />
            ) : (
              <AlignRight />
            )}
          </Tool>
        ))
      )}
      {(state.image || state.video) && (
        <Tool label="Edit caption" onClick={editCaption}>
          <Captions />
        </Tool>
      )}
      {sep}
      <Tool
        label="Upload image or video"
        onClick={() => fileInput.current?.click()}
        disabled={uploading}
      >
        {uploading ? <Loader className="animate-spin" /> : <ImagePlus />}
      </Tool>
      <Tool label="Embed YouTube or Vimeo" onClick={addVideo}>
        <Clapperboard />
      </Tool>
      <input
        ref={fileInput}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={onFile}
      />
      <span className="ml-auto flex">
        <Tool
          label="Undo"
          disabled={!state.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 />
        </Tool>
        <Tool
          label="Redo"
          disabled={!state.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 />
        </Tool>
      </span>
    </div>
  )
}

function Tool({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex size-9 min-w-9 items-center justify-center rounded-lg text-muted-foreground transition [&_svg]:size-4",
        active
          ? "bg-primary/20 text-signal ring-1 ring-primary/40"
          : "hover:bg-white/8 hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-40",
        // Width presets show text, so let them grow.
        "w-auto px-2"
      )}
    >
      {children}
    </button>
  )
}
