"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { SITE } from "@/data/site";
import { useSiteConfig } from "@/components/site/site-config-provider";

/**
 * Click-to-play YouTube embed (privacy-enhanced, no cookies until played).
 * The poster is the video's own thumbnail; nothing loads from YouTube
 * until the visitor asks for it. Quiet img-frame; the red play sticker
 * is the single playful accent.
 */
export function VideoBand() {
  const [playing, setPlaying] = useState(false);
  const { config } = useSiteConfig();

  return (
    <div className="img-frame p-3 sm:p-4">
      <div className="relative aspect-video w-full overflow-hidden bg-ink">
        {playing ? (
          <iframe
            src={`${config.youtube.embedUrl}?autoplay=1&rel=0`}
            title={`YouTube video: ${SITE.youtube.titleEn}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${SITE.youtube.titleEn}`}
            className="group absolute inset-0 block h-full w-full cursor-pointer"
          >
            <Image
              src={SITE.youtube.poster}
              alt="Rider on a scooty on a tea garden road in Sreemangal — video thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, 1000px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* darkening for legibility */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/15"
            />
            {/* play sticker — the one accent */}
            <span
              aria-hidden="true"
              className="sticker absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-brand text-white transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24"
            >
              <Play className="ml-1 h-9 w-9 fill-current sm:h-11 sm:w-11" />
            </span>
            <span className="label-micro absolute bottom-3 left-3 bg-ink px-2.5 py-1.5 text-cream">
              YOUTUBE · DEMO SCOOTY
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1 pb-1 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          <span lang="bn" className="font-medium text-ink">
            {SITE.youtube.title}
          </span>
        </p>
        <p className="label-micro shrink-0 text-steel">
          FILMED ON THE ROADS AROUND SREEMANGAL
        </p>
      </div>
    </div>
  );
}
