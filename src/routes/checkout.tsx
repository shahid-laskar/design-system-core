import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  Package,
  ShieldCheck,
  Tag,
  Truck,
  X,
} from "lucide-react";
import { Eyebrow, PageContainer, SectionHeading } from "@/components/brand/design-primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_PRICE, useCart } from "@/lib/cart-context";
import {
  addMedusaShippingMethod,
  completeMedusaCart,
  getMedusaShippingOptions,
  getOrCreateMedusaCart,
  getOrCreatePaymentCollection,
  initiatePaymentSession,
  MedusaShippingOption,
  updateMedusaCartDetails,
} from "@/lib/commerce/cart-service";
import { validateStorePromotion, type PromotionValidationResult } from "@/lib/commerce/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Sukoon House" },
      { name: "description", content: "Complete your order with secure checkout." },
    ],
  }),
  component: CheckoutPage,
});

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Jammu & Kashmir",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, cartId, clearCart } = useCart();

  // Contact & Address State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [shippingOptions, setShippingOptions] = useState<MedusaShippingOption[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Coupon / Promo Code State
  const [couponCode, setCouponCode] = useState("");
  const [appliedPromotion, setAppliedPromotion] = useState<PromotionValidationResult | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const discountAmount = appliedPromotion?.valid ? appliedPromotion.discount_amount : 0;
  const shippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = shippingUnlocked ? 0 : STANDARD_SHIPPING_PRICE;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  async function handleApplyCoupon(codeToApply?: string) {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;
    setCouponLoading(true);
    setCouponMessage(null);
    try {
      const res = await validateStorePromotion(code, subtotal);
      if (res.valid) {
        setAppliedPromotion(res);
        setCouponMessage({ text: res.message, isError: false });
        setCouponCode(code);
      } else {
        setAppliedPromotion(null);
        setCouponMessage({ text: res.message || "Invalid coupon code", isError: true });
      }
    } catch (err: any) {
      setAppliedPromotion(null);
      setCouponMessage({ text: err.message || "Failed to validate coupon", isError: true });
    } finally {
      setCouponLoading(false);
    }
  }

  function handleRemoveCoupon() {
    setAppliedPromotion(null);
    setCouponCode("");
    setCouponMessage(null);
  }

  // Load Razorpay script
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Fetch shipping options from backend
  useEffect(() => {
    async function loadOptions() {
      try {
        const cart = await getOrCreateMedusaCart();
        const options = await getMedusaShippingOptions(cart.id);
        setShippingOptions(options);

        // Pick free or standard option based on threshold
        if (options.length > 0) {
          const matchingOption = shippingUnlocked
            ? options.find((o) => o.amount === 0) || options[0]
            : options.find((o) => o.amount > 0) || options[0];
          if (matchingOption) setSelectedShippingId(matchingOption.id);
        }
      } catch {
        // Handled silently
      }
    }
    loadOptions();
  }, [shippingUnlocked]);

  // Validation
  const isValid =
    email.includes("@") &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phone.replace(/[^0-9]/g, "").length >= 10 &&
    address1.trim().length > 0 &&
    city.trim().length > 0 &&
    pincode.replace(/[^0-9]/g, "").length === 6;

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || items.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Get or create cart
      const cart = await getOrCreateMedusaCart();

      // 2. Update email and shipping address
      await updateMedusaCartDetails(cart.id, {
        email,
        shipping_address: {
          first_name: firstName,
          last_name: lastName,
          phone,
          address_1: address1,
          address_2: address2 || undefined,
          city,
          province: state,
          postal_code: pincode,
          country_code: "in",
        },
      });

      // 3. Add shipping method
      if (selectedShippingId) {
        try {
          await addMedusaShippingMethod(cart.id, selectedShippingId);
        } catch {
          // Continue if already selected
        }
      }

      // 4. Create payment collection & session
      const paymentCollectionId = await getOrCreatePaymentCollection(cart.id);
      const providerId =
        paymentMethod === "razorpay" ? "pp_razorpay_razorpay" : "pp_system_default";

      const { payment_session } = await initiatePaymentSession(
        paymentCollectionId,
        providerId
      );

      // 5. Complete Order
      const result = await completeMedusaCart(cart.id);

      if (result.type === "order" && result.order) {
        clearCart();
        navigate({
          to: "/order-confirmed",
          search: {
            order_id: result.order.id,
            display_id: result.order.display_id?.toString() || "1",
          },
        });
      } else {
        throw new Error(result.error || "Order completion was not confirmed by commerce server.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to complete checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <PageContainer className="py-20 text-center">
        <Package className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-4 font-display text-3xl font-semibold text-foreground">
          Your basket is empty
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore our collection of modest essentials for family life.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/collection">Browse The Collection</Link>
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-10 md:py-16">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="gap-1.5 text-muted-foreground">
          <Link to="/collection">
            <ArrowLeft className="size-4" /> Back to store
          </Link>
        </Button>
      </div>

      <header className="mb-8">
        <Eyebrow className="text-primary">100% Encrypted &amp; Secure Checkout</Eyebrow>
        <h1 className="display-section mt-2 text-3xl md:text-4xl">Complete Your Order</h1>
      </header>

      {error ? (
        <div className="mb-6 rounded-md bg-destructive/10 p-4 text-sm font-medium text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Form */}
        <form onSubmit={handleCheckout} className="space-y-8 lg:col-span-7">
          {/* Section 1: Contact Details */}
          <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold">1. Contact Information</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              We'll send order tracking &amp; delivery updates via Email and WhatsApp.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="amina@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone / WhatsApp Number (10 digits) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-12"
                    placeholder="9876543210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Delivery Address */}
          <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold">2. Delivery Address</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              All deliveries are handled via trusted courier networks across India.
            </p>

            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address1">Street Address / House No. *</Label>
                <Input
                  id="address1"
                  placeholder="Flat 302, Gulshan Heights, Main Road"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address2">Landmark / Apartment / Locality (Optional)</Label>
                <Input
                  id="address2"
                  placeholder="Near Jamia Masjid"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger id="state">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((st) => (
                        <SelectItem key={st} value={st}>
                          {st}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="pincode">PIN Code (6 digits) *</Label>
                  <Input
                    id="pincode"
                    placeholder="400050"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ""))}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Payment Method */}
          <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold">3. Payment Method</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Select your preferred mode of payment.
            </p>

            <div className="mt-4 space-y-3">
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-all",
                  paymentMethod === "razorpay"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/30"
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="mt-1 accent-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-primary" />
                    <span className="text-sm font-semibold">
                      Razorpay (Instant UPI / Cards / Net Banking / Wallets)
                    </span>
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-[0.68rem] font-bold text-primary">
                      TEST MODE
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Google Pay, PhonePe, Paytm, BHIM UPI, RuPay, Visa, Mastercard.
                  </p>
                </div>
              </label>

              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-all",
                  paymentMethod === "cod"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/30"
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 accent-primary"
                />
                <div className="flex-1">
                  <span className="text-sm font-semibold">Cash on Delivery (COD)</span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Pay upon doorstep delivery. Phone confirmation will be requested.
                  </p>
                </div>
              </label>
            </div>
          </section>

          <Button
            type="submit"
            size="lg"
            className="w-full text-base"
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              "Processing Secure Payment..."
            ) : paymentMethod === "razorpay" ? (
              <>
                <Lock className="mr-2 size-4" /> Pay {formatPrice(total)} via Razorpay (Test)
              </>
            ) : (
              `Confirm Order — ${formatPrice(total)} (Cash on Delivery)`
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-success" />
            <span>256-Bit SSL Encrypted · 7-Day Doorstep Size Exchange Guarantee</span>
          </div>
        </form>

        {/* Right Column: Order Summary */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold">Order Summary</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {items.reduce((count, i) => count + i.quantity, 0)} items in your basket
            </p>

            <div className="mt-4 divide-y divide-border">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size || ""}`}
                  className="flex items-center gap-3 py-3"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="size-14 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight">{item.name}</p>
                    {item.size || item.color ? (
                      <p className="text-xs text-muted-foreground">
                        {[item.size ? `Size: ${item.size}` : null, item.color]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : null}
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right text-sm font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Promo / Coupon Code Section */}
            <div className="mt-5 rounded-md border border-dashed border-border p-3.5 bg-muted/20">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Tag className="size-3.5 text-primary" />
                <span>Have a Coupon or Gift Code?</span>
              </div>

              {appliedPromotion?.valid ? (
                <div className="mt-2.5 flex items-center justify-between rounded bg-success/10 px-3 py-2 text-xs font-medium text-success border border-success/30">
                  <div className="flex items-center gap-2">
                    <span className="font-bold tracking-wider">{appliedPromotion.code}</span>
                    <span className="text-[0.68rem] text-success/80">(-{formatPrice(appliedPromotion.discount_amount)})</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="p-1 hover:text-destructive text-success"
                    title="Remove coupon"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ) : (
                <div className="mt-2.5">
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g. SUKOON10 or WELCOME100"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="h-8 text-xs font-mono uppercase tracking-wider"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleApplyCoupon()}
                      disabled={couponLoading || !couponCode.trim()}
                      className="h-8 text-xs font-semibold"
                    >
                      {couponLoading ? "Checking..." : "Apply"}
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[0.68rem] text-muted-foreground">
                    <span>Try:</span>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon("SUKOON10")}
                      className="font-mono text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      SUKOON10
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon("WELCOME100")}
                      className="font-mono text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      WELCOME100
                    </button>
                  </div>
                </div>
              )}

              {couponMessage && (
                <p
                  className={cn(
                    "mt-2 text-[0.7rem] font-medium",
                    couponMessage.isError ? "text-destructive" : "text-success"
                  )}
                >
                  {couponMessage.text}
                </p>
              )}
            </div>

            <div className="mt-6 space-y-2.5 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {appliedPromotion?.valid && (
                <div className="flex justify-between font-medium text-success">
                  <span>Coupon Discount ({appliedPromotion.code})</span>
                  <span>-{formatPrice(appliedPromotion.discount_amount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping Fee</span>
                {shippingUnlocked ? (
                  <span className="font-semibold text-success">FREE (Orders ≥ ₹999)</span>
                ) : (
                  <span>{formatPrice(STANDARD_SHIPPING_PRICE)}</span>
                )}
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-3 text-lg font-bold text-foreground">
                <span>Total Amount</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-[0.68rem] text-muted-foreground">
                Inclusive of all applicable Indian taxes (GST)
              </p>
            </div>

            <div className="mt-6 rounded-md bg-muted/40 p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5 font-semibold text-foreground">
                <Truck className="size-4 text-primary" /> Delivery Promise
              </p>
              <p className="mt-1">
                Dispatches within 24–48 hours from Surat/Panipat hubs. Arrives in 3–5 business
                days with tracking updates.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
