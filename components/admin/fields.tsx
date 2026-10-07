import { cn } from "@/lib/utils"

export const inputClass =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 transition outline-none focus:border-signal focus:ring-3 focus:ring-ring/25 aria-invalid:border-destructive/70 disabled:opacity-60 sm:text-sm"

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
}: {
  label: string
  htmlFor: string
  hint?: React.ReactNode
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="label mb-2.5 flex justify-between gap-4 text-muted-foreground"
      >
        {label}
        {hint && (
          <span className="tracking-normal normal-case opacity-80">{hint}</span>
        )}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  )
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(inputClass, className)} {...props} />
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea className={cn(inputClass, "resize-y", className)} {...props} />
  )
}

export function Select({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        inputClass,
        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23a3aac2%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] appearance-none bg-position-[right_1rem_center] bg-no-repeat pr-10",
        className
      )}
      {...props}
    />
  )
}

/** Small inline status line used for save results and errors. */
export function Notice({
  tone,
  children,
}: {
  tone: "error" | "success"
  children: React.ReactNode
}) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        tone === "error"
          ? "border-destructive/40 bg-destructive/10 text-destructive"
          : "border-signal/30 bg-primary/10 text-signal"
      )}
    >
      {children}
    </p>
  )
}

/** Published / draft / scheduled pill. */
export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "label rounded-full px-2.5 py-1 text-[0.6rem] ring-1",
        status === "published" && "bg-primary/15 text-signal ring-primary/40",
        status === "scheduled" && "bg-violet/15 text-violet ring-violet/40",
        status === "draft" && "bg-white/5 text-muted-foreground ring-line"
      )}
    >
      {status}
    </span>
  )
}
