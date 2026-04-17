"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import type React from "react";

interface AccordionItemProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode | string;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  icon,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-4 rounded-2xl sm:mb-5 md:mb-6 lg:mb-8"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Dotted Border Wrapper */}
      <div className="relative rounded-2xl bg-[#02131E] backdrop-blur-sm">
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
        {/* HEADER */}
        <button
          className="flex w-full items-center justify-between p-4 text-left sm:p-6 md:p-8"
          onClick={onToggle}
          type="button"
        >
          <div className="flex items-start gap-3 sm:items-center sm:gap-4 md:gap-5">
            {/* Icon */}
            <div className="rounded-full p-2 sm:p-3">
              {typeof icon === "string" ? (
                <Image
                  alt={title}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  height={40}
                  src={icon}
                  width={40}
                />
              ) : (
                icon
              )}
            </div>

            {/* Title + Subtitle */}
            <div>
              <h2 className="font-semibold text-lg text-white sm:text-xl md:text-2xl">
                {title}
              </h2>
              <p className="mt-1 text-gray-400 text-xs italic sm:mt-1.5 sm:text-sm md:text-base">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Toggle */}
          <div className="text-cyan-400">
            {isOpen ? (
              <Minus size={24} strokeWidth={2} />
            ) : (
              <Plus size={24} strokeWidth={2} />
            )}
          </div>
        </button>

        {/* Divider Line (like image) */}
        {isOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="mx-4 border-cyan-500/20 border-t sm:mx-6 md:mx-8"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* CONTENT */}
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="overflow-hidden"
          initial="closed"
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          variants={{
            open: { maxHeight: "1250px", opacity: 1 },
            closed: { maxHeight: 0, opacity: 0 },
          }}
        >
          <div
            className={isOpen ? "p-4 pt-4 sm:p-6 sm:pt-6 md:p-8 md:pt-8" : ""}
          >
            {/* Responsive Grid for inner cards */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-1">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AccordionItem;
