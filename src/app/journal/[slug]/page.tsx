import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";
import { DESTINATIONS, type Destination } from "@/data/destinations";
import { JOURNAL_ARTICLES, JOURNAL_NOTE, findArticle } from "@/data/journal";
import { findRoute } from "@/data/ride-routes";
import { cn } from "@/lib/utils";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Demo Scooty Field Notes`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function JournalArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const route = findRoute(article.relatedRoute);
  const relatedDestinations = article.relatedDestinations
    .map((destSlug) => DESTINATIONS.find((d) => d.slug === destSlug))
    .filter((d): d is Destination => Boolean(d));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { "@type": "Organization", name: "Demo Scooty Rental" },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section
          aria-labelledby="article-heading"
          className="border-b border-ink/10 bg-cream"
        >
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
            <Reveal>
              <Link
                href="/journal"
                className="label-micro link-underline inline-flex w-fit items-center gap-2 text-ink transition-colors hover:text-brand"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                ALL NOTES
              </Link>

              <div className="img-frame relative mt-8 aspect-[7/4] md:aspect-[2/1]">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="label-micro inline-flex border border-ink/15 bg-paper px-2.5 py-1.5 text-ink">
                  {article.category}
                </span>
                <span className="label-micro text-steel">
                  {article.dateDisplay}
                </span>
                <span className="label-micro text-steel">
                  {article.readTime}
                </span>
                <DemoBadge>DEMO CONTENT</DemoBadge>
              </div>

              <h1
                id="article-heading"
                className="display-hero mt-4 max-w-5xl text-ink"
              >
                {article.title}
              </h1>
            </Reveal>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        {/* Body */}
        <section aria-label="Article body" className="bg-cream pb-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 md:pt-16">
            {article.content.map((block, bi) => (
              <div key={bi} className="mt-10 first:mt-0 md:mt-14">
                {block.heading ? (
                  <h2 className="flex items-center gap-3 font-display text-3xl leading-tight tracking-wide text-ink md:text-4xl">
                    <span
                      className="h-0.5 w-8 shrink-0 bg-brand"
                      aria-hidden="true"
                    />
                    {block.heading}
                  </h2>
                ) : null}
                <div className={cn("space-y-5", block.heading && "mt-5")}>
                  {block.paragraphs.map((p, pi) => {
                    // Drop-cap treatment on the article's very first paragraph only.
                    const isLead = bi === 0 && pi === 0;
                    return (
                      <p
                        key={pi}
                        className={cn(
                          "leading-relaxed text-ink-soft",
                          isLead
                            ? "text-lg md:text-xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-brand md:first-letter:text-7xl"
                            : "text-[17px]",
                        )}
                      >
                        {p}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* End band: GO RIDE IT */}
        <section
          aria-label="Ride this story"
          className="band-ink py-16 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="label-micro text-brand">GO RIDE IT</p>
                <h2 className="display-1 mt-2 text-cream">
                  {route ? <>RIDE {route.title}</> : "READY TO RIDE?"}
                </h2>
                <p className="mt-3 max-w-lg leading-relaxed text-cream/80">
                  {route
                    ? `${route.character} Request it with your date and we'll help you shape the day.`
                    : "Tell us your date and we'll help you plan the ride."}
                </p>
              </div>
              <Link
                href={route ? `/book?route=${route.id}` : "/book"}
                className="btn-base btn-red group shrink-0"
              >
                {route ? "BOOK THIS RIDE" : "BOOK A RIDE"}
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {relatedDestinations.length > 0 ? (
              <div className="mt-12 border-t border-cream/15 pt-8">
                <p className="label-micro text-cream/60">PLACES IN THIS NOTE</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {relatedDestinations.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href="/explore"
                        className="label-micro inline-flex items-center gap-1.5 border border-cream/25 px-3 py-2.5 text-cream transition-all hover:border-brand hover:bg-brand hover:text-white"
                        aria-label={`Explore ${d.name} on the explore page`}
                      >
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <p
          className="label-micro border-t border-ink/10 bg-cream px-4 py-4 text-center leading-relaxed text-steel sm:px-6"
          role="note"
        >
          {JOURNAL_NOTE}
        </p>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
