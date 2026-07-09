"use client"

import { useState } from "react"
import type { Editor } from "@tiptap/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Field, FieldContent, FieldLabel } from "@/components/ui/field"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkIcon, Unlink } from "lucide-react"

export function LinkEditPopover({ editor }: { editor: Editor }) {
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState<"external" | "internal">("external")
    const [url, setUrl] = useState("")
    const [newTab, setNewTab] = useState(true)

    const articles = useQuery(api.articles.getArticles)
    const isActive = editor.isActive("link")

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)
        if (!nextOpen) return
        const attrs = editor.getAttributes("link")
        setUrl(attrs.href ?? "")
        setNewTab(attrs.target === "_blank")
        setTab("external")
    }

    const applyLink = (href: string, target: string | null) => {
        if (!href) return
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href, target, rel: target ? "noopener noreferrer" : null })
            .run()
        setOpen(false)
    }

    const removeLink = () => {
        editor.chain().focus().extendMarkRange("link").unsetLink().run()
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="icon-sm"
                    aria-label="Insert link"
                    aria-pressed={isActive}
                >
                    <LinkIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
                <Tabs value={tab} onValueChange={(v) => setTab(v as "external" | "internal")}>
                    <TabsList className="w-full">
                        <TabsTrigger value="external" className="flex-1">
                            External
                        </TabsTrigger>
                        <TabsTrigger value="internal" className="flex-1">
                            Internal article
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="external" className="flex flex-col gap-3 pt-2">
                        <Field>
                            <FieldLabel htmlFor="link-url">URL</FieldLabel>
                            <Input
                                id="link-url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                autoFocus
                            />
                        </Field>
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldLabel htmlFor="link-newtab">Open in new tab</FieldLabel>
                            </FieldContent>
                            <Switch id="link-newtab" checked={newTab} onCheckedChange={setNewTab} />
                        </Field>
                        <div className="flex gap-2">
                            <Button className="flex-1" onClick={() => applyLink(url, newTab ? "_blank" : null)}>
                                Apply
                            </Button>
                            {isActive && (
                                <Button variant="outline" size="icon" aria-label="Remove link" onClick={removeLink}>
                                    <Unlink />
                                </Button>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="internal" className="pt-2">
                        <Command className="max-h-64">
                            <CommandInput placeholder="Search articles…" />
                            <CommandList>
                                <CommandEmpty>No articles found.</CommandEmpty>
                                <CommandGroup>
                                    {articles?.map((article) => (
                                        <CommandItem
                                            key={article._id}
                                            value={article.title}
                                            onSelect={() =>
                                                applyLink(`/nextwavexr/articles/${article.slug ?? article._id}`, null)
                                            }
                                        >
                                            {article.title}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}
