interface GridPatternBackgroundProps {
  className?: string;
  dotGrid?: boolean;
}

export default function GridPatternBackground({
  className = "",
  dotGrid = false,
}: GridPatternBackgroundProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dotGrid ? (
        // Dot grid variant
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(24,167,183,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      ) : (
        // Line grid variant
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(24,167,183,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,167,183,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {/* Subtle radial fade to make grid feel grounded */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, transparent 40%, rgba(1,12,19,0.6) 100%)",
        }}
      />
    </div>
  );
}
