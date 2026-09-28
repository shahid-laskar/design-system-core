import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, Search, ShieldCheck, ShoppingBag, X } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/brand/design-primitives";
import { CartDrawer } from "@/components/brand/cart-drawer";
import { useCart } from "@/lib/cart-context";
import { useCommerceProducts } from "@/lib/commerce/use-commerce";
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
    label: "Children",
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

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const { itemCount, setIsOpen } = useCart();
  const { data: products } = useCommerceProducts();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return (products ?? [])
      .filter((product) =>
        [product.name, product.pillar, product.subcategory, product.note]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 5);
  }, [products, query]);

  function openSearch() {
    setQuery("");
    setSearchOpen(true);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <p className="border-b border-border/80 bg-background px-4 py-2.5 text-center text-xs font-medium leading-5 text-foreground/85">
        Thoughtful essentials for prayer, home, and family · Free shipping on orders over ₹999 · COD
        &amp; Easy 7-Day Size Exchanges
      </p>
      <header className="border-b border-border bg-background">
        <PageContainer className="grid h-18 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-5">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex h-full w-[88vw] max-w-sm flex-col gap-0 p-0">
              <SheetHeader className="border-b border-border px-6 py-7 text-left">
                <SheetTitle>
                  <BrandMark />
                </SheetTitle>
                <SheetDescription>
                  Shop thoughtfully for every part of family life.
                </SheetDescription>
              </SheetHeader>
              <nav
                className="flex flex-1 flex-col overflow-y-auto px-6 pb-7"
                aria-label="Mobile navigation"
              >
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

                <div className="mt-7 border-t border-border pt-6">
                  <p className="eyebrow mb-3 text-foreground">Customer support</p>
                  <div className="flex flex-col">
                    <a
                      href="https://wa.me/919800000000"
                      className="py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      WhatsApp Support (+91 98XXX XXXXX)
                    </a>
                    {["Track Your Order", "7-Day Exchange Policy"].map((label) => (
                      <SheetClose asChild key={label}>
                        <Link
                          to="/collection"
                          className="py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="min-w-0 lg:shrink-0" aria-label="Sukoon home">
            <BrandMark />
          </Link>

          <nav
            className="hidden min-w-0 items-center justify-center gap-4 lg:flex xl:gap-6"
            aria-label="Primary navigation"
          >
            {pillars.map((pillar) => (
              <Link
                key={pillar.category}
                to="/collection"
                search={{ category: pillar.category }}
                className="border-b border-transparent py-1 text-xs font-semibold transition-colors hover:border-clay hover:text-primary xl:text-sm"
                activeProps={{ className: "border-primary text-primary" }}
              >
                {pillar.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 px-2">
                  Occasions <ChevronDown className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-48 p-2">
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

          <div className="flex items-center justify-self-end gap-1">
            <Button variant="ghost" size="icon" aria-label="Search" onClick={openSearch}>
              <Search />
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
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-clay text-[0.6rem] font-bold text-clay-foreground">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              ) : null}
            </Button>
          </div>
        </PageContainer>
      </header>

      <main>{children}</main>

      <CartDrawer />

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="top-[8%] max-w-2xl translate-y-0 gap-0 overflow-hidden p-0">
          <DialogHeader className="border-b border-border px-5 py-5 text-left sm:px-7">
            <DialogTitle className="font-display text-2xl">
              Find something for the family
            </DialogTitle>
            <DialogDescription>
              Search the live catalogue by product, department, or material.
            </DialogDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try cambric salwar, Friday kurta, prayer mat..."
                className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-10 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
                aria-label="Search products"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-3 text-muted-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>
          </DialogHeader>
          <div className="max-h-[65vh] overflow-y-auto px-5 py-5 sm:px-7">
            {!query ? (
              <>
                <p className="eyebrow text-foreground">Popular searches</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Cambric Salwar", "Friday Kurta", "Memory Foam Mat", "Eid Gifts"].map(
                    (term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-border bg-card px-3.5 py-2 text-sm hover:border-primary hover:text-primary"
                      >
                        {term}
                      </button>
                    ),
                  )}
                </div>
                <p className="eyebrow mt-7 text-foreground">Shop by department</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {pillars.slice(0, 4).map((pillar) => (
                    <Link
                      key={pillar.category}
                      to="/collection"
                      search={{ category: pillar.category }}
                      onClick={() => setSearchOpen(false)}
                      className="rounded-md border border-border p-3 text-sm font-semibold hover:border-primary hover:text-primary"
                    >
                      {pillar.label}
                      <ArrowRight className="ml-1 inline size-3.5" />
                    </Link>
                  ))}
                </div>
              </>
            ) : searchResults.length > 0 ? (
              <div className="divide-y divide-border">
                {searchResults.map((product) => (
                  <Link
                    key={product.handle}
                    to="/products/$productId"
                    params={{ productId: product.handle }}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 py-3 hover:text-primary"
                  >
                    <img src={product.image} alt="" className="size-14 rounded-sm object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{product.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {product.pillar} · {product.note}
                      </span>
                    </span>
                    <span className="text-sm font-bold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No pieces matched that search. Try a department or a shorter phrase.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border bg-primary text-primary-foreground">
        <PageContainer className="grid gap-x-8 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
          <div>
            <BrandMark className="text-primary-foreground" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/75">
              Curated essentials for the modern Muslim home and family. Thoughtful materials, modest
              cuts, and fair everyday prices.
            </p>
          </div>
          <FooterColumn
            title="Shop pillars"
            links={[
              ["Women's Ethnic", "women"],
              ["Men's Kurtas", "men"],
              ["Children's Apparel", "children"],
              ["Prayer Mats", "prayer"],
              ["Learning & Books", "learning"],
              ["Home Accents", "home"],
              ["Gift Boxes", "gifts"],
            ]}
          />
          <div>
            <h2 className="eyebrow text-primary-foreground/60">Customer care</h2>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/80">
              {[
                "Track Order",
                "7-Day Size Exchange",
                "Shipping & COD Policy",
                "FAQs",
                "Contact Support via WhatsApp",
              ].map((label) => (
                <li key={label}>
                  {label.includes("WhatsApp") ? (
                    <a
                      href="https://wa.me/919800000000"
                      className="transition-colors hover:text-primary-foreground hover:underline"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      to="/collection"
                      className="transition-colors hover:text-primary-foreground hover:underline"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-primary-foreground/60">Trust &amp; compliance</h2>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/80">
              {[
                "GSTIN Registered",
                "Legal Metrology (LMPC) Compliant",
                "Secure UPI/Card Payments",
              ].map((label) => (
                <li key={label} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <form className="mt-7" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="footer-email" className="eyebrow text-primary-foreground/60">
                Festive previews
              </label>
              <div className="mt-3 flex gap-2">
                <Input
                  id="footer-email"
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button type="submit" variant="secondary">
                  Join
                </Button>
              </div>
            </form>
          </div>
        </PageContainer>
        <div className="border-t border-primary-foreground/15">
          <PageContainer className="py-5 text-xs leading-5 text-primary-foreground/60">
            © 2026 Sukoon Lifestyle Private Limited. All rights reserved. Handcrafted &amp; Curated
            in India.
          </PageContainer>
        </div>
      </footer>
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
      <h2 className="eyebrow text-primary-foreground/60">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-primary-foreground/80">
        {links.map(([label, category]) => (
          <li key={label}>
            <Link
              to="/collection"
              search={{ category }}
              className="transition-colors hover:text-primary-foreground hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
