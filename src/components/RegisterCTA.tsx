"use client";

import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

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
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
        >
            {/* Animated speed lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Converging lines from edges */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
              repeating-conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg,
                rgba(232,0,61,0.06) 0.5deg,
                transparent 1.5deg
              )
            `,
                    }}
                />
                {/* Animated radial pulse */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 30%, rgba(232,0,61,0.05) 70%, transparent 100%)",
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Main CTA text */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.22, 0.03, 0.26, 1] }}
                >
                    <GlitchText
                        as="h2"
                        persistent
                        className="font-display text-5xl md:text-7xl lg:text-8xl text-[var(--accent)] tracking-wider leading-tight"
                    >
                        YOUR TIMELINE STARTS NOW
                    </GlitchText>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    className="mt-6 md:mt-8 font-body text-lg md:text-xl text-white/60"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Register before your timeline collapses.
                </motion.p>

                {/* Register button */}
                <motion.div
                    className="mt-10 md:mt-14"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <button
                        className="relative font-display text-2xl md:text-3xl bg-[var(--accent)] text-white px-12 py-5 md:px-16 md:py-6 tracking-wider pulse-glow ink-splat transition-transform hover:scale-105 active:scale-95"
                        style={{
                            clipPath: "polygon(1% 0%, 99% 3%, 100% 97%, 2% 100%)",
                        }}
                    >
                        REGISTER NOW
                    </button>
                </motion.div>

                {/* Social links */}
                <motion.div
                    className="mt-12 flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    {socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            className="comic-border bg-[var(--surface)] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-lg md:text-xl hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-300"
                            aria-label={social.name}
                        >
                            {social.icon}
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
