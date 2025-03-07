const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './js/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    fallback: { "fs": false }  // Asegurar compatibilidad con algunos módulos
  },
  devServer: {
    static: './dist',
    open: true
  },
  mode: 'development'
};
