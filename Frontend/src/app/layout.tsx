import LayoutClient from "@/components/layouts/LayoutClient";
import Providers from "./providers";
import { Montserrat } from "next/font/google";
import type { Metadata, Viewport } from "next";
import theme from "@/theme/theme";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const siteUrl = "https://iamwasim.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohammed Wasim | React & Next.js Freelancer Portfolio",
    template: "%s | Mohammed Wasim",
  },
  description:
    "Mohammed Wasim is a freelance React.js and Next.js developer in Ballari, Karnataka, building business websites, landing pages, web apps, and college, mini, and final-year projects for students — fast, SEO-friendly, and available remotely across India.",
  keywords: [
    "Mohammed Wasim",
    "iamwasim",
    "Mohammed Wasim portfolio",
    "React freelancer",
    "Next.js freelancer",
    "React developer portfolio",
    "Next.js developer portfolio",
    "Frontend Developer India",
    "Freelance frontend developer",
    "Freelance web developer",
    "React.js developer",
    "Next.js developer",
    "TypeScript frontend developer",
    "Portfolio website",
    // Local (Ballari) targeting
    "freelancer in Ballari",
    "web developer in Ballari",
    "freelance web developer Ballari",
    "React developer Ballari",
    "website developer Ballari Karnataka",
    // Student / academic project targeting
    "college projects",
    "good college projects",
    "mini projects",
    "miniprojects",
    "final year projects",
    "React final year project",
    "Next.js college project",
    "web development project for students",
    "project help for students Ballari",
  ],
  authors: [{ name: "Mohammed Wasim", url: siteUrl }],
  creator: "Mohammed Wasim",
  publisher: "Mohammed Wasim",
  applicationName: "Mohammed Wasim Portfolio",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in your env (from Google Search
  // Console → Settings → Ownership verification → HTML tag) to verify the site.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Mohammed Wasim | React & Next.js Freelancer Portfolio",
    description:
      "Freelance React.js & Next.js developer in Ballari, Karnataka — business websites, web apps, and college, mini & final-year projects for students. Fast, SEO-friendly, available across India.",
    url: siteUrl,
    siteName: "Mohammed Wasim Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images-videos/wasim-3.webp",
        width: 928,
        height: 1138,
        alt: "Mohammed Wasim - React and Next.js Freelancer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Wasim | React & Next.js Freelancer Portfolio",
    description:
      "Freelance React.js & Next.js developer in Ballari — websites, web apps, and college, mini & final-year projects for students. Available across India.",
    images: ["/assets/images-videos/wasim-3.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: theme.palette.background.default,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }}>
        <Providers>
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
