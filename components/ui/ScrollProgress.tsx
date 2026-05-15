"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 100 : 70,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent">
      <motion.div
        className="h-full origin-left bg-[linear-gradient(90deg,var(--accent),var(--secondary))] shadow-[0_0_18px_rgba(214,168,79,0.22)]"
        style={{ scaleX }}
      />
    </div>
  );
}
