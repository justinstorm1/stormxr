"use client"

import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

/** Convex client with Convex Auth (tokens kept in localStorage). */
export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>
}
