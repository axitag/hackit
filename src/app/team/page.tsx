"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import RegisterCTA from '@/components/RegisterCTA';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GlitchText from '@/components/GlitchText';

// --- DATA ---
const mentor = [
    { name: "Dr. Shashi Shekhar", role: "MENTOR", image: "/images/team/sashi.jpg" }
];

const facultyAdvisors = [
    { name: "Dr. Preetish Ranjan", role: "FACULTY ADVISOR", image: "/images/team/preetish.jpg" },
    { name: "Dr. Shilpi Singh", role: "FACULTY ADVISOR", image: "/images/team/shilpi.jpg" }
];

const organizingTeam = [
    { name: "Member 1", role: "ORGANIZER", image: "/images/team/sashi.jpg" },
    { name: "Member 2", role: "ORGANIZER", image: "/images/team/sashi.jpg" },
    { name: "Member 3", role: "ORGANIZER", image: "/images/team/sashi.jpg" },
    { name: "Member 4", role: "ORGANIZER", image: "/images/team/sashi.jpg" },
    { name: "Member 5", role: "ORGANIZER", image: "/images/team/sashi.jpg" }
];

const devTeam = [
    { name: "Dev 1", role: "DEVELOPER", image: "/images/team/sashi.jpg" },
    { name: "Dev 2", role: "DEVELOPER", image: "/images/team/sashi.jpg" }
];

const coreTeam = [
    { name: "Core 1", role: "CORE MEMBER", image: "/images/team/sashi.jpg" },
    { name: "Core 2", role: "CORE MEMBER", image: "/images/team/sashi.jpg" },
    { name: "Core 3", role: "CORE MEMBER", image: "/images/team/sashi.jpg" },
    { name: "Core 4", role: "CORE MEMBER", image: "/images/team/sashi.jpg" },
    { name: "Core 5", role: "CORE MEMBER", image: "/images/team/sashi.jpg" }
];


// --- COMPONENTS ---

const SectionDivider = () => (
    <div className="w-full flex items-center justify-center py-16 md:py-24 opacity-80">
        <div className="h-px grow bg-[#E8192C]/40" />
        <div className="mx-6 text-[#E8192C]">
            <svg width="32" height="32" viewBox="0 0 100 100" className="opacity-80">
                <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M15 85 L85 15" stroke="currentColor" strokeWidth="1" />
                <path d="M50 20 Q65 35 80 50 Q65 65 50 80 Q35 65 20 50 Q35 35 50 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M50 35 Q57 42 65 50 Q57 58 50 65 Q43 58 35 50 Q43 42 50 35 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
        </div>
        <div className="h-px grow bg-[#E8192C]/40" />
    </div>
);

const SectionHeader = ({ title }: { title: string }) => (
    <motion.div
        className="w-full mb-14 md:mb-16 text-center"
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.6 }}
    >
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase inline-block relative group">
            <span className="text-[#E8192C]">».</span> <span className="italic">{title}</span>
            <span className="absolute -bottom-2 left-0 w-full h-px bg-[#E8192C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
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
            className="group relative flex flex-col bg-[#111] border-2 border-[#1a1a1a] p-3 shadow-[4px_4px_0_#000] hover:shadow-[0_0_0_2px_#E8192C,6px_6px_0_#000] hover:-translate-y-1.5 transition-all duration-300 w-full max-w-[320px] mx-auto"
        >
            {/* Top Image Box */}
            <div className="relative w-full overflow-hidden border-2 border-[#222] bg-[#1a1a1a] aspect-3/4">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="font-display text-6xl text-white">?</span>
                </div>

                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center filter grayscale contrast-125 sepia-[0.3] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                />

                {/* Overlay Texture */}
                <div
                    className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"
                    style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '3px 3px' }}
                />
            </div>

            {/* Bottom Info Box */}
            <div className="pt-5 pb-3 px-2 flex flex-col items-center justify-center text-center relative z-20">
                <h3 className="font-display text-2xl tracking-wide text-[#f0ece0] uppercase mb-1">{member.name}</h3>

                {/* LinkedIn Icon */}
                <a href="#" className="mt-4 text-white/50 hover:text-[#E8192C] transition-colors" aria-label={`LinkedIn for ${member.name}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                </a>
            </div>

            {/* Comic tape accent */}
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
        <main className="min-h-screen bg-[#0a0a0a] relative flex flex-col items-center w-full">
            <Navigation />

            {/* ── TOP SECTION (TEAMS) WITH BACKGROUND ── */}
            <div className="relative w-full flex flex-col items-center">

                {/* Background Image constrained to this section */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                        src="/images/team/teams_bg_2.png"
                        alt="City Skyline"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* ── MAIN CONTENT CONTAINER ── */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

                    {/* Page Title */}
                    <div className="w-full flex flex-col items-center" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
                        <GlitchText
                            as="h1"
                            className="font-display text-4xl sm:text-6xl md:text-8xl text-white tracking-wider"
                        >
                            THE COUNCIL
                        </GlitchText>
                    </div>

                    {/* --- MENTOR --- */}
                    <section className="w-full flex flex-col justify-center gap-5 items-center relative" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                        <SectionHeader title="MENTOR" />
                        <div className="flex flex-wrap justify-center gap-10 w-full max-w-5xl mx-auto">
                            <div className="w-[210px] sm:w-[225px]">
                                <PortraitCard member={mentor[0]} index={0} />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full translate-y-1/2">
                            <SectionDivider />
                        </div>
                        {/* </section> */}

                        {/* --- FACULTY ADVISOR --- */}
                        {/* <section className="w-full snap-section flex flex-col justify-center items-center py-20 relative"> */}
                        <SectionHeader title="FACULTY ADVISOR" />
                        <div className="flex justify-center gap-5 md:gap-14 w-full max-w-5xl mx-auto">
                            {facultyAdvisors.map((member, i) => (
                                <div key={i} className="w-[210px] sm:w-[225px]">
                                    <PortraitCard member={member} index={i} />
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-0 left-0 w-full translate-y-1/2">
                            <SectionDivider />
                        </div>
                    </section>

                    {/* --- ORGANIZING TEAM --- */}
                    <section className="w-full flex flex-col gap-5 justify-center items-center relative" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                        <SectionHeader title="ORGANIZING TEAM" />
                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-12 md:gap-x-12 w-full max-w-7xl mx-auto">
                            {organizingTeam.map((member, i) => (
                                <div key={i} className="w-[210px] sm:w-[225px]">
                                    <PortraitCard member={member} index={i} />
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-0 left-0 w-full translate-y-1/2">
                            <SectionDivider />
                        </div>
                    </section>

                    {/* --- DEVELOPER TEAM --- */}
                    <section className="w-full flex flex-col gap-5 justify-center items-center relative" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                        <SectionHeader title="DEVELOPER TEAM" />
                        <div className="flex flex-wrap justify-center gap-10 md:gap-14 w-full max-w-5xl mx-auto">
                            {devTeam.map((member, i) => (
                                <div key={i} className="w-[210px] sm:w-[225px]">
                                    <PortraitCard member={member} index={i} />
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-0 left-0 w-full translate-y-1/2">
                            <SectionDivider />
                        </div>
                    </section>

                    {/* --- CORE TEAM --- */}
                    <section className="w-full flex flex-col gap-5 justify-center items-center relative" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                        <SectionHeader title="CORE TEAM" />
                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-12 md:gap-x-12 w-full max-w-7xl mx-auto">
                            {coreTeam.map((member, i) => (
                                <div key={i} className="w-[210px] sm:w-[225px]">
                                    <PortraitCard member={member} index={i} />
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>

            {/* ── FOOTER SECTION (NO BACKGROUND) ── */}
            <div className="w-full relative z-20 snap-start">
                <RegisterCTA />
                <Footer />
            </div>
        </main>
    );
}