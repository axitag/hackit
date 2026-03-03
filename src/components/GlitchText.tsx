"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlitchTextProps {
    children: ReactNode;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    persistent?: boolean;
    animated?: boolean;
}

export default function GlitchText({
    children,
    className = "",
    as: Tag = "span",
    persistent = false,
    animated = false,
}: GlitchTextProps) {
    return (
        <motion.div
            className="relative inline-block"
            whileHover={
                !persistent
                    ? {
                        x: [0, -2, 3, -1, 0],
                        transition: { duration: 0.3, times: [0, 0.2, 0.5, 0.8, 1] },
                    }
                    : undefined
            }
        >
            {/* Cyan ghost */}
            <Tag
                className={`absolute inset-0 ${className}`}
                style={{
                    color: "var(--glitch-cyan)",
                    opacity: persistent ? 0.6 : 0,
                    transform: "translateX(-3px)",
                    zIndex: -1,
                }}
                aria-hidden
            >
                {children}
            </Tag>
            {/* Magenta ghost */}
            <Tag
                className={`absolute inset-0 ${className}`}
                style={{
                    color: "var(--glitch-magenta)",
                    opacity: persistent ? 0.6 : 0,
                    transform: "translateX(3px)",
                    zIndex: -1,
                }}
                aria-hidden
            >
                {children}
            </Tag>
            {/* Main text */}
            <Tag
                className={`relative glitch-text-animated ${className}`}
            >
                {children}
            </Tag>
        </motion.div>
    );
}
