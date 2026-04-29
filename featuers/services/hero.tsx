"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[52dvh] w-full items-center justify-center overflow-hidden bg-[#010C13] pt-28 sm:pt-32">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Radial spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(24,167,183,0.1) 0%, rgba(31,136,191,0.05) 40%, transparent 70%)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative ring — reduced motion off only */}
        {!prefersReduced && (
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.04, 0.1, 0.04] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full border border-cyan-400/20"
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Content — single column centered */}
      <motion.div
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-[860px] px-6 pb-20 text-center sm:px-10"
        initial="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
        }}
      >
        {/* Eyebrow */}
        <motion.span
          className="mb-5 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 font-semibold text-cyan-300 text-xs uppercase tracking-[0.25em]"
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
        >
          Our Practice
        </motion.span>

        {/* H1 */}
        <motion.h1
          className="mb-5 bg-[linear-gradient(91.3deg,#FFFFFF_0.85%,#19A7B6_108.42%)] bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl md:text-6xl"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
        >
          Cybersecurity Services.{" "}
          <span className="block mt-1">End-to-End.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="mx-auto max-w-2xl text-gray-300 text-base leading-relaxed sm:text-lg mb-3"
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
        >
          From the first vulnerability assessment to ongoing managed protection — a full cybersecurity practice tuned to the realities of UAE business operations.
        </motion.p>

        {/* Catchy line */}
        <motion.p
          className="mx-auto max-w-xl text-gray-400 text-sm leading-relaxed italic"
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.05 } } }}
        >
          Senior-led. Honest scoping. Reports that drive real remediation.
        </motion.p>
      </motion.div>
    </section>
  );
}
