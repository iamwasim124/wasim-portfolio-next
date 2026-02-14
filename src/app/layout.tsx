// src/app/layout.tsx

import LayoutClient from "@/components/layouts/LayoutClient";
import Providers from "./providers";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Mohammed Wasim - Frontend Developer",
  description:
    "React.js & Next.js Specialist with 4.5 years of experience building scalable, user-centric applications.",
  keywords: [
    "React",
    "Next.js",
    "Frontend Developer",
    "TypeScript",
    "Material-UI",
    "Web Development",
  ],
  authors: [{ name: "Mohammed Wasim" }],
  openGraph: {
    title: "Mohammed Wasim - Frontend Developer",
    description:
      "React.js & Next.js Specialist building exceptional digital experiences",
    url: "https://iamwasim.in",
    siteName: "Mohammed Wasim Portfolio",
    locale: "en_US",
    type: "website",
  },
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
