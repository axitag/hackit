"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Team", href: "/team" },
        { label: "Problem Statement", href: "/problem-statement" },
        { label: "Refund Policy", href: "/refund-policy" },
    ];

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* Hamburger Button */}
            <div className="fixed top-6 left-6 z-[100]">
                <button
                    className="text-white p-2 hover:bg-white/10 rounded transition-colors group"
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[var(--accent)] transition-colors">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Full Screen Overlay Modal */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#0a0a0a] z-[110] flex flex-col overflow-hidden"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 pointer-events-none z-0 transform-gpu h-[120%]">
                            <Image
                                src="/images/ham_bg.png"
                                alt="Menu Background"
                                fill
                                className="object-cover opacity-40"
                            />
                        </div>

                        {/* Top Bar */}
                        <div className="relative z-10 p-6 sm:p-8 flex justify-between items-start">
                            {/* Logo */}
                            <div className="w-full sm:w-20 sm:h-20 relative">
                                <Image
                                    src="/images/hackit_logo_2.png"
                                    alt="Logo"
                                    width={300}
                                    height={300}
                                    className="object-contain"
                                />
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
                                aria-label="Close menu"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:scale-110 transition-transform">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Centered Content */}
                        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-20 overflow-y-auto">
                            <h2 className="text-white font-display text-xl sm:text-2xl tracking-[0.3em] mb-12 sm:mb-16 uppercase">
                                MENU
                            </h2>

                            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {navLinks.map((link, idx) => {
                                    const isActive = pathname === link.href;

                                    return (
                                        <Link
                                            key={idx}
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`group relative flex items-center justify-between p-5 sm:p-6 border transition-all duration-300 block w-full
                                                ${isActive ? 'border-white bg-white' : 'border-white/20 bg-transparent hover:bg-white hover:border-white'}
                                            `}
                                        >
                                            <span className={`font-mono text-base sm:text-lg tracking-wider ${isActive ? 'text-black font-bold' : 'text-white group-hover:text-black group-hover:font-bold'}`}>
                                                {link.label}
                                            </span>
                                            <svg
                                                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className={`transition-colors ${isActive ? 'text-black' : 'text-white group-hover:text-black'}`}
                                            >
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
