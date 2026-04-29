"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, BookOpen, Users } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Users,
    headline: "Senior Practitioners. Always.",
    copy: "The expert in your discovery call is the one running your assessment. No junior handover.",
  },
  {
    icon: BookOpen,
    headline: "UAE Compliance, Fluently.",
    copy: "NESA, ADGM, DIFC, ADHICS, ISO 27001 — we speak the language your auditors use.",
  },
  {
    icon: Award,
    headline: "Reports Written to Be Acted On.",
    copy: "Documentation your engineers can act on, your board can read, and your auditors will accept. Built around the realities of your environment, not lifted from a template.",
  },
];

export default function TrustPillars() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pillar-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      className="relative w-full px-4 py-20"
      ref={containerRef}
      style={{
        background:
          "linear-gradient(to bottom, #010102 0%, #020d14 40%, #020305 100%)",
      }}
    >
      {/* Radial glow to eliminate black void */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(24,167,183,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                className="pillar-card group relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_8px_40px_rgba(0,181,214,0.12)]"
                key={p.headline}
              >
                {/* Accent line that grows on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <Icon className="h-6 w-6 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-lg text-white leading-snug">
                  {p.headline}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {p.copy}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
