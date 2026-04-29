import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Nexaguard Cyber Labs",
  description:
    "Nexaguard Cyber Labs Privacy Policy. UAE PDPL-aligned data protection practices. Effective May 1, 2026.",
};

const SECTIONS = [
  { id: "who-we-are", label: "1. Who We Are" },
  { id: "information-we-collect", label: "2. Information We Collect" },
  { id: "how-we-use", label: "3. How We Use Your Information" },
  { id: "lawful-basis", label: "4. Lawful Basis for Processing" },
  { id: "how-we-share", label: "5. How We Share Your Information" },
  { id: "international-transfers", label: "6. International Data Transfers" },
  { id: "how-we-protect", label: "7. How We Protect Your Information" },
  { id: "data-retention", label: "8. Data Retention" },
  { id: "your-rights", label: "9. Your Rights Under UAE PDPL" },
  { id: "childrens-privacy", label: "10. Children's Privacy" },
  { id: "third-party-links", label: "11. Third-Party Links" },
  { id: "changes", label: "12. Changes to This Policy" },
  { id: "contact", label: "13. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#010C13] pt-28 sm:pt-32 pb-20">
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="lg:flex lg:gap-16">

          {/* Sticky Table of Contents — desktop only */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <div className="sticky top-28">
              <p className="mb-4 font-semibold text-cyan-400 text-xs uppercase tracking-[0.2em]">
                Contents
              </p>
              <nav className="flex flex-col gap-1">
                {SECTIONS.map((s) => (
                  <a
                    className="rounded-lg px-3 py-1.5 text-gray-400 text-sm transition hover:bg-white/5 hover:text-white"
                    href={`#${s.id}`}
                    key={s.id}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article className="min-w-0 flex-1">
            <h1 className="mb-3 font-bold text-3xl text-white sm:text-4xl">Privacy Policy</h1>
            <div className="mb-8 space-y-1 text-gray-500 text-sm">
              <p><span className="text-gray-400">Effective Date:</span> May 1, 2026</p>
              <p><span className="text-gray-400">Last Updated:</span> May 1, 2026</p>
            </div>

            <div className="prose-invert space-y-2 text-gray-300 text-base leading-relaxed">
              <p>
                Nexaguard Cyberlabs FZCO (&ldquo;Nexaguard,&rdquo; &ldquo;we,&rdquo;
                &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed
                to protecting the personal data we collect from you. This Privacy Policy explains
                how we collect, use, store, and protect your information when you visit our
                website, engage our services, or interact with us through any of our communication
                channels.
              </p>
              <p>
                This Privacy Policy is designed to be consistent with the{" "}
                <strong className="text-white">
                  UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL)
                </strong>{" "}
                and applicable data protection principles in the Emirate of Dubai.
              </p>
              <p>
                By using our website or services, you acknowledge that you have read and
                understood this Privacy Policy.
              </p>
            </div>

            <hr className="my-10 border-white/10" />

            {/* ===== SECTION 1 ===== */}
            <section className="mb-12" id="who-we-are">
              <h2 className="mb-5 font-bold text-2xl text-white">1. Who We Are</h2>
              <div className="space-y-4 text-gray-300 text-base leading-relaxed">
                <p>
                  Nexaguard Cyberlabs FZCO is a cybersecurity consultancy registered in the IFZA
                  Freezone, Dubai, United Arab Emirates. We provide penetration testing,
                  compliance advisory, governance, risk and compliance (GRC) services, and managed
                  security services to businesses across the UAE and the wider GCC region.
                </p>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="mb-1 font-semibold text-white text-sm">Registered Office</p>
                  <p className="text-gray-400 text-sm">
                    Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE
                  </p>
                  <p className="mt-3 font-semibold text-white text-sm">Contact for Privacy Matters</p>
                  <a
                    className="text-cyan-400 text-sm hover:text-cyan-300"
                    href="mailto:info@nexaguardcyberlabs.com"
                  >
                    info@nexaguardcyberlabs.com
                  </a>
                </div>
              </div>
            </section>

            {/* ===== SECTION 2 ===== */}
            <section className="mb-12" id="information-we-collect">
              <h2 className="mb-5 font-bold text-2xl text-white">2. Information We Collect</h2>
              <div className="space-y-5 text-gray-300 text-base leading-relaxed">
                <p>
                  We collect personal information that you voluntarily provide to us, as well as
                  certain technical information that is automatically collected when you interact
                  with our website.
                </p>
                <div>
                  <h3 className="mb-3 font-semibold text-lg text-white">2.1 Information You Provide Directly</h3>
                  <ul className="ml-5 list-disc space-y-2 text-gray-300 text-sm">
                    <li>
                      <strong className="text-gray-100">Contact information:</strong> Your name,
                      email address, phone number, job title, and the company you represent —
                      provided when you submit a contact form, request a consultation, download a
                      resource, or engage with our services.
                    </li>
                    <li>
                      <strong className="text-gray-100">Communications:</strong> The content of
                      messages you send to us via email, contact forms, WhatsApp, or other
                      channels.
                    </li>
                    <li>
                      <strong className="text-gray-100">Engagement information:</strong> If you
                      engage Nexaguard for services, we may collect additional business and
                      technical information necessary for the engagement, such as scope details,
                      contact persons within your organisation, and information about systems being
                      assessed (only as required for the engagement and under appropriate
                      confidentiality terms).
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold text-lg text-white">2.2 Information Collected Automatically</h3>
                  <p className="mb-3 text-sm">
                    When you visit our website, certain technical information is automatically
                    collected, including:
                  </p>
                  <ul className="ml-5 list-disc space-y-1 text-gray-300 text-sm">
                    <li>IP address (anonymised where possible)</li>
                    <li>Browser type and version</li>
                    <li>Device type and operating system</li>
                    <li>Pages visited and time spent on each page</li>
                    <li>Referring URL</li>
                    <li>Approximate location based on IP (country/city level)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 font-semibold text-lg text-white">2.3 Use of Cookies and Similar Technologies</h3>
                  <p className="mb-3 text-sm">
                    We may use cookies and similar tracking technologies to enhance your experience
                    on our website. We may use:
                  </p>
                  <ul className="ml-5 list-disc space-y-1 text-gray-300 text-sm">
                    <li><strong className="text-gray-100">Strictly necessary cookies</strong> — required for the website to function correctly</li>
                    <li><strong className="text-gray-100">Analytics cookies</strong> — to understand how visitors use the site (where deployed)</li>
                    <li><strong className="text-gray-100">Functionality cookies</strong> — to remember preferences</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    You can control cookies through your browser settings. Disabling certain
                    cookies may affect website functionality.
                  </p>
                </div>
              </div>
            </section>

            {/* ===== SECTION 3 ===== */}
            <section className="mb-12" id="how-we-use">
              <h2 className="mb-5 font-bold text-2xl text-white">3. How We Use Your Information</h2>
              <p className="mb-4 text-gray-300 text-base leading-relaxed">
                We use the personal information we collect for the following lawful purposes:
              </p>
              <ul className="ml-5 list-disc space-y-3 text-gray-300 text-sm leading-relaxed">
                <li>To respond to your enquiries and provide the information, services, or resources you request</li>
                <li>To deliver requested resources such as PDF downloads, assessments, and consultation bookings</li>
                <li>To communicate with you about your engagement, including sending invoices, reports, and operational updates</li>
                <li>To send you information you have specifically opted in to receive, such as our newsletter (only where you have explicitly checked the relevant opt-in box)</li>
                <li>To improve our website and services by understanding how visitors interact with our content</li>
                <li>To comply with legal obligations, including financial record-keeping, regulatory reporting, and responses to lawful requests from regulators or law enforcement</li>
                <li>To protect our legitimate business interests, including security monitoring, fraud prevention, and the establishment, exercise, or defence of legal claims</li>
              </ul>
              <p className="mt-5 text-gray-300 text-sm">
                We do not use your personal data for automated decision-making or profiling that
                produces legal or similarly significant effects.
              </p>
            </section>

            {/* ===== SECTION 4 ===== */}
            <section className="mb-12" id="lawful-basis">
              <h2 className="mb-5 font-bold text-2xl text-white">4. Lawful Basis for Processing</h2>
              <p className="mb-4 text-gray-300 text-base leading-relaxed">
                Under the UAE PDPL, we process your personal data on the basis of:
              </p>
              <ul className="ml-5 list-disc space-y-3 text-gray-300 text-sm leading-relaxed">
                <li><strong className="text-gray-100">Your consent</strong> — when you submit a form, opt into our newsletter, or download a resource</li>
                <li><strong className="text-gray-100">Performance of a contract</strong> — when you engage us for services, processing is necessary to deliver those services</li>
                <li><strong className="text-gray-100">Compliance with legal obligations</strong> — where applicable laws or regulations require us to process data</li>
                <li><strong className="text-gray-100">Legitimate interests</strong> — where processing is necessary for our legitimate business interests, balanced against your rights and interests</li>
              </ul>
              <p className="mt-5 text-gray-300 text-sm">
                You may withdraw consent at any time by contacting us at{" "}
                <a className="text-cyan-400 hover:text-cyan-300" href="mailto:info@nexaguardcyberlabs.com">
                  info@nexaguardcyberlabs.com
                </a>.
              </p>
            </section>

            {/* ===== SECTION 5 ===== */}
            <section className="mb-12" id="how-we-share">
              <h2 className="mb-5 font-bold text-2xl text-white">5. How We Share Your Information</h2>
              <p className="mb-4 text-gray-300 text-base leading-relaxed">
                We do not sell, rent, or trade your personal data to third parties for marketing
                purposes. We may share your information only in the following limited circumstances:
              </p>
              <ul className="ml-5 list-disc space-y-3 text-gray-300 text-sm leading-relaxed">
                <li><strong className="text-gray-100">Service providers:</strong> We work with carefully selected third-party service providers who help us operate our business — for example, email delivery providers (such as Resend), website hosting providers (such as Vercel), and analytics platforms. These providers are bound by confidentiality and data protection obligations.</li>
                <li><strong className="text-gray-100">Legal requirements:</strong> We may disclose information if required to do so by law, regulation, or valid legal process, or to protect the rights, property, or safety of Nexaguard, our clients, or others.</li>
                <li><strong className="text-gray-100">Business transfers:</strong> In the event of a merger, acquisition, or sale of all or part of our business, personal data may be transferred as part of that transaction. We will notify affected users where required.</li>
                <li><strong className="text-gray-100">Engagement-specific data:</strong> Information shared with us during a client engagement may be processed by our authorised technical team strictly for the purposes of delivering the engaged services, under signed confidentiality terms.</li>
              </ul>
            </section>

            {/* ===== SECTION 6 ===== */}
            <section className="mb-12" id="international-transfers">
              <h2 className="mb-5 font-bold text-2xl text-white">6. International Data Transfers</h2>
              <p className="mb-4 text-gray-300 text-base leading-relaxed">
                Some of our service providers may be located outside the UAE. Where personal data
                is transferred internationally, we ensure that appropriate safeguards are in place,
                including:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-gray-300 text-sm">
                <li>Selection of providers in jurisdictions with adequate data protection standards</li>
                <li>Contractual data protection commitments</li>
                <li>Compliance with applicable UAE PDPL requirements regarding cross-border data transfer</li>
              </ul>
            </section>

            {/* ===== SECTION 7 ===== */}
            <section className="mb-12" id="how-we-protect">
              <h2 className="mb-5 font-bold text-2xl text-white">7. How We Protect Your Information</h2>
              <p className="mb-4 text-gray-300 text-base leading-relaxed">
                As a cybersecurity firm, data protection is fundamental to our practice. We
                implement technical, administrative, and physical safeguards designed to protect
                personal data, including:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-gray-300 text-sm">
                <li>Encryption of data in transit (TLS 1.2 minimum)</li>
                <li>Encryption of sensitive data at rest where applicable</li>
                <li>Access controls limiting personal data access to authorised personnel</li>
                <li>Regular security reviews of our infrastructure and providers</li>
                <li>Confidentiality and data protection training for all team members</li>
                <li>Incident response procedures in the event of any suspected data breach</li>
              </ul>
              <p className="mt-4 text-gray-300 text-sm">
                While we apply strong protections, no method of transmission or storage is fully
                secure. We continually review and improve our security practices.
              </p>
            </section>

            {/* ===== SECTION 8 ===== */}
            <section className="mb-12" id="data-retention">
              <h2 className="mb-5 font-bold text-2xl text-white">8. Data Retention</h2>
              <p className="mb-4 text-gray-300 text-base leading-relaxed">
                We retain personal information only for as long as necessary to fulfil the purposes
                for which it was collected, or as required by applicable law. Indicative retention
                periods:
              </p>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ["Contact form submissions and general enquiries", "Up to 24 months from last interaction"],
                      ["Lead magnet downloads and resource sign-ups", "Up to 36 months, or until you unsubscribe"],
                      ["Newsletter subscriber lists", "Until you unsubscribe"],
                      ["Client engagement records", "As required by applicable financial, tax, and regulatory recordkeeping obligations (typically 5–7 years)"],
                      ["Website analytics data", "Aggregated and retained for up to 26 months"],
                    ].map(([category, period], i) => (
                      <tr
                        className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                        key={category}
                      >
                        <td className="px-5 py-4 text-gray-200">{category}</td>
                        <td className="px-5 py-4 text-gray-400">{period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-gray-300 text-sm">
                When personal data is no longer required, it is deleted, anonymised, or securely
                destroyed.
              </p>
            </section>

            {/* ===== SECTION 9 ===== */}
            <section className="mb-12" id="your-rights">
              <h2 className="mb-5 font-bold text-2xl text-white">9. Your Rights Under UAE PDPL</h2>
              <p className="mb-4 text-gray-300 text-base leading-relaxed">
                Under UAE Federal Decree-Law No. 45 of 2021, you have the following rights
                regarding your personal data:
              </p>
              <div className="space-y-3">
                {[
                  ["Right of Access", "Obtain confirmation of whether we hold personal data about you and access that data"],
                  ["Right of Correction", "Request correction of inaccurate or incomplete personal data"],
                  ["Right of Deletion", "Request deletion of your personal data, subject to legal retention obligations"],
                  ["Right to Restrict Processing", "Request restriction of processing in certain circumstances"],
                  ["Right to Data Portability", "Receive your personal data in a structured, commonly used format"],
                  ["Right to Object", "Object to certain types of processing, including direct marketing"],
                  ["Right to Withdraw Consent", "Withdraw your consent at any time, where consent is the basis for processing"],
                ].map(([right, description]) => (
                  <div
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
                    key={right}
                  >
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                    <div>
                      <p className="mb-1 font-semibold text-sm text-white">{right}</p>
                      <p className="text-gray-400 text-sm">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-gray-300 text-sm leading-relaxed">
                To exercise any of these rights, please contact us at{" "}
                <a className="text-cyan-400 hover:text-cyan-300" href="mailto:info@nexaguardcyberlabs.com">
                  info@nexaguardcyberlabs.com
                </a>. We will respond within 30 days, in line with UAE PDPL requirements.
              </p>
              <p className="mt-3 text-gray-300 text-sm">
                You also have the right to lodge a complaint with the UAE Data Office or any
                competent regulatory authority if you believe your data protection rights have been
                infringed.
              </p>
            </section>

            {/* ===== SECTION 10 ===== */}
            <section className="mb-12" id="childrens-privacy">
              <h2 className="mb-5 font-bold text-2xl text-white">10. Children&apos;s Privacy</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Our services and website are intended for business audiences and are not directed
                to children under the age of 18. We do not knowingly collect personal data from
                children. If we become aware that we have collected such data, we will take steps
                to delete it promptly.
              </p>
            </section>

            {/* ===== SECTION 11 ===== */}
            <section className="mb-12" id="third-party-links">
              <h2 className="mb-5 font-bold text-2xl text-white">11. Third-Party Links</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Our website may contain links to third-party websites or services. We are not
                responsible for the privacy practices of those third parties. We encourage you to
                review the privacy policies of any third-party services you engage with through
                our links.
              </p>
            </section>

            {/* ===== SECTION 12 ===== */}
            <section className="mb-12" id="changes">
              <h2 className="mb-5 font-bold text-2xl text-white">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in our
                practices, technology, legal requirements, or other factors. When we make material
                changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this
                policy and, where appropriate, provide additional notice. We encourage you to
                review this Privacy Policy periodically.
              </p>
            </section>

            {/* ===== SECTION 13 ===== */}
            <section className="mb-12" id="contact">
              <h2 className="mb-5 font-bold text-2xl text-white">13. Contact Us</h2>
              <p className="mb-5 text-gray-300 text-base leading-relaxed">
                If you have any questions about this Privacy Policy or our data protection
                practices, or if you wish to exercise any of your rights, please contact us:
              </p>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="mb-1 font-bold text-white">Nexaguard Cyberlabs FZCO</p>
                <p className="text-gray-400 text-sm">Building A1, Dubai Digital Park</p>
                <p className="text-gray-400 text-sm">Dubai Silicon Oasis, Dubai, UAE</p>
                <p className="mt-3 text-sm">
                  Email:{" "}
                  <a className="text-cyan-400 hover:text-cyan-300" href="mailto:info@nexaguardcyberlabs.com">
                    info@nexaguardcyberlabs.com
                  </a>
                </p>
                <p className="text-gray-400 text-sm">
                  Website:{" "}
                  <Link className="text-cyan-400 hover:text-cyan-300" href="/">
                    nexaguardcyberlabs.com
                  </Link>
                </p>
              </div>
            </section>

            <hr className="my-8 border-white/10" />
            <p className="text-gray-500 text-xs italic">
              This Privacy Policy is provided in English. In the event of any discrepancy with
              translations, the English version shall prevail.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
