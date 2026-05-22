"use client"

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

const platforms = [
  {
    name: 'X / Twitter',
    username: '@StormyCsVR',
    href: 'https://x.com/StormyCsVR',
    logo: '/images/XIcon.avif',
    accent: 'from-white/10 to-white/5',
    border: 'border-white/10',
    iconColor: 'text-foreground',
  },
  {
    name: 'Threads',
    username: '@stormycsvr',
    href: 'https://www.threads.com/@stormycsvr',
    logo: '/images/ThreadsLogo.png',
    accent: 'from-white/10 to-white/5',
    border: 'border-white/10',
    iconColor: 'text-foreground',
  },
  {
    name: 'Bluesky',
    username: '@stormycsvr.bsky.social',
    href: 'https://bsky.app/profile/stormycsvr.bsky.social',
    logo: '/images/BlueskyLogo.png',
    accent: 'from-[#0085ff]/10 to-[#0085ff]/5',
    border: 'border-[#0085ff]/10',
    iconColor: 'text-[#0085ff]',
  },
  {
    name: 'Instagram',
    username: '@StormyCsVR',
    href: 'https://www.instagram.com/stormycsvr/',
    logo: '/images/InstagramLogo.png',
    accent: 'from-[#e1306c]/10 to-[#f77737]/5',
    border: 'border-[#e1306c]/10',
    iconColor: 'text-[#e1306c]',
  },
  {
    name: 'TikTok',
    username: '@stormycsvr',
    href: 'https://www.tiktok.com/@stormycsvr?_r=1&_t=ZT-96a7DzuMixa',
    logo: '/images/TikTokLogo.webp',
    accent: 'from-[#ff0050]/10 to-[#00f2ea]/5',
    border: 'border-[#ff0050]/10',
    iconColor: 'text-[#ff0050]',
  },
  {
    name: 'YouTube',
    username: '@StormyCsVR',
    href: 'https://www.youtube.com/@StormyCsVR',
    logo: '/images/YouTubeLogo.webp',
    accent: 'from-[#ff0000]/10 to-[#ff0000]/5',
    border: 'border-[#ff0000]/10',
    iconColor: 'text-[#ff0000]',
  },
];

export default function StormyCsVR() {
  return (
    <section
      id="stormycsvr"
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
          <div className="text-xs font-bold uppercase tracking-widest text-[blue]">
            Creator & Community
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            StormyCs VR —{' '}
            <span className="bg-gradient-to-r from-[blue] to-[#ff0088] text-transparent bg-clip-text">
              Follow the Journey
            </span>
          </h2>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">
            Gaming, fitness, and personality-driven VR content across every platform. Follow along for hands-on hardware impressions, community highlights, and an unfiltered look at life inside the headset.
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 @lg/main:grid-cols-2 @5xl/main:grid-cols-3 gap-6">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-border bg-muted/20 p-8 transition-all duration-300 hover:border-border hover:bg-muted/40 flex flex-col gap-6"
            >
              {/* Logo / Icon */}
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center border ${p.border} overflow-hidden`}>
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={28}
                    height={28}
                    className="object-contain rounded-md"
                  />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {p.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className={`text-sm font-medium ${p.iconColor}`}>
                  {p.username}
                </p>
              </div>

              <div className={`inline-flex items-center gap-2 text-sm font-semibold ${p.iconColor}`}>
                Follow on {p.name}
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-500/10 text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Community
            </div>
            <h4 className="text-xl font-bold text-foreground">Want to collab or connect?</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Whether you're a brand, creator, or just a VR enthusiast — reach out. Always open to new collabs, sponsorships, and community conversations.
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