/**
 * Just enough XML handling for the RSS/Atom feeds the site reads (PRLog,
 * the VR Lens podcast, YouTube). Not a general parser.
 */

/** Unwraps CDATA and decodes entities. */
export function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16))
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim()
}

const escapeName = (name: string) => name.replace(/[.:]/g, "\\$&")

/** Decoded text of the first `<name>` element in `xml`. */
export const tag = (xml: string, name: string) =>
  decode(
    xml.match(
      new RegExp(
        `<${escapeName(name)}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapeName(name)}>`
      )
    )?.[1] ?? ""
  )

/** Value of `attr` on the first `<name …>` element in `xml`. */
export const attr = (xml: string, name: string, attr: string) =>
  decode(
    xml.match(
      new RegExp(`<${escapeName(name)}\\s[^>]*?\\b${attr}="([^"]*)"`)
    )?.[1] ?? ""
  )

/** Inner XML of every `<name>` element in `xml`. */
export const items = (xml: string, name: string) =>
  [
    ...xml.matchAll(
      new RegExp(`<${escapeName(name)}>([\\s\\S]*?)</${escapeName(name)}>`, "g")
    ),
  ].map((m) => m[1])

/** Plain-text paragraphs from a feed's HTML description. */
export function htmlParagraphs(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .split(/<\/p>|\n{2,}/i)
    .map((p) => decode(p.replace(/<[^>]+>/g, "")).replace(/[ \t]+/g, " "))
    .filter(Boolean)
}
