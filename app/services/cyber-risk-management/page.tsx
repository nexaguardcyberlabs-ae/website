import type { Metadata } from "next";
import ServiceDetailPage from "@/featuers/services/service-detail-page";

export const metadata: Metadata = {
  title: "ISO 27001 | NESA | GRC Consulting Dubai UAE | Nexaguard",
  description:
    "ISO 27001, NESA, ADGM, DIFC, PCI DSS, UAE PDPL — compliance and GRC consulting tailored for UAE business reality. Senior-led implementation support.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does ISO 27001 certification take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical timeline from start to certification: 6–9 months. Faster is possible for smaller, simpler scopes — but rushing risks failed audits.",
      },
    },
    {
      "@type": "Question",
      name: "Do we need ISO 27001 if we have NESA or DIFC compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Each framework serves different audiences. Enterprise clients often request ISO 27001 specifically.",
      },
    },
    {
      "@type": "Question",
      name: "Can you act as our virtual CISO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we offer a Security Advisory Retainer that functions as a fractional CISO. See Managed Services.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between gap assessment and full implementation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gap assessment is a 2–3 week diagnostic. Full implementation is 4–6 months of guided execution to achieve audit readiness.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle the audit itself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Certification audits must be done by accredited certification bodies (e.g., BSI, DNV, TÜV). We prepare you for, and support you through, the audit.",
      },
    },
    {
      "@type": "Question",
      name: "What's the UAE PDPL situation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UAE PDPL came into force in 2022 with enforcement evolving. Most businesses are not yet fully compliant — meaning early action reduces future risk and penalty exposure.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://nexaguardcyberlabs.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://nexaguardcyberlabs.com/services" },
    { "@type": "ListItem", position: 3, name: "Cyber Risk Management", item: "https://nexaguardcyberlabs.com/services/cyber-risk-management" },
  ],
};

export default function CyberRiskManagementPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        type="application/ld+json"
      />
      <ServiceDetailPage
      faqSchema={faqSchema}
      faqs={[
        {
          q: "How long does ISO 27001 certification take?",
          a: "Typical timeline from start to certification: 6–9 months. Faster is possible for smaller, simpler scopes — but rushing risks failed audits.",
        },
        {
          q: "Do we need ISO 27001 if we have NESA or DIFC compliance?",
          a: "Not necessarily. Each framework serves different audiences. Enterprise clients often request ISO 27001 specifically.",
        },
        {
          q: "Can you act as our virtual CISO?",
          a: "Yes — we offer a Security Advisory Retainer that functions as a fractional CISO. See Managed Services.",
        },
        {
          q: "What's the difference between gap assessment and full implementation?",
          a: "Gap assessment is a 2–3 week diagnostic. Full implementation is 4–6 months of guided execution to achieve audit readiness.",
        },
        {
          q: "Do you handle the audit itself?",
          a: "No. Certification audits must be done by accredited certification bodies (e.g., BSI, DNV, TÜV). We prepare you for, and support you through, the audit.",
        },
        {
          q: "What's the UAE PDPL deadline?",
          a: "UAE PDPL came into force in 2022 with enforcement evolving. Most businesses are not yet fully compliant — meaning early action reduces future risk and penalty exposure.",
        },
      ]}
      hero={{
        h1: "Cyber Risk Management, Compliance & GRC",
        subhead:
          "ISO 27001, NESA, ADGM, DIFC, PCI DSS — built for UAE regulators, scaled for growing businesses. Compliance as a strategic enabler, not a checkbox exercise.",
      }}
      included={[
        "ISO/IEC 27001:2022 Gap Assessment",
        "ISO/IEC 27001:2022 Implementation & Certification Readiness",
        "NESA UAE Information Assurance Standards Compliance",
        "ADGM Cyber Framework Implementation",
        "DIFC Data Protection Compliance",
        "UAE PDPL (Federal Personal Data Protection Law) Readiness",
        "ADHICS (Abu Dhabi Healthcare Information & Cyber Security) Compliance",
        "PCI DSS v4.0 Readiness Assessment",
        "Risk Assessment & Risk Register Development",
        "Cybersecurity Strategic Consulting (board-level)",
        "Business Continuity & Disaster Recovery Planning",
        "Third-Party / Vendor Risk Management",
      ]}
      methodology={[
        {
          step: "Discovery & Scoping",
          desc: "Understand business context, regulatory drivers, current state.",
        },
        {
          step: "Gap Assessment",
          desc: "Map current controls against target framework, identify gaps.",
        },
        {
          step: "Roadmap Development",
          desc: "Prioritise gaps by risk and effort, build phased remediation plan.",
        },
        {
          step: "Implementation Support",
          desc: "Policy drafting, control implementation, documentation.",
        },
        {
          step: "Audit Readiness",
          desc: "Pre-audit dry run, evidence package preparation, auditor liaison.",
        },
      ]}
      deliverables={[
        "Detailed gap assessment report with control-by-control analysis",
        "Risk register with treatment plans",
        "Information security policy suite (tailored to your business)",
        "Implementation roadmap with milestones",
        "Evidence package for auditor review",
        "Stakeholder briefing materials (board / leadership level)",
      ]}
      timeline={[
        "ISO 27001 Gap Assessment: 2–3 weeks",
        "ISO 27001 Full Implementation Support: 4–6 months",
        "NESA Compliance Implementation: 3–5 months",
        "PDPL Readiness Assessment: 2–3 weeks",
      ]}
      audience={[
        "UAE businesses preparing for ISO 27001 certification (often driven by enterprise client demand)",
        "Fintech companies subject to CBUAE, DIFC, or ADGM frameworks",
        "Healthcare organisations subject to ADHICS or DOH requirements",
        "Any UAE business processing personal data (PDPL applies broadly)",
        "Companies expanding into regulated sectors",
      ]}
      problem={[
        "UAE regulators are tightening cybersecurity expectations across every sector. NESA mandates for critical entities. ADGM and DIFC frameworks for financial services. ADHICS for healthcare. PDPL for data handling. ISO 27001 demanded by enterprise clients and investors.",
        "Most UAE SMEs face a common challenge: they need to demonstrate compliance, but they don't have an in-house compliance officer, an established ISMS, or the documentation to satisfy an auditor. Buying enterprise GRC platforms is overkill. Hiring a full-time CISO is premature. What they need is a senior advisor who can map their current state, define the gap, and walk them through it — pragmatically.",
      ]}
    />
    </>
  );
}
