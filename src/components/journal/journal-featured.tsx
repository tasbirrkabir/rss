import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { JournalArticle } from "@/data/journal";
import { DemoBadge } from "@/components/site/demo-badge";
import { Reveal } from "@/components/site/reveal";

/**
 * Featured field note: large split layout with the image left,
 * editorial content right. Links into /journal/[slug].
 */
export function JournalFeatured({ article }: { article: JournalArticle }) {
  return (
    <Reveal>
      <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <Link
          href={`/journal/${article.slug}`}
          aria-label={article.title}
          className="relative block lg:col-span-7"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="relative aspect-[7/4] border-2 border-ink bg-paper shadow-hard-lg transition-transform duration-200 group-hover:-translate-y-1">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="object-cover"
            />
          </div>
        </Link>

        <div className="flex flex-col items-start lg:col-span-5">
          <p className="label-micro text-brand">{article.category}</p>
          <h2 className="mt-3 font-display text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-wide text-ink">
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
            className="mt-7 inline-flex h-12 items-center gap-2 border-2 border-ink bg-ink px-5 font-display text-xl tracking-wider text-cream transition-all hover:-translate-y-0.5 hover:bg-brand hover:text-white hover:shadow-hard-red-sm active:translate-y-0"
          >
            READ THE NOTE
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
