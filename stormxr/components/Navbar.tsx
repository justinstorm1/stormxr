"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { SidebarTrigger } from "./ui/sidebar";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

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
          className="w-full sticky z-50 top-0 left-0 transition-all duration-300"
        >

          <div className={`absolute inset-x-0 top-0 flex items-center px-4 py-3 xl:px-20 transition-all duration-300 ${
            scrolled
              ? "backdrop-blur-sm bg-background/70 border-b border-border/50 shadow-sm"
              : ""
          }`}>

            <SidebarTrigger className="flex xl:hidden gap-4 me-4" />
          
    
            <a href="/" className='hidden xl:flex items-center gap-2 me-10'>
              <Image 
                src={"/images/StormXRLogoNoText.png"}
                alt="StormXR"
                width={45}
                height={45}
                className='rounded-lg'
              />
              <div className='text-xl uppercase font-extrabold'>
                <span className='bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text'>Storm</span>
                <span className="text-foreground">XR</span>
              </div>
            </a>

            <NavigationMenu className='ms-auto hidden xl:flex'>
              <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href='/'>
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <a href="/media-projects">Media Projects</a>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <ListItem
                          key={0}
                          title={"NextWave XR"}
                          href={"/nextwavexr"}
                        >
                          Editorial and analysis platform where I write about spatial computing, immersive media, and real-world XR adoption.
                        </ListItem>
                        <ListItem
                          key={1}
                          title={"VR Lens Podcast"}
                          href={"/vrlens"}
                        >
                          Podcast and media side where I do interviews and discussions around VR and emerging technology.
                        </ListItem>
                        <ListItem
                          key={2}
                          title={"StormyCs VR"}
                          href={"/stormycsvr"}
                        >
                          Casual creator and community-facing side focused on gaming, fitness, and personality-driven VR content.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href='/about'>
                      About
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href='/development'>
                      Development
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href='/advisory'>
                      Advisory
                    </NavigationMenuLink>
                  </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild className='hidden xl:flex ms-10 px-5 py-4 rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold hover:opacity-90 transition-opacity'>
              <Link href="/contact">
                Contact
              </Link>
            </Button>
          </div>
           
      </header>
    )
}

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