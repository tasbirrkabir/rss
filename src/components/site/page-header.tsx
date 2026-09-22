import { Reveal } from "@/components/site/reveal";

type PageHeaderProps = {
  kicker: string;
  title: React.ReactNode;
  intro?: string;
  meta?: string[];
};

/**
 * Shared editorial page header for all interior pages.
 * Kicker rule, oversized display title, optional intro paragraph
 * and a micro meta strip — kept quiet so content leads.
 */
export function PageHeader({ kicker, title, intro, meta }: PageHeaderProps) {
  return (
    <header className="rule-soft bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-brand" aria-hidden="true" />
            <p className="label-micro text-brand">{kicker}</p>
          </div>
          <h1 className="mt-4 max-w-5xl font-display text-[clamp(46px,7.5vw,110px)] leading-[0.92] text-ink">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
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
