"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ComicPanel from "./ComicPanel";
import GlitchText from "./GlitchText";

const whyJoinUs = [
    "Work on real-world challenges",
    "Collaborate with industry experts & mentors",
    "Win exciting prizes and recognition",
    "Learn new skills and network with tech leaders",
];

export default function About() {
    return (
        <section id="about" className="snap-section relative px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/bg_origin.png"
                    alt="About section background"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
            </div>

            <div className="relative z-10 flex flex-col gap-10" style={{ maxWidth: '72rem', margin: '0 auto', width: '100%' }}>
                {/* Section Title */}
                <div className="text-center mb-8 md:mb-16">
                    <GlitchText
                        as="h2"
                        className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                    >
                        THE ORIGIN STORY
                    </GlitchText>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {/* Welcome text panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <ComicPanel rotate={-1} delay={0} className="p-6 md:p-8 relative h-full">
                            <h3 className="font-display text-2xl md:text-3xl text-[var(--accent)] mb-4">
                                ABOUT HACKIT
                            </h3>
                            <p className="font-body text-sm md:text-base text-[var(--text)] leading-relaxed opacity-90">
                                Welcome to HackIT 26, the premier hackathon event at Amity University Patna! Our mission is to bring together the brightest minds in technology, innovation, and creativity to solve real-world problems and build amazing projects.
                            </p>
                        </ComicPanel>
                    </motion.div>

                    {/* Why Join Us panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <ComicPanel rotate={1} delay={0.15} className="p-6 md:p-8 relative h-full">
                            <h3 className="font-display text-2xl md:text-3xl text-[var(--accent)] mb-4">
                                WHY JOIN US?
                            </h3>
                            <ul className="space-y-3">
                                {whyJoinUs.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-3 font-body text-sm md:text-base text-[var(--text)] opacity-90"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 0.9, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                    >
                                        <span className="text-[var(--accent)] font-display text-lg mt-0.5">▸</span>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </ComicPanel>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
