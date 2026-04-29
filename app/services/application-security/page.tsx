import type { Metadata } from "next";
import ServiceDetailPage from "@/featuers/services/service-detail-page";

export const metadata: Metadata = {
  title: "VAPT Services Dubai | Web App, Mobile, API Penetration Testing",
  description:
    "Web app, mobile app, API penetration testing for UAE businesses. CBUAE, DIFC, ADGM ready reports. OWASP-based methodology. 10–15 working day turnaround.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a Web App VAPT take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "10–15 working days for standard scope (1 web app, up to 50 endpoints). Larger scopes 3–4 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "What does VAPT cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VAPT engagements start at AED 12,000 for focused scope. We scope-and-price based on your actual environment, not list pricing.",
      },
    },
    {
      "@type": "Question",
      name: "Will testing affect our production environment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Testing is planned and rules-of-engagement are agreed upfront. Production testing follows strict change windows. Staging environments are preferred for invasive tests.",
      },
    },
    {
      "@type": "Question",
      name: "What standards do you follow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OWASP Testing Guide, OWASP Mobile Security Testing Guide, OSSTMM, NIST SP 800-115, PTES — applied as appropriate to engagement scope.",
      },
    },
    {
      "@type": "Question",
      name: "Do we get a certificate suitable for our auditor or enterprise client?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every engagement concludes with a formal letter of attestation suitable for compliance and procurement use.",
      },
    },
    {
      "@type": "Question",
      name: "What about re-testing after we fix issues?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free re-test within 30 days of report delivery for any findings remediated.",
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
    { "@type": "ListItem", position: 3, name: "Application Security", item: "https://nexaguardcyberlabs.com/services/application-security" },
  ],
};

export default function ApplicationSecurityPage() {
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
          q: "How long does a Web App VAPT take?",
          a: "10–15 working days for standard scope (1 web app, up to 50 endpoints). Larger scopes 3–4 weeks.",
        },
        {
          q: "What does it cost?",
          a: "VAPT engagements start at AED 12,000 for focused scope. We scope-and-price based on your actual environment, not list pricing.",
        },
        {
          q: "Will testing affect our production environment?",
          a: "Testing is planned and rules-of-engagement are agreed upfront. Production testing follows strict change windows. Staging environments are preferred for invasive tests.",
        },
        {
          q: "What standards do you follow?",
          a: "OWASP Testing Guide, OWASP Mobile Security Testing Guide, OSSTMM, NIST SP 800-115, PTES — applied as appropriate to engagement scope.",
        },
        {
          q: "Do we get a certificate suitable for our auditor / enterprise client?",
          a: "Yes. Every engagement concludes with a formal letter of attestation suitable for compliance and procurement use.",
        },
        {
          q: "What about re-testing after we fix issues?",
          a: "Free re-test within 30 days of report delivery for any findings remediated.",
        },
      ]}
      hero={{
        h1: "Application Security & Penetration Testing",
        subhead:
          "Find what attackers will find — before they find it. Web app, mobile, API, source code, and infrastructure-level security testing for UAE businesses.",
      }}
      included={[
        "Vulnerability Assessment & Penetration Testing (VAPT)",
        "Web Application Penetration Testing (OWASP-based methodology)",
        "Mobile Application Penetration Testing (iOS & Android)",
        "API & Web Services Penetration Testing",
        "Secure Source Code Review",
        "Web Application Firewall (WAF) Implementation & Tuning",
        "SSL/TLS Certificate Lifecycle Management",
        "DevSecOps Consulting & CI/CD Security Integration",
        "E-commerce Platform Security Assessment",
        "SaaS Application Security Hardening",
      ]}
      methodology={[
        {
          step: "Scope & Plan",
          desc: "Define assets, threat model, testing windows, rules of engagement.",
        },
        {
          step: "Reconnaissance",
          desc: "Information gathering, technology stack analysis, attack surface mapping.",
        },
        {
          step: "Active Testing",
          desc: "Manual + automated testing using OWASP, OSSTMM, NIST frameworks.",
        },
        {
          step: "Exploitation",
          desc: "Controlled exploitation to verify findings (no destructive testing).",
        },
        {
          step: "Reporting",
          desc: "Executive summary + technical detail + prioritised remediation roadmap.",
        },
        {
          step: "Re-test & Validate",
          desc: "Retest closed findings to confirm remediation effectiveness.",
        },
      ]}
      deliverables={[
        "Executive summary report (board-ready)",
        "Detailed technical report with proof-of-concept evidence",
        "CVSS-scored vulnerability inventory",
        "Prioritised remediation roadmap",
        "Debrief call with technical team",
        "Certificate of testing (suitable for compliance evidence)",
        "Free re-test of remediated findings within 30 days",
      ]}
      timeline="10–15 working days from kickoff to final report (scope-dependent)"
      audience={[
        "Fintech and payment companies preparing for CBUAE/DIFC/ADGM licensing or annual reviews",
        "SaaS companies responding to enterprise client VAPT requests",
        "Any UAE business with a public web application or mobile app handling sensitive data",
        "Companies preparing for ISO 27001, PCI DSS, or SOC 2 certification",
        "Organisations that have never had a formal security assessment",
      ]}
      problem={[
        "Every UAE business that handles customer data, processes payments, or operates a customer-facing application is a target. Most don't know what their actual exposure is — until an enterprise prospect asks for a VAPT report, an investor requests a security review, or a regulator demands compliance evidence.",
        "Application security is no longer optional. It's a procurement requirement, a licensing condition, and an investor due-diligence checkpoint. We make it manageable.",
      ]}
    />
    </>
  );
}
