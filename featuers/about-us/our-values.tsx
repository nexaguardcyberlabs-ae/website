"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// UPDATED DATA: Spans are now defined for mobile (default) and desktop (md:)
const values = [
  {
    title: "Clarity",
    description: "We simplify complexity. We deliver the signal that matters.",
    icon: "/about/values-icon1.svg",
    // Mobile: Full width (2 cols) | Desktop: Wide (2 cols)
    className: "col-span-2 md:col-span-2",
  },
  {
    title: "Resilience",
    description:
      "Systems designed to withstand disruption and adapt under stress.",
    icon: "/about/values-icon3.svg",
    // Mobile: Tall (2 rows) on left | Desktop: Tall (2 rows) on right
    className: "row-span-2 col-span-1 md:col-span-1 md:row-span-2",
  },
  {
    title: "Precision",
    description: "Rigorous attention to detail. Measured twice, cut once.",
    icon: "/about/values-icon4.svg",
    // Mobile: Small Square | Desktop: Small Square
    className: "col-span-1 md:col-span-1",
  },
  {
    title: "Innovation",
    description:
      "Practical, forward-looking solutions for actual business problems.",
    icon: "/about/values-icon2.svg",
    // Mobile: Small Square | Desktop: Small Square
    className: "col-span-1 md:col-span-1",
  },
  {
    title: "Trust",
    description:
      "Total transparency and unwavering integrity in every interaction.",
    icon: "/about/values-icon5.svg",
    // Mobile: Full width | Desktop: Wide
    className: "col-span-2 md:col-span-2",
  },
  {
    title: "Partnership",
    description: "We align ourselves completely with your long-term vision.",
    icon: "/about/values-icon6.svg",
    // Mobile: Full width (to close the grid) | Desktop: Small square (to fit row)
    className: "col-span-2 md:col-span-1",
  },
];

export default function BentoValues() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".bento-card");

      // 1. Staggered Scale-In Entrance
      gsap.fromTo(
        cards,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  // Global Mouse Tracking for the Spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }
    const cards = containerRef.current.getElementsByClassName("bento-card");

    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#010C13] py-24 lg:py-32">
      {/* Background: Subtle Blue Glow Blob */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 rounded-full bg-[#00D2FF]/5 blur-[120px]" />

      {/* Background: Noise Texture (Premium Feel) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-9xl px-5 md:px-20">
        <div className="mx-auto mb-16 max-w-9xl md:text-left">
          <h2 className="mb-12 text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Values
            </span>
          </h2>
        </div>

        {/* === BENTO GRID === */}
        {/* CHANGED: grid-cols-2 (mobile) -> md:grid-cols-3 (tablet/desktop) */}
        <div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6"
          onMouseMove={handleMouseMove}
          ref={containerRef}
        >
          {values.map((item) => (
            <BentoCard item={item} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

// === SUB-COMPONENT: BENTO CARD ===
import Image from "next/image";

interface BentoCardItem {
  title: string;
  description: string;
  icon: string;
  className: string;
}

function BentoCard({ item }: { item: BentoCardItem }) {
  return (
    <div
      className={`bento-card group relative overflow-hidden rounded-3xl border border-white/5 bg-[#021420]/50 p-8 transition-colors duration-500 hover:border-[#00D2FF]/30 ${item.className}`}
    >
      {/* 1. SPOTLIGHT EFFECT (Internal Glow) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y), 
            rgba(0, 210, 255, 0.06), 
            transparent 40%
          )`,
        }}
      />

      {/* 2. BACKGROUND GRID (Subtle) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#00D2FF 1px, transparent 1px), linear-gradient(90deg, #00D2FF 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        {/* Icon Header */}
        <div className="flex items-center justify-between">
          <div className="rounded-2xl">
            <Image
              alt={`${item.title} icon`}
              height={42}
              src={item.icon}
              width={42}
            />
          </div>

          {/* Corner Tech Decoration */}
          <div className="flex gap-1">
            <div className="h-1 w-1 rounded-full bg-[#00D2FF]/20 transition-colors group-hover:bg-[#00D2FF]" />
            <div className="h-1 w-1 rounded-full bg-[#00D2FF]/20" />
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="mb-3 font-bold text-2xl text-white transition-colors duration-300 group-hover:text-[#00D2FF]">
            {item.title}
          </h3>
          <p className="max-w-sm text-slate-400 text-sm leading-relaxed transition-colors group-hover:text-slate-300">
            {item.description}
          </p>
        </div>
      </div>

      {/* 3. BORDER BEAM (Animation) */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute top-0 left-0 h-[1px] w-full -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent" />
      </div>
    </div>
  );
}
