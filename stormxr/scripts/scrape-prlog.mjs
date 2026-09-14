#!/usr/bin/env node
/**
 * Regenerates the offline fallback snapshot at data/press-releases.json.
 *
 * The /press page fetches PRLog live on every request via ISR (see
 * lib/prlog.js and app/press/page.tsx) and updates itself automatically —
 * this script is no longer required for normal operation. It only refreshes
 * the bundled fallback that the page falls back to if the live fetch to
 * PRLog ever fails.
 *
 * Usage: node scripts/scrape-prlog.mjs
 */

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchPressReleases, PRLOG_NEWSROOM_URL } from "../lib/prlog.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "data", "press-releases.json");

async function main() {
  const items = await fetchPressReleases();

  if (items.length === 0) {
    console.error("No press releases found — aborting write to avoid clobbering existing data.");
    process.exitCode = 1;
    return;
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(
    OUTPUT_PATH,
    JSON.stringify(
      {
        source: PRLOG_NEWSROOM_URL,
        scrapedAt: new Date().toISOString(),
        count: items.length,
        items,
      },
      null,
      2
    ) + "\n"
  );

  console.log(`Wrote ${items.length} press release(s) to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
