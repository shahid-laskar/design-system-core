import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/collection" });
  },
  head: () => ({
    meta: [
      { title: "Sukoon House — Thoughtful Goods for Family Life" },
      {
        name: "description",
        content:
          "Discover considered home, prayer, children’s, and modest essentials from Sukoon House.",
      },
      { property: "og:title", content: "Sukoon House" },
      {
        property: "og:description",
        content: "Thoughtful goods for calm, intentional family life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
