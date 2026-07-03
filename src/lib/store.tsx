import { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  recentlyViewed: Product[];
  isCartOpen: boolean;
}

type Action =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISHLIST"; product: Product }
  | { type: "ADD_RECENTLY_VIEWED"; product: Product }
  | { type: "SET_CART_OPEN"; open: boolean }
  | { type: "HYDRATE"; state: StoreState };

// ─── Storage helpers ────────────────────────────────────────
const STORAGE_KEY = "aether-store";

function loadState(): StoreState {
  const defaults: StoreState = {
    cart: [],
    wishlist: [],
    recentlyViewed: [],
    isCartOpen: false,
  };
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed, isCartOpen: false };
  } catch {
    return defaults;
  }
}

function saveState(state: StoreState) {
  try {
    const { isCartOpen: _, ...persistable } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
  } catch {}
}

// ─── Reducer ────────────────────────────────────────────────
function storeReducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.cart.find((i) => i.id === action.product.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.product, quantity: 1 }] };
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((i) => i.id !== action.productId) };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((i) => (i.id === action.productId ? { ...i, quantity: action.quantity } : i))
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "TOGGLE_WISHLIST": {
      const inList = state.wishlist.some((i) => i.id === action.product.id);
      return {
        ...state,
        wishlist: inList
          ? state.wishlist.filter((i) => i.id !== action.product.id)
          : [...state.wishlist, action.product],
      };
    }
    case "ADD_RECENTLY_VIEWED": {
      const filtered = state.recentlyViewed.filter((i) => i.id !== action.product.id);
      return { ...state, recentlyViewed: [action.product, ...filtered].slice(0, 10) };
    }
    case "SET_CART_OPEN":
      return { ...state, isCartOpen: action.open };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────────
interface StoreContextType {
  state: StoreState;
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (p: Product) => void;
  isInWishlist: (id: string) => boolean;
  addRecentlyViewed: (p: Product) => void;
  setCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, undefined, loadState);

  // Persist on change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const addToCart = useCallback((p: Product) => dispatch({ type: "ADD_TO_CART", product: p }), []);
  const removeFromCart = useCallback((id: string) => dispatch({ type: "REMOVE_FROM_CART", productId: id }), []);
  const updateQuantity = useCallback((id: string, qty: number) => dispatch({ type: "UPDATE_QUANTITY", productId: id, quantity: qty }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const toggleWishlist = useCallback((p: Product) => dispatch({ type: "TOGGLE_WISHLIST", product: p }), []);
  const isInWishlist = useCallback((id: string) => state.wishlist.some((i) => i.id === id), [state.wishlist]);
  const addRecentlyViewed = useCallback((p: Product) => dispatch({ type: "ADD_RECENTLY_VIEWED", product: p }), []);
  const setCartOpen = useCallback((open: boolean) => dispatch({ type: "SET_CART_OPEN", open }), []);

  const cartTotal = state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addRecentlyViewed,
        setCartOpen,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
