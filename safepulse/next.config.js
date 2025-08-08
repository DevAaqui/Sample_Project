// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'standalone',
//     // ... other config options
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'standalone',
  images: {
    domains: ['baap-dynamic-jobs.s3.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
