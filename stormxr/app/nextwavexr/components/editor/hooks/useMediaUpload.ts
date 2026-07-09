"use client"

import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useCallback, useState } from "react"
import { toast } from "sonner"

export const MAX_UPLOAD_BYTES = 200 * 1024 * 1024 // 200MB

export function useMediaUpload() {
    const generateUploadUrl = useMutation(api.media.generateUploadUrl)
    const saveMedia = useMutation(api.media.saveMedia)
    const [uploading, setUploading] = useState(false)

    const uploadFile = useCallback(
        async (file: File) => {
            if (file.size > MAX_UPLOAD_BYTES) {
                toast.error(`"${file.name}" is too large (max ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB)`)
                return null
            }

            const kind: "image" | "video" = file.type.startsWith("video/") ? "video" : "image"
            setUploading(true)
            try {
                const uploadUrl = await generateUploadUrl()
                const result = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file
                })
                if (!result.ok) throw new Error("Upload failed")
                const { storageId } = await result.json()

                const saved = await saveMedia({
                    storageId,
                    kind,
                    filename: file.name,
                    contentType: file.type,
                    size: file.size
                })
                return { ...saved, kind }
            } catch (error) {
                console.error(error)
                toast.error(`Failed to upload "${file.name}"`)
                return null
            } finally {
                setUploading(false)
            }
        },
        [generateUploadUrl, saveMedia]
    )

    return { uploadFile, uploading }
}
