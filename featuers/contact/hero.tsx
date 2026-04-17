import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative flex min-h-[40dvh] w-full items-center overflow-hidden bg-[#010C13]">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Contact background"
          className="object-cover object-center"
          fill
          priority
          src="/about/hero.jpg"
        />
        <div className="absolute inset-0 bg-[#010C13]/80" />
      </div>

      <div className="relative z-10 mx-auto w-full px-4 py-16 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="bg-[linear-gradient(91.3deg,#FFFFFF_0.85%,#19A7B6_108.42%)] bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-200 leading-relaxed sm:text-lg md:mt-6">
            Speak with our team to discuss your cybersecurity priorities and
            digital transformation goals.
          </p>
        </div>
      </div>
    </section>
  );
}
