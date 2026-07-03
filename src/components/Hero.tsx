import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import glasses from "@/assets/glasses-hero.webp";
import { useTranslation } from "@/lib/i18n";

export function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen overflow-hidden pt-28 pb-0">
      {/* Layered aurora */}
      <div className="aurora" />
      <div className="aurora opacity-50" style={{ animationDelay: "2s", filter: "blur(80px) hue-rotate(20deg)" }} />

      {/* Noise texture */}
      <div className="noise" />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_80%_60%_at_center,black,transparent)]" />

      {/* Animated blobs */}
      <motion.div
        className="absolute top-20 -left-32 h-[500px] w-[500px] rounded-full bg-[#6D5EF5]/25 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 -right-32 h-[400px] w-[400px] rounded-full bg-[#00D9FF]/18 blur-[90px]"
        animate={{ x: [0, -35, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[700px] rounded-full bg-[#A855F7]/15 blur-[100px]"
        animate={{ scaleX: [1, 1.15, 1], scaleY: [1, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="badge-pill mb-8 mx-auto hover-border-glow hover:shadow-lg transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#6D5EF5]" />
          {t("hero.badge")}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center"
        >
          {t("hero.title_1")}{" "}
          <span className="block mt-1 sm:mt-2 text-gradient-aurora pb-2 pr-4">{t("hero.title_2")}</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-8 max-w-xl mx-auto text-center text-[1.0625rem] sm:text-[1.125rem] text-text-muted leading-relaxed"
        >
          {t("hero.subtitle")}
          <span className="text-text-main font-medium">{t("hero.subtitle_highlight")}</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#features" className="btn-primary group text-[0.9375rem]">
            Explore Features
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
          <a href="#demo" className="btn-ghost text-[0.9375rem]">
            <div className="h-7 w-7 rounded-full border border-border-20 grid place-items-center -ml-1">
              <Play className="h-3 w-3 fill-text-main ml-0.5" />
            </div>
            {t("hero.watch_demo")}
          </a>
        </motion.div>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 sm:mt-20"
        >
          {/* Multi-layer glow */}
          <div className="absolute inset-x-0 -top-24 mx-auto h-[500px] w-[85%] rounded-full bg-[#6D5EF5]/35 blur-[130px] pointer-events-none" />
          <div className="absolute inset-x-0 -top-10 mx-auto h-[350px] w-[65%] rounded-full bg-[#00D9FF]/25 blur-[100px] pointer-events-none" />
          <div className="absolute inset-x-0 top-20 mx-auto h-[200px] w-[50%] rounded-full bg-[#A855F7]/20 blur-[80px] pointer-events-none" />

          {/* Floating product */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <img
              src={glasses}
              alt="AETHER Vision AI Smart Glasses"
              width={1536}
              height={1024}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="relative mx-auto w-full max-w-4xl drop-shadow-[0_40px_100px_rgba(109,94,245,0.55)]"
              style={{ filter: "drop-shadow(0 0 80px rgba(0,217,255,0.2))" }}
            />
          </motion.div>

          {/* Reflection */}
          <div className="mx-auto -mt-12 h-36 w-3/4 reveal-mask opacity-20 blur-sm pointer-events-none">
            <img
              src={glasses}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="w-full -scale-y-100"
            />
          </div>

          {/* Floating stat pills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 glass-card rounded-2xl px-4 py-3 border border-border-10"
          >
            <div className="text-xs text-text-muted mb-1">{t("hero.weight")}</div>
            <div className="font-display text-2xl font-semibold text-gradient-aurora">38g</div>
            <div className="text-xs text-text-muted/60 mt-0.5">{t("hero.titanium_frame")}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="hidden lg:block absolute right-8 top-1/3 glass-card rounded-2xl px-4 py-3 border border-border-10"
          >
            <div className="text-xs text-text-muted mb-1">{t("hero.battery")}</div>
            <div className="font-display text-2xl font-semibold text-gradient-aurora">16h</div>
            <div className="text-xs text-text-muted/60 mt-0.5">{t("hero.all_day_use")}</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted/50">{t("hero.scroll")}</span>
        <div className="h-10 w-6 rounded-full border border-border-15 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-[#6D5EF5] to-[#00D9FF]"
          />
        </div>
      </motion.div>
    </section>
  );
}
