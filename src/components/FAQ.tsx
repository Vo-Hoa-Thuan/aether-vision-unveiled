import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  { keyName: "1" },
  { keyName: "2" },
  { keyName: "3" },
  { keyName: "4" },
  { keyName: "5" },
];

export function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px section-line" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#6D5EF5]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#00D9FF] mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00D9FF]" />
            {t("faq.badge")}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00D9FF]" />
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            {t("faq.title_1")}{" "}
            <span className="text-gradient-aurora">{t("faq.title_2")}</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.keyName}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "glass-strong border border-[#6D5EF5]/25 shadow-[0_0_40px_-10px_rgba(109,94,245,0.3)]"
                    : "glass border border-border-6 hover:border-border-12"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-display font-medium text-base sm:text-[1.0625rem] transition-colors duration-200 ${isOpen ? "text-text-main" : "text-text-main/85 group-hover:text-text-main"}`}>
                    {t(`faq.q${f.keyName}`)}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`shrink-0 h-7 w-7 rounded-full grid place-items-center transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-[#6D5EF5] to-[#8B5CF6] shadow-[0_0_16px_-4px_rgba(109,94,245,0.7)]"
                        : "bg-surface-6 group-hover:bg-surface-10"
                    }`}
                  >
                    <Plus className={`h-4 w-4 transition-colors ${isOpen ? "text-white" : "text-text-muted"}`} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-6 pt-0">
                        <div className="h-px bg-gradient-to-r from-[#6D5EF5]/30 via-[#00D9FF]/20 to-transparent mb-5" />
                        <p className="text-text-muted leading-relaxed">{t(`faq.a${f.keyName}`)}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
