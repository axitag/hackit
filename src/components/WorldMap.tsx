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
        event: "Opening Ceremony",
        date: "DAY 1 — 09:00",
        desc: "🎤 The grand opening — all operatives assemble for mission briefing.",
    },
    {
        name: "Dublin",
        coordinates: [-6.2603, 53.3498],
        event: "Hacking Begins",
        date: "DAY 1 — 10:00",
        desc: "⚡ Code-breakers deploy to stations. The clock starts now.",
    },
    {
        name: "London",
        coordinates: [-0.1276, 51.5074],
        event: "Lunch Break",
        date: "DAY 1 — 13:00",
        desc: "🍕 Refuel and regroup. Rations are served at the mess hall.",
    },
    {
        name: "Berlin",
        coordinates: [13.405, 52.52],
        event: "Mentor Sessions",
        date: "DAY 1 — 18:00",
        desc: "🧠 Senior operatives provide tactical guidance to field teams.",
    },
    {
        name: "Rome",
        coordinates: [12.4964, 41.9028],
        event: "Morning Check-in",
        date: "DAY 2 — 09:00",
        desc: "☀️ All units report status. Day two operations commence.",
    },
    {
        name: "Istanbul",
        coordinates: [28.9784, 41.0082],
        event: "Submissions Close",
        date: "DAY 2 — 14:00",
        desc: "🏁 Final intel packages must be filed. Late submissions will be burned.",
    },
    {
        name: "Athens",
        coordinates: [23.7275, 37.9838],
        event: "Judging",
        date: "DAY 2 — 15:00",
        desc: "⚖️ The tribunal reviews all submitted dossiers for merit.",
    },
    {
        name: "Cairo",
        coordinates: [31.2357, 30.0444],
        event: "Closing & Awards",
        date: "DAY 2 — 17:00",
        desc: "🏆 The most cunning operatives are decorated. Mission complete.",
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
                            fill="#1a1220"
                            stroke="#2a1e30"
                            strokeWidth={0.5}
                            style={{
                                default: { outline: "none", fill: "#1a1220" },
                                hover: { outline: "none", fill: "#1a1220" },
                                pressed: { outline: "none", fill: "#1a1220" },
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

const WorldMapInner = function WorldMap({
    activeCheckpoint,
    onProjectionReady,
}: WorldMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const projReadyFired = useRef(false);

    const readPinPositions = useCallback(() => {
        if (!containerRef.current) return;
        const svgEl = containerRef.current.querySelector("svg");
        if (!svgEl) return;

        const markerGroups = svgEl.querySelectorAll("g.rsm-marker");
        const markerPositions: Array<{
            coords: [number, number];
            screenXY: [number, number];
        }> = [];

        markerGroups.forEach((g, i) => {
            if (i < WAYPOINTS.length) {
                const circles = g.querySelectorAll("circle");
                let pinCircle: SVGCircleElement | null = null;
                circles.forEach((c) => {
                    const r = parseFloat(c.getAttribute("r") || "0");
                    if (Math.abs(r - 5) < 1) pinCircle = c as SVGCircleElement;
                });

                if (!pinCircle) {
                    pinCircle = (circles[0] as SVGCircleElement) ?? null;
                }

                if (pinCircle) {
                    /* Get the SVG coordinates completely independent of CSS transforms */
                    const svgRect = svgEl.getBoundingClientRect();
                    const pinRect = pinCircle.getBoundingClientRect();

                    /* This gives the screenxy relative to the top-left of the SVG element itself,
                       which matches what FlightPath gives us for plane positions,
                       because both use the same layout dimensions unnaffected by the -50% translation offset */
                    const screenX = pinRect.left - svgRect.left + pinRect.width / 2;
                    const screenY = pinRect.top - svgRect.top + pinRect.height / 2;

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
        const timer = setTimeout(readPinPositions, 1500);
        return () => clearTimeout(timer);
    }, [readPinPositions]);

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
                    background: "#0f0a14",
                }}
            >
                <MapContent
                    activeCheckpoint={activeCheckpoint}
                    onProjectionReady={onProjectionReady}
                />
            </ComposableMap>

            {/* Parchment noise + sepia overlay */}
            {/* <div className="map-parchment-overlay" />
            <div className="map-noise-overlay" /> */}
        </div>
    );
};

/* PERF: Only re-render when activeCheckpoint changes.
   onProjectionReady is a stable useCallback from the parent. */
const WorldMap = React.memo(WorldMapInner, (prev, next) => {
    return prev.activeCheckpoint === next.activeCheckpoint;
});

export default WorldMap;
