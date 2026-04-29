"use client";

import { useReducedMotion } from "framer-motion";

/**
 * SecurityMeshBackground
 * Animated lattice of connected nodes with light pulses traveling along edges.
 * GPU-accelerated via SVG animateMotion. Respects prefers-reduced-motion.
 */
export default function SecurityMeshBackground({ opacity = 0.18 }: { opacity?: number }) {
  const prefersReduced = useReducedMotion();

  // Node positions (x, y) in a 1400×700 coordinate space
  const nodes = [
    [120, 130], [380, 70],  [640, 160], [920, 80],  [1200, 150], [1360, 90],
    [80,  360], [300, 280], [560, 420], [800, 300], [1060, 380], [1300, 260],
    [180, 560], [480, 600], [760, 520], [1050, 580],[1350, 480],
  ];

  // Edges (zero-based index pairs)
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],        // top row
    [6,7],[7,8],[8,9],[9,10],[10,11],[11,16], // middle row
    [12,13],[13,14],[14,15],[15,16],       // bottom row
    [0,6],[1,7],[2,8],[3,9],[4,10],[5,11], // vertical connectors
    [6,12],[7,13],[8,14],[9,15],[10,16],   // lower verticals
    [1,8],[3,10],[7,14],                   // diagonals
  ];

  // Animated pulse paths (defined as "from node A to node B")
  const pulses = [
    { path: [0,1,2,3,4], dur: "12s", delay: "0s", color: "#18A7B7" },
    { path: [6,7,8,9,10,11], dur: "15s", delay: "3s", color: "#1F88BF" },
    { path: [0,6,12,13,14], dur: "18s", delay: "6s", color: "#18A7B7" },
    { path: [5,11,16,15,14], dur: "14s", delay: "9s", color: "#1F88BF" },
  ];

  const getPathD = (indices: number[]) =>
    indices.map((i, idx) => `${idx === 0 ? "M" : "L"} ${nodes[i][0]} ${nodes[i][1]}`).join(" ");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1400 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Static edges */}
        {edges.map(([a, b], i) => (
          <line
            key={`edge-${i}`}
            x1={nodes[a][0]} y1={nodes[a][1]}
            x2={nodes[b][0]} y2={nodes[b][1]}
            stroke="rgba(24,167,183,0.35)"
            strokeWidth="0.8"
          />
        ))}

        {/* Static nodes */}
        {nodes.map(([x, y], i) => (
          <circle
            key={`node-${i}`}
            cx={x} cy={y} r="3"
            fill="rgba(24,167,183,0.6)"
          />
        ))}

        {/* Animated pulses — disabled for prefers-reduced-motion */}
        {!prefersReduced && pulses.map((pulse, i) => (
          <g key={`pulse-${i}`}>
            {/* Glow circle traveling along the path */}
            <circle r="5" fill="none">
              <animateMotion
                dur={pulse.dur}
                begin={pulse.delay}
                repeatCount="indefinite"
                path={getPathD(pulse.path)}
              />
            </circle>
            <circle r="4" fill={pulse.color} fillOpacity="0.9">
              <animateMotion
                dur={pulse.dur}
                begin={pulse.delay}
                repeatCount="indefinite"
                path={getPathD(pulse.path)}
              />
            </circle>
            {/* Soft outer glow */}
            <circle r="10" fill={pulse.color} fillOpacity="0.2">
              <animateMotion
                dur={pulse.dur}
                begin={pulse.delay}
                repeatCount="indefinite"
                path={getPathD(pulse.path)}
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
