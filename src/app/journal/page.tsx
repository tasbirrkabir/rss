import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { PageHeader } from "@/components/site/page-header";
import { JournalFeatured } from "@/components/journal/journal-featured";
import { JournalCard } from "@/components/journal/journal-card";
import { StaggerGroup } from "@/components/site/reveal";
import { JOURNAL_ARTICLES, JOURNAL_NOTE } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal — The Sreemangal Field Notes | Demo Scooty Rental",
  description:
    "Field guides, routes and honest opinions from the tea capital of Bangladesh — one-day plans, garden road strategies and the scooty-vs-CNG debate.",
};

export default function JournalPage() {
  const [featured, ...rest] = JOURNAL_ARTICLES;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          kicker="THE SREEMANGAL FIELD NOTES"
          title={
            <>
              NOTES FROM
              <br />
              THE ROAD.
            </>
          }
          intro="Field guides, routes and honest opinions from the tea capital — written between rides, not in an office."
          meta={["NEW NOTES MONTHLY (DEMO)"]}
        />

        <section aria-labelledby="journal-heading" className="bg-cream">
          <h2 id="journal-heading" className="sr-only">
            Latest field notes
          </h2>

          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
            {/* Featured note */}
            <JournalFeatured article={featured} />

            {/* The rest of the notes */}
            <StaggerGroup className="mt-14 grid gap-6 rule-soft pt-14 sm:grid-cols-2 lg:grid-cols-3 md:mt-20 md:pt-20">
              {rest.map((a) => (
                <JournalCard key={a.slug} article={a} />
              ))}
            </StaggerGroup>
          </div>
        </section>

        <p
          className="label-micro border-t border-ink/10 bg-cream px-4 py-4 text-center leading-relaxed text-steel sm:px-6"
          role="note"
        >
          {JOURNAL_NOTE}
        </p>

        {/* CTA band */}
        <section
          aria-label="Book a ride"
          className="band-ink py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <p className="label-micro text-brand">AFTER THE NOTES</p>
            <h2 className="display-1 mt-3 text-cream">
              DON&apos;T JUST READ.
              <br />
              RIDE IT.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/80">
              Every note on this page started as a ride. Book a scooty and go
              write your own.
            </p>
            <Link
              href="/book"
              className="btn-base btn-red group mt-8"
            >
              BOOK YOUR RIDE
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
