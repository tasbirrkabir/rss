import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { IntroReveal } from "@/components/site/intro-reveal";
import { SiteConfigProvider } from "@/components/site/site-config-provider";
import { getHomeContent, getSiteConfig } from "@/lib/cms";
import { whatsappUrl } from "@/lib/public-content";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Red Scooty Sreemangal | Scooty Rental & Rides in Sreemangal",
  description:
    "Rent a scooty in Sreemangal and explore the tea gardens, Lawachara National Park, Madhabpur Lake and the quiet roads between them. Simple booking, local pickup on Jalalia Road. Don't just visit Sreemangal - ride it.",
  keywords: [
    "scooty rental Sreemangal",
    "scooter rental Sreemangal",
    "bike rental Sreemangal",
    "rent a scooter Sreemangal",
    "bike rent Sreemangal",
    "Sreemangal tea garden tour",
    "Lawachara National Park",
    "Madhabpur Lake",
    "Sreemangal transport",
    "Red Scooty Sreemangal",
  ],
  authors: [{ name: "Red Scooty Sreemangal" }],
  openGraph: {
    title: "Red Scooty Sreemangal | Don't Just Visit Sreemangal. Ride It.",
    description:
      "Scooty rentals for exploring the tea gardens, forests, roads and hidden corners of Sreemangal.",
    url: siteUrl,
    siteName: "Red Scooty Sreemangal",
    // Images: provided by the file-convention src/app/opengraph-image.png
    // (1200x630 brand card) — no explicit entry needed here.
    type: "website",
    locale: "en_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Scooty Sreemangal | Scooty Rental & Rides",
    description:
      "Scooty rentals for exploring the tea gardens, forests, roads and hidden corners of Sreemangal.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: "Red Scooty Sreemangal",
  description:
    "Scooty rental service for exploring the tea gardens and nature of Sreemangal, Bangladesh.",
  slogan: "Don't just visit Sreemangal. Ride it.",
  url: siteUrl,
  founder: {
    "@type": "Person",
    name: "Radiyan Hossen",
    jobTitle: "Founder & Owner",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jalalia Road",
    addressLocality: "Sreemangal",
    addressRegion: "Moulvibazar, Sylhet",
    postalCode: "3210",
    addressCountry: "BD",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Load CMS-managed content once per request; every client component below
  // reads it through useSiteConfig(). Contact details come from the DB when
  // available, otherwise the verified launch values are used.
  const [config, home] = await Promise.all([getSiteConfig(), getHomeContent()]);
  const jsonLdFull = {
    ...jsonLd,
    telephone: config.phoneIntl,
    email: config.email,
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.coords.lat,
      longitude: config.coords.lng,
    },
    hasMap: config.mapsUrl,
    sameAs: [config.facebook, config.youtube.watchUrl, config.mapsUrl],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebas.variable} ${dmSans.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFull) }}
        />
        <SiteConfigProvider config={config} home={home}>
          <IntroReveal />
          <div aria-hidden="true" className="grain-overlay" />
          {children}
        </SiteConfigProvider>
        <Toaster />
      </body>
    </html>
  );
}
