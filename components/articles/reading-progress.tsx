"use client"

import * as React from "react"

/**
 * A thin bar along the top of the window that fills as the reader works
 * through the surrounding <article>.
 */
export function ReadingProgress() {
  const bar = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = bar.current
    const article = el?.closest("article")
    if (!el || !article) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = article.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? -rect.top / scrollable : 1
      el.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return (
    <div
      ref={bar}
      aria-hidden
      className="bg-brand fixed inset-x-0 top-0 z-60 h-0.5 origin-left scale-x-0"
    />
  )
}
