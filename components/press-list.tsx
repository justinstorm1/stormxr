import { ArrowUpRight } from "lucide-react"

import { getPressReleases } from "@/lib/press"
import { formatDate } from "@/lib/site"

export async function PressList() {
  const press = await getPressReleases()
  return (
    <ul className="space-y-3">
      {press.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass group grid gap-3 p-6 outline-none sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-10 sm:p-8"
          >
            <time dateTime={item.date} className="label text-signal">
              {formatDate(item.date)}
            </time>
            <div>
              <h3 className="display text-2xl sm:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
            </div>
            <span className="hidden size-12 items-center justify-center rounded-full bg-white/4 ring-1 ring-line-strong transition group-hover:bg-primary group-hover:ring-primary sm:flex">
              <ArrowUpRight className="size-4" />
              <span className="sr-only">Read on PRLog</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
