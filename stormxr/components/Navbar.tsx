"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Code2, Handshake, Home, Info, Menu, Moon, Presentation, Sun, X } from "lucide-react";
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

          <div className={cn(
            "flex items-center px-4 py-3 xl:px-20 transition-all duration-300",
            (scrolled || menuOpen)
              ? "backdrop-blur-sm bg-background/70 border-b border-border/50 shadow-sm"
              : ""
          )}>

            <Button
              variant={"ghost"}
              size={"icon"}
              className="flex xl:hidden me-2 rounded-lg"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>

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

          {menuOpen && (
            <nav className="flex flex-col gap-1 border-b border-border bg-background px-4 py-3 shadow-sm xl:hidden">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass}
              >
                <Home className="size-4" />
                Home
              </Link>

              <div className="mt-1 flex flex-col gap-1">
                <p className="flex items-center gap-2 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <Presentation className="size-3.5" />
                  Media Projects
                </p>
                {mediaProjects.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(mobileLinkClass, "ms-4")}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              {secondaryLinks.map(({ title, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  <Icon className="size-4" />
                  {title}
                </Link>
              ))}

              <Button asChild className="mt-2 w-full rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] font-bold text-white hover:opacity-90">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </Button>
            </nav>
          )}

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
