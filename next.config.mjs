/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // السطر ده مهم جداً لـ GitHub Pages
  // basePath: '/your-repo-name', // شيل علامتين الـ // واكتب اسم الريبو بتاعك لو مش هتستخدم دومين مخصص
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
