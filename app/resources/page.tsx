import type { Metadata } from "next";
import ResourcesClient from "./resources-client";

export const metadata: Metadata = {
  title: "Free Cybersecurity Resources | UAE SME Compliance | Nexaguard",
  description:
    "Free UAE cybersecurity resources: SME compliance checklist, web application security guide, VAPT readiness self-assessment. Built by senior practitioners.",
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
