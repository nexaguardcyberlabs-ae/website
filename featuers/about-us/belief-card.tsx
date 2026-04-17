import Image from "next/image";

// Data for the cards
const beliefs = [
  {
    title: "Security is a strategic enabler",
    description:
      "Not a compliance checkbox. Not a reactive function. Security should enable growth, partnerships, and innovation.",
    imageSrc: "/about/Believe1.jpg", // Replace with your actual image path
    imageAlt: "Glowing digital shield with circuit patterns",
  },
  {
    title: "Transformation must be resilient by design",
    description:
      "Digital change without security creates fragility. We embed resilience into every layer.",
    imageSrc: "/about/Believe3.jpg", // Replace with your actual image path
    imageAlt: "Hand touching a futuristic digital interface",
  },
  {
    title: "Leadership needs clarity. Not noise",
    description:
      "We translate technical complexity into executive-ready insights that drive decisions.",
    imageSrc: "/about/Believe2.jpg", // Replace with your actual image path
    imageAlt: "King chess piece on a board",
  },
];

const BeliefCard = ({
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}) => {
  return (
    // 1. Wrapper: Applied rounded-[12px] and bg-[#010C13]
    <div className="group relative h-[450px] overflow-hidden rounded-[12px] bg-[#010C13]">
      {/* Background Image */}
      <Image
        alt={imageAlt}
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        src={imageSrc}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010C13] via-[#010C13]/60 to-transparent" />

      {/* 2. SVG Border Overlay 
         This replaces the standard CSS border to achieve the specific "8px dash, 8px gap" 
      */}
      <svg
        aria-label="Card border"
        className="pointer-events-none absolute inset-0 h-full w-full"
        role="img"
      >
        <rect
          fill="none"
          height="calc(100% - 1px)"
          rx="12"
          ry="12"
          stroke="#18A7B780" // Matches border-radius: 12px
          strokeDasharray="8 8"
          strokeWidth="1"
          width="calc(100% - 1px)" // Hex color with 50% opacity (80 at end)
          x="0.5"
          y="0.5" // Exact requirement: 8px dash, 8px gap
        />
      </svg>

      {/* Card Content */}
      <div className="absolute right-0 bottom-0 left-0 p-8">
        <h3 className="mb-4 font-bold text-2xl text-white sm:text-3xl">
          {title}
        </h3>
        <p className="text-base text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default function WhatWeBelieveSection() {
  return (
    <section className="bg-[#010C13] py-24 lg:py-32">
      <div className="mx-auto max-w-9xl px-5 md:px-20">
        {/* Section Title */}

        <h2 className="mb-12 text-left font-bold text-3xl text-white tracking-tight sm:text-5xl">
          What We{" "}
          <span className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
            We Believe
          </span>
        </h2>

        {/* Grid of Belief Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {beliefs.map((belief) => (
            <BeliefCard
              description={belief.description}
              imageAlt={belief.imageAlt}
              imageSrc={belief.imageSrc}
              key={belief.title}
              title={belief.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
