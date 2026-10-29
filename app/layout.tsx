import type { Metadata } from "next";
  import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site.config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DonateModal } from "@/components/shared/DonateModal";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name}, ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "THRIVE Initiative",
    "Nonprofit Nigeria",
    "Women Empowerment",
    "Child Education",
    "Clean Water Boreholes",
    "Skills Acquisition",
    "Community Outreach",
    "Grassroots NGO Abuja",
    "SDG 5 Gender Equality",
    "Sustainable Development Goals",
  ],
  authors: [{ name: "THRIVE Initiative" }],
  creator: "THRIVE Initiative",
  publisher: "THRIVE Initiative",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: baseUrl,
    title: `${siteConfig.name}, ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Grassroots Community Progress in Nigeria`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}, ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og-default.png"],
    creator: "@thrive_org",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    alternateName: "THRIVE Initiative Africa",
    url: baseUrl,
    logo: `${baseUrl}/logo/thrive-logo-clean.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Abuja",
      addressRegion: "FCT",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "Customer Support",
      email: siteConfig.contact.email,
      areaServed: "NG",
      availableLanguage: "en",
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.twitter,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
    ],
  };

  return (
    <html lang="en" className={instrumentSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF6EC] text-[#2E1650] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <DonateModal />
      </body>
    </html>
  );
}
