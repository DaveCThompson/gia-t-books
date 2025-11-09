/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // This tells Next.js to build a static site that can be hosted anywhere.
  output: 'export',

  // This is the crucial setting. It tells Next.js that your entire site
  // will be served from a subdirectory called '/gia-t-books'.
  basePath: '/gia-t-books',

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