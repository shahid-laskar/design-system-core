import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from "lucide-react";
import { Eyebrow, PageContainer } from "@/components/brand/design-primitives";
import { Button } from "@/components/ui/button";
import {
  getStoreBlogPostBySlug,
  type StoreBlogPost,
  type MedusaStoreProduct,
} from "@/lib/commerce/client";
import { ProductCard } from "@/components/brand/product-card";
import imgEditorial from "@/assets/editorial-home-calm.jpg";
import imgModest from "@/assets/product-modest-set.jpg";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Journal — Sukoon House` },
      { name: "description", content: "Thoughtful reflections from the Sukoon House journal." },
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<StoreBlogPost | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<MedusaStoreProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await getStoreBlogPostBySlug(slug);
        if (isMounted && res?.post) {
          setPost(res.post);
          if (res.related_products) setRelatedProducts(res.related_products);
        }
      } catch {
        // Fallback for demonstration / static preview
        if (isMounted) {
          setPost({
            id: "fallback",
            title: "Caring for Pure Cambric Cotton: A Guide to Modest Longevity",
            slug,
            excerpt:
              "Mindful cold washing, natural line-drying, and gentle steam ironing ensure your cotton salwar suits retain their soft drape, colorfastness, and opacity across seasons.",
            body: `Cambric cotton is woven from fine, closely spun yarns that create an exceptionally smooth surface while remaining naturally breathable in Indian climates. To maintain its drape and soft touch over years of everyday wear, wash gently with cold water, use a mild liquid detergent, avoid direct noon sunlight when line-drying, and warm iron inside out with steam.\n\nAll Sukoon House cotton suits are pre-shrunk and lined with soft cotton voil so you never have to worry about see-through transparency or abrupt shrinking after the first wash.\n\nTaking time to care for the garments we wear during daily life and family worship connects us to a tradition of stewardship (amanah) and mindful simplicity.`,
            featured_image: imgEditorial,
            author: "Fatima Zahra",
            category: "Fabric Care & Craft",
            tags: ["cotton-care", "cambric", "modest-wear", "longevity"],
            status: "PUBLISHED",
            published_at: "2026-09-20T10:00:00Z",
            read_time: 4,
            created_at: "2026-09-20T10:00:00Z",
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <PageContainer>
          <div className="max-w-2xl mx-auto space-y-4 animate-pulse">
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-12 w-full bg-muted rounded" />
            <div className="h-64 w-full bg-muted rounded" />
          </div>
        </PageContainer>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background py-20 text-center">
        <PageContainer>
          <h1 className="font-display text-2xl font-medium">Article not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The journal entry you are looking for may have moved or been updated.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/blog">← Back to Journal</Link>
          </Button>
        </PageContainer>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* Top Breadcrumb & Return */}
      <div className="border-b border-border bg-card/30 py-4">
        <PageContainer>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground">
              Journal
            </Link>
            <span>/</span>
            <span className="truncate max-w-[200px] text-foreground font-medium">
              {post.title}
            </span>
          </div>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="mx-auto max-w-3xl pt-10 sm:pt-16">
          {/* Category & Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {post.category && (
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                {post.category}
              </span>
            )}
            {post.published_at && (
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {new Date(post.published_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
            {post.read_time && (
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {post.read_time} min read
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-5 font-display text-3xl font-medium leading-tight sm:text-5xl">
            {post.title}
          </h1>

          {/* Author */}
          {post.author && (
            <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
              <div className="flex size-9 items-center justify-center rounded-full bg-muted font-display text-sm font-semibold text-foreground">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{post.author}</p>
                <p className="text-[0.68rem] text-muted-foreground">Sukoon House Editorial Contributor</p>
              </div>
            </div>
          )}

          {/* Featured Image */}
          <div className="mt-8 overflow-hidden rounded-lg border border-border bg-muted">
            <img
              src={post.featured_image || imgEditorial}
              alt={post.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          {/* Article Excerpt Callout */}
          {post.excerpt && (
            <blockquote className="mt-8 border-l-2 border-primary pl-4 text-base italic leading-relaxed text-muted-foreground">
              {post.excerpt}
            </blockquote>
          )}

          {/* Article Body */}
          <div className="mt-8 space-y-6 text-sm sm:text-base leading-relaxed text-foreground/90 font-serif">
            {post.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Tag className="size-3.5" /> Tags:
              </span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Back Button */}
          <div className="mt-12">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link to="/blog">
                <ArrowLeft className="mr-1.5 size-3.5" /> Back to All Articles
              </Link>
            </Button>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-4xl border-t border-border mt-20 pt-12">
            <div className="text-center">
              <Eyebrow text="Featured in this Story" />
              <h2 className="font-display text-2xl font-medium sm:text-3xl mt-1">
                Related Essentials
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to="/products/$productId"
                  params={{ productId: p.handle || p.id }}
                  className="group rounded-md border border-border bg-card p-3 hover:shadow-sm transition-all"
                >
                  <img
                    src={p.thumbnail || imgModest}
                    alt={p.title}
                    className="aspect-square w-full rounded object-cover"
                  />
                  <h4 className="mt-2 text-xs font-semibold group-hover:text-primary transition-colors truncate">
                    {p.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">
                    {p.variants?.[0]?.calculated_price
                      ? `₹${p.variants[0].calculated_price.calculated_amount}`
                      : "View Details"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </PageContainer>
    </article>
  );
}
