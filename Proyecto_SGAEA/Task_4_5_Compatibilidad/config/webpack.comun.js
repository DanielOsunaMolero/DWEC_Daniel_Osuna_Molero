const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'compilado'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV || 'development',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './index.html', to: '.' },
      ],
    }),
  ],
};
