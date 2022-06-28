const path = require('path');
const fs = require('fs');
const {nodeModules, modules} = require('./webpack.common')

module.exports = {
  entry: './static/index.js',
  devtool: false,
  mode: 'development',
  target: 'electron-renderer',
  output: {
    path: path.resolve('app', 'static'),
    filename: 'index.js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.coffee']
  },

  module: modules,
  externals: nodeModules
}
