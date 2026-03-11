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
    const total = events.length;

    return (
        <section id="schedule" className="snap-section-auto relative overflow-hidden flex flex-col" style={{ padding: '4rem 1.5rem' }}>
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/timeline_bg.png"
                    alt="Timeline section background"
                    fill
                    className="object-cover opacity-15"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0a0a0a, transparent 15%, transparent 85%, #0a0a0a)' }} />
            </div>

            {/* Heading */}
            <div className="relative z-10 text-center" style={{ marginBottom: '3rem' }}>
                <GlitchText
                    as="h2"
                    className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                >
                    THE TIMELINE
                </GlitchText>
            </div>

            {/* Curved Timeline */}
            <div className="relative z-10" style={{ maxWidth: '64rem', margin: '0 auto', width: '100%' }}>
                {/* SVG curved path */}
                <svg
                    className="absolute hidden md:block"
                    style={{
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80%',
                        height: '100%',
                        pointerEvents: 'none',
                    }}
                    viewBox="0 0 400 1000"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    <path
                        d={`M200,0 ${events.map((_, i) => {
                            const y = (i / (total - 1)) * 1000;
                            const x = i % 2 === 0 ? 120 : 280;
                            const cpx = i % 2 === 0 ? 280 : 120;
                            return `S${cpx},${y - 40} ${x},${y}`;
                        }).join(' ')}`}
                        stroke="#E8192C"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeDasharray="6 4"
                    />
                </svg>

                {/* Mobile vertical line */}
                <div
                    className="absolute md:hidden"
                    style={{
                        left: '24px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'linear-gradient(to bottom, transparent, #E8192C33, #E8192C33, transparent)',
                    }}
                />

                {/* Event cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {events.map((event, i) => {
                        const isLeft = i % 2 === 0;

                        return (
                            <motion.div
                                key={i}
                                className="relative"
                                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 0.03, 0.26, 1] }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    paddingLeft: '3rem',
                                }}
                            >
                                {/* Mobile dot */}
                                <div
                                    className="absolute md:hidden"
                                    style={{
                                        left: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: event.highlight ? '18px' : '12px',
                                        height: event.highlight ? '18px' : '12px',
                                        borderRadius: '50%',
                                        background: event.highlight ? '#E8192C' : '#333',
                                        border: event.highlight ? '2px solid #E8192C' : '2px solid #444',
                                        boxShadow: event.highlight ? '0 0 12px rgba(232,25,44,0.5)' : 'none',
                                        zIndex: 10,
                                    }}
                                />

                                {/* Desktop layout — alternating sides */}
                                <div
                                    className="hidden md:flex items-center w-full"
                                    style={{
                                        flexDirection: isLeft ? 'row' : 'row-reverse',
                                    }}
                                >
                                    {/* Card */}
                                    <div
                                        className="group relative"
                                        style={{
                                            width: '45%',
                                            background: event.highlight ? 'rgba(232,25,44,0.08)' : 'rgba(20,20,20,0.8)',
                                            border: event.highlight ? '1px solid rgba(232,25,44,0.3)' : '1px solid rgba(255,255,255,0.06)',
                                            padding: '1.25rem 1.5rem',
                                            position: 'relative',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {/* Red left accent for highlight */}
                                        {event.highlight && (
                                            <div style={{
                                                position: 'absolute',
                                                left: 0,
                                                top: 0,
                                                bottom: 0,
                                                width: '3px',
                                                background: '#E8192C',
                                            }} />
                                        )}

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{event.icon}</span>
                                            <div>
                                                <span
                                                    className="font-display"
                                                    style={{
                                                        display: 'block',
                                                        fontSize: '0.65rem',
                                                        letterSpacing: '0.2em',
                                                        color: event.highlight ? '#E8192C' : 'rgba(255,255,255,0.4)',
                                                        marginBottom: '0.25rem',
                                                    }}
                                                >
                                                    {event.time}
                                                </span>
                                                <span
                                                    className="font-body"
                                                    style={{
                                                        display: 'block',
                                                        fontSize: '1.1rem',
                                                        color: event.highlight ? '#fff' : 'rgba(255,255,255,0.7)',
                                                        fontWeight: event.highlight ? 700 : 400,
                                                        letterSpacing: '0.05em',
                                                    }}
                                                >
                                                    {event.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center dot */}
                                    <div style={{ width: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div
                                            style={{
                                                width: event.highlight ? '18px' : '10px',
                                                height: event.highlight ? '18px' : '10px',
                                                borderRadius: '50%',
                                                background: event.highlight ? '#E8192C' : '#333',
                                                border: event.highlight ? '2px solid #E8192C' : '2px solid #444',
                                                boxShadow: event.highlight ? '0 0 16px rgba(232,25,44,0.5)' : 'none',
                                                position: 'relative',
                                                zIndex: 10,
                                            }}
                                        />
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div style={{ width: '45%' }} />
                                </div>

                                {/* Mobile card */}
                                <div
                                    className="md:hidden"
                                    style={{
                                        width: '100%',
                                        background: event.highlight ? 'rgba(232,25,44,0.08)' : 'rgba(20,20,20,0.8)',
                                        border: event.highlight ? '1px solid rgba(232,25,44,0.3)' : '1px solid rgba(255,255,255,0.06)',
                                        borderLeft: event.highlight ? '3px solid #E8192C' : '1px solid rgba(255,255,255,0.06)',
                                        padding: '1rem 1.25rem',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.25rem' }}>{event.icon}</span>
                                        <div>
                                            <span
                                                className="font-display"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '0.6rem',
                                                    letterSpacing: '0.2em',
                                                    color: event.highlight ? '#E8192C' : 'rgba(255,255,255,0.4)',
                                                    marginBottom: '0.2rem',
                                                }}
                                            >
                                                {event.time}
                                            </span>
                                            <span
                                                className="font-body"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '0.95rem',
                                                    color: event.highlight ? '#fff' : 'rgba(255,255,255,0.7)',
                                                    fontWeight: event.highlight ? 700 : 400,
                                                }}
                                            >
                                                {event.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
