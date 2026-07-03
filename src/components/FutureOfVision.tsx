import { motion } from "motion/react";
import { useTranslation } from "@/lib/i18n";
import detail from "@/assets/glasses-detail.jpg";
import { CheckCircle } from "lucide-react";

const highlights = [
  "future_vision.point_1",
  "future_vision.point_2",
  "future_vision.point_3",
];

export function FutureOfVision() {
  const { t } = useTranslation();
  return (
    <section id="product" className="relative py-36 overflow-hidden">
      {/* Subtle aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-[#6D5EF5]/15 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#00D9FF]/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#00D9FF] mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-[#00D9FF] to-transparent" />
            {t("future_vision.badge")}
          </p>
          <h2 className="font-display text-4xl sm:text-[3.5rem] lg:text-[4rem] font-semibold leading-[1.04] tracking-tight">
            {t("future_vision.title_1")}
            <br />
            <span className="text-gradient-aurora">{t("future_vision.title_2")}</span>
          </h2>
          <p className="mt-8 text-[1.0625rem] text-text-muted leading-relaxed max-w-lg">
            {t("future_vision.subtitle")}
          </p>

          {/* Highlights */}
          <ul className="mt-10 space-y-4">
            {highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                className="flex items-start gap-3 text-sm text-text-muted"
              >
                <CheckCircle className="h-4.5 w-4.5 text-[#6D5EF5] mt-0.5 shrink-0" />
                <span>{t(h)}</span>
              </motion.li>
            ))}
          </ul>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-sm">
            {[
              { v: t("future_vision.stat_1_val"), l: t("future_vision.stat_1_lbl") },
              { v: t("future_vision.stat_2_val"), l: t("future_vision.stat_2_lbl") },
              { v: t("future_vision.stat_3_val"), l: t("future_vision.stat_3_lbl") },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.5 }}
              >
                <div className="font-display text-3xl font-bold text-gradient-aurora">{s.v}</div>
                <div className="text-[11px] text-text-muted/60 mt-1 uppercase tracking-wider">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow halo */}
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[#6D5EF5]/35 via-transparent to-[#00D9FF]/25 blur-3xl" />
          {/* Glass frame */}
          <div className="relative gradient-border rounded-[2rem] overflow-hidden glass-strong shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <img
              src={detail}
              alt="Close-up of AETHER Vision lens with AR interface"
              width={1280}
              height={1280}
              loading="lazy"
              className="w-full h-auto"
            />
            {/* Shimmer overlay */}
            <div className="absolute inset-0 shimmer pointer-events-none" />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 glass-card border border-border-10 rounded-2xl p-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]"
          >
            <div className="text-xs text-text-muted/70 mb-1">AI Processing</div>
            <div className="font-display text-xl font-bold text-text-main">100%</div>
            <div className="text-xs text-[#00D9FF] mt-0.5">On-device · Private</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
