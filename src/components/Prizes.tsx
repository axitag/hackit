"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";
import { useState } from "react";

const prizes = [
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
        place: "3RD",
        label: "THIRD PLACE",
        amitianAmount: "₹2,000",
        nonAmitianAmount: "₹2,000",
        color: "#cd7f32",
        bgColor: "rgba(205,127,50,0.1)",
        scale: 0.75,
        description: "Bronze but not broken. A force to be reckoned with.",
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

    return (
        <section id="prizes" className="snap-section relative px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/loot_bg.png"
                    alt="Loot section background"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-linear-to-b from-(--bg) via-transparent to-(--bg)" />
            </div>

            <div className="relative z-10 text-center mb-8 md:mb-12">
                <GlitchText
                    as="h2"
                    className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                >
                    THE LOOT
                </GlitchText>

                {/* Amitian / Non-Amitian Toggle */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => setIsAmitian(true)}
                        className={`font-display tracking-widest text-lg md:text-xl px-6 py-2 border-2 transition-all duration-300 ${isAmitian ? 'bg-(--accent) text-white border-(--accent) shadow-[4px_4px_0_#1a1a1a]' : 'bg-transparent text-white/50 border-white/20 hover:text-white hover:border-white/50 shadow-none'}`}
                    >
                        AMITIAN
                    </button>
                    <button
                        onClick={() => setIsAmitian(false)}
                        className={`font-display tracking-widest text-lg md:text-xl px-6 py-2 border-2 transition-all duration-300 ${!isAmitian ? 'bg-(--accent) text-white border-(--accent) shadow-[4px_4px_0_#1a1a1a]' : 'bg-transparent text-white/50 border-white/20 hover:text-white hover:border-white/50 shadow-none'}`}
                    >
                        NON-AMITIAN
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

                        {/* Speech bubble description */}
                        <div className="speech-bubble mt-6 max-w-[250px] text-center">
                            <p className="font-body text-sm text-white/70">{prize.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
