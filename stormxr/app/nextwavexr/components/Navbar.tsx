"use client"

import { useState } from "react";
import { ExternalLink, Home, Newspaper, BadgeQuestionMark, UserCircle2, ArrowLeft, Menu, X } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar({ articleLink }: { articleLink: string | undefined }) {
  const [open, setOpen] = useState(false);

  const items = [
    { label: "Home",     href: "/nextwavexr",         icon: Home             },
    { label: "About",    href: "/nextwavexr/about",    icon: BadgeQuestionMark },
    { label: "Articles", href: "/nextwavexr/articles", icon: Newspaper        },
    { label: "Contact",  href: "/nextwavexr/contact",  icon: UserCircle2      },
  ];

  return (
    <div className="flex flex-col border-b p-5">

      {/* Top row: logo + hamburger on mobile */}
      <div className="flex items-center justify-between">
        <a href="/nextwavexr" className="flex items-center gap-4 mx-0 md:mx-auto">
          <Image
            src="/images/NextWaveXRLogo.png"
            alt="NextWave XR"
            className="aspect-square rounded-md"
            height={48}
            width={48}
          />
          <h1 className="font-bold text-2xl">NextWave XR</h1>
        </a>

        {/* Hamburger — mobile only */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Desktop nav row */}
      <div className="hidden md:flex w-full relative items-center mt-3">
        <Button variant="link" asChild className="absolute left-0 text-foreground">
          <Link href="/">
            <ArrowLeft />
            Back to StormXR
          </Link>
        </Button>

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
                  <Link href={articleLink} target="_blank">
                    <ExternalLink />
                    Open
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="flex flex-col md:hidden mt-3 gap-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to StormXR
          </Link>

          <div className="h-px bg-border my-1" />

          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}

          {articleLink && (
            <Link
              href={articleLink}
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Open Article
            </Link>
          )}
        </div>
      )}
    </div>
  );
}