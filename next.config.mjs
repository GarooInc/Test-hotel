/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        };
        config.resolve.alias.canvas = false;
        return config;
      },
      
        
};

export default nextConfig;
