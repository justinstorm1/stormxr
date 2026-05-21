"use client"

import Navbar from "@/components/Navbar";
import { BookOpenText, Headphones, Sparkles, Telescope } from "lucide-react";

const pillars = [
  {
    title: "NextWave XR",
    description:
      "Editorial and analysis platform for spatial computing, immersive media, and real-world XR adoption.",
    icon: BookOpenText,
    color: "text-[blue]",
    accent: "from-[blue]/10 to-[blue]/5 border-[blue]/10",
  },
  {
    title: "VR Lens",
    description:
      "Podcast and media side for interviews and discussions around VR and emerging technology.",
    icon: Headphones,
    color: "text-[#ff0088]",
    accent: "from-[#ff0088]/10 to-[#ff0088]/5 border-[#ff0088]/10",
  },
  {
    title: "StormyCs VR",
    description:
      "Creator and community-facing side focused on gaming, fitness, and personality-driven VR content.",
    icon: Sparkles,
    color: "text-foreground",
    accent: "from-[blue]/10 to-[#ff0088]/5 border-border",
  },
];

export default function OurVision() {
  return (
    <section
      id="our-vision"
      className="relative w-full max-w-screen bg-background"
    >
      <Navbar />

      {/* <div className="absolute left-1/2 top-1/3 h-[620px] w-[620px] -translate-x-1/2 bg-gradient-to-br from-[blue]/5 to-[#ff0088]/5 blur-[130px] pointer-events-none" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mb-16 flex max-w-3xl flex-col items-start gap-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[blue]">
            Our Vision
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Building a professional ecosystem for{" "}
            <span className="bg-gradient-to-r from-[blue] to-[#ff0088] bg-clip-text text-transparent">
              the future of XR
            </span>
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            StormXR is the umbrella brand for the work I&apos;m building around
            immersive technology and the future of XR. The strategy is to
            connect writing, consulting, partnerships, media opportunities, and
            industry credibility into one focused professional ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.title}
                className="group rounded-3xl border border-border bg-muted/25 p-8 transition-all duration-300 hover:bg-muted/45"
              >
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br ${pillar.accent} ${pillar.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mb-3 text-xl font-bold tracking-tight text-foreground">
                  {pillar.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 p-8 backdrop-blur-sm sm:p-10">
          <div className="flex max-w-3xl flex-col gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/60 text-[#ff0088]">
              <Telescope className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              One brand, multiple pathways into immersive technology.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Under StormXR, NextWave XR anchors the editorial and analysis
              work, VR Lens expands the conversation through interviews and
              media, and StormyCsVR keeps the community side grounded in gaming,
              fitness, and personality-driven VR content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
