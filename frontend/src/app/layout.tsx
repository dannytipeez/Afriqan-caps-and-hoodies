import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://afriqan-caps-and-hoodies.onrender.com"),
  title: {
    default: "Afriqan Caps and Hoodies® | The Daily Rotation",
    template: "%s | Afriqan Caps and Hoodies®",
  },
  description:
    "Afriqan Caps and Hoodies: Considered daily essentials. Heavyweight 460 GSM organic cotton hoodies and premium 6-panel embroidered streetwear caps. Worldwide and US shipping.",
  keywords: [
    "Afriqan caps",
    "Afriqan hoodies",
    "heavyweight hoodie",
    "460 GSM cotton hoodie",
    "streetwear caps",
    "luxury minimalist apparel",
    "organic cotton essentials",
  ],
  authors: [{ name: "Afriqan Studio", url: "https://afriqan.studio" }],
  openGraph: {
    title: "Afriqan Caps and Hoodies® | Considered Essentials",
    description: "Considered essentials. Nothing more, nothing less. Luxury heavyweight hoodies & caps.",
    url: "https://afriqan-caps-and-hoodies.onrender.com",
    siteName: "Afriqan Caps & Hoodies",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Afriqan Caps and Hoodies Core Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afriqan Caps and Hoodies®",
    description: "Considered essentials. Heavyweight 460 GSM hoodies and bespoke caps.",
    images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://afriqan-caps-and-hoodies.onrender.com",
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Los Angeles",
    "geo.position": "34.0522;-118.2437",
    "ICBM": "34.0522, -118.2437",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data Schema for Search Engines (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Afriqan Caps and Hoodies",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
    description: "Premium e-commerce boutique specializing in luxury heavyweight hoodies and bespoke embroidered caps.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "128 Sunset Avenue",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90026",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "34.0522",
      longitude: "-118.2437",
    },
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Apple Pay, PayPal",
    priceRange: "$38 - $120",
    url: "https://afriqan-caps-and-hoodies.onrender.com",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Core Essentials Vol. 01",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "The Heavyweight Hoodie",
            category: "Hoodies",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "The Afriqan Signature Cap",
            category: "Caps",
          },
        },
      ],
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#121212] selection:bg-[#D2DB6B] selection:text-black">
        <CartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
