interface RadialGlowBackgroundProps {
  className?: string;
  // "top-right-bottom-left" is the default; "center" focuses the glow centrally
  variant?: "corners" | "center" | "top" | "bottom";
}

export default function RadialGlowBackground({
  className = "",
  variant = "corners",
}: RadialGlowBackgroundProps) {
  const glowMap: Record<string, string> = {
    corners:
      "radial-gradient(ellipse 60% 50% at 90% 10%, rgba(24,167,183,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 90%, rgba(31,136,191,0.10) 0%, transparent 60%)",
    center:
      "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(24,167,183,0.14) 0%, transparent 65%)",
    top:
      "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(24,167,183,0.12) 0%, transparent 60%)",
    bottom:
      "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(31,136,191,0.12) 0%, transparent 60%)",
  };

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div
        className="absolute inset-0"
        style={{ background: glowMap[variant] ?? glowMap.corners }}
      />
    </div>
  );
}
