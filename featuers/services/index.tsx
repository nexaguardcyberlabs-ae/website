"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { accordionData, type ServiceDetailData } from "@/app/data";
import RadialGlowBackground from "@/components/backgrounds/RadialGlowBackground";
import FreeConsultationSection from "@/components/sections/FreeConsultationSection";
import VaptAssessmentCTA from "@/components/sections/VaptAssessmentCTA";
import AccordionItem from "./accordion-item";
import BottomBanner from "./bottom-banner";
import ServiceCard from "./service-card";
import ServiceModal from "./service-modal";

const SECTION_DETAIL_HREFS: Record<string, string | null> = {
  appsec: "/services/application-security",
  grc: "/services/cyber-risk-management",
  managed: "/services/managed-services",
  cloud: "/services/cloud-infrastructure-security",
  human: "/services/human-defense-awareness",
};

export default function Home() {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalData, setSelectedModalData] =
    useState<ServiceDetailData | null>(null);

  const handleToggleAccordion = (id: string) => {
    setOpenAccordionId((prevId) => (prevId === id ? null : id));
  };

  const handleOpenModal = (data: ServiceDetailData) => {
    setSelectedModalData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-[#030910] p-4 font-sans text-slate-200 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <RadialGlowBackground variant="corners" />
      <div className="relative z-10 mx-auto max-w-9xl">
        <motion.div
          animate="visible"
          className="space-y-4 px-2 sm:space-y-5 sm:px-4 md:space-y-6 md:px-6 lg:space-y-8 lg:px-8"
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          {accordionData.map((section) => {
            const detailHref = SECTION_DETAIL_HREFS[section.id] ?? null;
            const hasDetailPage = detailHref !== null;

            return (
              <motion.div
                key={section.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <AccordionItem
                  icon={section.icon}
                  isOpen={openAccordionId === section.id}
                  onToggle={() => handleToggleAccordion(section.id)}
                  subtitle={section.subtitle}
                  title={section.title}
                >
                  {section.offerings && (
                    <div className="mt-2 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                      {section.offerings.map((offering) => (
                        <ServiceCard
                          key={offering.title}
                          title={offering.title}
                          detailHref={detailHref ?? undefined}
                          contactFallback={!hasDetailPage}
                          onKnowMoreClick={
                            hasDetailPage
                              ? undefined
                              : () => handleOpenModal(offering.modalData)
                          }
                        />
                      ))}
                    </div>
                  )}
                </AccordionItem>
              </motion.div>
            );
          })}
        </motion.div>

        <BottomBanner />
      </div>

      <VaptAssessmentCTA />

      <FreeConsultationSection />

      <ServiceModal
        data={selectedModalData}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
