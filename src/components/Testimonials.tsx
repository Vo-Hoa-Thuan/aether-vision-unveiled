import { motion } from "motion/react";
import { useTranslation } from "@/lib/i18n";
import { Star, Quote } from "lucide-react";

const items = [
  {
    keyName: "1",
    initials: "MT",
    accent: "from-[#6D5EF5] to-[#8B5CF6]",
  },
  {
    keyName: "2",
    initials: "DO",
    accent: "from-[#00D9FF] to-[#6D5EF5]",
  },
  {
    keyName: "3",
    initials: "SL",
    accent: "from-[#8B5CF6] to-[#00D9FF]",
  },
];

export function Testimonials() {
  const { t } = useTranslation();
  return (
    <section className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px section-line" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#6D5EF5]/10 blur-[120px]" />
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
            {t("testimonials.badge")}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00D9FF]" />
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            {t("testimonials.title_1")}{" "}
            <span className="text-gradient-aurora">{t("testimonials.title_2")}</span>
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.figure
              key={item.keyName}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative rounded-3xl glass-card flex flex-col overflow-hidden hover-border-glow cursor-default"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8 flex flex-col h-full">
                {/* Top: stars + quote icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-[#00D9FF] text-[#00D9FF]" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-[#6D5EF5]/40 -scale-x-100" />
                </div>

                {/* Quote text */}
                <blockquote className="flex-1 text-[0.9375rem] text-[#D5DBE8] leading-relaxed">
                  "{t(`testimonials.quote_${item.keyName}`)}"
                </blockquote>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-border-10 to-transparent" />

                {/* Author */}
                <figcaption className="flex items-center gap-4">
                  <div className={`relative h-12 w-12 shrink-0 rounded-full bg-gradient-to-br ${item.accent} grid place-items-center font-display font-bold text-sm shadow-md text-white`}>
                    {item.initials}
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-[0.9375rem] text-text-main">
                      {t(`testimonials.name_${item.keyName}`)}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">
                      {t(`testimonials.role_${item.keyName}`)} · {t(`testimonials.company_${item.keyName}`)}
                    </div>
                  </div>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
