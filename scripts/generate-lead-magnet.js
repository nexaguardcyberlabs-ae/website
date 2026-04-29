// UAE SME Cybersecurity Compliance Checklist 2026 — PDF Generator
// Run: node scripts/generate-lead-magnet.js
// Output: public/downloads/uae-sme-cybersecurity-compliance-checklist-2026.pdf

const PDFDocument = require("pdfkit");
const fs = require("node:fs");
const path = require("node:path");

const OUTPUT_PATH = path.join(
  __dirname,
  "../public/downloads/uae-sme-cybersecurity-compliance-checklist-2026.pdf"
);

// ──────────────────────────────────────────────
// BRAND COLORS
// ──────────────────────────────────────────────
const CYAN = "#18A7B7";
const DARK_BG = "#020305";
const TEXT_DARK = "#1a1a2e";
const TEXT_BODY = "#2d3748";
const TEXT_LIGHT = "#718096";
const WHITE = "#ffffff";
const LIGHT_CYAN_BG = "#e8f8f9";
const BORDER_CYAN = "#b2ebf2";

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 50, bottom: 50, left: 60, right: 60 },
  info: {
    Title: "UAE SME Cybersecurity Compliance Checklist 2026",
    Author: "Nexaguard Cyber Labs",
    Subject: "UAE cybersecurity compliance checklist for SMEs",
    Keywords:
      "cybersecurity, UAE, compliance, NESA, ISO 27001, VAPT, checklist",
  },
});

doc.pipe(fs.createWriteStream(OUTPUT_PATH));

const W = doc.page.width - 120; // usable width
const L = 60; // left margin

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────
function newPage() {
  doc.addPage();
  // Page header stripe
  doc.rect(0, 0, doc.page.width, 6).fill(CYAN);
  doc.moveDown(1.5);
}

function sectionHeading(text) {
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor(CYAN)
    .text(text.toUpperCase(), L, doc.y, { width: W })
    .moveDown(0.4);
  doc.rect(L, doc.y, W, 1).fill(BORDER_CYAN);
  doc.moveDown(0.8);
}

function bodyText(text) {
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(TEXT_BODY)
    .text(text, L, doc.y, { width: W, lineGap: 3 })
    .moveDown(0.6);
}

function checkItem(text) {
  const y = doc.y;
  // Checkbox square
  doc.rect(L, y + 1, 10, 10).stroke(CYAN);
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(TEXT_BODY)
    .text(text, L + 18, y, { width: W - 18, lineGap: 2 });
  doc.moveDown(0.4);
}

function numberedStep(num, title, desc) {
  const y = doc.y;
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(CYAN)
    .text(`${num}.`, L, y, { width: 20, continued: false });
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(TEXT_DARK)
    .text(`${title}: `, L + 22, y, { continued: true })
    .font("Helvetica")
    .fillColor(TEXT_BODY)
    .text(desc, { width: W - 22 })
    .moveDown(0.5);
}

function highlight(text) {
  doc
    .rect(L, doc.y, W, doc.currentLineHeight() + 16)
    .fill(LIGHT_CYAN_BG);
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(TEXT_DARK)
    .text(text, L + 12, doc.y + 8, { width: W - 24 })
    .moveDown(0.8);
}

// ──────────────────────────────────────────────
// PAGE 1 — COVER
// ──────────────────────────────────────────────
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 8).fill(CYAN);
doc.rect(0, doc.page.height - 8, doc.page.width, 8).fill(CYAN);

doc
  .font("Helvetica-Bold")
  .fontSize(28)
  .fillColor(WHITE)
  .text("UAE SME Cybersecurity", L, 140, { width: W, align: "center" });
doc
  .font("Helvetica-Bold")
  .fontSize(28)
  .fillColor(CYAN)
  .text("Compliance Checklist", L, doc.y + 4, { width: W, align: "center" });
doc
  .font("Helvetica-Bold")
  .fontSize(28)
  .fillColor(WHITE)
  .text("2026", L, doc.y + 4, { width: W, align: "center" });

doc.rect(L, doc.y + 20, W, 2).fill(CYAN);

doc
  .font("Helvetica")
  .fontSize(12)
  .fillColor("#a0aec0")
  .text(
    "A practical field guide for UAE businesses navigating regulatory\nexpectations, security controls, and risk priorities.",
    L,
    doc.y + 30,
    { width: W, align: "center", lineGap: 4 }
  );

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#718096")
  .text("Prepared by Nexaguard Cyber Labs — Dubai, UAE", L, 540, {
    width: W,
    align: "center",
  });
doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#4a5568")
  .text("Edition 1 · 2026", L, 560, { width: W, align: "center" });

// ──────────────────────────────────────────────
// PAGE 2 — FOREWORD
// ──────────────────────────────────────────────
newPage();
sectionHeading("Foreword");
bodyText(
  "This checklist exists because the cybersecurity advice most UAE SMEs receive is either too generic to be useful, or too technical to be actionable."
);
bodyText(
  "UAE businesses operate under a layered regulatory environment. NESA, the Telecommunications and Digital Government Regulatory Authority (TDRA), the Central Bank of the UAE (CBUAE), the financial free zones (DIFC, ADGM), and sector-specific regulators (DHA, DOH, ADHICS) each define cybersecurity expectations that overlap, diverge, and evolve."
);
bodyText(
  "Most growing companies do not have a dedicated compliance team. They have a CTO who is also the IT lead, a CEO who knows there is a problem but not the specifics, and an auditor or enterprise client asking pointed questions."
);
bodyText(
  "This checklist is for those companies. It is not exhaustive — by design. It focuses on the controls and frameworks that matter most, in the order they typically need attention. Use it as a starting point for an internal review, a structured conversation with your team, or a baseline before bringing in external support."
);
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor(CYAN)
  .text("— Nexaguard Cyber Labs", L, doc.y + 10)
  .moveDown(1);

// ──────────────────────────────────────────────
// PAGE 3 — HOW TO USE
// ──────────────────────────────────────────────
newPage();
sectionHeading("How to Use This Checklist");
bodyText(
  "This checklist is structured in six sections: regulatory landscape, foundational controls, application & data security, governance & compliance, common vulnerabilities, and a 7-day action plan."
);
bodyText(
  "Each item is a yes / no / in-progress checkbox. Work through each section honestly with your IT lead or security advisor. A score above 70% indicates a reasonable foundation — it does not mean you are secure. A score below 50% means urgent attention is needed."
);
bodyText(
  "Use this checklist quarterly. Your environment changes, regulations evolve, and threats shift. A one-time assessment provides a snapshot; a quarterly review builds a programme."
);

highlight(
  "📌  TIP: For any area where you score 'No' or 'In Progress', note it for your 7-Day Action Plan on page 10."
);

// ──────────────────────────────────────────────
// PAGE 4 — UAE REGULATORY LANDSCAPE
// ──────────────────────────────────────────────
newPage();
sectionHeading("UAE Regulatory Landscape Overview");
bodyText(
  "Understanding which regulators apply to your business is the essential first step. Here is a summary of the key frameworks:"
);

const regulators = [
  [
    "NESA / UAE IAS",
    "Critical national infrastructure, government, and designated sectors. Mandatory for in-scope entities.",
  ],
  [
    "TDRA",
    "Telecommunications & Digital Government Regulatory Authority. Cybersecurity expectations for licensed entities.",
  ],
  [
    "CBUAE",
    "Central Bank of the UAE. Financial institutions, payment service providers. Annual VAPT and incident reporting requirements.",
  ],
  [
    "DIFC",
    "Dubai International Financial Centre. Data Protection Law 2020 + cyber risk expectations for DIFC-registered entities.",
  ],
  [
    "ADGM",
    "Abu Dhabi Global Market. Cyber Risk Management framework + Data Protection Regulations 2021.",
  ],
  [
    "DHA / DOH / ADHICS",
    "Healthcare-specific cybersecurity standards. ADHICS is mandatory for Abu Dhabi healthcare entities.",
  ],
  [
    "UAE PDPL",
    "Federal Decree-Law 45 of 2021. Personal Data Protection Law applicable to most businesses processing personal data of UAE residents.",
  ],
  [
    "International Standards",
    "ISO 27001, PCI DSS, SOC 2, GDPR — often required by enterprise clients, investors, or international operations.",
  ],
];

regulators.forEach(([name, desc]) => {
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10).fillColor(CYAN).text(`• ${name}:`, L, y, { continued: true });
  doc.font("Helvetica").fontSize(10).fillColor(TEXT_BODY).text(` ${desc}`, { width: W }).moveDown(0.5);
});

// ──────────────────────────────────────────────
// PAGE 5 — SECTION A: FOUNDATIONAL CONTROLS
// ──────────────────────────────────────────────
newPage();
sectionHeading("Section A — Foundational Security Controls");
bodyText("These controls form the minimum viable security baseline for any UAE SME:");

const sectionA = [
  "Multi-factor authentication enforced on all administrative accounts",
  "Multi-factor authentication enforced on all remote / VPN access",
  "Privileged Access Management (PAM) approach defined (even if manual)",
  "Centralised logging in place (authentication logs, admin actions, application errors)",
  "Logs retained for minimum 6 months (12+ months for regulated sectors)",
  "Endpoint protection (EDR/AV) deployed on all corporate devices",
  "Mobile Device Management (MDM) deployed if BYOD or company devices in use",
  "Patch management SLA documented (critical: 7 days; high severity: 30 days)",
  "Backup strategy defined: daily incremental, weekly full, off-site copy",
  "Backup restoration tested in last 90 days",
  "Email security: SPF, DKIM, DMARC records correctly configured",
  "Anti-phishing controls deployed (email gateway filtering, user training, simulation testing)",
  "Network segmentation between production, staging, and corporate networks",
];
sectionA.forEach(checkItem);

// ──────────────────────────────────────────────
// PAGE 6 — SECTION B: APPLICATION & DATA SECURITY
// ──────────────────────────────────────────────
newPage();
sectionHeading("Section B — Application & Data Security");

const sectionB = [
  "Web applications scanned for vulnerabilities at minimum quarterly",
  "Penetration testing conducted at least annually (more often for fintech and high-risk sectors)",
  "Secure software development lifecycle (SSDLC) practices in use",
  "Source code repositories private and access-controlled",
  "Hard-coded credentials / secrets removed from code (use a secrets manager)",
  "API authentication strong (OAuth2, JWT with proper validation, rate limiting)",
  "Data classification policy in place (Public, Internal, Confidential, Restricted)",
  "Encryption at rest for sensitive data (AES-256 or equivalent)",
  "Encryption in transit enforced (TLS 1.2 minimum, TLS 1.3 preferred)",
  "SSL/TLS certificates inventoried, monitored, and renewed before expiry",
  "Web Application Firewall (WAF) deployed for public-facing applications",
  "DDoS protection in place (Cloudflare, AWS Shield, or equivalent)",
];
sectionB.forEach(checkItem);

// ──────────────────────────────────────────────
// PAGE 7 — SECTION C: GOVERNANCE, RISK & COMPLIANCE
// ──────────────────────────────────────────────
newPage();
sectionHeading("Section C — Governance, Risk & Compliance");

const sectionC = [
  "Information Security Policy documented, approved, and reviewed annually",
  "Acceptable Use Policy signed by all employees during onboarding",
  "Risk register maintained and reviewed quarterly",
  "Asset inventory documented (hardware, software, data, third-party services)",
  "Access control matrix documented (who has access to what, and why)",
  "Joiner/Mover/Leaver process formalised (access provisioning and revocation)",
  "Vendor / third-party risk assessment process in place",
  "Data Processing Agreements (DPAs) signed with relevant vendors",
  "Incident response plan documented and tested",
  "Business continuity / disaster recovery plan documented",
  "Cybersecurity awareness training completed by all staff annually",
  "Regulatory mapping completed (which frameworks apply to your business)",
];
sectionC.forEach(checkItem);

// ──────────────────────────────────────────────
// PAGE 8 — SECTION D: COMMON UAE SME VULNERABILITIES
// ──────────────────────────────────────────────
newPage();
sectionHeading("Section D — Common UAE SME Vulnerabilities");
bodyText(
  "These are the issues we see most frequently across UAE SME environments. Each represents a real, exploitable risk:"
);

const sectionD = [
  "Outdated CMS installations (WordPress, Drupal) running unpatched plugins",
  "Default admin credentials on IoT devices, network equipment, and admin portals",
  "Exposed development or staging environments accessible from the public internet",
  "Cloud storage buckets (AWS S3, Azure Blob, Google Cloud Storage) with public read or write access",
  "Email accounts without MFA — particularly the founder/CEO inbox",
  "Outdated SSL/TLS configurations (TLS 1.0/1.1, weak ciphers) flagged by SSL Labs",
  "DNS misconfigurations (missing SPF, DKIM, DMARC) enabling email spoofing",
  "VPN endpoints with weak authentication",
  "Backup data stored on the same network as production (vulnerable to ransomware)",
  "Lack of monitoring for unusual login patterns or admin actions",
  "Absence of a cybersecurity insurance policy",
  "No documented process for handling personal data subject access requests (PDPL requirement)",
];
sectionD.forEach(checkItem);

// ──────────────────────────────────────────────
// PAGE 9 — SECTION E: ISO 27001 READINESS
// ──────────────────────────────────────────────
newPage();
sectionHeading("Section E — ISO 27001:2022 Readiness Quick-View");
bodyText(
  "The 12 ISO 27001:2022 controls most commonly missing in UAE SME assessments:"
);

const iso27001Controls = [
  ["A.5.1", "Information Security Policies — documented, approved, communicated"],
  ["A.5.7", "Threat Intelligence — receiving and using threat intel"],
  ["A.5.23", "Information Security for Cloud Services — cloud security policy"],
  ["A.5.30", "ICT Readiness for Business Continuity — BCP and DR"],
  ["A.6.3", "Information Security Awareness — annual training programme"],
  ["A.7.4", "Physical Security Monitoring — premises monitoring"],
  ["A.8.7", "Protection Against Malware — endpoint protection deployed"],
  ["A.8.8", "Management of Technical Vulnerabilities — patch + scan + pentest"],
  ["A.8.16", "Monitoring Activities — logging and alerting in place"],
  ["A.8.23", "Web Filtering — outbound web access controls"],
  ["A.8.28", "Secure Coding — SSDLC practices implemented"],
  ["A.8.32", "Change Management — production change controls documented"],
];

iso27001Controls.forEach(([control, desc]) => {
  const y = doc.y;
  doc.rect(L, y + 1, 10, 10).stroke(CYAN);
  doc.font("Helvetica-Bold").fontSize(9).fillColor(CYAN).text(control, L + 18, y, { continued: true });
  doc.font("Helvetica").fontSize(9).fillColor(TEXT_BODY).text(` — ${desc}`, { width: W - 18 }).moveDown(0.4);
});

// ──────────────────────────────────────────────
// PAGE 10 — SECTION F: 7-DAY ACTION PLAN
// ──────────────────────────────────────────────
newPage();
sectionHeading("Section F — Your 7-Day Action Plan");
bodyText(
  "After completing this checklist, take these seven specific actions this week:"
);

const actionPlan = [
  [
    "Day 1",
    "Inventory all internet-facing assets",
    "Websites, applications, APIs, exposed services. Use a simple spreadsheet.",
  ],
  [
    "Day 2",
    "Run free external scans",
    "Use SSL Labs (ssllabs.com) and Mozilla Observatory on every public asset.",
  ],
  [
    "Day 3",
    "Review admin accounts",
    "Enforce MFA on every account that does not already have it enabled.",
  ],
  [
    "Day 4",
    "Phishing review",
    "Run a phishing simulation OR review last quarter's email threats with your team.",
  ],
  [
    "Day 5",
    "Test your backup",
    "Verify backup actually works — restore one file from backup as a live test.",
  ],
  [
    "Day 6",
    "Score this checklist",
    "Complete all sections with your IT lead. Score honestly. Note every 'No' and 'In Progress'.",
  ],
  [
    "Day 7",
    "Identify top 3 risks",
    "Decide which you fix in-house, which need external support, and set a timeline.",
  ],
];

actionPlan.forEach(([day, title, action]) => {
  const y = doc.y;
  doc
    .rect(L, y, 52, doc.currentLineHeight() + 14)
    .fill(LIGHT_CYAN_BG);
  doc.font("Helvetica-Bold").fontSize(9).fillColor(CYAN).text(day, L + 5, y + 5);
  doc.font("Helvetica-Bold").fontSize(10).fillColor(TEXT_DARK).text(title, L + 62, y + 2, { continued: true });
  doc.font("Helvetica").fontSize(10).fillColor(TEXT_BODY).text(` — ${action}`, { width: W - 62 }).moveDown(0.6);
});

// ──────────────────────────────────────────────
// PAGE 11 — WHEN TO CONSIDER EXTERNAL SUPPORT
// ──────────────────────────────────────────────
newPage();
sectionHeading("When to Consider External Support");
bodyText(
  "This is honest guidance, not a sales pitch. Consider bringing in external cybersecurity support if:"
);

const triggers = [
  "A regulator, auditor, or enterprise client has asked for a VAPT report or compliance evidence",
  "You are preparing for ISO 27001, PCI DSS, NESA, or ADHICS certification",
  "You have experienced a security incident, near-miss, or noticed unusual activity",
  "You are scaling rapidly and the team can no longer manage security alongside other duties",
  "An investor or acquirer has flagged cybersecurity in due diligence",
  "You are entering a new market or sector with stricter regulatory requirements",
];

triggers.forEach((t) => {
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(TEXT_BODY)
    .text(`• ${t}`, L + 10, doc.y, { width: W - 10 })
    .moveDown(0.4);
});

doc.moveDown(0.8);
highlight(
  'If any of the above describes your current situation, we\'d be glad to help. Book a free 30-minute risk review at nexaguardcyberlabs.com — no commitment, no hard sell.'
);

// ──────────────────────────────────────────────
// PAGE 12 — ABOUT NEXAGUARD
// ──────────────────────────────────────────────
newPage();
sectionHeading("About Nexaguard Cyber Labs");

bodyText(
  "Nexaguard Cyber Labs is a Dubai-based cybersecurity consultancy serving UAE and GCC businesses. We focus on penetration testing, ISO 27001 readiness, GRC, and managed security services for fintechs, SaaS companies, healthcare organisations, and growing mid-market businesses."
);
bodyText(
  "We exist to make enterprise-grade security accessible — not by cutting corners, but by removing the overhead, account management layers, and procurement complexity that makes enterprise consulting prohibitive for businesses under 250 staff. Senior practitioners. Honest scoping. Reports that drive remediation."
);
bodyText(
  "If this checklist was useful, we'd be glad to hear what you found, what you fixed, and what you'd like to see in the next edition."
);

doc.moveDown(0.8);

const contactItems = [
  ["Email", "info@nexaguardcyberlabs.com"],
  ["Phone / WhatsApp", "+971 50 623 3538"],
  ["Web", "nexaguardcyberlabs.com"],
  ["Office", "Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE"],
];

contactItems.forEach(([label, value]) => {
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10).fillColor(CYAN).text(`${label}:`, L, y, { continued: true });
  doc.font("Helvetica").fontSize(10).fillColor(TEXT_BODY).text(` ${value}`, { width: W }).moveDown(0.4);
});

doc.moveDown(1);
doc.rect(L, doc.y, W, 1).fill(BORDER_CYAN);
doc.moveDown(0.8);

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor(TEXT_LIGHT)
  .text(
    "This document is provided for informational purposes only and does not constitute legal, regulatory, or compliance advice. Specific regulatory obligations vary by sector, entity type, and circumstances. Consult qualified legal and cybersecurity advisors for your specific situation.",
    L,
    doc.y,
    { width: W, lineGap: 2 }
  );

// ──────────────────────────────────────────────
// FINALIZE
// ──────────────────────────────────────────────
doc.end();

doc.on("finish", () => {
  console.log(`✅ PDF generated: ${OUTPUT_PATH}`);
});

doc.on("error", (err) => {
  console.error("PDF generation error:", err);
  process.exit(1);
});
