import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

const STEPS = [
  { n: "01", label: "CHOOSE" },
  { n: "02", label: "BOOK" },
  { n: "03", label: "PICK UP" },
  { n: "04", label: "RIDE" },
  { n: "05", label: "RETURN" },
] as const;

/**
 * Compact 5-step process strip linking to the full How It Works page.
 * (Full process section lives on /how-it-works - another component owns it.)
 */
export function ProcessStrip() {
  return (
    <section aria-labelledby="process-heading" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2
            id="process-heading"
            className="sr-only"
          >
            How renting works
          </h2>
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="border-2 border-ink bg-paper p-4 shadow-hard-sm"
              >
                <p className="font-display text-3xl leading-none text-brand">
                  {s.n}
                </p>
                <p className="mt-2 font-display text-2xl leading-none tracking-wide text-ink">
                  {s.label}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="label-micro text-steel">
              BOOKING BY REQUEST · CONFIRMED PERSONALLY · NO ONLINE PAYMENT
              REQUIRED
            </p>
            <Link
              href="/how-it-works"
              className="label-micro inline-flex items-center gap-2 border-2 border-ink bg-cream px-4 py-3 text-ink shadow-hard-sm transition-all hover:-translate-y-0.5 hover:text-brand hover:shadow-hard"
            >
              SEE HOW IT WORKS{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
