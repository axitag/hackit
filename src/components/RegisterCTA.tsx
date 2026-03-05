"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";

const stats = [
    { label: "HOURS", value: "48" },
    { label: "TRACKS", value: "04" },
    { label: "PRIZES", value: "₹8.5K+" },
];

const socials = [
    { name: "Twitter/X", icon: "𝕏", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" },
    { name: "LinkedIn", icon: "in", href: "#" },
    { name: "Discord", icon: "💬", href: "#" },
];

export default function RegisterCTA() {
    return (
        <section
            id="register"
            className="snap-section relative w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12"
        >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/footer_bg.png"
                    alt="Register section background"
                    fill
                    className="object-contain opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/80 via-transparent to-[var(--bg)]/80" />
                {/* Dark vignette overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 text-center flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
                {/* Tagline */}
                <motion.p
                    className="font-label text-xs md:text-sm text-[var(--accent)] tracking-[0.35em] mb-4 md:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    ARE YOU READY?
                </motion.p>

                {/* Main heading */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.22, 0.03, 0.26, 1] }}
                >
                    <GlitchText
                        as="h2"
                        className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-wider leading-tight"
                    >
                        JOIN THE HACKIT
                    </GlitchText>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    className="mt-4 md:mt-6 font-body text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                >
                    48 hours. 4 tracks. Unlimited possibilities. Register now and be part of the premier hackathon at Amity University Patna.
                </motion.p>

                {/* Stats row */}
                <motion.div
                    className="mt-8 md:mt-12 flex items-center justify-center gap-8 md:gap-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <span className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--accent)] block">
                                {stat.value}
                            </span>
                            <span className="font-label text-[10px] md:text-xs text-white/40 tracking-widest mt-1 block">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Divider */}
                <motion.div
                    className="mt-8 md:mt-10 mx-auto w-24 h-[2px] bg-[var(--accent)] opacity-40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                />

                {/* Register button */}
                <motion.div
                    className="mt-8 md:mt-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <button
                        className="relative font-display text-xl sm:text-2xl md:text-3xl bg-[var(--accent)] text-white px-10 py-4 sm:px-14 sm:py-5 md:px-16 md:py-6 tracking-wider pulse-glow ink-splat transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(232,0,61,0.4)] active:scale-95"
                        style={{
                            clipPath: "polygon(1% 0%, 99% 3%, 100% 97%, 2% 100%)",
                        }}
                    >
                        REGISTER NOW
                    </button>
                </motion.div>

                {/* Social links */}
                <motion.div
                    className="mt-10 md:mt-14 flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                >
                    <span className="font-label text-[10px] md:text-xs text-white/30 tracking-[0.3em]">
                        FOLLOW THE MULTIVERSE
                    </span>
                    <div className="flex items-center gap-3">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                className="comic-border bg-[var(--surface)] w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-base md:text-lg text-white/60 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
