import { Fragment } from "react"

import { isArticleFont } from "@/lib/articles"
import { cn } from "@/lib/utils"

/** A ProseMirror/TipTap JSON node, as stored in `articles.content`. */
export type RichNode = {
  type: string
  text?: string
  attrs?: Record<string, unknown>
  marks?: { type: string; attrs?: Record<string, unknown> }[]
  content?: RichNode[]
}

const safeHref = (href: unknown) =>
  typeof href === "string" && /^(https?:|mailto:|\/|#)/i.test(href)
    ? href
    : undefined

// Only embed video from known players; anything else is dropped.
const embedHosts = [
  "www.youtube-nocookie.com",
  "www.youtube.com",
  "youtube.com",
  "player.vimeo.com",
]
const safeEmbed = (src: unknown) => {
  if (typeof src !== "string") return undefined
  try {
    const url = new URL(src)
    return url.protocol === "https:" && embedHosts.includes(url.hostname)
      ? src
      : undefined
  } catch {
    return undefined
  }
}

const alignClass = (align: unknown) =>
  align === "center"
    ? "text-center"
    : align === "right"
      ? "text-right"
      : align === "justify"
        ? "text-justify"
        : undefined

function Text({ node }: { node: RichNode }) {
  let out: React.ReactNode = node.text
  for (const mark of node.marks ?? []) {
    switch (mark.type) {
      case "bold":
        out = <strong>{out}</strong>
        break
      case "italic":
        out = <em>{out}</em>
        break
      case "underline":
        out = <u>{out}</u>
        break
      case "strike":
        out = <s>{out}</s>
        break
      case "code":
        out = <code>{out}</code>
        break
      case "textStyle": {
        const fontFamily = mark.attrs?.fontFamily
        if (isArticleFont(fontFamily)) {
          out = <span style={{ fontFamily }}>{out}</span>
        }
        break
      }
      case "link": {
        const href = safeHref(mark.attrs?.href)
        const external = href?.startsWith("http")
        out = href ? (
          <a
            href={href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {out}
          </a>
        ) : (
          out
        )
        break
      }
    }
  }
  return <>{out}</>
}

function Children({ node }: { node: RichNode }) {
  return (
    <>
      {node.content?.map((child, i) => (
        <Node key={i} node={child} />
      ))}
    </>
  )
}

function Node({ node }: { node: RichNode }) {
  const a = node.attrs ?? {}
  switch (node.type) {
    case "text":
      return <Text node={node} />
    case "paragraph":
      return (
        <p className={alignClass(a.textAlign)}>
          <Children node={node} />
        </p>
      )
    case "heading": {
      // The page title is the h1, so article headings start at h2.
      const level = Math.min(Math.max(Number(a.level) || 2, 2), 4)
      const Tag = `h${level}` as "h2" | "h3" | "h4"
      return (
        <Tag className={alignClass(a.textAlign)}>
          <Children node={node} />
        </Tag>
      )
    }
    case "hardBreak":
      return <br />
    case "horizontalRule":
      return <hr />
    case "blockquote":
      return (
        <blockquote>
          <Children node={node} />
        </blockquote>
      )
    case "bulletList":
      return (
        <ul>
          <Children node={node} />
        </ul>
      )
    case "orderedList":
      return (
        <ol>
          <Children node={node} />
        </ol>
      )
    case "listItem":
      return (
        <li>
          <Children node={node} />
        </li>
      )
    case "codeBlock":
      return (
        <pre>
          <code>
            <Children node={node} />
          </code>
        </pre>
      )
    case "image":
    case "resizableImage": {
      if (typeof a.src !== "string") return null
      const width = Number(a.width) || 100
      return (
        <figure
          className={cn(
            a.align === "left" && "mr-auto",
            a.align === "right" && "ml-auto",
            a.align !== "left" && a.align !== "right" && "mx-auto"
          )}
          style={{ maxWidth: `${Math.min(width, 100)}%` }}
        >
          {/* Inline article images come from arbitrary sources with unknown
              dimensions, so a plain <img> is used instead of next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.src}
            alt={typeof a.alt === "string" ? a.alt : ""}
            loading="lazy"
          />
          {typeof a.caption === "string" && a.caption && (
            <figcaption>{a.caption}</figcaption>
          )}
        </figure>
      )
    }
    case "videoEmbed": {
      const caption =
        typeof a.caption === "string" && a.caption ? a.caption : null
      if (a.variant === "youtube" || a.variant === "vimeo") {
        const src = safeEmbed(a.src)
        if (!src) return null
        return (
          <figure>
            <div className="aspect-video overflow-hidden rounded-2xl">
              <iframe
                src={src}
                title={caption ?? "Embedded video"}
                className="size-full"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        )
      }
      const src = safeHref(a.src)
      if (!src) return null
      return (
        <figure>
          <video
            src={src}
            poster={safeHref(a.poster)}
            controls
            playsInline
            className="w-full rounded-2xl"
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    }
    default:
      // Unknown block: still render its text so nothing silently disappears.
      return node.content ? <Children node={node} /> : null
  }
}

/** Renders stored TipTap JSON as styled article prose. */
export function ArticleContent({
  content,
  className,
}: {
  content: unknown
  className?: string
}) {
  const doc = content as RichNode | null
  if (!doc?.content) return null
  return (
    <div className={cn("prose-article", className)}>
      {doc.content.map((node, i) => (
        <Fragment key={i}>
          <Node node={node} />
        </Fragment>
      ))}
    </div>
  )
}
