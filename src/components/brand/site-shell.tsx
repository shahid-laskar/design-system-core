import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  { label: "Home & prayer", hash: "#products" },
  { label: "Family", hash: "#editorial" },
  { label: "Modest essentials", hash: "#foundations" },
  { label: "Journal", hash: "#states" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <p className="bg-primary px-4 py-2.5 text-center text-xs font-semibold text-primary-foreground">
        Complimentary delivery on considered bundles over £75
      </p>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm p-0">
              <SheetHeader className="border-b border-border px-6 py-7 text-left">
                <SheetTitle><BrandMark /></SheetTitle>
                <SheetDescription>Thoughtful goods and ideas for family life.</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-6 py-5" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <a href={`/design-system${item.hash}`} className="border-b border-border py-5 font-display text-2xl transition-colors hover:text-primary">{item.label}</a>
                  </SheetClose>
                ))}
              </nav>
              <div className="px-6"><p className="text-sm leading-6 text-muted-foreground">Designed for calm homes, meaningful routines, and the people growing within them.</p></div>
            </SheetContent>
          </Sheet>

          <Link to="/design-system" className="shrink-0" aria-label="Sukoon House design system"><BrandMark /></Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item.label} href={`/design-system${item.hash}`} className="text-sm font-semibold transition-colors hover:text-primary">{item.label}</a>)}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Account"><UserRound /></Button>
            <Button variant="ghost" size="icon" aria-label="Shopping bag" className="relative"><ShoppingBag /><span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-clay text-[0.6rem] font-bold text-clay-foreground">2</span></Button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:px-8 lg:py-20">
          <div>
            <BrandMark className="text-primary-foreground" />
            <p className="mt-5 max-w-md font-display text-2xl leading-snug">A more thoughtful rhythm for modern Muslim family life.</p>
            <div className="mt-7 flex max-w-md gap-2">
              <Input type="email" aria-label="Email address" placeholder="Your email address" className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/60" />
              <Button variant="secondary">Join</Button>
            </div>
            <p className="mt-3 text-xs text-primary-foreground/65">Occasional notes, useful ideas, and considered arrivals.</p>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/60">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm"><li>Home & prayer</li><li>For little ones</li><li>Everyday modesty</li><li>Curated bundles</li></ul>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/60">Here to help</h2>
            <ul className="mt-5 space-y-3 text-sm"><li>Delivery & returns</li><li>Care guides</li><li>Our approach</li><li>Contact</li></ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><p>© 2026 Sukoon House. Working brand label.</p><p>Privacy · Terms · Accessibility</p></div>
        </div>
      </footer>
    </div>
  );
}