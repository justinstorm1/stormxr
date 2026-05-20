"use client"

import AdminProviders from "../components/AdminProviders";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { UnauthenticatedScreen } from "./create/page";
import Page from "./page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <AdminProviders>
            <Unauthenticated>
                <Page />
            </Unauthenticated>
            <Authenticated>
                {children}
            </Authenticated>
        </AdminProviders>
    )
}