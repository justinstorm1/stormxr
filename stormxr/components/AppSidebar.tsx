"use client"

import { Code2, Handshake, Home, Info, Presentation, User2, ArrowRight } from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem
} from "./ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AppSidebar() {
    const pathname = usePathname();
    const sidebarHidden = pathname.includes("/nextwavexr") || pathname.includes("/privacy-policy");

    return (
        <div className={`block xl:hidden ${sidebarHidden ? "hidden" : ""}`}>
            <Sidebar collapsible="icon">
                <SidebarHeader className="border-b">
                    <SidebarMenu>
                        <SidebarMenuButton asChild size={"lg"}>
                            <Link href="/" className='flex items-center gap-2 me-10'>
                                <Image
                                    src={"/images/StormXRLogoNoText.png"}
                                    alt="StormXR"
                                    width={40}
                                    height={40}
                                    className='rounded-lg'
                                />
                                <div className='text-xl uppercase font-extrabold'>
                                    <span className='bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text'>Storm</span>
                                    <span className="text-foreground">XR</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Pages</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip={"Home"} data-tooltip-delay={0}>
                                        <Link href="/">
                                            <Home />
                                            Home
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip={"Media Projects"} data-tooltip-delay={0}>
                                        <Link href="/media-projects">
                                            <Presentation />
                                            <span>Media Projects</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <a href="/nextwavexr">NextWave XR</a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/vrlens">VR Lens Podcast</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/stormycsvr">StormyCs VR</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip={"About"} data-tooltip-delay={0}>
                                        <Link href="/about">
                                            <Info />
                                            About
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip={"Development"} data-tooltip-delay={0}>
                                        <Link href="/development">
                                            <Code2 />
                                            Development
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip={"Advisory"} data-tooltip-delay={0}>
                                        <Link href="/advisory">
                                            <Handshake />
                                            Advisory
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="border-t p-3">
                    <Link
                        href="/contact"
                        className="
                            flex items-center gap-3 rounded-lg px-3 py-2.5
                            bg-gradient-to-r from-blue-600 to-[#ff0088]
                            text-white font-semibold text-sm
                            transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-pink-500/20
                            group-data-[collapsible=icon]:justify-center
                            group-data-[collapsible=icon]:px-0
                            group-data-[collapsible=icon]:py-2.5
                            group-data-[collapsible=icon]:rounded-lg
                        "
                    >
                        <User2 className="size-4 shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">
                            Contact Us
                        </span>
                        <ArrowRight className="ml-auto size-3.5 opacity-70 group-data-[collapsible=icon]:hidden" />
                    </Link>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}