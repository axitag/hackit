"use client";

import React, { useEffect, useRef, useCallback } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from "react-simple-maps";

/* ─────────────────────────────────────────────
   WAYPOINTS — real lat/long for 6 cities
   ───────────────────────────────────────────── */
export interface Waypoint {
    name: string;
    coordinates: [number, number]; // [lon, lat]
    event: string;
    date: string;
    desc: string;
}

export const WAYPOINTS: Waypoint[] = [
    {
        name: "New York",
        coordinates: [-74.006, 40.7128],
        event: "Registration Opens",
        date: "March 15, 1947 · 0800 HRS",
        desc: "All operatives must register through secure channels before departure.",
    },
    {
        name: "Dublin",
        coordinates: [-6.2603, 53.3498],
        event: "Kickoff Briefing",
        date: "March 22, 1947 · 1000 HRS",
        desc: "Report to the war room for mission objectives and team assignments.",
    },
    {
        name: "London",
        coordinates: [-0.1276, 51.5074],
        event: "Hacking Begins",
        date: "March 23, 1947 · 0900 HRS",
        desc: "Code-breakers deploy to stations. The clock starts now.",
    },
    {
        name: "Rome",
        coordinates: [12.4964, 41.9028],
        event: "Midpoint Check-in",
        date: "March 24, 1947 · 1200 HRS",
        desc: "All units provide status reports. Mentors conduct field inspections.",
    },
    {
        name: "Istanbul",
        coordinates: [28.9784, 41.0082],
        event: "Submissions Due",
        date: "March 25, 1947 · 1800 HRS",
        desc: "Final intel packages must be filed. Late submissions will be burned.",
    },
    {
        name: "Cairo",
        coordinates: [31.2357, 30.0444],
        event: "Final Judgement",
        date: "March 26, 1947 · 1500 HRS",
        desc: "The tribunal convenes. Only the most cunning operatives are decorated.",
    },
];

const GEO_URL =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ─────────────────────────────────────────────
   PROJECTION CONFIG — Natural Earth centered
   on the Atlantic, zoomed to show NY → Cairo
   ───────────────────────────────────────────── */
const PROJECTION_CONFIG = {
    rotate: [10, 0, 0] as [number, number, number],
    center: [0, 40] as [number, number],
    scale: 280,
};

/* ─────────────────────────────────────────────
   COMPONENT — renders SVG world map with city
   pins and parchment texture overlay
   ───────────────────────────────────────────── */
interface WorldMapProps {
    activeCheckpoint: number;
    onProjectionReady: (
        projFn: (coords: [number, number]) => [number, number] | null
    ) => void;
}

/* Inner component that can access map context */
function MapContent({
    activeCheckpoint,
    onProjectionReady,
}: WorldMapProps) {
    const projectionCallbackRef = useRef(false);

    /* We use a hack: the ComposableMap with Marker gives us access to projected
       coordinates through the marker positioning. We'll compute projected coords
       from the projection config directly using d3-geo instead. But for react-simple-maps,
       the easiest approach is to use the Marker component which auto-projects. */

    return (
        <>
            <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#1e2218"
                            stroke="#2a2e20"
                            strokeWidth={0.5}
                            style={{
                                default: { outline: "none", fill: "#1e2218" },
                                hover: { outline: "none", fill: "#1e2218" },
                                pressed: { outline: "none", fill: "#1e2218" },
                            }}
                        />
                    ))
                }
            </Geographies>

            {/* City markers */}
            {WAYPOINTS.map((wp, i) => (
                <Marker key={wp.name} coordinates={wp.coordinates}>
                    {/* Radar ring pulse — only on active checkpoint */}
                    {activeCheckpoint === i && (
                        <>
                            <circle
                                r={12}
                                fill="none"
                                stroke="var(--accent)"
                                strokeWidth={1.5}
                                className="radar-ring"
                            />
                            <circle
                                r={18}
                                fill="none"
                                stroke="var(--accent)"
                                strokeWidth={1}
                                className="radar-ring radar-ring-delay"
                            />
                        </>
                    )}

                    {/* Pin circle */}
                    <circle
                        r={5}
                        fill={activeCheckpoint === i ? "var(--accent)" : "rgba(232,0,61,0.25)"}
                        stroke={activeCheckpoint === i ? "var(--accent)" : "rgba(232,0,61,0.45)"}
                        strokeWidth={activeCheckpoint === i ? 2 : 1.5}
                        className={activeCheckpoint === i ? "pin-active" : ""}
                    />

                    {/* Inner star dot */}
                    <circle
                        r={2}
                        fill={activeCheckpoint === i ? "var(--text)" : "rgba(240,240,240,0.3)"}
                    />

                    {/* City name label */}
                    <text
                        textAnchor="middle"
                        y={-12}
                        style={{
                            fontFamily: "var(--font-label)",
                            fontSize: "5px",
                            fill:
                                activeCheckpoint === i
                                    ? "var(--accent)"
                                    : "rgba(240,240,240,0.4)",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase" as const,
                        }}
                    >
                        {wp.name}
                    </text>
                </Marker>
            ))}
        </>
    );
}

export default function WorldMap({
    activeCheckpoint,
    onProjectionReady,
}: WorldMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const projReadyFired = useRef(false);

    /* After mount, compute projection function using d3-geo directly */
    const setupProjection = useCallback(() => {
        if (projReadyFired.current) return;
        if (!containerRef.current) return;

        /* react-simple-maps uses d3-geoNaturalEarth1 by default.
           We replicate the projection manually to convert lon/lat → screen XY.
           The ComposableMap default width=800, height=600 (SVG viewBox).
           We need to map from SVG coords to screen pixels. */
        const container = containerRef.current;
        const svgEl = container.querySelector("svg");
        if (!svgEl) return;

        const projFn = (coords: [number, number]): [number, number] | null => {
            /* Use the SVG's internal coordinate system via Marker positioning.
               We create a temporary point and read its transform. But simpler:
               use d3-geo imported by react-simple-maps. */

            /* Fallback approach: use manual projection math.
               react-simple-maps default projection is geoEqualEarth (not Natural Earth).
               With our config: rotate=[-10,0,0], center=[0,40], scale=280
               Default SVG viewBox is "0 0 800 600" for ComposableMap (width=800, height=600). */

            /* We'll read the marker elements' positions from the DOM after render */
            return null;
        };

        projReadyFired.current = true;
    }, [onProjectionReady]);

    const readPinPositions = useCallback(() => {
        if (!containerRef.current) return;
        const svgEl = containerRef.current.querySelector("svg");
        if (!svgEl) return;

        /* Select the r=5 pin circles — one per marker, in DOM order.
           getBoundingClientRect().center is the exact rendered pixel center,
           which is identical to where the circle is drawn. */
        const markerGroups = svgEl.querySelectorAll("g.rsm-marker");
        const markerPositions: Array<{
            coords: [number, number];
            screenXY: [number, number];
        }> = [];

        markerGroups.forEach((g, i) => {
            if (i < WAYPOINTS.length) {
                /* The pin circle is the first <circle> child of the marker group */
                const circles = g.querySelectorAll("circle");
                /* Find the r=5 pin circle (skip radar rings which have r=12 and r=18) */
                let pinCircle: Element | null = null;
                circles.forEach((c) => {
                    const r = parseFloat(c.getAttribute("r") || "0");
                    if (Math.abs(r - 5) < 1) pinCircle = c;
                });

                if (!pinCircle) {
                    /* Fallback: use the first circle */
                    pinCircle = circles[0] ?? null;
                }

                if (pinCircle) {
                    const cr = (pinCircle as Element).getBoundingClientRect();
                    const screenX = cr.left + cr.width / 2;
                    const screenY = cr.top + cr.height / 2;
                    markerPositions.push({
                        coords: WAYPOINTS[i].coordinates,
                        screenXY: [screenX, screenY],
                    });
                }
            }
        });

        if (markerPositions.length === WAYPOINTS.length) {
            const projFn = (
                coords: [number, number]
            ): [number, number] | null => {
                const wp = markerPositions.find(
                    (m) =>
                        Math.abs(m.coords[0] - coords[0]) < 0.01 &&
                        Math.abs(m.coords[1] - coords[1]) < 0.01
                );
                if (wp) return wp.screenXY;
                return null;
            };
            onProjectionReady(projFn);
        }
    }, [onProjectionReady]);

    useEffect(() => {
        /* After a short delay for the map to render, read pin circle bounding rects */
        const timer = setTimeout(readPinPositions, 1500);
        return () => clearTimeout(timer);
    }, [readPinPositions]);

    /* Recalculate on resize — re-read bounding rects after layout settles */
    useEffect(() => {
        const handleResize = () => {
            projReadyFired.current = false;
            const timer = setTimeout(readPinPositions, 300);
            return () => clearTimeout(timer);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [readPinPositions]);

    return (
        <div
            ref={containerRef}
            className="world-map-container"
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
            }}
        >
            <ComposableMap
                projection="geoNaturalEarth1"
                projectionConfig={PROJECTION_CONFIG}
                width={800}
                height={600}
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#0d1009",
                }}
            >
                <MapContent
                    activeCheckpoint={activeCheckpoint}
                    onProjectionReady={onProjectionReady}
                />
            </ComposableMap>

            {/* Parchment noise + sepia overlay */}
            <div className="map-parchment-overlay" />
            <div className="map-noise-overlay" />
        </div>
    );
}
