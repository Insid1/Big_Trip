/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  target: 'web',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    hot: false,
    static: path.resolve(__dirname, 'public'),
    port: 3030,
    open: {
      app: {
        name: 'chrome',
      },
    },
  },
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
};
