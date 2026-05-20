import Link from "next/link";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export default function Navbar() {
    return (
        <header className='w-full absolute z-50 top-0 left-1/2 -translate-x-1/2 py-3 transition-all duration-300 px-4 xl:px-20 flex items-center'>
           
          <SidebarTrigger className="flex xl:hidden gap-4 me-4" />
         
  
          <a href="/" className='hidden xl:flex items-center gap-2 me-10'>
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

          <NavigationMenu className='ms-auto hidden xl:flex'>
            <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href='/'>
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Media Projects</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem
                        key={0}
                        title={"Next Wave XR"}
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
                        href={"/vrlens"}
                      >
                        Casual creator and community-facing side focused on gaming, fitness, and personality-driven VR content.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href='/consulting'>
                    Consulting
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href='/development'>
                    Development
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href='/ourvision'>
                    Our Vision
                  </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button className='hidden xl:flex ms-10 px-5 py-4 rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold hover:opacity-90 transition-opacity'>
            Contact
          </Button>
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