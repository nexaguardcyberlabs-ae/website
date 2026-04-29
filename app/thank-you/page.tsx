import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | Nexaguard Cyber Labs",
  description: "Thank you for contacting Nexaguard Cyber Labs.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#010C13] px-4 pt-28 sm:pt-32 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(24,167,183,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10">
            <svg
              className="h-10 w-10 text-cyan-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <title>Success</title>
              <path
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 font-bold text-3xl text-white sm:text-4xl">
          Thank You — We&apos;ve Received Your Message
        </h1>
        <p className="mb-10 text-gray-400 text-base leading-relaxed sm:text-lg">
          One of our team will be in touch within 24 working hours. In the
          meantime:
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-5 text-center transition-all hover:border-cyan-400/40 hover:bg-white/10"
            href="/services"
          >
            <span className="text-2xl">🛡️</span>
            <span className="font-medium text-sm text-white">
              Read about our services
            </span>
          </Link>

          <a
            className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-5 text-center transition-all hover:border-cyan-400/40 hover:bg-white/10"
            href="https://www.linkedin.com/company/nexaguardcyberlabs/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="text-2xl">💼</span>
            <span className="font-medium text-sm text-white">
              Connect on LinkedIn
            </span>
          </a>

          <Link
            className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-5 text-center transition-all hover:border-cyan-400/40 hover:bg-white/10"
            href="/resources"
          >
            <span className="text-2xl">📋</span>
            <span className="font-medium text-sm text-white">
              Download free Compliance Checklist
            </span>
          </Link>
        </div>

        <div className="mt-10">
          <Link
            className="text-cyan-400 text-sm transition-colors hover:text-cyan-300"
            href="/"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
