"use client"

import React from 'react';
import { Lightbulb, Compass, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/footer';

const pillars = [
  {
    title: 'XR Market & Trend Analysis',
    description:
      'Helping brands and organizations understand where immersive technology is gaining traction, where expectations exceed reality, and which developments are worth paying attention to.',
    icon: Lightbulb,
    accent: 'from-[blue]/10 to-[blue]/5',
    border: 'border-[blue]/10',
    iconColor: 'text-[blue]',
  },
  {
    title: 'Immersive Media & Experience Strategy',
    description:
      'Exploring how spatial computing, VR, and emerging display technologies can improve engagement, communication, entertainment, and customer experience.',
    icon: Compass,
    accent: 'from-[#ff0088]/10 to-[#ff0088]/5',
    border: 'border-[#ff0088]/10',
    iconColor: 'text-[#ff0088]',
  },
  {
    title: 'Industry Communication & Positioning',
    description:
      'Helping businesses and creators communicate immersive technology clearly to audiences, partners, and stakeholders without relying on hype or buzzwords.',
    icon: BarChart3,
    accent: 'from-[#991bbf]/10 to-[#991bbf]/5',
    border: 'border-[#991bbf]/10',
    iconColor: 'text-[#991bbf]',
  },
];

export default function Consulting() {
  return (
    <section 
      id="consulting" 
      className="relative w-full max-w-screen bg-background"
    >
      <Navbar />

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-gradient-to-bl from-[blue]/5 to-[#ff0088]/5 blur-[120px] rounded-full" />
      </div>

      <div className="@container/main relative z-10 py-24 px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-20 flex flex-col items-start gap-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#ff0088]">
            Strategic Advisory
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Bridging Immersive Technology with <span className="bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text">Real-World Experience</span>
          </h2>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">
            Immersive technology is evolving quickly, but separating meaningful progress from industry noise is increasingly difficult. StormXR focuses on practical analysis, emerging media, and real-world insight into where XR, spatial computing, and immersive experiences are headed next.
          </p>
        </div>

        {/* Advisory Pillars */}
        <div className="grid grid-cols-1 @lg/main:grid-cols-2 @5xl/main:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group relative rounded-2xl border border-border bg-muted/20 p-8 transition-all duration-300 hover:bg-muted/40"
              >
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${p.accent} ${p.iconColor} flex items-center justify-center mb-6 border ${p.border}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-500/10 text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Consulting Engagement
            </div>
            <h4 className="text-xl font-bold text-foreground">Looking for perspective on immersive technology?</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Book a focused advisory conversation around immersive media, XR strategy, communication, and emerging technology trends.
            </p>
          </div>
          
          <Button 
            className="rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold px-6 py-6 text-sm hover:opacity-90 transition-opacity w-full md:w-auto shadow-md shadow-blue-500/5"
            asChild
          >
            <Link href="/contact">Schedule Advisory Call</Link>
          </Button>
        </div>


      </div>
      <Footer />
      
    </section>
  );
}