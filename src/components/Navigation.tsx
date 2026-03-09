"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="fixed top-6 left-6 z-[100]">
            <div className="relative">
                <button
                    className="text-white p-2 hover:bg-white/10 rounded transition-colors group"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[var(--accent)] transition-colors">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute left-0 top-full mt-2 bg-black/90 border border-white/20 min-w-[150px] backdrop-blur-sm comic-border p-2">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 text-white hover:bg-[var(--accent)] hover:text-white font-display tracking-wider transition-colors border-b border-white/10"
                        >
                            HOME
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 text-white hover:bg-[var(--accent)] hover:text-white font-display tracking-wider transition-colors border-b border-white/10"
                        >
                            ABOUT
                        </Link>
                        <Link
                            href="/teams"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 text-white hover:bg-[var(--accent)] hover:text-white font-display tracking-wider transition-colors"
                        >
                            TEAM
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
