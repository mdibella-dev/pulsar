var path = require('path');
var fs = require('fs');
const {nodeModules, modules} = require('./webpack.common')

module.exports = {
  entry: './src/main-process/main.js',
  devtool: false,
  mode: 'development',
  target: 'electron-main',
  output: {
    path: path.resolve('app', 'src', 'main-process'),
    filename: 'main.js',
    library: {
      name: 'main',
      type: 'commonjs',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.coffee']
  },

  module: modules,
  externals: nodeModules
}
