import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { useTranslation } from "@/lib/i18n";

export function CartDrawer() {
  const { state, removeFromCart, updateQuantity, clearCart, setCartOpen, cartTotal, cartCount } =
    useStore();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {state.isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-[420px] flex flex-col"
            style={{
              background: "var(--glass-strong-bg)",
              backdropFilter: "blur(32px) saturate(180%)",
              borderLeft: "1px solid var(--border-6)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-6">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF] grid place-items-center">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-text-main">
                    {t("cart.title")}
                  </h2>
                  <p className="text-xs text-text-muted">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="h-9 w-9 rounded-xl hover:bg-surface-8 transition-colors grid place-items-center"
                aria-label="Close cart"
              >
                <X className="h-4.5 w-4.5 text-text-muted" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {state.cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-4"
                >
                  <div className="h-20 w-20 rounded-full bg-surface-6 grid place-items-center">
                    <ShoppingBag className="h-8 w-8 text-text-muted/40" />
                  </div>
                  <p className="text-text-muted text-sm">{t("cart.empty")}</p>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {state.cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative flex gap-4 p-4 rounded-2xl glass border border-border-6 group"
                    >
                      {/* Product image */}
                      <div className="h-20 w-20 rounded-xl overflow-hidden bg-surface-6 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-medium text-sm text-text-main truncate">
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-xs text-text-muted mt-0.5">{item.variant}</p>
                        )}
                        <p className="font-display font-semibold text-sm text-gradient-aurora mt-1 inline-block">
                          ${item.price.toLocaleString()}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7 rounded-lg bg-surface-6 grid place-items-center hover:bg-surface-10 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 text-text-muted" />
                          </button>
                          <span className="text-sm font-medium text-text-main w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7 rounded-lg bg-surface-6 grid place-items-center hover:bg-surface-10 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3 text-text-muted" />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-3 right-3 h-7 w-7 rounded-lg grid place-items-center opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-400" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {state.cart.length > 0 && (
              <div className="p-6 border-t border-border-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">{t("cart.total")}</span>
                  <span className="font-display text-xl font-bold text-text-main">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
                <button className="btn-primary w-full justify-center">
                  {t("cart.checkout")}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-xs text-text-muted/60 hover:text-red-400 transition-colors text-center py-2"
                >
                  {t("cart.clear")}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
