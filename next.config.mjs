/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'links.papareact.com',
      },

      {
        protocol: 'http',
        hostname: 'image.tmdb.org',
      },
    ],
  },
};

export default nextConfig;
