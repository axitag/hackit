export default function Footer() {
    return (
        <footer className="snap-footer bg-[var(--bg)] border-t-[3px] border-[var(--ink-dark)] py-8 px-4">
            {/* Spider web corner SVG */}
            <svg
                className="absolute bottom-0 right-0 w-[120px] h-[120px] opacity-10"
                viewBox="0 0 120 120"
                fill="none"
                aria-hidden="true"
            >
                <path d="M120,120 L120,0" stroke="white" strokeWidth="0.5" />
                <path d="M120,120 L0,120" stroke="white" strokeWidth="0.5" />
                <path d="M120,120 L60,60" stroke="white" strokeWidth="0.5" />
                <path d="M120,120 L0,0" stroke="white" strokeWidth="0.5" />
                <path d="M120,120 L120,60 Q90,90 60,120" stroke="white" strokeWidth="0.3" />
                <path d="M120,120 L120,30 Q75,75 30,120" stroke="white" strokeWidth="0.3" />
                <path d="M120,90 Q105,105 90,120" stroke="white" strokeWidth="0.3" />
            </svg>

            <div className="max-w-6xl mx-auto text-center">
                <p className="font-label text-xs md:text-sm text-white/30 tracking-widest">
                    HackIt © 2026 — All timelines reserved.
                </p>
            </div>
        </footer>
    );
}
