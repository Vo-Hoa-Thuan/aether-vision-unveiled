import { motion } from "motion/react";
import { useTranslation } from "@/lib/i18n";
import {
  Battery,
  Feather,
  Camera,
  Cpu,
  Wifi,
  Droplets,
  Monitor,
  Zap,
} from "lucide-react";

const specs = [
  { icon: Battery, keyName: "battery", accent: "from-[#6D5EF5] to-[#8B5CF6]" },
  { icon: Feather, keyName: "weight", accent: "from-[#00D9FF] to-[#6D5EF5]" },
  { icon: Camera, keyName: "camera", accent: "from-[#8B5CF6] to-[#00D9FF]" },
  { icon: Cpu, keyName: "chip", accent: "from-[#6D5EF5] to-[#A855F7]" },
  { icon: Wifi, keyName: "connectivity", accent: "from-[#00D9FF] to-[#6D5EF5]" },
  { icon: Droplets, keyName: "water", accent: "from-[#00D9FF] to-[#8B5CF6]" },
  { icon: Monitor, keyName: "display", accent: "from-[#A855F7] to-[#6D5EF5]" },
  { icon: Zap, keyName: "charging", accent: "from-[#6D5EF5] to-[#00D9FF]" },
];

export function Specifications() {
  const { t } = useTranslation();
  return (
    <section id="specs" className="relative py-36 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px section-line" />
        <div className="absolute bottom-0 left-0 right-0 h-px section-line" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#6D5EF5]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#00D9FF] mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00D9FF]" />
            {t("specifications.badge")}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00D9FF]" />
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            {t("specifications.title_1")}{" "}
            <span className="text-gradient-aurora">{t("specifications.title_2")}</span>
          </h2>
          <p className="mt-6 text-text-muted text-[1.0625rem]">
            {t("specifications.subtitle")}
          </p>
        </motion.div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {specs.map((s, i) => (
            <motion.div
              key={s.keyName}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl glass-card p-7 overflow-hidden hover-border-glow cursor-default"
              style={{ borderColor: "var(--border-8)" }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Icon */}
              <div className={`relative h-10 w-10 rounded-xl bg-gradient-to-br ${s.accent} grid place-items-center mb-6 shadow-md`}>
                <s.icon className="h-4.5 w-4.5 text-text-main" strokeWidth={1.75} />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent" />
              </div>

              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.25em] text-text-muted/55 mb-2">
                  {t(`specifications.${s.keyName}`)}
                </div>
                <div className="font-display text-2xl font-bold text-text-main mb-1 leading-tight">
                  {t(`specifications.${s.keyName}_val`)}
                </div>
                <div className="text-[11px] text-text-muted/70 tracking-wide">
                  {t(`specifications.${s.keyName}_desc`)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
