"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import AboutUsSection from "@/featuers/landing-page/about";
import ContactSection from "@/featuers/landing-page/contact";
import Hero from "@/featuers/landing-page/hero";
import CoreServicesSection from "@/featuers/landing-page/services-data";
import UAEPartnerSection from "@/featuers/landing-page/uae-partner-section";
import WhyChooseUsSection from "@/featuers/landing-page/why-choose-us-section";

function HomeContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("scroll") === "contact") {
      const timer = setTimeout(() => {
        const contactSection = document.getElementById("contact");
        contactSection?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <div>
      <Hero />
      <AboutUsSection />
      <CoreServicesSection />
      <WhyChooseUsSection />
      <UAEPartnerSection />
      {/* <BlogsNewsSection /> */}
      <ContactSection />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
