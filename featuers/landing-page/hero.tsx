"use client";

import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Lock, Shield, Handshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import MeshGradientBackground from "@/components/backgrounds/MeshGradientBackground";
import SecurityMeshBackground from "@/components/backgrounds/SecurityMeshBackground";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/nexaguard-placeholder";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heroTextRef.current,
        { y: 50, opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          delay: 0.2,
        }
      )
        .fromTo(
          subTextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  return (
    <main
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#010102] pt-28 sm:pt-32 font-sans"
      ref={containerRef}
    >
      {/* ── Background Layers ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* Layer 0: Original hero assets */}
        <Image
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          fill
          priority
          src="/landing/landing-hero-sec.svg"
        />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <Image
          alt=""
          className="pointer-events-none absolute top-0 left-0 h-auto w-full select-none opacity-15 mix-blend-overlay"
          height={2080}
          priority
          src="/landing/Hero-shadow.png"
          width={2920}
        />

        {/* Layer 1: Mesh gradient blobs */}
        <MeshGradientBackground />

        {/* Layer 2: Security mesh lattice */}
        <SecurityMeshBackground opacity={0.2} />

        {/* Layer 3: Decorative SVG shapes — corners & edges */}
        {!prefersReduced && (
          <>
            {/* Top-right hex ring */}
            <svg
              aria-hidden="true"
              className="absolute -top-16 -right-16 h-72 w-72 opacity-[0.07]"
              viewBox="0 0 200 200"
              style={{ animation: "mesh-drift-3 40s ease-in-out infinite alternate", willChange: "transform" }}
            >
              <polygon points="100,10 185,57 185,143 100,190 15,143 15,57" fill="none" stroke="#18A7B7" strokeWidth="1.5" />
              <polygon points="100,30 165,67 165,133 100,170 35,133 35,67" fill="none" stroke="#18A7B7" strokeWidth="0.8" />
              <polygon points="100,50 145,77 145,123 100,150 55,123 55,77" fill="none" stroke="#18A7B7" strokeWidth="0.5" />
            </svg>

            {/* Bottom-left circuit motif */}
            <svg
              aria-hidden="true"
              className="absolute -bottom-10 -left-10 h-64 w-64 opacity-[0.07]"
              viewBox="0 0 200 200"
              style={{ animation: "mesh-drift-1 35s ease-in-out infinite alternate", willChange: "transform" }}
            >
              <rect x="20" y="20" width="160" height="160" rx="8" fill="none" stroke="#1F88BF" strokeWidth="1" />
              <rect x="50" y="50" width="100" height="100" rx="4" fill="none" stroke="#18A7B7" strokeWidth="0.8" />
              <line x1="20" y1="100" x2="50" y2="100" stroke="#18A7B7" strokeWidth="1" />
              <line x1="150" y1="100" x2="180" y2="100" stroke="#18A7B7" strokeWidth="1" />
              <line x1="100" y1="20" x2="100" y2="50" stroke="#18A7B7" strokeWidth="1" />
              <line x1="100" y1="150" x2="100" y2="180" stroke="#18A7B7" strokeWidth="1" />
              <circle cx="100" cy="100" r="15" fill="none" stroke="#18A7B7" strokeWidth="0.8" />
            </svg>

            {/* Top-left shield outline */}
            <svg
              aria-hidden="true"
              className="absolute top-1/4 left-4 h-40 w-40 opacity-[0.06]"
              viewBox="0 0 100 120"
              style={{ animation: "mesh-drift-2 28s ease-in-out infinite alternate", willChange: "transform" }}
            >
              <path d="M50,5 L90,20 L90,60 Q90,95 50,115 Q10,95 10,60 L10,20 Z" fill="none" stroke="#18A7B7" strokeWidth="1.5" />
              <path d="M50,20 L75,32 L75,58 Q75,82 50,97 Q25,82 25,58 L25,32 Z" fill="none" stroke="#18A7B7" strokeWidth="0.8" />
            </svg>
          </>
        )}

        {/* Layer 4: Radial spotlight behind content */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(24,167,183,0.08) 0%, rgba(31,136,191,0.04) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Main Hero Content — Single-column centered ── */}
      <section className="relative z-10 flex grow flex-col items-center justify-center px-4 text-center sm:px-6">
        <div className="mx-auto w-full max-w-[900px]">

          {/* H1 — no eyebrow badge */}
          <h1
            className="font-bold text-4xl leading-tight tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            ref={heroTextRef}
          >
            <span className="inline-block -tracking-[0.02em]">
              <span className="bg-[linear-gradient(91.66deg,#FFFFFF_24.97%,#19A7B6_108.37%)] bg-clip-text text-transparent">
                Breaches Are Preventable.
              </span>
              <br />
              <span className="text-white">Yours Will Be.</span>
            </span>
          </h1>

          {/* Subhead + catchy copy */}
          <div ref={subTextRef} className="opacity-0">
            <p className="mx-auto mt-6 max-w-2xl text-gray-300 text-base leading-relaxed sm:text-lg md:text-xl">
              Senior practitioners. Honest scoping. Reports that actually drive remediation.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-gray-400 text-sm leading-relaxed italic sm:text-base">
              Built for the businesses regulators audit, enterprises evaluate, and attackers target.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row"
            ref={ctaRef}
          >
            <a
              className="hero-primary-cta rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%)] px-8 py-3.5 font-bold text-sm text-white shadow-[0px_4px_4px_0px_#00000040_inset] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,181,214,0.5)] sm:text-base"
              href={CALENDLY_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get Free Audit →
            </a>
            <Link
              className="rounded-full border border-white/20 px-8 py-3.5 font-semibold text-sm text-white transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/5 sm:text-base"
              href="/services"
            >
              See Our Services
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex items-center justify-center gap-6 opacity-50">
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Lock className="h-3.5 w-3.5 text-cyan-400" />
              Trusted methodology
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Shield className="h-3.5 w-3.5 text-cyan-400" />
              Senior-led
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Handshake className="h-3.5 w-3.5 text-cyan-400" />
              Discreet
            </span>
          </div>

        </div>
      </section>

      {/* Footer fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-40 w-full bg-linear-to-t from-nexadark-900 to-transparent sm:h-64" />
    </main>
  );
}
