import { createFileRoute, redirect } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  beforeLoad: () => { throw redirect({ to: "/design-system" }); },
  head: () => ({ meta: [
    { title: "Sukoon House — Modern Muslim Family Life" },
    { name: "description", content: "Thoughtfully designed goods and ideas for modern Muslim homes and families." },
    { property: "og:title", content: "Sukoon House" },
    { property: "og:description", content: "A thoughtful rhythm for modern Muslim family life." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});
