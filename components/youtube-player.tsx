"use client"

import { Play } from "lucide-react"
import Image from "next/image"
import * as React from "react"

/**
 * A YouTube thumbnail that swaps itself for the player when clicked, so the
 * page doesn't load YouTube's scripts until someone actually wants to watch.
 */
export function YouTubePlayer({
  id,
  title,
  thumbnail,
}: {
  id: string
  title: string
  thumbnail: string
}) {
  const [playing, setPlaying] = React.useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        className="absolute inset-0 size-full"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group/play absolute inset-0 size-full cursor-pointer outline-none"
    >
      <Image
        src={thumbnail}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover/play:scale-[1.04]"
      />
      <span className="absolute inset-0 bg-black/20 transition-colors group-hover/play:bg-black/10" />
      <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 shadow-black/40 ring-white/15 transition-transform group-hover/play:scale-110 group-focus-visible/play:scale-110">
        <Play className="size-5 translate-x-px fill-current" />
      </span>
      <span className="sr-only">Play “{title}”</span>
    </button>
  )
}
