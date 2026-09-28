import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Gift,
  Grid2X2,
  Heart,
  Home,
  Menu,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { CommerceImage } from "@/components/brand/commerce-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/brand/design-primitives";
import { CartDrawer } from "@/components/brand/cart-drawer";
import { useCart } from "@/lib/cart-context";
import { useCommerceProducts, type CollectionProduct } from "@/lib/commerce/use-commerce";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const RECENT_SEARCH_KEY = "sukoon-recent-searches";

const pillars = [
  {
    label: "Women",
    category: "women",
    subcategories: ["Salwar Suits", "Kurta Sets", "Abayas", "Hijabs & Modesty Pins"],
  },
  {
    label: "Men",
    category: "men",
    subcategories: ["Cotton Kurtas", "Kurta-Pajamas", "Pathanis", "Thobes", "Kufi Caps"],
  },
  {
    label: "Kids",
    category: "children",
    subcategories: ["Boys' Kurta Sets", "Girls' Ethnic Sets", "Salah Habit Trackers", "Books"],
  },
  {
    label: "Prayer",
    category: "prayer",
    subcategories: ["Memory Foam Mats", "Bentwood Rehals", "Stone Tasbihs", "Travel Mats"],
  },
  {
    label: "Learning",
    category: "learning",
    subcategories: ["Dua & Hadith Decks", "Arabic Alphabet Boards", "Bedtime Books"],
  },
  {
    label: "Home",
    category: "home",
    subcategories: ["Brass Bakhoor Burners", "Arabic Wall Art", "Attar Oils", "Ramadan Countdowns"],
  },
  {
    label: "Gifts",
    category: "gifts",
    subcategories: ["Serene Sanctuary Box", "Eid Family Hamper", "Nikah Hampers"],
  },
] as const;

const occasions = [
  { label: "Eid Gifting", category: "gifts" },
  { label: "Ramadan Living", category: "home" },
  { label: "Jummah Essentials", category: "prayer" },
] as const;

const popularSearches = [
  "Salwar suit",
  "Kurta",
  "Abaya",
  "Prayer mat",
  "Kids kurta",
  "Eid collection",
  "Gift hamper",
  "Hijab",
] as const;

const browseShortcuts = [
  { label: "Browse Women", category: "women" },
  { label: "Browse Men", category: "men" },
  { label: "Browse Kids", category: "children" },
  { label: "Browse Gifts", category: "gifts" },
  { label: "Explore Occasions", category: "gifts", occasion: true },
] as const;

type SiteShellProps = {
  children: ReactNode;
};

function readRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCH_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string").slice(0, 6)
      : [];
  } catch {
    return [];
  }
}

function persistRecentSearch(term: string) {
  if (typeof window === "undefined") return;
  const cleaned = term.trim();
  if (!cleaned) return;
  const next = [cleaned, ...readRecentSearches().filter((item) => item.toLowerCase() !== cleaned.toLowerCase())].slice(
    0,
    6,
  );
  window.localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(next));
}

export function SiteShell({ children }: SiteShellProps) {
  const { itemCount, setIsOpen, addItem } = useCart();
  const { data: products } = useCommerceProducts();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchAdded, setSearchAdded] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const [tickerIndex, setTickerIndex] = useState(0);
  const tickerItems = useMemo(
    () => [
      { icon: Truck, text: "Free shipping on orders ₹999+" },
      { icon: Package, text: "7-day doorstep size exchange" },
      { icon: Sparkles, text: "Dispatch within 24–48 hours" },
    ],
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setRecentSearches(readRecentSearches());
  }, [searchOpen]);

  const normalizedQuery = query.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [] as CollectionProduct[];
    return (products ?? [])
      .filter((product) =>
        [product.name, product.pillar, product.subcategory, product.note, product.materials?.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 8);
  }, [products, normalizedQuery]);

  const categoryMatches = useMemo(() => {
    if (!normalizedQuery) return [] as Array<(typeof pillars)[number]>;
    return pillars.filter(
      (pillar) =>
        pillar.label.toLowerCase().includes(normalizedQuery) ||
        pillar.subcategories.some((sub) => sub.toLowerCase().includes(normalizedQuery)) ||
        pillar.category.includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const relatedSuggestions = useMemo(() => {
    if (!normalizedQuery) return [] as string[];
    const pool = [
      ...popularSearches,
      ...pillars.flatMap((p) => p.subcategories),
      "Eid gifting",
      "Ramadan living",
      "Jummah essentials",
    ];
    return pool
      .filter((term) => term.toLowerCase().includes(normalizedQuery) && term.toLowerCase() !== normalizedQuery)
      .slice(0, 5);
  }, [normalizedQuery]);

  function openSearch() {
    setQuery("");
    setSearchOpen(true);
  }

  function commitSearch(term: string) {
    setQuery(term);
    persistRecentSearch(term);
    setRecentSearches(readRecentSearches());
  }

  async function addSearchProduct(product: CollectionProduct, event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    persistRecentSearch(product.name);
    await addItem({
      id: product.handle,
      name: product.name,
      category: product.pillar,
      price: product.price,
      originalPrice: product.mrp ?? product.price,
      image: product.image,
    });
    setSearchAdded(product.handle);
    setIsOpen(true);
    window.setTimeout(() => setSearchAdded(null), 1600);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Announcement bar */}
      <div className="relative flex h-10 items-center justify-center overflow-hidden border-b border-primary/20 bg-primary px-4 text-center text-xs font-medium leading-5 text-primary-foreground">
        {tickerItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.text}
              className={cn(
                "absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-700",
                index === tickerIndex ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={index !== tickerIndex}
            >
              <Icon className="size-3.5 shrink-0 opacity-80" aria-hidden />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>

      <header
        className={cn(
          "sticky top-0 z-[40] border-b border-border/80 bg-background/95 backdrop-blur-md transition-shadow duration-brand-fast",
          scrolled && "shadow-soft",
        )}
      >
        <PageContainer className="grid h-[4.25rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-5">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex h-full w-[88vw] max-w-sm flex-col gap-0 p-0 z-[60]">
              <SheetHeader className="border-b border-border bg-blush-cream/50 px-6 py-7 text-left">
                <SheetTitle>
                  <BrandMark />
                </SheetTitle>
                <SheetDescription>Shop thoughtfully for every part of family life.</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-1 flex-col overflow-y-auto px-6 pb-7" aria-label="Mobile navigation">
                <Accordion type="single" collapsible className="w-full">
                  {pillars.map((pillar) => (
                    <AccordionItem key={pillar.category} value={pillar.category}>
                      <AccordionTrigger className="font-display text-xl font-medium no-underline hover:text-primary hover:no-underline">
                        {pillar.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 border-l border-border pl-4">
                          <li>
                            <SheetClose asChild>
                              <Link
                                to="/collection"
                                search={{ category: pillar.category }}
                                className="block py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                              >
                                Shop all {pillar.label}
                              </Link>
                            </SheetClose>
                          </li>
                          {pillar.subcategories.map((subcategory) => (
                            <li key={subcategory}>
                              <SheetClose asChild>
                                <Link
                                  to="/collection"
                                  search={{ category: pillar.category }}
                                  className="block py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                  {subcategory}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-6 rounded-md bg-blush-cream/60 p-4">
                  <p className="eyebrow text-foreground">Occasions</p>
                  <div className="mt-3 flex flex-col gap-1">
                    {occasions.map((occasion) => (
                      <SheetClose asChild key={occasion.label}>
                        <Link
                          to="/collection"
                          search={{ category: occasion.category }}
                          className="py-1.5 text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
                        >
                          {occasion.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <SheetClose asChild>
                    <Link
                      to="/blog"
                      className="flex items-center gap-2 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      <BookOpen className="size-4" /> Journal
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/order-tracking"
                      className="flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      Track Your Order
                    </Link>
                  </SheetClose>
                  <a
                    href="https://wa.me/919800000000"
                    className="flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    WhatsApp Support
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="min-w-0 lg:shrink-0" aria-label="Sukoon home">
            <BrandMark />
          </Link>

          <nav
            className="hidden min-w-0 items-center justify-center gap-3 lg:flex xl:gap-5"
            aria-label="Primary navigation"
          >
            {pillars.map((pillar) => (
              <Link
                key={pillar.category}
                to="/collection"
                search={{ category: pillar.category }}
                className="border-b-2 border-transparent py-1 text-xs font-semibold tracking-wide text-foreground/80 transition-colors hover:border-clay hover:text-primary xl:text-sm"
                activeProps={{ className: "border-primary text-primary" }}
              >
                {pillar.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 px-2 font-semibold">
                  Occasions <ChevronDown className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-52 p-2">
                {occasions.map((occasion) => (
                  <DropdownMenuItem asChild key={occasion.label}>
                    <Link
                      to="/collection"
                      search={{ category: occasion.category }}
                      className="w-full cursor-pointer py-2.5"
                    >
                      {occasion.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center justify-self-end gap-0.5 sm:gap-1">
            <Button variant="ghost" size="icon" aria-label="Search" onClick={openSearch}>
              <Search />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex" asChild>
              <Link to="/collection">
                <Heart />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Shopping bag, ${itemCount} items`}
              className="relative"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag />
              {itemCount > 0 ? (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-berry text-[0.6rem] font-bold text-berry-foreground">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              ) : null}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex" asChild>
              <Link to="/order-tracking">
                <User />
              </Link>
            </Button>
          </div>
        </PageContainer>
      </header>

      <main className="shell-main">{children}</main>

      <CartDrawer />

      {/* Search discovery dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="top-[4%] max-h-[92vh] max-w-2xl translate-y-0 gap-0 overflow-hidden p-0 sm:top-[8%]">
          <DialogHeader className="border-b border-border bg-blush-cream/40 px-5 py-5 text-left sm:px-7">
            <DialogTitle className="font-display text-2xl">Find something for the family</DialogTitle>
            <DialogDescription>Search products, departments, or occasions.</DialogDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && query.trim()) commitSearch(query.trim());
                }}
                placeholder="Try kurta, salwar, prayer mat, gift…"
                className="h-12 w-full rounded-md border border-input bg-background pl-11 pr-11 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
                aria-label="Search products"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-3.5 text-muted-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>
          </DialogHeader>

          <div className="max-h-[min(65vh,32rem)] overflow-y-auto px-5 py-5 sm:px-7">
            {!normalizedQuery ? (
              <div className="space-y-7">
                {recentSearches.length > 0 ? (
                  <div>
                    <p className="eyebrow text-foreground">Recent searches</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => commitSearch(term)}
                          className="rounded-full border border-border bg-background px-3.5 py-2 text-sm hover:border-primary hover:text-primary"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div>
                  <p className="eyebrow text-foreground">Popular searches</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => commitSearch(term)}
                        className="rounded-full border border-border bg-card px-3.5 py-2 text-sm hover:border-berry hover:text-berry"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="eyebrow text-foreground">Shop by department</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {pillars.map((pillar) => (
                      <Link
                        key={pillar.category}
                        to="/collection"
                        search={{ category: pillar.category }}
                        onClick={() => setSearchOpen(false)}
                        className="rounded-md border border-border bg-background p-3 text-sm font-semibold transition-colors hover:border-primary hover:bg-blush-cream/50 hover:text-primary"
                      >
                        {pillar.label}
                        <ArrowRight className="ml-1 inline size-3.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : searchResults.length > 0 || categoryMatches.length > 0 ? (
              <div className="space-y-6">
                {categoryMatches.length > 0 ? (
                  <div>
                    <p className="eyebrow text-foreground">Categories</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {categoryMatches.map((pillar) => (
                        <Link
                          key={pillar.category}
                          to="/collection"
                          search={{ category: pillar.category }}
                          onClick={() => {
                            persistRecentSearch(query.trim());
                            setSearchOpen(false);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-2 text-sm font-semibold text-primary"
                        >
                          {pillar.label}
                          <ArrowRight className="size-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {relatedSuggestions.length > 0 ? (
                  <div>
                    <p className="eyebrow text-foreground">Related suggestions</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {relatedSuggestions.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => commitSearch(term)}
                          className="rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {searchResults.length > 0 ? (
                  <div>
                    <p className="eyebrow text-foreground">Products</p>
                    <div className="mt-3 divide-y divide-border">
                      {searchResults.map((product) => (
                        <Link
                          key={product.handle}
                          to="/products/$productId"
                          params={{ productId: product.handle }}
                          onClick={() => {
                            persistRecentSearch(query.trim());
                            setSearchOpen(false);
                          }}
                          className="flex items-center gap-3.5 py-3.5 hover:text-primary"
                        >
                          <div className="size-16 shrink-0 overflow-hidden rounded-sm bg-muted sm:size-[4.5rem]">
                            <CommerceImage
                              src={product.image}
                              alt=""
                              className="size-full object-cover"
                            />
                          </div>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold">{product.name}</span>
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {product.pillar} · {product.note}
                            </span>
                          </span>
                          <span className="text-right">
                            <span className="block text-sm font-bold">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            {product.mrp && product.mrp > product.price ? (
                              <span className="block text-[0.68rem] font-semibold text-success">
                                Save ₹{(product.mrp - product.price).toLocaleString("en-IN")}
                              </span>
                            ) : null}
                          </span>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="hidden shrink-0 px-2.5 text-xs sm:inline-flex"
                            onClick={(event) => addSearchProduct(product, event)}
                          >
                            {searchAdded === product.handle ? "Added" : "Add"}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-blush-cream text-primary">
                  <Search className="size-5" />
                </div>
                <p className="mt-4 font-display text-xl">No matches for “{query.trim()}”</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a shorter phrase, or continue shopping from these paths.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setQuery("")}>
                    Clear search
                  </Button>
                  {browseShortcuts.map((shortcut) => (
                    <Button key={shortcut.label} variant="outline" size="sm" asChild>
                      <Link
                        to="/collection"
                        search={{ category: shortcut.category }}
                        onClick={() => setSearchOpen(false)}
                      >
                        {shortcut.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border bg-charcoal-ink text-background">
        <PageContainer className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          <div>
            <BrandMark className="text-background [&_span:last-child]:text-background/55" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-background/70">
              Curated essentials for the modern Muslim home — modest apparel, prayer, learning, and
              thoughtful gifts in one trusted store.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-[0.7rem] font-semibold uppercase tracking-wide text-background/55">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5" /> Secure checkout
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Gift className="size-3.5" /> Ready-to-gift
              </span>
            </div>
          </div>
          <FooterColumn
            title="Shop"
            links={[
              ["Women", "women"],
              ["Men", "men"],
              ["Kids", "children"],
              ["Prayer", "prayer"],
              ["Gifts", "gifts"],
            ]}
          />
          <div>
            <h2 className="eyebrow text-background/50">Customer care</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-background/75">
              <li>
                <Link to="/order-tracking" className="transition-colors hover:text-background hover:underline">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/blog" className="transition-colors hover:text-background hover:underline">
                  Journal
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919800000000"
                  className="transition-colors hover:text-background hover:underline"
                >
                  WhatsApp Support
                </a>
              </li>
              <li>
                <Link to="/collection" className="transition-colors hover:text-background hover:underline">
                  7-Day Size Exchange
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-background/50">Stay in the rhythm</h2>
            <p className="mt-4 text-sm leading-6 text-background/65">
              Occasional notes on Eid edits, fabric care, and family essentials — no noise.
            </p>
            <form className="mt-4" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">
                Email for festive previews
              </label>
              <div className="flex gap-2">
                <Input
                  id="footer-email"
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 border-background/25 bg-background/5 text-background placeholder:text-background/45"
                />
                <Button type="submit" variant="secondary" className="shrink-0">
                  Join
                </Button>
              </div>
            </form>
          </div>
        </PageContainer>
        <div className="border-t border-background/10">
          <PageContainer className="flex flex-col gap-2 py-4 text-xs leading-5 text-background/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Sukoon Lifestyle Private Limited. Curated in India.</span>
            <span className="flex flex-wrap gap-x-4 gap-y-1">
              <span>GSTIN Registered</span>
              <span>LMPC Compliant</span>
              <span>UPI / Cards / COD</span>
            </span>
          </PageContainer>
        </div>
      </footer>

      {/* Mobile bottom navigation — always above purchase docks */}
      <nav
        className="bottom-nav grid grid-cols-5 border-t border-border bg-background/95 pt-1.5 backdrop-blur lg:hidden"
        aria-label="Mobile bottom navigation"
      >
        <Link
          to="/"
          className="flex flex-col items-center gap-0.5 text-[0.6rem] font-medium text-muted-foreground"
          activeProps={{ className: "!text-primary" }}
          activeOptions={{ exact: true }}
        >
          <Home className="size-5" />
          <span>Home</span>
        </Link>
        <Link
          to="/collection"
          className="flex flex-col items-center gap-0.5 text-[0.6rem] font-medium text-muted-foreground"
          activeProps={{ className: "!text-primary" }}
        >
          <Grid2X2 className="size-5" />
          <span>Shop</span>
        </Link>
        <button
          type="button"
          onClick={openSearch}
          className="flex flex-col items-center gap-0.5 text-[0.6rem] font-medium text-muted-foreground"
        >
          <Search className="size-5" />
          <span>Search</span>
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[0.6rem] font-medium text-muted-foreground"
        >
          <div className="relative">
            <ShoppingBag className="size-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-2 -top-1 flex size-3.5 items-center justify-center rounded-full bg-berry text-[0.55rem] font-bold text-berry-foreground">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </div>
          <span>Cart</span>
        </button>
        <Link
          to="/order-tracking"
          className="flex flex-col items-center gap-0.5 text-[0.6rem] font-medium text-muted-foreground"
          activeProps={{ className: "!text-primary" }}
        >
          <User className="size-5" />
          <span>Account</span>
        </Link>
      </nav>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <div>
      <h2 className="eyebrow text-background/50">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm text-background/75">
        {links.map(([label, category]) => (
          <li key={label}>
            <Link
              to="/collection"
              search={{ category }}
              className="transition-colors hover:text-background hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
