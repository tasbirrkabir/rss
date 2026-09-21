import { Header } from "@/components/site/header";
import { MarqueeStrip } from "@/components/site/marquee-strip";
import { SocialProof } from "@/components/site/social-proof";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";

import { Hero } from "@/components/home/hero";
import { ScrollRail } from "@/components/home/scroll-rail";
import { BrandIntro } from "@/components/home/brand-intro";
import { ScootyShowcase } from "@/components/home/scooty-showcase";
import { MapSection } from "@/components/home/map-section";
import { BuildYourRide } from "@/components/home/build-your-ride";
import { ScrollStory } from "@/components/home/scroll-story";
import { ProcessStrip } from "@/components/home/process-strip";
import { FinalCta } from "@/components/home/final-cta";

/**
 * Red Scooty Sreemangal - HOME.
 * 01 HERO -> 02 THE RIDE (showcase) -> 03 ROUTES (map + build your ride)
 * -> 04 THE STORY (cinematic scroll) -> trust strip -> proof -> 05 YOUR TURN.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ScrollRail />
      <main className="flex-1">
        <Hero />
        <MarqueeStrip />
        <BrandIntro />
        <ScootyShowcase />
        <MapSection />
        <BuildYourRide />
        <ScrollStory />
        <ProcessStrip />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
