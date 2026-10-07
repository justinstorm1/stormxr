import type { Metadata } from "next"

import { AdminShell } from "@/components/admin/admin-shell"
import { ConvexClientProvider } from "@/components/convex-provider"

export const metadata: Metadata = {
  title: {
    default: "Admin sign in",
    template: "%s | NextWave XR Admin",
  },
  description: "Manage NextWave XR articles.",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: LayoutProps<"/nextwavexr/admin">) {
  return (
    <ConvexClientProvider>
      <AdminShell>{children}</AdminShell>
    </ConvexClientProvider>
  )
}
