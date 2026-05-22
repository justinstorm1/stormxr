"use client"

import React from 'react';
import { Mic, Headphones, Radio, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const platforms = [
  {
    name: 'Apple Podcasts',
    description: 'Subscribe and listen on Apple Podcasts. Leave a rating to help others discover the show.',
    href: 'https://podcasts.apple.com/us/podcast/vr-lens/id1883565942',
    logo: '/images/ApplePodcastsLogo.png',
    accent: 'from-[#d56bff]/10 to-[#d56bff]/5',
    border: 'border-[#d56bff]/10',
    iconColor: 'text-[#d56bff]',
  },
  {
    name: 'Spotify',
    description: 'Stream every episode on Spotify. Follow the show to get notified when new episodes drop.',
    href: 'https://open.spotify.com/show/4CU5uhMSh4RRUdgMo8YgGT?si=7gS8ebhpRAyTAra9OXPlBw',
    logo: '/images/SpotifyLogo.png',
    accent: 'from-[#1db954]/10 to-[#1db954]/5',
    border: 'border-[#1db954]/10',
    iconColor: 'text-[#1db954]',
  },
];

const topics = [
  { icon: Headphones, label: 'VR Hardware Reviews' },
  { icon: Mic,        label: 'Industry Interviews'  },
  { icon: Radio,      label: 'Emerging Tech Trends' },
];

export default function VRLens() {
  return (
    <section
      id="vrlens"
      className="relative w-full max-w-screen bg-background"
    >
      <Navbar />

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-gradient-to-br from-[blue]/5 to-[#ff0088]/5 blur-[120px] rounded-full" />
      </div>

      <div className="@container/main relative z-10 py-24 px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-20 flex flex-col items-start gap-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#ff0088]">
            Podcast
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            VR Lens —{' '}
            <span className="bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text">
              Inside Immersive Tech
            </span>
          </h2>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">
            Interviews, analysis, and unfiltered conversation about virtual reality, spatial computing, and the people building the next dimension of media. New episodes drop regularly — subscribe on your platform of choice.
          </p>

          {/* Topic pills */}
          <div className="flex flex-wrap gap-2 mt-2">
            {topics.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/40 text-xs font-medium text-muted-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 @lg/main:grid-cols-2 gap-6">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-border bg-muted/20 p-8 transition-all duration-300 hover:border-border hover:bg-muted/40 flex flex-col gap-6"
            >
              {/* Logo */}
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center border ${p.border} overflow-hidden`}>
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {p.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className={`inline-flex items-center gap-2 text-sm font-semibold ${p.iconColor}`}>
                Listen now
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 p-8 sm:p-10 rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-3xl">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-500/10 text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Stay in the loop
            </div>
            <h4 className="text-xl font-bold text-foreground">Want to be a guest on VR Lens?</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Building something interesting in XR, spatial computing, or immersive media? Reach out — we're always looking for practitioners with real stories to tell.
            </p>
          </div>

          <Button
            className="rounded-full bg-gradient-to-r from-[blue] to-[#ff0088] text-white font-bold px-6 py-6 text-sm hover:opacity-90 transition-opacity w-full md:w-auto shadow-md shadow-blue-500/5"
            asChild
          >
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

      </div>
    </section>
  );
}