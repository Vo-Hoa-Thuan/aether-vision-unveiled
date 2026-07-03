import { motion } from "motion/react";

/**
 * Premium skeleton loader matching the AETHER design system.
 * Displays a full-page skeleton that dissolves into the real content.
 */
export function SkeletonLoader() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Nav skeleton */}
      <div className="fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-2.5">
          <Bone className="h-9 w-9 rounded-xl" />
          <Bone className="h-5 w-24 rounded-lg" />
        </div>
        <div className="hidden md:flex items-center gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Bone key={i} className="h-4 w-16 rounded-full" />
          ))}
        </div>
        <Bone className="h-10 w-32 rounded-full" />
      </div>

      {/* Hero skeleton */}
      <div className="pt-40 pb-20 flex flex-col items-center gap-6 px-4">
        <Bone className="h-7 w-52 rounded-full" />
        <Bone className="h-16 w-[min(80vw,700px)] rounded-2xl" />
        <Bone className="h-10 w-[min(70vw,500px)] rounded-2xl" />
        <div className="flex gap-3 mt-4">
          <Bone className="h-5 w-80 rounded-lg" />
        </div>
        <div className="flex gap-4 mt-6">
          <Bone className="h-12 w-40 rounded-full" />
          <Bone className="h-12 w-36 rounded-full" />
        </div>

        {/* Product image skeleton */}
        <div className="mt-16 w-full max-w-3xl">
          <Bone className="h-[350px] w-full rounded-3xl" />
        </div>
      </div>

      {/* Section skeletons */}
      <div className="max-w-7xl mx-auto px-4 space-y-32 pb-20">
        {/* Trusted by */}
        <div className="flex flex-col items-center gap-6">
          <Bone className="h-3 w-48 rounded-full" />
          <div className="flex gap-10 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <Bone key={i} className="h-6 w-24 rounded-lg shrink-0" />
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <Bone className="h-3 w-28 rounded-full" />
            <Bone className="h-12 w-96 rounded-2xl" />
            <Bone className="h-4 w-72 rounded-lg" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Bone key={i} className="h-56 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bone({ className }: { className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ background: "var(--surface-6)" }}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--surface-10) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s ease-in-out infinite",
        }}
      />
    </motion.div>
  );
}
