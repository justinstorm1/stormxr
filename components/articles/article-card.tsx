import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import {
  articleHref,
  formatArticleDate,
  isExternal,
  type ArticleSummary,
} from "@/lib/articles"
import { cn } from "@/lib/utils"

export function ArticleCard({
  article,
  featured = false,
  className,
}: {
  article: ArticleSummary
  featured?: boolean
  className?: string
}) {
  const external = isExternal(article)
  const href = articleHref(article)
  const body = (
    <>
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.4rem] bg-card",
          featured ? "aspect-video lg:aspect-auto lg:h-full" : "aspect-video"
        )}
      >
        {article.headerImage ? (
          <Image
            src={article.headerImage}
            alt=""
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 60vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="bg-dots absolute inset-0 opacity-50" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent" />
        <span className="label absolute top-3 left-3 rounded-full bg-background/70 px-2.5 py-1 text-[0.6rem] text-foreground ring-1 ring-white/10 backdrop-blur">
          {external ? "UploadVR" : "NextWave XR"}
        </span>
      </div>
      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "p-4 lg:justify-center lg:p-8" : "p-4 sm:p-5"
        )}
      >
        <p className="label flex items-center gap-2 text-muted-foreground">
          <span className="text-gradient">{article.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={new Date(article.date).toISOString()}>
            {formatArticleDate(article.date)}
          </time>
        </p>
        <h3
          className={cn(
            "display mt-3 transition-colors group-hover:text-signal",
            featured ? "text-3xl sm:text-4xl" : "text-xl leading-tight"
          )}
        >
          {article.title}
        </h3>
        {featured && article.excerpt && (
          <p className="mt-4 text-muted-foreground">{article.excerpt}</p>
        )}
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-signal">
          {external ? "Read on UploadVR" : "Read article"}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </>
  )

  const classes = cn(
    "glass group flex flex-col p-2 outline-none",
    featured && "lg:grid lg:grid-cols-[1.4fr_1fr]",
    className
  )

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {body}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {body}
    </Link>
  )
}
