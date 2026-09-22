import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/reveal";

const STEPS = [
  { n: "01", label: "CHOOSE" },
  { n: "02", label: "BOOK" },
  { n: "03", label: "PICK UP" },
  { n: "04", label: "RIDE" },
  { n: "05", label: "RETURN" },
] as const;

/**
 * Compact 5-step process strip linking to the full How It Works page.
 * (Full process section lives on /how-it-works — another component owns it.)
 */
export function ProcessStrip() {
  return (
    <section aria-labelledby="process-heading" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 id="process-heading" className="sr-only">
          How renting works
        </h2>
        <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {STEPS.map((s) => (
            <StaggerItem key={s.n}>
              <div className="border-b-2 border-ink/10 bg-transparent px-4 py-4 transition-colors hover:border-brand">
                <p className="font-display text-3xl leading-none text-brand">
                  {s.n}
                </p>
                <p className="mt-2 font-display text-2xl leading-none tracking-wide text-ink">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="label-micro text-steel">
            BOOKING BY REQUEST · CONFIRMED PERSONALLY · NO ONLINE PAYMENT
            REQUIRED
          </p>
          <Link
            href="/how-it-works"
            className="link-underline label-micro inline-flex items-center gap-2 self-start text-ink hover:text-brand md:self-auto"
          >
            SEE HOW IT WORKS
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
