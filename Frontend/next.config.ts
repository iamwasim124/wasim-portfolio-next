import type { NextConfig } from "next";

const securityHeaders = [
  // stop MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // disallow embedding the site in iframes (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // send only the origin on cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // disable powerful features the site doesn't use
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // force HTTPS for two years (honoured only over HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // serve modern formats automatically via next/image
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
