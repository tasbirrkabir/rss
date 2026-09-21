import { Reveal } from "@/components/site/reveal";

type PageHeaderProps = {
  kicker: string;
  title: React.ReactNode;
  intro?: string;
  meta?: string[];
};

/**
 * Shared editorial page header for all interior pages.
 * Keeps the multi-page system visually coherent: kicker rule, oversized
 * display title, optional intro paragraph and a micro meta strip.
 */
export function PageHeader({ kicker, title, intro, meta }: PageHeaderProps) {
  return (
    <header className="border-b-2 border-ink bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-10 bg-brand" aria-hidden="true" />
            <p className="label-micro text-brand">{kicker}</p>
          </div>
          <h1 className="mt-4 font-display text-[clamp(52px,8.5vw,120px)] leading-[0.9] text-ink">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 max-w-2xl text-base text-ink-soft sm:text-lg">
              {intro}
            </p>
          ) : null}
          {meta?.length ? (
            <p className="label-micro mt-6 flex flex-wrap gap-x-4 gap-y-2 text-steel">
              {meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </p>
          ) : null}
        </Reveal>
      </div>
    </header>
  );
}
