"use client";

import { AnimatePresence, type Variants, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/nexaguard-placeholder";

export interface FAQ {
  q: string;
  a: string;
}

export interface ServiceDetailProps {
  hero: {
    eyebrow?: string;
    h1: string;
    subhead: string;
  };
  problem: string[];
  included: string[];
  methodology: { step: string; desc: string }[];
  deliverables: string[];
  timeline: string | string[];
  audience: string[];
  faqs: FAQ[];
  faqSchema: object;
}

function AccordionItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
        open ? "border-cyan-500/40 bg-cyan-500/[0.03]" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="font-semibold text-sm text-white sm:text-base">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          className="shrink-0 text-cyan-400"
          transition={prefersReduced ? {} : { duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={prefersReduced ? {} : { duration: 0.25, ease: "easeOut" }}
          >
            <div className="border-t border-white/8 px-6 pb-5 pt-4">
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ServiceDetailPage({
  hero,
  problem,
  included,
  methodology,
  deliverables,
  timeline,
  audience,
  faqs,
  faqSchema,
}: ServiceDetailProps) {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        type="application/ld+json"
      />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[60vh] w-full items-center overflow-hidden bg-[#010C13] px-6 pt-28 sm:pt-36 pb-20">
        {/* Background decoration */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 70% 50%, rgba(24,167,183,0.12) 0%, rgba(31,136,191,0.06) 40%, transparent 70%)",
            }}
            className="absolute inset-0"
          />
          {!prefersReduced && (
            <>
              <motion.div
                animate={{ scale: [1, 1.07, 1], opacity: [0.05, 0.13, 0.05] }}
                className="absolute right-[-4%] top-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full border border-cyan-400/20"
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                animate={{ scale: [1.07, 1, 1.07], opacity: [0.04, 0.09, 0.04] }}
                className="absolute right-[-4%] top-1/2 -translate-y-1/2 h-[360px] w-[360px] rounded-full border border-cyan-400/15"
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
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

        <motion.div
          className="relative z-10 mx-auto max-w-3xl"
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
          }}
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp}>
            <Link
              className="mb-6 inline-flex items-center gap-1 text-cyan-400 text-sm transition-colors hover:text-cyan-300"
              href="/services"
            >
              ← All Services
            </Link>
          </motion.div>

          {hero.eyebrow && (
            <motion.span
              className="mb-4 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.25em]"
              variants={fadeUp}
            >
              {hero.eyebrow}
            </motion.span>
          )}

          <motion.h1
            className="mb-6 font-bold text-4xl text-white leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            variants={fadeUp}
          >
            {hero.h1}
          </motion.h1>

          <motion.p
            className="mb-10 text-gray-300 text-base leading-relaxed sm:text-xl"
            variants={fadeUp}
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            variants={fadeUp}
          >
            <a
              className="rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-7 py-3.5 font-bold text-sm text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition hover:shadow-[0_0_30px_rgba(0,181,214,0.4)]"
              href={CALENDLY_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get Free Audit →
            </a>
            <Link
              className="rounded-full border border-white/20 px-7 py-3.5 font-semibold text-sm text-white transition hover:border-cyan-400/50 hover:bg-white/5"
              href="/resources"
            >
              Download Brochure →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== THE PROBLEM — Quote-block style ===== */}
      <section className="bg-[#020305] px-6 py-20">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          transition={{ staggerChildren: 0.1 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView="visible"
        >
          <span className="mb-5 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            Why It Matters
          </span>
          <div className="relative border-l-2 border-cyan-400/50 pl-8">
            {/* Decorative large quote mark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 -left-4 font-serif text-[80px] leading-none text-cyan-400/10 select-none"
            >
              &ldquo;
            </span>
            <div className="space-y-5">
              {problem.map((p, i) => (
                <p
                  className="text-gray-200 text-base leading-relaxed sm:text-lg"
                  key={`prob-${i}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHAT'S INCLUDED — Card grid ===== */}
      <section className="bg-[#010C13] px-6 py-20">
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-5 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            Scope
          </span>
          <h2 className="mb-10 font-bold text-2xl text-white tracking-tight sm:text-3xl">
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <motion.div
                className="group flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-[0_4px_20px_rgba(0,181,214,0.08)]"
                initial={{ opacity: 0, y: 16 }}
                key={item}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                viewport={{ once: true, margin: "-60px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== METHODOLOGY — Visual timeline/stepper ===== */}
      <section className="bg-[#020305] px-6 py-20">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-5 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            How We Work
          </span>
          <h2 className="mb-12 font-bold text-2xl text-white tracking-tight sm:text-3xl">
            Our Methodology
          </h2>
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/20 to-transparent" />

            <div className="flex flex-col gap-10">
              {methodology.map((m, i) => (
                <motion.div
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  key={m.step}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  {/* Step circle */}
                  <div className="relative shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 font-bold text-cyan-400 text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pt-1.5">
                    <h3 className="mb-2 font-semibold text-base text-white">
                      {m.step}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== DELIVERABLES ===== */}
      <section className="bg-[#010C13] px-6 py-20">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-5 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            What You Receive
          </span>
          <h2 className="mb-8 font-bold text-2xl text-white tracking-tight sm:text-3xl">
            Deliverables
          </h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <ul className="flex flex-col gap-4">
              {deliverables.map((d, i) => (
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  key={d}
                  transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                  <span className="text-gray-300 text-sm leading-relaxed sm:text-base">
                    {d}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ===== TIMELINE — horizontal milestones ===== */}
      <section className="bg-[#020305] px-6 py-20">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-5 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            Timelines
          </span>
          <h2 className="mb-10 font-bold text-2xl text-white tracking-tight sm:text-3xl">
            Typical Timeline
          </h2>
          {Array.isArray(timeline) ? (
            <div className="relative">
              {/* Horizontal connector line (desktop) */}
              <div className="absolute top-5 left-0 right-0 hidden h-px bg-gradient-to-r from-cyan-400/30 via-cyan-400/20 to-transparent sm:block" />
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-0">
                {timeline.map((t, i) => (
                  <div className="relative flex flex-1 flex-col items-start gap-3 sm:items-center sm:text-center sm:px-4" key={t}>
                    {/* Milestone dot */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-[#020305] font-bold text-cyan-400 text-xs">
                      {i + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-300 text-base sm:text-lg">{timeline}</p>
          )}
        </motion.div>
      </section>

      {/* ===== WHO THIS IS FOR ===== */}
      <section className="bg-[#010C13] px-6 py-20">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-5 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            Audience
          </span>
          <h2 className="mb-8 font-bold text-2xl text-white tracking-tight sm:text-3xl">
            Who This Is For
          </h2>
          <div className="flex flex-col gap-3">
            {audience.map((a, i) => (
              <motion.div
                className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-cyan-500/20"
                initial={{ opacity: 0, x: -12 }}
                key={a}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
                viewport={{ once: true, margin: "-60px" }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" strokeWidth={1.5} />
                <span className="text-gray-300 text-sm leading-relaxed sm:text-base">{a}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== FAQ — Accordion ===== */}
      <section className="bg-[#020305] px-6 py-20">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-5 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            FAQ
          </span>
          <h2 className="mb-10 font-bold text-2xl text-white tracking-tight sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem faq={faq} index={i} key={faq.q} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative overflow-hidden bg-[#010C13] px-6 py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(24,167,183,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="relative mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-4 inline-block font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
            Get Started
          </span>
          <h2 className="mb-5 font-bold text-3xl text-white tracking-tight sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-10 text-gray-400 text-base leading-relaxed sm:text-lg">
            Book a free 30-minute risk review. No commitment, no hard sell —
            just an honest assessment of where you stand and what to prioritise.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              className="rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-8 py-3.5 font-bold text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition hover:shadow-[0_0_30px_rgba(0,181,214,0.4)]"
              href={CALENDLY_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get Free Audit →
            </a>
            <Link
              className="flex items-center gap-1 font-medium text-gray-400 text-sm transition-colors hover:text-white"
              href="/contact"
            >
              Or send us a message <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
