import type { Metadata } from "next";
import ServiceDetailPage from "@/featuers/services/service-detail-page";

export const metadata: Metadata = {
  title: "Managed Cybersecurity Services Dubai | Continuous Protection",
  description:
    "Managed VAPT, 24/7 SOC, managed application security, fractional CISO. Continuous protection for UAE businesses without in-house security teams.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's the minimum commitment for a managed service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Managed services are typically 12-month engagements with quarterly review points. Shorter pilots possible for specific scopes.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide 24/7 SOC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Tier 1 monitoring is 24/7. Tier 2 and Tier 3 escalation follow defined SLAs.",
      },
    },
    {
      "@type": "Question",
      name: "How is managed VAPT different from one-off VAPT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Managed VAPT runs continuously or on regular cycles (monthly/quarterly), with results integrated into your remediation process. One-off VAPT is a snapshot.",
      },
    },
    {
      "@type": "Question",
      name: "Do we need to install agents or tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some services require lightweight agents or integrations. Others are fully external. We discuss this in scoping.",
      },
    },
    {
      "@type": "Question",
      name: "What's the typical cost range?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Managed services start from AED 6,000/month for advisory retainers, scaling based on scope and SLA.",
      },
    },
    {
      "@type": "Question",
      name: "Can we combine multiple managed services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — most clients move to a Managed Annual Security Programme that bundles testing, advisory, and monitoring.",
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
    { "@type": "ListItem", position: 3, name: "Managed Services", item: "https://nexaguardcyberlabs.com/services/managed-services" },
  ],
};

export default function ManagedServicesPage() {
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
          q: "What's the minimum commitment for a managed service?",
          a: "Managed services are typically 12-month engagements with quarterly review points. Shorter pilots possible for specific scopes.",
        },
        {
          q: "Do you provide 24/7 SOC?",
          a: "Yes. Tier 1 monitoring is 24/7. Tier 2 and Tier 3 escalation follow defined SLAs.",
        },
        {
          q: "How is managed VAPT different from one-off VAPT?",
          a: "Managed VAPT runs continuously or on regular cycles (monthly/quarterly), with results integrated into your remediation process. One-off VAPT is a snapshot.",
        },
        {
          q: "Do we need to install agents or tools?",
          a: "Some services require lightweight agents or integrations. Others are fully external. We discuss this in scoping.",
        },
        {
          q: "What's the typical cost range?",
          a: "Managed services start from AED 6,000/month for advisory retainers, scaling based on scope and SLA.",
        },
        {
          q: "Can we combine multiple managed services?",
          a: "Yes — most clients move to a Managed Annual Security Programme that bundles testing, advisory, and monitoring.",
        },
      ]}
      hero={{
        h1: "Managed Security Services",
        subhead:
          "Continuous security operations without the cost of an in-house team. Managed VAPT, managed application security, SOC operations, and ongoing protection — built for UAE businesses scaling beyond their first compliance milestone.",
      }}
      included={[
        "Managed VAPT (continuous / quarterly / monthly testing cycles)",
        "Managed Application Security (DAST + SAST + manual review on a recurring cadence)",
        "24/7 Security Operations Centre (SOC) — Tier 1, Tier 2, Tier 3 monitoring",
        "Managed Vulnerability Scanning (continuous external + internal scans)",
        "Managed Web Application Firewall (WAF)",
        "Managed Phishing Simulations & User Awareness",
        "Managed Annual Security Programme (full-spectrum compliance + testing)",
        "Security Advisory Retainer (fractional CISO function)",
        "Incident Response Retainer",
        "Threat Intelligence Briefings",
      ]}
      methodology={[
        {
          step: "Onboarding & Baseline",
          desc: "Assess current state, define service scope, establish baseline.",
        },
        {
          step: "Tooling & Integration",
          desc: "Deploy required tools, integrate with existing infrastructure.",
        },
        {
          step: "Continuous Operations",
          desc: "Run service per agreed SLA, with regular reporting and reviews.",
        },
        {
          step: "Quarterly Strategic Review",
          desc: "Reassess threats, adjust scope, evolve programme.",
        },
      ]}
      deliverables={[
        "Monthly operations report",
        "Quarterly executive briefing",
        "Real-time alerting (where applicable)",
        "Incident response support per SLA",
        "Continuous compliance evidence collection",
        "Direct access to senior security advisor",
      ]}
      timeline={[
        "Onboarding: 2–4 weeks",
        "Initial baseline reporting: Month 1",
        "Steady-state operations: Month 2 onward",
        "Quarterly strategic reviews throughout engagement",
      ]}
      audience={[
        "Companies that have completed initial VAPT and want continuous coverage",
        "Fintech and SaaS companies with frequent code releases requiring continuous testing",
        "Businesses without an in-house security team but with regulatory obligations",
        "Organisations preparing for or maintaining ISO 27001 certification",
        "Companies that have experienced an incident and want continuous monitoring as a control",
      ]}
      problem={[
        "A penetration test is a snapshot. Your environment changes daily. New code ships, new vulnerabilities are disclosed, new threats emerge. The companies that get breached are rarely the ones that ignored security entirely — they're the ones that did security once and assumed it was done.",
        "Managed services close this gap. Continuous testing, continuous monitoring, continuous improvement — at a cost structure built for businesses that don't yet have the volume to justify a full in-house security operations team.",
      ]}
    />
    </>
  );
}
