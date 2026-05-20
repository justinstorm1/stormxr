"use client"

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexProvider, ConvexProviderWithAuth, ConvexReactClient } from "convex/react"
import * as React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ConvexProvider client={convex}>
            <ConvexAuthProvider
                client={convex}
            >
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </ConvexAuthProvider>
        </ConvexProvider>
    )
}