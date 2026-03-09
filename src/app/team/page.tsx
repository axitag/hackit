"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// --- DATA ---
const mentor = [
    { name: "Dr. Shashi Shekhar", role: "MENTOR", image: "/images/team/sashi.jpg" }
];

const facultyAdvisors = [
    { name: "Dr. Preetish Ranjan", role: "FACULTY ADVISOR", image: "/images/team/preetish.jpg" },
    { name: "Dr. Shilpi Singh", role: "FACULTY ADVISOR", image: "/images/team/shilpi.jpg" }
];

const organizingTeam = [
    { name: "Member 1", role: "ORGANIZER", image: "/images/team/shilpi.jpg" },
    { name: "Member 2", role: "ORGANIZER", image: "/images/team/shilpi.jpg" },
    { name: "Member 3", role: "ORGANIZER", image: "/images/team/shilpi.jpg" },
    { name: "Member 4", role: "ORGANIZER", image: "/images/team/shilpi.jpg" },
    { name: "Member 5", role: "ORGANIZER", image: "/images/team/shilpi.jpg" }
];

const devTeam = [
    { name: "Dev 1", role: "DEVELOPER", image: "/images/team/shilpi.jpg" },
    { name: "Dev 2", role: "DEVELOPER", image: "/images/team/shilpi.jpg" }
];

const coreTeam = [
    { name: "Core 1", role: "CORE MEMBER", image: "/images/team/shilpi.jpg" },
    { name: "Core 2", role: "CORE MEMBER", image: "/images/team/shilpi.jpg" },
    { name: "Core 3", role: "CORE MEMBER", image: "/images/team/shilpi.jpg" },
    { name: "Core 4", role: "CORE MEMBER", image: "/images/team/shilpi.jpg" },
    { name: "Core 5", role: "CORE MEMBER", image: "/images/team/shilpi.jpg" }
];


// --- COMPONENTS ---

const SectionDivider = () => (
    <div className="w-full flex items-center justify-center py-12 md:py-16 opacity-80">
        <div className="h-[1px] flex-grow bg-[#E8192C]/40" />
        <div className="mx-4 text-[#E8192C]">
            <svg width="32" height="32" viewBox="0 0 100 100" className="opacity-80">
                {/* Simple Spider Web SVG */}
                <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M15 85 L85 15" stroke="currentColor" strokeWidth="1" />
                <path d="M50 20 Q65 35 80 50 Q65 65 50 80 Q35 65 20 50 Q35 35 50 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M50 35 Q57 42 65 50 Q57 58 50 65 Q43 58 35 50 Q43 42 50 35 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
        </div>
        <div className="h-[1px] flex-grow bg-[#E8192C]/40" />
    </div>
);

const SectionHeader = ({ title }: { title: string }) => (
    <motion.div
        className="w-full mb-10 text-center"
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.6 }}
    >
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase inline-block relative group">
            <span className="text-[#E8192C]">».</span> <span className="italic">{title}</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#E8192C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
        </h2>
    </motion.div>
);

const PortraitCard = ({ member, index }: { member: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative flex flex-col bg-[#111] border-2 border-[#1a1a1a] p-3 shadow-[4px_4px_0_#000] hover:shadow-[0_0_0_2px_#E8192C,6px_6px_0_#000] hover:-translate-y-1.5 transition-all duration-300 w-full max-w-[320px] mx-auto`}
        >
            {/* Top Image Box */}
            <div className={`relative w-full overflow-hidden border-2 border-[#222] bg-[#1a1a1a] aspect-[3/4]`}>
                {/* Fallback image if placeholder missing */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="font-display text-6xl text-white">?</span>
                </div>

                {/* Replace src with actual images when ready */}
                <Image
                    src={member.image} // Load image dynamically from array
                    alt={member.name}
                    fill
                    className="object-cover object-center filter grayscale contrast-125 sepia-[0.3] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                />

                {/* Overlay Texture */}
                <div
                    className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-multiply"
                    style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '3px 3px' }}
                />
            </div>

            {/* Bottom Info Box */}
            <div className="pt-4 pb-2 px-1 flex flex-col items-center justify-center text-center relative z-20">
                <h3 className="font-display text-2xl tracking-wide text-[#f0ece0] uppercase mb-1">{member.name}</h3>
                <p className="font-mono text-[0.75rem] text-[#E8192C] tracking-[0.15em] font-bold">{member.role}</p>

                {/* LinkedIn Icon */}
                <a href="#" className="mt-4 text-white/50 hover:text-[#E8192C] transition-colors" aria-label={`LinkedIn for ${member.name}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                </a>
            </div>

            {/* Comic tape accents */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#E8192C] rotate-12 z-20" style={{ clipPath: 'polygon(0 0, 100% 10%, 90% 100%, 10% 90%)' }}></div>
        </motion.div>
    );
};


export default function TeamPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen w-full bg-[#0a0a0a] relative overflow-hidden pt-32 pb-24 flex flex-col items-center">

            {/* Global Background Images */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/amity_bg.png" // Using existing bg
                    alt="City Skyline"
                    fill
                    className="object-cover opacity-20 filter grayscale sepia-[0.2]"
                />

                {/* Halftone / Grain Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '4px 4px' }}
                />
                <div className="absolute inset-0 opacity-40 mix-blend-overlay noise-bg" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

                {/* --- MENTOR --- */}
                <section className="w-full flex flex-col items-center">
                    <SectionHeader title="MENTOR" />
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-5xl mx-auto">
                        <div className="w-[300px]">
                            <PortraitCard member={mentor[0]} index={0} />
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* --- FACULTY ADVISOR --- */}
                <section className="w-full flex flex-col items-center">
                    <SectionHeader title="FACULTY ADVISOR" />
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-5xl mx-auto">
                        {facultyAdvisors.map((member, i) => (
                            <div key={i} className="w-[300px]">
                                <PortraitCard member={member} index={i} />
                            </div>
                        ))}
                    </div>
                </section>

                <SectionDivider />

                {/* --- ORGANIZING TEAM --- */}
                <section className="w-full flex flex-col items-center">
                    <SectionHeader title="ORGANIZING TEAM" />
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-7xl mx-auto">
                        {organizingTeam.map((member, i) => (
                            <div key={i} className="w-[300px]">
                                <PortraitCard member={member} index={i} />
                            </div>
                        ))}
                    </div>
                </section>

                <SectionDivider />

                {/* --- DEVELOPER TEAM --- */}
                <section className="w-full flex flex-col items-center">
                    <SectionHeader title="DEVELOPER TEAM" />
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-5xl mx-auto">
                        {devTeam.map((member, i) => (
                            <div key={i} className="w-[300px]">
                                <PortraitCard member={member} index={i} />
                            </div>
                        ))}
                    </div>
                </section>

                <SectionDivider />

                {/* --- CORE TEAM --- */}
                <section className="w-full flex flex-col items-center">
                    <SectionHeader title="CORE TEAM" />
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-7xl mx-auto">
                        {coreTeam.map((member, i) => (
                            <div key={i} className="w-[300px]">
                                <PortraitCard member={member} index={i} />
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
