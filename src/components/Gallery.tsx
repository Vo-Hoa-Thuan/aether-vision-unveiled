import { motion } from "motion/react";
import { useTranslation } from "@/lib/i18n";
import l1 from "@/assets/lifestyle-1.webp";
import l2 from "@/assets/lifestyle-2.webp";
import l3 from "@/assets/lifestyle-3.webp";
import l4 from "@/assets/lifestyle-4.webp";

const items = [
  { src: l1, keyName: "caption_1", span: "row-span-2", size: "large" },
  { src: l2, keyName: "caption_2", span: "", size: "small" },
  { src: l3, keyName: "caption_3", span: "row-span-2", size: "large" },
  { src: l4, keyName: "caption_4", span: "", size: "small" },
];

export function Gallery() {
  const { t } = useTranslation();
  return (
    <section id="gallery" className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px section-line" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — left-aligned for editorial feel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#00D9FF] mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-[#00D9FF] to-transparent" />
            {t("gallery.badge")}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-lg">
            {t("gallery.title_1")}{" "}
            <span className="text-gradient-aurora">{t("gallery.title_2")}</span>
          </h2>
          <p className="mt-6 text-text-muted text-[1.0625rem] max-w-md">
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] sm:auto-rows-[260px]">
          {items.map((it, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${it.span}`}
            >
              {/* Image */}
              <img
                src={it.src}
                alt={t(`gallery.${it.keyName}`)}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#6D5EF5]/0 to-[#6D5EF5]/0 group-hover:from-[#6D5EF5]/10 group-hover:to-[#00D9FF]/10 transition-all duration-700" />

              {/* Glass frame border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-border-0 group-hover:border-border-15 transition-colors duration-500" />

              {/* Caption */}
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-text-main/80 font-medium">
                    {t(`gallery.${it.keyName}`)}
                  </span>
                </div>
                <span className="h-6 w-6 rounded-full glass grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 7L7 1M7 1H2M7 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
