"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import WorldMap from "./WorldMap";
import FlightPath, { PlanePosition } from "./FlightPath";
import CheckpointCard from "./CheckpointCard";
import { WAYPOINTS } from "./WorldMap";

/* ─────────────────────────────────────────────
   CHECKPOINT TRIGGER DISTANCES (screen px)
   ───────────────────────────────────────────── */
const TRIGGER_DIST = 50;   // show card when plane is within this px of waypoint
const HIDE_DIST = 90;      // hide card once plane is farther than this

const PLANE_SIZE = 64;


/* ─────────────────────────────────────────────
   NOIR TIMELINE — Core orchestrator
   ───────────────────────────────────────────── */
export default function NoirTimeline() {
    const [progress, setProgress] = useState(0);
    const [waypointScreenPositions, setWaypointScreenPositions] = useState<
        Array<[number, number]>
    >([]);
    const progressRef = useRef(0);
    const currentSegmentRef = useRef(0);

    /* Plane position (page-pixel coords from FlightPath SVG) */
    const [planePos, setPlanePos] = useState<PlanePosition | null>(null);

    /* ── BUG 2 FIX: distance-based sequential checkpoint state ── */
    const [currentSegment, setCurrentSegment] = useState(0);
    const [activeCard, setActiveCard] = useState<number | null>(null);

    /* ─── Wheel-driven progress ─── */
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const SENSITIVITY = 0.0004;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            const delta = e.deltaY * SENSITIVITY;
            const next = Math.max(0, Math.min(1, progressRef.current + delta));
            progressRef.current = next;
            setProgress(next);
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
            document.body.style.overflow = "";
        };
    }, []);

    /* ─── Update currentSegment + activeCard from plane position ─── */
    useEffect(() => {
        if (!planePos || waypointScreenPositions.length === 0) return;

        const px = planePos.x;
        const py = planePos.y;

        /* Distance from plane to every waypoint */
        const dists = waypointScreenPositions.map(([wx, wy]) => {
            const dx = px - wx;
            const dy = py - wy;
            return Math.sqrt(dx * dx + dy * dy);
        });

        /* ── Segment tracking — bidirectional ──
           The segment always equals the waypoint the plane is currently
           closest to (on its side of the path). We check forward AND
           backward so scrolling in either direction works identically. */
        let seg = currentSegmentRef.current;
        let changed = false;

        // Forward: advance while the next city is closer than the current
        while (seg + 1 < waypointScreenPositions.length) {
            if (dists[seg + 1] < dists[seg]) {
                seg++;
                changed = true;
            } else {
                break;
            }
        }

        // Backward: retreat while the previous city is closer than the current
        // (only if we didn't just advance — can't go both ways simultaneously)
        if (!changed) {
            while (seg - 1 >= 0) {
                if (dists[seg - 1] < dists[seg]) {
                    seg--;
                    changed = true;
                } else {
                    break;
                }
            }
        }

        if (changed) {
            currentSegmentRef.current = seg;
            setCurrentSegment(seg);
        }

        /* ── Card display — gated on current segment ──
           Show the checkpoint card when the plane is within TRIGGER_DIST
           of the current city. Clear it when it moves beyond HIDE_DIST. */
        setActiveCard(() => {
            const dist = dists[seg];
            if (dist < TRIGGER_DIST) return seg;
            return null;
        });
    }, [planePos, waypointScreenPositions]);

    /* ─── Plane position callback from FlightPath ─── */
    const handlePlanePosition = useCallback((pos: PlanePosition) => {
        setPlanePos(pos);
    }, []);

    /* ─── Projection callback ─── */
    const handleProjectionReady = useCallback(
        (projFn: (coords: [number, number]) => [number, number] | null) => {
            const positions: Array<[number, number]> = [];
            for (const wp of WAYPOINTS) {
                const pos = projFn(wp.coordinates);
                if (pos) positions.push(pos);
            }
            if (positions.length === WAYPOINTS.length) {
                setWaypointScreenPositions(positions);
            }
        },
        []
    );

    const showMap = true;

    /* Turbulence bob for the plane */
    const [bobOffset, setBobOffset] = useState(0);
    useEffect(() => {
        if (!showMap) return;
        let raf: number;
        const animate = () => {
            setBobOffset(Math.sin(Date.now() / 833) * 2);
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [showMap]);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* ── Progress bar ── */}
            {showMap && (
                <div
                    className="progress-bar"
                    style={{ width: `${progress * 100}%` }}
                />
            )}

            {/* ── Title overlay ── */}
            {showMap && (
                <div className="map-title-overlay">
                    <h1 className="map-title">CASE FILE: HACKATHON</h1>
                    <p className="map-subtitle">▸ Dossier No. 47-X ◂</p>
                </div>
            )}

            {/* ── Scroll hint ── */}
            {progress < 0.05 && (
                <div className="scroll-hint-overlay">
                    <p>↓ Scroll to trace the flight path ↓</p>
                </div>
            )}

            {/* Layer 1: World Map */}
            {showMap && (
                <WorldMap
                    activeCheckpoint={currentSegment}
                    onProjectionReady={handleProjectionReady}
                />
            )}

            {/* Layer 2: Flight path + plane position via callback */}
            {showMap && (
                <FlightPath
                    progress={progress}
                    waypointScreenPositions={waypointScreenPositions}
                    onPlanePositionUpdate={handlePlanePosition}
                />
            )}

            {/* Layer 2.5: Plane shadow */}
            {showMap && planePos && (
                <svg
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 7,
                        pointerEvents: "none",
                    }}
                >
                    <defs>
                        <radialGradient id="shadow-grad">
                            <stop offset="0%" stopColor="rgba(0,0,0,0.22)" />
                            <stop offset="70%" stopColor="rgba(0,0,0,0.06)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                        </radialGradient>
                        <filter id="shadow-blur">
                            <feGaussianBlur stdDeviation="3" />
                        </filter>
                    </defs>
                    <ellipse
                        cx={planePos.x + 5}
                        cy={planePos.y + 12}
                        rx={22}
                        ry={7}
                        fill="url(#shadow-grad)"
                        filter="url(#shadow-blur)"
                        opacity={0.7}
                        transform={`rotate(${planePos.angle}, ${planePos.x + 5}, ${planePos.y + 12})`}
                    />
                </svg>
            )}

            {/* Layer 3: Plane sprite — positioned in exact page-pixel coords */}
            {showMap && planePos && (
                <div
                    className="plane-sprite"
                    style={{
                        position: "fixed",          /* fixed so coords are page-relative */
                        left: planePos.x - PLANE_SIZE / 2,
                        top: planePos.y - PLANE_SIZE / 2 + bobOffset,
                        width: PLANE_SIZE,
                        height: PLANE_SIZE,
                        zIndex: 9,
                        pointerEvents: "none",
                        transform: `rotate(${planePos.angle + 90}deg)`,
                        filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))",
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/plane-topdown.png"
                        alt="DC-3 Plane"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                </div>
            )}

            {/* Layer 4: Checkpoint card — only when distance-trigger fires */}
            {showMap && activeCard !== null && (
                <CheckpointCard
                    activeCheckpoint={activeCard}
                    waypointScreenPositions={waypointScreenPositions}
                    planePos={planePos}
                />
            )}

            {/* ── Map legend ── */}
            {showMap && (
                <div className="map-legend-box">
                    <div className="legend-item">
                        <span className="legend-line" />
                        Flight path
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot" />
                        Checkpoint
                    </div>
                    <div className="legend-progress">
                        {Math.round(progress * 100)}% COMPLETE
                    </div>
                </div>
            )}

            {/* ── Film grain overlay ── */}
            <div className="film-grain-overlay" />

        </div>
    );
}
