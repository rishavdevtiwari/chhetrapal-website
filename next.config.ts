import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,

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
