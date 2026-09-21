"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition shell (brief: page transition microinteraction).
 * template.tsx remounts this wrapper on every navigation, so the
 * animation stays subtle and fast - never a blocking screen.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
