import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import glasses from "@/assets/glasses-hero.png";
import { useTranslation } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { ShoppingCart, Heart, Check } from "lucide-react";
import { toast } from "sonner";

const COLORS = [
  { id: "black", name: "Obsidian Black", hex: "#1C1C1C", filter: "none", glow: "from-[#6D5EF5]/40 via-[#00D9FF]/20 to-[#A855F7]/30" },
  { id: "silver", name: "Titanium Silver", hex: "#E5E5E5", filter: "saturate(0) brightness(1.3) contrast(1.1)", glow: "from-gray-400/40 via-white/20 to-gray-300/30" },
  { id: "blue", name: "Cobalt Blue", hex: "#1E3A8A", filter: "hue-rotate(220deg) saturate(1.5) brightness(1.1)", glow: "from-blue-600/40 via-[#00D9FF]/20 to-blue-400/30" }
];

export function ProductShowcase() {
  const { t } = useTranslation();
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed } = useStore();
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="relative py-36 overflow-hidden">
      {/* Aurora */}
      <div className="aurora opacity-55" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#00D9FF] mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00D9FF]" />
            {t("product_showcase.badge")}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00D9FF]" />
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-3xl mx-auto">
            {t("product_showcase.title_1")}{" "}
            <span className="text-gradient-aurora">{t("product_showcase.title_2")}</span>
          </h2>
          <p className="mt-6 text-text-muted max-w-lg mx-auto text-[1.0625rem]">
            {t("product_showcase.subtitle")}
          </p>
        </motion.div>

        {/* 3D interactive card */}
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ perspective: 1400 }}
          className="relative mt-20 mx-auto max-w-4xl"
        >
          {/* Outer glow ring */}
          <div className={`absolute -inset-px rounded-[3rem] bg-gradient-to-br ${selectedColor.glow} blur-xl opacity-60 transition-colors duration-700`} />
          <div className="absolute inset-0 -m-14 rounded-[4rem] bg-gradient-to-br from-[#6D5EF5]/30 via-transparent to-[#00D9FF]/25 blur-[60px]" />

          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-[2.5rem] glass-strong overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Inner gradient border */}
            <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none">
              <div className="absolute inset-0 rounded-[2.5rem] p-px bg-gradient-to-br from-white/15 via-white/5 to-transparent opacity-60" />
            </div>

            {/* Card header bar */}
            <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b border-border-5">
              <div className="font-display font-medium tracking-wide text-text-main/90">
                {t("product_showcase.card_title")}
              </div>
              <div className="flex items-center gap-2 bg-surface-6 rounded-full px-3 py-1 border border-border-5">
                <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-pulse" />
                <span className="text-[10px] text-[#00D9FF]/80 tracking-wider">{t("product_showcase.ar_active")}</span>
              </div>
            </div>

            <div className="px-8 sm:px-16 pb-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedColor.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={glasses}
                  alt={`AETHER Vision - ${selectedColor.name}`}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  style={{ transform: "translateZ(50px)", filter: selectedColor.filter }}
                  className="w-full drop-shadow-[0_40px_80px_rgba(0,217,255,0.3)] transition-all duration-700"
                />
              </AnimatePresence>
            </div>

            {/* Bottom info strip */}
            <div className="flex items-center justify-between px-8 pb-7 pt-2 border-t border-border-5">
              <div className="text-[10px] text-text-muted/50 uppercase tracking-[0.2em]">{t("product_showcase.move_cursor")}</div>
              <div className="flex items-center gap-2 text-[10px] text-text-muted/50 uppercase tracking-[0.2em]">
                <span className="h-px w-5 bg-border-20" />
                {t("product_showcase.gen_02_preview")}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Color Configurator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <p className="text-sm font-medium text-text-muted uppercase tracking-wider">{selectedColor.name}</p>
          <div className="flex items-center gap-4 glass-strong px-4 py-2 rounded-full">
            {COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`relative h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${selectedColor.id === color.id ? "scale-110" : "hover:scale-105 opacity-60 hover:opacity-100"}`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name} color`}
              >
                {selectedColor.id === color.id && (
                  <motion.div
                    layoutId="color-active"
                    className="absolute -inset-1.5 rounded-full border-2 border-[#6D5EF5]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                {selectedColor.id === color.id && (
                  <Check className={`h-4 w-4 ${color.id === 'silver' ? 'text-black' : 'text-white'}`} strokeWidth={3} />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feature callouts below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { label: t("product_showcase.feature_1"), detail: t("product_showcase.feature_1_desc") },
            { label: t("product_showcase.feature_2"), detail: t("product_showcase.feature_2_desc") },
            { label: t("product_showcase.feature_3"), detail: t("product_showcase.feature_3_desc") },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 glass rounded-full px-5 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF]" />
              <span className="text-sm font-medium text-text-main/90">{item.label}</span>
              <span className="text-xs text-text-muted/60">·</span>
              <span className="text-xs text-text-muted/70">{item.detail}</span>
            </div>
          ))}
        </motion.div>

        {/* E-commerce actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const product = {
                id: "aether-vision-gen02",
                name: t("products.aether_vision"),
                price: 1299,
                image: glasses,
              };
              addToCart(product);
              addRecentlyViewed(product);
              toast.success(t("cart.added"), { description: t("products.aether_vision") });
            }}
            className="btn-primary text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            {t("products.add_to_cart")} · $1,299
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const product = {
                id: "aether-vision-gen02",
                name: t("products.aether_vision"),
                price: 1299,
                image: glasses,
              };
              toggleWishlist(product);
              const inList = isInWishlist("aether-vision-gen02");
              // Since toggleWishlist flips the state, the current value is the NEW state
              toast(inList ? t("wishlist.removed") : t("wishlist.added"));
            }}
            className={`btn-ghost text-sm ${
              isInWishlist("aether-vision-gen02")
                ? "!border-[#6D5EF5]/40 !text-[#6D5EF5]"
                : ""
            }`}
          >
            <Heart
              className={`h-4 w-4 transition-all ${
                isInWishlist("aether-vision-gen02") ? "fill-[#6D5EF5] text-[#6D5EF5]" : ""
              }`}
            />
            {t("products.add_to_wishlist")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
