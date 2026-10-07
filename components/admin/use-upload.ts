"use client"

import { useMutation } from "convex/react"
import * as React from "react"

import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

const MAX_BYTES = { image: 15 * 1024 * 1024, video: 200 * 1024 * 1024 }

/** Uploads a file to Convex storage and returns its public URL. */
export function useUpload() {
  const generateUploadUrl = useMutation(api.media.generateUploadUrl)
  const saveMedia = useMutation(api.media.saveMedia)
  const [uploading, setUploading] = React.useState(false)

  const upload = React.useCallback(
    async (file: File, articleId?: Id<"articles">) => {
      const kind = file.type.startsWith("video/") ? "video" : "image"
      if (!file.type.startsWith(`${kind}/`)) {
        throw new Error("Only image and video files can be uploaded")
      }
      if (file.size > MAX_BYTES[kind]) {
        throw new Error(
          `That ${kind} is too large (max ${MAX_BYTES[kind] / 1024 / 1024} MB)`
        )
      }
      setUploading(true)
      try {
        const postUrl = await generateUploadUrl()
        const res = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        })
        if (!res.ok) throw new Error("Upload failed")
        const { storageId } = (await res.json()) as {
          storageId: Id<"_storage">
        }
        const { url } = await saveMedia({
          storageId,
          kind,
          filename: file.name,
          contentType: file.type,
          size: file.size,
          articleId,
        })
        if (!url) throw new Error("Upload failed")
        return url
      } finally {
        setUploading(false)
      }
    },
    [generateUploadUrl, saveMedia]
  )

  return { upload, uploading }
}
