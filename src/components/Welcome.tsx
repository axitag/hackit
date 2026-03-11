"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";

// ——— Countdown target: April 12, 2026 09:00 IST ———
const TARGET_DATE = new Date("2026-04-12T09:00:00+05:30").getTime();

function getTimeLeft() {
    const now = Date.now();
    const diff = Math.max(0, TARGET_DATE - now);
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

// ——— Flip digit component ———
function FlipDigit({ value, label }: { value: number; label: string }) {
    const display = String(value).padStart(2, "0");

    return (
        <div
            className="flex flex-col items-center"
            style={{ minWidth: "5rem" }}
        >
            <div
                className="relative overflow-hidden"
                style={{
                    background: "#0a0a0a",
                    border: "2px solid var(--accent)",
                    boxShadow:
                        "0 0 12px rgba(232, 0, 61, 0.35), 0 0 24px rgba(232, 0, 61, 0.15), inset 0 0 0 1px rgba(232, 0, 61, 0.1)",
                    borderRadius: "4px",
                    padding: "0.75rem 1rem",
                    width: "100%",
                }}
            >
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={display}
                        className="block text-center font-label text-white"
                        style={{
                            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: "0.05em",
                        }}
                        initial={{ y: -30, opacity: 0, rotateX: -60 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        exit={{ y: 30, opacity: 0, rotateX: 60 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        {display}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span
                className="font-label tracking-[0.25em] uppercase"
                style={{
                    color: "var(--accent)",
                    fontSize: "0.6rem",
                    marginTop: "0.5rem",
                }}
            >
                {label}
            </span>
        </div>
    );
}

// ——— Typewriter line component ———
function TypewriterLine({
    text,
    delay,
}: {
    text: string;
    delay: number;
}) {
    const [displayed, setDisplayed] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(interval);
        }, 40);
        return () => clearInterval(interval);
    }, [started, text]);

    return (
        <span>
            {displayed}
            {started && displayed.length < text.length && (
                <span
                    className="inline-block"
                    style={{
                        width: "2px",
                        height: "1em",
                        background: "var(--accent)",
                        marginLeft: "2px",
                        verticalAlign: "text-bottom",
                        animation: "cursor-blink 0.8s step-end infinite",
                    }}
                />
            )}
        </span>
    );
}

// ——— Main Welcome component ———
export default function Welcome() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft);

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <section
            id="about"
            className="snap-section relative w-full flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/welcome_bg.png"
                    alt="Welcome section background"
                    fill
                    className="object-cover"
                    style={{ opacity: 0.60 }}
                />
                {/* Dark vignette overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.65) 70%, rgba(10,10,10,0.92) 100%)",
                    }}
                />
                {/* Top/bottom fade to bg */}
                {/* <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" /> */}
            </div>

            {/* Animated halftone grain overlay */}
            {/* <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    opacity: 0.06,
                    backgroundImage:
                        "radial-gradient(circle, var(--text) 1px, transparent 1px)",
                    backgroundSize: "5px 5px",
                    animation: "grain 0.5s steps(4) infinite",
                }}
            /> */}

            {/* Content */}
            <div
                className="relative z-10 flex flex-col items-center w-full"
                style={{ padding: "3rem 1.5rem", maxWidth: "64rem" }}
            >
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <GlitchText
                        as="h2"
                        className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-wider"
                    >
                        WELCOME TO HACKIT 26
                    </GlitchText>
                </motion.div>

                {/* Red divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        height: "2px",
                        width: "min(80%, 28rem)",
                        background:
                            "linear-gradient(90deg, transparent, var(--accent), transparent)",
                        marginTop: "1.25rem",
                        marginBottom: "1.5rem",
                        transformOrigin: "center",
                    }}
                />

                {/* Subtext — typewriter lines */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="flex flex-col items-center text-center font-label text-white/80"
                    style={{
                        fontSize: "clamp(0.75rem, 1.8vw, 1rem)",
                        lineHeight: 1.8,
                        letterSpacing: "0.04em",
                    }}
                >
                    <span>
                        <TypewriterLine
                            text="Join us for the Inaugural Hackathon Fest"
                            delay={800}
                        />
                    </span>
                    <span>
                        <TypewriterLine
                            text="At Amity University Patna"
                            delay={2800}
                        />
                    </span>
                    <span>
                        <TypewriterLine
                            text="An exciting new event filled with innovation and creativity!"
                            delay={4400}
                        />
                    </span>
                </motion.div>

                {/* Countdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-col items-center w-full"
                    style={{ marginTop: "2.5rem" }}
                >
                    {/* Countdown label */}
                    <p
                        className="font-display tracking-wider text-center"
                        style={{
                            color: "var(--accent)",
                            fontSize: "clamp(0.7rem, 1.6vw, 0.95rem)",
                            letterSpacing: "0.2em",
                            marginBottom: "1.25rem",
                        }}
                    >
                        TIME LEFT TO CRACK THE CASE
                    </p>

                    {/* Timer boxes */}
                    <div
                        className="grid grid-cols-2 md:grid-cols-4"
                        style={{ gap: "1rem", width: "fit-content" }}
                    >
                        <FlipDigit value={timeLeft.days} label="Days" />
                        <FlipDigit value={timeLeft.hours} label="Hours" />
                        <FlipDigit value={timeLeft.minutes} label="Minutes" />
                        <FlipDigit value={timeLeft.seconds} label="Seconds" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
