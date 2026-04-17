"use client";

import { easeOut, motion } from "framer-motion";
import Image from "next/image";
import type React from "react";

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-[#00D2FF]">{children}</span>
);

// Animation Variants
const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const textFadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut, delay: 0.2 },
  },
};

const textFadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut, delay: 0.2 },
  },
};

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-[#010C13] py-24 lg:py-32">
      {/* Background Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-9xl px-5 md:px-20">
        {/* ==================== ROW 1: Who We Are ==================== */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            variants={textFadeLeft}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <h2 className="mb-12 text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
              Who{" "}
              <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
                We Are
              </span>
            </h2>
            <div className="space-y-6 text-base text-gray-300 leading-relaxed sm:text-lg">
              <p>
                Nexaguard Cyberlabs is a global cybersecurity and digital
                transformation firm built for organizations operating in
                high-stakes, highly regulated, and rapidly evolving
                environments. We work with <Highlight>CXOs, Boards</Highlight>,
                <Highlight> Technology Leaders</Highlight> who understand that
                cybersecurity is no longer an IT problem and that digital
                transformation must be secure by design. Our role is simple but
                critical: to <Highlight>bring clarity to complexity</Highlight>,{" "}
                <Highlight>discipline to execution</Highlight>, and{" "}
                <Highlight>confidence to leadership decisions.</Highlight>
              </p>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="relative h-[300px] w-full overflow-hidden rounded-[2rem] sm:h-[400px] lg:h-[500px]"
            initial="hidden"
            variants={fadeInScale}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <Image
              alt="Nexaguard team collaborating in a modern office"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              src="/about/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working 1.jpg"
            />
          </motion.div>
        </div>

        {/* Spacer */}
        <motion.div
          className="my-24 h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent lg:my-32"
          initial={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scaleX: 1 }}
        />

        {/* ==================== ROW 2: Why We Were Founded ==================== */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image/Logo Content */}
          <motion.div
            // Added lg:p-24 here. Increasing padding shrinks the inner content (the logo)
            // while keeping the blue box size consistent with the text column.
            className="relative order-last flex h-[300px] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-[#021a29] p-8 sm:h-[400px] lg:order-first lg:h-[450px] lg:p-24"
            initial="hidden"
            variants={fadeInScale}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <div className="relative h-full w-full">
              <Image
                alt="Nexaguard Cyberlabs Logo"
                className="object-contain object-center p-4 transition-transform duration-500 hover:scale-110"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src="/about/nexagaurd-logo.png"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial="hidden"
            variants={textFadeRight}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            <h2 className="mb-12 text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
              Why Nexaguard{" "}
              <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Was Founded
              </span>
            </h2>
            <div className="space-y-6 text-base text-gray-300 leading-relaxed sm:text-lg">
              <p>
                The modern enterprise faces a paradox. Digital acceleration is
                essential for growth, yet it expands risk. Security investments
                increase, yet breaches persist. Technology advances rapidly, yet
                decision-makers lack clear visibility. Nexaguard was founded to
                close this gap. We bring together{" "}
                <Highlight>deep cybersecurity expertise</Highlight> and{" "}
                <Highlight>
                  enterprise-grade transformation capabilities
                </Highlight>
                , allowing organizations to move forward not cautiously, but
                confidently.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
