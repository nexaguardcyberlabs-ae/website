"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

interface ServiceCardProps {
  title: string;
  onKnowMoreClick?: () => void;
  detailHref?: string;
  contactFallback?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  onKnowMoreClick,
  detailHref,
  contactFallback,
}) => {
  // Resolve the href for fully-clickable-card pattern
  const href = detailHref ?? (contactFallback ? "/contact" : null);
  const ctaLabel = contactFallback ? "Contact Us" : "Know More";

  // Card interior (shared between link-wrapped and button variants)
  const cardInterior = (
    <>
      <Image
        alt="Service background"
        className="object-cover"
        fill
        priority={false}
        src="/services/service-card.svg"
      />
      <div className="absolute inset-0 bg-[#010C13]/70" />
      <div className="relative z-10 flex min-h-[240px] flex-col justify-between p-4 sm:min-h-[260px] sm:p-6 md:p-8">
        <h3 className="max-w-xl font-medium text-white text-xl leading-snug sm:text-2xl lg:text-3xl">
          {title}
        </h3>

        {/* Visual affordance — non-interactive when card is the link */}
        {href ? (
          <span className="flex items-center font-medium text-[#00c2ff] text-base transition-all sm:text-lg">
            {ctaLabel}
            <ArrowRight
              className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
              size={18}
            />
          </span>
        ) : onKnowMoreClick ? (
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
        ) : null}
      </div>
    </>
  );

  // Whole-card is a Link — single interactive element, accessible tap target
  if (href) {
    return (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="group relative overflow-hidden rounded-[28px] border border-[#18A7B740] transition-all duration-300 hover:border-cyan-400/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(24,167,183,0.15)] cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link href={href as never} className="block h-full">
          {cardInterior}
        </Link>
      </motion.div>
    );
  }

  // Fallback: no href — keep as non-link card (modal trigger variant)
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-[28px] border border-[#18A7B740] transition-all duration-300 hover:border-cyan-400/60"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {cardInterior}
    </motion.div>
  );
};

export default ServiceCard;
