"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { name: "About Nexaguard", href: "/about-us" },
  { name: "Our Services", href: "/services" },
  // { name: "Intelligence Feed", href: "/blogs" },
  { name: "Contact Support", href: "/contact" },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none ",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          socialsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          linksRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          copyrightRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <footer
      className="relative w-full overflow-hidden bg-[#02131E] pt-20 pb-10"
      ref={containerRef}
    >
      {/* Background Grid Pattern */}
      <div
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

      <div className="relative z-10 mx-auto flex h-full flex-col">
        {/* --- Top Section: Main Content --- */}
        <div className="mb-32 flex flex-col items-start justify-between gap-12 px-10 md:mb-55 md:flex-row md:gap-24 md:px-20">
          {/* Left Side: Tagline & Socials */}
          <div className="max-w-xl">
            <h2
              className="mb-8 font-medium text-3xl text-gray-200 leading-tight sm:text-4xl md:text-5xl"
              ref={headingRef}
            >
              We Are Nexaguard. Your <br />
              Nexus of Cybersecurity in <br />
              the UAE.
            </h2>

            {/* Social Icons */}
            <div className="flex items-center gap-6" ref={socialsRef}>
              <a
                aria-label="Instagram"
                className="transform text-white transition-colors duration-300 hover:scale-110 hover:text-nexacyan"
                href="https://www.instagram.com/nexaguardcyberlabs"
                rel="noopener"
                target="_blank"
              >
                <Instagram className="h-6 w-6" strokeWidth={1.5} />
              </a>
              <a
                aria-label="Facebook"
                className="transform text-white transition-colors duration-300 hover:scale-110 hover:text-nexacyan"
                href="https://www.facebook.com/nexaguardcyberlabs"
                rel="noopener"
                target="_blank"
              >
                <Facebook className="h-6 w-6" strokeWidth={1.5} />
              </a>
              <a
                aria-label="LinkedIn"
                className="transform text-white transition-colors duration-300 hover:scale-110 hover:text-nexacyan"
                href="https://www.linkedin.com/company/nexaguardcyberlabs"
                rel="noopener"
                target="_blank"
              >
                <Linkedin className="h-6 w-6" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Right Side: Links Column */}
          <div
            className="footer-element flex w-full flex-col gap-2 lg:w-auto"
            ref={linksRef} // <--- Added the missing ref here
          >
            {footerLinks.map((link, index) => (
              <Link
                className="group flex w-full items-center justify-between border-white/10 border-b py-4 transition-colors hover:border-cyan-500/50 lg:w-75"
                href={link.href as never}
                key={link.href}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span
                  className={`font-medium text-xl transition-colors duration-300 ${
                    hoveredLink === index ? "text-cyan-400" : "text-white"
                  }`}
                >
                  {link.name}
                </span>
                <ArrowUpRight
                  className={`h-5 w-5 transition-all duration-300 ${
                    hoveredLink === index
                      ? "translate-x-0 text-cyan-400 opacity-100"
                      : "-translate-x-2 text-white/30 opacity-50"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* --- Bottom Section: Watermark & Copyright --- */}
        <div
          className="relative mt-auto flex w-full flex-col items-center"
          ref={copyrightRef}
        >
          {/* Copyright Text (Centered on top of the watermark) */}
          <div className="relative z-20 mb-2 text-[10px] text-white uppercase tracking-widest sm:mb-4 sm:text-xs">
            © Nexaguard CYBERSECURITY {new Date().getFullYear()} • All Rights
            Reserved
          </div>

          {/* Giant Outlined Watermark Text (Always at the bottom) */}
          <Image
            alt="Nexa Logo"
            className="absolute -bottom-10 left-1/2 h-auto w-full max-w-800 -translate-x-1/2 object-contain"
            height={1200}
            src="/landing/nexaguard-log-.svg"
            unoptimized
            width={3200}
          />
        </div>
      </div>
    </footer>
  );
}
