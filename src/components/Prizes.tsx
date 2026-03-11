"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";
import { useState, useRef } from "react";

const prizes = [

    {
        place: "2ND",
        label: "RUNNER UP",
        amitianAmount: "₹3,000",
        nonAmitianAmount: "₹3,000",
        color: "#aaaaaa",
        bgColor: "rgba(170,170,170,0.1)",
        scale: 0.85,
        description: "Silver lining? More like silver lightning. Still legendary.",
        points: 12,
    },
    {
        place: "1ST",
        label: "GRAND PRIZE",
        amitianAmount: "₹5,000",
        nonAmitianAmount: "₹5,000",
        color: "#E8003D",
        bgColor: "rgba(232,0,61,0.15)",
        scale: 1,
        description: "The ultimate prize for the ultimate hack. Glory across all timelines.",
        points: 16,
    },
    {
        place: "3RD",
        label: "THIRD PLACE",
        amitianAmount: "₹2,000",
        nonAmitianAmount: "₹2,000",
        color: "#cd7f32",
        bgColor: "rgba(205,127,50,0.1)",
        scale: 0.75,
        description: "Bronze but not broken.A force to be reckoned with.",
        points: 10,
    },
];

function StarburstSVG({ points, color }: { points: number; color: string }) {
    const outerR = 120;
    const innerR = 60;
    const pathParts: string[] = [];
    for (let i = 0; i < points * 2; i++) {
        const angle = (Math.PI * i) / points - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        const x = Math.round((150 + r * Math.cos(angle)) * 100) / 100;
        const y = Math.round((150 + r * Math.sin(angle)) * 100) / 100;
        pathParts.push(`${i === 0 ? "M" : "L"}${x},${y}`);
    }
    pathParts.push("Z");

    return (
        <svg
            viewBox="0 0 300 300"
            className="absolute inset-0 w-full h-full starburst-spin"
            aria-hidden="true"
        >
            <path d={pathParts.join(" ")} fill={color} opacity="0.2" />
            <path d={pathParts.join(" ")} fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
        </svg>
    );
}

export default function Prizes() {
    const [isAmitian, setIsAmitian] = useState(true);
    const [isStamping, setIsStamping] = useState(false);
    const [stampLabel, setStampLabel] = useState("");
    const sectionRef = useRef<HTMLElement>(null);

    const handleToggle = (value: boolean) => {
        if (value === isAmitian || isStamping) return;
        setStampLabel(value ? "AMITIAN" : "NON AMITIAN");
        setIsStamping(true);

        // Shake the section
        if (sectionRef.current) {
            sectionRef.current.style.animation = "none";
            // Force reflow
            void sectionRef.current.offsetHeight;
            sectionRef.current.style.animation = "sectionShake 120ms ease-out";
        }

        setTimeout(() => {
            setIsAmitian(value);
        }, 300);
        setTimeout(() => {
            setIsStamping(false);
        }, 600);
    };

    return (
        <section
            ref={sectionRef}
            id="prizes"
            className="snap-section relative px-6 md:px-12 lg:px-16 overflow-hidden"
        >
            {/* Stamp overlay */}
            <AnimatePresence>
                {isStamping && (
                    <motion.div
                        className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {/* Ink splatter behind stamp */}
                        <motion.div
                            className="absolute"
                            style={{
                                width: "400px",
                                height: "400px",
                                background:
                                    "radial-gradient(ellipse at center, rgba(232,0,61,0.15) 0%, transparent 70%)",
                                borderRadius: "50%",
                            }}
                            initial={{ scale: 0.3, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 1 }}
                            exit={{ scale: 1.8, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                        {/* Stamp element */}
                        <motion.div
                            className="font-display"
                            style={{
                                fontSize: "clamp(4rem, 12vw, 9rem)",
                                color: "#E8003D",
                                border: "6px solid #E8003D",
                                borderRadius: "4px",
                                padding: "0.25rem 2.5rem",
                                transform: "rotate(-12deg)",
                                textShadow: "0 0 30px rgba(232,0,61,0.8)",
                                opacity: 0.9,
                                mixBlendMode: "screen" as const,
                                letterSpacing: "0.1em",
                                lineHeight: 1,
                            }}
                            initial={{ scale: 3, opacity: 0 }}
                            animate={{
                                scale: [3, 1, 1.05, 1, 1, 0.95],
                                opacity: [0, 1, 1, 1, 1, 0],
                            }}
                            transition={{
                                duration: 0.6,
                                times: [0, 0.2, 0.33, 0.4, 0.67, 1],
                                ease: "easeOut",
                            }}
                        >
                            {stampLabel}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/loot_bg.png"
                    alt="Loot section background"
                    fill
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-linear-to-b from-(--bg) via-transparent to-(--bg)" />
            </div>

            <div className="relative z-10 text-center mb-8 md:mb-12 flex flex-col gap-10">
                <GlitchText
                    as="h2"
                    className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                >
                    THE LOOT
                </GlitchText>

                {/* Amitian / Non-Amitian Toggle */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => handleToggle(true)}
                        className={`relative font-display tracking-widest text-lg md:text-xl px-6 py-2 border-2 transition-all duration-300 active:scale-[0.92] ${isAmitian ? 'bg-(--accent) text-white border-(--accent) shadow-[4px_4px_0_#1a1a1a]' : 'bg-transparent text-white/50 border-white/20 hover:text-white hover:border-white/50 shadow-none'}`}
                    >
                        AMITIAN
                        {isAmitian && (
                            <span
                                className="absolute bottom-[-10px] left-1/2 -translate-x-1/2"
                                style={{
                                    width: "2px",
                                    height: "8px",
                                    background: "var(--accent)",
                                    display: "block",
                                }}
                            />
                        )}
                    </button>
                    <button
                        onClick={() => handleToggle(false)}
                        className={`relative font-display tracking-widest text-lg md:text-xl px-6 py-2 border-2 transition-all duration-300 active:scale-[0.92] ${!isAmitian ? 'bg-(--accent) text-white border-(--accent) shadow-[4px_4px_0_#1a1a1a]' : 'bg-transparent text-white/50 border-white/20 hover:text-white hover:border-white/50 shadow-none'}`}
                    >
                        NON-AMITIAN
                        {!isAmitian && (
                            <span
                                className="absolute bottom-[-10px] left-1/2 -translate-x-1/2"
                                style={{
                                    width: "2px",
                                    height: "8px",
                                    background: "var(--accent)",
                                    display: "block",
                                }}
                            />
                        )}
                    </button>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-end" style={{ maxWidth: '64rem', margin: '0 auto', width: '100%' }}>
                {prizes.map((prize, i) => (
                    <motion.div
                        key={prize.place}
                        className="relative flex flex-col items-center"
                        initial={{ opacity: 0, y: 80, scale: 0.7 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.15,
                            ease: [0.22, 0.03, 0.26, 1],
                        }}
                    >
                        {/* Starburst card */}
                        <div
                            className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] flex items-center justify-center"
                            style={{ transform: `scale(${prize.scale})` }}
                        >
                            <StarburstSVG points={prize.points} color={prize.color} />

                            <div className="relative z-10 text-center">
                                <span
                                    className="font-display text-lg tracking-widest block mb-1"
                                    style={{ color: prize.color }}
                                >
                                    {prize.place} PLACE
                                </span>
                                <span
                                    className="font-display text-3xl md:text-4xl block"
                                    style={{ color: prize.color }}
                                >
                                    {prize.label}
                                </span>
                                <span className="font-display text-4xl md:text-5xl text-white block mt-2">
                                    {isAmitian ? prize.amitianAmount : prize.nonAmitianAmount}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tagline below prizes grid */}
            <motion.div
                className="relative z-10 text-center"
                style={{ marginTop: "2.5rem" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <GlitchText
                    as="p"
                    className="font-display text-3xl md:text-4xl text-white tracking-wider"
                >
                    ...and <span style={{ color: "var(--accent)" }}>Exciting Goodies</span> Await!
                </GlitchText>
            </motion.div>
        </section>
    );
}
