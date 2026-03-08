/**
 * Computes the eased progress along the flight path.
 * Both PlaneCanvas and FlightPath use this so they stay in sync.
 *
 * @param progress  raw 0–1 scroll progress
 * @param numWaypoints  number of waypoints (segments = numWaypoints - 1)
 * @returns 0–1 value representing how far along the path the plane actually is
 */
export function getEasedPathProgress(progress: number, numWaypoints: number): number {
    if (numWaypoints < 2) return 0;
    const t = Math.max(0, Math.min(1, progress));
    const numSegments = numWaypoints - 1;

    // Which segment index
    const rawSegIdx = t * numSegments;
    const segIdx = Math.min(Math.floor(rawSegIdx), numSegments - 1);

    // t within this segment (0–1)
    const segT = rawSegIdx - segIdx;

    // Smoothstep easing within the segment
    const easedSegT = segT * segT * (3 - 2 * segT);

    // Final path fraction: completed segments + eased position in current segment
    return (segIdx + easedSegT) / numSegments;
}
