import { ArrowUpRight } from "lucide-react"

import { formatDate, press } from "@/lib/site"

export function PressList() {
  return (
    <ul className="divide-y divide-white/8 border-y border-white/8">
      {press.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-2 py-7 outline-none focus-visible:bg-white/4 sm:grid-cols-[9rem_1fr_auto] sm:gap-8"
          >
            <time
              dateTime={item.date}
              className="pt-1 font-mono text-xs tracking-wider text-muted-foreground uppercase"
            >
              {formatDate(item.date)}
            </time>
            <div>
              <h3 className="text-lg font-medium tracking-tight transition-colors group-hover:text-primary sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
            </div>
            <span className="hidden size-10 items-center justify-center rounded-full ring-1 ring-white/10 transition group-hover:bg-primary group-hover:text-primary-foreground sm:flex">
              <ArrowUpRight className="size-4" />
              <span className="sr-only">Read on PRLog</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
