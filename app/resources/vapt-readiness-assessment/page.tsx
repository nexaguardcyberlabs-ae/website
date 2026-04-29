import type { Metadata } from "next";
import VaptAssessmentClient from "./assessment-client";

export const metadata: Metadata = {
  title: "VAPT Readiness Self-Assessment | Free Security Score | Nexaguard",
  description:
    "Take our free 5-minute VAPT Readiness Self-Assessment. Get a personalised security score and 3 specific recommendations for your UAE business — instantly, no sales call required.",
};

export default function VaptAssessmentPage() {
  return <VaptAssessmentClient />;
}
