"use client"

import { useState } from "react"
import type { Editor } from "@tiptap/react"
import { getEmbedUrlFromYoutubeUrl, isValidYoutubeUrl } from "@tiptap/extension-youtube"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ImageUploadDropzone, type UploadedAsset } from "./ImageUploadDropzone"
import { Video as VideoIcon } from "lucide-react"
import { toast } from "sonner"

function vimeoEmbedUrl(url: string): string | null {
    const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/)
    return match ? `https://player.vimeo.com/video/${match[1]}` : null
}

export function VideoEmbedPopover({ editor }: { editor: Editor }) {
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState<"youtube" | "vimeo" | "upload">("youtube")
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const [vimeoUrl, setVimeoUrl] = useState("")
    const [uploadedVideo, setUploadedVideo] = useState<UploadedAsset | null>(null)
    const [uploadedPoster, setUploadedPoster] = useState<UploadedAsset | null>(null)

    const reset = () => {
        setYoutubeUrl("")
        setVimeoUrl("")
        setUploadedVideo(null)
        setUploadedPoster(null)
        setTab("youtube")
    }

    const insert = (attrs: { variant: "youtube" | "vimeo" | "upload"; src: string; poster?: string | null }) => {
        editor
            .chain()
            .focus()
            .insertContent({ type: "videoEmbed", attrs: { poster: null, caption: null, ...attrs } })
            .run()
        setOpen(false)
        reset()
    }

    const handleYoutube = () => {
        if (!isValidYoutubeUrl(youtubeUrl)) {
            toast.error("That doesn't look like a valid YouTube URL")
            return
        }
        const embedUrl = getEmbedUrlFromYoutubeUrl({ url: youtubeUrl, nocookie: true })
        if (!embedUrl) {
            toast.error("Couldn't parse that YouTube URL")
            return
        }
        insert({ variant: "youtube", src: embedUrl })
    }

    const handleVimeo = () => {
        const embedUrl = vimeoEmbedUrl(vimeoUrl)
        if (!embedUrl) {
            toast.error("That doesn't look like a valid Vimeo URL")
            return
        }
        insert({ variant: "vimeo", src: embedUrl })
    }

    const handleUploadInsert = () => {
        if (!uploadedVideo?.url) {
            toast.error("Upload a video file first")
            return
        }
        insert({ variant: "upload", src: uploadedVideo.url, poster: uploadedPoster?.url ?? null })
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen)
                if (!nextOpen) reset()
            }}
        >
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Embed video">
                    <VideoIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Embed a video</DialogTitle>
                </DialogHeader>
                <Tabs value={tab} onValueChange={(v) => setTab(v as "youtube" | "vimeo" | "upload")}>
                    <TabsList className="w-full">
                        <TabsTrigger value="youtube" className="flex-1">
                            YouTube
                        </TabsTrigger>
                        <TabsTrigger value="vimeo" className="flex-1">
                            Vimeo
                        </TabsTrigger>
                        <TabsTrigger value="upload" className="flex-1">
                            Upload
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="youtube" className="flex flex-col gap-3 pt-2">
                        <Field>
                            <FieldLabel htmlFor="youtube-url">YouTube URL</FieldLabel>
                            <Input
                                id="youtube-url"
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=…"
                            />
                        </Field>
                        <Button onClick={handleYoutube} disabled={!youtubeUrl}>
                            Embed
                        </Button>
                    </TabsContent>

                    <TabsContent value="vimeo" className="flex flex-col gap-3 pt-2">
                        <Field>
                            <FieldLabel htmlFor="vimeo-url">Vimeo URL</FieldLabel>
                            <Input
                                id="vimeo-url"
                                value={vimeoUrl}
                                onChange={(e) => setVimeoUrl(e.target.value)}
                                placeholder="https://vimeo.com/…"
                            />
                        </Field>
                        <Button onClick={handleVimeo} disabled={!vimeoUrl}>
                            Embed
                        </Button>
                    </TabsContent>

                    <TabsContent value="upload" className="flex flex-col gap-4 pt-2">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium">Video file</span>
                            {uploadedVideo?.url ? (
                                <video src={uploadedVideo.url} controls className="w-full rounded-lg" />
                            ) : (
                                <ImageUploadDropzone
                                    accept={{ "video/*": [] }}
                                    multiple={false}
                                    label="Drag & drop a video, or click to browse"
                                    onUploaded={setUploadedVideo}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium">Poster image (optional)</span>
                            {uploadedPoster?.url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={uploadedPoster.url} alt="" className="h-24 w-full rounded-lg object-cover" />
                            ) : (
                                <ImageUploadDropzone
                                    accept={{ "image/*": [] }}
                                    multiple={false}
                                    label="Drag & drop a thumbnail"
                                    onUploaded={setUploadedPoster}
                                />
                            )}
                        </div>
                        <Button onClick={handleUploadInsert} disabled={!uploadedVideo}>
                            Embed
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
