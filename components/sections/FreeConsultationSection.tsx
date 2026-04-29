"use client";

import { motion } from "framer-motion";
import { ClipboardList, FileText, SearchCheck, Target } from "lucide-react";
import Link from "next/link";
import RadialGlowBackground from "@/components/backgrounds/RadialGlowBackground";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/nexaguard-placeholder";

const INCLUDED = [
  {
    icon: SearchCheck,
    title: "Security Posture Review",
    description:
      "A structured walkthrough of your current security setup — applications, infrastructure, access controls, compliance position.",
  },
  {
    icon: Target,
    title: "Top 3 Risk Identification",
    description:
      "We surface the three most material risks specific to your environment, sector, and regulatory context.",
  },
  {
    icon: ClipboardList,
    title: "Prioritisation Guidance",
    description:
      "A clear view of what to address first, what's medium-term, and what can wait — based on impact and effort.",
  },
  {
    icon: FileText,
    title: "Written Summary",
    description:
      "Within 24 hours of the call, you receive a 1-page written summary capturing the discussion, risks identified, and recommended next steps.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

export default function FreeConsultationSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#010C13] px-4 py-24 lg:py-32">
      <RadialGlowBackground variant="corners" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="mb-4 inline-block rounded-full border border-cyan-400/30 px-4 py-1 font-semibold text-cyan-300 text-xs uppercase tracking-[0.18em]">
            No-Cost Discovery Call · Worth{" "}
            <span className="text-cyan-400">AED 4,000</span>
          </span>
          <h2 className="mb-5 font-bold text-3xl text-white tracking-tight sm:text-4xl lg:text-5xl">
            A Real Cybersecurity Consultation.{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              On Us.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-300 leading-relaxed sm:text-lg">
            Most cybersecurity vendors treat the first call as a sales pitch. We treat it as a
            working session. In 30 minutes, you get a senior-led review of your current security
            posture, a clear identification of your top risks, and specific guidance on what to
            prioritise — whether you decide to work with us or not.
          </p>
        </motion.div>

        {/* What's Included — 2x2 grid */}
        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {INCLUDED.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-[0_8px_32px_rgba(0,181,214,0.1)]"
                custom={i}
                initial="hidden"
                key={item.title}
                variants={fadeUp}
                viewport={{ once: true, margin: "-60px" }}
                whileInView="visible"
              >
                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <Icon className="h-5 w-5 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-semibold text-base text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Value anchor + no-strings note */}
        <motion.div
          className="mb-10 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 px-8 py-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-60px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="mb-2 text-gray-300 text-base leading-relaxed">
            This consultation typically reflects{" "}
            <span className="font-bold text-cyan-400 text-lg">AED 4,000</span> of senior advisor
            time. We offer it free because we&apos;d rather start a conversation with informed
            prospects than sell into uncertainty.
          </p>
          <p className="text-gray-500 text-sm">
            No commitment. No pressure. No follow-up sales sequence unless you ask for one.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, margin: "-60px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <a
            className="w-full rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-8 py-3.5 text-center font-bold text-sm text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition hover:shadow-[0_0_30px_rgba(0,181,214,0.4)] sm:w-auto"
            href={CALENDLY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Book Free Consultation →
          </a>
          <Link
            className="w-full rounded-full border border-cyan-400/30 px-8 py-3.5 text-center font-semibold text-cyan-300 text-sm transition hover:bg-cyan-400/5 sm:w-auto"
            href="/contact"
          >
            Or send a message →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
