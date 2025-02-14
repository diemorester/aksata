/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.ristoan.id",
            },
            { 
                protocol: "http",
                hostname: "103.146.62.122",
            },
        ],
    },
    output: 'standalone'
}

module.exports = nextConfig
