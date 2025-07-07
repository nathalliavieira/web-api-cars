import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ['localhost'], //necessário para carregar imagens de http://localhost:3000 ou 3333
    remotePatterns: [
      {
        hostname: "res.cloudinary.com"
      }
    ],
  },
};

export default nextConfig;