"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Cloud,
  Lock,
  Monitor,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import MeshGradientBackground from "@/components/backgrounds/MeshGradientBackground";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Lock,
    name: "Application Security",
    oneliner: "Find vulnerabilities before attackers do.",
    href: "/services/application-security",
  },
  {
    icon: Shield,
    name: "Cyber Risk & GRC",
    oneliner: "Compliance and risk advisory built for UAE.",
    href: "/services/cyber-risk-management",
  },
  {
    icon: Monitor,
    name: "Managed Services",
    oneliner: "Continuous protection, no in-house team needed.",
    href: "/services/managed-services",
  },
  {
    icon: Cloud,
    name: "Cloud & Infrastructure",
    oneliner: "Secure foundations for your digital operations.",
    href: "/services/cloud-infrastructure-security",
  },
  {
    icon: Users,
    name: "Cyber Awareness",
    oneliner: "Your people are your first firewall.",
    href: "/services/human-defense-awareness",
  },
];

export default function ServicesOverview() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".svc-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const row1 = services.slice(0, 3);
  const row2 = services.slice(3);

  return (
    <section
      className="relative w-full bg-[#010C13] px-4 py-24"
      ref={containerRef}
    >
      <MeshGradientBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <span className="mb-4 inline-block rounded-full border border-cyan-400/30 px-4 py-1 text-cyan-300 text-xs">
          What We Do
        </span>
        <h2 className="mb-12 font-bold text-3xl text-white tracking-tight sm:text-4xl">
          Our Services
        </h2>

        {/* Row 1 — 3 cards */}
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {row1.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                className="svc-card group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_8px_40px_rgba(0,181,214,0.12)]"
                href={s.href as never}
                key={s.name}
              >
                <div>
                  <Icon
                    className="mb-5 h-6 w-6 text-gray-400 transition-colors duration-300 group-hover:text-cyan-400"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 font-semibold text-base text-white">
                    {s.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {s.oneliner}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 font-medium text-cyan-400 text-sm">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Row 2 — 2 wider centered cards */}
        <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-[66.66%]">
          {row2.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                className="svc-card group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_8px_40px_rgba(0,181,214,0.12)]"
                href={s.href as never}
                key={s.name}
              >
                <div>
                  <Icon
                    className="mb-5 h-6 w-6 text-gray-400 transition-colors duration-300 group-hover:text-cyan-400"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 font-semibold text-base text-white">
                    {s.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {s.oneliner}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 font-medium text-cyan-400 text-sm">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

