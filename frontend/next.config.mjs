/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL || 'http://localhost:3000';

const nextConfig = {
    turbopack: { root: import.meta.dirname },
    // Repassa as chamadas /loja/* para o backend Express
    async rewrites() {
        return [{ source: '/loja/:path*', destination: `${API_URL}/loja/:path*` }];
    },
};

export default nextConfig;
