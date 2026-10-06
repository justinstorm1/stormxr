import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="StormXR home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring",
        className
      )}
    >
      <span className="relative size-8 overflow-hidden rounded-lg ring-1 ring-white/10 transition group-hover:ring-primary/50">
        <Image
          src="/images/StormXRLogoNoText.png"
          alt=""
          fill
          sizes="32px"
          className="object-cover"
          priority
        />
      </span>
      <span className="text-[1.05rem] font-semibold tracking-tight">
        Storm<span className="text-primary">XR</span>
      </span>
    </Link>
  )
}
