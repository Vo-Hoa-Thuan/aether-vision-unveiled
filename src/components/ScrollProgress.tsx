import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin scroll progress indicator at the top of the viewport.
 * Matches the aurora gradient palette.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #6D5EF5 0%, #00D9FF 50%, #A855F7 100%)",
        boxShadow: "0 0 12px rgba(109,94,245,0.6), 0 0 24px rgba(0,217,255,0.3)",
      }}
    />
  );
}
