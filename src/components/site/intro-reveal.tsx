"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/components/site/reveal";

const SEEN_KEY = "rs-intro-seen";

/**
 * First-visit branded reveal: the wordmark rises in on ink, holds for a
 * beat, then the whole panel wipes upward into the page. ~1.2s total,
 * once per browser session only — never a loading screen.
 */
export function IntroReveal() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    try {
      if (window.sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      return; // storage unavailable — skip silently
    }
    // Defer past the effect body: content paints first, the overlay covers
    // it within the same frame and wipes away — no blocking splash.
    const raf = window.requestAnimationFrame(() => setShow(true));
    const t = window.setTimeout(() => {
      setShow(false);
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 1150);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          aria-hidden="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <motion.p
            className="overflow-hidden font-display text-[clamp(3rem,10vw,7rem)] leading-none tracking-wide text-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
            >
              RED <span className="text-brand">SCOOTY</span>
            </motion.span>
          </motion.p>
          <motion.span
            className="absolute bottom-10 left-1/2 h-px w-16 -translate-x-1/2 bg-brand"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
