"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/nexaguard-placeholder";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full border-white/5 border-b bg-[#020d14]/20 py-3 opacity-0 backdrop-blur-md"
      ref={navRef}
    >
      <div className="relative flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 lg:px-20">
        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          aria-label="Toggle menu"
          className="z-50 p-2 text-gray-300 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <title>Menu</title>
            <path
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* ================= LOGO ================= */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Link href="/">
            <Image
              alt="Nexaguard Cyber Labs"
              className="h-12 w-auto sm:h-12 md:h-12"
              height={50}
              priority
              src="/nexagaurd-New.png"
              width={180}
            />
          </Link>
        </div>

        {/* ================= MOBILE SPACER ================= */}
        <div className="w-10 md:hidden" />

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center space-x-6 md:flex lg:space-x-8">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link
                className={`text-sm uppercase tracking-wide transition lg:text-base ${
                  isActive
                    ? "font-semibold text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                href={item.href as never}
                key={item.label}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ================= DESKTOP CTA ================= */}
        <div className="hidden items-center md:flex">
          <a
            className="cursor-pointer rounded-full border border-nexacyan bg-gradient-to-r from-[#18A7B7] to-[#1F88BF] px-5 py-2 font-semibold text-sm text-white shadow-[0_0_20px_rgba(24,167,183,0.25)] transition hover:opacity-90"
            href={CALENDLY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Get Free Audit →
          </a>
        </div>
      </div>

      {/* ================= MOBILE SIDE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 w-full transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <button
          aria-label="Close menu"
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          type="button"
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 left-0 w-full transform border-white/10 border-b bg-[#010C13] transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Close Button */}
          <button
            aria-label="Close menu"
            className="absolute top-4 right-4 z-50 p-2 text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
            type="button"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Close</title>
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex w-full flex-col space-y-6 bg-[#010C13] px-6 py-20 pt-16">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  className={`border-white/10 border-b pb-4 text-base tracking-wide transition ${
                    isActive
                      ? "font-semibold text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                  href={item.href as never}
                  key={item.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile CTA */}
            <a
              className="mt-2 rounded-full border border-[#18A7B7] bg-gradient-to-r from-[#18A7B7] to-[#1F88BF] px-6 py-3 text-center font-semibold text-white"
              href={CALENDLY_URL}
              onClick={() => setIsMobileMenuOpen(false)}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get Free Audit →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
