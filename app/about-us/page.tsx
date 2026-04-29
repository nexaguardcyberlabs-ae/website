import type { Metadata } from "next";
import AboutSection from "@/featuers/about-us/about-section";
import WhatWeBelieveSection from "@/featuers/about-us/belief-card";
import SectionContent from "@/featuers/about-us/engagement-section";
import FounderSection from "@/featuers/about-us/founder-section";
import HeroSection from "@/featuers/about-us/hero";
import LeadershipPerspective from "@/featuers/about-us/leadership-perspective";
import OurValues from "@/featuers/about-us/our-values";
import VisionMission from "@/featuers/about-us/vision-mission";

export const metadata: Metadata = {
  title: "About Nexaguard Cyber Labs | Cybersecurity Consulting Dubai",
  description:
    "Senior-led cybersecurity consultancy serving UAE and GCC mid-market businesses. Honest scoping, expert-led delivery, reports built for action. Dubai Silicon Oasis.",
};

export default function page() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <VisionMission />
      {process.env.NEXT_PUBLIC_SHOW_FOUNDER === "true" && <FounderSection />}
      <WhatWeBelieveSection />
      <OurValues />
      <LeadershipPerspective />
      <SectionContent />
    </div>
  );
}
