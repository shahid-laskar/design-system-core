import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Calendar, Clock, Tag, User } from "lucide-react";
import { Eyebrow, PageContainer, SectionHeading } from "@/components/brand/design-primitives";
import { Button } from "@/components/ui/button";
import { getStoreBlogPosts, type StoreBlogPost } from "@/lib/commerce/client";
import { cn } from "@/lib/utils";
import imgEditorial from "@/assets/editorial-home-calm.jpg";
import imgModest from "@/assets/product-modest-set.jpg";

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
    featured_image: imgEditorial,
    author: "Fatima Zahra",
    category: "Fabric Care & Craft",
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
      "How to set aside an uncluttered, low-stimulus family prayer space with tactile linen mats, natural beechwood rehals, and quiet lighting.",
    body: "In a busy modern home, reserving a dedicated corner free from digital distractions creates an immediate invitation for the soul to breathe...",
    featured_image: imgModest,
    author: "Tariq Mansoor",
    category: "Home & Tarbiyah",
    tags: ["prayer-space", "stillness", "home-sanctuary", "tarbiyah"],
    status: "PUBLISHED",
    published_at: "2026-09-18T14:30:00Z",
    read_time: 5,
    created_at: "2026-09-18T14:30:00Z",
  },
];

function BlogIndexPage() {
  const [posts, setPosts] = useState<StoreBlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

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

  const categories = ["All", "Fabric Care & Craft", "Home & Tarbiyah", "Reflections"];

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === "All") return true;
    return post.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Banner */}
      <section className="border-b border-border bg-card/50 py-16 sm:py-24">
        <PageContainer>
          <div className="max-w-2xl">
            <Eyebrow>Sukoon Journal</Eyebrow>
            <h1 className="display-section mt-3">Stories, Craft &amp; Mindful Living</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Considered thoughts on modesty, purposeful routines, family tarbiyah, and durable Indian textile traditions.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 rounded-full px-4 text-xs",
                  selectedCategory === cat && "font-semibold"
                )}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Posts Grid */}
      <section className="pt-12 sm:pt-16">
        <PageContainer>
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-lg border border-border bg-muted/40"
                />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <BookOpen className="mx-auto size-8 text-muted-foreground/60" />
              <p className="mt-3 text-sm">No journal entries in this category yet.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="relative aspect-[16/10] overflow-hidden bg-muted"
                  >
                    <img
                      src={post.featured_image || imgEditorial}
                      alt={post.title}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {post.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-0.5 text-[0.68rem] font-semibold text-foreground backdrop-blur-sm shadow-sm">
                        {post.category}
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(post.published_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      {post.read_time && (
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {post.read_time} min read
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-display text-xl font-medium leading-snug group-hover:text-primary transition-colors">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h3>

                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-auto pt-5 flex items-center justify-between border-t border-border text-xs">
                      {post.author && (
                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                          <User className="size-3.5 text-primary" />
                          {post.author}
                        </span>
                      )}
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
                      >
                        Read Story →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </PageContainer>
      </section>
    </div>
  );
}
