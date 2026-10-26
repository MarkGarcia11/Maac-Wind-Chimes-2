import Hero from "@/components/home/Hero";
import Scrolly from "@/components/home/Scrolly";
import MeetAChime from "@/components/home/MeetAChime";
import {
  TrustStrip,
  Featured,
  ShopByMemory,
  CustomInvite,
  StoryPreview,
  NextEvent,
  Stories,
  WhereElse,
} from "@/components/home/Sections";
import { CursorRipple } from "@/components/motion";
import { getFeatured, getCategories, getNextEvent, getReviews } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featured, categories, nextEvent, reviews] = await Promise.all([
    getFeatured(),
    getCategories(),
    getNextEvent(),
    getReviews(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description:
      "Handmade collectible wind chimes, made in Elkhorn, Nebraska since 1998.",
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.zip,
      addressCountry: "US",
    },
    foundingDate: String(site.since),
    url: "https://maacwindchimes.com",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CursorRipple />
      <Hero />
      <TrustStrip />
      <Featured products={featured} />
      <ShopByMemory categories={categories} />
      <Scrolly />
      <MeetAChime />
      <CustomInvite />
      <StoryPreview />
      {nextEvent && <NextEvent event={nextEvent} />}
      <Stories reviews={reviews} />
      <WhereElse />
    </>
  );
}
