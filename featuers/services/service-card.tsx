"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type React from "react";

interface ServiceCardProps {
  title: string;
  onKnowMoreClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  onKnowMoreClick,
}) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-[28px] border border-[#18A7B740] transition-all duration-300 hover:border-cyan-400/60"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Background Image */}
      <Image
        alt="Service background"
        className="object-cover"
        fill
        priority={false}
        src="/services/service-card.svg"
      />

      {/* Optional Dark Overlay (for text readability) */}
      <div className="absolute inset-0 bg-[#010C13]/70" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[240px] flex-col justify-between p-4 sm:min-h-[260px] sm:p-6 md:p-8">
        {/* Title */}
        <h3 className="max-w-xl font-medium text-white text-xl leading-snug sm:text-2xl lg:text-3xl">
          {title}
        </h3>

        {/* Know More */}
        <button
          className="group/btn flex items-center font-medium text-[#00c2ff] text-base transition-all sm:text-lg"
          onClick={onKnowMoreClick}
          type="button"
        >
          Know More
          <ArrowRight
            className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-2"
            size={18}
          />
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
