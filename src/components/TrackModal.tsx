"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export interface ProblemStatement {
    id: string;
    title: string;
    description: string;
    coreFunctionalities: {
        title: string;
        detail: string;
    }[];
    note?: string;
    rules: string[];
}

interface TrackModalProps {
    isOpen: boolean;
    onClose: () => void;
    trackTitle: string;
    problemStatements: ProblemStatement[];
}

export default function TrackModal({ isOpen, onClose, trackTitle, problemStatements }: TrackModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal container */}
                    <motion.div
                        className="relative w-full max-h-[85vh] overflow-y-auto comic-border bg-[var(--bg)]"
                        style={{
                            maxWidth: problemStatements.length > 1 ? "80rem" : "48rem",
                            scrollbarWidth: "thin",
                            scrollbarColor: "var(--accent) var(--surface)",
                        }}
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ duration: 0.3, ease: [0.22, 0.03, 0.26, 1] }}
                    >
                        {/* Top accent bar */}
                        <div className="h-1 bg-[var(--accent)] w-full" />

                        {/* Header */}
                        <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/10">
                            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-white/85 tracking-wider">
                                {trackTitle}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-white/60 hover:text-white transition-colors font-display text-2xl md:text-3xl leading-none p-2"
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Problem Statements — side by side if multiple */}
                        <div
                            className={`grid gap-6 p-5 md:p-6 ${problemStatements.length > 1
                                ? "grid-cols-1 md:grid-cols-2"
                                : "grid-cols-1"
                                }`}
                        >
                            {problemStatements.map((ps) => (
                                <div
                                    key={ps.id}
                                    className="comic-border bg-[var(--surface)] p-5 md:p-6 flex flex-col"
                                >
                                    {/* PS Title */}
                                    <h3 className="font-display text-lg md:text-xl text-white/80 mb-3 tracking-wide">
                                        {ps.title}
                                    </h3>

                                    {/* PS ID */}
                                    <p className="font-label text-sm text-[var(--accent)]/70 tracking-widest mb-4">
                                        Problem Statement ID: {ps.id}
                                    </p>

                                    {/* Description */}
                                    <p className="font-body text-sm md:text-base text-white/55 leading-relaxed mb-5">
                                        {ps.description}
                                    </p>

                                    {/* Core Functionalities */}
                                    {ps.coreFunctionalities.length > 0 && (
                                        <div className="mb-5">
                                            <h4 className="font-display text-base text-white/70 mb-3 tracking-wide">
                                                Core Functionalities:
                                            </h4>
                                            <ul className="space-y-3">
                                                {ps.coreFunctionalities.map((func, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="font-body text-sm md:text-base text-white/50 leading-relaxed"
                                                    >
                                                        <span className="text-[var(--accent)]/70 font-display">
                                                            • {func.title}:
                                                        </span>{" "}
                                                        {func.detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Note */}
                                    {ps.note && (
                                        <div className="border border-white/10 bg-white/[0.03] p-4 mb-5 rounded-sm">
                                            <p className="font-body text-sm text-[var(--accent)]/60 leading-relaxed">
                                                <span className="font-display">Note:</span> {ps.note}
                                            </p>
                                        </div>
                                    )}

                                    {/* Rules & Guidelines */}
                                    {ps.rules.length > 0 && (
                                        <div className="mt-auto">
                                            <h4 className="font-display text-base text-white/70 mb-3 tracking-wide">
                                                Rules &amp; Guidelines
                                            </h4>
                                            <ul className="space-y-2">
                                                {ps.rules.map((rule, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 font-body text-sm text-white/50 leading-relaxed"
                                                    >
                                                        <span className="text-[var(--accent)]/50 mt-1 text-xs">●</span>
                                                        {rule}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Bottom accent bar */}
                        <div className="h-1 bg-[var(--accent)] w-full" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
