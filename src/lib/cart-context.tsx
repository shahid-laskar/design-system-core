import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import productModest from "@/assets/product-modest-set.jpg";
import {
  addLineItemToMedusaCart,
  getMedusaCart,
  getOrCreateMedusaCart,
  getStoredCartId,
  MedusaCart,
  removeMedusaLineItem,
  setStoredCartId,
  updateMedusaLineItem,
} from "./commerce/cart-service";
import { getStoreProductByHandle } from "./commerce/client";

export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING_PRICE = 70;

export type CartItem = {
  id: string; // product handle or id
  lineId?: string; // Medusa line item id
  variantId?: string; // Medusa variant id
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
};

export type NewCartItem = Omit<CartItem, "quantity"> & {
  quantity?: number;
  variantId?: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  isSyncing: boolean;
  cartId: string | null;
  setIsOpen: (open: boolean) => void;
  addItem: (item: NewCartItem) => Promise<void>;
  removeItem: (id: string, size?: string) => Promise<void>;
  updateQuantity: (id: string, size: string | undefined, quantity: number) => Promise<void>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
};

// Keep one shared context across hot reloads so the header never loses the basket.
const globalCart = globalThis as { __sukoonCartContext?: React.Context<CartContextValue | null> };
const CartContext =
  globalCart.__sukoonCartContext ??
  (globalCart.__sukoonCartContext = createContext<CartContextValue | null>(null));

function mapMedusaCartToItems(medusaCart: MedusaCart): CartItem[] {
  if (!medusaCart?.items) return [];

  return medusaCart.items.map((item) => {
    // Extract size and color from variant_title (e.g. "M / Blue" or "M")
    let size: string | undefined;
    let color: string | undefined;

    if (item.variant_title) {
      const parts = item.variant_title.split("/").map((p) => p.trim());
      if (parts.length >= 2) {
        size = parts[0];
        color = parts[1];
      } else {
        size = parts[0];
      }
    }

    return {
      id: (item as any).product?.handle || item.product_id,
      lineId: item.id,
      variantId: item.variant_id,
      name: item.product_title || item.title,
      category: "Sukoon Collection",
      price: item.unit_price,
      originalPrice: Math.round(item.unit_price * 1.2),
      image: item.thumbnail || "/placeholder.svg",
      size,
      color,
      quantity: item.quantity,
    };
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [cartId, setCartId] = useState<string | null>(getStoredCartId());

  // Synchronize cart on initial mount
  const refreshCart = useCallback(async () => {
    try {
      const storedId = getStoredCartId();
      if (storedId) {
        const cart = await getMedusaCart(storedId);
        if (cart && !(cart as { completed_at?: string | null }).completed_at) {
          setCartId(cart.id);
          setItems(mapMedusaCartToItems(cart));
          return;
        }
      }
    } catch {
      // Fallback silently if offline
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = useCallback(
    async (incoming: NewCartItem) => {
      const qty = incoming.quantity ?? 1;
      setIsSyncing(true);

      try {
        // 1. Get or create persistent Medusa cart
        const cart = await getOrCreateMedusaCart();
        setCartId(cart.id);

        // 2. Resolve variant ID if not explicitly provided
        let targetVariantId = incoming.variantId;

        if (!targetVariantId) {
          const product = await getStoreProductByHandle(incoming.id);
          if (product && product.variants && product.variants.length > 0) {
            // Find variant matching size
            const match = product.variants.find((v) => {
              if (incoming.size) {
                return (
                  v.title?.toLowerCase().includes(incoming.size.toLowerCase()) ||
                  Object.values(v.options || {}).some(
                    (val) => val.toLowerCase() === incoming.size?.toLowerCase()
                  )
                );
              }
              return true;
            });
            targetVariantId = match?.id || product.variants[0].id;
          }
        }

        if (targetVariantId) {
          // Add to Medusa cart
          const updatedCart = await addLineItemToMedusaCart(cart.id, targetVariantId, qty);
          setItems(mapMedusaCartToItems(updatedCart));
        } else {
          // Optimistic fallback if variant not resolved
          setItems((current) => {
            const existing = current.find(
              (i) => i.id === incoming.id && i.size === incoming.size
            );
            if (existing) {
              return current.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + qty } : i
              );
            }
            return [
              ...current,
              {
                ...incoming,
                quantity: qty,
                originalPrice: incoming.originalPrice ?? incoming.price,
              },
            ];
          });
        }
      } catch {
        // Fallback optimistic local state
        setItems((current) => {
          const existing = current.find(
            (i) => i.id === incoming.id && i.size === incoming.size
          );
          if (existing) {
            return current.map((i) =>
              i === existing ? { ...i, quantity: i.quantity + qty } : i
            );
          }
          return [
            ...current,
            {
              ...incoming,
              quantity: qty,
              originalPrice: incoming.originalPrice ?? incoming.price,
            },
          ];
        });
      } finally {
        setIsSyncing(false);
      }
    },
    []
  );

  const updateQuantity = useCallback(
    async (id: string, size: string | undefined, quantity: number) => {
      setIsSyncing(true);
      const targetItem = items.find((i) => i.id === id && i.size === size);

      try {
        const activeCartId = cartId || getStoredCartId();
        if (activeCartId && targetItem?.lineId) {
          if (quantity <= 0) {
            const updated = await removeMedusaLineItem(activeCartId, targetItem.lineId);
            setItems(mapMedusaCartToItems(updated));
          } else {
            const updated = await updateMedusaLineItem(
              activeCartId,
              targetItem.lineId,
              quantity
            );
            setItems(mapMedusaCartToItems(updated));
          }
          return;
        }
      } catch {
        // Fallback locally
      } finally {
        setIsSyncing(false);
      }

      // Optimistic fallback
      if (quantity <= 0) {
        setItems((current) => current.filter((i) => !(i.id === id && i.size === size)));
      } else {
        setItems((current) =>
          current.map((i) => (i.id === id && i.size === size ? { ...i, quantity } : i))
        );
      }
    },
    [cartId, items]
  );

  const removeItem = useCallback(
    async (id: string, size?: string) => {
      await updateQuantity(id, size, 0);
    },
    [updateQuantity]
  );

  const clearCart = useCallback(() => {
    setStoredCartId(null);
    setCartId(null);
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      items,
      itemCount,
      subtotal,
      isOpen,
      isSyncing,
      cartId,
      setIsOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      refreshCart,
    };
  }, [
    items,
    isOpen,
    isSyncing,
    cartId,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refreshCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}