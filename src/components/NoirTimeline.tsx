"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import Image from "next/image";
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
   STATIC SHADOW DEFS — never re-renders
   ───────────────────────────────────────────── */
const ShadowDefs = memo(function ShadowDefs() {
    return (
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
    );
});

/* ─────────────────────────────────────────────
   NOIR TIMELINE — Core orchestrator
   ───────────────────────────────────────────── */
export default function NoirTimeline() {
    const progressRef = useRef(0);
    const currentSegmentRef = useRef(0);
    const rafIdRef = useRef<number>(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const isInViewRef = useRef(false);

    /* Refs for DOM-direct updates (bypass React re-renders) */
    const planeSpriteRef = useRef<HTMLDivElement>(null);
    const shadowEllipseRef = useRef<SVGEllipseElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const legendProgressRef = useRef<HTMLDivElement>(null);
    const scrollHintRef = useRef<HTMLDivElement>(null);

    /* State that actually needs re-render */
    const [waypointScreenPositions, setWaypointScreenPositions] = useState<
        Array<[number, number]>
    >([]);
    const [currentSegment, setCurrentSegment] = useState(0);
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [isInView, setIsInView] = useState(false);

    /* Plane position stored as ref — no re-renders */
    const planePosRef = useRef<PlanePosition | null>(null);

    /* ─── IntersectionObserver: detect when section is in view ─── */
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const inView = entry.isIntersecting && entry.intersectionRatio > 0.5;
                isInViewRef.current = inView;
                setIsInView(inView);

                /* Lock the snap-container scroll when timeline is in view */
                const snapContainer = el.closest('.snap-container') as HTMLElement | null;
                if (snapContainer) {
                    if (inView) {
                        snapContainer.style.overflow = "hidden";
                    } else {
                        snapContainer.style.overflow = "";
                    }
                }
            },
            { threshold: [0.5] }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            /* Restore scroll on cleanup */
            const snapContainer = el.closest('.snap-container') as HTMLElement | null;
            if (snapContainer) {
                snapContainer.style.overflow = "";
            }
        };
    }, []);

    /* ─── Wheel-driven progress ─── */
    useEffect(() => {
        const SENSITIVITY = 0.0004;

        const handleWheel = (e: WheelEvent) => {
            if (!isInViewRef.current) return;

            const delta = e.deltaY * SENSITIVITY;
            const next = Math.max(0, Math.min(1, progressRef.current + delta));

            /* Allow page to scroll past when timeline is at boundaries */
            if ((delta > 0 && progressRef.current >= 1) || (delta < 0 && progressRef.current <= 0)) {
                /* Unlock snap-container so natural scroll can continue */
                const snapContainer = sectionRef.current?.closest('.snap-container') as HTMLElement | null;
                if (snapContainer) {
                    snapContainer.style.overflow = "";
                }
                return;
            }

            e.preventDefault();
            progressRef.current = next;

            /* Update progress bar directly via DOM */
            if (progressBarRef.current) {
                progressBarRef.current.style.width = `${next * 100}%`;
            }

            /* Update legend progress directly via DOM */
            if (legendProgressRef.current) {
                legendProgressRef.current.textContent = `${Math.round(next * 100)}% COMPLETE`;
            }

            /* Toggle scroll hint visibility */
            if (scrollHintRef.current) {
                scrollHintRef.current.style.display = next < 0.05 ? "" : "none";
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    /* ─── Animation loop: update FlightPath progress and sync plane sprite via DOM ─── */
    useEffect(() => {
        let lastProgress = -1;
        const flightPathEl = document.querySelector('[data-flight-path]') as SVGPathElement | null;

        const tick = () => {
            const progress = progressRef.current;

            /* Only do work when progress actually changes */
            if (Math.abs(progress - lastProgress) > 0.0001) {
                lastProgress = progress;

                /* Dispatch a custom event that FlightPath listens to */
                window.dispatchEvent(new CustomEvent('noir-progress', { detail: progress }));
            }

            rafIdRef.current = requestAnimationFrame(tick);
        };

        rafIdRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafIdRef.current);
    }, []);

    /* ─── Update plane sprite & shadow position directly via DOM ─── */
    const updatePlaneDOM = useCallback((pos: PlanePosition) => {
        planePosRef.current = pos;

        const localX = pos.x;
        const localY = pos.y;

        /* Plane sprite */
        if (planeSpriteRef.current) {
            planeSpriteRef.current.style.left = `${localX - PLANE_SIZE / 2}px`;
            planeSpriteRef.current.style.top = `${localY - PLANE_SIZE / 2}px`;
            planeSpriteRef.current.style.transform = `rotate(${pos.angle + 90}deg)`;
            planeSpriteRef.current.style.display = "block";
        }

        /* Shadow ellipse */
        if (shadowEllipseRef.current) {
            shadowEllipseRef.current.setAttribute("cx", String(localX + 5));
            shadowEllipseRef.current.setAttribute("cy", String(localY + 12));
            shadowEllipseRef.current.setAttribute(
                "transform",
                `rotate(${pos.angle}, ${localX + 5}, ${localY + 12})`
            );
        }
    }, []);

    /* ─── Update currentSegment + activeCard from plane position ─── */
    const checkpointCheckRef = useRef<number>(0);

    const handlePlanePosition = useCallback((pos: PlanePosition) => {
        /* Always update DOM (fast, no React) */
        updatePlaneDOM(pos);

        /* Throttle checkpoint checks to every 3rd frame */
        checkpointCheckRef.current++;
        if (checkpointCheckRef.current % 3 !== 0) return;

        if (waypointScreenPositions.length === 0) return;

        const px = pos.x;
        const py = pos.y;

        /* Distance from plane to every waypoint */
        const dists = waypointScreenPositions.map(([wx, wy]) => {
            const dx = px - wx;
            const dy = py - wy;
            return Math.sqrt(dx * dx + dy * dy);
        });

        /* Segment tracking — find absolute closest waypoint globally */
        let minSeg = 0;
        let minDist = dists[0];
        for (let i = 1; i < dists.length; i++) {
            if (dists[i] < minDist) {
                minDist = dists[i];
                minSeg = i;
            }
        }

        if (currentSegmentRef.current !== minSeg) {
            currentSegmentRef.current = minSeg;
            setCurrentSegment(minSeg);
        }

        /* Card display — simply show card if plane is within TRIGGER_DIST of any waypoint */
        let newActiveCard: number | null = null;
        for (let i = 0; i < dists.length; i++) {
            if (dists[i] < TRIGGER_DIST) {
                newActiveCard = i;
                break; // If near multiple, pick the first
            }
        }

        /* Only setState when the value actually changes */
        setActiveCard(prev => {
            if (prev === newActiveCard) return prev;
            return newActiveCard;
        });
    }, [waypointScreenPositions, updatePlaneDOM]);

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

    return (
        <section
            ref={sectionRef}
            id="timeline"
            className="snap-section"
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Image
                    src="/images/timeline_bg_2.png"
                    alt="Timeline section background"
                    fill
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-linear-to-b from-(--bg) via-transparent to-(--bg)" />
            </div>

            {/* ── Progress bar ── */}
            <div
                ref={progressBarRef}
                className="progress-bar"
                style={{ width: "0%" }}
            />

            {/* ── Title overlay ── */}
            <div className="map-title-overlay">
                <h1 className="map-title">CASE FILE: HACKATHON TIMELINE</h1>
                <p className="map-subtitle">▸ Dossier No. 47-X ◂</p>
            </div>

            {/* ── Scroll hint ── */}
            <div ref={scrollHintRef} className="scroll-hint-overlay">
                <p>↓ Scroll to trace the flight path ↓</p>
            </div>

            {/* ══ Map container — crops everything inside ══ */}
            <div ref={mapContainerRef} className="map-container-inner">

                {/* Layer 1: World Map */}
                <WorldMap
                    activeCheckpoint={currentSegment}
                    onProjectionReady={handleProjectionReady}
                />

                {/* Layer 2: Flight path + plane position via callback */}
                <FlightPath
                    progress={progressRef.current}
                    waypointScreenPositions={waypointScreenPositions}
                    onPlanePositionUpdate={handlePlanePosition}
                />

                {/* Layer 2.5: Plane shadow */}
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
                    <ShadowDefs />
                    <ellipse
                        ref={shadowEllipseRef}
                        cx={0}
                        cy={0}
                        rx={22}
                        ry={7}
                        fill="url(#shadow-grad)"
                        filter="url(#shadow-blur)"
                        opacity={0.7}
                    />
                </svg>

                {/* Layer 3: Plane sprite */}
                <div
                    ref={planeSpriteRef}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: PLANE_SIZE,
                        height: PLANE_SIZE,
                        zIndex: 9,
                        pointerEvents: "none",
                        display: "none",
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="plane-sprite"
                        src="/images/plane-topdown.png"
                        alt="DC-3 Plane"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                </div>

                {/* Layer 4: Checkpoint card */}
                {activeCard !== null && (
                    <CheckpointCard
                        activeCheckpoint={activeCard}
                        waypointScreenPositions={waypointScreenPositions}
                        planePos={planePosRef.current}
                        containerRef={mapContainerRef}
                    />
                )}

                {/* ── Map legend ── */}
                <div className="map-legend-box">
                    <div className="legend-item">
                        <span className="legend-line" />
                        Flight path
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot" />
                        Checkpoint
                    </div>
                    <div ref={legendProgressRef} className="legend-progress">
                        0% COMPLETE
                    </div>
                </div>

            </div>

            {/* ── Film grain overlay ── */}
            <div className="film-grain-overlay" />

        </section>
    );
}
