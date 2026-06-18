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
    "Mohammed Wasim is a React.js and Next.js freelancer building modern frontend applications, business websites, landing pages, and scalable web experiences.",
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
      "Portfolio of Mohammed Wasim, a React.js and Next.js freelancer focused on performance, SEO, scalable UI, and frontend development.",
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
      "React.js and Next.js freelancer portfolio featuring frontend projects, services, and contact details.",
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
