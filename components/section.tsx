import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}
      {...props}
    />
  )
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-primary uppercase",
        className
      )}
    >
      <span className="h-px w-6 bg-primary/60" aria-hidden />
      {children}
    </p>
  )
}

/** Large section heading. Wrap words in <em> to get the italic gradient accent. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  className?: string
  align?: "left" | "center"
  as?: "h1" | "h2"
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" &&
          "mx-auto text-center [&_p:first-child]:justify-center",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "mt-4 font-medium tracking-tight [&_em]:font-serif [&_em]:font-normal [&_em]:tracking-normal",
          "em-storm [&_em]:pr-1",
          Tag === "h1"
            ? "text-4xl leading-[1.05] sm:text-6xl"
            : "text-3xl leading-[1.1] sm:text-[2.6rem]"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

/** Top-of-page header for interior pages, with an ambient glow. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)] opacity-50" />
        <div className="animate-drift absolute -top-40 left-1/2 h-112 w-176 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="animate-drift-slow absolute -top-20 right-[-10%] h-80 w-120 rounded-full bg-violet/15 blur-[120px]" />
      </div>
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="max-w-3xl"
        />
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  )
}

export function CtaBand({
  eyebrow = "Work with us",
  title,
  description,
  href = "/contact",
  cta = "Start a conversation",
}: {
  eyebrow?: string
  title: React.ReactNode
  description: React.ReactNode
  href?: string
  cta?: string
}) {
  return (
    <Container className="mt-24 sm:mt-32">
      <div className="reveal relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-card px-6 py-14 sm:px-14 sm:py-20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -bottom-32 -left-20 h-80 w-120 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute -top-32 right-0 h-80 w-120 rounded-full bg-violet/20 blur-[100px]" />
          <div className="bg-grid absolute inset-0 mask-[linear-gradient(to_bottom,black,transparent)] opacity-30" />
        </div>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Link
            href={href}
            className={cn(buttonVariants({ size: "xl" }), "shrink-0")}
          >
            {cta}
            <ArrowRight data-icon="inline-end" />
          </Link>
        </div>
      </div>
    </Container>
  )
}
