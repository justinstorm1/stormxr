"use client"

import { ArrowRight, ChevronRight, Code, Code2, Eye, GitCommitVertical, HelpingHand, Home, Info, Presentation, Projector, SidebarIcon, User, User2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AppSidebar() {
    const pathname = usePathname();

    const [isNextWaveXR, setIsNextWaveXR] = useState(false);

    useEffect(() => {
        setIsNextWaveXR(pathname.includes("/nextwavexr"));
    }, [pathname]);

    return (
        <div className={`block xl:hidden ${isNextWaveXR ? "hidden" : ""}`}>
            <Sidebar collapsible="icon">
                <SidebarHeader className="border-b">
                    <SidebarMenu>
                        <SidebarMenuButton asChild size={"lg"}>
                             <a href="/" className='flex items-center gap-2 me-10'>
                                <img 
                                    src={"/images/StormXRLogo.png"}
                                    alt="StormXR"
                                    width={40}
                                    className='rounded-lg'
                                />
                                <div className='text-xl uppercase font-extrabold'>
                                    <span className='bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text'>Storm</span>
                                    <span className="text-foreground">XR</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Pages</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip={"Home"}>
                                        <a href="/">
                                            <Home />
                                            Home
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem> 
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip={"Media Projects"}>
                                        <a href="/media-projects">
                                            <Presentation />
                                            <span>Media Projects</span>
                                        </a>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <a href="/nextwavexr">
                                                    Next Wave XR
                                                </a>
                                            </SidebarMenuSubButton>
                                            <SidebarMenuSubButton asChild>
                                                <a href="/vrlens">
                                                    VR Lens Podcast
                                                </a>
                                            </SidebarMenuSubButton>
                                            <SidebarMenuSubButton asChild>
                                                <a href="/stormycsvr">
                                                    StormyCs VR
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={"About"}>
                                    <a href="/about">
                                        <Info />
                                        About
                                    </a>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild tooltip={"Development"}>
                                    <a href="/development">
                                        <Code2 />
                                        Development
                                    </a>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild tooltip={"Consulting"}>
                                    <a href="/consulting">
                                        <HelpingHand />
                                        Consulting
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="border-t p-3">
                    <a
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
                    </a>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}

function useeffect(arg0: () => void, arg1: string[]) {
    throw new Error("Function not implemented.");
}
