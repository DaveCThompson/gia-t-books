// Determine if the environment is production for GitHub Pages deployment
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // This tells Next.js to build a static site that can be hosted anywhere.
  output: 'export',

  // This is the crucial setting. It tells Next.js that your entire site
  // will be served from a subdirectory called '/gia-t-books' ONLY in production.
  // For local development, it will be served from the root.
  basePath: isProd ? '/gia-t-books' : '',

  // Note: If you have assets that need the basePath prefix (like in CSS),
  // Next.js handles this automatically. For manual paths (like in data.json),
  // you might need to handle the prefix. The current setup with absolute paths
  // like `/gia-t-books/books/...` is robust and will work for both dev and prod.

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;