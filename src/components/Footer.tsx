import { motion } from "motion/react";
import { useTranslation } from "@/lib/i18n";
import { Twitter, Instagram, Youtube, Github, ArrowUpRight } from "lucide-react";

const cols = [
  {
    titleKey: "footer.product",
    links: [{ labelKey: "nav.product" }, { labelKey: "footer.accessories" }, { labelKey: "footer.compare" }, { labelKey: "nav.specs" }],
  },
  {
    titleKey: "footer.company",
    links: [{ labelKey: "footer.about" }, { labelKey: "footer.careers" }, { labelKey: "footer.press" }, { labelKey: "footer.contact" }],
  },
  {
    titleKey: "footer.support",
    links: [{ labelKey: "footer.help_center" }, { labelKey: "footer.warranty" }, { labelKey: "footer.shipping" }, { labelKey: "footer.returns" }],
  },
];

const socials = [
  { Icon: Twitter, label: "Twitter / X" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Github, label: "GitHub" },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative border-t border-border-5 pt-24 pb-12 overflow-hidden">
      {/* Subtle aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-[#6D5EF5]/08 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full bg-[#00D9FF]/06 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-14 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2.5 group mb-5 w-fit">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF] grid place-items-center shadow-lg shadow-[#6D5EF5]/35 group-hover:shadow-[#6D5EF5]/55 transition-shadow">
                <div className="h-2.5 w-2.5 rounded-full bg-white/90" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">AETHER</span>
            </a>
            <p className="text-sm text-text-muted max-w-[260px] leading-relaxed">
              {t("footer.tagline")}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2.5 mt-8">
              {socials.map(({ Icon, label }, i) => (
                <motion.a
                  key={i}
                  href="#"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="h-10 w-10 rounded-xl glass grid place-items-center hover:bg-surface-10 hover:border-border-15 transition-all duration-200"
                >
                  <Icon className="h-4 w-4 text-text-muted" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((c) => (
            <div key={c.titleKey}>
              <h4 className="font-display font-semibold text-[11px] uppercase tracking-[0.2em] text-text-main/55 mb-6">
                {t(c.titleKey)}
              </h4>
              <ul className="space-y-3.5">
                {c.links.map((l) => (
                  <li key={l.labelKey}>
                    <a
                      href="#"
                      className="group text-sm text-text-muted hover:text-text-main transition-colors duration-200 flex items-center gap-1"
                    >
                      {t(l.labelKey)}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-border-5">
          <p className="text-xs text-text-muted/45">
            &copy; {new Date().getFullYear()}{t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            {[{key: "footer.privacy"}, {key: "footer.terms"}, {key: "footer.cookies"}].map((item) => (
              <a key={item.key} href="#" className="text-xs text-text-muted/45 hover:text-text-main/70 transition-colors duration-200">
                {t(item.key)}
              </a>
            ))}
            <div className="h-4 w-px bg-border-10" />
            <span className="text-xs text-text-muted/30 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF]/60 animate-pulse" />
              {t("footer.made_for_tomorrow")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
