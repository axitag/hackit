"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RegisterCTA from "@/components/RegisterCTA";

export default function RefundPolicy() {
    return (
        <main className="min-h-screen relative bg-[#0a0a0a] text-[#f0ece0] font-body flex flex-col w-full selection:bg-[#E8192C] selection:text-white">

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

            {/* Content Container */}
            <section className="relative z-10 w-full px-6 md:px-12 grow flex flex-col items-center" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>

                {/* Page Title */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full text-center mb-16 relative flex flex-col gap-10"
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
                    className="flex flex-col bg-[#141414] border-t border-t-white/10 border-r border-r-white/10 border-b border-b-white/10 border-l-2 border-l-[#E8192C]/70 shadow-2xl relative"
                    style={{ padding: '3rem', maxWidth: '70rem', width: '100%', margin: '0 auto' }}
                >
                    {/* Subtle Corner Accents */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#E8192C]/30" />

                    {/* Introductory Text */}
                    <p className="text-white/80 text-base md:text-[16px] leading-[1.8] tracking-widest mb-12 italic">
                        Thank you for registering for HACKIT 2025. Please read our No Refund Policy carefully before completing your registration.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {/* Section 1 */}
                        <section className="w-full flex flex-col gap-2">
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">1.</span> No Refunds After Registration
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8] tracking-widest">
                                Once a participant or team has successfully registered for HACKIT 2025, the registration fee is non-refundable and non-transferable under any circumstances.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section className="w-full flex flex-col gap-2" >
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">2.</span> Event Cancellation or Modification
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8] mb-4 tracking-widest">
                                In the unlikely event that HACKIT 2025 is postponed, rescheduled, or modified due to unforeseen circumstances (such as natural disasters, emergencies, or other unavoidable situations), the registration will remain valid for the rescheduled date.
                            </p>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8] tracking-widest">
                                No refunds will be provided in case of cancellation, rescheduling, or changes to the event format.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section className="w-full flex flex-col gap-2" >
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">3.</span> Registration Confirmation
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8] tracking-widest">
                                Registration is only confirmed upon successful payment of the registration fee. Incomplete registrations or pending payments will not secure your spot in the hackathon.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section className="w-full flex flex-col gap-2" >
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">4.</span> Team Changes
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8] tracking-widest">
                                Team composition changes are not permitted after registration closure. The registration fee cannot be transferred to different team members or other teams.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section className="w-full flex flex-col gap-2" >
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">5.</span> Participation Requirements
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8] tracking-widest mb-4">
                                Participants must adhere to all hackathon rules and guidelines.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-white/80 text-base md:text-[16px] leading-[1.8] tracking-widest">
                                    <span className="text-[#E8192C] mt-1 shrink-0">►</span>
                                    <span className="tracking-widest">Failure to comply with the rules may result in disqualification without refund.</span>
                                </li>
                                <li className="flex gap-3 text-white/80 text-base md:text-[16px] leading-[1.8] tracking-widest">
                                    <span className="text-[#E8192C] mt-1 shrink-0">►</span>
                                    <span className="tracking-widest">All team members must be present during the event as per the schedule.</span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section className="w-full flex flex-col gap-2" >
                            <h2 className="font-display text-xl md:text-2xl text-white tracking-widest uppercase mb-4 flex items-baseline gap-3">
                                <span className="text-[#E8192C]">6.</span> Technical Issues
                            </h2>
                            <p className="text-white/80 text-base md:text-[16px] leading-[1.8] tracking-widest">
                                HACKIT 2025 is not responsible for any technical issues participants may face during the event. No refunds will be provided for connectivity or hardware-related problems.
                            </p>
                        </section>
                    </div>

                    {/* Classifier Dossier / Contact Block */}
                    <div className="bg-[#111] border-2 border-[#222] relative" style={{ marginTop: '2.5rem', padding: '1.5rem 2rem' }}>
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
