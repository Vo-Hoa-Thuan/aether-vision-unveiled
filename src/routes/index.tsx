import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { FutureOfVision } from "@/components/FutureOfVision";
import { Features } from "@/components/Features";
const ProductShowcase = lazy(() => import("@/components/ProductShowcase").then(m => ({ default: m.ProductShowcase })));
import { Specifications } from "@/components/Specifications";
const Gallery = lazy(() => import("@/components/Gallery").then(m => ({ default: m.Gallery })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const Newsletter = lazy(() => import("@/components/Newsletter").then(m => ({ default: m.Newsletter })));
import { Footer } from "@/components/Footer";
const ChatWidget = lazy(() => import("@/components/ChatWidget").then(m => ({ default: m.ChatWidget })));
import { ScrollProgress } from "@/components/ScrollProgress";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { useScrollTracker, useClickTracker } from "@/hooks/useTracking";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "AETHER Vision — See Beyond Reality" },
      {
        name: "description",
        content:
          "AETHER Vision AI Smart Glasses. Real-time translation, AI assistant, navigation, HD camera, and AR — in a 38-gram titanium frame.",
      },
      { property: "og:title", content: "AETHER Vision — See Beyond Reality" },
      {
        property: "og:description",
        content:
          "AI-powered smart glasses. Real-time translation, navigation, AR — one elegant wearable.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
} as never));

function Landing() {
  const [loading, setLoading] = useState(true);

  // Activate tracking hooks
  useScrollTracker();
  useClickTracker();

  // Simulate initial load with skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[200]"
          >
            <SkeletonLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className="relative text-text-main min-h-screen overflow-x-hidden"
        style={{ background: "var(--bg-base)" }}
      >
        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Global ambient radial gradient */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(109,94,245,0.12) 0%, transparent 70%), radial-gradient(ellipse 80% 50% at 80% 100%, rgba(0,217,255,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <Navbar />
          <Hero />
          <TrustedBy />
          <FutureOfVision />
          <Features />
          <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-text-muted">Loading...</div>}>
            <ProductShowcase />
            <Specifications />
            <Gallery />
            <Testimonials />
            <FAQ />
            <Newsletter />
          </Suspense>
          <Footer />
          <Suspense fallback={null}>
            <ChatWidget />
          </Suspense>
        </div>
      </main>
    </>
  );
}
