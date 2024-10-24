/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loyal-lobster-184.convex.cloud",
                pathname: "/api/storage/**",
            },
            {
                protocol: "https",
                hostname: "lovable-goat-937.convex.cloud",
                pathname: "/api/storage/**",
            },
        ],
    },
};

export default nextConfig;
