import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohammed Wasim — React & Next.js Freelancer",
    short_name: "Mohammed Wasim",
    description:
      "Portfolio of Mohammed Wasim, a freelance React.js & Next.js frontend developer building fast, SEO-friendly websites and web apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e1a",
    theme_color: "#0a0e1a",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
