import { promises as fs } from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RESOURCE_LABELS: Record<string, string> = {
  "compliance-checklist": "UAE SME Cybersecurity Compliance Checklist 2026",
  "web-app-security-guide": "Web Application Security Hardening Guide",
};

const RESOURCE_FILES: Record<string, string> = {
  "compliance-checklist":
    "public/downloads/uae-sme-cybersecurity-compliance-checklist-2026.pdf",
  "web-app-security-guide":
    "public/downloads/web-application-security-hardening-guide.pdf",
};

const RESOURCE_FILENAMES: Record<string, string> = {
  "compliance-checklist": "UAE-SME-Cybersecurity-Compliance-Checklist-2026.pdf",
  "web-app-security-guide": "Web-Application-Security-Hardening-Guide.pdf",
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

async function appendToJsonLog(filePath: string, entry: object) {
  try {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    let existing: object[] = [];
    try {
      const raw = await fs.readFile(filePath, "utf8");
      existing = JSON.parse(raw);
    } catch {
      // file doesn't exist yet — start fresh
    }
    existing.push(entry);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
  } catch (err) {
    // Silently fail on read-only filesystem (Vercel production)
    console.warn("[lead-magnet] Could not write submission log:", err);
  }
}

const getAdminLeadHtml = ({
  name,
  email,
  company,
  jobTitle,
  country,
  newsletter,
  resource_id,
}: {
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  country: string;
  newsletter: boolean;
  resource_id: string;
}) => `
  <div style="margin:0;padding:0;background:#020305;color:#ffffff;font-family:Inter,Segoe UI,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:28px 18px;">
      <div style="background:#050a12;border:1px solid rgba(34,211,238,.28);border-radius:18px;overflow:hidden;">
        <div style="height:4px;background:linear-gradient(95.96deg,#18A7B7 20.55%,#1F88BF 64.75%);"></div>
        <div style="padding:28px;">
          <span style="display:inline-block;border:1px solid rgba(34,211,238,.35);color:#7ee7f7;background:rgba(34,211,238,.08);border-radius:999px;padding:5px 12px;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">New Lead Magnet Download</span>
          <h1 style="margin:14px 0 8px 0;font-size:22px;color:#ffffff;font-weight:700;">New Download — ${escapeHtml(company)}</h1>
          <p style="margin:0 0 16px 0;color:#64748b;font-size:13px;">Resource: ${escapeHtml(RESOURCE_LABELS[resource_id] || resource_id)}</p>
          <div style="margin-top:16px;">
            ${[
              ["Name", name],
              ["Email", email],
              ["Company", company],
              ["Job Title", jobTitle],
              ["Country", country],
              ["Newsletter Opt-in", newsletter ? "Yes" : "No"],
            ]
              .map(
                ([label, val]) => `
              <div style="margin-bottom:10px;padding:10px 14px;background:#062735;border-radius:10px;">
                <p style="margin:0 0 4px 0;color:#5eead4;font-size:11px;text-transform:uppercase;">${label}</p>
                <p style="margin:0;color:#e2e8f0;">${escapeHtml(String(val))}</p>
              </div>`
              )
              .join("")}
            <div style="padding:10px 14px;background:#062735;border-radius:10px;">
              <p style="margin:0 0 4px 0;color:#5eead4;font-size:11px;text-transform:uppercase;">Submitted at</p>
              <p style="margin:0;color:#e2e8f0;">${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} UAE</p>
            </div>
          </div>
        </div>
      </div>
      <p style="margin:14px 0 0 0;text-align:center;color:#64748b;font-size:12px;">© 2026 Nexaguard Cyberlabs FZCO. All rights reserved.</p>
    </div>
  </div>
`;

const getUserLeadHtml = (name: string, resourceId: string) => {
  const label = RESOURCE_LABELS[resourceId] || "Cybersecurity Resource";
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/nexaguard-placeholder";

  return `
  <div style="margin:0;padding:0;background:#020305;color:#ffffff;font-family:Inter,Segoe UI,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:28px 18px;">
      <div style="background:#050a12;border:1px solid rgba(34,211,238,.28);border-radius:18px;overflow:hidden;">
        <div style="height:4px;background:linear-gradient(95.96deg,#18A7B7 20.55%,#1F88BF 64.75%);"></div>
        <div style="padding:28px;">
          <span style="display:inline-block;border:1px solid rgba(34,211,238,.35);color:#7ee7f7;background:rgba(34,211,238,.08);border-radius:999px;padding:5px 12px;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Your Free Download</span>
          <h1 style="margin:14px 0 10px 0;font-size:22px;color:#ffffff;font-weight:700;">${escapeHtml(label)}</h1>
          <p style="margin:0 0 14px 0;font-size:15px;color:#cbd5e1;line-height:1.7;">Hi ${escapeHtml(name.split(" ")[0])},</p>
          <p style="margin:0 0 14px 0;font-size:15px;color:#cbd5e1;line-height:1.7;">Thanks for downloading the ${escapeHtml(label)}. The PDF is attached to this email.</p>
          <p style="margin:0 0 6px 0;font-size:14px;color:#94a3b8;">A few suggestions for getting the most out of it:</p>
          <ul style="margin:0 0 20px 0;padding-left:18px;color:#94a3b8;font-size:14px;line-height:1.8;">
            <li>Walk through Section A (Foundational Controls) with your IT lead this week.</li>
            <li>Use the Action Plan section to drive immediate progress.</li>
            <li>If anything in the Application &amp; Data Security section raises questions, that's usually where we start a conversation.</li>
          </ul>
          <p style="margin:0 0 16px 0;font-size:15px;color:#cbd5e1;line-height:1.7;">If you'd like to discuss any of it, our team offers a free 30-minute risk review:</p>
          <a href="${calendlyUrl}" style="display:inline-block;background:linear-gradient(95.96deg,#18A7B7 20.55%,#1F88BF 64.75%);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.25);">Book a Free Audit →</a>
          <p style="margin:20px 0 0 0;font-size:13px;color:#64748b;">Stay secure,<br/><strong style="color:#94a3b8;">The Nexaguard Cyber Labs team</strong><br/>nexaguardcyberlabs.com</p>
        </div>
      </div>
      <p style="margin:14px 0 0 0;text-align:center;color:#64748b;font-size:12px;">© 2026 Nexaguard Cyberlabs FZCO. All rights reserved.</p>
    </div>
  </div>
`;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      jobTitle,
      country = "UAE",
      newsletter = false,
      resource_id = "compliance-checklist",
    } = body;

    if (!(name && email && company && jobTitle)) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const submission = {
      timestamp: new Date().toISOString(),
      resource_id,
      name,
      email,
      company,
      jobTitle,
      country,
      newsletter,
    };

    // Log submission — non-fatal, silently fails on Vercel read-only FS
    await appendToJsonLog(
      path.join(process.cwd(), "data", "lead-magnet-submissions.json"),
      submission
    );
    if (newsletter) {
      await appendToJsonLog(
        path.join(process.cwd(), "data", "newsletter-subscribers.json"),
        { timestamp: submission.timestamp, name, email, company, source: resource_id }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const resendDomain = process.env.RESEND_DOMAIN;

    if (!resendKey || !resendDomain) {
      console.warn(
        "[lead-magnet] RESEND_API_KEY or RESEND_DOMAIN not set — submission logged but no email sent."
      );
      // Return success so user flow completes (thank-you redirect works)
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const resend = new Resend(resendKey);

    // Verify PDF exists
    const pdfFile = RESOURCE_FILES[resource_id];
    const pdfFilename = RESOURCE_FILENAMES[resource_id];

    let attachments: { filename: string; path: string }[] = [];
    if (pdfFile && pdfFilename) {
      const pdfPath = path.join(process.cwd(), pdfFile);
      try {
        await fs.access(pdfPath);
        attachments = [{ filename: pdfFilename, path: pdfPath }];
      } catch {
        console.error(`[lead-magnet] PDF not found at ${pdfPath}`);
      }
    }

    // Send admin notification
    const adminResult = await resend.emails.send({
      from: `Lead Magnet <no-reply@${resendDomain}>`,
      to: ["info@nexaguardcyberlabs.com"],
      subject: `New Lead Magnet Download — ${company}`,
      html: getAdminLeadHtml({ name, email, company, jobTitle, country, newsletter, resource_id }),
    });

    if (adminResult.error) {
      console.error("[lead-magnet] Admin email error:", adminResult.error);
    }

    // Send user email with PDF attached
    const userResult = await resend.emails.send({
      from: `Nexaguard Cyber Labs <no-reply@${resendDomain}>`,
      to: email,
      subject: `Your ${RESOURCE_LABELS[resource_id] || "Cybersecurity Resource"}`,
      html: getUserLeadHtml(name, resource_id),
      attachments,
    });

    if (userResult.error) {
      console.error("[lead-magnet] User email error:", userResult.error);
      return NextResponse.json(
        { error: "Something went wrong sending your email. Please try again or contact info@nexaguardcyberlabs.com directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[lead-magnet] Unhandled error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact info@nexaguardcyberlabs.com directly." },
      { status: 500 }
    );
  }
}
