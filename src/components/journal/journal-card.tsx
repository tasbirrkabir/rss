import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { JournalArticle } from "@/data/journal";
import { StaggerItem } from "@/components/site/reveal";

type JournalCardProps = {
  article: JournalArticle;
};

/**
 * Field note card for the journal grid. Card-soft surface, quiet chip
 * category, subtle hover lift (≤6px) and a gentle image zoom.
 */
export function JournalCard({ article }: JournalCardProps) {
  return (
    <StaggerItem className="h-full">
      <article className="card-soft group flex h-full flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
        <Link
          href={`/journal/${article.slug}`}
          aria-hidden="true"
          tabIndex={-1}
          className="relative block aspect-[4/3] overflow-hidden border-b border-ink/10"
        >
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="label-micro inline-flex w-fit border border-ink/15 px-2 py-1 text-steel">
            {article.category}
          </p>
          <h3 className="display-3 mt-3 text-ink">
            <Link
              href={`/journal/${article.slug}`}
              className="transition-colors hover:text-brand"
            >
              {article.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
            {article.excerpt}
          </p>

          <div className="mt-auto pt-4">
            <p className="label-micro text-steel">
              {article.dateDisplay} · {article.readTime}
            </p>
            <Link
              href={`/journal/${article.slug}`}
              className="label-micro link-underline mt-3 inline-flex w-fit items-center gap-1.5 text-ink transition-colors hover:text-brand"
              aria-label={`Read the note: ${article.title}`}
            >
              READ
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}
