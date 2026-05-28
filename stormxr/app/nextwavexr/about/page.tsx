import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Image from "next/image";

const focusAreas = [
  {
    icon: "◈",
    label: "VR Writing",
    desc: "Contributor at UploadVR covering fitness, media, hardware, and immersive experiences from an adult user's perspective.",
  },
  {
    icon: "⬡",
    label: "Immersive Fitness",
    desc: "Passionate advocate for VR as a legitimate fitness platform - exploring how movement and technology intersect.",
  },
];

const socials = [
  { 
    label: "X / Twitter", 
    href: "https://x.com/StormyCsVR", 
    symbol: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
      </svg>
    )
  },
  { 
    label: "Bluesky", 
    href: "https://bsky.app/profile/stormycsvr.bsky.social", 
    symbol: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bluesky" viewBox="0 0 16 16">
        <path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/>
      </svg>
    )
  },
  { 
    label: "Threads", 
    href: "https://www.threads.net/@StormyCsVR", 
    symbol: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-threads" viewBox="0 0 16 16">
        <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
      </svg>
    )
  },
  { 
    label: "UploadVR", 
    href: "https://www.uploadvr.com/writer/craigstorm/", 
    symbol: (
      <Image 
        src={"/images/UploadVRLogo.png"}
        alt="UploadVR Logo"
        width={20}
        height={20}
      />
    )
  },
  { 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/craig-storm/", 
    symbol: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
      </svg>
    )
  },
];

export default function About() {
  return (
    <div className="min-h-dvh">
      <Navbar articleLink={undefined} />
      <div
        className="min-h-dvh flex-1 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle farthest-corner at 32.7% 49.8%, rgba(28,88,238,1) 0%, rgba(0,39,137,1) 100.2%)",
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient blobs */}
        <div className="absolute w-[500px] h-[500px] bg-blue-400/20 blur-3xl rounded-full top-0 -left-32 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-indigo-300/15 blur-3xl rounded-full bottom-0 right-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 flex flex-col gap-20">

          {/* Hero */}
          <div className="flex flex-col gap-6">
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Founder & Creator</p>

            <div className="flex flex-col gap-1">
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-none tracking-tight">
                Craig
              </h1>
              <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tight"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)", color: "transparent" }}
              >
                Storm
              </h1>
            </div>

            <div className="h-px w-24 bg-white/20" />

            <p className="text-white/70 text-lg max-w-xl leading-relaxed">
              VR writer, immersive fitness advocate, and the creator behind NextWave XR. 
              Craig explores virtual reality from the perspective of everyday adults discovering 
              what XR can be beyond gaming - and building the platforms to share that story.
            </p>

            {/* Socials */}
            <div className="flex flex-wrap gap-3 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/70 text-sm hover:bg-white/15 hover:text-white hover:border-white/40 transition-all backdrop-blur-sm"
                >
                  <span className="text-base leading-none">{s.symbol}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* StormXR LLC callout */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-300/10 blur-2xl rounded-full pointer-events-none" />
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-3">Company</p>
            <h2 className="text-3xl font-bold text-white mb-3">StormXR LLC</h2>
            <p className="text-white/65 leading-relaxed max-w-xl">
              StormXR LLC is the company Craig founded to power his work in the extended reality space. 
              It's the engine behind NextWave XR - driving content, community, and exploration at the 
              intersection of immersive technology and real life.
            </p>
          </div>

          {/* Focus areas */}
          <div className="flex flex-col gap-6">
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">What Craig Does</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {focusAreas.map((area) => (
                <div
                  key={area.label}
                  className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl text-white/40 group-hover:text-white/70 transition-colors">
                      {area.icon}
                    </span>
                    <h3 className="text-white font-semibold">{area.label}</h3>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-white/10">
            <p className="text-white/50 text-sm">Want to explore what's next in XR?</p>
             <Button
                asChild
                className="overflow-hidden group relative font-semibold shadow-xl bg-white text-blue-900 hover:!bg-white hover:text-white transition-all"
              >
                <Link href="/nextwavexr/articles">
                  <div className="absolute top-0 -left-1/1 bg-sky-500 h-full w-full transition-all group-hover:left-0 duration-300 ease-in-out" />
                  <span className="relative z-10">Read the Articles</span>
                </Link>
              </Button>
          </div>

        </div>
      </div>
    </div>
  );
}