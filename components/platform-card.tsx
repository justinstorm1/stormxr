import { ArrowUpRight, Mic, Newspaper, Users } from "lucide-react"
import Link from "next/link"

import type { platforms } from "@/lib/site"
import { cn } from "@/lib/utils"

const icons = {
  nextwavexr: Newspaper,
  vrlens: Mic,
  stormycsvr: Users,
}

export function PlatformCard({
  platform,
  index,
  expanded = false,
}: {
  platform: (typeof platforms)[number]
  index: number
  expanded?: boolean
}) {
  const Icon = icons[platform.slug]
  return (
    <Link
      href={`/${platform.slug}`}
      className={cn(
        "glass-card group flex flex-col p-7 outline-none focus-visible:ring-3 focus-visible:ring-ring",
        expanded && "sm:p-9"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary/25 to-violet/25 ring-1 ring-white/10">
          <Icon className="size-5 text-primary" />
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          0{index + 1}
        </span>
      </div>
      <p className="mt-8 font-mono text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
        {platform.kind}
      </p>
      <h3 className="mt-2 text-2xl font-medium tracking-tight">
        {platform.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {platform.summary}
        {expanded && <> {platform.detail}</>}
      </p>
      <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        {platform.cta}
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}
