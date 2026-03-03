"use client";

import { useEffect, useRef } from "react";

interface Point {
    x: number;
    y: number;
    age: number;
}

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<Point[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
            if (pointsRef.current.length > 50) {
                pointsRef.current.shift();
            }
        };
        window.addEventListener("mousemove", onMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const points = pointsRef.current;

            for (let i = 1; i < points.length; i++) {
                const p = points[i];
                const prev = points[i - 1];
                p.age += 0.02;

                const alpha = Math.max(0, 1 - p.age);
                if (alpha <= 0) continue;

                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(p.x, p.y);
                ctx.strokeStyle = `rgba(232, 0, 61, ${alpha * 0.7})`;
                ctx.lineWidth = Math.max(1, 3 * (1 - p.age));
                ctx.lineCap = "round";
                ctx.stroke();
            }

            // Remove dead points
            pointsRef.current = points.filter((p) => p.age < 1);

            // Draw cursor dot
            ctx.beginPath();
            ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#E8003D";
            ctx.fill();

            // Outer ring
            ctx.beginPath();
            ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(232, 0, 61, 0.4)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            animRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
            aria-hidden="true"
        />
    );
}
