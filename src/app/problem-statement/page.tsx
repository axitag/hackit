"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import GlitchText from "@/components/GlitchText";
import RegisterCTA from "@/components/RegisterCTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface ProblemStatement {
    id: string;
    title: string;
    description: string;
    coreFunctionalities: string[];
    note?: string;
}

interface Track {
    issue: string;
    title: string;
    tagline: string;
    image: string;
    problemStatements: ProblemStatement[];
}

const psExample: ProblemStatement = {
    id: "PS1001",
    title: "MentorConnect: Student-Alumni Mentorship Platform",
    description: "Strong mentorship connections between students and alumni play a crucial role in career growth, skill development, and academic guidance. However, traditional mentorship programs often lack structured engagement, effective communication tools, and goal-tracking mechanisms. To bridge this gap, a well-designed web platform is needed to facilitate meaningful and productive mentorship experiences. This project aims to develop MentorConnect, a fully functional web-based platform that connects students with alumni mentors based on shared interests, academic backgrounds, career aspirations, and skills. The platform will provide essential tools to enhance mentorship interactions and ensure long-term engagement.",
    coreFunctionalities: [
        "Mentor-Student Matching: A structured system for students to find and connect with suitable mentors based on academic and career interests.",
        "Interactive Communication Tools: Built-in messaging and discussion forums for seamless mentor-student interaction.",
        "Goal-Setting & Progress Tracking: A system to define mentorship objectives, track milestones, and measure progress over time."
    ],
    note: "You are free to add innovative and reliable features to your solution, as they will be highly appreciated and preferred."
};

const psAiMl2: ProblemStatement = {
    id: "PS1002",
    title: "AI-Powered Deepfake Detection System",
    description: "With the rapid advancement of generative AI, the creation of hyper-realistic digital content (deepfakes) has become increasingly common. This poses a significant threat to information integrity, identity security, and public trust. The objective of this project is to develop an AI/ML-based solution capable of accurately identifying and flagging AI-generated or manipulated media (images, audio, or video) in real-time.",
    coreFunctionalities: [
        "Reliable Authentication: A robust detection model that can distinguish between authentic media and deepfakes.",
        "Real-Time Analysis: The system should be able to process and analyze media streams or uploaded files quickly.",
        "Explainable Results: Provide visual or text-based indicators explaining why a particular piece of media was flagged as manipulated."
    ],
    note: "High accuracy and low false-positive rates are critical. Innovative approaches to handling unseen generative models will be rewarded."
};

const tracks: Track[] = [
    {
        issue: "#001",
        title: "AI / ML",
        tagline: "Cold. Calculated. Unstoppable.",
        image: "/images/track-algorithm.png",
        problemStatements: [psExample, psAiMl2]
    },
    {
        issue: "#002",
        title: "EdTech",
        tagline: "Knowledge is the only superpower.",
        image: "/images/track-origin.png",
        problemStatements: [psExample]
    },
    {
        issue: "#003",
        title: "Cybersecurity",
        tagline: "In the dark, truth hides.",
        image: "/images/track-shadows.png",
        problemStatements: [psExample]
    },
    {
        issue: "#004",
        title: "Open Innovation",
        tagline: "No rules. No limits. No mercy.",
        image: "/images/track-dimension.png",
        problemStatements: [psExample]
    },
];

export default function Tracks() {
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
    const [expandedPS, setExpandedPS] = useState<string | null>(null);

    const rules = [
        "Plagiarism is strictly prohibited—any violation will result in team disqualification.",
        "Participants can use any web development framework or technology stack of their choice.",
        "The system must ensure secure user authentication and data privacy for both students and mentors.",
        "Any APIs can be used wherever needed to enhance functionality.",
        "A detailed PDF documentation outlining the project approach must be made.",
        "A PowerPoint presentation is required, following the official hackathon template available on the event website."
    ];

    return (
        <main className="snap-container bg-[#0a0a0a] font-body text-[#f0ece0]">
            <Navigation />

            <section id="tracks" className="snap-section relative px-6 md:px-12 lg:px-16 flex-col gap-10 overflow-hidden flex flex-col justify-center min-h-[100dvh]">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/bg_track_2.png"
                        alt="Tracks section background"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
                </div>

                <div className="relative z-10 text-center mb-6 md:mb-16">
                    <GlitchText
                        as="h2"
                        className="font-display text-3xl sm:text-5xl md:text-7xl text-white tracking-wider"
                    >
                        PICK YOUR CASE FILE
                    </GlitchText>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" style={{ maxWidth: '80rem', margin: '0 auto', width: '100%' }}>
                    {tracks.map((track, i) => (
                        <motion.div
                            key={track.issue}
                            className="group relative"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 0.03, 0.26, 1] }}
                            style={{ perspective: "800px" }}
                            onClick={() => setSelectedTrack(track)}
                        >
                            <motion.div
                                className="relative comic-border bg-[var(--surface)] overflow-hidden cursor-pointer"
                                whileHover={{
                                    scale: 1.05,
                                    rotateX: 5,
                                    rotateY: -5,
                                    transition: { duration: 0.3 },
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Issue number badge */}
                                <div className="absolute top-3 right-3 z-10 bg-[var(--accent)] text-white font-display text-xs px-3 py-1 tracking-wider"
                                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)" }}
                                >
                                    {track.issue}
                                </div>

                                {/* Image */}
                                <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                                    <Image
                                        src={track.image}
                                        alt={`${track.title} track`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-5 md:p-6">
                                    <h3 className="font-display text-2xl md:text-3xl text-white mt-2 mb-2 glitch-hover">
                                        {track.title}
                                    </h3>
                                    <p className="font-body text-sm text-white/60 italic">
                                        &ldquo;{track.tagline}&rdquo;
                                    </p>
                                    {/* Click hint */}
                                    <p className="font-label text-xs text-[var(--accent)] tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        VIEW PROBLEM STATEMENTS
                                    </p>
                                </div>

                                {/* Bottom border accent */}
                                <div className="h-1 bg-[var(--accent)] w-full" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Overlay */}
                <AnimatePresence>
                    {selectedTrack && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex flex-col items-center p-4 md:p-8 backdrop-blur-md bg-black/60 overflow-y-auto"
                            onClick={() => setSelectedTrack(null)}
                        >
                            <div className="flex flex-col items-center w-full max-w-7xl my-auto py-8">
                                {/* Track Title Outside the Box */}
                                <div className="mb-6 md:mb-8 shrink-0">
                                    <GlitchText as="h2" className="text-4xl md:text-6xl font-display text-white uppercase tracking-wider text-center">
                                        {selectedTrack.title}
                                    </GlitchText>
                                </div>

                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-[#111] border border-white/10 w-[95vw] max-w-7xl comic-border relative flex flex-col shrink-0 mb-8"
                                >
                                    <button
                                        onClick={() => setSelectedTrack(null)}
                                        className="absolute top-4 right-4 text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors z-10"
                                    >
                                        <X size={24} />
                                    </button>

                                    <div className="p-6 md:p-10 space-y-10">

                                        {/* Rules & Guidelines */}
                                        <div className="bg-black/30 border border-white/5 rounded-2xl p-6 md:p-8">
                                            <h3 className="text-xl md:text-2xl font-display text-white mb-6 flex items-center tracking-wide">
                                                <span className="bg-(--accent) w-2 h-6 md:h-8 mr-4 inline-block"></span>
                                                Rules & Guidelines
                                            </h3>
                                            <ul className="space-y-4">
                                                {rules.map((rule, idx) => (
                                                    <li key={idx} className="flex text-white/80 font-body text-base md:text-lg leading-relaxed">
                                                        <span className="text-(--accent) mr-3 md:mr-4 font-bold md:text-xl mt-[-2px]">▸</span>
                                                        <span className="flex-1 tracking-widest">{rule}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Problem Statements Accordion */}
                                        <div className="space-y-6">
                                            {selectedTrack.problemStatements.map((ps) => (
                                                <div key={ps.id} className="border border-white/10 bg-black/20 rounded-xl overflow-hidden transition-colors hover:border-white/20">
                                                    <button
                                                        onClick={() => setExpandedPS(expandedPS === ps.id ? null : ps.id)}
                                                        className="w-full text-left p-6 md:p-8 flex justify-between items-center group focus:outline-none"
                                                    >
                                                        <span className="font-display text-xl md:text-2xl text-white group-hover:text-[var(--accent)] transition-colors tracking-wide">
                                                            Problem Statement ID: {ps.id}
                                                        </span>
                                                        {expandedPS === ps.id ? (
                                                            <ChevronUp className="text-white/60 group-hover:text-white transition-colors shrink-0 ml-4" size={28} />
                                                        ) : (
                                                            <ChevronDown className="text-white/60 group-hover:text-white transition-colors shrink-0 ml-4" size={28} />
                                                        )}
                                                    </button>

                                                    <AnimatePresence>
                                                        {expandedPS === ps.id && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="p-6 pt-0 md:p-8 md:pt-0 border-t border-white/5 space-y-8 mt-2">
                                                                    <div>
                                                                        <h4 className="text-2xl md:text-3xl font-body text-[var(--accent)] font-bold mb-4 tracking-wide">
                                                                            {ps.title}
                                                                        </h4>
                                                                        {/* <div className="inline-block bg-white/10 px-4 py-2 rounded text-sm md:text-base text-white/70 font-label tracking-widest mb-6">
                                                                            Problem Statement ID: {ps.id}
                                                                        </div> */}
                                                                        <p className="text-white/80 font-body text-base md:text-xl leading-loose whitespace-pre-line tracking-wide">
                                                                            {ps.description}
                                                                        </p>
                                                                    </div>

                                                                    {ps.coreFunctionalities.length > 0 && (
                                                                        <div>
                                                                            <h5 className="text-white font-bold font-body text-xl md:text-2xl mb-4 tracking-wide">Core Functionalities:</h5>
                                                                            <ul className="space-y-4">
                                                                                {ps.coreFunctionalities.map((func, idx) => (
                                                                                    <li key={idx} className="flex text-white/80 font-body text-base md:text-xl leading-relaxed">
                                                                                        <span className="text-[var(--accent)] mr-3 md:mr-4 font-bold md:text-2xl mt-[-4px]">▸</span>
                                                                                        <span className="flex-1 tracking-wide">{func}</span>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    )}

                                                                    {ps.note && (
                                                                        <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-xl mt-6">
                                                                            <p className="text-white/70 font-body text-base md:text-lg italic tracking-wide leading-relaxed">
                                                                                <span className="text-[var(--accent)] font-bold mr-2">Note:</span>
                                                                                {ps.note}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </section>

            {/* Register CTA Section renders itself as a snap-section-auto, so no wrapper needed if we just pop it here */}
            <RegisterCTA />
            <Footer />
        </main>
    );
}
