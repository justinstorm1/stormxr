"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react";
import AppSidebar from "./AppSidebar";
import { SidebarInput, SidebarInset, SidebarProvider } from "./ui/sidebar";
import { TooltipProvider } from "./ui/tooltip";
import { ConvexAuthProvider } from "@convex-dev/auth/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <ConvexAuthProvider
          client={convex}
      >
        <TooltipProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
      </ConvexAuthProvider>
    </ConvexProvider>
  );
}