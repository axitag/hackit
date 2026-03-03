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

const stutterVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.85 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            delay,
            ease: [0.22, 0.03, 0.26, 1],
            opacity: { duration: 0.5, delay, steps: 5 },
            y: { duration: 0.5, delay, steps: 5 },
            scale: { duration: 0.4, delay: delay + 0.1, steps: 4 },
        },
    }),
};

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
            variants={stutterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={delay}
        >
            {children}
        </motion.div>
    );
}
