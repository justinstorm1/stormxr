import { useId } from "react"

import { cn } from "@/lib/utils"

/** A sine path from x=0 to `width`, one period every 400 units. */
function sine(amplitude: number, width = 2000) {
  let d = `M0 100 Q100 ${100 - amplitude} 200 100`
  for (let x = 400; x <= width; x += 200) d += ` T${x} 100`
  return d
}

/**
 * The StormXR wave — an endlessly scrolling line of light, cobalt → violet →
 * pink. The gradient is a static rect masked by the moving path, so the colors
 * stay put while the wave travels through them. Decorative.
 */
export function Wave({
  className,
  amplitude = 60,
}: {
  className?: string
  amplitude?: number
}) {
  // Strip characters that would break `url(#id)` references.
  const id = useId().replace(/[^\w-]/g, "")
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      fill="none"
      className={cn(
        "pointer-events-none mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
        className
      )}
    >
      <defs>
        <linearGradient
          id={`${id}g`}
          x1="0"
          x2="1200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.15" stopColor="var(--signal)" />
          <stop offset="0.6" stopColor="var(--violet)" />
          <stop offset="0.9" stopColor="var(--pink)" />
        </linearGradient>
        <mask
          id={`${id}m`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1200"
          height="200"
        >
          <path
            d={sine(amplitude)}
            className="wave-path"
            stroke="white"
            strokeWidth={2.5}
            vectorEffect="non-scaling-stroke"
          />
        </mask>
      </defs>
      <path
        d={sine(amplitude * 0.55)}
        className="wave-path-slow"
        stroke="var(--primary)"
        strokeOpacity={0.45}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
      <g className="drop-shadow-[0_0_10px_var(--violet)]">
        <rect
          width="1200"
          height="200"
          fill={`url(#${id}g)`}
          mask={`url(#${id}m)`}
        />
      </g>
    </svg>
  )
}
