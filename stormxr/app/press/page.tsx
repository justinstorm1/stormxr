import { ArrowUpRight, Newspaper } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import { fetchPressReleases } from '@/lib/prlog.js';
import fallback from '@/data/press-releases.json';

// Re-fetch the PRLog newsroom on the deployed site every 6 hours so new
// press releases show up on their own — no manual re-scrape or redeploy.
export const revalidate = 21600;

async function getPressReleases() {
  try {
    const items = await fetchPressReleases({ revalidate });
    if (items.length > 0) return items;
  } catch (err) {
    console.error("Failed to fetch live press releases from PRLog, using cached snapshot:", err);
  }
  // Falls back to the bundled snapshot (data/press-releases.json) if PRLog
  // is unreachable or its markup changes in a way the scraper can't parse.
  return fallback.items;
}

export default async function Press() {
  const items = await getPressReleases();

  return (
    <section
      id="press"
      className="relative w-full max-w-screen bg-background"
    >
      <Navbar />

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[blue]/5 to-[#ff0088]/5 blur-[120px] rounded-full" />
      </div>

      <div className="@container/main relative z-10 py-24 px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-16 flex flex-col items-start gap-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#ff0080]">
            Press
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Press{" "}
            <span className="bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text">
              Releases
            </span>
          </h1>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">
            Official announcements from StormXR, syndicated via PRLog.
          </p>
        </div>

        {/* Press Release List */}
        <div className="flex flex-col gap-4 max-w-3xl">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-border bg-muted/20 p-6 transition-all duration-300 hover:border-border hover:bg-muted/40 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-[blue]/10 to-[blue]/5 text-[blue] flex items-center justify-center border border-[blue]/10">
                  <Newspaper className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>

              <div className="flex flex-col gap-1">
                {item.dateText && (
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.dateText}
                  </span>
                )}
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  {item.title}
                </h2>
                {item.summary && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>
                )}
              </div>
            </a>
          ))}

          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No press releases yet — check back soon.
            </p>
          )}
        </div>

      </div>

      <Footer />

    </section>
  );
}
