"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
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
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
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
          {/* LEFT COLUMN */}
          <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Email */}
            <SpotlightCard className="contact-card flex h-full flex-col p-6">
              <div className="flex h-full flex-col">
                <div className="flex shrink-0 justify-start">
                  <Mail className="mb-6 h-8 w-8 text-cyan-400" />
                </div>
                <div className="mt-auto flex grow flex-col justify-end">
                  <h4 className="mb-1 font-medium text-lg text-white">
                    Email Us
                  </h4>
                  <p className="text-gray-400 text-sm">
                    info@Nexaguardcyberlabs.com
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Phone */}
            <SpotlightCard className="contact-card flex h-full flex-col p-6">
              <div className="flex h-full flex-col">
                <div className="flex shrink-0 justify-start">
                  <Phone className="mb-6 h-8 w-8 text-cyan-400" />
                </div>
                <div className="mt-auto flex grow flex-col justify-end">
                  <h4 className="mb-1 font-medium text-lg text-white">
                    Call Us
                  </h4>
                  <p className="text-gray-400 text-sm">+971 50 6233538</p>
                </div>
              </div>
            </SpotlightCard>

            {/* Address */}
            <div className="relative h-full sm:col-span-2">
              <SpotlightCard className="contact-card flex h-full flex-col justify-between p-6">
                <div className="flex h-full flex-col">
                  <div className="flex shrink-0 justify-start">
                    <MapPin className="mb-6 h-8 w-8 text-cyan-400" />
                  </div>
                  <div className="mt-auto flex grow flex-col justify-end">
                    <h4 className="mb-2 font-medium text-lg text-white">
                      Visit Us
                    </h4>
                    <p className="max-w-md text-gray-400 text-sm leading-relaxed">
                      Building A1, Dubai Digital Park, Dubai Silicon Oasis,
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
                <button
                  className="absolute top-4 right-4 inline-flex cursor-pointer items-center gap-2 font-medium text-cyan-400 text-sm transition-colors hover:text-cyan-300"
                  type="button"
                >
                  Locate Us <ArrowRight className="h-4 w-4" />
                </button>
              </SpotlightCard>
            </div>
          </div>

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
