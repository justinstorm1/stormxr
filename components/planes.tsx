"use client"

import * as React from "react"

import { Wave } from "@/components/wave"
import { cn } from "@/lib/utils"

/**
 * Three stacked glass planes crossed by the wave, after the StormXR mark.
 * On fine pointers the stack tilts gently toward the cursor.
 */
export function Planes({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (
      !el ||
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
        const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
        el.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`)
        el.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`)
      })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className={cn("planes", className)}>
      <div className="absolute inset-[15%] rounded-full bg-linear-to-r from-primary/35 to-violet/30 blur-[90px]" />
      <div className="planes-stage">
        <span />
        <span />
        <span />
      </div>
      <Wave className="absolute inset-x-[-10%] top-[38%] h-[24%] w-[120%]" />
    </div>
  )
}
