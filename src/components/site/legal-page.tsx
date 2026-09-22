import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { SITE } from "@/data/site";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";

export type LegalSection = {
  heading: string;
  /** Each string is one paragraph. */
  body: string[];
  /** Optional short bullet list under the paragraphs. */
  bullets?: string[];
};

type LegalPageProps = {
  kicker: string;
  title: React.ReactNode;
  intro: string;
  updated: string;
  sections: LegalSection[];
  /** Small print under the sections (e.g. demo-stage note). */
  footnote?: string;
};

/**
 * Shared layout for the legal pages (privacy / refund / terms).
 * Premium editorial prose — readable measure, quiet rules, no legalese wall.
 */
export function LegalPage({
  kicker,
  title,
  intro,
  updated,
  sections,
  footnote,
}: LegalPageProps) {
  return (
    <>
      <PageHeader kicker={kicker} title={title} intro={intro} meta={[`LAST UPDATED · ${updated}`]} />

      <section aria-label="Policy content" className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={Math.min(i * 0.04, 0.2)}>
              <div className={i > 0 ? "mt-12 border-t border-ink/10 pt-10" : ""}>
                <h2 className="font-display text-3xl tracking-wide text-ink md:text-4xl">
                  <span className="mr-3 text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 text-base leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
                {s.bullets?.length ? (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b.slice(0, 40)}
                        className="flex items-start gap-2.5 text-base leading-relaxed text-ink-soft"
                      >
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}

          {footnote ? (
            <Reveal delay={0.1}>
              <p className="mt-14 border-l-2 border-brand/70 bg-cream p-5 text-sm leading-relaxed text-steel">
                {footnote}
              </p>
            </Reveal>
          ) : null}

          {/* Contact strip */}
          <Reveal delay={0.12}>
            <div className="mt-14 card-soft flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="label-micro text-brand">QUESTIONS ABOUT THIS POLICY?</p>
                <p className="mt-1.5 font-display text-2xl tracking-wide text-ink">
                  TALK TO A PERSON, NOT A BOT.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={SITE.telUrl} className="btn-base btn-outline">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {SITE.phoneDisplay}
                </a>
                <a href={`mailto:${SITE.email}`} className="btn-base btn-outline">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  EMAIL
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-10 text-center">
              <Link
                href="/"
                className="link-underline label-micro inline-flex items-center gap-1.5 text-ink transition-colors hover:text-brand"
              >
                BACK TO THE ROAD
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
