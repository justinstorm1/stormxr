"use client"

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BookOpenText, Gamepad2, Headphones, Telescope } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    title: "Next Wave XR",
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
    icon: Gamepad2,
    color: "text-[#991bbf]",
    accent: "from-[#991bbf]/10 to-[#991bbf]/5 border-[#991bbf]/10",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full max-w-screen bg-background"
    >
      <Navbar />

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[blue]/5 to-[#ff0088]/5 blur-[130px] rounded-full" />
      </div>

      <div className="@container/main relative z-10 py-24 px-4 sm:px-6 lg:px-8 flex flex-col gap-24">

          {/* ── Our Vision ── */}
          <div className="flex flex-col gap-10">
            <div className="flex max-w-3xl flex-col items-start gap-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#ff0080]">
                Our Vision
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Bridging immersive technology, media, and{" "}
                <span className="bg-gradient-to-r from-[blue] to-[#ff0088] bg-clip-text text-transparent">
                  real-world adoption
                </span>
              </h1>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                StormXR is the umbrella brand for work around immersive technology and the future of XR. It connects writing, analysis, media, partnerships, and industry experience into one platform focused on where immersive technology is headed next.
              </p>
            </div>
          </div>

          {/* ── Our Story + Developer (side by side) ── */}
          <div className="grid grid-cols-1 @2xl/main:grid-cols-2 gap-6">

            {/* Our Story */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-widest text-[#ff0088]">
                  Founder
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  The person behind{" "}
                  <span className="bg-gradient-to-r from-[blue] to-[#ff0088] bg-clip-text text-transparent">
                    StormXR
                  </span>
                </h2>
              </div>
              <div className="rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 p-8 backdrop-blur-sm flex-1 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Craig Storm is an XR writer, analyst, and industry professional focused on how immersive technology is evolving beyond gaming into everyday use. Through StormXR, he covers virtual reality, mixed reality, spatial computing, immersive media, fitness, and emerging display technologies with an emphasis on practical adoption, consumer behavior, and real-world impact.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Alongside his editorial work, Craig works in digital experience and communication technology within the automotive industry, giving him a grounded perspective on how emerging technology is actually deployed in operational environments.
                  </p>
                </div>
                <Button variant={"ghost"} asChild className="mt-6 px-4 py-6 w-fit">
                  <Link href="https://www.linkedin.com/in/craig-storm/" target="_blank" className="text-[#0077b5]">
                    <img 
                      src="/images/LinkedInLogo.png"
                      alt="LinkedIn Logo"
                      width={30}
                      className="rounded-sm"
                    />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Developer */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-widest text-[#ff0080]">
                  Developer
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  The person building{" "}
                  <span className="bg-gradient-to-r from-[blue] to-[#ff0088] bg-clip-text text-transparent">
                    StormXR
                  </span>
                </h2>
              </div>
             <div className="rounded-3xl border border-border bg-gradient-to-b from-muted/40 to-muted/10 p-8 backdrop-blur-sm flex-1 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Justin Storm is the developer behind StormXR. He is studying Computer Science with a concentration in Cybersecurity at NJIT, bringing a strong technical foundation to everything built under the StormXR brand.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Justin builds iOS apps using Swift, cross-platform mobile apps with React Native, and web experiences with Next.js — handling the full stack from design to deployment across every platform StormXR runs on.
                  </p>
                </div>
                <Button variant={"ghost"} asChild className="mt-6 px-4 py-6 w-fit">
                  <Link href="https://www.linkedin.com/in/justin-storm-0208783b7/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[#ff0088]">
                    <img 
                      src="/images/LinkedInLogo.png"
                      alt="LinkedIn Logo"
                      width={30}
                      className="rounded-sm"
                    />
                  </Link>
                </Button>
              </div>
            </div>

          </div>

        </div>

    </section>
  );
}