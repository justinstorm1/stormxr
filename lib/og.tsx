import "server-only"

import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { site } from "@/lib/site"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

type FontSpec = {
  family: string
  axes: string
  name: string
  weight: 400 | 500 | 700
}

const fonts: FontSpec[] = [
  // Archivo at its widest, matching the site's `.display` headlines.
  {
    family: "Archivo",
    axes: "wdth,wght@125,700",
    name: "Archivo Expanded",
    weight: 700,
  },
  { family: "Archivo", axes: "wght@400", name: "Archivo", weight: 400 },
  { family: "Geist Mono", axes: "wght@500", name: "Geist Mono", weight: 500 },
]

/**
 * Fetches a TTF subset containing only `text` from Google Fonts (Satori can't
 * read woff2). Returns null on failure so the image still renders.
 */
async function loadFont({ family, axes }: FontSpec, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${axes}&text=${encodeURIComponent(text)}`,
      { signal: AbortSignal.timeout(8_000) }
    ).then((r) => r.text())
    const url = css.match(
      /src: url\((.+?)\) format\('(?:truetype|opentype)'\)/
    )?.[1]
    if (!url) return null
    return await fetch(url, { signal: AbortSignal.timeout(8_000) }).then((r) =>
      r.arrayBuffer()
    )
  } catch {
    return null
  }
}

async function logoDataUri() {
  const png = await readFile(join(process.cwd(), "public/images/og-mark.png"))
  return `data:image/png;base64,${png.toString("base64")}`
}

const C = {
  bg: "#080a14",
  fg: "#f3f4fa",
  muted: "#a3aac2",
  blue: "#3f6dff",
  signal: "#7fa8ff",
  violet: "#a46cf5",
  pink: "#ea7cc4",
}

/** Three rounded glass planes crossed by the wave, after the StormXR mark. */
function Planes() {
  const tints = [C.blue, "#6c5cf6", C.violet]
  return (
    <div
      style={{
        position: "absolute",
        right: 40,
        top: 150,
        width: 440,
        height: 380,
        display: "flex",
      }}
    >
      {tints.map((tint, i) => (
        <div
          key={tint}
          style={{
            position: "absolute",
            left: 40 + i * 95,
            top: 40 - i * 22,
            width: 190,
            height: 270,
            borderRadius: 18,
            border: `2px solid ${tint}`,
            background: `linear-gradient(160deg, ${tint}55, rgba(255,255,255,0.02) 70%)`,
            boxShadow: `0 0 40px ${tint}66`,
            transform: "skewY(-10deg)",
          }}
        />
      ))}
      <svg
        width="560"
        height="140"
        viewBox="0 0 560 140"
        style={{ position: "absolute", left: -60, top: 110 }}
      >
        <defs>
          <linearGradient id="w" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={C.signal} stopOpacity="0" />
            <stop offset="0.25" stopColor={C.signal} />
            <stop offset="0.65" stopColor={C.violet} />
            <stop offset="1" stopColor={C.pink} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 70 Q70 10 140 70 T280 70 T420 70 T560 70"
          stroke="url(#w)"
          strokeWidth="5"
          fill="none"
        />
      </svg>
    </div>
  )
}

/**
 * The branded share image used by every route's `opengraph-image`.
 * Pass `background` (an absolute image URL) to show a photo behind the text.
 */
export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
  background,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  background?: string
}) {
  const label = eyebrow.toUpperCase()
  const footer = subtitle ?? site.url.replace(/^https?:\/\/(www\.)?/, "")
  const loaded = await Promise.all(
    fonts.map((f) =>
      loadFont(
        f,
        f.name === "Archivo Expanded"
          ? `${title}${site.name}`
          : f.name === "Geist Mono"
            ? label
            : footer
      )
    )
  )
  const logo = await logoDataUri()
  // Long titles step down so they always fit in three lines.
  const titleSize = title.length > 70 ? 54 : title.length > 40 ? 66 : 84

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: C.bg,
        color: C.fg,
        fontFamily: "Archivo",
      }}
    >
      {background ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={background}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background: background
            ? "linear-gradient(90deg, rgba(8,10,20,0.95) 0%, rgba(8,10,20,0.8) 55%, rgba(8,10,20,0.35) 100%)"
            : "radial-gradient(circle at 85% 25%, rgba(63,109,255,0.45), transparent 45%), radial-gradient(circle at 65% 85%, rgba(164,108,245,0.3), transparent 45%)",
        }}
      />
      {background ? null : <Planes />}

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          width: background ? 900 : 760,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt=""
            width={56}
            height={56}
            style={{ borderRadius: 14 }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo Expanded",
              fontSize: 32,
              letterSpacing: -1,
            }}
          >
            Storm<span style={{ color: C.signal }}>XR</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "Geist Mono",
              fontSize: 22,
              letterSpacing: 4,
              color: C.signal,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                background: `linear-gradient(90deg, ${C.signal}, ${C.violet})`,
              }}
            />
            {label}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo Expanded",
              fontSize: titleSize,
              lineHeight: 1.02,
              letterSpacing: -2.5,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            fontSize: 24,
            color: C.muted,
          }}
        >
          {footer}
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: fonts.flatMap((f, i) =>
        loaded[i]
          ? [
              {
                name: f.name,
                data: loaded[i],
                weight: f.weight,
                style: "normal" as const,
              },
            ]
          : []
      ),
    }
  )
}
