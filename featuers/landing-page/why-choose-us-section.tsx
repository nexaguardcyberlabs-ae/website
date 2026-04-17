"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { features } from "@/app/data";

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WhyChooseUs = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rail = railRef.current;
      if (!rail) {
        return;
      }

      const getScrollAmount = () => -(rail.scrollWidth - window.innerWidth);

      gsap.to(rail, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${rail.scrollWidth}`, // Scroll duration proportional to width
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress Bar
      gsap.fromTo(
        ".progress-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${rail.scrollWidth}`,
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="relative bg-[#020305]" ref={sectionRef}>
      <div
        className="relative flex h-screen w-full flex-col justify-between overflow-hidden py-20"
        ref={triggerRef}
      >
        {/* --- Background Elements --- */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Ambient Glow */}
          <div className="absolute bottom-0 left-0 h-125 w-125 rounded-full bg-cyan-900/10 mix-blend-screen blur-[150px]" />
        </div>

        {/* --- 1. Header (Static at top, Flex Item) --- */}
        <div className="z-20 w-full shrink-0 px-8 pt-16 pb-2 md:px-20 md:pt-20">
          <h2 className="mb-2 text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
            Why{" "}
            <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
              enterprises should choose us
            </span>
          </h2>
        </div>

        {/* --- 2. Horizontal Rail (Takes remaining space) --- */}
        <div className="relative z-10 flex w-full grow items-center">
          <div
            className="flex h-[50vh] min-h-100 w-fit items-center gap-8 px-8 md:gap-12 md:px-20"
            ref={railRef}
          >
            {/* Spacer */}
            <div className="w-[5vw]" />

            {features.map((item) => (
              <div
                className={`rail-card group relative h-full w-[85vw] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#05070a] transition-all duration-500 hover:scale-[1.02] md:w-125 ${item.border} ${item.shadow}
                `}
                key={item.id}
              >
                {/* --- CARD VISUALS --- */}

                {/* Circuit Grid Background */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Animated Scanner Beam */}
                <div className="absolute top-0 left-0 z-10 h-0.5 w-full -translate-y-full bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50 group-hover:animate-[scan_3s_linear_infinite]" />

                {/* Corner Brackets (Tech HUD) */}
                <div className="absolute top-4 left-4 h-4 w-4 border-white/20 border-t border-l transition-colors group-hover:border-cyan-400" />
                <div className="absolute top-4 right-4 h-4 w-4 border-white/20 border-t border-r transition-colors group-hover:border-cyan-400" />
                <div className="absolute bottom-4 left-4 h-4 w-4 border-white/20 border-b border-l transition-colors group-hover:border-cyan-400" />
                <div className="absolute right-4 bottom-4 h-4 w-4 border-white/20 border-r border-b transition-colors group-hover:border-cyan-400" />

                {/* --- CARD CONTENT --- */}
                <div className="relative z-20 flex h-full flex-col justify-between p-8 md:p-10">
                  {/* Top: ID & Tag */}
                  <div className="flex items-start justify-between">
                    {/* Holographic Number */}
                    <span className="font-bold font-mono text-6xl text-white/5 transition-colors group-hover:text-white/10">
                      {item.id}
                    </span>

                    <div className="rounded">
                      <Image
                        alt={`${item.title} icon`}
                        className="opacity-80"
                        height={38}
                        src={item.icon}
                        width={38}
                      />
                    </div>
                  </div>

                  {/* Bottom: Text Info */}
                  <div>
                    {/* Tech Decorative Line */}
                    <div className="mb-6 h-0.5 w-12 bg-white/20 transition-all duration-700 group-hover:w-full group-hover:bg-cyan-500/50" />

                    <h3 className="mb-4 font-bold text-2xl text-white transition-colors group-hover:text-white md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="text-base text-slate-400 leading-relaxed transition-colors group-hover:text-slate-300 md:text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* End Spacer */}
            <div className="w-[10vw]" />
          </div>
        </div>

        {/* --- 3. Progress Bar (Pinned to bottom) --- */}
        <div className="z-20 w-full px-8 pb-12 md:px-20">
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div className="progress-fill h-full w-full origin-left bg-cyan-500" />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-white/30 uppercase tracking-widest">
            <span>Start Sequence</span>
            <span>End Sequence</span>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style global jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(500px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
