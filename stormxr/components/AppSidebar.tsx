"use client"

import { ArrowRight, ChevronRight, Code, Code2, Eye, GitCommitVertical, HelpingHand, Home, Presentation, Projector, SidebarIcon, User, User2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from "./ui/sidebar";

export default function AppSidebar() {

    return (
        <div className="block xl:hidden">
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
                                <Collapsible
                                    asChild
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={"Media Projects"}>
                                                <Presentation />
                                                <span>Media Projects</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href="/nextwavexr">
                                                            Next Wave XR
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href="#">
                                                            VR Lens Podcast
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href="#">
                                                            StormyCs VR
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                                <SidebarMenuButton asChild tooltip={"Consulting"}>
                                    <a href="/consulting">
                                        <HelpingHand />
                                        Consulting
                                    </a>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild tooltip={"Development"}>
                                    <a href="/development">
                                        <Code2 />
                                        Development
                                    </a>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild tooltip={"Our Vision"}>
                                    <a href="/ourvision">
                                        <Eye />
                                        Our Vision
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarSeparator />
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={"Contact"} className="bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold justify-center">
                                    <a href="/contact">
                                        <User2 />
                                        Contact
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarMenu>
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
        </div>
    );
}