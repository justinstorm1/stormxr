import { mergeAttributes, Node } from "@tiptap/react"

/**
 * Custom nodes matching the JSON already stored in `articles.content`:
 * `resizableImage` and `videoEmbed`. Attribute names must stay in sync with
 * components/articles/article-content.tsx, which renders them publicly.
 */

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableImage: {
      setResizableImage: (attrs: {
        src: string
        alt?: string
        caption?: string
      }) => ReturnType
    }
    videoEmbed: {
      setVideoEmbed: (attrs: {
        src: string
        variant: "youtube" | "vimeo" | "file"
        caption?: string
      }) => ReturnType
    }
  }
}

export const ResizableImage = Node.create({
  name: "resizableImage",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      caption: { default: null },
      width: { default: 100 },
      height: { default: null },
      align: { default: "center" },
    }
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-type='resizable-image']",
        getAttrs: (el) => {
          const img = (el as HTMLElement).querySelector("img")
          return {
            src: img?.getAttribute("src"),
            alt: img?.getAttribute("alt"),
            caption:
              (el as HTMLElement).querySelector("figcaption")?.textContent ??
              null,
          }
        },
      },
      {
        tag: "img[src]",
        getAttrs: (el) => ({ src: (el as HTMLElement).getAttribute("src") }),
      },
    ]
  },

  renderHTML({ node }) {
    const { src, alt, caption, width, align } = node.attrs
    const margin =
      align === "left"
        ? "0 auto 0 0"
        : align === "right"
          ? "0 0 0 auto"
          : "0 auto"
    return [
      "figure",
      {
        "data-type": "resizable-image",
        style: `max-width:${Number(width) || 100}%;margin-inline:${margin}`,
      },
      ["img", mergeAttributes({ src, alt: alt ?? "" })],
      ...(caption ? [["figcaption", {}, caption]] : []),
    ] as never
  },

  addCommands() {
    return {
      setResizableImage:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    }
  },
})

export const VideoEmbed = Node.create({
  name: "videoEmbed",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      variant: { default: "youtube" },
      caption: { default: null },
      poster: { default: null },
    }
  },

  parseHTML() {
    return [{ tag: "figure[data-type='video-embed']" }]
  },

  renderHTML({ node }) {
    const { src, variant, caption, poster } = node.attrs
    const media =
      variant === "file"
        ? [
            "video",
            { src, poster, controls: "true", class: "w-full rounded-2xl" },
          ]
        : [
            "div",
            { class: "aspect-video overflow-hidden rounded-2xl" },
            ["iframe", { src, class: "size-full", allowfullscreen: "true" }],
          ]
    return [
      "figure",
      { "data-type": "video-embed" },
      media,
      ...(caption ? [["figcaption", {}, caption]] : []),
    ] as never
  },

  addCommands() {
    return {
      setVideoEmbed:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    }
  },
})

/** Turns a YouTube/Vimeo watch or share URL into a privacy-friendly embed. */
export function toEmbedUrl(input: string) {
  let url: URL
  try {
    url = new URL(input.trim())
  } catch {
    return null
  }
  const host = url.hostname.replace(/^www\./, "")
  let id: string | null = null
  if (host === "youtu.be") id = url.pathname.slice(1)
  else if (
    host.endsWith("youtube.com") ||
    host.endsWith("youtube-nocookie.com")
  ) {
    id =
      url.searchParams.get("v") ??
      url.pathname.match(/\/(?:embed|shorts|live)\/([\w-]+)/)?.[1] ??
      null
  }
  if (id) {
    return {
      variant: "youtube" as const,
      src: `https://www.youtube-nocookie.com/embed/${id}`,
    }
  }
  const vimeo = host.endsWith("vimeo.com") && url.pathname.match(/(\d+)/)?.[1]
  if (vimeo) {
    return {
      variant: "vimeo" as const,
      src: `https://player.vimeo.com/video/${vimeo}`,
    }
  }
  return null
}
