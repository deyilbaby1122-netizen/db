/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel-ready: images, sitemap, robots handled separately.
  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
  },
  // Turbopack config (Next.js 16 uses Turbopack by default).
  turbopack: {},
};

module.exports = nextConfig;
