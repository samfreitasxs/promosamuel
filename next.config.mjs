/** @type {import('next').NextConfig} */
const nextConfig = {
  // Evita o Next inferir outro diretório como raiz (há lockfiles fora do projeto).
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
