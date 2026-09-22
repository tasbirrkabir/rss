import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { JournalArticle } from "@/data/journal";
import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";

/**
 * Featured field note: large split layout — mask-revealed hero image left,
 * editorial content right. Links into /journal/[slug].
 */
export function JournalFeatured({ article }: { article: JournalArticle }) {
  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal variant="mask" className="lg:col-span-7">
        <Link
          href={`/journal/${article.slug}`}
          aria-label={article.title}
          className="relative block"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="img-frame relative aspect-[7/4] overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
      </Reveal>

      <Reveal delay={0.1} className="lg:col-span-5">
        <div className="flex flex-col items-start">
          <p className="label-micro inline-flex border border-ink/15 px-2 py-1 text-steel">
            {article.category}
          </p>
          <h2 className="display-1 mt-4 text-ink">
            <Link
              href={`/journal/${article.slug}`}
              className="transition-colors hover:text-brand"
            >
              {article.title}
            </Link>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
            {article.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label-micro text-steel">
              {article.dateDisplay} · {article.readTime}
            </span>
            <DemoBadge>DEMO</DemoBadge>
          </div>

          <Link
            href={`/journal/${article.slug}`}
            className="btn-base btn-primary group mt-7"
          >
            READ THE NOTE
            <ArrowRight
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
