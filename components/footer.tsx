"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/nexaguard-placeholder";

const serviceLinks = [
  { name: "Application Security", href: "/services/application-security" },
  { name: "Cyber Risk & GRC", href: "/services/cyber-risk-management" },
  { name: "Managed Services", href: "/services/managed-services" },
  { name: "Cloud & Infrastructure", href: "/services/cloud-infrastructure-security" },
  { name: "Human Defense & Awareness", href: "/services/human-defense-awareness" },
  { name: "All Services", href: "/services" },
];

const resourceLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
  { name: "Free Risk Review", href: CALENDLY_URL, external: true },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        topRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      ).fromTo(
        bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );
    },
    { scope: containerRef }
  );

  return (
    <footer
      className="relative w-full overflow-hidden bg-[#02131E] pt-16 pb-8"
      ref={containerRef}
    >
      {/* Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(circle at center, black 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto px-6 md:px-12 lg:px-20">
        {/* === 4-Column Grid === */}
        <div
          className="grid grid-cols-1 gap-12 border-white/10 border-b pb-12 sm:grid-cols-2 lg:grid-cols-4"
          ref={topRef}
        >
          {/* Column 1 — Company */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                alt="Nexaguard Cyber Labs"
                className="h-10 w-auto"
                height={40}
                src="/nexagaurd-New.png"
                width={150}
              />
            </Link>
            <p className="font-medium text-gray-300 text-sm leading-relaxed">
              Cybersecurity, engineered for the UAE.
            </p>
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
              <span>
                Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai,
                UAE
              </span>
            </div>
            <p className="text-gray-500 text-xs">IFZA Freezone Registered Entity</p>
          </div>

          {/* Column 2 — Services */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-white uppercase tracking-wider">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-gray-400 text-sm transition-colors hover:text-cyan-400"
                    href={link.href as never}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {resourceLinks.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      className="text-gray-400 text-sm transition-colors hover:text-cyan-400"
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {link.name}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      className="text-gray-400 text-sm transition-colors hover:text-cyan-400"
                      href={link.href as never}
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 4 — Connect */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-white uppercase tracking-wider">
              Connect
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  className="flex items-center gap-2 text-gray-400 text-sm transition-colors hover:text-cyan-400"
                  href="tel:+971506233538"
                >
                  <Phone className="h-4 w-4 shrink-0 text-cyan-400" />
                  +971 50 623 3538
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-gray-400 text-sm transition-colors hover:text-green-400"
                  href="https://wa.me/971506233538?text=Hi%20Nexaguard%2C%20I%27d%20like%20to%20discuss%20our%20cybersecurity%20needs."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {/* WhatsApp icon */}
                  <svg
                    className="h-4 w-4 shrink-0 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>WhatsApp</title>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 text-gray-400 text-sm transition-colors hover:text-cyan-400"
                  href="mailto:info@nexaguardcyberlabs.com"
                >
                  <Mail className="h-4 w-4 shrink-0 text-cyan-400" />
                  info@nexaguardcyberlabs.com
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-2 flex items-center gap-4">
              <a
                aria-label="LinkedIn"
                className="text-white transition-colors hover:text-cyan-400"
                href="https://www.linkedin.com/company/nexaguardcyberlabs/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a
                aria-label="Instagram"
                className="text-white transition-colors hover:text-cyan-400"
                href="https://www.instagram.com/nexaguardcyberlabs/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a
                aria-label="Facebook"
                className="text-white transition-colors hover:text-cyan-400"
                href="https://www.facebook.com/nexaguardcyberlabs"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Facebook className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* === Bottom Strip === */}
        <div
          className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
          ref={bottomRef}
        >
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Nexaguard Cyber Labs FZCO. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              className="text-gray-500 text-xs transition-colors hover:text-gray-300"
              href={"/privacy" as never}
            >
              Privacy Policy
            </Link>
            <Link
              className="text-gray-500 text-xs transition-colors hover:text-gray-300"
              href={"/terms" as never}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
