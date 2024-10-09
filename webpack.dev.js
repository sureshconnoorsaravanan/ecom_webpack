const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',  // Enables development-specific optimizations
    devtool: 'inline-source-map',  // Enable source maps for easier debugging
    devServer: {
        static: path.resolve(__dirname, 'dist'), // Serve content from dist
        compress: true,
        port: 3000, // Development server port
        hot: true, 
    },
  });