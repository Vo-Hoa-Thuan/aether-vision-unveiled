import { motion } from "motion/react";
import { useTranslation } from "@/lib/i18n";
import {
  Languages,
  Brain,
  Compass,
  Camera,
  Mic,
  Hand,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  accent: string;
  glow: string;
};

const features: Feature[] = [
  {
    icon: Languages,
    titleKey: "features.f1_title",
    descKey: "features.f1_desc",
    accent: "from-[#6D5EF5] to-[#8B5CF6]",
    glow: "rgba(109,94,245,0.4)",
  },
  {
    icon: Brain,
    titleKey: "features.f2_title",
    descKey: "features.f2_desc",
    accent: "from-[#00D9FF] to-[#6D5EF5]",
    glow: "rgba(0,217,255,0.35)",
  },
  {
    icon: Compass,
    titleKey: "features.f3_title",
    descKey: "features.f3_desc",
    accent: "from-[#8B5CF6] to-[#00D9FF]",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    icon: Camera,
    titleKey: "features.f4_title",
    descKey: "features.f4_desc",
    accent: "from-[#6D5EF5] to-[#00D9FF]",
    glow: "rgba(109,94,245,0.35)",
  },
  {
    icon: Mic,
    titleKey: "features.f5_title",
    descKey: "features.f5_desc",
    accent: "from-[#00D9FF] to-[#8B5CF6]",
    glow: "rgba(0,217,255,0.3)",
  },
  {
    icon: Hand,
    titleKey: "features.f6_title",
    descKey: "features.f6_desc",
    accent: "from-[#8B5CF6] to-[#6D5EF5]",
    glow: "rgba(168,85,247,0.35)",
  },
];

export function Features() {
  const { t } = useTranslation();
  return (
    <section id="features" className="relative py-36 overflow-hidden">
      {/* Background aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px section-line" />
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#6D5EF5]/12 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00D9FF]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mb-24"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#00D9FF] mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00D9FF]" />
            {t("features.badge")}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00D9FF]" />
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            {t("features.title_1")}{" "}
            <span className="text-gradient-aurora">{t("features.title_2")}</span>
          </h2>
          <p className="mt-6 text-[1.0625rem] text-text-muted leading-relaxed">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.titleKey}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-3xl glass-card overflow-hidden hover-border-glow cursor-default"
              style={{ borderColor: "var(--border-8)" }}
            >
              {/* Hover glow */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 100%, ${f.glow}, transparent 70%)` }}
              />

              {/* Top gradient accent line */}
              <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

              <div className="relative p-8">
                {/* Icon */}
                <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${f.accent} grid place-items-center shadow-lg mb-8`}>
                  <f.icon className="h-6 w-6 text-text-main" strokeWidth={1.75} />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent" />
                </div>

                <h3 className="font-display text-[1.1875rem] font-semibold text-text-main mb-3">
                  {t(f.titleKey)}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {t(f.descKey)}
                </p>

                {/* Learn more arrow */}
                <div className="mt-6 flex items-center gap-1.5 text-xs text-[#6D5EF5] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span>{t("nav.product")}</span>
                  <span className="animate-[nudge_1.2s_ease-in-out_infinite]">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
