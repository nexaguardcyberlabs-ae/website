"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function VisionMission() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Card Entrance (3D Tilt + Fade)
      const cards = gsap.utils.toArray(".vision-card");

      tl.fromTo(
        cards,
        {
          y: 100,
          opacity: 0,
          rotateX: -20,
          transformPerspective: 1000,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // Staggered Text Reveal (Inside the cards)
      tl.fromTo(
        ".reveal-text",
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
        },
        "-=0.6"
      );

      // Scanner Line Animation (Continuous)
      gsap.to(scanLineRef.current, {
        top: "100%",
        duration: 4,
        ease: "linear",
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-[#020408] py-24 lg:py-32"
      ref={containerRef}
    >
      {/* --- Ambient Background & Grid --- */}
      <div className="pointer-events-none absolute inset-0">
        {/* 1. Ambient Glow Orbs */}
        <div className="absolute top-0 left-1/4 h-200 w-200 animate-pulse rounded-full bg-cyan-900/10 mix-blend-screen blur-[150px]" />
        <div className="absolute right-1/4 bottom-0 h-150 w-150 rounded-full bg-blue-900/10 mix-blend-screen blur-[150px]" />

        {/* 2. Subtle Global Grid */}
        <div
          className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(circle at center, black 50%, transparent 100%)",
          }}
        />
      </div>

      {/* --- Scanner Overlay --- */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-10 h-px w-full bg-linear-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        ref={scanLineRef}
      />

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-10 mx-auto max-w-9xl px-6 md:px-20">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* === CARD 1: VISION === */}
          <SpotlightCard
            icon={
              <svg
                className="h-8 w-8 text-[#00D2FF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Vision Icon</title>
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
              </svg>
            }
            title="Our Vision"
          >
            <div className="overflow-hidden">
              <p className="reveal-text mb-4 block font-semibold text-white text-xl leading-relaxed sm:text-2xl">
                To empower global enterprises with security and innovation that
                enable enduring performance.
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="reveal-text block text-base text-slate-400 leading-relaxed sm:text-lg">
                We envision a future where organizations do not slow down
                because of risk but move faster because risk is understood,
                managed, and engineered out of the system.
              </p>
            </div>
          </SpotlightCard>

          {/* === CARD 2: MISSION === */}
          <SpotlightCard
            icon={
              <svg
                className="h-8 w-8 text-[#00D2FF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Mission Icon</title>
                <path
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
              </svg>
            }
            title="Our Mission"
          >
            <div className="overflow-hidden">
              <p className="reveal-text mb-4 block font-semibold text-white text-xl leading-relaxed sm:text-2xl">
                To safeguard digital trust, accelerate innovation, and enable
                leaders to make confident decisions.
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="reveal-text block text-base text-slate-400 leading-relaxed sm:text-lg">
                Every engagement we undertake is aligned to this
                mission—protecting what matters today while preparing
                organizations for what comes next in a complex world.
              </p>
            </div>
          </SpotlightCard>
        </div>
      </div>

    </section>
  );
}

// === REUSABLE COMPONENT: SPOTLIGHT CARD ===
function SpotlightCard({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Mouse position state for the flashlight effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // Glitch Effect on Hover
  const handleMouseEnter = () => {
    if (!titleRef.current) {
      return;
    }
    const originalText = title;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";

    let iterations = 0;
    const interval = setInterval(() => {
      if (titleRef.current) {
        titleRef.current.innerText = originalText
          .split("")
          .map((_letter: string, letterIndex: number) => {
            if (letterIndex < iterations) {
              return originalText[letterIndex];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      }

      if (iterations >= originalText.length) {
        clearInterval(interval);
      }
      iterations += 1 / 2;
    }, 30);
  };

  return (
    <div
      className="vision-card group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-[#05070a]/80 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-500/30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
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

      {/* 1. Flashlight Gradient Layer (Reveals content) */}
      <div
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.1), transparent 80%)`,
        }}
      />

      {/* 2. Grid Pattern (Visible only under flashlight) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: opacity ? 0.15 : 0,
          backgroundImage:
            "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        }}
      />

      {/* 4. Content */}
      <div className="relative z-20 flex h-full flex-col justify-between p-8 md:p-12">
        {/* Header */}
        <div className="relative mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10">
            {icon}
          </div>
          <h3
            className="font-bold text-2xl text-white uppercase tracking-wider"
            ref={titleRef}
          >
            {title}
          </h3>
        </div>

        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
