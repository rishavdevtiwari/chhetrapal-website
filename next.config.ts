import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,

  async rewrites() {
    const wordpressBase = "http://127.0.0.1:9400";

    return [
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
