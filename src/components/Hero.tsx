"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GlitchText from "./GlitchText";
import GlitchSubtext from "./GlitchSubtext";
import GlitchImage from "./GlitchImage";
import Navigation from "./Navigation";

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
            className="snap-section relative w-full flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Top-left Menu */}
            <Navigation />

            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg2.png"
                    alt="Noir halftone hero background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
            </div>

            {/* Spider web SVG */}
            <svg
                className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] opacity-10"
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
                    className="absolute font-display text-4xl md:text-6xl lg:text-8xl text-white pointer-events-none select-none"
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

            {/* Main content — 4-section flex-col container */}
            <div
                className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                style={{ padding: "2rem 1rem" }}
            >
                {/* Section 1: HackIT Logo */}
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <GlitchImage
                        src="/images/hackit_logo_2.png"
                        alt="HACK IT logo"
                        width={800}
                        height={400}
                        className="w-[280px] sm:w-[400px] md:w-[600px] lg:w-[800px] h-auto"
                    />
                </motion.div>

                {/* Section 2: Aikyam + Amity Logos */}
                {/* <motion.div
                    className="flex items-center justify-center"
                    style={{ marginTop: "0.5rem" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Image
                        src="/images/akiyam.png"
                        alt="Akiyam logo"
                        width={300}
                        height={300}
                        className="w-[200px] md:w-[280px] lg:w-[360px] h-auto filter brightness-100"
                    />
                    <Image
                        src="/images/amity_bg_2.png"
                        alt="Amity logo"
                        width={300}
                        height={300}
                        className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-auto filter brightness-100"
                    />
                </motion.div> */}

                {/* Section 2: Aikyam + Amity Logos */}
                <motion.div
                    className="flex flex-col items-center justify-center"
                    style={{ marginTop: "0.5rem" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >

                    {/* Logos row */}
                    <div className="flex items-center justify-center gap-4">
                        <Image
                            src="/images/akiyam.png"
                            alt="Akiyam logo"
                            width={300}
                            height={300}
                            className="w-[160px] md:w-[220px] lg:w-[280px] h-auto filter brightness-100"
                        />
                        <Image
                            src="/images/amity_bg_2.png"
                            alt="Amity logo"
                            width={300}
                            height={300}
                            className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-auto filter brightness-100"
                        />
                    </div>
                </motion.div>


                {/* Bottom Elements */}
                <div className="absolute bottom-8 sm:bottom-12 w-full flex flex-col items-center z-20 px-4">
                    {/* Action Buttons */}
                    <div
                        className="flex flex-col items-center w-full md:flex-row md:justify-center"
                        style={{ marginBottom: "1.25rem", gap: "0.75rem" }}
                    >
                        <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                            target="_blank"
                            className="relative font-display text-sm sm:text-base tracking-wider bg-[var(--accent)] text-white shadow-[0_0_20px_rgba(232,0,61,0.4),0_0_40px_rgba(232,0,61,0.2)] hover:shadow-[0_0_30px_rgba(232,0,61,0.6),0_0_60px_rgba(232,0,61,0.3)] hover:scale-105 active:scale-95 transition-all duration-200 inline-block w-full md:w-auto text-center glitch-hover cursor-not-allowed opacity-70"
                            style={{
                                clipPath: "polygon(0% 0%, 98% 2%, 100% 96%, 1% 100%)",
                                padding: "0.625rem 1.5rem",
                            }}
                            aria-label="Register for Hackathon"
                        >
                            Hackathon registrations closed
                        </motion.a>

                        <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                            href="/ppt/ppt.pptx"
                            download="AMIHACKS-Template.pptx"
                            className="relative font-display text-sm sm:text-base tracking-wider border-[3px] border-white text-white shadow-[4px_4px_0_#1a1a1a,inset_0_0_0_1px_rgba(255,255,255,0.05)] hover:bg-white hover:text-[var(--bg)] hover:scale-105 active:scale-95 transition-all duration-200 inline-block w-full md:w-auto text-center glitch-hover"
                            style={{
                                clipPath: "polygon(1% 2%, 100% 0%, 98% 100%, 0% 97%)",
                                padding: "0.625rem 1.5rem",
                            }}
                            aria-label="Download Template"
                        >
                            Download Template &gt;
                        </motion.a>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                            className="w-full md:w-auto"
                        >
                            <Link
                                href="/problem-statement"
                                className="relative font-display text-sm sm:text-base tracking-wider border-[3px] border-white text-white shadow-[4px_4px_0_#1a1a1a,inset_0_0_0_1px_rgba(255,255,255,0.05)] hover:bg-white hover:text-[var(--bg)] hover:scale-105 active:scale-95 transition-all duration-200 inline-block w-full text-center glitch-hover"
                                style={{
                                    clipPath: "polygon(2% 0%, 99% 3%, 100% 98%, 0% 100%)",
                                    padding: "0.625rem 1.5rem",
                                }}
                                aria-label="View Problem Statements"
                            >
                                Problem Statement &gt;
                            </Link>
                        </motion.div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    >
                        <button
                            className="relative font-display text-lg sm:text-xl md:text-2xl bg-[var(--accent)] text-white px-12 py-3 sm:px-10 sm:py-4 md:px-14 md:py-5 tracking-wider pulse-glow ink-splat transition-transform hover:scale-105 active:scale-95"
                            style={{
                                clipPath:
                                    "polygon(0% 0%, 98% 2%, 100% 96%, 1% 100%)",
                            }}
                        >
                            Break the code. Break the multiverse.
                        </button>
                    </motion.div>

                    <motion.p
                        className="font-label text-xs md:text-sm text-white/40 tracking-widest"
                        style={{ marginTop: "1.5rem" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                    >
                        SCROLL TO ENTER THE MULTIVERSE ↓
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
