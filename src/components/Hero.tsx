"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";

const floatingWords = [
    { text: "CODE!", x: "10%", y: "20%", rotate: -15, delay: 0 },
    { text: "BUILD!", x: "75%", y: "15%", rotate: 12, delay: 0.3 },
    { text: "SHIP!", x: "15%", y: "70%", rotate: -8, delay: 0.6 },
    { text: "HACK!", x: "80%", y: "65%", rotate: 20, delay: 0.9 },
];

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Noir halftone hero background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
            </div>

            {/* Spider web SVG */}
            <svg
                className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10"
                viewBox="0 0 400 400"
                fill="none"
                aria-hidden="true"
            >
                <motion.path
                    d="M400,0 Q300,100 200,200 Q100,300 0,400"
                    stroke="white"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />
                <motion.path
                    d="M400,0 L200,200 L400,400"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, delay: 0.5 }}
                />
                <motion.path
                    d="M400,0 L0,200"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                />
                <motion.path
                    d="M400,100 Q300,200 200,200 Q100,200 0,100"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                />
                <motion.path
                    d="M400,200 Q300,250 200,200 Q100,150 0,200"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 2 }}
                />
                <motion.path
                    d="M400,300 Q300,300 200,200 Q100,100 0,0"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 2.5 }}
                />
            </svg>

            {/* Floating background words */}
            {floatingWords.map((word) => (
                <motion.span
                    key={word.text}
                    className="absolute font-display text-6xl md:text-8xl text-white pointer-events-none select-none"
                    style={{
                        left: word.x,
                        top: word.y,
                        rotate: `${word.rotate}deg`,
                        opacity: 0.04,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.04, scale: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: word.delay,
                        ease: [0.22, 0.03, 0.26, 1],
                    }}
                >
                    {word.text}
                </motion.span>
            ))}

            {/* Main content */}
            <div className="relative z-10 text-center px-4">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <GlitchText
                        as="h1"
                        persistent
                        className="font-display text-7xl md:text-[10rem] lg:text-[12rem] leading-none text-white tracking-wider"
                    >
                        <span style={{ display: "inline-block", transform: "rotate(-2deg)" }}>
                            HACK IT
                        </span>
                    </GlitchText>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    className="mt-6 md:mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p
                        className="font-body text-lg md:text-2xl text-[var(--text)] typewriter inline-block"
                    >
                        Break the code. Break the multiverse.
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    className="mt-10 md:mt-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                >
                    <button
                        className="relative font-display text-xl md:text-2xl bg-[var(--accent)] text-white px-10 py-4 md:px-14 md:py-5 tracking-wider pulse-glow ink-splat transition-transform hover:scale-105 active:scale-95"
                        style={{
                            clipPath:
                                "polygon(2% 0%, 98% 2%, 100% 96%, 3% 100%)",
                        }}
                    >
                        ENTER THE WEB
                    </button>
                </motion.div>

                {/* Scroll label */}
                <motion.p
                    className="mt-8 font-label text-xs md:text-sm text-white/40 tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    SCROLL TO ENTER THE MULTIVERSE ↓
                </motion.p>
            </div>
        </section>
    );
}
