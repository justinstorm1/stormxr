import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

import { formatArticleDate } from "@/lib/articles"
import { episodeHref, formatDuration, type Episode } from "@/lib/podcast"

export function EpisodeMeta({ episode }: { episode: Episode }) {
  return (
    <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
      {episode.episode && (
        <>
          <span className="text-signal">Ep. {episode.episode}</span>
          <span aria-hidden>·</span>
        </>
      )}
      <time dateTime={episode.date}>
        {formatArticleDate(Date.parse(episode.date))}
      </time>
      {episode.duration > 0 && (
        <>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {formatDuration(episode.duration)}
          </span>
        </>
      )}
    </p>
  )
}

/** The browser's audio player, so episodes play right on the page. */
export function EpisodePlayer({ episode }: { episode: Episode }) {
  return (
    <audio controls preload="none" src={episode.audioUrl} className="w-full">
      <a href={episode.audioUrl}>Download the episode</a>
    </audio>
  )
}

export function EpisodeList({ episodes }: { episodes: Episode[] }) {
  return (
    <ul className="divide-y divide-line">
      {episodes.map((e) => (
        <li key={e.slug}>
          <Link
            href={episodeHref(e)}
            className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
          >
            <span className="min-w-0">
              <EpisodeMeta episode={e} />
              <span className="display mt-2 block text-2xl transition-colors group-hover:text-signal">
                {e.title}
              </span>
              {e.notes[0] && (
                <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                  {e.notes[0]}
                </span>
              )}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
              Listen
              <ArrowRight className="size-4 text-signal transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
