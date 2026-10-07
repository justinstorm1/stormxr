import { ArrowUpRight, Mic, Newspaper, Users } from "lucide-react"
import Link from "next/link"

import type { platforms } from "@/lib/site"
import { cn } from "@/lib/utils"

const icons = {
  nextwavexr: Newspaper,
  vrlens: Mic,
  stormycsvr: Users,
}

/** A wide glass row for one media platform. Stack them with a gap. */
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
        "glass group grid gap-5 overflow-hidden p-6 outline-none sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8 md:grid-cols-[auto_1.1fr_1fr_auto] md:items-center",
        expanded && "md:p-10"
      )}
    >
      <span className="icon-tile size-16 rounded-[1.1rem] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
        <Icon className="size-6" />
      </span>
      <div>
        <p className="label flex items-center gap-2 text-muted-foreground">
          <span className="text-gradient">0{index + 1}</span>
          {platform.kind}
        </p>
        <h3 className="display mt-2 text-3xl sm:text-[2.6rem]">
          {platform.name}
        </h3>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:col-start-2 md:col-start-auto">
        {platform.summary}
        {expanded && <> {platform.detail}</>}
        <span className="mt-4 flex items-center gap-1.5 font-medium text-signal md:hidden">
          {platform.cta}
          <ArrowUpRight className="size-4" />
        </span>
      </p>
      <span className="hidden size-14 items-center justify-center rounded-full bg-white/4 ring-1 ring-line-strong transition group-hover:bg-primary group-hover:ring-primary md:flex">
        <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        <span className="sr-only">{platform.cta}</span>
      </span>
    </Link>
  )
}
