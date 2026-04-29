"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, MessageCircle, Calendar } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { servicesData } from "@/app/data";

gsap.registerPlugin(ScrollTrigger);

// Spotlight Card
const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) {
      return;
    }

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!divRef.current) {
      return;
    }
    divRef.current.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <div
      aria-hidden="true"
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${className}`}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={divRef}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background:
            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 1), transparent 40%)",
        }}
      />

      {/* Inner surface */}
      <div className="absolute inset-px z-10 rounded-[15px] bg-[#020408]" />

      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

// ---------------------------------------------
// Contact Section
// ---------------------------------------------
const ContactSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    if (!submitStatus.type) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSubmitStatus({ type: null, message: "" });
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [submitStatus]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/thank-you");
        return;
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (_error) {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
        .fromTo(
          headingRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".contact-card",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-[#020305] px-4 py-24"
      id="contact"
      ref={containerRef}
    >
      {/* Ultra Subtle Background Grid */}
      {/* <div
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
      /> */}
      <div className="relative mx-auto px-5 md:px-20">
        {/* Header */}
        <span
          className="mb-4 inline-block rounded-full border border-cyan-400/30 px-4 py-1 text-cyan-300 text-xs"
          ref={badgeRef}
        >
          Contact Us
        </span>

        <h2 className="mb-12 text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
          Let’s discuss your security posture <br />
          <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
            and transformation priorities.
          </span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          {/* LEFT COLUMN — Rich contact info card */}
          <SpotlightCard className="contact-card h-full p-8">
            <div className="flex h-full flex-col gap-6">

              {/* Contact details */}
              <div className="space-y-4">
                <a href="mailto:info@nexaguardcyberlabs.com" className="flex items-start gap-4 rounded-lg p-3 transition hover:bg-white/5 group">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-0.5">Email</p>
                    <p className="text-white text-sm group-hover:text-cyan-300 transition-colors">info@nexaguardcyberlabs.com</p>
                  </div>
                </a>

                <a href="tel:+971506233538" className="flex items-start gap-4 rounded-lg p-3 transition hover:bg-white/5 group">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-0.5">Phone</p>
                    <p className="text-white text-sm group-hover:text-cyan-300 transition-colors">+971 50 623 3538</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-lg p-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-0.5">Office</p>
                    <p className="text-white text-sm leading-relaxed">Building A1, Dubai Digital Park,<br />Dubai Silicon Oasis, UAE</p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/8" />

              {/* WhatsApp — copy + CTA, no phone number */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-4 w-4 text-green-400 shrink-0" />
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">WhatsApp</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Prefer WhatsApp? Get a faster response.
                </p>
                <a
                  href="https://wa.me/971506233538?text=Hi%20Nexaguard%2C%20I%27d%20like%20to%20discuss%20our%20cybersecurity%20needs."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-400/30 bg-green-400/5 px-5 py-3 text-green-300 text-sm font-medium transition hover:border-green-400/50 hover:bg-green-400/10"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  Chat on WhatsApp →
                </a>
              </div>

              {/* Office hours */}
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Hours</p>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Monday – Saturday<br />
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

            </div>
          </SpotlightCard>

          {/* RIGHT COLUMN */}
          <SpotlightCard className="contact-card h-full bg-[#020408] p-8">
            <form
              className="flex h-full flex-col justify-between space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                {submitStatus.type && (
                  <div
                    className={`rounded-lg px-4 py-3 text-sm ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Name */}
                <input
                  className="w-full rounded-lg border border-transparent bg-[#062735] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
                  disabled={isLoading}
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  value={formData.name}
                />

                {/* Email */}
                <input
                  className="w-full rounded-lg border border-transparent bg-[#062735] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
                  disabled={isLoading}
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  type="email"
                  value={formData.email}
                />

                {/* Phone */}
                <input
                  className="w-full rounded-lg border border-transparent bg-[#062735] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
                  disabled={isLoading}
                  name="phone"
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  type="tel"
                  value={formData.phone}
                />

                {/* Company */}
                <input
                  className="w-full rounded-lg border border-transparent bg-[#062735] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
                  disabled={isLoading}
                  name="company"
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  value={formData.company}
                />

                {/* Service Dropdown */}
                <select
                  className="w-full rounded-lg border border-transparent bg-[#062735] px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
                  disabled={isLoading}
                  name="service"
                  onChange={handleInputChange}
                  value={formData.service}
                >
                  <option value="">Select a Service</option>
                  {servicesData.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>

                {/* Message */}
                <textarea
                  className="w-full resize-none rounded-lg border border-transparent bg-[#062735] px-4 py-3 text-sm text-white placeholder-gray-400 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-400"
                  disabled={isLoading}
                  name="message"
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  rows={4}
                  value={formData.message}
                />
              </div>

              <button
                className="mt-2 w-full rounded-lg py-3 font-medium text-sm text-white transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
                style={{
                  background:
                    "linear-gradient(95.96deg, #18A7B7 20.55%, #1F88BF 64.75%)",
                  border: "1px solid #FFFFFF40",
                  boxShadow: "0px 4px 4px 0px #00000040 inset",
                }}
                type="submit"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
