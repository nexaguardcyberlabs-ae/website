"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function EngagementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const borderRectRef = useRef<SVGRectElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Entrance: Main Card Scales Up
      tl.fromTo(
        ".engagement-card",
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      // 2. Entrance: Columns slide up one by one
      tl.fromTo(
        ".engagement-col",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" },
        "-=0.4"
      );

      // 3. Continuous Animation: "Marching Ants" on Border
      // This rotates the dashed stroke infinitely
      if (borderRectRef.current) {
        gsap.to(borderRectRef.current, {
          strokeDashoffset: -100, // Negative moves it clockwise-ish
          duration: 30,
          repeat: -1,
          ease: "linear",
        });
      }

      // 4. Continuous Animation: Pulse the Dots
      gsap.to(".engagement-dot", {
        boxShadow: "0 0 20px rgba(0, 174, 239, 0.8)",
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="bg-[#02131E] py-24 lg:py-32">
      <div className="mx-auto max-w-9xl px-5 md:px-20" ref={containerRef}>
        {/* Main Container */}
        <div className="engagement-card relative w-full rounded-4xl bg-[#010C13] p-8 opacity-0 md:p-12 lg:p-16">
          {/* === YOUR SVG BORDER === */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <svg
              aria-label="Decorative engagement card border"
              className="h-full w-full"
            >
              <title>Engagement card border</title>
              <rect
                fill="none"
                height="calc(100% - 2px)"
                ref={borderRectRef}
                rx="10"
                ry="10"
                stroke="#18A7B780"
                strokeDasharray="8 8"
                strokeWidth="1"
                width="calc(100% - 2px)"
                x="1"
                y="1"
              />
            </svg>
          </div>

          {/* Grid Layout */}
          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-0">
            {/* === COLUMN 1 === */}
            <div className="engagement-col relative flex flex-col opacity-0">
              <div className="mb-8 flex w-full items-center gap-4">
                {/* Dot with Pulse Class */}
                <div className="engagement-dot z-10 h-4 w-4 shrink-0 rounded-full bg-[#00AEEF] shadow-[0_0_10px_rgba(0,174,239,0.5)]" />

                <div className="h-px flex-1 bg-gradient-to-r from-[#00AEEF] to-transparent" />
              </div>

              {/* Text Content */}
              <div className="lg:pr-16">
                {/* Your H3 Style */}
                <h3 className="mb-6 font-bold text-3xl text-white">
                  How{" "}
                  <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    We Engage
                  </span>
                </h3>

                <div className="space-y-6 text-base text-white leading-relaxed sm:text-lg">
                  <p>
                    We do not offer generic solutions. Every engagement begins
                    with understanding your business context, risk appetite, and
                    strategic priorities.
                  </p>
                  <p>
                    Our approach is structured, discreet, and outcome driven
                    designed for leadership teams that value precision and
                    accountability.
                  </p>
                </div>
              </div>
            </div>

            {/* === COLUMN 2 === */}
            <div className="engagement-col relative flex flex-col opacity-0">
              <div className="mb-8 flex w-full items-center gap-4">
                {/* Dot with Pulse Class */}
                <div className="engagement-dot z-10 h-4 w-4 shrink-0 rounded-full bg-[#00AEEF] shadow-[0_0_10px_rgba(0,174,239,0.5)]" />

                <div className="h-px flex-1 bg-gradient-to-r from-[#00AEEF] to-transparent" />
              </div>

              {/* Text Content */}
              <div className="lg:pl-6">
                {/* Your H3 Style */}
                <h3 className="mb-6 font-bold text-3xl text-white">
                  Global,{" "}
                  <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    Yet Personal
                  </span>
                </h3>

                <div className="space-y-6 text-base text-white leading-relaxed sm:text-lg">
                  <p>
                    With global delivery capabilities and regional expertise,
                    Nexaguard supports organizations across industries and
                    geographies—while maintaining a deeply personal, partner-led
                    engagement model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
