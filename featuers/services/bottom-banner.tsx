"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

const PROGRAM_CHIPS = [
  "Quarterly Reviews",
  "Priority Response",
  "Advisory Calls",
  "Threat Briefings",
  "Annual Strategy Review",
];

const BottomBanner = () => {
  return (
    <motion.div
      className="mx-auto mt-8 w-full max-w-9xl px-4 py-4 sm:mt-12 sm:px-6 sm:py-6 md:mt-16 md:px-8 md:py-8 lg:mt-20"
      initial="hidden"
      variants={containerVariants}
      viewport={{ once: true, margin: "-50px" }}
      whileInView="visible"
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-cyan-400/15 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_60px_rgba(24,167,183,0.12)]"
        variants={itemVariants}
        style={{
          background: "linear-gradient(135deg, #020f1a 0%, #031729 50%, #020f1a 100%)",
        }}
      >
        {/* Radial glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(24,167,183,0.3) 0%, transparent 65%)" }} />
          <div className="absolute bottom-[-20%] left-[-5%] h-[400px] w-[400px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, rgba(31,136,191,0.25) 0%, transparent 65%)" }} />
        </div>

        {/* Decorative SVG shield lines */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full opacity-[0.035]"
          viewBox="0 0 400 400"
          style={{ width: "min(400px, 50%)" }}
        >
          <circle cx="300" cy="200" r="160" fill="none" stroke="#18A7B7" strokeWidth="1" />
          <circle cx="300" cy="200" r="120" fill="none" stroke="#18A7B7" strokeWidth="0.8" />
          <circle cx="300" cy="200" r="80" fill="none" stroke="#18A7B7" strokeWidth="0.6" />
          <path d="M 300 80 L 320 140 L 380 160 L 340 200 L 360 260 L 300 230 L 240 260 L 260 200 L 220 160 L 280 140 Z" fill="none" stroke="#18A7B7" strokeWidth="0.8" />
        </svg>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col p-4 sm:p-6 md:p-8 lg:flex-row lg:p-10 xl:p-12">
          <motion.div
            animate="visible"
            className="max-w-4xl flex-1"
            initial="hidden"
            variants={containerVariants}
          >
            <motion.span
              className="mb-4 inline-block text-cyan-400 text-xs font-semibold uppercase tracking-[0.3em]"
              variants={itemVariants}
            >
              Strategic Partnership
            </motion.span>

            <motion.h2
              className="mb-4 font-semibold text-5xl text-white leading-tight sm:mb-5 md:mb-6"
              style={{
                background: "linear-gradient(90.75deg, #FFFFFF 1.3%, #999999 99.36%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              variants={itemVariants}
            >
              The Nexaguard Strategic Resilience Partnership
            </motion.h2>

            <motion.p className="mb-4 font-light text-lg text-gray-300 italic sm:mb-5 sm:text-xl md:mb-6" variants={itemVariants}>
              Customized for your scale. Managed for your success.
            </motion.p>

            <motion.p className="mb-5 text-base text-gray-400 leading-relaxed sm:text-lg md:mb-6" variants={itemVariants}>
              This master program allows you to select missions from every package — from AppSec Infiltration to 24/7 SOC Operations and Employee Defense — to create a unified, annual security contract.
            </motion.p>

            {/* Program inclusion chips */}
            <motion.div className="mb-6 flex flex-wrap gap-2 sm:mb-8" variants={itemVariants}>
              {PROGRAM_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-cyan-300 text-xs font-medium"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.ul
              animate="visible"
              className="mb-6 space-y-4 sm:mb-8 sm:space-y-5"
              initial="hidden"
              variants={containerVariants}
            >
              {[
                { strong: "Unified Strategy:", text: "All services work in sync under a single partner." },
                { strong: "Predictable Budgeting:", text: "One clear, annual investment for total resilience." },
                { strong: "Elite Extension:", text: "Our team becomes an integrated part of your technical and leadership structure." },
              ].map(({ strong, text }) => (
                <motion.li key={strong} className="flex items-start gap-3 sm:gap-4" variants={itemVariants}>
                  <ChevronsRight className="mt-1 shrink-0 text-cyan-400" size={24} />
                  <span className="text-base text-gray-300 sm:text-lg">
                    <strong className="text-white">{strong}</strong> {text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <Link href="/contact">
              <motion.button
                className="mt-4 rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-6 py-3 font-bold text-sm text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,181,214,0.5)] sm:mt-6 sm:px-8 sm:py-3 sm:text-base"
                type="button"
                variants={itemVariants}
              >
                Request a Bespoke Proposal
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BottomBanner;
