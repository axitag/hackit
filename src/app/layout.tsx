import type { Metadata } from "next";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";
import HalftoneOverlay from "@/components/HalftoneOverlay";

export const metadata: Metadata = {
  title: "HackIt — Break the Code. Break the Multiverse.",
  description: "A 48-hour hackathon experience inspired by Spider-Man: Into the Spider-Verse. Build, hack, and ship across timelines.",
  keywords: ["hackathon", "coding", "spider-verse", "hackit", "programming"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <HalftoneOverlay />
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
