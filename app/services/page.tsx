import type { Metadata } from "next";
import Index from "@/featuers/services";
import HeroSection from "@/featuers/services/hero";

export const metadata: Metadata = {
  title: "Cybersecurity Services Dubai UAE | Nexaguard",
  description:
    "Full-spectrum cybersecurity services for UAE businesses: VAPT, ISO 27001, NESA compliance, managed services. Plus free VAPT readiness self-assessment.",
};

export default function page() {
  return (
    <div>
      <HeroSection />
      <Index />
    </div>
  );
}
