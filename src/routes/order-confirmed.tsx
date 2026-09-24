import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Package,
  Printer,
  ShoppingBag,
  Truck,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { Eyebrow, PageContainer } from "@/components/brand/design-primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMedusaOrder, MedusaOrder } from "@/lib/commerce/cart-service";

type SearchParams = {
  order_id?: string;
  display_id?: string;
};

export const Route = createFileRoute("/order-confirmed")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      order_id: typeof search.order_id === "string" ? search.order_id : undefined,
      display_id: typeof search.display_id === "string" ? search.display_id : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Order Confirmed — Sukoon House" },
      { name: "description", content: "Thank you for shopping with Sukoon House." },
    ],
  }),
  component: OrderConfirmedPage,
});

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

function OrderConfirmedPage() {
  const { order_id, display_id } = Route.useSearch();
  const [order, setOrder] = useState<MedusaOrder | null>(null);
  const [loading, setLoading] = useState(Boolean(order_id));

  useEffect(() => {
    if (!order_id) return;
    let isMounted = true;
    getMedusaOrder(order_id).then((data) => {
      if (isMounted) {
        setOrder(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [order_id]);

  const orderNumber = display_id || order?.display_id?.toString() || "1";

  return (
    <PageContainer className="py-12 md:py-20 max-w-4xl mx-auto">
      {/* Success Banner */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center size-20 rounded-full bg-emerald-500/10 text-emerald-600 mb-6">
          <CheckCircle2 className="size-10" />
        </div>
        <Eyebrow className="text-emerald-700 font-semibold tracking-wider">
          ALHAMDULILLAH • ORDER RECEIVED
        </Eyebrow>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Thank you for your order
        </h1>
        <p className="mt-3 text-base text-muted-foreground max-w-lg mx-auto">
          We have received your order and are preparing your modest wardrobe essentials with care.
          A confirmation update has been sent to your email.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Badge variant="outline" className="text-sm px-3 py-1 font-mono">
            Order #{orderNumber.padStart(6, "0")}
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1 flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" /> Confirmed &amp; Verified
          </Badge>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
          <Package className="mx-auto size-8 animate-pulse text-primary mb-3" />
          <p>Retrieving your verified order details from Sukoon commerce...</p>
        </div>
      ) : order ? (
        <div className="space-y-8">
          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Details */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-foreground font-semibold">
                <MapPin className="size-4 text-primary" />
                <span>Delivery Address</span>
              </div>
              {order.shipping_address ? (
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {order.shipping_address.first_name} {order.shipping_address.last_name}
                  </p>
                  <p>{order.shipping_address.address_1}</p>
                  {order.shipping_address.address_2 && <p>{order.shipping_address.address_2}</p>}
                  <p>
                    {order.shipping_address.city}
                    {order.shipping_address.province ? `, ${order.shipping_address.province}` : ""} -{" "}
                    <span className="font-mono text-foreground font-medium">
                      {order.shipping_address.postal_code}
                    </span>
                  </p>
                  <p className="pt-2 text-xs">Phone: {order.shipping_address.phone}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Delivery address recorded.</p>
              )}
            </div>

            {/* Shipping & Payment Summary */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-foreground font-semibold">
                <Truck className="size-4 text-primary" />
                <span>Shipping &amp; Payment</span>
              </div>
              <div className="text-sm space-y-3">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Shipping Method:</span>
                  <span className="text-foreground font-medium">
                    {order.shipping_methods?.[0]?.name || "Standard Ground Delivery"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Payment Status:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-medium capitalize">
                    <CheckCircle2 className="size-3.5" />
                    {order.payment_status || "Authorized / Paid"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Estimated Arrival:</span>
                  <span className="text-foreground font-medium flex items-center gap-1">
                    <Clock className="size-3.5 text-muted-foreground" /> 3–5 Business Days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Purchased */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="size-4 text-primary" />
              Items in this Order ({order.items.length})
            </h2>

            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 flex items-center gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                    <img
                      src={item.thumbnail || "/images/product-modest-set.jpg"}
                      alt={item.title}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.subtitle || item.variant_sku || "Standard Size"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Qty: {item.quantity} × {formatPrice(item.unit_price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {formatPrice(item.total || item.unit_price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="mt-6 border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>
                  {order.shipping_total === 0 ? (
                    <span className="text-emerald-600 font-medium">FREE</span>
                  ) : (
                    formatPrice(order.shipping_total)
                  )}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
                <span>Total Amount Paid</span>
                <span className="text-primary">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback if navigated without direct API fetch (e.g., immediate redirect) */
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Order Reference ID: <span className="font-mono text-foreground">{order_id}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Your items are reserved in our warehouse inventory and being processed for delivery.
          </p>
        </div>
      )}

      {/* Concierge & Actions */}
      <div className="mt-10 rounded-xl bg-muted/40 p-6 border border-border text-center md:flex md:items-center md:justify-between md:text-left">
        <div>
          <h3 className="text-sm font-medium text-foreground">Sukoon Concierge Support</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Questions about your order or tailoring? Email us at{" "}
            <a href="mailto:care@sukoonhouse.in" className="text-primary underline">
              care@sukoonhouse.in
            </a>
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="gap-2"
          >
            <Printer className="size-4" /> Print Receipt
          </Button>
          <Button size="sm" asChild className="gap-2">
            <Link to="/collection">
              Continue Shopping <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
