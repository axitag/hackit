"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";

const events = [
    { time: "DAY 1 — 09:00", name: "Opening Ceremony", icon: "🎤", highlight: true },
    { time: "DAY 1 — 10:00", name: "Hacking Begins", icon: "⚡", highlight: true },
    { time: "DAY 1 — 13:00", name: "Lunch Break", icon: "🍕", highlight: false },
    { time: "DAY 1 — 18:00", name: "Mentor Sessions", icon: "🧠", highlight: false },
    { time: "DAY 2 — 09:00", name: "Morning Check-in", icon: "☀️", highlight: false },
    { time: "DAY 2 — 14:00", name: "Submissions Close", icon: "🏁", highlight: true },
    { time: "DAY 2 — 15:00", name: "Judging", icon: "⚖️", highlight: false },
    { time: "DAY 2 — 17:00", name: "Closing & Awards", icon: "🏆", highlight: true },
];

export default function Schedule() {
    return (
        <section id="schedule" className="snap-section relative px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/timeline_bg.png"
                    alt="Timeline section background"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
            </div>

            <div className="relative z-10 text-center mb-6 md:mb-16">
                <GlitchText
                    as="h2"
                    className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                >
                    THE TIMELINE
                </GlitchText>
            </div>

            <div className="relative z-10" style={{ maxWidth: '72rem', margin: '0 auto', width: '100%' }}>
                {/* Vertical line */}
                <div className="absolute left-[20px] md:left-[140px] top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-30" />

                {events.map((event, i) => (
                    <motion.div
                        key={i}
                        className={`relative flex items-stretch mb-0 ${i % 2 === 0 ? "bg-[var(--bg)]" : "bg-[var(--surface)]"
                            }`}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 0.03, 0.26, 1] }}
                    >
                        {/* Speed lines for highlight events */}
                        {event.highlight && (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        background: `repeating-conic-gradient(from 0deg at 0% 50%,
                      transparent 0deg,
                      rgba(232,0,61,0.15) 1deg,
                      transparent 3deg)`,
                                    }}
                                />
                            </div>
                        )}

                        {/* Time column */}
                        <div className="w-[110px] sm:w-[160px] md:w-[220px] flex-shrink-0 p-3 sm:p-5 md:p-6 flex items-center">
                            <span className="font-display text-[11px] sm:text-base md:text-lg text-[var(--accent)] whitespace-nowrap">
                                {event.time}
                            </span>
                        </div>

                        {/* Dot on timeline */}
                        <div className="relative flex-shrink-0 w-[20px] flex items-center justify-center">
                            <div
                                className={`w-3 h-3 rounded-full z-10 ${event.highlight
                                    ? "bg-[var(--accent)] shadow-[0_0_10px_rgba(232,0,61,0.6)]"
                                    : "bg-white/30"
                                    }`}
                            />
                        </div>

                        {/* Event name */}
                        <div
                            className={`flex-1 p-4 md:p-6 flex items-center gap-4 ${event.highlight ? "border-l-[3px] border-[var(--accent)]" : ""
                                }`}
                        >
                            <span className="text-lg sm:text-2xl md:text-3xl">{event.icon}</span>
                            <span
                                className={`font-body text-base sm:text-lg md:text-xl ${event.highlight ? "text-white font-bold" : "text-white/70"
                                    }`}
                            >
                                {event.name}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
