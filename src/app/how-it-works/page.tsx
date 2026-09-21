import type { Metadata } from "next";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { ProcessSteps } from "@/components/how-it-works/process-steps";
import { TrustStrip } from "@/components/how-it-works/trust-strip";
import { HowCtaBand } from "@/components/how-it-works/cta-band";

export const metadata: Metadata = {
  title: "How It Works — Book, Pick Up, Ride | Red Scooty Sreemangal",
  description:
    "Request, confirm, pick up, ride, return. Booking a Red Scooty scooty in Sreemangal takes under a minute — no payment, no account, and every detail is confirmed personally.",
};

/**
 * /how-it-works — five full-height editorial steps, a trust strip and the
 * booking CTA. Process facts only; deposit/documents stay demo-labelled.
 */
export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          kicker="THE PROCESS"
          title={
            <>
              FIVE STEPS.
              <br />
              ZERO FRICTION.
            </>
          }
          intro="From request to road in five honest steps. You send the details, Red Scooty confirms personally — no payment, no account, no surprises."
        />
        <ProcessSteps />
        <TrustStrip />
        <HowCtaBand />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
