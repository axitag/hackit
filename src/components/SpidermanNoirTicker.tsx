"use client";

import { useEffect, useRef, useState } from "react";

// ─── Noir cityscape buildings (flat silhouettes) ───────────────────────────
const BUILDINGS = [
    // far-bg layer (darkest, slowest)
    { x: 0, w: 80, h: 160, windows: [[10, 20], [10, 40], [10, 60], [10, 80], [10, 100], [10, 120], [40, 20], [40, 40], [40, 60], [40, 80], [40, 100], [40, 120], [65, 20], [65, 60], [65, 100]] },
    { x: 90, w: 60, h: 200, windows: [[10, 10], [10, 40], [10, 70], [10, 100], [10, 130], [10, 160], [35, 10], [35, 40], [35, 70], [35, 100], [35, 130]] },
    { x: 160, w: 90, h: 180, windows: [[10, 15], [10, 45], [10, 75], [10, 105], [10, 135], [45, 15], [45, 45], [45, 75], [45, 105], [70, 15], [70, 45], [70, 75]] },
    { x: 260, w: 50, h: 220, windows: [[8, 10], [8, 40], [8, 70], [8, 100], [8, 130], [8, 160], [28, 10], [28, 40], [28, 70], [28, 100], [28, 130]] },
    { x: 320, w: 100, h: 170, windows: [[10, 10], [10, 40], [10, 70], [10, 100], [10, 130], [50, 10], [50, 40], [50, 70], [50, 100], [75, 10], [75, 40], [75, 70]] },
    { x: 430, w: 70, h: 210, windows: [[8, 15], [8, 45], [8, 75], [8, 105], [8, 135], [8, 165], [38, 15], [38, 45], [38, 75], [38, 105], [38, 135], [58, 15], [58, 45]] },
    { x: 510, w: 85, h: 185, windows: [[10, 15], [10, 45], [10, 75], [10, 105], [10, 135], [45, 15], [45, 45], [45, 75], [45, 105], [68, 15], [68, 45], [68, 75]] },
    { x: 605, w: 60, h: 195, windows: [[8, 10], [8, 40], [8, 70], [8, 100], [8, 130], [8, 160], [30, 10], [30, 40], [30, 70], [30, 100], [30, 130], [48, 10], [48, 40]] },
    { x: 675, w: 95, h: 175, windows: [[10, 15], [10, 45], [10, 75], [10, 105], [10, 135], [48, 15], [48, 45], [48, 75], [48, 105], [74, 15], [74, 45]] },
    { x: 780, w: 65, h: 205, windows: [[8, 10], [8, 40], [8, 70], [8, 100], [8, 130], [8, 160], [35, 10], [35, 40], [35, 70], [35, 100], [35, 130], [52, 10], [52, 40]] },
    { x: 855, w: 110, h: 190, windows: [[12, 15], [12, 45], [12, 75], [12, 105], [12, 135], [55, 15], [55, 45], [55, 75], [55, 105], [85, 15], [85, 45], [85, 75]] },
    { x: 975, w: 55, h: 215, windows: [[8, 10], [8, 40], [8, 70], [8, 100], [8, 130], [8, 170], [28, 10], [28, 40], [28, 70], [28, 100], [28, 130], [28, 170], [42, 10], [42, 40]] },
    { x: 1040, w: 80, h: 180, windows: [[10, 15], [10, 45], [10, 75], [10, 105], [10, 135], [40, 15], [40, 45], [40, 75], [40, 105], [62, 15], [62, 45], [62, 75]] },
    { x: 1130, w: 70, h: 200, windows: [[10, 10], [10, 40], [10, 70], [10, 100], [10, 130], [10, 160], [38, 10], [38, 40], [38, 70], [38, 100], [38, 130], [55, 10], [55, 40]] },
    { x: 1210, w: 90, h: 175, windows: [[10, 15], [10, 45], [10, 75], [10, 105], [10, 135], [45, 15], [45, 45], [45, 75], [45, 105], [68, 15], [68, 45]] },
];

// Window colours cycle (warm amber glow, some darker)
const WIN_COLORS = ["#f5c87a", "#f0b84a", "#e8a830", "#ffd080", "#c89040", "#e0c060"];
function winColor(bIdx: number, wIdx: number) {
    return WIN_COLORS[(bIdx * 3 + wIdx) % WIN_COLORS.length];
}

// ─── Spider-Man Noir SVG (detailed) ───────────────────────────────────────
// Animated via CSS keyframes embedded in a <style> tag
function SpidermanNoir({ frame }: { frame: number }) {
    // frame 0-3 drives body/limb poses (smooth walk-cycle while swinging)
    const t = (frame % 120) / 120; // 0..1 over full cycle
    const swing = Math.sin(t * Math.PI * 2);
    const bodyTilt = swing * 12; // tilt body as he swings
    const armL = -20 + swing * 35;
    const armR = 60 + swing * -20;
    const legL = 15 + swing * 20;
    const legR = -10 + swing * -20;
    const capeFlap = Math.abs(swing) * 15;

    return (
        <g transform={`translate(0,0) rotate(${bodyTilt},0,0)`}>
            {/* Cape */}
            <path
                d={`M -4,-22 Q ${-18 - capeFlap},${10 + capeFlap * 0.5} ${-12 + capeFlap * 0.3},32`}
                fill="#1a0a00" stroke="#0d0500" strokeWidth="0.5" opacity="0.9"
            />
            <path
                d={`M -4,-22 Q ${-8 - capeFlap * 0.5},${-2} ${-14 + capeFlap * 0.2},${20}`}
                fill="#2a1200" stroke="#0d0500" strokeWidth="0.3" opacity="0.7"
            />

            {/* Torso */}
            <ellipse cx="0" cy="4" rx="7" ry="10" fill="#111" />
            {/* Spider emblem */}
            <path d="M0,0 L-3,4 L0,3 L3,4 Z M0,8 L-3,4 L0,5 L3,4 Z" fill="#333" opacity="0.6" />

            {/* Head with hat */}
            <circle cx="0" cy="-16" r="7" fill="#1a1a1a" />
            {/* Hat brim */}
            <ellipse cx="0" cy="-20" rx="9" ry="2.5" fill="#0d0d0d" />
            {/* Hat top */}
            <rect x="-5.5" y="-30" width="11" height="11" rx="1" fill="#111" />
            {/* Hat band */}
            <rect x="-5.5" y="-21" width="11" height="1.5" fill="#222" />
            {/* Mask eyes (white lenses) */}
            <ellipse cx="-2.5" cy="-16.5" rx="2.2" ry="1.5" fill="white" opacity="0.9" />
            <ellipse cx="2.5" cy="-16.5" rx="2.2" ry="1.5" fill="white" opacity="0.9" />
            {/* Eye shine */}
            <ellipse cx="-2" cy="-17" rx="0.8" ry="0.5" fill="#aaa" opacity="0.5" />
            <ellipse cx="3" cy="-17" rx="0.8" ry="0.5" fill="#aaa" opacity="0.5" />
            {/* Scarf/collar */}
            <path d="M-6,-10 Q0,-7 6,-10 L5,-6 Q0,-3 -5,-6 Z" fill="#1a0a00" opacity="0.8" />

            {/* Left arm (web-shooting arm — raised) */}
            <g transform={`rotate(${armL},-5,0)`}>
                <line x1="-5" y1="0" x2="-14" y2="12" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
                <line x1="-14" y1="12" x2="-22" y2="4" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
                {/* Hand */}
                <circle cx="-22" cy="4" r="2.5" fill="#1a1a1a" />
                {/* Web shooter glow */}
                <circle cx="-22" cy="4" r="1.5" fill="#888" opacity="0.8" />
            </g>

            {/* Right arm */}
            <g transform={`rotate(${armR},5,0)`}>
                <line x1="5" y1="0" x2="13" y2="14" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
                <line x1="13" y1="14" x2="19" y2="8" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="19" cy="8" r="2.5" fill="#1a1a1a" />
            </g>

            {/* Left leg */}
            <g transform={`rotate(${legL},0,12)`}>
                <line x1="-3" y1="12" x2="-6" y2="26" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
                <line x1="-6" y1="26" x2="-10" y2="22" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="-10" cy="22" rx="3" ry="2" fill="#1a1a1a" />
            </g>

            {/* Right leg */}
            <g transform={`rotate(${legR},0,12)`}>
                <line x1="3" y1="12" x2="7" y2="26" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
                <line x1="7" y1="26" x2="11" y2="22" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="11" cy="22" rx="3" ry="2" fill="#1a1a1a" />
            </g>

            {/* Trench coat flap */}
            <path d="M-7,4 Q-11,16 -8,28 L-3,28 Q-5,14 -2,4 Z" fill="#1a0a00" opacity="0.65" />
            <path d="M7,4 Q11,16 8,28 L3,28 Q5,14 2,4 Z" fill="#1a0a00" opacity="0.55" />
        </g>
    );
}

// ─── Web strand with physics-like curve ────────────────────────────────────
function WebStrand({ spiderX, spiderY, anchorX, anchorY, sag }: {
    spiderX: number; spiderY: number; anchorX: number; anchorY: number; sag: number;
}) {
    const midX = (spiderX + anchorX) / 2;
    const midY = (spiderY + anchorY) / 2 + sag;
    return (
        <path
            d={`M ${spiderX} ${spiderY} Q ${midX} ${midY} ${anchorX} ${anchorY}`}
            stroke="#c8c8b0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.75"
            strokeDasharray="none"
        />
    );
}

// ─── Moon ─────────────────────────────────────────────────────────────────
function Moon() {
    return (
        <g>
            <defs>
                <radialGradient id="moonGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#f0f0e8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#d8d8c0" stopOpacity="0.8" />
                </radialGradient>
                <filter id="moonGlow">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            <circle cx="50%" cy="50%" r="72" fill="white" opacity="0.12" filter="url(#moonGlow)" />
            <circle cx="50%" cy="50%" r="60" fill="url(#moonGrad)" />
        </g>
    );
}

// ─── Ticker text items ─────────────────────────────────────────────────────
const TICKER_ITEMS = [
    "THE DAILY BUGLE",
    "SPIDER-MAN TERRORIZES MANHATTAN",
    "PROHIBITION STILL IN EFFECT",
    "CRIME BOSS FISK DENIES ALL ALLEGATIONS",
    "MYSTERIOUS VIGILANTE SPOTTED ON 5TH AVE",
    "DAILY BUGLE OFFERS $10,000 REWARD",
    "NOIR CITY — WHERE SHADOWS NEVER SLEEP",
];

export default function SpidermanNoirTicker() {
    const [frame, setFrame] = useState(0);
    const [spiderX, setSpiderX] = useState(-80);
    const [anchorX, setAnchorX] = useState(120);
    const [anchorY, setAnchorY] = useState(10);
    const rafRef = useRef<number>(0);
    const lastRef = useRef<number>(0);
    const TICKER_HEIGHT = 160; // px height of ticker
    const SPEED = 0.6; // px per frame for character

    // Animation loop
    useEffect(() => {
        const loop = (ts: number) => {
            const dt = ts - lastRef.current;
            lastRef.current = ts;
            if (dt < 100) { // skip huge jumps
                setFrame(f => f + 1);
                setSpiderX(x => {
                    const next = x + SPEED;
                    return next > 1200 ? -100 : next;
                });
                setAnchorX(x => {
                    const next = x + SPEED;
                    return next > 1300 ? -50 : next;
                });
                // anchor Y bobs slightly
                setAnchorY(y => 10 + Math.sin(Date.now() / 400) * 6);
            }
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // Swing physics: spider hangs below anchor, with pendulum offset
    const swingPhase = Math.sin(frame / 30);
    const spiderY = 90 + Math.cos(frame / 20) * 12; // bob up/down
    const sagAmount = 18 + Math.abs(swingPhase) * 10;

    // Web anchor trails slightly behind spider
    const webAnchorX = anchorX;
    const webAnchorScreenX = spiderX - 40 + swingPhase * 10;

    return (
        <div className="relative w-full overflow-hidden select-none" style={{ height: TICKER_HEIGHT }}>
            {/* ── Base atmosphere: dark teal-blue sky gradient ── */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(180deg, #1a2e35 0%, #1e3340 30%, #243a45 60%, #1a2830 100%)",
                }}
            />

            {/* ── Film grain overlay ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
                <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                    <feBlend in="SourceGraphic" mode="multiply" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>

            {/* ── Main SVG scene ── */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1400 160"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    {/* Vignette */}
                    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
                    </radialGradient>
                    {/* Building shadow */}
                    <linearGradient id="buildFade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1a2830" />
                        <stop offset="100%" stopColor="#0d1a1f" />
                    </linearGradient>
                    {/* Moon halo */}
                    <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>

                {/* Sky */}
                <rect width="1400" height="160" fill="none" />

                {/* Moon halo glow behind buildings */}
                <ellipse cx="700" cy="60" rx="160" ry="140" fill="url(#moonHalo)" />

                {/* Moon */}
                <g transform="translate(630,0) scale(0.9)">
                    <Moon />
                </g>

                {/* ── Background buildings (two parallax layers) ── */}
                {/* Layer 1: far (slower) — rendered at 70% opacity + slightly smaller */}
                <g opacity="0.55" transform="scale(1,0.85) translate(0,24)">
                    {BUILDINGS.map((b, i) => (
                        <g key={`bg-${i}`} transform={`translate(${b.x},${160 - b.h})`}>
                            <rect x="0" y="0" width={b.w} height={b.h} fill="#1c2830" />
                            {b.windows.map(([wx, wy], wi) => (
                                <rect
                                    key={wi}
                                    x={wx} y={wy}
                                    width="10" height="10"
                                    rx="1"
                                    fill={winColor(i, wi)}
                                    opacity={(i + wi) % 4 === 0 ? 0.2 : 0.55}
                                />
                            ))}
                        </g>
                    ))}
                </g>

                {/* Layer 2: mid buildings (full) */}
                {BUILDINGS.map((b, i) => (
                    <g key={`mid-${i}`} transform={`translate(${b.x + 120},${160 - b.h * 1.1})`}>
                        <rect x="0" y="0" width={b.w} height={b.h * 1.1} fill="#1e2e38" />
                        {b.windows.map(([wx, wy], wi) => (
                            <rect
                                key={wi}
                                x={wx} y={wy}
                                width="9" height="9"
                                rx="1"
                                fill={winColor(i + 5, wi)}
                                opacity={(i * 2 + wi) % 5 === 0 ? 0.15 : 0.7}
                            />
                        ))}
                    </g>
                ))}

                {/* Foreground rooftop silhouette */}
                <rect x="0" y="135" width="1400" height="25" fill="#0d1a1f" />
                {/* Rooftop details: water towers, chimneys */}
                {[60, 220, 420, 580, 780, 960, 1100, 1280].map((rx, i) => (
                    <g key={i} transform={`translate(${rx},108)`}>
                        <rect x="0" y="0" width="18" height="28" rx="2" fill="#0a1419" />
                        <ellipse cx="9" cy="0" rx="12" ry="5" fill="#0d1b22" />
                    </g>
                ))}
                {[140, 350, 640, 900, 1200].map((cx, i) => (
                    <rect key={i} x={cx} y="118" width="6" height="18" rx="1" fill="#0a1419" />
                ))}

                {/* ── Web strand(s) ── */}
                <WebStrand
                    spiderX={spiderX}
                    spiderY={spiderY - 20}
                    anchorX={webAnchorX - 60}
                    anchorY={anchorY}
                    sag={sagAmount}
                />
                {/* Secondary thinner web */}
                <WebStrand
                    spiderX={spiderX}
                    spiderY={spiderY - 20}
                    anchorX={webAnchorX - 80}
                    anchorY={anchorY + 15}
                    sag={sagAmount * 0.6}
                />

                {/* ── Spider-Man Noir character ── */}
                <g transform={`translate(${spiderX},${spiderY})`} style={{ willChange: "transform" }}>
                    <SpidermanNoir frame={frame} />
                </g>

                {/* Vignette overlay */}
                <rect width="1400" height="160" fill="url(#vignette)" />

                {/* Left/right edge fade */}
                <defs>
                    <linearGradient id="leftFade" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#141e24" stopOpacity="1" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="rightFade" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="100%" stopColor="#141e24" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <rect x="0" y="0" width="80" height="160" fill="url(#leftFade)" />
                <rect x="1320" y="0" width="80" height="160" fill="url(#rightFade)" />
            </svg>

            {/* ── Ticker tape strip ── */}
            <div
                className="absolute bottom-0 left-0 right-0 overflow-hidden"
                style={{
                    height: 32,
                    background: "rgba(10,6,0,0.88)",
                    borderTop: "1.5px solid #5a4010",
                }}
            >
                {/* "BREAKING" badge */}
                <div
                    className="absolute left-0 top-0 bottom-0 flex items-center z-10 px-3"
                    style={{
                        background: "#8B0000",
                        borderRight: "2px solid #5a0000",
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: "0.15em",
                        color: "#fff",
                        whiteSpace: "nowrap",
                    }}
                >
                    ★ BREAKING
                </div>

                {/* Scrolling text */}
                <div
                    className="absolute top-0 bottom-0 flex items-center"
                    style={{ left: 110, right: 0 }}
                >
                    <div
                        style={{
                            display: "flex",
                            animation: "tickerScroll 28s linear infinite",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                            <span key={i} style={{ display: "flex", alignItems: "center" }}>
                                <span
                                    style={{
                                        fontFamily: "'Courier New', Courier, monospace",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: "0.12em",
                                        color: "#d4b060",
                                        textTransform: "uppercase",
                                        padding: "0 6px",
                                    }}
                                >
                                    {item}
                                </span>
                                <span style={{ color: "#5a4010", fontSize: 14, margin: "0 4px" }}>◆</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Speech bubble (appears periodically) ── */}
            {frame % 240 < 100 && (
                <div
                    className="absolute pointer-events-none"
                    style={{
                        left: Math.max(20, Math.min(spiderX * (100 / 1400) + 8, 70)) + "%",
                        top: "8px",
                        background: "white",
                        border: "2px solid #222",
                        padding: "4px 10px",
                        maxWidth: 170,
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#111",
                        lineHeight: 1.4,
                        boxShadow: "2px 2px 0 #333",
                        transform: "translateX(-50%)",
                    }}
                >
                    {frame % 240 < 100
                        ? frame % 240 < 50
                            ? <>Is that worth <u>killing</u> a man?</>
                            : <>What the <u>hell</u> is going <u>on</u> around here?</>
                        : null}
                    {/* Tail */}
                    <div style={{
                        position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
                        width: 0, height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "8px solid #222",
                    }} />
                    <div style={{
                        position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                        width: 0, height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "7px solid white",
                    }} />
                </div>
            )}

            <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
}
