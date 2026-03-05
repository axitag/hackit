"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "./GlitchText";
import Link from "next/link";

const faqs = [
    {
        question: "What is HACKIT 26?",
        answer: "HACKIT 26 is a groundbreaking hackathon at Amity University Patna, bringing together tech enthusiasts to innovate and solve real-world challenges in Web and App Development, AI/ML, Cybersecurity, IoT, and more.",
    },
    {
        question: "Who can participate in HACKIT 26?",
        answer: "HACKIT 26 is open to students and tech enthusiasts from all backgrounds. Anyone passionate about coding and problem-solving can participate.",
    },
    {
        question: "Where and when will HACKIT 26 take place?",
        answer: "HACKIT 26 will be held at AMITY UNIVERSITY PATNA, Bihar. 2 Days Hackathon. 27th-28th March 2026.",
    },
    {
        question: "Is there a registration fee?",
        answer: "Yes, registration for HACKIT 26 is not free. There is a registration fee of ₹500 per team. Selected teams must confirm their participation before the event.",
    },
    {
        question: "Can I participate alone or do I need a team?",
        answer: "HACKIT 26 is a team-based hackathon. Teams can have 2-4 members.",
    },
    {
        question: "How can I contact the organizers?",
        answer: (
            <>
                You can contact us at{" "}
                <Link
                    href="mailto:asset.aikyam@gmail.com"
                    className="text-white hover:text-white underline transition-colors"
                    target="_blank"
                >
                    asset.aikyam@gmail.com
                </Link>
                {" "}or via phone.
            </>
        ),
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="snap-section px-6 md:px-12 lg:px-16">
            <div className="text-center mb-6 md:mb-16">
                <GlitchText
                    as="h2"
                    className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                >
                    TRANSMISSIONS
                </GlitchText>
            </div>

            <div className="space-y-4" style={{ maxWidth: '48rem', margin: '0 auto', width: '100%' }}>
                {faqs.map((faq, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                        {/* Question bubble */}
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full text-left speech-bubble hover:border-[var(--accent)] transition-colors duration-300 group"
                            style={{
                                borderRadius: "16px 16px 16px 4px",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-display text-2xl text-[var(--accent)] wobble-hover flex-shrink-0">
                                    ?
                                </span>
                                <span className="font-display text-lg md:text-xl text-white">
                                    {faq.question}
                                </span>
                                <motion.span
                                    className="ml-auto text-[var(--accent)] font-display text-xl flex-shrink-0"
                                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    +
                                </motion.span>
                            </div>
                        </button>

                        {/* Answer bubble */}
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div
                                        className="thought-bubble ml-8"
                                        style={{
                                            borderRadius: "4px 16px 16px 16px",
                                        }}
                                    >
                                        <p className="font-body text-sm md:text-base text-white/70 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
