import type { Metadata } from "next";
import ServiceDetailPage from "@/featuers/services/service-detail-page";

export const metadata: Metadata = {
  title:
    "Cyber Awareness Training UAE | Phishing Simulations | Nexaguard Cyber Labs",
  description:
    "Cybersecurity awareness training, targeted phishing simulations, social engineering assessments for UAE businesses. ISO 27001-aligned programs.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is your phishing simulation different from generic tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We build simulations around your actual industry threats and specific business context. Generic phishing emails train people to spot generic phishing — not targeted spear-phishing they're actually likely to face.",
      },
    },
    {
      "@type": "Question",
      name: "How often should we run phishing simulations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most organizations, quarterly is the right cadence. More frequent for high-risk roles. Less frequent and the awareness fades; too frequent and people stop paying attention.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide training in multiple languages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We deliver primarily in English, but Arabic-language training delivery is available for UAE-based teams.",
      },
    },
    {
      "@type": "Question",
      name: "Can training be delivered in person at our office?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We deliver online, in-person at your office, or hybrid. Executive briefings often work best in person.",
      },
    },
    {
      "@type": "Question",
      name: "What's the typical engagement model?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most clients start with a baseline assessment + foundational program (3-month initial engagement), then move to ongoing quarterly simulations and refreshers.",
      },
    },
    {
      "@type": "Question",
      name: "Does this satisfy ISO 27001 control A.6.3?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We deliver ISO 27001-aligned awareness programs and provide compliance evidence packages suitable for certification audits.",
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
      name: "Human Defense & Cyber Awareness",
      item: "https://nexaguardcyberlabs.com/services/human-defense-awareness",
    },
  ],
};

export default function HumanDefenseAwarenessPage() {
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
            q: "How is your phishing simulation different from generic tools?",
            a: "We build simulations around your actual industry threats and specific business context. Generic phishing emails train people to spot generic phishing — not targeted spear-phishing they're actually likely to face.",
          },
          {
            q: "How often should we run phishing simulations?",
            a: "For most organizations, quarterly is the right cadence. More frequent for high-risk roles. Less frequent and the awareness fades; too frequent and people stop paying attention.",
          },
          {
            q: "Do you provide training in multiple languages?",
            a: "Yes. We deliver primarily in English, but Arabic-language training delivery is available for UAE-based teams.",
          },
          {
            q: "Can training be delivered in person at our office?",
            a: "Yes. We deliver online, in-person at your office, or hybrid. Executive briefings often work best in person.",
          },
          {
            q: "What's the typical engagement model?",
            a: "Most clients start with a baseline assessment + foundational program (3-month initial engagement), then move to ongoing quarterly simulations and refreshers.",
          },
          {
            q: "Does this satisfy ISO 27001 control A.6.3?",
            a: "Yes. We deliver ISO 27001-aligned awareness programs and provide compliance evidence packages suitable for certification audits.",
          },
        ]}
        hero={{
          eyebrow: "OUR PRACTICE",
          h1: "Human Defense & Cyber Awareness",
          subhead:
            "Your people are your first firewall — and your most exploited attack vector. We turn that around.",
        }}
        problem={[
          "The most sophisticated cybersecurity stack in the world can be defeated by one click on a phishing email. Industry data consistently shows that more than 80% of successful breaches involve a human element — credential theft, social engineering, business email compromise, or insider error.",
          "Yet most cybersecurity programs treat human risk as an afterthought. A once-a-year e-learning module. A generic phishing simulation that everyone has seen before. Compliance-driven training that nobody pays attention to.",
          "We approach human defense the way we approach every other security domain — with rigor, specificity, and measurement. Targeted training built around your actual threats. Phishing simulations that mirror real attacker behavior. Awareness programs that change behavior, not just check a box.",
        ]}
        included={[
          "Cybersecurity Awareness Training (foundational programs)",
          "Role-Based Security Training (developers, executives, customer support, finance)",
          "Phishing Simulation Campaigns (realistic scenarios, measurable outcomes)",
          "Spear-Phishing & Business Email Compromise Simulations",
          "Social Engineering Assessments (vishing, smishing, physical pretexting)",
          "Executive Protection Briefings (high-target individuals)",
          "Insider Threat Awareness Programs",
          "Secure Development Training for Engineering Teams",
          "Compliance-Aligned Awareness (PDPL, GDPR, ISO 27001 ISMS awareness)",
          "Incident Reporting Culture Development",
          "Cybersecurity Onboarding Programs (new hire security induction)",
          "Annual Security Awareness Calendar Development",
        ]}
        methodology={[
          {
            step: "Baseline Assessment",
            desc: "Phishing simulation baseline, training audit, threat exposure analysis.",
          },
          {
            step: "Program Design",
            desc: "Tailored training program based on risk profile, sector, and team roles.",
          },
          {
            step: "Delivery",
            desc: "Engaging training delivery (online, in-person, or hybrid) with measurable participation.",
          },
          {
            step: "Continuous Reinforcement",
            desc: "Ongoing simulations, micro-learning, awareness campaigns.",
          },
          {
            step: "Measurement & Reporting",
            desc: "Track behavior change, click rates, reporting rates, and ROI metrics.",
          },
        ]}
        deliverables={[
          "Baseline phishing simulation report",
          "Tailored training curriculum mapped to your business risks",
          "Training completion and engagement reports",
          "Quarterly phishing simulation results with trend analysis",
          "Behavior change metrics (click rate, report rate, time-to-report)",
          "Executive-level awareness reports",
          "Compliance evidence package (suitable for ISO 27001 A.6.3, NESA, GDPR audits)",
          "Annual security awareness program calendar",
        ]}
        timeline={[
          "Initial Phishing Simulation Baseline: 2–3 weeks",
          "Foundational Awareness Program Rollout: 4–6 weeks",
          "Ongoing Continuous Awareness Program: monthly cadence",
          "Role-Based Training Program: 6–8 weeks for full design and delivery",
        ]}
        audience={[
          "Companies preparing for ISO 27001 certification (A.6.3 requires structured training)",
          "Organizations subject to NESA, ADGM, DIFC, or PDPL where awareness training is implicit",
          "Businesses that have experienced phishing incidents or near-misses",
          "Companies with high-target individuals (executives, finance teams, IT administrators)",
          "Organizations with rapid hiring requiring scalable security onboarding",
          "Engineering teams needing secure development practices training",
          "Companies whose enterprise clients require evidence of staff security training",
        ]}
      />
    </>
  );
}
