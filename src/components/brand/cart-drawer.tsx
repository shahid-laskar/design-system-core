import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  Tag,
  ArrowRight,
} from "lucide-react";

import { useCart, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_PRICE } from "@/lib/cart-context";
import { useCommerceProducts, type CollectionProduct } from "@/lib/commerce/use-commerce";
import { CommerceImage } from "@/components/brand/commerce-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateStorePromotion } from "@/lib/commerce/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

const emptyPaths = [
  { label: "Women", category: "women" },
  { label: "Men", category: "men" },
  { label: "Kids", category: "children" },
  { label: "Gifts", category: "gifts" },
  { label: "Prayer", category: "prayer" },
] as const;

function pickRecommendations(
  catalog: CollectionProduct[],
  cartHandles: Set<string>,
  cartText: string,
): CollectionProduct[] {
  const available = catalog.filter((p) => !cartHandles.has(p.handle) && p.inStock);
  if (available.length === 0) return [];

  const score = (product: CollectionProduct) => {
    let s = 0;
    const hay = `${product.name} ${product.pillar} ${product.subcategory} ${product.note}`.toLowerCase();
    if (cartText.includes("salwar") || cartText.includes("women")) {
      if (product.pillar === "Women" && /hijab|abaya|modesty/i.test(hay)) s += 5;
      if (product.pillar === "Women") s += 2;
    }
    if (cartText.includes("kurta") || cartText.includes("men") || cartText.includes("jummah")) {
      if (product.pillar === "Men") s += 3;
      if (/attar|kufi|prayer/i.test(hay)) s += 2;
    }
    if (cartText.includes("child") || cartText.includes("kids") || cartText.includes("habit")) {
      if (product.pillar === "Children") s += 4;
    }
    if (cartText.includes("prayer") || cartText.includes("mat") || cartText.includes("rehal")) {
      if (product.pillar === "Prayer") s += 4;
      if (product.pillar === "Home") s += 2;
    }
    if (cartText.includes("gift") || cartText.includes("eid")) {
      if (product.pillar === "Gifts") s += 4;
    }
    if (product.price < 700) s += 1;
    if (product.festive) s += 1;
    return s;
  };

  return [...available]
    .sort((a, b) => score(b) - score(a) || a.price - b.price)
    .slice(0, 3);
}

export function CartDrawer() {
  const { items, subtotal, isOpen, setIsOpen, addItem, removeItem, updateQuantity } = useCart();
  const { data: products } = useCommerceProducts();
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const shippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = shippingUnlocked ? 0 : STANDARD_SHIPPING_PRICE;
  const total = Math.max(0, subtotal + shipping - couponDiscount);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const recommendations = useMemo(() => {
    const cartHandles = new Set(items.map((item) => item.id));
    const cartText = items
      .map((item) => `${item.name} ${item.category}`)
      .join(" ")
      .toLowerCase();
    return pickRecommendations(products ?? [], cartHandles, cartText);
  }, [items, products]);

  const recommendHeading = useMemo(() => {
    const text = items
      .map((item) => `${item.name} ${item.category}`)
      .join(" ")
      .toLowerCase();
    if (text.includes("salwar") || text.includes("hijab")) return "Complete the look";
    if (text.includes("prayer") || text.includes("mat")) return "Prayer essentials";
    if (text.includes("gift") || text.includes("eid")) return "Small gifts to add";
    if (items.length === 0) return "You may also like";
    return "You may also like";
  }, [items]);

  const message = encodeURIComponent(
    `Hello Sukoon House, I'd like to place this order:\n${items
      .map(
        (item) =>
          `• ${item.name}${item.size ? ` · Size ${item.size}` : ""}${item.color ? ` · ${item.color}` : ""} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`,
      )
      .join(
        "\n",
      )}\nSubtotal: ${formatPrice(subtotal)}\nDelivery: ${shippingUnlocked ? "Free" : formatPrice(shipping)}\nTotal: ${formatPrice(total)}. Please help me complete my order.`,
  );

  function addCompanion(product: CollectionProduct) {
    addItem({
      id: product.handle,
      name: product.name,
      category: product.pillar,
      price: product.price,
      originalPrice: product.mrp ?? product.price,
      image: product.image,
      color: product.colors?.[0]?.name,
    });
    setAddedIds((current) => [...current, product.handle]);
    window.setTimeout(() => {
      setAddedIds((current) => current.filter((id) => id !== product.handle));
    }, 1500);
  }

  async function applyCoupon() {
    const code = coupon.trim();
    if (!code) return;
    setCouponMessage("Checking offer…");
    try {
      const result = await validateStorePromotion(code, subtotal);
      setCouponDiscount(result.valid ? result.discount_amount : 0);
      setCouponMessage(result.message);
    } catch {
      setCouponDiscount(0);
      setCouponMessage("Offer codes are checked at checkout. Please try again there.");
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col gap-0 overflow-hidden border-l border-border bg-background p-0 sm:max-w-lg z-[60]"
      >
        <SheetHeader className="shrink-0 border-b border-border bg-blush-cream/35 px-5 py-5 text-left sm:px-6">
          <SheetTitle className="font-display text-2xl">
            Your basket{" "}
            <span className="font-body text-sm font-medium text-muted-foreground">
              ({items.reduce((count, item) => count + item.quantity, 0)})
            </span>
          </SheetTitle>
          <SheetDescription>Thoughtful essentials, ready for checkout.</SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-6">
          {items.length > 0 ? (
            <section className="border-b border-border py-5" aria-label="Free shipping progress">
              {shippingUnlocked ? (
                <p className="inline-flex items-center gap-2 rounded-full bg-success/12 px-3 py-2 text-sm font-semibold text-success">
                  <Check className="size-4" aria-hidden /> Free shipping unlocked
                </p>
              ) : (
                <p className="text-sm font-medium leading-5">
                  Add <span className="font-bold text-primary">{formatPrice(remaining)}</span> more for
                  free shipping
                  <span className="mt-0.5 block font-normal text-muted-foreground">
                    Flat {formatPrice(STANDARD_SHIPPING_PRICE)} below{" "}
                    {formatPrice(FREE_SHIPPING_THRESHOLD)}
                  </span>
                </p>
              )}
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-label="Free shipping progress"
                aria-valuemin={0}
                aria-valuemax={FREE_SHIPPING_THRESHOLD}
                aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </section>
          ) : null}

          <section className="divide-y divide-border" aria-label="Basket items">
            {items.length === 0 ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blush-cream text-primary">
                  <ShoppingBag className="size-7" />
                </div>
                <p className="mt-4 font-display text-2xl">Your basket is waiting</p>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                  Start with something lovely for yourself, the children, or the home.
                </p>
                <Button className="mt-6" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/collection">
                    Browse the collection <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {emptyPaths.map((path) => (
                    <Button
                      key={path.category}
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/collection" search={{ category: path.category }}>
                        {path.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              items.map((item) => (
                <article
                  key={`${item.id}-${item.size ?? ""}-${item.color ?? ""}`}
                  className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] gap-3.5 py-4"
                >
                  <div className="size-[4.5rem] overflow-hidden rounded-sm bg-muted">
                    <CommerceImage src={item.image} alt="" className="size-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-base leading-5">{item.name}</p>
                    {item.size || item.color ? (
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {[item.size ? `Size ${item.size}` : null, item.color]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : null}
                    <div className="mt-2 flex items-baseline gap-2 text-sm">
                      <span className="font-semibold">{formatPrice(item.price)}</span>
                      {item.originalPrice > item.price ? (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 inline-grid h-8 grid-cols-[2rem_2rem_2rem] items-center rounded-sm border border-input">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="text-center text-xs font-semibold" aria-live="polite">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      >
                        <Plus className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-sm font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id, item.size)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </article>
              ))
            )}
          </section>

          {recommendations.length > 0 ? (
            <section className="border-t border-border py-5" aria-labelledby="cart-recs-heading">
              <h2 id="cart-recs-heading" className="font-display text-xl">
                {recommendHeading}
              </h2>
              <div className="mt-4 space-y-3">
                {recommendations.map((product) => (
                  <div
                    key={product.handle}
                    className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-3"
                  >
                    <div className="size-[4.5rem] overflow-hidden rounded-sm bg-muted">
                      <CommerceImage
                        src={product.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">
                        {product.pillar}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-5">
                        {product.name}
                      </p>
                      <p className="mt-1 text-sm font-bold">{formatPrice(product.price)}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-1 px-2.5"
                      onClick={() => addCompanion(product)}
                      aria-label={`Add ${product.name}`}
                    >
                      {addedIds.includes(product.handle) ? (
                        <>
                          <Check className="size-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="size-3.5" /> Add
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {items.length > 0 ? (
            <section className="border-t border-border py-5" aria-label="Apply offer code">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Tag className="size-4 text-primary" /> Have an offer code?
              </div>
              <div className="mt-3 flex gap-2">
                <Input
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="h-9 text-xs"
                  aria-label="Coupon code"
                />
                <Button type="button" variant="outline" size="sm" className="h-9" onClick={applyCoupon}>
                  Apply
                </Button>
              </div>
              {couponMessage ? (
                <p className="mt-2 text-xs text-muted-foreground">{couponMessage}</p>
              ) : null}
            </section>
          ) : null}
        </div>

        {items.length > 0 ? (
          <div className="shrink-0 border-t border-border bg-background px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
            <div className="space-y-2 text-sm">
              <SummaryLine label="Subtotal" value={formatPrice(subtotal)} />
              <SummaryLine
                label="Delivery"
                value={shippingUnlocked ? "FREE · You saved ₹70" : formatPrice(shipping)}
                highlight={shippingUnlocked}
              />
              <SummaryLine
                label="Offer discount"
                value={couponDiscount ? `−${formatPrice(couponDiscount)}` : "₹0"}
                highlight={couponDiscount > 0}
              />
              <p className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                <Truck className="size-4 shrink-0 text-primary" /> Express delivery: 2–4 business days
              </p>
              <div className="flex items-baseline justify-between border-t border-border pt-3 text-base font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              className="mt-4 h-auto w-full whitespace-normal py-3 text-center text-sm leading-tight"
              size="lg"
              asChild
            >
              <Link to="/checkout" onClick={() => setIsOpen(false)}>
                Proceed to checkout
              </Link>
            </Button>
            <Button
              variant="outline"
              className="mt-2 h-auto w-full whitespace-normal py-3 text-center text-sm leading-tight"
              asChild
            >
              <a
                href={`https://wa.me/919800000000?text=${message}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="shrink-0" /> Order via WhatsApp
              </a>
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.68rem] leading-4 text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0" /> Secure checkout · 7-day doorstep exchanges
            </p>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function SummaryLine({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "font-semibold text-success" : "font-medium"}>{value}</span>
    </div>
  );
}
