/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['picsum.photos', 'cdn.videvo.net', 'unsplash.com', 'www.pexels.com', 'plus.unsplash.com', 'images.unsplash.com', 'cdn.pixabay.com', 'contra.com', 'bento-bucket-public-available.s3.ap-south-1.amazonaws.com'],
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'mapbox-gl': 'mapbox-gl/dist/mapbox-gl.js',
        };
        return config;
    },
};

export default nextConfig;
