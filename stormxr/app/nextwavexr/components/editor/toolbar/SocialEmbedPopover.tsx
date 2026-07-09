"use client"

import { useState } from "react"
import type { Editor } from "@tiptap/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Share2 } from "lucide-react"
import { toast } from "sonner"

export function SocialEmbedPopover({ editor }: { editor: Editor }) {
    const [open, setOpen] = useState(false)
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const handleEmbed = async () => {
        let hostname: string
        try {
            hostname = new URL(url).hostname
        } catch {
            toast.error("Enter a valid URL")
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`/nextwavexr/api/og-image?url=${encodeURIComponent(url)}`)
            const data = await res.json()
            editor
                .chain()
                .focus()
                .insertContent({
                    type: "socialEmbedCard",
                    attrs: { url, title: data.title ?? url, thumbnail: data.image ?? null, siteName: hostname }
                })
                .run()
            setOpen(false)
            setUrl("")
        } catch {
            toast.error("Couldn't load a preview for that link")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Embed social post">
                    <Share2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Embed a post</DialogTitle>
                </DialogHeader>
                <Field>
                    <FieldLabel htmlFor="social-url">Post URL</FieldLabel>
                    <Input
                        id="social-url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://x.com/…"
                    />
                </Field>
                <Button onClick={handleEmbed} disabled={!url || loading}>
                    {loading && <Loader2 className="animate-spin" />}
                    Embed
                </Button>
            </DialogContent>
        </Dialog>
    )
}
