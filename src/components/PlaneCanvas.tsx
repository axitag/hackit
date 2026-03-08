"use client";

import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import DC3Plane from "./DC3Plane";
import * as THREE from "three";
import { getEasedPathProgress } from "@/lib/pathUtils";

/* ─────────────────────────────────────────────
   R3F Canvas overlay — transparent, pointer-events: none.
   Full flight physics: banking, pitch, turbulence,
   shadow position reporting.
   ───────────────────────────────────────────── */

interface PlaneCanvasProps {
    progress: number;
    waypointScreenPositions: Array<[number, number]>;
    breakout: boolean;
    onBreakoutComplete: () => void;
    onPlaneScreenPos?: (x: number, y: number, bankAngle: number) => void;
}

/* ═══════════════════════════════════════════════
   PLANE CONTROLLER — full flight physics
   ═══════════════════════════════════════════════ */
function PlaneController({
    progress,
    waypoints,
    breakout,
    onBreakoutComplete,
    onScreenPos,
}: {
    progress: number;
    waypoints: Array<[number, number]>;
    breakout: boolean;
    onBreakoutComplete: () => void;
    onScreenPos?: (x: number, y: number, bankAngle: number) => void;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const prevPos = useRef<[number, number]>([0, 0]);
    const prevHeading = useRef(0);
    const smoothBank = useRef(0);
    const smoothPitch = useRef(0);
    const smoothYaw = useRef(0);
    const breakoutStartTime = useRef<number | null>(null);
    const breakoutDone = useRef(false);

    const numSegments = useMemo(
        () => Math.max(1, waypoints.length - 1),
        [waypoints.length]
    );

    useFrame(({ viewport, clock }) => {
        if (!groupRef.current || waypoints.length < 2) return;

        /* ═══ BREAKOUT MODE ═══ */
        if (breakout) {
            if (breakoutStartTime.current === null) {
                breakoutStartTime.current = clock.getElapsedTime();
            }
            const elapsed = clock.getElapsedTime() - breakoutStartTime.current;
            const BD = 2.5, FD = 0.5;

            if (elapsed <= BD) {
                const t = elapsed / BD;
                const eased = t * t * t;
                groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.08);
                groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.08);
                groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.06);
                groupRef.current.position.z = eased * 80;
                const s = 0.4 + eased * 4;
                groupRef.current.scale.set(s, s, s);
            } else if (elapsed <= BD + FD) {
                groupRef.current.position.z = 80;
                groupRef.current.scale.set(4.4, 4.4, 4.4);
            } else if (!breakoutDone.current) {
                breakoutDone.current = true;
                onBreakoutComplete();
            }
            return;
        }

        /* ═══ NORMAL FLIGHT ═══ */
        const easedPath = getEasedPathProgress(progress, waypoints.length);
        const { width, height } = viewport;
        const time = clock.getElapsedTime();

        /* Segment + local t */
        const rawSeg = easedPath * numSegments;
        const segIdx = Math.min(Math.floor(rawSeg), numSegments - 1);
        const localT = rawSeg - segIdx;

        const from = waypoints[segIdx];
        const to = waypoints[segIdx + 1];
        if (!from || !to) return;

        const sw = typeof window !== "undefined" ? window.innerWidth : 1;
        const sh = typeof window !== "undefined" ? window.innerHeight : 1;

        const fx = ((from[0] / sw) * 2 - 1) * (width / 2);
        const fy = (-(from[1] / sh) * 2 + 1) * (height / 2);
        const tx = ((to[0] / sw) * 2 - 1) * (width / 2);
        const ty = (-(to[1] / sh) * 2 + 1) * (height / 2);

        const x = fx + (tx - fx) * localT;
        const y = fy + (ty - fy) * localT;

        /* ── TURBULENCE (additive) ── */
        const bobY = Math.sin(time * 1.2) * 0.04;
        const turbRoll = Math.sin(time * 0.8) * 0.006;
        const turbYaw = Math.sin(time * 0.5) * 0.003;

        /* Position: elevated at z=3 for depth + bob */
        groupRef.current.position.set(x, y + bobY, 3);

        /* ── HEADING ── */
        const dx = x - prevPos.current[0];
        const dy = y - prevPos.current[1];
        const heading = Math.atan2(dy, dx);

        /* ── BANKING ── */
        const headingDelta = heading - prevHeading.current;
        /* Wrap to [-π, π] */
        const wrappedDelta =
            ((headingDelta + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
        const MAX_BANK = (25 * Math.PI) / 180; // 25 degrees
        const targetBank = THREE.MathUtils.clamp(wrappedDelta * 8, -MAX_BANK, MAX_BANK);
        smoothBank.current = THREE.MathUtils.lerp(smoothBank.current, targetBank, 0.06);

        /* ── PITCH (per-segment sine: climb → cruise → descent) ── */
        const pitchUp = (8 * Math.PI) / 180;
        const pitchDown = (5 * Math.PI) / 180;
        /* sine curve: 0 → peak at 0.3 → 0 at 0.7 → trough at 1.0 */
        let targetPitch = 0;
        if (localT < 0.3) {
            targetPitch = pitchUp * Math.sin((localT / 0.3) * (Math.PI / 2));
        } else if (localT < 0.7) {
            const cruiseT = (localT - 0.3) / 0.4;
            targetPitch = pitchUp * Math.cos(cruiseT * (Math.PI / 2));
        } else {
            const descT = (localT - 0.7) / 0.3;
            targetPitch = -pitchDown * Math.sin(descT * (Math.PI / 2));
        }
        smoothPitch.current = THREE.MathUtils.lerp(smoothPitch.current, targetPitch, 0.05);

        /* ── RUDDER YAW ── */
        const MAX_YAW = (5 * Math.PI) / 180;
        const targetYaw = THREE.MathUtils.clamp(-wrappedDelta * 3, -MAX_YAW, MAX_YAW);
        smoothYaw.current = THREE.MathUtils.lerp(smoothYaw.current, targetYaw, 0.05);

        /* ── Apply rotations ── */
        /* Top-down view: base rotation -π/2 on X shows the top of the plane.
           Heading → Z rotation (yaw in top-down).
           Bank → subtle X tilt. Pitch → subtle Y tilt. */
        const baseX = -Math.PI / 2; // tilt plane so camera sees the top (wings)
        groupRef.current.rotation.x = baseX + smoothPitch.current * 0.4;
        /* Heading as Z rotation — nose points in flight direction */
        groupRef.current.rotation.z = heading + smoothBank.current * 0.5 + turbRoll;
        /* Subtle yaw */
        groupRef.current.rotation.y = smoothYaw.current + turbYaw;

        prevPos.current = [x, y];
        prevHeading.current = heading;

        /* ── Report screen position for shadow ── */
        if (onScreenPos) {
            /* Convert world XY back to screen coords */
            const screenX = ((x / (width / 2) + 1) / 2) * sw;
            const screenY = ((-y / (height / 2) + 1) / 2) * sh;
            onScreenPos(screenX, screenY, smoothBank.current);
        }
    });

    return (
        <group ref={groupRef} scale={[0.4, 0.4, 0.4]}>
            <DC3Plane />
        </group>
    );
}

/* ─── Breakout scene overlay ─── */
function BreakoutBlurOverlay({ breakout }: { breakout: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const startTime = useRef<number | null>(null);

    useFrame(({ clock }) => {
        if (!breakout || !meshRef.current) return;
        if (startTime.current === null) startTime.current = clock.getElapsedTime();
        const t = Math.min(1, (clock.getElapsedTime() - startTime.current) / 2.5);
        (meshRef.current.material as THREE.MeshBasicMaterial).opacity = t * 0.15;
    });

    if (!breakout) return null;
    return (
        <mesh ref={meshRef} position={[0, 0, 90]}>
            <planeGeometry args={[200, 200]} />
            <meshBasicMaterial color="#000000" transparent opacity={0} />
        </mesh>
    );
}

/* ═══════════════════════════════════════════════
   EXPORTED COMPONENT
   ═══════════════════════════════════════════════ */
export default function PlaneCanvas({
    progress,
    waypointScreenPositions,
    breakout,
    onBreakoutComplete,
    onPlaneScreenPos,
}: PlaneCanvasProps) {
    if (waypointScreenPositions.length < 2) return null;

    const blurStyle: React.CSSProperties = breakout
        ? {
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
            transition: "filter 2.5s ease-in",
            filter: "blur(6px)",
        }
        : {
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
            filter: "blur(0px)",
        };

    return (
        <div style={blurStyle}>
            <Canvas
                orthographic
                camera={{
                    zoom: 50,
                    position: [0, 0, 100],   // straight-down top view
                    near: 0.1,
                    far: 1000,
                }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent" }}
            >
                {/* ── Improved lighting ── */}
                {/* Main warm directional from upper-left at ~45° */}
                <directionalLight
                    position={[-5, 10, 8]}
                    intensity={1.4}
                    color="#fff5e0"
                />
                {/* Cool ambient sky bounce */}
                <ambientLight intensity={0.4} color="#c0d0e0" />
                {/* Hemisphere: olive sky + parchment ground */}
                <hemisphereLight
                    args={["#b0c4a0", "#4a3c20", 0.6]}
                />
                {/* Subtle fill from below-right */}
                <directionalLight
                    position={[4, -3, 5]}
                    intensity={0.2}
                    color="#8a9068"
                />

                <PlaneController
                    progress={progress}
                    waypoints={waypointScreenPositions}
                    breakout={breakout}
                    onBreakoutComplete={onBreakoutComplete}
                    onScreenPos={onPlaneScreenPos}
                />
                <BreakoutBlurOverlay breakout={breakout} />
            </Canvas>
        </div>
    );
}
