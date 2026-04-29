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

// ── PAGE GEOMETRY ─────────────────────────────────────────────────────────────
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const ML = 52;
const MR = 52;
const TW = PAGE_W - ML - MR; // 491.28
const CTOP = 75; // content starts below running header
const CBOT = PAGE_H - 52; // content ends above footer

// ── DOCUMENT SETUP ────────────────────────────────────────────────────────────
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 55, bottom: 55, left: ML, right: MR },
  bufferPages: true,
  info: {
    Title: "UAE SME Cybersecurity Compliance Checklist 2026",
    Author: "Nexaguard Cyber Labs",
    Subject: "Practical cybersecurity compliance checklist for UAE SMEs",
    Keywords: "cybersecurity, UAE, compliance, NESA, ISO 27001, VAPT, SME",
  },
});

doc.pipe(fs.createWriteStream(OUTPUT_PATH));

// ── GLOBAL STATE ──────────────────────────────────────────────────────────────
let pageNum = 0;
let sectionTag = "";

// ── LOW-LEVEL DRAWING HELPERS ─────────────────────────────────────────────────

function fillBg() {
  doc.save();
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(DARK_BG);
  doc.restore();
}

function drawTopBar() {
  // Dual-tone gradient simulation
  const thirds = PAGE_W / 3;
  doc.rect(0, 0, thirds, 5).fill(CYAN);
  doc.rect(thirds, 0, thirds, 5).fill("#18a0b0");
  doc.rect(thirds * 2, 0, thirds, 5).fill(BLUE);
}

function drawLogoMark(x, y, iconSize, showWordmark) {
  // Cyan tile
  doc
    .roundedRect(x, y, iconSize, iconSize, Math.round(iconSize * 0.18))
    .fill(CYAN);
  // Shield shape inside tile (simplified pentagon)
  const cx = x + iconSize / 2;
  const shieldTop = y + iconSize * 0.12;
  const shieldW = iconSize * 0.55;
  const shieldH = iconSize * 0.76;
  doc.save();
  doc.fillColor("rgba(255,255,255,0.18)");
  doc
    .moveTo(cx - shieldW, shieldTop)
    .lineTo(cx + shieldW, shieldTop)
    .lineTo(cx + shieldW, shieldTop + shieldH * 0.55)
    .bezierCurveTo(
      cx + shieldW,
      shieldTop + shieldH * 0.9,
      cx + shieldW * 0.3,
      shieldTop + shieldH,
      cx,
      shieldTop + shieldH
    )
    .bezierCurveTo(
      cx - shieldW * 0.3,
      shieldTop + shieldH,
      cx - shieldW,
      shieldTop + shieldH * 0.9,
      cx - shieldW,
      shieldTop + shieldH * 0.55
    )
    .closePath()
    .fill();
  doc.restore();
  // Checkmark
  const ckX = cx - shieldW * 0.25;
  const ckY = shieldTop + shieldH * 0.45;
  doc
    .moveTo(ckX, ckY)
    .lineTo(ckX + shieldW * 0.3, ckY + shieldH * 0.22)
    .lineTo(ckX + shieldW * 0.8, ckY - shieldH * 0.18)
    .strokeColor(WHITE)
    .lineWidth(Math.max(1, iconSize * 0.07))
    .stroke();

  if (showWordmark) {
    const wx = x + iconSize + 10;
    doc.save();
    doc
      .fontSize(iconSize * 0.42)
      .font("Helvetica-Bold")
      .fillColor(WHITE)
      .text("NEXAGUARD", wx, y + iconSize * 0.05, { lineBreak: false });
    doc
      .fontSize(iconSize * 0.22)
      .font("Helvetica-Bold")
      .fillColor(CYAN)
      .text("CYBER  LABS", wx, y + iconSize * 0.52, { lineBreak: false });
    doc.restore();
    doc.y = y + iconSize; // skip past logo height
  }
}

function drawRunningHeader(tag) {
  drawLogoMark(ML, 14, 26, false);
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
      .text(tag.toUpperCase(), PAGE_W - MR - 200, 22, {
        width: 200,
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

function sectionBand(eyebrow, title) {
  checkSpace(60);
  const startY = doc.y;
  const bandH = 50;
  doc.rect(ML, startY, TW, bandH).fill(DARK_CARD);
  doc.rect(ML, startY, 4, bandH).fill(CYAN);
  doc
    .fontSize(7)
    .font("Helvetica-Bold")
    .fillColor(CYAN)
    .text(eyebrow.toUpperCase(), ML + 12, startY + 8, {
      width: TW - 24,
      lineBreak: false,
    });
  doc
    .fontSize(15)
    .font("Helvetica-Bold")
    .fillColor(WHITE)
    .text(title, ML + 12, startY + 20, { width: TW - 24, lineBreak: false });
  doc.y = startY + bandH + 12;
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

function subHead(text) {
  checkSpace(28);
  doc
    .fontSize(11.5)
    .font("Helvetica-Bold")
    .fillColor(CYAN)
    .text(text, ML, doc.y, { width: TW });
  doc.y += 5;
}

function checkItem(text, priority) {
  const h = doc.heightOfString(text, { width: TW - 24 }) + 18;
  checkSpace(h);
  const iy = doc.y;

  // Checkbox outline
  doc
    .rect(ML, iy + 2, 11, 11)
    .strokeColor(CYAN)
    .lineWidth(0.8)
    .stroke();

  let tx = ML + 18;

  // Priority badge
  if (priority === "critical" || priority === "high") {
    const label = priority === "critical" ? "CRITICAL" : "HIGH";
    const bgColor = priority === "critical" ? RED : ORANGE;
    const bw = label.length * 4.8 + 8;
    doc.roundedRect(tx, iy + 2, bw, 11, 2).fill(bgColor);
    doc
      .fontSize(6)
      .font("Helvetica-Bold")
      .fillColor(WHITE)
      .text(label, tx, iy + 3.8, {
        width: bw,
        align: "center",
        lineBreak: false,
      });
    tx += bw + 5;
  }

  doc
    .fontSize(9.5)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(text, tx, iy, { width: TW - (tx - ML), lineGap: 2 });
  doc.y = iy + h - 4;
}

function calloutBox(text, type) {
  let accent;
  let label;
  if (type === "warning") {
    accent = ORANGE;
    label = "IMPORTANT";
  } else if (type === "danger") {
    accent = RED;
    label = "CRITICAL";
  } else {
    accent = CYAN;
    label = "TIP";
  }
  const tw2 = TW - 26;
  const textH = doc.heightOfString(text, { width: tw2 }) + 30;
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
    .text(text, ML + 12, by + 20, { width: tw2, lineGap: 3 });
  doc.y = by + textH + 10;
}

function isoRow(control, desc) {
  const dh = doc.heightOfString(desc, { width: TW - 82 }) + 14;
  const rh = Math.max(dh, 22);
  checkSpace(rh + 2);
  const ry = doc.y;
  doc.rect(ML, ry, 70, rh).fill(DARK_CARD);
  doc.rect(ML + 70, ry, TW - 70, rh).fill(DARK_ROW);
  doc.rect(ML, ry, TW, rh).strokeColor(BORDER_C).lineWidth(0.5).stroke();
  // Checkbox
  doc
    .rect(ML + 6, ry + (rh - 10) / 2, 10, 10)
    .strokeColor(CYAN)
    .lineWidth(0.7)
    .stroke();
  doc
    .fontSize(8)
    .font("Helvetica-Bold")
    .fillColor(CYAN)
    .text(control, ML + 20, ry + (rh - 9) / 2, { width: 46, lineBreak: false });
  doc
    .fontSize(8.5)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(desc, ML + 76, ry + 7, { width: TW - 86, lineGap: 2 });
  doc.y = ry + rh;
}

function regulatorRow(name, scope, standard) {
  const descH =
    doc.heightOfString(`${scope}  •  ${standard}`, { width: TW - 116 }) + 14;
  const rh = Math.max(descH, 26);
  checkSpace(rh + 2);
  const ry = doc.y;
  doc.rect(ML, ry, 105, rh).fill(DARK_CARD);
  doc.rect(ML + 105, ry, TW - 105, rh).fill(DARK_ROW);
  doc.rect(ML, ry, TW, rh).strokeColor(BORDER_C).lineWidth(0.5).stroke();
  doc
    .fontSize(8.5)
    .font("Helvetica-Bold")
    .fillColor(CYAN)
    .text(name, ML + 8, ry + (rh - 9) / 2, { width: 90, lineBreak: false });
  doc
    .fontSize(8)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(scope, ML + 113, ry + 6, { width: TW - 123, lineBreak: false });
  doc
    .fontSize(7.5)
    .font("Helvetica-Oblique")
    .fillColor(GRAY_300)
    .text(standard, ML + 113, ry + 17, { width: TW - 123, lineBreak: false });
  doc.y = ry + rh;
}

function actionRow(day, title, detail) {
  const dh = doc.heightOfString(detail, { width: TW - 162 }) + 14;
  const rh = Math.max(dh, 30);
  checkSpace(rh + 2);
  const ry = doc.y;
  doc.rect(ML, ry, 56, rh).fill(CYAN);
  doc.rect(ML + 56, ry, 98, rh).fill(DARK_CARD);
  doc.rect(ML + 154, ry, TW - 154, rh).fill(DARK_ROW);
  doc.rect(ML, ry, TW, rh).strokeColor(BORDER_C).lineWidth(0.5).stroke();
  doc
    .fontSize(8.5)
    .font("Helvetica-Bold")
    .fillColor(DARK_BG)
    .text(day, ML, ry + (rh - 9) / 2, {
      width: 56,
      align: "center",
      lineBreak: false,
    });
  doc
    .fontSize(8.5)
    .font("Helvetica-Bold")
    .fillColor(WHITE)
    .text(title, ML + 62, ry + (rh - 9) / 2, { width: 84, lineBreak: false });
  doc
    .fontSize(8.5)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(detail, ML + 160, ry + 7, { width: TW - 168, lineGap: 2 });
  doc.y = ry + rh;
}

function bulletItem(text) {
  const h = doc.heightOfString(text, { width: TW - 14 }) + 10;
  checkSpace(h);
  const iy = doc.y;
  doc.circle(ML + 4, iy + 6, 2).fill(CYAN);
  doc
    .fontSize(9.5)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(text, ML + 12, iy, { width: TW - 12, lineGap: 2 });
  doc.y = iy + h - 4;
}

function contactRow(label, value) {
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

function divider() {
  checkSpace(16);
  doc.rect(ML, doc.y, TW, 0.5).fill(GRAY_700);
  doc.y += 12;
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE 1 — COVER
// ════════════════════════════════════════════════════════════════════════════
pageNum = 1;
fillBg();

// Top gradient bar
for (let i = 0; i < 5; i++) {
  const frac = i / 4;
  const r1 = 0x18,
    g1 = 0xa7,
    b1 = 0xb7;
  const r2 = 0x1f,
    g2 = 0x88,
    b2 = 0xbf;
  const r = Math.round(r1 + (r2 - r1) * frac);
  const g = Math.round(g1 + (g2 - g1) * frac);
  const b = Math.round(b1 + (b2 - b1) * frac);
  const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  doc.rect(PAGE_W * (i / 5), 0, PAGE_W / 5, 7).fill(hex);
}

// Bottom bar
doc.rect(0, PAGE_H - 7, PAGE_W, 7).fill(CYAN);

// Large logo (centred)
const logoSize = 72;
const logoX = (PAGE_W - logoSize - 10 - 140) / 2;
drawLogoMark(logoX, 80, logoSize, false);

// NEXAGUARD wordmark (manually placed to look right)
doc
  .fontSize(30)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("NEXAGUARD", logoX + logoSize + 14, 87, { lineBreak: false });
doc
  .fontSize(12)
  .font("Helvetica-Bold")
  .fillColor(CYAN)
  .text("CYBER  LABS", logoX + logoSize + 14, 122, { lineBreak: false });

// Thin divider
doc.rect(ML, 175, TW, 1).fill(GRAY_700);

// Badge
const badgeY = 188;
const badgeW = 230;
const badgeX = (PAGE_W - badgeW) / 2;
doc
  .roundedRect(badgeX, badgeY, badgeW, 24, 4)
  .strokeColor(CYAN)
  .lineWidth(0.8)
  .stroke();
doc
  .fontSize(8)
  .font("Helvetica-Bold")
  .fillColor(CYAN)
  .text("FREE RESOURCE  ·  EDITION 1  ·  2026", badgeX, badgeY + 7, {
    width: badgeW,
    align: "center",
    lineBreak: false,
  });

// Main title
doc
  .fontSize(34)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("UAE SME Cybersecurity", ML, 228, { width: TW, align: "center" });
doc
  .fontSize(34)
  .font("Helvetica-Bold")
  .fillColor(CYAN)
  .text("Compliance Checklist", ML, doc.y + 2, { width: TW, align: "center" });
doc
  .fontSize(34)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("2026", ML, doc.y + 2, { width: TW, align: "center" });

// Subtitle
doc
  .fontSize(12)
  .font("Helvetica")
  .fillColor(GRAY_200)
  .text(
    "A practical field guide for UAE businesses navigating regulatory\n" +
      "expectations, security controls, and risk priorities.",
    ML,
    doc.y + 18,
    { width: TW, align: "center", lineGap: 4 }
  );

// What's inside cards
const card = { w: (TW - 16) / 3, h: 62, y: PAGE_H - 210 };
const coverCards = [
  { icon: "A–E", label: "Five Security\nSections" },
  { icon: "70+", label: "Actionable\nChecklist Items" },
  { icon: "7", label: "Day Action\nPlan Included" },
];
for (let i = 0; i < coverCards.length; i++) {
  const item = coverCards[i];
  const cx2 = ML + i * (card.w + 8);
  doc.roundedRect(cx2, card.y, card.w, card.h, 6).fill(DARK_CARD);
  doc.rect(cx2, card.y, card.w, 3).fill(CYAN);
  doc
    .fontSize(18)
    .font("Helvetica-Bold")
    .fillColor(CYAN)
    .text(item.icon, cx2, card.y + 10, {
      width: card.w,
      align: "center",
      lineBreak: false,
    });
  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor(GRAY_200)
    .text(item.label, cx2, card.y + 34, {
      width: card.w,
      align: "center",
      lineGap: 2,
    });
}

// Footer line
doc
  .fontSize(9)
  .font("Helvetica")
  .fillColor(GRAY_300)
  .text("Prepared by Nexaguard Cyber Labs · Dubai, UAE", ML, PAGE_H - 130, {
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
    PAGE_H - 114,
    {
      width: TW,
      align: "center",
      lineBreak: false,
    }
  );

// ════════════════════════════════════════════════════════════════════════════
// PAGE 2 — HOW TO USE + SCORING GUIDE
// ════════════════════════════════════════════════════════════════════════════
addPage("How to Use");
sectionBand("ABOUT THIS DOCUMENT", "How to Use This Checklist");

bodyText(
  "This checklist is structured in five scored sections: Foundational Controls, Application & Data Security, " +
    "Governance & Compliance, Common Vulnerabilities, and ISO 27001 Readiness. Each section contains specific, " +
    "actionable items reviewed as Yes / No / In Progress."
);
bodyText(
  "Work through each section honestly with your IT lead or security advisor. Annotate 'In Progress' items " +
    "with a target date. Use your 'No' results directly to populate the 7-Day Action Plan on the final pages."
);
bodyText(
  "This checklist is designed for quarterly use. Your environment evolves, regulations update, and new threats " +
    "emerge — a one-time assessment is a snapshot; a quarterly cadence builds a programme."
);

calloutBox(
  "Any section where you score below 50% represents immediate, urgent risk. Prioritise those first — they are " +
    "the most likely vectors an attacker will exploit.",
  "warning"
);

doc.y += 6;
subHead("Scoring Guide");

// Scoring table
const scoringRows = [
  [
    "90–100%",
    "Strong foundation. Maintain cadence and address any remaining gaps.",
    GREEN,
  ],
  [
    "70–89%",
    "Good baseline. Prioritise your 'No' items before the next quarter.",
    CYAN,
  ],
  [
    "50–69%",
    "Material gaps exist. External review recommended within 30 days.",
    ORANGE,
  ],
  [
    "< 50%",
    "Urgent attention required. Consider an immediate security assessment.",
    RED,
  ],
];
for (const [score, label, color] of scoringRows) {
  checkSpace(22);
  const ry = doc.y;
  doc.rect(ML, ry, 70, 20).fill(DARK_CARD);
  doc.rect(ML + 70, ry, TW - 70, 20).fill(DARK_ROW);
  doc.rect(ML, ry, TW, 20).strokeColor(BORDER_C).lineWidth(0.5).stroke();
  doc
    .fontSize(8.5)
    .font("Helvetica-Bold")
    .fillColor(color)
    .text(score, ML + 6, ry + 5, {
      width: 60,
      align: "center",
      lineBreak: false,
    });
  doc
    .fontSize(8.5)
    .font("Helvetica")
    .fillColor(GRAY_100)
    .text(label, ML + 78, ry + 5, { width: TW - 88, lineBreak: false });
  doc.y = ry + 20;
}

doc.y += 8;
calloutBox(
  "TIP: For any item marked 'In Progress', set a specific target date in the margin next to the checkbox. " +
    "Unscheduled work rarely gets done. A date turns an intention into a commitment.",
  "tip"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 3 — UAE REGULATORY LANDSCAPE
// ════════════════════════════════════════════════════════════════════════════
addPage("Regulatory Landscape");
sectionBand("CONTEXT", "UAE Regulatory Landscape");

bodyText(
  "Understanding which regulators govern your business is the essential prerequisite to compliance. " +
    "The UAE operates a layered regulatory model: federal law, sector regulator, and free zone rules " +
    "may all apply simultaneously. Identify your in-scope frameworks before spending on controls."
);

doc.y += 4;

// Table header
checkSpace(22);
const thy = doc.y;
doc.rect(ML, thy, 105, 18).fill(CYAN);
doc.rect(ML + 105, thy, TW - 105, 18).fill(BLUE);
doc
  .fontSize(8)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("FRAMEWORK", ML + 8, thy + 4, { width: 90, lineBreak: false });
doc
  .fontSize(8)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("SCOPE  ·  STANDARD OR REQUIREMENT", ML + 113, thy + 4, {
    width: TW - 123,
    lineBreak: false,
  });
doc.y = thy + 18;

regulatorRow(
  "NESA / UAE IAS",
  "Critical national infrastructure, government entities and designated sectors",
  "Mandatory for in-scope entities · National Information Assurance Framework"
);
regulatorRow(
  "TDRA",
  "Licensed telecom & digital government entities; ICT suppliers",
  "TDRA Cybersecurity Regulations · Incident reporting obligations"
);
regulatorRow(
  "CBUAE",
  "Banks, finance companies, payment service providers, exchanges",
  "Annual VAPT mandatory · Incident reporting within 4 hours of detection"
);
regulatorRow(
  "DIFC",
  "All entities registered in the Dubai International Financial Centre",
  "DIFC Data Protection Law 2020 · DIFC Cybersecurity Risk Management Framework"
);
regulatorRow(
  "ADGM",
  "All entities registered in Abu Dhabi Global Market",
  "ADGM Data Protection Regulations 2021 · Cyber Risk Management Guidance"
);
regulatorRow(
  "DHA / DOH / ADHICS",
  "Healthcare providers and their technology suppliers in Abu Dhabi & Dubai",
  "ADHICS mandatory for Abu Dhabi healthcare · DHA policies for Dubai"
);
regulatorRow(
  "UAE PDPL",
  "Any organisation processing personal data of UAE residents",
  "Federal Decree-Law No. 45 of 2021 · Data subject rights · Breach notification"
);
regulatorRow(
  "ISO 27001:2022",
  "Typically required by enterprise clients, investors, or for international operations",
  "International standard · Often a pre-qualification requirement for contracts"
);

doc.y += 8;
calloutBox(
  "Regulatory mapping is not a one-time exercise. New regulations are introduced frequently in the UAE. " +
    "Assign one person as your compliance owner and schedule a quarterly review of your framework mapping.",
  "tip"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 4 — SECTION A: FOUNDATIONAL CONTROLS
// ════════════════════════════════════════════════════════════════════════════
addPage("Section A");
sectionBand("SECTION A", "Foundational Security Controls");

bodyText(
  "These controls form the minimum viable security baseline for any organisation. " +
    "If items here are marked 'No', address them before working through any other section. " +
    "Items marked CRITICAL represent the most commonly exploited gaps in UAE SME environments."
);

const sectionA = [
  [
    "Multi-factor authentication (MFA) enforced on all administrative accounts",
    "critical",
  ],
  ["MFA enforced on all remote access and VPN connections", "critical"],
  [
    "Privileged Access Management (PAM) approach defined — even if a manual process",
    "high",
  ],
  [
    "Centralised logging enabled: authentication events, admin actions, application errors",
    "high",
  ],
  [
    "Logs retained for minimum 6 months (12+ months for CBUAE / ADHICS sectors)",
    "high",
  ],
  [
    "Endpoint Detection & Response (EDR) or AV deployed on all corporate devices",
    "high",
  ],
  [
    "Mobile Device Management (MDM) deployed if BYOD or company mobiles are in use",
    null,
  ],
  [
    "Patch management SLA documented: critical CVEs ≤ 7 days, high severity ≤ 30 days",
    "high",
  ],
  [
    "Backup strategy defined: daily incremental, weekly full, off-site or cloud copy",
    "critical",
  ],
  ["Backup restoration tested successfully within the last 90 days", "high"],
  [
    "Email security: SPF, DKIM, and DMARC records correctly configured and enforced",
    "high",
  ],
  [
    "Anti-phishing controls deployed: email gateway filtering, simulation testing, awareness training",
    "high",
  ],
  [
    "Network segmentation between production, staging, office / corporate networks",
    "high",
  ],
  [
    "DNS security: internal DNS resolvers not exposed, DNSSEC evaluated for public zones",
    null,
  ],
  [
    "Wireless network security: WPA3 or WPA2-Enterprise, guest network isolated",
    null,
  ],
];

for (const [text, p] of sectionA) {
  checkItem(text, p);
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE 5 — SECTION B: APPLICATION & DATA SECURITY
// ════════════════════════════════════════════════════════════════════════════
addPage("Section B");
sectionBand("SECTION B", "Application & Data Security");

bodyText(
  "For any organisation running web applications, APIs, or customer-facing systems, these controls are essential. " +
    "Findings from Section B represent direct attack surface — vulnerabilities here are the most commonly exploited " +
    "in breach incidents we investigate across the UAE."
);

const sectionB = [
  ["Web applications scanned for vulnerabilities at minimum quarterly", "high"],
  [
    "Penetration testing conducted at least annually (more frequently for fintech / healthcare)",
    "high",
  ],
  [
    "Secure Software Development Lifecycle (SSDLC) practices formally adopted",
    "high",
  ],
  [
    "Source code repositories private, access-controlled, with branch protection enabled",
    "high",
  ],
  [
    "No hard-coded credentials or secrets in code repositories — secrets manager in use",
    "critical",
  ],
  [
    "API authentication strong: OAuth 2.0 / JWT with proper validation, short expiry, rate limiting",
    "high",
  ],
  [
    "Data classification policy defined: Public / Internal / Confidential / Restricted",
    null,
  ],
  ["Sensitive data encrypted at rest (AES-256 or equivalent)", "high"],
  [
    "All data in transit encrypted: TLS 1.2 minimum, TLS 1.3 preferred, older protocols disabled",
    "high",
  ],
  [
    "SSL/TLS certificates inventoried, monitored, and renewed before expiry (30-day alerts)",
    "high",
  ],
  [
    "Web Application Firewall (WAF) deployed for all public-facing applications",
    "high",
  ],
  [
    "DDoS protection in place: Cloudflare, AWS Shield, or equivalent service",
    null,
  ],
  [
    "OWASP Top 10 addressed as part of development and testing standards",
    "high",
  ],
  [
    "Third-party software components tracked in a Software Bill of Materials (SBOM)",
    null,
  ],
  [
    "Content Security Policy (CSP) and security headers configured on all web properties",
    null,
  ],
];

for (const [text, p] of sectionB) {
  checkItem(text, p);
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE 6 — SECTION C: GOVERNANCE, RISK & COMPLIANCE
// ════════════════════════════════════════════════════════════════════════════
addPage("Section C");
sectionBand("SECTION C", "Governance, Risk & Compliance");

bodyText(
  "Governance controls are frequently overlooked by technical teams who prioritise tools over process. " +
    "However, every UAE regulatory framework — NESA, CBUAE, DIFC, UAE PDPL — requires documented " +
    "governance foundations. An undocumented policy does not exist in the eyes of a regulator or auditor."
);

const sectionC = [
  [
    "Information Security Policy documented, formally approved, and reviewed annually",
    "high",
  ],
  [
    "Acceptable Use Policy in place and signed by all staff at onboarding",
    null,
  ],
  [
    "Risk register maintained, reviewed quarterly, with owners assigned to each risk",
    "high",
  ],
  [
    "Asset inventory maintained: hardware, software, data assets, third-party services",
    "high",
  ],
  ["Access control matrix documented: who has access to what, and why", "high"],
  [
    "Joiner / Mover / Leaver (JML) process formalised — access revoked within 24 hours of departure",
    "critical",
  ],
  [
    "Vendor and third-party risk assessment process in place before onboarding new suppliers",
    "high",
  ],
  [
    "Data Processing Agreements (DPAs) signed with all data processors under UAE PDPL",
    "high",
  ],
  [
    "Incident response plan documented, with roles assigned and contact list current",
    "high",
  ],
  [
    "Incident response plan tested via tabletop exercise in the last 12 months",
    "high",
  ],
  [
    "Business Continuity / Disaster Recovery (BCP/DR) plan documented and tested",
    "high",
  ],
  [
    "Cybersecurity awareness training completed by all staff in the last 12 months",
    "high",
  ],
  ["Regulatory mapping reviewed and updated when regulations change", null],
  [
    "Cyber insurance policy in place (or formally evaluated and decision documented)",
    null,
  ],
];

for (const [text, p] of sectionC) {
  checkItem(text, p);
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE 7 — SECTION D: COMMON UAE SME VULNERABILITIES
// ════════════════════════════════════════════════════════════════════════════
addPage("Section D");
sectionBand("SECTION D", "Common UAE SME Vulnerabilities");

bodyText(
  "The following issues appear repeatedly in our VAPT engagements across UAE SME environments. " +
    "Each represents a real, exploitable condition. This section functions differently from Sections A–C: " +
    "rather than controls to implement, these are vulnerability patterns to actively check for and eliminate."
);

const sectionD = [
  [
    "Outdated CMS installations — WordPress, Drupal, Joomla running unpatched plugins",
    "critical",
  ],
  [
    "Default or weak credentials on network equipment, IoT devices, and admin portals",
    "critical",
  ],
  [
    "Development or staging environments accessible from the public internet",
    "critical",
  ],
  [
    "Cloud storage misconfiguration — S3, Azure Blob, GCS buckets with unintended public read/write",
    "critical",
  ],
  [
    "Admin email accounts (especially CEO / founder inboxes) without MFA enforced",
    "critical",
  ],
  [
    "Outdated SSL/TLS configuration — TLS 1.0 / 1.1 still enabled, weak cipher suites",
    "high",
  ],
  [
    "DNS misconfiguration — missing or unenforced SPF, DKIM, DMARC enabling email spoofing",
    "high",
  ],
  [
    "VPN endpoints with single-factor authentication or outdated firmware",
    "high",
  ],
  [
    "Backup data stored on the same network as production — vulnerable to ransomware encryption",
    "high",
  ],
  [
    "No monitoring or alerting for unusual login patterns, bulk data access, or admin actions",
    "high",
  ],
  [
    "No documented process for handling personal data subject access requests (UAE PDPL obligation)",
    "high",
  ],
  [
    "Legacy applications running on end-of-life OS versions with no active vendor support",
    "high",
  ],
  [
    "API endpoints returning verbose error messages revealing stack traces or version information",
    null,
  ],
  [
    "Shared administrative credentials used across multiple staff members or systems",
    "critical",
  ],
];

for (const [text, p] of sectionD) {
  checkItem(text, p);
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE 8 — SECTION E: ISO 27001:2022 READINESS
// ════════════════════════════════════════════════════════════════════════════
addPage("Section E");
sectionBand("SECTION E", "ISO 27001:2022 Readiness Quick-View");

bodyText(
  "ISO 27001:2022 is increasingly required by UAE enterprise clients, public sector entities, " +
    "and international partners as a vendor pre-qualification requirement. Below are the 14 controls " +
    "most commonly missing in UAE SME gap assessments — your highest-priority items if certification is on your roadmap."
);

doc.y += 4;

// Table header
checkSpace(22);
const isothy = doc.y;
doc.rect(ML, isothy, 70, 18).fill(CYAN);
doc.rect(ML + 70, isothy, TW - 70, 18).fill(BLUE);
doc
  .fontSize(8)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("CONTROL", ML + 4, isothy + 4, {
    width: 62,
    align: "center",
    lineBreak: false,
  });
doc
  .fontSize(8)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("REQUIREMENT DESCRIPTION", ML + 78, isothy + 4, {
    width: TW - 88,
    lineBreak: false,
  });
doc.y = isothy + 18;

const isoControls = [
  [
    "A.5.1",
    "Information Security Policies — documented, formally approved, communicated to all staff",
  ],
  [
    "A.5.7",
    "Threat Intelligence — processes to receive, evaluate and act on threat intelligence",
  ],
  [
    "A.5.23",
    "Information Security for Cloud Services — cloud-specific security policy and controls",
  ],
  [
    "A.5.30",
    "ICT Readiness for Business Continuity — BCP and DR documented and tested",
  ],
  [
    "A.6.3",
    "Information Security Awareness, Education & Training — annual programme in place",
  ],
  [
    "A.7.4",
    "Physical Security Monitoring — physical access controls monitored and logged",
  ],
  [
    "A.8.7",
    "Protection Against Malware — endpoint protection deployed and current on all devices",
  ],
  [
    "A.8.8",
    "Management of Technical Vulnerabilities — patch management, scanning, pentest programme",
  ],
  [
    "A.8.12",
    "Data Leakage Prevention — controls to detect and prevent exfiltration of sensitive data",
  ],
  [
    "A.8.16",
    "Monitoring Activities — centralised logging, alerting, and review process in place",
  ],
  [
    "A.8.23",
    "Web Filtering — outbound web access controls to block malicious or inappropriate destinations",
  ],
  [
    "A.8.28",
    "Secure Coding — SSDLC practices, code review, and OWASP guidance formally adopted",
  ],
  [
    "A.8.29",
    "Security Testing in Development & Acceptance — security testing gate in release process",
  ],
  [
    "A.8.32",
    "Change Management — production changes documented, reviewed, and approved before deployment",
  ],
];
for (const [c, d] of isoControls) {
  isoRow(c, d);
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE 9 — 7-DAY ACTION PLAN
// ════════════════════════════════════════════════════════════════════════════
addPage("Action Plan");
sectionBand("SECTION F", "Your 7-Day Action Plan");

bodyText(
  "After completing this checklist, the following seven actions will generate the most meaningful progress " +
    "in the shortest time. These are not the only actions needed — but they are the highest-leverage starting point " +
    "based on the patterns we see most frequently across UAE SME assessments."
);

doc.y += 4;

const actionPlanRows = [
  [
    "DAY 1",
    "Inventory Assets",
    "List every internet-facing asset: websites, applications, APIs, admin portals. Use a spreadsheet — it does not need to be sophisticated. You cannot protect what you have not catalogued.",
  ],
  [
    "DAY 2",
    "Run Free Scans",
    "Run SSL Labs (ssllabs.com/ssltest) and Mozilla Observatory (observatory.mozilla.org) on every public asset. Both are free and immediately actionable. Document findings.",
  ],
  [
    "DAY 3",
    "Enforce MFA",
    "Identify every admin account that does not have MFA enabled. Enable it. No exceptions for any account with administrative access to production systems, email, or cloud infrastructure.",
  ],
  [
    "DAY 4",
    "Phishing Assessment",
    "Review last quarter's email security reports with your IT lead. If you have no reports, that itself is the finding — deploy email gateway logging as a priority.",
  ],
  [
    "DAY 5",
    "Test Backup",
    "Restore one file from backup as a live test. The test is not 'did the backup run' — it is 'can we actually recover data.' These are different questions.",
  ],
  [
    "DAY 6",
    "Complete This Checklist",
    "Work through Sections A–E with your IT lead. Score every item honestly. Mark every 'No' and 'In Progress' item for remediation planning.",
  ],
  [
    "DAY 7",
    "Prioritise Top 3 Risks",
    "From your 'No' items, identify the three highest-risk gaps. For each: decide who is responsible, what the fix is, and set a target completion date within 30 days.",
  ],
];
for (const [d, t, a] of actionPlanRows) {
  actionRow(d, t, a);
}

doc.y += 8;
calloutBox(
  "If Day 7 surfaces concerns that require external expertise — penetration testing, ISO 27001 gap analysis, " +
    "GRC support, or a security incident — Nexaguard Cyber Labs offers a free 30-minute risk review with no " +
    "commitment. Book at nexaguardcyberlabs.com.",
  "tip"
);

// ════════════════════════════════════════════════════════════════════════════
// PAGE 10 — WHEN TO GET EXTERNAL SUPPORT + ABOUT
// ════════════════════════════════════════════════════════════════════════════
addPage("About Nexaguard");
sectionBand("GUIDANCE", "When to Seek External Support");

bodyText(
  "This is practical guidance, not a sales pitch. Consider bringing in external cybersecurity support if any of the following apply:"
);

const externalTriggers = [
  "A regulator, enterprise client, or auditor has asked for a VAPT report or compliance evidence",
  "You are preparing for ISO 27001, PCI DSS, NESA, ADHICS, or CBUAE certification or audit",
  "You have experienced a security incident, near-miss, or noticed unusual system activity",
  "Your engineering team is scaling and security can no longer be managed alongside core product work",
  "An investor, acquirer, or board member has flagged cybersecurity risk in due diligence",
  "You are entering a regulated sector, new market, or onboarding enterprise clients with vendor requirements",
  "This checklist surfaced critical gaps that your internal team does not have capacity to address within 30 days",
];
for (const t of externalTriggers) {
  bulletItem(t);
}

doc.y += 10;
divider();

sectionBand("ABOUT", "Nexaguard Cyber Labs");

bodyText(
  "Nexaguard Cyber Labs is a Dubai-based cybersecurity consultancy serving UAE and GCC businesses. " +
    "Our focus: penetration testing and VAPT, ISO 27001 readiness and certification support, GRC advisory, " +
    "and managed security services for fintechs, SaaS companies, healthcare organisations, and growing mid-market businesses."
);
bodyText(
  "We exist to make enterprise-grade security accessible — not by cutting corners, but by removing the " +
    "account management layers, procurement overhead, and unnecessary complexity that makes enterprise consulting " +
    "prohibitive for organisations under 250 staff. Senior practitioners. Honest scoping. Reports that drive remediation."
);

doc.y += 6;
subHead("Get in Touch");

contactRow("Email", "info@nexaguardcyberlabs.com");
contactRow("Phone / WhatsApp", "+971 50 623 3538");
contactRow("Website", "nexaguardcyberlabs.com");
contactRow(
  "Office",
  "Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE"
);

doc.y += 8;
divider();

doc
  .fontSize(7.5)
  .font("Helvetica-Oblique")
  .fillColor(GRAY_300)
  .text(
    "This document is provided for informational purposes only and does not constitute legal, " +
      "regulatory, or compliance advice. Specific regulatory obligations vary by sector, entity type, " +
      "and circumstances. Consult qualified legal and cybersecurity advisors for your specific situation. " +
      "© 2026 Nexaguard Cyber Labs FZCO. All rights reserved.",
    ML,
    doc.y,
    { width: TW, lineGap: 2 }
  );

// ── FINALISE — add page numbers to buffered pages ─────────────────────────────
const range = doc.bufferedPageRange();
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(range.start + i);
  if (i > 0) {
    // cover already has no footer
    // Footer was drawn at page creation — no re-draw needed
  }
}

doc.end();

doc.on("finish", () => {
  console.log(`✅  Compliance Checklist generated: ${OUTPUT_PATH}`);
});
doc.on("error", (err) => {
  console.error("❌  PDF generation error:", err);
  process.exit(1);
});
