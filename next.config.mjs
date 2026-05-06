/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vexlap', // ضفنا السطر ده عشان يظبط مسارات الـ CSS والصور
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
