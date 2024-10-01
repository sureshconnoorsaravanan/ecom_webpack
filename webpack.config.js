const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file types
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