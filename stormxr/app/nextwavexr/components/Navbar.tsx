"use client"

import { ExternalLink, Home, Newspaper, BadgeQuestionMark, UserCircle2 } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link"

export default function Navbar({ articleLink }: { articleLink: string | undefined }) {

    const items = [
        {
            label: "Home",
            href: "/nextwavexr",
            icon: Home
        },
        {
            label: "About",
            href: "/nextwavexr/about",
            icon: BadgeQuestionMark
        },
        {
            label: "Articles",
            href: "/nextwavexr/articles",
            icon: Newspaper
        },
        {
            label: "Contact",
            href: "/nextwavexr/contact",
            icon: UserCircle2
        }
    ]

    return (
        <div className="flex flex-col border-b gap-3 p-5">
            <a href='/' className="mx-auto flex items-center gap-4">
                <img 
                    src={"/images/NextWaveXRLogo.png"} 
                    alt='...'
                    className="w-12 aspect-square rounded-md"
                />
                <h1 className='font-bold text-2xl'>Next Wave XR</h1>
            </a>
            <NavigationMenu className="mx-auto">
                <NavigationMenuList>

                    {items.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={item.href}>
                                    <item.icon />
                                    {item.label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                    {articleLink && (
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={articleLink} target='_blank'>
                                    <ExternalLink />
                                    Open
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )}

                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}