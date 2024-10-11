const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    // Enable CSS extraction and optimization in production
    if (isProduction && !isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css',
          chunkFilename: 'static/css/[id].[contenthash].css',
        }),
      );
    }

    // Use TerserPlugin for JS minification in production
    if (isProduction) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Removes console logs in production
            },
            output: {
              comments: false, // Removes comments
            },
          },
          extractComments: false, // Prevents additional comment extraction files
        }),
      ];

      // Enable Gzip compression for optimized asset delivery
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240, // Only assets bigger than this size are compressed
          minRatio: 0.8, // Compression ratio threshold
        }),
      );
    }

    // Optimize code splitting and chunking
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    // Tree-shaking: Removing unused exports
    config.optimization.usedExports = true;

    return config;
  },
  swcMinify: true, // Use SWC for faster minification
  compress: true, // Enable compression for production builds
  poweredByHeader: false, // Remove the 'X-Powered-By' header
};

module.exports = withBundleAnalyzer(nextConfig);
