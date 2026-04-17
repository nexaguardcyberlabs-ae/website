"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const bgImage = "/about-bg.jpg";

export default function AboutUsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textTitleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000", // Long scroll for smoothness
          scrub: 1,
          pin: true, // Lock the section
          anticipatePin: 1,
        },
      });

      // 1. Image Expansion & Colorize
      tl.fromTo(
        imageWrapperRef.current,
        {
          width: "30%",
          height: "40%",
          borderRadius: "30px",
          filter: "grayscale(100%) brightness(0.8)",
        },
        {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          filter: "grayscale(0%) brightness(0.6)", // Darken slightly for text readability
          duration: 2,
          ease: "power2.inOut",
        }
      )
        // 2. Title Fly-Through (Scale UP and Fade OUT)
        .fromTo(
          textTitleRef.current,
          { scale: 1, opacity: 1 },
          { scale: 15, opacity: 0, duration: 1.5, ease: "power2.in" },
          "<" // Start at same time as image expansion
        )
        // 3. Content Float Up
        .fromTo(
          contentRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.5" // Slight overlap
        );

      // HUD Fade In
      gsap.to(".hud-element", {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=500", // Wait a bit
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="relative z-10 bg-[#020305]" ref={containerRef}>
      {/* Sticky Container */}
      <div
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        ref={stickyRef}
      >
        {/* --- 1. The Expanding Image --- */}
        <div
          className="relative z-10 overflow-hidden shadow-2xl"
          ref={imageWrapperRef}
          style={{ width: "30%", height: "40%" }} // Initial state
        >
          <Image
            alt="Nexa Operations"
            className="object-cover"
            fill
            priority
            src={bgImage}
          />

          {/* Overlay Grid (Visible when full screen) */}
          <div className="absolute inset-0 bg-[url('/landing/noise.png')] opacity-20 mix-blend-overlay dark:bg-[url('/landing/noise-dark.png')]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        {/* --- 2. The Fly-Through Title --- */}
        <h2
          className="pointer-events-none absolute z-20 text-center font-black text-[8vw] text-white leading-none tracking-tighter mix-blend-difference"
          ref={textTitleRef}
        >
          WHO WE ARE
        </h2>

        {/* --- 3. The Revealed Content --- */}
        <div
          className="pointer-events-none absolute z-30 flex h-full w-full flex-col items-center justify-center px-6 pb-20"
          ref={contentRef}
        >
          <div className="pointer-events-auto w-full max-w-9xl">
            <div className="mx-auto mb-8 w-fit rounded-full border border-cyan-400 px-6 py-2 font-medium text-sm uppercase tracking-wider sm:text-base">
              About Us
            </div>
            {/* Intro Block */}
            <div className="mb-8 flex flex-col items-center justify-center pl-6 text-center">
              <h3 className="mb-4 text-center font-bold text-4xl text-white md:text-6xl">
                Your Trusted Cybersecurity & <br />
                <span className="bg-linear-to-r from-cyan-400 to-white bg-clip-text text-transparent">
                  Digital Transformation Partner
                </span>
              </h3>
              <p className="max-w-6xl text-center text-2xl text-slate-300 leading-relaxed">
                Nexaguard Cyberlabs supports global enterprises in strengthening
                cyber defenses and modernizing their digital ecosystem. Guided
                by precision and strategic clarity, we deliver solutions that
                empower organizations to adapt, innovate, and lead in
                today&apos;s dynamic digital landscape.
              </p>
            </div>
          </div>
        </div>

        {/* --- 4. HUD Elements (Fixed Decorations) --- */}
        {/* Top Left */}

        {/* Bottom Left Corner */}
        <div className="hud-element absolute bottom-8 left-8 z-40 h-16 w-16 border-white/20 border-b border-l opacity-0" />

        {/* Bottom Right Corner */}
        <div className="hud-element absolute right-8 bottom-8 z-40 h-16 w-16 border-white/20 border-r border-b opacity-0" />
      </div>
    </section>
  );
}
