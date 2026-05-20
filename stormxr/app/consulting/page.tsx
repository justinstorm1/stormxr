"use client"

import React from 'react';
import { Lightbulb, Compass, HelpCircle, BarChart3, Users, Milestone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

export default function Consulting() {
  return (
    <section 
      id="consulting" 
      className="relative w-full lg:py-32 overflow-hidden bg-background"
    >

      <Navbar />

      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-gradient-to-bl from-[blue]/5 to-[#ff0088]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl py-20 mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20 flex flex-col items-start gap-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[blue]">
            Strategic Advisory
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Bridging Vision with <span className="bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text">Technical Reality</span>
          </h2>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">
            Navigating emerging technology landscapes is complex. We partner with forward-thinking enterprises, agencies, and creators to validate concepts, de-risk hardware deployments, and architect scalable digital roadmaps.
          </p>
        </div>

        {/* Advisory Pillars - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Concept Validation */}
          <div className="group relative rounded-2xl border border-border bg-muted/20 p-8 transition-all duration-300 hover:border-border hover:bg-muted/40">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[blue]/10 to-[blue]/5 text-[blue] flex items-center justify-center mb-6 border border-[blue]/10">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
              Concept Validation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have an immersive concept but unsure if it is technically viable? We stress-test your ideas against current market hardware limits, engine performance capabilities, and deployment budget constraints before you write a single line of code.
            </p>
          </div>

          {/* Pillar 2: Architecture & Strategy */}
          <div className="group relative rounded-2xl border border-border bg-muted/20 p-8 transition-all duration-300 hover:border-border hover:bg-muted/40">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#ff0088]/10 to-[#ff0088]/5 text-[#ff0088] flex items-center justify-center mb-6 border border-[#ff0088]/10">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
              Spatial Ecosystem Strategy
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether mapping out a WebXR storefront or planning a native visionOS deployment, we map out your technical stack infrastructure. We choose the right tech pipelines so your software remains future-proof.
            </p>
          </div>

          {/* Pillar 3: Product Scaling */}
          <div className="group relative rounded-2xl border border-border bg-muted/20 p-8 transition-all duration-300 hover:border-border hover:bg-muted/40">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[blue]/10 to-[#ff0088]/5 text-foreground flex items-center justify-center mb-6 border border-border">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
              Optimization Audits
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you have an existing application plagued by slow frame rates, layout lag, or scaling bottlenecks, our team dives directly into your rendering pipelines and code environments to pinpoint and patch operational inefficiencies.
            </p>
          </div>

        </div>

        {/* Bottom Unified CTA Board */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-500/10 text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Consulting Engagement
            </div>
            <h4 className="text-xl font-bold text-foreground">Ready to blueprint your project?</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Book a targeted technical discovery call. We will unpack your structural challenges, outline real answers, and see if our workflows sync with your timeline.
            </p>
          </div>
          
          <Button 
            className="rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold px-6 py-6 text-sm hover:opacity-90 transition-opacity w-full md:w-auto shadow-md shadow-blue-500/5"
            asChild
          >
            <a href="#contact">Schedule Advisory Call</a>
          </Button>
        </div>

      </div>
    </section>
  );
}