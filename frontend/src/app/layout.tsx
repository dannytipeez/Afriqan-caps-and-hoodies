import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://afriqan-caps-and-hoodies.onrender.com"),
  title: {
    default: "Afriqan Caps and Hoodies® Kenya | Premium Streetwear in Nairobi",
    template: "%s | Afriqan Caps and Hoodies® Kenya",
  },
  description:
    "Buy premium heavyweight 460 GSM cotton hoodies & streetwear caps in Kenya. Custom DTF/screen printing add-on for only KES 500. Same-day & next-day delivery in Nairobi, Mombasa, Kisumu, Nakuru, and countrywide. Pay conveniently via Lipa na M-Pesa Buy Goods Till 4466556 or Cash on Delivery.",
  keywords: [
    "hoodies kenya",
    "caps kenya",
    "hoodies in nairobi",
    "streetwear kenya",
    "custom hoodies nairobi",
    "custom hoodie printing kenya",
    "plain hoodies kenya",
    "heavyweight hoodie kenya",
    "460 gsm hoodie kenya",
    "lipa na mpesa till 4466556",
    "cash on delivery hoodies nairobi",
    "afriqan tees and caps hub",
    "snapbacks nairobi",
  ],
  authors: [{ name: "Afriqan Tees and Caps Hub Kenya", url: "https://afriqan-caps-and-hoodies.onrender.com" }],
  openGraph: {
    title: "Afriqan Caps and Hoodies® Kenya | Heavyweight Hoodies & Caps in KES",
    description: "Considered Kenyan streetwear essentials. Heavyweight 460 GSM hoodies with custom printing add-on (+KES 500). Lipa na M-Pesa & Cash on Delivery.",
    url: "https://afriqan-caps-and-hoodies.onrender.com",
    siteName: "Afriqan Caps & Hoodies Kenya",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Afriqan Caps and Hoodies Kenya Streetwear Collection",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afriqan Caps and Hoodies® Kenya",
    description: "Kenya's premier heavyweight hoodies & streetwear caps. Lipa na M-Pesa Till 4466556.",
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
    "geo.region": "KE-30", // Nairobi County, Kenya
    "geo.placename": "Nairobi, Kenya",
    "geo.position": "-1.2921;36.8219", // Nairobi coordinates
    "ICBM": "-1.2921, 36.8219",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data Schema for Search Engines (JSON-LD) localized for Nairobi, Kenya
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Afriqan Caps and Hoodies Hub Kenya",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
    description: "Leading clothing boutique in Nairobi, Kenya providing luxury heavyweight plain and custom printed hoodies, caps, and streetwear. Lipa na M-Pesa Till 4466556.",
    telephone: "+254712345678",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Wood Avenue, Kilimani / Westlands Commercial Hub",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-1.2921",
      longitude: "36.8219",
    },
    currenciesAccepted: "KES",
    paymentAccepted: "M-Pesa, Cash on Delivery",
    priceRange: "KES 1500 - KES 4500",
    url: "https://afriqan-caps-and-hoodies.onrender.com",
    openingHours: "Mo-Sa 08:00-19:00",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Kenyan Streetwear Collection",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "The Heavyweight Hoodie",
            category: "Hoodies",
            price: "3500",
            priceCurrency: "KES",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "The Afriqan Signature Cap",
            category: "Caps",
            price: "1500",
            priceCurrency: "KES",
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
      <body className="min-h-screen flex flex-col bg-[#FAF8FF] dark:bg-[#0C0A14] text-[#0F0E17] dark:text-[#FAF8FF] selection:bg-purple-200 selection:text-purple-900">
        <FavoritesProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
