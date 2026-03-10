/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Uncomment and set if deploying to a subdirectory repo (e.g. username.github.io/ed-astra)
  // basePath: "/ed-astra",
};

export default nextConfig;
