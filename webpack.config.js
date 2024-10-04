const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output folder
    filename: 'bundle.js', // Bundle file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Handle .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel for transpiling
          options:{
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, // Handle CSS files
        use: ['style-loader', 'css-loader','sass-loader'],
      },
      {
        test: /\.txt$/, // Handle CSS files
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file types
    alias: {
      '@utils': path.resolve(__dirname,"src/utils/")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use index.html as template
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve content from dist
    compress: true,
    port: 3000, // Development server port
    hot: true, // Enable hot module replacement
  },
  mode: 'development', // Set mode to development for unminified code
};