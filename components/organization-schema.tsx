export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexaguard Cyber Labs",
    alternateName: "Nexaguard Cyber Labs FZCO",
    url: "https://nexaguardcyberlabs.com",
    logo: "https://nexaguardcyberlabs.com/nexagaurd-New.png",
    description:
      "Cybersecurity consulting for UAE fintechs, SaaS, and growing businesses. VAPT, ISO 27001 readiness, managed security services.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building A1, Dubai Digital Park",
      addressLocality: "Dubai Silicon Oasis",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971-50-623-3538",
      email: "info@nexaguardcyberlabs.com",
      contactType: "Sales",
      areaServed: ["AE", "SA", "QA", "BH", "OM", "KW"],
      availableLanguage: ["en"],
    },
    sameAs: [
      "https://www.linkedin.com/company/nexaguardcyberlabs/",
      "https://www.instagram.com/nexaguardcyberlabs/",
      "https://www.facebook.com/nexaguardcyberlabs",
    ],
    foundingDate: "2025-09",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "AE",
      },
    },
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  );
}
