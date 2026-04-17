import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendDomain = process.env.RESEND_DOMAIN;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getAdminEmailHtml = ({
  name,
  email,
  phone,
  company,
  service,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}) => `
  <div style="margin:0;padding:0;background:#020305;color:#ffffff;font-family:Inter,Segoe UI,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:28px 18px;">
      <div style="background:#050a12;border:1px solid rgba(34,211,238,.28);border-radius:18px;overflow:hidden;box-shadow:0 0 0 1px rgba(31,136,191,.12) inset;">
        <div style="height:4px;background:linear-gradient(95.96deg,#18A7B7 20.55%,#1F88BF 64.75%);"></div>
        <div style="padding:28px;">
          <span style="display:inline-block;border:1px solid rgba(34,211,238,.35);color:#7ee7f7;background:rgba(34,211,238,.08);border-radius:999px;padding:5px 12px;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Contact Intake</span>
          <h1 style="margin:14px 0 8px 0;font-size:26px;line-height:1.2;color:#ffffff;font-weight:700;">New Contact Form Submission</h1>
          <p style="margin:0 0 20px 0;font-size:14px;color:#94a3b8;">NexaGuard website lead notification</p>
          <div style="border-top:1px solid rgba(34,211,238,.12);margin-bottom:16px;"></div>

          <div style="margin-bottom:12px;padding:12px 14px;background:#062735;border:1px solid rgba(34,211,238,.14);border-radius:10px;">
            <p style="margin:0 0 6px 0;color:#5eead4;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Name</p>
            <p style="margin:0;color:#e2e8f0;font-size:15px;">${escapeHtml(name)}</p>
          </div>
          <div style="margin-bottom:12px;padding:12px 14px;background:#062735;border:1px solid rgba(34,211,238,.14);border-radius:10px;">
            <p style="margin:0 0 6px 0;color:#5eead4;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Email</p>
            <p style="margin:0;color:#e2e8f0;font-size:15px;">${escapeHtml(email)}</p>
          </div>
          <div style="margin-bottom:12px;padding:12px 14px;background:#062735;border:1px solid rgba(34,211,238,.14);border-radius:10px;">
            <p style="margin:0 0 6px 0;color:#5eead4;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Phone</p>
            <p style="margin:0;color:#e2e8f0;font-size:15px;">${escapeHtml(phone || "Not provided")}</p>
          </div>
          <div style="margin-bottom:12px;padding:12px 14px;background:#062735;border:1px solid rgba(34,211,238,.14);border-radius:10px;">
            <p style="margin:0 0 6px 0;color:#5eead4;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Company</p>
            <p style="margin:0;color:#e2e8f0;font-size:15px;">${escapeHtml(company || "Not provided")}</p>
          </div>
          <div style="margin-bottom:12px;padding:12px 14px;background:#062735;border:1px solid rgba(34,211,238,.14);border-radius:10px;">
            <p style="margin:0 0 6px 0;color:#5eead4;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Service</p>
            <p style="margin:0;color:#e2e8f0;font-size:15px;">${escapeHtml(service || "Not specified")}</p>
          </div>
          <div style="margin-bottom:0;padding:12px 14px;background:#062735;border:1px solid rgba(34,211,238,.14);border-radius:10px;">
            <p style="margin:0 0 6px 0;color:#5eead4;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Message</p>
            <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </div>
      </div>
      <p style="margin:14px 0 0 0;text-align:center;color:#64748b;font-size:12px;">© 2026 NexaGuard Cyberlabs. All rights reserved.</p>
    </div>
  </div>
`;

const getUserConfirmationEmailHtml = (name: string) => `
  <div style="margin:0;padding:0;background:#020305;color:#ffffff;font-family:Inter,Segoe UI,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:28px 18px;">
      <div style="background:#050a12;border:1px solid rgba(34,211,238,.28);border-radius:18px;overflow:hidden;box-shadow:0 0 0 1px rgba(31,136,191,.12) inset;">
        <div style="height:4px;background:linear-gradient(95.96deg,#18A7B7 20.55%,#1F88BF 64.75%);"></div>
        <div style="padding:28px;">
          <span style="display:inline-block;border:1px solid rgba(34,211,238,.35);color:#7ee7f7;background:rgba(34,211,238,.08);border-radius:999px;padding:5px 12px;font-size:11px;letter-spacing:.6px;text-transform:uppercase;">Message Received</span>
          <h1 style="margin:14px 0 10px 0;font-size:26px;line-height:1.2;color:#ffffff;font-weight:700;">Thank you for contacting NexaGuard</h1>
          <p style="margin:0 0 14px 0;font-size:15px;color:#cbd5e1;line-height:1.7;">Hi ${escapeHtml(name)},</p>
          <p style="margin:0 0 14px 0;font-size:15px;color:#cbd5e1;line-height:1.7;">Your message is with our security team now. We’ll review your request and respond shortly.</p>
          <p style="margin:0 0 20px 0;font-size:15px;color:#cbd5e1;line-height:1.7;">For urgent queries, contact us at <a href="tel:+971506233538" style="color:#22d3ee;text-decoration:none;">+971 50 6233538</a> or <a href="mailto:info@Nexaguardcyberlabs.com" style="color:#22d3ee;text-decoration:none;">info@Nexaguardcyberlabs.com</a>.</p>
          <a href="https://Nexaguardcyberlabs.com" style="display:inline-block;background:linear-gradient(95.96deg,#18A7B7 20.55%,#1F88BF 64.75%);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.25);">Visit Website</a>
        </div>
      </div>
      <p style="margin:14px 0 0 0;text-align:center;color:#64748b;font-size:12px;">© 2026 NexaGuard Cyberlabs. All rights reserved.</p>
    </div>
  </div>
`;

export async function POST(request: NextRequest) {
  try {
    if (!(process.env.RESEND_API_KEY && resendDomain)) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    if (!(name && email && message)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const adminEmail = await resend.emails.send({
      from: `Contact Form <no-reply@${resendDomain}>`,
      to: ["info@nexaguardcyberlabs.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: getAdminEmailHtml({
        name,
        email,
        phone,
        company,
        service,
        message,
      }),
    });

    if (adminEmail.error) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "NexaGuard <onboarding@resend.dev>",
      to: email,
      subject: "We received your message",
      html: getUserConfirmationEmailHtml(name),
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
