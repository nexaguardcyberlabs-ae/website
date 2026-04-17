import Image from "next/image";

export default function LeadershipPerspective() {
  return (
    <section className="relative mb-25 w-full bg-[#020B14] px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-9xl px-0 sm:px-5 md:px-20">
        <div className="relative flex min-h-100 w-full flex-col items-center justify-center overflow-hidden rounded-3xl md:h-[400px]">
          {/* Background Image using 'fill' for perfect responsiveness */}
          <Image
            alt="Leadership Perspective Background"
            className="object-cover object-center"
            fill // Replaces width/height to adapt to the parent container
            priority
            src="/about/Leadership-bg.jpg"
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 z-10 bg-black/20" />

          {/* Content Wrapper */}
          <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 py-12 text-center sm:px-12 lg:px-24">
            {/* Badge */}
            <span className="mb-6 inline-block rounded-full border border-white/20 px-4 py-1 font-medium text-white/90 text-xs tracking-wide backdrop-blur-md">
              Leadership Perspective
            </span>

            <p className="mx-auto max-w-4xl bg-gradient-to-r from-white to-[#CCCCCC] bg-clip-text text-center font-inter font-normal text-lg text-transparent italic leading-relaxed tracking-[-0.02em] sm:text-2xl md:text-[32px] md:leading-[48px]">
              <span className="opacity-80">“</span>" Nexaguard was built on the
              belief that enterprises deserve a partner who can protect their
              present while shaping their future. We combine strategic foresight
              with technical depth, so leaders can operate with confidence in
              every digital moment. "
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
