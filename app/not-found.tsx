import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Container, Eyebrow } from "@/components/section"
import { buttonVariants } from "@/components/ui/button"
import { Wave } from "@/components/wave"

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pt-40 pb-16">
      {/* not-found.tsx can't export metadata; React hoists this into <head>. */}
      <title>Page not found | StormXR</title>
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-60" />
        <div className="absolute top-1/4 left-[30%] h-80 w-120 rounded-full bg-violet/20 blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 h-96 w-160 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      </div>
      <Container className="flex flex-col items-center text-center">
        <Eyebrow>Error 404 — signal lost</Eyebrow>
        <p
          aria-hidden
          className="display mt-6 bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--signal)_55%,transparent),color-mix(in_oklch,var(--violet)_25%,transparent)_60%,transparent)] bg-clip-text text-[10rem] leading-none text-transparent sm:text-[16rem]"
        >
          404
        </p>
        <h1 className="display text-4xl sm:text-6xl">
          Lost in <em>virtual space</em>
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className={buttonVariants({ size: "xl", className: "mt-10" })}
        >
          Back to StormXR
          <ArrowRight data-icon="inline-end" />
        </Link>
      </Container>
      <Wave className="mt-16 h-28 w-full" />
    </section>
  )
}
