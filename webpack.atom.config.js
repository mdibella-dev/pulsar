const path = require('path');
const fs = require('fs');
const {nodeModules, modules} = require('./webpack.common')

module.exports = {
  entry: './exports/atom.js',
  devtool: false,
  mode: 'development',
  target: 'node',
  output: {
    path: path.resolve('app', 'exports'),
    filename: 'atom.js',
    library: {
      name: 'atom',
      type: 'commonjs',
    }
  },

  resolve: {
    extensions: ['.js', '.jsx', '.coffee']
  },

  module: modules,
  externals: nodeModules
}
