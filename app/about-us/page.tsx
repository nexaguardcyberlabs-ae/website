import AboutSection from "@/featuers/about-us/about-section";
import WhatWeBelieveSection from "@/featuers/about-us/belief-card";
import SectionContent from "@/featuers/about-us/engagement-section";
import HeroSection from "@/featuers/about-us/hero";
import LeadershipPerspective from "@/featuers/about-us/leadership-perspective";
import OurValues from "@/featuers/about-us/our-values";
import VisionMission from "@/featuers/about-us/vision-mission";

export default function page() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <VisionMission />
      <WhatWeBelieveSection />
      <OurValues />
      <LeadershipPerspective />
      <SectionContent />
    </div>
  );
}
