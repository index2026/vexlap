/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vexlap',
  assetPrefix: '/vexlap/', // السطر ده بيجبر الموقع يحمل الـ CSS من المسار الصح
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
