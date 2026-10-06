import { ArrowUpRight, Clock } from "lucide-react"
import Image from "next/image"

import type { App } from "@/lib/site"
import { cn } from "@/lib/utils"

function platformLabel(app: App) {
  if (app.platform === "VR") return "Meta Quest"
  const stores = app.links.map((l) => l.store)
  return stores.includes("Google Play") ? "iOS · Android" : "iOS"
}

export function AppCard({ app, className }: { app: App; className?: string }) {
  return (
    <article
      className={cn("glass-card is-interactive flex flex-col p-6", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <Image
          src={app.icon}
          alt={`${app.name} app icon`}
          width={64}
          height={64}
          className="size-16 rounded-2xl object-cover shadow-lg ring-1 shadow-black/40 ring-white/10"
        />
        <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[0.68rem] tracking-wider text-muted-foreground uppercase">
          {platformLabel(app)}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-medium">{app.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {app.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {app.links.map((link) =>
          link.href ? (
            <a
              key={link.store}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/6 px-3 py-1.5 text-xs font-medium ring-1 ring-white/10 transition hover:bg-primary hover:text-primary-foreground hover:ring-primary"
            >
              {link.store}
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : (
            <span
              key={link.store}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/15 px-3 py-1.5 text-xs text-muted-foreground"
            >
              <Clock className="size-3.5" />
              {link.store}: {link.note}
            </span>
          )
        )}
      </div>
    </article>
  )
}
