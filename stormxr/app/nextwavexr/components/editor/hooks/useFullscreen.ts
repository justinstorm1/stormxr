"use client"

import { useCallback, useEffect, useState } from "react"

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const toggle = useCallback(() => setIsFullscreen((prev) => !prev), [])

    useEffect(() => {
        if (!isFullscreen) return

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsFullscreen(false)
        }

        document.addEventListener("keydown", onKeyDown)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.body.style.overflow = previousOverflow
        }
    }, [isFullscreen])

    return { isFullscreen, toggle, setIsFullscreen }
}
