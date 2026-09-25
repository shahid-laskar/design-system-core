import { useMemo, useRef, useState, useEffect, type KeyboardEvent, type UIEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCommerceProduct } from "@/lib/commerce/use-commerce";
import { resolveProductBySlug } from "@/lib/commerce/catalog-data";
import {
  Camera,
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
  ThumbsUp,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import {
  getStoreProductReviews,
  createStoreProductReview,
  type StoreProductReview,
  type StoreReviewStats,
} from "@/lib/commerce/client";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const item = resolveProductBySlug(params.productId);
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

type SizeName = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL";
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
  const { data: liveProduct } = useCommerceProduct(productId);

  const product = useMemo(() => {
    if (liveProduct) return liveProduct;
    return resolveProductBySlug(productId);
  }, [liveProduct, productId]);

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
  const [sizeDrawerOpen, setSizeDrawerOpen] = useState(false);
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

    let matchedVariantId: string | undefined;
    if (product.variants && product.variants.length > 0) {
      const match = product.variants.find((v) => {
        if (size) {
          return (
            v.title?.toLowerCase().includes(size.toLowerCase()) ||
            Object.values(v.options || {}).some(
              (val) => val.toLowerCase() === size.toLowerCase()
            )
          );
        }
        return true;
      });
      matchedVariantId = match?.id || product.variants[0].id;
    }

    addItem({
      id: product.handle || product.id,
      variantId: matchedVariantId,
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

  function handleMobilePurchaseClick() {
    if (product.kind === "apparel" && product.sizes && !size) {
      setSizeDrawerOpen(true);
      return;
    }
    addToBasket();
  }

  function handleSelectSizeAndAdd(chosenSize: SizeName) {
    setSize(chosenSize);
    setSizeDrawerOpen(false);
    window.clearTimeout(addResetRef.current);
    setAdded(true);

    let matchedVariantId: string | undefined;
    if (product.variants && product.variants.length > 0) {
      const match = product.variants.find((v) => {
        return (
          v.title?.toLowerCase().includes(chosenSize.toLowerCase()) ||
          Object.values(v.options || {}).some(
            (val) => val.toLowerCase() === chosenSize.toLowerCase()
          )
        );
      });
      matchedVariantId = match?.id || product.variants[0].id;
    }

    addItem({
      id: product.handle || product.id,
      variantId: matchedVariantId,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.mrp,
      image: product.gallery[0]?.src ?? "",
      size: chosenSize,
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
    <div className="pb-28 lg:pb-0">
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
                  <SizeGuideDialog
                    defaultCategory={
                      product.category.toLowerCase().includes("men")
                        ? "men"
                        : product.category.toLowerCase().includes("child")
                          ? "children"
                          : "women"
                    }
                  />
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

      <CrossSellEnsemble product={product} />

      <ProductReviewHub product={product} />

      {/* Mobile Persistent Bottom Dock */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-lifted backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              ₹{orderTotal.toLocaleString("en-IN")}{" "}
              <span className="rounded-xs bg-secondary/60 px-1.5 py-0.5 text-xs font-normal text-primary">
                {size ? `Size ${size}` : "Select Size"}
              </span>
            </p>
            <p className="truncate text-[0.68rem] text-muted-foreground">{color} · Qty {quantity}</p>
          </div>
          <Button size="lg" className="h-11 px-5 font-semibold" onClick={handleMobilePurchaseClick}>
            {added ? (
              <>
                <Check className="size-4" /> Added{size ? ` · ${size}` : ""}
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" /> Add to Basket
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Size Selection Bottom Sheet Fallback */}
      {product.kind === "apparel" && product.sizes && (
        <Sheet open={sizeDrawerOpen} onOpenChange={setSizeDrawerOpen}>
          <SheetContent side="bottom" className="rounded-t-xl border-t border-border bg-background p-5 sm:mx-auto sm:max-w-md">
            <SheetHeader className="text-left">
              <div className="flex items-center gap-3">
                <img
                  src={product.gallery[0]?.src}
                  alt={product.name}
                  className="size-14 shrink-0 rounded-sm bg-muted object-cover"
                />
                <div className="min-w-0">
                  <SheetTitle className="truncate font-display text-lg leading-tight">
                    {product.name}
                  </SheetTitle>
                  <SheetDescription className="mt-0.5 text-xs text-muted-foreground">
                    ₹{product.price.toLocaleString("en-IN")} · Choose size to add to basket
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-foreground">Select Size:</p>
                <SizeGuideDialog
                  defaultCategory={
                    product.category.toLowerCase().includes("men")
                      ? "men"
                      : product.category.toLowerCase().includes("child")
                        ? "children"
                        : "women"
                  }
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {product.sizes.map((option) => (
                  <Button
                    key={option.name}
                    variant="outline"
                    className={cn(
                      "flex h-14 flex-col items-center justify-center rounded-sm border p-1",
                      option.stock === "sold-out" && "cursor-not-allowed opacity-40 line-through",
                      size === option.name && "border-primary bg-primary/10 font-semibold text-primary",
                    )}
                    disabled={option.stock === "sold-out"}
                    onClick={() => handleSelectSizeAndAdd(option.name)}
                  >
                    <span className="text-sm font-bold">{option.name}</span>
                    <span className="text-[0.65rem] text-muted-foreground">
                      {option.name === "S" ? "Bust 36″" : option.name === "M" ? "Bust 38″" : option.name === "L" ? "Bust 40″" : option.name === "XL" ? "Bust 42″" : "Bust 44″"}
                    </span>
                  </Button>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Tapping a size will immediately add it to your basket.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      )}
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

function CrossSellEnsemble({ product }: { product: ProductDetail }) {
  const { addItem, setIsOpen } = useCart();
  const [bundleAdded, setBundleAdded] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const companions = useMemo(() => {
    if (product.kind === "apparel") {
      return [
        {
          id: "matching-daily-hijab",
          name: "Matching Micro-Modal Silk Daily Hijab (Sage)",
          category: "Hijabs & Scarves",
          price: 499,
          image: productModest,
          color: "Sage Green",
          note: "Featherlight, breathable drape with subtle sheen.",
        },
        {
          id: "magnetic-pins-set",
          name: "Snag-Free Matte Magnetic Hijab Pins (Set of 4)",
          category: "Modesty Accessories",
          price: 199,
          image: productChild,
          note: "Ultra-strong neodymium magnets that protect fine fabrics.",
        },
      ];
    }
    return [
      {
        id: "solid-beech-rehal",
        name: "Solid Beechwood Folding Rehal",
        category: "Prayer Companions",
        price: 899,
        image: productPrayer,
        note: "Hand-finished FSC-certified timber with non-toxic wax.",
      },
      {
        id: "olive-jade-tasbih",
        name: "Handcrafted 33-Bead Natural Olive Jade Tasbih",
        category: "Tasbihs",
        price: 499,
        image: editorialHome,
        note: "Natural mineral beads strung on braided silk cord.",
      },
    ];
  }, [product.kind]);

  const bundleTotal = companions.reduce((acc, c) => acc + c.price, 0);

  function handleAddSingle(item: (typeof companions)[number]) {
    addItem({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      originalPrice: item.price,
      image: item.image,
      ...(item.color ? { color: item.color } : {}),
      quantity: 1,
    });
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setIsOpen(true);
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  }

  function handleAddBundle() {
    companions.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        originalPrice: item.price,
        image: item.image,
        ...(item.color ? { color: item.color } : {}),
        quantity: 1,
      });
    });
    setBundleAdded(true);
    setIsOpen(true);
    setTimeout(() => setBundleAdded(false), 2600);
  }

  return (
    <section className="border-t border-border bg-secondary/25 py-12 lg:py-16">
      <PageContainer>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-primary">Pair &amp; Elevate</p>
            <h2 className="font-display text-2xl sm:text-3xl">Complete Your Modest Ensemble</h2>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Handpicked companion pieces designed to coordinate seamlessly with this style.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button
              variant="default"
              size="sm"
              onClick={handleAddBundle}
              className="h-10 text-xs font-semibold sm:text-sm"
            >
              {bundleAdded ? (
                <>
                  <Check className="size-4" /> Added Both to Basket
                </>
              ) : (
                <>
                  <Plus className="size-4" /> Add Both Companions · ₹{bundleTotal.toLocaleString("en-IN")}
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {companions.map((comp) => (
            <article
              key={comp.id}
              className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 rounded-sm border border-border bg-card p-4 transition-shadow hover:shadow-soft"
            >
              <div className="aspect-square overflow-hidden rounded-sm bg-muted">
                <img src={comp.image} alt={comp.name} className="size-full object-cover" />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    {comp.category}
                  </span>
                  <h3 className="font-display text-base font-semibold leading-tight text-foreground">
                    {comp.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{comp.note}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">
                    ₹{comp.price.toLocaleString("en-IN")}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 text-xs font-semibold"
                    onClick={() => handleAddSingle(comp)}
                  >
                    {addedItemIds[comp.id] ? (
                      <>
                        <Check className="size-3 text-success" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="size-3" /> Quick Add
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

type ReviewItem = {
  id: string;
  apparelAttributes?: { fit?: string; opacity?: string };
  author: string;
  location: string;
  verified: boolean;
  rating: number;
  date: string;
  variant: string;
  title: string;
  body: string;
  initialHelpful: number;
  photo?: string;
  tags: string[];
};

const sampleReviews: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Farhana K.",
    location: "Bengaluru, Karnataka",
    verified: true,
    rating: 5,
    date: "14 Sep 2026",
    variant: "Purchased Size M · Sage Green",
    title: "Finally a brand that understands modesty & cotton quality!",
    body: "I was so hesitant to buy clothes online because so many kurtas end up see-through in the sun. This suit is 100% non-transparent thanks to the soft attached cotton lining. Cambric cotton feels breathable even in 32-degree weather. Size M fits with just the right amount of ease.",
    initialHelpful: 24,
    photo: productModest,
    tags: ["photos", "5star", "fit", "verified"],
  },
  {
    id: "rev-2",
    author: "Amina S.",
    location: "Hyderabad, Telangana",
    verified: true,
    rating: 5,
    date: "09 Sep 2026",
    variant: "Purchased Size XL · Sage Green",
    title: "Perfect for Jummah and family gatherings",
    body: "Beautiful finish on the neckline and the sleeves are genuinely full length (covers wrists properly). The malmal dupatta is lightweight and doesn't slip off the head constantly.",
    initialHelpful: 19,
    photo: editorialHome,
    tags: ["photos", "5star", "fit", "verified"],
  },
  {
    id: "rev-3",
    author: "Zoya M.",
    location: "Delhi NCR",
    verified: true,
    rating: 4,
    date: "03 Sep 2026",
    variant: "Purchased Size S · Sage Green",
    title: "Very soft fabric, pants fit comfortably",
    body: "The pants have elastic and pockets! Kurta length is modest (below knees). Deducted one star only because delivery took 4 days to East Delhi, but the product itself is exceptional.",
    initialHelpful: 11,
    tags: ["fit", "verified"],
  },
];

function ProductReviewHub({ product }: { product: ProductDetail }) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [liveReviews, setLiveReviews] = useState<StoreProductReview[]>([]);
  const [stats, setStats] = useState<StoreReviewStats | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State
  const [rating, setRating] = useState(5);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [fitAttribute, setFitAttribute] = useState<"true_to_size" | "tight" | "loose">("true_to_size");
  const [opacityAttribute, setOpacityAttribute] = useState<"opaque" | "semi_opaque" | "sheer">("opaque");
  const [photoUrl, setPhotoUrl] = useState("");

  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({
    "rev-1": 24,
    "rev-2": 19,
    "rev-3": 11,
  });
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});
  const [activePhoto, setActivePhoto] = useState<{
    src: string;
    author: string;
    variant: string;
    title: string;
  } | null>(null);

  // Fetch live reviews from Medusa backend
  useEffect(() => {
    let isMounted = true;
    async function loadReviews() {
      try {
        const res = await getStoreProductReviews(product.id);
        if (isMounted && res) {
          if (res.reviews) setLiveReviews(res.reviews);
          if (res.stats) setStats(res.stats);
        }
      } catch {
        // Fallback gracefully to offline sample reviews
      }
    }
    loadReviews();
    return () => {
      isMounted = false;
    };
  }, [product.id]);

  const allReviews = useMemo(() => {
    const formattedLive = liveReviews.map((lr) => ({
      id: lr.id,
      author: lr.customer_name,
      location: "Verified Community",
      verified: lr.verified_purchase,
      rating: lr.rating,
      date: new Date(lr.created_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      variant: lr.purchased_variant_sku ? `Variant: ${lr.purchased_variant_sku}` : "Verified Buyer",
      title: lr.title,
      body: lr.body,
      initialHelpful: lr.helpful_count || 0,
      photo: lr.photos?.[0],
      tags: [
        lr.photos?.length ? "photos" : "",
        lr.rating === 5 ? "5star" : "",
        "fit",
        lr.verified_purchase ? "verified" : "",
      ].filter(Boolean),
      apparelAttributes: lr.apparel_attributes,
    }));

    return [...formattedLive, ...sampleReviews];
  }, [liveReviews]);

  const filteredReviews = useMemo(() => {
    if (selectedFilter === "all") return allReviews;
    if (selectedFilter === "photos") return allReviews.filter((r) => Boolean(r.photo));
    if (selectedFilter === "5star") return allReviews.filter((r) => r.rating === 5);
    if (selectedFilter === "fit") return allReviews.filter((r) => r.tags.includes("fit"));
    if (selectedFilter === "verified") return allReviews.filter((r) => r.verified);
    return allReviews;
  }, [selectedFilter, allReviews]);

  function handleHelpful(id: string) {
    if (votedMap[id]) return;
    setHelpfulMap((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    setVotedMap((prev) => ({ ...prev, [id]: true }));
  }

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!customerName.trim() || !customerEmail.trim() || !reviewTitle.trim() || !reviewBody.trim()) {
      setSubmitError("Please fill in your name, email, review title, and details.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createStoreProductReview(product.id, {
        rating,
        title: reviewTitle.trim(),
        body: reviewBody.trim(),
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        order_id: orderId.trim() || undefined,
        apparel_attributes: {
          fit: fitAttribute,
          opacity: opacityAttribute,
        },
        photos: photoUrl.trim() ? [photoUrl.trim()] : undefined,
      });

      setSubmitSuccess(true);
      // Reset form
      setReviewTitle("");
      setReviewBody("");
      setPhotoUrl("");
      setOrderId("");
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const displayRating = stats?.average_rating ? stats.average_rating.toFixed(1) : product.rating;
  const displayCount = (stats?.review_count || 0) + sampleReviews.length;
  const trueToSizePct = stats?.apparel_attributes?.true_to_size_percentage || 88;
  const opacityPct = stats?.apparel_attributes?.opacity_guarantee_percentage || 97;

  return (
    <section id="reviews" className="border-t border-border bg-background py-12 lg:py-20">
      <PageContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-primary">Family Trust &amp; Reviews</p>
            <h2 className="font-display text-3xl sm:text-4xl">Customer Ratings &amp; Experiences</h2>
          </div>
          <Button
            variant="outline"
            className="self-start rounded-full border-primary/40 px-5 text-xs font-semibold text-primary hover:bg-primary/5 sm:self-auto"
            onClick={() => {
              setIsReviewModalOpen(true);
              setSubmitSuccess(false);
              setSubmitError(null);
            }}
          >
            Write a Review
          </Button>
        </div>

        {/* Top Grid: Rating Distribution + Sentiment Bars */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
          {/* Column 1: Overall Score & 5-Star Histogram */}
          <div className="rounded-sm border border-border bg-card p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-semibold text-foreground">{displayRating}</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <span className="mt-1 text-xs text-muted-foreground">Based on {displayCount} verified family ratings</span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              {[
                { stars: 5, pct: 84, count: 32 },
                { stars: 4, pct: 13, count: 5 },
                { stars: 3, pct: 3, count: 1 },
                { stars: 2, pct: 0, count: 0 },
                { stars: 1, pct: 0, count: 0 },
              ].map(({ stars, pct, count }) => (
                <div key={stars} className="grid grid-cols-[2.5rem_minmax(0,1fr)_3rem] items-center gap-3 text-xs">
                  <span className="font-medium text-muted-foreground">{stars} ★</span>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-right text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Structured Sentiment Bars */}
          <div className="rounded-sm border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">Verified Customer Sentiment</h3>
            <p className="mt-1 text-xs text-muted-foreground">Aggregated feedback on fit, modesty opacity, and fabric durability.</p>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">Size &amp; Fit Accuracy</span>
                  <span className="font-semibold text-primary">{trueToSizePct}% True to size</span>
                </div>
                <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${trueToSizePct}%` }} title={`True to size (${trueToSizePct}%)`} />
                  <div className="h-full bg-secondary" style={{ width: "8%" }} title="Runs loose (8%)" />
                  <div className="h-full bg-border" style={{ width: "4%" }} title="Runs tight (4%)" />
                </div>
                <div className="mt-1 flex justify-between text-[0.68rem] text-muted-foreground">
                  <span>Runs tight</span>
                  <span>True to size ({trueToSizePct}%)</span>
                  <span>Runs loose</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">Fabric Opacity / Modesty</span>
                  <span className="font-semibold text-success">{opacityPct}% 100% Non-Transparent</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-success" style={{ width: `${opacityPct}%` }} />
                </div>
                <p className="mt-1 text-[0.68rem] text-muted-foreground">Attached inner lining guarantees complete confidence in bright daylight.</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">Fabric Softness &amp; Breathability</span>
                  <span className="font-semibold text-primary">95% Soft Cambric Weave</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: "95%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">Colorfastness After Washing</span>
                  <span className="font-semibold text-primary">92% Zero Bleed</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: "92%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Customer Photos Carousel */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Camera className="size-4 text-primary" />
              <span>Customer Photos &amp; Everyday Styling (12)</span>
            </h3>
            <span className="text-xs text-muted-foreground">Real home photos by verified buyers</span>
          </div>

          <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none">
            {allReviews
              .filter((r) => r.photo)
              .map((rev) => (
                <button
                  key={rev.id}
                  type="button"
                  onClick={() =>
                    setActivePhoto({
                      src: rev.photo!,
                      author: rev.author,
                      variant: rev.variant,
                      title: rev.title,
                    })
                  }
                  className="group relative aspect-[4/5] w-36 shrink-0 snap-start overflow-hidden rounded-sm border border-border bg-muted text-left focus:outline-none focus:ring-2 focus:ring-primary sm:w-44"
                >
                  <img
                    src={rev.photo}
                    alt={`Customer photo by ${rev.author}`}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2 text-white">
                    <p className="truncate text-xs font-semibold">{rev.author}</p>
                    <p className="truncate text-[0.68rem] text-white/80">{rev.variant}</p>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-border pb-4">
          {[
            { id: "all", label: `All Reviews (${allReviews.length})` },
            { id: "photos", label: `With Photos (${allReviews.filter((r) => r.photo).length})` },
            { id: "5star", label: `5 Star Only (${allReviews.filter((r) => r.rating === 5).length})` },
            { id: "fit", label: "Fit & Sizing" },
            { id: "verified", label: "Verified Buyers Only" },
          ].map(({ id, label }) => (
            <Button
              key={id}
              variant={selectedFilter === id ? "default" : "outline"}
              size="sm"
              className={cn("h-8 rounded-full px-3 text-xs", selectedFilter === id && "font-semibold")}
              onClick={() => setSelectedFilter(id)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Individual Review Cards */}
        <div className="mt-6 divide-y divide-border">
          {filteredReviews.map((rev) => (
            <article key={rev.id} className="py-6 first:pt-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{rev.author}</span>
                    <span className="text-xs text-muted-foreground">· {rev.location}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-[0.68rem] font-semibold text-success">
                        <Check className="size-3" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-warning">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn("size-3.5", i < rev.rating ? "fill-current" : "text-muted")}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-foreground/80">{rev.variant}</span>
                    {rev.apparelAttributes?.fit && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] text-muted-foreground">
                        Fit: {rev.apparelAttributes.fit === "true_to_size" ? "True to Size" : rev.apparelAttributes.fit}
                      </span>
                    )}
                    {rev.apparelAttributes?.opacity && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] text-muted-foreground">
                        Opacity: {rev.apparelAttributes.opacity === "opaque" ? "100% Opaque" : rev.apparelAttributes.opacity}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{rev.date}</span>
              </div>

              <h4 className="mt-3 text-sm font-semibold text-foreground">{rev.title}</h4>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{rev.body}</p>

              {rev.photo && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePhoto({
                        src: rev.photo!,
                        author: rev.author,
                        variant: rev.variant,
                        title: rev.title,
                      })
                    }
                    className="inline-block overflow-hidden rounded-sm border border-border hover:opacity-90"
                  >
                    <img
                      src={rev.photo}
                      alt={`Photo review from ${rev.author}`}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                </div>
              )}

              <div className="mt-4 flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleHelpful(rev.id)}
                  className={cn(
                    "h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground",
                    votedMap[rev.id] && "font-semibold text-primary",
                  )}
                  disabled={votedMap[rev.id]}
                >
                  <ThumbsUp className="mr-1.5 size-3" />
                  <span>
                    {votedMap[rev.id]
                      ? "Helpful (Marked)"
                      : `Helpful (${helpfulMap[rev.id] ?? rev.initialHelpful})`}
                  </span>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Customer Photo Lightbox Dialog */}
        <Dialog open={Boolean(activePhoto)} onOpenChange={(open) => !open && setActivePhoto(null)}>
          <DialogContent className="max-w-xl p-4 sm:p-6">
            <DialogHeader className="text-left">
              <DialogTitle className="font-display text-xl font-medium">{activePhoto?.title}</DialogTitle>
              <DialogDescription>
                Customer photo shared by {activePhoto?.author} ({activePhoto?.variant})
              </DialogDescription>
            </DialogHeader>
            {activePhoto && (
              <div className="mt-3 overflow-hidden rounded-sm bg-muted">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Write a Review Dialog */}
        <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
          <DialogContent className="max-w-lg p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="text-left">
              <DialogTitle className="font-display text-2xl">Share Your Experience</DialogTitle>
              <DialogDescription>
                Help other families choose with confidence. Honest feedback on fabric, opacity, and fit is deeply valued.
              </DialogDescription>
            </DialogHeader>

            {submitSuccess ? (
              <div className="my-6 rounded-md border border-success/30 bg-success/10 p-4 text-center">
                <CircleCheck className="mx-auto size-8 text-success" />
                <h4 className="mt-2 text-base font-semibold text-success">Review Submitted!</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Thank you for your thoughtful words. Your review has been submitted for moderation and will appear publicly once verified.
                </p>
                <Button
                  className="mt-4"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsReviewModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                {submitError && (
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                    {submitError}
                  </div>
                )}

                {/* Rating Stars */}
                <div>
                  <Label className="text-xs font-semibold">Your Rating</Label>
                  <div className="mt-1.5 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={cn(
                            "size-6",
                            starVal <= rating
                              ? "fill-warning text-warning"
                              : "text-muted hover:text-warning"
                          )}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-medium text-muted-foreground">
                      {rating === 5 ? "Exceptional" : rating === 4 ? "Very Good" : rating === 3 ? "Average" : "Needs Improvement"}
                    </span>
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="review-name" className="text-xs font-semibold">
                      Your Name *
                    </Label>
                    <Input
                      id="review-name"
                      required
                      placeholder="e.g. Amina Qureshi"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-1 h-9 text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="review-email" className="text-xs font-semibold">
                      Email Address *
                    </Label>
                    <Input
                      id="review-email"
                      type="email"
                      required
                      placeholder="e.g. amina@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="mt-1 h-9 text-xs"
                    />
                    <span className="text-[0.65rem] text-muted-foreground">Used for verified buyer check</span>
                  </div>
                </div>

                {/* Order ID */}
                <div>
                  <Label htmlFor="review-order" className="text-xs font-semibold">
                    Order ID (Optional)
                  </Label>
                  <Input
                    id="review-order"
                    placeholder="e.g. 1001 or order_01..."
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                  <span className="text-[0.65rem] text-muted-foreground">Earns a Verified Buyer trust badge</span>
                </div>

                {/* Apparel Attributes: Fit & Opacity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-sm border border-border p-3 bg-muted/30">
                  <div>
                    <Label className="text-xs font-semibold">Sizing &amp; Fit</Label>
                    <select
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      value={fitAttribute}
                      onChange={(e) => setFitAttribute(e.target.value as any)}
                    >
                      <option value="true_to_size">True to Size (Recommended)</option>
                      <option value="tight">Runs Tight</option>
                      <option value="loose">Runs Loose / Oversized</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Fabric Opacity / Modesty</Label>
                    <select
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      value={opacityAttribute}
                      onChange={(e) => setOpacityAttribute(e.target.value as any)}
                    >
                      <option value="opaque">100% Non-Transparent / Opaque</option>
                      <option value="semi_opaque">Semi-Opaque (Light Layer Needed)</option>
                      <option value="sheer">Sheer</option>
                    </select>
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <Label htmlFor="review-title" className="text-xs font-semibold">
                    Review Headline *
                  </Label>
                  <Input
                    id="review-title"
                    required
                    placeholder="e.g. Perfect modesty and soft cambric drape"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>

                {/* Review Body */}
                <div>
                  <Label htmlFor="review-body" className="text-xs font-semibold">
                    Your Review *
                  </Label>
                  <Textarea
                    id="review-body"
                    required
                    rows={4}
                    placeholder="Share how the fabric felt, how it held up after washing, and how the sizing fit your body..."
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    className="mt-1 text-xs resize-none"
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <Label htmlFor="review-photo" className="text-xs font-semibold">
                    Photo URL (Optional)
                  </Label>
                  <Input
                    id="review-photo"
                    placeholder="https://... photo of styling or texture"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="mt-1 h-9 text-xs"
                  />
                </div>

                <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsReviewModalOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground font-semibold"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </PageContainer>
    </section>
  );
}
