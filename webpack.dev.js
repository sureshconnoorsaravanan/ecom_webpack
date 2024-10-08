const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',  // Enables development-specific optimizations
    devtool: 'inline-source-map',  // Enable source maps for easier debugging
    devServer: {
      static: './dist',
      hot: true,
    },
  });