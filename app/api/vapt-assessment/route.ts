import { promises as fs } from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const escapeHtml = (v: string) =>
  String(v)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

async function appendToJsonLog(filePath: string, entry: object) {
  try {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    let existing: object[] = [];
    try {
      const raw = await fs.readFile(filePath, "utf8");
      existing = JSON.parse(raw);
    } catch {
      // file doesn't exist yet
    }
    existing.push(entry);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
  } catch (err) {
    // Silently fail on read-only filesystem (Vercel production)
    console.warn("[vapt-assessment] Could not write submission log:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      score,
      category,
      recommendations = [],
      newsletter = false,
      answers = [],
    } = body;

    if (!(name && email && company)) {
      return NextResponse.json(
        { error: "Name, email, and company are required." },
        { status: 400 }
      );
    }

    const submission = {
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      score,
      category,
      recommendations,
      newsletter,
      answers,
    };

    // Log submission — non-fatal, silently fails on Vercel read-only FS
    await appendToJsonLog(
      path.join(process.cwd(), "data", "vapt-assessment-submissions.json"),
      submission
    );
    if (newsletter) {
      await appendToJsonLog(
        path.join(process.cwd(), "data", "newsletter-subscribers.json"),
        {
          timestamp: submission.timestamp,
          name,
          email,
          company,
          source: "vapt-assessment",
        }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const resendDomain = process.env.RESEND_DOMAIN;

    if (!resendKey || !resendDomain) {
      console.warn(
        "[vapt-assessment] RESEND_API_KEY or RESEND_DOMAIN not set — submission logged but no email sent."
      );
      return NextResponse.json(
        { success: true, score, category, recommendations },
        { status: 200 }
      );
    }

    const resend = new Resend(resendKey);
    const calendlyUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      "https://calendly.com/nexaguard-placeholder";

    const scoreColor =
      score <= 25
        ? "#f87171"
        : score <= 50
          ? "#fb923c"
          : score <= 75
            ? "#facc15"
            : "#4ade80";

    const userHtml = `
      <div style="margin:0;padding:0;background:#020305;color:#fff;font-family:Inter,Segoe UI,Arial,sans-serif;">
        <div style="max-width:640px;margin:0 auto;padding:28px 18px;">
          <div style="background:#050a12;border:1px solid rgba(34,211,238,.28);border-radius:18px;overflow:hidden;">
            <div style="height:4px;background:linear-gradient(95.96deg,#18A7B7 20.55%,#1F88BF 64.75%);"></div>
            <div style="padding:28px;">
              <span style="display:inline-block;border:1px solid rgba(34,211,238,.35);color:#7ee7f7;background:rgba(34,211,238,.08);border-radius:999px;padding:5px 12px;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Your VAPT Readiness Report</span>
              <h1 style="margin:14px 0 8px;font-size:22px;font-weight:700;">Hi ${escapeHtml(name.split(" ")[0])}, here's your score.</h1>
              <div style="text-align:center;margin:20px 0;padding:20px;background:#062735;border-radius:12px;">
                <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:.8px;">VAPT Readiness Score</p>
                <p style="margin:0;font-size:56px;font-weight:700;color:${scoreColor};">${score}<span style="font-size:24px;color:#64748b;">/100</span></p>
                <p style="margin:4px 0 0;font-size:14px;color:${scoreColor};font-weight:600;">${escapeHtml(category)}</p>
              </div>
              ${
                recommendations.length > 0
                  ? `<h2 style="margin:20px 0 10px;font-size:16px;font-weight:600;">Your Top 3 Recommendations</h2>
                     <ol style="margin:0;padding-left:18px;color:#94a3b8;font-size:14px;line-height:1.8;">
                       ${recommendations.map((r: string) => `<li style="margin-bottom:10px;">${escapeHtml(r)}</li>`).join("")}
                     </ol>`
                  : ""
              }
              <p style="margin:20px 0 12px;font-size:15px;color:#cbd5e1;line-height:1.7;">These recommendations are based on the 3 lowest-scoring areas in your assessment. Addressing them will significantly improve your VAPT readiness and overall security posture.</p>
              <p style="margin:0 0 12px;font-size:15px;color:#cbd5e1;line-height:1.7;">Want to discuss your results in detail? Book a free 30-minute risk review:</p>
              <a href="${calendlyUrl}" style="display:inline-block;background:linear-gradient(95.96deg,#18A7B7 20.55%,#1F88BF 64.75%);color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.25);">Book Free Audit →</a>
              <p style="margin:4px 0 0;font-size:13px;color:#64748b;">Or just reply to this email — we read every reply.</p>
              <p style="margin:20px 0 0;font-size:13px;color:#64748b;">Stay secure,<br/><strong style="color:#94a3b8;">The Nexaguard Cyber Labs team</strong><br/>nexaguardcyberlabs.com</p>
            </div>
          </div>
          <p style="margin:14px 0 0;text-align:center;color:#64748b;font-size:12px;">© 2026 Nexaguard Cyberlabs FZCO. All rights reserved.</p>
        </div>
      </div>
    `;

    const adminHtml = `
      <div style="margin:0;padding:0;background:#020305;color:#fff;font-family:Inter,Segoe UI,Arial,sans-serif;">
        <div style="max-width:640px;margin:0 auto;padding:28px 18px;">
          <div style="background:#050a12;border:1px solid rgba(34,211,238,.28);border-radius:18px;overflow:hidden;">
            <div style="height:4px;background:linear-gradient(95.96deg,#18A7B7 20.55%,#1F88BF 64.75%);"></div>
            <div style="padding:28px;">
              <h1 style="margin:0 0 12px;font-size:20px;font-weight:700;">New VAPT Assessment — ${escapeHtml(company)}</h1>
              <p style="margin:0 0 16px;color:#94a3b8;font-size:14px;">Score: ${score}/100 · ${escapeHtml(category)}</p>
              <pre style="background:#062735;padding:16px;border-radius:10px;font-size:13px;color:#e2e8f0;white-space:pre-wrap;overflow-wrap:break-word;">${JSON.stringify(submission, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: `Nexaguard Cyber Labs <no-reply@${resendDomain}>`,
      to: email,
      subject: `Your VAPT Readiness Score: ${score}/100 — ${category}`,
      html: userHtml,
    });

    await resend.emails.send({
      from: `VAPT Assessment <no-reply@${resendDomain}>`,
      to: ["info@nexaguardcyberlabs.com"],
      subject: `New VAPT Assessment — ${company} (${score}/100 · ${category})`,
      html: adminHtml,
    });

    return NextResponse.json(
      { success: true, score, category, recommendations },
      { status: 200 }
    );
  } catch (error) {
    console.error("[vapt-assessment] Unhandled error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
