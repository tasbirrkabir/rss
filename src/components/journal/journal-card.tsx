import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { JournalArticle } from "@/data/journal";
import { Reveal } from "@/components/site/reveal";

type JournalCardProps = {
  article: JournalArticle;
  delay?: number;
};

/**
 * Field note card for the journal grid. Hover: lift + hard shadow grow.
 */
export function JournalCard({ article, delay = 0 }: JournalCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col border-2 border-ink bg-paper shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-hard-lg">
        <Link
          href={`/journal/${article.slug}`}
          aria-hidden="true"
          tabIndex={-1}
          className="relative block aspect-[4/3] overflow-hidden border-b-2 border-ink"
        >
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <p className="label-micro text-brand">{article.category}</p>
          <h3 className="mt-2 font-display text-3xl leading-[0.95] tracking-wide text-ink">
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
              className="label-micro mt-3 inline-flex items-center gap-1.5 text-ink underline-offset-4 transition-colors hover:text-brand hover:underline"
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
    </Reveal>
  );
}
