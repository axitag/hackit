"use client";

import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

const prizes = [
    {
        place: "1ST",
        label: "GRAND PRIZE",
        amount: "$5,000",
        color: "#E8003D",
        bgColor: "rgba(232,0,61,0.15)",
        scale: 1,
        description: "The ultimate prize for the ultimate hack. Glory across all timelines.",
        points: 16,
    },
    {
        place: "2ND",
        label: "RUNNER UP",
        amount: "$2,500",
        color: "#aaaaaa",
        bgColor: "rgba(170,170,170,0.1)",
        scale: 0.85,
        description: "Silver lining? More like silver lightning. Still legendary.",
        points: 12,
    },
    {
        place: "3RD",
        label: "THIRD PLACE",
        amount: "$1,000",
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
        const x = 150 + r * Math.cos(angle);
        const y = 150 + r * Math.sin(angle);
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
    return (
        <section id="prizes" className="snap-section px-6 md:px-12 lg:px-16">
            <div className="text-center mb-6 md:mb-16">
                <GlitchText
                    as="h2"
                    className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                >
                    THE LOOT
                </GlitchText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-end" style={{ maxWidth: '64rem', margin: '0 auto', width: '100%' }}>
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
                                    {prize.amount}
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
