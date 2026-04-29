"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const COUNTRIES = [
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Bahrain",
  "Oman",
  "Kuwait",
  "Other",
];

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceId?: string;
}

function LeadMagnetModal({ isOpen, onClose, resourceId = "compliance-checklist" }: LeadMagnetModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    country: "UAE",
    newsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
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
          {/* Backdrop */}
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#020d14] shadow-2xl"
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              aria-label="Close modal"
              className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-white"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              <h3 className="mb-2 font-bold text-xl text-white sm:text-2xl">
                Get Your Free Compliance Checklist
              </h3>
              <p className="mb-6 text-gray-400 text-sm leading-relaxed">
                Enter your details below. We&apos;ll email the checklist
                immediately.
              </p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-lg bg-red-500/10 px-4 py-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
                    disabled={isLoading}
                    name="name"
                    onChange={handleChange}
                    placeholder="Full Name *"
                    required
                    type="text"
                    value={formData.name}
                  />
                  <input
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
                    disabled={isLoading}
                    name="email"
                    onChange={handleChange}
                    placeholder="Work Email *"
                    required
                    type="email"
                    value={formData.email}
                  />
                  <input
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
                    disabled={isLoading}
                    name="company"
                    onChange={handleChange}
                    placeholder="Company Name *"
                    required
                    type="text"
                    value={formData.company}
                  />
                  <input
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
                    disabled={isLoading}
                    name="jobTitle"
                    onChange={handleChange}
                    placeholder="Job Title *"
                    required
                    type="text"
                    value={formData.jobTitle}
                  />
                  <select
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50 sm:col-span-2"
                    disabled={isLoading}
                    name="country"
                    onChange={handleChange}
                    value={formData.country}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Newsletter opt-in (unchecked by default) */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    checked={formData.newsletter}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-cyan-400"
                    name="newsletter"
                    onChange={handleChange}
                    type="checkbox"
                  />
                  <span className="text-gray-400 text-xs leading-relaxed">
                    Yes, send me occasional cybersecurity insights for UAE
                    businesses (1–2 emails/month, unsubscribe anytime).
                  </span>
                </label>

                <button
                  className="mt-1 w-full rounded-lg py-3.5 font-semibold text-sm text-white transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                  style={{
                    background:
                      "linear-gradient(95.96deg, #18A7B7 20.55%, #1F88BF 64.75%)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    boxShadow: "0px 4px 4px 0px #00000040 inset",
                  }}
                  type="submit"
                >
                  {isLoading ? "Sending..." : "Send Me the Checklist →"}
                </button>

                <p className="text-center text-gray-500 text-xs">
                  By submitting, you agree to our{" "}
                  <a className="underline hover:text-gray-300" href="/privacy">
                    Privacy Policy
                  </a>
                  . We never share your details.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function LeadMagnetSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <LeadMagnetModal isOpen={isModalOpen} onClose={closeModal} />

      <section
        className="relative w-full px-4 py-24"
        style={{
          background:
            "linear-gradient(135deg, #020d14 0%, #021a29 50%, #020d14 100%)",
        }}
      >
        {/* Accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(24,167,183,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:gap-16">
          {/* Left — stylized PDF mockup */}
          <div className="flex shrink-0 items-center justify-center lg:w-64">
            <div className="relative flex h-80 w-56 flex-col justify-between overflow-hidden rounded-xl border border-cyan-400/20 bg-[#010C13] p-6 shadow-[0_0_40px_rgba(0,181,214,0.15)]">
              {/* Doc header */}
              <div>
                <div className="mb-3 h-1 w-8 rounded-full bg-cyan-400" />
                <p className="mb-1 font-bold text-white text-xs uppercase tracking-widest">
                  Nexaguard
                </p>
                <p className="text-gray-400 text-[10px] leading-tight">
                  UAE SME Cybersecurity Compliance Checklist 2026
                </p>
              </div>
              {/* Fake lines */}
              <div className="space-y-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    className="h-1 rounded-full bg-white/10"
                    key={`line-${i}`}
                    style={{ width: `${60 + (i % 3) * 15}%` }}
                  />
                ))}
              </div>
              {/* Footer */}
              <div>
                <div className="mb-1 h-px w-full bg-white/10" />
                <p className="text-gray-600 text-[9px]">
                  nexaguardcyberlabs.com
                </p>
              </div>
            </div>
          </div>

          {/* Right — copy and CTA */}
          <div className="text-center lg:text-left">
            <span className="mb-3 inline-block rounded-full border border-cyan-400/30 px-4 py-1 text-cyan-300 text-xs">
              Free Download
            </span>
            <h2 className="mb-4 font-bold text-2xl text-white sm:text-3xl lg:text-4xl">
              Free: UAE SME Cybersecurity Compliance Checklist 2026
            </h2>
            <p className="mb-8 max-w-xl text-gray-400 text-sm leading-relaxed sm:text-base">
              A practical, no-fluff guide covering the regulatory frameworks,
              security controls, and risk areas every UAE business should review
              this quarter. Built by senior practitioners.
            </p>
            <button
              className="rounded-full border border-white/25 bg-gradient-to-r from-[#18A7B7] to-[#1F88BF] px-8 py-3.5 font-bold text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,181,214,0.5)]"
              onClick={openModal}
              type="button"
            >
              Download Free Checklist →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
