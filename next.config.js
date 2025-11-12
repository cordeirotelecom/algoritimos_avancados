/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Removed 'output: export' to allow SSR/ISR on Vercel
  // Static export was causing build timeouts with complex client components
};

module.exports = nextConfig;
