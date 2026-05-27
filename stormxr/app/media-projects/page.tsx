"use client"

import React from 'react';
import { ExternalLink, Mic, Newspaper, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/footer';

const projects = [
  {
    tag: 'Editorial & Analysis',
    title: 'NextWave XR',
    description:
      'The editorial and analysis platform where Craig writes about spatial computing, immersive media, and real-world XR adoption. In-depth articles, hardware breakdowns, and industry perspective for professionals and enthusiasts alike.',
    href: '/nextwavexr',
    icon: Newspaper,
    accent: 'from-[blue]/10 to-[blue]/5',
    border: 'border-[blue]/10',
    iconColor: 'text-[blue]',
    cta: 'Read Articles',
  },
  {
    tag: 'Podcast & Media',
    title: 'VR Lens Podcast',
    description:
      'Interviews and candid discussions around virtual reality and emerging technology. Each episode digs into the people, products, and ideas shaping the future of immersive media.',
    href: '/vrlens',
    icon: Mic,
    accent: 'from-[#ff0088]/10 to-[#ff0088]/5',
    border: 'border-[#ff0088]/10',
    iconColor: 'text-[#ff0088]',
    cta: 'Listen Now',
  },
  {
    tag: 'Creator & Community',
    title: 'StormyCs VR',
    description:
      'The casual, community-facing side of StormXR. Gaming, fitness, and personality-driven VR content across YouTube, TikTok, Instagram, and more. Hands-on impressions and an unfiltered look at life inside the headset.',
    href: '/stormycsvr',
    icon: Gamepad2,
    accent: 'from-[#991bbf]/10 to-[#991bbf]/5',
    border: 'border-[#991bbf]/10',
    iconColor: 'text-[#991bbf]',
    cta: 'Follow Along',
  },
];

export default function MediaProjects() {
  return (
    <section
      id="mediaprojects"
      className="relative w-full max-w-screen bg-background"
    >
      <Navbar />

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[blue]/5 to-[#ff0088]/5 blur-[120px] rounded-full" />
      </div>

      <div className="@container/main relative z-10 py-24 px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-20 flex flex-col items-start gap-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#ff0080]">
            Media & Content
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Three Platforms,{' '}
            <span className="bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text">
              One Vision
            </span>
          </h2>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">
            StormXR's media presence spans editorial, audio, and social - all rooted in the same passion for immersive technology and spatial computing.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 @lg/main:grid-cols-2 @5xl/main:grid-cols-3 gap-6">
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.title}
                href={p.href}
                className="group relative rounded-2xl border border-border bg-muted/20 p-8 transition-all duration-300 hover:border-border hover:bg-muted/40 flex flex-col gap-6"
              >
                {/* Icon */}
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${p.accent} ${p.iconColor} flex items-center justify-center border ${p.border}`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {p.tag}
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className={`inline-flex items-center gap-2 text-sm font-semibold ${p.iconColor}`}>
                  {p.cta}
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-500/10 text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Work With Us
            </div>
            <h4 className="text-xl font-bold text-foreground">Interested in a media partnership?</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Whether it's sponsored content, editorial coverage, or a podcast appearance — reach out and let's talk about how StormXR's media channels can amplify your brand in the XR space.
            </p>
          </div>

          <Button
            className="rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold px-6 py-6 text-sm hover:opacity-90 transition-opacity w-full md:w-auto shadow-md shadow-blue-500/5"
            asChild
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

      </div>

      <Footer />

    </section>
  );
}
