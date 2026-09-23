import { createFileRoute, redirect } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/products/$productId", params: { productId: "the-stillness-set" } });
  },
  head: () => ({
    meta: [
      { title: "Sukoon House — Thoughtful goods for family life" },
      { name: "description", content: "Considered goods for the home, for prayer, and for little ones." },
      { property: "og:title", content: "Sukoon House" },
      { property: "og:description", content: "Considered goods for the home, for prayer, and for little ones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
