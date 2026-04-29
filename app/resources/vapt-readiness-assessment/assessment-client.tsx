"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type React from "react";
import { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    text: "How often does your organisation conduct vulnerability assessments or penetration tests?",
    options: [
      { label: "Never", score: 0 },
      { label: "Once, more than 12 months ago", score: 25 },
      { label: "Annually", score: 50 },
      { label: "More frequently than annually", score: 100 },
    ],
  },
  {
    id: 2,
    text: "Do you have a documented Information Security Policy?",
    options: [
      { label: "No", score: 0 },
      { label: "We're working on one", score: 25 },
      { label: "Yes, but it's not regularly reviewed", score: 50 },
      { label: "Yes, reviewed annually and approved by leadership", score: 100 },
    ],
  },
  {
    id: 3,
    text: "Is multi-factor authentication enforced on all administrative accounts?",
    options: [
      { label: "No", score: 0 },
      { label: "Some accounts", score: 25 },
      { label: "All admin accounts", score: 75 },
      { label: "All accounts including standard users", score: 100 },
    ],
  },
  {
    id: 4,
    text: "How is user data encrypted in your applications?",
    options: [
      { label: "We don't encrypt sensitive data", score: 0 },
      { label: "In transit only (HTTPS)", score: 25 },
      { label: "In transit and at rest, but we're not sure of the standard", score: 50 },
      { label: "In transit (TLS 1.2+) and at rest (AES-256)", score: 100 },
    ],
  },
  {
    id: 5,
    text: "How are software dependencies and libraries kept up to date?",
    options: [
      { label: "We don't track dependencies actively", score: 0 },
      { label: "We update when something breaks", score: 25 },
      { label: "We update on a regular schedule (monthly or quarterly)", score: 50 },
      { label: "Automated alerts via Dependabot/Snyk + a documented patch SLA", score: 100 },
    ],
  },
  {
    id: 6,
    text: "Do you have a documented incident response plan?",
    options: [
      { label: "No", score: 0 },
      { label: "Informal — we'd figure it out as we go", score: 25 },
      { label: "Documented but never tested", score: 50 },
      { label: "Documented and tested at least annually", score: 100 },
    ],
  },
  {
    id: 7,
    text: "How is access provisioned and revoked when employees join or leave?",
    options: [
      { label: "Ad-hoc / manual / sometimes missed", score: 0 },
      { label: "Manual but consistently followed", score: 25 },
      { label: "Documented joiner/leaver process", score: 50 },
      { label: "Automated provisioning/de-provisioning tied to HR system", score: 100 },
    ],
  },
  {
    id: 8,
    text: "Do you log security events centrally?",
    options: [
      { label: "No central logging", score: 0 },
      { label: "Some logs, scattered locations", score: 25 },
      { label: "Centralised logging in place", score: 50 },
      { label: "Centralised logging with alerting on anomalies", score: 100 },
    ],
  },
  {
    id: 9,
    text: "How comprehensive is your asset inventory?",
    options: [
      { label: "We don't have one", score: 0 },
      { label: "Partial / informal", score: 25 },
      { label: "Documented but not regularly reviewed", score: 50 },
      { label: "Documented, reviewed quarterly, includes data classification", score: 100 },
    ],
  },
  {
    id: 10,
    text: "Have you conducted security awareness training for staff?",
    options: [
      { label: "No", score: 0 },
      { label: "Once, more than a year ago", score: 25 },
      { label: "Annually", score: 50 },
      { label: "Annually + phishing simulations + role-specific training", score: 100 },
    ],
  },
  {
    id: 11,
    text: "How do you handle third-party vendor security risk?",
    options: [
      { label: "We don't formally assess", score: 0 },
      { label: "Informal review", score: 25 },
      { label: "Documented vendor risk assessment process", score: 50 },
      { label: "Vendor risk assessment + DPAs + ongoing monitoring", score: 100 },
    ],
  },
  {
    id: 12,
    text: "Are you subject to UAE regulatory frameworks (NESA, ADGM, DIFC, ADHICS, CBUAE)?",
    options: [
      { label: "Yes, and we're compliant", score: 100 },
      { label: "Yes, and we're working towards compliance", score: 50 },
      { label: "Yes, but we haven't formally addressed it", score: 25 },
      { label: "Not subject to specific UAE regulations", score: 75 },
    ],
  },
  {
    id: 13,
    text: "Do you have backup and disaster recovery procedures?",
    options: [
      { label: "No formal backups", score: 0 },
      { label: "Backups exist but never tested", score: 25 },
      { label: "Tested backups", score: 50 },
      { label: "Tested backups + documented DR plan + RTO/RPO defined", score: 100 },
    ],
  },
  {
    id: 14,
    text: "Have you mapped your applications to a security framework (OWASP, NIST, ISO 27001 controls)?",
    options: [
      { label: "No", score: 0 },
      { label: "Aware but not formally mapped", score: 25 },
      { label: "Partially mapped", score: 50 },
      { label: "Fully mapped with documented evidence", score: 100 },
    ],
  },
  {
    id: 15,
    text: "What is your primary driver for considering a VAPT?",
    options: [
      { label: "Regulatory or compliance requirement", score: null },
      { label: "Enterprise client / procurement requirement", score: null },
      { label: "Investor due diligence", score: null },
      { label: "Internal security improvement initiative", score: null },
      { label: "General curiosity / no specific driver yet", score: null },
    ],
  },
];

const RECOMMENDATIONS: Record<number, string> = {
  0: "Implement a regular vulnerability assessment cadence. Even quarterly external scans significantly reduce risk exposure.",
  1: "Document a basic Information Security Policy. Without one, every other security investment lacks a foundation.",
  2: "Enforce multi-factor authentication on all administrative accounts immediately. This is the single highest-impact control you can implement.",
  3: "Encrypt sensitive data both in transit (TLS 1.2+) and at rest (AES-256). UAE PDPL requires this for personal data handling.",
  4: "Establish automated dependency monitoring (Dependabot or Snyk) and a documented patch SLA. Outdated dependencies are the most common breach vector.",
  5: "Document and test an incident response plan before any security incident occurs. The middle of a breach is not the time to figure out who calls who.",
  6: "Formalise your joiner/mover/leaver process. Orphaned access is one of the most common audit findings.",
  7: "Implement centralised logging with alerting. Without monitoring, you won't know about a breach until it's far too late.",
  8: "Build a documented asset inventory with data classification. You cannot protect what you haven't catalogued.",
  9: "Roll out annual cybersecurity awareness training plus phishing simulations. Human factors are the leading cause of UAE SME breaches.",
  10: "Implement a vendor risk assessment process. Third-party risk is increasingly the source of significant breaches.",
  11: "Map your regulatory obligations explicitly. Operating in the UAE without understanding NESA, PDPL, or sector-specific frameworks creates avoidable compliance exposure.",
  12: "Test your backup restoration procedures quarterly. Untested backups frequently fail when needed most.",
  13: "Map your applications to OWASP or ISO 27001 controls. This creates the structured baseline a VAPT can build on.",
};

function getCategory(score: number): { label: string; color: string; description: string } {
  if (score <= 25)
    return {
      label: "Foundation Stage",
      color: "text-red-400",
      description:
        "Significant gaps exist. We recommend a phased remediation programme before conducting a formal VAPT.",
    };
  if (score <= 50)
    return {
      label: "Developing",
      color: "text-orange-400",
      description:
        "A VAPT is possible but expect substantial findings. Pre-VAPT hardening will maximise the value of the engagement.",
    };
  if (score <= 75)
    return {
      label: "Strong",
      color: "text-yellow-400",
      description:
        "You're ready for a VAPT. Addressing your top 2–3 gaps will maximise the quality of findings.",
    };
  return {
    label: "Audit-Ready",
    color: "text-green-400",
    description:
      "A VAPT will validate and document an already-mature security posture. Well positioned.",
  };
}

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/nexaguard-placeholder";

export default function VaptAssessmentClient() {
  const [phase, setPhase] = useState<"intro" | "questions" | "email" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(15).fill(null));
  const [direction, setDirection] = useState(1);

  const [emailForm, setEmailForm] = useState({ name: "", email: "", company: "", newsletter: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [score, setScore] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [resultEmail, setResultEmail] = useState("");

  const handleAnswer = (optionScore: number | null, optionIndex: number) => {
    const storedValue = optionScore !== null ? optionScore : -(optionIndex + 1);
    const next = [...answers];
    next[currentQ] = storedValue;
    setAnswers(next);

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setDirection(1);
        setCurrentQ((q) => q + 1);
      } else {
        setPhase("email");
      }
    }, 220);
  };

  const isOptionSelected = (optionScore: number | null, optionIndex: number): boolean => {
    const stored = answers[currentQ];
    if (stored === null) return false;
    if (optionScore !== null) return stored === optionScore;
    return stored === -(optionIndex + 1);
  };

  const goBack = () => {
    if (currentQ > 0) {
      setDirection(-1);
      setCurrentQ((q) => q - 1);
    }
  };

  const computeResults = () => {
    const scorableAnswers = answers.slice(0, 14);
    const total = scorableAnswers.reduce<number>((sum, v) => {
      const n = v !== null && v >= 0 ? v : 0;
      return sum + n;
    }, 0);
    const avg = Math.round(total / 14);

    const scored = scorableAnswers
      .map((v, i) => ({ idx: i, score: v !== null && v >= 0 ? v : 0 }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map((x) => x.idx);

    const recs = scored.filter((idx) => RECOMMENDATIONS[idx]).map((idx) => RECOMMENDATIONS[idx]);

    return { avg, recs };
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const { avg, recs } = computeResults();
    const category = getCategory(avg);

    try {
      const res = await fetch("/api/vapt-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...emailForm,
          score: avg,
          category: category.label,
          recommendations: recs,
          answers,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setScore(avg);
      setRecommendations(recs);
      setResultEmail(emailForm.email);
      setPhase("results");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const q = QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;

  return (
    <main className="min-h-screen bg-[#010C13] pt-28 sm:pt-32">
      <div className="mx-auto max-w-2xl px-6 py-16">

        {/* === INTRO === */}
        {phase === "intro" && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="mb-5 inline-block rounded-full border border-cyan-400/30 px-4 py-1 text-cyan-300 text-xs">
              Free Self-Assessment
            </span>
            <h1 className="mb-5 font-bold text-3xl text-white sm:text-4xl lg:text-5xl">
              VAPT Readiness Self-Assessment
            </h1>
            <p className="mb-10 text-gray-400 text-base leading-relaxed sm:text-lg">
              15 questions. 5 minutes. Get a personalised readiness score and recommendations —
              displayed immediately and emailed to you.
            </p>
            <button
              className="rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-8 py-4 font-bold text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition hover:shadow-[0_0_30px_rgba(0,181,214,0.4)]"
              onClick={() => setPhase("questions")}
              type="button"
            >
              Start Assessment →
            </button>
          </motion.div>
        )}

        {/* === QUESTIONS === */}
        {phase === "questions" && (
          <div>
            {/* Progress bar */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-gray-500 text-xs">
                <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <AnimatePresence initial={false} mode="wait">
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                initial={{ opacity: 0, x: direction * 30 }}
                key={currentQ}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <h2 className="mb-2 font-semibold text-lg text-white sm:text-xl">{q.text}</h2>
                {currentQ === QUESTIONS.length - 1 && (
                  <p className="mb-6 text-gray-500 text-xs">
                    Context only — this question does not affect your score.
                  </p>
                )}
                {currentQ !== QUESTIONS.length - 1 && <div className="mb-8" />}
                <div className="flex flex-col gap-3">
                  {q.options.map((opt, optIdx) => {
                    const selected = isOptionSelected(opt.score, optIdx);
                    return (
                      <button
                        className={`flex items-center gap-3 rounded-xl border px-5 py-4 text-left text-sm transition-all duration-200 ${
                          selected
                            ? "border-cyan-500/60 bg-cyan-500/10 text-white"
                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-cyan-500/30 hover:bg-white/[0.06]"
                        }`}
                        key={opt.label}
                        onClick={() => handleAnswer(opt.score, optIdx)}
                        type="button"
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selected ? "border-cyan-400 bg-cyan-400" : "border-white/30"
                          }`}
                        >
                          {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <button
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-400 text-sm transition hover:text-white disabled:opacity-30"
                disabled={currentQ === 0}
                onClick={goBack}
                type="button"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                className="flex items-center gap-2 rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-6 py-2.5 font-semibold text-sm text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition hover:opacity-90 disabled:opacity-40"
                disabled={answers[currentQ] === null}
                onClick={() => {
                  if (currentQ < QUESTIONS.length - 1) {
                    setDirection(1);
                    setCurrentQ((q) => q + 1);
                  } else {
                    setPhase("email");
                  }
                }}
                type="button"
              >
                {currentQ === QUESTIONS.length - 1 ? "Get My Score" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* === EMAIL CAPTURE === */}
        {phase === "email" && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="mb-3 font-bold text-2xl text-white sm:text-3xl">
              Get Your Personalised VAPT Readiness Report
            </h2>
            <p className="mb-8 text-gray-400 text-base leading-relaxed">
              Enter your details below. Your score, category, and top recommendations will display
              immediately — and we&apos;ll also email you a copy.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleEmailSubmit}>
              {submitError && (
                <div className="rounded-lg bg-red-500/10 px-4 py-3 text-red-400 text-sm">
                  {submitError}
                </div>
              )}
              <input
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
                name="name"
                onChange={(e) => setEmailForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Full Name *"
                required
                type="text"
                value={emailForm.name}
              />
              <input
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
                name="email"
                onChange={(e) => setEmailForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="Work Email *"
                required
                type="email"
                value={emailForm.email}
              />
              <input
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
                name="company"
                onChange={(e) => setEmailForm((p) => ({ ...p, company: e.target.value }))}
                placeholder="Company Name *"
                required
                type="text"
                value={emailForm.company}
              />
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  checked={emailForm.newsletter}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-cyan-400"
                  onChange={(e) => setEmailForm((p) => ({ ...p, newsletter: e.target.checked }))}
                  type="checkbox"
                />
                <span className="text-gray-400 text-xs leading-relaxed">
                  Yes, send me occasional cybersecurity insights for UAE businesses (1–2
                  emails/month, unsubscribe anytime).
                </span>
              </label>
              <button
                className="mt-1 w-full rounded-lg py-3.5 font-semibold text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
                style={{
                  background: "linear-gradient(95.96deg, #18A7B7 20.55%, #1F88BF 64.75%)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
                type="submit"
              >
                {isSubmitting ? "Calculating your score..." : "See My Results →"}
              </button>
            </form>
          </motion.div>
        )}

        {/* === RESULTS === */}
        {phase === "results" && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {(() => {
              const cat = getCategory(score);
              return (
                <>
                  {/* Score card */}
                  <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                    <p className="mb-2 text-gray-400 text-xs uppercase tracking-widest">
                      Your VAPT Readiness Score
                    </p>
                    <div className="mb-2 font-bold text-7xl text-white sm:text-8xl">
                      {score}
                      <span className="text-4xl text-gray-500">/100</span>
                    </div>
                    <p className={`mb-3 font-semibold text-xl ${cat.color}`}>{cat.label}</p>
                    <p className="mx-auto max-w-sm text-gray-400 text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Recommendations */}
                  {recommendations.length > 0 && (
                    <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                      <h3 className="mb-5 font-semibold text-base text-white">
                        Your Top Recommendations
                      </h3>
                      <div className="flex flex-col gap-4">
                        {recommendations.map((r, i) => (
                          <div className="flex items-start gap-3" key={r}>
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 font-bold text-cyan-400 text-xs">
                              {i + 1}
                            </span>
                            <p className="text-gray-300 text-sm leading-relaxed">{r}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Email copy note */}
                  {resultEmail && (
                    <div className="mb-8 flex items-start gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-5 py-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                      <p className="text-gray-300 text-sm">
                        A copy of these results has been emailed to{" "}
                        <span className="text-white">{resultEmail}</span>.
                      </p>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col gap-4 text-center">
                    <a
                      className="rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-8 py-3.5 font-bold text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition hover:shadow-[0_0_30px_rgba(0,181,214,0.4)]"
                      href={CALENDLY_URL}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Want to discuss your results? Book a Free Audit →
                    </a>
                    <button
                      className="font-medium text-gray-400 text-sm transition hover:text-white"
                      onClick={() => {
                        setPhase("intro");
                        setCurrentQ(0);
                        setAnswers(Array(15).fill(null));
                        setScore(0);
                        setRecommendations([]);
                        setResultEmail("");
                      }}
                      type="button"
                    >
                      Restart Assessment
                    </button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </div>
    </main>
  );
}
