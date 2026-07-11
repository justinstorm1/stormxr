"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Code2, Handshake, Home, Info, Menu, Moon, Presentation, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const mediaProjects = [
  {
    title: "NextWave XR",
    href: "/nextwavexr",
    description: "Editorial and analysis platform where I write about spatial computing, immersive media, and real-world XR adoption.",
  },
  {
    title: "VR Lens Podcast",
    href: "/vrlens",
    description: "Podcast and media side where I do interviews and discussions around VR and emerging technology.",
  },
  {
    title: "StormyCs VR",
    href: "/stormycsvr",
    description: "Casual creator and community-facing side focused on gaming, fitness, and personality-driven VR content.",
  },
];

const secondaryLinks = [
  { title: "About", href: "/about", icon: Info },
  { title: "Development", href: "/development", icon: Code2 },
  { title: "Advisory", href: "/advisory", icon: Handshake },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 0);
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
        <header
          className="w-full fixed z-50 top-0 left-0 transition-all duration-300"
        >

          <div className={`flex items-center px-4 py-3 xl:px-20 transition-all duration-300 ${
            scrolled
              ? "backdrop-blur-sm bg-background/70 border-b border-border/50 shadow-sm"
              : ""
          }`}>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="flex xl:hidden me-2 rounded-lg"
                  aria-label="Open menu"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 sm:max-w-72">
                <SheetHeader className="border-b">
                  <SheetTitle className="sr-only">Site navigation</SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <img
                      src={"/images/StormXRLogoNoText.png"}
                      alt="StormXR"
                      width={36}
                      className="rounded-lg"
                    />
                    <div className="text-lg uppercase font-extrabold">
                      <span className="bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text">Storm</span>
                      <span className="text-foreground">XR</span>
                    </div>
                  </Link>
                </SheetHeader>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
                  <SheetClose asChild>
                    <Link href="/" className={mobileLinkClass}>
                      <Home className="size-4" />
                      Home
                    </Link>
                  </SheetClose>

                  <div className="mt-2 flex flex-col gap-1">
                    <p className="flex items-center gap-2 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      <Presentation className="size-3.5" />
                      Media Projects
                    </p>
                    {mediaProjects.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link href={item.href} className={cn(mobileLinkClass, "ms-4")}>
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  {secondaryLinks.map(({ title, href, icon: Icon }) => (
                    <SheetClose asChild key={href}>
                      <Link href={href} className={mobileLinkClass}>
                        <Icon className="size-4" />
                        {title}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <SheetFooter className="border-t">
                  <SheetClose asChild>
                    <Button asChild className="w-full rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] font-bold text-white hover:opacity-90">
                      <Link href="/contact">
                        Contact
                      </Link>
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Link href="/" className='flex items-center gap-2 xl:me-10'>
              <img
                src={"/images/StormXRLogoNoText.png"}
                alt="StormXR"
                width={40}
                className='rounded-lg'
              />
              <div className='hidden text-xl uppercase font-extrabold sm:block'>
                <span className='bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text'>Storm</span>
                <span className="text-foreground">XR</span>
              </div>
            </Link>

            <NavigationMenu className='ms-auto hidden xl:flex'>
              <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href='/'>Home</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Link href="/media-projects">Media Projects</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {mediaProjects.map((item) => (
                          <ListItem
                            key={item.href}
                            title={item.title}
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href='/about' asChild>
                      <Link href='/about'>About</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href='/development'>Development</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href='/advisory'>Advisory</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild className='hidden xl:flex ms-10 px-5 py-4 rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold hover:opacity-90 transition-opacity'>
              <Link href="/contact">
                Contact
              </Link>
            </Button>

            <Button
              className="ms-auto rounded-lg"
              variant={'ghost'}
              size={'icon'}
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon />
              ) : (
                <Sun />
              )}
            </Button>
          </div>

      </header>
    )
}

const mobileLinkClass = "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground";

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
