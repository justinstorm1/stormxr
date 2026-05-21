"use client"

import React from 'react';
import { Code2, Smartphone, ArrowUpRight, AppWindow, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

export default function Development() {
  return (
    <section 
      id="development" 
      className="relative w-full max-w-screen bg-background"
    >

        <Navbar />

      {/* Background Ambient Glow */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[blue]/5 to-[#ff0088]/5 blur-[130px] rounded-full pointer-events-none" /> */}

      <div className="@container/main relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 flex flex-col items-start gap-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#ff0088]">
            Our Craft
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Engineered for the <span className="bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text">Next Generation</span>
          </h2>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">
            We build high-performance digital architectures. From bleeding-edge web platforms to native iOS ecosystems, our deployments are optimized for raw scale and fluid immersion.
          </p>
        </div>

        {/* Bento Grid Split */}
        <div className="grid grid-cols-1 @4xl/main:grid-cols-12 gap-6 @6xl/main:gap-8 items-stretch">
          
          {/* Card 1: Web Development (Spans 5 columns on large screens) */}
          <div className="group relative lg:col-span-5 flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-muted/30 p-8 shadow-sm transition-all duration-300 hover:border-[blue]/30 hover:bg-muted/50">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-[blue]/10 text-[blue] flex items-center justify-center mb-6 border border-[blue]/20">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                Web Development
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We craft ultra-fast, robust web interfaces tailored for spatial rendering pipelines, decentralized platforms, and real-time data streaming dashboards. 
              </p>

              {/* Stack Features */}
              <ul className="mt-6 space-y-2.5">
                {['Next.js & React Ecosystems', 'Tailwind CSS Custom Styling', 'Optimized Vercel Deployments'].map((tech, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[blue]" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 flex items-center text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
              <span>⚡ SSR & Jamstack Architecture</span>
            </div>
          </div>

          {/* Card 2: iOS App Development & Featured App (Spans 7 columns on large screens) */}
          <div className="group relative lg:col-span-7 flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-muted/30 p-8 shadow-sm transition-all duration-300 hover:border-[#ff0088]/30 hover:bg-muted/50">
            <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-bl from-[#ff0088]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#ff0088]/10 text-[#ff0088] flex items-center justify-center mb-6 border border-[#ff0088]/20">
                  <Smartphone className="h-6 w-6" />
                </div>
                
                {/* Active App Store Live Status Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/5 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live on App Store
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">
                iOS App Development
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Native Apple ecosystem engineering. We leverage Swift and SwiftUI pipelines to produce lightning-fast interactive utilities that balance native hardware speed with micro-animations.
              </p>

              {/* Featured Showcase Box */}
              <div className="mt-6 p-5 rounded-2xl border border-border bg-background/50 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Mock App Icon placeholder */}
                  <img
                    src={"/images/ListItDoItLogo.webp"}
                    className='h-14 aspect-square'
                    alt='List It, Do It Logo'
                  />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">List It, Do It</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Minimalist productivity & daily planner app.</p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full border-border bg-background hover:bg-muted font-semibold text-xs flex items-center gap-1.5 w-full sm:w-auto"
                  asChild
                >
                  <a href="https://apps.apple.com/us/app/list-it-do-it/id6751865449" target="_blank" rel="noopener noreferrer">
                    View App <ArrowUpRight className="h-3 w-3 text-[#ff0088]" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>🛠️ Swift / SwiftUI Ecosystem</span>
              <span className="text-[#ff0088] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Built natively &rarr;</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}