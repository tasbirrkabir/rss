"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { Reveal } from "@/components/site/reveal";

type Stage = {
  word: string;
  image: string;
  alt: string;
  outlined: boolean;
  /** Stage lifetime in scroll progress (used for the slow zoom). */
  range: [number, number];
  /** Opacity keyframes - short ranges, duration-free. */
  fadeInput: number[];
  fadeOutput: number[];
};

const STAGES: Stage[] = [
  {
    word: "TEA",
    image: "/images/dest-tea-gardens.png",
    alt: "Rolling green tea garden rows in Sreemangal",
    outlined: false,
    range: [0, 0.22],
    fadeInput: [0, 0.18, 0.22],
    fadeOutput: [1, 1, 0],
  },
  {
    word: "FOREST",
    image: "/images/dest-lawachara.png",
    alt: "Sunlit rainforest trail inside Lawachara National Park",
    outlined: true,
    range: [0.18, 0.44],
    fadeInput: [0.18, 0.22, 0.4, 0.44],
    fadeOutput: [0, 1, 1, 0],
  },
  {
    word: "ROAD",
    image: "/images/story-road.png",
    alt: "Open rural road stretching ahead through the greenery",
    outlined: false,
    range: [0.4, 0.62],
    fadeInput: [0.4, 0.44, 0.58, 0.62],
    fadeOutput: [0, 1, 1, 0],
  },
  {
    word: "FREEDOM",
    image: "/images/story-freedom.png",
    alt: "Rider on a scooty against a wide sunset sky",
    outlined: true,
    range: [0.58, 0.84],
    fadeInput: [0.58, 0.62, 0.8, 0.84],
    fadeOutput: [0, 1, 1, 0],
  },
];

function StageLayer({
  stage,
  progress,
}: {
  stage: Stage;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, stage.fadeInput, stage.fadeOutput);
  const scale = useTransform(
    progress,
    [stage.range[0], stage.range[1]],
    [1.04, 1.1],
  );

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <motion.div style={{ scale }} className="relative h-full w-full">
        <Image
          src={stage.image}
          alt={stage.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-ink/25"
          aria-hidden="true"
        />
        <p
          className={`absolute inset-0 flex items-center justify-center font-display text-[clamp(90px,20vw,280px)] leading-none tracking-wide ${
            stage.outlined ? "text-outline-cream" : "text-cream"
          }`}
        >
          {stage.word}
        </p>
      </motion.div>
    </motion.div>
  );
}

/**
 * Cinematic scroll story - four full-bleed stages crossfade while the user
 * scrolls a tall sticky section, ending on "YOUR TURN." + booking CTA.
 * Reduced motion: renders a static 2x2 grid instead.
 */
export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const finalOpacity = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);
  const finalPointer = useTransform(
    scrollYProgress,
    [0.8, 0.85],
    ["none", "auto"],
  );

  if (reduceMotion) {
    return (
      <section
        id="the-story"
        aria-labelledby="story-heading"
        className="border-y-2 border-ink bg-ink py-20 text-cream md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="label-micro text-brand">THE STORY</p>
            <h2
              id="story-heading"
              className="mt-2 font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-cream"
            >
              TEA. FOREST. ROAD. <span className="text-brand">FREEDOM.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {STAGES.map((s) => (
              <figure
                key={s.word}
                className="relative aspect-[4/3] overflow-hidden border-2 border-cream/40"
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <figcaption
                  className={`absolute inset-0 flex items-end p-4 font-display text-5xl tracking-wide ${
                    s.outlined ? "text-outline-cream" : "text-cream"
                  }`}
                >
                  {s.word}
                </figcaption>
              </figure>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-start gap-6 border-2 border-cream/40 p-8">
              <p className="font-display text-[clamp(48px,7vw,96px)] leading-[0.9] text-cream">
                YOUR <span className="text-brand">TURN.</span>
              </p>
              <Link
                href="/book"
                className="inline-flex h-14 items-center border-2 border-cream bg-brand px-8 font-display text-2xl tracking-wider text-white shadow-hard transition-all hover:-translate-y-0.5"
              >
                BOOK A RIDE{" "}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="the-story" aria-label="The ride story" className="relative">
      <div ref={ref} className="relative h-[350vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-ink">
          {STAGES.map((s) => (
            <StageLayer key={s.word} stage={s} progress={scrollYProgress} />
          ))}

          {/* Section marker */}
          <div className="pointer-events-none absolute top-24 left-4 z-10 sm:left-6">
            <p className="label-micro inline-block border-2 border-cream/60 bg-ink/80 px-2 py-1.5 text-cream">
              THE STORY — RIDE THROUGH SREEMANGAL
            </p>
          </div>

          {/* Final CTA stage */}
          <motion.div
            style={{ opacity: finalOpacity, pointerEvents: finalPointer }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-ink px-4 text-center"
            aria-hidden="false"
          >
            <p className="font-display text-[clamp(72px,14vw,200px)] leading-[0.9] text-cream">
              YOUR <span className="text-brand">TURN.</span>
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex h-16 items-center border-2 border-cream bg-brand px-10 font-display text-3xl tracking-wider text-white shadow-hard transition-all hover:-translate-y-0.5"
            >
              BOOK A RIDE{" "}
              <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
