"use client";

import React, {
    useMemo,
    useRef,
    useEffect,
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from "react";
import { getEasedPathProgress } from "@/lib/pathUtils";

/* ─────────────────────────────────────────────
   Progressive red dashed flight path.
   Exposes exact plane screen-pixel position
   via getPointAtLength() with SVG-to-page
   coordinate correction.
   
   PERF: Uses custom event listener for progress
   updates and direct DOM manipulation for dash
   offset — avoids React re-renders on scroll.
   ───────────────────────────────────────────── */

export interface PlanePosition {
    x: number;   // screen pixel X (page coords)
    y: number;   // screen pixel Y (page coords)
    angle: number; // heading in degrees
}

export interface FlightPathHandle {
    getPlanePosition: (progress: number) => PlanePosition | null;
}

interface FlightPathProps {
    progress: number;  // initial progress only, updates via custom event
    waypointScreenPositions: Array<[number, number]>;
    onPlanePositionUpdate?: (pos: PlanePosition) => void;
}

const FlightPath = forwardRef<FlightPathHandle, FlightPathProps>(
    function FlightPath(
        { progress: initialProgress, waypointScreenPositions, onPlanePositionUpdate },
        ref
    ) {
        const svgRef = useRef<SVGSVGElement>(null);
        const pathRef = useRef<SVGPathElement>(null);
        const previewPathRef = useRef<SVGPathElement>(null);
        const pathLengthRef = useRef(0);
        const [pathReady, setPathReady] = useState(false);
        const onPlanePositionUpdateRef = useRef(onPlanePositionUpdate);
        onPlanePositionUpdateRef.current = onPlanePositionUpdate;

        /* Catmull-Rom → cubic bezier: passes exactly through every waypoint */
        const pathD = useMemo(() => {
            const pts = waypointScreenPositions;
            if (pts.length < 2) return "";

            let d = `M ${pts[0][0]} ${pts[0][1]}`;
            const tension = 0.3;

            for (let i = 0; i < pts.length - 1; i++) {
                const p0 = pts[Math.max(0, i - 1)];
                const p1 = pts[i];
                const p2 = pts[i + 1];
                const p3 = pts[Math.min(pts.length - 1, i + 2)];

                const t1x = (p2[0] - p0[0]) * tension;
                const t1y = (p2[1] - p0[1]) * tension;
                const t2x = (p3[0] - p1[0]) * tension;
                const t2y = (p3[1] - p1[1]) * tension;

                const cp1x = p1[0] + t1x / 3;
                const cp1y = p1[1] + t1y / 3;
                const cp2x = p2[0] - t2x / 3;
                const cp2y = p2[1] - t2y / 3;

                d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
            }
            return d;
        }, [waypointScreenPositions]);

        /* Measure path length after render — retry until browser has laid out the path */
        useEffect(() => {
            if (!pathRef.current) return;

            let attempts = 0;
            const maxAttempts = 30; // try for up to 3 seconds

            const measure = () => {
                if (!pathRef.current) return;
                const len = pathRef.current.getTotalLength();
                if (len > 0) {
                    pathLengthRef.current = len;
                    setPathReady(true);
                    return true;
                }
                return false;
            };

            /* Try immediately first */
            if (measure()) return;

            /* Retry with interval if immediate measurement failed */
            const interval = setInterval(() => {
                attempts++;
                if (measure() || attempts >= maxAttempts) {
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);
        }, [pathD]);

        /* Get exact screen position + heading at given progress */
        const getPlanePosition = useCallback(
            (prog: number): PlanePosition | null => {
                const pathLength = pathLengthRef.current;
                if (!pathRef.current || pathLength <= 0) return null;

                const easedP = getEasedPathProgress(prog, waypointScreenPositions.length);
                const len = easedP * pathLength;
                const svgPt = pathRef.current.getPointAtLength(len);

                const aheadLen = Math.min(pathLength, len + 4);
                const aheadSvgPt = pathRef.current.getPointAtLength(aheadLen);

                const dx = aheadSvgPt.x - svgPt.x;
                const dy = aheadSvgPt.y - svgPt.y;
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

                return { x: svgPt.x, y: svgPt.y, angle };
            },
            [waypointScreenPositions.length]
        );

        /* Expose to parent via ref */
        useImperativeHandle(ref, () => ({ getPlanePosition }), [getPlanePosition]);

        /* ─── Listen for progress updates via custom event (no React state) ─── */
        useEffect(() => {
            if (!pathReady) return;

            const handleProgress = (e: Event) => {
                const progress = (e as CustomEvent).detail as number;
                const pathLength = pathLengthRef.current;
                if (!pathRef.current || pathLength <= 0) return;

                /* Update dash offset directly via DOM */
                const easedP = getEasedPathProgress(progress, waypointScreenPositions.length);
                const dashOffset = pathLength - easedP * pathLength;
                pathRef.current.style.strokeDasharray = String(pathLength);
                pathRef.current.style.strokeDashoffset = String(dashOffset);

                /* Compute and report plane position */
                if (onPlanePositionUpdateRef.current) {
                    const pos = getPlanePosition(progress);
                    if (pos) onPlanePositionUpdateRef.current(pos);
                }
            };

            window.addEventListener('noir-progress', handleProgress);

            /* Fire initial position */
            handleProgress(new CustomEvent('noir-progress', { detail: 0 }));

            return () => window.removeEventListener('noir-progress', handleProgress);
        }, [pathReady, waypointScreenPositions.length, getPlanePosition]);

        if (!pathD) return null;

        const pathLength = pathLengthRef.current || 5000;

        return (
            <svg
                ref={svgRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 5,
                    pointerEvents: "none",
                    overflow: "visible",
                }}
            >
                {/* Dim full path preview */}
                <path
                    ref={previewPathRef}
                    d={pathD}
                    fill="none"
                    stroke="rgba(232,0,61,0.12)"
                    strokeWidth={2}
                    strokeDasharray="8 6"
                />

                {/* Active path — tip tracks the plane, updated via DOM */}
                <path
                    ref={pathRef}
                    d={pathD}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2.5}
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength}
                    strokeLinecap="round"
                    style={{
                        filter: "drop-shadow(0 0 4px var(--accent-glow))",
                    }}
                />
            </svg>
        );
    }
);

export default FlightPath;
