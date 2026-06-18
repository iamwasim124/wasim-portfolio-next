import type { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog — React & Next.js Freelance Insights",
  description:
    "Articles by Mohammed Wasim on hiring freelance React & Next.js developers, building SEO-friendly business websites, and React/Next.js project guides.",
  keywords: [
    "react next.js blog",
    "freelance frontend developer blog",
    "react developer articles",
    "next.js tutorials",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — React & Next.js Freelance Insights",
    description:
      "Guides on hiring freelance React & Next.js developers, SEO-friendly websites, and project tips.",
    url: "https://iamwasim.in/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return <BlogList />;
}
