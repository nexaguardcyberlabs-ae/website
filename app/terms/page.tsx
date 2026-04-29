import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Nexaguard Cyber Labs",
  description: "Terms of Service for Nexaguard Cyber Labs FZCO.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#010C13] px-4 pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 font-bold text-3xl text-white sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mb-8 text-gray-500 text-sm">
          Last updated: April 2026. Final legal copy will be provided by
          Nexaguard Cyber Labs FZCO.
        </p>

        <div className="space-y-8 text-gray-300 text-base leading-relaxed">
          <section>
            <h2 className="mb-3 font-semibold text-xl text-white">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing nexaguardcyberlabs.com, you agree to be bound by
              these Terms of Service and all applicable laws and regulations.
            </p>
            <p className="mt-3">
              <strong className="text-white">[PLACEHOLDER]</strong> Final terms
              of service copy will be inserted here by the legal team.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-xl text-white">
              2. Services
            </h2>
            <p>
              Nexaguard Cyber Labs FZCO provides cybersecurity consulting,
              penetration testing, compliance advisory, and managed security
              services. Specific terms for each engagement are governed by
              separate service agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-xl text-white">
              3. Intellectual Property
            </h2>
            <p>
              The content, design, and materials on this website are the
              property of Nexaguard Cyber Labs FZCO and are protected by
              applicable intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-xl text-white">
              4. Limitation of Liability
            </h2>
            <p>
              Information on this website is provided for general informational
              purposes only and does not constitute legal, regulatory, or
              compliance advice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-xl text-white">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of the United Arab Emirates.
              Any disputes shall be subject to the jurisdiction of the courts of
              Dubai, UAE.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-semibold text-xl text-white">
              6. Contact
            </h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a
                className="text-cyan-400 hover:text-cyan-300"
                href="mailto:info@nexaguardcyberlabs.com"
              >
                info@nexaguardcyberlabs.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
