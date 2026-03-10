"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import RegisterCTA from "@/components/RegisterCTA";

const whyJoinUs = [
    "Work on real-world challenges",
    "Collaborate with industry experts & mentors",
    "Win exciting prizes and recognition",
    "Learn new skills and network with tech leaders",
];

export default function AboutPage() {
    return (
        <main className="snap-container min-h-screen bg-[#0a0a0a] text-[#f0ece0] flex flex-col relative overflow-hidden font-body selection:bg-[#E8192C] selection:text-white w-full">
            {/* Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none w-full h-full flex items-center justify-center">
                <Image
                    src="/images/bg_origin.png"
                    alt="City Skyline Background"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
            </div>

            {/* Navigation Menu (Hamburger) */}
            <Navigation />

            {/* Halftone and Grain Overlay - Commented out by User */}
            {/* <div className="fixed inset-0 z-0 pointer-events-none mixed-blend-overlay opacity-30 paper-overlay" />
            <div className="fixed inset-0 z-0 pointer-events-none noise-overlay opacity-20" /> */}

            {/* Scanline Animation */}
            <div className="fixed inset-0 z-10 pointer-events-none scanlines opacity-10" />

            {/* Main Content Container */}
            <section className="snap-section min-h-[100dvh] flex flex-col items-center justify-center w-full pt-20 pb-16 px-4 md:px-8 z-20 relative">
                <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-10">

                    {/* Masthead */}
                    <motion.header
                        className="text-center mb-24 border-b-4 border-[#333] pb-6 relative w-full"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider text-[#f0ece0] drop-shadow-[3px_3px_0_#111] w-full text-center">
                            THE HACKIT CHRONICLE
                        </h1>

                        {/* Double Thin Rule */}
                        <div className="h-[1px] bg-[#333] w-full mt-4 mb-2 mx-auto" />
                        <div className="h-[2px] bg-[#333] w-full mb-4 mx-auto" />

                        <div className="flex justify-between items-center font-label text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase text-[#f0ece0]/70 px-4 w-full">
                            <span>AMITY UNIVERSITY PATNA</span>
                            <span className="hidden sm:inline">·</span>
                            <span className="text-[#E8192C] font-bold">EST. 2026</span>
                            <span className="hidden sm:inline">·</span>
                            <span>VOLUME I</span>
                        </div>

                        <div className="h-[2px] bg-[#333] w-full mt-4 mx-auto" />
                    </motion.header>

                    {/* Newspaper Body Grid - TWO COLUMNS */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 relative mt-20 sm:mt-24 md:mt-32 lg:mt-40">

                        {/* Faint Spider-Web Decoration */}
                        <svg
                            className="absolute -top-10 -right-10 w-[200px] h-[200px] opacity-5 pointer-events-none"
                            viewBox="0 0 400 400"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path d="M400,0 L200,200 L400,400" stroke="#f0ece0" strokeWidth="2" />
                            <path d="M400,0 L0,200" stroke="#f0ece0" strokeWidth="2" />
                            <path d="M400,100 Q300,200 200,200 Q100,200 0,100" stroke="#f0ece0" strokeWidth="2" />
                            <path d="M400,200 Q300,250 200,200 Q100,150 0,200" stroke="#f0ece0" strokeWidth="2" />
                        </svg>

                        {/* Left Column: About HackIT */}
                        <motion.article
                            className="w-full lg:col-span-7 xl:col-span-8 newspaper-column projector-flicker text-left flex flex-col gap-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-20 text-[#f0ece0] leading-none uppercase drop-shadow-[2px_2px_0_#111]">
                                ABOUT HACKIT
                            </h2>

                            <div className="text-base sm:text-lg text-[#f0ece0]/90 leading-relaxed font-label text-justify content-body">
                                <span className="drop-cap float-left mr-5 mt-1 text-6xl md:text-7xl font-display text-[#f0ece0] bg-[#1a1a1a] px-3 py-1 shadow-[4px_4px_0_#111]">
                                    W
                                </span>
                                &nbsp;elcome to HackIT 26, the premier hackathon event at Amity University Patna! Our mission is to bring together the brightest minds in technology, innovation, and creativity to solve real-world problems and build amazing projects. This 48-hour sprint isn't just a competition; it's a testament to raw ingenuity and the relentless pursuit of boundary-pushing solutions.
                                <br /><br />
                                Step into a realm where the multiversal boundaries of code are shattered. You will collaborate, brainstorm, and architect the future—pulling ideas from parallel dimensions of thought. No matter your background, whether you're a seasoned developer or a visionary designer, HackIT provides the canvas for your masterpiece.
                                <br /><br />
                                Prepare to disrupt the ordinary. The city never sleeps, and neither does innovation. Break the code. Break the multiverse.
                            </div>
                        </motion.article>

                        {/* Section Divider on Mobile (Red ink splat motif) */}
                        <div className="lg:hidden flex justify-center w-full py-4 relative z-10">
                            <div className="text-[#E8192C] text-2xl font-display tracking-widest opacity-80 decoration-splat">
                                — * — * —
                            </div>
                        </div>

                        {/* Right Column: Why Join Us? Sidebar */}
                        <motion.aside
                            className="w-full lg:col-span-5 xl:col-span-4 projector-flicker"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <div className="relative bg-[#111]/80 backdrop-blur-sm p-6 sm:p-8 border-[3px] border-[#333] shadow-[8px_8px_0_#1a1a1a] group w-full">

                                {/* Red Stamp Accent */}
                                <div className="absolute -top-4 -right-4 border-2 border-[#E8192C] text-[#E8192C] font-display text-xl px-3 py-1 rotate-12 bg-[#0a0a0a] shadow-[2px_2px_0_#4a060e] z-10 pointer-events-none select-none uppercase tracking-widest stamp-effect">
                                    TOP SECRET
                                </div>

                                <h3 className="font-display text-3xl sm:text-4xl text-[#E8192C] mb-12 border-b-2 border-[#333] pb-3 uppercase text-left">
                                    WHY JOIN US?
                                </h3>

                                <ul className="space-y-4 text-left w-full mt-6">
                                    {whyJoinUs.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-start gap-4 font-label text-sm sm:text-base text-[#f0ece0]/80 group/item cursor-default"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                                        >
                                            <span className="text-[#E8192C] font-display text-xl mt-[-2px] group-hover/item:translate-x-1 group-hover/item:scale-110 transition-transform duration-200">
                                                ▸
                                            </span>
                                            <span className="group-hover/item:text-[#f0ece0] transition-colors duration-200">
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E8192C]" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E8192C]" />
                            </div>
                        </motion.aside>

                    </div>
                </div>
            </section>

            <div className="w-full relative z-20">
                <RegisterCTA />
                <Footer />
            </div>

            <style jsx>{`
                /* Noir Newspaper Styles */
                
                .paper-overlay {
                    background-color: rgba(255, 245, 220, 0.04);
                }

                .noise-overlay {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='0.1'/%3E%3C/svg%3E");
                    pointer-events: none;
                }

                .scanlines {
                    background: linear-gradient(
                        to bottom,
                        rgba(255,255,255,0),
                        rgba(255,255,255,0) 50%,
                        rgba(0,0,0,0.2) 50%,
                        rgba(0,0,0,0.2)
                    );
                    background-size: 100% 4px;
                }

                .drop-cap {
                    line-height: 0.8;
                }

                .content-body::first-line {
                    letter-spacing: 0.05em;
                }

                /* Old Projector Flicker */
                @keyframes projectorFlicker {
                    0% { opacity: 0.9; }
                    5% { opacity: 0.5; }
                    10% { opacity: 1; }
                    15% { opacity: 0.8; }
                    20% { opacity: 1; }
                    50% { opacity: 0.95; }
                    55% { opacity: 0.6; }
                    60% { opacity: 1; }
                    100% { opacity: 1; }
                }

                .projector-flicker {
                    animation: projectorFlicker 4s infinite alternate;
                }

                /* Stamp Effect */
                .stamp-effect {
                    mix-blend-mode: screen;
                    position: absolute;
                    font-weight: bold;
                    border: 0.25rem solid #E8192C;
                    color: #E8192C;
                    padding: 0.25rem 1rem;
                    text-transform: uppercase;
                    border-radius: 4px;
                    -webkit-mask-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
                    mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    -webkit-mask-size: 100px 100px;
                    mask-size: 100px 100px;
                }
            `}</style>
        </main>
    );
}
