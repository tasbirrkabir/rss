import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { MarqueeStrip } from "@/components/site/marquee-strip";
import { BrandValue } from "@/components/site/brand-value";
import { Fleet } from "@/components/site/fleet";
import { Explore } from "@/components/site/explore";
import { RoutePlanner } from "@/components/site/route-planner";
import { HowItWorks } from "@/components/site/how-it-works";
import { SocialProof } from "@/components/site/social-proof";
import { About } from "@/components/site/about";
import { BookingSection } from "@/components/site/booking-section";
import { LocationSection } from "@/components/site/location-section";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { BookingOverlay } from "@/components/site/booking-overlay";

/**
 * Red Scooty Sreemangal - demo v1 (PRD section 36):
 * HERO -> WHY -> FLEET -> EXPLORE -> PLANNER -> HOW IT WORKS -> PROOF -> BOOKING -> LOCATION
 * Single-page experience with anchor navigation.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <MarqueeStrip />
        <BrandValue />
        <Fleet />
        <Explore />
        <RoutePlanner />
        <HowItWorks />
        <SocialProof />
        <About />
        <BookingSection />
        <LocationSection />
      </main>
      <Footer />
      <MobileCtaBar />
      <BookingOverlay />
    </div>
  );
}
