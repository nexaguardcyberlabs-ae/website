"use client";

import { motion } from "framer-motion";
import GridPatternBackground from "@/components/backgrounds/GridPatternBackground";

export default function LeadershipPerspective() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020B14] px-4 py-24 md:py-32">
      <GridPatternBackground />

      {/* Decorative horizontal accent line */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Section label */}
          <p className="mb-10 text-[10px] font-semibold text-cyan-400 uppercase tracking-[0.4em]">
            Leadership Perspective
          </p>

          {/* Decorative large quote mark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none mb-4 font-bold text-[120px] leading-none text-cyan-400/8 -mt-8"
            style={{ fontFamily: "Georgia, serif" }}
          >
            &ldquo;
          </div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="-mt-12 mx-auto max-w-3xl text-xl text-gray-200 italic leading-relaxed tracking-[-0.01em] sm:text-2xl md:text-[28px] md:leading-[1.55]"
          >
            Nexaguard was built on the belief that businesses deserve a partner
            who protects their present while shaping their future. We combine
            strategic foresight with technical depth, so leaders can operate
            with confidence in every digital moment.
          </motion.p>

          {/* Attribution line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-cyan-400/40" />
            <span className="text-cyan-400/60 text-xs uppercase tracking-widest">Nexaguard Cyber Labs</span>
            <div className="h-px w-12 bg-cyan-400/40" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
    </section>
  );
}
