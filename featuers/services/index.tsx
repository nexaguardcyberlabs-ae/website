"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { accordionData, type ServiceDetailData } from "@/app/data";
import AccordionItem from "./accordion-item";
import BottomBanner from "./bottom-banner";
import ServiceCard from "./service-card";
import ServiceModal from "./service-modal";

export default function Home() {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  // State for modal visibility and data
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
    <main className="min-h-screen bg-[#030910] p-4 font-sans text-slate-200 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="mx-auto max-w-9xl">
        {/* Accordion Sections */}
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
          {accordionData.map((section) => (
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
                {/* Content inside the accordion (The Grid of Cards) */}
                {section.offerings && (
                  <div className="mt-2 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                    {section.offerings.map((offering) => (
                      <ServiceCard
                        key={offering.title}
                        onKnowMoreClick={() =>
                          handleOpenModal(offering.modalData)
                        }
                        title={offering.title}
                      />
                    ))}
                  </div>
                )}
              </AccordionItem>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Banner Section */}
        <BottomBanner />
      </div>

      {/* Modal Component (placed outside the main flow) */}
      <ServiceModal
        data={selectedModalData}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
