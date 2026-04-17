"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  // { label: "Insights", href: "/blog" },
  { label: "Services", href: "/services" },
  // { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Navbar entrance animation
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const handleContactScroll = () => {
    router.push("/contact" as never);
  };

  // Determine if Contact is active
  const isContactActive =
    pathname === "/contact" || pathname?.startsWith("/contact");

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
              alt="Nexa Logo"
              className="h-12 w-auto sm:h-12 md:h-12"
              height={50}
              priority
              src="/nexagaurd-New.png"
              width={180}
            />
          </Link>
        </div>

        {/* ================= MOBILE CALL ICON ================= */}
        <div className="md:hidden">
          <Link aria-label="Call us" href="tel:+971000000000">
            <div className="rounded-full p-2 text-white transition hover:bg-nexacyan/10">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <title>Phone</title>
                <path
                  d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.865l-1.27 1.27a16 16 0 006.586 6.586l1.27-1.27a2 2 0 011.865-.45l2.064.516A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </div>

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

        {/* ================= DESKTOP CONTACT BUTTON ================= */}
        <div className="hidden md:block">
          <button
            className={`cursor-pointer rounded-full border px-5 py-2 font-semibold text-sm transition ${
              isContactActive
                ? "border-cyan-400 bg-gradient-to-r from-cyan-500/80 to-blue-500/80 text-white shadow-cyan-500/10 shadow-lg"
                : "border-nexacyan text-white hover:bg-nexacyan/10"
            }
            `}
            onClick={handleContactScroll}
            type="button"
          >
            Contact Us
          </button>
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

            <button
              className="mt-6 rounded-full border border-nexacyan px-6 py-2 text-white transition hover:bg-nexacyan/20"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleContactScroll();
              }}
              type="button"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
