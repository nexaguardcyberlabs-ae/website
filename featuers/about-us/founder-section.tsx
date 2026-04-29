import { Linkedin } from "lucide-react";
import Image from "next/image";

// ============================================================
// FOUNDER SECTION — Edit this file to update founder details.
// Replace the placeholder values below with real content.
// ============================================================

const FOUNDER = {
  name: "[FOUNDER NAME]",
  title: "Founder & Managing Security Consultant",
  bio: [
    "[BIO PLACEHOLDER — paragraph 1: years in cybersecurity, core technical background and certifications (e.g. OSCP, CISSP, CEH), specialisations and methodologies.]",
    "[BIO PLACEHOLDER — paragraph 2: prior notable engagements or sectors served — fintech, healthcare, critical infrastructure, enterprise. Types of assessments led.]",
    "[BIO PLACEHOLDER — paragraph 3: why Nexaguard was founded — the specific gap in the market, the frustration with existing options, the mission.]",
  ],
  linkedinUrl: "https://www.linkedin.com/in/[founder-linkedin-handle]",
  photoSrc: null as string | null,
};

export default function FounderSection() {
  return (
    <section className="relative w-full bg-[#010C13] px-4 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <span className="mb-4 inline-block rounded-full border border-cyan-400/30 px-4 py-1 text-cyan-300 text-xs">
          Leadership
        </span>
        <h2 className="mb-16 font-bold text-3xl text-white tracking-tight sm:text-4xl">
          The Team Behind Nexaguard
        </h2>

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          {/* Photo */}
          <div className="flex shrink-0 flex-col items-center gap-4 md:w-64">
            <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#02131E]">
              {FOUNDER.photoSrc ? (
                <Image
                  alt={FOUNDER.name}
                  className="object-cover object-center"
                  fill
                  src={FOUNDER.photoSrc}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    className="h-20 w-20 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    viewBox="0 0 24 24"
                  >
                    <title>Founder photo placeholder</title>
                    <path
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="font-semibold text-base text-white">{FOUNDER.name}</p>
              <p className="mt-1 text-gray-400 text-sm">{FOUNDER.title}</p>
              <a
                className="mt-3 inline-flex items-center gap-1.5 text-cyan-400 text-sm transition-colors hover:text-cyan-300"
                href={FOUNDER.linkedinUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-5">
            {FOUNDER.bio.map((paragraph, i) => (
              <p
                className="text-base text-gray-300 leading-relaxed sm:text-lg"
                key={`bio-${i}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
