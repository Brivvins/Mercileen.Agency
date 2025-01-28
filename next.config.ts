import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/file/d/**',
      },

      {
        protocol: 'https',
        hostname: "plus.unsplash.com",
        // pathname: '/file/d/**',
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
        // pathname: '/file/d/**',
      },
      {
        protocol: 'https',
        hostname: "zitrfypvgzcjzsvezzkg.supabase.co",
        // pathname: '/file/d/**',
      },
    ]
  },
}

export default nextConfig;
