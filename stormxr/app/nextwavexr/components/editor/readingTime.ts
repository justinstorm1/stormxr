import type { JSONContent } from "@tiptap/react"

const WORDS_PER_MINUTE = 225

export function estimateReadingTime(content: JSONContent | null | undefined) {
    if (!content) return { words: 0, minutes: 1 }

    let text = ""
    const walk = (node: JSONContent) => {
        if (node.text) text += node.text + " "
        node.content?.forEach(walk)
    }
    walk(content)

    const words = text.trim().split(/\s+/).filter(Boolean).length
    return { words, minutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)) }
}
