import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User } from "lucide-react";
import { Eyebrow, PageContainer } from "@/components/brand/design-primitives";
import { CommerceImage } from "@/components/brand/commerce-image";
import { Button } from "@/components/ui/button";
import {
  getStoreBlogPostBySlug,
  type StoreBlogPost,
  type MedusaStoreProduct,
} from "@/lib/commerce/client";
import { useCommerceProducts } from "@/lib/commerce/use-commerce";

import imgEditorial from "@/assets/editorial-home-calm.jpg";
import imgEid from "@/assets/occasion-eid.jpg";
import imgRamadan from "@/assets/occasion-ramadan.jpg";
import imgPrayer from "@/assets/product-prayer-set.jpg";
const imgJournalCraft = "/images/journal-cambric-craft.jpg";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: `Journal — Sukoon House` },
      { name: "description", content: "Thoughtful reflections from the Sukoon House journal." },
    ],
  }),
  component: BlogPostPage,
});

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

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<StoreBlogPost | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<MedusaStoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: catalog } = useCommerceProducts();

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
        if (isMounted) {
          setPost({
            id: "fallback",
            title:
              slug.includes("prayer")
                ? "Creating a Calm Prayer Corner: Designing Spaces for Stillness"
                : slug.includes("eid")
                  ? "Eid Preparation for the Whole Family"
                  : "Caring for Pure Cambric Cotton: A Guide to Modest Longevity",
            slug,
            excerpt:
              "Mindful routines and thoughtful pieces that support modest family life — from fabric care to quiet prayer corners.",
            body: `Cambric cotton is woven from fine, closely spun yarns that create an exceptionally smooth surface while remaining naturally breathable in Indian climates. To maintain its drape and soft touch over years of everyday wear, wash gently with cold water, use a mild liquid detergent, avoid direct noon sunlight when line-drying, and warm iron inside out with steam.\n\nAll Sukoon House cotton suits are pre-shrunk and lined with soft cotton voil so you never have to worry about see-through transparency or abrupt shrinking after the first wash.\n\nTaking time to care for the garments we wear during daily life and family worship connects us to a tradition of stewardship (amanah) and mindful simplicity.`,
            featured_image: slug.includes("prayer")
              ? imgPrayer
              : slug.includes("eid")
                ? imgEid
                : imgJournalCraft,
            author: "Fatima Zahra",
            category: slug.includes("prayer")
              ? "Home"
              : slug.includes("eid")
                ? "Occasions"
                : "Modesty",
            tags: ["family-life", "sukoon-house"],
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

  const shopTheEdit = useMemo(() => {
    if (relatedProducts.length > 0) {
      return relatedProducts.slice(0, 4).map((p) => ({
        handle: p.handle || p.id,
        name: p.title,
        image: p.thumbnail || "",
        price:
          p.variants?.[0]?.calculated_price?.calculated_amount != null
            ? Math.round(Number(p.variants[0].calculated_price.calculated_amount))
            : null,
      }));
    }

    const list = catalog ?? [];
    const hay = `${post?.title ?? ""} ${post?.category ?? ""} ${post?.tags?.join(" ") ?? ""} ${slug}`.toLowerCase();
    const preferredPillars = hay.includes("prayer") || hay.includes("home")
      ? ["Prayer", "Home"]
      : hay.includes("eid") || hay.includes("gift")
        ? ["Gifts", "Women", "Children"]
        : hay.includes("cotton") || hay.includes("modesty") || hay.includes("cambric")
          ? ["Women", "Men"]
          : ["Women", "Prayer", "Gifts"];

    return list
      .filter((p) => preferredPillars.includes(p.pillar))
      .slice(0, 4)
      .map((p) => ({
        handle: p.handle,
        name: p.name,
        image: p.image,
        price: p.price,
      }));
  }, [relatedProducts, catalog, post, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <PageContainer>
          <div className="mx-auto max-w-3xl animate-pulse space-y-4">
            <div className="h-4 w-40 rounded bg-muted" />
            <div className="h-12 w-full rounded bg-muted" />
            <div className="aspect-[16/9] w-full rounded-sm bg-muted" />
            <div className="h-24 w-full rounded bg-muted/60" />
          </div>
        </PageContainer>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background py-20 text-center">
        <PageContainer>
          <h1 className="font-display text-3xl">Article not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The journal entry you are looking for may have moved.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/blog">← Back to Journal</Link>
          </Button>
        </PageContainer>
      </div>
    );
  }

  const heroImage = resolvePostImage(post);

  return (
    <article className="min-h-screen bg-background">
      <div className="border-b border-border bg-blush-cream/30 py-4">
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
            <span className="max-w-[200px] truncate font-medium text-foreground">{post.title}</span>
          </div>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="mx-auto max-w-3xl pt-10 sm:pt-14">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {post.category ? (
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                {post.category}
              </span>
            ) : null}
            {post.published_at ? (
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {new Date(post.published_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            ) : null}
            {post.read_time ? (
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {post.read_time} min read
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 font-display text-3xl font-medium leading-tight sm:text-5xl">
            {post.title}
          </h1>

          {post.author ? (
            <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
              <div className="flex size-9 items-center justify-center rounded-full bg-blush-cream font-display text-sm font-semibold text-foreground">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <User className="size-3.5 text-primary" />
                  {post.author}
                </p>
                <p className="text-[0.68rem] text-muted-foreground">Sukoon House Editorial</p>
              </div>
            </div>
          ) : null}

          <div className="mt-8 overflow-hidden rounded-sm bg-muted">
            <CommerceImage
              src={heroImage}
              alt={post.title}
              className="aspect-[16/9] w-full object-cover"
              loading="eager"
            />
          </div>

          {post.excerpt ? (
            <blockquote className="mt-8 border-l-2 border-berry pl-4 font-display text-lg italic leading-relaxed text-foreground/80">
              {post.excerpt}
            </blockquote>
          ) : null}

          <div className="mt-8 space-y-6 font-display text-base leading-8 text-foreground/90 sm:text-lg">
            {post.body.split("\n\n").map((para, i) => (
              <p key={i} className="font-sans text-sm leading-7 text-foreground/90 sm:text-base sm:leading-8">
                {para}
              </p>
            ))}
          </div>

          {post.tags && post.tags.length > 0 ? (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Tag className="size-3.5" /> Tags
              </span>
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                  #{t}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-10">
            <Button asChild variant="outline" size="sm">
              <Link to="/blog">
                <ArrowLeft className="mr-1.5 size-3.5" /> Back to Journal
              </Link>
            </Button>
          </div>
        </div>

        {shopTheEdit.length > 0 ? (
          <section className="mx-auto mt-16 max-w-4xl border-t border-border pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Shop the edit</Eyebrow>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl">Related essentials</h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Real pieces from the Sukoon House catalogue that belong with this story.
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/collection">
                  Shop all <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {shopTheEdit.map((item) => (
                <Link
                  key={item.handle}
                  to="/products/$productId"
                  params={{ productId: item.handle }}
                  className="group"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                    <CommerceImage
                      src={item.image}
                      alt=""
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h4 className="mt-2 line-clamp-2 text-xs font-semibold transition-colors group-hover:text-primary sm:text-sm">
                    {item.name}
                  </h4>
                  <p className="mt-0.5 text-xs font-bold sm:text-sm">
                    {item.price != null ? `₹${item.price.toLocaleString("en-IN")}` : "View details"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </PageContainer>
    </article>
  );
}
