"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const MANIFESTO =
  "Built in Dubai. For the UAE businesses that fall in the gap between expensive consultancies and unpredictable boutiques. Senior expertise, fairly priced, honestly delivered.";

const PRINCIPLES = [
  "Trust",
  "Precision",
  "Accountability",
  "Relevance",
  "Discretion",
  "Clarity",
];

/** Scrolling marquee ribbon of brand principles */
function PrinciplesRibbon() {
  const prefersReduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  // Static fallback for reduced-motion
  if (prefersReduced) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-2">
        {PRINCIPLES.map((p) => (
          <span
            key={p}
            className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400/60"
          >
            {p}
          </span>
        ))}
      </div>
    );
  }

  // Duplicate for seamless infinite loop
  const doubled = [...PRINCIPLES, ...PRINCIPLES];

  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max items-center gap-6"
        style={{
          animation: "marquee-scroll 50s linear infinite",
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {doubled.map((p, i) => (
          <span key={`${p}-${i}`} className="flex items-center gap-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400/60">
              {p}
            </span>
            <span
              aria-hidden="true"
              className="text-cyan-400/25 text-xs"
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Manifesto card — static statement + scrolling ribbon */
function ManifestoCard() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-10 sm:p-12 backdrop-blur-sm shadow-[0_8px_60px_rgba(24,167,183,0.12)]">
      {/* Top highlight line */}
      <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      {/* Left accent bar */}
      <div className="absolute top-0 left-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-cyan-400/60 to-blue-500/40" />

      {/* Decorative large quote mark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-8 select-none font-serif text-[110px] leading-none text-cyan-400/10"
      >
        &ldquo;
      </span>

      {/* Static manifesto statement */}
      <motion.p
        className="relative mb-8 text-gray-200 text-lg italic leading-relaxed sm:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        &ldquo;{MANIFESTO}&rdquo;
      </motion.p>

      {/* Accent divider */}
      <div className="mb-6 h-px w-full bg-gradient-to-r from-cyan-400/30 via-cyan-400/15 to-transparent" />

      {/* Scrolling principles ribbon */}
      <PrinciplesRibbon />
    </div>
  );
}

export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-[#010C13] pt-28 sm:pt-32">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 65% 50%, rgba(24,167,183,0.12) 0%, rgba(31,136,191,0.06) 40%, transparent 70%)",
          }}
        />
        {!prefersReduced && (
          <>
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.14, 0.06] }}
              className="absolute right-[-5%] top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-cyan-400/20"
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ scale: [1.08, 1, 1.08], opacity: [0.04, 0.1, 0.04] }}
              className="absolute right-[-5%] top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full border border-cyan-400/15"
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
            />
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.18, 0.08] }}
              className="absolute right-[-5%] top-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full border border-cyan-400/25"
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
            />
          </>
        )}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── 50/50 two-column layout ── */}
      <div className="relative z-10 mx-auto w-full px-6 pb-24 sm:px-10 lg:px-20 xl:px-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 max-w-7xl">

          {/* Left — text (50%) */}
          <motion.div
            animate="visible"
            className="flex-1 lg:max-w-[50%]"
            initial="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
            }}
          >
            <motion.span
              className="mb-6 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.25em]"
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
            >
              About Us
            </motion.span>

            <motion.h1
              className="mb-6 font-bold text-4xl text-white leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
              variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            >
              A Senior-Led{" "}
              <span className="bg-[linear-gradient(91.3deg,#FFFFFF_0.85%,#19A7B6_108.42%)] bg-clip-text text-transparent">
                Cybersecurity Practice.
              </span>{" "}
              <span className="mt-2 block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                Based in Dubai.
              </span>
            </motion.h1>

            <motion.p
              className="mb-3 max-w-2xl text-base text-gray-300 leading-relaxed sm:text-lg md:text-xl"
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
            >
              Boutique cybersecurity expertise for UAE and GCC businesses that
              need enterprise-grade security work — without enterprise overhead or
              junior handover.
            </motion.p>

            <motion.p
              className="mb-10 max-w-2xl text-sm text-gray-400 leading-relaxed italic"
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.05 } } }}
            >
              A practice built around senior judgment — not scaled-up junior labour.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
            >
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-8 py-4 font-semibold text-white shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(24,167,183,0.4)]"
                href="/contact"
              >
                Book a Free Consultation
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — manifesto card (50%) */}
          <motion.div
            className="mt-12 flex-1 lg:mt-0 lg:max-w-[50%]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <ManifestoCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
