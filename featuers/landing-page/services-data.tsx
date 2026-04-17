"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useRef, useState } from "react";
import { servicesData } from "@/app/data";

// Register Plugins
gsap.registerPlugin(ScrollTrigger);

// --- Utility for the Scramble Effect using GSAP ---
const chars = "!@#$%^&*()_+-=[]{}|;':,./<>?";
const scrambleText = (
  element: HTMLElement | null,
  newText: string,
  duration = 0.6
) => {
  if (!element) {
    return;
  }
  const originalText = newText;
  const length = originalText.length;

  gsap.to(
    { progress: 0 },
    {
      progress: 1,
      duration,
      ease: "power2.inOut",
      onUpdate(this: { progress: number }) {
        const progress = this.progress;
        const scrambled = originalText
          .split("")
          .map((_char, charIndex) => {
            if (charIndex < length * progress) {
              return originalText[charIndex];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        element.innerText = scrambled;
      },
      onComplete: () => {
        element.innerText = originalText;
      },
    }
  );
};

export default function CoreServicesSection() {
  const [activeId, setActiveId] = useState(servicesData[0].id);
  // Get active index for the sliding indicator
  const activeIndex = servicesData.findIndex((s) => s.id === activeId);
  const activeService = servicesData[activeIndex];

  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // --- 1. Initial Scroll Entrance ---
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Reveal Container
      tl.fromTo(
        cardRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" }
      )
        // Stagger in the sidebar items
        .fromTo(
          ".sidebar-item",
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
          "-=0.4"
        )
        // Reveal initial content
        .fromTo(
          contentRef.current,
          { opacity: 0, filter: "blur(12px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  // --- 2. Handle Tab Switch Animation ---
  const handleTabClick = (id: string) => {
    if (id === activeId) {
      return;
    }

    // A. Animate Content OUT
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -15,
      filter: "blur(12px)",
      duration: 0.25,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveId(id); // State Update
      },
    });
  };

  // --- 3. Animate Content IN (When activeId changes) ---
  useGSAP(() => {
    if (!contentRef.current) {
      return;
    }

    const tl = gsap.timeline();

    // Scramble the title
    scrambleText(titleRef.current, activeService.name, 0.5);

    // Fade/Slide Content IN
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 15, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power3.out",
      }
    )
      // Stagger the list items inside the content
      .fromTo(
        ".detail-item",
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: "power2.out" },
        "-=0.4"
      );

    // Animate the sliding indicator using GSAP for smoothness
    gsap.to(indicatorRef.current, {
      y: `${activeIndex * 100}%`,
      duration: 0.5,
      ease: "cubic.inOut",
      overwrite: "auto",
    });
  }, [activeId]); // Re-run when activeId changes

  // --- 4. Mouse Spotlight Effect with Smooth Following ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(cardRef.current && spotlightRef.current)) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(spotlightRef.current, {
      x,
      y,
      duration: 0.3,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(spotlightRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden bg-[#02131E] px-4 py-24 sm:py-32"
      ref={containerRef}
    >
      {/* Ultra Subtle Background Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(circle at center, black 50%, transparent 100%)",
        }}
      />
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        <div className="absolute top-[-20%] left-[20%] h-125 w-125 rounded-full bg-cyan-900/20 mix-blend-screen blur-[120px]" />
        <div className="absolute right-[10%] bottom-[-10%] h-100 w-100 rounded-full bg-blue-900/10 mix-blend-screen blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-9xl px-5 md:px-20">
        <h2 className="mb-12 text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
          Our Core{" "}
          <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Services
          </span>
        </h2>

        {/* --- MAIN CARD --- */}
        <div
          className="group relative flex min-h-150 w-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#05050c] backdrop-blur-xl lg:flex-row"
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          ref={cardRef}
          style={{ WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Spotlight Gradient Element */}
          <div
            className="pointer-events-none absolute -top-40 -left-40 z-30 h-80 w-80 rounded-full bg-cyan-500/20 opacity-0 mix-blend-overlay blur-[60px]"
            ref={spotlightRef}
            style={{
              willChange: "transform, opacity",
              WebkitBackfaceVisibility: "hidden",
            }}
          />

          {/* --- LEFT: Navigation --- */}
          <div className="relative z-20 w-full border-cyan-200/10 border-b bg-black/20 lg:w-[35%] lg:border-r lg:border-b-0">
            {/* Sliding Indicator (The glowing bar) */}
            <div
              className="absolute top-0 left-0 z-30 hidden h-[25%] w-1 bg-linear-to-b from-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all lg:block lg:h-[calc(100%/6)]"
              ref={indicatorRef}
              style={{ height: `${100 / servicesData.length}%` }} // Dynamic height based on item count
            />

            {servicesData.map((service) => {
              const isActive = activeId === service.id;
              return (
                <button
                  className={`sidebar-item group/btn relative flex w-full items-center justify-between overflow-hidden border-cyan-200/10 border-b p-3 text-left outline-none transition-all duration-300 last:border-0 lg:p-6 ${isActive ? "bg-white/3" : "hover:bg-white/2"}
                  `}
                  key={service.id}
                  onClick={() => handleTabClick(service.id)}
                  style={{
                    height: `${100 / servicesData.length}%`,
                    willChange: isActive ? "background-color" : "auto",
                  }}
                  type="button"
                >
                  <div className="relative z-10 flex flex-col gap-1">
                    <span
                      className={`mb-1 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                        isActive ? "text-cyan-400" : "text-slate-500"
                      }`}
                    >
                      {service.id}
                    </span>
                    <span
                      className={`font-medium text-lg transition-colors duration-300 sm:text-xl ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover/btn:text-slate-200"
                      }`}
                    >
                      {service.name}
                    </span>
                  </div>

                  {/* Arrow Icon that glows on active */}
                  <svg
                    className={`transform transition-all duration-500 ${
                      isActive
                        ? "translate-x-0 text-cyan-400 opacity-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                        : "-translate-x-4 text-slate-500 opacity-0"
                    }`}
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Arrow</title>
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* --- RIGHT: Content Display --- */}
          <div className="relative w-full bg-[url('/landing/grid-noise.png')] bg-repeat opacity-100 lg:w-[65%]">
            {/* Tech Grid Overlay inside Content Area */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
              style={{
                backgroundColor: "rgba(1,12,19,0.8)",
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), 
                    linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
                transition: "background-color 0.3s ease-in-out",
              }}
            />

            <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-transparent via-transparent to-cyan-900/10" />

            {/* Scrollable container for mobile, centered for desktop */}
            <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-12 md:p-16">
              <div
                className="w-full"
                ref={contentRef}
                style={{ willChange: "opacity, transform" }}
              >
                {/* Header Area */}
                <div className="mb-8 border-white/10 border-b pb-6">
                  <h3
                    className="mb-2 font-bold font-mono text-3xl text-white tracking-tight sm:text-4xl"
                    ref={titleRef}
                  >
                    {activeService.name}
                  </h3>
                  <p className="font-mono text-cyan-400/80 text-sm uppercase tracking-wider">
                    ({activeService.id})
                  </p>
                </div>

                {/* Description */}
                <p className="mb-10 max-w-2xl text-lg text-slate-300 leading-relaxed">
                  {activeService.description}
                </p>

                {/* Subheader */}
                <h4 className="mb-6 flex items-center gap-2 font-semibold text-lg text-white">
                  <span className="h-2 w-2 animate-pulse rounded-sm bg-cyan-500" />
                  {activeService.subHeader}
                </h4>

                {/* Features List */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {activeService.list.map((item) => (
                    <div
                      className="detail-item group/item flex items-start gap-3"
                      key={item}
                      style={{ willChange: "opacity, transform" }}
                    >
                      <div className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover/item:border-cyan-500/50 group-hover/item:bg-cyan-500/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-0 transition-opacity group-hover/item:opacity-100" />
                      </div>
                      <span className="text-base text-slate-400 transition-colors group-hover/item:text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
