"use client";

import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";

/* Shared easing — snappy, premium, never bouncy except where noted */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_TACTILE = [0.34, 1.56, 0.64, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** "up" (default) | "mask" (clip-path reveal for imagery) | "fade" | "scale" */
  variant?: "up" | "mask" | "fade" | "scale";
  /** Duration in seconds */
  duration?: number;
};

const buildVariants = (
  variant: RevealProps["variant"],
  y: number,
): {
  hidden: TargetAndTransition;
  shown: TargetAndTransition;
} => {
  switch (variant) {
    case "mask":
      // NOTE: the hidden clip keeps a 0.1% visible hairline — a fully
      // zero-area clip-path makes IntersectionObserver report no overlap,
      // which leaves whileInView permanently unfired on some browsers.
      return {
        hidden: { clipPath: "inset(0 0 99.9% 0)" },
        shown: { clipPath: "inset(0 0 0% 0)" },
      };
    case "fade":
      return {
        hidden: { opacity: 0 },
        shown: { opacity: 1 },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.965 },
        shown: { opacity: 1, scale: 1 },
      };
    default:
      return {
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0 },
      };
  }
};

/**
 * Scroll-triggered reveal (the site-wide motion primitive).
 * variant="mask" gives images a cinematic clip-path wipe.
 * Automatically disabled when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  variant = "up",
  duration = 0.55,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const v = buildVariants(variant, y);
  const ease = variant === "mask" ? EASE_OUT : EASE_OUT;

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : v.hidden}
      whileInView={v.shown}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        ease,
        delay: reduceMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container + item for lists/cards entering naturally */
export const staggerContainer: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function StaggerGroup({
  children,
  className,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={reduceMotion ? undefined : staggerContainer}
      initial={reduceMotion ? false : "hidden"}
      whileInView="shown"
      viewport={{ once, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={reduceMotion ? undefined : staggerItem}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  delay = 0,
}: RevealProps) {
  return (
    <Reveal className={cn(className)} delay={delay} y={16}>
      {children}
    </Reveal>
  );
}
