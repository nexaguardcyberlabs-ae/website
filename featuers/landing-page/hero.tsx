"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Headline words stagger in
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

        // 2. Subtext fades up
        .fromTo(
          subTextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8"
        )

        // 3. CTA Button pops in
        .fromTo(
          ctaButtonRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.6"
        )

        // 4. Trust Bar separator expands
        .fromTo(
          ".trust-separator",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1 },
          "-=0.4"
        )

        // 5. Partner logos stagger in
        .fromTo(
          ".partner-logo",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          "-=0.8"
        );
    },
    { scope: containerRef }
  );

  return (
    <main
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#010102] bg-grid bg-hero-gradient bg-fixed pt-20 font-sans"
      ref={containerRef}
    >
      {/* --- Background Layers --- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      >
        {/* SVG Background */}
        <Image
          alt="Hero background"
          className="absolute inset-0 h-full w-full object-cover"
          fill
          priority
          src="/landing/landing-hero-sec.svg"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid opacity-70" />

        {/* Light effect overlay */}
        <Image
          alt="Light effect"
          className="pointer-events-none absolute top-0 left-0 z-1 h-auto w-full select-none opacity-20 mix-blend-overlay"
          height={2080}
          priority
          src="/landing/Hero-shadow.png"
          width={2920}
        />
      </div>

      {/* --- Main Hero Content --- */}
      <section className="z-10 flex grow flex-col items-center justify-center px-4 text-center sm:px-6">
        <h1
          className="font-medium text-4xl leading-tight tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
          ref={heroTextRef}
        >
          <span className="inline-block bg-[linear-gradient(91.66deg,#FFFFFF_24.97%,#19A7B6_108.37%)] bg-clip-text pt-10 pb-5 text-transparent -tracking-[0.02em]">
            Securing <span className="text-nexacyan">Tomorrow.</span>
            <br className="hidden sm:block" /> Transforming{" "}
            <span className="text-nexacyan">Today.</span>
          </span>
        </h1>

        <p
          className="mt-6 max-w-3xl px-2 text-gray-300 text-sm leading-relaxed opacity-0 sm:mt-8 sm:text-lg md:text-xl"
          ref={subTextRef}
        >
          Nexaguard Cyberlabs empowers modern enterprises with the confidence to
          operate, innovate, and grow in an increasingly complex digital
          landscape. We combine world-class cybersecurity with strategic digital
          transformation to strengthen resilience, elevate performance, and
          shape the future of your organization—starting now.
        </p>
        <Link href="/contact">
          <button
            className="mt-8 cursor-pointer rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%),linear-gradient(100.85deg,rgba(255,255,255,0.016)_9.42%,rgba(255,255,255,0.016)_62.38%)] px-6 py-3 font-bold text-sm text-white opacity-0 bg-blend-overlay shadow-[0px_4px_4px_0px_#00000040_inset] outline-none transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,181,214,0.5)] sm:mt-12 sm:px-8 sm:py-3 sm:text-lg"
            ref={ctaButtonRef}
            type="button"
          >
            Speak to a Strategic Advisor
          </button>
        </Link>
        {/* --- Trust Bar --- */}
        {/* <div className="z-10 w-full px-4 pt-25">
          <div className="trust-separator mx-auto mb-6 flex max-w-6xl origin-center items-center sm:mb-8">
            <div className="h-px grow bg-linear-to-r from-transparent via-gray-700 to-gray-700" />
            <span className="mx-2 shrink-0 text-center text-[10px] text-white uppercase tracking-widest sm:mx-4 sm:text-sm">
              Certified Experts, Trusted by Industry Leaders
            </span>
            <div className="h-px grow bg-linear-to-l from-transparent via-gray-700 to-gray-700" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-20">
            <div className="partner-logo relative opacity-0 grayscale transition-all duration-300 hover:grayscale-0">
              <Image
                alt="ISO 27001 Certified"
                className="object-contain"
                height={150}
                src="/landing/Experts2.svg"
                width={150}
              />
            </div>
            <div className="partner-logo relative opacity-0 grayscale transition-all duration-300 hover:grayscale-0">
              <Image
                alt="Partner Logo 1"
                className="object-contain"
                height={100}
                src="/landing/Experts1.svg"
                width={100}
              />
            </div>
            <div className="partner-logo relative opacity-0 grayscale transition-all duration-300 hover:grayscale-0">
              <Image
                alt="Partner Logo 3"
                className="object-contain"
                height={150}
                src="/landing/Experts3.svg"
                width={150}
              />
            </div>
          </div>
        </div> */}
      </section>

      {/* Footer Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-40 w-full bg-linear-to-t from-nexadark-900 to-transparent sm:h-64" />
    </main>
  );
}
