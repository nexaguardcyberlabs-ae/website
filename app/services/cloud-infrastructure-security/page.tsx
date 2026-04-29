import type { Metadata } from "next";
import ServiceDetailPage from "@/featuers/services/service-detail-page";

export const metadata: Metadata = {
  title:
    "Cloud & Infrastructure Security UAE | Network Penetration Testing | Nexaguard",
  description:
    "Cloud security assessments (AWS, Azure, GCP), network penetration testing, industrial control systems security for UAE businesses. CSPM-aligned methodology.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you assess all major cloud platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we work across AWS, Azure, and Google Cloud Platform. Multi-cloud assessments are common.",
      },
    },
    {
      "@type": "Question",
      name: "What about industrial control systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We have specific methodologies for ICS/SCADA environments. These follow IEC 62443 framework principles and require extra care to avoid disruption.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from your Application Security service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Application Security focuses on the software layer (web apps, APIs, mobile). Infrastructure Security covers everything below — networks, cloud platforms, servers, industrial systems.",
      },
    },
    {
      "@type": "Question",
      name: "Can you assess our environment without disrupting operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All testing follows agreed rules of engagement. For sensitive environments, we use staging replicas, off-hours testing windows, or read-only assessment approaches.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide remediation support after the assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide detailed remediation guidance in our reports. For hands-on remediation support, we offer follow-on engagements or our Managed Services tier.",
      },
    },
    {
      "@type": "Question",
      name: "What standards do you reference?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CIS Benchmarks, NIST SP 800-53, ISO 27001 controls, IEC 62443 (industrial), and platform-specific best practices (AWS Well-Architected, Azure Security Benchmark, Google Cloud Security Best Practices).",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://nexaguardcyberlabs.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://nexaguardcyberlabs.com/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Cloud & Infrastructure Security",
      item: "https://nexaguardcyberlabs.com/services/cloud-infrastructure-security",
    },
  ],
};

export default function CloudInfrastructureSecurityPage() {
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
            q: "Do you assess all major cloud platforms?",
            a: "Yes — we work across AWS, Azure, and Google Cloud Platform. Multi-cloud assessments are common.",
          },
          {
            q: "What about industrial control systems?",
            a: "We have specific methodologies for ICS/SCADA environments. These follow IEC 62443 framework principles and require extra care to avoid disruption.",
          },
          {
            q: "How is this different from your Application Security service?",
            a: "Application Security focuses on the software layer (web apps, APIs, mobile). Infrastructure Security covers everything below — networks, cloud platforms, servers, industrial systems.",
          },
          {
            q: "Can you assess our environment without disrupting operations?",
            a: "Yes. All testing follows agreed rules of engagement. For sensitive environments, we use staging replicas, off-hours testing windows, or read-only assessment approaches.",
          },
          {
            q: "Do you provide remediation support after the assessment?",
            a: "We provide detailed remediation guidance in our reports. For hands-on remediation support, we offer follow-on engagements or our Managed Services tier.",
          },
          {
            q: "What standards do you reference?",
            a: "CIS Benchmarks, NIST SP 800-53, ISO 27001 controls, IEC 62443 (industrial), and platform-specific best practices (AWS Well-Architected, Azure Security Benchmark, Google Cloud Security Best Practices).",
          },
        ]}
        hero={{
          eyebrow: "OUR PRACTICE",
          h1: "Cloud, Infrastructure & Industrial Security",
          subhead:
            "Securing the foundations of your digital operations — from cloud configurations to network perimeters to industrial control systems.",
        }}
        problem={[
          "Cybersecurity attention often focuses on applications — but the infrastructure underneath is where most breaches actually happen. Misconfigured cloud storage. Open network ports. Forgotten administrative interfaces. Default credentials on industrial systems. Outdated firewall rules.",
          "UAE businesses operating across cloud platforms, on-premise infrastructure, and industrial environments face a layered security challenge. Each layer needs its own assessment, its own controls, and its own ongoing monitoring. Most don't have the in-house expertise to map the full picture — let alone secure it.",
          "We assess the entire infrastructure stack, identify the gaps that matter, and help you build resilient controls that hold up to real-world threats and audits.",
        ]}
        included={[
          "Cloud Security Assessment (AWS, Azure, GCP)",
          "Cloud Configuration Review (CSPM-aligned)",
          "Container & Kubernetes Security Assessment",
          "Cloud Identity & Access Management (IAM) Hardening",
          "Network Architecture & Segmentation Review",
          "Internal & External Network Penetration Testing",
          "Firewall Rule Review & Optimization",
          "VPN & Remote Access Security Assessment",
          "Wireless Network Security Assessment",
          "Active Directory Security Review",
          "Industrial Control Systems (ICS/SCADA) Security Assessment",
          "IoT Device Security Assessment",
          "Operational Technology (OT) Network Segmentation",
          "Disaster Recovery & Backup Strategy Review",
        ]}
        methodology={[
          {
            step: "Asset Discovery",
            desc: "Inventory cloud accounts, network segments, infrastructure assets, ICS/IoT devices, and exposed services.",
          },
          {
            step: "Configuration Review",
            desc: "Map current configurations against industry baselines (CIS, NIST, vendor best practices).",
          },
          {
            step: "Active Testing",
            desc: "Perform authorized penetration testing on identified attack surfaces.",
          },
          {
            step: "Risk Analysis",
            desc: "Prioritize findings by exploitability, business impact, and remediation effort.",
          },
          {
            step: "Roadmap & Remediation",
            desc: "Deliver phased remediation plan with quick wins, medium-term fixes, and strategic improvements.",
          },
        ]}
        deliverables={[
          "Complete asset inventory and attack surface map",
          "Cloud security posture report (CSPM-aligned findings)",
          "Network architecture review with segmentation recommendations",
          "Penetration testing report with proof-of-concept evidence",
          "Risk-prioritized remediation roadmap",
          "Hardening checklists for in-scope platforms",
          "Executive summary suitable for board reporting",
          "Free re-test of remediated findings within 30 days",
        ]}
        timeline={[
          "Cloud Security Assessment (single platform): 2–3 weeks",
          "Network Penetration Test (combined external + internal): 3–4 weeks",
          "Industrial / ICS Assessment: 4–6 weeks (depends on scope)",
          "Full Infrastructure Stack Review: 6–8 weeks",
        ]}
        audience={[
          "Companies operating across multiple cloud platforms requiring CSPM-aligned reviews",
          "Organizations preparing for ISO 27001, NESA, or PCI DSS audits requiring infrastructure evidence",
          "Businesses scaling rapidly and needing architecture reviews before further growth",
          "Companies with industrial operations (manufacturing, energy, logistics) requiring OT security assessment",
          "Organizations that have completed application-layer security work and need to address the underlying infrastructure",
          "Businesses preparing for enterprise procurement requiring infrastructure attestation",
        ]}
      />
    </>
  );
}
