"use client"

import type { Editor } from "@tiptap/react"
import { useEditorState } from "@tiptap/react"

const WORDS_PER_MINUTE = 225

export interface WordStats {
    words: number
    characters: number
    readingTime: number
}

const EMPTY_STATS: WordStats = { words: 0, characters: 0, readingTime: 1 }

export function useWordCount(editor: Editor | null): WordStats {
    const stats = useEditorState({
        editor,
        selector: ({ editor }) => {
            if (!editor) return EMPTY_STATS
            const words = editor.storage.characterCount.words()
            const characters = editor.storage.characterCount.characters()
            return {
                words,
                characters,
                readingTime: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
            }
        }
    })

    return stats ?? EMPTY_STATS
}
