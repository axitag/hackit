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
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            className="relative cursor-pointer"
            style={{ perspective: "800px", height: "380px" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.03, 0.26, 1] }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 comic-border bg-[var(--surface)] p-5 flex flex-col"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {/* Type stamp */}
                    <div
                        className="absolute top-3 right-3 font-display text-xs px-3 py-1 tracking-wider"
                        style={{
                            background: judge.type === "JUDGE" ? "var(--accent)" : "rgba(255,255,255,0.1)",
                            color: judge.type === "JUDGE" ? "white" : "var(--accent)",
                            transform: "rotate(3deg)",
                        }}
                    >
                        {judge.type}
                    </div>

                    {/* Photo placeholder */}
                    <div className="relative w-full aspect-square mb-4 overflow-hidden">
                        <Image
                            src="/images/judge-placeholder.png"
                            alt={`${judge.name} - ${judge.role}`}
                            fill
                            className="object-cover"
                            style={{
                                filter: "grayscale(100%) contrast(1.2) brightness(0.8)",
                                mixBlendMode: "luminosity",
                            }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(135deg, rgba(232,0,61,0.3) 0%, transparent 60%)",
                                mixBlendMode: "multiply",
                            }}
                        />
                        {/* Halftone effect overlay */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: "radial-gradient(circle, black 1px, transparent 1px)",
                                backgroundSize: "4px 4px",
                            }}
                        />
                    </div>

                    <h3 className="font-display text-2xl text-white">{judge.name}</h3>
                    <p className="font-label text-xs text-[var(--accent)] tracking-wider mt-1">
                        {judge.role}
                    </p>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 comic-border bg-[var(--surface)] p-6 flex flex-col items-center justify-center text-center"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <h3 className="font-display text-2xl text-[var(--accent)] mb-4">
                        {judge.name}
                    </h3>
                    <AnimatePresence>
                        {flipped && (
                            <motion.p
                                className="font-body text-sm text-white/70 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                Identity classified. Timeline unknown.
                                <br />
                                Expertise: {judge.field}.
                                <br />
                                <br />
                                <span className="text-white/40 font-label text-xs">
                                    [FILE #{String(index + 1).padStart(3, "0")} — RESTRICTED]
                                </span>
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Judges() {
    return (
        <section id="judges" className="snap-section-auto px-4 md:px-8 py-12">
            <div className="text-center mb-6 md:mb-16">
                <GlitchText
                    as="h2"
                    className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                >
                    THE COUNCIL
                </GlitchText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ maxWidth: '72rem', margin: '0 auto', width: '100%' }}>
                {judges.map((judge, i) => (
                    <JudgeCard key={judge.name} judge={judge} index={i} />
                ))}
            </div>
        </section>
    );
}
