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
    progress: number;
    waypointScreenPositions: Array<[number, number]>;
    onPlanePositionUpdate?: (pos: PlanePosition) => void;
}

const FlightPath = forwardRef<FlightPathHandle, FlightPathProps>(
    function FlightPath(
        { progress, waypointScreenPositions, onPlanePositionUpdate },
        ref
    ) {
        const svgRef = useRef<SVGSVGElement>(null);
        const pathRef = useRef<SVGPathElement>(null);
        const [pathLength, setPathLength] = useState(0);

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

        /* Measure path length after render */
        useEffect(() => {
            if (pathRef.current) {
                setPathLength(pathRef.current.getTotalLength());
            }
        }, [pathD]);

        /* Convert SVG local coords → page coords using the SVG element's offset */
        const svgToPage = useCallback((svgPt: DOMPoint): { x: number; y: number } => {
            if (!svgRef.current) return { x: svgPt.x, y: svgPt.y };
            const rect = svgRef.current.getBoundingClientRect();
            /* The SVG has no viewBox so 1 SVG unit = 1 CSS pixel,
               just offset by the element's page position */
            return {
                x: svgPt.x + rect.left,
                y: svgPt.y + rect.top,
            };
        }, []);

        /* Get exact screen position + heading at given progress */
        const getPlanePosition = useCallback(
            (prog: number): PlanePosition | null => {
                if (!pathRef.current || pathLength <= 0) return null;

                const easedP = getEasedPathProgress(prog, waypointScreenPositions.length);
                const len = easedP * pathLength;
                const svgPt = pathRef.current.getPointAtLength(len);

                /* Heading: sampled 4px ahead for better angle accuracy */
                const aheadLen = Math.min(pathLength, len + 4);
                const aheadSvgPt = pathRef.current.getPointAtLength(aheadLen);

                const dx = aheadSvgPt.x - svgPt.x;
                const dy = aheadSvgPt.y - svgPt.y;
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

                /* Correct SVG coords to page-pixel coords */
                const pagePt = svgToPage(svgPt);

                return { x: pagePt.x, y: pagePt.y, angle };
            },
            [pathLength, waypointScreenPositions.length, svgToPage]
        );

        /* Expose to parent via ref */
        useImperativeHandle(ref, () => ({ getPlanePosition }), [getPlanePosition]);

        /* Report position on every progress change */
        useEffect(() => {
            if (onPlanePositionUpdate) {
                const pos = getPlanePosition(progress);
                if (pos) onPlanePositionUpdate(pos);
            }
        }, [progress, getPlanePosition, onPlanePositionUpdate]);

        if (!pathD) return null;

        const easedP = getEasedPathProgress(progress, waypointScreenPositions.length);
        const dashOffset = pathLength > 0 ? pathLength - easedP * pathLength : pathLength;

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
                    d={pathD}
                    fill="none"
                    stroke="rgba(232,0,61,0.12)"
                    strokeWidth={2}
                    strokeDasharray="8 6"
                />

                {/* Active path — tip tracks the plane */}
                <path
                    ref={pathRef}
                    d={pathD}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2.5}
                    strokeDasharray={pathLength || 5000}
                    strokeDashoffset={dashOffset}
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
