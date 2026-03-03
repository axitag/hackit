"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ComicPanelProps {
    children: ReactNode;
    className?: string;
    rotate?: number;
    delay?: number;
    borderColor?: "white" | "red";
}

export default function ComicPanel({
    children,
    className = "",
    rotate = 0,
    delay = 0,
    borderColor = "white",
}: ComicPanelProps) {
    return (
        <motion.div
            className={`${borderColor === "red" ? "comic-border-red" : "comic-border"} bg-[var(--surface)] overflow-hidden ${className}`}
            style={{ rotate: `${rotate}deg` }}
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.5,
                delay,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
}

