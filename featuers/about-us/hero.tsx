"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// 1. Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 }, // Changed y to x for a subtle slide-in from left
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-[#010C13]">
      {/* 2. Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Nexaguard Cyberlabs Background"
          className="object-cover object-center"
          fill
          priority
          quality={90}
          src="/about/hero.jpg"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#010C13]/85" />
      </div>

      <div className="relative z-10 mx-auto w-full px-4 py-20 sm:px-8 lg:px-16 xl:px-20">
        <motion.div
          animate="visible"
          className="mr-auto flex max-w-7xl flex-col items-start text-left"
          initial="hidden"
          variants={containerVariants}
        >
          {/* Headline */}
          <motion.h1
            className="font-bold text-4xl text-white leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            variants={itemVariants}
          >
            Engineering{" "}
            <span className="bg-[linear-gradient(91.3deg,#FFFFFF_0.85%,#19A7B6_108.42%)] bg-clip-text text-transparent">
              Digital Trust for a
            </span>{" "}
            <span className="mt-2 block bg-[linear-gradient(91.3deg,#FFFFFF_0.85%,#19A7B6_108.42%)] bg-clip-text text-transparent md:mt-4">
              Borderless World
            </span>
          </motion.h1>

          {/* Description */}
          <div className="mt-6 space-y-6 md:mt-8">
            <motion.p
              className="max-w-9xl text-base text-white leading-relaxed sm:text-lg md:text-xl md:leading-relaxed"
              variants={itemVariants}
            >
              In an era where digital systems underpin every strategic decision,
              trust has become the most valuable enterprise asset. Nexaguard
              Cyberlabs exists to protect that trust while enabling
              organizations to innovate, scale, and lead with confidence.
            </motion.p>

            <motion.p
              className="max-w-9xl text-base text-white leading-relaxed sm:text-lg md:text-xl"
              variants={itemVariants}
            >
              We partner with forward-thinking enterprises to secure
              today&apos;s digital foundations and architect tomorrow&apos;s
              transformation.
            </motion.p>
          </div>

          {/* CTA Button - Aligned Left */}
          <motion.div className="pt-8 md:pt-10" variants={itemVariants}>
            <Link
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 bg-[linear-gradient(95.96deg,_#18A7B7_20.55%,_#1F88BF_64.75%),linear-gradient(100.85deg,_rgba(255,255,255,0.016)_9.42%,_rgba(255,255,255,0.016)_62.38%)] px-8 py-4 font-semibold text-base text-white shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[inset_0px_4px_6px_rgba(0,0,0,0.3),0_0_30px_rgba(24,167,183,0.45)] active:scale-95"
              href="/contact"
            >
              <span className="relative z-10">
                Book a Strategic Consultation
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
