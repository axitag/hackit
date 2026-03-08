"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";

const judges = [
    {
        name: "DR. NOIR",
        role: "Lead Judge",
        type: "JUDGE",
        field: "Quantum Computing",
    },
    {
        name: "SIGNAL",
        role: "Technical Mentor",
        type: "MENTOR",
        field: "Systems Architecture",
    },
    {
        name: "VORTEX",
        role: "Industry Judge",
        type: "JUDGE",
        field: "Machine Learning",
    },
    {
        name: "CIPHER",
        role: "Security Mentor",
        type: "MENTOR",
        field: "Cryptography",
    },
    {
        name: "ECHO",
        role: "Design Judge",
        type: "JUDGE",
        field: "UX Engineering",
    },
    {
        name: "PHANTOM",
        role: "Innovation Mentor",
        type: "MENTOR",
        field: "Emerging Tech",
    },
];

function JudgeCard({
    judge,
    index,
}: {
    judge: (typeof judges)[0];
    index: number;
}) {
    // Generate a consistent pseudo-random tilt based on index: -1deg to 1deg
    const tilt = parseFloat((Math.sin(index * 4.321)).toFixed(2));

    return (
        <motion.div
            className="relative w-[60%] sm:w-1/2 lg:w-1/2 mx-auto aspect-[2/3] group select-none cursor-pointer"
            initial={{ opacity: 0, y: 50, rotate: tilt }}
            whileInView={{ opacity: 1, y: 0, rotate: tilt }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                filter: 'drop-shadow(2px 4px 10px rgba(0,0,0,0.8))'
            }}
            whileHover={{
                scale: 1.03,
                rotate: 0,
                zIndex: 30
            }}
        >
            {/* The main wanted poster background - stretches to fill the card */}
            <div className="absolute inset-0 w-full h-full transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] z-10 border border-transparent group-hover:border-[#e63946]/50 rounded-sm">
                <Image
                    src="/images/team/shilpi_potrait.png"
                    alt="Wanted Background"
                    fill
                    className="object-fill pointer-events-none z-10"
                    priority={index < 3}
                />
            </div>

            {/* Inner photo placed ON TOP of the blank rectangular frame of the poster. */}
            <div
                className="absolute overflow-hidden z-20 rounded-sm"
                style={{
                    top: '41%',
                    left: '15%',
                    right: '15%',
                    height: '43%',
                }}
            >
                <Image
                    src={`/images/team/shilpi.jpg`}
                    alt="Judge Photo"
                    className="object-cover"
                    width={250}
                    height={250}
                />
            </div>

            {/* The judge's role, goes in the bottom white box area.
                We use text-black to make it visible against the light background.
            */}
            <div className="absolute bottom-[9%] left-0 w-full text-center px-4 z-20 flex justify-center">
                <p className="font-label text-[6px] sm:text-[7px] md:text-[8px] text-[#111] tracking-widest font-black uppercase whitespace-nowrap scale-90 origin-center">
                    {judge.role}
                </p>
            </div>

            {/* Hover Effects: Red glow/splatter overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 mix-blend-screen">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/50 to-transparent blur-xl -translate-y-1/4 translate-x-1/4 rounded-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/40 to-transparent blur-xl translate-y-1/4 -translate-x-1/4 rounded-full" />
            </div>
        </motion.div>
    );
}

export default function Teams() {
    return (
        <section id="teams" className="snap-section-auto relative px-6 md:px-12 lg:px-16 py-16 bg-[#080808] overflow-hidden">
            {/* Faint conspiracy board lines / texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />
            {/* Added some scattered subtle red/white lines typical of evidence boards */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ strokeWidth: 1.5 }}>
                <line x1="10%" y1="20%" x2="40%" y2="60%" className="stroke-[#e63946] opacity-10" strokeDasharray="5,5" />
                <line x1="80%" y1="10%" x2="50%" y2="80%" className="stroke-[#e63946] opacity-10" strokeDasharray="5,5" />
                <line x1="30%" y1="80%" x2="70%" y2="30%" className="stroke-white opacity-[0.05]" strokeDasharray="5,5" />
            </svg>

            {/* Subtle grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'repeat',
                }}
            />

            <div className="relative z-10 text-center mb-16 md:mb-24 mt-8">
                <GlitchText
                    as="h2"
                    className="font-display text-4xl sm:text-6xl md:text-8xl text-white tracking-wider"
                >
                    THE COUNCIL
                </GlitchText>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12" style={{ maxWidth: '80rem', margin: '0 auto', width: '100%' }}>
                {judges.map((judge, i) => (
                    <JudgeCard key={judge.name} judge={judge} index={i} />
                ))}
            </div>
        </section>
    );
}
