/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // START: Configuration for GitHub Pages
  output: 'export',
  basePath: '/gia-t-books',
  images: {
    // This is required for static exports.
    unoptimized: true,
    // This is still needed for external images like from picsum.photos
    domains: ['picsum.photos'],
  },
  // END: Configuration for GitHub Pages
};

module.exports = nextConfig;