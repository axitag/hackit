"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RegisterCTA from "@/components/RegisterCTA";

export default function RefundPolicy() {
    return (
        <main className="snap-container min-h-screen relative bg-[#0a0a0a] text-[#f0ece0] font-body flex flex-col w-full selection:bg-[#E8192C] selection:text-white">

            {/* Global Navbar */}
            <Navigation />

            {/* Background Image with Dark Overlay */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/refund/refund_policy.png"
                    alt="Refund Policy Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/75" />
            </div>

            {/* Grain/Noise Overlay */}
            <div className="fixed inset-0 z-0 pointer-events-none mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.2\'/%3E%3C/svg%3E")' }} />

            {/* Content Container */}
            <section className="snap-section min-h-[100dvh] relative z-10 w-full pt-32 pb-24 px-6 md:px-12 flex-grow flex flex-col items-center">

                {/* Page Title */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full text-center mb-16 relative"
                >
                    <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-white tracking-widest drop-shadow-[2px_2px_0_#111]">
                        NO REFUND POLICY
                    </h1>
                    {/* Red Glitch/Splat Line Underneath */}
                    <div className="mt-4 flex justify-center w-full relative">
                        <div className="h-[4px] w-48 bg-[#E8192C] relative z-10" />
                        <div className="h-[2px] w-64 bg-[#E8192C]/50 absolute top-[1px] translate-x-4 mix-blend-screen" />
                        <div className="h-[2px] w-32 bg-[#E8192C]/80 absolute bottom-[-4px] -translate-x-8" />
                    </div>
                </motion.header>

                {/* Document Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-[860px] bg-[#0a0a0a]/85 backdrop-blur-sm border border-white/5 border-l-2 border-l-[#E8192C]/50 p-12 md:p-24 lg:p-32 shadow-2xl relative"
                >
                    {/* Subtle Corner Accents */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#E8192C]/30" />

                    {/* Introductory Text */}
                    <p className="text-white/80 text-base md:text-[16px] leading-[1.8] mb-12 italic">
                        Thank you for registering for HACKIT 2025. Please read our No Refund Policy carefully before completing your registration.
                    </p>

                    <div className="space-y-20">
                        {/* Section 1 */}
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">1.</span> No Refunds After Registration
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8]">
                                Once a participant or team has successfully registered for HACKIT 2025, the registration fee is non-refundable and non-transferable under any circumstances.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">2.</span> Event Cancellation or Modification
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8] mb-4">
                                In the unlikely event that HACKIT 2025 is postponed, rescheduled, or modified due to unforeseen circumstances (such as natural disasters, emergencies, or other unavoidable situations), the registration will remain valid for the rescheduled date.
                            </p>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8]">
                                No refunds will be provided in case of cancellation, rescheduling, or changes to the event format.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">3.</span> Registration Confirmation
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8]">
                                Registration is only confirmed upon successful payment of the registration fee. Incomplete registrations or pending payments will not secure your spot in the hackathon.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">4.</span> Team Changes
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8]">
                                Team composition changes are not permitted after registration closure. The registration fee cannot be transferred to different team members or other teams.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">5.</span> Participation Requirements
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8] mb-4">
                                Participants must adhere to all hackathon rules and guidelines.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-white/80 text-base md:text-[16px] leading-[1.8]">
                                    <span className="text-[#E8192C] mt-1 shrink-0">►</span>
                                    <span>Failure to comply with the rules may result in disqualification without refund.</span>
                                </li>
                                <li className="flex gap-3 text-white/80 text-base md:text-[16px] leading-[1.8]">
                                    <span className="text-[#E8192C] mt-1 shrink-0">►</span>
                                    <span>All team members must be present during the event as per the schedule.</span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">6.</span> Technical Issues
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8]">
                                HACKIT 2025 is not responsible for any technical issues participants may face during the event. No refunds will be provided for connectivity or hardware-related problems.
                            </p>
                        </section>
                    </div>

                    {/* Classifier Dossier / Contact Block */}
                    <div className="mt-16 bg-[#111] border-2 border-[#222] p-6 md:p-8 relative">
                        {/* Grunge Stamp */}
                        <div className="absolute top-0 right-4 -translate-y-1/2 rotate-12 bg-[#0a0a0a] border-2 border-[#E8192C] px-3 py-1 z-10">
                            <span className="font-display text-[#E8192C] text-lg uppercase tracking-widest mix-blend-screen opacity-90">
                                CONTACT
                            </span>
                        </div>

                        <h3 className="font-display text-white text-xl tracking-widest uppercase mb-6 drop-shadow-[1px_1px_0_#111]">
                            Contact Information
                        </h3>

                        <p className="text-white/70 text-sm md:text-base font-label mb-4 uppercase tracking-wider">
                            <span className="text-xl inline-block mr-2">📩</span> For queries, contact:
                        </p>

                        <div className="space-y-3 font-mono text-[#E8192C] text-sm md:text-base selection:bg-white selection:text-[#E8192C]">
                            <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                <span className="text-white/50 w-44 uppercase tracking-widest">Saumya Singh:</span>
                                <span>+91 81027 73833</span>
                            </p>
                            <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                <span className="text-white/50 w-44 uppercase tracking-widest">Soubhagya Srivastava:</span>
                                <span>+91 89670 10103</span>
                            </p>
                            <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-4 pt-4 border-t border-white/10">
                                <span className="text-white/50 w-44 uppercase tracking-widest">Email:</span>
                                <a href="mailto:asset.aikyam@gmail.com" className="hover:text-white transition-colors underline decoration-[#E8192C]/30 underline-offset-4">
                                    asset.aikyam@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                </motion.div>
            </section>

            {/* Global Footer */}
            <div className="w-full relative z-20 mt-auto">
                <RegisterCTA />
                <Footer />
            </div>

        </main>
    );
}
