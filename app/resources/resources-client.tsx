"use client";

import MeshGradientBackground from "@/components/backgrounds/MeshGradientBackground";
import GridPatternBackground from "@/components/backgrounds/GridPatternBackground";
import LeadMagnetSection from "@/featuers/landing-page/lead-magnet";
import { ArrowRight, BookOpen, ClipboardList } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

const COUNTRIES = ["UAE", "Saudi Arabia", "Qatar", "Bahrain", "Oman", "Kuwait", "Other"];

const RESOURCES = [
  {
    id: "compliance-checklist",
    icon: ClipboardList,
    badge: "Free Download",
    title: "UAE SME Cybersecurity Compliance Checklist 2026",
    description:
      "A practical, no-fluff guide covering the regulatory frameworks, security controls, and risk areas every UAE business should review this quarter. Built by senior practitioners.",
    cta: "Download Free →",
    type: "modal" as const,
  },
  {
    id: "web-app-security-guide",
    icon: BookOpen,
    badge: "Free Download",
    title: "Web Application Security Hardening Guide for UAE Businesses",
    description:
      "A 10-page practical breakdown of OWASP Top 10 vulnerabilities — written in plain language with real UAE business examples. For CTOs, developers, and IT leads.",
    cta: "Download Free →",
    type: "modal" as const,
  },
  {
    id: "vapt-assessment",
    icon: ArrowRight,
    badge: "Interactive",
    title: "VAPT Readiness Self-Assessment",
    description:
      "A 15-question self-assessment that scores your organisation's readiness for a formal penetration test. Get a personalised readiness score and tailored recommendations — emailed to you immediately.",
    cta: "Start Assessment →",
    type: "link" as const,
    href: "/resources/vapt-readiness-assessment",
  },
];

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceId: string;
  resourceTitle: string;
}

function ResourceModal({ isOpen, onClose, resourceId, resourceTitle }: ResourceModalProps) {
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
        body: JSON.stringify({ ...formData, resource_id: resourceId }),
      });
      if (res.ok) {
        router.push(`/thank-you?resource=${resourceId}`);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
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
              <h3 className="mb-2 font-bold text-xl text-white">{resourceTitle}</h3>
              <p className="mb-6 text-gray-400 text-sm">Enter your details below. We&apos;ll email the resource immediately.</p>
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
                <button className="mt-1 w-full rounded-lg py-3.5 font-semibold text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50" disabled={isLoading} style={{ background: "linear-gradient(95.96deg, #18A7B7 20.55%, #1F88BF 64.75%)", border: "1px solid rgba(255,255,255,0.25)" }} type="submit">
                  {isLoading ? "Sending..." : "Send Me the Resource →"}
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

export default function ResourcesClient() {
  const [activeModal, setActiveModal] = useState<{ id: string; title: string } | null>(null);
  const openModal = useCallback((id: string, title: string) => setActiveModal({ id, title }), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <main className="min-h-screen bg-[#010C13] pt-28 sm:pt-32">
      {activeModal && (
        <ResourceModal
          isOpen={true}
          onClose={closeModal}
          resourceId={activeModal.id}
          resourceTitle={activeModal.title}
        />
      )}

      {/* Hero */}
      <section className="relative px-6 py-20 text-center">
        <MeshGradientBackground />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-cyan-400/30 px-4 py-1 text-cyan-300 text-xs">
            Resources
          </span>
          <h1 className="mb-4 font-bold text-3xl text-white sm:text-4xl lg:text-5xl">
            Resources & Insights
          </h1>
          <p className="text-gray-400 text-base leading-relaxed sm:text-lg">
            Practical, no-fluff cybersecurity guidance for UAE businesses. Built
            by senior practitioners.
          </p>
          <p className="mt-2 text-gray-500 text-sm leading-relaxed italic">
            Practical guidance. Not vendor marketing.
          </p>
        </div>
      </section>

      {/* Resource cards */}
      <section className="relative bg-[#020305] px-6 py-16">
        <GridPatternBackground />
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-[0_8px_32px_rgba(0,181,214,0.1)]"
                  key={r.id}
                >
                  <div>
                    <div className="mb-4 flex items-start justify-between">
                      <span className="inline-block rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-300 text-xs font-medium">
                        {r.badge}
                      </span>
                      <Icon className="h-5 w-5 text-gray-500" strokeWidth={1.5} />
                    </div>
                    <h2 className="mb-3 font-semibold text-base text-white leading-snug">
                      {r.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                  {r.type === "modal" ? (
                    <button
                      className="mt-6 inline-block w-full rounded-lg py-3 text-center font-semibold text-sm text-white transition hover:opacity-90"
                      onClick={() => openModal(r.id, r.title)}
                      style={{ background: "linear-gradient(95.96deg, #18A7B7 20.55%, #1F88BF 64.75%)" }}
                      type="button"
                    >
                      {r.cta}
                    </button>
                  ) : (
                    <Link
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400/30 py-3 text-center font-semibold text-cyan-300 text-sm transition hover:bg-cyan-400/5"
                      href={r.href as never}
                    >
                      {r.cta}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead Magnet (Compliance Checklist) */}
      <LeadMagnetSection />
    </main>
  );
}
