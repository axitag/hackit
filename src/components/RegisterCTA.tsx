"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GlitchText from "./GlitchText";

const stats = [
    { label: "HOURS", value: "48" },
    { label: "TRACKS", value: "04" },
    { label: "PRIZES", value: "₹8.5K+" },
];

const quickLinks = [
    { label: "Home", href: "#hero" },
    { label: "Register", href: "#register" },
    { label: "Problem Statements", href: "#tracks" },
    { label: "Teams", href: "#about" },
    { label: "Template", href: "#" },
    { label: "Tracks", href: "#tracks" },
    { label: "Timeline", href: "#schedule" },
    { label: "FAQ", href: "#faq" },
    { label: "Prizes", href: "#prizes" },
    { label: "Refund Policy", href: "#" },
];

const contactSocials = [
    {
        name: "Instagram",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
        ),
        href: "#",
    },
    {
        name: "WhatsApp",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        href: "#",
    },
    {
        name: "LinkedIn",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
        href: "#",
    },
];

export default function RegisterCTA() {
    return (
        <div className="snap-section-auto relative w-full overflow-hidden min-h-[100dvh] flex flex-col">

            {/* ===== REGISTER CTA SECTION ===== */}
            <section
                id="register"
                className="relative w-full flex flex-col items-center justify-center px-6 md:px-12 py-12 md:py-20"
            >
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/footer_bg.png"
                        alt="Register section background"
                        fill
                        className="object-contain opacity-40 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/90 via-[#0d0d0d]/40 to-[#0d0d0d]" />
                    {/* Dark vignette overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
                        }}
                    />
                </div>

                <div className="relative z-10 text-center flex flex-col items-center justify-center max-w-5xl mx-auto w-full pt-4">
                    {/* Tagline */}
                    <motion.p
                        className="font-label text-xs md:text-sm text-[var(--accent)] tracking-[0.35em] mb-4 md:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        ARE YOU READY?
                    </motion.p>

                    {/* Main heading */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, ease: [0.22, 0.03, 0.26, 1] }}
                    >
                        <GlitchText
                            as="h2"
                            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-wider leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        >
                            JOIN THE HACKIT
                        </GlitchText>
                    </motion.div>

                    {/* Subtext */}
                    <motion.p
                        className="mt-4 md:mt-6 font-body text-sm md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                    >
                        48 hours. 4 tracks. Unlimited possibilities. Register now and be part of the premier hackathon at Amity University Patna.
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        className="mt-6 md:mt-10 flex items-center justify-center gap-8 md:gap-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <span className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--accent)] block drop-shadow-[0_0_10px_rgba(232,25,44,0.3)]">
                                    {stat.value}
                                </span>
                                <span className="font-label text-[10px] md:text-xs text-white/40 tracking-widest mt-1 block">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        className="mt-6 md:mt-8 mx-auto w-24 h-[2px] bg-[var(--accent)] opacity-40 shadow-[0_0_8px_rgba(232,25,44,0.5)]"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    />

                    {/* Register button */}
                    <motion.div
                        className="mt-8 md:mt-10 mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <button
                            className="relative font-display text-xl sm:text-2xl md:text-3xl bg-[var(--accent)] text-white px-10 py-4 sm:px-14 sm:py-5 md:px-16 md:py-6 tracking-wider pulse-glow ink-splat transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(232,0,61,0.4)] active:scale-95 z-10"
                            style={{
                                clipPath: "polygon(1% 0%, 99% 3%, 100% 97%, 2% 100%)",
                            }}
                        >
                            REGISTER NOW
                        </button>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        className="mt-8 flex flex-col items-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.65, duration: 0.5 }}
                    >
                        <span className="font-label text-[10px] md:text-xs text-white/30 tracking-[0.3em]">
                            FOLLOW THE MULTIVERSE
                        </span>
                        <div className="flex items-center gap-3">
                            {contactSocials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="comic-border bg-[#111] w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-sm md:text-base text-white/60 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 relative z-10"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== CONTACT & MAP SECTION (Noir Redesign) ===== */}
            <div className="relative w-full grow bg-[#0d0d0d] px-6 md:px-12 lg:px-16 py-12 flex flex-col flex-1 overflow-hidden">
                {/* Visual Connector / Fade between CTA and this section */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

                {/* Horizontal Dashed Divider Line (Optional extra border just for separation) */}
                <div className="absolute top-0 left-0 right-0 border-t border-dashed border-[#E8192C]/30" />

                <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 grow py-6">

                    {/* LEFT PANEL — "The Dossier" */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex-1 flex justify-center w-full"
                    >
                        <div className="w-full max-w-[520px] flex flex-col space-y-6">
                            <h3 className="font-display text-3xl md:text-4xl text-white tracking-widest uppercase flex items-center gap-2">
                                <span className="text-[#E8192C]">».</span> <span className="italic">CONTACT</span>
                            </h3>

                            {/* Dossier Card Container */}
                            <div className="relative transform-gpu -rotate-1 bg-[#1a1410] border-2 border-[#333] p-6 sm:p-8 md:p-10 shadow-[8px_8px_0_rgba(232,25,44,0.15)] group mt-4">

                                {/* Tape / Pins */}
                                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#E8192C]/80 rotate-12 shadow-sm" style={{ clipPath: 'polygon(0 10%, 100% 0, 95% 100%, 5% 90%)' }} />
                                <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-[#E8192C]/80 -rotate-12 shadow-sm" style={{ clipPath: 'polygon(5% 0, 95% 10%, 100% 90%, 0 100%)' }} />

                                {/* CLASSIFIED Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
                                    <span className="font-display text-7xl sm:text-8xl md:text-9xl text-[#E8192C] -rotate-12 tracking-widest whitespace-nowrap">
                                        CLASSIFIED
                                    </span>
                                </div>

                                <div className="relative z-10 space-y-8 md:space-y-10 font-label text-sm md:text-base text-[#f0ece0]/80">

                                    {/* Contact Entries */}
                                    <div className="space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                                            <span className="text-[#E8192C] font-mono tracking-widest w-24">WIRE</span>
                                            <span className="text-[#333] hidden sm:inline">·</span>
                                            <a href="mailto:asset.aikyam@gmail.com" className="hover:text-white transition-colors font-mono tracking-wider">asset.aikyam@gmail.com</a>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                                            <span className="text-[#E8192C] font-mono tracking-widest w-24">AGENT 01</span>
                                            <span className="text-[#333] hidden sm:inline">·</span>
                                            <span className="font-mono tracking-wider text-white">Saumya Singh <span className="text-[#f0ece0]/50 ml-1 sm:ml-2">+91 81027 73833</span></span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                                            <span className="text-[#E8192C] font-mono tracking-widest w-24">AGENT 02</span>
                                            <span className="text-[#333] hidden sm:inline">·</span>
                                            <span className="font-mono tracking-wider text-white">Soubhagya Srivastava <span className="text-[#f0ece0]/50 ml-1 sm:ml-2">+91 89670 10103</span></span>
                                        </div>
                                    </div>

                                    {/* Address Block */}
                                    <div className="border-l-2 border-[#E8192C] pl-4 sm:pl-6 space-y-3 relative">
                                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-[#1a1410] border-2 border-[#E8192C] rounded-full" />
                                        <p className="font-mono text-[#E8192C] text-xs tracking-[0.2em] font-bold">[ LOCATION CONFIRMED ]</p>
                                        <p className="font-mono leading-relaxed tracking-widest uppercase text-[#f0ece0]/90 text-xs sm:text-sm">
                                            AMITY UNIVERSITY PATNA<br />
                                            BAILEY RD, NEAR RUPASPUR THANA<br />
                                            KALIKET NAGAR, PATNA,<br />
                                            BIHAR — 801503
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Divider string between columns on large screens */}
                    <div className="hidden lg:block w-px border-l-2 border-dashed border-[#E8192C] opacity-30 mt-10" />

                    {/* RIGHT PANEL — "The Map" */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 w-full relative flex justify-center mt-8 lg:mt-0"
                    >
                        <div className="w-full max-w-[520px] flex flex-col">
                            {/* Top Surveillance Label */}
                            <div className="flex items-center gap-3 mb-4 pl-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#E8192C] animate-pulse shadow-[0_0_8px_#E8192C]" />
                                <span className="font-mono text-[#E8192C] text-xs tracking-[0.3em] font-bold">[ SURVEILLANCE: ACTIVE ]</span>
                            </div>

                            {/* Map Noir Frame */}
                            <div className="relative w-full h-[350px] md:h-[400px] bg-[#111] p-3 border-4 border-[#1a1a1a] shadow-[10px_10px_0_#000] group">

                                {/* Inner distressed border / iframe container */}
                                <div className="relative w-full h-full border border-[#444] overflow-hidden">

                                    {/* The Map */}
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4651.813641740845!2d85.0520668762238!3d25.61231131476043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed56457e773c5d%3A0x26f4637f762e3747!2sAmity%20University%2C%20Patna!5e1!3m2!1sen!2sin!4v1739893950078!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Amity University Patna Location"
                                        className="absolute inset-0 z-0 transition-all duration-700 filter sepia-[0.4] contrast-[1.2] brightness-[0.7] group-hover:sepia-[0.2] group-hover:contrast-[1.1] group-hover:brightness-[0.9]"
                                    />

                                    {/* Map Overlays (Halftone & Vignette) */}
                                    <div className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-multiply"
                                        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '3px 3px' }}
                                    />
                                    <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />

                                    {/* Red Crosshair SVG */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-80 flex items-center justify-center">
                                        <svg width="60" height="60" viewBox="0 0 100 100" className="text-[#E8192C]">
                                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                            <circle cx="50" cy="50" r="6" fill="currentColor" className="animate-pulse" />
                                            <line x1="50" y1="0" x2="50" y2="35" stroke="currentColor" strokeWidth="2" />
                                            <line x1="50" y1="65" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
                                            <line x1="0" y1="50" x2="35" y2="50" stroke="currentColor" strokeWidth="2" />
                                            <line x1="65" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </div>

                                    {/* Open in Maps CTA Button */}
                                    <a
                                        href="https://maps.google.com/?q=Amity+University+Patna"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-4 right-4 z-30 bg-[#E8192C] text-white font-display text-lg md:text-xl uppercase tracking-widest px-6 py-2 -skew-x-6 border-b-4 border-r-4 border-[#8B0000] hover:translate-y-[2px] hover:translate-x-[2px] hover:border-b-2 hover:border-r-2 transition-all active:translate-y-[4px] active:translate-x-[4px] active:border-0 shadow-lg"
                                    >
                                        OPEN IN MAPS ▸
                                    </a>
                                </div>
                            </div>

                            {/* Bottom Coordinate Strip */}
                            <div className="mt-4 text-right pr-2">
                                <span className="font-mono text-[#f0ece0]/40 text-[10px] md:text-xs tracking-[0.2em]">COORD: 25.5941° N, 85.1376° E</span>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* FOOTER */}
                <div className="relative z-10 w-full mt-auto pt-8 border-t border-[#333]">
                    <p className="text-center font-mono text-[#f0ece0]/30 text-[10px] md:text-xs tracking-[0.3em] uppercase">
                        HackIT © 2026 — All timelines reserved.
                    </p>
                </div>
            </div>

        </div>
    );
}
