import type { Metadata } from "next";
import FreeConsultationSection from "@/components/sections/FreeConsultationSection";
import ContactOptions from "@/featuers/contact/contact-options";
import ContactHero from "@/featuers/contact/hero";
import ContactSection from "@/featuers/landing-page/contact";

export const metadata: Metadata = {
  title: "Contact Nexaguard Cyber Labs | Cybersecurity Dubai",
  description:
    "Contact Nexaguard Cyber Labs. Free 30-min cybersecurity consultation worth AED 4,000. Senior-led conversation. UAE phone, WhatsApp, and email.",
};

export default function page() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <FreeConsultationSection />
      <ContactOptions />
      <ContactSection />
    </main>
  );
}
