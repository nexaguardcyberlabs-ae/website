"use client";

import { useGSAP } from "@gsap/react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react"; // Added useCallback
import { blogs } from "@/app/data";

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
  // 1. Destructure emblaApi to control scrolling
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // 2. Create Scroll Handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

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
        headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      ).fromTo(
        ".blog-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        "-=0.3"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-[#020408] py-24"
      ref={containerRef}
    >
      {/* Background Glow */}
      <div className="absolute inset-0" />

      <div className="relative mx-auto px-5 pr-0 md:px-20 md:pr-0">
        {/* Header */}
        <div
          className="mb-12 flex flex-col justify-between gap-6 pr-10 md:flex-row md:items-end md:pr-20"
          ref={headerRef}
        >
          {/* Left Side: Title */}
          <div className="max-w-xl">
            <span className="mb-4 inline-block rounded-full border border-cyan-400/30 px-4 py-1 text-cyan-300 text-xs">
              Blogs & News
            </span>

            <h2 className="mb-12 text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
              Know what&apos;s{" "}
              <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
                happening
              </span>
            </h2>
          </div>

          {/* Right Side: Controls & Link */}
          <div className="flex items-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous Slide"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-cyan-500 hover:bg-cyan-500 hover:text-black active:scale-95"
                onClick={scrollPrev}
                type="button"
              >
                <svg
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <title>Previous</title>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                aria-label="Next Slide"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-cyan-500 hover:bg-cyan-500 hover:text-black active:scale-95"
                onClick={scrollNext}
                type="button"
              >
                <svg
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <title>Next</title>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* View All Button */}
            <Link
              className="hidden items-center rounded-full bg-cyan-500 px-6 py-2.5 font-medium text-black text-sm transition hover:bg-cyan-400 md:inline-flex"
              href="/#blogs"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Embla Carousel */}
        <div
          className="cursor-grab overflow-hidden active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex gap-6">
            {blogs.map((blog, index) => (
              <article
                className="blog-card min-w-70 rounded-2xl border border-white/10 bg-white/2 p-5 transition-colors duration-300 hover:border-cyan-500/30 sm:min-w-85 lg:min-w-95"
                key={`${blog.title}-${blog.image}-${index}`}
              >
                {/* Image */}
                <div className="group relative mb-5 h-60 overflow-hidden rounded-xl sm:h-64">
                  <div className="absolute inset-0 z-10 bg-black/20 transition-colors group-hover:bg-transparent" />
                  <Image
                    alt={blog.title}
                    className="relative h-full w-full transform rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                    height={380}
                    src={blog.image || "/placeholder.svg"}
                    width={500}
                  />
                </div>

                {/* Content */}
                <h3 className="mb-3 font-semibold text-lg text-white leading-snug">
                  {blog.title}
                </h3>

                <p className="mb-5 line-clamp-3 text-gray-400 text-sm leading-relaxed">
                  {blog.description}
                </p>

                <Link
                  className="inline-flex items-center gap-2 text-cyan-400 text-sm transition hover:text-cyan-300"
                  href="#/blogs"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            className="rounded-full bg-cyan-500 px-6 py-2 font-medium text-black text-sm"
            href="#/blogs"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
