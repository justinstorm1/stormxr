"use client"

import { Check, Link2, Mail, Share2 } from "lucide-react"
import Image from "next/image"
import * as React from "react"

const tile =
  "flex size-10 items-center justify-center rounded-xl bg-white/3 text-muted-foreground ring-1 ring-line transition hover:-translate-y-0.5 hover:bg-white/8 hover:text-foreground hover:ring-line-strong"

const noopSubscribe = () => () => {}

/** Share links for an article, plus copy-link and the native share sheet. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = React.useState(false)
  // The native share sheet exists only in some browsers, never on the server.
  const canShare = React.useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator.share === "function",
    () => false
  )

  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const networks = [
    {
      name: "X",
      href: `https://x.com/intent/post?url=${u}&text=${t}`,
      icon: "/images/XIcon.avif",
    },
    {
      name: "Bluesky",
      href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: "/images/BlueskyLogo.png",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: "/images/LinkedInLogo.png",
    },
    {
      name: "Threads",
      href: `https://www.threads.net/intent/post?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: "/images/ThreadsLogo.png",
    },
  ]

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt("Copy this link:", url)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="label text-muted-foreground">Share</span>
      <ul className="flex flex-wrap gap-2">
        {networks.map((n) => (
          <li key={n.name}>
            <a
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${n.name}`}
              title={`Share on ${n.name}`}
              className={tile}
            >
              <Image
                src={n.icon}
                alt=""
                width={18}
                height={18}
                className="size-4.5 rounded-[4px] object-contain"
              />
            </a>
          </li>
        ))}
        <li>
          <a
            href={`mailto:?subject=${t}&body=${encodeURIComponent(`${title}\n\n${url}`)}`}
            aria-label="Share by email"
            title="Share by email"
            className={tile}
          >
            <Mail className="size-4" />
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Link copied" : "Copy link"}
            title={copied ? "Link copied" : "Copy link"}
            className={tile}
          >
            {copied ? (
              <Check className="size-4 text-signal" />
            ) : (
              <Link2 className="size-4" />
            )}
          </button>
        </li>
        {canShare && (
          <li>
            <button
              type="button"
              onClick={() => navigator.share({ title, url }).catch(() => {})}
              aria-label="More sharing options"
              title="More sharing options"
              className={tile}
            >
              <Share2 className="size-4" />
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
