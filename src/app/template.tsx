"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { EASE_OUT } from "@/components/site/reveal";

/**
 * Route transition shell. template.tsx remounts on every navigation,
 * so each page enters with a fast fade + rise — quick enough to never
 * feel like a blocking screen (~0.45s), with children staggering below.
 */
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : pageVariants}
      initial={reduceMotion ? false : "hidden"}
      animate="shown"
    >
      {children}
    </motion.div>
  );
}
