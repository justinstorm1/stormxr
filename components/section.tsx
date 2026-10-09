import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Wave } from "@/components/wave"
import { cn } from "@/lib/utils"

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
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
        "label inline-flex items-center gap-2.5 text-signal",
        className
      )}
    >
      <span className="bg-brand size-1.5 rounded-full" aria-hidden />
      {children}
    </p>
  )
}

/** Numbered pill that opens a section: `(01 · What we do) ———`. */
export function SectionRule({
  index,
  label,
  className,
}: {
  index: string
  label: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="label inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-muted-foreground ring-1 ring-line">
        <span className="text-gradient">{index}</span>
        {label}
      </span>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  )
}

/** Large section heading. Wrap words in <em> to highlight them with the brand gradient. */
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
        "max-w-3xl",
        align === "center" &&
          "mx-auto text-center [&_p:first-child]:justify-center",
        className
      )}
    >
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "display",
          Tag === "h1"
            ? "text-5xl sm:text-7xl lg:text-[5.5rem]"
            : "text-4xl sm:text-5xl lg:text-[3.6rem]"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

/** Top-of-page header for interior pages. */
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
    <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0 mask-[radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)] opacity-70" />
        <div className="absolute -top-48 right-[-5%] h-120 w-160 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute -top-24 right-[30%] h-80 w-120 rounded-full bg-violet/15 blur-[140px]" />
        <Wave
          amplitude={40}
          className="absolute inset-x-0 bottom-0 h-24 w-full opacity-70"
        />
      </div>
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display mt-6 max-w-5xl text-5xl sm:text-7xl lg:text-[6rem]">
          {title}
        </h1>
        {(description || children) && (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            {description && (
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
            {children && <div className="lg:justify-self-end">{children}</div>}
          </div>
        )}
      </Container>
    </section>
  )
}

/** Rounded gradient call-to-action card that closes most pages. */
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
      <section className="reveal relative isolate overflow-hidden rounded-[2rem] bg-primary text-primary-foreground shadow-[0_40px_120px_-50px_var(--violet)] sm:rounded-[2.5rem]">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-br from-primary via-[oklch(0.5_0.22_280)] to-violet" />
          {/*
            Soft glows as radial gradients, not blurred circles: hovering the
            button repaints the area behind it, and a re-rasterized large blur
            doesn't quite match the original, leaving a visible patch.
          */}
          <div className="absolute -top-70 -left-50 size-180 bg-[radial-gradient(closest-side,oklch(0.62_0.2_255/70%)_30%,transparent)]" />
          <div className="absolute -right-56 -bottom-80 size-190 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--pink)_45%,transparent)_30%,transparent)]" />
          <div className="bg-dots absolute inset-0 mask-[linear-gradient(to_left,black,transparent_70%)] opacity-25" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_0_oklch(1_0_0/30%),inset_0_0_0_1px_oklch(1_0_0/12%)]" />
        </div>
        <div className="px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
          <p className="label inline-flex items-center gap-2.5 text-white/80">
            <span className="size-1.5 rounded-full bg-white" aria-hidden />
            {eyebrow}
          </p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
            <h2 className="display text-5xl sm:text-6xl lg:text-7xl [&_em]:bg-none [&_em]:text-white/65">
              {title}
            </h2>
            <div className="space-y-8">
              <p className="max-w-md text-lg leading-relaxed text-white/90">
                {description}
              </p>
              <Link
                href={href}
                className={buttonVariants({ size: "xl", variant: "inverse" })}
              >
                {cta}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
