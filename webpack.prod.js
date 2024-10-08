
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',  // Enables production-specific optimizations
  devtool: 'source-map',  // Separate source map for production
});
