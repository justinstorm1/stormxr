/**
 * Shared PRLog newsroom scraper for StormXR.
 *
 * Used by:
 *  - app/press/page.tsx, which fetches this live on each ISR revalidation
 *  - scripts/scrape-prlog.mjs, which regenerates the offline fallback
 *    snapshot at data/press-releases.json
 *
 * Source: https://pressroom.prlog.org/StormXR/ (paginated index of every
 * press release PRLog has published for https://biz.prlog.org/StormXR/).
 */

export const PRLOG_NEWSROOM_URL = "https://pressroom.prlog.org/StormXR/";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

// Matches one press release entry inside the `<div class="idx">` listing:
//   <div class="h"><a href="URL" target="_top">TITLE</a></div>
//   <div><small class="m">DATE</small></div>
//   <div class="s">SUMMARY</div>
const ITEM_RE =
  /<div class="h"><a href="([^"]+)"[^>]*>([^<]+)<\/a><\/div>\s*<div><small class="m">([^<]+)<\/small><\/div>\s*<div class="s">([^<]*)<\/div>/g;

// Matches pagination links, e.g. <div class="pgr">...<a href="/StormXR/2/">2</a>...</div>
const PAGE_LINK_RE = /<div class="pgr">([\s\S]*?)<\/div>/;
const HREF_RE = /href="([^"]+)"/g;

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function slugFromLink(link) {
  const match = link.match(/\/(\d+)-([^/]+)\.html$/);
  return match ? match[2] : link;
}

async function fetchPage(url, fetchOptions) {
  const res = await fetch(url, {
    ...fetchOptions,
    headers: { "User-Agent": USER_AGENT, ...(fetchOptions?.headers || {}) },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

function extractItems(html) {
  const items = [];
  for (const match of html.matchAll(ITEM_RE)) {
    const [, link, title, dateText, summary] = match;
    const parsedDate = new Date(dateText);
    items.push({
      id: slugFromLink(link),
      title: decodeEntities(title),
      link,
      summary: decodeEntities(summary),
      date: Number.isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString(),
      dateText: dateText.trim(),
    });
  }
  return items;
}

function extractNextPageUrls(html, baseUrl) {
  const pgrMatch = html.match(PAGE_LINK_RE);
  if (!pgrMatch) return [];

  const urls = new Set();
  for (const hrefMatch of pgrMatch[1].matchAll(HREF_RE)) {
    urls.add(new URL(hrefMatch[1], baseUrl).toString());
  }
  return [...urls];
}

/**
 * Fetches every press release from the StormXR PRLog newsroom, following
 * pagination and de-duping by link. Newest first.
 *
 * @param {{ revalidate?: number, sourceUrl?: string }} [options]
 *   `revalidate` is forwarded to fetch's `next.revalidate` so Next.js ISR
 *   can cache/refresh this on its own when called from a Server Component.
 */
export async function fetchPressReleases({ revalidate, sourceUrl = PRLOG_NEWSROOM_URL } = {}) {
  const fetchOptions = revalidate !== undefined ? { next: { revalidate } } : {};

  const seenPages = new Set();
  const seenLinks = new Set();
  const allItems = [];

  let queue = [sourceUrl];

  while (queue.length > 0) {
    const url = queue.shift();
    if (seenPages.has(url)) continue;
    seenPages.add(url);

    const html = await fetchPage(url, fetchOptions);

    for (const item of extractItems(html)) {
      if (seenLinks.has(item.link)) continue;
      seenLinks.add(item.link);
      allItems.push(item);
    }

    for (const nextUrl of extractNextPageUrls(html, url)) {
      if (!seenPages.has(nextUrl)) queue.push(nextUrl);
    }
  }

  allItems.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return 0;
  });

  return allItems;
}
