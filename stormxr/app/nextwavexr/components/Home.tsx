import Link from "next/link";
import { Button } from "@/components/ui/button";
import TextGenerateEffect from "./TextGenerate";
import SplittingText from "./SplittingText";

export default function Home() {
    return (
        <div
            className="flex-1 flex items-center justify-center px-6 relative overflow-hidden"
            style={{
                background:
                    "radial-gradient(circle farthest-corner at 32.7% 49.8%, rgba(28,88,238,1) 0%, rgba(0,39,137,1) 100.2%)",
            }}
        >
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="absolute w-[500px] h-[500px] bg-blue-400/20 blur-3xl rounded-full -z-10 top-1/4 -left-20 pointer-events-none" />
            <div className="absolute w-[350px] h-[350px] bg-indigo-300/15 blur-3xl rounded-full -z-10 bottom-1/4 right-0 pointer-events-none" />

            <div className="max-w-2xl w-full text-center flex flex-col items-center gap-8 relative z-10">
                <div className="relative flex flex-col items-center gap-2">
                    <div className="absolute -inset-8 rounded-full bg-white/5 blur-2xl pointer-events-none" />

                    <TextGenerateEffect
                        words="Welcome to"
                        className="text-white/60 text-xs tracking-[0.25em] uppercase"
                    />
                    <SplittingText
                        text="Next Wave XR"
                        className="font-bold text-5xl md:text-6xl text-white leading-tight"
                    />
                </div>

                <p className="text-white/65 text-lg max-w-md leading-relaxed">
                    Explore immersive experiences, cutting-edge XR tech, and
                    the future of digital interaction.
                </p>

                <div className="flex gap-3 flex-wrap justify-center">
                    <Button
                        asChild
                        className="font-semibold shadow-xl bg-white text-blue-900 !hover:bg-white/90 transition-all"
                    >
                        <Link href="/articles">Explore Articles</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="border-white/50 text-white bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
                    >
                        <Link href="/about">Learn More</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}