"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";
import TrackModal, { ProblemStatement } from "./TrackModal";

interface Track {
    issue: string;
    title: string;
    tagline: string;
    image: string;
    problemStatements: ProblemStatement[];
}

const tracks: Track[] = [
    {
        issue: "#001",
        title: "AI / ML",
        tagline: "Cold. Calculated. Unstoppable.",
        image: "/images/track-algorithm.png",
        problemStatements: [
            {
                id: "PS3001",
                title: "AI-Powered Document Analysis System",
                description:
                    "As digital documents become increasingly prevalent across industries, ensuring originality, efficient classification, and seamless information retrieval is crucial. Plagiarism detection plays a vital role in maintaining content integrity in academia, business, and legal sectors, while automated document classification enhances organization and regulatory compliance. Additionally, extracting relevant information from extensive text-based PDFs remains a challenge without an intelligent querying system.",
                coreFunctionalities: [
                    {
                        title: "Plagiarism Detection",
                        detail: "Identifying similarities between two documents and calculating the percentage of duplicated content using advanced techniques.",
                    },
                    {
                        title: "Document Classification",
                        detail: "Automatically categorizing PDF documents into three categories i.e financial, healthcare or legal domains using AI-based methodologies.",
                    },
                    {
                        title: "Database Question-Answering (DBQA)",
                        detail: "Enabling users to query text-based PDF documents and retrieve precise information using free inference APIs like GROQ for efficient processing.",
                    },
                ],
                note: "You are free to add innovative and reliable features to your solution, as they will be highly appreciated and preferred.",
                rules: [
                    "Plagiarism is strictly prohibited—any violation will result in team disqualification.",
                    "Free inference APIs can only be used for the DBQA component. You can get Free Groq API.",
                    "Participants are free to use any IDE or work on Google Colaboratory.",
                    "A detailed PDF documentation outlining the approach must be made.",
                    "You are free to use any open-source dataset for training purposes. You can also create your own dataset if necessary.",
                    "A PowerPoint presentation is required, following the official hackathon template available on the event website.",
                ],
            },
            {
                id: "PS3002",
                title: "Intelligent Traffic Management System",
                description:
                    "Urban traffic congestion is a growing challenge worldwide, leading to increased travel times, fuel consumption, and environmental pollution. Traditional traffic management systems rely on fixed signal timers and manual monitoring, which fail to adapt to real-time traffic conditions. An AI-powered traffic management system can optimize traffic flow, reduce congestion, and improve road safety using computer vision and machine learning techniques.",
                coreFunctionalities: [
                    {
                        title: "Real-Time Vehicle Detection & Counting",
                        detail: "Using computer vision to detect, classify, and count vehicles at intersections from live camera feeds or video input.",
                    },
                    {
                        title: "Adaptive Signal Control",
                        detail: "Dynamically adjusting traffic signal timings based on real-time traffic density at each lane of an intersection.",
                    },
                    {
                        title: "Emergency Vehicle Priority",
                        detail: "Detecting emergency vehicles (ambulance, fire truck, police) and automatically providing green corridor access.",
                    },
                ],
                note: "You are free to add innovative and reliable features to your solution, as they will be highly appreciated and preferred.",
                rules: [
                    "Plagiarism is strictly prohibited—any violation will result in team disqualification.",
                    "Participants are free to use any open-source datasets or create synthetic data for testing.",
                    "Participants are free to use any IDE or work on Google Colaboratory.",
                    "A detailed PDF documentation outlining the approach must be made.",
                    "A PowerPoint presentation is required, following the official hackathon template available on the event website.",
                ],
            },
        ],
    },
    {
        issue: "#002",
        title: "EdTech",
        tagline: "Knowledge is the only superpower.",
        image: "/images/track-origin.png",
        problemStatements: [
            {
                id: "PS4001",
                title: "Adaptive Learning Platform",
                description:
                    "Traditional education follows a one-size-fits-all approach, failing to address individual learning paces, styles, and knowledge gaps. An adaptive learning platform can personalize the educational experience by analyzing student performance, identifying weak areas, and dynamically adjusting content difficulty and teaching methodology in real-time.",
                coreFunctionalities: [
                    {
                        title: "Skill Assessment Engine",
                        detail: "Evaluating students through diagnostic quizzes and tracking performance over time to build a comprehensive learner profile.",
                    },
                    {
                        title: "Personalized Content Delivery",
                        detail: "Dynamically curating learning materials, video lectures, and practice exercises tailored to each student's current understanding level.",
                    },
                    {
                        title: "Progress Analytics Dashboard",
                        detail: "Providing teachers and students with detailed insights on learning progress, strengths, and areas needing improvement.",
                    },
                ],
                note: "You are free to add innovative and reliable features to your solution, as they will be highly appreciated and preferred.",
                rules: [
                    "Plagiarism is strictly prohibited—any violation will result in team disqualification.",
                    "Participants are free to use any IDE or development environment.",
                    "A detailed PDF documentation outlining the approach must be made.",
                    "You are free to use any open-source dataset or educational content for training purposes.",
                    "A PowerPoint presentation is required, following the official hackathon template available on the event website.",
                ],
            },
        ],
    },
    {
        issue: "#003",
        title: "Cybersecurity",
        tagline: "In the dark, truth hides.",
        image: "/images/track-shadows.png",
        problemStatements: [
            {
                id: "PS5001",
                title: "Network Intrusion Detection System",
                description:
                    "With the increasing sophistication of cyber attacks, traditional rule-based security systems struggle to identify novel threats and zero-day vulnerabilities. Organizations need intelligent, real-time network monitoring solutions that can detect anomalous behavior, classify attack types, and provide actionable alerts to security teams before breaches escalate.",
                coreFunctionalities: [
                    {
                        title: "Real-Time Traffic Analysis",
                        detail: "Monitoring network packets in real-time to identify suspicious patterns, unusual data flows, and potential attack signatures.",
                    },
                    {
                        title: "Anomaly Detection",
                        detail: "Using machine learning models to establish baseline network behavior and flag deviations that may indicate intrusion attempts.",
                    },
                    {
                        title: "Attack Classification & Alerting",
                        detail: "Categorizing detected threats (DDoS, phishing, malware, brute force) and generating prioritized alerts with recommended response actions.",
                    },
                ],
                note: "You are free to add innovative and reliable features to your solution, as they will be highly appreciated and preferred.",
                rules: [
                    "Plagiarism is strictly prohibited—any violation will result in team disqualification.",
                    "All testing must be performed on authorized datasets and simulated environments only.",
                    "Participants are free to use any IDE or development environment.",
                    "A detailed PDF documentation outlining the approach must be made.",
                    "A PowerPoint presentation is required, following the official hackathon template available on the event website.",
                ],
            },
            {
                id: "PS5002",
                title: "Secure File Sharing Platform",
                description:
                    "In an era of increasing data breaches and privacy concerns, secure file sharing has become a critical need for organizations and individuals. Traditional file sharing methods often lack end-to-end encryption, access controls, and audit trails, making sensitive data vulnerable to interception and unauthorized access.",
                coreFunctionalities: [
                    {
                        title: "End-to-End Encryption",
                        detail: "Implementing robust encryption for files both at rest and in transit, ensuring only authorized recipients can decrypt and access shared content.",
                    },
                    {
                        title: "Granular Access Control",
                        detail: "Providing role-based permissions, time-limited sharing links, and the ability to revoke access to shared files at any time.",
                    },
                    {
                        title: "Audit Trail & Activity Logging",
                        detail: "Maintaining comprehensive logs of file access, downloads, and sharing activities for compliance and security monitoring.",
                    },
                ],
                note: "You are free to add innovative and reliable features to your solution, as they will be highly appreciated and preferred.",
                rules: [
                    "Plagiarism is strictly prohibited—any violation will result in team disqualification.",
                    "Participants are free to use any IDE or development environment.",
                    "A detailed PDF documentation outlining the approach must be made.",
                    "A PowerPoint presentation is required, following the official hackathon template available on the event website.",
                ],
            },
        ],
    },
    {
        issue: "#004",
        title: "Open Innovation",
        tagline: "No rules. No limits. No mercy.",
        image: "/images/track-dimension.png",
        problemStatements: [
            {
                id: "PS6001",
                title: "Open Innovation Challenge",
                description:
                    "This is an open-ended track where participants are free to identify a real-world problem of their choice and build an innovative technology solution. The solution can span any domain — healthcare, agriculture, finance, sustainability, social impact, accessibility, or any other area where technology can create meaningful change. The focus is on creativity, feasibility, and the potential impact of the solution.",
                coreFunctionalities: [
                    {
                        title: "Problem Identification",
                        detail: "Clearly defining a real-world problem that the proposed solution addresses, with supporting evidence of its significance and impact.",
                    },
                    {
                        title: "Innovative Solution Design",
                        detail: "Building a functional prototype or proof-of-concept that demonstrates the core idea using relevant technologies and approaches.",
                    },
                    {
                        title: "Impact Assessment",
                        detail: "Presenting the potential social, economic, or environmental impact of the solution with clear metrics and scalability considerations.",
                    },
                ],
                note: "You are free to choose any domain and technology stack. Creativity and real-world applicability will be key judging criteria.",
                rules: [
                    "Plagiarism is strictly prohibited—any violation will result in team disqualification.",
                    "Participants are free to use any IDE or development environment.",
                    "A detailed PDF documentation outlining the approach must be made.",
                    "A PowerPoint presentation is required, following the official hackathon template available on the event website.",
                ],
            },
        ],
    },
];

export default function Tracks() {
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

    return (
        <section id="tracks" className="snap-section relative px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/bg_tracks.png"
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
                    CHOOSE YOUR TIMELINE
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
                                    VIEW PROBLEM STATEMENTS →
                                </p>
                            </div>

                            {/* Bottom border accent */}
                            <div className="h-1 bg-[var(--accent)] w-full" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Track Problem Statement Modal */}
            <TrackModal
                isOpen={!!selectedTrack}
                onClose={() => setSelectedTrack(null)}
                trackTitle={selectedTrack?.title ?? ""}
                problemStatements={selectedTrack?.problemStatements ?? []}
            />
        </section>
    );
}
