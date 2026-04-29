"use client";

import { motion, AnimatePresence, useScroll, useMotionValue, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { features } from "@/app/data";

const TOTAL = features.length;

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);

  const cardIndex = Math.round(progress * (TOTAL - 1));
  const showLeft = progress > 0.05;
  const showRight = progress < 0.95;

  // Detect mobile after mount (avoids hydration mismatch)
  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // useScroll tracks scroll progress through the sticky section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Drive rail x-translation from scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setProgress(v);
      if (prefersReduced || !railRef.current) return;
      const maxX = -(railRef.current.scrollWidth - window.innerWidth + 40);
      x.set(v * maxX);
    });
  }, [scrollYProgress, prefersReduced, x]);

  // Click arrows: snap to next / previous card position
  const scrollByCard = (dir: 1 | -1) => {
    if (!sectionRef.current) return;
    const sectionTop =
      sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollRange =
      sectionRef.current.offsetHeight - window.innerHeight;
    const targetCard = Math.max(0, Math.min(TOTAL - 1, cardIndex + dir));
    const targetProgress = TOTAL > 1 ? targetCard / (TOTAL - 1) : 0;
    window.scrollTo({
      top: sectionTop + targetProgress * scrollRange,
      behavior: "smooth",
    });
  };

  // Shared card renderer
  const renderCard = (item: (typeof features)[0]) => (
    <div
      key={item.id}
      className={`rail-card group relative h-full w-[78vw] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#05070a] transition-all duration-500 hover:scale-[1.02] md:w-[500px] ${item.border} ${item.shadow}`}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Scanner beam on hover */}
      <div className="absolute top-0 left-0 z-10 h-0.5 w-full -translate-y-full bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50 group-hover:animate-[scan_3s_linear_infinite]" />

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 h-4 w-4 border-t border-l border-white/20 transition-colors group-hover:border-cyan-400" />
      <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-white/20 transition-colors group-hover:border-cyan-400" />
      <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/20 transition-colors group-hover:border-cyan-400" />
      <div className="absolute right-4 bottom-4 h-4 w-4 border-r border-b border-white/20 transition-colors group-hover:border-cyan-400" />

      <div className="relative z-20 flex h-full flex-col justify-between p-8 md:p-10">
        <div className="flex items-start justify-between">
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

        <div>
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
  );

  // ── Mobile: native horizontal scroll, no sticky ──
  if (mounted && isMobile) {
    return (
      <section className="relative bg-[#020305] py-16">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-900/10 mix-blend-screen blur-[150px]" />
        </div>

        <div className="relative z-10 px-6 mb-8">
          <h2 className="text-left font-bold text-3xl text-white tracking-tight">
            Why{" "}
            <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Companies Choose Nexaguard
            </span>
          </h2>
        </div>

        <div className="relative z-10 mt-6 overflow-x-auto pb-4">
          <div className="flex w-fit gap-6 px-6" style={{ minHeight: "380px" }}>
            {features.map((item) => renderCard(item))}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop: sticky horizontal scroll driven by page scroll ──
  return (
    <section
      ref={sectionRef}
      className="relative bg-[#020305]"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-900/10 mix-blend-screen blur-[150px]" />
        </div>

        {/* ── Heading — no eyebrow ── */}
        <div className="z-20 w-full shrink-0 px-8 pt-16 pb-0 md:px-20 md:pt-20">
          <h2 className="text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
            Why{" "}
            <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Companies Choose Nexaguard
            </span>
          </h2>
        </div>

        {/* ── Rail — mt-12 between heading and cards ── */}
        <div className="relative z-10 mt-12 flex grow items-center overflow-hidden">
          <motion.div
            ref={railRef}
            style={{ x }}
            className="flex h-[50vh] min-h-[360px] w-fit items-center gap-8 px-8 md:gap-12 md:px-20"
          >
            <div className="w-[5vw]" />
            {features.map((item) => renderCard(item))}
            <div className="w-[10vw]" />
          </motion.div>
        </div>

        {/* ── Left arrow — clickable ── */}
        <AnimatePresence>
          {showLeft && (
            <motion.button
              key="arrow-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollByCard(-1)}
              aria-label="Previous pillar"
              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm transition-colors hover:border-cyan-400/40 hover:bg-white/10"
            >
              <ChevronLeft className="h-6 w-6 text-cyan-400" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Right arrow — clickable with bounce ── */}
        <AnimatePresence>
          {showRight && (
            <motion.button
              key="arrow-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollByCard(1)}
              aria-label="Next pillar"
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm transition-colors hover:border-cyan-400/60 hover:bg-cyan-400/20"
            >
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="flex"
              >
                <ChevronRight className="h-6 w-6 text-cyan-400" />
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Progress bar (no label or counter) ── */}
        <div className="z-20 w-full shrink-0 px-8 pb-12 md:px-20">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
