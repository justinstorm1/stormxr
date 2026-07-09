import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { Table } from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableHeader from "@tiptap/extension-table-header"
import TableCell from "@tiptap/extension-table-cell"
import Placeholder from "@tiptap/extension-placeholder"
import CharacterCount from "@tiptap/extension-character-count"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { createLowlight, common } from "lowlight"
import { ResizableImage } from "./resizableImage"
import { VideoEmbed } from "./videoEmbed"
import { SocialEmbedCard } from "./socialEmbedCard"

const lowlight = createLowlight(common)

// Shared by the writable editor AND the read-only preview/public renderer —
// this is what guarantees true WYSIWYG parity between the two.
export function createArticleExtensions({
    editable = true,
    placeholder
}: { editable?: boolean; placeholder?: string } = {}) {
    return [
        StarterKit.configure({
            codeBlock: false,
            heading: { levels: [1, 2, 3, 4, 5, 6] },
            link: {
                openOnClick: editable ? false : true,
                autolink: true,
                defaultProtocol: "https",
                HTMLAttributes: {
                    rel: "noopener noreferrer nofollow",
                    class: "text-primary underline underline-offset-4"
                }
            }
        }),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
        CodeBlockLowlight.configure({ lowlight }),
        CharacterCount,
        ...(editable ? [Placeholder.configure({ placeholder: placeholder ?? "Tell your story…" })] : []),
        ResizableImage.configure({ inline: false }),
        VideoEmbed,
        SocialEmbedCard
    ]
}
