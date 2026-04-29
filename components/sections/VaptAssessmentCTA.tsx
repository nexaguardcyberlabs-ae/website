import { ArrowRight } from "lucide-react";
import Link from "next/link";

/** Stylised half-circle score gauge — purely decorative */
function ScoreGauge() {
  // viewBox 200×110: centre (100,100), radius 70
  // Semicircle arc M30,100 A70,70 0 0 1 170,100 — length ≈ 220px
  // ~70% filled: dasharray="154 66"
  return (
    <div
      aria-hidden="true"
      className="mx-auto mb-4 w-full max-w-[200px]"
      style={{ aspectRatio: "200/110" }}
    >
      <svg
        viewBox="0 0 200 110"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vapt-gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#18A7B7" />
            <stop offset="100%" stopColor="#1F88BF" />
          </linearGradient>
        </defs>

        {/* Track arc */}
        <path
          d="M30 100 A70 70 0 0 1 170 100"
          stroke="rgba(24,167,183,0.12)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Filled arc — ~70% */}
        <path
          d="M30 100 A70 70 0 0 1 170 100"
          stroke="url(#vapt-gauge-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="154 66"
        />

        {/* Tick marks at 0°, 45°, 90°, 135°, 180° */}
        {[180, 135, 90, 45, 0].map((angleDeg) => {
          const rad = (angleDeg * Math.PI) / 180;
          const cx = 100 + 70 * Math.cos(rad);
          const cy = 100 - 70 * Math.sin(rad);
          const ix = 100 + 60 * Math.cos(rad);
          const iy = 100 - 60 * Math.sin(rad);
          return (
            <line
              key={angleDeg}
              x1={cx}
              y1={cy}
              x2={ix}
              y2={iy}
              stroke="rgba(24,167,183,0.3)"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Centre hub */}
        <circle cx="100" cy="100" r="6" fill="rgba(24,167,183,0.35)" />
        <circle cx="100" cy="100" r="3.5" fill="#18A7B7" />

        {/* Score text */}
        <text
          x="100"
          y="82"
          textAnchor="middle"
          fill="white"
          fontFamily="monospace"
          fontSize="26"
          fontWeight="bold"
        >
          74
        </text>
        <text
          x="100"
          y="95"
          textAnchor="middle"
          fill="rgba(24,167,183,0.7)"
          fontSize="8"
          letterSpacing="1.5"
        >
          READINESS SCORE
        </text>

        {/* Low / High end labels */}
        <text x="24" y="108" fill="rgba(255,255,255,0.3)" fontSize="9">Low</text>
        <text x="152" y="108" fill="rgba(255,255,255,0.3)" fontSize="9">High</text>
      </svg>
    </div>
  );
}

export default function VaptAssessmentCTA() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-12"
      style={{ background: "linear-gradient(135deg, #020d14 0%, #021624 50%, #020d14 100%)" }}
    >
      {/* Grid pattern background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(24,167,183,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* ── Left column (50%) — copy, no CTA ── */}
          <div className="flex-1 lg:max-w-[50%]">
            <span className="mb-4 inline-block text-cyan-400 text-xs font-semibold uppercase tracking-[0.3em]">
              Not ready for a call?
            </span>
            <h2 className="mb-5 font-bold text-3xl text-white leading-tight sm:text-4xl">
              Start with a Free Self-Assessment.
            </h2>
            <p className="max-w-xl text-gray-400 text-base leading-relaxed">
              If you&apos;re not yet sure where you stand or what to prioritise,
              our VAPT Readiness Self-Assessment gives you a personalised
              readiness score and specific recommendations — based on your
              answers. No sales call required.
            </p>
          </div>

          {/* ── Right column (50%) — larger interactive card ── */}
          <div className="flex-1 lg:max-w-[50%]">
            <div className="group relative w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/[0.05] p-10 backdrop-blur-sm shadow-[0_8px_40px_rgba(24,167,183,0.1)] transition-all duration-300 hover:border-cyan-400/35 hover:shadow-[0_12px_50px_rgba(24,167,183,0.18)] hover:-translate-y-1">
              {/* Top highlight */}
              <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

              {/* Score gauge — no eyebrow label */}
              <ScoreGauge />

              {/* Title — directly after gauge */}
              <h3 className="mb-4 text-center font-bold text-white text-xl sm:text-2xl">
                VAPT Readiness Self-Assessment
              </h3>

              {/* Hook copy */}
              <p className="mb-2 text-center text-gray-300 text-sm leading-relaxed sm:text-base">
                Most UAE businesses overestimate their security. This 5-minute
                assessment shows you the gap — privately, instantly.
              </p>
              <p className="mb-8 text-center text-gray-400 text-sm">
                15 questions · Personalised score · 3 specific recommendations
              </p>

              {/* CTA */}
              <Link
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-6 py-4 font-semibold text-sm text-white shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[0_0_24px_rgba(24,167,183,0.45)]"
                href="/resources/vapt-readiness-assessment"
              >
                Take the Assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
