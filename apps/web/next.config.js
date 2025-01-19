/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "id.wikipedia.org" },
            { protocol: "http", hostname: "localhost" }
        ]
    },
    // webpack: (config) => {
    //     config.resolve.fallback = {
    //         ...config.resolve.fallback,
    //         crypto: false, // Ensure no polyfill for 'crypto'
    //     };
    //     return config;
    // },
    output: 'standalone'
}

module.exports = nextConfig
