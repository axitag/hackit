"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Tracks from "@/components/Tracks";
import Schedule from "@/components/Schedule";
import Prizes from "@/components/Prizes";
import FAQ from "@/components/FAQ";
import RegisterCTA from "@/components/RegisterCTA";
import Footer from "@/components/Footer";
import Welcome from "@/components/Welcome";
import Navigation from "@/components/Navigation";
import NoirTimeline from "@/components/NoirTimeline";


export default function Home() {
  const [flickerDone, setFlickerDone] = useState(false);

  useEffect(() => {
    // Trigger page-load glitch flicker
    const timer = setTimeout(() => setFlickerDone(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`snap-container ${!flickerDone ? "page-flicker" : ""}`}>
      <Navigation />
      <Hero />
      <Welcome />
      <Tracks />
      <NoirTimeline />
      <Prizes />
      <FAQ />
      <RegisterCTA />
      <Footer />
    </main>
  );
}
