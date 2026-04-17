"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const BottomBanner = () => {
  return (
    <motion.div
      className="mx-auto mt-8 w-full max-w-9xl px-4 py-4 sm:mt-12 sm:px-6 sm:py-6 md:mt-16 md:px-8 md:py-8 lg:mt-20"
      initial="hidden"
      variants={containerVariants}
      viewport={{ once: true, margin: "-50px" }}
      whileInView="visible"
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/10"
        variants={itemVariants}
      >
        {/* Background Image (Full Card) */}
        <Image
          alt="Strategic Resilience Background" // your full card image
          className="object-cover"
          fill
          priority
          src="/services/service-banner.png"
          unoptimized
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col p-4 sm:p-6 md:p-8 lg:flex-row lg:p-10 xl:p-12">
          {/* LEFT CONTENT */}
          <motion.div
            animate="visible"
            className="max-w-4xl flex-1"
            initial="hidden"
            variants={containerVariants}
          >
            <motion.h2
              className="mb-4 bg-gradient-to-br from-[#FFFFFF] via-[#999999] bg-clip-text font-semibold text-5xl text-transparent sm:mb-5 md:mb-6"
              style={{
                backgroundImage:
                  "linear-gradient(90.75deg, #FFFFFF 1.3%, #999999 99.36%)",
              }}
              variants={itemVariants}
            >
              The Nexaguard Strategic Resilience Partnership
            </motion.h2>

            <motion.p
              className="mb-4 font-light text-lg text-white italic sm:mb-5 sm:text-xl md:mb-6"
              variants={itemVariants}
            >
              Customized for your scale. Managed for your success.
            </motion.p>

            <motion.p
              className="mb-4 text-base text-gray-200 leading-relaxed sm:mb-5 sm:text-lg md:mb-6"
              variants={itemVariants}
            >
              This master program allows you to select "Missions" from every
              package from AppSec Infiltration to 24/7 SOC Operations and
              Employee Defense to create a unified, annual security contract.
            </motion.p>

            <motion.ul
              animate="visible"
              className="mb-6 space-y-4 sm:mb-8 sm:space-y-5 md:mb-10 md:space-y-6"
              initial="hidden"
              variants={containerVariants}
            >
              <motion.li
                className="flex items-start gap-3 sm:gap-4"
                variants={itemVariants}
              >
                <ChevronsRight className="mt-1 text-[#00c2ff]" size={32} />
                <span className="text-base text-gray-200 sm:text-lg">
                  <strong className="text-white">Unified Strategy:</strong> All
                  services work in sync under a single partner.
                </span>
              </motion.li>

              <motion.li
                className="flex items-start gap-3 sm:gap-4"
                variants={itemVariants}
              >
                <ChevronsRight className="mt-1 text-[#00c2ff]" size={32} />
                <span className="text-base text-gray-200 sm:text-lg">
                  <strong className="text-white">Predictable Budgeting:</strong>{" "}
                  One clear, annual investment for total resilience.
                </span>
              </motion.li>

              <motion.li
                className="flex items-start gap-3 sm:gap-4"
                variants={itemVariants}
              >
                <ChevronsRight className="mt-1 text-[#00c2ff]" size={32} />
                <span className="text-base text-gray-200 sm:text-lg">
                  <strong className="text-white">Elite Extension:</strong> Our
                  hackers become an integrated part of your technical and
                  leadership teams.
                </span>
              </motion.li>
            </motion.ul>
            <Link className="inline-block" href="/contact">
              <motion.button
                className="mt-4 rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%),linear-gradient(100.85deg,rgba(255,255,255,0.016)_9.42%,rgba(255,255,255,0.016)_62.38%)] px-6 py-3 font-bold text-sm text-white bg-blend-overlay shadow-[0px_4px_4px_0px_#00000040_inset] outline-none transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,181,214,0.5)] sm:mt-6 sm:px-8 sm:py-3 sm:text-lg md:mt-8 lg:mt-12"
                type="button"
                variants={itemVariants}
              >
                Request a Bespoke Enterprise Proposal
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BottomBanner;
