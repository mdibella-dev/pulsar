const path = require('path');
const fs = require('fs');
const {nodeModules, modules} = require('./webpack.common')

module.exports = {
  entry: './src/initialize-application-window.js',
  devtool: false,
  mode: 'development',
  target: 'electron-renderer',
  output: {
    path: path.resolve('app', 'src'),
    filename: 'initialize-application-window.js',
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
