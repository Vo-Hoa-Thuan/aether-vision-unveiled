import { motion } from "motion/react";
import { useTranslation } from "@/lib/i18n";

const logos = ["NEXUS", "ORBITAL", "QUANTA", "VOLTAIRE", "HELION", "NIMBUS", "ARCTYPE"];
const doubled = [...logos, ...logos];

export function TrustedBy() {
  const { t } = useTranslation();
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Top separator */}
      <div className="section-line mb-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[10px] uppercase tracking-[0.35em] text-text-muted/45 mb-12"
        >
          {t("trusted_by.title")}
        </motion.p>
      </div>

      {/* Marquee with fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-bg-base to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-bg-base to-transparent pointer-events-none" />
        <div className="flex overflow-hidden">
          <div className="marquee-track flex items-center gap-x-14 sm:gap-x-20 whitespace-nowrap">
            {doubled.map((logo, i) => (
              <span
                key={i}
                className="font-display text-xl sm:text-2xl font-semibold text-text-main/22 hover:text-text-main/65 transition-colors duration-300 tracking-widest cursor-default select-none"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="section-line mt-20" />
    </section>
  );
}
