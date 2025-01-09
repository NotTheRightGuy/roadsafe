/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "openweathermap.org",
                pathname: "/img/wn/**",
            },
        ],
    },
};

export default nextConfig;
