import { useState } from "react";
import { Check, MessageCircle, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";

import editorialHome from "@/assets/editorial-home-calm.jpg";
import productChild from "@/assets/product-child-set.jpg";
import productModest from "@/assets/product-modest-set.jpg";
import { useCart, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_PRICE } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const addOns = [
  {
    id: "matching-daily-hijab",
    name: "Matching Micro-Modal Silk Daily Hijab (Sage)",
    category: "Women's companion",
    price: 499,
    image: productModest,
    color: "Sage Green",
  },
  {
    id: "daily-salah-habit-board",
    name: "My Daily Salah Magnetic Habit Board",
    category: "Kids' companion",
    price: 899,
    image: productChild,
  },
  {
    id: "sandalwood-amber-attar",
    name: "Sandalwood & Amber Non-Alcoholic Attar (12ml)",
    category: "Home companion",
    price: 499,
    image: editorialHome,
  },
] as const;

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export function CartDrawer() {
  const { items, subtotal, isOpen, setIsOpen, addItem, removeItem, updateQuantity } = useCart();
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [checkoutReady, setCheckoutReady] = useState(false);
  const shippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = shippingUnlocked ? 0 : STANDARD_SHIPPING_PRICE;
  const upiDiscount = 0;
  const total = subtotal + shipping - upiDiscount;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const message = encodeURIComponent(
    `Hello Sukoon House, I'd like to place this order:\n${items
      .map((item) => `• ${item.name}${item.size ? ` · Size ${item.size}` : ""}${item.color ? ` · ${item.color}` : ""} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`)
      .join("\n")}\nSubtotal: ${formatPrice(subtotal)}\nDelivery: ${shippingUnlocked ? "Free" : formatPrice(shipping)}\nTotal: ${formatPrice(total)}. Please help me complete my order.`
  );

  function addCompanion(item: (typeof addOns)[number]) {
    addItem({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      originalPrice: item.price,
      image: item.image,
      ...("color" in item ? { color: item.color } : {}),
    });
    setAddedIds((current) => [...current, item.id]);
    window.setTimeout(() => {
      setAddedIds((current) => current.filter((id) => id !== item.id));
    }, 1500);
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="flex w-full max-w-md flex-col gap-0 overflow-hidden border-l border-border bg-background p-0 sm:max-w-lg">
          <SheetHeader className="shrink-0 border-b border-border px-5 py-5 text-left sm:px-6">
            <SheetTitle className="font-display text-2xl">Your family basket <span className="font-body text-sm font-medium text-muted-foreground">({items.reduce((count, item) => count + item.quantity, 0)})</span></SheetTitle>
            <SheetDescription>Thoughtful essentials, together.</SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-6">
            <section className="border-b border-border py-5" aria-label="Free shipping progress">
              {shippingUnlocked ? (
                <p className="inline-flex items-center gap-2 rounded-full bg-success/12 px-3 py-2 text-sm font-semibold text-success">
                  <Check className="size-4" aria-hidden /> Free Express Shipping unlocked!
                </p>
              ) : (
                <p className="text-sm font-semibold">Add {formatPrice(remaining)} more for FREE Express Shipping! <span className="font-normal text-muted-foreground">(Standard {formatPrice(STANDARD_SHIPPING_PRICE)} below {formatPrice(FREE_SHIPPING_THRESHOLD)})</span></p>
              )}
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Free shipping progress" aria-valuemin={0} aria-valuemax={FREE_SHIPPING_THRESHOLD} aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}>
                <div className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </section>

            <section className="divide-y divide-border" aria-label="Basket items">
              {items.length === 0 ? (
                <div className="py-10 text-center">
                  <ShoppingBag className="mx-auto size-8 text-muted-foreground" />
                  <p className="mt-3 font-display text-xl">Your basket is ready for something lovely.</p>
                </div>
              ) : items.map((item) => (
                <article key={`${item.id}-${item.size ?? ""}-${item.color ?? ""}`} className="grid grid-cols-[4rem_minmax(0,1fr)_auto] gap-3 py-4">
                  <img src={item.image} alt="" className="size-16 rounded-sm object-cover" />
                  <div className="min-w-0">
                    <p className="font-display text-base leading-5">{item.name}</p>
                    {item.size || item.color ? <p className="mt-1 truncate text-xs text-muted-foreground">{[item.size ? `Size: ${item.size}` : null, item.color].filter(Boolean).join(" · ")}</p> : null}
                    <div className="mt-2 flex items-baseline gap-2 text-sm">
                      <span className="font-semibold">{formatPrice(item.price)}</span>
                      {item.originalPrice > item.price ? <span className="text-xs text-muted-foreground line-through">{formatPrice(item.originalPrice)}</span> : null}
                    </div>
                    <div className="mt-2 inline-grid h-8 grid-cols-[2rem_2rem_2rem] items-center rounded-sm border border-input">
                      <Button variant="ghost" size="icon" className="size-8" aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}><Minus className="size-3.5" /></Button>
                      <span className="text-center text-xs font-semibold" aria-live="polite">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="size-8" aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}><Plus className="size-3.5" /></Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id, item.size)}><Trash2 className="size-4" /></Button>
                  </div>
                </article>
              ))}
            </section>

            <section className="border-t border-border py-5" aria-labelledby="family-addons-heading">
              <h2 id="family-addons-heading" className="font-display text-xl">Complete the Family Basket</h2>
              <div className="mt-3 divide-y divide-border">
                {addOns.map((item) => (
                  <div key={item.id} className="grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 py-3">
                    <img src={item.image} alt="" className="size-11 rounded-sm object-cover" />
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold text-muted-foreground">{item.category}</p>
                      <p className="line-clamp-2 text-xs font-semibold leading-4">{item.name}</p>
                      <p className="mt-1 text-xs">{formatPrice(item.price)}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 gap-1 px-2.5" onClick={() => addCompanion(item)} aria-label={`Add ${item.name}`}>
                      {addedIds.includes(item.id) ? <><Check className="size-3.5" /> Added</> : <><Plus className="size-3.5" /> Add</>}
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="shrink-0 border-t border-border bg-background px-5 pb-5 pt-4 sm:px-6">
            <div className="space-y-2 text-sm">
              <SummaryLine label="Subtotal" value={formatPrice(subtotal)} />
              <SummaryLine label="Delivery" value={shippingUnlocked ? "FREE · You saved ₹70" : formatPrice(shipping)} highlight={shippingUnlocked} />
              <SummaryLine label="Prepaid UPI discount" value="₹0" />
              <p className="flex items-center gap-2 pt-1 text-xs text-muted-foreground"><Truck className="size-4 shrink-0 text-primary" /> Express Delivery: 2–4 Business Days</p>
              <div className="flex items-baseline justify-between border-t border-border pt-3 text-base font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <Button className="mt-4 w-full" size="lg" onClick={() => setCheckoutReady(true)} disabled={items.length === 0}>Proceed to Instant Checkout (UPI / Cards / COD)</Button>
            <Button variant="outline" className="mt-2 w-full" asChild disabled={items.length === 0}>
              <a href={`https://wa.me/919800000000?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle /> Order via WhatsApp (Personal Sizing Help)</a>
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.68rem] leading-4 text-muted-foreground"><ShieldCheck className="size-4 shrink-0" /> 100% Secure Checkout · Encrypted UPI &amp; Cards · 7-Day Doorstep Size Exchanges</p>
          </div>
        </SheetContent>
      </Sheet>

      {checkoutReady ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-overlay/70 p-4" role="presentation" onClick={() => setCheckoutReady(false)}>
          <section className="w-full max-w-sm border border-border bg-background p-6 shadow-lifted" role="dialog" aria-modal="true" aria-labelledby="checkout-ready-title" onClick={(event) => event.stopPropagation()}>
            <h2 id="checkout-ready-title" className="font-display text-2xl">Your order is ready</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Checkout is a demo in this preview. Your basket total is {formatPrice(total)}; contact us on WhatsApp to place the order.</p>
            <Button className="mt-5 w-full" onClick={() => setCheckoutReady(false)}>Back to basket</Button>
          </section>
        </div>
      ) : null}
    </>
  );
}

function SummaryLine({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div className="flex items-center justify-between gap-3"><span className="text-muted-foreground">{label}</span><span className={highlight ? "font-semibold text-success" : "font-medium"}>{value}</span></div>;
}