"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   WWII DC-3 Twin-Engine Plane — Built from
   Three.js primitives. Olive-green fuselage,
   twin radial engines, ribbed wings, spinning
   propellers with motion-blur discs.
   ───────────────────────────────────────────── */

const OLIVE = "#5a6340";
const OLIVE_DARK = "#3d4430";
const OLIVE_LIGHT = "#6b7550";
const METAL = "#4a4a40";
const GLASS = "#8a9a7a";

export default function DC3Plane() {
    const leftPropRef = useRef<THREE.Mesh>(null);
    const rightPropRef = useRef<THREE.Mesh>(null);
    const leftDiscRef = useRef<THREE.Mesh>(null);
    const rightDiscRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        const speed = delta * 25;
        if (leftPropRef.current) leftPropRef.current.rotation.z += speed;
        if (rightPropRef.current) rightPropRef.current.rotation.z += speed;
        /* Blur discs spin slower for visual effect */
        if (leftDiscRef.current) leftDiscRef.current.rotation.z += speed * 0.3;
        if (rightDiscRef.current) rightDiscRef.current.rotation.z += speed * 0.3;
    });

    return (
        <group scale={[1, 1, 1]}>
            {/* ══════ FUSELAGE ══════ */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.28, 0.22, 2.8, 12]} />
                <meshStandardMaterial color={OLIVE} roughness={0.8} metalness={0.1} />
            </mesh>

            {/* Nose cone */}
            <mesh position={[1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <coneGeometry args={[0.22, 0.5, 12]} />
                <meshStandardMaterial color={OLIVE_DARK} roughness={0.7} metalness={0.2} />
            </mesh>

            {/* Tail taper */}
            <mesh position={[-1.55, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.22, 0.6, 12]} />
                <meshStandardMaterial color={OLIVE} roughness={0.8} metalness={0.1} />
            </mesh>

            {/* Cockpit glass */}
            <mesh position={[0.7, 0.2, 0]}>
                <sphereGeometry args={[0.22, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial
                    color={GLASS}
                    roughness={0.2}
                    metalness={0.3}
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* ══════ MAIN WINGS ══════ */}
            <mesh position={[0, 0, 1.8]}>
                <boxGeometry args={[1.2, 0.06, 2.8]} />
                <meshStandardMaterial color={OLIVE_LIGHT} roughness={0.8} />
            </mesh>
            <mesh position={[0, 0, -1.8]}>
                <boxGeometry args={[1.2, 0.06, 2.8]} />
                <meshStandardMaterial color={OLIVE_LIGHT} roughness={0.8} />
            </mesh>

            {/* Wing ribs — right */}
            {[-0.4, -0.1, 0.2, 0.5].map((x, i) => (
                <mesh key={`rib-r-${i}`} position={[x, 0.035, 1.8]}>
                    <boxGeometry args={[0.02, 0.03, 2.8]} />
                    <meshStandardMaterial color={OLIVE_DARK} roughness={0.9} />
                </mesh>
            ))}
            {/* Wing ribs — left */}
            {[-0.4, -0.1, 0.2, 0.5].map((x, i) => (
                <mesh key={`rib-l-${i}`} position={[x, 0.035, -1.8]}>
                    <boxGeometry args={[0.02, 0.03, 2.8]} />
                    <meshStandardMaterial color={OLIVE_DARK} roughness={0.9} />
                </mesh>
            ))}

            {/* ══════ ENGINES + PROPELLERS ══════ */}
            {[1.6, -1.6].map((zPos) => (
                <group key={`engine-${zPos}`} position={[0.15, -0.1, zPos]}>
                    {/* Engine nacelle */}
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.18, 0.2, 0.7, 10]} />
                        <meshStandardMaterial color={METAL} roughness={0.6} metalness={0.3} />
                    </mesh>
                    {/* Radial engine front */}
                    <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.16, 0.18, 0.1, 10]} />
                        <meshStandardMaterial color={OLIVE_DARK} roughness={0.5} metalness={0.4} />
                    </mesh>
                    {/* Propeller hub */}
                    <mesh position={[0.48, 0, 0]}>
                        <sphereGeometry args={[0.06, 8, 8]} />
                        <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.5} />
                    </mesh>
                    {/* Propeller blades */}
                    <mesh
                        ref={zPos > 0 ? rightPropRef : leftPropRef}
                        position={[0.52, 0, 0]}
                        rotation={[0, Math.PI / 2, 0]}
                    >
                        <boxGeometry args={[0.8, 0.04, 0.01]} />
                        <meshStandardMaterial
                            color="#2a2a20"
                            roughness={0.7}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    {/* ── Motion-blur disc (semi-transparent, simulates spinning blur) ── */}
                    <mesh
                        ref={zPos > 0 ? rightDiscRef : leftDiscRef}
                        position={[0.53, 0, 0]}
                        rotation={[0, Math.PI / 2, 0]}
                    >
                        <circleGeometry args={[0.38, 24]} />
                        <meshBasicMaterial
                            color="#4a4a40"
                            transparent
                            opacity={0.18}
                            side={THREE.DoubleSide}
                            depthWrite={false}
                        />
                    </mesh>
                </group>
            ))}

            {/* ══════ TAIL ══════ */}
            <mesh position={[-1.7, 0.4, 0]}>
                <boxGeometry args={[0.5, 0.7, 0.04]} />
                <meshStandardMaterial color={OLIVE} roughness={0.8} />
            </mesh>
            <mesh position={[-1.85, 0.45, 0]}>
                <boxGeometry args={[0.15, 0.6, 0.045]} />
                <meshStandardMaterial color={OLIVE_DARK} roughness={0.8} />
            </mesh>
            <mesh position={[-1.65, 0.1, 0]}>
                <boxGeometry args={[0.4, 0.04, 1.2]} />
                <meshStandardMaterial color={OLIVE_LIGHT} roughness={0.8} />
            </mesh>

            {/* ══════ LANDING GEAR ══════ */}
            {[1.2, -1.2].map((z) => (
                <group key={`gear-${z}`}>
                    <mesh position={[0, -0.45, z]} rotation={[0, 0, 0.15 * Math.sign(z)]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
                        <meshStandardMaterial color={METAL} roughness={0.5} metalness={0.4} />
                    </mesh>
                    <mesh position={[0, -0.7, z]}>
                        <sphereGeometry args={[0.08, 8, 8]} />
                        <meshStandardMaterial color="#1a1a14" roughness={0.9} />
                    </mesh>
                </group>
            ))}
            <mesh position={[-1.5, -0.3, 0]}>
                <sphereGeometry args={[0.04, 6, 6]} />
                <meshStandardMaterial color="#1a1a14" roughness={0.9} />
            </mesh>

            {/* ══════ BELLY STRIPE ══════ */}
            <mesh position={[0, -0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.29, 0.23, 2.0, 12, 1, false, Math.PI * 0.7, Math.PI * 0.6]} />
                <meshStandardMaterial color={OLIVE_DARK} roughness={0.8} metalness={0.1} />
            </mesh>
        </group>
    );
}
