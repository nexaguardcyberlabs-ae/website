"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function HomeScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("scroll") === "contact") {
      const timer = setTimeout(() => {
        const contactSection = document.getElementById("contact");
        contactSection?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return null;
}
