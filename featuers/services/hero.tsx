"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

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
  hidden: { opacity: 0, x: -30 },
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
    <section className="relative flex min-h-[50dvh] w-full items-center overflow-hidden bg-[#010C13]">
      {/* 2. Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Nexagaurd Cyberlabs Background"
          className="object-cover object-center"
          fill
          priority
          src="/about/hero.jpg"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#010C13]/75" />
      </div>

      <div className="relative z-10 mx-auto w-full px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-10 xl:px-12">
        <motion.div
          animate="visible"
          className="mx-auto flex max-w-7xl flex-col items-center text-center"
          initial="hidden"
          variants={containerVariants}
        >
          {/* Headline */}
          <motion.h1
            className="bg-[linear-gradient(91.3deg,#FFFFFF_0.85%,#19A7B6_108.42%)] bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl md:mt-4 lg:text-6xl xl:text-7xl"
            variants={itemVariants}
          >
            Our Services
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}
