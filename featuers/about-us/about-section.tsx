"use client";

import { easeOut, motion, useReducedMotion } from "framer-motion";

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.1 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

/** Treatment B — Animated Network Node Diagram */
function NetworkNodeDiagram() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative flex h-[340px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#010C13] sm:h-[420px]">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(24,167,183,0.08) 0%, transparent 70%)",
        }}
      />

      <svg
        aria-hidden="true"
        className="h-full w-full"
        fill="none"
        viewBox="0 0 400 360"
      >
        {/* Connecting lines */}
        <g stroke="rgba(24,167,183,0.25)" strokeWidth="1">
          <line x1="200" y1="180" x2="100" y2="100" />
          <line x1="200" y1="180" x2="300" y2="100" />
          <line x1="200" y1="180" x2="80" y2="230" />
          <line x1="200" y1="180" x2="320" y2="230" />
          <line x1="200" y1="180" x2="200" y2="60" />
          <line x1="200" y1="180" x2="160" y2="290" />
          <line x1="200" y1="180" x2="240" y2="290" />
          <line x1="100" y1="100" x2="200" y2="60" />
          <line x1="300" y1="100" x2="200" y2="60" />
        </g>

        {/* Animated light pulses along lines */}
        {!prefersReduced && (
          <g>
            <circle r="3" fill="rgba(24,167,183,0.8)">
              <animateMotion dur="3s" repeatCount="indefinite">
                <mpath href="#path1" />
              </animateMotion>
            </circle>
            <circle r="2.5" fill="rgba(31,136,191,0.7)">
              <animateMotion begin="1s" dur="4s" repeatCount="indefinite">
                <mpath href="#path2" />
              </animateMotion>
            </circle>
            <circle r="2" fill="rgba(24,167,183,0.6)">
              <animateMotion begin="2s" dur="3.5s" repeatCount="indefinite">
                <mpath href="#path3" />
              </animateMotion>
            </circle>
          </g>
        )}

        {/* Path definitions for animation */}
        <defs>
          <path d="M200,180 L100,100" id="path1" />
          <path d="M200,180 L320,230" id="path2" />
          <path d="M200,180 L200,60" id="path3" />
        </defs>

        {/* Outer satellite nodes */}
        <g fill="rgba(24,167,183,0.5)" stroke="rgba(24,167,183,0.3)" strokeWidth="1">
          <circle cx="100" cy="100" r="5" />
          <circle cx="300" cy="100" r="5" />
          <circle cx="80" cy="230" r="5" />
          <circle cx="320" cy="230" r="5" />
          <circle cx="200" cy="60" r="4" />
          <circle cx="160" cy="290" r="4" />
          <circle cx="240" cy="290" r="4" />
        </g>

        {/* Centre node */}
        <circle cx="200" cy="180" fill="rgba(24,167,183,0.15)" r="22" stroke="rgba(24,167,183,0.5)" strokeWidth="1.5" />
        <circle cx="200" cy="180" fill="rgba(24,167,183,0.6)" r="8" />

        {/* Pulsing ring on centre */}
        {!prefersReduced && (
          <circle cx="200" cy="180" fill="none" r="22" stroke="rgba(24,167,183,0.4)" strokeWidth="1">
            <animate attributeName="r" dur="2.5s" repeatCount="indefinite" values="22;38;22" />
            <animate attributeName="opacity" dur="2.5s" repeatCount="indefinite" values="0.4;0;0.4" />
          </circle>
        )}
      </svg>
    </div>
  );
}

/** Treatment C — Quote Block */
function QuoteBlock() {
  return (
    <div className="relative flex h-[340px] w-full flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#010C13] p-10 sm:h-[420px]">
      {/* Accent bar */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-blue-500" />

      {/* Large decorative quote mark */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-6 font-serif text-[120px] leading-none text-cyan-400/10 select-none"
      >
        &ldquo;
      </span>

      <div className="relative z-10 space-y-6">
        <p className="text-lg text-gray-200 leading-relaxed sm:text-xl">
          The modern enterprise faces a paradox. Digital acceleration is
          essential for growth, yet it expands risk. Nexaguard was founded to
          close this gap — bringing senior-led cybersecurity expertise to the
          businesses that need it most but are under-served by enterprise
          consultancies and overpaying local boutiques.
        </p>
        <div className="h-px w-12 bg-cyan-400/40" />
        <p className="font-semibold text-cyan-400 text-sm uppercase tracking-widest">
          Our Origin
        </p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-[#010C13] py-24 lg:py-32">
      {/* Background Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        {/* ==================== ROW 1: Who We Are ==================== */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text */}
          <motion.div
            initial="hidden"
            variants={fadeLeft}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <span className="mb-4 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
              The Origin
            </span>
            <h2 className="mb-8 font-bold text-3xl text-white tracking-tight sm:text-4xl lg:text-5xl">
              Why We Built{" "}
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Nexaguard.
              </span>
            </h2>
            <div className="space-y-5 text-base text-gray-300 leading-relaxed sm:text-lg">
              <p>
                Most UAE mid-market businesses fall into a familiar gap. Big4
                firms are out of budget — and assign juniors when you do hire
                them. Local boutiques are unpredictable in quality.
                Group-backed enterprise vendors aren&apos;t built for SME
                engagement cycles.
              </p>
              <p>
                We built Nexaguard for the companies in this gap. Senior
                practitioners doing the actual work. Honest scoping that tells
                you what you need rather than what we&apos;d like to sell.
                Reports written for the people who have to act on them — not
                for shelves.
              </p>
              <p>
                This isn&apos;t a critique of how the industry operates.
                It&apos;s just an observation that there&apos;s a category of
                businesses being under-served. We exist to serve them well.
              </p>
            </div>
          </motion.div>

          {/* Network node diagram */}
          <motion.div
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <NetworkNodeDiagram />
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="my-24 h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent lg:my-32"
          initial={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scaleX: 1 }}
        />

        {/* ==================== ROW 2: Why Founded ==================== */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Quote block (left on desktop) */}
          <motion.div
            className="order-last lg:order-first"
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <QuoteBlock />
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            variants={fadeRight}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <span className="mb-4 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
              Why We Were Founded
            </span>
            <h2 className="mb-8 font-bold text-3xl text-white tracking-tight sm:text-4xl lg:text-5xl">
              The Gap We Were{" "}
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Built to Close.
              </span>
            </h2>
            <div className="space-y-5 text-base text-gray-300 leading-relaxed sm:text-lg">
              <p>
                Most cybersecurity vendors serve one of two markets: the
                enterprise, with unlimited budget and dedicated security teams,
                or the SME, with off-the-shelf tools and no real advisory.
              </p>
              <p>
                UAE&apos;s fastest-growing businesses — fintechs, SaaS
                companies, healthcare platforms — fall in between. They have
                real regulatory exposure, real security risk, and real audits.
                They need senior practitioners, not junior analysts following a
                checklist. Nexaguard was founded to serve them.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
