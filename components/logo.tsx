import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="StormXR home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring",
        className
      )}
    >
      <span className="relative size-8 overflow-hidden rounded-[10px] ring-1 ring-line-strong transition group-hover:ring-signal">
        <Image
          src="/images/StormXRLogoNoText.png"
          alt=""
          fill
          sizes="32px"
          className="scale-125 object-cover"
          priority
        />
      </span>
      <span className="display text-lg tracking-tight">
        Storm<span className="text-signal">XR</span>
      </span>
    </Link>
  )
}
