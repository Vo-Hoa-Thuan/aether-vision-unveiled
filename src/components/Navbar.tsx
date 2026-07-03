import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingBag, ShoppingCart, Zap, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/lib/i18n";
import { useStore } from "@/lib/store";

const links = [
  { labelKey: "nav.product", href: "#product" },
  { labelKey: "nav.features", href: "#features" },
  { labelKey: "nav.specs", href: "#specs" },
  { labelKey: "nav.gallery", href: "#gallery" },
  { labelKey: "nav.faq", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { theme, toggle } = useTheme();
  const { language, setLanguage, t } = useTranslation();
  const { cartCount, setCartOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled
              ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 group" aria-label="AETHER home">
            <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF] grid place-items-center shadow-lg shadow-[#6D5EF5]/40 group-hover:shadow-[#6D5EF5]/60 transition-shadow duration-300">
              <div className="h-2.5 w-2.5 rounded-full bg-white/90 shadow-sm" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <span className="font-display text-[1.05rem] font-bold tracking-tight text-text-main">
              AETHER
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setActiveLink(l.href)}
                onMouseLeave={() => setActiveLink("")}
                className="relative px-4 py-2 text-sm text-text-muted hover:text-text-main transition-colors duration-200 rounded-full group"
              >
                <span className="relative z-10">{t(l.labelKey)}</span>
                {activeLink === l.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-full bg-surface-5"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-[#6D5EF5] to-[#00D9FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#buy"
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-text-main text-bg-base hover:opacity-90 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_4px_24px_-6px_var(--border-20)] active:scale-[0.98]"
            >
              <Zap className="h-3.5 w-3.5" />
              {t("nav.reserve_now")}
            </a>
            
            {/* Language Switcher */}
            <div className="hidden md:flex relative h-10 rounded-full glass items-center p-1 font-semibold text-xs border border-border-6">
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                title="Switch to English"
                className={`relative px-3 py-1.5 rounded-full z-10 transition-colors ${language === 'en' ? 'text-text-main' : 'text-text-muted hover:text-text-main/80'}`}
              >
                EN
                {language === 'en' && (
                  <motion.div layoutId="lang-active-desktop" className="absolute inset-0 bg-surface-8 rounded-full -z-10" />
                )}
              </button>
              <button
                onClick={() => setLanguage('vi')}
                aria-label="Switch to Vietnamese"
                title="Switch to Vietnamese"
                className={`relative px-3 py-1.5 rounded-full z-10 transition-colors ${language === 'vi' ? 'text-text-main' : 'text-text-muted hover:text-text-main/80'}`}
              >
                VI
                {language === 'vi' && (
                  <motion.div layoutId="lang-active-desktop" className="absolute inset-0 bg-surface-8 rounded-full -z-10" />
                )}
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative h-10 w-10 rounded-full glass flex items-center justify-center text-text-muted hover:text-text-main transition-colors duration-300 hover:bg-surface-8"
              aria-label="Open cart"
              title="Cart"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#8B5CF6] text-[10px] text-white font-bold grid place-items-center px-1 shadow-[0_0_12px_-2px_rgba(109,94,245,0.7)]">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className="relative h-10 w-10 rounded-full glass flex items-center justify-center text-text-muted hover:text-text-main transition-colors duration-300 hover:bg-surface-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute"
                >
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5 fill-current opacity-80" strokeWidth={1.5} />
                  ) : (
                    <Sun className="h-5 w-5 fill-current opacity-80" strokeWidth={1.5} />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
            <button
              className="md:hidden h-10 w-10 grid place-items-center rounded-full glass hover:bg-white/8 transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden mt-2 glass-strong rounded-3xl p-5 flex flex-col gap-1 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="text-sm text-text-muted hover:text-text-main py-3 px-4 rounded-xl hover:bg-surface-5 transition-all"
                >
                  {t(l.labelKey)}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05 + 0.05 }}
                className="mt-2 pt-3 border-t border-border-8 flex flex-col gap-3"
              >
                <div className="flex relative h-10 rounded-full glass items-center p-1 font-semibold text-xs border border-border-6 self-start">
                  <button
                    onClick={() => setLanguage('en')}
                    aria-label="Switch to English"
                    title="Switch to English"
                    className={`relative px-4 py-1.5 rounded-full z-10 transition-colors ${language === 'en' ? 'text-text-main' : 'text-text-muted hover:text-text-main/80'}`}
                  >
                    EN
                    {language === 'en' && (
                      <motion.div layoutId="lang-active-mobile" className="absolute inset-0 bg-surface-8 rounded-full -z-10" />
                    )}
                  </button>
                  <button
                    onClick={() => setLanguage('vi')}
                    aria-label="Switch to Vietnamese"
                    title="Switch to Vietnamese"
                    className={`relative px-4 py-1.5 rounded-full z-10 transition-colors ${language === 'vi' ? 'text-text-main' : 'text-text-muted hover:text-text-main/80'}`}
                  >
                    VI
                    {language === 'vi' && (
                      <motion.div layoutId="lang-active-mobile" className="absolute inset-0 bg-surface-8 rounded-full -z-10" />
                    )}
                  </button>
                </div>
                <a href="#buy" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm">
                  <ShoppingBag className="h-4 w-4" />
                  {t("nav.reserve_now")}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
