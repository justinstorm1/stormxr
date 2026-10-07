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
      className={cn(
        "glass is-interactive group flex flex-col overflow-hidden p-6 sm:p-7",
        className
      )}
    >
      {/* The icon's own colors bleed softly into the card. */}
      <Image
        src={app.icon}
        alt=""
        aria-hidden
        width={72}
        height={72}
        className="pointer-events-none absolute -top-10 -right-10 size-44 opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
      />
      <div className="relative flex items-start justify-between gap-4">
        <Image
          src={app.icon}
          alt={`${app.name} app icon`}
          width={72}
          height={72}
          className="size-18 rounded-[1.25rem] object-cover shadow-xl ring-1 shadow-black/50 ring-white/15 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-3"
        />
        <span className="label rounded-full bg-white/5 px-2.5 py-1 text-[0.62rem] text-muted-foreground ring-1 ring-line">
          {platformLabel(app)}
        </span>
      </div>
      <h3 className="display relative mt-8 text-2xl">{app.name}</h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {app.description}
      </p>
      <div className="relative mt-7 flex flex-wrap gap-2">
        {app.links.map((link) =>
          link.href ? (
            <a
              key={link.store}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/6 px-3.5 py-2 text-xs font-medium ring-1 ring-line-strong transition hover:bg-primary hover:ring-primary"
            >
              {link.store}
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : (
            <span
              key={link.store}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-3.5 py-2 text-xs text-muted-foreground"
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
