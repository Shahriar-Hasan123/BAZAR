import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // The main API image host
        protocol: 'https',
        hostname: 'api.escuelajs.co',
      },
      {
        // Placeholder images the API uses
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        // Some API responses use imgur
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        // Uploaded files through the Files API
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}

export default nextConfig