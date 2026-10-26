import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { StoreProvider } from "@/components/store";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import MobileBar from "@/components/chrome/MobileBar";
import MiniCart from "@/components/chrome/MiniCart";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", weight: ["300", "400", "500", "600"] });
const pinyon = Pinyon_Script({ subsets: ["latin"], variable: "--font-pinyon", weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://maacwindchimes.com"),
  title: {
    default: "Handmade Collectible Wind Chimes | Maac Wind Chimes, Nebraska",
    template: "%s | Maac Wind Chimes",
  },
  description:
    "Collectible wind chimes handmade in Elkhorn, Nebraska since 1998. Die-cast classic cars, one-of-a-kind designs, real people on the phone.",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Handmade Collectible Wind Chimes | Maac Wind Chimes",
    description:
      "The sound of a memory. Handmade collectible wind chimes from Elkhorn, Nebraska since 1998.",
    images: ["/images/lifestyle/hero-porch.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // pinch-zoom intentionally left enabled for accessibility
  themeColor: "#faf6ef",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${pinyon.variable}`}>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-espresso focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <StoreProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
          <MiniCart />
        </StoreProvider>
      </body>
    </html>
  );
}
