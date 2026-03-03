"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tracks from "@/components/Tracks";
import Schedule from "@/components/Schedule";
import Prizes from "@/components/Prizes";
import Judges from "@/components/Judges";
import FAQ from "@/components/FAQ";
import RegisterCTA from "@/components/RegisterCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [flickerDone, setFlickerDone] = useState(false);

  useEffect(() => {
    // Trigger page-load glitch flicker
    const timer = setTimeout(() => setFlickerDone(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={!flickerDone ? "page-flicker" : ""}>
      <Hero />
      <About />
      <Tracks />
      <Schedule />
      <Prizes />
      <Judges />
      <FAQ />
      <RegisterCTA />
      <Footer />
    </main>
  );
}
