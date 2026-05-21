"use client"

import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ArrowRight, Terminal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Page() {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative w-full min-h-dvh bg-background text-foreground transition-colors duration-300">

      <Navbar />

      <section 
        id="home" 
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
      >
        {/* Subtle Background Grid - Swaps lines from dark grey to light grey depending on mode */}
        <div 
          className="absolute inset-0 opacity-15 dark:opacity-7.5 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(circle 60% at 50% 50%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle 60% at 50% 50%, #000 40%, transparent 100%)'
          }}
        />

        {/* Ambient Gradient Glows - Retains blue/pink glows but lowers visibility slightly in light mode */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[blue]/10 to-[#ff0088]/10 dark:from-[blue]/15 dark:to-[#ff0088]/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Main Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/60 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <Terminal className="h-3.5 w-3.5 text-[#ff0088]" />
            <span>Now in Public Beta</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            The Next Dimension of <br />
            <span className="bg-gradient-to-r from-[blue] via-[#d90479] to-[#ff0088] text-transparent bg-clip-text">
              Virtual Reality
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-xl text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            Build, deploy, and scale immersive extended reality applications. High-performance infrastructure tailored for modern XR workflows.
          </p>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button className="px-8 py-6 rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold shadow-lg shadow-blue-500/10 hover:opacity-90 transition-opacity flex items-center gap-2 text-base">
              Media Projects <ArrowRight className="h-4 w-4" />
            </Button>
            
            <a 
              href="#about" 
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-border bg-muted/20 hover:bg-muted/60 text-foreground font-semibold text-base backdrop-blur-sm transition-all"
            >
              Learn More
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}