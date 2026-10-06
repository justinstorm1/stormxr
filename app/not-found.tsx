import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/section"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pt-44 pb-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-96 w-160 -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />
        <div className="hero-grid opacity-30" />
      </div>
      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
          404
        </p>
        <h1 className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
          Lost in{" "}
          <em className="text-storm font-serif font-normal">virtual space</em>
        </h1>
        <p className="mt-5 max-w-md text-muted-foreground">
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
    </section>
  )
}
