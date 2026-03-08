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
        <div className="snap-section-auto relative w-full overflow-hidden">
            {/* ===== STILL THINKING SECTION ===== */}
            {/* <motion.div
                className="relative w-full bg-[var(--bg)] border-b border-white/10 px-6 md:px-12 lg:px-16 py-8 md:py-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 md:gap-4">
                        <h3 className="font-label text-lg md:text-2xl text-white whitespace-nowrap">
                            Still Thinking <span className="text-[var(--accent)]">???</span>
                        </h3>
                        <h3 className="font-display text-xl md:text-3xl text-[var(--accent)] tracking-wider whitespace-nowrap">
                            Show Your Skills
                        </h3>
                    </div>
                    <div className="flex items-center gap-3">
                        {contactSocials.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                className="text-white/50 hover:text-[var(--accent)] transition-colors duration-300"
                                aria-label={social.name}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div> */}

            {/* ===== REGISTER CTA SECTION ===== */}
            <section
                id="register"
                className="relative w-full flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24"
            >
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/footer_bg.png"
                        alt="Register section background"
                        fill
                        className="object-contain opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/80 via-transparent to-[var(--bg)]/80" />
                    {/* Dark vignette overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
                        }}
                    />
                </div>

                <div className="relative z-10 text-center flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
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
                            className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-wider leading-tight"
                        >
                            JOIN THE HACKIT
                        </GlitchText>
                    </motion.div>

                    {/* Subtext */}
                    <motion.p
                        className="mt-4 md:mt-6 font-body text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                    >
                        48 hours. 4 tracks. Unlimited possibilities. Register now and be part of the premier hackathon at Amity University Patna.
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        className="mt-8 md:mt-12 flex items-center justify-center gap-8 md:gap-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <span className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--accent)] block">
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
                        className="mt-8 md:mt-10 mx-auto w-24 h-[2px] bg-[var(--accent)] opacity-40"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    />

                    {/* Register button */}
                    <motion.div
                        className="mt-8 md:mt-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <button
                            className="relative font-display text-xl sm:text-2xl md:text-3xl bg-[var(--accent)] text-white px-10 py-4 sm:px-14 sm:py-5 md:px-16 md:py-6 tracking-wider pulse-glow ink-splat transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(232,0,61,0.4)] active:scale-95"
                            style={{
                                clipPath: "polygon(1% 0%, 99% 3%, 100% 97%, 2% 100%)",
                            }}
                        >
                            REGISTER NOW
                        </button>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        className="mt-10 md:mt-14 flex flex-col items-center gap-4"
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
                                    className="comic-border bg-[var(--surface)] w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-base md:text-lg text-white/60 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== CONTACT INFO SECTION ===== */}
            <div className="relative w-full bg-[var(--bg)] border-t border-white/10 px-6 md:px-12 lg:px-16 py-12 md:py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    {/* Left — Quick Links */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h4 className="font-label text-sm text-[var(--accent)] tracking-widest mb-4">
                            <span className="text-[var(--accent)] mr-1">.</span> Quick Links
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="font-label text-xs px-3 py-1.5 border border-white/20 text-white/60 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div> */}

                    {/* Right — Contact */}
                    <motion.div
                        className="md:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        {/* <h4 className="font-label text-sm text-[var(--accent)] tracking-widest mb-4">
                            <span className="text-[var(--accent)] mr-1">.</span> Contact
                        </h4> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* <div className="space-y-2">
                                <a
                                    href="mailto:asset.aikyam@gmail.com"
                                    className="font-label text-xs text-white/60 hover:text-[var(--accent)] transition-colors block"
                                >
                                    asset.aikyam@gmail.com
                                </a>
                                <p className="font-label text-xs text-white/60">
                                    <span className="text-white/80">Saumya Singh</span> : +919122T19833
                                </p>
                                <p className="font-label text-xs text-white/60">
                                    <span className="text-white/80">Soubhagya Brivastava</span> : +919561010103
                                </p>
                                <p className="font-label text-[10px] md:text-xs text-[var(--accent)] leading-relaxed uppercase mt-4">
                                    AMITY UNIVERSITY PATNA, Bailey Rd, near Rupaspur Thana, Kaliket Nagar, Patna, Bihar, 801503
                                </p>
                            </div> */}
                            {/* Google Maps Embed */}
                            {/* <div className="relative w-full h-[160px] md:h-[180px] border border-white/10 overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.963!2d85.0759!3d25.6128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce!2sAmity+University+Patna!5e0!3m2!1sen!2sin!4v1"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Amity University Patna Location"
                                />
                                <a
                                    href="https://maps.google.com/?q=Amity+University+Patna"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute top-2 left-2 font-label text-[10px] bg-[var(--bg)]/80 text-[var(--accent)] px-2 py-1 border border-[var(--accent)]/30 hover:border-[var(--accent)] transition-colors"
                                >
                                    Open in Maps ↗
                                </a>
                            </div> */}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
