import MeshGradientBackground from "@/components/backgrounds/MeshGradientBackground";

export default function ContactHero() {
  return (
    <section className="relative flex min-h-[38dvh] w-full items-center overflow-hidden bg-[#010C13] pt-28 sm:pt-32">
      <MeshGradientBackground />

      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {[320, 480, 640].map((size) => (
          <div
            className="absolute rounded-full border border-cyan-400/8"
            key={size}
            style={{
              width: size,
              height: size,
              top: -size / 2,
              left: -size / 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full px-4 pb-16 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <span className="mb-4 inline-block rounded-full border border-cyan-400/30 px-4 py-1 font-semibold text-cyan-300 text-xs uppercase tracking-[0.2em]">
            Get in Touch
          </span>
          <h1 className="bg-[linear-gradient(91.3deg,#FFFFFF_0.85%,#19A7B6_108.42%)] bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300 leading-relaxed sm:text-lg md:mt-5">
            Speak with our team. We respond within 24 hours.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-400 leading-relaxed italic">
            Senior-led conversations. No sales pressure. No follow-up unless you ask for it.
          </p>
        </div>
      </div>
    </section>
  );
}
