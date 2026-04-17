"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect } from "react";
import type { ServiceDetailData } from "@/app/data";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ServiceDetailData | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-4 backdrop-blur-md sm:px-6 md:px-8"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* MODAL */}
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#18A7B740] bg-[#02131E] shadow-[0_0_40px_rgba(0,255,255,0.08)] sm:rounded-3xl md:rounded-4xl"
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Background Wave Image */}
            <Image
              alt="Background"
              className="pointer-events-none object-cover opacity-20"
              fill
              src="/services/service-card.svg"
            />

            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
              {/* MAIN TITLE */}
              <div className="mb-4 flex items-start justify-between gap-4 sm:mb-6 md:mb-8 lg:mb-10">
                <h2 className="bg-linear-to-l from-[#B4B4B4] to-white bg-clip-text pr-6 font-semibold text-lg text-transparent leading-snug sm:text-xl md:text-2xl">
                  {data.title}
                </h2>

                <button
                  className="shrink-0 text-cyan-400 transition-colors hover:text-white"
                  onClick={onClose}
                  type="button"
                >
                  <X className="size-6 sm:size-7" />
                </button>
              </div>

              {/* INNER CARD */}
              <div className="space-y-4 rounded-2xl border border-[#18A7B740] bg-[#010C13]/80 p-4 backdrop-blur-sm sm:space-y-5 sm:rounded-3xl sm:p-6 md:space-y-6 md:rounded-3xl md:p-8 lg:space-y-8">
                {/* Mission */}
                <div>
                  <div className="mb-2 flex items-center gap-3 sm:mb-3 sm:gap-4 md:mb-4 md:gap-6">
                    <span className="whitespace-nowrap text-gray-400 text-sm sm:text-base md:text-xl">
                      Mission
                    </span>

                    <div className="h-px flex-1 bg-linear-to-r from-[#18A7B740] to-transparent" />

                    <Image
                      alt="Mission"
                      className="size-5 shrink-0 sm:size-4.5 md:size-5.5"
                      height={24}
                      src="/services/service-modal-icons2.svg"
                      width={24}
                    />
                  </div>

                  <p className="text-sm text-white leading-relaxed sm:text-base md:text-xl">
                    {data.mission}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <div className="mb-2 flex items-center gap-3 sm:mb-3 sm:gap-4 md:mb-4 md:gap-6">
                    <span className="whitespace-nowrap text-gray-400 text-sm sm:text-base md:text-xl">
                      Approach
                    </span>

                    <div className="h-px flex-1 bg-linear-to-r from-[#18A7B740] to-transparent" />

                    <Image
                      alt="Approach"
                      className="size-5 shrink-0 sm:size-4.5 md:size-5.5"
                      height={24}
                      src="/services/service-modal-icons3.svg"
                      width={24}
                    />
                  </div>

                  <p className="text-sm text-white leading-relaxed sm:text-base md:text-xl">
                    {data.approach}
                  </p>
                </div>

                {/* Peace of Mind */}
                <div>
                  <div className="mb-2 flex items-center gap-3 sm:mb-3 sm:gap-4 md:mb-4 md:gap-6">
                    <span className="whitespace-nowrap text-gray-400 text-sm sm:text-base md:text-xl">
                      Peace of Mind
                    </span>

                    <div className="h-px flex-1 bg-linear-to-r from-[#18A7B740] to-transparent" />

                    <Image
                      alt="Peace of Mind"
                      className="size-5 shrink-0 sm:size-4.5 md:size-5.5"
                      height={24}
                      src="/services/service-modal-icons1.svg"
                      width={24}
                    />
                  </div>

                  <p className="text-sm text-white leading-relaxed sm:text-base md:text-xl">
                    {data.peaceOfMind}
                  </p>
                </div>

                {/* BUTTON */}
                <Link href={"/contact" as never}>
                  <button
                    className="mt-4 w-full rounded-full border border-white/25 bg-[linear-gradient(95.96deg,#18A7B7_20.55%,#1F88BF_64.75%),linear-gradient(100.85deg,rgba(255,255,255,0.016)_9.42%,rgba(255,255,255,0.016)_62.38%)] px-4 py-2 font-bold text-white text-xs bg-blend-overlay shadow-[0px_4px_4px_0px_#00000040_inset] outline-none transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,181,214,0.5)] sm:mt-6 sm:px-6 sm:py-2.5 sm:text-sm md:mt-8 md:px-8 md:py-3 md:text-lg lg:mt-12"
                    type="button"
                  >
                    {data.ctaText}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
