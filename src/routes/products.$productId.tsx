import { useMemo, useRef, useState, type KeyboardEvent, type UIEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  CircleCheck,
  Leaf,
  MapPin,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Zap,
} from "lucide-react";

import editorialHome from "@/assets/editorial-home-calm.jpg";
import productChild from "@/assets/product-child-set.jpg";
import productModest from "@/assets/product-modest-set.jpg";
import productPrayer from "@/assets/product-prayer-set.jpg";
import { PageContainer } from "@/components/brand/design-primitives";
import { SizeGuideDialog } from "@/components/brand/size-guide-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const item = catalog[params.productId] ?? catalog["the-stillness-set"];
    const name = item?.name ?? "Product";
    const description = item?.description ?? "Thoughtful essentials for Muslim family life.";
    return {
      meta: [
        { title: `${name} — Sukoon House` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} — Sukoon House` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

type SizeName = "S" | "M" | "L" | "XL" | "XXL";
type SizeOption = { name: SizeName; stock: "in-stock" | "low" | "sold-out" };
type GalleryImage = { src: string; alt: string; position: string };

type ProductDetail = {
  id: string;
  sku: string;
  kind: "apparel" | "non-apparel";
  name: string;
  category: string;
  categoryTrail: string[];
  price: number;
  mrp: number;
  rating: string;
  reviewCount: number;
  description: string;
  gallery: GalleryImage[];
  colors: Array<{ name: string; swatch: string }>;
  sizes?: SizeOption[];
  modelNote?: string;
  specifications: Array<[string, string]>;
  genericName: string;
  netQuantity: string;
  countryOfOrigin: string;
};

const apparelProduct: ProductDetail = {
  id: "pure-cambric-cotton-set",
  sku: "SH-WCS-014-SG",
  kind: "apparel",
  name: "Pure Cambric Cotton Salwar Suit Set",
  category: "Women's Ethnic",
  categoryTrail: ["Women's Ethnic", "Salwar Suit Sets"],
  price: 1499,
  mrp: 1799,
  rating: "4.9",
  reviewCount: 38,
  description:
    "A breathable three-piece salwar suit in pure 60s cambric cotton, fully lined with soft cotton voil for guaranteed everyday modesty.",
  gallery: [
    { src: productModest, alt: "Sage and stone cotton salwar suit fabric set", position: "object-center" },
    { src: productModest, alt: "Close view of soft cambric cotton texture and stitching", position: "object-top" },
    { src: editorialHome, alt: "Pure cotton set styled in a calm home setting", position: "object-center" },
  ],
  colors: [
    { name: "Sage Green", swatch: "bg-primary" },
    { name: "Natural Sand", swatch: "bg-secondary" },
    { name: "Stone Grey", swatch: "bg-mineral" },
  ],
  sizes: [
    { name: "S", stock: "in-stock" },
    { name: "M", stock: "in-stock" },
    { name: "L", stock: "low" },
    { name: "XL", stock: "in-stock" },
    { name: "XXL", stock: "sold-out" },
  ],
  modelNote: 'Model is 5\'6" wearing Size M (Garment Bust 38", Kurta Length 44")',
  specifications: [
    ["Top Fabric", "Pure 60s Cambric Cotton (Breathable plain weave)"],
    ["Bottom", "Matching pure cotton pants with semi-elasticated waist & pockets"],
    ["Dupatta", "Soft lightweight pure cotton malmal (2.25 meters)"],
    ["Lining", "Attached pure cotton voil inner across torso (Sleeves unlined)"],
    ["Stitch Quality", "Interlock reinforced seams with 2-inch tailoring margins"],
  ],
  genericName: "Women's 3-Piece Stitched Salwar Suit Set",
  netQuantity: "1 Set (Kurta: 1 N, Pant: 1 N, Dupatta: 1 N)",
  countryOfOrigin: "India (Handcrafted in Surat / Bengaluru)",
};

const catalog: Record<string, ProductDetail> = {
  "pure-cambric-cotton-set": apparelProduct,
  "cotton-salwar-suit": apparelProduct,
  "pure-cambric-cotton-salwar-suit-set": apparelProduct,
  "the-everyday-pair": apparelProduct,
  "the-stillness-set": {
    id: "the-stillness-set",
    sku: "SH-PRY-021-OL",
    kind: "non-apparel",
    name: "The Stillness Prayer Mat & Rehal Set",
    category: "Prayer",
    categoryTrail: ["Prayer & Worship", "Prayer Mats & Rehals"],
    price: 3499,
    mrp: 3999,
    rating: "4.9",
    reviewCount: 38,
    description: "A softly woven linen-cotton prayer mat with 15mm orthopaedic memory foam and solid beech folding rehal, made for quiet daily devotion.",
    gallery: [
      { src: productPrayer, alt: "Olive prayer mat with solid beech rehal", position: "object-center" },
      { src: productPrayer, alt: "Close view of the woven prayer mat texture and padding", position: "object-left" },
      { src: editorialHome, alt: "Stillness set in a calm prayer corner", position: "object-center" },
    ],
    colors: [
      { name: "Olive", swatch: "bg-primary" },
      { name: "Oat", swatch: "bg-secondary" },
      { name: "Mineral", swatch: "bg-mineral" },
    ],
    specifications: [
      ["Prayer Mat Dimensions", "115 × 70 cm"],
      ["Cushioning Core", "15mm High-Density Orthopaedic Memory Foam"],
      ["Mat Surface", "GOTS Organic Linen-Cotton Weave"],
      ["Mat Backing", "Durable anti-slip textured rubberized grip"],
      ["Folded Rehal", "28 × 19 × 4 cm (FSC-certified solid European beech wood)"],
      ["Set Weight", "Approximately 1.35 kg"],
    ],
    genericName: "Prayer Mat and Rehal Gift Set",
    netQuantity: "1 Set (Prayer Mat: 1 N, Solid Rehal: 1 N)",
    countryOfOrigin: "India (Handcrafted in Saharanpur & Panipat)",
  },
  "first-forms-set": {
    id: "first-forms-set",
    sku: "SH-KDS-008-NT",
    kind: "non-apparel",
    name: "First Forms Wooden Learning Set",
    category: "Children",
    categoryTrail: ["Children & Tarbiyah", "Learning & Habit Sets"],
    price: 1999,
    mrp: 2299,
    rating: "4.8",
    reviewCount: 24,
    description: "Natural beechwood tactile forms and organic cotton wrap for calm, low-noise sensory learning and tarbiyah.",
    gallery: [
      { src: productChild, alt: "Natural wooden forms and cotton blanket", position: "object-center" },
      { src: productChild, alt: "Close view of smooth beech forms", position: "object-center" },
    ],
    colors: [
      { name: "Natural Beech", swatch: "bg-clay" },
      { name: "Muted Ochre", swatch: "bg-secondary" },
    ],
    specifications: [
      ["Age Suitability", "3 to 8 Years"],
      ["Piece Count", "6 Solid Beechwood Nesting Elements + 1 Organic Wrap"],
      ["Wood Finish", "Food-safe, non-toxic natural beeswax coating"],
      ["Dimensions", "Stacking height 16 cm, base diameter 10 cm"],
      ["Materials", "FSC-certified beech and GOTS organic cotton"],
    ],
    genericName: "Children's Wooden Educational Learning Set",
    netQuantity: "1 Set (6 wooden elements, 1 organic cotton wrap)",
    countryOfOrigin: "India (Handcrafted in Channapatna / Karnataka)",
  },
};

function ProductPage() {
  const { productId } = Route.useParams();
  const product = useMemo(
    () => catalog[productId] ?? catalog["the-stillness-set"],
    [productId],
  );

  if (!product) return null;

  return <ProductExperience key={product.id} product={product} />;
}

function ProductExperience({ product }: { product: ProductDetail }) {
  const { addItem, setIsOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const firstAvailableSize = product.sizes?.find((size) => size.stock !== "sold-out")?.name;
  const [size, setSize] = useState<SizeName | undefined>(firstAvailableSize);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addResetRef = useRef<number | undefined>(undefined);

  const selectedSize = product.sizes?.find((option) => option.name === size);
  const savings = product.mrp - product.price;
  const discount = Math.round((savings / product.mrp) * 100);
  const orderTotal = product.price * quantity;
  const freeShipping = orderTotal >= 999;
  const whatsAppText = encodeURIComponent(
    `Hello Sukoon House, I would like to order ${product.name} (SKU: ${product.sku})${size ? `, Size: ${size}` : ""}, Colour: ${color}, Quantity: ${quantity}.`,
  );

  function addToBasket() {
    window.clearTimeout(addResetRef.current);
    setAdded(true);
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.mrp,
      image: product.gallery[0]?.src ?? "",
      size,
      color,
      quantity,
    });
    setIsOpen(true);
    addResetRef.current = window.setTimeout(() => setAdded(false), 2600);
  }

  function handleGalleryScroll(event: UIEvent<HTMLDivElement>) {
    const width = event.currentTarget.clientWidth;
    if (width === 0) return;
    setSelectedImage(Math.round(event.currentTarget.scrollLeft / width));
  }

  return (
    <div className="pb-20 lg:pb-0">
      <PageContainer className="py-4 sm:py-5">
        <nav className="flex min-w-0 items-center gap-1.5 overflow-hidden text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="shrink-0 transition-colors hover:text-foreground">Home</Link>
          {product.categoryTrail.map((item) => (
            <span key={item} className="contents">
              <ChevronRight className="size-3 shrink-0" />
              <Link to="/collection" className="shrink-0 transition-colors hover:text-foreground">{item}</Link>
            </span>
          ))}
          <ChevronRight className="size-3 shrink-0" />
          <span className="truncate text-foreground">{product.name}</span>
        </nav>
      </PageContainer>

      <PageContainer className="pb-14 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:gap-14">
          <section aria-label="Product gallery" className="min-w-0 lg:sticky lg:top-5 lg:self-start">
            <div className="hidden overflow-hidden rounded-sm bg-muted lg:block">
              <img
                key={selectedImage}
                src={product.gallery[selectedImage]?.src ?? product.gallery[0]?.src}
                alt={product.gallery[selectedImage]?.alt ?? product.name}
                className={cn(
                  "aspect-[4/5] size-full animate-in object-cover fade-in duration-500 hover:scale-110 motion-reduce:transition-none lg:transition-transform lg:duration-500",
                  product.gallery[selectedImage]?.position ?? "object-center",
                )}
                width={1000}
                height={1250}
              />
            </div>

            <div className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-sm bg-muted lg:hidden" onScroll={handleGalleryScroll}>
              {product.gallery.map((image) => (
                <div key={image.alt} className="aspect-[4/5] w-full shrink-0 snap-center">
                  <img src={image.src} alt={image.alt} className={cn("size-full object-cover", image.position)} width={800} height={1000} />
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-center gap-2 lg:hidden" aria-label="Image pagination">
              {product.gallery.map((image, index) => (
                <span key={image.alt} className={cn("size-1.5 rounded-full transition-colors", selectedImage === index ? "bg-primary" : "bg-border")} />
              ))}
            </div>

            <div className="mt-3 hidden grid-cols-3 gap-3 lg:grid" role="list" aria-label="Choose product image">
              {product.gallery.map((image, index) => (
                <Button
                  key={image.alt}
                  variant="ghost"
                  className={cn("h-auto overflow-hidden rounded-sm p-0 ring-offset-2", selectedImage === index && "ring-2 ring-primary")}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                >
                  <span className="aspect-square w-full overflow-hidden">
                    <img src={image.src} alt="" className={cn("size-full object-cover", image.position)} />
                  </span>
                </Button>
              ))}
            </div>
          </section>

          <section className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center rounded-full border border-border bg-secondary/45 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-eyebrow text-primary">
                {product.category}
              </div>
              {product.kind === "apparel" && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1 text-[0.68rem] font-semibold text-primary">
                  <ShieldCheck className="size-3.5 shrink-0 text-primary" />
                  <span>100% Non-Transparent · Attached Cotton Inner</span>
                </div>
              )}
            </div>
            <h1 className="mt-4 font-display text-4xl leading-none sm:text-5xl">{product.name}</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
            <a href="#reviews" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline decoration-border underline-offset-4 hover:decoration-primary">
              <Star className="size-4 fill-warning text-warning" /> {product.rating} · {product.reviewCount} customer reviews
            </a>

            <div className="mt-6 border-y border-border py-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-display text-4xl">₹{product.price.toLocaleString("en-IN")}</span>
                <span className="text-sm text-muted-foreground line-through">MRP ₹{product.mrp.toLocaleString("en-IN")}</span>
                <span className="rounded-full bg-success/12 px-2.5 py-1 text-xs font-bold text-success">Save ₹{savings} / {discount}% off</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Inclusive of all taxes · Free shipping on this order</p>
            </div>

            <div className="border-b border-border py-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="text-sm font-semibold">Color: <span className="font-normal">{color}</span></p>
                <span className="text-xs text-muted-foreground">{product.colors.length} colours</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Colour">
                {product.colors.map((option) => (
                  <Button
                    key={option.name}
                    variant="outline"
                    className={cn("h-11 px-3", color === option.name && "border-primary ring-1 ring-primary")}
                    onClick={() => setColor(option.name)}
                    role="radio"
                    aria-checked={color === option.name}
                  >
                    <span className={cn("size-4 shrink-0 rounded-full border border-border", option.swatch)} />
                    {option.name}
                  </Button>
                ))}
              </div>
            </div>

            {product.kind === "apparel" && product.sizes ? (
              <div className="border-b border-border py-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <p className="text-sm font-semibold">Select size: <span className="font-normal">{size}</span></p>
                  <SizeGuideDialog />
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Size">
                  {product.sizes.map((option) => (
                    <Button
                      key={option.name}
                      variant="outline"
                      className={cn(
                        "relative h-11 px-1",
                        size === option.name && "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                        option.stock === "sold-out" && "text-muted-foreground line-through",
                      )}
                      onClick={() => setSize(option.name)}
                      disabled={option.stock === "sold-out"}
                      role="radio"
                      aria-checked={size === option.name}
                      aria-label={`${option.name}, ${option.stock === "sold-out" ? "sold out" : option.stock === "low" ? "only 2 left" : "in stock"}`}
                    >
                      {option.name}
                    </Button>
                  ))}
                </div>
                <StockMessage stock={selectedSize?.stock} size={size} />
                <p className="mt-2 text-xs text-muted-foreground">
                  {size === "S" && "Garment Bust: 36″ · Recommended for Body Bust 32″–33″ with modest comfort ease"}
                  {size === "M" && "Garment Bust: 38″ · Recommended for Body Bust 34″–35″ with modest comfort ease"}
                  {size === "L" && "Garment Bust: 40″ · Recommended for Body Bust 36″–37″ with modest comfort ease"}
                  {size === "XL" && "Garment Bust: 42″ · Recommended for Body Bust 38″–39″ with modest comfort ease"}
                  {size === "XXL" && "Garment Bust: 44″ · Recommended for Body Bust 40″–41″ with modest comfort ease"}
                  {!size && "Select a size to view garment bust & body recommendations"}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{product.modelNote}</p>
              </div>
            ) : (
              <Specifications product={product} />
            )}

            <div className="py-5">
              <p className="text-sm font-semibold">Quantity</p>
              <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <div className="grid h-12 grid-cols-[2.75rem_2.25rem_2.75rem] items-center rounded-sm border border-input">
                  <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity" disabled={quantity === 1}><Minus /></Button>
                  <span className="text-center text-sm font-semibold" aria-live="polite">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => setQuantity(Math.min(8, quantity + 1))} aria-label="Increase quantity"><Plus /></Button>
                </div>
                <Button size="lg" className="h-12 w-full" onClick={addToBasket}>
                  {added ? <><Check /> Added{size ? ` · Size ${size}` : ""}</> : <><ShoppingBag /> Add to Basket · ₹{orderTotal.toLocaleString("en-IN")}</>}
                </Button>
              </div>
              <Button variant="outline" size="lg" className="mt-3 h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-left" asChild>
                <a href={`https://wa.me/919800000000?text=${whatsAppText}`} target="_blank" rel="noreferrer">
                  <MessageCircle />
                  <span><span className="block">Buy with WhatsApp</span><span className="mt-0.5 block text-[0.68rem] font-normal text-muted-foreground">Send SKU &amp; Size for direct assistance</span></span>
                </a>
              </Button>
            </div>

            <PincodeChecker />

            <ShippingMeter total={orderTotal} qualified={freeShipping} />
          </section>
        </div>
      </PageContainer>

      <section className="border-y border-border bg-secondary/30">
        <PageContainer className="py-10 lg:py-14">
          <div className="grid gap-3 md:grid-cols-3">
            <TrustItem icon={ShieldCheck} title="100% Non-Transparent" copy="Pure cotton with attached breathable inner lining." />
            <TrustItem icon={Leaf} title="100% Cambric Cotton" copy="Pre-washed, soft on sensitive skin, and tested for colorfastness." />
            <TrustItem icon={CircleCheck} title="Hassle-Free 7-Day Exchange" copy="Easy doorstep size exchange if the fit isn't right." />
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-10 lg:py-16">
        <h2 className="font-display text-3xl">Product details &amp; declarations</h2>
        <Accordion type="multiple" className="mt-6 border-t border-border">
          <AccordionItem value="fabric">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">Fabric, Modesty Cut &amp; Care Details</AccordionTrigger>
            <AccordionContent className="space-y-4 pr-6 leading-6 text-muted-foreground">
              {product.kind === "apparel" ? (
                <div className="space-y-3 text-xs leading-5 sm:text-sm sm:leading-6">
                  <div className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)]">
                    <span className="font-semibold text-foreground">Fabric &amp; Weave:</span>
                    <span>Pure 60s Cambric Cotton (Top &amp; Bottom), Lightweight Pure Cotton Malmal (Dupatta). Pre-washed and colorfast.</span>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)]">
                    <span className="font-semibold text-foreground">Inner Lining:</span>
                    <span>Attached pure breathable cotton voil inner lining across the torso; sleeves kept unlined for cool summer breathability. Guaranteed 100% non-transparent.</span>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)]">
                    <span className="font-semibold text-foreground">Modesty Cut:</span>
                    <span>Modest 6.5″ scoop neck with modesty placket stay; full 21″ sleeve length with tailored cuffs; side slits reinforced at 18″.</span>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)]">
                    <span className="font-semibold text-foreground">Tailoring Margins:</span>
                    <span>2-inch internal seam margins included on both sides for effortless custom sizing adjustments.</span>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)]">
                    <span className="font-semibold text-foreground">Care Instructions:</span>
                    <span>Gentle machine or hand wash in cold water with mild liquid detergent. Line dry in shade to protect natural botanical dyes. Medium steam iron.</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs leading-5 sm:text-sm sm:leading-6">
                  {product.specifications.map(([label, value]) => (
                    <div key={label} className="grid gap-1 sm:grid-cols-[10rem_minmax(0,1fr)]">
                      <span className="font-semibold text-foreground">{label}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="statutory">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">Statutory Declarations (Legal Metrology / LMPC)</AccordionTrigger>
            <AccordionContent>
              <dl className="grid gap-x-6 gap-y-3 text-sm leading-6 sm:grid-cols-[12rem_minmax(0,1fr)]">
                <Declaration label="Generic Name" value={product.genericName} />
                <Declaration label="Net Quantity" value={product.netQuantity} />
                <Declaration label="Maximum Retail Price (MRP)" value={`₹${product.mrp.toLocaleString("en-IN")}.00 (Inclusive of all taxes)`} />
                <Declaration label="Unit Sale Price (USP)" value={`₹${product.price.toLocaleString("en-IN")}.00 per Set`} />
                <Declaration label="Country of Origin" value={product.countryOfOrigin} />
                <Declaration label="Consumer Care" value="support@sukoonhouse.in | +91 98XXX XXXXX" />
              </dl>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">Shipping &amp; 7-Day Doorstep Exchange Policy</AccordionTrigger>
            <AccordionContent className="space-y-3 pr-6 leading-6 text-muted-foreground">
              <p>Dispatched within 24–48 hours via express air courier.</p>
              <p>Delivery in 2–4 business days across major Indian metros; 4–6 days for the rest of India.</p>
              <p>Reverse pickup is arranged directly from your doorstep for size exchanges.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </PageContainer>

      <section id="reviews" className="border-t border-border">
        <PageContainer className="py-10">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <span className="font-display text-4xl">{product.rating}</span>
            <div className="min-w-0"><p className="font-semibold">Loved by {product.reviewCount} customers</p><p className="text-sm text-muted-foreground">Verified customer ratings for comfort, material, and finish.</p></div>
          </div>
        </PageContainer>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-lifted backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0"><p className="truncate text-sm font-semibold">₹{orderTotal.toLocaleString("en-IN")} {size ? `· Size ${size}` : ""}</p><p className="truncate text-[0.68rem] text-muted-foreground">{color} · Qty {quantity}</p></div>
          <Button onClick={addToBasket}>{added ? <><Check /> Added</> : <><ShoppingBag /> Add to Basket</>}</Button>
        </div>
      </div>
    </div>
  );
}

function StockMessage({ stock, size }: { stock?: SizeOption["stock"]; size?: SizeName }) {
  if (!stock || !size) return null;
  if (stock === "low") return <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-warning-foreground"><Zap className="size-4 fill-warning text-warning" /> Only 2 left in size {size}</p>;
  return <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-success"><CircleCheck className="size-4" /> In Stock — Dispatched within 24 hours</p>;
}

function Specifications({ product }: { product: ProductDetail }) {
  return (
    <div className="border-b border-border py-5">
      <p className="text-sm font-semibold">Dimensions &amp; specifications</p>
      <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
        {product.specifications.map(([label, value]) => (
          <div key={label} className="min-w-0 bg-background p-3"><dt className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">{label}</dt><dd className="mt-1 text-sm leading-5">{value}</dd></div>
        ))}
      </dl>
    </div>
  );
}

function PincodeChecker() {
  const [pincode, setPincode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user_pincode") || "";
    }
    return "";
  });
  const [checkedPincode, setCheckedPincode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_pincode");
      return saved && saved.length === 6 ? saved : "";
    }
    return "";
  });

  const estimatedDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  }, []);

  function handleCheck() {
    const trimmed = pincode.trim();
    if (trimmed.length === 6) {
      setCheckedPincode(trimmed);
      if (typeof window !== "undefined") {
        localStorage.setItem("user_pincode", trimmed);
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCheck();
    }
  }

  return (
    <div className="border-t border-border py-4">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
        <MapPin className="size-3.5 text-primary" />
        <span>Delivery &amp; Serviceability Check</span>
      </div>
      <div className="mt-2.5 flex max-w-xs gap-2">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setPincode(val);
            if (val.length === 6) {
              setCheckedPincode(val);
              if (typeof window !== "undefined") {
                localStorage.setItem("user_pincode", val);
              }
            } else {
              setCheckedPincode("");
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter 6-digit Pincode"
          className="h-9 w-full rounded-sm border border-input bg-background px-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 shrink-0 px-3 text-xs"
          onClick={handleCheck}
          disabled={pincode.length !== 6}
        >
          Check
        </Button>
      </div>

      {checkedPincode && checkedPincode.length === 6 ? (
        <div className="mt-3 space-y-1.5 rounded-sm bg-secondary/35 p-3 text-xs">
          <p className="flex items-center gap-1.5 font-medium text-foreground">
            <Truck className="size-3.5 shrink-0 text-primary" />
            <span>Delivery to <strong className="font-semibold">{checkedPincode}</strong> by <strong className="font-semibold text-primary">{estimatedDateStr}</strong> (Express Air)</span>
          </p>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <CircleCheck className="size-3.5 shrink-0 text-success" />
            <span>Cash on Delivery (COD) Available</span>
          </p>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <RotateCcw className="size-3.5 shrink-0 text-primary" />
            <span>Free 7-Day Doorstep Size Exchange with Reverse Courier Pickup</span>
          </p>
        </div>
      ) : (
        <p className="mt-2 text-[0.7rem] text-muted-foreground">
          Enter your delivery pincode to check dispatch timelines &amp; COD availability.
        </p>
      )}
    </div>
  );
}

function ShippingMeter({ total, qualified }: { total: number; qualified: boolean }) {
  const remaining = Math.max(0, 999 - total);
  return (
    <div className="border-y border-border py-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs">
        <p className="min-w-0 font-semibold">{qualified ? "Free shipping unlocked" : `Add ₹${remaining} for free shipping`}</p>
        <span className="shrink-0 text-muted-foreground">₹999 threshold</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Free shipping progress" aria-valuemin={0} aria-valuemax={999} aria-valuenow={Math.min(total, 999)}><div className={cn("h-full rounded-full bg-primary transition-[width]", qualified ? "w-full" : "w-2/3")} /></div>
      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Truck className="size-4 text-primary" /> 7-day size exchange with doorstep reverse pickup</p>
    </div>
  );
}

function TrustItem({ icon: Icon, title, copy }: { icon: typeof ShieldCheck; title: string; copy: string }) {
  return <article className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 border border-border bg-card p-5"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Icon className="size-5" /></span><div className="min-w-0"><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{copy}</p></div></article>;
}

function Declaration({ label, value }: { label: string; value: string }) {
  return <><dt className="font-semibold text-foreground">{label}</dt><dd className="border-b border-border pb-3 text-muted-foreground sm:border-0 sm:pb-0">{value}</dd></>;
}
