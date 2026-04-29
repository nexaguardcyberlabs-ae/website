import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/analytics";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import OrganizationSchema from "@/components/organization-schema";
import WhatsAppButton from "@/components/whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Cybersecurity Services in Dubai | VAPT, ISO 27001 | Nexaguard Cyber Labs",
    template: "%s | Nexaguard Cyber Labs",
  },
  description:
    "UAE's senior-led cybersecurity consultancy. VAPT, ISO 27001 readiness, managed security services for fintechs, SaaS, and growing businesses. Free VAPT self-assessment available. Based in Dubai.",
  metadataBase: new URL("https://nexaguardcyberlabs.com"),
  openGraph: {
    siteName: "Nexaguard Cyber Labs",
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <OrganizationSchema />
        <Navbar />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
