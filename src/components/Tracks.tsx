"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";

interface Track {
    issue: string;
    title: string;
    tagline: string;
    image: string;
}

const tracks: Track[] = [
    {
        issue: "#001",
        title: "AI / ML",
        tagline: "Cold. Calculated. Unstoppable.",
        image: "/images/track-algorithm.png",

    },
    {
        issue: "#002",
        title: "EdTech",
        tagline: "Knowledge is the only superpower.",
        image: "/images/track-origin.png",

    },
    {
        issue: "#003",
        title: "Cybersecurity",
        tagline: "In the dark, truth hides.",
        image: "/images/track-shadows.png",

    },
    {
        issue: "#004",
        title: "Open Innovation",
        tagline: "No rules. No limits. No mercy.",
        image: "/images/track-dimension.png",

    },
];

export default function Tracks() {
    const router = useRouter();

    return (
        <section id="tracks" className="snap-section relative px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/bg_tracks.png"
                    alt="Tracks section background"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
            </div>

            <div className="relative z-10 text-center mb-6 md:mb-16">
                <GlitchText
                    as="h2"
                    className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                >
                    PICK YOUR CASE FILE
                </GlitchText>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" style={{ maxWidth: '80rem', margin: '0 auto', width: '100%' }}>
                {tracks.map((track, i) => (
                    <motion.div
                        key={track.issue}
                        className="group relative"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.03, 0.26, 1] }}
                        style={{ perspective: "800px" }}
                        onClick={() => router.push('/problem-statement')}
                    >
                        <motion.div
                            className="relative comic-border bg-[var(--surface)] overflow-hidden cursor-pointer"
                            whileHover={{
                                scale: 1.05,
                                rotateX: 5,
                                rotateY: -5,
                                transition: { duration: 0.3 },
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Issue number badge */}
                            <div className="absolute top-3 right-3 z-10 bg-[var(--accent)] text-white font-display text-xs px-3 py-1 tracking-wider"
                                style={{ clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)" }}
                            >
                                {track.issue}
                            </div>

                            {/* Image */}
                            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                                <Image
                                    src={track.image}
                                    alt={`${track.title} track`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-5 md:p-6">
                                <h3 className="font-display text-2xl md:text-3xl text-white mt-2 mb-2 glitch-hover">
                                    {track.title}
                                </h3>
                                <p className="font-body text-sm text-white/60 italic">
                                    &ldquo;{track.tagline}&rdquo;
                                </p>
                                {/* Click hint */}
                                <p className="font-label text-xs text-[var(--accent)] tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    VIEW PROBLEM STATEMENTS →
                                </p>
                            </div>

                            {/* Bottom border accent */}
                            <div className="h-1 bg-[var(--accent)] w-full" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
