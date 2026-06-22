/** @type {import('next').NextConfig} */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8501';

const nextConfig = {
  reactStrictMode: true,
  // Docker 生产构建时跳过 ESLint（CI 已经单独检查）
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 允许 useSearchParams() 在不包裹 Suspense 的情况下使用（客户端页面）
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // 如果需要代理到后端 API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
  // 图片优化配置
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;


