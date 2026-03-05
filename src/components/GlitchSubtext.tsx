"use client";

import { motion } from "framer-motion";

interface GlitchSubtextProps {
    text: string;
    className?: string;
}

export default function GlitchSubtext({ text, className = "" }: GlitchSubtextProps) {
    return (
        <motion.div
            className={`relative inline-block ${className}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {/* Cyan ghost */}
            <span
                className="absolute inset-0 whitespace-nowrap"
                style={{
                    color: "var(--glitch-cyan)",
                    opacity: 0.6,
                    transform: "translateX(-3px)",
                    zIndex: -1,
                }}
                aria-hidden
            >
                {text}
            </span>
            {/* Magenta ghost */}
            <span
                className="absolute inset-0 whitespace-nowrap"
                style={{
                    color: "var(--glitch-magenta)",
                    opacity: 0.6,
                    transform: "translateX(3px)",
                    zIndex: -1,
                }}
                aria-hidden
            >
                {text}
            </span>
            {/* Main text */}
            <span className="relative glitch-text-animated whitespace-nowrap">
                {text}
            </span>
        </motion.div>
    );
}
