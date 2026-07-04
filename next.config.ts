import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async headers() {
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com;
      img-src 'self' blob: data: https://* http://* /_media/;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://* http://* ws://localhost:* wss://localhost:*;
      frame-src 'self' https://www.google.com;
      frame-ancestors 'none';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  async rewrites() {
    const wordpressBase =
      process.env.WORDPRESS_INTERNAL_ORIGIN ||
      process.env.NEXT_PUBLIC_WORDPRESS_ORIGIN ||
      "http://127.0.0.1:9400";
    const isDevelopment = process.env.NODE_ENV !== "production";

    const developmentRewrites = isDevelopment
      ? [
          {
            source: "/admin",
            destination: `${wordpressBase}/wp-admin/`,
          },
          {
            source: "/admin/:path*",
            destination: `${wordpressBase}/wp-admin/:path*`,
          },
          {
            source: "/wp-admin",
            destination: `${wordpressBase}/wp-admin/`,
          },
          {
            source: "/wp-admin/:path*",
            destination: `${wordpressBase}/wp-admin/:path*`,
          },
          {
            source: "/wp-login.php",
            destination: `${wordpressBase}/wp-login.php`,
          },
          {
            source: "/wp-json/:path*",
            destination: `${wordpressBase}/wp-json/:path*`,
          },
        ]
      : [];

    return [
      ...developmentRewrites,
      {
        source: "/_media/:path*",
        destination: `${wordpressBase}/wp-content/:path*`,
      },
      {
        source: "/wp-content/:path*",
        destination: `${wordpressBase}/wp-content/:path*`,
      },
      {
        source: "/wp-includes/:path*",
        destination: `${wordpressBase}/wp-includes/:path*`,
      },
    ];
  },
};

export default nextConfig;
