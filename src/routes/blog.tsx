import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calendar, Clock, User } from "lucide-react";
import { Eyebrow, PageContainer } from "@/components/brand/design-primitives";
import { CommerceImage } from "@/components/brand/commerce-image";
import { Button } from "@/components/ui/button";
import { getStoreBlogPosts, type StoreBlogPost } from "@/lib/commerce/client";
import { useCommerceProducts } from "@/lib/commerce/use-commerce";
import { cn } from "@/lib/utils";

import imgEditorial from "@/assets/editorial-home-calm.jpg";
const imgJournalCraft = "/images/journal-cambric-craft.jpg";
import imgEid from "@/assets/occasion-eid.jpg";
import imgRamadan from "@/assets/occasion-ramadan.jpg";
import imgPrayer from "@/assets/product-prayer-set.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal & Reflections — Sukoon House" },
      {
        name: "description",
        content:
          "Thoughtful essays on modest living, fabric longevity, intentional Islamic home routines, and heritage craft.",
      },
      { property: "og:title", content: "Journal & Reflections — Sukoon House" },
      {
        property: "og:description",
        content: "Reflections for mindful Muslim homes and everyday tranquility.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogIndexPage,
});

const FALLBACK_POSTS: StoreBlogPost[] = [
  {
    id: "post-1",
    title: "Caring for Pure Cambric Cotton: A Guide to Modest Longevity",
    slug: "caring-for-pure-cambric-cotton",
    excerpt:
      "Mindful cold washing, natural line-drying, and gentle steam ironing ensure your cotton salwar suits retain their soft drape, colorfastness, and opacity across seasons.",
    body: "Cambric cotton is woven from fine, closely spun yarns that create an exceptionally smooth surface while remaining naturally breathable...",
    featured_image: imgJournalCraft,
    author: "Fatima Zahra",
    category: "Modesty",
    tags: ["cotton-care", "cambric", "modest-wear", "longevity"],
    status: "PUBLISHED",
    published_at: "2026-09-20T10:00:00Z",
    read_time: 4,
    created_at: "2026-09-20T10:00:00Z",
  },
  {
    id: "post-2",
    title: "Creating a Calm Prayer Corner: Designing Spaces for Stillness",
    slug: "creating-a-calm-prayer-corner",
    excerpt:
      "How to set aside an uncluttered, low-stimulus family prayer space with tactile mats, natural beechwood rehals, and quiet lighting.",
    body: "In a busy modern home, reserving a dedicated corner free from digital distractions creates an immediate invitation for the soul to breathe...",
    featured_image: imgPrayer,
    author: "Tariq Mansoor",
    category: "Home",
    tags: ["prayer-space", "stillness", "home-sanctuary", "tarbiyah"],
    status: "PUBLISHED",
    published_at: "2026-09-18T14:30:00Z",
    read_time: 5,
    created_at: "2026-09-18T14:30:00Z",
  },
  {
    id: "post-3",
    title: "Eid Preparation for the Whole Family",
    slug: "eid-preparation-for-the-whole-family",
    excerpt:
      "A calm checklist for coordinated modest wear, thoughtful gifts, and a home that feels ready — without the last-minute rush.",
    body: "Eid arrives with joy and a list. Begin with what the family will wear, then the table, then the gifts that travel between homes...",
    featured_image: imgEid,
    author: "Amina Siddiqui",
    category: "Occasions",
    tags: ["eid", "family", "gifting", "wardrobe"],
    status: "PUBLISHED",
    published_at: "2026-09-12T09:00:00Z",
    read_time: 6,
    created_at: "2026-09-12T09:00:00Z",
  },
  {
    id: "post-4",
    title: "Ramadan Evenings at Home: Soft Light and Shared Tables",
    slug: "ramadan-evenings-at-home",
    excerpt:
      "Small rituals that make fasting days feel held — from bakhoor before Maghrib to a quiet corner for the children.",
    body: "The month asks for presence more than perfection. Soft light, a clear dining cloth, and one shared dua can reset an entire evening...",
    featured_image: imgRamadan,
    author: "Fatima Zahra",
    category: "Faith",
    tags: ["ramadan", "home", "family"],
    status: "PUBLISHED",
    published_at: "2026-09-08T11:00:00Z",
    read_time: 5,
    created_at: "2026-09-08T11:00:00Z",
  },
];

function resolvePostImage(post: StoreBlogPost): string {
  if (post.featured_image && !/product-modest|folded|salwar-suit-sage/i.test(post.featured_image)) {
    return post.featured_image;
  }
  const cat = (post.category || "").toLowerCase();
  const slug = post.slug.toLowerCase();
  if (cat.includes("home") || slug.includes("prayer") || slug.includes("corner")) return imgPrayer;
  if (cat.includes("occasion") || slug.includes("eid")) return imgEid;
  if (cat.includes("faith") || slug.includes("ramadan")) return imgRamadan;
  if (cat.includes("family") || cat.includes("modesty") || slug.includes("cotton")) return imgJournalCraft;
  return imgEditorial;
}

function BlogIndexPage() {
  const [posts, setPosts] = useState<StoreBlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const { data: products } = useCommerceProducts();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await getStoreBlogPosts();
        if (isMounted) {
          if (res?.posts && res.posts.length > 0) {
            setPosts(res.posts);
          } else {
            setPosts(FALLBACK_POSTS);
          }
        }
      } catch {
        if (isMounted) setPosts(FALLBACK_POSTS);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ["All", "Modesty", "Home", "Family", "Occasions", "Faith", "Gifting"];

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === "All") return true;
    return post.category?.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const [featured, ...rest] = filteredPosts;
  const secondary = rest.slice(0, 2);
  const remaining = rest.slice(2);

  const shopEdit = useMemo(() => {
    const list = products ?? [];
    return list
      .filter((p) => ["Women", "Gifts", "Prayer", "Home"].includes(p.pillar))
      .slice(0, 4);
  }, [products]);

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border wash-warm py-12 sm:py-16">
        <PageContainer>
          <div className="max-w-2xl">
            <Eyebrow>The Sukoon Journal</Eyebrow>
            <h1 className="display-section mt-3">Stories for a more considered family life</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Guides on modest living, home rhythm, fabric care, and the small rituals that shape
              everyday worship — written with commerce in mind, never as a separate magazine.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 rounded-full px-4 text-xs",
                  selectedCategory === cat && "font-semibold",
                )}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="pt-10 sm:pt-14">
        <PageContainer>
          {loading ? (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="h-[28rem] animate-pulse rounded-sm bg-muted/50 lg:col-span-7" />
              <div className="grid gap-6 lg:col-span-5">
                <div className="h-52 animate-pulse rounded-sm bg-muted/40" />
                <div className="h-52 animate-pulse rounded-sm bg-muted/40" />
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-blush-cream text-primary">
                <BookOpen className="size-6" />
              </div>
              <p className="mt-4 font-display text-2xl">No stories in this category yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Browse another topic, or shop the edit below.</p>
              <Button className="mt-6" variant="outline" onClick={() => setSelectedCategory("All")}>
                View all stories
              </Button>
            </div>
          ) : (
            <>
              {featured ? (
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <article className="group lg:col-span-7">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: featured.slug }}
                      className="relative block aspect-[16/11] overflow-hidden rounded-sm bg-muted"
                    >
                      <CommerceImage
                        src={resolvePostImage(featured)}
                        alt=""
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {featured.category ? (
                        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[0.68rem] font-semibold backdrop-blur-sm">
                          {featured.category}
                        </span>
                      ) : null}
                    </Link>
                    <div className="mt-5">
                      <PostMeta post={featured} />
                      <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                        <Link
                          to="/blog/$slug"
                          params={{ slug: featured.slug }}
                          className="transition-colors hover:text-primary"
                        >
                          {featured.title}
                        </Link>
                      </h2>
                      {featured.excerpt ? (
                        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                          {featured.excerpt}
                        </p>
                      ) : null}
                      <Link
                        to="/blog/$slug"
                        params={{ slug: featured.slug }}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                      >
                        Read story <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </article>

                  <div className="flex flex-col gap-8 lg:col-span-5">
                    {secondary.map((post) => (
                      <article key={post.id} className="group grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="aspect-[4/5] overflow-hidden rounded-sm bg-muted"
                        >
                          <CommerceImage
                            src={resolvePostImage(post)}
                            alt=""
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </Link>
                        <div className="min-w-0 self-center">
                          <PostMeta post={post} compact />
                          <h3 className="mt-2 font-display text-xl leading-snug sm:text-2xl">
                            <Link
                              to="/blog/$slug"
                              params={{ slug: post.slug }}
                              className="transition-colors hover:text-primary"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          {post.excerpt ? (
                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                              {post.excerpt}
                            </p>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {remaining.length > 0 ? (
                <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {remaining.map((post) => (
                    <article key={post.id} className="group">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="relative block aspect-[16/10] overflow-hidden rounded-sm bg-muted"
                      >
                        <CommerceImage
                          src={resolvePostImage(post)}
                          alt=""
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </Link>
                      <div className="mt-4">
                        <PostMeta post={post} compact />
                        <h3 className="mt-2 font-display text-xl leading-snug">
                          <Link
                            to="/blog/$slug"
                            params={{ slug: post.slug }}
                            className="transition-colors hover:text-primary"
                          >
                            {post.title}
                          </Link>
                        </h3>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </PageContainer>
      </section>

      {shopEdit.length > 0 ? (
        <section className="mt-16 border-t border-border bg-blush-cream/40 py-12 sm:py-16">
          <PageContainer>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Shop the edit</Eyebrow>
                <h2 className="mt-2 font-display text-3xl">Pieces that live beside these stories</h2>
              </div>
              <Button variant="outline" asChild>
                <Link to="/collection">
                  View collection <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {shopEdit.map((product) => (
                <Link
                  key={product.handle}
                  to="/products/$productId"
                  params={{ productId: product.handle }}
                  className="group"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                    <CommerceImage
                      src={product.image}
                      alt=""
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3 truncate text-sm font-semibold group-hover:text-primary">
                    {product.name}
                  </p>
                  <p className="text-sm font-bold">₹{product.price.toLocaleString("en-IN")}</p>
                </Link>
              ))}
            </div>
          </PageContainer>
        </section>
      ) : null}
    </div>
  );
}

function PostMeta({ post, compact = false }: { post: StoreBlogPost; compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground",
        compact ? "text-[0.68rem]" : "text-xs",
      )}
    >
      {post.published_at ? (
        <span className="inline-flex items-center gap-1">
          <Calendar className="size-3" />
          {new Date(post.published_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ) : null}
      {post.read_time ? (
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          {post.read_time} min
        </span>
      ) : null}
      {post.author && !compact ? (
        <span className="inline-flex items-center gap-1">
          <User className="size-3" />
          {post.author}
        </span>
      ) : null}
    </div>
  );
}
