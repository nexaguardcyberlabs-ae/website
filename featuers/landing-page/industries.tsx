"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CreditCard, Heart, Package, Zap } from "lucide-react";
import { useRef } from "react";
import GridPatternBackground from "@/components/backgrounds/GridPatternBackground";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    icon: CreditCard,
    title: "Fintech & Payments",
    description:
      "CBUAE, DIFC, ADGM compliance. VAPT for licensing. Investor-ready security posture.",
  },
  {
    icon: Zap,
    title: "SaaS & Technology",
    description:
      "Procurement-ready VAPT reports. ISO 27001 readiness. Security as a sales enabler.",
  },
  {
    icon: Heart,
    title: "Healthcare & Health-Tech",
    description:
      "DHA, DOH, ADHICS compliance. Patient data security. EMR/EHR security assessments.",
  },
  {
    icon: Package,
    title: "Logistics & E-commerce",
    description:
      "Application security. Payment data protection. Operational resilience.",
  },
];

export default function IndustriesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".industry-card",
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
      className="relative w-full bg-[#010C13] px-4 py-24"
      ref={containerRef}
    >
      <GridPatternBackground dotGrid />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <span className="mb-4 inline-block rounded-full border border-cyan-400/30 px-4 py-1 text-cyan-300 text-xs">
          Industries We Serve
        </span>
        <h2 className="mb-12 font-bold text-3xl text-white tracking-tight sm:text-4xl">
          Built for the Sectors We Know Best
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                className="industry-card group flex flex-col gap-5 rounded-2xl border border-transparent bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-cyan-500/[0.04] hover:shadow-[0_8px_32px_rgba(0,181,214,0.08)]"
                key={ind.title}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
                  <Icon
                    className="h-6 w-6 text-gray-400 transition-colors duration-300 group-hover:text-cyan-400"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-semibold text-base text-white">
                  {ind.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {ind.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
