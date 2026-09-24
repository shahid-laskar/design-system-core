import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/brand/design-primitives";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "The collection", href: "/collection" },
  { label: "Our approach", href: "/#modest" },
  { label: "Journal", href: "/#journal" },
  { label: "Design system", href: "/design-system" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <p className="bg-primary px-4 py-2.5 text-center text-xs font-semibold text-primary-foreground">
        Complimentary delivery on considered bundles over ₹2,999
      </p>
      <header className="border-b border-border bg-background">
        <PageContainer className="grid h-18 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 lg:flex lg:justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm p-0">
              <SheetHeader className="border-b border-border px-6 py-7 text-left">
                <SheetTitle>
                  <BrandMark />
                </SheetTitle>
                <SheetDescription>Thoughtful goods and ideas for family life.</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-6 py-5" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    {item.href.startsWith("/") && !item.href.includes("#") ? (
                      <Link
                        to={item.href}
                        className="border-b border-border py-5 font-display text-2xl transition-colors hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="border-b border-border py-5 font-display text-2xl transition-colors hover:text-primary"
                      >
                        {item.label}
                      </a>
                    )}
                  </SheetClose>
                ))}
              </nav>
              <div className="px-6">
                <p className="text-sm leading-6 text-muted-foreground">
                  Designed for calm homes, meaningful routines, and the people growing within them.
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Link
            to="/"
            className="min-w-0 justify-self-center lg:shrink-0"
            aria-label="Sukoon House home"
          >
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) =>
              item.href.startsWith("/") && !item.href.includes("#") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="nav-link"
                  activeProps={{ className: "text-primary font-bold" }}
                >
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              aria-label="Account"
            >
              <UserRound />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Shopping bag" className="relative">
              <ShoppingBag />
              <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-clay text-[0.6rem] font-bold text-clay-foreground">
                2
              </span>
            </Button>
          </div>
        </PageContainer>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border bg-primary text-primary-foreground">
        <PageContainer className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:py-20">
          <div>
            <BrandMark className="text-primary-foreground" />
            <p className="mt-5 max-w-md font-display text-2xl leading-snug">
              A more thoughtful rhythm for modern Muslim family life.
            </p>
            <div className="mt-7 flex max-w-md gap-2">
              <Input
                type="email"
                aria-label="Email address"
                placeholder="Your email address"
                className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary">Join</Button>
            </div>
            <p className="mt-3 text-xs text-primary-foreground/65">
              Occasional notes, useful ideas, and considered arrivals.
            </p>
          </div>
          <div>
            <h2 className="eyebrow text-primary-foreground/60">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>Home & prayer</li>
              <li>For little ones</li>
              <li>Everyday modesty</li>
              <li>Curated bundles</li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-primary-foreground/60">Here to help</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>Delivery & returns</li>
              <li>Care guides</li>
              <li>Our approach</li>
              <li>Contact</li>
            </ul>
          </div>
        </PageContainer>
        <div className="border-t border-primary-foreground/15">
          <PageContainer className="flex flex-col gap-3 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Sukoon House. Working brand label.</p>
            <p>Privacy · Terms · Accessibility</p>
          </PageContainer>
        </div>
      </footer>
    </div>
  );
}
