import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Package,
  RefreshCw,
  Repeat,
  Search,
  ShieldCheck,
  Truck,
  Undo2,
} from "lucide-react";
import { Eyebrow, PageContainer } from "@/components/brand/design-primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CustomerOrderLookupResult,
  lookupOrder,
  submitReturnRequest,
} from "@/lib/commerce/cart-service";

type SearchParams = {
  order_id?: string;
  email?: string;
};

export const Route = createFileRoute("/order-tracking")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      order_id: typeof search.order_id === "string" ? search.order_id : undefined,
      email: typeof search.email === "string" ? search.email : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Track Your Order — Sukoon House" },
      { name: "description", content: "Track your shipment and manage size exchanges." },
    ],
  }),
  component: OrderTrackingPage,
});

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

const TRACKING_STEPS = [
  { key: "confirmed", label: "Order Confirmed" },
  { key: "processing", label: "Packed & Quality QC" },
  { key: "shipped", label: "Shipped & In Transit" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

function getStepIndex(status?: string): number {
  if (!status) return 0;
  const s = status.toUpperCase();
  if (s.includes("DELIVERED")) return 4;
  if (s.includes("OUT_FOR_DELIVERY") || s.includes("OUT FOR DELIVERY")) return 3;
  if (s.includes("SHIPPED") || s.includes("IN_TRANSIT") || s.includes("TRANSIT")) return 2;
  if (s.includes("PROCESSING") || s.includes("READY")) return 1;
  return 0;
}

function OrderTrackingPage() {
  const searchParams = Route.useSearch();
  const [orderIdInput, setOrderIdInput] = useState(searchParams.order_id || "");
  const [emailInput, setEmailInput] = useState(searchParams.email || "");

  const [order, setOrder] = useState<CustomerOrderLookupResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Return/Exchange Request Modal State
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnType, setReturnType] = useState<"RETURN" | "EXCHANGE">("EXCHANGE");
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [targetSize, setTargetSize] = useState<string>("L");
  const [reason, setReason] = useState<string>("Fit is too tight");
  const [comments, setComments] = useState<string>("");
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState<string | null>(null);

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!orderIdInput.trim() || !emailInput.trim()) {
      setError("Please provide both Order Number and Email Address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await lookupOrder(orderIdInput.trim(), emailInput.trim());
    if (result) {
      setOrder(result);
      if (result.items.length > 0) {
        setSelectedItemId(result.items[0].id);
      }
    } else {
      setError("Order not found or email does not match our records. Please verify your details.");
      setOrder(null);
    }
    setIsLoading(false);
  }

  // Auto-search if params provided in URL
  useEffect(() => {
    if (searchParams.order_id && searchParams.email) {
      handleSearch();
    }
  }, [searchParams.order_id, searchParams.email]);

  async function handleReturnSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!order || !selectedItemId) return;

    const item = order.items.find((i) => i.id === selectedItemId);
    if (!item) return;

    setIsSubmittingReturn(true);
    try {
      const exchangeSku =
        returnType === "EXCHANGE"
          ? `${item.variant_sku?.split("-")[0] || "BFSS"}-BLU-${targetSize}`
          : undefined;

      await submitReturnRequest({
        order_id: order.id,
        email: emailInput,
        phone: order.shipping_address?.phone,
        type: returnType,
        items: [
          {
            order_item_id: item.id,
            variant_id: item.variant_id,
            variant_sku: item.variant_sku,
            quantity: 1,
            reason,
            exchange_variant_sku: exchangeSku,
          },
        ],
        customer_notes: comments || undefined,
      });

      setReturnSuccess(
        returnType === "EXCHANGE"
          ? `Size exchange request submitted for Size ${targetSize}. Our concierge will arrange complimentary doorstep pickup.`
          : `Return request submitted. Our courier partner will pick up the unwashed parcel.`
      );
      setShowReturnModal(false);
      // Refresh order details
      handleSearch();
    } catch (err: any) {
      setError(err.message || "Failed to submit request.");
    } finally {
      setIsSubmittingReturn(false);
    }
  }

  const currentStep = getStepIndex(order?.shipping_status || order?.fulfillment_status);

  return (
    <PageContainer className="py-12 md:py-20 max-w-4xl mx-auto">
      <header className="text-center mb-10">
        <Eyebrow className="text-primary font-semibold tracking-wider">
          LIVE SHIPMENT &amp; LOGISTICS
        </Eyebrow>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Track Your Sukoon Order
        </h1>
        <p className="mt-3 text-base text-muted-foreground max-w-lg mx-auto">
          Enter your order reference number and the email address used at checkout to view real-time delivery status and courier tracking.
        </p>
      </header>

      {/* Lookup Card */}
      <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm mb-10">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 space-y-1.5">
            <Label htmlFor="order_id">Order Number or ID *</Label>
            <Input
              id="order_id"
              placeholder="e.g. 3 or order_01M3..."
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-5 space-y-1.5">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. customer@example.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2 flex items-end">
            <Button type="submit" disabled={isLoading} className="w-full gap-2">
              {isLoading ? (
                <RefreshCw className="size-4 animate-spin" />
              ) : (
                <Search className="size-4" />
              )}
              Track
            </Button>
          </div>
        </form>

        {error && (
          <div className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {returnSuccess && (
          <div className="mt-4 rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{returnSuccess}</span>
          </div>
        )}
      </div>

      {order && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Order Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl font-bold text-foreground">
                  Order #{String(order.display_id).padStart(6, "0")}
                </span>
                <Badge variant="outline" className="capitalize">
                  {order.shipping_status || order.fulfillment_status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Placed on {new Date(order.created_at).toLocaleDateString("en-IN", { dateStyle: "long" })}
              </p>
            </div>

            {order.awb && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  Courier: <span className="font-medium text-foreground">{order.courier || "Delhivery Surface"}</span>
                </p>
                <p className="text-sm font-mono font-semibold text-foreground">AWB: {order.awb}</p>
                {order.tracking_url && (
                  <a
                    href={order.tracking_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                  >
                    Open Courier Portal <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Visual Tracking Timeline */}
          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <h2 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
              <Truck className="size-4 text-primary" /> Delivery Progress
            </h2>

            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted hidden md:block">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%` }}
                />
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                {TRACKING_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;
                  return (
                    <div key={step.key} className="flex md:flex-col items-center gap-3 md:text-center">
                      <div
                        className={`size-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                          isDone
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground border border-border"
                        } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                      >
                        {isDone ? <CheckCircle2 className="size-4" /> : idx + 1}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isDone ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-xs text-primary font-medium mt-0.5">In Progress</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scan Activities from Shiprocket */}
            {order.tracking_timeline?.scans && order.tracking_timeline.scans.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3">
                  Recent Courier Scans
                </h3>
                <div className="space-y-3">
                  {order.tracking_timeline.scans.map((scan, i) => (
                    <div key={i} className="text-xs flex justify-between items-start text-muted-foreground">
                      <div className="flex gap-2 items-start">
                        <Clock className="size-3.5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-foreground font-medium">{scan.activity}</p>
                          <p>{scan.location}</p>
                        </div>
                      </div>
                      <span className="font-mono">{new Date(scan.date).toLocaleString("en-IN", { timeStyle: "short", dateStyle: "short" })}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Return or Exchange Banner if present */}
          {order.existing_return && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Repeat className="size-5" />
                <span>
                  {order.existing_return.type === "EXCHANGE" ? "Size Exchange" : "Return Request"} in Progress
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Status: <span className="font-semibold text-foreground capitalize">{order.existing_return.status}</span>
              </p>
              {order.existing_return.reverse_awb && (
                <p className="text-xs text-muted-foreground mt-1">
                  Doorstep Reverse Pickup AWB: <span className="font-mono text-foreground">{order.existing_return.reverse_awb}</span>
                </p>
              )}
              {order.existing_return.replacement_awb && (
                <p className="text-xs text-muted-foreground mt-1">
                  Replacement Delivery AWB: <span className="font-mono text-foreground">{order.existing_return.replacement_awb}</span>
                </p>
              )}
            </div>
          )}

          {/* Order Items & 7-Day Guarantee Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-base font-semibold mb-4">Items in Shipment</h3>
              <div className="divide-y divide-border">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail || "/images/product-modest-set.jpg"}
                        alt={item.title}
                        className="size-14 rounded object-cover border border-border"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.subtitle || item.variant_sku}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {formatPrice(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                  <ShieldCheck className="size-5 text-emerald-600" />
                  <span>Sukoon 7-Day Fit Guarantee</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ordered the wrong size? Enjoy complimentary doorstep size exchanges within 7 days of delivery.
                </p>

                {order.return_eligible && !order.existing_return && (
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="w-full gap-2 text-xs"
                      onClick={() => setShowReturnModal(true)}
                    >
                      <Repeat className="size-3.5" /> Request Size Exchange
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Shipping Address:</p>
                <p>{order.shipping_address?.first_name} {order.shipping_address?.last_name}</p>
                <p>{order.shipping_address?.address_1}</p>
                <p>{order.shipping_address?.city}, {order.shipping_address?.postal_code}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return/Exchange Interactive Form Modal */}
      {showReturnModal && order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Repeat className="size-5 text-primary" /> Request Return / Size Exchange
              </h3>
              <button
                type="button"
                onClick={() => setShowReturnModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReturnSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Resolution Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={returnType === "EXCHANGE" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReturnType("EXCHANGE")}
                    className="gap-2"
                  >
                    <Repeat className="size-4" /> Size Exchange (Recommended)
                  </Button>
                  <Button
                    type="button"
                    variant={returnType === "RETURN" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReturnType("RETURN")}
                    className="gap-2"
                  >
                    <Undo2 className="size-4" /> Refund to Original Payment
                  </Button>
                </div>
              </div>

              {returnType === "EXCHANGE" && (
                <div className="space-y-1.5">
                  <Label htmlFor="target_size">Desired Replacement Size *</Label>
                  <select
                    id="target_size"
                    value={targetSize}
                    onChange={(e) => setTargetSize(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                  </select>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="reason">Primary Reason *</Label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Fit is too tight">Fit is too tight</option>
                  <option value="Fit is too loose">Fit is too loose</option>
                  <option value="Length too short/long">Length too short/long</option>
                  <option value="Defective / Quality defect">Fabric or stitching defect</option>
                  <option value="Received wrong item">Received wrong item</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="comments">Additional Notes (Optional)</Label>
                <Input
                  id="comments"
                  placeholder="e.g. Please send size L instead"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <div className="rounded bg-muted/60 p-3 text-xs text-muted-foreground">
                <p>
                  <strong>Doorstep Policy:</strong> Please keep original tags attached and garment unwashed.
                  Our courier representative will inspect the item during reverse pickup.
                </p>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReturnModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isSubmittingReturn}>
                  {isSubmittingReturn ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
