"use client";

import { useReducedMotion } from "framer-motion";

interface MeshGradientBackgroundProps {
  className?: string;
}

export default function MeshGradientBackground({ className = "" }: MeshGradientBackgroundProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Static base radial */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(24,167,183,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(31,136,191,0.1) 0%, transparent 60%)",
        }}
      />

      {/* Animated blobs — disabled for prefers-reduced-motion */}
      {!prefersReduced && (
        <>
          <div
            className="absolute h-[500px] w-[500px] rounded-full blur-[120px]"
            style={{
              background: "rgba(24,167,183,0.15)",
              top: "10%",
              left: "15%",
              animation: "mesh-drift-1 28s ease-in-out infinite alternate",
              willChange: "transform",
            }}
          />
          <div
            className="absolute h-[400px] w-[400px] rounded-full blur-[100px]"
            style={{
              background: "rgba(31,136,191,0.12)",
              bottom: "10%",
              right: "20%",
              animation: "mesh-drift-2 32s ease-in-out infinite alternate",
              willChange: "transform",
            }}
          />
          <div
            className="absolute h-[300px] w-[300px] rounded-full blur-[80px]"
            style={{
              background: "rgba(24,167,183,0.08)",
              top: "50%",
              right: "10%",
              animation: "mesh-drift-3 25s ease-in-out infinite alternate",
              willChange: "transform",
            }}
          />
        </>
      )}
    </div>
  );
}
