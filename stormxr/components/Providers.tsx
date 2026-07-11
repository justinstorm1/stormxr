"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { TooltipProvider } from "./ui/tooltip";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { Toaster } from "./ui/sonner";

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
        <Toaster />
      </ConvexAuthProvider>
    </ConvexProvider>
  );
}