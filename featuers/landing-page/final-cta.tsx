"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/nexaguard-placeholder";

export default function FinalCTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#010C13] px-4 py-28">
      {/* Animated radial gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(24,167,183,0.09) 0%, rgba(31,136,191,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Subtle animated grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating decorative elements */}
      {!prefersReduced && (
        <>
          <motion.div
            animate={{ y: [0, -18, 0], opacity: [0.05, 0.12, 0.05] }}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-12 right-16 h-64 w-64 rounded-full border border-cyan-400/20"
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [0.04, 0.09, 0.04] }}
            aria-hidden="true"
            className="pointer-events-none absolute top-12 left-10 h-40 w-40 rounded-full border border-cyan-400/15"
            transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        className="relative mx-auto max-w-2xl px-4 text-center sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span className="mb-4 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
          Get Started
        </span>

        <h2 className="mb-5 font-bold text-3xl text-white tracking-tight sm:text-4xl lg:text-5xl">
          Not Sure Where to Start?
        </h2>

        <p className="mb-10 text-gray-400 text-base leading-relaxed sm:text-lg">
          Book a free 30-minute risk review. We&apos;ll examine your current
          security posture, identify the top 3 risks, and tell you what to
          prioritise — whether you work with us or not.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            className="rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-8 py-3.5 font-bold text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,181,214,0.5)]"
            href={CALENDLY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Get Free Audit →
          </a>

          <Link
            className="font-medium text-gray-400 text-sm transition-colors hover:text-white"
            href="/contact"
          >
            Or send us a message →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
