"use client"

import { useDropzone } from "react-dropzone"
import type { Editor } from "@tiptap/react"
import { useMediaUpload } from "../hooks/useMediaUpload"
import { ImagePlus, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Id } from "@/convex/_generated/dataModel"

export interface UploadedAsset {
    mediaId: Id<"media">
    url: string | null
    kind: "image" | "video"
}

export function ImageUploadDropzone({
    editor,
    onUploaded,
    accept = { "image/*": [] },
    label = "Drag & drop images, or click to browse",
    multiple = true
}: {
    editor?: Editor | null
    onUploaded?: (asset: UploadedAsset) => void
    accept?: Record<string, string[]>
    label?: string
    multiple?: boolean
}) {
    const { uploadFile, uploading } = useMediaUpload()

    const onDrop = async (acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            const asset = await uploadFile(file)
            if (!asset || !asset.url) continue

            if (editor && asset.kind === "image") {
                editor
                    .chain()
                    .focus()
                    .insertContent({
                        type: "resizableImage",
                        attrs: { src: asset.url, alt: file.name.replace(/\.[^.]+$/, ""), width: 100, align: "center" }
                    })
                    .run()
            }

            onUploaded?.(asset)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple
    })

    return (
        <div
            {...getRootProps()}
            className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-8 text-center text-sm text-muted-foreground transition-colors hover:border-primary/50",
                isDragActive && "border-primary bg-primary/5"
            )}
        >
            <input {...getInputProps()} />
            {uploading ? <Loader2 className="size-6 animate-spin" /> : <ImagePlus className="size-6" />}
            <p>{isDragActive ? "Drop files here" : label}</p>
            {multiple && <p className="text-xs">Supports multiple files</p>}
        </div>
    )
}
