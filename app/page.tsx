import type { Metadata } from "next";
import { Suspense } from "react";
import AboutUsSection from "@/featuers/landing-page/about";
import ComplianceStrip from "@/featuers/landing-page/compliance-strip";
import ContactSection from "@/featuers/landing-page/contact";
import FinalCTA from "@/featuers/landing-page/final-cta";
import Hero from "@/featuers/landing-page/hero";
import HomeScrollHandler from "@/featuers/landing-page/home-scroll-handler";
import IndustriesSection from "@/featuers/landing-page/industries";
import FreeToolsSection from "@/components/sections/FreeToolsSection";
import ServicesOverview from "@/featuers/landing-page/services-overview";
import TrustPillars from "@/featuers/landing-page/trust-pillars";
import UAEPartnerSection from "@/featuers/landing-page/uae-partner-section";
import WhyChooseUsSection from "@/featuers/landing-page/why-choose-us-section";

export const metadata: Metadata = {
  title:
    "Cybersecurity Services in Dubai | VAPT, ISO 27001 | Nexaguard Cyber Labs",
  description:
    "UAE's senior-led cybersecurity consultancy. VAPT, ISO 27001 readiness, managed security services for fintechs, SaaS, and growing businesses. Free VAPT self-assessment available. Based in Dubai.",
};

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <HomeScrollHandler />
      </Suspense>
      <div>
        <Hero />
        <TrustPillars />
        <AboutUsSection />
        <ServicesOverview />
        <WhyChooseUsSection />
        <ComplianceStrip />
        <IndustriesSection />
        <UAEPartnerSection />
        <FreeToolsSection />
        <FinalCTA />
        <ContactSection />
      </div>
    </>
  );
}
