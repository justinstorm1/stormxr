"use client"

import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUploadDropzone, type UploadedAsset } from "./toolbar/ImageUploadDropzone"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ImageIcon, VideoIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function MediaLibraryDialog({
    open,
    onOpenChange,
    onSelect,
    kind = "image"
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (asset: UploadedAsset) => void
    kind?: "image" | "video" | "all"
}) {
    const [tab, setTab] = useState<"library" | "upload">("library")
    const media = useQuery(api.media.listMedia, {})

    const filtered = media?.filter((asset) => kind === "all" || asset.kind === kind)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Media library</DialogTitle>
                </DialogHeader>

                <Tabs value={tab} onValueChange={(v) => setTab(v as "library" | "upload")}>
                    <TabsList>
                        <TabsTrigger value="library">Library</TabsTrigger>
                        <TabsTrigger value="upload">Upload new</TabsTrigger>
                    </TabsList>

                    <TabsContent value="library" className="max-h-96 overflow-y-auto">
                        {filtered && filtered.length > 0 ? (
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                                {filtered.map((asset) =>
                                    asset.url ? (
                                        <button
                                            key={asset._id}
                                            type="button"
                                            onClick={() =>
                                                onSelect({ mediaId: asset._id, url: asset.url, kind: asset.kind })
                                            }
                                            className={cn(
                                                "group relative aspect-square overflow-hidden rounded-md border border-border bg-muted",
                                                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                            )}
                                        >
                                            {asset.kind === "image" ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={asset.url}
                                                    alt={asset.filename}
                                                    className="size-full object-cover transition-transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <video src={asset.url} className="size-full object-cover" />
                                            )}
                                        </button>
                                    ) : null
                                )}
                            </div>
                        ) : (
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia>
                                        {kind === "video" ? <VideoIcon /> : <ImageIcon />}
                                    </EmptyMedia>
                                    <EmptyTitle>No media yet</EmptyTitle>
                                    <EmptyDescription>Upload a file to get started.</EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        )}
                    </TabsContent>

                    <TabsContent value="upload">
                        <ImageUploadDropzone
                            accept={
                                kind === "video"
                                    ? { "video/*": [] }
                                    : kind === "all"
                                      ? { "image/*": [], "video/*": [] }
                                      : { "image/*": [] }
                            }
                            multiple={false}
                            onUploaded={(asset) => {
                                onSelect(asset)
                                setTab("library")
                            }}
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
