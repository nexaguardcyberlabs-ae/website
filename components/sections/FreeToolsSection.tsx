"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList, BarChart3, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import MeshGradientBackground from "@/components/backgrounds/MeshGradientBackground";

const COUNTRIES = ["UAE", "Saudi Arabia", "Qatar", "Bahrain", "Oman", "Kuwait", "Other"];

function LeadMagnetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", jobTitle: "", country: "UAE", newsletter: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, resource_id: "compliance-checklist" }),
      });
      if (res.ok) {
        router.push("/thank-you?resource=compliance-checklist");
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role="dialog"
          transition={{ duration: 0.2 }}
        >
          <motion.div animate={{ opacity: 1 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" exit={{ opacity: 0 }} initial={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#020d14] shadow-2xl"
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button aria-label="Close modal" className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-white" onClick={onClose} type="button">
              <X className="h-5 w-5" />
            </button>
            <div className="p-8">
              <h3 className="mb-2 font-bold text-xl text-white">Get Your Free Compliance Checklist</h3>
              <p className="mb-6 text-gray-400 text-sm">Enter your details below. We&apos;ll email the checklist immediately.</p>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {error && <div className="rounded-lg bg-red-500/10 px-4 py-3 text-red-400 text-sm">{error}</div>}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { name: "name", placeholder: "Full Name *", type: "text" },
                    { name: "email", placeholder: "Work Email *", type: "email" },
                    { name: "company", placeholder: "Company Name *", type: "text" },
                    { name: "jobTitle", placeholder: "Job Title *", type: "text" },
                  ].map((f) => (
                    <input
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
                      disabled={isLoading}
                      key={f.name}
                      name={f.name}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      required
                      type={f.type}
                      value={String((formData as Record<string, unknown>)[f.name] ?? "")}
                    />
                  ))}
                  <select className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/50 disabled:opacity-50 sm:col-span-2" disabled={isLoading} name="country" onChange={handleChange} value={formData.country}>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input checked={formData.newsletter} className="mt-0.5 h-4 w-4 shrink-0 accent-cyan-400" name="newsletter" onChange={handleChange} type="checkbox" />
                  <span className="text-gray-400 text-xs leading-relaxed">Yes, send me occasional cybersecurity insights (1–2 emails/month, unsubscribe anytime).</span>
                </label>
                <button
                  className="mt-1 w-full rounded-lg py-3.5 font-semibold text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                  style={{ background: "linear-gradient(95.96deg, #18A7B7 20.55%, #1F88BF 64.75%)", border: "1px solid rgba(255,255,255,0.25)" }}
                  type="submit"
                >
                  {isLoading ? "Sending..." : "Send Me the Checklist →"}
                </button>
                <p className="text-center text-gray-500 text-xs">By submitting, you agree to our <a className="underline hover:text-gray-300" href="/privacy">Privacy Policy</a>. We never share your details.</p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function FreeToolsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.15 },
    }),
  };

  return (
    <>
      <LeadMagnetModal isOpen={isModalOpen} onClose={closeModal} />

      <section className="relative w-full overflow-hidden px-4 py-24 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #020d14 0%, #021a29 50%, #020d14 100%)" }}>
        <MeshGradientBackground />

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-cyan-300 text-xs font-semibold uppercase tracking-widest">
              Free Resources
            </span>
            <h2 className="mb-4 font-bold text-3xl text-white sm:text-4xl lg:text-5xl">
              Where Does Your Security{" "}
              <span className="bg-[linear-gradient(91.3deg,#FFFFFF_0.85%,#19A7B6_108.42%)] bg-clip-text text-transparent">
                Actually Stand?
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400 text-base leading-relaxed">
              Two free resources designed to give you a real answer — a UAE compliance checklist for structured self-review, and a 5-minute VAPT readiness assessment with personalised recommendations.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card 1 — Compliance Checklist */}
            <motion.div
              custom={0}
              initial="hidden"
              variants={cardVariants}
              viewport={{ once: true }}
              whileInView="visible"
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-[0_8px_40px_rgba(24,167,183,0.12)]"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-block rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-300 text-xs font-medium">PDF GUIDE</span>
                  <ClipboardList className="h-6 w-6 text-gray-500" strokeWidth={1.5} />
                </div>

                {/* Stylized PDF mockup */}
                <div className="mb-6 flex h-32 w-full items-center justify-center rounded-xl border border-white/8 bg-[#010C13] overflow-hidden">
                  <div className="w-24 px-3 py-3 border border-white/10 rounded-lg bg-white/[0.03]">
                    <div className="mb-1.5 h-0.5 w-5 rounded-full bg-cyan-400" />
                    <div className="mb-3 text-[7px] font-bold text-white uppercase tracking-wider">Nexaguard</div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="mb-1 h-0.5 rounded-full bg-white/10" style={{ width: `${50 + (i % 3) * 20}%` }} />
                    ))}
                  </div>
                </div>

                <h3 className="mb-3 font-bold text-lg text-white leading-snug">
                  UAE SME Cybersecurity Compliance Checklist 2026
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A 12-page field guide covering UAE regulations, security controls, and the 7-day action plan for a structured internal review.
                </p>
              </div>

              <button
                className="mt-7 w-full rounded-xl py-3.5 text-center font-semibold text-sm text-white transition hover:opacity-90"
                onClick={openModal}
                style={{ background: "linear-gradient(95.96deg, #18A7B7 20.55%, #1F88BF 64.75%)" }}
                type="button"
              >
                Download Free Checklist →
              </button>
            </motion.div>

            {/* Card 2 — VAPT Assessment */}
            <motion.div
              custom={1}
              initial="hidden"
              variants={cardVariants}
              viewport={{ once: true }}
              whileInView="visible"
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-[0_8px_40px_rgba(24,167,183,0.12)]"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-block rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300 text-xs font-medium">INTERACTIVE TOOL</span>
                  <BarChart3 className="h-6 w-6 text-gray-500" strokeWidth={1.5} />
                </div>

                {/* Score gauge mockup */}
                <div className="mb-6 flex h-32 w-full items-center justify-center rounded-xl border border-white/8 bg-[#010C13] overflow-hidden">
                  <div className="flex flex-col items-center">
                    <div className="relative h-16 w-16">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="14"
                          fill="none"
                          stroke="url(#scoreGrad)"
                          strokeWidth="3"
                          strokeDasharray="66 88"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#18A7B7" />
                            <stop offset="100%" stopColor="#1F88BF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-bold text-white text-sm">75%</span>
                      </div>
                    </div>
                    <p className="mt-1 text-gray-500 text-[10px] uppercase tracking-wider">Readiness Score</p>
                  </div>
                </div>

                <h3 className="mb-3 font-bold text-lg text-white leading-snug">
                  VAPT Readiness Self-Assessment
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">
                  Most UAE businesses overestimate their security. This 5-minute assessment shows you the gap —{" "}
                  <em>privately, instantly.</em>
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  15 questions · Personalised score · 3 specific recommendations · Emailed instantly · No sales call.
                </p>
              </div>

              <Link
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/30 py-3.5 text-center font-semibold text-cyan-300 text-sm transition hover:bg-cyan-400/5"
                href="/resources/vapt-readiness-assessment"
              >
                Take the Assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
