"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Eye,
  MessageSquare,
  Shield,
  Target,
} from "lucide-react";
import type React from "react";
import GridPatternBackground from "@/components/backgrounds/GridPatternBackground";

const values = [
  {
    icon: Shield,
    title: "Transparency, Always.",
    description:
      "We operate with full transparency in every engagement. No hidden scope. No surprise findings buried in appendices. No vendor lock-in. The work we propose is the work that needs doing — nothing more, nothing less.",
  },
  {
    icon: Target,
    title: "Methodology Over Theatre.",
    description:
      "Every finding we report is verified through manual validation, not just automated tooling. Every recommendation is specific to your environment, not lifted from a template. We document our methodology so your team can reproduce, challenge, and learn from the work.",
  },
  {
    icon: CheckCircle,
    title: "We Own Outcomes.",
    description:
      "We don't just deliver reports and walk away. If a finding ships through to production, we share that responsibility. If a remediation doesn't hold up, we re-engage. Our reputation lives in your environment after the engagement closes.",
  },
  {
    icon: Eye,
    title: "Specific. Always.",
    description:
      "We tailor every assessment to your actual risk profile, your sector, and the regulatory frameworks you operate under. Generic checklists don't survive contact with real environments — and they don't satisfy real auditors.",
  },
  {
    icon: BookOpen,
    title: "Confidentiality, Built In.",
    description:
      "Cybersecurity findings are sensitive by definition. We treat your data, your gaps, and your strategic context with the discretion they deserve. NDAs are signed before scoping, and confidentiality outlives every engagement.",
  },
  {
    icon: MessageSquare,
    title: "Plain Language. Always.",
    description:
      "We don't hide behind jargon. Reports are written for the people who need to act on them — engineers, leadership, boards, and auditors. If we can't explain a finding clearly, we haven't understood it well enough yet.",
  },
];

interface ValueCardProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  index: number;
}

function ValueCard({ icon: Icon, title, description, index }: ValueCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      animate={
        prefersReduced
          ? {}
          : {
              scale: [1, 1.005, 1],
              transition: {
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.7,
                repeatType: "mirror",
              },
            }
      }
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#021420]/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_8px_40px_rgba(0,181,214,0.12)]"
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.09 }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {/* Hover accent line on left */}
      <div className="absolute top-0 left-0 h-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-500 transition-all duration-500 group-hover:h-full" />

      {/* Spotlight glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,210,255,0.05), transparent 40%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col gap-6">
        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10">
          <Icon
            className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-cyan-400"
            strokeWidth={1.5}
          />
        </div>

        {/* Content */}
        <div>
          <h3 className="mb-3 font-bold text-lg text-white transition-colors duration-300 group-hover:text-cyan-300 leading-snug">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed transition-colors group-hover:text-slate-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoValues() {
  return (
    <section className="relative w-full overflow-hidden bg-[#010C13] py-24 lg:py-32">
      <GridPatternBackground dotGrid />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-4 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            What We Stand For
          </span>
          <h2 className="mb-5 font-bold text-3xl text-white tracking-tight sm:text-4xl lg:text-5xl">
            Six Values. One Practice.
          </h2>
          <p className="text-base text-gray-400 leading-relaxed sm:text-lg">
            Every engagement we run is shaped by these six commitments. They&apos;re not
            aspirational marketing — they&apos;re the operating principles we hold ourselves to
            with every client, every report, every conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <ValueCard
              description={v.description}
              icon={v.icon}
              index={i}
              key={v.title}
              title={v.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
