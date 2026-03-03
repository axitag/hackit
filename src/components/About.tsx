"use client";

import { motion } from "framer-motion";
import ComicPanel from "./ComicPanel";
import GlitchText from "./GlitchText";

const panels = [
    {
        number: "01",
        title: "WHO",
        body: "A community of hackers, dreamers, designers, and builders from every corner of the multiverse. Students, pros, and first-timers — all welcome.",
        rotate: -2,
    },
    {
        number: "02",
        title: "WHAT",
        body: "A 48-hour hackathon open to all skill levels. Build something incredible from scratch — no limits, no boundaries, no timelines untouched.",
        rotate: 1,
    },
    {
        number: "03",
        title: "WHY",
        body: "To build. To connect. To change timelines. Because every breakthrough starts with someone crazy enough to try.",
        rotate: -1,
    },
];

export default function About() {
    return (
        <section id="about" className="snap-section px-6 md:px-12 lg:px-16">
            {/* Section Title */}
            <div className="text-center mb-8 md:mb-16">
                <GlitchText
                    as="h2"
                    className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                >
                    THE ORIGIN STORY
                </GlitchText>
            </div>

            {/* Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" style={{ maxWidth: '72rem', margin: '0 auto', width: '100%' }}>
                {panels.map((panel, i) => (
                    <div key={panel.number} className="relative">
                        {/* Ink splatter behind panel */}
                        <motion.div
                            className="absolute -inset-4 opacity-0"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 0.15, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
                        >
                            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                                <circle cx="100" cy="100" r="90" fill="var(--accent)" opacity="0.3" />
                                <circle cx="60" cy="50" r="20" fill="var(--accent)" opacity="0.2" />
                                <circle cx="150" cy="140" r="25" fill="var(--accent)" opacity="0.2" />
                                <circle cx="40" cy="150" r="15" fill="var(--accent)" opacity="0.15" />
                            </svg>
                        </motion.div>

                        <ComicPanel rotate={panel.rotate} delay={i * 0.15} className="p-6 md:p-8 relative">
                            <h3 className="font-display text-3xl md:text-4xl text-[var(--accent)] mt-6 mb-4">
                                {panel.title}
                            </h3>
                            <p className="font-body text-sm md:text-base text-[var(--text)] leading-relaxed opacity-80">
                                {panel.body}
                            </p>
                        </ComicPanel>
                    </div>
                ))}
            </div>
        </section>
    );
}
