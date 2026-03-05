"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface GlitchImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

export default function GlitchImage({ src, alt, width, height, className = "" }: GlitchImageProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <div className="relative w-full h-full">
                {/* Cyan ghost */}
                <div
                    className="absolute inset-0"
                    style={{
                        transform: "translateX(-3px) translateY(1px)",
                        opacity: 0.5,
                        mixBlendMode: "screen",
                        filter: "brightness(1.2)",
                    }}
                    aria-hidden
                >
                    <Image
                        src={src}
                        alt=""
                        width={width}
                        height={height}
                        className="w-full h-full object-contain"
                        style={{ filter: "sepia(1) saturate(20) hue-rotate(140deg) brightness(1.5)" }}
                    />
                </div>
                {/* Magenta ghost */}
                <div
                    className="absolute inset-0"
                    style={{
                        transform: "translateX(3px) translateY(-1px)",
                        opacity: 0.5,
                        mixBlendMode: "screen",
                        filter: "brightness(1.2)",
                    }}
                    aria-hidden
                >
                    <Image
                        src={src}
                        alt=""
                        width={width}
                        height={height}
                        className="w-full h-full object-contain"
                        style={{ filter: "sepia(1) saturate(20) hue-rotate(270deg) brightness(1.2)" }}
                    />
                </div>
                {/* Main image */}
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="relative w-full h-full object-contain glitch-text-animated"
                />
            </div>
        </motion.div>
    );
}
