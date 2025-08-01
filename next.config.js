/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
  // supprime experimental: { appDir: true }
  // supprime swcMinify: true
};

module.exports = nextConfig;
