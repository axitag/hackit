"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "./GlitchText";

const faqs = [
    {
        q: "Who can participate?",
        a: "Anyone. Any skill level. Any timeline. If you can dream it, you belong here.",
    },
    {
        q: "Is it free?",
        a: "Yes. Always. No entry fee across any dimension.",
    },
    {
        q: "Do I need a team?",
        a: "Solo or squads up to 4. Lone wolves and packs both welcome.",
    },
    {
        q: "What do I need to bring?",
        a: "Laptop, ideas, and a will to hack. Everything else is provided.",
    },
    {
        q: "Will there be food?",
        a: "Fuel provided. Timelines permitting. We keep hackers fed and caffeinated.",
    },
    {
        q: "How are projects judged?",
        a: "Innovation, impact, execution. In that order. Blow our minds.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="relative py-24 md:py-32 px-4 md:px-8">
            <div className="text-center mb-16 md:mb-20">
                <GlitchText
                    as="h2"
                    className="font-display text-5xl md:text-7xl text-white tracking-wider"
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
                                    {faq.q}
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
                                            {faq.a}
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
