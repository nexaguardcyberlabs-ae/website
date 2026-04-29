"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const TABS = [
  {
    label: "Compliance Frameworks",
    items: [
      "NESA UAE IAS",
      "ADGM Cyber Framework",
      "DIFC Data Protection",
      "ADHICS",
      "ISO/IEC 27001:2022",
      "PCI DSS v4.0",
      "UAE PDPL",
      "GDPR",
      "SOC 2",
    ],
  },
  {
    label: "Application Security",
    items: [
      "Web App VAPT",
      "Mobile App VAPT",
      "API VAPT",
      "Source Code Review",
      "WAF Implementation",
      "SSL/TLS Lifecycle",
      "DevSecOps",
      "SaaS Hardening",
    ],
  },
  {
    label: "Risk & GRC",
    items: [
      "ISO 27001 Gap Assessment",
      "ISO 27001 Implementation",
      "NESA Compliance",
      "ADGM Cyber Framework",
      "DIFC DP Compliance",
      "PDPL Readiness",
      "Risk Register",
      "vCISO Advisory",
    ],
  },
  {
    label: "Managed Services",
    items: [
      "Managed VAPT",
      "Managed AppSec",
      "24/7 SOC",
      "Managed Vulnerability Scanning",
      "Managed WAF",
      "Phishing Simulations",
      "Annual Security Programme",
      "IR Retainer",
    ],
  },
];

const INTERVAL_MS = 4000;
const PAUSE_MS = 10000;

export default function ComplianceStrip() {
  const [activeTab, setActiveTab] = useState(0);
  const prefersReduced = useReducedMotion();
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (prefersReduced) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveTab((t) => (t + 1) % TABS.length);
    }, INTERVAL_MS);
  }, [prefersReduced]);

  const pauseThenResume = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      startInterval();
    }, PAUSE_MS);
  }, [startInterval]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [startInterval]);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    pauseThenResume();
  };

  return (
    <section className="relative w-full bg-[#020305] px-4 py-20">
      {/* Subtle accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(24,167,183,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-bold text-3xl text-white tracking-tight sm:text-4xl">
            What We Cover.
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-sm leading-relaxed sm:text-base">
            A full-spectrum cybersecurity practice — frameworks, services, and
            capabilities tuned to UAE business reality.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-4">
          {TABS.map((tab, idx) => (
            <button
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                activeTab === idx
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              key={tab.label}
              onClick={() => handleTabClick(idx)}
              type="button"
            >
              {tab.label}
              {activeTab === idx && (
                <motion.span
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-cyan-400"
                  layoutId="tab-underline"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Items panel */}
        <div className="min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1 }}
              className="flex flex-wrap justify-center gap-3"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={activeTab}
              transition={{ duration: 0.25 }}
            >
              {TABS[activeTab].items.map((item, i) => (
                <motion.span
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-cyan-300 text-sm font-medium"
                  initial={{ opacity: 0, y: 8 }}
                  key={item}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
