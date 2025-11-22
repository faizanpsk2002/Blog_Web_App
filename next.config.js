/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admintechiescafe.wtdemo.in",
      },
    ],
  },
};

module.exports = nextConfig;
