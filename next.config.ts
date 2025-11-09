/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // FIX: Add the images configuration to allowlist external domains.
  images: {
    domains: ['picsum.photos'],
  },
};

module.exports = nextConfig;