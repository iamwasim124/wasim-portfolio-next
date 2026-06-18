import type { MetadataRoute } from "next";
import theme from "@/theme/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohammed Wasim — React & Next.js Freelancer",
    short_name: "Mohammed Wasim",
    description:
      "Portfolio of Mohammed Wasim, a freelance React.js & Next.js frontend developer building fast, SEO-friendly websites and web apps.",
    start_url: "/",
    display: "standalone",
    background_color: theme.palette.background.default,
    theme_color: theme.palette.background.default,
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
