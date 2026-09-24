import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import productModest from "@/assets/product-modest-set.jpg";

export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING_PRICE = 70;

export type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
};

type NewCartItem = Omit<CartItem, "quantity"> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: NewCartItem) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const initialItems: CartItem[] = [
  {
    id: "pure-cambric-cotton-set",
    name: "Pure Cambric Cotton Salwar Suit Set",
    category: "Women's Ethnic",
    price: 1499,
    originalPrice: 1699,
    image: productModest,
    size: "L",
    color: "Sage Green",
    quantity: 1,
  },
];

function matchesVariant(item: CartItem, id: string, size?: string) {
  return item.id === id && item.size === size;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      items,
      itemCount,
      subtotal,
      isOpen,
      setIsOpen,
      addItem: (incoming) => {
        const quantity = incoming.quantity ?? 1;
        setItems((current) => {
          const existing = current.find(
            (item) =>
              item.id === incoming.id &&
              item.size === incoming.size &&
              item.color === incoming.color,
          );
          if (existing) {
            return current.map((item) =>
              item === existing ? { ...item, quantity: item.quantity + quantity } : item,
            );
          }
          return [...current, { ...incoming, quantity }];
        });
      },
      removeItem: (id, size) => {
        setItems((current) => current.filter((item) => !matchesVariant(item, id, size)));
      },
      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          setItems((current) => current.filter((item) => !matchesVariant(item, id, size)));
          return;
        }
        setItems((current) =>
          current.map((item) =>
            matchesVariant(item, id, size) ? { ...item, quantity } : item,
          ),
        );
      },
      clearCart: () => setItems([]),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}