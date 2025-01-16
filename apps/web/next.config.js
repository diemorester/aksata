/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {protocol: "https", hostname: "id.wikipedia.org"},
            {protocol: "http", hostname: "localhost"}
        ]
    }
}

module.exports = nextConfig
