"use client";

import { motion, type Variants } from "framer-motion";
import { whyChooseUs } from "@/app/data";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const UAEPartnerSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#02131E] py-24">
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

      <motion.div
        className="relative z-10 mx-auto w-full max-w-9xl px-6 md:px-20"
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
      >
        {/* Badge */}
        <motion.div className="mb-6" variants={itemVariants}>
          <span className="inline-block rounded-full border border-cyan-400/30 px-4 py-2 text-[12px] text-white tracking-widest">
            The Nexaguard Advantage
          </span>
        </motion.div>

        {/* Header */}
        <motion.div
          className="z-20 w-full shrink-0 pb-2"
          variants={itemVariants}
        >
          <h2 className="mb-12 text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
            Why{" "}
            <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
              UAE Businesses Partner <br />
              with Nexaguard
            </span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {whyChooseUs.map((item, index) => (
            <motion.div
              className="relative min-h-87.5 overflow-hidden rounded-xl bg-[#010C13] p-8 backdrop-blur-sm"
              key={item.id}
              variants={cardVariants}
            >
              {/* SVG Dashed Border */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full">
                <title>Decorative border</title>
                <rect
                  fill="none"
                  height="calc(100% - 1px)"
                  rx="12"
                  ry="12"
                  stroke="#18A7B780"
                  strokeDasharray="8 8"
                  strokeWidth="1"
                  width="calc(100% - 1px)"
                  x="0.5"
                  y="0.5"
                />
              </svg>

              {/* Outlined Large Background Number */}
              <span
                className="absolute -right-5 -bottom-30 select-none font-bold text-[300px] text-transparent"
                style={{
                  WebkitTextStroke: "3px rgba(24,167,183,0.18)",
                }}
              >
                {index + 1}
              </span>

              {/* Content */}
              <div className="relative z-10 max-w-xs">
                <h3 className="mb-4 font-semibold text-3xl text-white">
                  {item.title}
                </h3>

                <p className="text-md text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UAEPartnerSection;
