"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "30%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "-10%"]);

  return (
    <section
      className="relative w-full overflow-hidden py-28 lg:py-36"
      ref={sectionRef}
      style={{ background: "#020305" }}
    >
      {/* Parallax mesh-gradient background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(24,167,183,0.08) 0%, rgba(31,136,191,0.04) 40%, transparent 70%)",
          }}
        />
        {/* Subtle animated grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Network node decoration */}
        <svg
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 lg:opacity-[0.07]"
          fill="none"
          height="500"
          viewBox="0 0 500 500"
          width="500"
        >
          <circle cx="250" cy="250" r="2" fill="#18A7B7" />
          <circle cx="150" cy="150" r="2" fill="#18A7B7" />
          <circle cx="350" cy="150" r="2" fill="#18A7B7" />
          <circle cx="150" cy="350" r="2" fill="#18A7B7" />
          <circle cx="350" cy="350" r="2" fill="#18A7B7" />
          <circle cx="80" cy="250" r="1.5" fill="#1F88BF" />
          <circle cx="420" cy="250" r="1.5" fill="#1F88BF" />
          <circle cx="250" cy="80" r="1.5" fill="#1F88BF" />
          <circle cx="250" cy="420" r="1.5" fill="#1F88BF" />
          <line x1="250" y1="250" x2="150" y2="150" stroke="#18A7B7" strokeWidth="0.5" />
          <line x1="250" y1="250" x2="350" y2="150" stroke="#18A7B7" strokeWidth="0.5" />
          <line x1="250" y1="250" x2="150" y2="350" stroke="#18A7B7" strokeWidth="0.5" />
          <line x1="250" y1="250" x2="350" y2="350" stroke="#18A7B7" strokeWidth="0.5" />
          <line x1="150" y1="150" x2="80" y2="250" stroke="#1F88BF" strokeWidth="0.3" />
          <line x1="350" y1="150" x2="420" y2="250" stroke="#1F88BF" strokeWidth="0.3" />
          <line x1="150" y1="150" x2="250" y2="80" stroke="#1F88BF" strokeWidth="0.3" />
          <line x1="350" y1="150" x2="250" y2="80" stroke="#1F88BF" strokeWidth="0.3" />
          <line x1="150" y1="350" x2="80" y2="250" stroke="#1F88BF" strokeWidth="0.3" />
          <line x1="350" y1="350" x2="420" y2="250" stroke="#1F88BF" strokeWidth="0.3" />
          <line x1="150" y1="350" x2="250" y2="420" stroke="#1F88BF" strokeWidth="0.3" />
          <line x1="350" y1="350" x2="250" y2="420" stroke="#1F88BF" strokeWidth="0.3" />
        </svg>
      </motion.div>

      {/* Foreground content with subtle parallax */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 lg:px-12"
        style={{ y: fgY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Eyebrow */}
          <span className="mb-4 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            Who We Are
          </span>

          {/* Heading */}
          <h2 className="mb-8 font-bold text-3xl text-white leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            A Senior-Led Cybersecurity Practice.{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Based in Dubai.
            </span>
          </h2>

          {/* Body */}
          <div className="space-y-5 text-base text-gray-300 leading-relaxed sm:text-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Nexaguard Cyber Labs is a boutique cybersecurity consultancy
              serving UAE and GCC businesses that need enterprise-grade security
              work without enterprise overhead.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              We focus on what actually moves the needle for growing companies:
              penetration testing that finds real vulnerabilities, compliance
              support that gets you through real audits, and managed services
              that keep you protected after the engagement ends.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, margin: "-80px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Link
              className="group mt-10 inline-flex items-center gap-2 font-semibold text-cyan-400 text-sm transition-colors hover:text-cyan-300 sm:text-base"
              href="/about-us"
            >
              Learn About Us
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
