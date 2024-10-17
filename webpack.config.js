const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Add the BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource', // Webpack 5 asset handling method
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`, // Loads .env.development, .env.production etc.
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'src/assets' }, // Example: Copy assets folder
      ],
    }),
    // Add the BundleAnalyzerPlugin for performance analysis
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // Generates a static HTML report
      openAnalyzer: false, // Prevents the report from automatically opening
      reportFilename: 'bundle-report.html', // The name of the report file
    }),
  ],
};
