"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TERMINAL_LINES = [
  { text: "> Initiating security assessment...", delay: 0, color: "text-cyan-400" },
  { text: "> Scanning application layer...", delay: 800, color: "text-gray-300" },
  { text: "> Vulnerability found: A01 Broken Access Control", delay: 1800, color: "text-red-400" },
  { text: "> Severity: HIGH — CVSSv3: 8.1", delay: 2600, color: "text-orange-400" },
  { text: "> Generating remediation roadmap...", delay: 3400, color: "text-gray-300" },
  { text: "> Remediation applied: ✓", delay: 4200, color: "text-green-400" },
  { text: "> Re-testing... all checks passed.", delay: 5000, color: "text-green-400" },
  { text: "> Report generated: board_ready_summary.pdf", delay: 5800, color: "text-cyan-300" },
  { text: "> Done. Your security posture: IMPROVED.", delay: 6600, color: "text-cyan-400" },
];

function TerminalElement() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setVisibleLines(TERMINAL_LINES.map((_, i) => i));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started, prefersReduced]);

  useEffect(() => {
    if (!started) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < TERMINAL_LINES.length; i++) {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, TERMINAL_LINES[i].delay);
      timers.push(t);
    }
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <div
      className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#010C13] font-mono"
      ref={ref}
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 border-white/10 border-b bg-white/5 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-gray-500 text-xs">nexaguard-assessment.sh</span>
      </div>
      {/* Terminal body */}
      <div className="space-y-1.5 p-5 text-sm">
        {TERMINAL_LINES.map((line, i) => (
          <div
            className={`transition-opacity duration-300 ${
              visibleLines.includes(i) ? "opacity-100" : "opacity-0"
            } ${line.color}`}
            key={line.text}
          >
            {line.text}
          </div>
        ))}
        {/* Blinking cursor */}
        <span className="inline-block h-4 w-2 animate-pulse bg-cyan-400" />
      </div>
    </div>
  );
}

export default function WhatWeBelieveSection() {
  return (
    <section className="bg-[#010C13] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-4 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            What We Believe
          </span>
          <h2 className="mb-6 font-bold text-3xl text-white tracking-tight sm:text-4xl lg:text-5xl">
            Cybersecurity Should Make You{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Safer. Not Confused.
            </span>
          </h2>
        </motion.div>

        {/* Two-column: copy left, terminal right */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Body copy */}
          <motion.div
            className="space-y-6 text-base text-gray-300 leading-relaxed sm:text-lg"
            initial={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <p>
              Most cybersecurity vendors thrive on complexity. Reports filled
              with jargon. Findings that look impressive but tell you nothing
              actionable. Recommendations that require you to hire someone else
              just to interpret them. We think this is broken.
            </p>
            <p>
              We write reports your board can read and your engineers can act
              on. We explain risk in business terms — what could happen, how
              likely it is, what it would cost, and how to fix it. We treat
              compliance as a strategic enabler, not a paperwork exercise.
            </p>
            <p>
              Most importantly, we believe that good cybersecurity is achievable
              for any business that takes it seriously — not just those with
              eight-figure budgets. The work just needs to be scoped honestly
              and executed properly.
            </p>
          </motion.div>

          {/* Terminal element — Treatment D */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-80px" }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <TerminalElement />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
