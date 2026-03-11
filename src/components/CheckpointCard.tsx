"use client";

import React, { RefObject } from "react";
import Image from "next/image";
import { WAYPOINTS } from "./WorldMap";
import { PlanePosition } from "./FlightPath";

/* ─────────────────────────────────────────────
   Polaroid dossier checkpoint card.
   Positioned adjacent to the active pin,
   avoiding the plane and other pins.
   ───────────────────────────────────────────── */

const CHECKPOINT_IMAGES = [
    "/images/checkpoint_registration_1772735341148.png",
    "/images/checkpoint_kickoff_1772735358032.png",
    "/images/checkpoint_hacking_1772735378426.png",
    "/images/checkpoint_midpoint_1772735397428.png",
    "/images/checkpoint_submissions_1772735413738.png",
    "/images/checkpoint_judgement_1772735430828.png",
    "/images/checkpoint_midpoint_1772735397428.png",
    "/images/checkpoint_registration_1772735341148.png",
];

const CARD_W = 240;
const CARD_H = 320;
const PIN_GAP = 20;   // gap between pin and card edge
const EDGE_PAD = 12;  // min distance from container edges

interface CheckpointCardProps {
    activeCheckpoint: number;
    waypointScreenPositions: Array<[number, number]>;
    planePos?: PlanePosition | null;
    containerRef?: RefObject<HTMLDivElement | null>;
}

const CheckpointCard = React.memo(function CheckpointCard({
    activeCheckpoint,
    waypointScreenPositions,
    planePos,
    containerRef,
}: CheckpointCardProps) {
    if (activeCheckpoint < 0 || activeCheckpoint >= WAYPOINTS.length) return null;
    if (waypointScreenPositions.length < WAYPOINTS.length) return null;

    const wp = WAYPOINTS[activeCheckpoint];
    const [pinX, pinY] = waypointScreenPositions[activeCheckpoint];

    /* Use container dimensions instead of window */
    const containerRect = containerRef?.current?.getBoundingClientRect();
    const containerW = containerRect ? containerRect.width : (typeof window !== "undefined" ? window.innerWidth : 1400);
    const containerH = containerRect ? containerRect.height : (typeof window !== "undefined" ? window.innerHeight : 800);

    /* ── 4 candidate positions around the pin ──
       Each offsets the card so its nearest corner/edge is PIN_GAP away
       from the pin, in one of four diagonal quadrants. */
    const candidates = [
        // top-right of pin
        { left: pinX + PIN_GAP, top: pinY - CARD_H - PIN_GAP },
        // top-left of pin
        { left: pinX - CARD_W - PIN_GAP, top: pinY - CARD_H - PIN_GAP },
        // bottom-right of pin
        { left: pinX + PIN_GAP, top: pinY + PIN_GAP },
        // bottom-left of pin
        { left: pinX - CARD_W - PIN_GAP, top: pinY + PIN_GAP },
    ];

    /* Clamp each candidate to container bounds */
    const clamped = candidates.map((c) => ({
        left: Math.max(EDGE_PAD, Math.min(containerW - CARD_W - EDGE_PAD, c.left)),
        top: Math.max(EDGE_PAD, Math.min(containerH - CARD_H - EDGE_PAD, c.top)),
    }));

    /* Score each: higher = better (farther from other pins & plane) */
    const scored = clamped.map((c) => {
        const cx = c.left + CARD_W / 2;
        const cy = c.top + CARD_H / 2;

        /* Min distance from every OTHER waypoint pin */
        let minPinDist = Infinity;
        for (let i = 0; i < waypointScreenPositions.length; i++) {
            if (i === activeCheckpoint) continue;
            const [wx, wy] = waypointScreenPositions[i];
            const d = Math.hypot(cx - wx, cy - wy);
            if (d < minPinDist) minPinDist = d;
        }

        /* Distance from the plane (if known) */
        const planeDist = planePos
            ? Math.hypot(cx - planePos.x, cy - planePos.y)
            : 9999;

        /* Prefer positions with more breathing room from pins and plane */
        return { ...c, score: minPinDist * 0.6 + planeDist * 0.4 };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    const isRight = pinX > best.left + CARD_W / 2;

    return (
        <>

            {/* Dossier card */}
            <div
                className={`dossier-card dossier-card-visible ${isRight ? "from-right" : "from-left"}`}
                style={{
                    position: "absolute",
                    left: `${best.left}px`,
                    top: `${best.top}px`,
                    zIndex: 20,
                    width: `${CARD_W}px`,
                }}
            >
                <span className="dossier-stamp">Classified</span>

                <div className="dossier-image-wrapper">
                    <Image
                        src={CHECKPOINT_IMAGES[activeCheckpoint]}
                        alt={wp.event}
                        width={600}
                        height={375}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>

                <div className="dossier-body">
                    <p className="dossier-number">
                        Checkpoint {String(activeCheckpoint + 1).padStart(2, "0")} · {wp.name}
                    </p>
                    <h3 className="dossier-title">{wp.event}</h3>
                    <p className="dossier-date">{wp.date}</p>
                    <p className="dossier-desc">{wp.desc}</p>
                </div>

                <div className="dossier-footer">
                    <div className="dossier-footer-dot" />
                    <div className="dossier-footer-line" />
                    <div className="dossier-footer-dot" />
                </div>
            </div>
        </>
    );
});

export default CheckpointCard;
